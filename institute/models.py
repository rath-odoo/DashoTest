from django.db import models, transaction
from django.utils import timezone
import datetime
from django.db.models import Manager
# Create your models here.
from django.conf import settings
from django.db.models import Sum
from django.contrib.auth import get_user_model
from course.models import Course
from django.db.models.signals import post_save
from django.db.models.signals import pre_save
from django.dispatch import receiver

from django.core.validators import RegexValidator, EmailValidator
from django.core.exceptions import ValidationError
import os
from eclass.models import Class

User = get_user_model()

def get_default_profile_image():
    return "codingwithmitch/instlogodefault.png"

class InstitueMemberTypes(models.Model):
      name = models.CharField(max_length=1000, blank=True, null=True)
      def __str__(self):
        return self.name or "Unnamed"

class Document(models.Model):
      name = models.CharField(max_length=1000,null=True, blank=True);
      docfile = models.FileField(max_length=1000, upload_to='documents/', null=True, blank=True);
      uploadtime = models.DateTimeField(default=timezone.now); 
      def __str__(self):
          return self.name or "Unnamed" 
      
class socialMediaLink(models.Model):
      name = models.CharField(max_length=1000, blank=True, null=True);
      icon = models.ImageField(max_length=255, upload_to='images/', null=True, blank=True, default=get_default_profile_image);
      link = models.CharField(max_length=1000, blank=True, null=True);
      def __str__(self):
        return self.name or "Unnamed"



class Institute(models.Model):
    #institutename = models.CharField(max_length=255, blank = True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    logo = models.ImageField(max_length=255, upload_to='images/', null=True, blank=True, default=get_default_profile_image)
    people = models.ManyToManyField(User, through='InstituteMembership', blank=True, related_name='institutes')
    membertypes = models.ManyToManyField(InstitueMemberTypes ,blank=True)
    address = models.CharField(max_length=1000, blank=True, null=True);
    websiteurl = models.CharField(max_length=1000, blank=True, null=True);
    socialmedialinks = models.ManyToManyField(socialMediaLink,  blank=True, related_name='socialMediaLink_institute')
    keypeople = models.ManyToManyField(User, blank=True, related_name='key_people_institutes')
    keydocuments = models.ManyToManyField(Document, blank=True, related_name='key_documents_institutes')
    attendance_records = models.ManyToManyField('Attendance', blank=True, related_name='institutes_attendance_records')
    courses = models.ManyToManyField(Course, blank=True, related_name='institutes') 
    bank_details = models.ManyToManyField('InstituteBankDetails', blank=True, related_name='institutes')


    def __str__(self):
       return self.name or "Unnamed"

    def get_admin_or_owner_members(self):
        return self.people.filter(
            institutemembership__user_type__name__in=['Admin', 'Owner']
        )



class InstituteMembership(models.Model):
    statusOptions = (('active','ACTIVE'),('inactive','INACTIVE'));
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True);
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE);
    user_type = models.ForeignKey(InstitueMemberTypes, on_delete=models.CASCADE, blank=True, null=True);
    datejoined = models.DateTimeField(default=timezone.now);
    status = models.CharField(max_length=100, choices=statusOptions, default='active'); 
    bank_details = models.ManyToManyField('InstituteBankDetails', blank=True, related_name='memberships')
    roll_no = models.CharField(max_length=100, blank=True, null=True)
    employee_id = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        unique_together = ('user', 'institute')

    def __str__(self):
        return f"{self.user.username} - {self.institute.name} - {self.status}" or "Unnamed"


