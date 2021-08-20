from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        print(f"IsOwnerOrReadOnly obj----> {obj}")
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the author of the post.
        return obj.author == request.user

class FollowerIsNotPublisher(permissions.BasePermission):
    """
    Custom permission to check that user is not publisher. User can't follow to yourself
    """

    def has_object_permission(self, request, view, obj):
        print(f"obj----> {obj}")
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are user can't follow to yourself.
        return obj.publisher.user != request.user
