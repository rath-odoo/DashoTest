from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta
from meeting.models import Meeting
User = get_user_model()

class Event(models.Model):
    AVAILABILITY_CHOICES = (
        ('busy', 'Busy'),
        ('available', 'Available'),
        ('tentative', 'Tentative'),
    )
    RECURRENCE_CHOICES = (
        ('none', 'None'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    )

    title = models.CharField(max_length=255)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    duration = models.IntegerField(default=30)  # Duration in minutes
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, related_name='created_events', on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='events', blank=True)
    availability = models.CharField(max_length=10, choices=AVAILABILITY_CHOICES, default='busy')
    recurrence = models.CharField(max_length=10, choices=RECURRENCE_CHOICES, default='none')
    recurrence_end_date = models.DateTimeField(blank=True, null=True)  # End date for the recurrence series
    parent_event = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='child_events')
    meeting = models.OneToOneField(Meeting, on_delete=models.CASCADE, null=True, blank=True, related_name='event')

    # Add a field for Jitsi meeting link
    jitsi_meeting_link = models.URLField(blank=True, null=True)
    
    def __str__(self):  
        return self.title

    def create_occurrences(self):
        if self.recurrence == 'none':
            return

        recurrence_deltas = {
            'daily': timedelta(days=1),
            'weekly': timedelta(weeks=1),
            'monthly': timedelta(days=30),  # Consider using dateutil for more accuracy
            'yearly': timedelta(days=365)
        }

        current_start = self.start_datetime
        while current_start + recurrence_deltas[self.recurrence] <= self.recurrence_end_date:
            current_start += recurrence_deltas[self.recurrence]
            current_end = current_start + timedelta(minutes=self.duration)
            Event.objects.create(
                title=self.title,
                start_datetime=current_start,
                end_datetime=current_end,
                description=self.description,
                created_by=self.created_by,
                availability=self.availability,
                participants=self.participants.all(),
                recurrence='none',  # Stop further recurrence
                parent_event=self
            )
