from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from ggauth.views import SignupView, UserUpdateView, GetUserInfo, GetUserProfileView

from . import views
from report import views as report_views
from friends import views as friends_views
from quizapp import views as quiz_views
from cart import views as cart_views


urlpatterns = [
    path('test/', views.hello, name='hello'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('update_user/', UserUpdateView.as_view(), name='update_user'),
    path('get_user_info/', GetUserInfo.as_view(), name='get_user_info'),
    path('get_basic_user_info/<str:username>/', GetUserProfileView.as_view(), name='get_basic_user_info'),
    
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
    path('view_leaderboard/', report_views.view_leaderboard, name='view_leaderboard'),
    path('get_friends_info/<str:username>/', friends_views.get_friends_user_info, name='get_friends_info'),

    path('explore/', quiz_views.explore, name='explore'),
    path('topic/<int:topic_id>/', quiz_views.topic_quizzes, name='topic_quizzes'),
    path('quiz/<int:quiz_id>/question/<int:question_id>/', quiz_views.get_question_for_quiz, name='get_question_for_quiz'),
    path('quiz/<int:quiz_id>/', quiz_views.submit_quiz_answers, name='submit_quiz_answers'),

    path('create_cart/', cart_views.CreateCartView.as_view(), name='create_cart'),
    path('modify_cart/', cart_views.ModifyCartView.as_view(), name='modify_cart'),
    path('get_cart/<int:cart_id>/', cart_views.ViewCartView.as_view(), name='get_cart'),
    path('delete_cart/<int:cart_id>/', cart_views.DeleteCartView.as_view(), name='delete_cart'),
    path('finalize_cart/<int:cart_id>/', cart_views.FinalizeCartView.as_view(), name='finalize_cart'), 
    path('get_all_carts/', cart_views.ViewUserCartsView.as_view(), name='get_all_carts'),
    path('update_cart_name/', cart_views.UpdateCartNameView.as_view(), name='update_cart_name')
]




