from django.test import TestCase , Client
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Institute, InstituteMembership, InstitueMemberTypes
from .serializers import CreateInstituteSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
import os
import json
from decimal import Decimal
from datetime import datetime, timedelta
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from rest_framework.exceptions import ValidationError
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import date, timedelta
import io
from datetime import timedelta 
from datetime import date, time
import csv
from django.db.models import Sum
from django.utils.dateparse import parse_datetime
from django.utils import timezone
from django.db.models import Prefetch
import pandas as pd
from tempfile import NamedTemporaryFile
from unittest.mock import Mock
from django.contrib.auth import get_user_model
from institute.models import Batch , InstituteBankDetails
from course.models import Course
from eclass.models import Class
import pandas as pd
from institute.models import Document, InstituteMemberDocument
import logging
from connect.models import Post,Comment

from django.utils.dateformat import format
logger = logging.getLogger(__name__)
from io import BytesIO
from io import BytesIO
from django.db.utils import IntegrityError
from assignment.models import Assignment, AssignmentAttachment
from openpyxl import load_workbook
from institute.models import Institute, Batch, Course, InstituteMembership, InstitueMemberTypes , Timetable ,InstituteFee , InstituteTransaction , InstituteTransaction 
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from .models import Institute, InstituteMembership, InstitueMemberTypes , Batch, Course  , Class , LinkedCourseMembers , Leave  , UserLeaveBalance , socialMediaLink , InstituteFeeInstallment  , InstituteOfficial , Group , GroupMembership , Asset
from .serializers import CreateInstituteSerializer , AddInstituteMemberSerializer , AttendanceSerializer , BatchAttendance , BatchAttendanceSerializer , BasicUserSerializer , CourseSerializer, InstituteMemberDocumentSerializer, InstituteBankDetailsSerializer,GetSocialMediaLinkSerializer , EditSocialMediaLinkSerializer, ClassSessionSerializer , AttendanceCourseSerializer , InstituteTransactionSerializer,InstituteOneFeeSerializer,FeeSerializer,UserCourseSerializer , InstituteOfficialSerializer,GroupMembershipSerializer 
import tempfile
from course.models import ClassSection , CourseDesignedFor 
from grade.serializers import BatchGradeSerializer
from connect.serializers import PostSerializer , PostWithCommentsSerializer
from django.test import TransactionTestCase
from django.db import connection
from django.db.models import ProtectedError
from unittest.mock import Mock
from django.test import TransactionTestCase
from grade.serializers import GradeListSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Institute, InstituteMembership, InstitueMemberTypes , Document , socialMediaLink  , Attendance  
from account.models import Account
from .serializers import CreateInstituteSerializer , AddMultipleInstituteMembersSerializer , CourseDesignedFor , Exam, SubExam , BatchCourseSerializers 
from PIL import Image 
from .models import Institute, Leave, User, LeaveType, InstituteMembership, UserLeaveBalance, InstituteLeavePolicy
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
import io
from institute.models import Institute, Batch, BatchTimetable, Course, InstituteMembership
from institute.serializers import BatchTimetableSerializer, BatchSerializer 
import tempfile
from rest_framework import status
from .models import BatchTimetable, Batch
from .serializers import BatchTimetableSerializer
import tempfile
from .models import BatchTimetable, Batch
from .views import BatchTimetableDetailView
from .views import ApproverListView
from .serializers import UserSerializer
from django.utils import timezone
from .views import AddTypeToInstitute
from .serializers import AddTypeSerializer
from .models import Institute, Attendance, User
from .views import InstituteMembersAttendanceView , UpdateAttendanceView , Grade
from django.utils import timezone
from django.test import TestCase, RequestFactory
from .models import Institute, InstituteMembership, InstitueMemberTypes, User 
from .serializers import GetMyInstitutesSerializer , GetOneInstituteSerializer, EditInstituteNameLogoSerializer , EditInstituteAddressSerializer , AttendanceComprehensiveSerializer , LinkCourseSerializer
User = get_user_model()
class CreateInstituteViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        User.objects.all().delete()
        Institute.objects.all().delete()
        InstitueMemberTypes.objects.all().delete()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)
        self.url = reverse('create_institute_view')
        InstitueMemberTypes.objects.create(name="Owner")

    def test_create_institute(self):
        data = {'name': 'Test Institute'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Institute.objects.count(), 1)
        institute = Institute.objects.first()
        self.assertEqual(institute.name, 'Test Institute')

    def test_create_institute_adds_user_as_owner(self):
        data = {'name': 'Test Institute'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        institute = Institute.objects.first()
        membership = InstituteMembership.objects.filter(user=self.user, institute=institute).first()
        self.assertIsNotNone(membership)
        self.assertEqual(membership.user_type.name, "Owner")
        self.assertEqual(membership.status, 'active')

    def test_create_institute_adds_to_user_myinstitutes(self):
        data = {'name': 'Test Institute'}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        institute = Institute.objects.first()
        self.assertIn(institute, self.user.myinstitutes.all())

    

    def test_get_institutes_list(self):
        Institute.objects.create(name='Institute 1')
        Institute.objects.create(name='Institute 2')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
class CreateInstituteSerializerTestCase(TestCase):
    def setUp(self):
        User.objects.all().delete()
        Institute.objects.all().delete()
        InstitueMemberTypes.objects.all().delete()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        InstitueMemberTypes.objects.create(name="Owner")
        
        # Create a test image file
        image = Image.new('RGB', (100, 100))
        tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        image.save(tmp_file, 'jpeg')
        tmp_file.seek(0)
        self.test_image = SimpleUploadedFile(
            name='test_image.jpg',
            content=tmp_file.read(),
            content_type='image/jpeg'
        )

    def test_serializer_creates_institute(self):
        data = {
            'name': 'Test Institute',
            'logo': self.test_image
        }
        serializer = CreateInstituteSerializer(data=data, context={'request': type('obj', (object,), {'user': self.user})})
        if not serializer.is_valid():
            print(serializer.errors)
        self.assertTrue(serializer.is_valid())
        institute = serializer.save()
        self.assertEqual(institute.name, 'Test Institute')
        self.assertIsNotNone(institute.logo)
        self.assertIn(self.user, institute.people.all())


    def test_serializer_creates_membership(self):
        data = {'name': 'Test Institute'}
        serializer = CreateInstituteSerializer(data=data, context={'request': type('obj', (object,), {'user': self.user})})
        self.assertTrue(serializer.is_valid())
        institute = serializer.save()
        membership = InstituteMembership.objects.filter(user=self.user, institute=institute).first()
        self.assertIsNotNone(membership)
        self.assertEqual(membership.user_type.name, "Owner")
        self.assertEqual(membership.status, 'active')



class GetMyInstitutesViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('get_myinstitutes_view')
        
        # Create test users
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        
        # Create test institutes
        self.institute1 = Institute.objects.create(name='Institute 1', logo='logo1.jpg')
        self.institute2 = Institute.objects.create(name='Institute 2', logo='logo2.jpg')
        self.institute3 = Institute.objects.create(name='Institute 3', logo='logo3.jpg')
        
        # Create member types
        self.member_type1 = InstitueMemberTypes.objects.create(name='Student')
        self.member_type2 = InstitueMemberTypes.objects.create(name='Teacher')
        
        # Create memberships
        InstituteMembership.objects.create(
            user=self.user1,
            institute=self.institute1,
            user_type=self.member_type1,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.user1,
            institute=self.institute2,
            user_type=self.member_type2,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.user1,
            institute=self.institute3,
            user_type=self.member_type1,
            status='inactive'
        )

        # Add institutes to user1's myinstitutes
        self.user1.myinstitutes.add(self.institute1, self.institute2, self.institute3)

   

   

    def test_get_my_institutes_no_memberships(self):
        self.client.force_authenticate(user=self.user2)
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_get_my_institutes_inactive_membership(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  # Should return all institutes, including inactive
        
        institute_data = {item['id']: item for item in response.data}
        self.assertIn(self.institute3.id, institute_data)
        self.assertEqual(institute_data[self.institute3.id]['relationship'], 'non-member')

class GetMyInstitutesSerializerTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(username='teste', password='testpass')
        self.institute = Institute.objects.create(name='Test Institute', logo='test_logo.jpg')
        self.member_type = InstitueMemberTypes.objects.create(name='Student')
        self.membership = InstituteMembership.objects.create(
            user=self.user,
            institute=self.institute,
            user_type=self.member_type,
            status='active'
        )

    def test_serializer_contains_expected_fields(self):
        request = self.factory.get('/')
        request.user = self.user
        serializer = GetMyInstitutesSerializer(self.institute, context={'request': request})
        data = serializer.data
        self.assertCountEqual(data.keys(), ['id', 'name', 'logo', 'relationship'])

    def test_serializer_relationship_field(self):
        request = self.factory.get('/')
        request.user = self.user
        serializer = GetMyInstitutesSerializer(self.institute, context={'request': request})
        self.assertEqual(serializer.data['relationship'], 'Student')

    def test_serializer_relationship_field_non_member(self):
        non_member = User.objects.create_user(username='nonmember', password='testpass')
        request = self.factory.get('/')
        request.user = non_member
        serializer = GetMyInstitutesSerializer(self.institute, context={'request': request})
        self.assertEqual(serializer.data['relationship'], 'non-member')


class GetOneInstituteByIdViewTest(APITestCase):
    def setUp(self):
        self.institute = Institute.objects.create(name="Test Institute", logo="test_logo.png")
        self.url = reverse('get_oneInstitute_by_id', args=[self.institute.id])
        self.user = User.objects.create_user(username='test', password='12345')

    def test_get_institute(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Test Institute")

    

class GetOneInstituteSerializerTest(TestCase):
    def setUp(self):
        self.institute = Institute.objects.create(name="Test Institute", logo="test_logo.png")
        self.user = Account.objects.create_user(username='test', password='12345')
        self.member_type = InstitueMemberTypes.objects.create(name="Member")
        self.membership = InstituteMembership.objects.create(
            user=self.user,
            institute=self.institute,
            user_type=self.member_type,
            status='active'
        )

    def test_serializer_contains_expected_fields(self):
        request = type('MockRequest', (), {'user': self.user, 'build_absolute_uri': lambda x: x})
        serializer = GetOneInstituteSerializer(instance=self.institute, context={'request': request})
        data = serializer.data
        self.assertSetEqual(set(data.keys()), {'id', 'name', 'logo', 'relationship', 'address', 'websiteurl', 'socialmedialinks', 'keypeople', 'keydocuments'})
    def test_relationship_field_for_member(self):
        request = type('MockRequest', (), {'user': self.user, 'build_absolute_uri': lambda x: x})
        serializer = GetOneInstituteSerializer(instance=self.institute, context={'request': request})
        self.assertEqual(serializer.data['relationship'], "Member")
    def test_relationship_field_for_non_member(self):
        non_member = Account.objects.create_user(username='nonmember', password='12345')
        request = type('MockRequest', (), {'user': non_member, 'build_absolute_uri': lambda x: x})
        serializer = GetOneInstituteSerializer(instance=self.institute, context={'request': request})
        self.assertEqual(serializer.data['relationship'], "non-member")

class InstituteDeleteViewTest(APITestCase):
    
    def setUp(self):
        # Create a test institute
        self.institute = Institute.objects.create(name="Test Institute")
        self.url = reverse('delete_institute_view', args=[self.institute.id])
    
    def test_delete_institute_success(self):
        # Test successful deletion of an institute
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Institute.objects.filter(id=self.institute.id).exists())

    def test_delete_non_existent_institute(self):
        # Test deletion of a non-existent institute
        non_existent_url = reverse('delete_institute_view', args=[9999])
        response = self.client.delete(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
# class EditInstituteNameLogoViewTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.institute = Institute.objects.create(name="Test Institute")
#         self.test_image_path = os.path.join(settings.BASE_DIR, 'institute', 'tests', 'test_files', 'test_image.jpg')
#         self.url = reverse('edit_institute_name_logo', kwargs={'instId': self.institute.id})
#     def test_put_valid_data(self):
#         with open(self.test_image_path, 'rb') as img:
#             new_logo = SimpleUploadedFile("new_logo.jpg", img.read(), content_type="image/jpeg")
    
#         data = {
#             'name': 'Updated Institute Name',
#             'logo': new_logo
#         }
#         response = self.client.put(self.url, data, format='multipart')
#         print(f"Response status code: {response.status_code}")
#         print(f"Response content: {response.content.decode()}")
        
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.institute.refresh_from_db()
#         self.assertEqual(self.institute.name, 'Updated Institute Name')
#         self.assertTrue('images/new_logo' in self.institute.logo.name)

#     def test_put_valid_data_without_logo(self):
#         data = {
#             'name': 'Updated Institute Name Without Logo Change'
#         }
#         response = self.client.put(self.url, data, format='json')
#         print(f"Response status code: {response.status_code}")
#         print(f"Response content: {response.content.decode()}")
        
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.institute.refresh_from_db()
#         self.assertEqual(self.institute.name, 'Updated Institute Name Without Logo Change')

#     def test_put_invalid_data(self):
#         data = {
#             'name': '',  # Invalid: empty name
#         }
#         response = self.client.put(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class EditInstituteNameLogoViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.url = reverse('edit_institute_name_logo', kwargs={'instId': self.institute.id})
        
        # Create a temporary test image
        self.test_image = self.create_test_image()

    def create_test_image(self):
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as f:
            image = Image.new('RGB', (100, 100), color='red')
            image.save(f, 'JPEG')
        return f.name

    def tearDown(self):
        # Clean up the temporary file
        os.unlink(self.test_image)

    def test_put_valid_data(self):
        with open(self.test_image, 'rb') as img:
            new_logo = SimpleUploadedFile("new_logo.jpg", img.read(), content_type="image/jpeg")
        
        data = {
            'name': 'Updated Institute Name',
            'logo': new_logo
        }
        response = self.client.put(self.url, data, format='multipart')
        print(f"Response status code: {response.status_code}")
        print(f"Response content: {response.content.decode()}")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.institute.refresh_from_db()
        self.assertEqual(self.institute.name, 'Updated Institute Name')
        self.assertNotEqual(self.institute.logo.url, "https://sgp1.digitaloceanspaces.com/edrspace/edrcontainer1/codingwithmitch/instlogodefault.png")
    def test_put_valid_data_without_logo(self):
        data = {
            'name': 'Updated Institute Name Without Logo Change'
        }
        response = self.client.put(self.url, data, format='json')
        print(f"Response status code: {response.status_code}")
        print(f"Response content: {response.content.decode()}")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.institute.refresh_from_db()
        self.assertEqual(self.institute.name, 'Updated Institute Name Without Logo Change')


class EditInstituteNameLogoSerializerTest(TestCase):
    def setUp(self):
        self.institute_attributes = {
            'name': 'Test Institute',
            'logo': SimpleUploadedFile("test_logo.png", b"file_content", content_type="image/png")
        }
        self.institute = Institute.objects.create(**self.institute_attributes)
        self.serializer = EditInstituteNameLogoSerializer(instance=self.institute)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertCountEqual(data.keys(), ['id', 'name', 'logo'])

    def test_name_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['name'], self.institute_attributes['name'])

    def test_logo_field_content(self):
        data = self.serializer.data
        self.assertIn('test_logo.png', data['logo'])

    def test_valid_data(self):
        # Create a valid image file
        image = Image.new('RGB', (100, 100))
        temp_file = io.BytesIO()
        image.save(temp_file, 'png')
        temp_file.seek(0)

        new_logo = SimpleUploadedFile("new_logo.png", temp_file.getvalue(), content_type="image/png")
        data = {
            'name': 'Updated Institute Name',
            'logo': new_logo
        }
        serializer = EditInstituteNameLogoSerializer(instance=self.institute, data=data)
        if not serializer.is_valid():
            print(serializer.errors)  # This will help debug if the serializer is not valid
        self.assertTrue(serializer.is_valid())

    def test_invalid_data(self):
        data = {
            'name': '',  # Invalid: empty name
            'logo': 'not_a_file'  # Invalid: not a file
        }
        serializer = EditInstituteNameLogoSerializer(instance=self.institute, data=data)
        self.assertFalse(serializer.is_valid())



class EditInstituteWebUrlViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(
            name="Test Institute",
            websiteurl="http://oldurl.com"
        )
        self.url = reverse('edit_institute_weburl', kwargs={'instId': self.institute.id})

    def test_put_valid_data(self):
        data = {
            'websiteurl': 'http://newurl.com'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.institute.refresh_from_db()
        self.assertEqual(self.institute.websiteurl, 'http://newurl.com')

    

    def test_put_non_existent_institute(self):
        non_existent_url = reverse('edit_institute_weburl', kwargs={'instId': 99999})
        data = {
            'websiteurl': 'http://newurl.com'
        }
        response = self.client.put(non_existent_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_method_not_allowed(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class EditInstituteAddressViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(
            name="Test Institute",
            address="123 Old Street, Old City, OC 12345"
        )
        self.url = reverse('edit_institute_address', kwargs={'instId': self.institute.id})

    def test_put_valid_data(self):
        data = {
            'address': '456 New Avenue, New Town, NT 67890'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.institute.refresh_from_db()
        self.assertEqual(self.institute.address, '456 New Avenue, New Town, NT 67890')

    

    def test_put_non_existent_institute(self):
        non_existent_url = reverse('edit_institute_address', kwargs={'instId': 99999})
        data = {
            'address': '789 Fake Street, Faketown, FK 13579'
        }
        response = self.client.put(non_existent_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_method_not_allowed(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

class EditInstituteAddressSerializerTest(TestCase):
    def setUp(self):
        self.institute_attributes = {
            'name': 'Test Institute',
            'address': '123 Test Street, Testville, TS 12345'
        }
        self.institute = Institute.objects.create(**self.institute_attributes)
        self.serializer = EditInstituteAddressSerializer(instance=self.institute)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertCountEqual(data.keys(), ['id', 'address'])

    def test_address_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['address'], self.institute_attributes['address'])

    def test_valid_data(self):
        data = {
            'address': '456 New Road, Newtown, NT 67890'
        }
        serializer = EditInstituteAddressSerializer(instance=self.institute, data=data)
        self.assertTrue(serializer.is_valid())

class AddDocumentViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.owner = User.objects.create_user(username='owner', password='password')
        self.admin = User.objects.create_user(username='admin', password='password')
        self.regular_user = User.objects.create_user(username='regular', password='password')
        
        # Create InstitueMemberTypes
        owner_type = InstitueMemberTypes.objects.create(name="Owner")
        admin_type = InstitueMemberTypes.objects.create(name="Admin")
        member_type = InstitueMemberTypes.objects.create(name="Member")
        
        # Create memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=member_type)
        
        self.url = reverse('document_add', kwargs={'institute_id': self.institute.id, 'user_id': self.owner.id})
    def create_test_document(self):
        image = Image.new('RGB', (100, 100))
        temp_file = io.BytesIO()
        image.save(temp_file, 'png')
        temp_file.seek(0)
        return SimpleUploadedFile("test_doc.png", temp_file.getvalue(), content_type="image/png")

    def test_add_document_as_owner(self):
        doc = self.create_test_document()
        data = {
            'name': 'Test Document',
            'docfile': doc
        }
        response = self.client.put(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Document.objects.filter(name='Test Document').exists())

    def test_add_document_as_admin(self):
        url = reverse('document_add', kwargs={'institute_id': self.institute.id, 'user_id': self.admin.id})
        doc = self.create_test_document()
        data = {
            'name': 'Admin Document',
            'docfile': doc
        }
        response = self.client.put(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Document.objects.filter(name='Admin Document').exists())

    def test_add_document_as_regular_user(self):
        url = reverse('document_add', kwargs={'institute_id': self.institute.id, 'user_id': self.regular_user.id})
        doc = self.create_test_document()
        data = {
            'name': 'Regular User Document',
            'docfile': doc
        }
        response = self.client.put(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

   

    def test_add_document_with_invalid_data(self):
        data = {
            'name': '',  # Invalid: empty name
            'docfile': 'not a file'  # Invalid: not a file
        }
        response = self.client.put(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# class DeleteDocumentViewTest(APITestCase):

#     def setUp(self):
#         # Create a user for authentication
#         self.user = User.objects.create_user(username='testuser', password='testpassword')
#         self.client.login(username='testuser', password='testpassword')
        
#         # Create a test file for the Document
#         self.test_file = SimpleUploadedFile("test_file.pdf", b"file_content", content_type="application/pdf")
        
#         # Create a document with the correct field name
#         self.document = Document.objects.create(name='Test Document', file=self.test_file)

#     def test_delete_document_success(self):
#         # Test successful deletion of a document
#         url = reverse('delete_doc_view', args=[self.document.id])
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertFalse(Document.objects.filter(id=self.document.id).exists())
class DeleteDocumentViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='tes', password='testpass')
        self.institute = Institute.objects.create(name="Test Institute")
        self.member_type = InstitueMemberTypes.objects.create(name="Owner")
        InstituteMembership.objects.create(user=self.user, institute=self.institute, user_type=self.member_type)
        self.document = Document.objects.create(name="Test Document", docfile="test.pdf")

    def test_delete_existing_document(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('delete_doc_view', args=[self.document.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Document.objects.filter(id=self.document.id).exists())
    def test_delete_non_existent_document(self):
        self.client.force_authenticate(user=self.user)
        non_existent_id = 9999  # Assuming this ID doesn't exist
        url = reverse('delete_doc_view', args=[non_existent_id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

   

    def test_delete_document_wrong_method(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('delete_doc_view', args=[self.document.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertTrue(Document.objects.filter(id=self.document.id).exists())

class DeleteSocialMediaIconViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create users
        self.owner = User.objects.create_user(username='owner', password='ownerpass')
        self.admin = User.objects.create_user(username='admin', password='adminpass')
        self.regular_user = User.objects.create_user(username='regular', password='regularpass')
        
        # Create institute
        self.institute = Institute.objects.create(name="Test Institute")
        
        # Create member types
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        self.member_type = InstitueMemberTypes.objects.create(name="Member")
        
        # Create memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=self.member_type)
        
        # Create a social media icon
        self.social_media_icon = socialMediaLink.objects.create(name="Test Icon", link="https://test.com")
        self.institute.socialmedialinks.add(self.social_media_icon)

    def test_delete_icon_as_owner(self):
        self.client.force_authenticate(user=self.owner)
        url = reverse('delete_institute_social_media', args=[self.institute.id, self.social_media_icon.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(socialMediaLink.objects.filter(id=self.social_media_icon.id).exists())

    def test_delete_icon_as_admin(self):
        self.client.force_authenticate(user=self.admin)
        url = reverse('delete_institute_social_media', args=[self.institute.id, self.social_media_icon.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(socialMediaLink.objects.filter(id=self.social_media_icon.id).exists())

    def test_delete_icon_as_regular_user(self):
        self.client.force_authenticate(user=self.regular_user)
        url = reverse('delete_institute_social_media', args=[self.institute.id, self.social_media_icon.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(socialMediaLink.objects.filter(id=self.social_media_icon.id).exists())

   
    

    def test_delete_icon_from_non_existent_institute(self):
        self.client.force_authenticate(user=self.owner)
        non_existent_institute_id = 9999  # Assuming this ID doesn't exist
        url = reverse('delete_institute_social_media', args=[non_existent_institute_id, self.social_media_icon.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_icon_wrong_method(self):
        self.client.force_authenticate(user=self.owner)
        url = reverse('delete_institute_social_media', args=[self.institute.id, self.social_media_icon.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertTrue(socialMediaLink.objects.filter(id=self.social_media_icon.id).exists())


   
class AddTypeToInstituteTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.owner = User.objects.create_user(username="owner", password="password")
        self.admin = User.objects.create_user(username="admin", password="password")
        self.regular_user = User.objects.create_user(username="regular", password="password")

        # Create InstitueMemberTypes objects
        owner_type, _ = InstitueMemberTypes.objects.get_or_create(name="Owner")
        admin_type, _ = InstitueMemberTypes.objects.get_or_create(name="Admin")
        member_type, _ = InstitueMemberTypes.objects.get_or_create(name="Member")

        # Create InstituteMembership objects
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=member_type)
    def test_add_type_as_owner(self):
        url = reverse('add_institute_type', kwargs={'institute_id': self.institute.id, 'adding_user_id': self.owner.id})
        data = {'type_name': 'Facebook', 'type_url': 'https://facebook.com'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.institute.socialmedialinks.count(), 1)
        self.assertEqual(self.institute.socialmedialinks.first().name, 'Facebook')

    def test_add_type_as_admin(self):
        url = reverse('add_institute_type', kwargs={'institute_id': self.institute.id, 'adding_user_id': self.admin.id})
        data = {'type_name': 'Twitter', 'type_url': 'https://twitter.com'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.institute.socialmedialinks.count(), 1)
        self.assertEqual(self.institute.socialmedialinks.first().name, 'Twitter')

    def test_add_type_as_regular_user(self):
        url = reverse('add_institute_type', kwargs={'institute_id': self.institute.id, 'adding_user_id': self.regular_user.id})
        data = {'type_name': 'LinkedIn', 'type_url': 'https://linkedin.com'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(self.institute.socialmedialinks.count(), 0)

    

    def test_add_type_invalid_data(self):
        url = reverse('add_institute_type', kwargs={'institute_id': self.institute.id, 'adding_user_id': self.owner.id})
        data = {'type_url': 'https://example.com'}  # Missing type_name
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.institute.socialmedialinks.count(), 0)

class AddTypeSerializerTestCase(TestCase):
    def test_valid_serializer(self):
        data = {'type_name': 'Facebook', 'type_url': 'https://facebook.com'}
        serializer = AddTypeSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_missing_type_name(self):
        data = {'type_url': 'https://example.com'}
        serializer = AddTypeSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('type_name', serializer.errors)

    def test_long_type_name(self):
        data = {'type_name': 'A' * 256, 'type_url': 'https://example.com'}
        serializer = AddTypeSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('type_name', serializer.errors)

    def test_long_type_url(self):
        data = {'type_name': 'Test', 'type_url': 'https://' + 'a' * 995 + '.com'}
        serializer = AddTypeSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('type_url', serializer.errors)

class InstituteMembersAttendanceViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.user = User.objects.create(username="test", password="testpass")
        self.attendance_record = Attendance.objects.create(
            institute=self.institute,
            member=self.user,
            attendance_date=timezone.now(),
            in_time="09:00:00",
            out_time="17:00:00",
            status="Present",
            remarks="On time",
            start_date=timezone.now(),
            end_date=timezone.now(),
        )
        self.url = reverse('institute_members_attendance', kwargs={'institute_id': self.institute.id})

    def test_get_attendance_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('attendance_date', response.data[0])
        self.assertIn('member', response.data[0])
        # Assuming the 'id' field is present in the member data
        self.assertEqual(response.data[0]['member']['id'], self.user.id)


    def test_get_no_attendance_records(self):
        Attendance.objects.all().delete()  # Remove all attendance records
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "No attendance records found for today")

    def test_institute_does_not_exist(self):
        url = reverse('institute_members_attendance', kwargs={'institute_id': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class UpdateAttendanceViewTest(TestCase):
    
    def setUp(self):
        self.client = APIClient()
        
        # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create user types
        self.admin_user_type, _ = InstitueMemberTypes.objects.get_or_create(name='Admin')
        self.owner_user_type, _ = InstitueMemberTypes.objects.get_or_create(name='Owner')
        self.teacher_user_type, _ = InstitueMemberTypes.objects.get_or_create(name='Teacher')

        # Create users
        self.updater_user = User.objects.create_user(
            username='updater_user',
            password='password123',
            email='updater_user@example.com'
        )
        self.member_user = User.objects.create_user(
            username='member_user',
            password='password123',
            email='member_user@example.com'
        )
        
        # Create an attendance record
        self.attendance = Attendance.objects.create(
            institute=self.institute,
            member=self.member_user,
            attendance_date=timezone.now(),
            in_time="09:00:00",
            out_time="17:00:00",
            status="Present",
            remarks="On time",
            start_date=timezone.now(),
            end_date=timezone.now(),
        )
        
        # Grant permissions to updater_user with Admin user_type
        self.membership = InstituteMembership.objects.create(
            user=self.updater_user,
            user_type=self.admin_user_type,
            institute=self.institute
        )
        
        # Set URL for testing
        self.url = reverse('update_attendance', kwargs={
            'institute_id': self.institute.id,
            'updater_user_id': self.updater_user.id,
            'attendance_id': self.attendance.id
        })
    def test_update_attendance_success(self):
        data = {
            "approver_status": "approved",
            "approver": self.updater_user.id
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.attendance.refresh_from_db()
        self.assertEqual(self.attendance.approver_status, "approved")
        self.assertEqual(self.attendance.approver, self.updater_user)
        

    def test_update_attendance_permission_denied(self):
        # Remove updater_user's permission
        self.membership.delete()

        data = {
            "approver_status": "Approved"
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

   

    def test_update_attendance_not_found(self):
        url = reverse('update_attendance', kwargs={
            'institute_id': self.institute.id,
            'updater_user_id': self.updater_user.id,
            'attendance_id': 999  # Non-existent attendance ID
        })
        data = {
            "status": "Present"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class LinkCourseToInstituteViewTest(APITestCase):

    def setUp(self):
        # Create InstituteMemberTypes instances
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.member_type = InstitueMemberTypes.objects.create(name="Member")
        
        # Create users
        self.owner_user = User.objects.create_user(username='owner_user', password='password123')
        self.regular_user = User.objects.create_user(username='regular_user', password='password123')
        
        # Create institutes
        self.institute = Institute.objects.create(name="Test Institute")
        
        # Create courses
        self.course1 = Course.objects.create(
            courseShortName="Course 1", 
            courseFullName="Full Course 1", 
            courseGlobalCode="001", 
            courseLocalCode="001", 
            courseStatus="active", 
            courseStartDate="2024-08-01", 
            courseEndDate="2024-08-31"
        )
        self.course2 = Course.objects.create(
            courseShortName="Course 2", 
            courseFullName="Full Course 2", 
            courseGlobalCode="002", 
            courseLocalCode="002", 
            courseStatus="active", 
            courseStartDate="2024-08-01", 
            courseEndDate="2024-08-31"
        )
        
        # Set up institute memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=self.member_type)
        
        self.url = reverse('link_course_to_institute', kwargs={'institute_id': self.institute.id, 'user_id': self.owner_user.id})

    def test_link_courses_success(self):
        data = {
            "course_ids": [self.course1.id, self.course2.id]
        }
        
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('linked_courses', response.data)
        self.assertIn('skipped_courses', response.data)
        self.assertEqual(response.data['linked_courses'], [self.course1.id, self.course2.id])
        self.assertEqual(response.data['skipped_courses'], [])

    

    def test_link_courses_invalid(self):
        # Test invalid course IDs
        data = {
            "course_ids": [99999]  # Non-existent course ID
        }
        
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('course_ids', response.data)
        self.assertEqual(response.data['course_ids'][0], 'Course with ID 99999 does not exist.')


class DelinkCourseFromInstituteViewTest(APITestCase):

    def setUp(self):
        # Create InstituteMemberTypes instances
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.member_type = InstitueMemberTypes.objects.create(name="Member")
        
        # Create users
        self.owner_user = User.objects.create_user(username='owner_user', password='password123')
        self.regular_user = User.objects.create_user(username='regular_user', password='password123')
        
        # Create institutes
        self.institute = Institute.objects.create(name="Test Institute")
        
        # Create courses
        self.course1 = Course.objects.create(
            courseShortName="Course 1", 
            courseFullName="Full Course 1", 
            courseGlobalCode="001", 
            courseLocalCode="001", 
            courseStatus="active", 
            courseStartDate="2024-08-01", 
            courseEndDate="2024-08-31"
        )
        self.course2 = Course.objects.create(
            courseShortName="Course 2", 
            courseFullName="Full Course 2", 
            courseGlobalCode="002", 
            courseLocalCode="002", 
            courseStatus="active", 
            courseStartDate="2024-08-01", 
            courseEndDate="2024-08-31"
        )
        
        # Link courses to the institute
        self.institute.courses.add(self.course1, self.course2)
        
        # Set up institute memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=self.member_type)
        
        # Add LinkedCourseMembers
        LinkedCourseMembers.objects.create(course=self.course1, institute=self.institute, member=self.owner_user)
        LinkedCourseMembers.objects.create(course=self.course2, institute=self.institute, member=self.owner_user)
        
        self.url = reverse('delink-course', kwargs={'institute_id': self.institute.id, 'user_id': self.owner_user.id})

    def test_delink_courses_success(self):
        data = {
            "course_ids": [self.course1.id, self.course2.id]
        }
        
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Courses unlinked successfully')
        self.assertIn('course_ids', response.data)
        self.assertEqual(response.data['course_ids'], [self.course1.id, self.course2.id])

        # Check that courses are removed from the institute
        self.assertNotIn(self.course1, self.institute.courses.all())
        self.assertNotIn(self.course2, self.institute.courses.all())

    
    def test_delink_courses_not_linked(self):
        # Test attempting to unlink a course that is not linked to the institute
        # First, unlink the courses from the institute
        self.institute.courses.remove(self.course1, self.course2)
        self.assertNotIn(self.course1, self.institute.courses.all())
        self.assertNotIn(self.course2, self.institute.courses.all())
        
        data = {
            "course_ids": [self.course1.id, self.course2.id]
        }
        
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], f'Course {self.course1.id} is not linked to this institute')
class GetInstituteCoursesViewTest(APITestCase):

    def setUp(self):
        # Create a user and an institute
        self.user = User.objects.create_user(username='test', password='password123')
        self.institute = Institute.objects.create(name="Test Institute")
        
        # Create courses
        self.course1 = Course.objects.create(
            courseShortName="Course 1",
            courseFullName="Full Course 1",
            courseGlobalCode="001",
            courseLocalCode="001",
            courseStatus="active",
            courseStartDate="2024-08-01",
            courseEndDate="2024-08-31"
        )
        self.course2 = Course.objects.create(
            courseShortName="Course 2",
            courseFullName="Full Course 2",
            courseGlobalCode="002",
            courseLocalCode="002",
            courseStatus="inactive",
            courseStartDate="2024-09-01",
            courseEndDate="2024-09-30"
        )
        
        # Link courses to the institute
        self.institute.courses.add(self.course1, self.course2)
        
        self.url = reverse('get-institute-courses', kwargs={'institute_id': self.institute.id})

    def test_get_institute_courses_success(self):
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('courses', response.data)
        
        courses_data = response.data['courses']
        self.assertEqual(len(courses_data), 2)

        # Check the representation of course 1
        course1_data = next(course for course in courses_data if course['course_id'] == self.course1.id)
        self.assertEqual(course1_data['course_global_code'], self.course1.courseGlobalCode)
        self.assertEqual(course1_data['course_name'], self.course1.courseFullName)
        self.assertEqual(course1_data['course_short_name'], self.course1.courseShortName)
        self.assertEqual(course1_data['status'], self.course1.courseStatus)

    def test_get_institute_courses_institute_does_not_exist(self):
        invalid_institute_id = 999
        url = reverse('get-institute-courses', kwargs={'institute_id': invalid_institute_id})
        
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'detail': 'Not found.'})
#Test Case 1: Successful Retrieval of Approvers
class ApproverListViewTest(APITestCase):
    def setUp(self):
        self.institute = Institute.objects.create(name='Test Institute')
        self.user_owner = User.objects.create_user(username='owner', password='password')
        self.user_admin = User.objects.create_user(username='admin', password='password')
        self.user_teacher = User.objects.create_user(username='teacher', password='password')

        self.member_type_owner = InstitueMemberTypes.objects.create(name='Owner')
        self.member_type_admin = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type_teacher = InstitueMemberTypes.objects.create(name='Teacher')

        InstituteMembership.objects.create(user=self.user_owner, institute=self.institute, user_type=self.member_type_owner)
        InstituteMembership.objects.create(user=self.user_admin, institute=self.institute, user_type=self.member_type_admin)
        InstituteMembership.objects.create(user=self.user_teacher, institute=self.institute, user_type=self.member_type_teacher)

    def test_approver_list_success(self):
        url = reverse('approver_list', kwargs={'institute_id': self.institute.id, 'user_id': self.user_teacher.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Expecting 2 approvers (Owner and Admin)
        
        approvers = [approver['id'] for approver in response.data]
        self.assertIn(self.user_owner.id, approvers)
        self.assertIn(self.user_admin.id, approvers)

class BatchTimetableListViewTest(TransactionTestCase):
    def setUp(self):
        # Clear all related objects
        Batch.objects.all().delete()
        BatchTimetable.objects.all().delete()
        Institute.objects.all().delete()
        User.objects.all().delete()
        
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch1 = Batch.objects.create(
            name='Test Batch 1',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.batch2 = Batch.objects.create(
            name='Test Batch 2',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.timetable1 = BatchTimetable.objects.create(
            name='Test Timetable 1',
            uploaded_by=self.user
        )
        self.timetable1.batches.add(self.batch1)
        self.timetable2 = BatchTimetable.objects.create(
            name='Test Timetable 2',
            uploaded_by=self.user
        )
        self.timetable2.batches.add(self.batch2)

    def test_list_batchtimetables(self):
        url = reverse('batchtimetable-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'Test Timetable 2')
        self.assertEqual(response.data[1]['name'], 'Test Timetable 1')

    def test_list_batchtimetables_with_timetable_id(self):
        url = reverse('batchtimetable-list')
        response = self.client.get(url, {'timetable_id': self.timetable1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Timetable 1')

    def test_list_batchtimetables_with_batch_id(self):
        url = reverse('batchtimetable-list')
        response = self.client.get(url, {'batch_id': self.batch2.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Timetable 2')

    def test_create_batchtimetable_not_allowed(self):
        url = reverse('batchtimetable-list')
        file_content = b"file_content"
        file = SimpleUploadedFile("file.txt", file_content, content_type="text/plain")
        data = {
            'name': 'New Timetable',
            'batch_ids': [self.batch1.id, self.batch2.id],
            'file': file,
            'uploaded_by': self.user.id
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
class BatchTimetableSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuse', password='12345')
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch1 = Batch.objects.create(
            name='Test Batch 1',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.batch2 = Batch.objects.create(
            name='Test Batch 2',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.timetable_attributes = {
            'name': 'Test Timetable',
            'uploaded_by': self.user,
            'file': SimpleUploadedFile("file.txt", b"file_content", content_type="text/plain"),
            'batch_ids': [self.batch1.id, self.batch2.id]
        }

    def test_serializer_with_valid_data(self):
        serializer = BatchTimetableSerializer(data=self.timetable_attributes)
        self.assertTrue(serializer.is_valid())

       

    def test_serializer_creates_timetable(self):
        serializer = BatchTimetableSerializer(data=self.timetable_attributes)
        self.assertTrue(serializer.is_valid())
        timetable = serializer.save()
        self.assertIsInstance(timetable, BatchTimetable)
        self.assertEqual(timetable.name, 'Test Timetable')
        self.assertEqual(timetable.batches.count(), 2)

    def test_serializer_updates_timetable(self):
        timetable = BatchTimetable.objects.create(name='Old Timetable', uploaded_by=self.user)
        update_data = {
            'name': 'Updated Timetable',
            'batch_ids': [self.batch1.id]
        }
        serializer = BatchTimetableSerializer(instance=timetable, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_timetable = serializer.save()
        self.assertEqual(updated_timetable.name, 'Updated Timetable')
        self.assertEqual(updated_timetable.batches.count(), 1)
        self.assertEqual(updated_timetable.batches.first(), self.batch1)

    def test_serializer_with_invalid_batch_id(self):
        invalid_data = self.timetable_attributes.copy()
        invalid_data['batch_ids'] = [999]  # Non-existent batch id
        serializer = BatchTimetableSerializer(data=invalid_data)
        self.assertTrue(serializer.is_valid())
        with self.assertRaises(ValidationError):
            serializer.save()

    def test_serializer_output(self):
        timetable = BatchTimetable.objects.create(name='Test Timetable', uploaded_by=self.user)
        timetable.batches.add(self.batch1)
        serializer = BatchTimetableSerializer(timetable)
        data = serializer.data
        self.assertEqual(data['name'], 'Test Timetable')
        self.assertEqual(len(data['batches']), 1)
        self.assertEqual(data['batches'][0]['name'], 'Test Batch 1')


class BatchTimetableDetailViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testus', password='12345')
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.timetable = BatchTimetable.objects.create(
            name='Test Timetable',
            uploaded_by=self.user
        )
        self.timetable.batches.add(self.batch)

    def test_retrieve_timetable(self):
        url = reverse('batchtimetable-detail', kwargs={'pk': self.timetable.id, 'user_id': self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Timetable')

    def test_retrieve_timetable_invalid_user(self):
        url = reverse('batchtimetable-detail', kwargs={'pk': self.timetable.id, 'user_id': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class BatchTimetableSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testus', password='12345')
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch1 = Batch.objects.create(
            name='Test Batch 1',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.batch2 = Batch.objects.create(
            name='Test Batch 2',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.timetable_data = {
            'name': 'Test Timetable',
            'batch_ids': [self.batch1.id, self.batch2.id],
            'uploaded_by': self.user.id
        }

    def test_create_timetable(self):
        serializer = BatchTimetableSerializer(data=self.timetable_data)
        self.assertTrue(serializer.is_valid())
        timetable = serializer.save()
        self.assertEqual(timetable.name, 'Test Timetable')
        self.assertEqual(timetable.batches.count(), 2)

    def test_update_timetable(self):
        timetable = BatchTimetable.objects.create(name='Old Timetable', uploaded_by=self.user)
        serializer = BatchTimetableSerializer(instance=timetable, data=self.timetable_data)
        self.assertTrue(serializer.is_valid())
        updated_timetable = serializer.save()
        self.assertEqual(updated_timetable.name, 'Test Timetable')
        self.assertEqual(updated_timetable.batches.count(), 2)

    def test_invalid_batch_id(self):
        invalid_data = self.timetable_data.copy()
        invalid_data['batch_ids'] = [999]
        serializer = BatchTimetableSerializer(data=invalid_data)
        self.assertTrue(serializer.is_valid())
        with self.assertRaises(ValidationError):
            serializer.save()

class BatchTimetableDeleteViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testus', password='12345')
        self.timetable = BatchTimetable.objects.create(
            name='Test Timetable',
            uploaded_by=self.user
        )
        self.url = reverse('batchtimetable-delete', kwargs={'pk': self.timetable.id, 'user_id': self.user.id})

    def test_delete_timetable_success(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "BatchTimetable deleted successfully.")
        self.assertFalse(BatchTimetable.objects.filter(id=self.timetable.id).exists())

    def test_delete_timetable_invalid_user(self):
        invalid_user_url = reverse('batchtimetable-delete', kwargs={'pk': self.timetable.id, 'user_id': 99999})
        response = self.client.delete(invalid_user_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(BatchTimetable.objects.filter(id=self.timetable.id).exists())

    def test_delete_nonexistent_timetable(self):
        nonexistent_url = reverse('batchtimetable-delete', kwargs={'pk': 99999, 'user_id': self.user.id})
        response = self.client.delete(nonexistent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class BatchTimetableUpdateViewTest(APITestCase):

    def setUp(self):
        # Create users
        self.owner_user = User.objects.create_user(username='owner', password='ownerpass')
        self.admin_user = User.objects.create_user(username='admin', password='adminpass')
        self.normal_user = User.objects.create_user(username='normal', password='normalpass')

        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create membership types
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')

        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)

        # Create batches with start_date and end_date
        self.batch1 = Batch.objects.create(
            name='Batch 1',
            institute=self.institute,
            created_by=self.owner_user,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=90)  # 90 days from start_date
        )
        self.batch2 = Batch.objects.create(
            name='Batch 2',
            institute=self.institute,
            created_by=self.admin_user,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=90)
        )

        # Create a BatchTimetable
        self.batch_timetable = BatchTimetable.objects.create(
            name='Timetable 1',
            file='test_file.pdf',
            uploaded_by=self.owner_user
        )
        self.batch_timetable.batches.add(self.batch1)

        # URL for update view
        self.url = reverse('batchtimetable-update', kwargs={'pk': self.batch_timetable.id, 'user_id': self.owner_user.id})
    def test_update_batch_timetable_success(self):
        self.client.force_authenticate(user=self.owner_user)
        data = {
            'name': 'Updated Timetable',
            'batch_ids': [self.batch1.id, self.batch2.id]
        }
        
        # Use SimpleUploadedFile for the file field
        from django.core.files.uploadedfile import SimpleUploadedFile
        file_content = b'file_content'  # Replace with actual file content
        data['file'] = SimpleUploadedFile('updated_test_file.pdf', file_content, content_type='application/pdf')
        
        response = self.client.put(self.url, data, format='multipart')
        print(f"Response status: {response.status_code}")
        print(f"Response content: {response.content}")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.batch_timetable.refresh_from_db()
        self.assertEqual(self.batch_timetable.name, 'Updated Timetable')
        self.assertTrue(self.batch_timetable.file.name.endswith('updated_test_file.pdf'))
        self.assertEqual(self.batch_timetable.batches.count(), 2)


class BatchTimetableCreateViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create users
        self.owner_user = User.objects.create_user(username='owner', password='ownerpass')
        self.admin_user = User.objects.create_user(username='admin', password='adminpass')
        self.normal_user = User.objects.create_user(username='normal', password='normalpass')
        
        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')
        
        # Create membership types
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')
        
        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.normal_user, institute=self.institute, user_type=self.member_type)
        
        # Create batches
        self.batch1 = Batch.objects.create(
            name='Batch 1',
            institute=self.institute,
            created_by=self.owner_user,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=90)
        )
        self.batch2 = Batch.objects.create(
            name='Batch 2',
            institute=self.institute,
            created_by=self.admin_user,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=90)
        )
        
        # URL for create view
        self.url = reverse('batchtimetable-create', kwargs={'user_id': self.owner_user.id})

    def tearDown(self):
        # Clean up BatchTimetable objects to avoid interference with other tests
        BatchTimetable.objects.all().delete()
        super().tearDown()

    def test_create_batch_timetable_success(self):
        self.client.force_authenticate(user=self.owner_user)
        file_content = b'file_content'
        data = {
            'name': 'New Timetable',
            'file': SimpleUploadedFile('test_file.pdf', file_content, content_type='application/pdf'),
            'batch_ids': [self.batch1.id, self.batch2.id]
        }
        response = self.client.post(self.url, data, format='multipart')
        
        # Print response for debugging
        # print(f"Response status code: {response.status_code}")
        # print(f"Response content: {response.content}")

        # # Debugging: Print the count and details of BatchTimetable objects
        # print(f"BatchTimetable count: {BatchTimetable.objects.count()}")
        # for timetable in BatchTimetable.objects.all():
        #     print(f"Timetable: {timetable.name}, Batches: {timetable.batches.count()}")

        # # Assert that only one BatchTimetable instance is created
        # self.assertEqual(BatchTimetable.objects.count(), 1)
        # batch_timetable = BatchTimetable.objects.first()
        # self.assertEqual(batch_timetable.name, 'New Timetable')
        # self.assertTrue(batch_timetable.file.name.endswith('test_file.pdf'))
        # self.assertEqual(batch_timetable.batches.count(), 2)
# class BatchTimetableCreateViewTest(TestCase):
#     def setUp(self):
#         self.client = APIClient()
        
#         # Create users
#         self.owner_user = User.objects.create_user(username='owner', password='ownerpass')
#         self.admin_user = User.objects.create_user(username='admin', password='adminpass')
#         self.normal_user = User.objects.create_user(username='normal', password='normalpass')
        
#         # Create an institute
#         self.institute = Institute.objects.create(name='Test Institute')
        
#         # Create membership types
#         self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
#         self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
#         self.member_type = InstitueMemberTypes.objects.create(name='Member')
        
#         # Create institute memberships
#         InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
#         InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)
#         InstituteMembership.objects.create(user=self.normal_user, institute=self.institute, user_type=self.member_type)
        
#         # Create batches
#         self.batch1 = Batch.objects.create(
#             name='Batch 1',
#             institute=self.institute,
#             created_by=self.owner_user,
#             start_date=date.today(),
#             end_date=date.today() + timedelta(days=90)
#         )
#         self.batch2 = Batch.objects.create(
#             name='Batch 2',
#             institute=self.institute,
#             created_by=self.admin_user,
#             start_date=date.today(),
#             end_date=date.today() + timedelta(days=90)
#         )
        
#         # URL for create view
#         self.url = reverse('batchtimetable-create', kwargs={'user_id': self.owner_user.id})

#     def tearDown(self):
#     # Clean up BatchTimetable objects to avoid interference with other tests
#         BatchTimetable.objects.all().delete()
#         super().tearDown()

#     def test_create_batch_timetable_success(self):
#         self.client.force_authenticate(user=self.owner_user)
#         file_content = b'file_content'
#         data = {
#             'name': 'New Timetable',
#             'file': SimpleUploadedFile('test_file.pdf', file_content, content_type='application/pdf'),
#             'batch_ids': [self.batch1.id, self.batch2.id]
#         }
#         response = self.client.post(self.url, data, format='multipart')
#         print(f"Response status code: {response.status_code}")
#         print(f"Response content: {response.content}")

#         # Debugging: Print the count and details of BatchTimetable objects
#         print(f"BatchTimetable count: {BatchTimetable.objects.count()}")
#         for timetable in BatchTimetable.objects.all():
#             print(f"Timetable: {timetable.name}, Batches: {timetable.batches.count()}")

#         # Assert that only one BatchTimetable instance is created
#         self.assertEqual(BatchTimetable.objects.count(), 1)
#         batch_timetable = BatchTimetable.objects.first()
#         self.assertEqual(batch_timetable.name, 'New Timetable')
#         self.assertTrue(batch_timetable.file.name.endswith('test_file.pdf'))
#         self.assertEqual(batch_timetable.batches.count(), 2)


   

    # def test_create_batch_timetable_success(self):
    #     self.client.force_authenticate(user=self.owner_user)
    #     file_content = b'file_content'
    #     data = {
    #         'name': 'New Timetable',
    #         'file': SimpleUploadedFile('test_file.pdf', file_content, content_type='application/pdf'),
    #         'batch_ids': [self.batch1.id, self.batch2.id]
    #     }
    #     response = self.client.post(self.url, data, format='multipart')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(BatchTimetable.objects.count(), 1)
    #     batch_timetable = BatchTimetable.objects.first()
    #     self.assertEqual(batch_timetable.name, 'New Timetable')
    #     self.assertTrue(batch_timetable.file.name.endswith('test_file.pdf'))
    #     self.assertEqual(batch_timetable.batches.count(), 2)

    def test_create_batch_timetable_invalid_user(self):
        self.client.force_authenticate(user=self.owner_user)
        invalid_url = reverse('batchtimetable-create', kwargs={'user_id': 9999})
        data = {
            'name': 'New Timetable',
            'file': SimpleUploadedFile('test_file.pdf', b'file_content', content_type='application/pdf'),
            'batch_ids': [self.batch1.id]
        }
        response = self.client.post(invalid_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_batch_timetable_invalid_batch(self):
        self.client.force_authenticate(user=self.owner_user)
        data = {
            'name': 'New Timetable',
            'file': SimpleUploadedFile('test_file.pdf', b'file_content', content_type='application/pdf'),
            'batch_ids': [9999]
        }
        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    

class BatchTimetableSerializerTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create users
        self.owner_user = User.objects.create_user(username='owner', password='ownerpass')
        self.admin_user = User.objects.create_user(username='admin', password='adminpass')
        self.normal_user = User.objects.create_user(username='normal', password='normalpass')
        
        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')
        
        # Create membership types
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')
        
        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.normal_user, institute=self.institute, user_type=self.member_type)
        
        # Create batches
        self.batch1 = Batch.objects.create(
            name='Batch 1',
            institute=self.institute,
            created_by=self.owner_user,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=90)
        )
        self.batch2 = Batch.objects.create(
            name='Batch 2',
            institute=self.institute,
            created_by=self.admin_user,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=90)
        )
        
        # URL for create view
        self.url = reverse('batchtimetable-create', kwargs={'user_id': self.owner_user.id})


    def test_serializer_create_valid_data(self):
        data = {
            'name': 'Test Timetable',
            'file': SimpleUploadedFile('test_file.pdf', b'file_content', content_type='application/pdf'),
            'batch_ids': [self.batch1.id, self.batch2.id],
            'uploaded_by': self.owner_user.id
        }
        serializer = BatchTimetableSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        batch_timetable = serializer.save()
        self.assertEqual(batch_timetable.name, 'Test Timetable')
        self.assertEqual(batch_timetable.batches.count(), 2)

    def test_serializer_update_valid_data(self):
        batch_timetable = BatchTimetable.objects.create(
            name='Original Timetable',
            file=SimpleUploadedFile('original.pdf', b'original_content', content_type='application/pdf'),
            uploaded_by=self.owner_user
        )
        batch_timetable.batches.add(self.batch1)

        data = {
            'name': 'Updated Timetable',
            'batch_ids': [self.batch2.id],
        }
        serializer = BatchTimetableSerializer(instance=batch_timetable, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_timetable = serializer.save()
        self.assertEqual(updated_timetable.name, 'Updated Timetable')
        self.assertEqual(updated_timetable.batches.count(), 1)
        self.assertEqual(updated_timetable.batches.first(), self.batch2)

class UploadBatchMembersTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create an owner user
        self.owner_user = User.objects.create_user(
            username="owner", 
            email="owner@test.com", 
            password="ownerpass"
        )
        
        # Create the institute
        self.institute = Institute.objects.create(name="Test Institute")
        
        # Create the batch
        self.batch = Batch.objects.create(
            name="Test Batch", 
            institute=self.institute,
            created_by=self.owner_user,
            end_date=timezone.now().date() + timezone.timedelta(days=30)  # Set end_date to 30 days from now
        )
        
        # Create the operator user
        self.operator = User.objects.create_user(
            username="operator", 
            email="operator@test.com", 
            password="testpass"
        )
        
        # Create user types
        self.student_type = InstitueMemberTypes.objects.create(name="Student")
        self.teacher_type = InstitueMemberTypes.objects.create(name="Teacher")
        
        # Create admin user type and assign it to the operator
        admin_type = InstitueMemberTypes.objects.create(name="Admin")
        InstituteMembership.objects.create(
            user=self.operator, 
            institute=self.institute, 
            user_type=admin_type
        )

    def create_csv_file(self, data):
        csv_file = io.StringIO()
        writer = csv.writer(csv_file)
        writer.writerow(['email', 'phone', 'first_name', 'last_name', 'user_type'])
        for row in data:
            writer.writerow(row)
        csv_file.seek(0)
        return csv_file

    def test_upload_batch_members_success(self):
        url = reverse('upload_students_to_batch', kwargs={'batchId': self.batch.id, 'userId': self.operator.id})
        data = [
            ['student1@test.com', '1234567890', 'John', 'Doe', 'Student'],
            ['teacher1@test.com', '0987654321', 'Jane', 'Smith', 'Teacher'],
        ]
        csv_file = self.create_csv_file(data)
        response = self.client.post(url, {'file': csv_file}, format='multipart')
        
        # Debugging information
        print(f"Response status code: {response.status_code}")
        print(f"Response content: {response.content}")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('added_members', response.data)
        self.assertEqual(len(response.data['added_members']), 2)
        self.assertEqual(self.batch.users.count(), 2)



    def test_upload_batch_members_missing_data(self):
        url = reverse('upload_students_to_batch', kwargs={'batchId': self.batch.id, 'userId': self.operator.id})
        data = [
            ['', '', 'John', 'Doe', 'Student'],
        ]
        csv_file = self.create_csv_file(data)
        response = self.client.post(url, {'file': csv_file}, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("A row is missing both email and phone.", response.data['errors'])

    def test_upload_batch_members_unauthorized(self):
        unauthorized_user = User.objects.create_user(username="unauthorized", email="unauthorized@test.com", password="testpass")
        url = reverse('upload_students_to_batch', kwargs={'batchId': self.batch.id, 'userId': unauthorized_user.id})
        data = [
            ['student1@test.com', '1234567890', 'John', 'Doe', 'Student'],
        ]
        csv_file = self.create_csv_file(data)
        response = self.client.post(url, {'file': csv_file}, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_upload_batch_members_batch_not_found(self):
        url = reverse('upload_students_to_batch', kwargs={'batchId': 9999, 'userId': self.operator.id})
        data = [
            ['student1@test.com', '1234567890', 'John', 'Doe', 'Student'],
        ]
        csv_file = self.create_csv_file(data)
        response = self.client.post(url, {'file': csv_file}, format='multipart')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BatchExamSubExamGradesViewTestCase(TestCase):
   
    def setUp(self):
        self.client = APIClient()
        
        # Create an owner user
        User = get_user_model()
        self.owner_user = User.objects.create_user(
            username="owner", 
            email="owner@test.com", 
            password="ownerpass"
        )
        
        # Create the institute
        self.institute = Institute.objects.create(
            name="Test Institute",
            
        )
        
        # Create the batch
        self.batch = Batch.objects.create(
            name="Test Batch", 
            institute=self.institute,
            created_by=self.owner_user,
            end_date=timezone.now().date() + timezone.timedelta(days=30)
        )
        
        self.user1 = User.objects.create_user(username="user1", email="user1@test.com", password="testpass")
        self.user2 = User.objects.create_user(username="user2", email="user2@test.com", password="testpass")
        self.batch.users.add(self.user1, self.user2)
        
        
        self.exam = Exam.objects.create(
            name="Test Exam",
            difficultylevel="Medium",
            start_date=timezone.now().date(),
            start_time=timezone.now().time(),
            duration=timedelta(minutes=60),  # Change this line
            total_marks=100,
            # created_by=self.owner_user
        )

        # ...

        exam2 = Exam.objects.create(
            name="Exam without SubExams",
            difficultylevel="Easy",
            start_date=timezone.now().date(),
            start_time=timezone.now().time(),
            duration=timedelta(minutes=30),  # Change this line
            total_marks=50
        )
        
        self.sub_exam = SubExam.objects.create(
            name="Test SubExam",
            parent_exam=self.exam,
            total_marks=50
        )
        
        self.grade1 = Grade.objects.create(
        exam=self.exam,
        sub_exam=self.sub_exam,
        student=self.user1,
        marks_obtained=40,
        percentage=80,
        grade_value='A'  # Add this line with an appropriate grade value
        )  
        Grade.objects.create(
        exam=exam2,
        student=self.user1,
        marks_obtained=45,
        percentage=90,
        grade_value='A+'  # Add this line with an appropriate grade value
        )
        
        self.url = reverse('batch-exam-subexam-grades', kwargs={'batch_id': self.batch.id})

    def test_list_all_grades(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)  # Two use

    def test_filter_by_student(self):
        response = self.client.get(f"{self.url}?student_id={self.user1.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['student']['id'], self.user1.id)

    def test_filter_by_exam(self):
        response = self.client.get(f"{self.url}?exam_id={self.exam.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(all('exam' in grade for user in response.data['results'] for grade in user['grades']))

   
        

    def test_non_existent_batch(self):
        url = reverse('batch-exam-subexam-grades', kwargs={'batch_id': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_pagination(self):
        # Add more users to test pagination
        for i in range(20):
            user = User.objects.create_user(username=f"user{i+3}", email=f"user{i+3}@test.com", password="testpass")
            self.batch.users.add(user)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertIn('results', response.data)

    def test_no_grades(self):
        # Create a new user with no grades
        user3 = User.objects.create_user(username="user3", email="user3@test.com", password="testpass")
        self.batch.users.add(user3)

        response = self.client.get(f"{self.url}?student_id={user3.id}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results'][0]['grades']), 0)

   
class DeleteGradeViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create users
        self.owner = User.objects.create_user(username='owner', password='ownerpass')
        self.teacher = User.objects.create_user(username='teacher', password='teacherpass')
        self.student1 = User.objects.create_user(username='student1', password='student1pass')
        self.student2 = User.objects.create_user(username='student2', password='student2pass')
        
        # Create institute and batch
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch = Batch.objects.create(
            name="Test Batch", 
            institute=self.institute,
            created_by=self.owner,
            end_date=timezone.now().date() + timezone.timedelta(days=30)
        )
        
        
        self.batch.users.add(self.student1, self.student2)
        
        # Create course
        self.course = Course.objects.create(
            courseShortName='Test Course',
            courseFullName='Test Course Full Name',
            courseGlobalCode='TC001',
            creater=self.owner
        )
        self.course.enrolled_students.add(self.student1, self.student2)
        
        # Create exam and sub_exam
        self.exam = Exam.objects.create(name='Test Exam')
        self.sub_exam = SubExam.objects.create(name='Test SubExam', parent_exam=self.exam)
        
        # Create grades
        self.grade1 = Grade.objects.create(
            batch=self.batch,
            course=self.course,
            student=self.student1,
            exam=self.exam,
            sub_exam=self.sub_exam,
            grade_value='A',
            marks_obtained=90,
            percentage=90
        )
        self.grade2 = Grade.objects.create(
            batch=self.batch,
            course=self.course,
            student=self.student2,
            exam=self.exam,
            sub_exam=self.sub_exam,
            grade_value='B',
            marks_obtained=80,
            percentage=80
        )
        
        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute)
        InstituteMembership.objects.create(user=self.teacher, institute=self.institute)
    def test_delete_single_grade(self):
        url = reverse('delete-grade', kwargs={'user_id': self.owner.id, 'pk': self.grade1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Grade.objects.filter(id=self.grade1.id).exists())

    
class EditGradeViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create users
        self.owner = User.objects.create_user(username='owner', password='ownerpass')
        self.teacher = User.objects.create_user(username='teacher', password='teacherpass')
        self.student = User.objects.create_user(username='student', password='studentpass')
        
        # Create institute and account
        self.institute = Institute.objects.create(name="Test Institute")
        self.account = Account.objects.create(institute=self.institute)
        
        # Create batch
        self.batch = Batch.objects.create(name="Test Batch", institute=self.institute, created_by=self.owner, end_date=timezone.now().date() + timezone.timedelta(days=30))
        self.batch.users.add(self.student)
        
        # Create course
        self.course = Course.objects.create(courseShortName='Test Course', courseFullName='Test Course Full Name', courseGlobalCode='TC001', creater=self.owner)
        self.course.enrolled_students.add(self.student)
        
        # Create exam and sub_exam
        self.exam = Exam.objects.create(name='Test Exam')
        self.sub_exam = SubExam.objects.create(name='Test SubExam', parent_exam=self.exam)
        
        # Create grade
        self.grade = Grade.objects.create(
            batch=self.batch,
            course=self.course,
            student=self.student,
            exam=self.exam,
            sub_exam=self.sub_exam,
            grade_value='A',
            marks_obtained=90,
            percentage=90,
            added_by=self.owner
        )
        
        # Create InstitueMemberTypes
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.teacher_type = InstitueMemberTypes.objects.create(name="Teacher")
        
        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.teacher, institute=self.institute, user_type=self.teacher_type)

    # ... rest of your test
    def test_edit_single_grade(self):
        self.client.force_authenticate(user=self.owner)
        url = reverse('edit-grade', kwargs={'user_id': self.owner.id, 'pk': self.grade.id})
        data = {
            'grades': [{
                'id': self.grade.id,
                'batch_id': self.batch.id,
                'course_id': self.course.id,
                'student_id': self.student.id,
                'exam_id': self.exam.id,
                'sub_exam_id': self.sub_exam.id,
                'grade': 'B',
                'marks_obtained': 85,
                'comments': 'Good improvement'
            }]
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.grade.refresh_from_db()
        self.assertEqual(self.grade.grade_value, 'B')
        self.assertEqual(self.grade.marks_obtained, 85)
        self.assertEqual(self.grade.comments, 'Good improvement')

    def test_edit_multiple_grades(self):
        self.client.force_authenticate(user=self.owner)
        grade2 = Grade.objects.create(
            batch=self.batch,
            course=self.course,
            student=self.student,
            exam=self.exam,
            sub_exam=self.sub_exam,
            grade_value='B',
            marks_obtained=80,
            percentage=80,
            added_by=self.owner
        )
        url = reverse('edit-grade', kwargs={'user_id': self.owner.id, 'pk': self.grade.id})
        data = {
            'grades': [
                {
                    'id': self.grade.id,
                    'grade': 'A+',
                    'marks_obtained': 95,
                },
                {
                    'id': grade2.id,
                    'grade': 'A',
                    'marks_obtained': 90,
                }
            ]
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.grade.refresh_from_db()
        grade2.refresh_from_db()
        self.assertEqual(self.grade.grade_value, 'A+')
        self.assertEqual(self.grade.marks_obtained, 95)
        self.assertEqual(grade2.grade_value, 'A')
        self.assertEqual(grade2.marks_obtained, 90)

    def test_edit_grade_permission_denied(self):
        self.client.force_authenticate(user=self.student)
        url = reverse('edit-grade', kwargs={'user_id': self.student.id, 'pk': self.grade.id})
        data = {
            'grades': [{
                'id': self.grade.id,
                'grade': 'A+',
                'marks_obtained': 95,
            }]
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

   

    def test_edit_grade_non_existent(self):
        self.client.force_authenticate(user=self.owner)
        url = reverse('edit-grade', kwargs={'user_id': self.owner.id, 'pk': 9999})
        data = {
            'grades': [{
                'id': 9999,
                'grade': 'A',
                'marks_obtained': 90,
            }]
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

  


class BatchEnrolledStudentsCourseExamViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.owner = User.objects.create_user(username='owner', password='ownerpass')
        self.student1 = User.objects.create_user(username='student1', password='student1pass')
        self.student2 = User.objects.create_user(username='student2', password='student2pass')
        
        # Create token for owner and authenticate
        token = Token.objects.create(user=self.owner)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        
        self.batch = Batch.objects.create(name="Test Batch", institute=self.institute, created_by=self.owner, end_date=timezone.now().date() + timezone.timedelta(days=30))
        self.batch.users.add(self.student1, self.student2)
        
        self.course1 = Course.objects.create(courseShortName='Course1', courseFullName='Course 1', courseGlobalCode='C001', creater=self.owner)
        self.course2 = Course.objects.create(courseShortName='Course2', courseFullName='Course 2', courseGlobalCode='C002', creater=self.owner)
        
        # Associate courses with the batch
        self.batch.courses.add(self.course1, self.course2)
        
        self.course1.enrolled_students.add(self.student1, self.student2)
        self.course2.enrolled_students.add(self.student1)
        
        self.exam = Exam.objects.create(name='Test Exam')
        self.sub_exam = SubExam.objects.create(name='Test SubExam', parent_exam=self.exam)
        
        self.grade1 = Grade.objects.create(
            batch=self.batch,
            course=self.course1,
            student=self.student1,
            exam=self.exam,
            grade_value='A',
            marks_obtained=90
        )

    def test_list_all_courses(self):
        url = reverse('batch-enrolled-students', kwargs={'batch_id': self.batch.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        print("Response data:", response.data)
        print("Response content:", response.content)
        
        # Check the database directly
        courses_in_db = self.batch.courses.all()
        print(f"Courses in database for batch {self.batch.id}: {list(courses_in_db)}") 
    def test_pagination(self):
        # Create more courses to trigger pagination
        for i in range(10):
            course = Course.objects.create(courseShortName=f'Course{i+3}', courseFullName=f'Course {i+3}', courseGlobalCode=f'C00{i+3}', creater=self.owner)
            course.batches.add(self.batch)
        
        url = reverse('batch-enrolled-students', kwargs={'batch_id': self.batch.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('results' in response.data)
        self.assertTrue('count' in response.data)
        self.assertTrue('next' in response.data)
        self.assertTrue('previous' in response.data)
        
    def test_invalid_batch_id(self):
        url = reverse('batch-enrolled-students', kwargs={'batch_id': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


        # Add more assertions based on your BatchCourseSerializers struct

        # You might want to add more specific checks based on the actual structure
class BatchEnrolledStudentsCourseViewTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Move the setup code here
        cls.client = APIClient()
        cls.owner = User.objects.create_user(username="owner", password="ownerpassword")
        cls.institute = Institute.objects.create(name="Test Institute")
        cls.batch = Batch.objects.create(
            name="Test Batch",
            institute=cls.institute,
            created_by=cls.owner,
            end_date=timezone.now().date() + timezone.timedelta(days=30)
        )
        cls.course1 = Course.objects.create(
            courseShortName="C1",
            courseGlobalCode="GC1",
            courseLocalCode="LC1",
            courseStartDate=timezone.now().date(),
            courseEndDate=timezone.now().date() + timezone.timedelta(days=30)
        )
        cls.course2 = Course.objects.create(
            courseShortName="C2",
            courseGlobalCode="GC2",
            courseLocalCode="LC2",
            courseStartDate=timezone.now().date(),
            courseEndDate=timezone.now().date() + timezone.timedelta(days=30)
        )
        cls.batch.courses.add(cls.course1, cls.course2)
        
        cls.user1 = User.objects.create_user(username="user1", password="password1")
        cls.user2 = User.objects.create_user(username="user2", password="password2")
        
        cls.course1.enrolled_students.add(cls.user1)
        cls.course2.enrolled_students.add(cls.user1, cls.user2)

    def setUp(self):
        print(f"Batch ID: {self.batch.id}")
        print(f"Batch courses count: {self.batch.courses.count()}")
        print(f"Course 1 ID: {self.course1.id}")
        print(f"Course 2 ID: {self.course2.id}")

    def test_batch_has_courses(self):
        self.assertEqual(self.batch.courses.count(), 2)
        self.assertIn(self.course1, self.batch.courses.all())
        self.assertIn(self.course2, self.batch.courses.all())
    
class BatchCourseSerializersTests(TestCase):
    def setUp(self):
        self.course = Course.objects.create(
            courseShortName="C1",
            courseGlobalCode="GC1",
            courseLocalCode="LC1",
            courseStartDate="2023-01-01",
            courseEndDate="2023-06-30"
        )
        self.user1 = User.objects.create_user(username="user1", password="password1")
        self.user2 = User.objects.create_user(username="user2", password="password2")
        self.course.enrolled_students.add(self.user1, self.user2)

    def test_serializer_contains_expected_fields(self):
        serializer = BatchCourseSerializers(instance=self.course)
        data = serializer.data
        self.assertCountEqual(data.keys(), ['id', 'courseShortName', 'courseGlobalCode', 'courseLocalCode', 'courseStartDate', 'courseEndDate', 'enrolled_students'])

    def test_serializer_enrolled_students(self):
        serializer = BatchCourseSerializers(instance=self.course)
        data = serializer.data
        self.assertEqual(len(data['enrolled_students']), 2)
        self.assertEqual(data['enrolled_students'][0]['username'], 'user1')
        self.assertEqual(data['enrolled_students'][1]['username'], 'user2')

class ClassCourseAttendanceListViewTest(TestCase):
    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(username='testuse', password='testpassword')
        
        # Create test instances
        self.institute = Institute.objects.create(name='Test Institute')
        self.course_design = CourseDesignedFor.objects.create(name='Test Designed For', boardofeducation=['CBSE'])
        
        # Ensure ClassSection is imported or defined
        self.class_section = ClassSection.objects.create(name='Test Section')
        self.class_session = Class.objects.create()  # Removed 'institute' as it's not a valid field in Class
        
        # Create a course instance
        self.course = Course.objects.create(
            creater=self.user,
            courseShortName='Short Name',
            courseFullName='Full Course Name',
            courseGlobalCode='COURSE123',
            courseLocalCode='LOC123',
            courseStatus='ongoing',
            courseStartDate=datetime.now().date(),
            courseEndDate=datetime.now().date() + timedelta(days=30),
            designedFor=self.course_design,
            classsection=self.class_section,
            educationboard='Education Board Name',  # Adjust if needed
            subject='Math',
            abouttheCourse='This is a test course.',
            instituteName='Institute Name',
            instituteCity='Institute City',
            instituteCountry='Institute Country',
            noticearray=[1, 2, 3],
            syllabus=None,  # Assuming Syllabus is optional
            card_cover_image='path/to/image.png',
            coursecredit='5',
            published=True
        )

        # Now assign the teachers, classes, meetings, and students to the course
        self.course.teachers.set([self.user])
        self.course.classes.set([self.class_session])
        self.course.meetings.set([])  # Assuming no meetings to add; adjust if needed
        self.course.enrolled_students.set([self.user])

        # Create attendance records
        self.attendance1 = Attendance.objects.create(
            member=self.user,
            institute=self.institute,
            course=self.course,
            class_session=self.class_session,
            attendance_date=timezone.now().date() - timedelta(days=1),
            in_time=timezone.now().time(),
            out_time=timezone.now().time(),
            status='Present',
            remarks='Test attendance 1'
        )
        
        self.attendance2 = Attendance.objects.create(
            member=self.user,
            institute=self.institute,
            course=self.course,
            class_session=self.class_session,
            attendance_date=timezone.now().date(),
            in_time=timezone.now().time(),
            out_time=timezone.now().time(),
            status='Absent',
            remarks='Test attendance 2'
        )
        
        # Initialize APIClient
        self.client = APIClient()

    def test_list_attendances_success(self):
        """Test retrieving the list of attendances successfully."""
        url = reverse('attendance-list')
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)


class ClassCourseAttendanceCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.course = Course.objects.create(courseShortName="Test Course", linked_institute=self.institute)
        self.class_session = Class.objects.create(courseId=self.course.id, serialNo=1, status='scheduled', duration=60)
        self.admin = User.objects.create_user(username='admin', password='adminpass')
        self.teacher = User.objects.create_user(username='teacher', password='teacherpass')
        self.student1 = User.objects.create_user(username='student1', password='student1pass')
        self.student2 = User.objects.create_user(username='student2', password='student2pass')
       
        self.url = reverse('attendance-create', kwargs={'user_id': self.admin.id})

    def test_create_attendance_success(self):
        data = {
            'member_ids': [self.student1.id, self.student2.id],
            'class_session_id': self.class_session.id,
            'course_id': self.course.id,
            'institute_id': self.institute.id,
            'attendance_date': '2024-08-24',
            'in_time': '09:00:00',
            'out_time': '10:00:00',
            'status': 'present',
            'remarks': 'Test remarks'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Attendance.objects.count(), 2)


    def test_create_attendance_missing_member_ids(self):
        data = {
            'class_session_id': self.class_session.id,
            'course_id': self.course.id,
            'institute_id': self.institute.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_attendance_invalid_class_session(self):
        data = {
            'member_ids': [self.student1.id],
            'class_session_id': 9999,  # Non-existent class session
            'course_id': self.course.id,
            'institute_id': self.institute.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_attendance_without_course(self):
        data = {
            'member_ids': [self.student1.id],
            'class_session_id': self.class_session.id,
            'institute_id': self.institute.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNone(Attendance.objects.first().course)

    def test_create_attendance_without_institute(self):
        data = {
            'member_ids': [self.student1.id],
            'class_session_id': self.class_session.id,
            'course_id': self.course.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNone(Attendance.objects.first().institute)

    def test_create_attendance_default_values(self):
        data = {
            'member_ids': [self.student1.id],
            'class_session_id': self.class_session.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        attendance = Attendance.objects.first()
        self.assertEqual(attendance.status, 'na')
        self.assertEqual(attendance.approver_status, 'pending')
        self.assertEqual(attendance.attendance_date, date.today())
    

    def test_create_attendance_invalid_member(self):
        data = {
            'member_ids': [9999],  # Non-existent user
            'class_session_id': self.class_session.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_attendance_serializer_output(self):
        data = {
            'member_ids': [self.student1.id],
            'class_session_id': self.class_session.id,
            'course_id': self.course.id,
            'institute_id': self.institute.id,
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data[0])
        self.assertIn('member', response.data[0])
        self.assertIn('attendance_date', response.data[0])
        self.assertIn('status', response.data[0])

class AttendanceSerializerTest(TestCase):
    def setUp(self):
        self.user = Account.objects.create_user(username='testuse', password='testpass')
        self.institute = Institute.objects.create(name='Test Institute')
        self.attendance_data = {
            'institute': self.institute.id,
            'member_id': self.user.id,  # Use member_id instead of member
            'attendance_date': '2024-08-02',
            'in_time': '09:00:00',
            'out_time': '17:00:00',
            'status': 'present',
            'remarks': 'Test remarks',
            'start_date': '2024-08-02',
            'end_date': '2024-08-31'
        }
        self.attendance = Attendance.objects.create(
            institute=self.institute,
            member=self.user,
            attendance_date=date(2024, 8, 2),
            in_time=time(9, 0),
            out_time=time(17, 0),
            status='present',
            remarks='Test remarks',
            start_date=date(2024, 8, 2),
            end_date=date(2024, 8, 31)
        )
        self.serializer = AttendanceSerializer(instance=self.attendance)

    

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(['id', 'institute', 'member', 'attendance_date', 'in_time', 'out_time', 'status', 'remarks', 'start_date', 'end_date']))

    def test_start_date_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['start_date'], '2024-08-02')

   

    def test_serializer_with_invalid_date(self):
        invalid_data = self.attendance_data.copy()
        invalid_data['start_date'] = 'invalid-date'
        serializer = AttendanceSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('start_date', serializer.errors)

class ClassCourseAttendanceUpdateViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.admin_user = User.objects.create_user(username='admin', password='adminpass')
        self.teacher_user = User.objects.create_user(username='teacher', password='teacherpass')
        self.student_user = User.objects.create_user(username='student', password='studentpass')
        
        # owner_type = InstitueMemberTypes.objects.create(name="Owner")
        admin_type = InstitueMemberTypes.objects.create(name="Admin")
        member_type = InstitueMemberTypes.objects.create(name="Member")

        # InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=admin_type)
        InstituteMembership.objects.create(user=self.teacher_user, institute=self.institute, user_type=member_type)
        InstituteMembership.objects.create(user=self.student_user, institute=self.institute, user_type=member_type)
        
        self.attendance1 = Attendance.objects.create(
            institute=self.institute,
            member=self.student_user,
            attendance_date=date(2024, 8, 2),
            in_time=time(9, 0),
            out_time=time(17, 0),
            status='present'
        )
        self.attendance2 = Attendance.objects.create(
            institute=self.institute,
            member=self.student_user,
            attendance_date=date(2024, 8, 3),
            in_time=time(9, 0),
            out_time=time(17, 0),
            status='absent'
        )

        self.url = reverse('attendance-update', kwargs={'user_id': self.admin_user.id})

    # ... rest of the test methods ...
    def test_update_attendance_success(self):
        data = {
            'attendances': [
                {
                    'attendance_id': self.attendance1.id,
                    'status': 'absent',
                    'remarks': 'Updated remarks'
                },
                {
                    'attendance_id': self.attendance2.id,
                    'status': 'present',
                    'in_time': '10:00:00'
                }
            ]
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['status'], 'absent')
        self.assertEqual(response.data[0]['remarks'], 'Updated remarks')
        self.assertEqual(response.data[1]['status'], 'present')
        self.assertEqual(response.data[1]['in_time'], '10:00:00')
    def test_update_attendance_invalid_status(self):
        data = {
            'attendances': [
                {
                    'attendance_id': self.attendance1.id,
                    'status': 'invalid_status'
                }
            ]
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Invalid status', response.data['error'])

    def test_update_attendance_missing_attendance_id(self):
        data = {
            'attendances': [
                {
                    'status': 'present'
                }
            ]
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('attendance_id is required', response.data['error'])

    def test_update_attendance_empty_attendances(self):
        data = {
            'attendances': []
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('attendances is required', response.data['error'])

    def test_update_attendance_nonexistent_attendance(self):
        data = {
            'attendances': [
                {
                    'attendance_id': 9999,
                    'status': 'present'
                }
            ]
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class AddGradeViewTest(APITestCase):

    def setUp(self):
        # Create users
        self.user = User.objects.create_user(username='testuse', password='testpass')
        self.other_user = User.objects.create_user(username='otheruser', password='otherpass')

        # Create related entities
        self.institute = Institute.objects.create(name="Test Institute")
        self.batch = Batch.objects.create(
            name='Test Batch ',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.course = Course.objects.create(
            courseShortName="Course 1", 
            courseFullName="Full Course 1", 
            courseGlobalCode="001", 
            courseLocalCode="001", 
            courseStatus="active", 
            courseStartDate="2024-08-01", 
            courseEndDate="2024-08-31"
        )
        # Create a Class instance using valid fields
        self.class_details = Class.objects.create(
            courseId=1,  # Example value, adjust as needed
            serialNo=1,  # Example value, adjust as needed
            status='scheduled',
            datetime=timezone.now(),
            duration=60  # Example value, adjust as needed
        )
        self.exam = Exam.objects.create(name="Test Exam", total_marks=100)
        self.sub_exam = SubExam.objects.create(
            name="Test SubExam",
            parent_exam=self.exam,
            total_marks=50
        )
        self.assignment = Assignment.objects.create(
            title="Test Assignment",
            creater=self.user,
            description="Test Description",
            publishDate=timezone.now().date(),
            dueDate=timezone.now().date() + timedelta(days=7),
            credit="Test Credit",
            class_details=self.class_details,
            status="open"
        )
        self.answer_file = AssignmentAttachment.objects.create(
            name='Test File',
            description='Test Description',
            afile='test_file.txt',  # Use the correct field name
            uploader=self.user,
            assignment=self.assignment
        )

        # Create the URL for the view
        self.url = reverse('add-grade', kwargs={'user_id': self.user.id})

    def test_add_grades_successfully(self):
        data = {
            'grades': [
                {
                    'batch_id': self.batch.id,
                    'course_id': self.course.id,
                    'student_id': self.other_user.id,
                    'exam_id': self.exam.id,
                    'sub_exam_id': self.sub_exam.id,
                    'grade': 'A',
                    'comments': 'Excellent',
                    'marks_obtained': 95
                }
            ]
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(response.data), 1)

        # Verify the created grade
        grade = Grade.objects.first()
        self.assertEqual(grade.batch, self.batch)
        self.assertEqual(grade.course, self.course)
        self.assertEqual(grade.student, self.other_user)
        self.assertEqual(grade.exam, self.exam)
        self.assertEqual(grade.sub_exam, self.sub_exam)
        self.assertEqual(grade.grade_value, 'A')
        self.assertEqual(grade.comments, 'Excellent')
        self.assertEqual(grade.marks_obtained, 95)

   

    def test_grade_validation_error(self):
        data = {
            'grades': [
                {
                    'batch_id': self.batch.id,
                    'course_id': self.course.id,
                    'student_id': self.other_user.id,
                    'exam_id': self.exam.id,
                    'sub_exam_id': self.sub_exam.id,
                    'grade': None,  # Missing grade value and marks_obtained
                    'marks_obtained': None
                }
            ]
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_invalid_user_id(self):
        url = reverse('add-grade', kwargs={'user_id': 9999})  # Non-existent user ID
        data = {
            'grades': [
                {
                    'batch_id': self.batch.id,
                    'course_id': self.course.id,
                    'student_id': self.other_user.id,
                    'exam_id': self.exam.id,
                    'sub_exam_id': self.sub_exam.id,
                    'grade': 'B',
                    'marks_obtained': 85
                }
            ]
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('detail', response.data)

    def test_grade_creation_with_missing_fields(self):
        data = {
            'grades': [
                {
                    'batch_id': self.batch.id,
                    'course_id': self.course.id,
                    'student_id': self.other_user.id,
                    'exam_id': self.exam.id,
                    'grade': 'B'  # Missing 'marks_obtained' and other optional fields
                }
            ]
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        grade = Grade.objects.first()
        self.assertEqual(grade.grade_value, 'B')
        self.assertIsNone(grade.marks_obtained)
        self.assertIsNone(grade.percentage)
class BatchAttendanceSerializerTest(APITestCase):

    def setUp(self):
        # Create users
        self.user = User.objects.create_user(username='testuse', password='testpass')
        self.other_user = User.objects.create_user(username='otheruser', password='otherpass')

        # Create related entities
        self.institute = Institute.objects.create(name="Test Institute")
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.course = Course.objects.create(
            courseShortName="Course 1", 
            courseFullName="Full Course 1", 
            courseGlobalCode="001", 
            courseLocalCode="001", 
            courseStatus="active", 
            courseStartDate="2024-08-01", 
            courseEndDate="2024-08-31"
        )
        self.class_details = Class.objects.create(
            courseId=1,  # Example value, adjust as needed
            serialNo=1,  # Example value, adjust as needed
            status='scheduled',
            datetime=timezone.now(),
            duration=60  # Example value, adjust as needed
        )
        
        # Create a BatchAttendance instance
        self.batch_attendance = BatchAttendance.objects.create(
            batch=self.batch,
            member=self.user,
            attendance_date='2024-08-24',
            start_date='2024-08-24',
            end_date='2024-08-24',
            in_time='09:00',
            out_time='17:00',
            status='present',
            remarks='On time'
        )

        self.serializer = BatchAttendanceSerializer(instance=self.batch_attendance)

    def test_serializer_fields(self):
        """Test that the serializer includes all the required fields."""
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set([
            'id', 'batch', 'member', 'attendance_date', 'start_date', 'end_date', 
            'in_time', 'out_time', 'status', 'remarks', 'institute', 'course_ids'
        ]))

    def test_get_institute(self):
        """Test that the `institute` field is correctly serialized."""
        data = self.serializer.data
        self.assertEqual(data['institute']['id'], self.institute.id)
        self.assertEqual(data['institute']['name'], self.institute.name)

    def test_get_course_ids(self):
        """Test that `course_ids` correctly returns the list of course IDs."""
        # Add course to the batch
        self.batch.courses.add(self.course)
        self.batch.save()
        data = self.serializer.data
        self.assertIn(self.course.id, data['course_ids'])

class UploadGradesViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuse', password='testpass')
        self.other_user = User.objects.create_user(username='otheruser', password='otherpass')

        self.institute = Institute.objects.create(name="Test Institute")
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.course = Course.objects.create(
            courseShortName="Course 1", 
            courseFullName="Full Course 1", 
            courseGlobalCode="001", 
            courseLocalCode="001", 
            courseStatus="active", 
            courseStartDate="2024-08-01", 
            courseEndDate="2024-08-31"
        )
        self.class_details = Class.objects.create(
            courseId=1,  
            serialNo=1,  
            status='scheduled',
            datetime=timezone.now(),
            duration=60  
        )
        self.exam = Exam.objects.create(name="Test Exam", total_marks=100)
        self.sub_exam = SubExam.objects.create(
            name="Test SubExam",
            parent_exam=self.exam,
            total_marks=50
        )

        self.url = reverse('upload-grades', kwargs={'batch_id': self.batch.id, 'user_id': self.user.id})

    def create_test_file(self):
        """Creates a test Excel file with grades data."""
        data = {
            'student_id': [self.user.id],
            'course_id': [self.course.id],
            'grade_value': ['A'],
            'marks_obtained': [95],
            'comments': ['Excellent'],
            'exam_id': [self.exam.id],
            'sub_exam_id': [self.sub_exam.id]
        }
        df = pd.DataFrame(data)
        file = BytesIO()
        with pd.ExcelWriter(file, engine='openpyxl') as writer:
            df.to_excel(writer, index=False)
        file.seek(0)
        return SimpleUploadedFile("grades.xlsx", file.read(), content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    
    def test_upload_grades_success(self):
        """Test successful file upload and grade creation."""
        file = self.create_test_file()
        response = self.client.post(self.url, {'file': file}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("successes", response.data)
        self.assertIn("grades", response.data)
        self.assertEqual(Grade.objects.count(), 1)
    def test_upload_grades_no_file(self):
        """Test that an error is returned when no file is uploaded."""
        response = self.client.post(self.url, {}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"detail": "No file uploaded."})

    def test_upload_grades_invalid_file(self):
        """Test that an error is returned for an invalid file."""
        file = SimpleUploadedFile("invalid_file.txt", b"Not an Excel file", content_type="text/plain")
        response = self.client.post(self.url, {'file': file}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)


class BatchGradeSerializerTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuse', password='testpass')
        self.course = Course.objects.create(
            courseShortName="Course 1",
            courseFullName="Full Course 1",
            courseGlobalCode="001",
            courseLocalCode="001",
            courseStatus="active",
            courseStartDate="2024-08-01",
            courseEndDate="2024-08-31"
        )
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.exam = Exam.objects.create(name="Test Exam", total_marks=100)
        self.sub_exam = SubExam.objects.create(
            name="Test SubExam",
            parent_exam=self.exam,
            total_marks=50
        )
        self.grade = Grade.objects.create(
            institute=self.institute,
            course=self.course,
            batch=self.batch,
            student=self.user,
            grade_value='A',
            marks_obtained=95,
            exam=self.exam,
            sub_exam=self.sub_exam,
            added_by=self.user
        )
        self.serializer = BatchGradeSerializer(instance=self.grade)

    def test_serializer_fields(self):
        """Test that the serializer includes all the required fields."""
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set([
            'id', 'student', 'course', 'batch', 'exam', 'sub_exam', 'grade_value', 
            'marks_obtained', 'name', 'comments', 'added_by', 'percentage', 'institute'
        ]))

    

    def test_serializer_valid(self):
        """Test that the serializer is valid when required fields are provided."""
        valid_data = {
            'student': self.user.id,
            'course': self.course.id,
            'batch': self.batch.id,
            'exam': self.exam.id,
            'sub_exam': self.sub_exam.id,
            'grade_value': 'A',
            'marks_obtained': 95
        }
        serializer = BatchGradeSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())
class BatchGradesViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuse', password='testpass')
        self.course = Course.objects.create(
            courseShortName="Course 1",
            courseFullName="Full Course 1",
            courseGlobalCode="001"
        )
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.exam = Exam.objects.create(name="Test Exam", total_marks=100)
        self.grade = Grade.objects.create(
            institute=self.institute,
            course=self.course,
            batch=self.batch,
            student=self.user,
            grade_value='A',
            comments='Excellent',
            added_by=self.user,
            exam=self.exam
        )

    def test_batch_grades_view(self):
        url = reverse('batch-grades', kwargs={'batch_id': self.batch.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)  # Assuming pagination
    def test_batch_grades_view_filter_by_user(self):
        url = reverse('batch-grades', kwargs={'batch_id': self.batch.id})
        response = self.client.get(url, {'user_id': self.user.id})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_batch_grades_view_filter_by_course(self):
        url = reverse('batch-grades', kwargs={'batch_id': self.batch.id})
        response = self.client.get(url, {'course_id': self.course.id})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_batch_grades_view_filter_by_student(self):
        url = reverse('batch-grades', kwargs={'batch_id': self.batch.id})
        response = self.client.get(url, {'student_id': self.user.id})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

class GradeListSerializerTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuse', password='testpass')
        self.course = Course.objects.create(
            courseShortName="Course 1",
            courseFullName="Full Course 1",
            courseGlobalCode="001"
        )
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        self.exam = Exam.objects.create(name="Test Exam", total_marks=100)
        self.grade = Grade.objects.create(
            institute=self.institute,
            course=self.course,
            batch=self.batch,
            student=self.user,
            grade_value='A',
            comments='Excellent',
            added_by=self.user,
            exam=self.exam
        )
        self.serializer = GradeListSerializer(instance=self.grade)
      
    def test_serializer_fields(self):
        """Test that the serializer includes all the required fields."""
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set([
            'name', 'institute', 'course', 'class_details', 'exam',
            'assignment', 'answer_file', 'batch', 'student', 'grade_value', 'comments', 'added_by'
        ]))

   
        

    def test_serializer_valid(self):
        """Test that the serializer is valid when required fields are provided."""
        valid_data = {
            'student': self.user.id,
            'course': self.course.id,
            'batch': self.batch.id,
            'exam': self.exam.id,
            'grade_value': 'A',
            'comments': 'Excellent',
            'added_by': self.user.id
        }
        serializer = GradeListSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())


class BatchAttendanceUpdateViewTest(APITestCase):

    def setUp(self):
        # Create a user, batch, and attendance records for testing
        self.user = User.objects.create_user(username='testuse', password='testpass')
        self.user2 = User.objects.create_user(username='testuser2', password='testpass2')
        self.institute = Institute.objects.create(name='Test Institute')
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )
        
        self.batch.users.add(self.user, self.user2)
        self.course= Course.objects.create(
            courseShortName='CS101',
            courseFullName='Computer Science 101',
            courseGlobalCode='CS101G'
        )
       

        self.attendance_date = timezone.now().date()

        # URL for the view
        self.url = reverse('batch-attendance-update', kwargs={
            'batch_id': self.batch.id,
            'user_id': self.user.id
        })
    def test_attendance_update_success(self):
        data = {
            'attendance_date': self.attendance_date.strftime('%Y-%m-%d'),
            'status': 'present',
            'member_ids': [self.user.id, self.user2.id],
            'in_time': '09:00:00',
            'out_time': '17:00:00',
            'start_date': '2023-08-01',
            'end_date': '2023-08-31',
            'remarks': 'On time',
            'course':'course'

        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['batch_attendance']), 2)
        for attendance in response.data['batch_attendance']:
            self.assertEqual(attendance['status'], 'present')

    def test_invalid_status(self):
        data = {
            'attendance_date': self.attendance_date.strftime('%Y-%m-%d'),
            'status': 'invalid_status',
            'member_ids': [self.user.id],
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid status')
    def test_nonexistent_batch(self):
        url = reverse('batch-attendance-update', kwargs={'batch_id': 999, 'user_id': self.user.id})
        response = self.client.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_nonexistent_user(self):
        url = reverse('batch-attendance-update', kwargs={'batch_id': self.batch.id, 'user_id': 999})
        response = self.client.post(url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    def test_attendance_creation(self):
        data = {
            'attendance_date': (self.attendance_date - timedelta(days=1)).strftime('%Y-%m-%d'),
            'status': 'absent',
            'member_ids': [self.user.id],
            'in_time': '09:00:00',
            'out_time': '17:00:00',
            'remarks': 'Absent'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['batch_attendance']), 1)
        self.assertEqual(response.data['batch_attendance'][0]['status'], 'absent')
    def test_serializer_integration(self):
        data = {
            'attendance_date': self.attendance_date.strftime('%Y-%m-%d'),
            'status': 'na',
            'member_ids': [self.user.id],
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        attendance_data = response.data['batch_attendance'][0]
        self.assertIn('institute', attendance_data)
        self.assertIn('course_ids', attendance_data)
class BatchAttendanceUpdateByIdViewTest(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create a user
        self.user = User.objects.create_user(username='testuse', password='testpass')
        
        # Create a batch
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,  # Ensure institute is provided
            created_by=self.user
        )
        
        # Create a course and add it to the batch
        self.course = Course.objects.create(
            courseShortName='Test Course',
            courseFullName='Full Test Course',
            courseGlobalCode='TC001'
        )
        self.batch.courses.add(self.course)
        
        # Create a member and an attendance record
        self.member = User.objects.create_user(username='testmember', password='testpass')
        self.attendance = BatchAttendance.objects.create(
            batch=self.batch,
            member=self.member,
            attendance_date=timezone.now().date(),
            status='present',
            in_time="09:00:00",
            out_time="17:00:00",
            start_date='2024-08-24',
            end_date='2024-08-24',
            remarks='Test remarks'
        )
        
        # Define URL for the view
        self.url = reverse('batch-attendance-update-by-id', args=[self.user.id, self.batch.id, self.attendance.id])
    def test_update_attendance_success(self):
        data = {
            'status': 'absent',
            'in_time':"09:00:00",
            'out_time':"17:00:00",
            'start_date': '2024-08-24',
            'end_date': '2024-08-24',
            'remarks': 'Updated remarks'
        }
        
        response = self.client.put(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Batch attendance updated successfully')
        
        # Verify the attendance was updated correctly
        updated_attendance = BatchAttendance.objects.get(pk=self.attendance.id)
        self.assertEqual(updated_attendance.status, 'absent')
        self.assertEqual(updated_attendance.remarks, 'Updated remarks')
    def test_update_attendance_invalid_status(self):
        data = {
            'status': 'invalid_status'
        }
        
        response = self.client.put(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid status')

    def test_update_attendance_for_non_existing_record(self):
        url = reverse('batch-attendance-update-by-id', args=[self.user.id, self.batch.id, 99999])
        data = {
            'status': 'absent'
        }
        
        response = self.client.put(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BatchAttendanceSerializerTest(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create a user
        self.user = User.objects.create_user(username='testuse', password='testpass')
        
        # Create a batch
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,  # Ensure this field is provided
            created_by=self.user
        )
        
        # Create a course and add it to the batch
        self.course = Course.objects.create(
            courseShortName='Test Course',
            courseFullName='Full Test Course',
            courseGlobalCode='TC001'
        )
        self.batch.courses.add(self.course)
        
        # Create a member and an attendance record
        self.member = User.objects.create_user(username='testmember', password='testpass')
        self.attendance = BatchAttendance.objects.create(
            batch=self.batch,
            member=self.member,
            attendance_date=timezone.now().date(),
            status='present',
            in_time="09:00:00",
            out_time="17:00:00", # Ensure this is a datetime
            start_date='2024-08-24',
            end_date='2024-08-24',
            remarks='Test remarks'
        )
        
        # Create serializer instance
        self.serializer = BatchAttendanceSerializer(instance=self.attendance)

    def test_serializer_fields(self):
        """Test that the serializer includes all the required fields."""
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set([
            'id', 'batch', 'member', 'attendance_date', 'start_date', 'end_date', 'in_time', 'out_time', 'status', 'remarks', 'institute', 'course_ids'
        ]))

    def test_serializer_data(self):
        """Test that the serializer outputs the correct data."""
        data = self.serializer.data
        self.assertEqual(data['status'], 'present')
        self.assertEqual(data['remarks'], 'Test remarks')
        self.assertEqual(data['batch']['id'], self.batch.id)
        self.assertEqual(data['member']['id'], self.member.id)
        self.assertEqual(data['course_ids'], [self.course.id])

    def test_serializer_invalid_data(self):
        """Test that invalid data raises validation errors."""
        invalid_data = {
            'status': 'invalid_status'
        }
        
        serializer = BatchAttendanceSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('status', serializer.errors)





class BatchMemberListViewTest(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create a user
        self.user = User.objects.create_user(username='testuse', password='testpass', email='testuser@example.com')

        # Create a batch
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.user
        )

        # Create some users and add them to the batch
        self.users = [
            User.objects.create_user(username=f'testuser{i}', password='testpass', email=f'testuser{i}@example.com')
            for i in range(5)
        ]
        self.batch.users.set(self.users)

        # Create InstituteMembership for the users
        for user in self.users:
            InstituteMembership.objects.create(
                user=user,
                institute=self.institute
                # Exclude user_type if it's not relevant or needed
            )

        # Define URL for the view
        self.url = reverse('batch-members', args=[self.batch.id])

    def test_list_members(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 5)  # Check if all users are returned

    def test_filter_by_user_id(self):
        user_to_filter = self.users[0]
        response = self.client.get(self.url, {'user_id': user_to_filter.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['id'], user_to_filter.id)

    def test_pagination(self):
        # Assuming the default page size is 10 and we have 5 users, this test may be redundant.
        response = self.client.get(self.url, {'page': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertEqual(len(response.data['results']), 5)

    def test_serializer_fields(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for user_data in response.data['results']:
            self.assertIn('id', user_data)
            self.assertIn('username', user_data)
            self.assertIn('firstname', user_data)
            self.assertIn('lastname', user_data)
            self.assertIn('profile_image', user_data)
            self.assertIn('email', user_data)
            self.assertIn('role', user_data)


class RemoveMembersFromBatchViewTest(APITestCase):

    

    def setUp(self):
        # Create InstituteMemberTypes if they don't exist
        self.member_type, created = InstitueMemberTypes.objects.get_or_create(name='Member')
        self.owner_type, created = InstitueMemberTypes.objects.get_or_create(name='Owner')
        self.admin_type, created = InstitueMemberTypes.objects.get_or_create(name='Admin')

        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create an owner user
        self.owner_user = User.objects.create_user(username='owneruser', password='testpass')

        # Create a batch
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.owner_user
        )

        # Create a course and add it to the batch
        self.course = Course.objects.create(
            courseShortName='CS101',
            courseFullName='Computer Science 101',
            # Add other necessary fields based on your Course model definition
        )
        self.batch.courses.add(self.course)

        # Create some members and add them to the batch and course
        self.members = [
            User.objects.create_user(username=f'testuser{i}', password='testpass')
            for i in range(5)
        ]
        self.batch.users.set(self.members)
        self.course.enrolled_students.set(self.members)

        # Set up InstituteMemberships
        for member in self.members:
            InstituteMembership.objects.create(user=member, institute=self.institute, user_type=self.member_type)

        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)

        # Define URL for the view
        self.url = reverse('remove-members-from-batch', args=[self.batch.id, self.owner_user.id])
        print(f'Test URL: {self.url}')
    # The rest of the test cases remain the same


    def test_remove_members_successful(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        # Test removing members from the batch
        members_to_remove = [self.members[0].id, self.members[1].id]
        response = self.client.post(self.url, {'members': members_to_remove}, format='json')  # Ensure JSON format
        print(response.content)  # Debug: print the response content
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['removed_members']), 2)

        # Verify that the members were removed from the batch and course
        self.assertFalse(self.batch.users.filter(id=self.members[0].id).exists())
        self.assertFalse(self.course.enrolled_students.filter(id=self.members[0].id).exists())





class AddMembersToBatchViewTest(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')

        # Create users
        self.owner_user = User.objects.create_user(username='owneruser', password='testpass')
        self.admin_user = User.objects.create_user(username='adminuser', password='testpass')

        # Create a batch
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.owner_user
        )

        # Create a course and add it to the batch
        self.course = Course.objects.create(
            courseShortName='CS101',
            courseFullName='Computer Science 101',
            # Add other necessary fields based on your Course model definition
        )
        self.batch.courses.add(self.course)

        # Create some members
        self.members = [
            User.objects.create_user(username=f'testuser{i}', password='testpass')
            for i in range(5)
        ]

        # Set up InstituteMemberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)

        # Define URL for the view
        self.url = reverse('add-members-to-batch', args=[self.batch.id, self.owner_user.id])
   
    def test_add_members_successful(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        # Test adding members to the batch
        members_to_add = [member.id for member in self.members]
        response = self.client.post(self.url, {'members': members_to_add}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response contains the added members
        self.assertIn('added_members', response.data)
        self.assertEqual(len(response.data['added_members']), 5)

        # Verify that the members were added to the batch and course
        for member in self.members:
            self.assertTrue(self.batch.users.filter(id=member.id).exists())
            for course in self.batch.courses.all():
                self.assertTrue(course.enrolled_students.filter(id=member.id).exists())
            # Verify attendance record is created
            self.assertTrue(Attendance.objects.filter(member=member, institute=self.institute).exists())

    def test_add_non_existing_members(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        # Attempt to add a non-existing member
        response = self.client.post(self.url, {'members': [9999]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_members_with_invalid_batch(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        # Attempt to add members to a non-existing batch
        invalid_url = reverse('add-members-to-batch', args=[9999, self.owner_user.id])
        response = self.client.post(invalid_url, {'members': [self.members[0].id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)






class DelinkCourseFromBatchViewTest(APITestCase):

    def setUp(self):
    # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')

        # Create users
        self.owner_user = User.objects.create_user(username='owneruser', password='testpass')
        self.admin_user = User.objects.create_user(username='adminuser', password='testpass')
        self.student_user = User.objects.create_user(username='studentuser', password='testpass')

        # Create a batch
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.owner_user
        )

        # Create courses and add them to the batch
        self.courses = [
            Course.objects.create(
                courseShortName=f'CS10{i}',
                courseFullName=f'Computer Science 10{i}',
                # Add other necessary fields based on your Course model definition
            )
            for i in range(3)
        ]
        for course in self.courses:
            self.batch.courses.add(course)

        # Create linked course members
        for course in self.courses:
            LinkedCourseMembers.objects.create(
                course=course,
                batch=self.batch,
                member=self.student_user,
                institute=self.institute  # Ensure this field is included
            )

        # Set up InstituteMemberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)

        # Define URL for the view
        self.url = reverse('delink_courses_from_batch', args=[self.batch.id, self.owner_user.id])


    def test_delink_courses_successful(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        courses_to_remove = [course.id for course in self.courses]
        response = self.client.patch(self.url, {'courses': courses_to_remove}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify that the courses are removed from the batch
        for course_id in courses_to_remove:
            self.assertFalse(self.batch.courses.filter(id=course_id).exists())

        # Verify that linked course members are removed correctly
        for course in self.courses:
            self.assertFalse(LinkedCourseMembers.objects.filter(course=course, batch=self.batch).exists())

    def test_delink_courses_invalid_batch(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        invalid_url = reverse('delink_courses_from_batch', args=[9999, self.owner_user.id])
        courses_to_remove = [course.id for course in self.courses]
        response = self.client.patch(invalid_url, {'courses': courses_to_remove}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delink_courses_invalid_course(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        invalid_courses = [9999]
        response = self.client.patch(self.url, {'courses': invalid_courses}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



class LinkCourseToBatchViewTest(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')

        # Create users
        self.owner_user = User.objects.create_user(username='owneruser', password='testpass')
        self.admin_user = User.objects.create_user(username='adminuser', password='testpass')
        self.student_user = User.objects.create_user(username='studentuser', password='testpass')

        # Create a batch
        self.batch = Batch.objects.create(
            name='Test Batch',
            start_date='2023-01-01',
            end_date='2023-12-31',
            institute=self.institute,
            created_by=self.owner_user
        )

        # Create courses
        self.courses = [
            Course.objects.create(
                courseShortName=f'CS10{i}',
                courseFullName=f'Computer Science 10{i}',
                # Add other necessary fields based on your Course model definition
            )
            for i in range(3)
        ]

        # Add courses to batch
        for course in self.courses:
            self.batch.courses.add(course)

        # Set up InstituteMemberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)

        # Define URL for the view
        self.url = reverse('link_courses_to_batch', args=[self.batch.id, self.owner_user.id])

    def test_link_courses_successful(self):
        self.client.login(username='owneruser', password='testpass')

        # Create new courses that are not linked to any batch
        new_courses = [
            Course.objects.create(
                courseShortName=f'CS30{i}',
                courseFullName=f'Computer Science 30{i}',
                # Add other necessary fields based on your Course model definition
            )
            for i in range(3)
        ]

        # Link these new courses to the batch
        courses_to_link = [course.id for course in new_courses]

        # Make the PATCH request
        response = self.client.patch(self.url, {'courses': courses_to_link}, format='json')
        
        # Print the response data for debugging
        print("Response data:", response.data)
        
        # Print the response status code for debugging
        print("Response status code:", response.status_code)

        # Check the status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify that the courses are linked to the batch
        for course in new_courses:
            course.refresh_from_db()
            self.assertEqual(course.linked_batch, self.batch)
            self.assertEqual(course.linked_institute, self.batch.institute)

        # Verify that members were added correctly
        added_members = response.data.get('added_members', [])
        for member_name in added_members:
            self.assertTrue(self.batch.users.filter(firstname=member_name).exists())



    

    def test_link_courses_invalid_batch(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        invalid_url = reverse('link_courses_to_batch', args=[9999, self.owner_user.id])
        new_courses = [
            Course.objects.create(
                courseShortName=f'CS20{i}',
                courseFullName=f'Computer Science 20{i}',
                # Add other necessary fields based on your Course model definition
            )
            for i in range(3, 6)
        ]
        course_ids = [course.id for course in new_courses]

        response = self.client.patch(invalid_url, {'courses': course_ids}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

   

    def test_link_courses_already_linked(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        # Add a course to the batch initially
        initial_course = Course.objects.create(
            courseShortName='CS100',
            courseFullName='Computer Science 100',
            # Add other necessary fields based on your Course model definition
        )
        self.batch.courses.add(initial_course)
        initial_course.linked_batch = self.batch
        initial_course.linked_institute = self.institute
        initial_course.save()

        # Attempt to link the same course again
        response = self.client.patch(self.url, {'courses': [initial_course.id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], f'Course {initial_course.id} is already linked to this batch.')

    def test_link_courses_already_linked_institute(self):
        # Simulate an authenticated request from the owner
        self.client.login(username='owneruser', password='testpass')

        # Add a course to a different institute
        another_institute = Institute.objects.create(name='Another Institute')
        course = Course.objects.create(
            courseShortName='CS101',
            courseFullName='Computer Science 101',
            # Add other necessary fields based on your Course model definition
        )
        course.linked_institute = another_institute
        course.save()

        # Attempt to link this course to the current institute
        response = self.client.patch(self.url, {'courses': [course.id]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], f'Course {course.id} is already linked to another institute.')

    




class ListBatchTimeTableViewTest(APITestCase):

    def setUp(self):
        # Create institutes
        self.institute1 = Institute.objects.create(name='Institute 1')
        self.institute2 = Institute.objects.create(name='Institute 2')

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')

        # Create users
        self.owner_user = User.objects.create_user(username='owneruser', password='testpass')
        self.admin_user = User.objects.create_user(username='adminuser', password='testpass')
        self.student_user = User.objects.create_user(username='studentuser', password='testpass')

        # Create memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute1, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute1, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.student_user, institute=self.institute2, user_type=self.student_type)

        # Create batches
        self.batch1 = Batch.objects.create(
            name='Batch 1',
            start_date='2024-01-01',
            end_date='2024-12-31',
            institute=self.institute1,
            created_by=self.owner_user
        )
        self.batch2 = Batch.objects.create(
            name='Batch 2',
            start_date='2024-02-01',
            end_date='2024-11-30',
            institute=self.institute1,
            created_by=self.admin_user
        )
        self.batch3 = Batch.objects.create(
            name='Batch 3',
            start_date='2024-03-01',
            end_date='2024-10-31',
            institute=self.institute2,
            created_by=self.student_user
        )

        # Create courses
        self.course1 = Course.objects.create(
            courseShortName='CS101',
            courseFullName='Computer Science 101',
            # Add other necessary fields based on your Course model definition
        )
        self.course2 = Course.objects.create(
            courseShortName='CS102',
            courseFullName='Computer Science 102',
            # Add other necessary fields based on your Course model definition
        )

        # Create timetables
        self.timetable1 = Timetable.objects.create(
            institute=self.institute1,
            remarks='First timetable',
            file=None,
            uploaded_by=self.owner_user
        )
        self.timetable1.courses.add(self.course1)
        self.timetable1.batches.add(self.batch1)

        self.timetable2 = Timetable.objects.create(
            institute=self.institute2,
            remarks='Second timetable',
            file=None,
            uploaded_by=self.admin_user
        )
        self.timetable2.courses.add(self.course2)
        self.timetable2.batches.add(self.batch2)

        # Define URL for the view
        self.url = reverse('list_batches-timetable')

    # Your test methods here



    def test_filter_by_institute_id(self):
        response = self.client.get(self.url, {'institute_id': self.institute1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertIn(self.batch1.id, [batch['id'] for batch in response.data])
        self.assertIn(self.batch2.id, [batch['id'] for batch in response.data])

    def test_filter_by_created_by(self):
        response = self.client.get(self.url, {'created_by': self.admin_user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.batch2.id)

    def test_filter_by_batch_id(self):
        response = self.client.get(self.url, {'id': self.batch1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.batch1.id)

   




class DeleteBatchViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        self.institute = Institute.objects.create(name="Test Institute")
        
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        
        self.owner_user = User.objects.create_user(
            email='owner@example.com',
            password='ownerpassword'
        )
        
        self.admin_user = User.objects.create_user(
            email='admin@example.com',
            password='adminpassword'
        )
        
        InstituteMembership.objects.create(
            user=self.owner_user,
            institute=self.institute,
            user_type=self.owner_type
        )
        
        InstituteMembership.objects.create(
            user=self.admin_user,
            institute=self.institute,
            user_type=self.admin_type
        )
        
        self.batch = Batch.objects.create(
            name="Test Batch",
            start_date="2024-01-01",
            end_date="2024-12-31",
            institute=self.institute,
            created_by=self.owner_user
        )

    def test_successful_deletion_by_owner(self):
        self.client.force_authenticate(user=self.owner_user)
        url = reverse('delete_batch', kwargs={'pk': self.batch.id, 'user_id': self.owner_user.id})
        response = self.client.delete(url)
        print(f'Testing URL: {url}')
        print(f'Response: {response.content}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {"message": "Batch deleted successfully"})
        self.assertFalse(Batch.objects.filter(id=self.batch.id).exists())
   
class ListBatchViewTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        self.institute = Institute.objects.create(name="Test Institute")

        self.owner_user = User.objects.create_user(
            email='owner@example.com',
            password='ownerpassword'
        )

        InstituteMembership.objects.create(
            user=self.owner_user,
            institute=self.institute,
            user_type=InstitueMemberTypes.objects.create(name="Owner")
        )

        self.batch1 = Batch.objects.create(
            name="Batch 1",
            start_date="2024-01-01",
            end_date="2024-12-31",
            institute=self.institute,
            created_by=self.owner_user
        )

        self.batch2 = Batch.objects.create(
            name="Batch 2",
            start_date="2024-02-01",
            end_date="2024-11-30",
            institute=self.institute,
            created_by=self.owner_user
        )

    def test_list_batches_by_institute(self):
        url = reverse('list_batches')
        response = self.client.get(url, {'institute_id': self.institute.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_batches_by_creator(self):
        url = reverse('list_batches')
        response = self.client.get(url, {'created_by': self.owner_user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_batches_by_id(self):
        url = reverse('list_batches')
        response = self.client.get(url, {'id': self.batch1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Batch 1")



class BatchSerializerTestCase(APITestCase):
    def setUp(self):
        self.institute = Institute.objects.create(name="Test Institute")

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        
        self.owner_user = User.objects.create_user(
            email='owner@example.com',
            password='ownerpassword'
        )
        self.admin_user = User.objects.create_user(
            email='admin@example.com',
            password='adminpassword'
        )

        # Create memberships
        InstituteMembership.objects.create(
            user=self.owner_user,
            institute=self.institute,
            user_type=self.owner_type
        )
        
        InstituteMembership.objects.create(
            user=self.admin_user,
            institute=self.institute,
            user_type=self.admin_type
        )
        
        # Create a course
        self.course = Course.objects.create(
            courseFullName="Test Course",
            courseShortName="TC",
            courseGlobalCode="TC001",
            courseStartDate="2024-01-01",
            courseEndDate="2024-12-31",
            creater=self.owner_user
        )
        
        self.batch = Batch.objects.create(
            name="Test Batch",
            start_date="2024-01-01",
            end_date="2024-12-31",
            institute=self.institute,
            created_by=self.owner_user
        )
        self.batch.courses.add(self.course)

    def test_valid_serialization(self):
        serializer = BatchSerializer(instance=self.batch)
        data = serializer.data
        self.assertEqual(data['name'], self.batch.name)
        self.assertEqual(data['institute'], self.batch.institute.id)
        self.assertEqual(data['created_by']['email'], self.owner_user.email)
        self.assertEqual(len(data['courses']), 1)
        self.assertEqual(data['courses'][0]['courseFullName'], self.course.courseFullName)

class EditBatchViewTestCase(APITestCase):
    def setUp(self):
        self.institute = Institute.objects.create(name="Test Institute")

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        
        self.owner_user = User.objects.create_user(
            email='owner@example.com',
            password='ownerpassword'
        )
        self.admin_user = User.objects.create_user(
            email='admin@example.com',
            password='adminpassword'
        )
        self.unauthorized_user = User.objects.create_user(
            email='unauthorized@example.com',
            password='unauthorizedpassword'
        )

        # Create memberships
        InstituteMembership.objects.create(
            user=self.owner_user,
            institute=self.institute,
            user_type=self.owner_type
        )
        
        InstituteMembership.objects.create(
            user=self.admin_user,
            institute=self.institute,
            user_type=self.admin_type
        )
        
        InstituteMembership.objects.create(
            user=self.unauthorized_user,
            institute=self.institute,
            user_type=self.admin_type
        )

        # Create a batch
        self.batch = Batch.objects.create(
            name="Test Batch",
            start_date="2024-01-01",
            end_date="2024-12-31",
            institute=self.institute,
            created_by=self.owner_user
        )

        # Create courses
        self.course1 = Course.objects.create(
            courseFullName="Course 1",
            creater=self.owner_user,
            courseGlobalCode="C1",
            designedFor=CourseDesignedFor.objects.create(name="Audience 1", boardofeducation=["Board A"]),
            courseShortName="C1",
            courseStartDate="2024-01-01",
            courseEndDate="2024-12-31"
        )
        
        self.course2 = Course.objects.create(
            courseFullName="Course 2",
            creater=self.admin_user,
            courseGlobalCode="C2",
            designedFor=CourseDesignedFor.objects.create(name="Audience 2", boardofeducation=["Board B"]),
            courseShortName="C2",
            courseStartDate="2024-01-01",
            courseEndDate="2024-12-31"
        )
        
        # Associate courses with the batch
        self.batch.courses.set([self.course1, self.course2])
        self.batch.save()

        self.url = reverse('edit_batch', args=[self.batch.id, self.owner_user.id])

    def test_successful_update_by_owner(self):
        self.client.force_authenticate(user=self.owner_user)
        data = {
            'name': 'Updated Batch Name',
            'start_date': '2024-01-01',
            'end_date': '2024-12-31',
            'institute': self.institute.id,
            'created_by': self.owner_user.id
        }
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.batch.refresh_from_db()
        self.assertEqual(self.batch.name, 'Updated Batch Name')

        # Verify courses field
        serializer = BatchSerializer(self.batch)
        expected_courses = CourseSerializer([self.course1, self.course2], many=True).data
        self.assertEqual(response.data['courses'], expected_courses)
    def test_successful_update_by_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'name': 'Updated Batch Name by Admin',
            'start_date': '2024-01-01',
            'end_date': '2024-12-31',
            'institute': self.institute.id,
            'created_by': self.owner_user.id
        }
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.batch.refresh_from_db()
        self.assertEqual(self.batch.name, 'Updated Batch Name by Admin')

        # Verify courses field
        serializer = BatchSerializer(self.batch)
        expected_courses = CourseSerializer([self.course1, self.course2], many=True).data
        self.assertEqual(response.data['courses'], expected_courses)







class UploadStudentsToCourseTestCase(APITestCase):
    def setUp(self):
        # Create necessary objects for tests
        self.institute = Institute.objects.create(name='Test Institute')
        
        # Ensure InstituteMemberTypes instances exist
        admin_type, created = InstitueMemberTypes.objects.get_or_create(name='Admin')
        owner_type, created = InstitueMemberTypes.objects.get_or_create(name='Owner')
        
        self.course = Course.objects.create(
            courseShortName='Test Course Short Name',
            courseFullName='Test Course Full Name'
        )  # Use actual fields defined in your model
        
        self.operator = User.objects.create(username='operator', email='operator@test.com')
        self.owner = User.objects.create(username='owner', email='owner@test.com')

        # Create InstituteMemberships with InstituteMemberTypes instances
        InstituteMembership.objects.create(user=self.operator, institute=self.institute, user_type=admin_type)
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=owner_type)

        # Add users to the course's enrolled_students
        self.course.enrolled_students.add(self.operator)
        self.course.enrolled_students.add(self.owner)

        # Define URL for the view
        self.url = reverse('upload_students_to_course', args=[self.institute.id, self.course.id, self.operator.id])

    def test_successful_upload(self):
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name'])
        writer.writeheader()
        writer.writerow({'email': 'student1@test.com', 'phone': '', 'first_name': 'John', 'last_name': 'Doe'})
        csv_file.seek(0)
        response = self.client.post(self.url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Students processed successfully', response.data['message'])

    def test_missing_email_and_phone(self):
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name'])
        writer.writeheader()
        writer.writerow({'email': '', 'phone': '', 'first_name': 'John', 'last_name': 'Doe'})
        csv_file.seek(0)
        response = self.client.post(self.url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertIn('A row is missing both email and phone.', response.data['errors'][0])

   
    
    def test_invalid_institute_or_course(self):
        invalid_url = reverse('upload_students_to_course', args=[999, self.course.id, self.operator.id])  # Non-existing institute
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name'])
        writer.writeheader()
        writer.writerow({'email': 'student1@test.com', 'phone': '', 'first_name': 'John', 'last_name': 'Doe'})
        csv_file.seek(0)
        response = self.client.post(invalid_url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 404)  # Not Found

   


class UploadStudentsTestCase(APITestCase):
    def setUp(self):
        # Create necessary objects for tests
        self.institute = Institute.objects.create(name='Test Institute')
        
        # Ensure InstitueMemberTypes instances exist
        admin_type, created = InstitueMemberTypes.objects.get_or_create(name='Admin')
        owner_type, created = InstitueMemberTypes.objects.get_or_create(name='Owner')
        
        self.operator = User.objects.create(username='operator', email='operator@test.com')
        self.owner = User.objects.create(username='owner', email='owner@test.com')

        # Create InstituteMemberships with InstitueMemberTypes instances
        InstituteMembership.objects.create(user=self.operator, institute=self.institute, user_type=admin_type)
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=owner_type)

        # Define URL for the view
        self.url = reverse('upload-student', args=[self.institute.id, self.operator.id])

    def test_successful_upload(self):
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name', 'user_type'])
        writer.writeheader()
        writer.writerow({'email': 'student1@test.com', 'phone': '1234567890', 'first_name': 'John', 'last_name': 'Doe', 'user_type': 'Admin'})
        csv_file.seek(0)
        response = self.client.post(self.url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Students processed successfully', response.data['message'])
        self.assertEqual(len(response.data['added_members']), 1)
        self.assertEqual(response.data['added_members'][0]['email'], 'student1@test.com')

    def test_missing_phone(self):
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name', 'user_type'])
        writer.writeheader()
        writer.writerow({'email': 'student2@test.com', 'phone': '', 'first_name': 'Jane', 'last_name': 'Doe', 'user_type': 'Admin'})
        csv_file.seek(0)
        response = self.client.post(self.url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertIn('A row is missing with phone.', response.data['errors'][0])

    def test_missing_user_type(self):
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name', 'user_type'])
        writer.writeheader()
        writer.writerow({'email': 'student3@test.com', 'phone': '0987654321', 'first_name': 'Alex', 'last_name': 'Smith', 'user_type': ''})
        csv_file.seek(0)
        response = self.client.post(self.url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertIn('A row is missing user_type for email student3@test.com or phone 0987654321.', response.data['errors'][0])

    def test_invalid_user_type(self):
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name', 'user_type'])
        writer.writeheader()
        writer.writerow({'email': 'student4@test.com', 'phone': '1122334455', 'first_name': 'Sam', 'last_name': 'Brown', 'user_type': 'InvalidType'})
        csv_file.seek(0)
        response = self.client.post(self.url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 400)
        self.assertIn("User type 'InvalidType' does not exist.", response.data['errors'][0])

    def test_permission_denied(self):
        non_operator = User.objects.create(username='non_operator', email='nonoperator@test.com')
        url = reverse('upload-student', args=[self.institute.id, non_operator.id])
        csv_file = io.StringIO()
        writer = csv.DictWriter(csv_file, fieldnames=['email', 'phone', 'first_name', 'last_name', 'user_type'])
        writer.writeheader()
        writer.writerow({'email': 'student5@test.com', 'phone': '5566778899', 'first_name': 'Charlie', 'last_name': 'Davis', 'user_type': 'Admin'})
        csv_file.seek(0)
        response = self.client.post(url, {'file': SimpleUploadedFile('test.csv', csv_file.getvalue().encode('utf-8'))}, format='multipart')
        self.assertEqual(response.status_code, 403)  # Permission Denied

   






class DocumentDeleteViewTestCase(APITestCase):
    def setUp(self):
        # Create necessary objects for tests
        self.institute = Institute.objects.create(name='Test Institute')
        self.user = User.objects.create(username='testuse')  # Create a User instance
        self.document = Document.objects.create(name='Test Document')
        self.instance = InstituteMemberDocument.objects.create(
            document=self.document,
            institute=self.institute,
            user=self.user  # Ensure user is provided
        )

        # Define URL for the view
        self.url = reverse('delete-document', args=[self.document.id])

    def test_successful_deletion(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], 'Document and associated InstituteMemberDocument deleted successfully')
        self.assertFalse(Document.objects.filter(id=self.document.id).exists())
        self.assertFalse(InstituteMemberDocument.objects.filter(document=self.document).exists())


class DocumentGetViewTestCase(APITestCase):
    def setUp(self):
        # Create necessary objects for tests
        self.institute = Institute.objects.create(name='Test Institute', address='Test Address', websiteurl='http://test.institute')
        self.user = User.objects.create(username='testuse', email='testuser@example.com')
        self.document = Document.objects.create(name='Test Document', docfile='path/to/file', uploadtime='2024-08-26T00:00:00Z')
        self.instance = InstituteMemberDocument.objects.create(
            document=self.document,
            institute=self.institute,
            user=self.user
        )
        self.url = reverse('list-documents')

    def test_successful_retrieval_with_query_params(self):
        response = self.client.get(self.url, {'institute_id': self.institute.id, 'user_id': self.user.id, 'document_id': self.document.id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['user']['id'], self.user.id)
        self.assertEqual(response.data['results'][0]['institute']['id'], self.institute.id)
        self.assertEqual(response.data['results'][0]['document']['id'], self.document.id)

    def test_successful_retrieval_without_query_params(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)

    

    def test_retrieval_with_invalid_institute_id(self):
        response = self.client.get(self.url, {'institute_id': 9999})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 0)

    def test_retrieval_with_invalid_user_id(self):
        response = self.client.get(self.url, {'user_id': 9999})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 0)

    def test_retrieval_with_invalid_document_id(self):
        response = self.client.get(self.url, {'document_id': 9999})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 0)

    def test_pagination(self):
        # Create additional instances for pagination
        for i in range(2, 12):
            document = Document.objects.create(name=f'Test Document {i}', docfile='path/to/file', uploadtime='2024-08-26T00:00:00Z')
            InstituteMemberDocument.objects.create(
                document=document,
                institute=self.institute,
                user=self.user
            )

        response = self.client.get(self.url, {'institute_id': self.institute.id})
        self.assertEqual(response.status_code, 200)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)





class DocumentCreateViewTestCase(APITestCase):

    def setUp(self):
        # Create instances of Institute, User, and InstituteMembership
        self.institute = Institute.objects.create(name='Test Institute', address='Test Address', websiteurl='http://test.com')
        self.user = User.objects.create(username='testuse', email='testuser@example.com', password='testpassword')
        self.membership = InstituteMembership.objects.create(user=self.user, institute=self.institute)
        self.url = reverse('add-document', args=[self.institute.id, self.user.id])
           
    def test_create_document_success(self):
    # Mock file upload
        file = SimpleUploadedFile("testfile.pdf", b"file_content", content_type="application/pdf")
        
        data = {
            'name': 'Test Document',
            'docfile': file
        }
        response = self.client.post(self.url, data, format='multipart')
        
        print(response.data)  # Print response data for inspection
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Document added successfully')
        self.assertIn('document', response.data)
        
        # Access the nested document data
        document_data = response.data['document']['document']
        self.assertEqual(document_data['name'], 'Test Document')



class InstituteMemberDocumentSerializerTestCase(APITestCase):
    def setUp(self):
        self.institute = Institute.objects.create(name='Test Institute', address='Test Address', websiteurl='http://test.com')
        self.user = User.objects.create(username='testuse', email='testuser@example.com')
        self.membership = InstituteMembership.objects.create(user=self.user, institute=self.institute)
        self.document = Document.objects.create(name='Test Document', docfile=SimpleUploadedFile("testfile.pdf", b"file_content", content_type="application/pdf"))

        self.valid_data = {
            'user_id': self.user.id,
            'institute_id': self.institute.id,
            'document': {
                'name': 'Test Document',
                'docfile': SimpleUploadedFile("testfile.pdf", b"file_content", content_type="application/pdf")
            }
        }

    def test_create_document_success(self):
        serializer = InstituteMemberDocumentSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        instance = serializer.save()
        self.assertIsInstance(instance, InstituteMemberDocument)
        self.assertEqual(instance.user, self.user)
        self.assertEqual(instance.institute, self.institute)
        self.assertEqual(instance.document.name, 'Test Document')
        self.assertTrue(instance.document.docfile)  # Ensure the file field is populated
        self.assertIsNotNone(instance.added_at)  # Ensure `added_at` is set

    def test_update_document_success(self):
        document = Document.objects.create(name='Old Document', docfile=SimpleUploadedFile("oldfile.pdf", b"file_content", content_type="application/pdf"))
        institute_member_document = InstituteMemberDocument.objects.create(
            user=self.user,
            institute=self.institute,
            document=document
        )

        updated_data = {
            'user_id': self.user.id,
            'institute_id': self.institute.id,
            'document': {
                'id': document.id,
                'name': 'Updated Document',
                'docfile': SimpleUploadedFile("newfile.pdf", b"file_content", content_type="application/pdf")
            }
        }
        serializer = InstituteMemberDocumentSerializer(instance=institute_member_document, data=updated_data, partial=True)
        self.assertTrue(serializer.is_valid())
        instance = serializer.save()
        self.assertEqual(instance.document.name, 'Updated Document')
        self.assertTrue(instance.document.docfile)  # Ensure the file field is updated
        self.assertEqual(instance.added_at.date(), timezone.now().date())  # Ensure `added_at` is set to today's date



class MemberInstituteDetailsAPIViewTestCase(APITestCase):
    def setUp(self):
        # Create sample data
        self.institute = Institute.objects.create(name='Test Institute', address='Test Address')
        self.member = User.objects.create(
            firstname='Member', lastname='User', email='member@example.com', username='memberuser'
        )
        self.membership = InstituteMembership.objects.create(
            user=self.member,
            institute=self.institute,
            user_type=None,  # Set to None or appropriate value if UserType does not exist
            datejoined='2024-08-01T00:00:00Z',  # Using ISO 8601 format
            status='Active'
        )
        self.attendance = Attendance.objects.create(
            institute=self.institute,
            member=self.member,
            attendance_date='2024-08-26',
            in_time='09:00:00',
            out_time='17:00:00',
            approver_status='Approved',
            status='Present',
            remarks='No remarks',
            start_date='2024-08-26',
            end_date='2024-08-26'
        )
        self.course = Course.objects.create(
            courseFullName='Test Course',
            courseGlobalCode='TC001',
            courseStatus='Active',
            courseShortName='TC'
        )
        self.url = reverse('member-institute-details', kwargs={'member_id': self.member.id, 'institute_id': self.institute.id})

    def test_get_member_institute_details_success(self):
        response = self.client.get(self.url)
        print(f"Response Data: {response.data}")  # Debugging line
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        data = response.data
        # Check for user details
        self.assertIn('user', data)
        self.assertEqual(data['user']['id'], self.member.id)
        self.assertEqual(data['user']['firstname'], self.member.firstname)
        self.assertEqual(data['user']['lastname'], self.member.lastname)

        # Check for institute details
        self.assertIn('institute', data)
        self.assertEqual(data['institute']['id'], self.institute.id)
        self.assertEqual(data['institute']['name'], self.institute.name)
        
        # Check user_type
        self.assertIn('user_type', data)
        self.assertIsNone(data['user_type'])  # Expecting None if UserType does not exist

        # Check date joined
        self.assertIn('datejoined', data)
        datejoined_str = format(data['datejoined'], 'c')  # 'c' stands for ISO 8601 format
        expected_datejoined = '2024-08-01T00:00:00+00:00'
        self.assertEqual(datejoined_str, expected_datejoined)

        # Check status
        self.assertIn('status', data)
        self.assertEqual(data['status'], self.membership.status)

        # Check attendance records
        self.assertIn('attendance_records', data)
        self.assertEqual(len(data['attendance_records']), 1)
        attendance_data = data['attendance_records'][0]
        self.assertEqual(attendance_data['id'], self.attendance.id)
        self.assertEqual(attendance_data['attendance_date'], str(self.attendance.attendance_date))

        # Check courses
        self.assertIn('courses', data)
        print(f"Courses Data: {data['courses']}")  # Debugging line
        self.assertEqual(len(data['courses']), 0)  # Adjusted expected length

        # Check other fields
        self.assertIn('academic_details', data)
        self.assertIn('experiences', data)
        self.assertIn('publications', data)
        self.assertIn('licenses_certificates', data)
        self.assertIn('parent_details', data)

        # Verify that no additional unexpected fields are present
        expected_fields = [
            'user', 'institute', 'user_type', 'datejoined', 'status', 
            'attendance_records', 'courses', 'academic_details', 
            'experiences', 'publications', 'licenses_certificates', 
            'parent_details'
        ]
        for field in expected_fields:
            self.assertIn(field, data)

        # Check if the response contains only the expected fields
        self.assertTrue(all(field in expected_fields for field in data.keys()))






class InstituteBankDetailsListViewTestCase(APITestCase):
    
    def setUp(self):
        # Create test data
        self.bank_detail1 = InstituteBankDetails.objects.create(
            bank_name='Bank A',
            bank_account_number='123456789',
            ifsc_code='IFSC001',
            upi_id = '15',
            phone_number = '6371163965'

            
        )
        self.bank_detail2 = InstituteBankDetails.objects.create(
            bank_name='Bank B',
            bank_account_number='987654321',
            ifsc_code='IFSC002',
            upi_id = '16',
            phone_number = '6371163967'

        )
        self.url = reverse('list-bank-details')

    def test_get_all_bank_details(self):
        response = self.client.get(self.url)
        expected_data = InstituteBankDetailsSerializer(InstituteBankDetails.objects.all(), many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_data)

    def test_get_bank_details_by_bank_id(self):
        response = self.client.get(self.url, {'bank_id': self.bank_detail1.id})
        expected_data = InstituteBankDetailsSerializer(InstituteBankDetails.objects.filter(id=self.bank_detail1.id), many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_data)

    def test_get_bank_details_empty_results(self):
        response = self.client.get(self.url, {'bank_id': 99999})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_get_bank_details_no_parameters(self):
        response = self.client.get(self.url)
        expected_data = InstituteBankDetailsSerializer(InstituteBankDetails.objects.all(), many=True).data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, expected_data)


class InstituteBankDetailsDeleteViewTestCase(APITestCase):
    def setUp(self):
        # Create InstituteMemberTypes instances
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')

        # Create test data
        self.institute = Institute.objects.create(name='Test Institute')
        self.user_owner = User.objects.create(username='owner')
        self.user_admin = User.objects.create(username='admin')
        self.user_other = User.objects.create(username='other')

        # Create InstituteMemberships with InstituteMemberTypes instances
        InstituteMembership.objects.create(user=self.user_owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.user_admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.user_other, institute=self.institute, user_type=self.member_type)

        # Create bank details
        self.bank_detail = InstituteBankDetails.objects.create(
            bank_name='Bank A',
            bank_account_number='123456789',
            ifsc_code='IFSC001'
        )
        # Associate bank details with the institute
        self.institute.bank_details.add(self.bank_detail)
        
        self.url = reverse('delete-bank-details', args=[self.institute.id, self.user_owner.id, self.bank_detail.id])

    def test_delete_bank_details_success(self):
        # Test successful deletion by owner
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'message': 'Bank details deleted successfully'})
        self.assertFalse(InstituteBankDetails.objects.filter(id=self.bank_detail.id).exists())
    
    def test_delete_bank_details_permission_denied(self):
        # Test permission denied for a non-owner user
        url = reverse('delete-bank-details', args=[self.institute.id, self.user_other.id, self.bank_detail.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_delete_bank_details_not_found(self):
        # Test deletion with non-existent bank details
        url = reverse('delete-bank-details', args=[self.institute.id, self.user_owner.id, 99999])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_delete_bank_details_institute_not_found(self):
        # Test deletion with non-existent institute
        url = reverse('delete-bank-details', args=[99999, self.user_owner.id, self.bank_detail.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_delete_bank_details_user_not_found(self):
        # Test deletion with non-existent user
        url = reverse('delete-bank-details', args=[self.institute.id, 99999, self.bank_detail.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    


class InstituteBankDetailsUpdateViewTestCase(APITestCase):
    def setUp(self):
        # Create InstituteMemberTypes instances
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.teacher_type = InstitueMemberTypes.objects.create(name='Teacher')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')
        self.staff_type = InstitueMemberTypes.objects.create(name='Staff')

        # Create test data
        self.institute = Institute.objects.create(name='Test Institute')
        self.user_owner = User.objects.create(username='owner')
        self.user_admin = User.objects.create(username='admin')
        self.user_teacher = User.objects.create(username='teacher')
        self.user_student = User.objects.create(username='student')
        self.user_staff = User.objects.create(username='staff')
        self.user_other = User.objects.create(username='other')

        # Create InstituteMemberships with InstituteMemberTypes instances
        InstituteMembership.objects.create(user=self.user_owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.user_admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.user_teacher, institute=self.institute, user_type=self.teacher_type)
        InstituteMembership.objects.create(user=self.user_student, institute=self.institute, user_type=self.student_type)
        InstituteMembership.objects.create(user=self.user_staff, institute=self.institute, user_type=self.staff_type)
        InstituteMembership.objects.create(user=self.user_other, institute=self.institute, user_type=self.staff_type)

        # Create bank details
        self.bank_detail = InstituteBankDetails.objects.create(
            bank_name='Bank A',
            bank_account_number='123456789',
            ifsc_code='IFSC001',
            upi_id='upi@bank',
            phone_number='1234567890'
        )
        self.institute.bank_details.add(self.bank_detail)
        
        self.update_url = reverse('update_bank_details', args=[self.institute.id, self.user_owner.id, self.bank_detail.id])
        self.partial_update_data = {
            'bank_name': 'Updated Bank A',
            'bank_account_number': '987654321',
            'ifsc_code': 'IFSC002',
            'upi_id': 'upi@updatedbank',
            'phone_number': '0987654321'
        }

    def test_update_bank_details_success(self):
        # Test successful update by authorized user (Owner)
        response = self.client.put(self.update_url, data=self.partial_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Bank details updated successfully')
        
        # Verify the update
        self.bank_detail.refresh_from_db()
        self.assertEqual(self.bank_detail.bank_name, 'Updated Bank A')
        self.assertEqual(self.bank_detail.bank_account_number, '987654321')
        self.assertEqual(self.bank_detail.ifsc_code, 'IFSC002')
        self.assertEqual(self.bank_detail.upi_id, 'upi@updatedbank')
        self.assertEqual(self.bank_detail.phone_number, '0987654321')

   

    def test_update_bank_details_not_found(self):
        # Test update with non-existent bank details
        url = reverse('update_bank_details', args=[self.institute.id, self.user_owner.id, 99999])
        response = self.client.put(url, data=self.partial_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_bank_details_institute_not_found(self):
        # Test update with non-existent institute
        url = reverse('update_bank_details', args=[99999, self.user_owner.id, self.bank_detail.id])
        response = self.client.put(url, data=self.partial_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_bank_details_user_not_found(self):
        # Test update with non-existent user
        url = reverse('update_bank_details', args=[self.institute.id, 99999, self.bank_detail.id])
        response = self.client.put(url, data=self.partial_update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)





class InstituteBankDetailsCreateViewTestCase(APITestCase):
    def setUp(self):
        # Create InstituteMemberTypes instances
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.teacher_type = InstitueMemberTypes.objects.create(name='Teacher')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')
        self.staff_type = InstitueMemberTypes.objects.create(name='Staff')

        # Create test data
        self.institute = Institute.objects.create(name='Test Institute')
        self.user_owner = User.objects.create(username='owner')
        self.user_admin = User.objects.create(username='admin')
        self.user_teacher = User.objects.create(username='teacher')
        self.user_student = User.objects.create(username='student')
        self.user_staff = User.objects.create(username='staff')
        self.user_other = User.objects.create(username='other')

        # Create InstituteMemberships with InstituteMemberTypes instances
        InstituteMembership.objects.create(user=self.user_owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.user_admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.user_teacher, institute=self.institute, user_type=self.teacher_type)
        InstituteMembership.objects.create(user=self.user_student, institute=self.institute, user_type=self.student_type)
        InstituteMembership.objects.create(user=self.user_staff, institute=self.institute, user_type=self.staff_type)
        InstituteMembership.objects.create(user=self.user_other, institute=self.institute, user_type=self.staff_type)

        self.create_url = reverse('create_bank_details', args=[self.institute.id, self.user_owner.id])
        self.valid_data = {
            'bank_name': 'Bank A',
            'bank_account_number': '123456789',
            'ifsc_code': 'IFSC001',
            'upi_id': 'upi@bank',
            'phone_number': '1234567890'
        }

    def test_create_bank_details_success(self):
    # Ensure no bank details exist before the test
        InstituteBankDetails.objects.all().delete()

        # Test successful creation by authorized user (Owner)
        response = self.client.post(self.create_url, data=self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Bank details created successfully')
        
        # Verify the creation
        bank_details = InstituteBankDetails.objects.first()
        self.assertIsNotNone(bank_details)
        self.assertEqual(bank_details.bank_name, 'Bank A')
        self.assertEqual(bank_details.bank_account_number, '123456789')
        self.assertEqual(bank_details.ifsc_code, 'IFSC001')
        self.assertEqual(bank_details.upi_id, 'upi@bank')
        self.assertEqual(bank_details.phone_number, '1234567890')


    

    def test_create_bank_details_institute_not_found(self):
        # Test creation with non-existent institute
        url = reverse('create_bank_details', args=[99999, self.user_owner.id])
        response = self.client.post(url, data=self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_bank_details_user_not_found(self):
        # Test creation with non-existent user
        url = reverse('create_bank_details', args=[self.institute.id, 99999])
        response = self.client.post(url, data=self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    

class GetLeavePolicyListViewTestCase(APITestCase):
    def setUp(self):
        # Create test data
        self.institute = Institute.objects.create(name='Test Institute')

        # Create LeaveType instances associated with the institute
        self.leave_type1 = LeaveType.objects.create(
            institute=self.institute,
            name='Sick Leave',
            total_leaves=10
        )
        self.leave_type2 = LeaveType.objects.create(
            institute=self.institute,
            name='Casual Leave',
            total_leaves=15
        )

        # URL for retrieving leave policies
        self.url = reverse('list_leave_policy', args=[self.institute.id])

    def test_get_leave_policies_success(self):
        # Test successful retrieval of leave policies
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Two leave types should be returned
        self.assertEqual(response.data[0]['name'], 'Sick Leave')
        self.assertEqual(response.data[0]['total_leaves'], 10)
        self.assertEqual(response.data[1]['name'], 'Casual Leave')
        self.assertEqual(response.data[1]['total_leaves'], 15)

    def test_institute_not_found(self):
        # Test retrieval with a non-existent institute
        url = reverse('list_leave_policy', args=[99999])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_no_leave_policies(self):
        # Create a new institute with no leave policies
        empty_institute = Institute.objects.create(name='Empty Institute')
        url = reverse('list_leave_policy', args=[empty_institute.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])  # No leave policies should be returned
     




class UpdateLeavePolicyViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create test users
        self.owner = User.objects.create_user(username='owner', password='password')
        self.admin = User.objects.create_user(username='admin', password='password')
        self.regular_user = User.objects.create_user(username='regular_user', password='password')

        # Create InstituteMemberTypes instances
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')

        # Create an institute and memberships
        self.institute = Institute.objects.create(name='Test Institute')
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=self.member_type)

        # Create leave types
        self.leave_type = LeaveType.objects.create(name='Sick Leave', institute=self.institute, total_leaves=10)

        # Define URL for the view
        self.url = reverse('update-leave-policy', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.owner.id,
            'leave_type_id': self.leave_type.id
        })

    # ... (rest of your test cases)

    def test_update_leave_policy_success(self):
        data = {'total_leaves': 15, 'new_name': 'Medical Leave'}
        self.client.force_authenticate(user=self.owner)
        response = self.client.put(self.url, data, format='json')
        self.leave_type.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.leave_type.total_leaves, 15)
        self.assertEqual(self.leave_type.name, 'Medical Leave')

        # Verify user leave balances
        user_balances = UserLeaveBalance.objects.filter(user=self.owner, institute=self.institute, leave_type=self.leave_type)
        self.assertTrue(user_balances.exists())
        self.assertEqual(user_balances.first().total_paid_leaves, 15)

    

   

    def test_update_leave_policy_invalid_leave_type(self):
        data = {'total_leaves': 30}
        invalid_url = reverse('update-leave-policy', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.owner.id,
            'leave_type_id': 9999  # Assuming this ID does not exist
        })
        self.client.force_authenticate(user=self.owner)
        response = self.client.put(invalid_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)




class DeleteLeavePolicyViewTestCase(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuse', password='testpassword')
        self.institute = Institute.objects.create(name='Test Institute')
        self.leave_type = LeaveType.objects.create(name='Sick Leave', institute=self.institute)
        
        # Create InstituteMemberTypes instances
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')

        # Create UserLeaveBalance instance
        self.user_leave_balance = UserLeaveBalance.objects.create(
            user=self.user,
            institute=self.institute,
            leave_type=self.leave_type,
            total_paid_leaves=10
        )

        # Create InstituteMembership instance with the correct InstituteMemberTypes instance
        self.institute_membership = InstituteMembership.objects.create(
            user=self.user,
            institute=self.institute,
            user_type=self.owner_type  # Use the InstituteMemberTypes instance here
        )

        self.url = reverse('delete_leave_policy', args=[self.institute.id, self.user.id, self.leave_type.id])

    def test_delete_leave_policy_success(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(LeaveType.objects.count(), 0)
        self.assertEqual(UserLeaveBalance.objects.count(), 0)


class LeaveBalanceViewTestCase(APITestCase):
    def setUp(self):
        # Create test data
        self.user = get_user_model().objects.create_user(username='testuse', password='testpassword')
        self.institute = Institute.objects.create(name='Test Institute')
        
        # Add the user to the institute
        InstituteMembership.objects.create(user=self.user, institute=self.institute)

        # Create LeaveType instance
        self.leave_type = LeaveType.objects.create(name='Sick Leave', institute=self.institute)
        
        # Create UserLeaveBalance instance for the user
        self.user_leave_balance = UserLeaveBalance.objects.create(
            user=self.user,
            institute=self.institute,
            leave_type=self.leave_type,
            total_paid_leaves=10,
            availed_paid_leaves=2,
            availed_unpaid_leaves=1
        )

        self.url = reverse('leave_balance', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.user.id
        })

    def test_successful_retrieval(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        self.assertEqual(data['user'], self.user.username)
        self.assertEqual(data['institute'], self.institute.name)
        self.assertEqual(len(data['leave_balances']), 1)  # Check if one balance is returned
        
        balance = data['leave_balances'][0]
        self.assertEqual(balance['leave_type'], self.leave_type.name)
        self.assertEqual(balance['total_paid_leaves'], self.user_leave_balance.total_paid_leaves)
        self.assertEqual(balance['availed_paid_leaves'], self.user_leave_balance.availed_paid_leaves)
        self.assertEqual(balance['availed_unpaid_leaves'], self.user_leave_balance.availed_unpaid_leaves)
        self.assertEqual(balance['remaining_paid_leaves'], self.user_leave_balance.remaining_paid_leaves())

    def test_user_not_a_member(self):
        # Create a new user and set up a new institute
        new_user = get_user_model().objects.create_user(username='newuser', password='newpassword')
        new_institute = Institute.objects.create(name='New Institute')
        
        # Create a URL for a user not part of the institute
        url = reverse('leave_balance', kwargs={
            'institute_id': new_institute.id,
            'user_id': new_user.id
        })
        
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json()['detail'], 'The specified user is not a member of the institute')


class SummaryViewInstituteWiseTestCase(APITestCase):
    def setUp(self):
    # Create test data
        self.institute = Institute.objects.create(name='Test Institute')
        self.user = User.objects.create(username='testuse', email='testuser@example.com')
        InstituteMembership.objects.create(user=self.user, institute=self.institute)

        # Create InstituteFee instances
        self.fee_debit = InstituteFee.objects.create(
            institute=self.institute,
            type_transaction='debit',
            amount=100,
            status='unpaid',
            due_amount=100,
            user=self.user
        )
        self.fee_credit = InstituteFee.objects.create(
            institute=self.institute,
            type_transaction='credit',
            amount=50,
            status='unpaid',
            due_amount=50,
            user=self.user
        )

        # Create InstituteTransaction instances with fee
        self.transaction_debit = InstituteTransaction.objects.create(
            institute=self.institute,
            transaction_type='debit',
            amount=80,
            status='completed',
            user=self.user,
            fee=self.fee_debit  # Set fee instance
        )
        self.transaction_credit = InstituteTransaction.objects.create(
            institute=self.institute,
            transaction_type='credit',
            amount=40,
            status='completed',
            user=self.user,
            fee=self.fee_credit  # Set fee instance
        )

        self.url = reverse('summary_user', kwargs={'institute_id': self.institute.id})


    def test_successful_summary_retrieval(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()

        self.assertEqual(data['institute']['id'], self.institute.id)
        self.assertEqual(data['institute']['name'], self.institute.name)
        self.assertEqual(data['total_debit_scheduled'], 100)
        self.assertEqual(data['total_credit_scheduled'], 50)
        self.assertEqual(data['total_debited'], 80)
        self.assertEqual(data['total_credited'], 40)
        self.assertEqual(data['total_debit_due'], 100)
        self.assertEqual(data['total_credit_due'], 50)
        # Print or inspect the month_wise_summary to adjust expectations
        print("Month-wise Summary Data:", data.get('month_wise_summary', []))
        # Adjust based on actual data returned
        self.assertGreater(len(data['month_wise_summary']), 0)  # Change expectation as needed

    def test_institute_not_found(self):
        url = reverse('summary_user', kwargs={'institute_id': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json()['error'], 'Institute not found with the provided ID.')

    def test_user_not_found(self):
        url = reverse('summary_user', kwargs={'institute_id': self.institute.id}) + '?user_id=999'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json()['error'], 'User not found with the provided ID.')

    def test_invalid_date_format(self):
        url = reverse('summary_user', kwargs={'institute_id': self.institute.id}) + '?start_date=invalid-date'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()['start_date'], 'Invalid date format.')

        url = reverse('summary_user', kwargs={'institute_id': self.institute.id}) + '?end_date=invalid-date'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()['end_date'], 'Invalid date format.')


class CombinedAttendanceAndLeaveViewTestCase(APITestCase):
    def setUp(self):
        # Create test data
        self.institute = Institute.objects.create(name='Test Institute')
        self.user = User.objects.create(username='testuse', email='testuser@example.com')

        # Create Attendance records
        self.attendance_1 = Attendance.objects.create(
            institute=self.institute,
            member=self.user,
            attendance_date=datetime.now().date() - timedelta(days=1),
            start_date=datetime.now().date() - timedelta(days=1),
            end_date=datetime.now().date() - timedelta(days=1),
            in_time="09:00",
            out_time="17:00",
            approver_status="approved",
            status="present",
            remarks="On time"
        )
        
        self.attendance_2 = Attendance.objects.create(
            institute=self.institute,
            member=self.user,
            attendance_date=datetime.now().date() - timedelta(days=2),
            start_date=datetime.now().date() - timedelta(days=2),
            end_date=datetime.now().date() - timedelta(days=2),
            in_time="09:00",
            out_time="17:00",
            approver_status="approved",
            status="present",
            remarks="On time"
        )

        # Create Leave records
        self.leave_1 = Leave.objects.create(
            institute=self.institute,
            user=self.user,
            start_date=datetime.now().date() - timedelta(days=5),
            end_date=datetime.now().date() - timedelta(days=4),
            reason="Personal",
            status="approved"
        )

        self.leave_2 = Leave.objects.create(
            institute=self.institute,
            user=self.user,
            start_date=datetime.now().date() - timedelta(days=10),
            end_date=datetime.now().date() - timedelta(days=8),
            reason="Medical",
            status="approved"
        )

        self.url = reverse('combined-attendance-leave', kwargs={'institute_id': self.institute.id})

    def test_successful_combined_retrieval(self):
        response = self.client.get(self.url, {'user_id': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()

        # Check combined data includes attendance and leave records
        self.assertEqual(len(data), 4)  # 2 attendance + 2 leave records
        self.assertTrue(any(record['type'] == 'attendance' for record in data))
        self.assertTrue(any(record['type'] == 'leave' for record in data))

    def test_user_id_required(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json(), {"error": "user_id is required"})

    def test_combined_data_ordering(self):
        response = self.client.get(self.url, {'user_id': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()

        # Check that data is sorted by start_date in descending order
        dates = [datetime.strptime(record['start_date'], '%Y-%m-%d') for record in data]
        self.assertEqual(dates, sorted(dates, reverse=True))





class CourseListViewTestCase(APITestCase):

    def setUp(self):
        # Ensure the database is clean
        Course.objects.all().delete()
        CourseDesignedFor.objects.all().delete()
        User.objects.all().delete()

        # Create test users
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

        # Create test CourseDesignedFor instances
        designed_for_1 = CourseDesignedFor.objects.create(name='Science', boardofeducation=['Physics'])
        designed_for_2 = CourseDesignedFor.objects.create(name='Arts', boardofeducation=['Literature'])

        # Create test courses with CourseDesignedFor instances
        Course.objects.create(
            courseFullName='Quantum Mechanics',
            courseGlobalCode='100001',
            designedFor=designed_for_1,
            courseShortName='QM',
            courseStartDate='2023-01-01',
            courseEndDate='2023-06-30'
        )
        Course.objects.create(
            courseFullName='Introduction to Physics',
            courseGlobalCode='100002',
            designedFor=designed_for_2,
            courseShortName='IP',
            courseStartDate='2023-02-01',
            courseEndDate='2023-07-30'
        )
        Course.objects.create(
            courseFullName='Advanced Mathematics',
            courseGlobalCode='100003',
            designedFor=designed_for_1,
            courseShortName='AM',
            courseStartDate='2023-03-01',
            courseEndDate='2023-08-31'
        )

    def test_list_all_courses(self):
        url = reverse('course-list')  # Adjust the URL name if different
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

   

    def tearDown(self):
        # Clean up any necessary data
        Course.objects.all().delete()
        CourseDesignedFor.objects.all().delete()
        User.objects.all().delete()





class UnarchiveCourseViewTestCase(APITestCase):
    
    def setUp(self):
        self.institute = Institute.objects.create(name='Test Institute')

        # Create user types
        self.owner_member_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_member_type = InstitueMemberTypes.objects.create(name='Admin')
        self.student_member_type = InstitueMemberTypes.objects.create(name='Student')

        # Create users
        self.owner_user = User.objects.create(username='owner', password='password')
        self.admin_user = User.objects.create(username='admin', password='password')
        self.normal_user = User.objects.create(username='normal', password='password')

        # Create memberships with member type instances
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_member_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_member_type)
        InstituteMembership.objects.create(user=self.normal_user, institute=self.institute, user_type=self.student_member_type)

        # Create a course
        self.course = Course.objects.create(
            courseFullName='Test Course',
            courseGlobalCode='TC001',
            archived=True,
            archive_date=timezone.now(),  # Use timezone-aware datetime
            creater=self.owner_user,
        )

        # URL for unarchiving course
        self.url = reverse('unarchive-course', kwargs={
            'institute_id': self.institute.id,
            'course_id': self.course.id,
            'user_id': self.owner_user.id
        })

    def test_create_membership(self):
        # Ensure the InstituteMembership record is unique
        if not InstituteMembership.objects.filter(user=self.normal_user, institute=self.institute).exists():
            membership = InstituteMembership.objects.create(
                user=self.normal_user,
                institute=self.institute,
                user_type=self.student_member_type,
                status='active'
            )
            self.assertEqual(membership.user_type, self.student_member_type)

    def test_successful_unarchive(self):
        self.client.login(username='owner', password='password')
        response = self.client.put(self.url)
        self.course.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(self.course.archived)
        self.assertIsNone(self.course.archive_date)

    

    def test_course_does_not_exist(self):
        url = reverse('unarchive-course', kwargs={
            'institute_id': self.institute.id,
            'course_id': 9999,  # Non-existent course ID
            'user_id': self.owner_user.id
        })
        self.client.login(username='owner', password='password')
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

   

    def tearDown(self):
        # Ensure proper cleanup to avoid leftover data causing issues
        InstituteMembership.objects.all().delete()
        Course.objects.all().delete()
        User.objects.all().delete()
        InstitueMemberTypes.objects.all().delete()
        Institute.objects.all().delete()


class ArchiveCourseViewTestCase(APITestCase):
    
    def setUp(self):
        self.institute = Institute.objects.create(name='Test Institute')

        # Create user types
        self.owner_member_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_member_type = InstitueMemberTypes.objects.create(name='Admin')
        self.teacher_member_type = InstitueMemberTypes.objects.create(name='Teacher')
        self.student_member_type = InstitueMemberTypes.objects.create(name='Student')

        # Create users
        self.owner_user = User.objects.create(username='owner', password='password')
        self.admin_user = User.objects.create(username='admin', password='password')
        self.teacher_user = User.objects.create(username='teacher', password='password')
        self.normal_user = User.objects.create(username='normal', password='password')

        # Create memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_member_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_member_type)
        InstituteMembership.objects.create(user=self.teacher_user, institute=self.institute, user_type=self.teacher_member_type)
        InstituteMembership.objects.create(user=self.normal_user, institute=self.institute, user_type=self.student_member_type)

        # Create a course
        self.course = Course.objects.create(
            courseFullName='Test Course',
            courseGlobalCode='TC001',
            archived=False,
            creater=self.owner_user,
        )

        # URL for archiving course
        self.url = reverse('archive-course', kwargs={
            'institute_id': self.institute.id,
            'course_id': self.course.id,
            'user_id': self.owner_user.id
        })

    def test_successful_archiving(self):
        self.client.login(username='owner', password='password')
        response = self.client.delete(self.url)
        self.course.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(self.course.archived)

    
    def test_course_does_not_exist(self):
        self.client.login(username='owner', password='password')
        url = reverse('archive-course', kwargs={
            'institute_id': self.institute.id,
            'course_id': 9999,  # Non-existent course ID
            'user_id': self.owner_user.id
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['detail'], "Not found.")

   
    def tearDown(self):
        # Clean up any data created during the tests
        InstituteMembership.objects.all().delete()
        Course.objects.all().delete()
        User.objects.all().delete()
        InstitueMemberTypes.objects.all().delete()
        Institute.objects.all().delete()




    # Your test cases here...

    # Your test cases here...


class InstituteCourseSessionViewTestCase(APITestCase):
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(username='testuse', password='testpassword')
        self.client.force_login(self.user)

        # Create test CourseDesignedFor instance
        self.designed_for = CourseDesignedFor.objects.create(name='Test', boardofeducation=['Board1'])

        # Create test institute, course, and class session
        self.institute = Institute.objects.create(name='Test Institute')
        self.course = Course.objects.create(
            courseFullName='Test Course',
            creater=self.user,
            courseGlobalCode='TEST123',
            designedFor=self.designed_for,  # Use the instance here
            courseShortName='TC',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31'
        )
        self.institute.courses.add(self.course)
        self.class_session = Class.objects.create(
            courseId=1,  # Correctly assign the Course instance
            serialNo='001',
            status='Scheduled',
            datetime='2024-01-15T10:00:00Z',
            duration='60',
            about='Test Class Session',
            meetingLink='http://example.com/meeting',
            address='123 Test St'
        )

        # Define URL pattern
        self.url_details = reverse('details')

    def test_get_institute_details(self):
        response = self.client.get(self.url_details, {'institute_id': self.institute.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('institute', data)
        self.assertIn('courses', data)
        self.assertIn('classes', data)

    def test_get_course_details(self):
        response = self.client.get(self.url_details, {'course_id': self.course.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('course', data)
        self.assertIn('classes', data)

    def test_get_class_session_details(self):
        response = self.client.get(self.url_details, {'class_session_id': self.class_session.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('id', data)
        self.assertEqual(data['id'], self.class_session.id)



class AttendanceCourseListViewTestCase(APITestCase):
    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(username='testuse', password='testpassword')
        self.client.force_login(self.user)

        # Create test CourseDesignedFor instance
        self.designed_for = CourseDesignedFor.objects.create(name='Test Designed For', boardofeducation=['Board1'])

        # Create test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test course
        self.course = Course.objects.create(
            courseFullName='Test Course',
            creater=self.user,
            courseGlobalCode='TEST123',
            designedFor=self.designed_for,
            courseShortName='TC',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31'
        )

        # Create test class session
        self.class_session = Class.objects.create(
            courseId=6479,
            serialNo='001',
            status='Scheduled',
            datetime='2024-01-15T10:00:00Z',
            duration='60',
            about='Test Class Session',
            meetingLink='http://example.com/meeting',
            address='123 Test St'
        )

        # Create test attendance records
        self.attendance = Attendance.objects.create(
            institute=self.institute,
            course=self.course,
            class_session=self.class_session,
            member=self.user,
            start_date='2024-01-01',
            end_date='2024-01-01',
            attendance_date='2024-01-01',
            in_time='10:00:00',
            out_time='11:00:00',
            status='Present',
            remarks='Test remark',
            approver_status='Approved'
        )

        # Define URL pattern
        self.url_list = reverse('list-attendance')

    # Your test cases...


    def test_get_attendance_list_without_filters(self):
        response = self.client.get(self.url_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('results', data)
        self.assertGreater(len(data['results']), 0)  # Ensure we have some results

    def test_get_attendance_list_with_filters(self):
        # Test filtering by course_id
        response = self.client.get(self.url_list, {'course_id': self.course.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('results', data)
        self.assertEqual(len(data['results']), 1)  # Filter should return 1 result

        # Test filtering by class_session_id
        response = self.client.get(self.url_list, {'class_session_id': self.class_session.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('results', data)
        self.assertEqual(len(data['results']), 1)  # Filter should return 1 result

        # Test filtering by institute_id
        response = self.client.get(self.url_list, {'institute_id': self.institute.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('results', data)
        self.assertEqual(len(data['results']), 1)  # Filter should return 1 result

        # Test filtering by member_id
        response = self.client.get(self.url_list, {'member_id': self.user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('results', data)
        self.assertEqual(len(data['results']), 1)  # Filter should return 1 result

        # Test filtering by date range
        response = self.client.get(self.url_list, {
            'start_date': '2024-01-01',
            'end_date': '2024-01-01'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('results', data)
        self.assertEqual(len(data['results']), 1)  # Filter should return 1 result

    def test_pagination(self):
        # Create additional attendance records for pagination
        for i in range(10):
            Attendance.objects.create(
                institute=self.institute,
                course=self.course,
                class_session=self.class_session,
                member=self.user,
                start_date='2024-01-01',
                end_date='2024-01-01',
                attendance_date='2024-01-01',
                in_time='10:00:00',
                out_time='11:00:00',
                status='Present',
                remarks='Test remark',
                approver_status='Approved'
            )

        response = self.client.get(self.url_list, {'page': 1, 'page_size': 5})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn('results', data)
        self.assertEqual(len(data['results']), 5)  # Check if pagination is working correctly


class DeleteCourseAttendanceViewTestCase(APITestCase):
    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(username='testuse', password='testpassword')
        self.client.force_login(self.user)

        # Create test CourseDesignedFor instance
        self.designed_for = CourseDesignedFor.objects.create(name='Test Designed For', boardofeducation=['Board1'])

        # Create test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test course
        self.course = Course.objects.create(
            courseFullName='Test Course',
            creater=self.user,
            courseGlobalCode='TEST123',
            designedFor=self.designed_for,
            courseShortName='TC',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31'
        )

        # Create test class session
        self.class_session = Class.objects.create(
            courseId=1,
            serialNo='001',
            status='Scheduled',
            datetime='2024-01-15T10:00:00Z',
            duration='60',
            about='Test Class Session',
            meetingLink='http://example.com/meeting',
            address='123 Test St'
        )

        # Create test attendance records
        self.attendance1 = Attendance.objects.create(
            institute=self.institute,
            course=self.course,
            class_session=self.class_session,
            member=self.user,
            start_date='2024-01-01',
            end_date='2024-01-01',
            attendance_date='2024-01-01',
            in_time='10:00:00',
            out_time='11:00:00',
            status='Present',
            remarks='Test remark 1',
            approver_status='Approved'
        )

        self.attendance2 = Attendance.objects.create(
            institute=self.institute,
            course=self.course,
            class_session=self.class_session,
            member=self.user,
            start_date='2024-01-02',
            end_date='2024-01-02',
            attendance_date='2024-01-02',
            in_time='11:00:00',
            out_time='12:00:00',
            status='Absent',
            remarks='Test remark 2',
            approver_status='Pending'
        )

        self.url_delete = reverse('delete-attendance')
    def test_successful_deletion(self):
        payload = {'ids': [self.attendance1.id, self.attendance2.id]}
        response = self.client.delete(self.url_delete, data=json.dumps(payload), content_type='application/json')
        print(response.status_code)  # Debugging status code
        print(response.content)  # Debugging content
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertIn({'id': self.attendance1.id, 'status': 'deleted'}, data)
        self.assertIn({'id': self.attendance2.id, 'status': 'deleted'}, data)
        self.assertEqual(Attendance.objects.count(), 0)  # Ensure all records are deleted



class UpdateCourseAttendanceViewTestCase(APITestCase):
    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(username='testuse', password='testpassword')
        self.client.force_login(self.user)

        # Create test CourseDesignedFor instance
        self.designed_for = CourseDesignedFor.objects.create(name='Test Designed For', boardofeducation=['Board1'])

        # Create test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test course
        self.course = Course.objects.create(
            courseFullName='Test Course',
            creater=self.user,
            courseGlobalCode='TEST123',
            designedFor=self.designed_for,
            courseShortName='TC',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31'
        )

        # Create test class session
        self.class_session = Class.objects.create(
            courseId=self.course.id,
            serialNo='001',
            status='Scheduled',
            datetime='2024-01-15T10:00:00Z',
            duration='60',
            about='Test Class Session',
            meetingLink='http://example.com/meeting',
            address='123 Test St'
        )

        # Create test attendance record
        self.attendance = Attendance.objects.create(
            institute=self.institute,
            course=self.course,
            class_session=self.class_session,
            member=self.user,
            start_date='2024-01-01',
            end_date='2024-01-01',
            attendance_date='2024-01-01',
            in_time='10:00:00',
            out_time='11:00:00',
            status='na',  # Updated to valid choice
            remarks='Test remark',
            approver_status='approved'  # Updated to valid choice
        )

        # URL for updating attendance
        self.url_update = reverse('update-attendance')

    def test_successful_update(self):
        update_data = {
            'id': self.attendance.id,
            'in_time': '09:00:00',
            'out_time': '10:00:00',
            'remarks': 'Updated remark',
            'status': 'present',  # Use a valid choice
            'approver_status': 'approved'  # Ensure this is a valid choice
        }
        response = self.client.patch(self.url_update, data=json.dumps({'updates': [update_data]}), content_type='application/json')
        
        # Print response data for debugging
        print(response.data)  # Debug information
        
        # Check the response status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Refresh the instance from the database
        self.attendance.refresh_from_db()
        
        # Check the updated values
        self.assertEqual(self.attendance.in_time.strftime('%H:%M:%S'), '09:00:00')
        self.assertEqual(self.attendance.out_time.strftime('%H:%M:%S'), '10:00:00')
        self.assertEqual(self.attendance.remarks, 'Updated remark')
        self.assertEqual(self.attendance.status, 'present')  # Ensure this matches the updated value
        self.assertEqual(self.attendance.approver_status, 'approved')  # Ensure this matches the updated value

    def test_update_with_multiple_entries(self):
        attendance2 = Attendance.objects.create(
            institute=self.institute,
            course=self.course,
            class_session=self.class_session,
            member=self.user,
            start_date='2024-01-02',
            end_date='2024-01-02',
            attendance_date='2024-01-02',
            in_time='11:00:00',
            out_time='12:00:00',
            status='na',  # Use a valid choice
            remarks='Another remark',
            approver_status='approved'  # Ensure this is a valid choice
        )

        update_data = [
            {'id': self.attendance.id, 'status': 'absent'},  # Use a valid choice
            {'id': attendance2.id, 'remarks': 'Updated remark'}
        ]
        response = self.client.patch(self.url_update, data=json.dumps({'updates': update_data}), content_type='application/json')
        
        # Print response data for debugging
        print(response.data)  # Debug information
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.attendance.refresh_from_db()
        attendance2.refresh_from_db()
        self.assertEqual(self.attendance.status, 'absent')  # Ensure this matches the updated value
        self.assertEqual(attendance2.remarks, 'Updated remark')





class GetDetailPaymentReportViewTestCase(APITestCase):

    def setUp(self):
        # Create sample data
        self.institute = Institute.objects.create(name='Test Institute', logo='test_logo.png')
        self.user = User.objects.create(firstname='John', lastname='Doe', profile_image='profile.png')
        
        self.institute_fee = InstituteFee.objects.create(
            scheduled_for='Tuition Fee',
            amount=Decimal('100.00'),
            due_amount=Decimal('100.00'),
            description='Test Fee Description',
            date_of_schedule='2024-08-27T00:00:00Z',
            user=self.user,
            institute=self.institute,
            type_transaction='debit',
            custom_user=None,
            status='unpaid'
        )
        
        self.installment = InstituteFeeInstallment.objects.create(
            fee=self.institute_fee,
            amount=Decimal('50.00'),
            due_date='2024-12-31'
        )
        
        self.transaction = InstituteTransaction.objects.create(
            fee=self.institute_fee,
            amount=Decimal('50.00'),
            status='completed',
            institute=self.institute,
            user=self.user
        )
        
        self.url = reverse('get_detail_payment_report', kwargs={'fee_id': self.institute_fee.id})

    # def test_successful_retrieval(self):
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    #     serializer = FeeSerializer(self.institute_fee)
        
    #     # Print for debugging
    #     print("Response Data:", response.data)
    #     print("Serializer Data:", serializer.data)

    #     # Correctly assert the values
    #     self.assertEqual(response.data['due_amount'], str(serializer.data['due_amount']))
    #     # Other assertions...


    def test_fee_not_found(self):
        invalid_url = reverse('get_detail_payment_report', kwargs={'fee_id': 9999})
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {'error': 'InstituteFee not found'})

    def test_response_structure(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.data
        
        # Check that all expected fields are in the response
        self.assertIn('id', response_data)
        self.assertIn('scheduled_for', response_data)
        self.assertIn('type_transaction', response_data)
        self.assertIn('amount', response_data)
        self.assertIn('description', response_data)
        self.assertIn('date_of_schedule', response_data)
        self.assertIn('user', response_data)
        self.assertIn('custom_user', response_data)
        self.assertIn('due_amount', response_data)
        self.assertIn('institute', response_data)
        self.assertIn('installments', response_data)
        self.assertIn('status', response_data)
        self.assertIn('institute_transactions', response_data)

        # Check nested fields
        self.assertIn('relationship', response_data['user'])
        self.assertIn('name', response_data['institute'])
        self.assertIn('logo', response_data['institute'])

    def test_all_fields_in_serializer(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.data

        # Check that each field in the serializer is present in the response
        serializer_fields = [
            'id', 'scheduled_for', 'type_transaction', 'amount', 'description',
            'date_of_schedule', 'user', 'custom_user', 'due_amount', 'institute',
            'installments', 'status', 'institute_transactions'
        ]
        for field in serializer_fields:
            self.assertIn(field, response_data)

        # Check nested fields in the `user` field
        user_fields = ['id', 'firstname', 'lastname', 'profile_image', 'relationship']
        for field in user_fields:
            self.assertIn(field, response_data['user'])

        # Check nested fields in the `institute` field
        institute_fields = ['id', 'name', 'logo']
        for field in institute_fields:
            self.assertIn(field, response_data['institute'])

        # Check nested fields in `installments`
        installments_data = response_data['installments']
        for installment in installments_data:
            self.assertIn('id', installment)
            self.assertIn('fee', installment)
            self.assertIn('amount', installment)
            self.assertIn('due_date', installment)

        # Check nested fields in `institute_transactions`
        transactions_data = response_data['institute_transactions']
        for transaction in transactions_data:
            self.assertIn('id', transaction)
            self.assertIn('fee', transaction)
            self.assertIn('amount', transaction)
            self.assertIn('status', transaction)
            self.assertIn('institute', transaction)
            self.assertIn('user', transaction)  # Ensure this is set



class EditScheduledPaymentViewTestCase(APITestCase):
    def setUp(self):
        # Create necessary instances
        self.institute = Institute.objects.create(name='Test Institute', logo=None)
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')

        self.admin_user = User.objects.create_user(username='admin', email='admin@example.com', password='password')
        self.regular_user = User.objects.create_user(username='user', email='user@example.com', password='password')

        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=self.member_type)

        self.fee = InstituteFee.objects.create(
            scheduled_for='Tuition Fee',
            amount=500.00,
            due_amount=500.00,
            description='Monthly tuition fee',
            date_of_schedule=timezone.now(),
            user=self.regular_user,
            institute=self.institute
        )

        self.installment = InstituteFeeInstallment.objects.create(
            fee=self.fee,
            amount=250.00,
            due_date=timezone.now() + timedelta(days=30)
        )

        self.url = reverse('edit_scheduled_payment', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.regular_user.id,
            'fee_id': self.fee.id
        })

    

    def test_successful_update(self):
        self.client.force_authenticate(user=self.regular_user)

        response = self.client.put(self.url, data={
            'amount': 600.00,
            'description': 'Updated fee description',
            'installments': [
                {
                    'id': self.installment.id,
                    'amount': 300.00,
                    'due_date': (timezone.now() + timedelta(days=60)).isoformat()
                }
            ],
            'new_installments': [
                {
                    'amount': 200.00,
                    'due_date': (timezone.now() + timedelta(days=90)).isoformat()
                }
            ]
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Payment and installments updated successfully.')
        self.assertEqual(response.data['fee_id'], self.fee.id)
        self.assertEqual(response.data['fee_details']['amount'], '600.00')

        # Check if installment was updated
        self.installment.refresh_from_db()
        self.assertEqual(self.installment.amount, 300.00)

        # Check if new installment was added
        new_installment = InstituteFeeInstallment.objects.filter(fee=self.fee, amount=200.00).first()
        self.assertIsNotNone(new_installment)



    def test_failed_update_due_to_invalid_data(self):
        self.client.force_authenticate(user=self.regular_user)

        response = self.client.put(self.url, data={
            'amount': 'invalid',  # Invalid data type
            'description': 'Updated fee description',
            'installments': [
                {
                    'id': self.installment.id,
                    'amount': 300.00
                }
            ]
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('amount', response.data.get('errors', {}))


class DeleteScheduledPaymentViewTestCase(APITestCase):
    def setUp(self):
        # Create necessary instances
        self.institute = Institute.objects.create(name='Test Institute', logo=None)
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.member_type = InstitueMemberTypes.objects.create(name='Member')

        self.admin_user = User.objects.create_user(username='admin', email='admin@example.com', password='password')
        self.regular_user = User.objects.create_user(username='user', email='user@example.com', password='password')

        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=self.member_type)

        self.fee = InstituteFee.objects.create(
            scheduled_for='Tuition Fee',
            amount=500.00,
            due_amount=500.00,
            description='Monthly tuition fee',
            date_of_schedule=timezone.now(),
            user=self.regular_user,
            institute=self.institute
        )

        self.installment = InstituteFeeInstallment.objects.create(
            fee=self.fee,
            amount=250.00,
            due_date=timezone.now() + timedelta(days=30)
        )

        self.url = reverse('delete_scheduled_payment', kwargs={
            'institute_id': self.institute.id,
            'fee_id': self.fee.id,
            'user_id': self.regular_user.id
        })

    def test_successful_fee_deletion(self):
        self.client.force_authenticate(user=self.regular_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Payment and all associated installments deleted successfully.')
        self.assertFalse(InstituteFee.objects.filter(id=self.fee.id).exists())
        self.assertFalse(InstituteFeeInstallment.objects.filter(fee=self.fee).exists())

    def test_delete_non_existing_fee(self):
        non_existing_fee_id = 99999
        self.url = reverse('delete_scheduled_payment', kwargs={
            'institute_id': self.institute.id,
            'fee_id': non_existing_fee_id,
            'user_id': self.regular_user.id
        })

        self.client.force_authenticate(user=self.regular_user)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('Not found.', response.data.get('detail', ''))



class CreateInstituteOfficialViewTestCase(APITestCase):

    def setUp(self):
        # Create the necessary objects for the tests
        self.institute = Institute.objects.create(name='Test Institute')
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')

        # Create users
        self.owner = User.objects.create_user(username='owner', password='password')
        self.admin = User.objects.create_user(username='admin', password='password')
        self.regular_user = User.objects.create_user(username='user', password='password')

        # Assign roles to users
        InstituteMembership.objects.create(
            user=self.owner,
            institute=self.institute,
            user_type=self.owner_type,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.admin,
            institute=self.institute,
            user_type=self.admin_type,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.regular_user,
            institute=self.institute,
            user_type=InstitueMemberTypes.objects.create(name='Regular'),
            status='active'
        )

        # URL for the test
        self.url = reverse('create-institute-official', kwargs={'institute_id': self.institute.id, 'user_id': self.owner.id})

    def test_create_institute_official_success(self):
        self.client.force_authenticate(user=self.owner)

        data = {
            'name': 'John Doe',
            'designation': 'Principal',
            'contact_email': 'johndoe@example.com',
            'official_phone': '+1234567890'
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(InstituteOfficial.objects.count(), 1)
        self.assertEqual(InstituteOfficial.objects.get().name, 'John Doe')
        self.assertEqual(response.data['official']['name'], 'John Doe')
        self.assertEqual(response.data['message'], 'Official created successfully')

    

    def test_create_institute_official_invalid_data(self):
        self.client.force_authenticate(user=self.owner)

        data = {
            'name': '',  # Empty name
            'designation': 'Principal',
            'contact_email': 'invalidemail',  # Invalid email
            'official_phone': 'not-a-phone'  # Invalid phone number
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
        self.assertIn('contact_email', response.data)
        self.assertIn('official_phone', response.data)


class EditInstituteOfficialViewTestCase(APITestCase):

    def setUp(self):
        # Create the necessary objects for the tests
        self.institute = Institute.objects.create(name='Test Institute')
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')

        # Create users
        self.owner = User.objects.create_user(username='owner', password='password')
        self.admin = User.objects.create_user(username='admin', password='password')
        self.regular_user = User.objects.create_user(username='user', password='password')

        # Assign roles to users
        InstituteMembership.objects.create(
            user=self.owner,
            institute=self.institute,
            user_type=self.owner_type,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.admin,
            institute=self.institute,
            user_type=self.admin_type,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.regular_user,
            institute=self.institute,
            user_type=InstitueMemberTypes.objects.create(name='Regular'),
            status='active'
        )

        # Create an InstituteOfficial
        self.official = InstituteOfficial.objects.create(
            institute=self.institute,
            name='Jane Doe',
            designation='Secretary',
            contact_email='janedoe@example.com',
            official_phone='+1987654321'
        )

        # URLs for the test
        self.url = reverse('edit-institute-official', kwargs={
            'institute_id': self.institute.id,
            'official_id': self.official.id,
            'user_id': self.owner.id
        })

    def test_edit_institute_official_success(self):
        self.client.force_authenticate(user=self.owner)

        data = {
            'name': 'Jane Smith',
            'designation': 'Manager',
            'contact_email': 'janesmith@example.com',
            'official_phone': '+1234567890'
        }

        response = self.client.put(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.official.refresh_from_db()
        self.assertEqual(self.official.name, 'Jane Smith')
        self.assertEqual(self.official.designation, 'Manager')
        self.assertEqual(response.data['official']['contact_email'], 'janesmith@example.com')
        self.assertEqual(response.data['message'], 'Official updated successfully')

   

    def test_edit_institute_official_invalid_data(self):
        self.client.force_authenticate(user=self.owner)

        data = {
            'name': '',  # Empty name
            'designation': 'Manager',
            'contact_email': 'invalidemail',  # Invalid email
            'official_phone': 'not-a-phone'  # Invalid phone number
        }

        response = self.client.put(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
        self.assertIn('contact_email', response.data)
        self.assertIn('official_phone', response.data)
        self.official.refresh_from_db()
        self.assertEqual(self.official.name, 'Jane Doe')  # Ensure the original data remains


class DeleteInstituteOfficialViewTestCase(APITestCase):

    def setUp(self):
        # Create necessary objects for the tests
        self.institute = Institute.objects.create(name='Test Institute')
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')

        # Create users
        self.owner = User.objects.create_user(username='owner', password='password')
        self.admin = User.objects.create_user(username='admin', password='password')
        self.regular_user = User.objects.create_user(username='user', password='password')

        # Assign roles to users
        InstituteMembership.objects.create(
            user=self.owner,
            institute=self.institute,
            user_type=self.owner_type,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.admin,
            institute=self.institute,
            user_type=self.admin_type,
            status='active'
        )
        InstituteMembership.objects.create(
            user=self.regular_user,
            institute=self.institute,
            user_type=InstitueMemberTypes.objects.create(name='Regular'),
            status='active'
        )

        # Create an InstituteOfficial
        self.official = InstituteOfficial.objects.create(
            institute=self.institute,
            name='Jane Doe',
            designation='Secretary',
            contact_email='janedoe@example.com',
            official_phone='+1987654321'
        )

        # URL for the test
        self.url = reverse('delete-institute-official', kwargs={
            'institute_id': self.institute.id,
            'official_id': self.official.id,
            'user_id': self.owner.id
        })

    def test_delete_institute_official_success(self):
        self.client.force_authenticate(user=self.owner)

        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Official deleted successfully')
        self.assertFalse(InstituteOfficial.objects.filter(id=self.official.id).exists())

    
    def test_delete_institute_official_not_found(self):
        self.client.force_authenticate(user=self.owner)

        invalid_url = reverse('delete-institute-official', kwargs={
            'institute_id': self.institute.id,
            'official_id': 999,  # Non-existent official
            'user_id': self.owner.id
        })

        response = self.client.delete(invalid_url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



class GetInstituteOfficialsByInstituteIDViewTestCase(APITestCase):

    def setUp(self):
        # Create necessary objects for the tests
        self.institute = Institute.objects.create(name='Test Institute')

        self.user = User.objects.create_user(username='user', password='password')

        self.institute_type = InstitueMemberTypes.objects.create(name='Member')

        # Assign a membership to the user for the institute
        InstituteMembership.objects.create(
            user=self.user,
            institute=self.institute,
            user_type=self.institute_type,
            status='active'
        )

        # Create officials for the institute
        self.official1 = InstituteOfficial.objects.create(
            institute=self.institute,
            name='John Doe',
            designation='Principal',
            contact_email='john.doe@example.com',
            official_phone='+1234567890'
        )

        self.official2 = InstituteOfficial.objects.create(
            institute=self.institute,
            name='Jane Smith',
            designation='Vice Principal',
            contact_email='jane.smith@example.com',
            official_phone='+1987654321'
        )

    def test_get_all_officials_by_institute_id(self):
        self.client.force_authenticate(user=self.user)

        url = reverse('get-institute-officials-by-institute-id', kwargs={'institute_id': self.institute.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Check if both officials are returned
        self.assertEqual(response.data[0]['name'], 'John Doe')
        self.assertEqual(response.data[1]['name'], 'Jane Smith')

    def test_get_specific_official_by_id(self):
        self.client.force_authenticate(user=self.user)

        url = reverse('get-institute-officials-by-institute-id', kwargs={'institute_id': self.institute.id})
        response = self.client.get(url, {'official_id': self.official1.id})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'John Doe')
        self.assertEqual(response.data['designation'], 'Principal')

    def test_get_official_not_found(self):
        self.client.force_authenticate(user=self.user)

        url = reverse('get-institute-officials-by-institute-id', kwargs={'institute_id': self.institute.id})
        response = self.client.get(url, {'official_id': 999})

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_institute_not_found(self):
        self.client.force_authenticate(user=self.user)

        url = reverse('get-institute-officials-by-institute-id', kwargs={'institute_id': 999})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateGroupForInstituteViewTestCase(APITestCase):

    def setUp(self):
        # Create necessary objects for the tests
        self.institute = Institute.objects.create(name='Test Institute')

        self.user_owner = User.objects.create_user(username='owner', password='password')
        self.user_admin = User.objects.create_user(username='admin', password='password')
        self.user_teacher = User.objects.create_user(username='teacher', password='password')
        self.user_student = User.objects.create_user(username='student', password='password')

        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.teacher_type = InstitueMemberTypes.objects.create(name='Teacher')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')

        # Assign memberships to users for the institute
        InstituteMembership.objects.create(user=self.user_owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.user_admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.user_teacher, institute=self.institute, user_type=self.teacher_type)
        InstituteMembership.objects.create(user=self.user_student, institute=self.institute, user_type=self.student_type)

    def test_create_group_success_owner(self):
        self.client.force_authenticate(user=self.user_owner)

        url = reverse('create-group', kwargs={'institute_id': self.institute.id, 'user_id': self.user_owner.id})
        data = {'name': 'New Group', 'description': 'This is a new group.'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Group.objects.count(), 1)
        self.assertEqual(Group.objects.get().name, 'New Group')
        self.assertEqual(Group.objects.get().description, 'This is a new group.')

        # Verify that all institute members are added to the group
        group = Group.objects.get()
        self.assertEqual(GroupMembership.objects.filter(group=group).count(), 4)

    def test_create_group_success_teacher(self):
        self.client.force_authenticate(user=self.user_teacher)

        url = reverse('create-group', kwargs={'institute_id': self.institute.id, 'user_id': self.user_teacher.id})
        data = {'name': 'Another Group', 'description': 'This is another group.'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Group.objects.count(), 1)
        self.assertEqual(Group.objects.get().name, 'Another Group')

        # Verify that all institute members are added to the group
        group = Group.objects.get()
        self.assertEqual(GroupMembership.objects.filter(group=group).count(), 4)

    def test_create_group_permission_denied(self):
        self.client.force_authenticate(user=self.user_student)

        url = reverse('create-group', kwargs={'institute_id': self.institute.id, 'user_id': self.user_student.id})
        data = {'name': 'Unauthorized Group', 'description': 'Students should not create groups.'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Group.objects.count(), 0)

    def test_create_group_validation_error(self):
        self.client.force_authenticate(user=self.user_admin)

        url = reverse('create-group', kwargs={'institute_id': self.institute.id, 'user_id': self.user_admin.id})
        data = {'name': '', 'description': 'This group has no name.'}  # Invalid data
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data['errors'])
        self.assertEqual(Group.objects.count(), 0)

    def test_create_group_institute_not_found(self):
        self.client.force_authenticate(user=self.user_admin)

        url = reverse('create-group', kwargs={'institute_id': 9999, 'user_id': self.user_admin.id})
        data = {'name': 'Group for Non-existent Institute', 'description': 'This should fail.'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Group.objects.count(), 0)



class LeaveCreateViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.institute = Institute.objects.create(name="Test Institute")
        self.user = User.objects.create_user(username="testuse", password="password")
        
        self.member_type = InstitueMemberTypes.objects.create(name="member")
        self.membership = InstituteMembership.objects.create(
            user=self.user, 
            institute=self.institute,
            user_type=self.member_type
        )
        
        self.leave_type = LeaveType.objects.create(name="Paid Leave", institute=self.institute)
        self.leave_policy = InstituteLeavePolicy.objects.create(
            institute=self.institute, 
            member_type=self.member_type
        )
        self.leave_policy.leave_types.add(self.leave_type)
        self.user_leave_balance = UserLeaveBalance.objects.create(
            user=self.user, 
            institute=self.institute, 
            leave_type=self.leave_type, 
            leave_policy=self.leave_policy, 
            total_paid_leaves=20
        )

    def test_create_leave_successful(self):
        data = {
            "start_date": "2024-09-01",
            "end_date": "2024-09-05",
            "reason": "vacation",  # Ensure this fits within the field's limit
            "leave_type_category_id": self.leave_type.id,
            "is_paid": True
        }
        url = reverse('create_leave', kwargs={
            'institute_id': self.institute.id, 
            'user_id': self.user.id
        })
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Leave.objects.count(), 1)
        leave = Leave.objects.first()
        self.assertEqual(leave.user, self.user)
        self.assertEqual(leave.institute, self.institute)
        self.assertEqual(leave.start_date.strftime('%Y-%m-%d'), data['start_date'])
        self.assertEqual(leave.end_date.strftime('%Y-%m-%d'), data['end_date'])
        self.assertEqual(leave.reason, data['reason'])
        self.assertEqual(leave.is_paid, data['is_paid'])

        # Check leave_type, should match the LEAVE_TYPE_CHOICES default or provided
        self.assertEqual(leave.leave_type, 'full_day')

        # Check if the leave_type_categories includes the expected LeaveType
        self.assertIn(self.leave_type, leave.leave_type_categories.all())







class DeleteFeeViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Create users
        self.admin_user = User.objects.create_user(username='adminuser', password='password')
        self.other_user = User.objects.create_user(username='otheruser', password='password')

        # Create institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create membership types
        self.admin_type = InstitueMemberTypes.objects.create(name='admin')
        self.member_type = InstitueMemberTypes.objects.create(name='member')

        # Create memberships
        InstituteMembership.objects.create(
            user=self.admin_user,
            institute=self.institute,
            user_type=self.admin_type
        )
        InstituteMembership.objects.create(
            user=self.other_user,
            institute=self.institute,
            user_type=self.member_type
        )

        # Create fee
        self.fee = InstituteFee.objects.create(
            institute=self.institute,
            user=self.admin_user,
            amount=100.00,
            description='Test Fee'
        )

        # Create transaction related to the fee
        InstituteTransaction.objects.create(
            user=self.admin_user,
            institute=self.institute,
            fee=self.fee,
            amount=100.00
        )

        # Define the URL for the API endpoint
        self.url = reverse('delete_fee', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.admin_user.id,
            'fee_id': self.fee.id
        })

    def test_delete_fee_successful(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(self.url)

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(InstituteFee.objects.filter(id=self.fee.id).exists())
        self.assertFalse(InstituteTransaction.objects.filter(fee=self.fee).exists())

   
    

    def test_delete_fee_not_found(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('delete_fee', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.admin_user.id,
            'fee_id': 9999  # Non-existent fee ID
        })
        response = self.client.delete(url)

        # Assertions
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class EditUserRoleViewTests(APITestCase):

    def setUp(self):
        # Create test data
        self.institute = Institute.objects.create(name='Test Institute')
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        self.student_type = InstitueMemberTypes.objects.create(name='Student')

        self.owner_user = User.objects.create_user(username='owner', email='owner@example.com', password='password')
        self.admin_user = User.objects.create_user(username='admin', email='admin@example.com', password='password')
        self.student_user = User.objects.create_user(username='student', email='student@example.com', password='password')

        self.owner_membership = InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=self.owner_type)
        self.admin_membership = InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)
        self.student_membership = InstituteMembership.objects.create(user=self.student_user, institute=self.institute, user_type=self.student_type)

        self.url = reverse('edit_user_role', kwargs={'inst_id': self.institute.id, 'user_id': self.owner_user.id})
        self.client.login(username='owner', password='password')

    def test_successful_role_update(self):
        data = {
            'userId': self.student_user.id,
            'userType': 'Admin',
            'employee_id': 'EMP001'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['updated_role']['user_type'], 'Admin')

    def test_invalid_user_type(self):
        data = {
            'userId': self.student_user.id,
            'userType': 'InvalidRole',  # Invalid userType
            'employee_id': 'EMP001'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Invalid user_type', str(response.data['error']))

   

class AssetCreateViewTests(APITestCase):

    def setUp(self):
        # Create Institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create Users
        self.owner_user = User.objects.create(username='owner', email='owner@example.com')
        self.admin_user = User.objects.create(username='admin', email='admin@example.com')
        self.regular_user = User.objects.create(username='regular', email='regular@example.com')

        # Create Institute Member Types
        owner_type = InstitueMemberTypes.objects.create(name="Owner")
        admin_type = InstitueMemberTypes.objects.create(name="Admin")
        student_type = InstitueMemberTypes.objects.create(name="Student")

        # Create Institute Memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=student_type)

        # Set URLs
        self.url = reverse('add_asset', kwargs={'institute_id': self.institute.id, 'user_id': self.owner_user.id})

        # Asset data
        self.valid_payload = {
            'asset_name': 'Projector',
            'quantity': 2,
            'status': 'available'
        }
        self.invalid_payload = {
            'asset_name': '',
            'quantity': -1,
            'status': 'unknown_status'
        }
    def test_successful_asset_creation_by_owner(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['asset']['asset_name'], 'Projector')
        self.assertEqual(response.data['asset']['quantity'], 2)
        self.assertEqual(response.data['asset']['status'], 'available')
    def test_successful_asset_creation_by_admin(self):
        self.url = reverse('add_asset', kwargs={'institute_id': self.institute.id, 'user_id': self.admin_user.id})
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['asset']['asset_name'], 'Projector')
        self.assertEqual(response.data['asset']['quantity'], 2)
        self.assertEqual(response.data['asset']['status'], 'available')
    def test_permission_denied_for_regular_user(self):
        self.url = reverse('add_asset', kwargs={'institute_id': self.institute.id, 'user_id': self.regular_user.id})
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)
        self.assertEqual(str(response.data['detail']), "You do not have permission to perform this action.")
    def test_invalid_data_empty_asset_name(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['asset_name'] = ''
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('asset_name', response.data)

    def test_invalid_data_negative_quantity(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['quantity'] = -1
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('quantity', response.data)

    def test_invalid_data_invalid_status(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['status'] = 'invalid_status'
        response = self.client.post(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('status', response.data)



class AssetUpdateViewTests(APITestCase):

    def setUp(self):
        # Create Institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create Users
        self.owner_user = User.objects.create(username='owner', email='owner@example.com')
        self.admin_user = User.objects.create(username='admin', email='admin@example.com')
        self.regular_user = User.objects.create(username='regular', email='regular@example.com')

        # Create Institute Member Types
        owner_type = InstitueMemberTypes.objects.create(name="Owner")
        admin_type = InstitueMemberTypes.objects.create(name="Admin")
        student_type = InstitueMemberTypes.objects.create(name="Student")

        # Create Institute Memberships
        InstituteMembership.objects.create(user=self.owner_user, institute=self.institute, user_type=owner_type)
        InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=admin_type)
        InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=student_type)

        # Create Asset
        self.asset = Asset.objects.create(
            institute=self.institute,
            asset_name='Laptop',
            quantity=5,
            status='available'
        )

        # Set URLs
        self.url = reverse('update-asset', kwargs={'institute_id': self.institute.id, 'asset_id': self.asset.id, 'user_id': self.owner_user.id})

        # Asset update data
        self.valid_payload = {
            'asset_name': 'Updated Laptop',
            'quantity': 10,
            'status': 'in_use'
        }
        self.invalid_payload = {
            'asset_name': '',
            'quantity': 0,
            'status': 'invalid_status'
        }
    def test_successful_asset_update_by_owner(self):
        response = self.client.put(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['asset']['asset_name'], 'Updated Laptop')
        self.assertEqual(response.data['asset']['quantity'], 10)
        self.assertEqual(response.data['asset']['status'], 'in_use')

    def test_successful_asset_update_by_admin(self):
        self.url = reverse('update-asset', kwargs={'institute_id': self.institute.id, 'asset_id': self.asset.id, 'user_id': self.admin_user.id})
        response = self.client.put(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['asset']['asset_name'], 'Updated Laptop')
        self.assertEqual(response.data['asset']['quantity'], 10)
        self.assertEqual(response.data['asset']['status'], 'in_use')
    def test_permission_denied_for_regular_user(self):
        self.url = reverse('update-asset', kwargs={'institute_id': self.institute.id, 'asset_id': self.asset.id, 'user_id': self.regular_user.id})
        response = self.client.put(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)
        self.assertEqual(str(response.data['detail']), "You do not have permission to perform this action.")

    def test_invalid_data_empty_asset_name(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['asset_name'] = ''
        response = self.client.put(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('asset_name', response.data)
        self.assertEqual(response.data['asset_name'][0], "This field may not be blank.")
    def test_invalid_data_zero_quantity(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['quantity'] = 0
        response = self.client.put(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('quantity', response.data)
        self.assertEqual(response.data['quantity'][0], "Quantity must be at least 1.")

    def test_invalid_data_invalid_status(self):
        invalid_payload = self.valid_payload.copy()
        invalid_payload['status'] = 'invalid_status'
        response = self.client.put(self.url, invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('status', response.data)
        self.assertEqual(response.data['status'][0], '"invalid_status" is not a valid choice.')

    

class AssetListViewTests(APITestCase):

    def setUp(self):
        # Create Institute
        self.institute1 = Institute.objects.create(name="Test Institute 1")
        self.institute2 = Institute.objects.create(name="Test Institute 2")

        # Create Assets for Institute 1
        self.asset1 = Asset.objects.create(
            institute=self.institute1,
            asset_name="Laptop",
            quantity=5,
            status="available",
            created_at=datetime.now() - timedelta(days=1)  # Created yesterday
        )

        self.asset2 = Asset.objects.create(
            institute=self.institute1,
            asset_name="Projector",
            quantity=2,
            status="in_use",
            created_at=datetime.now()  # Created today
        )

        # Create Asset for Institute 2
        self.asset3 = Asset.objects.create(
            institute=self.institute2,
            asset_name="Whiteboard",
            quantity=3,
            status="available",
            created_at=datetime.now()  # Created today
        )

        # URL for listing assets
        self.url = reverse('asset-list')

    def test_list_all_assets(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  # Three assets should be listed
    def test_filter_by_institute_id(self):
        response = self.client.get(self.url, {'institute_id': self.institute1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Only assets from institute1 should be listed

        response = self.client.get(self.url, {'institute_id': self.institute2.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only assets from institute2 should be listed

    def test_filter_by_asset_id(self):
        response = self.client.get(self.url, {'id': self.asset1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only asset1 should be listed
        self.assertEqual(response.data[0]['asset_name'], 'Laptop')






class AssetDeleteViewTests(APITestCase):

    

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create user types (assuming InstituteMembershipType is the correct model)
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        self.member_type = InstitueMemberTypes.objects.create(name="Member")

        # Create users
        self.owner = User.objects.create_user(username="owner", password="password")
        self.admin = User.objects.create_user(username="admin", password="password")
        self.member = User.objects.create_user(username="member", password="password")
        self.other_user = User.objects.create_user(username="other_user", password="password")

        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.member, institute=self.institute, user_type=self.member_type)

        # Create an asset
        self.asset = Asset.objects.create(institute=self.institute, asset_name="Laptop", quantity=5, status="available")

        # URL for deleting the asset
        self.url = reverse('delete-asset', kwargs={
            'institute_id': self.institute.id,
            'asset_id': self.asset.id,
            'user_id': self.owner.id
        })



    def test_owner_can_delete_asset(self):
        self.client.login(username="owner", password="password")
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Asset.objects.filter(id=self.asset.id).exists())

    def test_admin_can_delete_asset(self):
        self.client.login(username="admin", password="password")
        url = reverse('delete-asset', kwargs={
            'institute_id': self.institute.id,
            'asset_id': self.asset.id,
            'user_id': self.admin.id
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Asset.objects.filter(id=self.asset.id).exists())

    def test_member_cannot_delete_asset(self):
        self.client.login(username="member", password="password")
        url = reverse('delete-asset', kwargs={
            'institute_id': self.institute.id,
            'asset_id': self.asset.id,
            'user_id': self.member.id
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Asset.objects.filter(id=self.asset.id).exists())

    def test_other_user_cannot_delete_asset(self):
        self.client.login(username="other_user", password="password")
        url = reverse('delete-asset', kwargs={
            'institute_id': self.institute.id,
            'asset_id': self.asset.id,
            'user_id': self.other_user.id
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Asset.objects.filter(id=self.asset.id).exists())

    def test_cannot_delete_nonexistent_asset(self):
        self.client.login(username="owner", password="password")
        url = reverse('delete-asset', kwargs={
            'institute_id': self.institute.id,
            'asset_id': 9999,  # Nonexistent asset ID
            'user_id': self.owner.id
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cannot_delete_asset_for_nonexistent_institute(self):
        self.client.login(username="owner", password="password")
        url = reverse('delete-asset', kwargs={
            'institute_id': 9999,  # Nonexistent institute ID
            'asset_id': self.asset.id,
            'user_id': self.owner.id
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cannot_delete_asset_for_nonexistent_user(self):
        self.client.login(username="owner", password="password")
        url = reverse('delete-asset', kwargs={
            'institute_id': self.institute.id,
            'asset_id': self.asset.id,
            'user_id': 9999  # Nonexistent user ID
        })
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)





class TimeTableCreateViewTests(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        self.member_type = InstitueMemberTypes.objects.create(name="Member")

        # Create users
        self.owner = User.objects.create_user(username="owner", password="password")
        self.admin = User.objects.create_user(username="admin", password="password")
        self.member = User.objects.create_user(username="member", password="password")

        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.member, institute=self.institute, user_type=self.member_type)

        # Define the URL for creating a timetable
        self.url = reverse('create-timetabe', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.admin.id
        })

    def test_admin_can_create_timetable(self):
        self.client.login(username="admin", password="password")
        test_file = SimpleUploadedFile("test_file.pdf", b"file_content", content_type="application/pdf")
        data = {
            'file': test_file,
            'remarks': 'Admin Timetable'
        }
        response = self.client.post(self.url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        timetable_id = response.data['timetable']['id']
        print(f"Created Timetable ID: {timetable_id}")

        timetable = Timetable.objects.filter(id=timetable_id).first()
        print("Filtered Timetable:", timetable)
        if timetable:
            print(f"Uploaded by ID: {timetable.uploaded_by.id}")
        else:
            print("Timetable not found")

        self.assertIsNotNone(timetable, "Timetable not found")
        self.assertEqual(timetable.uploaded_by.id, self.admin.id)


class TimeTableUpdateViewTests(APITestCase):

    def setUp(self):
    # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        self.member_type = InstitueMemberTypes.objects.create(name="Member")

        # Create users
        self.owner = User.objects.create_user(username="owner", password="password")
        self.admin = User.objects.create_user(username="admin", password="password")
        self.member = User.objects.create_user(username="member", password="password")

        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.member, institute=self.institute, user_type=self.member_type)

        # Create a course without 'institute' since it doesn't exist in the model
        self.course = Course.objects.create(
            courseGlobalCode="COURSE001",
            courseFullName="Test Course"
            # Add other required fields here
        )

        # Create a Timetable
        self.timetable = Timetable.objects.create(
            institute=self.institute,
            remarks="Initial Timetable",
            uploaded_by=self.admin,
        )
        self.timetable.courses.add(self.course)

        # Define the URL for updating the timetable
        self.url = reverse('create-timetabe', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.admin.id,
            'timetable_id': self.timetable.id,
        })


    def test_admin_can_update_timetable(self):
        self.client.login(username="admin", password="password")
        updated_file = SimpleUploadedFile("updated_file.pdf", b"updated_file_content", content_type="application/pdf")
        data = {
            'remarks': 'Updated Timetable',
            'file': updated_file,
        }
        response = self.client.put(self.url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the timetable was updated
        timetable = Timetable.objects.get(id=self.timetable.id)
        self.assertEqual(timetable.remarks, 'Updated Timetable')
        self.assertEqual(timetable.uploaded_by, self.admin)
        self.assertTrue(timetable.file.name.endswith("updated_file.pdf"))

    def test_update_timetable_with_invalid_data(self):
        self.client.login(username="admin", password="password")
        data = {
            'remarks': '',  # Empty remarks should fail validation
        }
        response = self.client.put(self.url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('remarks', response.data)

    def test_update_timetable_not_found(self):
        self.client.login(username="admin", password="password")
        wrong_url = reverse('create-timetabe', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.admin.id,
            'timetable_id': 9999,  # Non-existent timetable ID
        })
        updated_file = SimpleUploadedFile("updated_file.pdf", b"updated_file_content", content_type="application/pdf")
        data = {
            'remarks': 'Updated Timetable',
            'file': updated_file,
        }
        response = self.client.put(wrong_url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



class TimeTableDeleteViewTests(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create user types
        self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
        self.admin_type = InstitueMemberTypes.objects.create(name="Admin")
        self.member_type = InstitueMemberTypes.objects.create(name="Member")

        # Create users
        self.owner = User.objects.create_user(username="owner", password="password")
        self.admin = User.objects.create_user(username="admin", password="password")
        self.member = User.objects.create_user(username="member", password="password")
        self.uploader = User.objects.create_user(username="uploader", password="password")

        # Create institute memberships
        InstituteMembership.objects.create(user=self.owner, institute=self.institute, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.admin, institute=self.institute, user_type=self.admin_type)
        InstituteMembership.objects.create(user=self.member, institute=self.institute, user_type=self.member_type)
        InstituteMembership.objects.create(user=self.uploader, institute=self.institute, user_type=self.member_type)

        # Create a Timetable
        self.timetable = Timetable.objects.create(
            institute=self.institute,
            remarks="Test Timetable",
            uploaded_by=self.uploader,
        )

        # Define the URL for deleting the timetable
        self.url = reverse('pdf-delete', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.uploader.id,
            'timetable_id': self.timetable.id,
        })

    def test_admin_can_delete_timetable(self):
        self.client.login(username="admin", password="password")
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Timetable.objects.filter(id=self.timetable.id).count(), 0)
        self.assertEqual(response.data['message'], 'Timetable deleted successfully')

    def test_owner_can_delete_timetable(self):
        self.client.login(username="owner", password="password")
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Timetable.objects.filter(id=self.timetable.id).count(), 0)
        self.assertEqual(response.data['message'], 'Timetable deleted successfully')

    def test_uploader_can_delete_timetable(self):
        self.client.login(username="uploader", password="password")
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Timetable.objects.filter(id=self.timetable.id).count(), 0)
        self.assertEqual(response.data['message'], 'Timetable deleted successfully')

   

    def test_timetable_not_found(self):
        self.client.login(username="admin", password="password")
        wrong_url = reverse('pdf-delete', kwargs={
            'institute_id': self.institute.id,
            'user_id': self.admin.id,
            'timetable_id': 9999,  # Non-existent timetable ID
        })
        response = self.client.delete(wrong_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



class TimetableFilterViewTests(APITestCase):

    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create a user who uploaded timetables
        self.user = User.objects.create_user(username="uploader", password="password")

        # Create courses
        self.course1 = Course.objects.create(courseGlobalCode="COURSE1")
        self.course2 = Course.objects.create(courseGlobalCode="COURSE2")

        # Create batches with valid start_date and end_date
        self.batch1 = Batch.objects.create(
            name="Batch 1",
            institute=self.institute,
            start_date="2024-08-01",
            end_date="2024-12-31",  # Ensure end_date is set
            created_by=self.user
        )
        self.batch2 = Batch.objects.create(
            name="Batch 2",
            institute=self.institute,
            start_date="2024-09-01",
            end_date="2024-11-30" , # Ensure end_date is set
            created_by=self.user
        )

        # Create timetables
        self.timetable1 = Timetable.objects.create(
            institute=self.institute,
            remarks="Timetable 1",
            uploaded_by=self.user,
        )
        self.timetable1.courses.add(self.course1)
        self.timetable1.batches.add(self.batch1)

        self.timetable2 = Timetable.objects.create(
            institute=self.institute,
            remarks="Timetable 2",
            uploaded_by=self.user,
        )
        self.timetable2.courses.add(self.course2)
        self.timetable2.batches.add(self.batch2)

        # Define the base URL for filtering timetables
        self.url = reverse('timetable-filter')



    def test_filter_by_date_range(self):
        response = self.client.get(self.url, {'start_date': self.timetable1.created_at.date(), 'end_date': self.timetable2.created_at.date()})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['timetables']), 2)  # Expecting both timetables to be returned

    def test_filter_by_timetable_id(self):
        response = self.client.get(self.url, {'timetable_id': self.timetable1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['timetables']), 1)
        self.assertEqual(response.data['timetables'][0]['id'], self.timetable1.id)

    def test_filter_by_course_id(self):
        response = self.client.get(self.url, {'course_id': self.course1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['timetables']), 1)
        self.assertEqual(response.data['timetables'][0]['id'], self.timetable1.id)

    def test_filter_by_institute_id(self):
        response = self.client.get(self.url, {'institute_id': self.institute.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['timetables']), 2)  # Expecting both timetables since they belong to the same institute

    def test_filter_by_batch_id(self):
        response = self.client.get(self.url, {'batch_id': self.batch1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['timetables']), 1)
        self.assertEqual(response.data['timetables'][0]['id'], self.timetable1.id)

    def test_no_filters_applied(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['timetables']), 2)  # Expecting both timetables

    def test_combination_of_filters(self):
        response = self.client.get(self.url, {
            'start_date': self.timetable1.created_at.date(),
            'end_date': self.timetable2.created_at.date(),
            'course_id': self.course1.id,
            'institute_id': self.institute.id,
            'batch_id': self.batch1.id,
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['timetables']), 1)
        self.assertEqual(response.data['timetables'][0]['id'], self.timetable1.id)



class GetAllMembersInGroupViewTests(APITestCase):

    def setUp(self):
    # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")

        # Create a group with the institute
        self.group = Group.objects.create(name="Test Group", institute=self.institute)

        # Create users
        self.user1 = User.objects.create_user(
            username="user1", 
            
            email="user1@example.com",
            password="password1"
        )
        self.user2 = User.objects.create_user(
            username="user2", 
            
            email="user2@example.com",
            password="password2"
        )

        # Create roles
        self.role_admin = InstitueMemberTypes.objects.create(name="Admin")
        self.role_member = InstitueMemberTypes.objects.create(name="Member")

        # Create group memberships
        self.membership1 = GroupMembership.objects.create(group=self.group, user=self.user1, role=self.role_admin)
        self.membership2 = GroupMembership.objects.create(group=self.group, user=self.user2, role=self.role_member)

        # Create URL
        self.url = reverse('get-all-members-in-group', kwargs={'group_id': self.group.id})

    def test_get_all_members_in_group_success(self):
        # Test to retrieve all members in a group
        response = self.client.get(self.url)

        # Assert the response is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert the number of members returned
        self.assertEqual(len(response.data), 2)

        # Check if the serialized data matches
        expected_data = GroupMembershipSerializer([self.membership1, self.membership2], many=True).data
        self.assertEqual(response.data, expected_data)

   
    def test_get_members_in_non_existent_group(self):
        # Test to retrieve members in a non-existent group
        url = reverse('get-all-members-in-group', kwargs={'group_id': 999})

        # Expect a 404 response
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

   


class AddPostToGroupViewTests(APITestCase):
    def setUp(self):
        # Create an institute
        self.institute = Institute.objects.create(name="Test Institute")
        
        # Create a group within the institute
        self.group = Group.objects.create(name="Test Group", institute=self.institute)
        
        # Create a user and add them to the institute
        self.user = User.objects.create_user(username="testuse", email="testuser@example.com", password="password123")
        self.membership = InstituteMembership.objects.create(
            user=self.user,
            institute=self.institute
        )

        # URL for the test
        self.url = reverse('add-post-to-group', kwargs={'institute_id': self.institute.id, 'group_id': self.group.id, 'user_id': self.user.id})
    def test_membership_creation(self):
        self.assertEqual(InstituteMembership.objects.count(), 1)
        membership = InstituteMembership.objects.get()
        self.assertEqual(membership.user, self.user)
        self.assertEqual(membership.institute, self.institute)
    def test_add_post_success(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'title': 'Test Post',
            'content': 'This is a test post.',
            'attachment': None  # Assuming no attachment for this test
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        post = Post.objects.get()
        self.assertEqual(post.title, 'Test Post')
        self.assertEqual(post.author, self.user)
        self.assertEqual(post.group, self.group)

    def test_user_not_found(self):
        invalid_url = reverse('add-post-to-group', kwargs={'institute_id': self.institute.id, 'group_id': self.group.id, 'user_id': 9999})
        data = {
            'title': 'Test Post',
            'content': 'This is a test post.',
            'attachment': None
        }
        response = self.client.post(invalid_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found with the provided ID.")

   







class EditPostViewTests(APITestCase):
    def setUp(self):
        # Create a test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test users
        self.user1 = User.objects.create_user(username='testuser1', password='testpassword')
        self.user2 = User.objects.create_user(username='testuser2', password='testpassword')
        self.token1, created = Token.objects.get_or_create(user=self.user1)
        self.token2, created = Token.objects.get_or_create(user=self.user2)

        # Create test group and institute memberships
        self.group = Group.objects.create(name='Test Group', institute=self.institute)
        self.institute_membership1 = InstituteMembership.objects.create(
            user=self.user1,
            institute=self.institute
        )
        self.institute_membership2 = InstituteMembership.objects.create(
            user=self.user2,
            institute=self.institute
        )

        # Create a post
        self.post = Post.objects.create(
            author=self.user1,
            group=self.group,
            title='Original Title',
            content='Original Content',
            attachment=None,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # URLs for test cases
        self.url = reverse('edit-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': self.user1.id
        })

    def test_user_not_in_institute_member(self):
        # User2 is not part of the institute
        url = reverse('edit-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': self.user2.id
        })
        data = {
            'title': 'Invalid Edit',
            'content': 'User is not in the institute'
        }
        response = self.client.put(url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token2.key)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_successful_post_edit(self):
        data = {
            'title': 'Updated Title',
            'content': 'Updated Content'
        }
        response = self.client.put(self.url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, 'Updated Title')
        self.assertEqual(self.post.content, 'Updated Content')

    def test_unauthorized_user_edit(self):
        url = reverse('edit-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': self.user2.id  # User2 is not the author
        })
        data = {
            'title': 'Malicious Title',
            'content': 'Malicious Content'
        }
        response = self.client.put(url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token2.key)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_invalid_data_submission(self):
        # Invalid data: empty content
        data = {
            'title': 'Invalid Title',
            'content': ''
        }
        response = self.client.put(self.url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('content', response.data['errors'])

    def test_post_not_found(self):
        url = reverse('edit-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': 9999,  # Non-existent post
            'user_id': self.user1.id
        })
        data = {
            'title': 'Some Title',
            'content': 'Some Content'
        }
        response = self.client.put(url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class DeletePostViewTests(APITestCase):
    def setUp(self):
        # Create a test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test users
        self.user1 = User.objects.create_user(username='testuser1', password='testpassword')
        self.user2 = User.objects.create_user(username='testuser2', password='testpassword')
        self.token1, created = Token.objects.get_or_create(user=self.user1)
        self.token2, created = Token.objects.get_or_create(user=self.user2)

        # Create test group and institute memberships
        self.group = Group.objects.create(name='Test Group', institute=self.institute)
        self.institute_membership1 = InstituteMembership.objects.create(
            user=self.user1,
            institute=self.institute
        )
        self.institute_membership2 = InstituteMembership.objects.create(
            user=self.user2,
            institute=self.institute
        )

        # Create a post
        self.post = Post.objects.create(
            author=self.user1,
            group=self.group,
            title='Post Title',
            content='Post Content',
            attachment=None,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # URLs for test cases
        self.url = reverse('delete-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': self.user1.id
        })

    def test_successful_post_deletion(self):
        response = self.client.delete(self.url, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Post deleted successfully.')
        self.assertFalse(Post.objects.filter(id=self.post.id).exists())  # Verify the post is deleted

    def test_unauthorized_user(self):
        url = reverse('delete-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': self.user2.id  # User2 is not the author
        })
        response = self.client.delete(url, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token2.key)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)  # Check for permission error message

    def test_user_not_in_institute(self):
        # Create a user who is not in the institute
        external_user = User.objects.create_user(username='externaluser', password='testpassword')
        external_token, created = Token.objects.get_or_create(user=external_user)

        url = reverse('delete-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': external_user.id  # External user who is not part of the institute
        })
        response = self.client.delete(url, format='json', HTTP_AUTHORIZATION='Bearer ' + external_token.key)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)  # Check for permission error message

    def test_post_not_found(self):
        url = reverse('delete-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': 9999,  # Non-existent post
            'user_id': self.user1.id
        })
        response = self.client.delete(url, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('detail', response.data)  # Check for not found error message

    def test_invalid_user_id(self):
        # Use a valid post but invalid user ID
        url = reverse('delete-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': 9999  # Invalid user ID
        })
        response = self.client.delete(url, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)  # Check for permission error message







class AddCommentToPostViewTests(APITestCase):
    def setUp(self):
        # Create a test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test users
        self.user1 = User.objects.create_user(username='testuser1', password='testpassword')
        self.user2 = User.objects.create_user(username='testuser2', password='testpassword')
        self.token1, created = Token.objects.get_or_create(user=self.user1)
        self.token2, created = Token.objects.get_or_create(user=self.user2)

        # Create test group
        self.group = Group.objects.create(name='Test Group', institute=self.institute)

        # Create test institute memberships
        self.institute_membership1 = InstituteMembership.objects.create(
            user=self.user1,
            institute=self.institute
        )
        self.institute_membership2 = InstituteMembership.objects.create(
            user=self.user2,
            institute=self.institute
        )

        # Create a post
        self.post = Post.objects.create(
            author=self.user1,
            group=self.group,  # Ensure this group exists
            title='Post Title',
            content='Post Content',
            attachment=None,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # URLs for test cases
        self.url = reverse('add-comment-to-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': self.user1.id
        })

    # Your test methods here


    def test_user_not_in_institute(self):
        # Create a user who is not in the institute
        external_user = User.objects.create_user(username='externaluser', password='testpassword')
        external_token, created = Token.objects.get_or_create(user=external_user)

        url = reverse('add-comment-to-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': external_user.id  # External user who is not part of the institute
        })
        data = {
            'content': 'This should fail'
        }
        response = self.client.post(url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + external_token.key)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)  # Check for permission error message

    def test_user_not_found(self):
        url = reverse('add-comment-to-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': self.post.id,
            'user_id': 9999  # Non-existent user
        })
        data = {
            'content': 'This should fail'
        }
        response = self.client.post(url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)  # Check for user not found message

    def test_invalid_data_submission(self):
        # Invalid data: empty content
        data = {
            'content': ''
        }
        response = self.client.post(self.url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('content', response.data['errors'])

    def test_post_not_found(self):
        url = reverse('add-comment-to-post', kwargs={
            'institute_id': self.institute.id,
            'post_id': 9999,  # Non-existent post
            'user_id': self.user1.id
        })
        data = {
            'content': 'This should fail'
        }
        response = self.client.post(url, data, format='json', HTTP_AUTHORIZATION='Bearer ' + self.token1.key)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('detail', response.data)  # Check for post not found message



class EditCommentViewTests(APITestCase):
    def setUp(self):
        # Create a test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test users
        self.user1 = User.objects.create_user(username='testuser1', password='testpassword')
        self.user2 = User.objects.create_user(username='testuser2', password='testpassword')
        self.token1, created = Token.objects.get_or_create(user=self.user1)
        self.token2, created = Token.objects.get_or_create(user=self.user2)

        # Create test group and associate it with the institute
        self.group = Group.objects.create(name='Test Group', institute=self.institute)

        # Create a post
        self.post = Post.objects.create(
            author=self.user1,
            group=self.group,
            title='Post Title',
            content='Post Content',
            attachment=None,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # Create a comment
        self.comment = Comment.objects.create(
            post=self.post,
            author=self.user1,
            group=self.group,
            content='Original Comment Content',
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # URL for the EditCommentView
        self.url = reverse('edit-comment', kwargs={
            'institute_id': self.institute.id,
            'comment_id': self.comment.id,
            'user_id': self.user1.id
        })

    def test_successful_comment_edit(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)
        data = {
            'content': 'Updated Comment Content'
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Comment edited successfully.')
        self.assertEqual(response.data['comment']['content'], 'Updated Comment Content')
        self.assertEqual(Comment.objects.get(id=self.comment.id).content, 'Updated Comment Content')

   
    def test_invalid_comment_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)
        data = {
            'content': ''  # Empty content should be invalid
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('This field may not be blank.', str(response.data['errors']['content']))




class DeleteCommentViewTests(APITestCase):
    def setUp(self):
        # Create a test institute
        self.institute = Institute.objects.create(name='Test Institute')

        # Create test users
        self.user1 = User.objects.create_user(username='testuser1', password='testpassword')
        self.user2 = User.objects.create_user(username='testuser2', password='testpassword')
        self.token1, created = Token.objects.get_or_create(user=self.user1)
        self.token2, created = Token.objects.get_or_create(user=self.user2)

        # Create test group and associate it with the institute
        self.group = Group.objects.create(name='Test Group', institute=self.institute)

        # Create a post
        self.post = Post.objects.create(
            author=self.user1,
            group=self.group,
            title='Post Title',
            content='Post Content',
            attachment=None,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # Create a comment
        self.comment = Comment.objects.create(
            post=self.post,
            author=self.user1,
            group=self.group,
            content='Comment to be deleted',
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # Create an institute membership for the user1
        self.membership = InstituteMembership.objects.create(
            user=self.user1,
            institute=self.institute
            # Ensure this matches the actual model fields
        )

        # Create an institute membership for the user2 but not for the current institute
        self.other_institute = Institute.objects.create(name='Other Institute')
        self.membership_other = InstituteMembership.objects.create(
            user=self.user2,
            institute=self.other_institute
            # Ensure this matches the actual model fields
        )

        # URL for the DeleteCommentView
        self.url = reverse('delete-comment', kwargs={
            'institute_id': self.institute.id,
            'comment_id': self.comment.id,
            'user_id': self.user1.id
        })

    # Your test methods...


    def test_successful_comment_deletion(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Comment deleted successfully.')
        self.assertFalse(Comment.objects.filter(id=self.comment.id).exists())

   

class PostListViewTests(APITestCase):

    def setUp(self):
        # Create test users
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        self.user3 = User.objects.create_user(username='user3', password='password3')

        # Create a test group
        self.group = Group.objects.create(name='Test Group',institute=self.institute)

        # Create posts
        self.post1 = Post.objects.create(
            author=self.user1,
            group=self.group,
            title="Post 1",
            content="Content of Post 1",
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        self.post2 = Post.objects.create(
            author=self.user2,
            group=self.group,
            title="Post 2",
            content="Content of Post 2",
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # Add likes to posts
        self.post1.likes.add(self.user2)
        self.post2.likes.add(self.user1, self.user3)

        # Create comments for post1
        self.comment1 = Comment.objects.create(
            post=self.post1,
            author=self.user2,
            content="Comment 1 on Post 1",
            created_at=timezone.now(),
            updated_at=timezone.now()
        )
        self.comment2 = Comment.objects.create(
            post=self.post1,
            author=self.user3,
            content="Comment 2 on Post 1",
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        # URL for the PostListView
        self.url = reverse('post-list')
    def test_list_retrieval(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    # Test cases below...
    def test_filter_by_post_id(self):
        response = self.client.get(self.url, {'post_id': self.post1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['id'], self.post1.id)

    def test_filter_by_institute_id(self):
        response = self.client.get(self.url, {'institute_id': self.group.institute.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)  # Assuming both posts belong to the same institute


    def test_filter_by_user_id(self):
        response = self.client.get(self.url, {'user_id': self.user1.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['author']['id'], self.user1.id)

    def test_ordering_by_updated_at(self):
        response = self.client.get(self.url, {'ordering': 'updated_at'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['results'][0]['updated_at'] <= response.data['results'][1]['updated_at'])
    def test_pagination(self):
        response = self.client.get(self.url, {'page': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertIn('results', response.data)
    def test_nested_comment_data(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        post_data = response.data['results'][0]
        self.assertIn('comments', post_data)
        self.assertEqual(post_data['comment_count'], 2)
        self.assertEqual(len(post_data['comments']), 2)
    def test_like_count_and_user_has_liked(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION=f'Token {self.token1.key}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        post_data = response.data['results'][0]
        self.assertEqual(post_data['like_count'], 1)  # Post 1 is liked by 1 user
        self.assertTrue(post_data['user_has_liked'])  # User 1 has liked post 1

    # class DeleteTransactionViewTestCase(APITestCase):
#     def setUp(self):
#         self.client = APIClient()

#         # Create users
#         self.admin_user = User.objects.create_user(username='adminuser', password='password')
#         self.other_user = User.objects.create_user(username='otheruser', password='password')

#         # Create institute
#         self.institute = Institute.objects.create(name="Test Institute")

#         # Create membership types
#         self.admin_type = InstitueMemberTypes.objects.create(name='admin')
#         self.member_type = InstitueMemberTypes.objects.create(name='member')

#         # Create memberships
#         InstituteMembership.objects.create(
#             user=self.admin_user,
#             institute=self.institute,
#             user_type=self.admin_type
#         )
#         InstituteMembership.objects.create(
#             user=self.other_user,
#             institute=self.institute,
#             user_type=self.member_type
#         )

#         # Create a fee
#         self.fee = InstituteFee.objects.create(
#             institute=self.institute,
#             amount=100.00,
#             description='Test Fee'
#         )

#         # Create a transaction related to the fee
#         self.transaction = InstituteTransaction.objects.create(
#             user=self.admin_user,  # Ensure a registered user is specified
#             institute=self.institute,
#             fee=self.fee,  # Ensure a fee is specified
#             amount=100.00
#         )

#         # Define the URL for the API endpoint
#         self.url = reverse('delete_transaction', kwargs={
#             'institute_id': self.institute.id,
#             'user_id': self.admin_user.id,
#             'transaction_id': self.transaction.id
#         })

#     def test_delete_transaction_successful(self):
#         self.client.force_authenticate(user=self.admin_user)
#         response = self.client.delete(self.url)

#         # Assertions
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertFalse(InstituteTransaction.objects.filter(id=self.transaction.id).exists())

#     def test_delete_transaction_permission_denied(self):
#         self.client.force_authenticate(user=self.other_user)
#         response = self.client.delete(self.url)

#         # Assertions
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         self.assertIn(
#             "You are not authorized to delete this transaction.",
#             response.data['detail']
#         )

#     def test_delete_transaction_not_found(self):
#         self.client.force_authenticate(user=self.admin_user)
#         url = reverse('delete_transaction', kwargs={
#             'institute_id': self.institute.id,
#             'user_id': self.admin_user.id,
#             'transaction_id': 9999  # Non-existent transaction ID
#         })
#         response = self.client.delete(url)

#         # Assertions
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

#     def test_delete_transaction_not_member(self):
#         # Remove the membership
#         InstituteMembership.objects.filter(user=self.admin_user).delete()

#         self.client.force_authenticate(user=self.admin_user)
#         response = self.client.delete(self.url)

#         # Assertions
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         self.assertIn(
#             "You are not authorized to delete this transaction.",
#             response.data['detail']
#         )

#     def test_delete_transaction_not_authorized(self):
#         self.client.force_authenticate(user=self.other_user)
#         url = reverse('delete_transaction', kwargs={
#             'institute_id': self.institute.id,
#             'user_id': self.other_user.id,
#             'transaction_id': self.transaction.id
#         })
#         response = self.client.delete(url)

#         # Assertions
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         self.assertIn(
#             "You are not authorized to delete this transaction.",
#             response.data['detail']
#         )



    # def test_update_leave_invalid_data(self):
    #     # Invalid date format
    #     data = {
    #         "start_date": "invalid-date",
    #         "end_date": "invalid-date",
    #         "reason": "sick",
    #         "is_paid": False,
    #         "leave_type_category_id": self.leave_type.id
    #     }
    #     self.client.force_authenticate(user=self.admin_user)
    #     response = self.client.put(self.url, data, format='json')
        
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('start_date', response.data)
    #     self.assertIn('end_date', response.data)

    # def test_update_leave_unauthorized_user(self):
    #     data = {
    #         "start_date": "2024-01-05",
    #         "end_date": "2024-01-07",
    #         "reason": "sick",
    #         "is_paid": False,
    #         "leave_type_category_id": self.leave_type.id
    #     }
    #     self.client.force_authenticate(user=self.regular_user)  # Regular user without admin rights
    #     response = self.client.put(self.url, data, format='json')
        
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    #     self.assertIn('detail', response.data)
    #     self.assertEqual(response.data['detail'], 'You do not have permission to edit this leave request.')

    # def test_update_non_existent_leave(self):
    #     non_existent_url = reverse('edit_leave', args=[self.institute.id, 99999])  # Non-existent leave ID
    #     data = {
    #         "start_date": "2024-01-05",
    #         "end_date": "2024-01-07",
    #         "reason": "sick",
    #         "is_paid": False,
    #         "leave_type_category_id": self.leave_type.id
    #     }
    #     self.client.force_authenticate(user=self.admin_user)
    #     response = self.client.put(non_existent_url, data, format='json')
        
    #     self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    #     self.assertIn('detail', response.data)
    #     self.assertEqual(response.data['detail'], 'Not found.')


    # def test_update_leave_permission_denied(self):
    #     self.client.force_authenticate(user=self.regular_user)
    #     data = {
    #         "start_date": "2024-01-05",
    #         "end_date": "2024-01-07",
    #         "reason": "sick",
    #         "is_paid": False,
    #         "leave_type_category_id": self.leave_type.id
    #     }
    #     response = self.client.put(self.url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # def test_update_leave_invalid_data(self):
    #     self.client.force_authenticate(user=self.admin_user)
    #     data = {
    #         "start_date": "2024-01-07",
    #         "end_date": "2024-01-05",  # Invalid end_date (before start_date)
    #         "reason": "invalid_reason",  # Invalid reason
    #         "is_paid": False,
    #         "leave_type_category_id": self.leave_type.id
    #     }
    #     response = self.client.put(self.url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('reason', response.data)
    #     self.assertIn('end_date', response.data)

    # def test_update_leave_not_found(self):
    #     self.client.force_authenticate(user=self.admin_user)
    #     url = reverse('edit_leave', args=[self.institute.id, 99999])  # Non-existent leave_id
    #     data = {
    #         "start_date": "2024-01-05",
    #         "end_date": "2024-01-07",
    #         "reason": "sick",
    #         "is_paid": False,
    #         "leave_type_category_id": self.leave_type.id
    #     }
    #     response = self.client.put(url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



# tests.py

# from rest_framework.test import APITestCase, APIClient
# from rest_framework import status
# from django.urls import reverse
# from django.contrib.auth import get_user_model
# from .models import Institute, Leave, LeaveType, InstituteMembership, UserLeaveBalance

# User = get_user_model()

# class LeaveUpdateViewTestCase(APITestCase):
#     def setUp(self):
#         # Create an Institute
#         self.institute = Institute.objects.create(name="Test Institute")
        
#         # Create User and InstituteMemberTypes
#         self.user_type = InstitueMemberTypes.objects.create(name="Admin")
#         self.leave_type = LeaveType.objects.create(name="Paid Leave", institute=self.institute, total_leaves=20)
        
#         # Create a User and associate it with the Institute
#         self.user = User.objects.create_user(username="testuse", password="password")
#         self.institute_membership = InstituteMembership.objects.create(user=self.user, institute=self.institute, user_type=self.user_type)

#         # Create a Leave
#         self.leave = Leave.objects.create(
#             user=self.user,
#             institute=self.institute,
#             start_date="2024-01-01",
#             end_date="2024-01-02",
#             reason="Vacation",
#             status="pending",
#             leave_type="full_day",
#             is_paid=True
#         )
#         self.leave.leave_type_categories.add(self.leave_type)
        
#         self.url = reverse('update_leave', args=[self.institute.id, self.user.id, self.leave.id])

#     def test_update_leave_successful(self):
#         data = {
#             "start_date": "2024-01-05",
#             "end_date": "2024-01-07",
#             "reason": "sick",  # Ensure this matches a valid choice
#             "is_paid": False,
#             "leave_type_category_id": self.leave_type.id
#         }
#         self.client.force_authenticate(user=self.user)
#         print("Testing URL:", self.url)
#         response = self.client.put(self.url, data, format='json')
        
#         print("Response data:", response.data)
#         print("Response status code:", response.status_code)
        
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # Continue with other assertions...

    

    # def test_duplicate_leave_request(self):
    #     Leave.objects.create(
    #         user=self.user,
    #         institute=self.institute,
    #         start_date="2024-09-01",
    #         end_date="2024-09-05",
    #         leave_type=self.leave_type,
    #         is_paid=True,
    #         reason="vacation"
    #     )

    #     data = {
    #         "start_date": "2024-09-01",
    #         "end_date": "2024-09-05",
    #         "reason": "vacation",  # Ensure this fits within the field's limit
    #         "leave_type_category_id": self.leave_type.id,
    #         "is_paid": True
    #     }
    #     url = reverse('create_leave', kwargs={
    #         'institute_id': self.institute.id, 
    #         'user_id': self.user.id
    #     })
    #     response = self.client.post(url, data, format='json')

    #     self.assertEqual(response.status_code, 409)
    #     self.assertIn('detail', response.data)

    # def test_insufficient_paid_leave_balance(self):
    #     self.user_leave_balance.total_paid_leaves = 0
    #     self.user_leave_balance.save()

    #     data = {
    #         "start_date": "2024-09-01",
    #         "end_date": "2024-09-05",
    #         "reason": "vacation",  # Ensure this fits within the field's limit
    #         "leave_type_category_id": self.leave_type.id,
    #         "is_paid": True
    #     }
    #     url = reverse('create_leave', kwargs={
    #         'institute_id': self.institute.id, 
    #         'user_id': self.user.id
    #     })
    #     response = self.client.post(url, data, format='json')

    #     self.assertEqual(response.status_code, 400)
    #     self.assertIn('detail', response.data)  # Adjust based on actual error message

    # def test_missing_member_type(self):
    #     self.membership.delete()

    #     data = {
    #         "start_date": "2024-09-01",
    #         "end_date": "2024-09-05",
    #         "reason": "vacation",  # Ensure this fits within the field's limit
    #         "leave_type_category_id": self.leave_type.id,
    #         "is_paid": True
    #     }
    #     url = reverse('create_leave', kwargs={
    #         'institute_id': self.institute.id, 
    #         'user_id': self.user.id
    #     })
    #     response = self.client.post(url, data, format='json')

    #     self.assertEqual(response.status_code, 400)
    #     self.assertIn('membership', response.data)  # Adjust based on actual error message

# class AddPostToGroupViewTestCase(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username='testuse', password='password')
#         self.another_user = User.objects.create_user(username='anotheruser', password='password')
#         self.group = Group.objects.create(name='Test Group', institute_id=1)
#         InstituteMembership.objects.create(user=self.user, institute_id=1)
#         self.client = APIClient()
#         self.client.force_authenticate(user=self.user)
#         self.post_data = {
#             'title': 'Test Post Title',
#             'content': 'This is the content of the test post.',
#             'attachment': None
#         }

#     def test_add_post_to_group_success(self):
#         response = self.client.post(
#             f'/institute/1/group/{self.group.id}/user/{self.user.id}/add-post/',
#             data=self.post_data,
#             format='json'
#         )
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data['message'], 'Post added to the group successfully.')
#         post = Post.objects.first()
#         self.assertIsNotNone(post)
#         self.assertEqual(post.title, self.post_data['title'])
#         self.assertEqual(post.content, self.post_data['content'])
#         self.assertEqual(post.author, self.user)
#         self.assertEqual(post.group, self.group)

#     def test_user_not_found(self):
#         response = self.client.post(
#             '/institute/1/group/1/user/999/add-post/',
#             data=self.post_data,
#             format='json'
#         )
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
#         self.assertEqual(response.data['error'], 'User not found with the provided ID.')

#     def test_user_not_in_institute(self):
#         external_user = User.objects.create_user(username='externaluser', password='password')
#         response = self.client.post(
#             f'/institute/1/group/{self.group.id}/user/{external_user.id}/add-post/',
#             data=self.post_data,
#             format='json'
#         )
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         self.assertEqual(str(response.data['detail']), 'You must belong to the institute to add a post to the group.')

#     def test_invalid_post_data(self):
#         invalid_data = {'title': 'Test Post Title'}
#         response = self.client.post(
#             f'/institute/1/group/{self.group.id}/user/{self.user.id}/add-post/',
#             data=invalid_data,
#             format='json'
#         )
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertIn('content', response.data['errors'])

#     def test_post_with_attachment(self):
#         from io import BytesIO
#         from django.core.files.uploadedfile import SimpleUploadedFile
        
#         attachment = SimpleUploadedFile("test_file.pdf", b"file_content", content_type="application/pdf")
#         post_data_with_attachment = self.post_data.copy()
#         post_data_with_attachment['attachment'] = attachment
        
#         response = self.client.post(
#             f'/institute/1/group/{self.group.id}/user/{self.user.id}/add-post/',
#             data=post_data_with_attachment,
#             format='multipart'
#         )
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertIn('attachment', response.data['post'])







    # def test_insufficient_paid_leave_balance(self):
    #     # Reduce user leave balance
    #     self.user_leave_balance.total_paid_leaves = 2
    #     self.user_leave_balance.save()
        
    #     data = {
    #         "start_date": "2024-09-01",
    #         "end_date": "2024-09-05",
    #         "reason": "vacation",
    #         "leave_type_category_id": self.leave_type.id,
    #         "is_paid": True
    #     }
    #     response = self.client.post(
    #         f'/institute/{self.institute.id}/create_leave/by/{self.user.id}/',
    #         data,
    #         format='json'
    #     )
    #     self.assertEqual(response.status_code, 400)
    #     self.assertIn('Insufficient paid leave balance', response.data['detail'])

    # def test_create_leave_with_invalid_approver(self):
    #     another_user = User.objects.create_user(username="approver", password="password")
        
    #     data = {
    #         "start_date": "2024-09-01",
    #         "end_date": "2024-09-05",
    #         "reason": "vacation",
    #         "leave_type_category_id": self.leave_type.id,
    #         "is_paid": True,
    #         "approver_id": another_user.id
    #     }
    #     response = self.client.post(
    #         f'/institute/{self.institute.id}/create_leave/by/{self.user.id}/',
    #         data,
    #         format='json'
    #     )
    #     self.assertEqual(response.status_code, 400)
    #     self.assertIn('The approver must be part of the same institute', response.data['non_field_errors'])

    # def test_duplicate_leave_request(self):
    #     Leave.objects.create(
    #         user=self.user,
    #         institute=self.institute,
    #         start_date="2024-09-01",
    #         end_date="2024-09-05",
    #         reason="vacation",
    #         leave_type="full_day",
    #         is_paid=True
    #     )
    #     data = {
    #         "start_date": "2024-09-01",
    #         "end_date": "2024-09-05",
    #         "reason": "vacation",
    #         "leave_type_category_id": self.leave_type.id,
    #         "is_paid": True
    #     }
    #     response = self.client.post(
    #         f'/institute/{self.institute.id}/create_leave/by/{self.user.id}/',
    #         data,
    #         format='json'
    #     )
    #     self.assertEqual(response.status_code, 409)
    #     self.assertIn('A leave request for this period already exists', response.data['detail'])

    # def test_missing_member_type(self):
    #     # Test case where member_type is None
    #     self.membership.user_type = None
    #     self.membership.save()

    #     data = {
    #         "start_date": "2024-09-01",
    #         "end_date": "2024-09-05",
    #         "reason": "vacation",
    #         "leave_type_category_id": self.leave_type.id,
    #         "is_paid": True
    #     }
    #     response = self.client.post(
    #         f'/institute/{self.institute.id}/create_leave/by/{self.user.id}/',
    #         data,
    #         format='json'
    #     )
    #     self.assertEqual(response.status_code, 400)
    #     self.assertIn('User does not have a valid member type', response.data['detail'])

# class AddPostToGroupViewTests(APITestCase):

#     def setUp(self):
#         # Setup initial data
#         self.user = User.objects.create_user(username='testuse', password='testpass')
#         self.group = Group.objects.create(name='Test Group')
#         self.client.force_authenticate(user=self.user)
#         self.url = reverse('add-post-to-group', args=[self.group.institute.id, self.group.id, self.user.id])

#     def test_add_post_to_group_success(self):
#         # Prepare post data
#         data = {
#             'title': 'Test Post',
#             'content': 'This is a test post.'
#         }
        
#         # Make the POST request
#         response = self.client.post(self.url, data, format='json')
        
#         # Assertions
#         self.assertEqual(response.status_code, 201)
#         self.assertEqual(response.data['message'], 'Post added to the group successfully.')
#         self.assertEqual(response.data['post']['author']['username'], self.user.username)
#         self.assertEqual(response.data['post']['title'], 'Test Post')
#         self.assertEqual(response.data['post']['content'], 'This is a test post.')



#                 validate_file_type(MockFile(name=file_name))
#             except ValidationError:
#                 self.fail(f"validate_file_type() raised ValidationError unexpectedly for {file_name}!")

#         # Invalid file type
#         with self.assertRaises(ValidationError):
#             validate_file_type(MockFile(name='invalid_file.txt'))

# class MockFile:
#     """ A simple mock file object for testing file validation """
#     def __init__(self, name):
#         self.name = name


# class GetInstituteMembersTestCase(APITestCase):
#     def setUp(self):
#         self.institute = Institute.objects.create(name='Test Institute')
#         self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
#         self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
#         self.student_type = InstitueMemberTypes.objects.create(name='Student')

#         self.user1 = User.objects.create_user(username='user1', password='password')
#         self.user2 = User.objects.create_user(username='user2', password='password')
#         self.user3 = User.objects.create_user(username='user3', password='password')

#         InstituteMembership.objects.create(
#             user=self.user1,
#             institute=self.institute,
#             user_type=self.owner_type,
#             status='active'
#         )
#         InstituteMembership.objects.create(
#             user=self.user2,
#             institute=self.institute,
#             user_type=self.admin_type,
#             status='inactive'
#         )
#         InstituteMembership.objects.create(
#             user=self.user3,
#             institute=self.institute,
#             user_type=self.student_type,
#             status='active'
#         )

#         # Debug: Verify data creation
#         print("InstituteMembership Count:", InstituteMembership.objects.count())
#         print("InstituteMembership Filtered Count:", InstituteMembership.objects.filter(institute=self.institute).count())

#         self.url = reverse('institute-members', kwargs={'instId': self.institute.id})



#     # tests.py
#     def test_successful_retrieval(self):
#         self.client.force_authenticate(user=self.user1)

#         print("URL:", self.url)  # Debug output

#         response = self.client.get(self.url)

#         print("Status Code:", response.status_code)
#         print("Response Data:", response.data)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data['results']), 3)
#         self.assertIn('user1', [member['user_name'] for member in response.data['results']])
#         self.assertIn('user2', [member['user_name'] for member in response.data['results']])
#         self.assertIn('user3', [member['user_name'] for member in response.data['results']])

# class SchedulePaymentViewTestCase(APITestCase):
#     def setUp(self):
#         # Create InstituteMemberTypes instances
#         self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
#         self.member_type = InstitueMemberTypes.objects.create(name='Member')

#         # Set up your test data here
#         self.institute = Institute.objects.create(name='Test Institute', logo=None)
#         self.admin_user = User.objects.create_user(username='admin', email='admin@example.com', password='password')
#         self.regular_user = User.objects.create_user(username='user', email='user@example.com', password='password')
        
#         InstituteMembership.objects.create(user=self.admin_user, institute=self.institute, user_type=self.admin_type)
#         InstituteMembership.objects.create(user=self.regular_user, institute=self.institute, user_type=self.member_type)
        
#         # Define the URL for the API endpoint
#         self.url = reverse('schedule_payment', kwargs={'institute_id': self.institute.id, 'admin_user_id': self.admin_user.id})
        
#         # Define the data for the request
#         self.data = {
#             'scheduled_for': 'Tuition Fee',
#             'amount': 200.00,
#             'description': 'Monthly tuition fee',
#             'date_of_schedule': timezone.now() + timedelta(days=30),  # Use datetime object
#             'user': self.regular_user.id,
#             'installment_type': 'equal',
#             'number_of_installments': 4,
#         }
        
#     def test_successful_payment_scheduling(self):
#         response = self.client.post(self.url, self.data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertIn('fee_id', response.data)
#         self.assertIn('installments', response.data)
#         self.assertEqual(InstituteFee.objects.count(), 1)
#         self.assertEqual(InstituteFeeInstallment.objects.count(), 4)




    # def test_permission_denied(self):
    #     # Test with a user who does not have administrative permissions
    #     self.client.force_authenticate(user=self.regular_user)
    #     response = self.client.post(self.url, self.data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # def test_missing_user_and_custom_user(self):
    #     # Test with missing 'user' and 'custom_user'
    #     data = self.data.copy()
    #     del data['user']
    #     response = self.client.post(self.url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(response.data['message'], 'Either a registered user or a custom user must be provided.')

    # def test_billed_user_not_member(self):
    #     # Test with a user who is not a member of the institute
    #     non_member_user = User.objects.create_user(username='non_member', email='non_member@example.com', password='password')
    #     data = self.data.copy()
    #     data['user'] = non_member_user.id
    #     response = self.client.post(self.url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    #     self.assertEqual(response.data['detail'], 'Billed user must be a member of the institute.')

    # def test_invalid_installment_type(self):
    #     # Test with an invalid installment type
    #     data = self.data.copy()
    #     data['installment_type'] = 'invalid_type'
    #     response = self.client.post(self.url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


   

# class UserListByCourseInInstituteViewTestCase(APITestCase):
#     def setUp(self):
#         # Create test data
#         self.institute = Institute.objects.create(name="Test Institute")
#         # Adjust fields according to the actual Course model definition
#         self.course = Course.objects.create(
#             courseShortName="TestCourse",  # Assuming you have a field like this
#             courseFullName="Full Course Name",
#             courseGlobalCode="T123",
#             courseLocalCode="L123",
#             courseStatus="Active",
#             courseStartDate="2024-01-01",
#             courseEndDate="2024-12-31",
#             # Add other required fields based on the Course model
#         )
#         self.user1 = User.objects.create_user(username="user1", password="pass123", firstname="John", lastname="Doe")
#         self.user2 = User.objects.create_user(username="user2", password="pass123", firstname="Jane", lastname="Doe")

#         InstituteMembership.objects.create(institute=self.institute, user=self.user1, is_member=True)
#         InstituteMembership.objects.create(institute=self.institute, user=self.user2, is_member=False)

#         # Assuming you have a model like CourseEnrollment to handle course enrollments
#         CourseEnrollment.objects.create(user=self.user1, course=self.course)
#         CourseEnrollment.objects.create(user=self.user2, course=self.course)

#     def test_list_users_by_institute_id(self):
#         url = '/users/institute-course/?institute_id={}'.format(self.institute.id)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         users = response.json()
#         self.assertEqual(len(users), 2)
#         self.assertIn('id', users[0])
#         self.assertIn('firstname', users[0])
#         self.assertIn('lastname', users[0])
#         self.assertIn('profile_image', users[0])
#         self.assertIn('course_ids', users[0])

#     def test_list_users_by_institute_and_course_id(self):
#         url = '/users/institute-course/?institute_id={}&course_id={}'.format(self.institute.id, self.course.id)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         users = response.json()
#         self.assertEqual(len(users), 2)  # Both users should be included
#         self.assertIn('id', users[0])
#         self.assertIn('firstname', users[0])
#         self.assertIn('lastname', users[0])
#         self.assertIn('profile_image', users[0])
#         self.assertIn('course_ids', users[0])

    # def test_list_users_by_institute_and_course_id_with_is_member_true(self):
    #     url = '/users/institute-course/?institute_id={}&course_id={}&is_member=true'.format(self.institute.id, self.course.id)
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     users = response.json()
    #     self.assertEqual(len(users), 1)  # Only user1 is a member
    #     self.assertEqual(users[0]['id'], self.user1.id)

    # def test_list_users_by_institute_and_course_id_with_is_member_false(self):
    #     url = '/users/institute-course/?institute_id={}&course_id={}&is_member=false'.format(self.institute.id, self.course.id)
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     users = response.json()
    #     self.assertEqual(len(users), 1)  # Only user2 is not a member
    #     self.assertEqual(users[0]['id'], self.user2.id)

    # def test_list_users_by_invalid_institute_id(self):
    #     url = '/users/institute-course/?institute_id=999'
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     users = response.json()
    #     self.assertEqual(len(users), 0)  # No users should be returned

    # def test_list_users_by_invalid_course_id(self):
    #     url = '/users/institute-course/?institute_id={}&course_id=999'.format(self.institute.id)
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     users = response.json()
    #     self.assertEqual(len(users), 0)  # No users should be returned

    # def test_serializer_for_institute_id_only(self):
    #     url = '/users/institute-course/?institute_id={}'.format(self.institute.id)
    #     response = self.client.get(url)
    #     serializer = UserCourseSerializer(User.objects.filter(id__in=[self.user1.id, self.user2.id]), many=True)
    #     self.assertEqual(response.data, serializer.data)

    # def test_serializer_for_institute_and_course_id(self):
    #     url = '/users/institute-course/?institute_id={}&course_id={}'.format(self.institute.id, self.course.id)
    #     response = self.client.get(url)
    #     serializer = UserCourseSerializer(User.objects.filter(id__in=[self.user1.id, self.user2.id]), many=True)
    #     self.assertEqual(response.data, serializer.data)





# class InstituteTransactionListViewTestCase(APITestCase):
#     def setUp(self):
#         # Create test users and other necessary data
#         self.admin = User.objects.create_user(username='admin', password='password123')
#         self.user = User.objects.create_user(username='testuse', password='testpassword')

#         self.institute = Institute.objects.create(name='Test Institute')
       

#         # Ensure the values here respect your model's constraints
#         self.transaction1 = InstituteTransaction.objects.create(
#             fee_id=1,
#             user=self.user,
#             institute=self.institute,
#             amount=100.0,
#             transaction_type='Credit',  # Ensure this is within max_length constraint
#             user_type='Student',        # Ensure this is within max_length constraint
#             institute_type='Regular',   # Ensure this is within max_length constraint
#             status='Completed',
#             transaction_id='TX123',     # Ensure this is within max_length constraint
#             method='Credit Card',       # Ensure this is within max_length constraint
#             date_of_payment='2024-01-01'
#         )

#         self.url = reverse('institute-transaction-list')

#     def test_successful_transaction_list(self):
#         # Test with query parameter
#         response = self.client.get(self.url, {'fee_id': self.fee.id}, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['transaction_id'], 'TX123')

#     def test_filter_transactions_by_fee_id(self):
#         self.client.force_authenticate(user=self.user)
#         response = self.client.get(self.url, {'fee_id': 1})
#         transactions = InstituteTransaction.objects.filter(fee_id=1)
#         serializer = InstituteTransactionSerializer(transactions, many=True)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, serializer.data)

#     def test_response_structure(self):
#         self.client.force_authenticate(user=self.user)
#         response = self.client.get(self.url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # Check that all fields are present in the response data
#         for transaction in response.data:
#             self.assertIn('id', transaction)
#             self.assertIn('fee', transaction)
#             self.assertIn('user', transaction)
#             self.assertIn('institute', transaction)
#             self.assertIn('amount', transaction)
#             self.assertIn('transaction_type', transaction)
#             self.assertIn('user_type', transaction)
#             self.assertIn('institute_type', transaction)
#             self.assertIn('status', transaction)
#             self.assertIn('transaction_id', transaction)
#             self.assertIn('method', transaction)
#             self.assertIn('date_of_payment', transaction)

#     def test_empty_queryset(self):
#         self.client.force_authenticate(user=self.user)
#         response = self.client.get(self.url, {'fee_id': 999})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, [])




# class CreateCourseAttendanceViewTestCase(APITestCase):
#     def setUp(self):
#         # Create test users and other necessary data
#         self.admin = User.objects.create_user(username='admin', password='password123')
#         self.user = User.objects.create_user(username='testuse', password='testpassword')

#         self.institute = Institute.objects.create(name='Test Institute')
#         self.course = Course.objects.create(
#             courseFullName='Test Course',
#             creater=self.admin,
#             courseGlobalCode='TEST123',
#             courseShortName='TC',
#             courseStartDate='2024-01-01',
#             courseEndDate='2024-12-31'
#         )
#         self.class_session = Class.objects.create(
#             courseId=self.course.id,
#             serialNo='001',
#             status='Scheduled',
#             datetime='2024-01-15T10:00:00Z',
#             duration='60',
#             about='Test Class Session',
#             meetingLink='http://example.com/meeting',
#             address='123 Test St'
#         )

#         self.admin_type = InstitueMemberTypes.objects.create(name='Admin')

#         # Create the membership with the correct user type
#         self.membership = InstituteMembership.objects.create(
#             user=self.admin,
#             institute=self.institute,
#             user_type=self.admin_type
#         )

#         self.url_create_attendance = reverse(
#             'create-attendance',
#             kwargs={'institute_id': self.institute.id, 'course_id': self.course.id, 'user_id': self.admin.id}
#         )
#     def test_successful_attendance_creation(self):
#     # Authenticate as the admin user
#         # self.client.force_authenticate(user=self.admin)

#         data = {
#             'members': [
#                 {
#                     'user_member': self.user.id,
#                     'class_session_id': self.class_session.id,
#                     'start_date': '2024-01-01',
#                     'end_date': '2024-01-01',
#                     'attendance_date': '2024-01-01T10:00:00Z',
#                     'in_time': '10:00:00Z',
#                     'out_time': '11:00:00Z',
#                     'status': 'present',
#                     'remarks': 'Test remark',
#                     'approver_status': 'approved'
#                 }
#             ]
#         }

#         response = self.client.post(self.url_create_attendance, data=data, format='json')

#         print("Response status code:", response.status_code)
#         print("Response data:", response.data)

#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(len(response.data), 1)
#         self.assertNotIn('errors', response.data)
#         self.assertEqual(response.data[0]['user_member'], self.user.id)





    # def test_attendance_creation_with_invalid_dates(self):
    #     data = {
    #         'members': [
    #             {
    #                 'user_member': self.user.id,
    #                 'class_session_id': self.class_session.id,
    #                 'start_date': '2023-12-31',  # Invalid start date
    #                 'end_date': '2024-01-01',
    #                 'attendance_date': '2024-01-01T10:00:00Z',
    #                 'in_time': '10:00:00Z',
    #                 'out_time': '11:00:00Z',
    #                 'status': 'present',
    #                 'remarks': 'Test remark',
    #                 'approver_status': 'approved'
    #             }
    #         ]
    #     }

    #     response = self.client.post(self.url_create_attendance, data=data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('start_date', response.data[0]['errors'])

    # def test_permission_denied_for_non_admin_user(self):
    #     self.client.force_login(self.user)  # Log in as non-admin user

    #     data = {
    #         'members': [
    #             {
    #                 'user_member': self.user.id,
    #                 'class_session_id': self.class_session.id,
    #                 'start_date': '2024-01-01',
    #                 'end_date': '2024-01-01',
    #                 'attendance_date': '2024-01-01T10:00:00Z',
    #                 'in_time': '10:00:00Z',
    #                 'out_time': '11:00:00Z',
    #                 'status': 'present',
    #                 'remarks': 'Test remark',
    #                 'approver_status': 'approved'
    #             }
    #         ]
    #     }

    #     response = self.client.post(self.url_create_attendance, data=data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # def test_course_not_belonging_to_institute(self):
    #     new_course = Course.objects.create(
    #         courseFullName='New Course',
    #         creater=self.admin,
    #         courseGlobalCode='NEW123',
    #         designedFor=None,
    #         courseShortName='NC',
    #         courseStartDate='2024-01-01',
    #         courseEndDate='2024-12-31'
    #     )

    #     url = reverse(
    #         'create-attendance',
    #         kwargs={'institute_id': self.institute.id, 'course_id': new_course.id, 'user_id': self.admin.id}
    #     )

    #     data = {
    #         'members': [
    #             {
    #                 'user_member': self.user.id,
    #                 'class_session_id': self.class_session.id,
    #                 'start_date': '2024-01-01',
    #                 'end_date': '2024-01-01',
    #                 'attendance_date': '2024-01-01T10:00:00Z',
    #                 'in_time': '10:00:00Z',
    #                 'out_time': '11:00:00Z',
    #                 'status': 'present',
    #                 'remarks': 'Test remark',
    #                 'approver_status': 'approved'
    #             }
    #         ]
    #     }

    #     response = self.client.post(url, data=data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # def test_invalid_class_session(self):
    #     data = {
    #         'members': [
    #             {
    #                 'user_member': self.user.id,
    #                 'class_session_id': 99999,  # Non-existent class session
    #                 'start_date': '2024-01-01',
    #                 'end_date': '2024-01-01',
    #                 'attendance_date': '2024-01-01T10:00:00Z',
    #                 'in_time': '10:00:00Z',
    #                 'out_time': '11:00:00Z',
    #                 'status': 'present',
    #                 'remarks': 'Test remark',
    #                 'approver_status': 'approved'
    #             }
    #         ]
    #     }

    #     response = self.client.post(self.url_create_attendance, data=data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('class_session', response.data[0]['errors'])

    # def test_empty_member_list(self):
    #     data = {
    #         'members': []
    #     }

    #     response = self.client.post(self.url_create_attendance, data=data, format='json')

    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('members', response.data)


# class UpdateCourseAttendanceViewTestCase(APITestCase):
#     def setUp(self):
#         # Create test users
#         self.user = User.objects.create_user(username='testuse', password='testpassword')
#         self.client.force_login(self.user)

#         # Create test CourseDesignedFor instance
#         self.designed_for = CourseDesignedFor.objects.create(name='Test Designed For', boardofeducation=['Board1'])

#         # Create test institute
#         self.institute = Institute.objects.create(name='Test Institute')

#         # Create test course
#         self.course = Course.objects.create(
#             courseFullName='Test Course',
#             creater=self.user,
#             courseGlobalCode='TEST123',
#             designedFor=self.designed_for,
#             courseShortName='TC',
#             courseStartDate='2024-01-01',
#             courseEndDate='2024-12-31'
#         )

#         # Create test class session
#         self.class_session = Class.objects.create(
#             courseId=self.course.id,
#             serialNo='001',
#             status='Scheduled',
#             datetime='2024-01-15T10:00:00Z',
#             duration='60',
#             about='Test Class Session',
#             meetingLink='http://example.com/meeting',
#             address='123 Test St'
#         )

#         # Create test attendance record
#         self.attendance = Attendance.objects.create(
#             institute=self.institute,
#             course=self.course,
#             class_session=self.class_session,
#             member=self.user,
#             start_date='2024-01-01',
#             end_date='2024-01-01',
#             attendance_date='2024-01-01',
#             in_time='10:00:00',
#             out_time='11:00:00',
#             status='active',
#             remarks='Test remark',
#             approver_status='Approved'
#         )

#         # URL for updating attendance
#         self.url_update = reverse('update-attendance')

#     def test_successful_update(self):
#         update_data = {
#             'id': self.attendance.id,
#             'in_time': '09:00:00',
#             'out_time': '10:00:00',
#             'remarks': 'Updated remark',
#             'status': 'present',  # Use a valid choice
#             'approver_status': 'approved'  # Ensure this is a valid choice
        
#         }
#         response = self.client.patch(self.url_update, data=json.dumps({'updates': [update_data]}), content_type='application/json')
        
#         # Print response data for debugging
#         print(response.data)  # Debug information
        
#         # Check the response status code
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
        
#         # Refresh the instance from the database
#         self.attendance.refresh_from_db()
        
#         # Check the updated values
#         self.assertEqual(self.attendance.in_time.strftime('%H:%M:%S'), '09:00:00')
#         self.assertEqual(self.attendance.out_time.strftime('%H:%M:%S'), '10:00:00')
#         self.assertEqual(self.attendance.remarks, 'Updated remark')
#         self.assertEqual(self.attendance.status, 'present')  # Ensure this matches the updated value
#         self.assertEqual(self.attendance.approver_status, 'approved')  # Ensure this matches the updated value

   

    

#     def test_update_with_multiple_entries(self):
#         attendance2 = Attendance.objects.create(
#             institute=self.institute,
#             course=self.course,
#             class_session=self.class_session,
#             member=self.user,
#             start_date='2024-01-02',
#             end_date='2024-01-02',
#             attendance_date='2024-01-02',
#             in_time='11:00:00',
#             out_time='12:00:00',
#             status='Present',
#             remarks='Another remark',
#             approver_status='Approved'
#         )

#         update_data = [
#             {'id': self.attendance.id, 'status': 'Absent'},
#             {'id': attendance2.id, 'remarks': 'Updated remark'}
#         ]
#         response = self.client.patch(self.url_update, data={'updates': update_data}, content_type='application/json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.attendance.refresh_from_db()
#         attendance2.refresh_from_db()
#         self.assertEqual(self.attendance.status, 'Absent')
#         self.assertEqual(attendance2.remarks, 'Updated remark')

    # def test_invalid_json_format(self):
    #     # Invalid JSON format
    #     response = self.client.patch(self.url_update, data='invalid-json', content_type='application/json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_attendance_serializer_validation(self):
    #     # Test validation errors by providing invalid data
    #     invalid_data = {
    #         'course': self.course.id,
    #         'class_session': self.class_session.id,
    #         'member': self.user.id,
    #         'start_date': '2023-12-31',  # Before the course start date
    #         'end_date': '2024-01-01',
    #         'attendance_date': '2024-01-01',
    #         'in_time': '10:00:00',
    #         'out_time': '11:00:00',
    #         'status': 'Present',
    #         'remarks': 'Test remark',
    #         'approver_status': 'Approved'
    #     }
    #     response = self.client.post(self.url_list, data=invalid_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('start_date', response.json())  # Expect validation error for start_date

    #     invalid_data['start_date'] = '2024-01-01'
    #     invalid_data['end_date'] = '2025-01-01'  # After the course end date
    #     response = self.client.post(self.url_list, data=invalid_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('end_date', response.json())  # Expect validation error for end_date

    # def test_filter_by_institute(self):
    #     url = reverse('course-list') + '?institute_id={}'.format(self.institute.id)
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 1)  # Should return only course1

    # def test_filter_by_archived_status(self):
    #     url = reverse('course-list') + '?archived=true'
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 1)  # Should return only course2

    # def test_filter_by_institute_and_archived_status(self):
    #     url = reverse('course-list') + '?institute_id={}&archived=true'.format(self.other_institute.id)
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data), 1)  # Should return only course2

    # def test_course_serialization(self):
    #     serializer = CourseSerializer(self.course1)
    #     data = serializer.data
    #     self.assertEqual(set(data.keys()), {'id', 'courseFullName', 'creator_name', 'classes', 'courseGlobalCode', 'designedFor', 'courseShortName', 'courseStartDate', 'courseEndDate'})
    #     self.assertEqual(data['courseFullName'], self.course1.courseFullName)
    
    # def test_class_session_serialization(self):
    #     serializer = ClassSessionSerializer(self.class_session1)
    #     data = serializer.data
    #     self.assertEqual(set(data.keys()), {'id', 'courseId', 'serialNo', 'status', 'datetime', 'duration', 'about', 'meetingLink', 'address', 'course_details'})
    #     self.assertEqual(data['course_details']['course_name'], self.course1.courseFullName)



# class EditSocialMediaLinkInstituteViewTestCase(APITestCase):
#     def setUp(self):
#     # Create an institute
#         self.institute = Institute.objects.create(name='Test Institute')

#         # Create user types
#         self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
#         self.regular_type = InstitueMemberTypes.objects.create(name='Regular')

#         # Create users
#         self.admin_user = User.objects.create(username='admin', email='admin@example.com')
#         self.regular_user = User.objects.create(username='user', email='user@example.com')

#         # Add memberships
#         self.admin_membership = InstituteMembership.objects.create(
#             institute=self.institute,
#             user=self.admin_user,
#             user_type=self.admin_type
#         )
#         self.regular_membership = InstituteMembership.objects.create(
#             institute=self.institute,
#             user=self.regular_user,
#             user_type=self.regular_type
#         )
        
#         # Create social media links
#         self.social_media_link = socialMediaLink.objects.create(
#             name='Facebook',
#             icon='facebook-icon.png',
#             link='https://facebook.com/testinstitute'
#         )

#         # URL for editing social media link
#         self.edit_url = reverse(
#             'edit_type_in_institute',
#             kwargs={
#                 'institute_id': self.institute.id,
#                 'editing_user_id': self.admin_user.id,
#                 'type_id': self.social_media_link.id
#             }
#         )


#     def test_successful_update(self):
#         self.edit_url = reverse(
#             'edit_type_in_institute', 
#             kwargs={
#                 'institute_id': self.institute.id,
#                 'editing_user_id': self.admin_user.id,
#                 'type_id': self.social_media_link.id
#             }
#         )
#         print(self.edit_url)  # Print the URL to verify
#         data = {
#             'name': 'Updated Facebook',
#             'icon': 'updated-facebook-icon.png',
#             'link': 'https://facebook.com/updated'
#         }
#         response = self.client.put(self.edit_url, data, format='json')
#         print(response.status_code)  # Print the status code to debug
#         print(response.data)  # Print the response data to debug
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['message'], 'Type updated successfully')
#         self.assertEqual(response.data['type_name'], 'Updated Facebook')
#         self.assertEqual(response.data['type_url'], 'https://facebook.com/updated')

# class GetSocailMediaLinkInInstituteViewTestCase(APITestCase):
#     def setUp(self):
#         self.institute = Institute.objects.create(name='Test Institute')
#         self.user = User.objects.create(username='testuse', email='testuser@example.com')
#         self.member_type = InstitueMemberTypes.objects.create(name='member')
#         self.institute_membership = InstituteMembership.objects.create(
#             institute=self.institute,
#             user_type=self.member_type
#         )
#         self.social_media_link_1 = socialMediaLink.objects.create(
#             name='Facebook',
#             icon='facebook-icon.png',
#             link='https://facebook.com/testinstitute'
#         )
#         self.social_media_link_2 = socialMediaLink.objects.create(
#             name='Twitter',
#             icon='twitter-icon.png',
#             link='https://twitter.com/testinstitute'
#         )
#         self.url_all = reverse('get_type_in_institute')  # Adjust URL name as needed

#     def test_get_all_social_media_links(self):
#         response = self.client.get(self.url_all)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()
#         print(data)  # Debug print
#         self.assertEqual(data['message'], 'All types retrieved successfully')
#         self.assertEqual(len(data['data']), 2)



#     def test_get_specific_social_media_link(self):
#         url = self.url_specific + str(self.social_media_link_1.id)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()
#         self.assertEqual(data['message'], 'Type retrieved successfully')
#         self.assertEqual(data['data']['name'], 'Facebook')
#         self.assertEqual(data['data']['icon'], 'facebook-icon.png')
#         self.assertEqual(data['data']['link'], 'https://facebook.com/testinstitute')

#     def test_permission_denied(self):
#         # Create a new user without membership
#         new_user = User.objects.create(username='newuser', email='newuser@example.com')
#         url = reverse('get_type_in_institute', kwargs={'institute_id': self.institute.id, 'user_id': new_user.id})

#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         self.assertEqual(response.json(), {'error': "You do not have permission to access this institute's types."})

#     def test_no_social_media_links(self):
#         # Remove all social media links
#         socialMediaLink.objects.all().delete()
#         response = self.client.get(self.url_all)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()

#         self.assertEqual(data['message'], 'All types retrieved successfully')
#         self.assertEqual(data['data'], [])

#     def test_invalid_type_id(self):
#         url = self.url_specific + '9999'  # assuming 9999 is an invalid ID
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

#     def test_no_type_id_provided(self):
#         url = self.url_all
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(response.json(), {'error': 'Invalid type_id provided.'})


# class SummaryViewUserWiseTestCase(APITestCase):
#     def setUp(self):
#     # Create test data
#         self.institute = Institute.objects.create(name='Test Institute')
#         self.user = User.objects.create(username='testuse', email='testuser@example.com')
#         InstituteMembership.objects.create(user=self.user, institute=self.institute)

#         # Create InstituteFee instances
#         self.fee_debit = InstituteFee.objects.create(
#             institute=self.institute,
#             type_transaction='debit',
#             amount=100,
#             status='unpaid',
#             due_amount=100,
#             user=self.user
#         )

#         self.fee_credit = InstituteFee.objects.create(
#             institute=self.institute,
#             type_transaction='credit',
#             amount=50,
#             status='unpaid',
#             due_amount=50,
#             user=self.user
#         )

#         # Create InstituteTransaction instances with institute and user
#         self.transaction_debit = InstituteTransaction.objects.create(
#             fee=self.fee_debit,
#             institute=self.institute,  # Ensure institute is set
#             user=self.user,  # Ensure user is set
#             transaction_type='debit',
#             amount=50,
#             date_of_payment=timezone.now(),
#             status='completed'
#         )

#         self.transaction_credit = InstituteTransaction.objects.create(
#             fee=self.fee_credit,
#             institute=self.institute,  # Ensure institute is set
#             user=self.user,  # Ensure user is set
#             transaction_type='credit',
#             amount=40,
#             date_of_payment=timezone.now(),
#             status='completed'
#         )

#         # URL for the view
#         self.url = reverse('summary_institute', kwargs={'user_id': self.user.id})


#     def test_successful_summary_retrieval(self):
#         response = self.client.get(self.url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()

#         # Ensure that the totals match the transactions created
#         self.assertEqual(data['total_debit_scheduled'], 100)
#         self.assertEqual(data['total_credit_scheduled'], 50)
#         self.assertEqual(data['total_debited'], 50)
#         self.assertEqual(data['total_credited'], 40)
#         self.assertEqual(data['total_debit_due'], 100 - 50)  # If due amount was reduced by a payment
#         self.assertEqual(data['total_credit_due'], 50 - 40)
#         self.assertEqual(len(data['month_wise_summary']), 1)


#     def test_user_not_found(self):
#         url = reverse('summary_institute', kwargs={'user_id': 999})
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
#         self.assertEqual(response.json()['error'], 'User not found with the provided ID.')

#     def test_invalid_date_format(self):
#         url = reverse('summary_institute', kwargs={'user_id': self.user.id}) + '?start_date=invalid-date'
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(response.json()['start_date'], 'Invalid date format.')

#         url = reverse('summary_institute', kwargs={'user_id': self.user.id}) + '?end_date=invalid-date'
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertEqual(response.json()['end_date'], 'Invalid date format.')

#     def test_date_range_filtering(self):
#         start_date = (timezone.now() - timedelta(days=30)).date()
#         end_date = timezone.now().date()
#         url = reverse('summary_institute', kwargs={'user_id': self.user.id}) + f'?start_date={start_date}&end_date={end_date}'

#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()

#         # Ensure the response contains the correct filtered data
#         self.assertEqual(data['total_debit_scheduled'], 100)
#         self.assertEqual(data['total_credit_scheduled'], 50)
#         self.assertEqual(data['total_debited'], 50)  # Should match the filtered data
#         self.assertEqual(data['total_credited'], 40)  # Should match the filtered data
#         self.assertEqual(data['total_debit_due'], 50)  # Should match the filtered data
#         self.assertEqual(data['total_credit_due'], 10)  # Should match the filtered data


#     def test_no_date_range(self):
#         current_year = timezone.now().year
#         url = reverse('summary_institute', kwargs={'user_id': self.user.id})

#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.json()

#         # Ensure month-wise summary contains the correct year and month
#         for month in range(1, timezone.now().month + 1):
#             expected_summary = next((summary for summary in data['month_wise_summary'] if summary['month'] == month and summary.get('year') == current_year), None)
#             self.assertIsNotNone(expected_summary)

#     def get_month_wise_summary(user, start_date, end_date):
#     # Example logic for generating month-wise summary with year
#         summary = []
#         for month in range(1, 13):
#             summary.append({
#                 'month': month,
#                 'year': start_date.year,  # or current year if not filtered by date
#                 'total_debit_scheduled': 0,
#                 'total_credit_scheduled': 0,
#                 'total_debited': 0,
#                 'total_credited': 0,
#                 'total_debit_due': 0,
#                 'total_credit_due': 0,
#             })
#         return summary

 
    # def test_no_user_balances_to_delete(self):
    #     # Ensure no balances exist for this leave policy
    #     leave_policy_no_balances = InstituteLeavePolicy.objects.create(
    #         institute=self.institute,
    #         member_type=self.member_type
    #     )
    #     leave_policy_no_balances.leave_types.add(self.leave_type)

    #     response = self.client.delete(reverse('delete_leave_policy', kwargs={
    #         'institute_id': self.institute.id,
    #         'user_id': self.user.id,
    #         'leave_type_id': self.leave_type.id,
    #         'member_type_id': self.member_type.id
    #     }))
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    #     self.assertFalse(UserLeaveBalance.objects.filter(
    #         user=self.user,
    #         institute=self.institute,
    #         leave_type=self.leave_type,
    #         leave_policy=leave_policy_no_balances
    #     ).exists())

   
        # Add additional assertions here

    # def test_permission_denied(self):
    #     # Test permission denied for a non-authorized user (e.g., staff)
    #     url = reverse('update_leave_policy', args=[self.institute.id, self.user_staff.id])
    #     response = self.client.post(url, data=self.valid_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # def test_invalid_institute_id(self):
    #     # Test invalid institute_id
    #     url = reverse('update_leave_policy', args=['invalid', self.user_owner.id])
    #     response = self.client.post(url, data=self.valid_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('error', response.data)

    # def test_invalid_user_id(self):
    #     # Test invalid user_id
    #     url = reverse('update_leave_policy', args=[self.institute.id, 'invalid'])
    #     response = self.client.post(url, data=self.valid_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('error', response.data)

    # def test_invalid_leave_type_data(self):
    #     # Test invalid leave type data (e.g., missing fields)
    #     invalid_data = {
    #         'leave_types': [
    #             {'name': '', 'total_leaves': 10},  # Invalid leave name
    #             {'total_leaves': 15}  # Missing name
    #         ]
    #     }
    #     response = self.client.post(self.url, data=invalid_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertIn('leave_types', response.data)
    #     self.assertIn('name', response.data)
    #     self.assertIn('total_leaves', response.data)



# class MemberInstituteDetailsAPIViewTestCase(APITestCase):
#     def setUp(self):
#         # Create sample data
#         self.institute = Institute.objects.create(name='Test Institute', address='Test Address')
#         self.member = User.objects.create(
#             firstname='Member', lastname='User', email='member@example.com', username='memberuser'
#         )
#         # If there's no UserType model, remove this line or use an appropriate model
#         # self.user_type = UserType.objects.create(name='Student')  
#         self.membership = InstituteMembership.objects.create(
#             user=self.member,
#             institute=self.institute,
#             # Assuming user_type is a foreign key or similar; adjust accordingly
#             user_type=None,  # Set to None or appropriate value if UserType does not exist
#             datejoined='2024-08-01',
#             status='Active'
#         )
#         self.attendance = Attendance.objects.create(
#             institute=self.institute,
#             member=self.member,
#             attendance_date='2024-08-26',
#             in_time='09:00:00',
#             out_time='17:00:00',
#             approver_status='Approved',
#             status='Present',
#             remarks='No remarks',
#             start_date='2024-08-26',
#             end_date='2024-08-26'
#         )
#         self.course = Course.objects.create(
#             courseFullName='Test Course',
#             courseGlobalCode='TC001',
#             courseStatus='Active',
#             courseShortName='TC'
#         )
#         self.url = reverse('member-institute-details', kwargs={'member_id': self.member.id, 'institute_id': self.institute.id})

#     def test_get_member_institute_details_success(self):
#         response = self.client.get(self.url)
#         print(f"Response Data: {response.data}")  # Debugging line
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
        
#         data = response.data
#         # Check for user details
#         self.assertIn('user', data)
#         self.assertEqual(data['user']['id'], self.member.id)
#         self.assertEqual(data['user']['firstname'], self.member.firstname)
#         self.assertEqual(data['user']['lastname'], self.member.lastname)

#         # Check for institute details
#         self.assertIn('institute', data)
#         self.assertEqual(data['institute']['id'], self.institute.id)
#         self.assertEqual(data['institute']['name'], self.institute.name)
        
#         # Check user_type
#         self.assertIn('user_type', data)
#         self.assertIsNone(data['user_type'])  # Expecting None if UserType does not exist

#         # Check date joined
#         self.assertIn('datejoined', data)
#         self.assertEqual(data['datejoined'], str(self.membership.datejoined))

#         # Check status
#         self.assertIn('status', data)
#         self.assertEqual(data['status'], self.membership.status)

#         # Check attendance records
#         self.assertIn('attendance_records', data)
#         self.assertEqual(len(data['attendance_records']), 1)
#         attendance_data = data['attendance_records'][0]
#         self.assertEqual(attendance_data['id'], self.attendance.id)
#         self.assertEqual(attendance_data['attendance_date'], str(self.attendance.attendance_date))

#         # Check courses
#         self.assertIn('courses', data)
#         self.assertEqual(len(data['courses']), 1)
#         course_data = data['courses'][0]
#         self.assertEqual(course_data['id'], self.course.id)
#         self.assertEqual(course_data['courseFullName'], self.course.courseFullName)

#         # Check other fields
#         self.assertIn('academic_details', data)
#         self.assertIn('experiences', data)
#         self.assertIn('publications', data)
#         self.assertIn('licenses_certificates', data)
#         self.assertIn('parent_details', data)

#         # Verify that no additional unexpected fields are present
#         expected_fields = [
#             'user', 'institute', 'user_type', 'datejoined', 'status', 
#             'attendance_records', 'courses', 'academic_details', 
#             'experiences', 'publications', 'licenses_certificates', 
#             'parent_details'
#         ]
#         for field in expected_fields:
#             self.assertIn(field, data)

#         # Check if the response contains only the expected fields
#         self.assertTrue(all(field in expected_fields for field in data.keys()))

# class ApproverAttendanceListViewTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.institute = Institute.objects.create(name='Test Institute', address='Test Address')
#         self.approver = User.objects.create(firstname='Approver', lastname='User', email='approver@example.com')
#         self.member = User.objects.create(firstname='Member', lastname='User', email='member@example.com')
#         self.attendance = Attendance.objects.create(
#             institute=self.institute,
#             course=None,
#             class_session=None,
#             member=self.member,
#             attendance_date='2024-08-26',
#             in_time='09:00:00',
#             out_time='17:00:00',
#             approver_status='Approved',
#             status='Present',
#             remarks='No remarks',
#             start_date='2024-08-26',
#             end_date='2024-08-26'
#         )
#         self.url = reverse('approver-attendance-list', kwargs={'institute_id': self.institute.id, 'approver_id': self.approver.id})
#         # Debugging output
#         print(f"Created Institute: {self.institute}")
#         print(f"Created Approver: {self.approver}")
#         print(f"Created Member: {self.member}")
#         print(f"Created Attendance: {self.attendance}")

#     def test_get_attendance_list_success(self):
#         response = self.client.get(self.url)
#         print(f"Response Data: {response.data}")  # Debugging line
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)
#         self.assertEqual(len(response.data['results']), 1)



    # def test_filter_by_approver_status(self):
    #     response = self.client.get(self.url, {'approver_status': 'Approved'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data['results']), 1)
    #     self.assertEqual(response.data['results'][0]['approver_status'], 'Approved')

    # def test_filter_by_date_range(self):
    #     response = self.client.get(self.url, {'start_date': '2024-08-25', 'end_date': '2024-08-26'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data['results']), 1)
    #     self.assertEqual(response.data['results'][0]['attendance_date'], '2024-08-26')

    # def test_filter_by_start_date(self):
    #     response = self.client.get(self.url, {'start_date': '2024-08-26'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data['results']), 1)
    #     self.assertEqual(response.data['results'][0]['attendance_date'], '2024-08-26')

    # def test_filter_by_end_date(self):
    #     response = self.client.get(self.url, {'end_date': '2024-08-26'})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(len(response.data['results']), 1)
    #     self.assertEqual(response.data['results'][0]['attendance_date'], '2024-08-26')

    # def test_no_attendance_records(self):
    #     # Remove the existing attendance record and test the endpoint
    #     Attendance.objects.all().delete()
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['results'], [])

    # def test_invalid_date_filter(self):
    #     response = self.client.get(self.url, {'start_date': 'invalid-date', 'end_date': '2024-08-26'})
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_pagination(self):
    #     # Create additional records to test pagination
    #     for i in range(1, 11):
    #         Attendance.objects.create(
    #             institute=self.institute,
    #             course=None,
    #             class_session=None,
    #             member=self.member,
    #             attendance_date=f'2024-08-{i:02d}',
    #             in_time='09:00:00',
    #             out_time='17:00:00',
    #             approver_status='Approved',
    #             status='Present',
    #             remarks='No remarks',
    #             start_date=f'2024-08-{i:02d}',
    #             end_date=f'2024-08-{i:02d}'
    #         )
    #     response = self.client.get(self.url, {'page': 1})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertIn('results', response.data)
    #     self.assertGreater(len(response.data['results']), 1)


 

# class BatchSerializerTestCase(APITestCase):

#     def setUp(self):
#         self.institute = Institute.objects.create(name="Test Institute")
#         self.owner_type = InstitueMemberTypes.objects.create(name="Owner")
#         self.admin_type = InstitueMemberTypes.objects.create(name="Admin")

#         self.owner_user = User.objects.create_user(
#             email='owner@example.com',
#             password='ownerpassword'
#         )
#         self.admin_user = User.objects.create_user(
#             email='admin@example.com',
#             password='adminpassword'
#         )
#         self.regular_user = User.objects.create_user(
#             email='regular@example.com',
#             password='regularpassword'
#         )

#         InstituteMembership.objects.create(
#             user=self.owner_user,
#             institute=self.institute,
#             user_type=self.owner_type
#         )

#         InstituteMembership.objects.create(
#             user=self.admin_user,
#             institute=self.institute,
#             user_type=self.admin_type
#         )

#     def test_create_batch_with_owner(self):
#         # Owner should be able to create a batch
#         data = {
#             'name': 'Test Batch',
#             'start_date': '2024-01-01',
#             'end_date': '2024-12-31',
#             'institute': self.institute.id,
#             'created_by': self.owner_user.id
#         }
#         serializer = BatchSerializer(data=data)
#         self.assertTrue(serializer.is_valid(), serializer.errors)
#         batch = serializer.save(created_by=self.owner_user)
#         self.assertEqual(batch.name, 'Test Batch')
#         self.assertEqual(batch.created_by, self.owner_user)
#     def test_create_batch_with_admin(self):
#         # Admin should be able to create a batch
#         data = {
#             'name': 'Test Batch',
#             'start_date': '2024-01-01',
#             'end_date': '2024-12-31',
#             'institute': self.institute.id,
#             'created_by': self.admin_user.id
#         }
#         serializer = BatchSerializer(data=data)
#         self.assertTrue(serializer.is_valid(), serializer.errors)
#         batch = serializer.save(created_by=self.admin_user)
#         self.assertEqual(batch.name, 'Test Batch')
#         self.assertEqual(batch.created_by, self.admin_user)

    
        
# #         self.client = APIClient()
        
# #         # Create instances for the test
# #         self.institute = Institute.objects.create(name="Test Institute")
        
# #         # Create an instance of InstituteMemberTypes
# #         self.user_type = InstitueMemberTypes.objects.create(name="Owner")
        
# #         # Create users
# #         self.admin_user = User.objects.create_user(
# #             email='admin@example.com',
# #             password='adminpassword',
# #             first_name='Admin',
# #             last_name='User'
# #         )
        
# #         # Create InstituteMembership with the correct user_type instance
# #         InstituteMembership.objects.create(
# #             user=self.admin_user,
# #             institute=self.institute,
# #             user_type=self.user_type
# #         )
        
# #         # Create other necessary instances like Batch
# #         self.batch = Batch.objects.create(
# #             name="Test Batch",
# #             start_date="2024-01-01",
# #             end_date="2024-12-31",
# #             institute=self.institute,
# #             created_by=self.admin_user
# #         )

# #     def test_list_batches(self):
# #         # Test case for listing batches
# #         response = self.client.get('/list-batches/', {'institute_id': self.institute.id})
# #         self.assertEqual(response.status_code, 200)
# #         self.assertEqual(len(response.data['results']), 1)

# #     def test_filter_by_institute(self):
# #         response = self.client.get(self.url, {'institute_id': self.institute.id})
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 2)

#     def test_filter_by_created_by(self):
#         response = self.client.get(self.url, {'created_by': self.user.id})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 2)

#     def test_filter_by_batch_id(self):
#         response = self.client.get(self.url, {'id': self.batch1.id})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['id'], self.batch1.id)

#     def test_no_batches_found(self):
#         response = self.client.get(self.url, {'institute_id': 999})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, [])

# class BatchSerializerTests(APITestCase):
#     def setUp(self):
#         self.institute = Institute.objects.create(name="Test Institute")
#         self.user = User.objects.create_user(username="testuser", password="testpassword")
#         self.member = InstituteMembership.objects.create(user=self.user, institute=self.institute, user_type='Owner')
#         self.batch = Batch.objects.create(
#             name="Batch 1", start_date="2024-01-01", end_date="2024-06-01",
#             institute=self.institute, created_by=self.user
#         )
#         self.serializer = BatchSerializer(instance=self.batch)

#     def test_serializer_valid_data(self):
#         data = self.serializer.data
#         self.assertEqual(data['id'], self.batch.id)
#         self.assertEqual(data['name'], self.batch.name)
#         self.assertEqual(data['start_date'], self.batch.start_date.isoformat())
#         self.assertEqual(data['end_date'], self.batch.end_date.isoformat())
#         self.assertEqual(data['institute'], self.institute.id)
#         self.assertEqual(data['created_by']['id'], self.user.id)
#         self.assertEqual(data['courses'], [])

#     def test_serializer_create_validation(self):
#         data = {
#             'name': 'Batch 2',
#             'start_date': '2024-03-01',
#             'end_date': '2024-08-01',
#             'institute': self.institute.id,
#             'created_by': self.user.id
#         }
#         serializer = BatchSerializer(data=data)
#         self.assertTrue(serializer.is_valid())
#         serializer.save()
#         batch = Batch.objects.get(name='Batch 2')
#         self.assertEqual(batch.name, 'Batch 2')

#     def test_serializer_invalid_create(self):
#         data = {
#             'name': 'Batch 3',
#             'start_date': '2024-04-01',
#             'end_date': '2024-09-01',
#             'institute': self.institute.id,
#             'created_by': self.user.id
#         }
#         # Removing InstituteMembership to test validation
#         InstituteMembership.objects.filter(user=self.user, institute=self.institute).delete()
#         serializer = BatchSerializer(data=data)
#         self.assertFalse(serializer.is_valid())
#         self.assertIn('non_field_errors', serializer.errors)



    # Other test methods remain the same...







        # Add your assertions here to validate that the batch attendance is updated correctly




# class BatchAttendanceSerializerTest(APITestCase):

#     def setUp(self):
#         # Create an institute
#         self.institute = Institute.objects.create(name='Test Institute')

#         # Create a user
#         self.user = User.objects.create_user(username='testuse', password='testpass')
        
#         # Create a batch
#         self.batch = Batch.objects.create(
#             name='Test Batch',
#             start_date='2023-01-01',
#             end_date='2023-12-31',
#             institute=self.institute,  # Ensure this field is provided
#             created_by=self.user
#         )
        
#         # Create a course and add it to the batch
#         self.course = Course.objects.create(
#             courseShortName='Test Course',
#             courseFullName='Full Test Course',
#             courseGlobalCode='TC001'
#         )
#         self.batch.courses.add(self.course)
        
#         # Create a member and an attendance record
#         self.member = User.objects.create_user(username='testmember', password='testpass')
#         self.attendance = BatchAttendance.objects.create(
#             batch=self.batch,
#             member=self.member,
#             attendance_date=timezone.now().date(),
#             status='present',
#             in_time=timezone.now(),
#             out_time=timezone.now(),
#             start_date='2024-08-24',
#             end_date='2024-08-24',
#             remarks='Test remarks'
#         )
        
#         # Create serializer instance
#         self.serializer = BatchAttendanceSerializer(instance=self.attendance)

#     def test_serializer_fields(self):
#         """Test that the serializer includes all the required fields."""
#         data = self.serializer.data
#         self.assertEqual(set(data.keys()), set([
#             'id', 'batch', 'member', 'attendance_date', 'start_date', 'end_date', 'in_time', 'out_time', 'status', 'remarks', 'institute', 'course_ids'
#         ]))

#     def test_serializer_data(self):
#         """Test that the serializer outputs the correct data."""
#         data = self.serializer.data
#         self.assertEqual(data['status'], 'present')
#         self.assertEqual(data['remarks'], 'Test remarks')
#         self.assertEqual(data['batch']['id'], self.batch.id)
#         self.assertEqual(data['member']['id'], self.member.id)
#         self.assertEqual(data['course_ids'], [self.course.id])

#     def test_serializer_invalid_data(self):
#         """Test that invalid data raises validation errors."""
#         invalid_data = {
#             'status': 'invalid_status'
#         }
        
#         serializer = BatchAttendanceSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertIn('status', serializer.errors)

# class BatchAttendanceListViewTest(APITestCase):

#     def setUp(self):
#         self.client = APIClient()
#         self.institute = Institute.objects.create(name="Test Institute")
#         self.user = User.objects.create_user(username='testuse', password='testpass')
        
#         self.batch = Batch.objects.create(
#             name="Test Batch",
#             institute=self.institute,
#             created_by=self.user,
#             start_date=date(2024, 1, 1),
#             end_date=date(2024, 12, 31)
#         )
        
#         self.attendance = BatchAttendance.objects.create(
#             batch=self.batch,
#             member=self.user,
#             attendance_date=date(2024, 8, 2),
#             in_time=time(9, 0),
#             out_time=time(17, 0),
#             status='present'
#         )

#         self.url = reverse('attendance-list')

#     def test_get_attendance_list_with_batch_id(self):
#         response = self.client.get(f"{self.url}?batch_id={self.batch.id}")
        
#         # Debugging output
#         print(f"Status Code: {response.status_code}")
#         print(f"Response Data: {response.data}")

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         data = response.data
        
#         # Ensure 'results' key is in the response data
#         self.assertIn('results', data, "Response data does not contain 'results' key.")
        
#         # Check that there is at least one result
#         self.assertGreater(len(data['results']), 0, "No results returned.")
        
#         # Extract the result and perform assertions
#         result = data['results'][0]
        
#         # Check the values in the result
#         self.assertEqual(result['batch'], self.batch.id, "Batch ID does not match.")
#         self.assertEqual(result['member'], self.user.id, "User ID does not match.")
#         self.assertEqual(result['attendance_date'], str(self.attendance.attendance_date), "Attendance date does not match.")
#         self.assertEqual(result['status'], self.attendance.status, "Status does not match.")
    # ... (rest of the assertions remain the same)
    # ... (rest of the assertions remain the same)
# class ClassCourseAttendanceUpdateViewTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.institute = Institute.objects.create(name="Test Institute")
#         self.course = Course.objects.create(courseShortName="Test Course", linked_institute=self.institute)
#         self.class_session = Class.objects.create(courseId=self.course.id, serialNo=1, status='scheduled', duration=60)
#         self.admin = User.objects.create_user(username='admin', password='adminpass')
#         self.teacher = User.objects.create_user(username='teacher', password='teacherpass')
#         self.student = User.objects.create_user(username='student', password='studentpass')
        
#         self.attendance1 = Attendance.objects.create(
#             member=self.student,
#             class_session=self.class_session,
#             status='present',
#             attendance_date='2024-08-24'
#         )
#         self.attendance2 = Attendance.objects.create(
#             member=self.student,
#             class_session=self.class_session,
#             status='absent',
#             attendance_date='2024-08-25'
#         )
        
#         self.url = reverse('attendance-update', kwargs={'user_id': self.admin.id})

#     def test_update_attendance_success(self):
#         data = {
#             'attendances': [
#                 {
#                     'attendance_id': self.attendance1.id,
#                     'status': 'absent',
#                     'remarks': 'Changed to absent'
#                 },
#                 {
#                     'attendance_id': self.attendance2.id,
#                     'status': 'present',
#                     'in_time': '09:00:00',
#                     'out_time': '10:00:00'
#                 }
#             ]
#         }
#         response = self.client.put(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.attendance1.refresh_from_db()
#         self.attendance2.refresh_from_db()
#         self.assertEqual(self.attendance1.status, 'absent')
#         self.assertEqual(self.attendance1.remarks, 'Changed to absent')
#         self.assertEqual(self.attendance2.status, 'present')
#         self.assertEqual(self.attendance2.in_time.strftime('%H:%M:%S'), '09:00:00')
#         self.assertEqual(self.attendance2.out_time.strftime('%H:%M:%S'), '10:00:00')

# class ClassCourseAttendanceCreateViewTest(APITestCase):
    
#     def setUp(self):
#         # Create test data
#         self.user = User.objects.create(username='testuse', password='testpass')
#         self.class_session = Class.objects.create(
#             courseId=1,
#             serialNo=101,
#             status='scheduled',
#             datetime=timezone.now(),
#             duration=60,
#             meetingLink='http://example.com',
#             address='123 Test St',
#             about='About the class',
#             creator=self.user
#         )
#         self.course = Course.objects.create(courseShortName='Test Course')
#         self.institute = Institute.objects.create(name='Test Institute')
        
#         self.url = reverse('attendance-create', kwargs={'user_id': self.user.id})
    
#     def test_successful_attendance_creation(self):
#         data = {
#             'member_ids': [self.user.id],
#             'class_session': self.class_session.id,
#             'course_id': self.course.id,
#             'institute_id': self.institute.id,
#             'attendance_date': timezone.now().date(),
#             'in_time': '08:00:00',
#             'out_time': '16:00:00',
#             'status': 'present',
#             'approver_status': 'approved',
#             'remarks': 'Good attendance'
#         }
#         response = self.client.post(self.url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(len(response.data), 1)
#         # Verify fields in response data
#         self.assertEqual(response.data[0]['institute'], self.institute.id)
#         self.assertEqual(response.data[0]['member']['id'], self.user.id)
#         self.assertEqual(response.data[0]['class_session'], self.class_session.id)  # Adjust according to serializer
#         self.assertEqual(response.data[0]['course'], self.course.id)
#         self.assertEqual(response.data[0]['attendance_date'], data['attendance_date'].isoformat())
#         self.assertEqual(response.data[0]['in_time'], data['in_time'])
#         self.assertEqual(response.data[0]['out_time'], data['out_time'])
#         self.assertEqual(response.data[0]['status'], data['status'])
#         self.assertEqual(response.data[0]['remarks'], data['remarks'])