from django.test import TestCase
from django.contrib.auth import get_user_model
from assignment.models import Course, Class, Assignment  # Adjust import according to your app's name

User = get_user_model()  # Import the User model

class AssignmentAPITests(TestCase):
    
    def setUp(self):
        # Set up users
        self.user = User.objects.create_user(username='testuser', password='password')
        
        # Set up courses, classes, and assignments
        self.course = Course.objects.create(
            courseShortName='CS101',  # Correct field name
            courseFullName='Computer Science 101',  # Example value
            courseGlobalCode='CS101-G',  # Example value
            courseLocalCode='CS101-L',  # Example value
            creater=self.user
        )
        
        self.class_instance = Class.objects.create(
            courseId=self.course.id,  # Use the correct value
            serialNo=1,
            status='scheduled',
            datetime='2024-08-10T12:00:00Z',  # example datetime
            duration=60,
            meetingLink='http://example.com',
            address='123 Test St',
            about='Test Class',
            creator=self.user
        )
        
        self.assignment = Assignment.objects.create(
            title='Test Assignment',
            description='Test Description',
            publishDate='2024-08-10',
            dueDate='2024-12-31',
            credit='10',
            class_details=self.class_instance,  # Directly assign the class instance
            creater=self.user,
            status='open'
        )


# from django.urls import reverse
# from django.test import TestCase
# from rest_framework import status
# from rest_framework.test import APITestCase
# from django.contrib.auth import get_user_model
# from course.models import Course
# from eclass.models import Class
# from assignment.models import Assignment, AssignmentAttachment
# import json

# User = get_user_model()

# class AssignmentAPITests(APITestCase):
    
#     def setUp(self):
#         # Set up users
#         self.user = User.objects.create_user(username='testuser', password='password')
        
#         # Set up course
#         self.course = Course.objects.create(courseShortName='CS101', courseFullName='Computer Science 101', creater=self.user)
        
#         # Set up class instance
#         self.class_instance = Class.objects.create(
#             courseId=self.course.id,
#             serialNo=1,
#             status='scheduled',
#             datetime='2024-08-10T12:00:00Z',
#             duration=60,
#             meetingLink='http://example.com',
#             address='123 Test St',
#             about='Test Class',
#             creator=self.user
#         )
        
#         # Set up assignment
#         self.assignment = Assignment.objects.create(
#             title='Test Assignment',
#             description='Test Description',
#             publishDate='2024-08-10',
#             dueDate='2024-12-31',
#             credit='10',
#             class_details=self.class_instance,
#             creater=self.user,
#             status='open'
#         )

#     def test_get_assignments(self):
#         url = reverse('assignments_api:list_assignment', args=[self.course.id])
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)

#     def test_create_assignment(self):
#         url = reverse('assignments_api:create-assignment', args=[self.user.id])
#         data = {
#             'title': 'New Assignment',
#             'description': 'New Description',
#             'course_ids': [self.course.id],
#             'class_id': self.class_instance.id
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Assignment.objects.count(), 2)

#     def test_update_assignment(self):
#         url = reverse('assignments_api:update-assignment', args=[self.assignment.id, self.user.id])
#         data = {
#             'title': 'Updated Assignment',
#             'description': 'Updated Description',
#             'course_ids': [self.course.id],
#             'class_id': self.class_instance.id
#         }
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assignment.refresh_from_db()
#         self.assertEqual(self.assignment.title, 'Updated Assignment')

#     def test_delete_assignment(self):
#         url = reverse('assignments_api:assignment-delete', args=[self.assignment.id])
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(Assignment.objects.count(), 0)

#     def test_filter_assignments(self):
#         url = reverse('assignments_api:assignment-filter') + '?course_id=' + str(self.course.id)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)

#     def test_creator_assignments(self):
#         url = reverse('assignments_api:creator-assignments') + '?user_id=' + str(self.user.id)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)

