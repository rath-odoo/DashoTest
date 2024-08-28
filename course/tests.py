from django.test import TestCase, override_settings
import os
from rest_framework import status
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from django.urls import reverse
from rest_framework.test import APIClient
from course.models import CourseLink, Course
from django.contrib.auth import get_user_model
from course.models import FileObject, Course
from course.models import FileObject, Course
import tempfile
from .models import Course,ClassSection
from course.models import Course, User , VideoObject , CourseLink , FileObject , CourseDesignedFor
from course.models import CourseDesignedFor 
# from grade.models import Grade
from django.core.files.storage import FileSystemStorage
from django.test import override_settings
# TEMP_MEDIA_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp_media')
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Course, CourseDesignedFor, ClassSection, Subject, EducationBoard, VideoObject, CourseLink, FileObject
from .serializers import (
    CourseSerializer, CourseSerializerSummary, DashboardCourseEditSerializer,
    AddYoutubeVideoSerializer, AddCourseLinkSerializer, AddCourseFileSerializer,
    CreateNewCourseSerializer, CourseSerializerEnroll, CoursePublishSerializer,
    CourseUnPublishSerializer, CourseCardImageUploadSerializer, PublicCourseSearchSerializer , CourseSerializerEnrollRequest
)
from course.serializers import CourseDesignedForSerializer , Syllabus , AllCategoriesOfCourse , CourseDesignedFor , CourseSerializer , CourseTeachersRemoveSerializer , CourseSerializerEnrollReject
from institute.models import Institute , Batch, InstituteMembership , InstitueMemberTypes
from institute.models import InstitueMemberTypes
from django.contrib.auth.models import User
from PIL import Image
import io
from django.test import TestCase, RequestFactory
from django.contrib.postgres.fields import ArrayField
from .serializers import PublicCourseSearchSerializer, TeacherSerializer
from datetime import date, timedelta
from rest_framework.permissions import IsAuthenticated
from .serializers import CreateNewCourseSerializer
import datetime
from datetime import date
from .models import Course, User, CourseDesignedFor, ClassSection, EducationBoard, Subject
from .serializers import CourseSerializerSummary
import datetime
from eclass.models import Class
from meeting.models import Meeting
from chat.models import ChatGroup
from accountAPIs.models import User
from django.db.models import Q
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from course.serializers import CreateNewCourseSerializer, AddCourseLinkSerializer
from rest_framework import status
from django.urls import reverse
from datetime import date, timedelta
from django.core.exceptions import ValidationError
from course.models import Course 
from .models import Course, CourseDesignedFor, ClassSection, EducationBoard, User
from .serializers import CreateCourseSerializer
from account.models import Account , UserType
# from account.models import Teacher 
from datetime import date, time, datetime, timedelta

User = get_user_model()
date_today = date.today() 

class CourseModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.designed_for = CourseDesignedFor.objects.create(name='Test Design', boardofeducation=['Board1'])
        self.class_section = ClassSection.objects.create(name='Test Section')
        self.course = Course.objects.create(
            creater=self.user,
            courseShortName='Test Course',
            courseFullName='Test Course Full Name',
            designedFor=self.designed_for,
            classsection=self.class_section
        )

    def test_course_creation(self):
        course = Course.objects.create(
            creater=self.user,
            courseShortName='Test Course',
            courseFullName='Test Course Full Name',
            designedFor=self.designed_for,
            classsection=self.class_section,
            educationboard='Test Board',
            subject='Test Subject'
        )
        self.assertIsInstance(course, Course)
        self.assertEqual(course.courseShortName, 'Test Course')
        self.assertEqual(course.creater, self.user)

    def test_course_str_method(self):
        course = Course.objects.create(
            creater=self.user,
            courseShortName='Test Course',
            courseFullName='Test Course Full Name',
            designedFor=self.designed_for,
            classsection=self.class_section
        )
        self.assertEqual(str(course), str(course.id))

    def test_course_global_code(self):
        course = Course.objects.create(
            creater=self.user,
            courseShortName='Test Course',
            courseFullName='Test Course Full Name',
            designedFor=self.designed_for,
            classsection=self.class_section
        )
        self.assertEqual(course.courseGlobalCode, str(100000 + course.id))

    def test_course_archive(self):
        course = Course.objects.create(
            creater=self.user,
            courseShortName='Test Course',
            courseFullName='Test Course Full Name',
            designedFor=self.designed_for,
            classsection=self.class_section
        )
        course.archive()
        self.assertTrue(course.archived)
        self.assertIsNotNone(course.archive_date)

class CourseSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.designed_for = CourseDesignedFor.objects.create(name='Test Design', boardofeducation=['Board1'])
        self.class_section = ClassSection.objects.create(name='Test Section')
        self.course = Course.objects.create(
            creater=self.user,
            courseShortName='Test Course',
            courseFullName='Test Course Full Name',
            designedFor=self.designed_for,
            classsection=self.class_section
        )

    def test_course_serializer(self):
        serializer = CourseSerializer(instance=self.course)
        data = serializer.data
        self.assertEqual(data['courseShortName'], 'Test Course')
        self.assertEqual(data['designedFor'], 'Test Design')
        self.assertEqual(data['classsection'], 'Test Section')







class ClassSectionModelTest(TestCase):
    def test_class_section_creation(self):
        section = ClassSection.objects.create(name='Test Section')
        self.assertEqual(section.name, 'Test Section')

    def test_class_section_str_method(self):
        section = ClassSection.objects.create(name='Test Section')
        self.assertEqual(str(section), 'Test Section')

class CourseDesignedForViewTest(APITestCase):

    def setUp(self):
        self.url = reverse('coursecategories/')

        # Ensure the database is clean before each test
        CourseDesignedFor.objects.all().delete()

    def test_get_course_designed_for_list(self):
        # Setup: Creating two CourseDesignedFor instances
        CourseDesignedFor.objects.create(name="Physics", boardofeducation=["CBSE"])
        CourseDesignedFor.objects.create(name="Chemistry", boardofeducation=["ICSE"])

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], "Physics")
        self.assertEqual(response.data[0]['boardofeducation'], ["CBSE"])

    def test_create_course_designed_for(self):
        data = {
            "name": "Biology",
            "boardofeducation": ["State Board"]
        }
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(CourseDesignedFor.objects.count(), 1)
        self.assertEqual(CourseDesignedFor.objects.get().name, "Biology")
        self.assertEqual(CourseDesignedFor.objects.get().boardofeducation, ["State Board"])

