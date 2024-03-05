from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone

from .models import Friends

# Endpoint to add a friend request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_friend(request, username):
    if request.user.username == username:
        return Response({'message': 'You cannot add yourself as a friend'}, status=status.HTTP_400_BAD_REQUEST)

    friend = get_object_or_404(User, username=username)
    friend_request, created = Friends.objects.get_or_create(
        user1=request.user,
        user2=friend,
        defaults={'status': 'pending'}
    )
    if created:
        return Response({'message': 'Friend request sent successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Friend request already sent or exists'}, status=status.HTTP_200_OK)

# Endpoint to accept a friend request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_friend(request, username):
    friend = get_object_or_404(User, username=username)
    try:
        friend_request = Friends.objects.get(user1=friend, user2=request.user, status='pending')
        friend_request.status = 'accepted'
        friend_request.request_accepted_at = timezone.now()
        friend_request.save()
        return Response({'message': 'Friend request accepted successfully'}, status=status.HTTP_200_OK)
    except Friends.DoesNotExist:
        return Response({'message': 'No pending friend request from this user'}, status=status.HTTP_404_NOT_FOUND)

# Endpoint to decline a friend request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_friend(request, username):
    friend = get_object_or_404(User, username=username)
    try:
        friend_request = Friends.objects.get(user1=friend, user2=request.user, status='pending')
        friend_request.status = 'declined'
        friend_request.save()
        return Response({'message': 'Friend request declined successfully'}, status=status.HTTP_200_OK)
    except Friends.DoesNotExist:
        return Response({'message': 'No pending friend request from this user'}, status=status.HTTP_404_NOT_FOUND)
