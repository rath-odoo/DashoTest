from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Event
from meeting.models import Meeting
from datetime import timedelta

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname','lastname','profile_image','email']  # Adjust fields as necessary for your use case.

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ['name', 'about', 'meetingStatus', 'datetime', 'duration', 'meetingLink', 'address']

class EventSerializer(serializers.ModelSerializer):
    meeting = MeetingSerializer(required=False)  # Optional, depending on your needs

    participants = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all(), required=False)
    participant_details = UserSerializer(source='participants', many=True, read_only=True)
    recurrence_deltas = serializers.IntegerField(write_only=True, required=False, allow_null=True)  # This field should be used properly in the logic.
    end_datetime = serializers.DateTimeField(required=False)
 
    class Meta:
        model = Event
        fields = '__all__'  # Includes all fields from the model plus participant_details.
        read_only_fields = ('created_by', 'participant_details')

    def validate(self, data):
        if 'end_datetime' not in data and 'duration' not in data:
            raise serializers.ValidationError("Either end_datetime or duration must be provided.")
        if 'end_datetime' in data and 'duration' in data:
            raise serializers.ValidationError("Provide either end_datetime or duration, not both.")
        
        if data.get('recurrence', 'none') != 'none':
            if not data.get('recurrence_end_date') and 'recurrence' not in data:
                raise serializers.ValidationError("Provide either a recurrence_end_date or specify recurrence_deltas for recurrence.")

        # Calculate end_datetime if only duration is provided
        if 'duration' in data and 'end_datetime' not in data:
            start_datetime = data.get('start_datetime')
            duration = data.get('duration')
            data['end_datetime'] = start_datetime + timedelta(minutes=duration)

        return data

    def create(self, validated_data):
        participants_data = validated_data.pop('participants', [])
        meeting_data = validated_data.pop('meeting', None)
        event = super().create(validated_data)
        event.participants.set(participants_data)
        if event.recurrence != 'none' and not event.recurrence_end_date:
            recurrence_deltas = validated_data.get('recurrence')  # Default to 1 if not specified explicitly
            event.recurrence_end_date = self.calculate_recurrence_end_date(
                event.start_datetime, recurrence_deltas )
            event.save()
        if meeting_data:
            Meeting.objects.create(event=event, **meeting_data)

        return event

    def calculate_recurrence_end_date(self, start_datetime, recurrence):
        recurrence_intervals = {
            'daily': timedelta(days=1),
            'weekly': timedelta(days=7),
            'monthly': timedelta(days=30),  # Using a simple 30-day month; consider dateutil for more accuracy.
            'yearly': timedelta(days=365)
        }
        delta = recurrence_intervals.get(recurrence, timedelta(days=0))
        return start_datetime + (delta )
