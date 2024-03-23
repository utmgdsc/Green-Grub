from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart
from .serializers import CartSerializer
from rest_framework import status
import requests
from report.scan_parser import parse_and_organize_response
from report.models import Product
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartItemSerializer, DetailedCartSerializer

from django.db import transaction, IntegrityError


class CreateCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        cart = Cart.objects.create(user=request.user)
        serializer = CartSerializer(cart)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ModifyCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        cart_id = request.data.get("cart_id")
        barcode = request.data.get("barcode")
        change_amount = request.data.get("change_amount", 0)
        # if barcode or cart not provided throw 
        if not cart_id or not barcode:
            return Response({"message": "Please provide both cart_id and barcode."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Ensure cart exists and belongs to the user
        cart = get_object_or_404(Cart, id=cart_id, user=user)
        
        # Try to fetch the product; if it doesn't exist, fetch its info and save it
        product, created = Product.objects.get_or_create(
            barcode=barcode,
            defaults=self.fetch_and_parse_product_info(barcode) if barcode else {}
        )
        
        if created:
            # Product was just created, meaning it was fetched from the API
            response_message = f"Product with barcode {barcode} was created and "
        else:
            response_message = ""

        # Find the cart item if it exists
        cart_item, cart_item_created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        # Calculate new quantity and apply changes
        new_quantity = cart_item.quantity + change_amount
        if new_quantity <= 0:
            cart_item.delete()
            return Response({"message": f"{response_message}Product removed from the cart.", "state": "removed"}, status=status.HTTP_200_OK)
        else:
            cart_item.quantity = new_quantity
            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response({"message": f"{response_message}Cart updated.", "cart_item": serializer.data, "state": "added"}, status=status.HTTP_200_OK)

    def fetch_and_parse_product_info(self, barcode):
        # Placeholder for your existing scan_and_save logic or similar
        response = requests.get(f'https://world.openfoodfacts.org/api/v2/product/{barcode}')
        if response.status_code == 200:
            parsed_data = parse_and_organize_response(response)
            return {
                'product_name': parsed_data['product_name'],
                'image': parsed_data['image'],
                'nutri_score': parsed_data['nutri_score'],
                'sustainability': parsed_data['sustainability'],
            }
        else:
            # Handle the case where the product is not found in the external API
            return Response({"message": "Product not found in the external API.", "state": "invalid"}, status=status.HTTP_404_NOT_FOUND)

class ViewCartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        cart_id = kwargs.get("cart_id")
        cart = get_object_or_404(Cart, id=cart_id, user=user)
        serializer = DetailedCartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        cart_id = kwargs.get("cart_id")
        
        try:
            with transaction.atomic():
                cart = get_object_or_404(Cart, id=cart_id, user=user)
                cart.delete()
        except IntegrityError as e:  # Catch potential integrity errors
            return Response({"error": "Database error while deleting the cart.", "details": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Cart deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class FinalizeCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        cart_id = kwargs.get("cart_id")
        cart = get_object_or_404(Cart, id=cart_id, user=user)
        cart.finalized = True
        cart.save()
        return Response({"message": "Cart finalized successfully."}, status=status.HTTP_200_OK)

class ViewUserCartsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        carts = Cart.objects.filter(user=user)
        serializer = DetailedCartSerializer(carts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)