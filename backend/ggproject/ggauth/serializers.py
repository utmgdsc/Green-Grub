# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validate_data):
        instance.first_name = validate_data.get("first_name",instance.first_name)
        instance.last_name = validate_data.get("last_name",instance.last_name)
        instance.password= validate_data.get("password",instance.password)
        return instance
    
    

