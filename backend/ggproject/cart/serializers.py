from rest_framework import serializers
from .models import Cart, CartItem
from report.serializers import ProductSerializer
from django.db.models import Avg

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'finalized', 'name']
        read_only_fields = ('id', 'finalized')

class CartItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)  
    class Meta:
        model = CartItem
        fields = ['id', 'cart', 'product', 'quantity', 'product_details']
        read_only_fields = ('id', 'cart', 'product_details')  
        
class CartItemDetailSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'quantity', 'product_details']



class DetailedCartSerializer(serializers.ModelSerializer):
    items = CartItemDetailSerializer(many=True, read_only=True)
    average_nutri_score = serializers.SerializerMethodField()
    average_sustainability_score = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'finalized', 'name', 'items', 'average_nutri_score', 'average_sustainability_score']

    def get_average_nutri_score(self, obj):
        # Filter out products with a nutri_score of 0 or below
        items_with_score = obj.items.filter(product__nutri_score__gt=0)
        if items_with_score.exists():
            
            return items_with_score.aggregate(Avg('product__nutri_score'))['product__nutri_score__avg']
        return 0

    def get_average_sustainability_score(self, obj):
        # Filter out products with a sustainability score of 0 or below
        items_with_sustainability = obj.items.filter(product__sustainability__gt=0)
        if items_with_sustainability.exists():
            
            return items_with_sustainability.aggregate(Avg('product__sustainability'))['product__sustainability__avg']
        return 0
