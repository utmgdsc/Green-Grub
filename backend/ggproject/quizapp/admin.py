from django.contrib import admin
from .models import Question, Quiz, UserQuizzes, IncorrectQuestions

admin.site.register(Question)
admin.site.register(Quiz)
admin.site.register(UserQuizzes)
admin.site.register(IncorrectQuestions)