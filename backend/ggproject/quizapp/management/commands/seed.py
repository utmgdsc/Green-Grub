from django.core.management.base import BaseCommand
from quizapp.models import Quiz, Question

class Command(BaseCommand):
    help = 'Seeds the database with initial data.'

    def handle(self, *args, **options):
        
        # Delete all questions
        Question.objects.all().delete()

        # Delete all quizzes
        Quiz.objects.all().delete()

        # Creating questions
        question_1 = Question.objects.create(id=1, topic_id=1, question="How much was?", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_2 = Question.objects.create(id=2, topic_id=1, question="How much waste does a", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_3 = Question.objects.create(id=3, topic_id=1, question="How much w?", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_4 = Question.objects.create(id=4, topic_id=1, question="does a household produce in a day????", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_5 = Question.objects.create(id=5, topic_id=1, question="Howd produce in a day?????", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        question_6 = Question.objects.create(topic_id=1, question="How much w in a day??????", option1="75kg", option2="100kg", option3="150kg",
        answer=1, explanation="A lot of waste is produced by households in North America")

        # Creating Quizzes
        quiz_sustainability_transport = Quiz.objects.create(topic_id=1, topic_title = "Everyday Sustainability", quiz_title="Recycle and Reuse", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258464/everyday_vrthfi.png", q1 =question_1, q2=question_2, q3=question_3, q4=question_4, q5=question_5, q6=question_6, order=3)
        quiz_sustainability_transport = Quiz.objects.create(topic_id=2, topic_title = "Renewable Energy", quiz_title="Conserve Energy", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258468/renewable_yb4vzt.png", q1 =question_1, q2=question_2, q3=question_3, q4=question_4, q5=question_5, q6=question_6, order=3)
        quiz_sustainability_transport = Quiz.objects.create(topic_id=3, topic_title = "Conservation Efforts", quiz_title="Species in Danger of Extinction", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711258288/gpibju2c1hkpe4j7dtu9.png", q1 =question_1, q2=question_2, q3=question_3, q4=question_4, q5=question_5, q6=question_6, order=3)
        quiz_sustainability_transport = Quiz.objects.create(topic_id=4, topic_title = "Sustainable Agriculture", quiz_title="Sustainable Farming Practices", topic_image="https://res.cloudinary.com/adelcloud/image/upload/v1711261315/farming2_mywm7s.png", q1 =question_1, q2=question_2, q3=question_3, q4=question_4, q5=question_5, q6=question_6, order=3)

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database.'))
