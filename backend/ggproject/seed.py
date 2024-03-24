from quizapp.model import Topic, Quiz, Question

Topic.objects.all().delete()



# Creating topics
topic_general = Topic.objects.create(topic_id=1, topic_title="Everyday Sustainability")

# Creating questions
question_1 = Question.objects.create(topic_id=1, question="How much waste does a household produce in a day?", option1="75kg", option="100kg", option3="150kg",
answer=1, explanation="A lot of waste is produced by households in North America")

question_2 = Question.objects.create(topic_id=1, question="How much waste does a household produce in a day?", option1="75kg", option="100kg", option3="150kg",
answer=1, explanation="A lot of waste is produced by households in North America")

question_3 = Question.objects.create(topic_id=1, question="How much waste does a household produce in a day?", option1="75kg", option="100kg", option3="150kg",
answer=1, explanation="A lot of waste is produced by households in North America")

question_4 = Question.objects.create(topic_id=1, question="How much waste does a household produce in a day?", option1="75kg", option="100kg", option3="150kg",
answer=1, explanation="A lot of waste is produced by households in North America")

question_5 = Question.objects.create(topic_id=1, question="How much waste does a household produce in a day?", option1="75kg", option="100kg", option3="150kg",
answer=1, explanation="A lot of waste is produced by households in North America")

question_6 = Question.objects.create(topic_id=1, question="How much waste does a household produce in a day?", option1="75kg", option="100kg", option3="150kg",
answer=1, explanation="A lot of waste is produced by households in North America")

# Creating Quiz
quiz_sustainability_transport = Quiz.objects.create(topic_id=1, topic_title="Everyday Sustainability", q1 =question_1, q2=question_2, q3=question_3, q4=question_4, q5=question_5, q6=question_6, order=1)
