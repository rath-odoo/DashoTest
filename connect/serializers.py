from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model
from rest_framework import filters
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname','lastname','profile_image']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at', 'updated_at']
        read_only_fields = ['post', 'author', 'created_at', 'updated_at']  # These fields are set automatically

class PostSerializer(serializers.ModelSerializer):
    like_count = serializers.SerializerMethodField()  # Read-only field for like count
    comment_count = serializers.SerializerMethodField()  # Read-only field for comment count
    author = UserSerializer(read_only=True)
    user_has_liked = serializers.SerializerMethodField()  # Field to check if the user has liked the post
    likes = UserSerializer(many=True, read_only=True)  # List of users who liked the post

    class Meta:
        model = Post
        fields = ['id', 'author', 'title', 'content', 'created_at', 'updated_at', 'attachment', 'like_count', 'comment_count', 'user_has_liked', 'likes']  # Include like_count, comment_count, user_has_liked, and likes
        read_only_fields = ['author', 'created_at', 'updated_at', 'like_count', 'comment_count', 'user_has_liked', 'likes']  # Make like_count, comment_count, user_has_liked, and likes read-only

    def get_like_count(self, obj):
        return obj.likes.count()  # Return the number of likes for the post
    
    def get_comment_count(self, obj):
        return obj.comments.count()  # Return the number of comments for the post
    
    def get_user_has_liked(self, obj):
        user = self.context['request'].user
        return obj.likes.filter(id=user.id).exists() if user.is_authenticated else False

class PostWithCommentsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)  # Nested comments
    comment_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)
    user_has_liked = serializers.SerializerMethodField()
    likes = UserSerializer(many=True, read_only=True)  # List of users who liked the post

    class Meta:
        model = Post
        fields = ['id', 'author', 'title', 'content', 'created_at', 'updated_at', 'attachment', 'like_count', 'comment_count', 'comments', 'user_has_liked', 'likes']  # Include nested comments and likes

    def get_comment_count(self, obj):
        return obj.comments.count()

    def get_like_count(self, obj):
        return obj.likes.count()
    
    def get_user_has_liked(self, obj):
        user_id = self.context.get('user_id')
        return obj.likes.filter(id=user_id).exists() if user_id else False
    
class EditPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'attachment']  # Fields that can be edited
        read_only_fields = ['author', 'created_at', 'updated_at']  # Fields that shouldn't change

class EditCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']  # Only content can be edited
        read_only_fields = ['author', 'post', 'created_at', 'updated_at']  # These fields shouldn't change
