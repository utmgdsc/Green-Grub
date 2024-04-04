# views.py
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.db import transaction
# import isauthenticated
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, UserWithExtraInfoSerializer, UserBasicSerializer
from report.models import Stats

class SignupView(APIView):
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # create stats object, and set score to 0
            Stats.objects.create(user=user, score=0)
            return Response({"username": user.username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"username": user.username}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserInfo(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserWithExtraInfoSerializer(user, context={'request': request})
        return Response(serializer.data)
    
class GetUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username, *args, **kwargs):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        # Pass the context containing the request to the serializer
        serializer = UserBasicSerializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