class Attendance(models.Model):
    institute = models.ForeignKey('Institute', on_delete=models.CASCADE, related_name='attendance_for_institute', null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='attendance_records', default=None, null=True, blank=True)   
    class_session = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='attendance_records', null=True, blank=True)

    # Update the relation to point at 'settings.AUTH_USER_MODEL'
    member = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='attendance_for_member')
    attendance_date = models.DateField(default=timezone.now)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True) 
    in_time = models.TimeField(blank=True, null=True)
    out_time = models.TimeField(blank=True, null=True)

    approver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='approved_attendance',
        null=True,
        blank=True
    )

    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('na', 'NA'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='na')
    
    APPROVER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    approver_status = models.CharField(max_length=10, choices=APPROVER_STATUS_CHOICES, default='pending')
    
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True) 
    
    class Meta:
        unique_together = ('member', 'course', 'attendance_date')

    def __str__(self):
        return f"{self.member.username} - {self.status} - {self.attendance_date.strftime('%Y-%m-%d')}" or "Unnamed"

    def update_batch_attendance(self):
        batches = self.course.batches.all()
        for batch in batches:
            batch_attendance, created = BatchAttendance.objects.get_or_create(
                batch=batch,
                member=self.member,
                attendance_date=self.attendance_date,
                defaults={
                    'status': self.status,
                    'start_date': self.start_date,
                    'end_date': self.end_date
                }
            )
            batch_attendance.status = self.status
            batch_attendance.save()

            for course in batch.courses.all():
                if course != self.course:
                    course_attendances = Attendance.objects.filter(
                        course=course,
                        member=self.member,
                        attendance_date=self.attendance_date
                    )
                    if course_attendances.exists():
                        # Update all matching records
                        for course_attendance in course_attendances:
                            course_attendance.status = self.status
                            course_attendance.save()
                    else:
                        # Create a new attendance record if none exists
                        Attendance.objects.create(
                            course=course,
                            member=self.member,
                            attendance_date=self.attendance_date,
                            status=self.status,
                            start_date=self.start_date,
                            end_date=self.end_date
                        )

    
    def update_course_attendance(self):
        if self.course:
            batches = self.course.batches.all()
            for batch in batches:
                for course in batch.courses.all():
                    if course != self.course:
                        course_attendances = Attendance.objects.filter(
                            course=course,
                            member=self.member,
                            attendance_date=self.attendance_date
                        )
                        if course_attendances.exists():
                            # Update all matching records
                            for course_attendance in course_attendances:
                                course_attendance.status = self.status
                                course_attendance.save()
                        else:
                            # Create a new attendance record if none exists
                            Attendance.objects.create(
                                course=course,
                                member=self.member,
                                attendance_date=self.attendance_date,
                                status=self.status,
                                start_date=self.start_date,
                                end_date=self.end_date
                            )


@receiver(post_save, sender=Attendance)
def update_related_attendance(sender, instance, **kwargs):
    if instance.course and instance.status in ['present', 'absent', 'na']:
        # Temporarily disconnect the signal to avoid recursion
        post_save.disconnect(update_related_attendance, sender=Attendance)
        
        instance.update_batch_attendance()
        instance.update_course_attendance()
        
        # Reconnect the signal after the update
        post_save.connect(update_related_attendance, sender=Attendance)
        
class LeaveType(models.Model):
    name = models.CharField(max_length=50)
    institute = models.ForeignKey(
        'Institute', on_delete=models.CASCADE, related_name='leave_types', blank=True, null=True
    )
    total_leaves = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.total_leaves} leaves" or "Unnamed"


class InstituteLeavePolicy(models.Model):
    institute = models.ForeignKey(
        'Institute', on_delete=models.CASCADE, related_name='leave_policies', null=True, blank=True
    )
    member_type = models.ForeignKey(
        'InstitueMemberTypes', on_delete=models.CASCADE, related_name='leave_policies', null=True, blank=True
    )
    leave_types = models.ManyToManyField(LeaveType, related_name='leave_policies', blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('institute', 'member_type')

    def __str__(self):
        return f"{self.institute.name} - {self.member_type.name} Leave Policy" or "Unnamed"

class UserLeaveBalance(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='leave_balances',
        blank=True, null=True
    )
    institute = models.ForeignKey(
        'Institute', on_delete=models.CASCADE, related_name='user_leave_balances', blank=True, null=True
    )
    leave_type = models.ForeignKey(
        'LeaveType', on_delete=models.CASCADE, related_name='user_leave_balances', blank=True, null=True
    )
    leave_policy = models.ForeignKey(
        'InstituteLeavePolicy', on_delete=models.CASCADE, related_name='user_leave_balances', blank=True, null=True, default=None
    )
    total_paid_leaves = models.IntegerField(default=0)
    availed_paid_leaves = models.IntegerField(default=0)
    availed_unpaid_leaves = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def remaining_paid_leaves(self):
        return self.total_paid_leaves - self.availed_paid_leaves

    def update_leave_balance(self, leave_days, is_paid):
        if is_paid:
            self.availed_paid_leaves += leave_days
        else:
            self.availed_unpaid_leaves += leave_days
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.leave_type.name} - {self.remaining_paid_leaves()} remaining paid leaves" or "Unnamed"

