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
from core.models import Follower, Post, Publisher
from core.serializers import (
    PostSerializer,
    FollowerSerializer)
from core.permissions import IsOwnerOrReadOnly, FollowerIsNotPublisher


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


# POST CLASS
class PostList(generics.ListAPIView):
    # List all posts or create a new post
    permission_classes = (permissions.AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostCreate(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
class PostDetail(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostEdit(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer


# FOLLOWING CLASS 
class FollowCreate(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated, FollowerIsNotPublisher,)
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET',])
def followers_list(request):
    try:
        publisher = Publisher.objects.filter(user=request.user)[0]
        print(f"PUBLISHER ID IS ---> {publisher.id}")
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    print(f"USER IS ---> {request.user.id}, BUT PUBLISHER ID IS ---> {publisher.id}")

    try:
        followers = Follower.objects.filter(publisher=publisher.id)
        print(f"followers: {followers}")
    except Follower.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    data = []
    for index in range(0, len(followers)):
        print(followers[index])
        data.append(FollowerSerializer(followers[index]).data)

    return Response(data)
# class Followers(generics.ListAPIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     queryset = Follower.objects.all()
#     serializer_class = FollowerSerializer