#     def test_submit_answer_files(self):
#         url = reverse('assignments_api:submit-answer-files', args=[self.assignment.id, self.user.id])
#         data = {
#             'answerFiles': [self.get_test_file()],
#             'answerFilesMeta': json.dumps([{'name': 'test_file', 'description': 'Test file'}])
#         }
#         response = self.client.post(url, data, format='multipart')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#     def test_submission_replace(self):
#         attachment = AssignmentAttachment.objects.create(
#             name='Test Attachment',
#             description='Test Description',
#             afile=self.get_test_file(),
#             uploader=self.user,
#             assignment=self.assignment
#         )
#         url = reverse('assignments_api:replace-assignment-submissions', args=[self.assignment.id, self.user.id, attachment.id])
#         data = {
#             'name': 'Updated Attachment',
#             'description': 'Updated Description'
#         }
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         attachment.refresh_from_db()
#         self.assertEqual(attachment.name, 'Updated Attachment')

#     def test_assignment_submissions(self):
#         url = reverse('assignments_api:assignment-submissions', args=[self.course.id, self.assignment.id])
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)

#     def test_submit_answer_files_question(self):
#         url = reverse('assignments_api:submit-answer-files', args=[self.assignment.id, self.user.id])
#         data = {
#             'answerFiles': [self.get_test_file()],
#             'answerFilesMeta': json.dumps([{'name': 'test_file', 'description': 'Test file'}])
#         }
#         response = self.client.post(url, data, format='multipart')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#     def get_test_file(self):
#         from io import BytesIO
#         from django.core.files.uploadedfile import SimpleUploadedFile
#         return SimpleUploadedFile("test_file.txt", b"This is a test file.")

#     def tearDown(self):
#         self.user.delete()
#         self.course.delete()
#         self.class_instance.delete()
#         self.assignment.delete()





# from django.urls import reverse
# from django.test import TestCase
# from rest_framework import status
# from rest_framework.test import APITestCase
# from django.contrib.auth import get_user_model
# # from .models import Assignment, AssignmentAttachment
# from course.models import Course
# from eclass.models import Class
# from grade.models import Grade
# import json
# from assignment.models import Assignment, AssignmentAttachment
# from django.test import TestCase
# from django.contrib.auth import get_user_model
# from assignment.models import Course, Class, Assignment  # Adjust import according to your app's name

# User = get_user_model()  # This will import the User model based on your project's settings



# class AssignmentAPITests(TestCase):

#     def setUp(self):
#         # Set up users
#         self.user = User.objects.create_user(username='testuser', password='password')
        
#         # Set up courses, classes, and assignments
#         self.course = Course.objects.create(
#             courseShortName='CS101',  # Correct field name
#             courseFullName='Computer Science 101',  # Example value
#             courseGlobalCode='CS101-G',  # Example value
#             courseLocalCode='CS101-L',  # Example value
#             creater=self.user
#         )
        
#         self.class_instance = Class.objects.create(
#             courseId=self.course.id,  # Use the correct value
#             serialNo=1,
#             status='scheduled',
#             datetime='2024-08-10T12:00:00Z',  # example datetime
#             duration=60,
#             meetingLink='http://example.com',
#             address='123 Test St',
#             about='Test Class',
#             creator=self.user
#         )
        
#         self.assignment = Assignment.objects.create(
#             title='Test Assignment',
#             description='Test Description',
#             publishDate='2024-08-10',
#             dueDate='2024-12-31',
#             credit='10',
#             class_details=self.class_instance,  # Directly assign the class instance
#             creater=self.user,
#             status='open'
#         )


# User = get_user_model()

# class AssignmentAPITests(TestCase):
    
#     def setUp(self):
#         # Set up users
#         self.user = User.objects.create_user(username='testuser', password='password')
        
#         # Set up courses, classes, and assignments
#         self.course = Course.objects.create(course_code='CS101', creater=self.user)
#         self.class_instance = Class.objects.create(
#             courseId=1,  # or an appropriate value
#             serialNo=1,
#             status='scheduled',
#             datetime='2024-08-10T12:00:00Z',  # example datetime
#             duration=60,
#             meetingLink='http://example.com',
#             address='123 Test St',
#             about='Test Class',
#             creator=self.user
#         )
        
