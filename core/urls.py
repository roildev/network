from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('current_user/', views.current_user),
    path('register/', views.UserRegistre.as_view()),

    path('posts/', views.PostList.as_view()),
    path('post/<int:pk>', views.PostDetail.as_view()),
    path('post-edit/<int:pk>', views.PostEdit.as_view()),
    path('post-create/', views.PostCreate.as_view()), 

#     path("", views.index, name="index"),
#     path("login", views.login_view, name="login"),
#     path("logout", views.logout_view, name="logout"),
#     path("register", views.register, name="register"),

#     path("post", views.post, name="post"),
#     path("posts", views.posts, name="posts"),
#     path("post/<int:pk>", views.post_edit, name="post_edit"),

#     path("follow", views.follow, name="follow"),
#     path("unfollow", views.unfollow, name="unfollow"),

#     path("profile/<int:user_id>", views.profile_page, name="profile_page"),
#     path("following", views.following, name="following"),

#     path("like/<int:post_id>", views.like, name="like"),
#     path("unlike/<int:post_id>", views.unlike, name="unlike"),
]

urlpatterns = format_suffix_patterns(urlpatterns)