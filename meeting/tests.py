# from django.test import TestCase
# from rest_framework.test import APITestCase
# from django.urls import reverse
# from rest_framework import status
# from .models import Meeting, Presentation
# from django.contrib.auth import get_user_model
# from django.core.exceptions import ValidationError

# User = get_user_model()

# class MeetingTestCase(APITestCase):
#     @classmethod
#     def setUpTestData(cls):
#         cls.user = User.objects.create_user(username='testuser', password='testpassword')
    
#     def setUp(self):
#         self.client.force_authenticate(user=self.user)

#     def test_create_one_meeting(self):
#         url = reverse('create_one_meeting_view')
#         data = {
#             'name': 'Test Meeting',
#             'about': 'This is a test meeting',
#             'courseId': 1,
#             'serialNo': 1,
#             'meetingStatus': 'scheduled',
#             'datetime': '2023-08-08T12:00:00Z',
#             'duration': 60,
#             'meetingLink': 'https://example.com/meeting',
#             'address': '123 Example Street',
#             'creater': self.user.id  # Use user id if your serializer expects it
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Meeting.objects.count(), 1)
#         self.assertEqual(Meeting.objects.get().name, 'Test Meeting')

#     def test_create_meeting_missing_name(self):
#         url = reverse('create_one_meeting_view')
#         data = {
#             'about': 'This is a test meeting without a name',
#             'courseId': 1,
#             'serialNo': 1,
#             'meetingStatus': 'scheduled',
#             'datetime': '2023-08-08T12:00:00Z',
#             'duration': 60,
#             'meetingLink': 'https://example.com/meeting',
#             'address': '123 Example Street',
#             'creater': self.user.id  # Use user id if your serializer expects it
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_get_meeting_by_id(self):
#         meeting = Meeting.objects.create(
#             name='Test Meeting',
#             about='This is a test meeting',
#             courseId=1,
#             serialNo=1,
#             meetingStatus='scheduled',
#             datetime='2023-08-08T12:00:00Z',
#             duration=60,
#             meetingLink='https://example.com/meeting',
#             address='123 Example Street',
#             creater=self.user
#         )
#         url = reverse('meetingobjbyid', args=[meeting.id])
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['name'], 'Test Meeting')
#         self.assertEqual(response.data['creater'], self.user.id)

#     def test_update_meeting(self):
#         meeting = Meeting.objects.create(
#             name='Test Meeting',
#             about='This is a test meeting',
#             courseId=1,
#             serialNo=1,
#             meetingStatus='scheduled',
#             datetime='2023-08-08T12:00:00Z',
#             duration=60,
#             meetingLink='https://example.com/meeting',
#             address='123 Example Street',
#             creater=self.user
#         )
#         url = reverse('editmeetingurls', args=[meeting.id])
#         data = {
#             'name': 'Updated Test Meeting',
#             'about': 'This is an updated test meeting',
#             'meetingStatus': 'ongoing'
#         }
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         updated_meeting = Meeting.objects.get(id=meeting.id)
#         self.assertEqual(updated_meeting.name, 'Updated Test Meeting')
#         self.assertEqual(updated_meeting.meetingStatus, 'ongoing')

#     def test_delete_meeting(self):
#         meeting = Meeting.objects.create(
#             name='Test Meeting',
#             about='This is a test meeting',
#             courseId=1,
#             serialNo=1,
#             meetingStatus='scheduled',
#             datetime='2023-08-08T12:00:00Z',
#             duration=60,
#             meetingLink='https://example.com/meeting',
#             address='123 Example Street',
#             creater=self.user
#         )
#         url = reverse('meetingobjbyid', args=[meeting.id])
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Meeting.objects.count(), 0)

#     def test_meeting_invalid_data(self):
#         with self.assertRaises(ValidationError):
#             meeting = Meeting(name='', datetime='invalid-datetime', creater=self.user)
#             meeting.full_clean()  # This will raise ValidationError for invalid data

#     def test_create_meeting_unauthenticated(self):
#         self.client.logout()  # Ensure no user is authenticated
#         url = reverse('create_one_meeting_view')
#         data = {
#             'name': 'Test Meeting',
#             'about': 'This is a test meeting',
#             'courseId': 1,
#             'serialNo': 1,
#             'meetingStatus': 'scheduled',
#             'datetime': '2023-08-08T12:00:00Z',
#             'duration': 60,
#             'meetingLink': 'https://example.com/meeting',
#             'address': '123 Example Street'
#             # No 'creater' field because the user is not authenticated
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


# class PresentationTestCase(APITestCase):
#     @classmethod
#     def setUpTestData(cls):
#         cls.user = User.objects.create_user(username='testuser', password='testpassword')

#     def setUp(self):
#         self.client.force_authenticate(user=self.user)

#     def test_create_presentation(self):
#         meeting = Meeting.objects.create(
#             name='Test Meeting',
#             about='This is a test meeting',
#             courseId=1,
#             serialNo=1,
#             meetingStatus='scheduled',
#             datetime='2023-08-08T12:00:00Z',
#             duration=60,
#             meetingLink='https://example.com/meeting',
#             address='123 Example Street',
#             creater=self.user
#         )
#         url = reverse('create_presentation')
#         data = {
#             'talktitle': 'Test Presentation',
#             'talktime': '12:00:00',
#             'duration': 30,
#             'speaker': self.user.id,
#             'outspeaker': 'External Speaker',
#             'meetingid': meeting.id  # Ensure the meeting exists before referencing it
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Presentation.objects.count(), 1)
#         self.assertEqual(Presentation.objects.get().talktitle, 'Test Presentation')

#     def test_update_presentation(self):
#         presentation = Presentation.objects.create(
#             talktitle='Test Presentation',
#             talktime='12:00:00',
#             duration=30,
#             speaker=self.user,
#             outspeaker='External Speaker'
#         )
#         url = reverse('ppt_put', args=[presentation.id])
#         data = {
#             'duration': 45
#         }
#         response = self.client.patch(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         updated_presentation = Presentation.objects.get(id=presentation.id)
#         self.assertEqual(updated_presentation.duration, 45)

#     def test_delete_presentation(self):
#         presentation = Presentation.objects.create(
#             talktitle='Test Presentation',
#             talktime='12:00:00',
#             duration=30,
#             speaker=self.user,
#             outspeaker='External Speaker'
#         )
#         url = reverse('ppt_delete', args=[presentation.id])
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Presentation.objects.count(), 0)

#     def test_create_presentation_unauthenticated(self):
#         self.client.logout()  # Ensure no user is authenticated
#         url = reverse('create_presentation')
#         data = {
#             'talktitle': 'Test Presentation',
#             'talktime': '12:00:00',
#             'duration': 30,
#             'outspeaker': 'External Speaker'
#             # No 'speaker' field because the user is not authenticated
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
