from rest_framework import  status
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import  (
    ModelSerializer,
    SerializerMethodField,
    CharField,
    ReadOnlyField
)
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings

from django.contrib.auth.models import User
from django.utils.timezone import now
from core.models import Comment, Follower, Post, Publisher, LikePost


# USER SERIALIZERS
class UserSerializer(ModelSerializer):
    publisher_id = SerializerMethodField('get_publisher_id')
    class Meta:
        model = User
        fields = ('id', 'username', 'publisher_id')


    def get_publisher_id(self, obj):
        try:
            pub = Publisher.objects.filter(user = obj.id)[0]
            return pub.id
        except IndexError:
            # This User isn't a publisher
            return False

# I need this serializer with token only for sign up
class UserSerializerWithToken(ModelSerializer):
    token = SerializerMethodField()
    password = CharField(write_only=True)
    confirmation = CharField(label='Confirmation Password', write_only=True)

    def validate_password(self, value):
        data = self.get_initial()
        if data.get("password") != data.get("confirmation"):
            raise ValidationError("Passwords must match.")
        return value

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        confirmation = validated_data.pop('confirmation', None)

        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'confirmation')


# POST SERIALIZERS
class PostSerializer(ModelSerializer):
    
    author = ReadOnlyField(source='author.username')
    author_id = ReadOnlyField(source='author.id')
    likes_qty  = SerializerMethodField('get_likes_qty')
    likes_users_ids  = SerializerMethodField('get_likes_users_ids')
    days_ago = SerializerMethodField('get_days_ago')
    comments = SerializerMethodField('get_comments')
    publisher_id = SerializerMethodField('get_publisher_id')    
    
    def create(self, validated_data):
        instance  = self.Meta.model(**validated_data)
        instance.save()
        return instance

    class Meta:
        model = Post
        fields = ('id', 'author', 'author_id', 'publisher_id', 'body', 'likes_qty', 'likes_users_ids', 'days_ago', 'comments')

    def get_likes_qty(self, obj):
        return obj.likepost_set.count()

    def get_likes_users_ids(self, obj):
        likes = obj.likepost_set.all()
        if len(likes) > 0:
            data = []
            for like in likes:
                data.append(LikePostSerializer(like).data['user'])            
            return data
        return []

    def get_days_ago(self, obj):
        return (now() - obj.date).days
    
    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj.id)

        if len(comments) > 0:
            data = []
            for comment in comments:
                data.append(CommentSerializer(comment).data)            
            return data
        return []

    def get_publisher_id(self, obj):
        pub = Publisher.objects.filter(user = obj.author)[0]
        return pub.id


# FOLLOWER SERIALIZERS
class FollowerSerializer(ModelSerializer):
    follower = ReadOnlyField(source='user.username')
    follower_id = ReadOnlyField(source='user.id')
    publisher_id = SerializerMethodField('get_publisher_id')
    class Meta:
        model = Follower
        fields = ('id', 'follower', 'follower_id', 'publisher_id')

    def get_publisher_id(self, obj):
        try:
            pub = Publisher.objects.filter(user = obj.user.id)[0]
            return pub.id
        except IndexError:
            # This follower isn't a publisher
            return False
class CreateFollowerSerializer(ModelSerializer):
    follower = ReadOnlyField(source='user.username')
    class Meta:
        model = Follower
        fields = ('id', 'follower', 'publisher')



# LIKE SERIALIZERS
class LikePostSerializer(ModelSerializer):
    user = ReadOnlyField(source='user.id')
    class Meta:
        model = LikePost
        fields = ('id', 'user', 'post')

class CommentSerializer(ModelSerializer):
    user = ReadOnlyField(source='user.id')
    days_ago = SerializerMethodField('get_days_ago')

    class Meta:
        model = Comment
        fields = ('id', 'user', 'post', 'body', 'days_ago')

    def get_days_ago(self, obj):
        return (now() - obj.date).days