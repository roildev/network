from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),

    path('posts/', views.PostList.as_view()),
    path('post/<int:pk>', views.PostDetail.as_view()),    
]

urlpatterns = format_suffix_patterns(urlpatterns)