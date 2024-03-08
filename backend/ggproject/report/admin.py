from django.contrib import admin
from .models import Stats, Product, UserHistory

admin.site.register(Stats)
admin.site.register(Product)
admin.site.register(UserHistory)