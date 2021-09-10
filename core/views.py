from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from core.models import Comment, Follower, Post, Publisher, LikePost
from core.serializers import (
    PostSerializer,
    FollowerSerializer,
    LikePostSerializer,
    CommentSerializer)
from core.permissions import (
    IsOwnerOrReadOnly,
    FollowerIsNotPublisher,
    FollowOnlyOneTime,
    LikeOnlyOneTime)


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserRegistre(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# POST CLASSES
class PostList(generics.ListAPIView):
    # List all posts or create a new post
    permission_classes = (permissions.AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostListUser(generics.ListAPIView):
    # List all posts or create a new post
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostSerializer
    def get_queryset(self):
        user = self.kwargs['user_id']
        return Post.objects.filter(author=user)

class PostCreate(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# FOLLOWING CLASSES 
class FollowCreate(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, FollowerIsNotPublisher, FollowOnlyOneTime,)
    serializer_class = FollowerSerializer
    queryset = Follower.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['DELETE'])
def unfollow(request):
    follower = Follower.objects.filter(user=request.user, publisher=(JSONParser().parse(request))['publisher'])[0]
    
    follower.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET',])
def followers_list(request):
    try:
        publisher = Publisher.objects.filter(user=request.user)[0]
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        followers = Follower.objects.filter(publisher=publisher.id)
        print(f"followers: {followers}")
    except Follower.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = []
    for index in range(0, len(followers)):
        data.append(FollowerSerializer(followers[index]).data)

    return Response(data)


@api_view(['GET',])
def followers_list_user(request, user_id):
    try:
        publisher = Publisher.objects.filter(user=user_id)[0]
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        followers = Follower.objects.filter(publisher=publisher.id)
    except Follower.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = []
    for index in range(0, len(followers)):
        data.append(FollowerSerializer(followers[index]).data)

    return Response(data)

# LIKE CLASSES 
class Like(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, LikeOnlyOneTime,)
    queryset = LikePost.objects.all()
    serializer_class = LikePostSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['DELETE'])
def unlike(request):
    try:
        likePost = LikePost.objects.filter(user=request.user, post=(JSONParser().parse(request))['post'])[0]
    except IndexError:
        return Response(status=status.HTTP_404_NOT_FOUND)
    likePost.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# COMMENT CLASSES 
class CommentCreate(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CommentEditDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer