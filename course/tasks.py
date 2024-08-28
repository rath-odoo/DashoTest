from celery import shared_task
from django.utils import timezone
from django.db import transaction
from institute.models import Attendance
from .models import Course

BATCH_SIZE = 100  # Adjust based on your database performance

@shared_task
def create_class_attendance():
    today = timezone.now().date()
    courses = Course.objects.filter(courseStatus='ongoing')

    for course in courses:
        classes = course.classes.all()
        enrolled_students = course.enrolled_students.all()

        for class_session in classes:
            total_students = enrolled_students.count()
            for start in range(0, total_students, BATCH_SIZE):
                with transaction.atomic():
                    batch = enrolled_students[start:start + BATCH_SIZE]
                    attendances_to_create = []

                    for student in batch:
                        if not Attendance.objects.filter(course=course, class_session=class_session, member=student, start_date=today, end_date=today).exists():
                            attendances_to_create.append(
                                Attendance(
                                    course=course,
                                    class_session=class_session,
                                    member=student,
                                    attendance_date=timezone.now(),
                                    start_date=today,
                                    end_date=today,
                                    status='na',
                                    # approver_status='pending'
                                )
                            )
                    
                    if attendances_to_create:
                        Attendance.objects.bulk_create(attendances_to_create)
