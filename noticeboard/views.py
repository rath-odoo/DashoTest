from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from .models import NoticeBoard
from institute.models import Batch, Institute
from .serializers import NoticeBoardSerializer, DashboardNoticeBoardSerializer,NoticeBoardSerializerBatchInstitute
from rest_framework import pagination
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
User = get_user_model()
from django.shortcuts import get_object_or_404
from django.db import models

# Create your views here.
class NoticeBoardView(generics.ListCreateAPIView):
    queryset = NoticeBoard.objects.all()
    serializer_class = NoticeBoardSerializer

class CreateNoticeView(generics.CreateAPIView):
    queryset = NoticeBoard.objects.all()
    serializer_class = NoticeBoardSerializerBatchInstitute
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_id = self.request.data.get('user_id') or self.kwargs.get('user_id')
        batch_ids = self.request.data.get('batch_ids', [])
        institute_ids = self.request.data.get('institute_ids', [])

        if user_id:
            user = get_object_or_404(User, id=user_id)
        else:
            user = self.request.user

        # Save the notice
        notice = serializer.save(creater=user)

        # Helper function to add notice to user's noticeids
        def add_notice_to_users(users):
            for member in users:
                member.noticeids.add(notice)
                member.save()

        # Associate notice with all members of the batches
        if batch_ids:
            for batch_id in batch_ids:
                batch = get_object_or_404(Batch, id=batch_id)
                add_notice_to_users(batch.users.all())
                notice.batches.add(batch)

        # Associate notice with all members of the institutes
        if institute_ids:
            for institute_id in institute_ids:
                institute = get_object_or_404(Institute, id=institute_id)
                add_notice_to_users(institute.people.all())
                notice.institutes.add(institute)

        # Add the notice to the creator's noticeids
        user.noticeids.add(notice)
        user.save()



class EditNoticeView(generics.UpdateAPIView):
    queryset = NoticeBoard.objects.all()
    serializer_class = NoticeBoardSerializerBatchInstitute
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        notice = super().get_object()
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)

        # Uncomment this if you need to check permissions
        # if not InstituteMembership.objects.filter(
        #     user=user,
        #     institute__in=notice.institutes.all(),
        #     user_type__name__in=["Owner", "Admin"]
        # ).exists():
        #     raise PermissionDenied("You do not have permission to edit this notice.")

        return notice

    def perform_update(self, serializer):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)
        batch_ids = self.request.data.get('batch_ids', [])
        institute_ids = self.request.data.get('institute_ids', [])
        post_courses = self.request.data.get('post_courses', [])

        # Save the notice
        notice = serializer.save()

        # Helper function to add notice to user's noticeids
        def add_notice_to_users(users):
            for member in users:
                member.noticeids.add(notice)
                member.save()

        # Clear existing batches and institutes
        notice.batches.clear()
        notice.institutes.clear()

        # Update batches associated with the notice
        if batch_ids:
            for batch_id in batch_ids:
                batch = get_object_or_404(Batch, id=batch_id)
                add_notice_to_users(batch.users.all())
                notice.batches.add(batch)

        # Update institutes associated with the notice
        if institute_ids:
            for institute_id in institute_ids:
                institute = get_object_or_404(Institute, id=institute_id)
                add_notice_to_users(institute.people.all())
                notice.institutes.add(institute)

        # Update the related courses if any
        if post_courses:
            notice.post_courses.set(post_courses)

        notice.save()


        
class DeleteNoticeView(generics.DestroyAPIView):
    queryset = NoticeBoard.objects.all()
    serializer_class = NoticeBoardSerializerBatchInstitute
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        notice = super().get_object()
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)

        # if not InstituteMembership.objects.filter(
        #     user=user,
        #     institute__in=notice.institutes.all(),
        #     user_type__name__in=["Owner", "Admin"]
        # ).exists():
        #     raise PermissionDenied("You do not have permission to delete this notice.")

        return notice

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Notice deleted successfully."}, status=200)
    
