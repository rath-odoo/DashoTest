from django.shortcuts import render
from django.db import transaction
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import RetrieveAPIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import GetAssignmentSerializer, CreateAssignmentSerializer, UserSubmissionDetailSerializer
from .serializers import AssignmentSerializer, AssignmentUpdateSerializer, ClassSerializer, CourseSerializer, AssignmentListSerializer
from .serializers import AssignmentAnswerAttachmentSerializer, UserSubmissionSerializer, AssignmentAttachmentSerializer, GradeSerializer
from .serializers import AssignmentDetailSerializer, UserSubmissionDetailSerializerst
from .models import Assignment, AssignmentAttachment
from course.models import Course
from eclass.models import Class
from grade.models import Grade
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from django.utils import timezone
import json
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import NotFound

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # Adjust as needed
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class GetAssignmentView(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]    
    model = Assignment
    serializer_class = GetAssignmentSerializer
    def get_queryset(self):
        courseId = self.kwargs['courseId']
        courseObj = Course.objects.get(pk=courseId);
        return courseObj.assignments.all()


#class CreateAssignmentView(generics.ListCreateAPIView):
#permission_classes = [IsAuthenticated]    
#    model = Assignment
#    serializer_class = CreateAssignmentSerializer
#    def get_queryset(self):
#        courseId = self.kwargs['courseId']
#        courseObj = Course.objects.get(pk=courseId);
#        return courseObj.assignments.all()



class CreateAssignmentView(APIView):
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CreateAssignmentSerializer(Object)
        return Response(serializer.data)
      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = CreateAssignmentSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AssignmentCreateView(CreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)

        course_ids = self.request.data.getlist('course_ids')
        class_id = self.request.data.get('class_id')

        assignment = serializer.save(creater=user)

        if class_id:
            class_instance = get_object_or_404(Class, pk=class_id)
            assignment.class_details = class_instance
            assignment.save()

        if course_ids:
            courses = Course.objects.filter(pk__in=course_ids)
            for course in courses:
                course.assignments.add(assignment)

        # Handle question files and metadata
        question_files_data = self.request.FILES.getlist('questionFiles')
        question_files_meta = json.loads(self.request.data.get('questionFilesMeta', '[]')) if 'questionFilesMeta' in self.request.data else []

        question_attachments = []
        for idx in range(max(len(question_files_data), len(question_files_meta))):
            meta = question_files_meta[idx] if idx < len(question_files_meta) else {}
            file = question_files_data[idx] if idx < len(question_files_data) else None
            attachment = AssignmentAttachment.objects.create(
                name=meta.get('name', file.name if file else 'No file name'),
                description=meta.get('description', ''),
                afile=file,
                uploader=user,
                assignment=assignment
            )
            question_attachments.append(attachment)
        if question_attachments:
            assignment.questionFiles.set(question_attachments)

        # Handle answer files and metadata
        answer_files_data = self.request.FILES.getlist('answerFiles')
        answer_files_meta = json.loads(self.request.data.get('answerFilesMeta', '[]')) if 'answerFilesMeta' in self.request.data else []
        answer_attachments = []
        for idx in range(max(len(answer_files_data), len(answer_files_meta))):
            meta = answer_files_meta[idx] if idx < len(answer_files_meta) else {}
            file = answer_files_data[idx] if idx < len(answer_files_data) else None
            attachment = AssignmentAttachment.objects.create(
                name=meta.get('name', file.name if file else 'No file name'),
                description=meta.get('description', ''),
                afile=file,
                uploader=user,
                assignment=assignment
            )
            answer_attachments.append(attachment)
        if answer_attachments:
            assignment.answerFiles.set(answer_attachments)
        assignment.refresh_from_db()

class AssignmentUpdateView(UpdateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentUpdateSerializer

    def perform_update(self, serializer):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, pk=user_id)
        instance = serializer.save()

        # Handle course_ids separately
        course_ids = self.request.data.getlist('course_ids')
        if course_ids:
            courses = Course.objects.filter(pk__in=course_ids)
            instance.course_assignments.set(courses)

        # Handle class_id separately
        class_id = self.request.data.get('class_id')
        if class_id:
            class_instance = get_object_or_404(Class, pk=class_id)
            instance.class_details = class_instance
            instance.save()

        # Handle question files and metadata
        question_files_meta = json.loads(self.request.data.get('questionFilesMeta', '[]'))
        question_files_data = self.request.FILES.getlist('questionFiles')
        if question_files_meta or question_files_data:
            existing_question_files = list(instance.questionFiles.all())
            question_attachments = []

            for idx in range(max(len(question_files_data), len(question_files_meta))):
                meta = question_files_meta[idx] if idx < len(question_files_meta) else {}
                file = question_files_data[idx] if idx < len(question_files_data) else None
                attachment_id = meta.get('id')
                if attachment_id:
                    try:
                        attachment = AssignmentAttachment.objects.get(pk=attachment_id)
                        attachment.name = meta.get('name', attachment.name)
                        attachment.description = meta.get('description', attachment.description)
                        if file:
                            attachment.afile = file
                        attachment.uploader = user
                        attachment.assignment = instance
                        attachment.save()
                    except AssignmentAttachment.DoesNotExist:
                        attachment = AssignmentAttachment.objects.create(
                            name=meta.get('name', file.name if file else 'No file name'),
                            description=meta.get('description', ''),
                            afile=file,
                            uploader=user,
                            assignment=instance
                        )
                else:
                    attachment = AssignmentAttachment.objects.create(
                        name=meta.get('name', file.name if file else 'No file name'),
                        description=meta.get('description', ''),
                        afile=file,
                        uploader=user,
                        assignment=instance
                    )
                question_attachments.append(attachment)
            instance.questionFiles.set(existing_question_files + question_attachments)

        # Handle answer files and metadata
        answer_files_meta = json.loads(self.request.data.get('answerFilesMeta', '[]'))
        answer_files_data = self.request.FILES.getlist('answerFiles')
        if answer_files_meta or answer_files_data:
            existing_answer_files = list(instance.answerFiles.all())
            answer_attachments = []

            for idx in range(max(len(answer_files_data), len(answer_files_meta))):
                meta = answer_files_meta[idx] if idx < len(answer_files_meta) else {}
                file = answer_files_data[idx] if idx < len(answer_files_data) else None
                attachment_id = meta.get('id')
                if attachment_id:
                    try:
                        attachment = AssignmentAttachment.objects.get(pk=attachment_id)
                        attachment.name = meta.get('name', attachment.name)
                        attachment.description = meta.get('description', attachment.description)
                        if file:
                            attachment.afile = file
                        attachment.uploader = user
                        attachment.assignment = instance
                        attachment.save()
                    except AssignmentAttachment.DoesNotExist:
                        attachment = AssignmentAttachment.objects.create(
                            name=meta.get('name', file.name if file else 'No file name'),
                            description=meta.get('description', ''),
                            afile=file,
                            uploader=user,
                            assignment=instance
                        )
                else:
                    attachment = AssignmentAttachment.objects.create(
                        name=meta.get('name', file.name if file else 'No file name'),
                        description=meta.get('description', ''),
                        afile=file,
                        uploader=user,
                        assignment=instance
                    )
                answer_attachments.append(attachment)
            instance.answerFiles.set(existing_answer_files + answer_attachments)

        # Refresh the assignment instance to update status if necessary
        instance.refresh_from_db()


class AssignmentAttachmentDeleteView(DestroyAPIView):
    queryset = AssignmentAttachment.objects.all()
    # permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        attachment_id = kwargs.get('attachment_id')
        attachment = get_object_or_404(AssignmentAttachment, id=attachment_id)

        # Ensure the user has permission to delete the attachment
        assignment = attachment.assignment
        # # Check if the user is the creator of the assignment or a staff member
        # if request.user != assignment.creater and not request.user.is_staff:
        #     return Response({"detail": "You don't have permission to delete this attachment."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the attachment
        attachment.delete()
        return Response({
            "detail": "Attachment deleted successfully"}, 
            status=status.HTTP_200_OK)

