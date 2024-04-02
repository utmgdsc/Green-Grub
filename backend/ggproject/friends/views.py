from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q

from .models import Friends
from .serializers import FriendRequestSerializer, FriendsListSerializer
from ggauth.serializers import UserWithExtraInfoSerializer, UserExtra

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_friend(request, username):
    """
    Endpoint to add a friend request or automatically accept if there's an inverse pending request.

    Responses include a 'code' to indicate the action's result:
    - '1' for successfully sent friend requests,
    - '2' for auto-accepted friend requests,
    - '3' for errors due to self-request attempts.
    - '4' for already existing requests (either pending, accepted, or declined).
    - '5' for user not found.
    - '6' for already being friends with the target user.

    :param request: HttpRequest object
    :param username: Username of the friend to add or auto-accept
    :return: Response object with status code and message
    """
    if request.user.username == username:
        # Attempting to add oneself as a friend
        return Response({'message': 'You cannot add yourself as a friend', 'code': '3'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        friend = get_object_or_404(User, username=username)
    except Http404:
        # Specified user does not exist
        return Response({'message': 'User not found', 'code': '5'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the users are already friends
    if Friends.objects.filter(
        (Q(user1=request.user, user2=friend) | Q(user1=friend, user2=request.user)),
        status='accepted'
    ).exists():
        return Response({'message': 'Already friends', 'code': '6'}, status=status.HTTP_200_OK)

    # Check if there's an existing pending request from the target user
    existing_request = Friends.objects.filter(user1=friend, user2=request.user, status='pending').first()
    if existing_request:
        # Auto-accept the existing inverse request
        existing_request.status = 'accepted'
        existing_request.request_accepted_at = timezone.now()
        existing_request.save()
        return Response({'message': 'Friend request auto-accepted', 'code': '2'}, status=status.HTTP_200_OK)
    
    friend_request, created = Friends.objects.get_or_create(
        user1=request.user,
        user2=friend,
        defaults={'status': 'pending'}
    )
    if created:
        # New friend request created successfully
        return Response({'message': 'Friend request sent successfully', 'code': '1'}, status=status.HTTP_201_CREATED)
    else:
        # Friend request already exists (either as pending, accepted, or declined)
        return Response({'message': 'Friend request already exists', 'code': '4'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_friend(request, username):
    """
    Endpoint to accept a pending friend request.

    Responses include a 'code' to indicate the action's result:
    - '2' for successfully accepted friend requests,
    - '5' for user not found,
    - '6' for already being friends (no pending request to accept),
    - '7' for no pending friend request from this user,
    - '8' for attempting to accept a friend request sent by oneself.

    :param request: HttpRequest object
    :param username: Username of the friend whose request is being accepted
    :return: Response object with status code and message
    """
    if request.user.username == username:
        # Attempting to accept a friend request sent by oneself
        return Response({'message': 'Cannot accept a friend request from yourself', 'code': '8'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        friend = get_object_or_404(User, username=username)
    except Http404:
        # Specified user does not exist
        return Response({'message': 'User not found', 'code': '5'}, status=status.HTTP_404_NOT_FOUND)

    # Check if already friends (which means there should be no pending request)
    if Friends.objects.filter(
        (Q(user1=request.user, user2=friend) | Q(user1=friend, user2=request.user)),
        status='accepted'
    ).exists():
        return Response({'message': 'Already friends, no pending request to accept', 'code': '6'}, status=status.HTTP_200_OK)

    try:
        friend_request = Friends.objects.get(user1=friend, user2=request.user, status='pending')
    except Friends.DoesNotExist:
        # No pending friend request from this user
        return Response({'message': 'No pending friend request from this user', 'code': '7'}, status=status.HTTP_404_NOT_FOUND)

    # Accept the friend request
    friend_request.status = 'accepted'
    friend_request.request_accepted_at = timezone.now()
    friend_request.save()
    return Response({'message': 'Friend request accepted successfully', 'code': '2'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_friend(request, username):
    """
    Endpoint to decline a pending friend request. The request entry is removed from the database upon decline.

    Responses include a 'code' to indicate the action's result:
    - '9' for successfully declined (and removed) friend requests,
    - '5' for user not found (target user does not exist),
    - '7' for no pending friend request found between the users (either it does not exist or already handled),
    - '8' for attempting to decline a friend request sent by oneself.

    :param request: HttpRequest object
    :param username: Username of the friend whose request is being declined
    :return: Response object with status code, message, and code
    """
    if request.user.username == username:
        # Attempting to decline a friend request sent by oneself
        return Response({'message': 'Cannot decline a friend request from yourself', 'code': '8'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        friend = get_object_or_404(User, username=username)
    except Http404:
        # Specified user does not exist
        return Response({'message': 'User not found', 'code': '5'}, status=status.HTTP_404_NOT_FOUND)

    # Attempt to find the pending friend request regardless of who sent it
    try:
        friend_request = Friends.objects.get(
            (Q(user1=friend, user2=request.user) | Q(user1=request.user, user2=friend)),
            status='pending'
        )
        # Delete the friend request from the database
        friend_request.delete()
        return Response({'message': 'Friend request declined and removed successfully', 'code': '9'}, status=status.HTTP_200_OK)
    except Friends.DoesNotExist:
        # No pending friend request found between the users
        return Response({'message': 'No pending friend request found', 'code': '7'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfriend(request, username):
    """
    Endpoint to unfriend an existing friend.

    Responses include a 'code' to indicate the action's result:
    - '10' for successfully unfriended,
    - '5' for user not found (the specified user does not exist),
    - '11' for not friends (no existing friendship to end),
    - '8' for attempting to unfriend oneself.

    :param request: HttpRequest object
    :param username: Username of the friend to unfriend
    :return: Response object with status code, message, and code
    """
    if request.user.username == username:
        # Attempting to unfriend oneself
        return Response({'message': 'Cannot unfriend yourself', 'code': '8'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        friend = get_object_or_404(User, username=username)
    except Http404:
        # Specified user does not exist
        return Response({'message': 'User not found', 'code': '5'}, status=status.HTTP_404_NOT_FOUND)

    # Check if there's an existing friendship (accepted friend request) between the users
    friendship = Friends.objects.filter(
        (Q(user1=request.user, user2=friend) | Q(user1=friend, user2=request.user)),
        status='accepted'
    ).first()

    if not friendship:
        # No existing friendship to end
        return Response({'message': 'Not friends', 'code': '11'}, status=status.HTTP_404_NOT_FOUND)

    # Remove the friendship from the database
    friendship.delete()
    return Response({'message': 'Successfully unfriended', 'code': '10'}, status=status.HTTP_200_OK)

# End point to see active sent requests
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_sent_requests(request):
    """
    Endpoint to view all active friend requests sent by the authenticated user.
    Returns a list of usernames to whom the friend requests have been sent.
    """
    sent_requests = Friends.objects.filter(user1=request.user, status='pending').order_by('-request_sent_at')
    usernames = [request.user2.username for request in sent_requests]
    return Response({"usernames":usernames})



# End point to see active received requests
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_received_requests(request):
    """
    Endpoint to view all active friend requests received by the authenticated user.
    Returns a list of usernames from whom the friend requests have been received.
    """
    received_requests = Friends.objects.filter(user2=request.user, status='pending').order_by('-request_sent_at')
    usernames = [request.user1.username for request in received_requests]
    return Response({"usernames":usernames})


# End point to see friends list
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_friends_list(request):
    friends_relationships = Friends.objects.filter(
        (Q(user1=request.user) | Q(user2=request.user)) & Q(status='accepted')
    ).distinct()
    # Pass the request context to the serializer
    serializer = FriendsListSerializer(friends_relationships, many=True, context={'request': request})
    # Extract usernames to conform to the specified output format
    usernames = [entry['friend']['username'] for entry in serializer.data]
    return Response({"usernames":usernames})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_friends_user_info(request, username):
    """
    View to get a friend's user info if the authenticated user is friends with them.

    :param request: HttpRequest object
    :param username: Username of the friend whose information is requested
    :return: Response object with user info if they are friends, otherwise an error message
    """
    # Ensure that the requested user exists
    try:
        friend_user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    # Check if the authenticated user and the requested user are friends
    if not Friends.objects.filter(
        ((Q(user1=request.user) & Q(user2=friend_user)) | 
         (Q(user1=friend_user) & Q(user2=request.user))),
    ).exists():
        return Response({'message': 'You are not friends with the requested user'}, status=status.HTTP_403_FORBIDDEN)
    
    # Get the UserExtra object related to the friend
    friend_extra, created = UserExtra.objects.get_or_create(user=friend_user)
    
    # Serialize the user data
    serializer = UserWithExtraInfoSerializer(friend_user, context={'request': request})
    
    return Response(serializer.data)