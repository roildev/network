from django.contrib.auth.models import User
from django.db import models

from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight


class Post(models.Model):
    body = models.CharField(max_length=255, verbose_name="post's text")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="like_user", blank=True, through="LikePost")

    class Meta:
        ordering = ["-date"]
        indexes= [models.Index(fields=["author"])]

    # Each author of post is Publisher. This condition check if author of post considered  Publisher
    def save(self, *args, **kwargs):
        publ = Publisher.objects.filter(user_id = self.author.id)

        if len(publ) == 0:
            pub = Publisher(user  = self.author)
            pub.save()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return "%s posted %s" % (self.author, self.date) 


class LikePost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if len(LikePost.objects.filter(user_id=self.user.id, post_id=self.post.id)) == 0:
            super().save(*args, **kwargs)
        else:
            print("You can't like this post one more")
            return

    def serialize(self):
        return {
            "user_id": self.user.id,
        }

    def __str__(self) -> str:
        return "%s liked post of: %s" % (self.user, self.post.author) 


class Publisher(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self) -> str:
        return "Publisher %s" % self.user 