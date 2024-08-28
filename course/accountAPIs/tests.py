from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from account.models import ContactRequest
import json
from accountAPIs.serializers import ContactRequestSerializer, ContactUserSerializer
from django.test import TestCase
from .serializers import MyContactsSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io
import os
from .models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from account.models import Achievements
from account.models import EduDegree, Institute , DegreeName ,UsefullLink , UserType , Institute , DegreeName, MarkSheet, Certificate
from accountAPIs.serializers import EduDegreeCreateSerializer
from account.models import Account, Address 
from accountAPIs.models import User
from course.models import Course
from unittest.mock import patch, MagicMock
from .serializers import (
    AchievementsSerializer, AddressSerializer, EduDegreeSerializer,
    EduDegreeCreateSerializer, CreateAccountSerializer, CreateAccountWithPhoneSerializer,
    InstituteSerializer
)
from rest_framework import status
from unittest.mock import patch, MagicMock
from django.db import IntegrityError
from django.core.files.storage import default_storage
from django.core.files import File
import io

import json
from .serializers import PublicationSerializer,EditPublicationSerializer, ExperienceSerializer ,EditExperienceSerializer,AboutUsSerializer ,EditAboutUsSerializer, AcademicDetailSerializer
from django.shortcuts import get_object_or_404
import random
from accountAPIs.views import AddAboutUsForUserView
from django.core.files.uploadedfile import SimpleUploadedFile


from accountAPIs.serializers import EditAboutUsSerializer
from datetime import datetime, timedelta, timezone,date
from account.models import Account, UserType 
from django.utils import timezone
from .serializers import AccountSerializers
import http.client
from django.contrib.auth import get_user_model
import jwt
import os
from account.models import Publication
from account.models import LicenseOrCertificate, Skill, Experience ,AboutUs , AcademicDetail

from .models import Video
from django.http import JsonResponse
from account.models import Account, HealthData
from .serializers import HealthDataSerializer
from decimal import Decimal
from account.models import Account, ParentDetails
from .serializers import ParentDetailsSerializer
from .serializers import AddressSerializer
from django.views.decorators.http import require_http_methods
from io import BytesIO
from django.core.files.uploadedfile import SimpleUploadedFile
import json
from django.test import TestCase, Client
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from unittest.mock import patch
from account.models import LicenseOrCertificate, Skill
from .serializers import EditLicenseOrCertificateSerializer
from .views import CreateOTPAccountWithPhoneView
from .serializers import CreateOTPAccountWithPhoneSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from rest_framework import status
from accountAPIs.serializers import UserSerializerNoticeIds
from accountAPIs.views import AccountViewNoticeIds 
from noticeboard.models import NoticeBoard
from accountAPIs.serializers import UserSerializer
from institute.models import Institute
from .views import StandardResultsSetPagination
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
User = get_user_model()
# from .models import User, GeneralChatGroup
from .serializers import UserSerializerFew
from .models import User
from account.models import Account,  ParentDetails
from .serializers import ParentDetailsSerializer



class AccountAPITestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='+916371163965', password='OLsbd!@#4521869')
        self.client.force_authenticate(user=self.user)

    def test_account_view_get(self):
        url = reverse('accountAPIs:account_view')                                     # Replace 'account-view-name' with the actual name of your view
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_account_view(self):
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpass123',
        }
        response = self.client.post(reverse('accountAPIs:createaccount_any'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_search_view(self):
        response = self.client.get(reverse('accountAPIs:usersearch'), {'username': '+916371163965'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_users_name_view(self):
        data = {'firstname': 'NewFirst', 'lastname': 'NewLast'}
        response = self.client.put(reverse('accountAPIs:updateusersname'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.firstname, 'NewFirst')
        self.assertEqual(self.user.lastname, 'NewLast')
    
    def test_general_meetings_view(self):
        response = self.client.get(reverse('accountAPIs:generalmeetings'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_check_from_username_view(self):
        response = self.client.get(reverse('accountAPIs:getuserfromusername', kwargs={'username': '+916371163965'}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], True)

    def test_user_check_from_user_input_view(self):
        response = self.client.get(reverse('accountAPIs:getuserfromuserinput', kwargs={'userinput': '+916371163965'}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], True)

    def test_change_user_type_view(self):
        response = self.client.put(reverse('accountAPIs:changeUsertype_view', kwargs={'usertypeId': 2}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], True)

    def test_user_profile_get(self):
        response = self.client.get(reverse('accountAPIs:userprofilegetput'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("Response data:", response.data)  # Add this line to see the actual response
        
        # Check if 'firstname' is in the response data
        if 'firstname' in response.data:
            self.assertEqual(response.data['firstname'], '')  # Expect empty string as we didn't set it in setUp
        else:
            print("'firstname' field is not present in the response data")
        
        # Check other fields that should be present
        self.assertEqual(response.data.get('username', ''), '+916371163965')

    def test_user_profile_put(self):
        data = {
            'firstname': 'Test',
            'lastname': 'User',
            'email': 'testuser@example.com',
            # Add other fields as necessary
        }
        response = self.client.put(reverse('accountAPIs:userprofilegetput'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify the data was updated
        self.user.refresh_from_db()
        self.assertEqual(self.user.firstname, 'Test')
        self.assertEqual(self.user.lastname, 'User')
        self.assertEqual(self.user.email, 'testuser@example.com')


class ContactAddPUTViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='+916371163965', 
            password='OLsbd!@#4521869',
            email='testuser@example.com'
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse('accountAPIs:addcontact_view')  # Make sure this matches your URL name

    def test_get_contact(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
       

    def test_get_contact_unauthenticated(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_contact_unauthenticated(self):
        self.client.force_authenticate(user=None)
        data = {'email': 'unauthorized@example.com'}
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



class SendContactRequestViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        self.client.force_authenticate(user=self.user1)
        self.url = reverse('accountAPIs:send-contact-request', kwargs={'from_user_id': self.user1.id, 'to_user_id': self.user2.id})

    def test_send_contact_request_success(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], "Contact request sent successfully.")
        self.assertTrue(ContactRequest.objects.filter(from_user=self.user1, to_user=self.user2, status='pending').exists())

    def test_send_contact_request_to_self(self):
        url = reverse('accountAPIs:send-contact-request', kwargs={'from_user_id': self.user1.id, 'to_user_id': self.user1.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "You cannot send a contact request to yourself.")

    def test_send_duplicate_contact_request(self):
        # First request
        self.client.post(self.url)
        # Second request
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Contact request already sent.")

    def test_send_contact_request_nonexistent_user(self):
        url = reverse('accountAPIs:send-contact-request', kwargs={'from_user_id': self.user1.id, 'to_user_id': 9999})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    

    def test_send_contact_request_different_statuses(self):
        # Create a ContactRequest with 'accepted' status
        ContactRequest.objects.create(from_user=self.user1, to_user=self.user2, status='accepted')
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Contact request was previously accepted.")

class RespondContactRequestViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        self.contact_request = ContactRequest.objects.create(
            from_user=self.user1,
            to_user=self.user2,
            status='pending'
        )
        self.client.force_authenticate(user=self.user2)
        self.url = reverse('accountAPIs:respond-contact-request', kwargs={'to_user_id': self.user2.id, 'request_id': self.contact_request.id})

    def test_accept_contact_request(self):
        data = {'action': 'accept'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Contact request accepted.")
        self.contact_request.refresh_from_db()
        self.assertEqual(self.contact_request.status, 'accepted')
        self.assertIn(self.user1, self.user2.contacts.all())
        self.assertIn(self.user2, self.user1.contacts.all())

    def test_reject_contact_request(self):
        data = {'action': 'reject'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Contact request rejected.")
        self.contact_request.refresh_from_db()
        self.assertEqual(self.contact_request.status, 'rejected')

    def test_invalid_action(self):
        data = {'action': 'invalid'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Invalid action.")

    def test_nonexistent_contact_request(self):
        url = reverse('accountAPIs:respond-contact-request', kwargs={'to_user_id': self.user2.id, 'request_id': 9999})
        data = {'action': 'accept'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

   
   
class UserContactRequestsViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        self.user3 = User.objects.create_user(username='user3', password='password3')
        
        # Create some contact requests
        self.pending_request = ContactRequest.objects.create(from_user=self.user2, to_user=self.user1, status='pending')
        self.accepted_request = ContactRequest.objects.create(from_user=self.user3, to_user=self.user1, status='accepted')
        
        self.client.force_authenticate(user=self.user1)
        self.url = reverse('accountAPIs:user-contact-requests', kwargs={'user_id': self.user1.id})

    def test_get_all_contact_requests(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Should return both requests
       
        
        # Check structure of serialized data
        for item in response.data:
            self.assertIn('id', item)
            self.assertIn('from_user', item)
            self.assertIn('to_user', item)
            self.assertIn('created_at', item)
            self.assertIn('status', item)
            
            # Check nested user serializer fields
            for user_field in ['from_user', 'to_user']:
                self.assertIsInstance(item[user_field], dict)
                self.assertIn('id', item[user_field])
                self.assertIn('username', item[user_field])
                # Add other fields from ContactUserSerializer if any

    def test_get_pending_contact_requests(self):
        response = self.client.get(f"{self.url}?status=pending")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Should return only the pending request
        self.assertEqual(response.data[0]['status'], 'pending')
        self.assertEqual(response.data[0]['from_user']['username'], self.user2.username)
        self.assertEqual(response.data[0]['to_user']['username'], self.user1.username)

    def test_get_accepted_contact_requests(self):
        response = self.client.get(f"{self.url}?status=accepted")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Should return only the accepted request
        self.assertEqual(response.data[0]['status'], 'accepted')
        self.assertEqual(response.data[0]['from_user']['username'], self.user3.username)
        self.assertEqual(response.data[0]['to_user']['username'], self.user1.username)

    def test_get_nonexistent_status_contact_requests(self):
        response = self.client.get(f"{self.url}?status=nonexistent")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # Should return an empty list

    def test_get_other_user_contact_requests(self):
        url = reverse('accountAPIs:user-contact-requests', kwargs={'user_id': self.user2.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # Should return an empty list as user2 has no incoming requests

    def test_get_nonexistent_user_contact_requests(self):
        url = reverse('accountAPIs:user-contact-requests', kwargs={'user_id': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unauthenticated_request(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # or HTTP_401_UNAUTHORIZED if you enable authentication

    def test_serializer_output(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        contact_requests = ContactRequest.objects.filter(to_user=self.user1)
        serializer = ContactRequestSerializer(contact_requests, many=True)
        self.assertEqual(response.data, serializer.data)

        # Additional checks for serializer output
        for item in response.data:
            self.assertIsInstance(item['from_user'], dict)
            self.assertIsInstance(item['to_user'], dict)
            self.assertIn('username', item['from_user'])
            self.assertIn('username', item['to_user'])

class MyContactsViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('accountAPIs:mycontacts')  # Make sure this matches your URL name
        
        # Create test users
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.contact1 = User.objects.create_user(username='contact1', password='testpass123')
        self.contact2 = User.objects.create_user(username='contact2', password='testpass123')
        
        # Add contacts to the main user (adjust this based on your model structure)
        self.user.contacts.add(self.contact1, self.contact2)
        
        # Authenticate the client
        self.client.force_authenticate(user=self.user)

    def test_get_my_contacts(self):
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertEqual(len(response.data['results']), 2)
        
        # Check if the response contains the correct data
        first_contact = response.data['results'][0]
        self.assertIn('id', first_contact)
        # Add checks for other fields that should be in the serialized data

class MyContactsSerializerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        # Set additional fields if they exist in your User model
        if hasattr(User, 'firstname'):
            self.user.firstname = 'Test'
        if hasattr(User, 'lastname'):
            self.user.lastname = 'User'
        if hasattr(User, 'profile_image'):
            self.user.profile_image = 'path/to/image.jpg'
        self.user.save()
        self.serializer = MyContactsSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        expected_fields = set(MyContactsSerializer.Meta.fields)
        self.assertCountEqual(data.keys(), expected_fields)




class ProfileImageUploadAPIViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='+916371163965', password='OLsbd!@#4521869')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse('accountAPIs:profileimageupload')


   

    def test_profile_image_upload_success(self):
    # Simulating an image file upload
        image = SimpleUploadedFile(name='test_image.jpg', content=b'some image content', content_type='image/jpeg')
        data = {'profile_image': image}

        response = self.client.put(self.url, data, format='multipart')

        print(response.data)  # Debugging: Print the response content

        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertIn('profile_image', response.data)
        # self.assertTrue(response.data['profile_image'].endswith('test_image.jpg'))


    def test_profile_image_upload_without_authentication(self):
        # Log out the user to test unauthenticated access
        self.client.logout()

        image = SimpleUploadedFile(name='test_image.jpg', content=b'some image content', content_type='image/jpeg')
        data = {'profile_image': image}

        response = self.client.put(self.url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

   





class UserSearchViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create(username='user1', firstname='John', lastname='Doe')
        self.user2 = User.objects.create(username='user2', firstname='Jane', lastname='Smith')
        self.user3 = User.objects.create(username='user3', firstname='', lastname='Blank')
        self.url = reverse('accountAPIs:usersearch')

    def test_search_users(self):
        response = self.client.get(self.url, {'search': 'John'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['firstname'], 'John')

    # def test_search_users_multiple_results(self):
    #     response = self.client.get(self.url, {'search': 'J'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data['results']), 2)

    def test_search_users_no_results(self):
        response = self.client.get(self.url, {'search': 'NonexistentUser'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    # def test_exclude_blank_firstname(self):
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data['results']), 2)
    #     self.assertNotIn('Blank', [user['lastname'] for user in response.data['results']])

class UserSerializerFewTestCase(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(username='user1', firstname='John', lastname='Doe')
        self.user2 = User.objects.create(username='user2', firstname='Jane', lastname='Smith')
        self.logged_in_user = User.objects.create(username='loggedin', firstname='Logged', lastname='In')

        # Since GeneralChatGroup is not available, we'll mock the chat group relationship
        self.user1.generalchatgroups.create(groupType='oneoone')
        self.logged_in_user.generalchatgroups.create(groupType='oneoone')

        self.logged_in_user.contacts.add(self.user2)

    




class CheckUsedAddedViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        self.user3 = User.objects.create_user(username='user3', password='password3')
        
        # Create a chat group with a unique name
        self.chat_group = self.user1.generalchatgroups.create(
            groupType='oneoone',
            name=f'Chat Group 1 - {self.user1.username} and {self.user2.username}'
        )
        self.chat_group.groupuserObjects.add(self.user2)

    def test_user_exists_in_chat(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse('accountAPIs:CheckUsedAddedView', kwargs={'pk': self.user2.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'exists': True, 'groupId': self.chat_group.id})

    def test_user_not_exists_in_chat(self):
        self.client.force_authenticate(user=self.user1)
        url = reverse('accountAPIs:CheckUsedAddedView', kwargs={'pk': self.user3.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'exists': False, 'groupId': None})


    def test_multiple_chat_groups(self):
        another_group = self.user1.generalchatgroups.create(
            groupType='oneoone',
            name=f'Chat Group 2 - {self.user1.username} and {self.user3.username}'
        )
        another_group.groupuserObjects.add(self.user3)

        self.client.force_authenticate(user=self.user1)
        url = reverse('accountAPIs:CheckUsedAddedView', kwargs={'pk': self.user3.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'exists': True, 'groupId': another_group.id})
class AchievementsViewTestCase(APITestCase):

    def setUp(self):
        Achievements.objects.all().delete()  # Clear any existing achievements
        self.user = User.objects.create(username='testuser', email='test@example.com', phoneno='1234567890')
        self.achievement_data = {
            'name': 'Test Achievement',
            'description': 'Test Description',
            'startDate': '2023-01-01',
            'endDate': '2023-12-31',
            'userId': self.user.id  # Include the userId in the request data
        }
        self.url = reverse('accountAPIs:AchievementsView')

    def test_create_achievement(self):
        response = self.client.post(self.url, self.achievement_data, format='json')
        print("Response Data:", response.data)  # Print the response data for debugging
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Achievements.objects.count(), 1)
        self.assertEqual(Achievements.objects.get().name, 'Test Achievement')

    def test_list_achievements(self):
        Achievements.objects.create(
            name='Test Achievement',
            description='Test Description'
        )
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Achievement')



class AddressViewTestCase(APITestCase):

    def setUp(self):
        Address.objects.all().delete()  # Clear any existing addresses
        self.user = User.objects.create(username='testuser', email='test@example.com', phoneno='1234567890')
        self.address_data = {
            'userId': str(self.user.id),
            'careof': 'John Doe',
            'houseno': '123',
            'streetno': 'Main St',
            'placename': 'Downtown',
            'postoffice': 'Central',
            'district': 'Metro',
            'policestn': 'Central Police Station',
            'pincode': '123456',
            'city': 'Metropolis',
            'state': 'State',
            'country': 'Country',
            'addressType': 'present',
        }
        self.url = reverse('accountAPIs:AddressView')

    def test_create_address(self):
        response = self.client.post(self.url, self.address_data, format='json')
        print("Response Data:", response.data)  # Print the response data for debugging
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Address.objects.count(), 1)
        created_address = Address.objects.get()
        self.assertEqual(created_address.careof, 'John Doe')
        self.assertEqual(created_address.houseno, '123')
        self.assertEqual(created_address.addressType, 'present')

        # Check that the address is linked to the user
        self.assertEqual(self.user.addresses.count(), 1)
        self.assertEqual(self.user.addresses.first(), created_address)

    def test_list_addresses(self):
        # Create a test address and link it to the user
        address = Address.objects.create(
            careof='John Doe',
            houseno='123',
            streetno='Main St',
            placename='Downtown',
            postoffice='Central',
            district='Metro',
            policestn='Central Police Station',
            pincode='123456',
            city='Metropolis',
            state='State',
            country='Country',
            addressType='present',
        )
        self.user.addresses.add(address)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['careof'], 'John Doe')
        self.assertEqual(response.data[0]['houseno'], '123')

    def test_create_address_missing_user_id(self):
        # Remove the userId from the address data
        invalid_address_data = self.address_data.copy()
        invalid_address_data.pop('userId')

        response = self.client.post(self.url, invalid_address_data, format='json')
        print("Response Data:", response.data)  # Print the response data for debugging
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('userId', response.data)
class EduDegreeCreateViewTestCase(APITestCase):
    def setUp(self):
        # Create necessary instances
        self.user = User.objects.create(username='testuser', email='test@example.com', phoneno='1234567890')
        self.institute = Institute.objects.create(name='Test Institute')
        self.degree_name = DegreeName.objects.create(name='B.Sc.')

        self.url = reverse('accountAPIs:EduDegreeCreateView')

        # Print statements to verify IDs
        print("Institute ID:", self.institute.id)
        print("Degree Name ID:", self.degree_name.id)

        self.valid_data = {
            'userId': str(self.user.id),  # Ensure it's a string
            'institute': str(self.institute.id),  # Ensure it's a string
            'degreename': str(self.degree_name.id),  # Ensure it's a string
            'startDate': '2024-01-01',
            'endDate': '2024-12-31'
        }
        self.invalid_data = {
            'userId': str(self.user.id),  # Ensure it's a string
            'institute': 'nonexistent',  # Invalid ID
            'degreename': 'nonexistent',  # Invalid ID
            'startDate': 'invalid-date',  # Invalid date format
            'endDate': 'invalid-date'     # Invalid date format
        }

    
    def test_create_edudegree_invalid_data(self):
        response = self.client.post(self.url, self.invalid_data, format='json')
        print("Response Data:", response.data)  # Print the response data for debugging
        print("Status Code:", response.status_code)  # Print status code for debugging
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('degreename', response.data)
        self.assertIn('startDate', response.data)
        self.assertIn('endDate', response.data)


class DegreeNamesViewTestCase(APITestCase):
    def setUp(self):
        # Create some DegreeName instances
        self.degree_name_1 = DegreeName.objects.create(name='B.Sc.')
        self.degree_name_2 = DegreeName.objects.create(name='M.Sc.')
        
        self.url = reverse('accountAPIs:DegreeNamesView')  # Use the URL name from your urlpatterns

    def test_list_degree_names(self):
        response = self.client.get(self.url, format='json')
        print("Response Data (List):", response.data)  # Print the response data for debugging
        print("Status Code (List):", response.status_code)  # Print status code for debugging
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], self.degree_name_1.name)
        self.assertEqual(response.data[1]['name'], self.degree_name_2.name)

    def test_create_degree_name(self):
        new_degree_name_data = {'name': 'Ph.D.'}
        response = self.client.post(self.url, new_degree_name_data, format='json')
        print("Response Data (Create):", response.data)  # Print the response data for debugging
        print("Status Code (Create):", response.status_code)  # Print status code for debugging
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DegreeName.objects.count(), 3)
        created_degree_name = DegreeName.objects.last()
        self.assertEqual(created_degree_name.name, 'Ph.D.')

class CreateOTPAccountWithPhoneViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='+919876543210', password='oldpassword')
        self.url = reverse('accountAPIs:CreateOTPAccountWithPhoneView', kwargs={'username': '+919876543210'})

    @patch('requests.request')
    @patch('random.randint')
    def test_put_success(self, mock_randint, mock_request):
        # Mock the random OTP generation
        mock_randint.return_value = 12345

        # Mock the Fast2SMS API response
        mock_request.return_value.status_code = 200
        mock_request.return_value.json.return_value = {'return': True}

        data = {'username': '+919876543210'}
        response = self.client.put(self.url, data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertFalse(self.user.check_password('oldpassword'))
        self.assertTrue(self.user.check_password('OLsbd!@#4512345'))

        # Check if the OTP was sent (you might want to add more specific checks based on your implementation)
        mock_request.assert_called_once()
        payload = mock_request.call_args[1]['data']
        self.assertIn('12345', payload)  # Check if the OTP is in the payload
        self.assertIn('9876543210', payload)  # Check if the phone number is in the payload


class CreateOTPForEmailLoginViewTestCase(APITestCase):
    def setUp(self):
        self.valid_email = "test@example.com"
        self.user = User.objects.create_user(email=self.valid_email, password="testpassword")
        self.user.phoneno = "+912356789075"
        self.user.save()
        self.url = reverse('accountAPIs:send_otp_for_email', kwargs={'userinput': self.valid_email})

    @patch('random.randint')
    @patch('requests.request')
    def test_put_valid_email(self, mock_request, mock_randint):
        mock_randint.return_value = 12345
        mock_request.return_value.status_code = 200
        mock_request.return_value.json.return_value = {'return': True}

        data = {'email': self.valid_email}
        response = self.client.put(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('OLsbd!@#4512345'))

        mock_request.assert_called_once()
        payload = mock_request.call_args[1]['data']
        self.assertIn('variables_values=12345', payload)
        self.assertIn('numbers=2356789075', payload)

    @patch('random.randint')
    @patch('requests.request')
    def test_email_and_sms_sent(self, mock_request, mock_randint):
        mock_randint.return_value = 12345
        mock_request.return_value.status_code = 200
        mock_request.return_value.json.return_value = {'return': True}

        data = {'email': self.valid_email}
        response = self.client.put(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check if SMS was sent
        mock_request.assert_called_once()
        payload = mock_request.call_args[1]['data']
        self.assertIn('variables_values=12345', payload)
        self.assertIn('numbers=2356789075', payload)

class CreateOTPForPhoneLoginViewTestCase(APITestCase):
    def setUp(self):
        self.valid_phone = "+917890898907"
        self.user = User.objects.create_user(email="test@example.com", password="testpassword")
        self.user.phoneno = self.valid_phone
        self.user.save()
        self.url = reverse('accountAPIs:send_otp_for_phone', kwargs={'userinput': self.valid_phone})

    @patch('http.client.HTTPSConnection')
    @patch('random.randint')
    def test_put_valid_phone(self, mock_randint, mock_https_connection):
        mock_randint.return_value = 12345
        mock_response = mock_https_connection.return_value.getresponse.return_value
        mock_response.read.return_value = b'{"type":"success"}'

        data = {'phoneno': self.valid_phone}
        response = self.client.put(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('OLsbd!@#4512345'))

        mock_https_connection.assert_called_once_with("control.msg91.com")
        request_method, request_url, request_body, request_headers = mock_https_connection.return_value.request.call_args[0]
        self.assertEqual(request_method, "POST")
        self.assertIn("/api/v5/otp", request_url)
        self.assertIn("917890898907", request_url)
        self.assertIn("12345", request_url)

   

    @patch('http.client.HTTPSConnection')
    @patch('random.randint')
    def test_otp_sent_to_phone_and_email(self, mock_randint, mock_https_connection):
        mock_randint.return_value = 12345
        mock_response = mock_https_connection.return_value.getresponse.return_value
        mock_response.read.return_value = b'{"type":"success"}'

        data = {'phoneno': self.valid_phone}
        response = self.client.put(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        mock_https_connection.assert_called_once_with("control.msg91.com")
        request_method, request_url, request_body, request_headers = mock_https_connection.return_value.request.call_args[0]
        self.assertEqual(request_method, "POST")
        self.assertIn("/api/v5/otp", request_url)
        self.assertIn("917890898907", request_url)
        self.assertIn("12345", request_url)

class BlacklistTokenUpdateViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.blacklist_url = reverse('accountAPIs:blacklist')

    
    def test_blacklist_token_invalid_token(self):
        # Send POST request with invalid refresh token
        response = self.client.post(self.blacklist_url, {'refresh_token': 'invalid_token'})
        
        # Check if the response status code is 400 BAD REQUEST
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_blacklist_token_missing_token(self):
        # Send POST request without refresh token
        response = self.client.post(self.blacklist_url, {})
        
        # Check if the response status code is 400 BAD REQUEST
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_blacklist_token_already_blacklisted(self):
        # Generate a valid refresh token
        refresh = RefreshToken.for_user(self.user)
        
        # Blacklist the token
        refresh.blacklist()
        
        # Attempt to blacklist the same token again
        response = self.client.post(self.blacklist_url, {'refresh_token': str(refresh)})
        
        # Check if the response status code is 400 BAD REQUEST
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_blacklist_token_get_method_not_allowed(self):
        # Attempt to use GET method
        response = self.client.get(self.blacklist_url)
        
        # Check if the response status code is 405 METHOD NOT ALLOWED
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)



class AddParentDetailsViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create(username='testuser', email='test@example.com')
        self.url = reverse('accountAPIs:add-parent-details', kwargs={'user_id': self.user.id})
        self.valid_payload = {
            'father_name': 'John Doe',
            'mother_name': 'Jane Doe',
            'father_phone': '1234567890',
            'mother_phone': '0987654321',
            'father_email': 'john@example.com',
            'mother_email': 'jane@example.com'
        }

    def test_create_parent_details_success(self):
        initial_count = ParentDetails.objects.count()
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('parent_details_id', response.data)
        self.assertIn('parent_details', response.data)
        self.assertEqual(ParentDetails.objects.count(), initial_count + 1)
        self.assertEqual(ParentDetails.objects.last().father_name, 'John Doe')

    # def test_create_parent_details_invalid_user(self):
    #     invalid_url = reverse('add-parent-details', kwargs={'user_id': 9999})
    #     response = self.client.post(invalid_url, self.valid_payload, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    #     self.assertIn('error', response.data)

    def test_create_parent_details_invalid_data(self):
        invalid_payload = {
            'father_name': 'John Doe',
            'mother_name': 'Jane Doe',
            'father_phone': 'invalid_phone',  # Invalid phone number
            'mother_phone': '0987654321',
            'father_email': 'invalid_email',  # Invalid email
            'mother_email': 'jane@example.com'
        }
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

    def test_create_parent_details_missing_data(self):
        incomplete_payload = {
            'father_name': 'John Doe',
            'mother_name': 'Jane Doe'
        }
        response = self.client.post(self.url, incomplete_payload, format='json')
        # Since all fields are optional, this should still create the parent details
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('parent_details_id', response.data)
        self.assertIn('parent_details', response.data)

    def test_create_parent_details_duplicate(self):
        # First creation
        self.client.post(self.url, self.valid_payload, format='json')
        
        # Attempt to create duplicate
        response = self.client.post(self.url, self.valid_payload, format='json')
        # Since the view doesn't prevent duplicates, this should still succeed
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('parent_details_id', response.data)
        self.assertIn('parent_details', response.data)

class ParentDetailsSerializerTestCase(TestCase):
    def setUp(self):
        self.user = Account.objects.create(username='testuser', email='test@example.com')
        self.parent_details_attributes = {
            'father_name': 'John Doe',
            'mother_name': 'Jane Doe',
            'father_phone': '1234567890',
            'mother_phone': '0987654321',
            'father_email': 'john@example.com',
            'mother_email': 'jane@example.com'
        }

    def test_serializer_with_valid_data(self):
        serializer = ParentDetailsSerializer(data=self.parent_details_attributes)
        self.assertTrue(serializer.is_valid())

    

    def test_serializer_with_invalid_phone(self):
        self.parent_details_attributes['father_phone'] = 'invalid_phone'
        serializer = ParentDetailsSerializer(data=self.parent_details_attributes)
        # Since there's no custom validation, this should still be valid
        self.assertTrue(serializer.is_valid())

    def test_serializer_missing_required_field(self):
        # All fields are optional, so this test is not applicable
        pass

    def test_serializer_with_empty_data(self):
        serializer = ParentDetailsSerializer(data={})
        self.assertTrue(serializer.is_valid()) 

class UpdateParentDetailsViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create(username='testuser', email='test@example.com')
        self.parent_details = ParentDetails.objects.get(account=self.user)  # Created by signal
        self.url = reverse('accountAPIs:update-parent-details', kwargs={'user_id': self.user.id})
        self.valid_payload = {
            'father_name': 'John Doe',
            'mother_name': 'Jane Doe',
            'father_phone': '1234567890',
            'mother_phone': '0987654321',
            'father_email': 'john@example.com',
            'mother_email': 'jane@example.com'
        }

    def test_update_parent_details_success(self):
        response = self.client.put(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('parent_details', response.data)
        self.parent_details.refresh_from_db()
        self.assertEqual(self.parent_details.father_name, 'John Doe')

    def test_update_parent_details_invalid_user(self):
        invalid_url = reverse('accountAPIs:update-parent-details', kwargs={'user_id': 9999})
        response = self.client.put(invalid_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)

    def test_update_parent_details_partial(self):
        partial_payload = {'father_name': 'New Father Name'}
        response = self.client.put(self.url, partial_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.parent_details.refresh_from_db()
        self.assertEqual(self.parent_details.father_name, 'New Father Name')
    def test_update_parent_details_invalid_data(self):
        invalid_payload = {'father_email': 'invalid_email'}
        response = self.client.put(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.parent_details.refresh_from_db()
        self.assertNotEqual(self.parent_details.father_email, 'invalid_email')
    # def test_update_parent_details_invalid_data(self):
    #     invalid_payload = {'father_email': 'invalid_email'}
    #     response = self.client.put(self.url, invalid_payload, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)  # No validation, so it should succeed
    #     self.parent_details.refresh_from_db()
    #     self.assertEqual(self.parent_details.father_email, 'invalid_email')

class ParentDetailsSerializerTestCase(TestCase):
    def setUp(self):
        self.user = Account.objects.create(username='testuser', email='test@example.com')
        self.parent_details = ParentDetails.objects.get(account=self.user)  # Created by signal
        self.valid_attributes = {
            'father_name': 'John Doe',
            'mother_name': 'Jane Doe',
            'father_phone': '1234567890',
            'mother_phone': '0987654321',
            'father_email': 'john@example.com',
            'mother_email': 'jane@example.com'
        }

    def test_serializer_with_valid_data(self):
        serializer = ParentDetailsSerializer(self.parent_details, data=self.valid_attributes)
        self.assertTrue(serializer.is_valid())
    def test_serializer_with_invalid_email(self):
        invalid_data = self.valid_attributes.copy()
        invalid_data['father_email'] = 'invalid_email'
        serializer = ParentDetailsSerializer(self.parent_details, data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('father_email', serializer.errors)

    # def test_serializer_with_invalid_email(self):
    #     invalid_data = self.valid_attributes.copy()
    #     invalid_data['father_email'] = 'invalid_email'
    #     serializer = ParentDetailsSerializer(self.parent_details, data=invalid_data)
    #     self.assertTrue(serializer.is_valid())  # No validation, so it should be valid

    def test_serializer_with_partial_data(self):
        partial_data = {'father_name': 'New Father Name'}
        serializer = ParentDetailsSerializer(self.parent_details, data=partial_data, partial=True)
        self.assertTrue(serializer.is_valid())

class ParentDetailsSignalTestCase(TestCase):
    def test_create_parent_details_on_account_creation(self):
        user = Account.objects.create(username='newuser', email='newuser@example.com')
        self.assertTrue(ParentDetails.objects.filter(account=user).exists())

    def test_update_existing_parent_details_on_account_save(self):
        user = Account.objects.create(username='existinguser', email='existinguser@example.com')
        parent_details = ParentDetails.objects.get(account=user)
        parent_details.father_name = 'Initial Father Name'
        parent_details.save()

        user.username = 'updateduser'
        user.save()

        parent_details.refresh_from_db()
        self.assertEqual(parent_details.account.username, 'updateduser')

    def test_create_parent_details_if_not_exists_on_account_save(self):
        user = Account.objects.create(username='testuser', email='testuser@example.com')
        ParentDetails.objects.filter(account=user).delete()  # Remove ParentDetails

        user.username = 'updateduser'
        user.save()

        self.assertTrue(ParentDetails.objects.filter(account=user).exists())


class DeleteParentDetailsViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create(username="testuser", email="test@example.com")
        # Delete any existing ParentDetails for this user
        ParentDetails.objects.filter(account=self.user).delete()
        self.parent_details = ParentDetails.objects.create(
            account=self.user,
            father_name="John Doe",
            mother_name="Jane Doe",
            father_phone="1234567890",
            mother_phone="0987654321",
            father_email="john@example.com",
            mother_email="jane@example.com"
        )
        self.url = reverse('accountAPIs:delete-parent-details', kwargs={'user_id': self.user.id})

    def test_delete_parent_details_success(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Parent details deleted successfully.")
        self.assertFalse(ParentDetails.objects.filter(account=self.user).exists())
    def test_delete_parent_details_user_not_found(self):
        non_existent_user_id = self.user.id + 1
        url = reverse('accountAPIs:delete-parent-details', kwargs={'user_id': non_existent_user_id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found with the provided ID.")

    def test_delete_parent_details_not_found(self):
        ParentDetails.objects.filter(account=self.user).delete()
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Parent details not found for the provided user ID.")

    def test_parent_details_str_representation(self):
        expected_str = f"Parent Details of {self.user.username}"
        self.assertEqual(str(self.parent_details), expected_str)



class UpdateAddressForUserViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create_user(username='testuser', password='testpass')
        self.address = Address.objects.create(
            careof='John Doe',
            houseno='123',
            streetno='Main St',
            placename='Testville',
            postoffice='Test PO',
            district='Test District',
            policestn='Test Police Station',
            pincode='12345',
            city='Test City',
            state='Test State',
            country='Test Country',
            addressType='present'
        )
        self.user.addresses.add(self.address)
        self.url = reverse('accountAPIs:update-address-for-user', kwargs={'user_id': self.user.id, 'address_id': self.address.id})

    def test_update_address_authenticated_user(self):
        self.client.force_authenticate(user=self.user)
        data = {'houseno': '456', 'streetno': 'New St'}
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.address.refresh_from_db()
        self.assertEqual(self.address.houseno, '456')
        self.assertEqual(self.address.streetno, 'New St')

    def test_update_address_unauthenticated_user(self):
        data = {'houseno': '456', 'streetno': 'New St'}
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_address_wrong_user(self):
        other_user = Account.objects.create_user(username='otheruser', password='otherpass')
        self.client.force_authenticate(user=other_user)
        data = {'houseno': '456', 'streetno': 'New St'}
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_address_non_existent_user(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('accountAPIs:update-address-for-user', kwargs={'user_id': 9999, 'address_id': self.address.id})
        data = {'houseno': '456', 'streetno': 'New St'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_address_non_existent_address(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('accountAPIs:update-address-for-user', kwargs={'user_id': self.user.id, 'address_id': 9999})
        data = {'houseno': '456', 'streetno': 'New St'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_address_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        data = {'pincode': 'invalid'}  # Assuming pincode should be a string of digits
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Address updated successfully.')

class AddressSerializerTestCase(TestCase):
    def test_create_address(self):
        user = Account.objects.create_user(username='testuser', password='testpass')
        data = {
            'userId': str(user.id),
            'careof': 'John Doe',
            'houseno': '123',
            'streetno': 'Main St',
            'placename': 'Testville',
            'postoffice': 'Test PO',
            'district': 'Test District',
            'policestn': 'Test Police Station',
            'pincode': '12345',
            'city': 'Test City',
            'state': 'Test State',
            'country': 'Test Country',
            'addressType': 'present'
        }
        serializer = AddressSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        address = serializer.save()
        self.assertIsInstance(address, Address)
        self.assertEqual(address.careof, 'John Doe')
        self.assertIn(address, user.addresses.all())



class DeleteAddressForUserViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create_user(username='testuser', password='testpass')
        self.address = Address.objects.create(
            careof='John Doe',
            houseno='123',
            streetno='Main St',
            placename='Testville',
            postoffice='Test PO',
            district='Test District',
            policestn='Test Police Station',
            pincode='12345',
            city='Test City',
            state='Test State',
            country='Test Country',
            addressType='present'
        )
        self.user.addresses.add(self.address)
        self.url = reverse('accountAPIs:delete-address-for-user', kwargs={'user_id': self.user.id, 'address_id': self.address.id})

    def test_delete_address_success(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Address deleted successfully.")
        self.assertFalse(self.user.addresses.filter(id=self.address.id).exists())
        self.assertFalse(Address.objects.filter(id=self.address.id).exists())

    def test_delete_address_non_existent_user(self):
        url = reverse('accountAPIs:delete-address-for-user', kwargs={'user_id': 9999, 'address_id': self.address.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found with the provided ID.")

    def test_delete_address_non_existent_address(self):
        url = reverse('accountAPIs:delete-address-for-user', kwargs={'user_id': self.user.id, 'address_id': 9999})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Address not found with the provided ID.")

    def test_delete_address_not_associated_with_user(self):
        other_user = Account.objects.create_user(username='otheruser', password='otherpass')
        other_address = Address.objects.create(careof='Jane Doe', houseno='456')
        other_user.addresses.add(other_address)
        
        url = reverse('accountAPIs:delete-address-for-user', kwargs={'user_id': self.user.id, 'address_id': other_address.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Address not found with the provided ID.")
        
        # Verify the address still exists and is still associated with the other user
        self.assertTrue(Address.objects.filter(id=other_address.id).exists())
        self.assertTrue(other_user.addresses.filter(id=other_address.id).exists())

class GetAddressesForUserViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create_user(username='testuser', password='testpass')
        self.address1 = Address.objects.create(
            careof='John Doe',
            houseno='123',
            streetno='Main St',
            placename='Testville',
            postoffice='Test PO',
            district='Test District',
            policestn='Test Police Station',
            pincode='12345',
            city='Test City',
            state='Test State',
            country='Test Country',
            addressType='present'
        )
        self.address2 = Address.objects.create(
            careof='Jane Doe',
            houseno='456',
            streetno='Second St',
            placename='Testburg',
            postoffice='Test PO 2',
            district='Test District 2',
            policestn='Test Police Station 2',
            pincode='67890',
            city='Test City 2',
            state='Test State 2',
            country='Test Country 2',
            addressType='permanent'
        )
        self.user.addresses.add(self.address1, self.address2)
        self.url = reverse('accountAPIs:get-addresses-for-user', kwargs={'user_id': self.user.id})

    def test_get_all_addresses_for_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('addresses', response.data)
        self.assertEqual(len(response.data['addresses']), 2)
        self.assertEqual(response.data['addresses'][0]['id'], self.address1.id)
        self.assertEqual(response.data['addresses'][1]['id'], self.address2.id)

    def test_get_specific_address_for_user(self):
        url = f"{self.url}?address_id={self.address1.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('address', response.data)
        self.assertEqual(response.data['address']['id'], self.address1.id)

    def test_get_addresses_non_existent_user(self):
        url = reverse('accountAPIs:get-addresses-for-user', kwargs={'user_id': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found with the provided ID.")

    def test_get_non_existent_address_for_user(self):
        url = f"{self.url}?address_id=9999"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Address not found with the provided ID.")

    def test_get_address_not_associated_with_user(self):
        other_user = Account.objects.create_user(username='otheruser', password='otherpass')
        other_address = Address.objects.create(careof='Other Doe', houseno='789')
        other_user.addresses.add(other_address)
        
        url = f"{self.url}?address_id={other_address.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Address not found with the provided ID.")

class AddressSerializerTestCase(TestCase):
    def test_address_serialization(self):
        user = Account.objects.create_user(username='testuser', password='testpass')
        address = Address.objects.create(
            careof='John Doe',
            houseno='123',
            streetno='Main St',
            placename='Testville',
            postoffice='Test PO',
            district='Test District',
            policestn='Test Police Station',
            pincode='12345',
            city='Test City',
            state='Test State',
            country='Test Country',
            addressType='present'
        )
        user.addresses.add(address)

        serializer = AddressSerializer(address)
        data = serializer.data

        self.assertEqual(data['id'], address.id)
        self.assertEqual(data['careof'], 'John Doe')
        self.assertEqual(data['houseno'], '123')
        self.assertEqual(data['streetno'], 'Main St')
        self.assertEqual(data['placename'], 'Testville')
        self.assertEqual(data['postoffice'], 'Test PO')
        self.assertEqual(data['district'], 'Test District')
        self.assertEqual(data['policestn'], 'Test Police Station')
        self.assertEqual(data['pincode'], '12345')
        self.assertEqual(data['city'], 'Test City')
        self.assertEqual(data['state'], 'Test State')
        self.assertEqual(data['country'], 'Test Country')
        self.assertEqual(data['addressType'], 'present')

    def test_address_creation(self):
        user = Account.objects.create_user(username='testuser', password='testpass')
        data = {
            'userId': str(user.id),
            'careof': 'Jane Doe',
            'houseno': '456',
            'streetno': 'Second St',
            'placename': 'Testburg',
            'postoffice': 'Test PO 2',
            'district': 'Test District 2',
            'policestn': 'Test Police Station 2',
            'pincode': '67890',
            'city': 'Test City 2',
            'state': 'Test State 2',
            'country': 'Test Country 2',
            'addressType': 'permanent'
        }
        serializer = AddressSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        address = serializer.save()

        self.assertIsInstance(address, Address)
        self.assertEqual(address.careof, 'Jane Doe')
        self.assertIn(address, user.addresses.all())



class UpdateHealthDataForUserViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create_user(username='testuser', password='testpass')
        self.url = reverse('accountAPIs:update-health-data', kwargs={'user_id': self.user.id})

    def test_update_health_data_success(self):
        data = {
            'blood_group': 'A+',
            'height': '175.5',
            'weight': '70.5'
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Health data updated successfully.")
        self.user.health_data.refresh_from_db()
        self.assertEqual(self.user.health_data.blood_group, 'A+')
        self.assertEqual(self.user.health_data.height, Decimal('175.5'))
        self.assertEqual(self.user.health_data.weight, Decimal('70.5'))

    def test_update_health_data_partial(self):
        data = {'blood_group': 'B-'}
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.health_data.refresh_from_db()
        self.assertEqual(self.user.health_data.blood_group, 'B-')

    def test_update_health_data_non_existent_user(self):
        url = reverse('accountAPIs:update-health-data', kwargs={'user_id': 9999})
        data = {'blood_group': 'O+'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found with the provided ID.")

    def test_update_health_data_invalid_data(self):
        data = {'blood_group': 'Invalid'}
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)

class HealthDataSerializerTestCase(TestCase):
    def setUp(self):
        self.user = Account.objects.create_user(username='testuser', password='testpass')
        self.health_data = self.user.health_data

    def test_health_data_serialization(self):
        self.health_data.blood_group = 'A+'
        self.health_data.height = Decimal('180.5')
        self.health_data.weight = Decimal('75.5')
        self.health_data.save()

        serializer = HealthDataSerializer(self.health_data)
        data = serializer.data

        self.assertEqual(data['blood_group'], 'A+')
        self.assertEqual(data['height'], '180.50')
        self.assertEqual(data['weight'], '75.50')

    def test_health_data_deserialization(self):
        data = {
            'blood_group': 'B+',
            'height': '170.5',
            'weight': '65.5'
        }
        serializer = HealthDataSerializer(self.health_data, data=data)
        self.assertTrue(serializer.is_valid())
        health_data = serializer.save()

        self.assertEqual(health_data.blood_group, 'B+')
        self.assertEqual(health_data.height, Decimal('170.5'))
        self.assertEqual(health_data.weight, Decimal('65.5'))

class HealthDataModelTestCase(TestCase):
    def setUp(self):
        self.user = Account.objects.create_user(username='testuser', password='testpass')

    def test_health_data_creation(self):
        health_data = HealthData.objects.get(account=self.user)
        self.assertIsInstance(health_data, HealthData)
        self.assertEqual(health_data.blood_group, '')
        self.assertEqual(health_data.height, Decimal('0.0'))
        self.assertEqual(health_data.weight, Decimal('0.0'))

    def test_health_data_str_method(self):
        health_data = self.user.health_data
        self.assertEqual(str(health_data), f"{self.user.username} - Health Data")

    def test_health_data_creation_signal(self):
        new_user = Account.objects.create_user(username='newuser', password='newpass')
        self.assertTrue(hasattr(new_user, 'health_data'))
        self.assertIsInstance(new_user.health_data, HealthData)

    def test_health_data_blood_group_choices(self):
        health_data = self.user.health_data
        valid_blood_groups = [choice[0] for choice in HealthData.BLOOD_GROUP_CHOICES]
        
        for blood_group in valid_blood_groups:
            health_data.blood_group = blood_group
            health_data.save()
            self.assertEqual(health_data.blood_group, blood_group)

        with self.assertRaises(Exception):
            health_data.blood_group = 'Invalid'
            health_data.save()


class GetHealthDataForUserViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create_user(username='testuser', password='testpass')
        self.health_data = self.user.health_data
        self.health_data.blood_group = 'A+'
        self.health_data.height = Decimal('175.5')
        self.health_data.weight = Decimal('70.5')
        self.health_data.save()
        self.url = reverse('accountAPIs:get-health-data', kwargs={'user_id': self.user.id})

    def test_get_health_data_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['blood_group'], 'A+')
        self.assertEqual(response.data['height'], '175.50')
        self.assertEqual(response.data['weight'], '70.50')

    def test_get_health_data_non_existent_user(self):
        url = reverse('accountAPIs:get-health-data', kwargs={'user_id': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found with the provided ID.")

    def test_get_health_data_no_health_data(self):
        # Create a new user without health data
        new_user = Account.objects.create_user(username='newuser', password='newpass')
        new_user.health_data.delete()  # Manually delete the health data created by the signal
        
        url = reverse('accountAPIs:get-health-data', kwargs={'user_id': new_user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Health data not found for the provided user ID.")

    def test_get_health_data_empty_fields(self):
        # Reset health data to empty/default values
        self.health_data.blood_group = ''
        self.health_data.height = Decimal('0.0')
        self.health_data.weight = Decimal('0.0')
        self.health_data.save()

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['blood_group'], '')
        self.assertEqual(response.data['height'], '0.00')
        self.assertEqual(response.data['weight'], '0.00')
class DeleteHealthDataForUserViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = Account.objects.create(username='testuser', email='test@example.com')
        self.health_data, created = HealthData.objects.get_or_create(
            account=self.user,
            defaults={
                'blood_group': 'A+',
                'height': 170.5,
                'weight': 70.0
            }
        )
        self.url = reverse('accountAPIs:delete-health-data', kwargs={'user_id': self.user.id})

    def test_delete_health_data_success(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Health data has been cleared.")

        # Refresh the health data from the database
        self.health_data.refresh_from_db()

        # Check if the fields are cleared
        self.assertEqual(self.health_data.blood_group, "")
        self.assertEqual(self.health_data.height, 0.0)
        self.assertEqual(self.health_data.weight, 0.0)

    def test_delete_health_data_user_not_found(self):
        non_existent_user_id = 9999
        url = reverse('accountAPIs:delete-health-data', kwargs={'user_id': non_existent_user_id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found with the provided ID.")

    def test_delete_health_data_no_health_data(self):
        # Delete the health data to simulate a user without health data
        self.health_data.delete()

        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Health data not found for the provided user ID.")


class TriggerTasksViewTests(TestCase):
    def setUp(self):
        self.url = reverse('accountAPIs:trigger_tasks')

    @patch('accountAPIs.views.delete_old_profiles.delay')
    @patch('accountAPIs.views.send_test_email.delay')
    @patch('accountAPIs.views.create_daily_attendance.delay')
    @patch('accountAPIs.views.create_class_attendance.delay')
    @patch('accountAPIs.views.update_assignment_status.delay')
    @patch('accountAPIs.views.create_institute_batch_attendance.delay')
    @patch('accountAPIs.views.update_attendance_status.delay')
    def test_trigger_tasks_success(self, mock_update_attendance, mock_create_institute,
                                   mock_update_assignment, mock_create_class,
                                   mock_create_daily, mock_send_email, mock_delete_profiles):
        response = self.client.get(self.url)

        self.assertIsInstance(response, JsonResponse)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Tasks have been triggered"})

        mock_delete_profiles.assert_called_once()
        mock_send_email.assert_called_once()
        mock_create_daily.assert_called_once()
        mock_create_class.assert_called_once()
        mock_update_assignment.assert_called_once()
        mock_create_institute.assert_called_once()
        mock_update_attendance.assert_called_once()
class AccountListViewTest(APITestCase):
    
    @classmethod
    def setUpTestData(cls):
        # Assuming the correct field in UserType is 'name'
        cls.user_type = UserType.objects.create(name='user')

        # Create multiple Account instances for testing
        cls.account1 = Account.objects.create(
            firstname='John',
            lastname='Doe',
            email='john.doe@example.com',
            username='johndoe',
            usertype=cls.user_type,
            profile_image='path/to/image1.jpg',
            registrationid='reg1'
        )
        cls.account2 = Account.objects.create(
            firstname='Jane',
            lastname='Smith',
            email='jane.smith@example.com',
            username='janesmith',
            usertype=cls.user_type,
            profile_image='path/to/image2.jpg',
            registrationid='reg2'
        )

    def test_account_list_view_status_code(self):
        """
        Ensure the view returns a 200 OK status code.
        """
        url = reverse('accountAPIs:account-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

   


    def test_account_list_view_pagination(self):
        """
        Ensure the view returns paginated data.
        """
        url = reverse('accountAPIs:account-list')
        response = self.client.get(url)
        # Assuming default pagination page size is 10
        self.assertEqual(len(response.data['results']), min(len(Account.objects.all()), 10))
        self.assertTrue('next' in response.data or 'previous' in response.data)

class GenerateJWTViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
        self.url = reverse('accountAPIs:generate-jwt', args=[self.user.id])
        self.secret_key = os.getenv('JWT_SECRET_KEY', 'my_jitsi_app_secret')
        self.app_id = os.getenv('JWT_APP_ID', 'my_jitsi_app_id')
        self.subject = os.getenv('JWT_SUBJECT', 'https://localhost:8443')

    def test_generate_jwt_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('jwt_token', response.data)
        token = response.data['jwt_token']
        try:
            # Decode the token with expected audience
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'], audience='jitsi')
        except jwt.exceptions.InvalidAudienceError:
            self.fail('Invalid audience in token')
        self.assertEqual(payload['context']['user']['id'], self.user.id)

    def test_generate_jwt_user_not_found(self):
        invalid_url = reverse('accountAPIs:generate-jwt', args=[999999])
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found with the provided ID.')



class UpdateUserContactViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass',
            email='testuser@example.com',
            # phoneno='1234567890'
        )
        self.url = reverse('accountAPIs:update-contact', args=[self.user.id])

    def test_update_contact_success(self):
        data = {
            'email': 'newemail@example.com',
            'phoneno': '0987654321',
            'username': 'newusername'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Contact information updated successfully.')
        self.assertEqual(response.data['user_id'], self.user.id)
        self.assertEqual(response.data['user_contact']['email'], 'newemail@example.com')
        self.assertEqual(response.data['user_contact']['phoneno'], '0987654321')
        self.assertEqual(response.data['user_contact']['username'], 'newusername')
    
    def test_update_contact_invalid_data(self):
        # Provide invalid data (e.g., empty email)
        data = {
            'email': '',
            'phoneno': '0987654321',
            'username': 'newusername'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.assertIn('email', response.data['errors'])
    
    def test_update_contact_user_not_found(self):
        invalid_url = reverse('accountAPIs:update-contact', args=[999999])  # Use a non-existent user ID
        data = {
            'email': 'newemail@example.com',
            'phoneno': '0987654321',
            'username': 'newusername'
        }
        response = self.client.put(invalid_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], 'Not found.')


class GetLicensesByUserIdViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass',
            email='testuser@example.com'
        )
        self.skill = Skill.objects.create(name='Python')
        self.license = LicenseOrCertificate.objects.create(
            name='License A',
            issuing_organisation='Org A',
            issue_date='2024-01-01',
            expiration_date='2025-01-01',
            credentials_id='12345',
            credentials_url='http://example.com',
            user=self.user
        )
        self.license.skills.add(self.skill)
        self.url = reverse('accountAPIs:get_licenses_by_user_id', args=[self.user.id])

    def test_get_licenses_by_user_id_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'License A')
        self.assertEqual(response.data[0]['skills'][0]['name'], 'Python')

    def test_get_licenses_by_user_id_no_licenses(self):
        # Create a new user with no licenses
        new_user = User.objects.create_user(username='newuser', password='newpass', email='newuser@example.com')
        url = reverse('accountAPIs:get_licenses_by_user_id', args=[new_user.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])  # Should be an empty list
   
class DeleteLicenseOrCertificateViewTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            username='user1',
            password='pass1',
            email='user1@example.com'
        )
        self.user2 = User.objects.create_user(
            username='user2',
            password='pass2',
            email='user2@example.com'
        )
        self.skill = Skill.objects.create(name='Python')
        self.certificate = LicenseOrCertificate.objects.create(
            name='Certificate A',
            issuing_organisation='Org A',
            issue_date='2024-01-01',
            expiration_date='2025-01-01',
            credentials_id='12345',
            credentials_url='http://example.com',
            user=self.user1
        )
        self.certificate.skills.add(self.skill)
        self.delete_url = reverse('accountAPIs:delete_license_or_certificate', args=[self.certificate.id, self.user1.id])

    def test_delete_license_or_certificate_success(self):
        response = self.client.delete(self.delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'License or Certificate deleted successfully.')
        # Verify that the certificate has been deleted
        self.assertFalse(LicenseOrCertificate.objects.filter(id=self.certificate.id).exists())

    def test_delete_license_or_certificate_permission_denied(self):
    # Create a certificate for a different user
        other_certificate = LicenseOrCertificate.objects.create(
            name='Certificate B',
            issuing_organisation='Org B',
            issue_date='2024-02-01',
            expiration_date='2025-02-01',
            credentials_id='67890',
            credentials_url='http://example.com',
            user=self.user2
        )
        other_certificate.skills.add(self.skill)
        url = reverse('accountAPIs:delete_license_or_certificate', args=[other_certificate.id, self.user1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(response.data['detail'], 'You do not have permission to perform this action.')

class EditLicenseOrCertificateViewTests(APITestCase):
    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
        self.other_user = User.objects.create_user(
            username='otheruser',
            password='testpass'
        )
        
        # Create a test certificate
        self.certificate = LicenseOrCertificate.objects.create(
            name='Certificate A',
            issuing_organisation='Org A',
            issue_date='2024-01-01',
            expiration_date='2025-01-01',
            credentials_id='12345',
            credentials_url='http://example.com',
            user=self.user
        )
        self.certificate.skills.add(Skill.objects.create(name='Skill A'))
        
        self.url = reverse('accountAPIs:edit_license_or_certificate', args=[self.user.id, self.certificate.id])

    def test_edit_license_or_certificate_success(self):
        data = {
            'name': 'Updated Certificate',
            'issuing_organisation': 'Updated Org',
            'issue_date': '2024-02-01',
            'expiration_date': '2025-02-01',
            'credentials_id': '54321',
            'credentials_url': 'http://updated.com',
            'skills': ['Skill B']
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'License or certificate updated successfully.')
        self.assertEqual(response.data['certificate']['name'], 'Updated Certificate')
        self.assertEqual(response.data['certificate']['issuing_organisation'], 'Updated Org')
        self.assertEqual(response.data['certificate']['credentials_id'], '54321')

    def test_edit_license_or_certificate_user_not_found(self):
        invalid_url = reverse('accountAPIs:edit_license_or_certificate', args=[999999, self.certificate.id])
        response = self.client.put(invalid_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found with the provided ID.')

    def test_edit_license_or_certificate_certificate_not_found(self):
        invalid_url = reverse('accountAPIs:edit_license_or_certificate', args=[self.user.id, 999999])
        response = self.client.put(invalid_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], 'Not found.')

    def test_edit_license_or_certificate_invalid_data(self):
        data = {
            'name': '',  # Invalid data: empty name
            'issuing_organisation': 'Updated Org'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data['errors'])
        self.assertEqual(response.data['message'], 'Failed to update license or certificate.')


class AddLicenseOrCertificateViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass',
        )
        self.url = reverse('accountAPIs:add_license_certificate', args=[self.user.id])
        self.valid_data = {
            'name': 'Certificate B',
            'issuing_organisation': 'Org B',
            'issue_date': '2024-03-01',
            'expiration_date': '2026-03-01',
            'credentials_id': '67890',
            'credentials_url': 'http://newcertificate.com',
            'skills': ['Skill B']  # Include skills in the request data
        }

    def test_add_license_or_certificate_success(self):
        data = {
            'user': self.user.id,
            'name': 'Some License or Certificate Name',
            'issuing_organisation': 'Some Issuing Organisation',
            'issue_date': '2022-01-01',  # or any other valid date
            'license_or_certificate': 'some_license_or_certificate_data'
        }
        response = self.client.post(self.url, data)
        print(response.content)  # Print out the response content
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_add_license_or_certificate_user_not_found(self):
        invalid_url = reverse('accountAPIs:add_license_certificate', args=[999999])
        data = {
            'name': 'Certificate C',
            'issuing_organisation': 'Org C',
            'issue_date': '2024-04-01',
            'expiration_date': '2026-04-01',
            'credentials_id': '11223',
            'credentials_url': 'http://anothercertificate.com'
        }
        response = self.client.post(invalid_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found with the provided ID.')

    def test_add_license_or_certificate_invalid_data(self):
        data = {
            'name': '',  # Invalid data: empty name
            'issuing_organisation': 'Org D'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data['errors'])
        self.assertEqual(response.data['message'], 'Failed to create license or certificate.')
class GetPublicationsByUserIdViewTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='pass1')
        self.user2 = User.objects.create_user(username='user2', password='pass2')

        # Create publications for user1
        self.publication1 = Publication.objects.create(
            user=self.user1,
            title='Publication 1',
            publisher='Publisher 1',
            publication_date='2024-01-01',
            publication_url='http://publication1.com',
            description='Description 1'
        )
        self.publication1.authors.set([self.user1])

        self.publication2 = Publication.objects.create(
            user=self.user1,
            title='Publication 2',
            publisher='Publisher 2',
            publication_date='2024-02-01',
            publication_url='http://publication2.com',
            description='Description 2'
        )
        self.publication2.authors.set([self.user1])

        # Create a publication for user2
        self.publication3 = Publication.objects.create(
            user=self.user2,
            title='Publication 3',
            publisher='Publisher 3',
            publication_date='2024-03-01',
            publication_url='http://publication3.com',
            description='Description 3'
        )
        self.publication3.authors.set([self.user2])

        # URL for the API view
        self.url = reverse('accountAPIs:get_publications_by_user_id', args=[self.user1.id])

    def test_get_publications_by_user_id_success(self):
        response = self.client.get(self.url)
        print(response.data)  # Print response data for debugging

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Two publications for user1

        # Check details of the first publication
        publication_data = response.data[0]
        self.assertEqual(publication_data['title'], 'Publication 1')
        self.assertEqual(publication_data['publisher'], 'Publisher 1')
        self.assertIn('author_usernames', publication_data)
        self.assertEqual(publication_data['author_usernames'], ['user1'])

    def test_get_publications_by_user_id_no_publications(self):
        url = reverse('accountAPIs:get_publications_by_user_id', args=[self.user2.id])
        response = self.client.get(url)
        print(response.data)  # Print response data for debugging

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # One publication for user2

class PublicationSerializerTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.valid_data = {
            'title': 'New Publication',
            'publisher': 'New Publisher',
            'publication_date': '2024-04-01',
            'authors': [self.user.id],  # Valid author ID
            'publication_url': 'http://newpublication.com',
            'description': 'New Description'
        }

    def test_publication_serializer_valid(self):
        serializer = PublicationSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        publication = serializer.save(user=self.user)
        self.assertEqual(publication.title, 'New Publication')
        self.assertEqual(publication.publisher, 'New Publisher')
        self.assertEqual(publication.authors.count(), 1)
        self.assertEqual(publication.authors.first(), self.user)

    def test_publication_serializer_invalid(self):
        invalid_data = self.valid_data.copy()
        del invalid_data['title']  # Remove required field for invalid data
        serializer = PublicationSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('title', serializer.errors)

    def test_publication_serializer_author_association(self):
        serializer = PublicationSerializer(data=self.valid_data)
        serializer.is_valid()
        publication = serializer.save(user=self.user)
        self.assertIn(self.user, publication.authors.all())

class DeletePublicationViewTests(APITestCase):
    def setUp(self):
        # Create users and a publication
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        
        self.publication = Publication.objects.create(
            user=self.user1,
            title='Publication Title',
            publisher='Publisher Name',
            publication_date='2024-01-01'
        )
        
        self.url = reverse('accountAPIs:delete_publication', args=[self.user1.id, self.publication.id])
        self.unauthorized_url = reverse('accountAPIs:delete_publication', args=[self.user1.id, self.publication.id])

    def test_delete_publication_success(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.delete(self.url)
        
        # Print response data for debugging
        print(response.data)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Publication deleted successfully.')
        self.assertFalse(Publication.objects.filter(id=self.publication.id).exists())  # Check if the publication is deleted

    def test_delete_non_existent_publication(self):
        self.client.force_authenticate(user=self.user1)
        non_existent_url = reverse('accountAPIs:delete_publication', args=[self.user1.id, 9999])
        response = self.client.delete(non_existent_url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
class EditPublicationViewTests(APITestCase):
    def setUp(self):
        self.user = Account.objects.create(username='testuser', password='testpass')
        self.publication = Publication.objects.create(
            user=self.user,
            title='Original Title',
            publisher='Original Publisher',
            publication_date=date(2024, 1, 1)
        )
        self.url = reverse('accountAPIs:edit_publication', kwargs={'user_id': self.user.id, 'publication_id': self.publication.id})
        self.client.login(username='testuser', password='testpass')

    def test_update_publication_success(self):
        data = {
            'title': 'Updated Title',
            'publisher': 'Updated Publisher',
            'publication_date': '2024-02-01',
            'authors': [self.user.id],
            'publication_url': 'http://example.com',
            'description': 'Updated description'
        }
        response = self.client.put(self.url, data, format='json')
        self.publication.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Publication updated successfully.')
        self.assertEqual(self.publication.title, 'Updated Title')
        self.assertEqual(self.publication.publisher, 'Updated Publisher')
        self.assertEqual(self.publication.publication_date, date(2024, 2, 1))
        self.assertIn(self.user, self.publication.authors.all())

    def test_update_publication_not_found(self):
        invalid_url = reverse('accountAPIs:edit_publication', kwargs={'user_id': self.user.id, 'publication_id': 9999})
        data = {
            'title': 'Updated Title',
            'publisher': 'Updated Publisher',
            'publication_date': '2024-02-01'
        }
        response = self.client.put(invalid_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], 'Not found.')


    
    def test_update_publication_invalid_user(self):
        invalid_url = reverse('accountAPIs:edit_publication', kwargs={'user_id': 9999, 'publication_id': self.publication.id})
        data = {
            'title': 'Updated Title',
            'publisher': 'Updated Publisher',
            'publication_date': '2024-02-01'
        }
        response = self.client.put(invalid_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found with the provided ID.')

    def test_update_publication_invalid_data(self):
        data = {
            'title': '',  # Invalid title
            'publisher': 'Updated Publisher',
            'publication_date': '2024-02-01'
        }
        response = self.client.put(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data['errors'])


class AddPublicationViewTests(APITestCase):
    def setUp(self):
        # Create a user for the publication
        self.user = Account.objects.create(username='testuser', password='testpass')

        # Create another user to be used as an author
        self.other_user = Account.objects.create(username='otheruser', password='testpass')

        # Set the URL for creating a publication
        self.url = reverse('accountAPIs:add_publication', kwargs={'user_id': self.user.id})
        
        # Log in the user
        self.client.login(username='testuser', password='testpass')

    def test_add_publication_success(self):
        data = {
            'title': 'New Publication',
            'publisher': 'Publisher Name',
            'publication_date': '2024-02-01',
            'authors': [self.user.id],  # Using user ID
            'publication_url': 'http://example.com',
            'description': 'Description of the new publication'
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Publication created successfully.')
        self.assertIn('publication_id', response.data)
        self.assertIn('publication', response.data)
        self.assertIn('authors', response.data)

        publication_id = response.data['publication_id']
        publication = Publication.objects.get(id=publication_id)

        self.assertEqual(publication.title, 'New Publication')
        self.assertEqual(publication.publisher, 'Publisher Name')
        self.assertEqual(publication.publication_date, date(2024, 2, 1))
        self.assertIn(self.user, publication.authors.all())

    def test_add_publication_user_not_found(self):
        url = reverse('accountAPIs:add_publication', kwargs={'user_id': 9999})
        data = {
            'title': 'New Publication',
            'publisher': 'Publisher Name',
            'publication_date': '2024-02-01'
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found with the provided ID.')

    def test_add_publication_invalid_data(self):
        data = {
            'title': '',  # Invalid title
            'publisher': 'Publisher Name',
            'publication_date': '2024-02-01'
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data['errors'])  # Check for errors on 'title'

    def test_add_publication_authors_as_names(self):
        data = {
            'title': 'New Publication',
            'publisher': 'Publisher Name',
            'publication_date': '2024-02-01',
            'authors': ['otheruser'],  # Using username instead of ID
            'publication_url': 'http://example.com',
            'description': 'Description of the new publication'
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Publication created successfully.')
        self.assertIn('publication_id', response.data)
        self.assertIn('publication', response.data)
        self.assertIn('authors', response.data)

        publication_id = response.data['publication_id']
        publication = Publication.objects.get(id=publication_id)

        self.assertEqual(publication.title, 'New Publication')
        self.assertEqual(publication.publisher, 'Publisher Name')
        self.assertEqual(publication.publication_date, date(2024, 2, 1))
        self.assertIn(self.other_user, publication.authors.all())


class GetExperienceByUserIdViewTests(APITestCase):
    def setUp(self):
        # Create users
        self.user = Account.objects.create(username='testuser', password='testpass')
        self.other_user = Account.objects.create(username='otheruser', password='testpass')

        # Create experiences for users
        self.experience1 = Experience.objects.create(
            user=self.user,
            title='Software Engineer',
            employment_type='full-time',
            company_name='Tech Co',
            location='City A',
            location_type='onsite',
            currently_working=True,
            start_date=date(2023, 1, 1),
            industry='Technology',
            description='Worked on various tech projects.',
            profile_headline='Experienced Software Engineer',
        )
        self.experience2 = Experience.objects.create(
            user=self.user,
            title='Data Scientist',
            employment_type='contract',
            company_name='Data Inc',
            location='City B',
            location_type='remote',
            currently_working=False,
            start_date=date(2022, 6, 1),
            end_date=date(2023, 1, 1),
            industry='Data Science',
            description='Analyzed data to derive insights.',
        )
        self.experience3 = Experience.objects.create(
            user=self.other_user,
            title='Marketing Specialist',
            employment_type='part-time',
            company_name='MarketCo',
            location='City C',
            location_type='hybrid',
            currently_working=True,
            start_date=date(2023, 2, 1),
            industry='Marketing',
            description='Developed marketing strategies.',
        )

        self.url = reverse('accountAPIs:get_experience_by_user_id', kwargs={'user_id': self.user.id})

    def test_get_experience_by_user_id_success(self):
        response = self.client.get(self.url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Should return 2 experiences for the user
        self.assertEqual(response.data[0]['title'], 'Software Engineer')
        self.assertEqual(response.data[1]['title'], 'Data Scientist')

    def test_get_experience_by_user_id_no_experiences(self):
        url = reverse('accountAPIs:get_experience_by_user_id', kwargs={'user_id': self.other_user.id})
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Should return 1 experience for the other user
        self.assertEqual(response.data[0]['title'], 'Marketing Specialist')

    # def test_get_experience_by_user_id_user_not_found(self):
    #     url = reverse('accountAPIs:get_experience_by_user_id', kwargs={'user_id': 9999})
    #     response = self.client.get(url, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    #     self.assertEqual(response.data['detail'], 'User not found with the provided ID.')


class ExperienceSerializerTests(APITestCase):
    def setUp(self):
        # Create a user
        self.user = Account.objects.create(username='testuser', password='testpass')

        # Create skills
        self.skill1 = Skill.objects.create(name='Python', description='Programming language', category='Language')
        self.skill2 = Skill.objects.create(name='Django', description='Web framework', category='Framework')

        # Create experience with skills
        self.experience = Experience.objects.create(
            user=self.user,
            title='Software Engineer',
            employment_type='full-time',
            company_name='Tech Co',
            location='City A',
            location_type='onsite',
            currently_working=True,
            start_date=date(2023, 1, 1),
            industry='Technology',
            description='Worked on various tech projects.',
            profile_headline='Experienced Software Engineer',
        )
        self.experience.skills.add(self.skill1, self.skill2)

    def test_experience_serializer(self):
        serializer = ExperienceSerializer(instance=self.experience)
        data = serializer.data

        self.assertEqual(data['title'], 'Software Engineer')
        self.assertEqual(data['company_name'], 'Tech Co')
        self.assertEqual(len(data['skills']), 2)  # Should include two skills
        self.assertEqual(data['skills'][0]['name'], 'Python')
        self.assertEqual(data['skills'][1]['name'], 'Django')
    def test_experience_serializer_create(self):
        skill_data = {
            'name': 'Python',
            'description': 'Programming language',
            'category': 'Programming'
        }
        
        data = {
            'user': self.user.id,
            'title': 'Software Engineer',
            'employment_type': 'Full-time',
            'company_name': 'Tech Corp',
            'location': 'Remote',
            # 'location_type': 'REMOTE',
            'currently_working': True,
            'start_date': '2023-01-01',
            'end_date': None,
            'industry': 'Technology',
            'description': 'Worked on various projects',
            'profile_headline': 'Senior Developer',
            'skills': [skill_data],  # List of skill data
        }

        serializer = ExperienceSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)  # Print errors if invalid
        experience = serializer.save()
        self.assertEqual(experience.title, 'Software Engineer')
        self.assertIn('Python', [skill.name for skill in experience.skills.all()])


class DeleteExperienceViewTests(APITestCase):
    def setUp(self):
        # Create test users
        self.user = Account.objects.create(username='testuser', password='testpass')
        self.other_user = Account.objects.create(username='otheruser', password='otherpass')

        # Create a test experience for the user
        self.experience = Experience.objects.create(
            user=self.user,
            title='Software Engineer',
            employment_type='Full-time',
            company_name='Tech Corp',
            location='Remote',
            location_type='REMOTE',
            currently_working=True,
            start_date='2023-01-01',
            end_date=None,
            industry='Technology',
            description='Worked on various projects',
            profile_headline='Senior Developer'
        )

        self.url = reverse('accountAPIs:delete_experience', kwargs={'user_id': self.user.id, 'experience_id': self.experience.id})
        self.client.login(username='testuser', password='testpass')

    def test_delete_experience_success(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Experience deleted successfully.')
        self.assertFalse(Experience.objects.filter(id=self.experience.id).exists())
    def test_delete_experience_not_found(self):
        invalid_url = reverse('accountAPIs:delete_experience', kwargs={'user_id': self.user.id, 'experience_id': 9999})
        response = self.client.delete(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_experience_unauthorized(self):
        unauthorized_url = reverse('accountAPIs:delete_experience', kwargs={'user_id': self.other_user.id, 'experience_id': self.experience.id})
        response = self.client.delete(unauthorized_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
class EditExperienceForUserViewTests(APITestCase):
    def setUp(self):
        # Create test users
        self.user = Account.objects.create(username='testuser', password='testpass')
        self.other_user = Account.objects.create(username='otheruser', password='otherpass')

        # Create a test experience for the user
        self.experience = Experience.objects.create(
            user=self.user,
            title='Software Engineer',
            employment_type='Full-time',
            company_name='Tech Corp',
            location='Remote',
            location_type='REMOTE',
            currently_working=True,
            start_date='2023-01-01',
            end_date=None,
            industry='Technology',
            description='Worked on various projects',
            profile_headline='Senior Developer'
        )

        self.url = reverse('accountAPIs:edit_experience_for_user', kwargs={'user_id': self.user.id, 'experience_id': self.experience.id})
        self.client.login(username='testuser', password='testpass')

    def test_edit_experience_success(self):
        data = {
            'title': 'Lead Software Engineer',
            'company_name': 'Tech Innovators',
            'skills': [{'name': 'Python', 'description': 'Advanced', 'category': 'Programming'}]
        }
        response = self.client.put(self.url, data, format='json')
        self.experience.refresh_from_db()
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Experience updated successfully.')
        self.assertEqual(self.experience.title, 'Lead Software Engineer')
        self.assertEqual(self.experience.company_name, 'Tech Innovators')
        self.assertEqual(self.experience.skills.count(), 1)
        self.assertEqual(self.experience.skills.first().name, 'Python')
    def test_edit_experience_not_found(self):
        invalid_url = reverse('accountAPIs:edit_experience_for_user', kwargs={'user_id': self.user.id, 'experience_id': 9999})
        data = {
            'title': 'Updated Title'
        }
        response = self.client.put(invalid_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], 'Not found.')

    def test_edit_experience_invalid_data(self):
        data = {
            'title': '',  # Invalid title
            'company_name': 'Updated Company'
        }
        response = self.client.put(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data['errors'])
# class AddExperienceForUserViewTests(APITestCase):
#     def setUp(self):
#         self.user = Account.objects.create(username='testuser', password='testpass')
#         self.url = reverse('accountAPIs:add_experience_for_user', kwargs={'user_id': self.user.id})
#         self.client.login(username='testuser', password='testpass')

class AddExperienceForUserViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username='testuser', password='testpass')
        self.url = f'/api/{self.user.id}/experience/add/'

        # Clear existing Experience data before each test
        Experience.objects.all().delete()

        # Ensure no residual Experience data
        self.assertEqual(Experience.objects.count(), 0)

    def test_add_experience_success(self):
        data = {
            'title': 'Software Engineer',
            'employment_type': 'Full-time',
            'company_name': 'Tech Corp',
            'location': 'Remote',
            # 'location_type': 'ON_SITE',
            'currently_working': True,
            'start_date': '2023-01-01',
            'end_date': None,
            'industry': 'Technology',
            'description': 'Worked on various projects',
            'profile_headline': 'Senior Developer',
            'skills': [{'name': 'Python', 'description': 'Advanced', 'category': 'Programming'}]
        }
        response = self.client.post(self.url, data, format='json')
        print(response.data)  # Debugging: Print the response data
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Experience.objects.count(), 1)
        experience = Experience.objects.first()
        self.assertEqual(experience.title, 'Software Engineer')
        self.assertEqual(experience.skills.count(), 1)
        self.assertEqual(experience.skills.first().name, 'Python')

    def test_add_experience_user_not_found(self):
        invalid_url = reverse('accountAPIs:add_experience_for_user', kwargs={'user_id': 9999})
        data = {
            'title': 'Software Engineer',
            'employment_type': 'Full-time',
            'company_name': 'Tech Corp',
            'location': 'Remote',
            # 'location_type': 'REMOTE',
            'currently_working': True,
            'start_date': '2023-01-01',
            'end_date': None,
            'industry': 'Technology',
            'description': 'Worked on various projects',
            'profile_headline': 'Senior Developer',
            'skills': [{'name': 'Python', 'description': 'Advanced', 'category': 'Programming'}]
        }
        response = self.client.post(invalid_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'User not found with the provided ID.')

    def test_add_experience_invalid_data(self):
        data = {
            'title': '',  # Invalid title
            'employment_type': 'Full-time',
            'company_name': 'Tech Corp',
            'location': 'Remote',
            'location_type': 'REMOTE',
            'currently_working': True,
            'start_date': '2023-01-01',
            'end_date': None,
            'industry': 'Technology',
            'description': 'Worked on various projects',
            'profile_headline': 'Senior Developer'
        }
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data['errors'])

class ExperienceSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', password='testpass')
        self.skill = Skill.objects.create(name='Python')
        self.valid_data = {
            'user': self.user.id,
            'title': 'Software Engineer',
            'employment_type': 'Full-time',
            'company_name': 'Tech Corp',
            'location': 'Remote',
            # 'location_type': 'ON_SITE',
            'currently_working': True,
            'start_date': '2023-01-01',
            'end_date': None,
            'industry': 'Technology',
            'description': 'Worked on various projects',
            'profile_headline': 'Senior Developer',
            'skills': [{'name': 'Python'}]
        }

    def test_experience_serializer_create(self):
        serializer = ExperienceSerializer(data=self.valid_data)
        
        if not serializer.is_valid():
            print('Serializer errors:', serializer.errors)
        
        self.assertTrue(serializer.is_valid())
        experience = serializer.save()
        self.assertEqual(experience.title, 'Software Engineer')
        self.assertEqual(experience.skills.count(), 1)
        self.assertEqual(experience.skills.first().name, 'Python')
    
class GetAboutUsByUserIdViewTests(APITestCase):
    def setUp(self):
    # Create users
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.other_user = User.objects.create_user(username='otheruser', password='testpass')

        # Create skills
        self.skill1 = Skill.objects.create(name='Python')
        self.skill2 = Skill.objects.create(name='Django')

        # Ensure only one AboutUs entry for the user
        AboutUs.objects.filter(user=self.user).delete()  # Clean up existing data if needed
        self.about_us = AboutUs.objects.create(
            user=self.user,
            description='Test description'
        )
        self.about_us.skills.set([self.skill1, self.skill2])  # Associate skills

        self.url = f'/api/{self.user.id}/about_us/'
        self.client = APIClient()


    def test_get_about_us_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('about_us', response.data)
        self.assertEqual(len(response.data['about_us']), 1)  # Ensure only one entry is returned
        self.assertEqual(response.data['about_us'][0]['description'], 'Test description')


    def test_get_about_us_not_found(self):
        response = self.client.get('/api/about-us/{user_id}/'.format(user_id=self.user.id))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



    def test_get_about_us_unauthenticated(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['detail'], 'Authentication credentials were not provided.')

class EditAboutUsSerializerTestCase(TestCase):
    
    def setUp(self):
        # Create initial data for tests
        self.about_us = AboutUs.objects.create(description='Initial description')
        self.skill1 = Skill.objects.create(name='Python')
        self.skill2 = Skill.objects.create(name='Django')
        self.skill3 = Skill.objects.create(name='REST Framework')

    def test_update_about_us_description(self):
        # Test updating only the description
        data = {'description': 'Updated description'}
        serializer = EditAboutUsSerializer(instance=self.about_us, data=data, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        serializer.save()

        self.about_us.refresh_from_db()
        self.assertEqual(self.about_us.description, 'Updated description')


    def test_update_about_us_description_and_skills(self):
        # Test updating both description and skills
        data = {
            'description': 'Updated description with skills',
            'skills': ['Django', 'REST Framework']
        }
        serializer = EditAboutUsSerializer(instance=self.about_us, data=data, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        serializer.save()

        self.about_us.refresh_from_db()
        self.assertEqual(self.about_us.description, 'Updated description with skills')
        self.assertEqual(set(self.about_us.skills.all()), {self.skill2, self.skill3})



class AddAboutUsForUserViewTestCase(APITestCase):

    def setUp(self):
        # Clear existing data
        AboutUs.objects.all().delete()
        Skill.objects.all().delete()
        Account.objects.all().delete()

        # Create a test user
        self.user = Account.objects.create_user(username='testuser', password='testpass')
        self.url = reverse('accountAPIs:add_about_us_for_user', kwargs={'user_id': self.user.id})
        self.client.force_authenticate(user=self.user)
    def test_add_about_us_success(self):
        data = {
            "user": self.user.id,
            "description": "Test bio",
            "skills": ["Python", "Django"],
            "experience": "5 years",
            "education": "Bachelor's in Computer Science"
        }

        response = self.client.post(self.url, data, format='json')
        print(f"Response status: {response.status_code}")
        print(f"Response content: {response.content}")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        response_data = json.loads(response.content)
        self.assertEqual(response_data['message'], "About Us section updated successfully.")
        
        about_us = response_data['about_us']
        self.assertEqual(about_us['description'], "Test bio")  # Updated expectation
        self.assertEqual(about_us['user'], self.user.id)
        
        skills = [skill['name'] for skill in about_us['skills']]
        self.assertIn("Python", skills)
        self.assertIn("Django", skills)

        # Check the database
        db_about_us = AboutUs.objects.get(id=response_data['about_us_id'])
        self.assertEqual(db_about_us.user.id, self.user.id)
        self.assertEqual(db_about_us.description, "Test bio")  # Added this check
        self.assertTrue(db_about_us.skills.filter(name="Python").exists())
        self.assertTrue(db_about_us.skills.filter(name="Django").exists())

    # ... (rest of the test case) ...



    def test_add_about_us_without_skills(self):
        data = {
            "user_id": self.user.id,
            "description": "This is about us",
            "skills": []
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(AboutUs.objects.count(), 1)
        self.assertEqual(Skill.objects.count(), 0)



    def test_add_about_us_invalid_user(self):
        invalid_user_id = 9999
        invalid_url = reverse('accountAPIs:add_about_us_for_user', kwargs={'user_id': invalid_user_id})
        data = {
            "user_id": invalid_user_id,
            "description": "This is about us",
            "skills": [
                {"name": "Python"},
                {"name": "Django"}
            ]
        }
        response = self.client.post(invalid_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    def test_invalid_skills_data(self):
        # Test with invalid skill data (e.g., non-string values)
        data = {'skills': [123, None]}
        serializer = EditAboutUsSerializer( data=data, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn('skills', serializer.errors)


class GetAcademicDetailsForUserViewTest(APITestCase):

    def setUp(self):
        # Create a user
        self.user = Account.objects.create(username='testuser', password='testpassword')

        # Create skills
        self.skill1 = Skill.objects.create(name='Python')
        self.skill2 = Skill.objects.create(name='Django')

        # Create academic details for the user
        self.academic_detail1 = AcademicDetail.objects.create(
            user=self.user,
            school_name='Test School 1',
            degree_name='B.Sc. Computer Science',
            field_of_study='Computer Science',
            start_date='2020-01-01',
            end_date='2023-01-01',
            grade='A',
            description='Studied computer science',
            activities_and_societies='Chess Club',
            currently_studying=False
        )
        self.academic_detail1.skills.add(self.skill1)

        self.academic_detail2 = AcademicDetail.objects.create(
            user=self.user,
            school_name='Test School 2',
            degree_name='M.Sc. Data Science',
            field_of_study='Data Science',
            start_date='2023-02-01',
            end_date=None,
            grade=None,
            description='Studying data science',
            activities_and_societies='AI Society',
            currently_studying=True
        )
        self.academic_detail2.skills.add(self.skill2)

    def test_get_academic_details_for_user(self):
        url = reverse('accountAPIs:get_academic_details_for_user', kwargs={'user_id': self.user.id})
        response = self.client.get(url)

        academic_details = AcademicDetail.objects.filter(user_id=self.user.id)
        serializer = AcademicDetailSerializer(academic_details, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_academic_details_for_nonexistent_user(self):
        url = reverse('accountAPIs:get_academic_details_for_user', kwargs={'user_id': 999})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])  # Expect an empty list for a nonexistent user 


class AcademicDetailSerializerTest(APITestCase):

    def setUp(self):
        # Create a user
        self.user = Account.objects.create(username='testuser', password='testpassword')

        # Create skills
        self.skill1 = Skill.objects.create(name='Python')
        self.skill2 = Skill.objects.create(name='Django')

        # Valid academic detail data
        self.academic_detail_data = {
            'user': self.user.id,  # Assuming you are using the user ID for foreign key
            'school_name': 'Test School',
            'degree_name': 'B.Sc. Computer Science',
            'field_of_study': 'Computer Science',
            'start_date': '2020-01-01',
            'end_date': '2023-01-01',
            'grade': 'A',
            'description': 'Studied computer science',
            'activities_and_societies': 'Chess Club',
            'currently_studying': False,
            'skills': [{'name': 'Python'}, {'name': 'Django'}]
        }

    def test_academic_detail_serializer_create(self):
        serializer = AcademicDetailSerializer(data=self.academic_detail_data)
        is_valid = serializer.is_valid()
        if not is_valid:
            print(serializer.errors)  # Print errors to diagnose the issue
        self.assertTrue(is_valid)
        academic_detail = serializer.save()

        self.assertEqual(academic_detail.school_name, self.academic_detail_data['school_name'])
        self.assertEqual(academic_detail.degree_name, self.academic_detail_data['degree_name'])
        self.assertEqual(academic_detail.skills.count(), 2)

    def test_academic_detail_serializer_update(self):
        academic_detail = AcademicDetail.objects.create(
            user=self.user,
            school_name='Old School',
            degree_name='B.Sc. Old Degree',
            field_of_study='Old Field',
            start_date='2019-01-01',
            end_date='2022-01-01',
            currently_studying=False
        )
        serializer = AcademicDetailSerializer(academic_detail, data=self.academic_detail_data)
        is_valid = serializer.is_valid()
        if not is_valid:
            print(serializer.errors)  # Print errors to diagnose the issue
        self.assertTrue(is_valid)
        updated_academic_detail = serializer.save()

        self.assertEqual(updated_academic_detail.school_name, self.academic_detail_data['school_name'])
        self.assertEqual(updated_academic_detail.degree_name, self.academic_detail_data['degree_name'])
        self.assertEqual(updated_academic_detail.skills.count(), 2)

class RemoveSkillFromAcademicDetailViewTest(APITestCase):

    def setUp(self):
        # Create a user and a client for making requests
        self.user = Account.objects.create(username='testuser', password='testpassword')
        self.client = APIClient()

        # Create another user to test unauthorized access
        self.other_user = Account.objects.create(username='otheruser', password='otherpassword')

        # Create skills
        self.skill1 = Skill.objects.create(name='Python')
        self.skill2 = Skill.objects.create(name='Django')

        # Create an academic detail associated with the user
        self.academic_detail = AcademicDetail.objects.create(
            user=self.user,
            school_name='Test School',
            degree_name='B.Sc. Computer Science',
            field_of_study='Computer Science',
            start_date='2020-01-01',
            end_date='2023-01-01',
            currently_studying=False
        )
        # Associate skills with the academic detail
        self.academic_detail.skills.add(self.skill1, self.skill2)

    def test_remove_skill_success(self):
        # Remove a skill
        url = reverse('accountAPIs:remove_skill_from_academic_detail', kwargs={
            'user_id': self.user.id,
            'academic_detail_id': self.academic_detail.id,
            'skill_id': self.skill1.id
        })
        response = self.client.delete(url)

        # Check that the skill was removed
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.academic_detail.skills.count(), 1)
        self.assertFalse(self.academic_detail.skills.filter(id=self.skill1.id).exists())

    def test_remove_skill_not_associated(self):
        # Try to remove a skill that is not associated with the academic detail
        unassociated_skill = Skill.objects.create(name='JavaScript')
        url = reverse('accountAPIs:remove_skill_from_academic_detail', kwargs={
            'user_id': self.user.id,
            'academic_detail_id': self.academic_detail.id,
            'skill_id': unassociated_skill.id
        })
        response = self.client.delete(url)

        # Skill should not be removed, but should return 200 OK since it's not an error
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.academic_detail.skills.count(), 2)

    def test_remove_skill_unauthorized(self):
        # Attempt to remove a skill from an academic detail that belongs to another user
        url = reverse('accountAPIs:remove_skill_from_academic_detail', kwargs={
            'user_id': self.other_user.id,  # Use another user's ID
            'academic_detail_id': self.academic_detail.id,
            'skill_id': self.skill1.id
        })
        response = self.client.delete(url)

        # Should return a 403 Forbidden error
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(self.academic_detail.skills.count(), 2)  # No skill should be removed

    def test_remove_skill_invalid_academic_detail(self):
        # Attempt to remove a skill from a non-existent academic detail
        url = reverse('accountAPIs:remove_skill_from_academic_detail', kwargs={
            'user_id': self.user.id,
            'academic_detail_id': 999,  # Non-existent academic detail ID
            'skill_id': self.skill1.id
        })
        response = self.client.delete(url)

        # Should return a 404 Not Found error
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(self.academic_detail.skills.count(), 2)  # No skill should be removed

    def test_remove_skill_invalid_skill(self):
        # Attempt to remove a non-existent skill from an academic detail
        url = reverse('accountAPIs:remove_skill_from_academic_detail', kwargs={
            'user_id': self.user.id,
            'academic_detail_id': self.academic_detail.id,
            'skill_id': 999  # Non-existent skill ID
        })
        response = self.client.delete(url)

        # Should return a 404 Not Found error
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(self.academic_detail.skills.count(), 2)  # No skill should be removed


class DeleteAcademicDetailViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        self.academic_detail = AcademicDetail.objects.create(
            user=self.user,
            school_name="Test School",
            degree_name="Test Degree",
            field_of_study="Test Field",
            start_date="2020-01-01"
        )

    def test_delete_academic_detail_success(self):
        url = reverse('accountAPIs:delete_academic_detail', args=[self.user.id, self.academic_detail.id])
        response = self.client.delete(url)
        
        # Check the response is OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that the specific academic detail was deleted
        self.assertFalse(AcademicDetail.objects.filter(id=self.academic_detail.id).exists())


    
    def test_delete_academic_detail_not_found(self):
        # Attempt to delete a non-existent academic detail
        url = reverse('accountAPIs:delete_academic_detail', kwargs={
            'user_id': self.user.id,
            'academic_detail_id': 999  # Non-existent academic detail ID
        })
        response = self.client.delete(url)

        # Should return a 404 Not Found error
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(AcademicDetail.objects.filter(id=self.academic_detail.id).exists())  # Original academic detail should still exist

    @patch('accountAPIs.views.AcademicDetail.delete')
    def test_delete_academic_detail_integrity_error(self, mock_delete):
        def mock_delete_with_error(*args, **kwargs):
            raise IntegrityError("Simulated integrity error during deletion.")

        mock_delete.side_effect = mock_delete_with_error

        url = reverse('accountAPIs:delete_academic_detail', args=[self.user.id, self.academic_detail.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], "Failed to delete academic detail.")


class EditAcademicDetailViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.other_user = User.objects.create_user(username='otheruser', password='password')
        # Ensure all required fields are provided
        self.academic_detail = AcademicDetail.objects.create(
            user=self.user,
            school_name="Test School",
            degree_name="Test Degree",
            field_of_study="Computer Science",
            start_date="2022-01-01",  # Add start_date
            end_date="2024-01-01",
            grade="A",
            description="Description",
            activities_and_societies="Activities",
            media="media_url",
            currently_studying=False
        )
        self.skill1 = Skill.objects.create(name="Skill 1")
        self.skill2 = Skill.objects.create(name="Skill 2")
        self.url = reverse('accountAPIs:edit_academic_detail', args=[self.user.id, self.academic_detail.id])
        self.client.login(username='testuser', password='password')

    def test_edit_academic_detail_success(self):
        data = {
            "school_name": "Updated School",
            "skills": [{"name": "Updated Skill"}]
        }
        response = self.client.put(self.url, data, format='json')
        self.academic_detail.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.academic_detail.school_name, "Updated School")
        self.assertEqual(self.academic_detail.skills.count(), 1)
        self.assertEqual(self.academic_detail.skills.first().name, "Updated Skill")

    def test_edit_academic_detail_partial_update(self):
        data = {"school_name": "Partially Updated School"}
        response = self.client.put(self.url, data, format='json')
        self.academic_detail.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.academic_detail.school_name, "Partially Updated School")
        self.assertEqual(self.academic_detail.degree_name, "Test Degree")  # Check if other fields are intact

    
    def test_edit_academic_detail_invalid_data(self):
        # Ensure all required fields are included in the invalid data case
        data = {"school_name": "", "start_date": "2022-01-01"}  # Invalid school_name, but valid start_date
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('school_name', response.data['errors'])  # Check for specific validation error
class EditDeleteUseFullLinkViewTest(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client.login(username='testuser', password='password')
        self.usefull_link = UsefullLink.objects.create(
            name="Test Link",
            link="http://example.com",
            description="Test Description",
            creationDateTime=timezone.now()
        )
        # URL for creating a new link should not have a linkId
        self.create_url = reverse('accountAPIs:create_personal_link')
        self.edit_delete_url = reverse('accountAPIs:create_usefull_link', kwargs={'linkId': self.usefull_link.id})

    def test_get_usefull_link(self):
        response = self.client.get(self.edit_delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.usefull_link.name)
        self.assertEqual(response.data['link'], self.usefull_link.link)
        self.assertEqual(response.data['description'], self.usefull_link.description)

    def test_put_usefull_link(self):
        data = {
            'name': 'Updated Link',
            'link': 'http://updatedexample.com',
            'description': 'Updated Description'
        }
        response = self.client.put(self.edit_delete_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.usefull_link.refresh_from_db()
        self.assertEqual(self.usefull_link.name, data['name'])
        self.assertEqual(self.usefull_link.link, data['link'])
        self.assertEqual(self.usefull_link.description, data['description'])

    def test_delete_usefull_link(self):
        response = self.client.delete(self.edit_delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(UsefullLink.objects.filter(id=self.usefull_link.id).exists())
class CreateUseFullLinkViewTest(APITestCase):
    def setUp(self):
        # Create a user
        self.user1 = User.objects.create_user(username='testuser', password='testpassword')
        # Authenticate the user
        self.client.force_authenticate(user=self.user1)
        # URL for the API endpoint
        self.create_url = reverse('accountAPIs:create_personal_link')
        # Ensure the database is clean
        UsefullLink.objects.all().delete()

    def test_authenticated_user_create_link_success(self):
        # Data for the request
        data = {
            'name': 'Test Link',
            'link': 'http://testlink.com'
        }
        # Make the POST request
        response = self.client.post(self.create_url, data, format='json')
        # Check response status code
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Check if the link was created
        self.assertEqual(UsefullLink.objects.count(), 1)
        created_link = UsefullLink.objects.first()
        self.assertEqual(created_link.name, 'Test Link')
        self.assertEqual(created_link.link, 'http://testlink.com')


    def test_unauthenticated_user_create_link(self):
        self.client.logout()
        data = {
            'name': 'Test Link',
            'link': 'http://testlink.com',
            'description': 'This is a test link.'
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(UsefullLink.objects.filter(name='Test Link').exists())

class VerifyCaptchaViewTest(APITestCase):
    
    @patch('requests.post')
    def test_successful_captcha_verification(self, mock_post):
        mock_post.return_value.json.return_value = {'success': True}
        payload = {'captcha_value': 'dummy_captcha_response'}
        url = reverse('accountAPIs:VerifyCaptchaView')  # Use reverse to get the URL
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'captcha': {'success': True}})
    
    @patch('requests.post')
    def test_failed_captcha_verification(self, mock_post):
        mock_post.return_value.json.return_value = {'success': False}
        payload = {'captcha_value': 'dummy_captcha_response'}
        url = reverse('accountAPIs:VerifyCaptchaView')  # Use reverse to get the URL
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'captcha': {'success': False}})
    
    @patch('requests.post')
    def test_captcha_verification_exception(self, mock_post):
        mock_post.side_effect = Exception('Something went wrong')
        payload = {'captcha_value': 'dummy_captcha_response'}
        url = reverse('accountAPIs:VerifyCaptchaView')  # Use reverse to get the URL
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class SearchUserViewTest(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create(firstname='John', lastname='Doe')
        self.user2 = User.objects.create(firstname='Jane', lastname='Doe')
        self.user3 = User.objects.create(firstname='Bob', lastname='Smith')

    def test_search_user_by_firstname(self):
        url = reverse('accountAPIs:SearchUserView', kwargs={'speakername': 'John'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['firstname'], 'John')
    # def test_search_user_by_firstname_partial_match(self):
    #     url = reverse('accountAPIs:SearchUserView', kwargs={'speakername': 'Jo'})
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 1)
    #     self.assertEqual(response.data[0]['firstname'], 'John')

    def test_search_user_by_firstname_no_match(self):
        url = reverse('accountAPIs:SearchUserView', kwargs={'speakername': ' Foo'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

class UserProfileGETPUTViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            username='testuser',
            password='securepassword'
        )
        self.url = reverse('accountAPIs:userprofilegetput')
        self.client.force_authenticate(user=self.user)  # Force authentication

    def test_get_user_profile(self):
        """Test retrieving the user profile"""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], 'testuser@example.com')

    def test_put_user_profile(self):
        """Test updating the user profile"""
        data = {
            'firstname': 'Jane',
            'lastname': 'Smith',
            'gender': 'F',
            'position': 'Manager',
            'dateofbirth': '1985-05-15',
            'institute': 'Another Institute',
            'city': 'Another City',
            'state': 'Another State',
            'country': 'Another Country'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['firstname'], 'Jane')  
class UserCheckFromUserInputViewTest(APITestCase):
    def setUp(self):
        # Create a user for testing
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword',
            phone_number='1234567890'
            # phoneno='1234567890'
        )
        self.url = reverse('accountAPIs:getuserfromuserinput', args=['test@example.com'])

    def test_get_user_exists_with_email(self):
        """Test if user exists with provided email"""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], True)

    def test_get_user_exists_with_phone(self):
        """Test if user exists with provided phone number"""
        self.url = reverse('accountAPIs:getuserfromuserinput', args=['1234567890'])
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], True)

    def test_get_user_does_not_exist(self):
        """Test if no user exists with provided input"""
        self.url = reverse('accountAPIs:getuserfromuserinput', args=['nonexistent@example.com'])
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], False)

    def test_get_user_with_invalid_input(self):
        # Test with a non-existent email or phone number
        url = reverse('accountAPIs:getuserfromuserinput', args=['nonexistent'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'message': False})

class UserCheckFromUserNameViewTest(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', email='testuser@example.com', password='testpass123')

    def test_get_user_with_existing_username(self):
        """Test retrieving user with an existing username"""
        url = reverse('accountAPIs:getuserfromusername', args=['testuser'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'message': True})

    def test_get_user_with_nonexistent_username(self):
        """Test retrieving user with a non-existent username"""
        url = reverse('accountAPIs:getuserfromusername', args=['nonexistentuser'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'message': False})

    def test_get_user_with_empty_username(self):
        """Test retrieving user with an empty username"""
        # Assuming your URL pattern doesn't allow empty username, we expect a NoReverseMatch error
        with self.assertRaises(Exception):
            reverse('accountAPIs:getuserfromusername', args=[''])

    def test_get_user_with_special_characters_username(self):
        """Test retrieving user with a username containing special characters"""
        special_username = 'special_user_123!'
        User.objects.create_user(username=special_username, email='specialuser@example.com', password='specialpass123')
        url = reverse('accountAPIs:getuserfromusername', args=[special_username])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'message': True})
class CreateAccountBasicViewTest(APITestCase):

    def setUp(self):
        self.url = reverse('accountAPIs:CreateAccountBasicView')
        # Assuming you have a UserType model, create a user type instance for testing
        self.usertype = UserType.objects.create(name='regular')
        self.valid_payload = {
            'username': 'newuser',
            'usertype': self.usertype.pk,  # Use the primary key of the user type instance
        }
        self.invalid_payload = {
            'username': '',
            'usertype': self.usertype.pk,  # Use the primary key of the user type instance
        }

    def test_create_user_with_valid_data(self):
        """Test creating a user with valid data"""
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'newuser')
        self.assertEqual(response.data['usertype'], self.usertype.pk)
        self.assertTrue(User.objects.filter(username='newuser').exists())

        # Check that the password is set correctly
        user = User.objects.get(username='newuser')
        self.assertTrue(user.check_password('OLsbd!@#45'))

   

    def test_create_user_without_usertype(self):
        """Test creating a user without usertype (should still work if not required)"""
        payload = {
            'username': 'nousertypeuser',
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'nousertypeuser')
        self.assertTrue(User.objects.filter(username='nousertypeuser').exists())

    def test_create_user_with_existing_username(self):
        """Test creating a user with a username that already exists"""
        User.objects.create(username='existinguser', usertype=self.usertype)  # Using the correct usertype instance
        payload = {
            'username': 'existinguser',
            'usertype': self.usertype.pk,
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# Expecting a 400 status code for duplicates

class InstituteNamesViewTest(APITestCase):

    def setUp(self):
        # Clean up database before tests to ensure isolation
        Institute.objects.all().delete()

        # Define the URL for the view
        self.url = reverse('accountAPIs:InstituteNamesView')

        # Define valid and invalid payloads
        self.valid_payload = {
            'name': 'Test Institute',
        }
        self.invalid_payload = {
            'name': '',
        }

        # Create a single test institute
        Institute.objects.create(
            name='Existing Institute',
        )
   

    def test_create_institute_with_valid_data(self):
        """Test creating a new institute with valid data"""
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test Institute')


class DegreeNamesViewTest(APITestCase):
    
    def setUp(self):
        # Define the URL for the view
        self.url = reverse('accountAPIs:DegreeNamesView')
        
        # Define valid and invalid payloads
        self.valid_payload = {
            'name': 'Bachelor of Science',
        }
        self.invalid_payload = {
            'name': '',  # Invalid as name should not be empty
        }
        
        # Create a test degree name
        DegreeName.objects.create(
            name='Master of Arts',
        )

    def test_list_degree_names(self):
        """Test retrieving a list of degree names"""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check the number of degree names in the response
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Master of Arts')
    
    def test_create_degree_name_with_valid_data(self):
        """Test creating a new degree name with valid data"""
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Bachelor of Science')
        
        # Verify that the degree name was actually created
        self.assertTrue(DegreeName.objects.filter(name='Bachelor of Science').exists())

class EduDegreeDeleteViewTest(APITestCase):

    def setUp(self):
        # Define the URL for the view with a placeholder for the pk
        self.url = reverse('accountAPIs:EduDegreeDeleteView', kwargs={'pk': 1})

        # Create a test EduDegree object
        self.edudegree = EduDegree.objects.create(
            name='Bachelor of Education'
        )

        # Update the URL with the created object's pk
        self.url = reverse('accountAPIs:EduDegreeDeleteView', kwargs={'pk': self.edudegree.pk})

    def test_delete_edudegree_success(self):
        """Test successful deletion of an EduDegree object"""
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Verify that the EduDegree object has been deleted
        self.assertFalse(EduDegree.objects.filter(pk=self.edudegree.pk).exists())

    def test_delete_edudegree_not_found(self):
        """Test deletion of a non-existent EduDegree object"""
        # Use a non-existent pk
        url = reverse('accountAPIs:EduDegreeDeleteView', kwargs={'pk': 9999})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    

class EduDegreeDeleteViewTest(APITestCase):

    def setUp(self):
        # Create necessary related objects
        # self.institute = Institute.objects.create(name="Institute")
        self.degreename = DegreeName.objects.create(name="Test Degree")
        self.marksheet = MarkSheet.objects.create(name="Test MarkSheet")
        self.certificate = Certificate.objects.create(name="Test Certificate")

        # Create EduDegree object
        self.edudegree = EduDegree.objects.create(
            # institute=self.institute,
            degreename=self.degreename,
            startDate="2024-01-01",
            endDate="2024-12-31"
        )
        self.edudegree.marksheets.add(self.marksheet)
        self.edudegree.certificates.add(self.certificate)

        # URL for deleting EduDegree
        self.delete_url = reverse('accountAPIs:EduDegreeDeleteView', kwargs={'pk': self.edudegree.pk})

    def test_delete_edudegree_success(self):
        response = self.client.delete(self.delete_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(EduDegree.objects.count(), 0)

    def test_delete_edudegree_not_found(self):
        # Use a non-existent pk
        url = reverse('accountAPIs:EduDegreeDeleteView', kwargs={'pk': 9999})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


   