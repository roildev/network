from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('current_user/', views.current_user),
    path('register/', views.UserRegistre.as_view()),

    path('posts/', views.PostList.as_view()),
    path('post/<int:pk>', views.PostDetail.as_view()),
    path('post-create/', views.PostCreate.as_view()), 
    
    path("follow/", views.FollowCreate.as_view()),
    path("unfollow/", views.unfollow, name="unfollow"),
    path("followers/", views.followers_list, name="followers"),

    path("like/", views.Like.as_view(), name="like"),
    path("unlike/", views.unlike, name="unlike"),

    path("comment-create/", views.CommentCreate.as_view()),
    path("comment-edit/<int:pk>", views.CommentEditDelete.as_view()),
    
]

urlpatterns = format_suffix_patterns(urlpatterns)