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
from core.models import Follower, Post, Publisher


# USER SERIALIZERS
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

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
    likes_qty  = SerializerMethodField('get_likes_qty')
    days_ago = SerializerMethodField('get_days_ago')
    
    def create(self, validated_data):
        instance  = self.Meta.model(**validated_data)
        instance.save()
        return instance

    class Meta:
        model = Post
        fields = ('id', 'author', 'body', 'likes_qty', 'days_ago')

    def get_likes_qty(self, obj):
        return obj.likepost_set.count()

    def get_days_ago(self, obj):
        return (now() - obj.date).days


# FOLLOWER SERIALIZERS

class FollowerSerializer(ModelSerializer):
    class Meta:
        model = Follower
        fields = ('id', 'user', 'publisher')