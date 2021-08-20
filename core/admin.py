from django.contrib import admin

from .models import Post, LikePost, Publisher, Follower

class LikePostTabular(admin.TabularInline):
    model = LikePost

class LikePostAdmin(admin.ModelAdmin):
    list_display = ['id', '__str__']
    class Meta:
        model = LikePost
class PostAdmin(admin.ModelAdmin):
    inlines = [LikePostTabular]
    list_display = ['id', '__str__', 'author']
    class Meta:
        model = Post

class PublisherAdmin(admin.ModelAdmin):
    list_display = ['id', '__str__']
    class Meta:
        model = Publisher

class FollowerAdmin(admin.ModelAdmin):
    list_display = ['id', '__str__']
    class Meta:
        model = Follower

admin.site.register(Post, PostAdmin)
admin.site.register(LikePost, LikePostAdmin)
admin.site.register(Publisher, PublisherAdmin)
admin.site.register(Follower, FollowerAdmin)