from celery import shared_task
from django.utils import timezone
from django.db import transaction
from .models import Assignment

@shared_task
def update_assignment_status():
    today = timezone.now().date()
    with transaction.atomic():
        assignments_to_update = Assignment.objects.filter(dueDate__lt=today, status='open')
        assignments_to_update.update(status='closed')
