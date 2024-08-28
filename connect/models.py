from django.conf import settings  # Import settings for AUTH_USER_MODEL
from django.db import models
from django.utils import timezone
from institute.models import Group



# Model for social media-style posts
class Post(models.Model):
    # User who created the post
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='authored_posts'
    )

    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='posts',
        default=1
    )

    # Title of the post (optional)
    title = models.CharField(max_length=255, blank=True, null=True)

    # Main content of the post
    content = models.TextField(blank=False, null=False)

    # Timestamp for when the post was created
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    attachment = models.FileField(blank=True, null=True)

    # Users who liked the post
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name='liked_posts',
    )

    # Related people who interact with this post
    people = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name='interacted_posts'
    )

    def __str__(self):
        return f"Post by {self.author} at {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}" or "Unnamed"

# Model for comments on posts
class Comment(models.Model):
    # Post associated with this comment
    post = models.ForeignKey(
        'Post',
        on_delete=models.CASCADE,
        related_name='comments'  # Correct ForeignKey relationship
    )

    # User who authored the comment
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='authored_comments'
    )

    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name='comments',
        null=True,
        blank=True,
        default=1
    )

    # Content of the comment
    content = models.TextField(blank=False, null=False)

    # Timestamp for when the comment was created
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Comment by {self.author} at {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}" or "Unnamed"


