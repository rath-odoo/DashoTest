from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination  # For pagination
from .models import Post,Comment
from institute.models import GroupMembership
from .serializers import PostSerializer, CommentSerializer, PostWithCommentsSerializer,EditPostSerializer, EditCommentSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
User = get_user_model()

from itertools import chain

class CreatePostView(APIView):

    def post(self, request, user_id):
        # Get the current user model
        User = get_user_model()

        # Fetch the user with the given user_id
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Use the PostWithCommentsSerializer to validate and save the new post
        serializer = PostWithCommentsSerializer(data=request.data)
        if serializer.is_valid():
            # Set the author to the user obtained from user_id
            post = serializer.save(author=user)  # Create the new post

            # Serialize the post with nested comments and other information
            serialized_post = PostWithCommentsSerializer(post)
            return Response(serialized_post.data, status=status.HTTP_201_CREATED)  # Return the created post
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
class AddCommentView(APIView):
 
    def post(self, request, post_id, user_id):
        # Fetch the user from the given user_id
        User = get_user_model()  # Get the current user model
        try:
            user = User.objects.get(id=user_id)  # Retrieve the user based on user_id
        except User.DoesNotExist:
            return Response(
                {"error": "User not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if the user is authenticated
        if user.is_anonymous:  # This check is needed if you're not using permission classes
            return Response(
                {"error": "Authentication required to add comments."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            post = Post.objects.get(id=post_id)  # Retrieve the post
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found with the provided ID."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            # Save the new comment with the specified user as the author
            comment = serializer.save(post=post, author=user)

            # Serialize the post with all comments and additional data
            post_serializer = PostWithCommentsSerializer(post)
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EditPostView(APIView):
 
    def put(self, request, post_id, user_id):
        try:
            post = Post.objects.get(id=post_id)  # Retrieve the post by ID
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if the author of the post matches the user ID from the URL
        if post.author_id != user_id:
            return Response(
                {"error": "You are not authorized to edit this post."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EditPostSerializer(post, data=request.data, partial=True)  # Use partial updates
        if serializer.is_valid():
            serializer.save()  # Update the post
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If serializer is not valid, return error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class EditCommentView(APIView):
 
    def put(self, request, post_id, comment_id, user_id):
        try:
            comment = Comment.objects.get(id=comment_id, post_id=post_id)  # Retrieve the comment by ID and post ID
        except Comment.DoesNotExist:
            return Response(
                {"error": "Comment not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Ensure the comment belongs to the specified user
        if comment.author_id != user_id:
            return Response(
                {"error": "You are not authorized to edit this comment."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = EditCommentSerializer(comment, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()  # Update the comment
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LikePostView(APIView):

    def post(self, request, user_id, post_id):
        try:
            post = Post.objects.get(id=post_id)  # Retrieve the post by ID
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if post.likes.filter(id=user_id).exists():
            # If the user has already liked the post, remove the like (unlike)
            post.likes.remove(user_id)
            return Response({"message": "Post unliked successfully."}, status=status.HTTP_200_OK)
        else:
            # Add the user to the liked users of the post
            post.likes.add(user_id)
            return Response({"message": "Post liked successfully."}, status=status.HTTP_200_OK)

class DeletePostView(APIView):

    def delete(self, request, user_id, post_id):
        try:
            post = Post.objects.get(id=post_id)  # Retrieve the post by ID
        except Post.DoesNotExist:
            return Response(
                {"error": "Post not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if post.author_id != user_id:
            return Response(
                {"error": "You are not authorized to perform this action."},
                status=status.HTTP_403_FORBIDDEN
            )
        post.delete()  # Delete the post
        return Response({"message": "Post deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
class DeleteCommentView(APIView):

    def delete(self, request, user_id, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)  # Retrieve the comment by ID
        except Comment.DoesNotExist:
            return Response(
                {"error": "Comment not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Ensure the comment belongs to the specified user
        if comment.author_id != user_id:
            return Response(
                {"error": "You are not authorized to edit this comment."},
                status=status.HTTP_403_FORBIDDEN
            )
        comment.delete()  # Delete the comment
        return Response({"message": "Comment deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

# Custom pagination class to control page size
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100  # Default number of results per page
    page_size_query_param = 'page_size'  # Allow clients to request a specific page size
    max_page_size = 1000  # Maximum page size to prevent large requests

class PostListView(generics.ListAPIView):
    serializer_class = PostWithCommentsSerializer
    pagination_class = StandardResultsSetPagination  # Use custom pagination
    filter_backends = [filters.OrderingFilter]  # For ordering support
    ordering_fields = ['updated_at', 'created_at']  # Allow ordering by these fields

    def get_queryset(self):
        queryset = Post.objects.all().order_by('-updated_at')  # Default ordering by updated_at

        # Retrieve query parameters
        params = self.request.query_params
        user_id = params.get('user_id', None)  # Filter by user_id (author_id)
        post_id = params.get('post_id', None)  # Filter by post ID

        # Apply filtering based on user_id
        if user_id:
            queryset = queryset.filter(author_id=user_id)
            print ("user_id", user_id)
        # Apply filtering based on post_id
        if post_id:
            queryset = queryset.filter(id=post_id)
            print ("user_id", post_id)

        # Filter posts by user's contacts if user is authenticated
        print ("self.request.user.is_authenticated: ", self.request.user.is_authenticated)
        if self.request.user.is_authenticated:
            #user_contacts = self.get_user_contacts(self.request.user)  # should not be used this way
            user_contacts = self.request.user.contacts.all(); # Added by Bibhu
            print ("user_contacts", user_contacts)
            #user_self = User.objects.filter(id=self.request.user.id) # redundant
            user_self = self.request.user; # added by Bibhu
            #user_contacts = list(chain(user_contacts, user_self))
            combined_contacts = list(chain(user_contacts, [self.request.user]))
            queryset = queryset.filter(author__in=combined_contacts)

        return queryset  # Return the filtered and ordered queryset

    def get_user_contacts(self, user):
        """
        Method to get a list of users who are contacts of the current user.
        Below function adds contacts who are members of the same group.
        """
        group_ids = GroupMembership.objects.filter(user=user).values_list('group_id', flat=True)
        user_contacts = User.objects.filter(groupmembership__group_id__in=group_ids).distinct()
        return user_contacts

    def get_serializer_context(self):
        context = super().get_serializer_context()
        user_id = self.request.query_params.get('user_id')
        context['user_id'] = user_id  # Pass the user_id to the serializer context
        # context['request'] = self.request  # Pass the request to the serializer context
        return context
