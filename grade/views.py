from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Grade
from institute.models import Institute , Batch
from course.models import Course
from eclass.models import Class 
from exam.models import Exam
from assignment.models import Assignment, AssignmentAttachment
from .serializers import GradeCreateSerializer, CourseSerializer, ClassSerializer, ExamSerializer, GradeAssignmentCreateSerializer, BulkGradeCreateSerializer, GradeSerializer, GradeUploadSerializer
from django.contrib.auth import get_user_model
from rest_framework.pagination import PageNumberPagination
import pandas as pd

User = get_user_model()
class GradeCreateView(APIView):
    def post(self, request, *args, **kwargs):
        # Initialize the serializer with the incoming data
        serializer = GradeCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            # Save the grade, associating the current user as the one who added it
            grade = serializer.save(added_by=request.user)
            return Response({'message': 'Grade created successfully', 'grade_id': grade.id}, status=status.HTTP_201_CREATED)
        else:
            # Handle validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BulkGradeCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BulkGradeCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            grades = serializer.save()
            return Response({'message': 'Grades created successfully', 'grades': [grade.id for grade in grades]}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class GradeUpdateView(APIView):
    def put(self, request, grade_id, *args, **kwargs):
        # Get the existing grade object or return 404 if not found
        grade = get_object_or_404(Grade, pk=grade_id)
        
        # Initialize the serializer with the existing instance and new data
        serializer = GradeCreateSerializer(grade, data=request.data, partial=True)
        
        if serializer.is_valid():
            # Save the changes and update the `updated_date` field
            serializer.save()
            return Response({'message': 'Grade updated successfully', 'grade_id': grade.id}, status=status.HTTP_200_OK)
        else:
            # Handle validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class GradeDeleteView(APIView):
    def delete(self, request, grade_id, *args, **kwargs):
        # Fetch the specific grade by ID or return 404
        grade = get_object_or_404(Grade, pk=grade_id)

        # Delete the grade instance
        grade.delete()

        # Return a success response
        return Response({'message': 'Grade deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
class HierarchicalGradeFilterView(APIView):
    def get(self, request, *args, **kwargs):
        institute_id = request.query_params.get('institute_id')
        course_id = request.query_params.get('course_id')
        class_id = request.query_params.get('class_id')
        exam_id = request.query_params.get('exam_id')
        user_id = request.query_params.get('user_id')
        batch_id = request.query_params.get('batch_id')
        sub_exam_id = request.query_params.get('sub_exam_id')

        if user_id:
            # Retrieve comprehensive information for a specific student's grades
            queryset = Grade.objects.filter(student_id=user_id)
            if institute_id:
                queryset = queryset.filter(institute_id=institute_id)
            if course_id:
                queryset = queryset.filter(course_id=course_id)
            if class_id:
                queryset = queryset.filter(class_details_id=class_id)
            if exam_id:
                queryset = queryset.filter(exam_id=exam_id)
            if batch_id:
                queryset = queryset.filter(batch_id=batch_id)
            if sub_exam_id:
                queryset = queryset.filter(sub_exam_id=sub_exam_id)

            # Serialize and return the detailed grade data
            serializer = GradeCreateSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Otherwise, return hierarchical data based on the other parameters
        data = {}
        if institute_id:
            institute = get_object_or_404(Institute, pk=institute_id)
            courses = institute.courses.all()
            data['courses'] = CourseSerializer(courses, many=True).data

        if course_id:
            course = get_object_or_404(Course, pk=course_id)
            classes = course.classes.all()
            data['classes'] = ClassSerializer(classes, many=True).data

        if class_id:
            class_instance = get_object_or_404(Class, pk=class_id)
            exams = class_instance.class_exams.all()
            data['exams'] = ExamSerializer(exams, many=True).data

        if exam_id:
            exam = get_object_or_404(Exam, pk=exam_id)
            grades = Grade.objects.filter(exam_id=exam_id)
            if batch_id:
                grades = grades.filter(batch_id=batch_id)
            if sub_exam_id:
                grades = grades.filter(sub_exam_id=sub_exam_id)
            data['grades'] = GradeCreateSerializer(grades, many=True).data

        return Response(data, status=status.HTTP_200_OK)

    
class AddGradeView(APIView):
    def post(self, request, assignment_id, user_id):
        # Retrieve the assignment and related user
        assignment = get_object_or_404(Assignment, pk=assignment_id)
        user = get_object_or_404(User, pk=user_id)

        # Fetch all courses linked to this assignment
        courses = Course.objects.filter(assignments=assignment)

        # Check if the user is authorized (creator or teacher in any associated course)
        is_authorized = any(
            user == course.creater or user in course.teachers.all()
            for course in courses
        )
        if not is_authorized:
            return Response({"detail": "You are not authorized to add grades for this assignment."}, status=status.HTTP_403_FORBIDDEN)

        # Process grade input data
        serializer = GradeAssignmentCreateSerializer(data=request.data)
        if serializer.is_valid():
            grade_data = serializer.validated_data
            student = grade_data['student']
            exam = grade_data.get('exam', None)
            sub_exam = grade_data.get('sub_exam', None)

            # Update or create grade and ensure all related answer files have the same grade
            grade_value = grade_data['grade_value']
            comments = grade_data.get('comments', '')
            added_by = user

            # Get all answer files submitted by the student for the assignment
            answer_files = AssignmentAttachment.objects.filter(assignment=assignment, uploader=student)

            for answer_file in answer_files:
                Grade.objects.update_or_create(
                    course=courses[0],
                    class_details=assignment.class_details,
                    exam=exam,
                    sub_exam=sub_exam,
                    assignment=assignment,
                    answer_file=answer_file,
                    student=student,
                    defaults={
                        'grade_value': grade_value,
                        'comments': comments,
                        'added_by': added_by
                    }
                )

            return Response({"detail": "Grade added successfully."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GradeFilterPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    max_page_size = 100

class GradeFilterView(APIView):
    def get(self, request, *args, **kwargs):
        institute_id = request.query_params.get('institute_id')
        course_id = request.query_params.get('course_id')
        class_id = request.query_params.get('class_id')
        exam_id = request.query_params.get('exam_id')
        sub_exam_id = request.query_params.get('sub_exam_id')
        batch_id = request.query_params.get('batch_id')
        user_id = request.query_params.get('user_id')

        # Initial queryset for Grade model
        queryset = Grade.objects.all()

        # Apply filters based on the provided query parameters
        if institute_id:
            queryset = queryset.filter(institute_id=institute_id)
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        if class_id:
            queryset = queryset.filter(class_details_id=class_id)
        if exam_id:
            queryset = queryset.filter(exam_id=exam_id)
        if sub_exam_id:
            queryset = queryset.filter(sub_exam_id=sub_exam_id)
        if batch_id:
            queryset = queryset.filter(batch_id=batch_id)
        if user_id:
            queryset = queryset.filter(student_id=user_id)

        # Apply pagination
        paginator = GradeFilterPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        # Serialize and return the paginated grade data
        serializer = GradeSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    
class GradeUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = GradeUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = serializer.validated_data['file']
            exam_id = serializer.validated_data.get('exam_id')
            batch_id = serializer.validated_data.get('batch_id')
            institute_id = serializer.validated_data['institute_id']
            class_id = serializer.validated_data.get('class_id')
            assignment_id = serializer.validated_data.get('assignment_id')

            institute = get_object_or_404(Institute, id=institute_id)
            exam = get_object_or_404(Exam, id=exam_id) if exam_id else None
            batch = get_object_or_404(Batch, id=batch_id) if batch_id else None
            class_details = get_object_or_404(Class, id=class_id) if class_id else None
            assignment = get_object_or_404(Assignment, id=assignment_id) if assignment_id else None

            df = pd.read_excel(file)

            for _, row in df.iterrows():
                user = get_object_or_404(User, username=row['username'])
                course_codes = [col for col in df.columns if col.startswith('course')]
                for course_code in course_codes:
                    course = get_object_or_404(Course, courseGlobalCode=row[course_code])
                    Grade.objects.create(
                        name=row['name'],
                        institute=institute,
                        course=course,
                        class_details=class_details,
                        exam=exam,
                        assignment=assignment,
                        batch=batch,
                        student=user,
                        grade_value=row['grade_value'],
                        comments=row.get('comments', ''),
                        added_by=request.user
                    )

            return Response({"message": "Grades created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class EditGradeView(APIView):
    def put(self, request, grade_id, user_id):
        # Retrieve the grade and related user
        grade = get_object_or_404(Grade, pk=grade_id)
        user = get_object_or_404(User, pk=user_id)

        # Fetch all courses linked to this grade's assignment
        courses = Course.objects.filter(assignments=grade.assignment)

        # Check if the user is authorized (creator or teacher in any associated course)
        is_authorized = any(
            user == course.creater or user in course.teachers.all()
            for course in courses
        )
        if not is_authorized:
            return Response({"detail": "You are not authorized to edit grades for this assignment."}, status=status.HTTP_403_FORBIDDEN)

        # Process grade input data
        serializer = GradeAssignmentCreateSerializer(grade, data=request.data, partial=True)
        if serializer.is_valid():
            grade_data = serializer.validated_data

            # Update grade and ensure all related answer files have the same grade
            grade.grade_value = grade_data.get('grade_value', grade.grade_value)
            grade.comments = grade_data.get('comments', grade.comments)
            grade.exam = grade_data.get('exam', grade.exam)
            grade.sub_exam = grade_data.get('sub_exam', grade.sub_exam)
            grade.added_by = user
            grade.save()

            return Response({"detail": "Grade updated successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)