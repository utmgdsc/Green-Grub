from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import requests

from .models import Product, UserHistory
from . import scan_parser

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def scan_and_save(request, barcode):
    response = requests.get(f'https://world.openfoodfacts.net/api/v2/product/{barcode}')
  

    parsed_data = scan_parser.parse_and_organize_response(response)

    product, created = Product.objects.get_or_create(
        barcode=barcode,
        defaults={
            'product_name': parsed_data['product_name'],
            'image': parsed_data['image'],
            'nutri_score': parsed_data['nutri_score'],
            'sustainability': parsed_data['sustainability'],
        }
    )

    UserHistory.objects.create(user=request.user, product=product)

    return Response({'message': 'Product scanned and saved successfully'})