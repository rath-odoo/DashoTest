from celery import shared_task
from django.utils import timezone
from .models import Attendance, Institute, InstituteMembership, BatchAttendance, Leave
from django.db import transaction, IntegrityError
from django.core.exceptions import MultipleObjectsReturned

BATCH_SIZE = 100  # Adjust based on your database performance

def get_or_create_unique(model, defaults=None, **kwargs):
    if defaults is None:
        defaults = {}
    try:
        return model.objects.get(**kwargs), False
    except MultipleObjectsReturned:
        print(f"Multiple objects returned for model {model.__name__} with args {kwargs}")
        duplicates = model.objects.filter(**kwargs)
        first_instance = duplicates.first()
        duplicates.exclude(id=first_instance.id).delete()
        return first_instance, False
    except model.DoesNotExist:
        kwargs.update(defaults)
        try:
            with transaction.atomic():
                return model.objects.create(**kwargs), True
        except IntegrityError:
            # Handle potential race conditions where the object might have been created
            return model.objects.get(**kwargs), False
    
@shared_task
def create_daily_attendance():
    today = timezone.now().date()
    institutes = Institute.objects.all()

    for institute in institutes:
        memberships = InstituteMembership.objects.filter(institute=institute, status='active')
        total_members = memberships.count()

        for start in range(0, total_members, BATCH_SIZE):
            with transaction.atomic():
                batch = memberships[start:start + BATCH_SIZE]
                attendances_to_create = []

                for membership in batch:
                    user = membership.user
                    try:
                        # Using a more specific filter to avoid race conditions
                        attendance, created = Attendance.objects.get_or_create(
                            institute=institute,
                            member=user,
                            attendance_date=today,
                            defaults={
                                'start_date': today,
                                'end_date': today,
                                'status': 'na'
                            }
                        )
                        if created:
                            attendances_to_create.append(attendance)
                    except IntegrityError:
                        # In case of IntegrityError, fetch the existing record
                        attendance = Attendance.objects.get(
                            institute=institute,
                            member=user,
                            attendance_date=today
                        )
                        attendances_to_create.append(attendance)

                if attendances_to_create:
                    Attendance.objects.bulk_create(attendances_to_create, ignore_conflicts=True)


@shared_task
def create_institute_batch_attendance():
    today = timezone.now().date()
    institutes = Institute.objects.all()

    for institute in institutes:
        batches = institute.batches.all()

        for batch in batches:
            members = batch.users.all()
            total_members = members.count()

            for start in range(0, total_members, BATCH_SIZE):
                with transaction.atomic():
                    batch_members = members[start:start + BATCH_SIZE]
                    batch_attendances_to_create = []
                    course_attendances_to_create = []

                    for member in batch_members:
                        try:
                            # Handle BatchAttendance
                            batch_attendance, created = get_or_create_unique(
                                BatchAttendance,
                                batch=batch,
                                member=member,
                                attendance_date=today,
                                defaults={
                                    'status': 'na',
                                    'start_date': today,
                                    'end_date': today
                                }
                            )
                            if created:
                                batch_attendances_to_create.append(batch_attendance)

                            # Handle Course Attendance
                            for course in batch.courses.all():
                                course_attendance, created = get_or_create_unique(
                                    Attendance,
                                    course=course,
                                    member=member,
                                    attendance_date=today,
                                    defaults={
                                        'status': 'na',
                                        'start_date': today,
                                        'end_date': today
                                    }
                                )
                                if created:
                                    course_attendances_to_create.append(course_attendance)
                        except Exception as e:
                            print(f"Error processing member {member.id} in batch {batch.id}: {str(e)}")

                    if batch_attendances_to_create:
                        BatchAttendance.objects.bulk_create(batch_attendances_to_create, ignore_conflicts=True)
                    if course_attendances_to_create:
                        Attendance.objects.bulk_create(course_attendances_to_create, ignore_conflicts=True)

@shared_task
def update_attendance_status(batch_size=100):
    today = timezone.now().date()

    while True:
        attendances = Attendance.objects.filter(status='na', attendance_date__lt=today)[:batch_size]

        if not attendances.exists():
            break

        with transaction.atomic():
            for attendance in attendances:
                user = attendance.member
                institute = attendance.institute
                attendance_date = attendance.attendance_date

                leave_exists = Leave.objects.filter(
                    user=user,
                    institute=institute,
                    start_date__lte=attendance_date,
                    end_date__gte=attendance_date,
                    status='approved'
                ).exists()

                if leave_exists:
                    attendance.status = 'leave'
                else:
                    attendance.status = 'absent'
                
                # Set approver_status to 'approved'
                attendance.approver_status = 'na'
                attendance.save()

        attendances = None
