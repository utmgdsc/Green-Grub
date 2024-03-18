from rest_framework import serializers
from .models import Product, Stats

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['barcode', 'product_name', 'image', 'nutri_score', 'sustainability']

class LeaderboardSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username') 
    class Meta:
        model = Stats
        fields = ['username', 'score']