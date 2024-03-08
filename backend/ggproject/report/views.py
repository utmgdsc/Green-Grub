from django.shortcuts import render
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Product, UserHistory, Stats
from friends.models import Friends 
from . import scan_parser
from .serializers import ProductSerializer, LeaderboardSerializer
from django.db.models import Q

# import status
from rest_framework import status
import requests

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_products(request):
    user_history = UserHistory.objects.filter(user=request.user)
    products = Product.objects.filter(userhistory__in=user_history)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_leaderboard(request):
    friends = Friends.objects.filter(
        (Q(user1=request.user) | Q(user2=request.user)) & Q(status='accepted')
    )

    # Extract the friend's user IDs, including the requester's user ID
    friend_user_ids = set()
    for friendship in friends:
        friend_user_ids.add(friendship.user1_id)
        friend_user_ids.add(friendship.user2_id)
    friend_user_ids.add(request.user.id)

    # Retrieve the Stats for these users
    stats = Stats.objects.filter(user_id__in=friend_user_ids).order_by('-score')

    # Serialize the stats
    serializer = LeaderboardSerializer(stats, many=True)
    return Response(serializer.data)

# Remember to add the URL pattern in your urls.py:
# path('view_leaderboard/', ViewLeaderboard.as_view(), name='view_leaderboard'),

