from django.contrib import admin
from .models import Stats, Friends, Product, UserHistory

admin.site.register(Stats)
admin.site.register(Friends)
admin.site.register(Product)
admin.site.register(UserHistory)