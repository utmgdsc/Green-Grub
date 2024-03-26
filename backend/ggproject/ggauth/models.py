
from django.db import models
from django.contrib.auth.models import User

class UserExtra(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=100, blank=True)  # Allow blank
    country = models.CharField(max_length=100, blank=True)  # Allow blank
    avatar = models.ImageField(upload_to='avatars/', default='avatars/default.png', blank=True)  # Allow blank

    def __str__(self):
        return self.user.username
