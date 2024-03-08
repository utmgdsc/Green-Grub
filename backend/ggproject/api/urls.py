from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from ggauth.views import SignupView, UserUpdateView

from . import views
from report import views as report_views
from quizapp import views as quiz_views

urlpatterns = [
    path('test/', views.hello, name='hello'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('update_user/', UserUpdateView.as_view(), name='update_user'),
    path('scan/<str:barcode>/', views.scan, name='scan'),
    path('scan_and_save/<str:barcode>/', report_views.scan_and_save, name='scan_and_save'),
    path('user_products/', report_views.user_products, name='user_products'),
    path('explore/', quiz_views.explore, name='explore'),
    path('topic/<int:topic_id>/', quiz_views.topic_quizzes, name='topic_quizzes'),
    path('quiz/<int:quiz_id>/question/<int:question_id>/', quiz_views.get_question_for_quiz, name='get_question_for_quiz'),
    path('quiz/<int:quiz_id>/', quiz_views.submit_quiz_answers, name='submit_quiz_answers'),

]




