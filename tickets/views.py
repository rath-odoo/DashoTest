from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import Ticket,Category, TicketCommentNew
from .serializers import PostSerializer,CategorySerializer,CommentSerializer, CreateTicketSerializer, TicketSerializer, CreateCommentTicketSerializer, EditTicketSerializer, EditCommentTicketSerializer
from course.models import Course

from django.http import Http404
from rest_framework import status
from rest_framework import pagination
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
User = get_user_model()

class PostList(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = PostSerializer

class CourseTicketsSetPagination(pagination.PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 5000


class TicketByCourseIdView(generics.ListAPIView):
      serializer_class = TicketSerializer
      pagination_class = CourseTicketsSetPagination
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get_queryset(self):
        courseId = self.kwargs['pk']
        CourseObj=self.get_object(pk=courseId)
        ticketObjects = CourseObj.tickets.all();
        return ticketObjects

class CreateTicketInCourseView(APIView):
    def get_object(self, course_id):
        try:
            return Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            raise Http404

    def get(self, request, course_id, user_id, format=None):
        course = self.get_object(course_id)
        serializer = CreateTicketSerializer(course)
        return Response(serializer.data)

    def post(self, request, course_id, user_id, format=None):
        course = self.get_object(course_id)
        user = User.objects.get(pk=user_id)
        context = {"request": request, "author": user, "course": course}
        serializer = CreateTicketSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)  # Add this line to debug errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EditTicketInCourseView(APIView):
    def get_object(self, ticketId):
        try:
            return Ticket.objects.get(pk=ticketId)
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, ticketId, user_id, format=None):
        ticket = self.get_object(ticketId)
        serializer = EditTicketSerializer(ticket)
        return Response(serializer.data)

    def put(self, request, ticketId, user_id, format=None):
        ticket = self.get_object(ticketId)
        user = User.objects.get(pk=user_id)
        context = {"request": request, "author": user}
        serializer = EditTicketSerializer(ticket, data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoriesByCourseIdView(generics.ListAPIView):#APIView):
      serializer_class = CategorySerializer
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
      def get_queryset(self):
        courseId = self.kwargs['pk']
        CourseObj=self.get_object(pk=courseId)
        CategoryObjects = CourseObj.ticketCategories.categories.all()
        return CategoryObjects

class CreateCommentByTicketIdView(APIView):
    def get_object(self, ticket_id):
        try:
            return Ticket.objects.get(pk=ticket_id)
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, ticket_id, format=None):
        ticket = self.get_object(ticket_id)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data)

    def post(self, request, ticket_id, format=None):
        ticket = self.get_object(ticket_id)
        context = {"request": request, "ticket": ticket}
        serializer = CreateCommentTicketSerializer(data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditCommentByTicketIdView(APIView):
    # permission_classes = [IsAuthenticated]

    def get_object(self, commentId):
        try:
            return TicketCommentNew.objects.get(pk=commentId)
        except TicketCommentNew.DoesNotExist:
            raise Http404

    def get(self, request, commentId, format=None):
        comment = self.get_object(commentId)
        serializer = EditCommentTicketSerializer(comment)
        return Response(serializer.data)

    def put(self, request, commentId, format=None):
        comment = self.get_object(commentId)
        serializer = EditCommentTicketSerializer(comment, data=request.data)
        if serializer.is_valid():
            commenter_id = serializer.validated_data.get('commenter').id
            print ("serializer.validated_data: ", serializer.validated_data)
            print ("commenter_id: ", commenter_id);
            print ("comment: ", comment.commenter.id)
            if comment.commenter.id != commenter_id:
                return Response({'detail': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class DeleteCommentByTicketIdView(APIView):
    def get_object(self, commentId):
        try:
            return TicketCommentNew.objects.get(pk=commentId)
        except TicketCommentNew.DoesNotExist:
            raise Http404

    def delete(self, request, commentId, format=None):
        comment = self.get_object(commentId)
        print ("comment: ", comment);
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






class GetCommentByTicketIdView(generics.ListAPIView):
      serializer_class = CategorySerializer
      def get_object(self, pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

      def get_queryset(self):
        courseId = self.kwargs['pk']
        CourseObj=self.get_object(pk=courseId)
        CategoryObjects = CourseObj.ticketCategories.categories.all()
        return CategoryObjects

class PostDetail(generics.RetrieveDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = PostSerializer

class CategoryInfo(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryInfobyId(generics.RetrieveDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CommentsbyTicketId(generics.ListAPIView):
    serializer_class = CommentSerializer
    def get_queryset(self):
        ticketId = self.kwargs['ticketId']
        ticketObj = Ticket.objects.get(pk=ticketId);
        commentObjects = ticketObj.ticketcomments.all();
        return commentObjects

class CommentsbyTicketIdd(APIView):
    #permission_classes = [IsAuthenticated]
    def get_objects(self, ticketId):
        try:
            return TicketCommentNew.objects.filter(ticketId=ticketId)
        except TicketCommentNew.DoesNotExist:
            raise Http404

    def get(self, request, ticketId, format=None):
        CommentObjects = self.get_objects(ticketId)
        serializer = CommentSerializer(CommentObjects)
        return Response(serializer.data)