class AssignmentDeleteView(DestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def destroy(self, request, *args, **kwargs):
        # Get the assignment instance
        assignment = self.get_object()

        # Check if the user is the creator of the assignment or a staff member
        # if request.user != assignment.creater and not request.user.is_staff:
        #     return Response({
        #         "detail": "You don't have permission to delete this assignment."
        #         }, status=status.HTTP_403_FORBIDDEN)

        # Delete all attachments related to the assignment
        assignment.attachments.all().delete()

        # Delete the assignment
        assignment.delete()

        # Return a custom response
        return Response({
            "detail": "Assignment deleted successfully"}, 
                status=status.HTTP_200_OK)

class AssignmentDetailView(RetrieveAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentDetailSerializer
    lookup_field = 'pk'

class AssignmentFilterView(APIView):
    pagination_class = StandardResultsSetPagination

    def get(self, request, *args, **kwargs):
        course_id = request.query_params.get('course_id')
        class_id = request.query_params.get('class_id')
        assignment_id = request.query_params.get('assignment_id')
        try:
            if course_id and not class_id and not assignment_id:
                # Return all assignments associated with the course
                course = get_object_or_404(Course, pk=course_id)
                assignments = course.assignments.all()
            elif course_id and class_id and not assignment_id:
                # Retrieve assignments associated with the specific course and class
                specific_class = get_object_or_404(Class, pk=class_id)
                assignments = Assignment.objects.filter(course_assignments__id=course_id, class_details=specific_class)
            elif course_id and not class_id and assignment_id:
                # Provide details of a specific assignment if it belongs to the specified course
                assignment = get_object_or_404(Assignment, pk=assignment_id, course_assignments__id=course_id)
                serializer = AssignmentSerializer(assignment, context={'request': request})
                return Response(serializer.data)

            elif not course_id and not class_id and not assignment_id:
                # If no course_id is provided, return all courses
                courses = Course.objects.all()
                paginator = self.pagination_class()
                page = paginator.paginate_queryset(courses, request)
                if page is not None:
                    serializer = CourseSerializer(page, many=True, context={'request': request})
                    return paginator.get_paginated_response(serializer.data)
                else:
                    raise NotFound("Requested page not found")

            else:
                return Response({"error": "Invalid parameters provided"}, status=400)

            paginator = self.pagination_class()
            page = paginator.paginate_queryset(assignments, request)
            if page is not None:
                serializer = AssignmentListSerializer(page, many=True, context={'request': request})
                return paginator.get_paginated_response(serializer.data)
            else:
                raise NotFound("Requested page not found")

        except NotFound as e:
            return Response({"error": str(e)}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class SubmitAnswerFilesView(APIView):
    def post(self, request, assignment_id, user_id):
        assignment = get_object_or_404(Assignment, pk=assignment_id)
        user = get_object_or_404(User, pk=user_id)

        # Check if the due date has passed
        if timezone.now().date() > assignment.dueDate:
            return Response({"detail": "Assignment due date has passed. Submissions are not allowed."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure that the assignment is still open for submissions
        if assignment.status != 'open':
            return Response({"detail": "Assignment submissions are closed."}, status=status.HTTP_400_BAD_REQUEST)

        # Handle answer files and metadata
        answer_files_data = request.FILES.getlist('answerFiles')
        answer_files_meta = json.loads(request.data.get('answerFilesMeta', '[]'))
        if not answer_files_data or not answer_files_meta:
            return Response({"detail": "Files or metadata missing."}, status=status.HTTP_400_BAD_REQUEST)

        if len(answer_files_data) != len(answer_files_meta):
            return Response({"detail": "Number of files and metadata entries do not match."}, status=status.HTTP_400_BAD_REQUEST)

        answer_attachments = []
        for idx, file in enumerate(answer_files_data):
            meta = answer_files_meta[idx]
            attachment = AssignmentAttachment.objects.create(
                name=meta.get('name', file.name),
                description=meta.get('description', ''),
                afile=file,
                uploader=user,
                assignment=assignment
            )
            answer_attachments.append(attachment)

        # Add the uploaded files to the assignment's `answerFiles` field
        assignment.answerFiles.add(*answer_attachments)

        # Increment submission count if this is the user's first submission
        if not assignment.answerFiles.filter(uploader=user).exists():
            assignment.no_of_students_submitted += 1
            assignment.save()

        return Response(AssignmentAnswerAttachmentSerializer(answer_attachments, many=True).data, status=status.HTTP_201_CREATED)


class AssignmentSubmissionReplaceView(APIView):
    def put(self, request, assignment_id, user_id, attachment_id):
        assignment = get_object_or_404(Assignment, pk=assignment_id)
        user = get_object_or_404(User, pk=user_id)
        attachment = get_object_or_404(AssignmentAttachment, pk=attachment_id, uploader=user, assignment=assignment)

        # Check if the due date has passed
        if timezone.now().date() > assignment.dueDate:
            return Response({"detail": "Assignment due date has passed. Replacements are not allowed."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the assignment is still open for submissions
        if assignment.status != 'open':
            return Response({"detail": "Assignment submissions are closed."}, status=status.HTTP_400_BAD_REQUEST)

        # Update the specific file
        serializer = AssignmentAnswerAttachmentSerializer(
            attachment,
            data=request.data,
            partial=True,
            context={'uploader': user, 'assignment': assignment}
        )

        if serializer.is_valid():
            updated_attachment = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CreatorAssignmentsView(APIView):
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        course_id = request.query_params.get('course_id')
        user_id = request.query_params.get('user_id')
        status_filter = request.query_params.get('status')
        assignment_id = request.query_params.get('assignment_id')

        if not user_id:
            return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, pk=user_id)

        if course_id:
            course = get_object_or_404(Course, pk=course_id)
            if user != course.creater and not course.teachers.filter(pk=user.pk).exists():
                return Response({"detail": "User is not authorized to view assignments for this course."}, status=status.HTTP_403_FORBIDDEN)
            assignments = course.assignments.all()
            enrolled_students = course.enrolled_students.all()
        else:
            assignments = Assignment.objects.filter(creater=user)
            enrolled_students = User.objects.none()

        if status_filter:
            assignments = assignments.filter(status=status_filter.lower())

        paginator = self.pagination_class()

        if assignment_id:
            assignment = get_object_or_404(assignments, pk=assignment_id)
            question_files = assignment.questionFiles.all()

            if not enrolled_students.exists():
                enrolled_students = User.objects.filter(enrolled_courses__assignments=assignment).distinct()

            submissions = []
            for student in enrolled_students:
                user_files = assignment.answerFiles.filter(uploader=student)
                grades = Grade.objects.filter(answer_file__in=user_files)
                submissions.append({
                    "user": student,
                    "answer_files_with_grades": [
                        {"answer_file": file, "grade": grades.filter(answer_file=file).first()} for file in user_files
                    ],
                })

            paginated_submissions = paginator.paginate_queryset(submissions, request)

            assignment_serializer = AssignmentSerializer(assignment, context={'request': request})
            question_files_serializer = AssignmentAttachmentSerializer(question_files, many=True, context={'request': request})
            submission_serializer = UserSubmissionDetailSerializer(paginated_submissions, many=True, context={'request': request})

            return paginator.get_paginated_response({
                "assignment": assignment_serializer.data,
                "question_files": question_files_serializer.data,
                "submissions": submission_serializer.data
            })

        paginated_assignments = paginator.paginate_queryset(assignments, request)
        assignment_list_serializer = AssignmentListSerializer(paginated_assignments, many=True, context={'request': request})
        return paginator.get_paginated_response(assignment_list_serializer.data)

           
class AssignmentSubmissionsView(APIView):
    def get(self, request, course_id, assignment_id):
        # Validate and fetch course
        course = get_object_or_404(Course, pk=course_id)

        if not course.assignments.filter(pk=assignment_id).exists():
            return Response({"detail": "The assignment is not associated with this course."}, status=status.HTTP_404_NOT_FOUND)

        # Fetch the assignment itself
        assignment = get_object_or_404(Assignment, pk=assignment_id)

        # Retrieve an optional user_id filter
        user_id = request.query_params.get('user_id')

        submissions_data = []

        def get_answer_files_with_grades(user, assignment):
            answer_files = assignment.answerFiles.filter(uploader=user)
            answer_files_with_grades = []
            for answer_file in answer_files:
                grade = Grade.objects.filter(student=user, assignment=assignment).first()  # Assuming one grade per assignment
                answer_files_with_grades.append({
                    "answer_file": answer_file,
                    "grade": grade
                })
            return answer_files_with_grades

        if user_id:
            # Filter submissions by a specific user
            user = get_object_or_404(User, pk=user_id)
            question_files = assignment.questionFiles.all()
            answer_files_with_grades = get_answer_files_with_grades(user, assignment)
            user_data = {
                "user": user,
                "question_files": question_files,
                "answer_files_with_grades": answer_files_with_grades
            }
            serializer = UserSubmissionDetailSerializerst(user_data)
            return Response(serializer.data)
        else:
            # Get submissions for all enrolled students in the course
            enrolled_students = course.enrolled_students.all()
            for student in enrolled_students:
                question_files = assignment.questionFiles.all()
                answer_files_with_grades = get_answer_files_with_grades(student, assignment)
                submissions_data.append({
                    "user": student,
                    "question_files": question_files,
                    "answer_files_with_grades": answer_files_with_grades
                })
            serializer = UserSubmissionDetailSerializerst(submissions_data, many=True)
            return Response(serializer.data)


class SubmitAnswerFilesQuestionView(APIView):
    def post(self, request, assignment_id, user_id, question_file_id):
        assignment = get_object_or_404(Assignment, pk=assignment_id)
        user = get_object_or_404(User, pk=user_id)
        question_file = get_object_or_404(AssignmentAttachment, pk=question_file_id)

        # Check if the question file belongs to the assignment
        if not assignment.questionFiles.filter(pk=question_file_id).exists():
            return Response({"detail": "Invalid question ID for this assignment."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the due date has passed
        if timezone.now().date() > assignment.dueDate:
            return Response({"detail": "Assignment due date has passed. Submissions are not allowed."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure that the assignment is still open for submissions
        if assignment.status != 'open':
            return Response({"detail": "Assignment submissions are closed."}, status=status.HTTP_400_BAD_REQUEST)

        # Handle answer files and metadata
        answer_files_data = request.FILES.getlist('answerFiles')
        answer_files_meta = json.loads(request.data.get('answerFilesMeta', '[]'))
        if not answer_files_data or not answer_files_meta:
            return Response({"detail": "Files or metadata missing."}, status=status.HTTP_400_BAD_REQUEST)

        if len(answer_files_data) != len(answer_files_meta):
            return Response({"detail": "Number of files and metadata entries do not match."}, status=status.HTTP_400_BAD_REQUEST)

        answer_attachments = []
        try:
            with transaction.atomic():
                for idx, file in enumerate(answer_files_data):
                    meta = answer_files_meta[idx]
                    attachment = AssignmentAttachment.objects.create(
                        name=meta.get('name', file.name),
                        description=meta.get('description', ''),
                        afile=file,
                        uploader=user,
                        assignment=assignment
                    )
                    answer_attachments.append(attachment)
                
                # Add the uploaded files to the assignment's `answerFiles` field
                assignment.answerFiles.add(*answer_attachments)

                # Increment submission count if this is the user's first submission for this question
                if not assignment.answerFiles.filter(uploader=user, id__in=[a.id for a in answer_attachments]).exists():
                    assignment.no_of_students_submitted += 1
                    assignment.save()

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(AssignmentAnswerAttachmentSerializer(answer_attachments, many=True).data, status=status.HTTP_201_CREATED)
