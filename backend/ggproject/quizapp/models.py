from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    topic = models.IntegerField()
    question = models.CharField(max_length=255, unique=True)
    answer1 = models.CharField(max_length=255)
    answer2 = models.CharField(max_length=255)
    answer3 = models.CharField(max_length=255)
    explanation = models.CharField(max_length=255)
    article_link = models.CharField(max_length=255)

class Quiz(models.Model):
    topic = models.CharField(max_length=255, unique=True)
    q1 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q1')
    q2 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q2')
    q3 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q3')
    q4 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q4')

class UserQuizzes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    pass_q = models.BooleanField()

class IncorrectQuestions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)