#         self.assignment = Assignment.objects.create(
#             title='Test Assignment',
#             description='Test Description',
#             publishDate='2024-08-10',
#             dueDate='2024-12-31',
#             credit='10',
#             class_details=self.class_instance,  # Directly assign the class instance
#             creater=self.user,
#             status='open'
#         )

# # # class AssignmentAPITests(APITestCase):
# #     def setUp(self):
# #         self.user = User.objects.create(username='testuser', password='password')
# #         self.course = Course.objects.create(courseGlobalCode='CS101', creater=self.user)
        
# #         # Set up the class instance correctly
# #         self.class_instance = Class.objects.create(
# #             courseId=self.course.id,
# #             serialNo=1,
# #             status='scheduled',
# #             datetime='2024-08-10T12:00:00Z',
# #             duration=60,
# #             meetingLink='https://example.com/meeting',
# #             address='123 Main St',
# #             about='This is a test class.'
# #         )
        
# #         # Create the assignment
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             creater=self.user,
# #             dueDate='2024-12-31',
# #             status='open'
# #         )
# #         self.assignment.class_details.add(self.class_instance)
# #         self.assignment.course_assignments.add(self.course)


# # class AssignmentAPITests(APITestCase):
    
# #     def setUp(self):
# #         # Create a test user
# #         self.user = User.objects.create(username='testuser', password='password')
        
# #         # Create a test course
# #         self.course = Course.objects.create(
# #             courseShortName='CS101',
# #             courseFullName='Computer Science 101',
# #             creater=self.user
# #         )
        
# #         # Create a test class instance
# #         self.class_instance = Class.objects.create(
# #             # Replace 'field1' and 'value1' with actual fields and values from your Class model
# #             field1='value1',
# #             field2='value2'
# #         )
        
# #         # Create a test assignment
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             creater=self.user,
# #             dueDate='2024-12-31',
# #             status='open'
# #         )
        
# #         # Associate the course and class with the assignment
# #         self.assignment.course_assignments.add(self.course)
# #         self.assignment.class_details.add(self.class_instance)
# # class AssignmentAPITests(APITestCase):
    
# #     def setUp(self):
# #         # Create a test user
# #         self.user = User.objects.create(username='testuser', password='password')
        
# #         # Create a test course
# #         self.course = Course.objects.create(
# #             courseShortName='CS101',
# #             courseFullName='Computer Science 101',
# #             creater=self.user
# #         )
        
# #         # Create a test class
# #         self.class_instance = Class.objects.create(
# #             name='Test Class'
# #         )
        
# #         # Create a test assignment
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             creater=self.user,
# #             dueDate='2024-12-31',
# #             status='open'
# #         )
        
# #         # Associate the course and class with the assignment
# #         self.assignment.course_assignments.add(self.course)
# #         self.assignment.class_details.add(self.class_instance)
# # class AssignmentAPITests(APITestCase):
    
# #     # def setUp(self):
# #     #     # Set up users
# #     #     self.user = User.objects.create(username='testuser', password='password')
# #     #     self.admin = User.objects.create_superuser(username='admin', password='adminpass')
# #     def setUp(self):
# #         self.user = User.objects.create(username='testuser', password='password')
# #         self.course = Course.objects.create(course_code='CS101', creater=self.user)
        
# #         # Set up courses, classes, and assignments
# #         self.course = Course.objects.create(name='Test Course', creater=self.user)
# #         self.class_instance = Class.objects.create(name='Test Class')
        
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             course_assignments=[self.course],
# #             class_details=self.class_instance,
# #             creater=self.user,
# #             dueDate='2024-12-31',
# #             status='open'
# #         )

#     def test_get_assignments(self):
#         url = reverse('assignments_api:list_assignment', args=[self.course.id])
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)

#     def test_create_assignment(self):
#         url = reverse('assignments_api:create-assignment', args=[self.user.id])
#         data = {
#             'title': 'New Assignment',
#             'description': 'New Description',
#             'course_ids': [self.course.id],
#             'class_id': self.class_instance.id
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Assignment.objects.count(), 2)

