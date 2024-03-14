from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests

from report import scan_parser

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello, this is your first route!"})

@api_view(['GET'])
def scan(request, barcode):
    response = requests.get(f'https://world.openfoodfacts.org/api/v2/product/{barcode}')
    return Response(scan_parser.parse_and_organize_response(response))

