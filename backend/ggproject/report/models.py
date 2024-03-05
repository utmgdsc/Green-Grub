from django.db import models
from django.contrib.auth.models import User

class Stats(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    level = models.IntegerField()

class Product(models.Model):
    barcode = models.CharField(max_length=255, primary_key=True)
    product_name = models.CharField(max_length=255)
    image = models.URLField(max_length=1024)
    nutri_score = models.IntegerField()
    sustainability = models.IntegerField()
    
# user history which is just user and product relationship
class UserHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