#     def test_update_assignment(self):
#         url = reverse('assignments_api:update-assignment', args=[self.assignment.id, self.user.id])
#         data = {
#             'title': 'Updated Assignment',
#             'description': 'Updated Description',
#             'course_ids': [self.course.id],
#             'class_id': self.class_instance.id
#         }
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assignment.refresh_from_db()
#         self.assertEqual(self.assignment.title, 'Updated Assignment')

#     def test_delete_assignment(self):
#         url = reverse('assignments_api:assignment-delete', args=[self.assignment.id])
#         response = self.client.delete(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(Assignment.objects.count(), 0)

#     def test_filter_assignments(self):
#         url = reverse('assignments_api:assignment-filter') + '?course_id=' + str(self.course.id)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)

#     def test_creator_assignments(self):
#         url = reverse('assignments_api:creator-assignments') + '?user_id=' + str(self.user.id)
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('results', response.data)

#     def test_submit_answer_files(self):
#         url = reverse('assignments_api:submit-answer-files', args=[self.assignment.id, self.user.id])
#         data = {
#             'answerFiles': [self.get_test_file()],
#             'answerFilesMeta': json.dumps([{'name': 'test_file', 'description': 'Test file'}])
#         }
#         response = self.client.post(url, data, format='multipart')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#     def test_submission_replace(self):
#         attachment = AssignmentAttachment.objects.create(
#             name='Test Attachment',
#             description='Test Description',
#             afile=self.get_test_file(),
#             uploader=self.user,
#             assignment=self.assignment
#         )
#         url = reverse('assignments_api:replace-assignment-submissions', args=[self.assignment.id, self.user.id, attachment.id])
#         data = {
#             'name': 'Updated Attachment',
#             'description': 'Updated Description'
#         }
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         attachment.refresh_from_db()
#         self.assertEqual(attachment.name, 'Updated Attachment')

    def test_assignment_submissions(self):
        url = reverse('assignments_api:assignment-submissions', args=[self.course.id, self.assignment.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)

    def test_submit_answer_files_question(self):
        url = reverse('assignments_api:submit-answer-files', args=[self.assignment.id, self.user.id])
        data = {
            'answerFiles': [self.get_test_file()],
            'answerFilesMeta': json.dumps([{'name': 'test_file', 'description': 'Test file'}])
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def get_test_file(self):
        from io import BytesIO
        from django.core.files.uploadedfile import SimpleUploadedFile
        return SimpleUploadedFile("test_file.txt", b"This is a test file.")

    def tearDown(self):
        self.user.delete()
        self.admin.delete()
        self.course.delete()
        self.class_instance.delete()
        self.assignment.delete()



# # from django.test import TestCase
# # from rest_framework.test import APITestCase
# # from django.urls import reverse
# # from rest_framework import status
# # from django.contrib.auth import get_user_model
# # # from .models import Assignment, AssignmentAttachment, Course, Class, Grade
# # from django.utils import timezone
# # import json
# # from assignment.models import Assignment, AssignmentAttachment, Course, Class, Grade


# # User = get_user_model()

# # class AssignmentModelTests(TestCase):
# #     def setUp(self):
# #         self.user = User.objects.create_user(username='testuser', password='12345')
# #         self.course = Course.objects.create(courseShortName='TEST101', courseFullName='Test Course')
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             publishDate=timezone.now(),
# #             dueDate=timezone.now() + timezone.timedelta(days=7),
# #             credit=10,
# #             creater=self.user
# #         )

# #     def test_assignment_creation(self):
# #         self.assertTrue(isinstance(self.assignment, Assignment))
# #         self.assertEqual(self.assignment.__str__(), self.assignment.title)

# # class AssignmentAPITests(APITestCase):
# #     def setUp(self):
# #         self.user = User.objects.create_user(username='testuser', password='12345')
# #         self.course = Course.objects.create(courseShortName='TEST101', courseFullName='Test Course')
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             publishDate=timezone.now(),
# #             dueDate=timezone.now() + timezone.timedelta(days=7),
# #             credit=10,
# #             creater=self.user
# #         )
# #         self.course.assignments.add(self.assignment)
# #         self.client.force_authenticate(user=self.user)

# #     def test_get_assignment_list(self):
# #         url = reverse('assignments_api:list_assignment', kwargs={'courseId': self.course.id})
# #         response = self.client.get(url)
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         self.assertEqual(len(response.data), 1)

# #     def test_create_assignment(self):
# #         url = reverse('assignments_api:create-assignment', kwargs={'user_id': self.user.id})
# #         data = {
# #             'title': 'New Assignment',
# #             'description': 'New Description',
# #             'publishDate': timezone.now().isoformat(),
# #             'dueDate': (timezone.now() + timezone.timedelta(days=7)).isoformat(),
# #             'credit': 15,
# #             'course_ids': [self.course.id],
# #         }
# #         response = self.client.post(url, data, format='json')
# #         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
# #         self.assertEqual(Assignment.objects.count(), 2)

# #     def test_update_assignment(self):
# #         url = reverse('assignments_api:update-assignment', kwargs={'pk': self.assignment.id, 'user_id': self.user.id})
# #         data = {
# #             'title': 'Updated Assignment',
# #             'description': 'Updated Description',
# #         }
# #         response = self.client.put(url, data, format='json')
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         self.assignment.refresh_from_db()
# #         self.assertEqual(self.assignment.title, 'Updated Assignment')

# #     def test_delete_assignment(self):
# #         url = reverse('assignments_api:assignment-delete', kwargs={'pk': self.assignment.id})
# #         response = self.client.delete(url)
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         self.assertEqual(Assignment.objects.count(), 0)

# #     def test_assignment_detail(self):
# #         url = reverse('assignments_api:assignment-detail', kwargs={'pk': self.assignment.id})
# #         response = self.client.get(url)
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         self.assertEqual(response.data['title'], self.assignment.title)

# #     def test_assignment_filter(self):
# #         url = reverse('assignments_api:assignment-filter')
# #         response = self.client.get(url, {'course_id': self.course.id})
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         self.assertEqual(len(response.data['results']), 1)

# #     def test_submit_answer_files(self):
# #         url = reverse('assignments_api:submit-answer-files', kwargs={'assignment_id': self.assignment.id, 'user_id': self.user.id})
# #         data = {
# #             'answerFiles': [
# #                 {'name': 'answer1.txt', 'description': 'Answer 1'}
# #             ],
# #             'answerFilesMeta': json.dumps([{'name': 'answer1.txt', 'description': 'Answer 1'}])
# #         }
# #         response = self.client.post(url, data, format='multipart')
# #         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
# #         self.assertEqual(self.assignment.answerFiles.count(), 1)

# #     def test_replace_assignment_submission(self):
# #         attachment = AssignmentAttachment.objects.create(
# #             name='original.txt',
# #             description='Original file',
# #             assignment=self.assignment,
# #             uploader=self.user
# #         )
# #         url = reverse('assignments_api:replace-assignment-submissions', 
# #                       kwargs={'assignment_id': self.assignment.id, 'user_id': self.user.id, 'attachment_id': attachment.id})
# #         data = {
# #             'name': 'updated.txt',
# #             'description': 'Updated file'
# #         }
# #         response = self.client.put(url, data, format='json')
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         attachment.refresh_from_db()
# #         self.assertEqual(attachment.name, 'updated.txt')

# #     def test_assignment_submissions(self):
# #         AssignmentAttachment.objects.create(
# #             name='submission.txt',
# #             description='Submission file',
# #             assignment=self.assignment,
# #             uploader=self.user
# #         )
# #         url = reverse('assignments_api:assignment-submissions', 
# #                       kwargs={'course_id': self.course.id, 'assignment_id': self.assignment.id})
# #         response = self.client.get(url)
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         self.assertEqual(len(response.data), 1)  # One submission

# #     def test_creator_assignments(self):
# #         url = reverse('assignments_api:creator-assignments')
# #         response = self.client.get(url, {'user_id': self.user.id})
# #         self.assertEqual(response.status_code, status.HTTP_200_OK)
# #         self.assertEqual(len(response.data['results']), 1)

# # class AssignmentSerializerTests(TestCase):
# #     def setUp(self):
# #         self.user = User.objects.create_user(username='testuser', password='12345')
# #         self.course = Course.objects.create(courseShortName='TEST101', courseFullName='Test Course')
# #         self.assignment_data = {
# #             'title': 'Test Assignment',
# #             'description': 'Test Description',
# #             'publishDate': timezone.now(),
# #             'dueDate': timezone.now() + timezone.timedelta(days=7),
# #             'credit': 10,
# #             'creater': self.user,
# #             'course_ids': [self.course.id],
# #         }

# #     def test_assignment_serializer(self):
# #         serializer = AssignmentSerializer(data=self.assignment_data)
# #         self.assertTrue(serializer.is_valid())
# #         assignment = serializer.save()
# #         self.assertEqual(assignment.title, 'Test Assignment')
# #         self.assertEqual(assignment.course_assignments.first(), self.course)

# #     def test_assignment_update_serializer(self):
# #         assignment = Assignment.objects.create(**self.assignment_data)
# #         update_data = {
# #             'title': 'Updated Assignment',
# #             'description': 'Updated Description',
# #         }
# #         serializer = AssignmentUpdateSerializer(assignment, data=update_data, partial=True)
# #         self.assertTrue(serializer.is_valid())
# #         updated_assignment = serializer.save()
# #         self.assertEqual(updated_assignment.title, 'Updated Assignment')
# #         self.assertEqual(updated_assignment.description, 'Updated Description')

# # class AssignmentAttachmentTests(TestCase):
# #     def setUp(self):
# #         self.user = User.objects.create_user(username='testuser', password='12345')
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             publishDate=timezone.now(),
# #             dueDate=timezone.now() + timezone.timedelta(days=7),
# #             credit=10,
# #             creater=self.user
# #         )

# #     def test_create_attachment(self):
# #         attachment = AssignmentAttachment.objects.create(
# #             name='test.txt',
# #             description='Test file',
# #             assignment=self.assignment,
# #             uploader=self.user
# #         )
# #         self.assertTrue(isinstance(attachment, AssignmentAttachment))
# #         self.assertEqual(attachment.name, 'test.txt')
# #         self.assertEqual(attachment.assignment, self.assignment)

# #     def test_attachment_serializer(self):
# #         attachment = AssignmentAttachment.objects.create(
# #             name='test.txt',
# #             description='Test file',
# #             assignment=self.assignment,
# #             uploader=self.user
# #         )
# #         serializer = AssignmentAttachmentSerializer(attachment)
# #         data = serializer.data
# #         self.assertEqual(data['name'], 'test.txt')
# #         self.assertEqual(data['description'], 'Test file')

# # class GradeTests(TestCase):
# #     def setUp(self):
# #         self.user = User.objects.create_user(username='testuser', password='12345')
# #         self.assignment = Assignment.objects.create(
# #             title='Test Assignment',
# #             description='Test Description',
# #             publishDate=timezone.now(),
# #             dueDate=timezone.now() + timezone.timedelta(days=7),
# #             credit=10,
# #             creater=self.user
# #         )
# #         self.attachment = AssignmentAttachment.objects.create(
# #             name='test.txt',
# #             description='Test file',
# #             assignment=self.assignment,
# #             uploader=self.user
# #         )

# #     def test_create_grade(self):
# #         grade = Grade.objects.create(
# #             grade_value=85,
# #             comments='Good work',
# #             added_by=self.user,
# #             student=self.user,
# #             assignment=self.assignment,
# #             answer_file=self.attachment
# #         )
# #         self.assertTrue(isinstance(grade, Grade))
# #         self.assertEqual(grade.grade_value, 85)
# #         self.assertEqual(grade.assignment, self.assignment)

# #     def test_grade_serializer(self):
# #         grade = Grade.objects.create(
# #             grade_value=85,
# #             comments='Good work',
# #             added_by=self.user,
# #             student=self.user,
# #             assignment=self.assignment,
# #             answer_file=self.attachment
# #         )
# #         serializer = GradeSerializer(grade)
# #         data = serializer.data
# #         self.assertEqual(data['grade_value'], 85)
# #         self.assertEqual(data['comments'], 'Good work')