class Leave(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('denied', 'Denied'),
        ('canceled', 'Canceled')
    ]

    LEAVE_TYPE_CHOICES = [
        ('full_day', 'Full Day'),
        ('half_day', 'Half Day')
    ]

    REASON_CHOICES = [
            ('sick', 'Sick'),
            ('vacation', 'Vacation'),
            ('personal', 'Personal'),
            ('emergency', 'Emergency'),
            ('other', 'Other')
        ]
    
    institute = models.ForeignKey(
        'Institute',
        on_delete=models.CASCADE,
        related_name='leave_requests',
        blank=True,
        null=True
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='leave_requests',
        blank=True,
        null=True
    )
    approver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='approved_leaves',
        null=True,
        blank=True
    )
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.CharField(max_length=20, choices=REASON_CHOICES, default='other')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    leave_type = models.CharField(max_length=10, choices=LEAVE_TYPE_CHOICES, default='full_day')
    is_paid = models.BooleanField(default=True)
    leave_type_categories = models.ManyToManyField( LeaveType, related_name='leaves', blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('institute', 'user', 'start_date', 'end_date', 'leave_type')

    def __str__(self):
        return f"{self.user.username}: {self.start_date} to {self.end_date} ({self.leave_type}, {self.status})" or "Unnamed"
    
class Asset(models.Model):
    institute = models.ForeignKey('Institute', on_delete=models.CASCADE, related_name='assets') 
    asset_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=1)
    
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('in_use', 'In Use'),
        ('maintenance', 'Maintenance'),
        ('retired', 'Retired'),
    ]
    
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='available')
    
    created_at = models.DateTimeField(auto_now_add=True)  # Automatically set when an asset is created
    updated_at = models.DateTimeField(auto_now=True)  # Automatically updated on each change
    
    class Meta:
        ordering = ['-created_at']  # Default ordering by creation date
    
    def __str__(self):
        return f"{self.asset_name} - {self.status} (Quantity: {self.quantity})" or "Unnamed"
    
class Timetable(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='timetables', blank=True, null=True)
    batches = models.ManyToManyField('Batch', related_name='timetables', blank=True)
    courses = models.ManyToManyField(Course, related_name='timetables', blank=True)
    remarks = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    file = models.FileField(upload_to='timetables/', blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        course_codes = ', '.join(course.courseGlobalCode for course in self.courses.all()) if self.courses.exists() else 'No Courses'
        institute_name = self.institute.name if self.institute else 'No Institute'
        return f"Timetable for {course_codes} (Institute: {institute_name})" or "Unnamed"







class InstituteOfficial(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='officials')
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    contact_email = models.EmailField()  # EmailField with built-in email validation
    official_phone = models.CharField(max_length=15, validators=[
        RegexValidator(r'^\+?1?\d{9,15}$', "Enter a valid phone number.")
    ])

    def __str__(self):
        return f"{self.name} ({self.designation})"
    
# Model for a group associated with an institute
class Group(models.Model):
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='groups')  # Each group belongs to an institute
    name = models.CharField(max_length=255)  # Group name
    description = models.TextField(blank=True, null=True)  # Optional description
    created_at = models.DateTimeField(default=timezone.now)  # Timestamp for when the group was created
    updated_at = models.DateTimeField(default=timezone.now)  # Timestamp for when the group was updated

    #def __str__(self):
     #   return f"{self.name} (Institute: {self.institute.name})"
    
