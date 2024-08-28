from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Post, Comment, Group
from .serializers import PostWithCommentsSerializer
import json

User = get_user_model()

class ConnectAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.group = Group.objects.create(name='Test Group')
        self.post = Post.objects.create(author=self.user, content='Test post content', group=self.group)
        self.comment = Comment.objects.create(post=self.post, author=self.user, content='Test comment content')

    def test_create_post(self):
        url = reverse('create_post', kwargs={'user_id': self.user.id})
        data = {'title': 'Test Title', 'content': 'Test Content'}
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)
        self.assertEqual(Post.objects.latest('id').title, 'Test Title')

    def test_add_comment(self):
        url = reverse('add_comment', kwargs={'post_id': self.post.id, 'user_id': self.user.id})
        data = {'content': 'New comment'}
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 2)
        self.assertEqual(Comment.objects.latest('id').content, 'New comment')

    def test_edit_post(self):
        url = reverse('edit_post', kwargs={'post_id': self.post.id, 'user_id': self.user.id})
        data = {'title': 'Updated Title', 'content': 'Updated Content'}
        self.client.force_authenticate(user=self.user)
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, 'Updated Title')
        self.assertEqual(self.post.content, 'Updated Content')

    def test_edit_comment(self):
        url = reverse('edit_comment', kwargs={'post_id': self.post.id, 'comment_id': self.comment.id, 'user_id': self.user.id})
        data = {'content': 'Updated comment'}
        self.client.force_authenticate(user=self.user)
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.comment.refresh_from_db()
        self.assertEqual(self.comment.content, 'Updated comment')

    def test_like_post(self):
        url = reverse('like_post', kwargs={'user_id': self.user.id, 'post_id': self.post.id})
        self.client.force_authenticate(user=self.user)
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertTrue(self.post.likes.filter(id=self.user.id).exists())

    def test_delete_post(self):
        url = reverse('delete_post', kwargs={'user_id': self.user.id, 'post_id': self.post.id})
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)

    def test_delete_comment(self):
        url = reverse('delete_comment', kwargs={'user_id': self.user.id, 'comment_id': self.comment.id})
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Comment.objects.count(), 0)

    def test_post_list(self):
        url = reverse('post-list')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)  # Assuming pagination is used

    def test_post_list_with_filters(self):
        url = reverse('post-list')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url, {'user_id': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

        # Test with non-existent user_id
        response = self.client.get(url, {'user_id': 9999})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_unauthorized_access(self):
        # Test creating a post without authentication
        url = reverse('create_post', kwargs={'user_id': self.user.id})
        data = {'title': 'Test Title', 'content': 'Test Content'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_serialization(self):
        serializer = PostWithCommentsSerializer(self.post, context={'request': None, 'user_id': self.user.id})
        data = serializer.data
        self.assertEqual(data['id'], self.post.id)
        self.assertEqual(data['content'], self.post.content)
        self.assertEqual(data['comment_count'], 1)
        self.assertEqual(data['like_count'], 0)
        self.assertEqual(len(data['comments']), 1)