from django.db import models
from django.contrib.auth.models import User


# class Topic(models.Model):
#     topic_id = models.IntegerField()
#     topic_title = models.CharField(max_length=255, unique=True)
#     topic_image = models.CharField(max_length=1000, null=True)


class Question(models.Model):
    topic_id = models.IntegerField(default = 0)
    question = models.CharField(max_length=255, unique=True)
    option1 = models.CharField(max_length=255)
    option2 = models.CharField(max_length=255)
    option3 = models.CharField(max_length=255)
    # should be 1, 2, 3 corresponding to options, 0 means we don't know
    answer =  models.IntegerField(default = 0) 
    explanation = models.CharField(max_length=255)
    article_link = models.CharField(max_length=255, null=True, blank=True)

class Quiz(models.Model): # the quiz topic id needs to be the same as all the questions topic-id
    # topic_id = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='quiz_topic_id')
    topic_id = models.IntegerField(default = 0)
    quiz_title = models.CharField(max_length=255, default='Sustainability')
    topic_title = models.CharField(max_length=255, default='Sustainability')
    topic_image = models.CharField(max_length=1000, null=True)
    q1 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q1')
    q2 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q2')
    q3 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q3')
    q4 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q4')
    q5 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q5')
    q6 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='q6')
    order = models.IntegerField()

class UserQuizzes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    pass_q = models.BooleanField() # pass if user gets 4/6 questions correct on a quiz
    num_correct = models.IntegerField(default = 0)
    

class IncorrectQuestions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)