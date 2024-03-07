from rest_framework import serializers
from .models import Friends
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class FriendRequestSerializer(serializers.ModelSerializer):
    user1 = UserSerializer(read_only=True)
    user2 = UserSerializer(read_only=True)

    class Meta:
        model = Friends
        fields = ['id', 'user1', 'user2', 'request_sent_at']

class FriendsListSerializer(serializers.Serializer):
    friend = serializers.SerializerMethodField()

    def get_friend(self, obj):
        # Assuming 'obj' is an instance of Friends
        # Determine if the request.user is user1 or user2 in the Friends model
        request_user = self.context['request'].user
        if obj.user1 == request_user:
            return SimpleUserSerializer(obj.user2).data
        else:
            return SimpleUserSerializer(obj.user1).data