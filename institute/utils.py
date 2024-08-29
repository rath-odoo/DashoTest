from django.utils import timezone
from .models import Attendance, Institute

def create_default_attendance(institute):
    # Iterate over all members in the institute
    for member in institute.people.all():
        # Check if an attendance record exists for the specified institute and member
        if not Attendance.objects.filter(
            institute=institute,
            member=member
        ).exists():
            # Create a default attendance record if it doesn't exist
            Attendance.objects.create(
                institute=institute,
                member=member,
                status='na',  # Default status
                in_time=None,
                out_time=None,
                approver_status='pending',
            )
