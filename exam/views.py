from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .serializers import CreateExamSerializer, ExamSerializer 
from .serializers import ExamCreateSerializer, ExamUpdateSerializer, SubExamListSerializer
from .serializers import ExamSubExamCreateSerializer, ExamSubExamUpdateSerializer, SubExamSerializer
from .models import Exam
from eclass.models import Class
from course.models import Course
from institute.models import Institute, Batch
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .models import SubExam
from .pagination import StandardResultsSetPagination
User = get_user_model()
#class GetAssignmentView(generics.ListAPIView):
    #permission_classes = [IsAuthenticated]    
#    model = Assignment
#    serializer_class = GetAssignmentSerializer
#    def get_queryset(self):
#        courseId = self.kwargs['courseId']
#        courseObj = Course.objects.get(pk=courseId);
#        return courseObj.assignments.all()


#class CreateAssignmentView(generics.ListCreateAPIView):
#permission_classes = [IsAuthenticated]    
#    model = Assignment
#    serializer_class = CreateAssignmentSerializer
#    def get_queryset(self):
#        courseId = self.kwargs['courseId']
#        courseObj = Course.objects.get(pk=courseId);
#        return courseObj.assignments.all()

class CreateExamView(generics.ListCreateAPIView):
    queryset = Exam.objects.all()
    serializer_class = CreateExamSerializer

class EditBasicExamView(APIView):
      def get_object(self, examId):
        try:
            return Exam.objects.get(pk=examId)
        except Exam.DoesNotExist:
            raise Http404
      def get(self, request, examId, format=None):
        Object = self.get_object(examId)
        serializer = ExamSerializer(Object)
        return Response(serializer.data)

      def put(self, request, examId, format=None):
        Object = self.get_object(examId)
        serializer = ExamSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      def delete(self, request, examId, format=None):
        Object = self.get_object(examId)
        Object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ExamCreateView(APIView):
    def post(self, request, user_id, *args, **kwargs):
        serializer = ExamCreateSerializer(data=request.data)
        user = get_object_or_404(User, id=user_id)
        if serializer.is_valid():
            exams = serializer.save(creater=user)
            exam_ids = [exam.id for exam in exams]
            return Response({'message': 'Exams created successfully', 'exam_ids': exam_ids}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class ExamUpdateView(APIView):
    def put(self, request, exam_id, *args, **kwargs):
        # Fetch the existing exam object
        exam = get_object_or_404(Exam, pk=exam_id)
        
        # Initialize the serializer with the existing instance and new data
        serializer = ExamUpdateSerializer(exam, data=request.data, partial=False)
        
        if serializer.is_valid():
            updated_exam = serializer.save()
            return Response({'message': 'Exam updated successfully', 'exam_id': updated_exam.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamDeleteView(APIView):
    def delete(self, request, exam_id, *args, **kwargs):
        # Get the exam object or return 404 if not found
        exam = get_object_or_404(Exam, pk=exam_id)
        
        # Delete the exam instance
        exam.delete()
        
        # Return a success response
        return Response({'message': 'Exam deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
class HierarchicalFilterView(APIView):
    def get(self, request, *args, **kwargs):
        institute_id = request.query_params.get('institute_id')
        course_id = request.query_params.get('course_id')
        class_id = request.query_params.get('class_id')
        exam_id = request.query_params.get('exam_id')
        sub_exam_id = request.query_params.get('sub_exam_id')
        batch_id = request.query_params.get('batch_id')

        if exam_id:
            # Return the specific exam details
            exam = get_object_or_404(Exam, pk=exam_id)
            serializer = ExamSerializer(exam)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        if sub_exam_id:
            # Return the specific sub-exam details
            sub_exam = get_object_or_404(SubExam, pk=sub_exam_id)
            serializer = SubExamSerializer(sub_exam)
            return Response(serializer.data, status=status.HTTP_200_OK)

        exams = Exam.objects.all()

        if institute_id:
            exams = exams.filter(institutes__id=institute_id)
        
        if course_id:
            exams = exams.filter(courses__id=course_id)
        
        if class_id:
            exams = exams.filter(class_details__id=class_id)
        
        if batch_id:
            exams = exams.filter(batches__id=batch_id)

        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(exams, request)
        serializer = ExamSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

class ExamSubExamCreateView(APIView):
    def post(self, request, user_id, *args, **kwargs):
        serializer = ExamSubExamCreateSerializer(data=request.data)
        user = get_object_or_404(User, id=user_id)
        if serializer.is_valid():
            exam = serializer.save(creater=user)
            return Response({'message': 'Exam created successfully', 'exam_id': exam.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ExamSubExamUpdateView(APIView):
    def put(self, request, exam_id, *args, **kwargs):
        exam = get_object_or_404(Exam, id=exam_id)
        serializer = ExamSubExamUpdateSerializer(exam, data=request.data, partial=True)
        if serializer.is_valid():
            updated_exam = serializer.save()
            return Response({'message': 'Exam updated successfully', 'exam_id': updated_exam.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
class ExamSubExamDeleteView(APIView):
    def delete(self, request, exam_id, *args, **kwargs):
        exam = get_object_or_404(Exam, id=exam_id)
        exam.delete()
        return Response({'message': 'Exam and associated sub-exams deleted successfully'}, status=status.HTTP_200_OK)
    
class ExamSubExamDetailView(APIView):
    def get(self, request, *args, **kwargs):
        exam_id = request.query_params.get('exam_id')
        sub_exam_id = request.query_params.get('sub_exam_id')
        batch_id = request.query_params.get('batch_id')

        if exam_id:
            exam = get_object_or_404(Exam, id=exam_id)
            serializer = ExamSerializer(exam)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif sub_exam_id:
            sub_exam = get_object_or_404(SubExam, id=sub_exam_id)
            serializer = SubExamListSerializer(sub_exam)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            exams = Exam.objects.all()
            if batch_id:
                exams = exams.filter(batches__id=batch_id)
            paginator = StandardResultsSetPagination()
            page = paginator.paginate_queryset(exams, request)
            serializer = ExamSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)