class GroupMembership(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='members')  # Relationship to Group
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Relationship to User
    role = models.ForeignKey(InstitueMemberTypes, on_delete=models.CASCADE, blank=True, null=True)  # ForeignKey for role

    def __str__(self):
        role_name = self.role.name if self.role else 'No Role'
        return f"{self.user.username} in {self.group.name} - {role_name}"

def validate_file_type(value):
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.pdf']  # Allowed extensions
    extension = os.path.splitext(value.name)[1].lower()  # Get the file extension

    if extension not in allowed_extensions:
        raise ValidationError(f"Unsupported file type. Allowed types are: {', '.join(allowed_extensions)}")

class InstituteBankDetails(models.Model):
    bank_name = models.CharField(max_length=255, blank=True, null=True)
    bank_account_number = models.CharField(max_length=255, blank=True, null=True)
    ifsc_code = models.CharField(max_length=50, blank=True, null=True)
    upi_id = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f'Bank Details: {self.bank_name if self.bank_name else "N/A"}'
    
class InstituteFee(models.Model):
    class PaymentStatus(models.TextChoices):
        UNPAID = 'unpaid', 'Unpaid'
        PARTIALLY_PAID = 'partially_paid', 'Partially Paid'
        FULLY_PAID = 'fully_paid', 'Fully Paid'

    scheduled_for = models.CharField(max_length=255, default='Tuition Fee')
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=100.00)
    due_amount = models.DecimalField(max_digits=10, decimal_places=2, default=100.00)
    description = models.TextField(blank=True, null=True)
    date_of_schedule = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='institute_fees', null=True, blank=True)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='institute_fees')
    type_transaction = models.CharField(max_length=6, choices=[('credit', 'Credit'), ('debit', 'Debit')], default='debit')
    custom_user = models.CharField(max_length=255, blank=True, null=True)
    payment_link = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=15, choices=PaymentStatus.choices, default=PaymentStatus.UNPAID)

    def clean(self):
        if not (self.user or self.custom_user):
            raise ValidationError("Either a registered user or a custom user must be specified.")
        if self.user and self.custom_user:
            raise ValidationError("Only one of registered user or custom user can be specified.")
        super().clean()

    def save(self, *args, **kwargs):
        self.clean()
        self.recalculate_due_amount()
        super().save(*args, **kwargs)

    def recalculate_due_amount(self):
        total_paid = self.total_paid()
        self.due_amount = max(self.amount - total_paid, 0)
        self.update_payment_status()

    def total_paid(self):
        return self.institute_transactions.filter(status='completed').aggregate(total=Sum('amount'))['total'] or 0

    def update_payment_status(self):
        if self.due_amount == 0:
            self.status = self.PaymentStatus.FULLY_PAID
        elif self.due_amount < self.amount:
            self.status = self.PaymentStatus.PARTIALLY_PAID
        else:
            self.status = self.PaymentStatus.UNPAID

    def __str__(self):
        return f"{self.scheduled_for} - {self.amount} - {self.id}"

    class Meta:
        ordering = ('date_of_schedule',)


class InstituteTransaction(models.Model):
    fee = models.ForeignKey(InstituteFee, on_delete=models.CASCADE, related_name='institute_transactions', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='institute_transactions', blank=False, null=False)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='institute_transactions', blank=False, null=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False, default=100.00)

    TRANSACTION_TYPE_CHOICES = (
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    )
    transaction_type = models.CharField(max_length=6, choices=TRANSACTION_TYPE_CHOICES, blank=False, null=False, default='credit')
    user_type = models.CharField(max_length=6, choices=TRANSACTION_TYPE_CHOICES, blank=False, null=False, default='debit')
    institute_type = models.CharField(max_length=6, choices=TRANSACTION_TYPE_CHOICES, blank=False, null=False, default='credit')


    PAYMENT_STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending', blank=False, null=False)
    transaction_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    method = models.CharField(max_length=15, choices=(('cash', 'Cash'), ('card', 'Card'), ('bank_transfer', 'Bank Transfer'), ('online_payment', 'Online Payment')), blank=False, null=False)
    date_of_payment = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Transaction {self.transaction_id} - {self.status}"

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new or self.status == 'completed':
            self.fee.recalculate_due_amount()

