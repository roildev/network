from core.models import Follower, LikePost, Publisher
from rest_framework import permissions
import json

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author of the post.
        if hasattr(obj, 'author'):
            return obj.author == request.user
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return False

class FollowerIsNotPublisher(permissions.BasePermission):
    """
    Custom permission to check that user is not publisher. User can't follow to yourself
    """
    message = 'You cannot be following to yourself'

    def has_permission(self, request, view):
        # Write permissions are user can't follow to yourself.
        publisher_id =(json.loads(request.body))['publisher']
        publisher = (Publisher.objects.get(pk=publisher_id))

        return request.user != publisher.user

class FollowOnlyOneTime(permissions.BasePermission):
    """
    Custom permission to check that user doesn't following to this publisher.
    """
    message = 'You have already followed'

    def has_permission(self, request, view):
        publisher_id =(json.loads(request.body))['publisher']
        follower = Follower.objects.filter(user=request.user, publisher=publisher_id)
        
        return len(follower) == 0

class LikeOnlyOneTime(permissions.BasePermission):
    """
    Custom permission to check that the user has not yet liked this post
    """

    message = 'You have already liked this post.'

    def has_permission(self, request, view):
        post_id =(json.loads(request.body))['post']
        like = LikePost.objects.filter(user=request.user, post=post_id)
        return len(like) == 0