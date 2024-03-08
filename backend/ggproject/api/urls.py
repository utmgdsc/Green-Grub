from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from ggauth.views import SignupView, UserUpdateView

from . import views
from report import views as report_views
from friends import views as friends_views

urlpatterns = [
    path('test/', views.hello, name='hello'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('update_user/', UserUpdateView.as_view(), name='update_user'),
    path('scan/<str:barcode>/', views.scan, name='scan'),
    path('scan_and_save/<str:barcode>/', report_views.scan_and_save, name='scan_and_save'),
    path('user_products/', report_views.user_products, name='user_products'),
    path('add_friend/<str:username>/', friends_views.add_friend, name='add_friend'),
    path('accept_friend/<str:username>/', friends_views.accept_friend, name='accept_friend'),
    path('decline_friend/<str:username>/', friends_views.decline_friend, name='decline_friend'),
    path('unfriend/<str:username>/', friends_views.unfriend, name='unfriend'),
    path('friend_requests_sent/', friends_views.view_sent_requests, name='friend_requests'),
    path('friend_requests_received/', friends_views.view_received_requests, name='friend_requests_received'),
    path('view_friends_list/', friends_views.view_friends_list, name='view_friends'),
    path('view_leaderboard/', report_views.view_leaderboard, name='view_leaderboard')
]