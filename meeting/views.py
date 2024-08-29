from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.db import transaction
from django.db.utils import ProgrammingError
from django.db import connection
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser,IsAuthenticatedOrReadOnly, DjangoModelPermissions, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Meeting, Presentation, Talkfile
from .serializers import MeetingSerializer, MeetingMultiCreateSerializer, EditMeetingSerializer, MeetingSerializerGET,PresentationSerializerCREATE,TalkFileUploadSerializer, PresentationSerializerGET, PresentationSerializerPUT, DashboardMeetingSerializer, MeetingMultiCreatePersonalSerializer
from .serializers import CreateOneMeetingSerializer

class CreateOneMeetingView(APIView):
      def post(self, request, format=None):
        serializer = CreateOneMeetingSerializer(data=request.data, context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PresentationCreateView(generics.ListCreateAPIView):
      queryset = Presentation.objects.all()
      serializer_class = PresentationSerializerCREATE


class MeetingView(generics.ListCreateAPIView):
    serializer_class = MeetingSerializer

    def get_queryset(self):
        queryset = Meeting.objects.all()
        sorted_queryset = sorted(queryset, key=lambda meeting: meeting.datetime, reverse=True)
        return sorted_queryset


class DashboardMeetingView(generics.ListCreateAPIView):
    serializer_class = DashboardMeetingSerializer

    def get_queryset(self):
        queryset = Meeting.objects.all()
        sorted_queryset = sorted(queryset, key=lambda meeting: meeting.datetime, reverse=True)
        return sorted_queryset


class EditMeetingView(APIView):
      def get_object(self, pk):
        try:
            return Meeting.objects.get(pk=pk)
        except Meeting.DoesNotExist:
            raise Http404
      def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = EditMeetingSerializer(Object)
        return Response(serializer.data)

      def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = EditMeetingSerializer(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#TalkFileUploadSerializer
class TalkUploadAPIView(APIView):
      permission_classes = [IsAuthenticated]
      parser_classes = [MultiPartParser, FormParser]
      def post(self, request, format=None):
          #print ("ha ha ha::::::::", request.data['talkId'])

          serializer = TalkFileUploadSerializer( data=request.data)
          #print ("valid serializer: ", serializer)
          if serializer.is_valid():
              serializer.save()
              return Response(serializer.data, status = status.HTTP_200_OK)
          else:
              return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      def get(self, request, format=None):
        Objects = Talkfile.objects.all()
        serializer = TalkFileUploadSerializer(Objects)
        return Response(serializer.data)

class MeetingMultiCreateView(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingMultiCreateSerializer

class MeetingMultiCreatePersonalView(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingMultiCreateSerializer

class MeetingViewPk(APIView):
    #permission_classes = [IsAuthenticated]
    
    def get_object(self, pk):
        print(f"Attempting to get object with pk: {pk}")
        try:
            meeting = Meeting.objects.get(pk=pk)
            # print(f"Object found: {meeting}")
            return meeting
        except Meeting.DoesNotExist:
            # print(f"No object found with pk: {pk}")
            raise Http404

    def get(self, request, pk, format=None):
        # print(f"GET request received for pk: {pk}")
        Object = self.get_object(pk)
        # print('Object:', Object)
        serializer = MeetingSerializerGET(Object)
        # print('Serialized data:', serializer.data)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        # print(f"DELETE request received for pk: {pk}")
        try:
            with transaction.atomic():
                with connection.cursor() as cursor:
                    # Delete related records in account_account_generalmeetings
                    try:
                        cursor.execute("DELETE FROM account_account_generalmeetings WHERE meeting_id = %s;", [pk])
                        # print(f"Related entries in account_account_generalmeetings for meeting_id {pk} deleted")
                    except ProgrammingError as delete_exception:
                        # print(f"Error deleting related entries: {str(delete_exception)}")
                        return Response({"error": str(delete_exception)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    
                    # Delete related records in the participants relationship table
                    try:
                        cursor.execute("DELETE FROM meeting_meeting_participants WHERE meeting_id = %s;", [pk])
                        # print(f"Related entries in meeting_meeting_participants for meeting_id {pk} deleted")
                    except ProgrammingError as delete_exception:
                        # print(f"Error deleting related entries: {str(delete_exception)}")
                        return Response({"error": str(delete_exception)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                    # Delete related records in the contributions relationship table
                    try:
                        cursor.execute("DELETE FROM meeting_meeting_contributions WHERE meeting_id = %s;", [pk])
                        # print(f"Related entries in meeting_meeting_contributions for meeting_id {pk} deleted")
                    except ProgrammingError as delete_exception:
                        # print(f"Error deleting related entries: {str(delete_exception)}")
                        return Response({"error": str(delete_exception)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                    # Delete the primary meeting_meeting record
                    try:
                        cursor.execute("DELETE FROM meeting_meeting WHERE id = %s;", [pk])
                        # print(f"Object with pk: {pk} deleted")
                    except ProgrammingError as delete_exception:
                        # print(f"Error during deletion: {str(delete_exception)}")
                        return Response({"error": str(delete_exception)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"message": "Object successfully deleted"}, status=status.HTTP_200_OK)
        
        except Exception as e:
            print(f"Error during the process: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
           
class PresentationViewPk(APIView):
    #permission_classes = [IsAuthenticated]    
    def get_object(self, pk):
        try:
            return Presentation.objects.get(pk=pk)
        except Presentation.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = PresentationSerializerGET(Object)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        Object = self.get_object(pk)
        Object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PresentationPUTViewPk(APIView):
    #permission_classes = [IsAuthenticated]    
    def get_object(self, pk):
        try:
            return Presentation.objects.get(pk=pk)
        except Presentation.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        Object = self.get_object(pk)
        serializer = PresentationSerializerPUT(Object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)










