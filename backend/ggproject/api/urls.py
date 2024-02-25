from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from ggauth.views import SignupView, UserUpdateView

from . import views
from report import views as report_views

urlpatterns = [
    path('test/', views.hello, name='hello'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('update_user/', UserUpdateView.as_view(), name='update_user'),
    path('scan/<str:barcode>/', views.scan, name='scan'),
    path('scan_and_save/<str:barcode>/', report_views.scan_and_save, name='scan_and_save')
]