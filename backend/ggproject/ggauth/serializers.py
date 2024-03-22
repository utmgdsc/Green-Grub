# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import UserExtra
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserExtra
from report.models import Stats
from django.conf import settings
from report.models import UserHistory
from django.db.models import Avg

class UserSerializer(serializers.ModelSerializer):
    country = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'country', 'city', 'avatar']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        extra_data = {
            'country': validated_data.pop('country', ''),
            'city': validated_data.pop('city', ''),
            'avatar': validated_data.pop('avatar', None)
        }
        user = User.objects.create_user(**validated_data)
        UserExtra.objects.create(user=user, **extra_data)
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()

        # Filter out User fields from validated_data
        extra_fields = {k: v for k, v in validated_data.items() if k in ['country', 'city', 'avatar']}
        UserExtra.objects.update_or_create(user=instance, defaults=extra_fields)
        
        return instance

class UserExtraSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField('get_avatar_url')

    class Meta:
        model = UserExtra
        fields = ['city', 'country', 'avatar_url']  

    def get_avatar_url(self, obj):

        request = self.context.get('request')
        if request is None:
            return 'Request is None. Context not passed correctly.'
        if obj.avatar and hasattr(obj.avatar, 'url'):
            photo_url = obj.avatar.url
            return request.build_absolute_uri(photo_url)
        return None

class UserWithExtraInfoSerializer(serializers.ModelSerializer):
    extra_info = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()
    average_nutri_score = serializers.SerializerMethodField()
    average_sustainability_score = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'extra_info', 'score', 'average_nutri_score', 'average_sustainability_score']


    def get_extra_info(self, obj):
        user_extra, created = UserExtra.objects.get_or_create(user=obj)
        serializer = UserExtraSerializer(user_extra, context=self.context)
        return serializer.data

    def get_score(self, obj):
        
        stats, created = Stats.objects.get_or_create(user=obj)
        return stats.score

    def get_average_nutri_score(self, obj):
        products = UserHistory.objects.filter(user=obj, product__nutri_score__gt=0).select_related('product')
        if products:
            scores = [p.product.nutri_score for p in products if p.product.nutri_score > 0]
            average_nutri_score = sum(scores) / len(scores) if scores else 0
            return average_nutri_score
        return 0

    def get_average_sustainability_score(self, obj):
        products = UserHistory.objects.filter(user=obj, product__sustainability__gt=0).select_related('product')
        if products:
            scores = [p.product.sustainability for p in products if p.product.sustainability > 0]
            average_sustainability_score = sum(scores) / len(scores) if scores else 0
            return average_sustainability_score
        return 0