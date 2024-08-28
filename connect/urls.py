from django.urls import path
from .views import CreatePostView, AddCommentView, EditCommentView, EditPostView, LikePostView, DeletePostView, DeleteCommentView, PostListView

urlpatterns = [
 path('create-post/<int:user_id>/', CreatePostView.as_view(), name='create_post'),  # User ID as URL parameter
    path('add-comment/<int:post_id>/by/<int:user_id>/', AddCommentView.as_view(), name='add_comment'),
    path('edit-post/<int:post_id>/by/<int:user_id>/', EditPostView.as_view(), name='edit_post'),  # URL to edit a post
    path('edit-comment/<int:post_id>/comment/<int:comment_id>/by/<int:user_id>/', EditCommentView.as_view(), name='edit_comment'),
    path('like-post/<int:user_id>/posts/<int:post_id>/', LikePostView.as_view(), name='like_post'),
    path('delete-post/<int:user_id>/posts/<int:post_id>/', DeletePostView.as_view(), name='delete_post'),
    path('delete-post/<int:user_id>/comment/<int:comment_id>/', DeleteCommentView.as_view(), name='delete_comment'),
    path('posts/', PostListView.as_view(), name='post-list'),


]
