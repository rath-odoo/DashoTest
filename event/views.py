from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import EventSerializer
from rest_framework import status
from django.contrib.auth import get_user_model
from datetime import timedelta
from .models import Event
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView
import datetime

class CreateEventView(APIView):
    # permission_classes = [IsAuthenticated]  # Require authentication

    def post(self, request, user_id=None):
        User = get_user_model()

        # Use authenticated user if no user_id is provided
        user = request.user if user_id is None else User.objects.filter(id=user_id).first()
        if not user:
            return Response({"error": "User not found with the provided ID."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EventSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            event = serializer.save(created_by=user)

            # Handle recurrence and occurrence creation
            if event.recurrence != 'none' and event.recurrence_end_date:
                self.create_occurrences(event)

            return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_occurrences(self, event):
        # Logic to create event occurrences based on the recurrence rule
        recurrence_deltas = {
            'daily': timedelta(days=1),
            'weekly': timedelta(weeks=1),
            'monthly': timedelta(days=30),  # Simplified, consider using dateutil for precise calculation
            'yearly': timedelta(days=365)
        }
        current_start = event.start_datetime
        while True:
            current_start += recurrence_deltas[event.recurrence]
            if current_start >= event.recurrence_end_date:
                break
            current_end = current_start + timedelta(minutes=event.duration)

            new_event = Event.objects.create(
                title=event.title,
                start_datetime=current_start,
                end_datetime=current_end,
                description=event.description,
                created_by=event.created_by,
                availability=event.availability,
                recurrence='none',  # Occurrences do not themselves recur
                parent_event=event
            )
            new_event.participants.set(event.participants.all())

class UpdateEventView(APIView):
    # permission_classes = [IsAuthenticated]  # Require authentication

    def put(self, request, event_id, user_id=None):
        User = get_user_model()

        # Use authenticated user if no user_id is provided
        user = request.user if user_id is None else User.objects.get(id=user_id)
        event = get_object_or_404(Event, id=event_id)

        # Check if the user is authorized to edit the event
        if event.created_by != user:
            return Response({"error": "You do not have permission to edit this event."}, status=status.HTTP_403_FORBIDDEN)

        serializer = EventSerializer(event, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            updated_event = serializer.save()

            # If recurrence rules have changed, handle new occurrences
            if 'recurrence' in serializer.validated_data or 'recurrence_end_date' in serializer.validated_data:
                # Optionally, clear old future occurrences if the recurrence pattern has changed
                Event.objects.filter(parent_event=updated_event, start_datetime__gte=request.data.get('start_datetime')).delete()
                if updated_event.recurrence != 'none' and updated_event.recurrence_end_date:
                    self.create_occurrences(updated_event)

            return Response(EventSerializer(updated_event).data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_occurrences(self, event):
        # Logic to create event occurrences based on the recurrence rule
        recurrence_deltas = {
            'daily': timedelta(days=1),
            'weekly': timedelta(weeks=1),
            'monthly': timedelta(days=30),  # Simplified, consider using dateutil for precise calculation
            'yearly': timedelta(days=365)
        }
        current_start = event.start_datetime
        while True:
            current_start += recurrence_deltas[event.recurrence]
            if current_start >= event.recurrence_end_date:
                break
            current_end = current_start + timedelta(minutes=event.duration)

            new_event = Event.objects.create(
                title=event.title,
                start_datetime=current_start,
                end_datetime=current_end,
                description=event.description,
                created_by=event.created_by,
                availability=event.availability,
                recurrence='none',  # Occurrences do not themselves recur
                parent_event=event
            )
            new_event.participants.set(event.participants.all())

class DeleteEventView(APIView):
    # permission_classes = [IsAuthenticated]  # Require authentication

    def delete(self, request, event_id, user_id=None):
        User = get_user_model()

        # Use authenticated user if no user_id is provided
        user = request.user if user_id is None else User.objects.get(id=user_id)
        event = get_object_or_404(Event, id=event_id, created_by=user)  # Ensure user has permission to delete

        # Optionally, delete all child events if it is a recurring event
        Event.objects.filter(parent_event=event).delete()
        
        event.delete()  # Delete the event
        return Response({"message": "Event deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
class EventListView(ListAPIView):
    serializer_class = EventSerializer
    # permission_classes = [permissions.IsAuthenticated]  # Require user authentication

    def get_queryset(self):
        """
        Optionally filter by user_id, start_date, and end_date.
        """
        queryset = Event.objects.all()
        event_id = self.request.query_params.get('event_id')
        user_id = self.request.query_params.get('user_id')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if event_id is not None:
            queryset = queryset.filter(id=event_id)

        if user_id is not None:
            queryset = queryset.filter(created_by_id=user_id)

        if start_date is not None:
            start_datetime = datetime.datetime.fromisoformat(start_date)
            queryset = queryset.filter(start_datetime__gte=start_datetime)

        if end_date is not None:
            end_datetime = datetime.datetime.fromisoformat(end_date)
            queryset = queryset.filter(end_datetime__lte=end_datetime)

        return queryset