@receiver(pre_save, sender=InstituteTransaction)
def handle_transaction_update(sender, instance, **kwargs):
    if instance.pk:
        old_instance = sender.objects.get(pk=instance.pk)
        if old_instance.status == 'completed' and instance.status == 'failed':
            instance.fee.recalculate_due_amount()

class InstituteFeeInstallment(models.Model):
    class InstallmentStatus(models.TextChoices):
        SCHEDULED = 'scheduled', 'Scheduled'
        PAID = 'paid', 'Paid'

    fee = models.ForeignKey('InstituteFee', on_delete=models.CASCADE, related_name='installments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateTimeField()
    paid_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=15, choices=InstallmentStatus.choices, default=InstallmentStatus.SCHEDULED)

    def mark_as_paid(self, payment_date=None):
        if self.status != self.InstallmentStatus.PAID:
            self.status = self.InstallmentStatus.PAID
            self.paid_date = payment_date or timezone.now()
            self.save(update_fields=['status', 'paid_date'])

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        status_changed_to_paid = not is_new and self.status == self.InstallmentStatus.PAID and InstituteFeeInstallment.objects.get(pk=self.pk).status != self.InstallmentStatus.PAID
        super().save(*args, **kwargs)
        if is_new or status_changed_to_paid:
            with transaction.atomic():
                self.fee.recalculate_due_amount()

    def __str__(self):
        return f"{self.amount} due on {self.due_date.strftime('%Y-%m-%d')} - Status: {self.get_status_display()}"


@receiver(post_save, sender=InstituteFeeInstallment)
def update_fee_balance(sender, instance, created, **kwargs):
    if instance.status == InstituteFeeInstallment.InstallmentStatus.PAID:
        instance.fee.recalculate_due_amount()

class InstituteMemberDocument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'institute', 'document')

    def __str__(self):
        return f"{self.user.username} - {self.institute.name} - {self.document.name}"



class BatchTimetable(models.Model):
       name = models.CharField(max_length=100, blank=True, null=True)
       file = models.FileField(upload_to='timetables/', blank=True, null=True)
       uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
       created_at = models.DateTimeField(auto_now_add=True)
       batches = models.ManyToManyField('Batch', related_name='batch_timetables') 
       def __str__(self):
           return self.name or "Unnamed Batch Time table"


class Batch(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField()
    institute = models.ForeignKey('Institute', on_delete=models.CASCADE, related_name='batches')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_batches')
    courses = models.ManyToManyField(Course, related_name='batches', blank=True)  # Add this line
    users = models.ManyToManyField(User, related_name='batches', blank=True)  # Add this line
    def __str__(self):
        return self.name or "unnamed"


class BatchAttendance(models.Model):
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='attendance_records')
    member = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='batch_attendance')
    attendance_date = models.DateField()
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    in_time = models.TimeField(blank=True, null=True)
    out_time = models.TimeField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=Attendance.STATUS_CHOICES, default='na')
    remarks = models.TextField(blank=True, null=True)
    
    class Meta:
        unique_together = ('batch', 'member', 'attendance_date')
    
    def __str__(self):
        return f"{self.batch.name} - {self.member.username} - {self.status} - {self.attendance_date.strftime('%Y-%m-%d')}" or "unnamed"

class LinkedCourseMembers(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='linked_members')
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE, related_name='linked_members')
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE, related_name='linked_members', null=True, blank=True)
    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name='linked_courses')
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.member.username} linked to {self.institute.name} via {self.course.courseFullName}" or "unnamed"
