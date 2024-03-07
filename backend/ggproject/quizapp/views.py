from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import transaction
from .models import Quiz, UserQuizzes, Question, IncorrectQuestions




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def explore(request):
    # Get the current user
    user = request.user

    # Count the total number of quizzes per topic
    quizzes_per_topic = Quiz.objects.values('topic_id').annotate(total_quizzes=Count('topic_id')).order_by('topic_id')

    # Count the number of quizzes passed by the user per topic
    passed_quizzes_per_topic = UserQuizzes.objects.filter(user=user, pass_q=True)\
        .values('quiz__topic_id')\
        .annotate(passed_quizzes=Count('quiz__topic_id'))\
        .order_by('quiz__topic_id')

    # Combine the two querysets into a single response
    # This example assumes that each topic_id in quizzes_per_topic also exists in passed_quizzes_per_topic
    # Adjust logic as needed if this assumption does not hold
    for topic in quizzes_per_topic:
        topic['passed_quizzes'] = next((item['passed_quizzes'] for item in passed_quizzes_per_topic if item['quiz__topic_id'] == topic['topic_id']), 0)

    return Response(quizzes_per_topic)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def topic_quizzes(request, topic_id):
    # Fetch quizzes with the given topic_id
    quizzes = Quiz.objects.filter(topic_id=topic_id).order_by('order')
    
    # Quizzes that the user has attempted
    attempted_quiz_ids = UserQuizzes.objects.filter(user=request.user).values_list('quiz_id', flat=True)
    
    # Quizzes that the user has passed
    passed_quizzes = UserQuizzes.objects.filter(user=request.user, pass_q=True).values_list('quiz_id', flat=True)
    
    # First array: Unattempted or not passed quizzes
    unattempted_or_not_passed_quizzes = quizzes.exclude(id__in=passed_quizzes).distinct()
    
    # Convert unattempted or not passed quizzes to a list of dictionaries for JSON response
    unattempted_or_not_passed_quizzes_list = [{
        'id': quiz.id,
        'topic_title': quiz.topic_title,
        'order': quiz.order,
        'success_url': f'GET /quiz/{quiz.id}/question/1'
    } for quiz in unattempted_or_not_passed_quizzes]
    
    # Second array: Passed quizzes
    passed_quizzes_list = quizzes.filter(id__in=passed_quizzes).order_by('order')
    
    # Convert passed quizzes to a list of dictionaries for JSON response
    passed_quizzes_list = [{
        'id': quiz.id,
        'topic_title': quiz.topic_title,
        'order': quiz.order,
        'success_url': f'GET /quiz/{quiz.id}/question/1'
    } for quiz in passed_quizzes_list]

    # Construct and return the JSON response
    return JsonResponse({
        'unattempted_or_not_passed_quizzes': unattempted_or_not_passed_quizzes_list,
        'passed_quizzes': passed_quizzes_list
    }, safe=False)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_question_for_quiz(request, quiz_id, question_id):
    # Ensure the quiz exists and the question ID belongs to this quiz
    quiz = get_object_or_404(Quiz, pk=quiz_id)
    question = get_object_or_404(Question, pk=question_id)
    
    # Check if the question belongs to the specified quiz
    questions_in_quiz = [quiz.q1_id, quiz.q2_id, quiz.q3_id, quiz.q4_id, quiz.q5_id, quiz.q6_id]
    if question.id not in questions_in_quiz:
        return JsonResponse({'error': 'Question does not belong to the specified quiz'}, status=400)
    
    # Construct the response with question details
    question_details = {
        'topic_id': question.topic_id,
        'question': question.question,
        'option1': question.option1,
        'option2': question.option2,
        'option3': question.option3,
        'answer': question.answer,
        'explanation': question.explanation,
        'article_link': question.article_link
    }
    
    return JsonResponse(question_details)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_quiz_answers(request, quiz_id):
    user = request.user
    try:
        # Ensure the quiz exists
        quiz = Quiz.objects.get(pk=quiz_id)
        
        # Parse the submitted answers
        submitted_answers = request.data.get('answers', {})
        
        correct_answers_count = 0
        incorrect_questions = []

        # Begin a transaction to ensure data integrity
        with transaction.atomic():
            for question_attr in ['q1', 'q2', 'q3', 'q4', 'q5', 'q6']:
                question = getattr(quiz, question_attr)
                # Convert question ID to string since JSON keys are always strings
                question_id_str = str(question.id)
                if question_id_str in submitted_answers:
                    is_correct = submitted_answers[question_id_str] in [True, 'true', 'True']
                    if is_correct:
                        correct_answers_count += 1
                    else:
                        incorrect_questions.append(question)

            # Check if user passed the quiz
            passed = correct_answers_count >= 4  # Assuming passing criteria is getting at least 4 questions correct
            
            # Update UserQuizzes
            UserQuizzes.objects.create(user=user, quiz=quiz, pass_q=passed)
            
            # Update IncorrectQuestions for each incorrect answer
            for question in incorrect_questions:
                IncorrectQuestions.objects.create(user=user, quiz=quiz, question=question)

        return JsonResponse({'message': 'Quiz results processed', 'passed': passed, 'correct_answers_count': correct_answers_count})
    
    except Quiz.DoesNotExist:
        return JsonResponse({'error': 'Quiz not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


