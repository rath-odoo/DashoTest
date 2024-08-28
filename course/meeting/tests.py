from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import Meeting, Presentation, Talkfile
from django.contrib.auth import get_user_model
User = get_user_model()

class MeetingTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_create_one_meeting(self):
        url = reverse('create_one_meeting_view')
        data = {
            'name': 'Test Meeting',
            'about': 'This is a test meeting',
            'courseId': 1,
            'serialNo': 1,
            'meetingStatus': 'scheduled',
            'datetime': '2023-08-08T12:00:00Z',
            'duration': 60,
            'meetingLink': 'https://example.com/meeting',
            'address': '123 Example Street',
            'creater': self.user.username
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Meeting.objects.count(), 1)
        self.assertEqual(Meeting.objects.get().name, 'Test Meeting')

    def test_get_meeting_by_id(self):
        meeting = Meeting.objects.create(
            name='Test Meeting',
            about='This is a test meeting',
            courseId=1,
            serialNo=1,
            meetingStatus='scheduled',
            datetime='2023-08-08T12:00:00Z',
            duration=60,
            meetingLink='https://example.com/meeting',
            address='123 Example Street',
            creater=self.user
        )
        url = reverse('meetingobjbyid', args=[meeting.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Meeting')

    def test_update_meeting(self):
        meeting = Meeting.objects.create(
            name='Test Meeting',
            about='This is a test meeting',
            courseId=1,
            serialNo=1,
            meetingStatus='scheduled',
            datetime='2023-08-08T12:00:00Z',
            duration=60,
            meetingLink='https://example.com/meeting',
            address='123 Example Street',
            creater=self.user
        )
        url = reverse('editmeetingurls', args=[meeting.id])
        data = {
            'name': 'Updated Test Meeting',
            'about': 'This is an updated test meeting',
            'meetingStatus': 'ongoing'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_meeting = Meeting.objects.get(id=meeting.id)
        self.assertEqual(updated_meeting.name, 'Updated Test Meeting')
        self.assertEqual(updated_meeting.meetingStatus, 'ongoing')

    def test_delete_meeting(self):
        meeting = Meeting.objects.create(
            name='Test Meeting',
            about='This is a test meeting',
            courseId=1,
            serialNo=1,
            meetingStatus='scheduled',
            datetime='2023-08-08T12:00:00Z',
            duration=60,
            meetingLink='https://example.com/meeting',
            address='123 Example Street',
            creater=self.user
        )
        url = reverse('meetingobjbyid', args=[meeting.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Meeting.objects.count(), 0)

class PresentationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_create_presentation(self):
        url = reverse('create_presentation')
        data = {
            'talktitle': 'Test Presentation',
            'talktime': '12:00:00',
            'duration': 30,
            'speaker': self.user.id,
            'outspeaker': 'External Speaker',
            'meetingid': 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Presentation.objects.count(), 1)
        self.assertEqual(Presentation.objects.get().talktitle, 'Test Presentation')

    def test_update_presentation(self):
        presentation = Presentation.objects.create(
            talktitle='Test Presentation',
            talktime='12:00:00',
            duration=30,
            speaker=self.user,
            outspeaker='External Speaker'
        )
        url = reverse('ppt_put', args=[presentation.id])
        data = {
            'duration': 45
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_presentation = Presentation.objects.get(id=presentation.id)
        self.assertEqual(updated_presentation.duration, 45)

    def test_delete_presentation(self):
        presentation = Presentation.objects.create(
            talktitle='Test Presentation',
            talktime='12:00:00',
            duration=30,
            speaker=self.user,
            outspeaker='External Speaker'
        )
        url = reverse('ppt_delete', args=[presentation.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Presentation.objects.count(), 0)