class ListNoticesView(generics.ListAPIView):
    queryset = NoticeBoard.objects.all()
    serializer_class = NoticeBoardSerializerBatchInstitute
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        user_batches = user.batches.all()
        user_institutes = user.institutes.all()

        # Apply additional filters from query parameters if provided
        notice_id = self.request.query_params.get('id')
        institute_id = self.request.query_params.get('institute_id')
        batch_id = self.request.query_params.get('batch_id')

        if notice_id:
            queryset = queryset.filter(id=notice_id)
        if institute_id:
            queryset = queryset.filter(institutes__id=institute_id)
        if batch_id:
            queryset = queryset.filter(batches__id=batch_id)

        # Filter by batches and institutes the user belongs to
        if not batch_id:
            queryset = queryset.filter(
                models.Q(batches__in=user_batches) |
                models.Q(institutes__in=user_institutes)
            ).distinct()
        else:
            queryset = queryset.filter(batches__id=batch_id)

        # Order by creationTime in descending order to show the latest notices at the top
        queryset = queryset.order_by('-creationTime')

        return queryset
    
class NoticeBoardViewId(APIView):
    def get_object(self, pk):
        try:
            return NoticeBoard.objects.get(pk=pk)
        except NoticeBoard.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = NoticeBoardSerializer(Object)
        return Response(serializer.data)

class DashboardNoticesSetPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50
    def get_paginated_response(self, data):
        num_unread=0
        for notice in data:
            if notice['read'] ==False:
               num_unread=num_unread+1
        return Response({

            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'unread_count':num_unread,
            'results': data
        })
    
class DashboardNoticesView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DashboardNoticeBoardSerializer
    pagination_class = DashboardNoticesSetPagination

    def get_queryset(self):
        user = self.request.user
        notice_objects = set()  # Use a set to avoid duplicates

        # Get notices related to the user's courses
        for course in user.dashboard_courses.all():
            course_notices = course.noticeobjects.exclude(
                id__in=user.removednoticeids.all()
            )
            notice_objects.update(course_notices)

        # Get notices related to the user's batches
        for batch in user.batches.all():
            batch_notices = batch.notices.exclude(
                id__in=user.removednoticeids.all()
            )
            notice_objects.update(batch_notices)

        # Get notices related to the user's institutes
        for institute in user.institutes.all():
            institute_notices = institute.notices.exclude(
                id__in=user.removednoticeids.all()
            )
            notice_objects.update(institute_notices)

        # Convert set to list and sort by creationTime in descending order
        sorted_notices = sorted(notice_objects, key=lambda x: x.creationTime, reverse=True)

        return sorted_notices


class NoticeDeleteViewId(APIView):
      def get_object(self, pk):
        try:
            return NoticeBoard.objects.get(pk=pk)
        except NoticeBoard.DoesNotExist:
            raise Http404
   
      def delete(self, request, pk, format=None):
        Object = self.get_object(pk)
        Object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NoticeRemoveViewId(APIView):
      def get_object(self, pk):
        try:
            return NoticeBoard.objects.get(pk=pk)
        except NoticeBoard.DoesNotExist:
            raise Http404

      def put(self, request, pk, format=None):
        NoticeObject = self.get_object(pk)
        userObject=request.user;
        userObject.removednoticeids.add(NoticeObject);
        return Response(status=status.HTTP_204_NO_CONTENT)

class CourseNoticesView(generics.ListAPIView):
    serializer_class = NoticeBoardSerializerBatchInstitute
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        queryset = NoticeBoard.objects.filter(postCourses__contains=[course_id]).order_by('-creationTime')

        user_id = self.request.query_params.get('user_id')
        institute_id = self.request.query_params.get('institute_id')

        if user_id:
            queryset = queryset.filter(creater_id=user_id)
        if institute_id:
            queryset = queryset.filter(institutes__id=institute_id)

        return queryset