class CourseDesignedForViewIdTest(APITestCase):
    def setUp(self):
        # Set up some initial CourseDesignedFor objects for testing
        self.course_designed_for_1 = CourseDesignedFor.objects.create(
            name="Science",
            boardofeducation=["CBSE", "ICSE"]
        )
        self.course_designed_for_2 = CourseDesignedFor.objects.create(
            name="Arts",
            boardofeducation=["State Board"]
        )
        self.valid_url = reverse('CourseDesignedForViewId', kwargs={'pk': self.course_designed_for_1.pk})
        self.invalid_url = reverse('CourseDesignedForViewId', kwargs={'pk': 999})

    def test_get_valid_course_designed_for(self):
        response = self.client.get(self.valid_url)
        course_designed_for = CourseDesignedFor.objects.get(pk=self.course_designed_for_1.pk)
        serializer = CourseDesignedForSerializer(course_designed_for)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_invalid_course_designed_for(self):
        response = self.client.get(self.invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class PublishCourseTests(APITestCase):
    
    def setUp(self):
        self.course = Course.objects.create(
            courseShortName='Test Course',
            courseLocalCode='TCL123',
            published=False  # Assuming there's a `published` field in the model
        )
        self.url = reverse('publish_course', args=[self.course.id])

    def test_publish_course_success(self):
        response = self.client.put(self.url, format='json')
        self.course.refresh_from_db()
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.course.published)  # Check if the course is published
        self.assertEqual(response.data['id'], self.course.id)

    def test_publish_nonexistent_course(self):
        non_existent_course_id = 99999
        url = reverse('publish_course', args=[non_existent_course_id])
        response = self.client.put(url, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class UnPublishCourseTests(APITestCase):

    def setUp(self):
        # Create a test user and a test course
        self.user = Account.objects.create_user(
            email='test@example.com',
            password='password123',
        )
        self.course = Course.objects.create(
            creater=self.user,
            courseShortName='Test Course',
            courseLocalCode='TCL123',
            published=True  # Assuming the course starts as published
        )
        self.url = reverse('unpublish_course', args=[self.course.id])

    def test_unpublish_course_success(self):
        # Ensure the course is initially published
        self.assertTrue(self.course.published)

        # Unpublish the course
        response = self.client.put(self.url, {})

        # Reload the course from the database
        self.course.refresh_from_db()

        # Check response status
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify that the course is unpublished
        self.assertFalse(self.course.published)

    def test_unpublish_course_not_found(self):
        # Test with an invalid course ID
        invalid_url = reverse('unpublish_course', args=[9999])
        response = self.client.put(invalid_url, {})

        # Check response status
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unpublish_course_bad_request(self):
        # Assuming the serializer could reject some data,
        # Test with invalid data (though current serializer ignores data)
        response = self.client.put(self.url, {'invalid': 'data'})

        # Check response status
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Reload the course from the database
        self.course.refresh_from_db()

        # Ensure that the course is unpublished despite bad data
        self.assertFalse(self.course.published)


class EditOneDashboardCourseViewTests(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpass')

        # Create a test institute
        self.institute = Institute.objects.create(name="Test Institute")
        self.class_section = ClassSection.objects.create(name="Section A")
        # Create a CourseDesignedFor instance
        self.designed_for = CourseDesignedFor.objects.create(
            name='Students',
            boardofeducation=['CBSE']  # Provide a valid value for boardofeducation
        )

        # Create a test course
        self.course = Course.objects.create(
            courseShortName='Test Course',
            courseLocalCode='TC101',
            courseStatus='Active',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31',
            abouttheCourse='This is a test course.',
            instituteName=self.institute.name,
            coursecredit=4,
            designedFor=self.designed_for,  # Assign the CourseDesignedFor instance
            classsection=self.class_section,
            educationboard='Test Board',
            subject='Test Subject'
        )

        self.url = reverse('edit_course', kwargs={'pk': self.course.pk})
        self.client.login(username='testuser', password='testpass')

    def test_get_course_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['courseShortName'], self.course.courseShortName)

    def test_get_course_not_found(self):
        url = reverse('edit_course', kwargs={'pk': 999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

   
class AddYoutubeVideoCourseViewTests(APITestCase):
    def setUp(self):
        # Set up initial data
        self.course = Course.objects.create(courseShortName="Test Course")
        self.valid_payload = {
            'name': 'Sample Video',
            'link': 'https://www.youtube.com/watch?v=abcd1234',
            'description': 'This is a sample YouTube video'
        }
        self.invalid_payload = {
            'name': '',
            'link': 'invalid-link',
            'description': 'This is an invalid payload'
        }

    def test_get_youtube_video_success(self):
        url = reverse('add_youtube_video', args=[self.course.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('id', response.data)

    def test_add_youtube_video_success(self):
        url = reverse('add_youtube_video', args=[self.course.pk])
        response = self.client.put(url, data=self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check VideoObject associated with the course
        self.assertEqual(self.course.videos.count(), 1)
        self.assertEqual(self.course.videos.first().name, 'Sample Video')


    def test_add_youtube_video_invalid_data(self):
        url = reverse('add_youtube_video', args=[self.course.pk])
        response = self.client.put(url, data=self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)


class AddCourseLinkCourseViewTests(APITestCase):

    def setUp(self):
        # Setup initial course and link data
        self.course = Course.objects.create(courseShortName="TestCourse")
        self.valid_payload = {
            "name": "Test Link",
            "link": "https://example.com",
            "description": "A useful resource."
        }
        self.invalid_payload = {
            "name": "",
            "link": "not-a-valid-link",
            "description": ""
        }

    def test_add_course_link_success(self):
    # Ensure a clean start
        CourseLink.objects.all().delete()
        
        url = reverse('add_course_link', args=[self.course.pk])
        response = self.client.put(url, data=self.valid_payload, format='json')

        # Check if the request was successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check the database state after the test
        print("CourseLink count after test:", CourseLink.objects.count())

        # Verify only one CourseLink was added and it's associated with the correct course
        self.assertEqual(CourseLink.objects.count(), 1)
        self.assertEqual(self.course.courselinks.count(), 1)
        self.assertEqual(self.course.courselinks.first().name, "Test Link")
        self.assertEqual(self.course.courselinks.first().link, "https://example.com")
    def test_add_course_link_invalid_data(self):
        # Test adding a course link with invalid data
        url = reverse('add_course_link', args=[self.course.pk])
        response = self.client.put(url, data=self.invalid_payload, format='json')
        
        # Verify that the response indicates a bad request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
    def test_get_course_link(self):
        # Test retrieving the course and its links
        url = reverse('add_course_link', args=[self.course.pk])
        response = self.client.get(url, format='json')
        
        # Verify the response is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('id', response.data)


class GetVideosByCourseIdViewTests(APITestCase):

    def setUp(self):
        # Create a course
        self.course = Course.objects.create(
            courseShortName="Test Course",
            courseFullName="Full Test Course",
            # Add other required fields
        )

        # Create specific video objects for the test
        self.video1 = VideoObject.objects.create(
            name="Video 1",
            link="http://example.com/video1",
            description="Description for Video 1"
        )
        self.video2 = VideoObject.objects.create(
            name="Video 2",
            link="http://example.com/video2",
            description="Description for Video 2"
        )

        # Add the videos to the course
        self.course.videos.add(self.video1, self.video2)

        # Ensure no extra video objects
        VideoObject.objects.exclude(id__in=[self.video1.id, self.video2.id]).delete()

        # URL for the test
        self.url = reverse('get_videos_by_courseId', args=[self.course.pk])

    def test_get_videos_success(self):
        response = self.client.get(self.url)
        response_data = response.data
        print("Response Data:", response_data)  # Debug output

        # Access the 'results' field from the paginated response data
        results = response_data.get('results', [])
        
        # Assert the length of the results
        self.assertEqual(len(results), 2)  # Expecting 2 videos

        video_ids = [video['id'] for video in results]
        self.assertIn(self.video1.id, video_ids)
        self.assertIn(self.video2.id, video_ids)

    def test_get_videos_no_videos(self):
        # Create a new course with no videos
        course_no_videos = Course.objects.create(
            courseShortName="Course with No Videos",
            courseFullName="Full Course with No Videos",
            # Add other required fields
        )
        # URL for the test
        url_no_videos = reverse('get_videos_by_courseId', args=[course_no_videos.pk])

        response = self.client.get(url_no_videos)
        response_data = response.data
        print("Response Data for No Videos:", response_data)  # Debug output

        # Access the 'results' field from the paginated response data
        results = response_data.get('results', [])
        
        # Assert the length of the results is 0 for no videos
        self.assertEqual(len(results), 0)

    def test_get_videos_non_existent_course(self):
        # Use a non-existent course ID
        url = reverse('get_videos_by_courseId', args=[9999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class GetCourseLinksByCourseIdViewTests(APITestCase):

    def setUp(self):
        # Create a course
        self.course_with_links = Course.objects.create(
            courseShortName="Test Course",
            courseFullName="Full Test Course",
            # Add other required fields
        )

        # Create specific course link objects for the test
        self.link1 = CourseLink.objects.create(
            name="Link 1",
            link="http://example.com/link1",
            description="Description for Link 1"
        )
        self.link2 = CourseLink.objects.create(
            name="Link 2",
            link="http://example.com/link2",
            description="Description for Link 2"
        )

        # Add the links to the course
        self.course_with_links.courselinks.add(self.link1, self.link2)

        # Ensure no extra course link objects
        CourseLink.objects.exclude(id__in=[self.link1.id, self.link2.id]).delete()

        # URL for the test with course having links
        self.url_with_links = reverse('get_link_by_courseId', args=[self.course_with_links.pk])

        # Create a course with no links
        self.course_no_links = Course.objects.create(
            courseShortName="Course with No Links",
            courseFullName="Full Course with No Links",
            # Add other required fields
        )
        # URL for the test with course having no links
        self.url_no_links = reverse('get_link_by_courseId', args=[self.course_no_links.pk])

    def test_get_links_success(self):
        response = self.client.get(self.url_with_links)
        response_data = response.data
        print("Response Data with Links:", response_data)  # Debug output

        # Access the 'results' field from the paginated response data
        results = response_data.get('results', [])
        
        # Assert the length of the results
        self.assertEqual(len(results), 2)  # Expecting 2 links

        link_ids = [link['id'] for link in results]
        self.assertIn(self.link1.id, link_ids)
        self.assertIn(self.link2.id, link_ids)

    def test_get_links_no_links(self):
        response = self.client.get(self.url_no_links)
        response_data = response.data
        print("Response Data with No Links:", response_data)  # Debug output

        # Access the 'results' field from the paginated response data
        results = response_data.get('results', [])
        
        # Assert the length of the results is 0 for no links
        self.assertEqual(len(results), 0)

class GetCourseFilesByCourseIdViewTests(APITestCase):

    def setUp(self):
        # Create a course
        self.course_with_files = Course.objects.create(
            courseShortName="Test Course with Files",
            courseFullName="Full Test Course with Files",
            # Add other required fields
        )

        # Create specific file objects for the test
        self.file1 = FileObject.objects.create(
            displayname="File 1",
            fileaddress="http://example.com/file1",
            description="Description for File 1"
        )
        self.file2 = FileObject.objects.create(
            displayname="File 2",
            fileaddress="http://example.com/file2",
            description="Description for File 2"
        )

        # Add the files to the course
        self.course_with_files.coursefiles.add(self.file1, self.file2)

        # Ensure no extra file objects
        FileObject.objects.exclude(id__in=[self.file1.id, self.file2.id]).delete()

        # URL for the test with course having files
        self.url_with_files = reverse('get_coursefiles_by_courseId', args=[self.course_with_files.pk])

        # Create a course with no files
        self.course_no_files = Course.objects.create(
            courseShortName="Course with No Files",
            courseFullName="Full Course with No Files",
            # Add other required fields
        )
        # URL for the test with course having no files
        self.url_no_files = reverse('get_coursefiles_by_courseId', args=[self.course_no_files.pk])

    def test_get_files_success(self):
        response = self.client.get(self.url_with_files)
        response_data = response.data
        print("Response Data with Files:", response_data)  # Debug output

        # Access the 'results' field from the paginated response data
        results = response_data.get('results', [])
        
        # Assert the length of the results
        self.assertEqual(len(results), 2)  # Expecting 2 files

        file_ids = [file['id'] for file in results]
        self.assertIn(self.file1.id, file_ids)
        self.assertIn(self.file2.id, file_ids)

    def test_get_files_no_files(self):
        response = self.client.get(self.url_no_files)
        response_data = response.data
        print("Response Data with No Files:", response_data)  # Debug output

        # Access the 'results' field from the paginated response data
        results = response_data.get('results', [])
        
        # Assert the length of the results is 0 for no files
        self.assertEqual(len(results), 0)





class UserSearchForAddingStudentToCourseViewTests(APITestCase):

    def setUp(self):
        # Create some users
        self.user1 = User.objects.create_user(username='user1',  email='john.doe@example.com')
        self.user2 = User.objects.create_user(username='user2', email='jane.smith@example.com')
        self.user3 = User.objects.create_user(username='user3',  email='jim.beam@example.com')

        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', courseFullName='Test Course Full')

        # Assign user2 as a teacher, user3 as a student
        self.course.teachers.add(self.user2)
        self.course.enrolled_students.add(self.user3)
        self.course.save()

        self.url = reverse('UserSearchForAddingStudentToCourseView', args=[self.course.id])

    def test_search_users_by_firstname(self):
        response = self.client.get(self.url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        # Check if the username is the one you're expecting (e.g., 'john')
        self.assertEqual(response.data['results'][0]['username'], 'john')
    def test_search_users_by_lastname(self):
        response = self.client.get(self.url, {'name': 'Smith'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)
    def test_search_users_by_username(self):
        response = self.client.get(self.url, {'name': 'user3'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_search_without_query_param(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Query parameter 'name' is required", response.data['error'])

    def test_search_with_nonexistent_course(self):
        url = reverse('UserSearchForAddingStudentToCourseView', args=[999])
        response = self.client.get(url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("Course not found", response.data['error'])

    def test_search_excludes_users_in_course(self):
        # Search for 'Jane' who is already a teacher
        response = self.client.get(self.url, {'name': 'Jane'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)
class UserSearchForAddingAdminToCourseViewTests(APITestCase):

    def setUp(self):
        # Create some users
        self.user1 = User.objects.create_user(username='user1',email='john.doe@example.com')
        self.user2 = User.objects.create_user(username='user2', email='jane.smith@example.com')
        self.user3 = User.objects.create_user(username='user3',  email='jim.beam@example.com')
        self.user4 = User.objects.create_user(username='user4',  email='jack.daniels@example.com')

        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', courseFullName='Test Course Full')

        # Assign user2 as a teacher, user3 as a student, and user4 as an admin
        self.course.teachers.add(self.user2)
        self.course.enrolled_students.add(self.user3)
        self.course.admins.add(self.user4)
        self.course.save()

        self.url = reverse('UserSearchForAddingAdminToCourseView', args=[self.course.id])

    def test_search_users_by_firstname(self):
        response = self.client.get(self.url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['username'], 'john')
    def test_search_users_by_username(self):
        response = self.client.get(self.url, {'name': 'user1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['username'], self.user1.username)
    def test_search_no_results_due_to_exclusion(self):
        response = self.client.get(self.url, {'name': 'Jack'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_search_no_query_parameter(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Query parameter 'name' is required")

    def test_search_course_not_found(self):
        url = reverse('UserSearchForAddingAdminToCourseView', args=[999])  # Non-existent course ID
        response = self.client.get(url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Course not found")
class UserSearchForAddingTeacherToCourseViewTests(APITestCase):

    def setUp(self):
    # Create some users
        self.user1 = User.objects.create_user(username='user1',  email='john.doe@example.com')
        self.user2 = User.objects.create_user(username='user2',  email='jane.smith@example.com')
        self.user3 = User.objects.create_user(username='user3',  email='jim.beam@example.com')
        self.user4 = User.objects.create_user(username='user4',  email='jack.daniels@example.com')

        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', courseFullName='Test Course Full')

        # Assign user2 as a teacher and user3 as a student
        self.course.teachers.add(self.user2)
        self.course.enrolled_students.add(self.user3)
        self.course.save()

        self.url = reverse('UserSearchForAddingTeacherToCourseView', args=[self.course.id])
    def test_search_users_by_firstname(self):
        response = self.client.get(self.url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['username'], 'john')
    def test_search_users_by_username(self):
        response = self.client.get(self.url, {'name': 'user1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['username'], self.user1.username)
    def test_search_no_results_due_to_exclusion(self):
        response = self.client.get(self.url, {'name': 'Jack'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_search_no_query_parameter(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Query parameter 'name' is required")

    def test_search_course_not_found(self):
        url = reverse('UserSearchForAddingAdminToCourseView', args=[999])  # Non-existent course ID
        response = self.client.get(url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Course not found")

class UserSearchForAddingPeopleToCourseViewTests(APITestCase):

    def setUp(self):
        # Create some users
        self.user1 = User.objects.create_user(username='user1', email='john.doe@example.com', phone_number='1234567890')
        self.user2 = User.objects.create_user(username='user2', email='jane.smith@example.com', phone_number='0987654321')
        self.user3 = User.objects.create_user(username='user3', email='jim.beam@example.com', phone_number='5556667777')
        self.user4 = User.objects.create_user(username='user4', email='jack.daniels@example.com', phone_number='1112223333')

        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', courseFullName='Test Course Full')

        # Assign users to the course
        self.course.teachers.add(self.user2)
        self.course.enrolled_students.add(self.user3)
        self.course.admins.add(self.user4)
        self.course.creater = self.user1  # Setting user1 as creator
        self.course.save()

        self.url = reverse('UserSearchForAddingPeopleToCourseView', args=[self.course.id])

    def test_search_users_by_firstname(self):
        response = self.client.get(self.url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)  # user1 is excluded due to being the creator
    

    def test_search_users_with_no_query_parameter(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Query parameter 'name' is required")

    def test_search_users_for_nonexistent_course(self):
        invalid_url = reverse('UserSearchForAddingPeopleToCourseView', args=[9999])  # Assuming 9999 is an invalid ID
        response = self.client.get(invalid_url, {'name': 'John'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "Course not found")

    def test_search_users_with_no_matches(self):
        response = self.client.get(self.url, {'name': 'Nonexistent'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)


class EnrolmentRequestListViewTests(APITestCase):

    def setUp(self):
        # Create some users
        self.user1 = User.objects.create_user(username='user1', email='john.doe@example.com', phone_number='1234567890')
        self.user2 = User.objects.create_user(username='user2', email='jane.smith@example.com', phone_number='0987654321')
        self.user3 = User.objects.create_user(username='user3', email='jim.beam@example.com', phone_number='5556667777')

        # Create a course with enrollment requests
        self.course = Course.objects.create(
            courseShortName='Test Course', 
            courseFullName='Test Course Full',
            courseGlobalCode='TC123', 
            courseLocalCode='TC456',
            courseStatus='Active',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31'
        )
        self.course.enrolement_requests.add(self.user1, self.user2)  # Add enrollment requests
        self.course.save()

        # Define the URL for the test
        self.url = reverse('enrolment-requests-list', args=[self.course.id])

    def test_get_enrolment_requests(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        results = response.data['results']
        self.assertIn('course', results)
        self.assertIn('enrolement_requests', results['course'])
        self.assertEqual(len(results['course']['enrolement_requests']), 2)
        self.assertEqual(results['course']['enrolement_requests'][0]['username'], 'user1')
        self.assertEqual(results['course']['enrolement_requests'][1]['username'], 'user2')
    def test_get_enrolment_requests_no_requests(self):
        # Create a course with no enrollment requests
        empty_course = Course.objects.create(
            courseShortName='Empty Course', 
            courseFullName='Empty Course Full',
            courseGlobalCode='EC123', 
            courseLocalCode='EC456',
            courseStatus='Active',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31'
        )
        url = reverse('enrolment-requests-list', args=[empty_course.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        results = response.data['results']
        self.assertIn('course', results)
        self.assertEqual(results['course']['enrolement_requests'], [])

    def test_get_enrolment_requests_course_not_found(self):
        url = reverse('enrolment-requests-list', args=[9999])  # Assuming 9999 is an invalid ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_enrolment_requests_pagination(self):
        # Create additional users for pagination test
        for i in range(10):
            User.objects.create_user(username=f'user{i+4}', email=f'user{i+4}@example.com', phone_number=f'12345678{i+4}')
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        results = response.data['results']
        self.assertIn('course', results)
        self.assertIn('enrolement_requests', results['course'])
        self.assertTrue(len(results['course']['enrolement_requests']) <= 10)  # Adjust based on pagination limit

    def test_get_enrolment_requests_invalid_course_id(self):
        url = reverse('enrolment-requests-list', args=[9999])  # Invalid course ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_enrolment_requests_response_structure(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        results = response.data['results']
        self.assertIn('course', results)
        course_data = results['course']
        self.assertIn('id', course_data)
        self.assertIn('enrolement_requests', course_data)
        self.assertIsInstance(course_data['enrolement_requests'], list)


class CourseMemberListViewTests(APITestCase):

    def setUp(self):
        # Create users with different roles
        self.teacher1 = User.objects.create_user(username='teacher1', email='teacher1@example.com', password='password123')
        self.teacher2 = User.objects.create_user(username='teacher2', email='teacher2@example.com', password='password123')
        self.student1 = User.objects.create_user(username='student1', email='student1@example.com', password='password123')
        self.student2 = User.objects.create_user(username='student2', email='student2@example.com', password='password123')

        # Create a course
        self.course = Course.objects.create(
            courseShortName='Test Course',
            courseFullName='Test Course Full',
            courseGlobalCode='TC123',
            courseLocalCode='TC456',
            courseStatus='ongoing',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31'
        )

        # Assign teachers and students to the course
        self.course.teachers.add(self.teacher1, self.teacher2)
        self.course.enrolled_students.add(self.student1, self.student2)
        self.course.save()

        # Define the URL for the test
        self.url = reverse('course-member-list', args=[self.course.id])
    def test_get_members_filtered_by_role_teacher(self):
        response = self.client.get(self.url, {'role': 'teacher'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        
        results = response.data['results']
        self.assertIn('course', results)
        self.assertIn('members', results)
        
        course = results['course']
        members = results['members']
        
        self.assertTrue(any(member['username'] == 'teacher1' for member in members))
        self.assertTrue(any(member['username'] == 'teacher2' for member in members))
        self.assertFalse(any(member['username'] == 'student1' for member in members))
        self.assertFalse(any(member['username'] == 'student2' for member in members))

    def test_get_members_filtered_by_role_student(self):
        response = self.client.get(self.url, {'role': 'student'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        
        results = response.data['results']
        self.assertIn('course', results)
        self.assertIn('members', results)
        
        course = results['course']
        members = results['members']
        
        self.assertTrue(any(member['username'] == 'student1' for member in members))
        self.assertTrue(any(member['username'] == 'student2' for member in members))
        self.assertFalse(any(member['username'] == 'teacher1' for member in members))
        self.assertFalse(any(member['username'] == 'teacher2' for member in members))


    def test_get_members_filtered_by_is_member_true(self):
        response = self.client.get(self.url, {'is_member': 'true'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        
        results = response.data['results']
        self.assertIn('course', results)
        self.assertIn('members', results)
        
        members = results['members']
        
        self.assertTrue(any(member['username'] == 'student1' for member in members))
        self.assertTrue(any(member['username'] == 'student2' for member in members))
        self.assertFalse(any(member['username'] == 'teacher1' for member in members))
        self.assertFalse(any(member['username'] == 'teacher2' for member in members))

    def test_get_members_filtered_by_is_member_false(self):
        response = self.client.get(self.url, {'is_member': 'false'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        
        results = response.data['results']
        self.assertIn('course', results)
        self.assertIn('members', results)
        
        members = results['members']
        
        # Check that teachers are present and students are not
        self.assertTrue(any(member['username'] == 'teacher1' for member in members))
        self.assertTrue(any(member['username'] == 'teacher2' for member in members))
        self.assertFalse(any(member['username'] == 'student1' for member in members))
        self.assertFalse(any(member['username'] == 'student2' for member in members))

class GetAdminsForCourseViewTests(APITestCase):
    def setUp(self):
        # Create some users
        self.admin1 = User.objects.create_user(username='admin1', email='admin1@example.com', password='password123')
        self.admin2 = User.objects.create_user(username='admin2', email='admin2@example.com', password='password123')
        self.non_admin = User.objects.create_user(username='nonadmin', email='nonadmin@example.com', password='password123')
        
        # Create a course and add admins
        self.course = Course.objects.create(courseShortName='Test Course', courseFullName='Test Course Full')
        self.course.admins.add(self.admin1, self.admin2)  # Assuming you have a ManyToMany or similar relationship for admins

        # Define URL for testing
        self.url = reverse('get-admins-for-course', args=[self.course.id])

    def test_get_admins_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that the response contains the admins
        admins = response.data
        self.assertIn('id', admins[0])
        self.assertIn('username', admins[0])
        self.assertIn('firstname', admins[0])
        self.assertIn('lastname', admins[0])
        self.assertIn('profile_image', admins[0])
        
        # Check if the correct admins are returned
        self.assertEqual(len(admins), 2)
        self.assertEqual(admins[0]['username'], 'admin1')
        self.assertEqual(admins[1]['username'], 'admin2')
    def test_get_admins_no_course(self):
        # Test with a non-existing course ID
        url = reverse('get-admins-for-course', args=[9999])  # Assuming 9999 is a non-existent ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
class GetTeachersForCourseViewTests(APITestCase):
    def setUp(self):
        # Create some users
        self.teacher1 = User.objects.create_user(username='teacher1', email='teacher1@example.com', password='password123')
        self.teacher2 = User.objects.create_user(username='teacher2', email='teacher2@example.com', password='password123')
        self.non_teacher = User.objects.create_user(username='nonteacher', email='nonteacher@example.com', password='password123')
        
        # Create a course and add teachers
        self.course = Course.objects.create(courseShortName='Test Course', courseFullName='Test Course Full')
        self.course.teachers.add(self.teacher1, self.teacher2)  # Assuming you have a ManyToMany or similar relationship for teachers

        # Define URL for testing
        self.url = reverse('get-teachers-for-course', args=[self.course.id])

    def test_get_teachers_success(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check that the response contains the teachers
        teachers = response.data
        self.assertIn('id', teachers[0])
        self.assertIn('username', teachers[0])
        self.assertIn('firstname', teachers[0])
        self.assertIn('lastname', teachers[0])
        self.assertIn('profile_image', teachers[0])
        
        # Check if the correct teachers are returned
        self.assertEqual(len(teachers), 2)
        self.assertEqual(teachers[0]['username'], 'teacher1')
        self.assertEqual(teachers[1]['username'], 'teacher2')

    def test_get_teachers_no_course(self):
        # Test with a non-existing course ID
        url = reverse('get-teachers-for-course', args=[9999])  # Assuming 9999 is a non-existent ID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class CourseEnrollmentCountViewTests(APITestCase):
    def setUp(self):
        # Create a test course
        self.course = Course.objects.create(
            courseShortName='Test Course',
            courseFullName='Test Course Full',
            courseGlobalCode='101832',
            courseLocalCode='TC456',
            courseStatus='ongoing',
            courseStartDate='2024-01-01',
            courseEndDate='2024-12-31',
        )
        
        # Create test users
        self.student1 = User.objects.create_user(username='student1', email='student1@example.com', password='password123')
        self.student2 = User.objects.create_user(username='student2', email='student2@example.com', password='password123')
        
        # Enroll students in the course
        self.course.enrolled_students.add(self.student1, self.student2)
        
        # Add enrollment requests
        self.course.enrolement_requests.add(self.student1)  # Use `add` method
        
        # Set the URL for the API endpoint
        self.url = reverse('course_enrollment_count', args=[self.course.id])
    
    def test_get_course_enrollment_count(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['course_id'], self.course.id)
        self.assertEqual(response.data['course_name'], self.course.courseShortName)
        self.assertEqual(response.data['enrolled_students_count'], 2)
        self.assertEqual(response.data['enrollment_requests_count'], 1)

     
    def test_get_course_enrollment_count_non_existent(self):
        # URL for a non-existent course
        url = reverse('course_enrollment_count', args=[9999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
class RemoveTeachersFromCourseViewTests(APITestCase):

    def setUp(self):
        # Create a course and some users
        self.course = Course.objects.create(courseShortName='Test Course', published=True)
        self.teacher1 = User.objects.create(username='teacher1', email='teacher1@example.com')
        self.teacher2 = User.objects.create(username='teacher2', email='teacher2@example.com')
        self.teacher3 = User.objects.create(username='teacher3', email='teacher3@example.com')
        self.course.teachers.add(self.teacher1, self.teacher2)
        self.url = reverse('remove-teachers-from-course', args=[self.course.id])
    
    def test_remove_teachers_successfully(self):
        data = {
            'teacher_ids': [self.teacher1.id, self.teacher2.id]
        }
        response = self.client.post(self.url, data, format='json')
        self.course.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "Teachers removed from the course successfully"})
        self.assertNotIn(self.teacher1, self.course.teachers.all())
        self.assertNotIn(self.teacher2, self.course.teachers.all())
  

    def test_remove_teachers_not_in_course(self):
        data = {
            'teacher_ids': [self.teacher3.id]  # Teacher who is not assigned to the course
        }
        response = self.client.post(self.url, data, format='json')
        self.course.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {"message": "Teachers removed from the course successfully"})
        self.assertIn(self.teacher1, self.course.teachers.all())
        self.assertIn(self.teacher2, self.course.teachers.all())
        self.assertNotIn(self.teacher3, self.course.teachers.all())

   
class RemoveAdminFromCourseViewTests(APITestCase):
    
    def setUp(self):
        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', published=True)
        
        # Create users
        self.admin1 = User.objects.create(username='admin1', email='admin1@example.com')
        self.admin2 = User.objects.create(username='admin2', email='admin2@example.com')
        self.non_admin = User.objects.create(username='non_admin', email='non_admin@example.com')
        
        # Assign admins to the course
        self.course.admins.add(self.admin1, self.admin2)
        
        # Define the URL for removing admins
        self.url = reverse('remove_admin_from_course', args=[self.course.id])
        
    def test_successful_admin_removal(self):
        # Ensure the admins are initially in the course
        self.assertIn(self.admin1, self.course.admins.all())
        self.assertIn(self.admin2, self.course.admins.all())
        
        # Remove one admin
        data = {
            'admin_ids': [self.admin1.id]
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('message'), 'Teachers removed from the course successfully')  # Update to match view message
        
        # Refresh the course object from the database
        self.course.refresh_from_db()
        
        # Ensure admin1 has been removed and admin2 is still present
        self.assertNotIn(self.admin1, self.course.admins.all())
        self.assertIn(self.admin2, self.course.admins.all())
    
        
    def test_empty_admin_ids(self):
        # Test with empty list
        data = {
            'admin_ids': []  # Empty list
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("This list may not be empty.", response.data.get('admin_ids', []))


class RemovePeopleFromCourseViewTests(APITestCase):

    def setUp(self):
        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', published=True)
        
        # Create users
        self.user1 = User.objects.create(username='user1', email='user1@example.com')
        self.user2 = User.objects.create(username='user2', email='user2@example.com')
        self.user3 = User.objects.create(username='user3', email='user3@example.com')
        
        # Enroll users in the course
        self.course.enrolled_students.add(self.user1, self.user2, self.user3)
        
        # Define the URL for removing people from the course
        self.url = reverse('remove_people_from_course', args=[self.course.id])
    
    def test_successful_removal(self):
        # Ensure the users are initially enrolled
        self.assertIn(self.user1, self.course.enrolled_students.all())
        self.assertIn(self.user2, self.course.enrolled_students.all())
        
        # Remove users
        data = {
            'people': [self.user1.id, self.user2.id]
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('message'), 'People removed from the course successfully')
        
        # Refresh the course object from the database
        self.course.refresh_from_db()
        
        # Ensure user1 and user2 have been removed and user3 is still present
        self.assertNotIn(self.user1, self.course.enrolled_students.all())
        self.assertNotIn(self.user2, self.course.enrolled_students.all())
        self.assertIn(self.user3, self.course.enrolled_students.all())

    def test_invalid_user_ids(self):
        # Attempt to remove users with non-existent IDs
        data = {
            'people': [9999, 10000]  # Assuming these IDs do not exist
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Some user IDs do not exist.", response.data['people'])
    
   
    
    def test_partial_valid_and_invalid_user_ids(self):
        # Attempt to remove a mix of valid and invalid user IDs
        data = {
            'people': [self.user1.id, 9999]  # Assuming 9999 does not exist
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Some user IDs do not exist.", response.data['people'])
        
        # Ensure that the valid user (user1) was not removed
        self.course.refresh_from_db()
        self.assertIn(self.user1, self.course.enrolled_students.all())


class AddAdminToCourseViewTests(APITestCase):

    def setUp(self):
        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', published=True)
        
        # Create users
        self.user1 = User.objects.create(username='user1', email='user1@example.com')
        self.user2 = User.objects.create(username='user2', email='user2@example.com')
        self.user3 = User.objects.create(username='user3', email='user3@example.com')
        
        # Define the URL for adding admins to the course
        self.url = reverse('add-admin-to-course', args=[self.course.id])
    
    def test_successful_admin_addition(self):
        # Ensure the users are not initially admins
        self.assertNotIn(self.user1, self.course.admins.all())
        self.assertNotIn(self.user2, self.course.admins.all())
        
        # Add users as admins
        data = {
            'admin_ids': [self.user1.id, self.user2.id]
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('message'), 'Teachers added to the course successfully')
        
        # Refresh the course object from the database
        self.course.refresh_from_db()
        
        # Ensure user1 and user2 have been added as admins
        self.assertIn(self.user1, self.course.admins.all())
        self.assertIn(self.user2, self.course.admins.all())
        self.assertNotIn(self.user3, self.course.admins.all())

class AddTeachersToCourseViewTests(APITestCase):

    def setUp(self):
        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', published=True)
        
        # Create users
        self.user1 = User.objects.create(username='teacher1', email='teacher1@example.com')
        self.user2 = User.objects.create(username='teacher2', email='teacher2@example.com')
        self.user3 = User.objects.create(username='teacher3', email='teacher3@example.com')
        
        # Define the URL for adding teachers to the course
        self.url = reverse('add-teachers-to-course', args=[self.course.id])
    
    def test_successful_teacher_addition(self):
        # Ensure the users are not initially teachers
        self.assertNotIn(self.user1, self.course.teachers.all())
        self.assertNotIn(self.user2, self.course.teachers.all())
        
        # Add users as teachers
        data = {
            'teacher_ids': [self.user1.id, self.user2.id]
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('message'), 'Teachers added to the course successfully')
        
        # Refresh the course object from the database
        self.course.refresh_from_db()
        
        # Ensure user1 and user2 have been added as teachers
        self.assertIn(self.user1, self.course.teachers.all())
        self.assertIn(self.user2, self.course.teachers.all())
        self.assertNotIn(self.user3, self.course.teachers.all())
    
    def test_empty_teacher_ids_list(self):
        # Attempt to add users with an empty list
        data = {
            'teacher_ids': []
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("This list may not be empty.", response.data['teacher_ids'])
    
class AddPeopleToCourseViewTests(APITestCase):

    def setUp(self):
        # Create a course
        self.course = Course.objects.create(courseShortName='Test Course', published=True)
        
        # Create users
        self.user1 = User.objects.create(username='user1', email='user1@example.com')
        self.user2 = User.objects.create(username='user2', email='user2@example.com')
        self.user3 = User.objects.create(username='user3', email='user3@example.com')
        
        # Define the URL for adding people to the course
        self.url = reverse('add_people_to_course', args=[self.course.id])
    
    def test_successful_teacher_addition(self):
        # Ensure the users are not initially teachers
        self.assertNotIn(self.user1, self.course.teachers.all())
        self.assertNotIn(self.user2, self.course.teachers.all())
        
        # Add users as teachers
        data = {
            'people': [self.user1.id, self.user2.id],
            'role': 'teacher'
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('message'), 'People added to the course as teacher successfully')
        
        # Refresh the course object from the database
        self.course.refresh_from_db()
        
        # Ensure user1 and user2 have been added as teachers
        self.assertIn(self.user1, self.course.teachers.all())
        self.assertIn(self.user2, self.course.teachers.all())
        self.assertNotIn(self.user3, self.course.teachers.all())
    def test_successful_student_addition(self):
        # Ensure the users are not initially students
        self.assertNotIn(self.user1, self.course.enrolled_students.all())
        self.assertNotIn(self.user2, self.course.enrolled_students.all())
        
        # Add users as students
        data = {
            'people': [self.user1.id, self.user2.id],
            'role': 'student'
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('message'), 'People added to the course as student successfully')
        
        # Refresh the course object from the database
        self.course.refresh_from_db()
        
        # Ensure user1 and user2 have been added as students
        self.assertIn(self.user1, self.course.enrolled_students.all())
        self.assertIn(self.user2, self.course.enrolled_students.all())
        self.assertNotIn(self.user3, self.course.enrolled_students.all())
    
    def test_successful_enrollment_request_addition(self):
        # Ensure the users are not initially in enrollment requests
        self.assertNotIn(self.user1, self.course.enrolement_requests.all())
        self.assertNotIn(self.user2, self.course.enrolement_requests.all())
        
        # Add users as enrollment requests
        data = {
            'people': [self.user1.id, self.user2.id],
            'role': 'enrollment_request'
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('message'), 'People added to the course as enrollment_request successfully')
        
        # Refresh the course object from the database
        self.course.refresh_from_db()
        
        # Ensure user1 and user2 have been added as enrollment requests
        self.assertIn(self.user1, self.course.enrolement_requests.all())
        self.assertIn(self.user2, self.course.enrolement_requests.all())
        self.assertNotIn(self.user3, self.course.enrolement_requests.all())
    
    def test_invalid_user_ids(self):
        # Attempt to add non-existent user IDs
        data = {
            'people': [9999, 10000],  # Assuming these IDs do not exist
            'role': 'teacher'
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Some user IDs do not exist.", response.data['people'])
    
    def test_empty_people_list(self):
        # Attempt to add users with an empty list
        data = {
            'people': [],
            'role': 'student'
        }
        response = self.client.post(self.url, data, format='json')
        
        # Check response
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("This list may not be empty.", response.data['people'])
class CourseRemoveViewTests(TestCase):
    def setUp(self):
        # Set up users
        self.user = User.objects.create_user(username='user1', email='user1@example.com', password='password')
        self.other_user = User.objects.create_user(username='user2', email='user2@example.com', password='password')
        
        # Set up courses
        self.course = Course.objects.create(courseShortName='Test Course')
        self.course.enrolled_students.add(self.user)  # Add the user to the course
        
        # Set up API client
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)  # Authenticate as the user

    def test_successful_removal(self):
        url = reverse('course_remove', args=[self.course.id])
        response = self.client.put(url)

        # Check that the user is removed from the course
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertNotIn(self.user, self.course.enrolled_students.all())
        self.assertNotIn(self.course, self.user.dashboard_courses.all())

    def test_course_not_found(self):
        url = reverse('course_remove', args=[9999])  # Use an invalid course ID
        response = self.client.put(url)

        # Check that a 404 Not Found error is returned
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_not_enrolled(self):
        # User 'self.other_user' is not enrolled in the course
        self.client.force_authenticate(user=self.other_user)
        url = reverse('course_remove', args=[self.course.id])
        response = self.client.put(url)

        # Check that the user is not enrolled and that the response is still 204 No Content
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # Verify that no changes were made to the course and user's enrollment
        self.assertNotIn(self.other_user, self.course.enrolled_students.all())
        self.assertNotIn(self.course, self.other_user.dashboard_courses.all())




class CourseViewIdEnrollRejectTests(TestCase):
    def setUp(self):
        # Set up users
        self.user = User.objects.create_user(username='user1', email='user1@example.com', password='password')
        self.other_user = User.objects.create_user(username='user2', email='user2@example.com', password='password')

        # Set up course
        self.course = Course.objects.create(courseShortName='Test Course')
        self.course.enrolement_requests.add(self.other_user)  # Add the user to enrollment requests
        
        # Set up API client
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)  # Authenticate as the user
        
        # Define the URL for the API endpoint
        self.url = reverse('CourseViewIdEnrollReject', args=[self.course.id])

    def test_get_course_enrollment_request(self):
        response = self.client.get(self.url)

        # Print response data to understand its structure
        print("Response data:", response.data)

        # Verify that the correct course data is retrieved
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Adjust based on actual response structure
        self.assertIn('id', response.data)
        self.assertNotIn('requesterId', response.data)  # Remove or adjust if 'requesterId' is not present

    def test_successful_enrollment_request_rejection(self):
        response = self.client.put(self.url, data={'requesterId': self.other_user.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Fetch the updated course object
        updated_course = Course.objects.get(pk=self.course.id)

        # Verify that the user has been removed from enrollment requests
        self.assertNotIn(self.other_user, updated_course.enrolement_requests.all())

    def test_course_not_found(self):
        url = reverse('CourseViewIdEnrollReject', args=[9999])  # Use an invalid course ID
        response = self.client.get(url)

        # Verify that a 404 Not Found error is returned
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_invalid_data_for_put_request(self):
        url = reverse('CourseViewIdEnrollReject', args=[self.course.id])
        data = {'requesterId': 'invalid_id'}  # Use an invalid requesterId
        response = self.client.put(url, data, format='json')

        # Verify that a 400 Bad Request error is returned
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('requesterId', response.data)
class DeleteCourseLinkViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course_link = CourseLink.objects.create(
            name="Test Course Link",
            link="https://example.com/course",
            description="Test description"
        )
        self.url = reverse('Delete_course_link', kwargs={'pk': self.course_link.pk})

    def test_delete_existing_course_link(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CourseLink.objects.filter(pk=self.course_link.pk).exists())

    def test_delete_non_existent_course_link(self):
        non_existent_pk = self.course_link.pk + 1
        url = reverse('Delete_course_link', kwargs={'pk': non_existent_pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_course_link_invalid_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.patch(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_delete_course_link_removes_from_courses(self):
        course1 = Course.objects.create(courseFullName="Test Course 1")
        course2 = Course.objects.create(courseFullName="Test Course 2")
        course1.courselinks.add(self.course_link)
        course2.courselinks.add(self.course_link)

        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        course1.refresh_from_db()
        course2.refresh_from_db()
        self.assertNotIn(self.course_link, course1.courselinks.all())
        self.assertNotIn(self.course_link, course2.courselinks.all())





class CourseDeleteViewTestCase(APITestCase):
    def setUp(self):
        # Create a ClassSection first as it's required for Course
        self.class_section = ClassSection.objects.create(name="Test Section")

        self.course = Course.objects.create(
            courseShortName="Test Course",
            courseFullName="Test Course Full Name",
            courseGlobalCode="TEST001",
            classsection=self.class_section
        )
        self.url = reverse('course_delete', kwargs={'pk': self.course.pk})

    def test_delete_existing_course(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Verify the course is deleted
        with self.assertRaises(Course.DoesNotExist):
            Course.objects.get(pk=self.course.pk)
    
    

    def test_delete_non_existent_course(self):
        non_existent_url = reverse('course_delete', kwargs={'pk': 9999})
        response = self.client.delete(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_method_not_allowed(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_post_method_not_allowed(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_put_method_not_allowed(self):
        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_patch_method_not_allowed(self):
        response = self.client.patch(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
class CourseViewIdEnrollRequestTestCase(APITestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user1 = User.objects.create_user(username='testuser1', password='testpass1')
        self.user2 = User.objects.create_user(username='testuser2', password='testpass2')
        self.course1 = Course.objects.create(courseFullName='Test Course 1', creater=self.user1)
        self.course2 = Course.objects.create(courseFullName='Test Course 2', creater=self.user2)

    def test_get_course(self):
        """
        Test the get method of the CourseViewIdEnrollRequest class.
        """
        url = reverse('CourseViewIdEnrollRequest', args=[self.course1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = CourseSerializerEnrollRequest(self.course1)
        self.assertEqual(response.data, serializer.data)
    def test_enroll_in_course(self):
        """
        Test the put method of the CourseViewIdEnrollRequest class.
        """
        url = reverse('CourseViewIdEnrollRequest', args=[self.course1.id])
        self.client.force_authenticate(user=self.user2)
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIn(self.user2, self.course1.enrolement_requests.all())
        self.assertIn(self.course1, self.user2.dashboard_courses.all())

    def test_enroll_as_course_creator(self):
        """
        Test the put method when the user is the course creator.
        """
        url = reverse('CourseViewIdEnrollRequest', args=[self.course1.id])
        self.client.force_authenticate(user=self.user1)
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertNotIn(self.user1, self.course1.enrolement_requests.all())
        self.assertNotIn(self.course1, self.user1.dashboard_courses.all())

    def test_course_not_found(self):
        """
        Test the get method when the course does not exist.
        """
        url = reverse('CourseViewIdEnrollRequest', args=[999])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



class CreateNewCourseViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.institute1 = Institute.objects.create(name='Institute 1')
        self.institute2 = Institute.objects.create(name='Institute 2')
        self.batch = Batch.objects.create(name='Batch 1', institute=self.institute1, start_date='2023-01-01', end_date='2023-12-31', created_by=self.user)
        self.owner_type = InstitueMemberTypes.objects.create(name='Owner')
        self.admin_type = InstitueMemberTypes.objects.create(name='Admin')
        InstituteMembership.objects.create(user=self.user, institute=self.institute1, user_type=self.owner_type)
        InstituteMembership.objects.create(user=self.user, institute=self.institute2, user_type=self.admin_type)

    def test_create_new_course_success(self):
        client = APIClient()
        client.force_authenticate(user=self.user)

        data = {
            'creater': self.user.id,
            'designedFor': 1,
            'courseShortName': 'TC',
            'courseLocalCode': 'TC-101',
            'courseStartDate': '2023-01-01',
            'courseEndDate': '2023-12-31',
            'educationboard': 'Test Board',
            'subject': 'Test Subject',
            'institutes': [self.institute1.id, self.institute2.id],
            'batch': self.batch.id,
        }

        response = client.post(reverse('create_course'), data, format='json')
        self.assertEqual(response.status_code, 201)
        course = Course.objects.get(id=response.data['id'])
        self.assertIsNotNone(course.id)
        self.assertEqual(course.creater, self.user)

    def test_create_course_without_institutes_and_batch(self):
        """Test creating a course without specifying institutes or batch."""
        client = APIClient()
        client.force_authenticate(user=self.user)

        data = {
            'creater': self.user.id,
            'designedFor': 1,
            'courseShortName': 'Test Course',
            'courseLocalCode': 'TC-101',
            'courseStartDate': '2023-01-01',
            'courseEndDate': '2023-12-31',
            'educationboard': 'Test Board',
            'subject': 'Test Subject',
            # Do not include 'institutes' and 'batch' in the data
            'institutes': [],  # Explicitly set to empty list
            'batch': None,    # Explicitly set to None
        }

        response = client.post(reverse('create_course'), data, format='json')

        # Assert that the course is created successfully
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        course = Course.objects.get(id=response.data['id'])
        self.assertIsNotNone(course)
        self.assertEqual(course.creater, self.user)
        self.assertEqual(course.courseShortName, 'Test Course')
        self.assertIsNone(course.batches.first())  # Ensure no batch is associated
        self.assertEqual(course.institutes.count(), 0)  # Ensure no institutes are associated

    def test_create_course_without_institutes(self):
        """Test creating a course without specifying institutes."""
        client = APIClient()
        client.force_authenticate(user=self.user)

        data = {
            'creater': self.user.id,
            'designedFor': 1,
            'courseShortName': 'Test Course',
            'courseLocalCode': 'TC-102',
            'courseStartDate': '2023-01-01',
            'courseEndDate': '2023-12-31',
            'educationboard': 'Test Board',
            'subject': 'Test Subject',
            # Do not include 'institutes' in the data
            'institutes': None,  # Explicitly set to None
            'batch': self.batch.id,
        }

    def test_create_course_without_institutes_batches(self):
        """Test creating a course without specifying institutes."""
        client = APIClient()
        client.force_authenticate(user=self.user)

        data = {
            'creater': self.user.id,
            'designedFor': 1,
            'courseShortName': 'Test Course',
            'courseLocalCode': 'TC-102',
            'courseStartDate': '2023-01-01',
            'courseEndDate': '2023-12-31',
            'educationboard': 'Test Board',
            'subject': 'Test Subject',
            # Do not include 'institutes' in the data
            'institutes': None,  # Explicitly set to None
            'batch': None,
        }

    def test_create_course_without_batch(self):
        """Test creating a course without specifying a batch."""
        client = APIClient()
        client.force_authenticate(user=self.user)

        data = {
            'creater': self.user.id,
            'designedFor': 1,
            'courseShortName': 'Test Course Without Batch',
            'courseLocalCode': 'TC-103',
            'courseStartDate': '2023-01-01',
            'courseEndDate': '2023-12-31',
            'educationboard': 'Test Board',
            'subject': 'Test Subject',
            'institutes': [self.institute1.id, self.institute2.id],
            'batch': None,  # Explicitly set to None
        }

        response = client.post(reverse('create_course'), data, format='json')

        # Assert that the course is created successfully
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        course = Course.objects.get(id=response.data['id'])
        self.assertIsNotNone(course)
        self.assertEqual(course.creater, self.user)
        self.assertEqual(course.courseShortName, 'Test Course Without Batch')
        self.assertIsNone(course.batches.first())  # Ensure no batch is associated
        self.assertEqual(course.institutes.count(), 2)  # Ensure institutes are associated correctly




class PublicCourseSearchViewTestCase(TestCase):
    def setUp(self):
    # Clear all existing courses
        Course.objects.all().delete()
        CourseDesignedFor.objects.all().delete()

        self.client = APIClient()
        self.url = reverse('PublicCourseSearchView')
        
        # Create test data
        self.designed_for = CourseDesignedFor.objects.create(
            name="Test Design",
            boardofeducation=["Test Board"]
        )
        self.teacher = User.objects.create_user(username='testteacher', password='testpass')
        self.student = User.objects.create_user(username='teststudent', password='testpass')
        
        self.course1 = Course.objects.create(
            courseShortName="Test Course 1",
            courseGlobalCode="101",
            instituteName="Test Institute",
            published=True,
            designedFor=self.designed_for
        )
        self.course1.teachers.add(self.teacher)
        
        self.course2 = Course.objects.create(
            courseShortName="Test Course 2",
            courseGlobalCode="102",
            instituteName="Another Institute",
            published=False,
            designedFor=self.designed_for
        )

    def test_search_published_courses(self):
        response = self.client.get(self.url, {'search': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Add debugging information
        print("Number of results:", len(response.data['results']))
        for course in response.data['results']:
            print(f"Course: {course['courseShortName']}, Published: {course.get('published', 'N/A')}")
        
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['courseShortName'], "Test Course 1")
    
    
    def test_search_unpublished_courses(self):
        response = self.client.get(self.url, {'search': 'Another'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)
class PublicCourseSearchSerializerTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.request = self.factory.get('/')
        self.request.user = self.user

        self.designed_for = CourseDesignedFor.objects.create(
            name="Test Design",
            boardofeducation=["Test Board"]
        )
        self.teacher = User.objects.create_user(username='testteacher', password='testpass')
        self.course = Course.objects.create(
            courseShortName="Test Course",
            courseGlobalCode="101",
            instituteName="Test Institute",
            published=True,
            designedFor=self.designed_for
        )
        self.course.teachers.add(self.teacher)

    def test_serializer_contains_expected_fields(self):
        serializer = PublicCourseSearchSerializer(instance=self.course, context={'request': self.request})
        expected_fields = ['id', 'teachers', 'courseShortName', 'courseGlobalCode', 'courseLocalCode',
                           'courseStatus', 'courseStartDate', 'courseEndDate', 'designedFor', 'educationboard',
                           'subject', 'abouttheCourse', 'instituteName', 'card_cover_image', 'association']
        self.assertEqual(set(serializer.data.keys()), set(expected_fields))

    def test_designed_for_field(self):
        serializer = PublicCourseSearchSerializer(instance=self.course, context={'request': self.request})
        self.assertEqual(serializer.data['designedFor'], "Test Design")

class TeacherSerializerTestCase(TestCase):
    def setUp(self):
        self.teacher = User.objects.create_user(
            username='testteacher',
            password='testpass',
           
        )

    def test_serializer_contains_expected_fields(self):
        serializer = TeacherSerializer(instance=self.teacher)
        expected_fields = ['id', 'username', 'firstname', 'lastname', 'profile_image']
        self.assertEqual(set(serializer.data.keys()), set(expected_fields))


class AddCourseToDashboardViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher = User.objects.create_user(username='testteacher', password='testpass')
        self.student = User.objects.create_user(username='teststudent', password='testpass')
        self.course = Course.objects.create(
            courseShortName="Test Course",
            courseGlobalCode="101",
            instituteName="Test Institute",
            published=True,
            creater=self.teacher
        )
        self.course.teachers.add(self.teacher)
        self.url = reverse('addCourseStudent', args=[self.course.id])

    def test_add_course_to_dashboard_by_student(self):
        self.client.force_authenticate(user=self.student)
        response = self.client.put(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn(self.course, self.student.dashboard_courses.all())
    def test_add_course_to_dashboard_with_invalid_course(self):
        self.client.force_authenticate(user=self.student)
        invalid_url = reverse('addCourseStudent', args=[999])
        response = self.client.put(invalid_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    


