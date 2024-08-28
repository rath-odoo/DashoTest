from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
import datetime
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import m2m_changed
from django.core.exceptions import ValidationError
from django.utils import timezone
#from django.contrib.auth import get_user_model
#User = get_user_model()
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

class MyAccountManager(BaseUserManager):
	def create_user(self, email, username, password=None):
		if not email:
			raise ValueError('Users must have an email address')
		if not username:
			raise ValueError('Users must have a username')

		user = self.model(
			email=self.normalize_email(email),
			username=username,
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, username, password):
		user = self.create_user(
			email=self.normalize_email(email),
			password=password,
			username=username,
		)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user




class MyAccountManagerAll(BaseUserManager):
      def create_user(self, username=None, email=None, phone_number=None, password=None):
        if not username and not email and not phone_number:
            raise ValueError("At least one of username, email, or phone number must be provided.")

        user = self.model(
            username=username,
            email=self.normalize_email(email) if email else None,
            phoneno=phone_number
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
      def create_superuser(self,  username, password):
                user = self.create_user(
                        #email=self.normalize_email(email),
                        password=password,
                        username=username,
                )
                user.is_admin = True
                user.is_staff = True
                user.is_superuser = True
                user.save(using=self._db)
                return user



class MyAccountManagerWEmail(BaseUserManager):
        def create_user(self, email, password=None):
                if not email:
                        raise ValueError('Users must have an email address')

                user = self.model(
                        email=self.normalize_email(email),
                        #username=username,
                )

                user.set_password(password)
                user.save(using=self._db)
                return user

        def create_superuser(self, email, password):
                user = self.create_user(
                        email=self.normalize_email(email),
                        password=password,
                        #username=username,
                )
                user.is_admin = True
                user.is_staff = True
                user.is_superuser = True
                user.save(using=self._db)
                return user





class MyAccountManagerWUsername(BaseUserManager):
        def create_user(self,  username, password=None):
                if not username:
                        raise ValueError('Users must have a username')

                user = self.model(
                        username=username,
                )

                user.set_password(password)
                user.save(using=self._db)
                return user

        def create_superuser(self,  username, password):
                user = self.create_user(
                        #email=self.normalize_email(email),
                        password=password,
                        username=username,
                )
                user.is_admin = True
                user.is_staff = True
                user.is_superuser = True
                user.save(using=self._db)
                return user







def get_profile_image_filepath(self, filename):
	return 'profile_images/' + str(self.pk) + '/profile_image.png'

def get_default_profile_image():
	return "codingwithmitch/logo_1080_1080.png"

def get_default_institute_logo():
       return "codingwithmitch/instlogodefault.png"



class UserType(models.Model):
    name=models.CharField(max_length=50)
    def __str__(self):
        return self.name or "Unnamed"


class UserTitle(models.Model):
    name=models.CharField(max_length=25)
    def __str__(self):
        return self.name or "Unnamed"


class Institute(models.Model):
      dummyoptions = (('yes','YES'),('no','NO'),)
      name = models.CharField(max_length=300,null=True, blank=True);
      city = models.CharField(max_length=300,null=True, blank=True);
      state = models.CharField(max_length=300,null=True, blank=True);
      country = models.CharField(max_length=300,null=True, blank=True);
      instlogo = models.ImageField(max_length=255, upload_to='images/', null=True, blank=True, default=get_default_institute_logo);
      dummy  = models.CharField(max_length=10, choices=dummyoptions, default='no',null=True,blank=True) 
      #def __str__(self):
      #  return "hello"


                
class DegreeName(models.Model):
      name = models.CharField(max_length=300,null=True, blank=True);
      def __str__(self):
        return self.name or "Unnamed"



class DocumentCopy(models.Model):
      name = models.CharField(max_length=300);
      doc = models.FileField(max_length=255, upload_to='images/', null=True, blank=True);
      def __str__(self):
        return self.name or "Unnamed"

class MarkSheet(models.Model):
      name = models.CharField(max_length=300,null=True, blank=True);
      doc = models.FileField(max_length=255, upload_to='images/', null=True, blank=True);
      def __str__(self):
        return self.name or "Unnamed"

class Certificate(models.Model):
      name = models.CharField(max_length=300,null=True, blank=True);
      doc = models.FileField(max_length=255, upload_to='images/', null=True, blank=True);
      def __str__(self):
        return self.name or "Unnamed"

class EduDegree(models.Model):
      institute = models.ForeignKey(Institute, on_delete=models.CASCADE,null=True, default=None,blank=True);
      degreename = models.ForeignKey(DegreeName, on_delete=models.CASCADE,null=True, default=None,blank=True);
      startDate = models.DateField(default=datetime.date.today,null=True,blank=True);
      endDate = models.DateField(default=datetime.date.today,null=True,blank=True);
      marksheets = models.ManyToManyField(MarkSheet, blank=True,default=None);
      certificates = models.ManyToManyField(Certificate, blank=True, default=None);
      #def __str__(self):
      #  return self.degreename 

      class Meta:
        ordering = ('startDate',)

class Achievements(models.Model):
      name = models.CharField(max_length=300,null=True, blank=True);
      description = models.CharField(max_length=1000,null=True, blank=True);
      startDate = models.DateField(default=datetime.date.today,null=True,blank=True);
      endDate = models.DateField(default=datetime.date.today,null=True,blank=True);
      def __str__(self):
          return self.name or "Unnamed"

class Address(models.Model):
      addOptions = (('present','PRESENT'),('permanent','PERMANENT'),)
      careof = models.CharField(max_length=200,null=True, blank=True);
      houseno = models.CharField(max_length=100,null=True, blank=True);
      streetno = models.CharField(max_length=200,null=True, blank=True);
      placename = models.CharField(max_length=200,null=True, blank=True);
      postoffice = models.CharField(max_length=200,null=True, blank=True);
      district = models.CharField(max_length=200,null=True, blank=True);
      policestn = models.CharField(max_length=200,null=True, blank=True);
      pincode = models.CharField(max_length=200,null=True, blank=True);
      city = models.CharField(max_length=200,null=True, blank=True);
      state = models.CharField(max_length=200,null=True, blank=True);
      country = models.CharField(max_length=200,null=True, blank=True);
      addressType  = models.CharField(max_length=50, choices=addOptions, default='present',null=True,blank=True);
      def __str__(self):
          return str(self.id) or "Unnamed"


class UsefullLink(models.Model):
      name = models.CharField(max_length=200, null=True,blank=True)
      link = models.CharField(max_length=1000, null=True,blank=True)
      description = models.CharField(max_length=500, null=True,blank=True)
      creationDateTime = models.DateTimeField(default=timezone.now)
      def __str__(self):
        return self.name or "Unnamed"
      class Meta:
        ordering = ('creationDateTime',)

class Account(AbstractBaseUser, PermissionsMixin):
    usertitle = models.ForeignKey(UserTitle, on_delete=models.CASCADE,null=True, default=None,blank=True)
    firstname = models.CharField(verbose_name="firstname", max_length=50, unique=False,default="",blank=True)
    lastname = models.CharField(verbose_name="lastname", max_length=50, unique=False,default="",blank=True)
    email = models.EmailField(verbose_name="email", max_length=255, default=None,unique=True, null=True )
    username = models.CharField(max_length=25, unique=True, null=True);
    phoneno = models.CharField(max_length=50, unique=True, null=True);
    usertype = models.ForeignKey(UserType, on_delete=models.CASCADE,null=True, default=None)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    profile_image = models.ImageField(max_length=255, upload_to='images/', null=True, blank=True, default=get_default_profile_image);
    hide_email = models.BooleanField(default=True);
    registrationid = models.CharField(verbose_name="regid", max_length=60, unique=False,default="");
    gender = models.CharField(verbose_name="gender", max_length=20, unique=False,default="",blank=True); 
    position = models.CharField(verbose_name="position", max_length=20, unique=False,default="",blank=True);
    dateofbirth = models.DateField(verbose_name="dob",max_length=8,unique=False,default=datetime.date.today)
    dashboard_courses = models.ManyToManyField(to='course.Course', blank=True, related_name="dashboard_courses");
    #dashboard_courses_teacher = models.ManyToManyField(to='course.Course', blank=True, related_name="dashboard_courses_teacher");
    #dashboard_courses_student = models.ManyToManyField(to='course.Course', blank=True, related_name="dashboard_courses_student");

    enrolled_courses = models.ManyToManyField(to='course.Course', blank=True, related_name="enrolled_courses") #to be depreciated
    enrollrequest_courses = models.ManyToManyField(to='course.Course', blank=True, related_name="enroll_request_courses") #to be depreciated

    enrolled_courses_student = models.ManyToManyField(to='course.Course', blank=True, related_name="enrolled_courses_student") #used for student
    enrollrequest_courses_student = models.ManyToManyField(to='course.Course', blank=True, related_name="enroll_request_courses_student")
    enrollrequest_courses_teacher = models.ManyToManyField(to='course.Course', blank=True, related_name="enroll_request_courses_teacher")
    noticeids = models.ManyToManyField(to='noticeboard.NoticeBoard', blank=True, related_name='noticeids_read')
    removednoticeids = models.ManyToManyField(to='noticeboard.NoticeBoard', blank=True, related_name='noticeids_removed')
    institute = models.CharField(verbose_name="institute", max_length=20, unique=False,default="",blank=True);
    city = models.CharField(verbose_name="city", max_length=20, unique=False,default="",blank=True);
    state = models.CharField(verbose_name="state", max_length=20, unique=False,default="",blank=True);
    country = models.CharField(verbose_name="country", max_length=20, unique=False,default="",blank=True);
    officeId_doc = models.FileField(max_length=1055, upload_to='images/', null=True, blank=True);#, default=get_default_profile_image);
    govtId1_doc = models.FileField(max_length=1055, upload_to='images/', null=True, blank=True);#, default=get_default_profile_image);
    govtId2_doc = models.FileField(max_length=1055, upload_to='images/', null=True, blank=True);#, default=get_default_profile_image);
    dobCert_doc = models.FileField(max_length=1055, upload_to='images/', null=True, blank=True);#, default=get_default_profile_image);
    educationDegrees = models.ManyToManyField(EduDegree, blank=True);
    contacts = models.ManyToManyField("self", blank=True,symmetrical=False);
    addresses =  models.ManyToManyField(Address, blank=True);
    achievements = models.ManyToManyField(Achievements, blank=True);
    generalmeetings = models.ManyToManyField(to='meeting.Meeting', blank=True);   
    generalchatgroups = models.ManyToManyField(to='chat.ChatGroup', blank=True);
    usefull_links = models.ManyToManyField(UsefullLink, blank=True);             
    about = models.TextField(blank=True);
    myinstitutes = models.ManyToManyField(to='institute.Institute', blank=True, related_name='my_institutes');

    # Deletion related fields
    is_delete_request_raised = models.BooleanField(default=False)
    delete_request_raised_at = models.DateTimeField(null=True, blank=True)
    deleted = models.BooleanField(default=False)

    USERNAME_FIELD = 'username';
    REQUIRED_FIELDS = [];
    objects = MyAccountManagerAll()


    def __str__(self):
        if self.email:
            return self.email
        elif self.phoneno:
            return self.phoneno
        else:
            return "Unnamed"

    def get_profile_image_filename(self):
       return str(self.profile_image)[str(self.profile_image).index('profile_images/' + str(self.pk) + "/"):]
    # For checking permissions. to keep it simple all admin have ALL permissons
    def has_perm(self, perm, obj=None):
       return self.is_admin
    # Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
    def has_module_perms(self, app_label):
       return True

    #def generalchatgroups_changed(sender,self, **kwargs):
    #    if kwargs['instance'].generalchatgroups.count() > 3:
    #       raise ValidationError("You can't assign more than three groups to a single user")
    #    m2m_changed.connect(generalchatgroups_changed, sender= self.generalchatgroups.through)


    #def save(self, *args, **kwargs):
    #    if self.generalchatgroups.count() > 2:
    #            return "You cannot add more than 3 groups per user";
    #    else: 
    #        super().save(*args, **kwargs)
                
    #            EduObject = EduDegree.objects.create()
    #            #Course.objects.create(**validated_data)
    #            print ("edu object: ", EduObject)
    #            self.educationDegrees.add(EduObject)
    #            self.save()
    #    super().save(**kwargs)


#class CourseEnrollRequestObject(models.Model):
#      requester =  models.ManyToManyField(Account, blank=True,related_name='enroll_requester') 
#      course = models.ManyToManyField(to='course.Course', blank=True, related_name='enroll_requester_for_thisCourse') 


class FutureCustomerContacts(models.Model):
    name = models.CharField(max_length=100);
    email = models.CharField(max_length=100);
    subject = models.CharField(max_length=100);
    message = models.CharField(max_length=1000);
    postdate = models.DateField(default=datetime.date.today);
    def __str__(self):
        return self.name or "Unnamed"

class Subscribers(models.Model):
     email = models.CharField(max_length=100);
     postdate = models.DateField(default=datetime.date.today);


class Skill(models.Model):
    name = models.CharField(max_length=50, unique=False)  # Name of the skill, unique to avoid duplicates
    description = models.TextField(blank=True)  # Optional description of the skill
    category = models.CharField(max_length=50, blank=True)  # Optional category to group skills

    def __str__(self):
        return self.name or "Unnamed"

def validate_file_type(value):
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.pdf']  # Allowed extensions
    extension = os.path.splitext(value.name)[1].lower()  # Get the file extension

    if extension not in allowed_extensions:
        raise ValidationError(f"Unsupported file type. Allowed types are: {', '.join(allowed_extensions)}")

class AcademicDetail(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='academic_details')  # Relate to the user
    school_name = models.CharField(max_length=100)  # Name of the school
    degree_name = models.CharField(max_length=100)  # Name of the degree
    field_of_study = models.CharField(max_length=100)  # Field of study
    start_date = models.DateField()  # Date when the study started
    end_date = models.DateField(null=True, blank=True)  # Date when the study ended (nullable for current studies)
    grade = models.CharField(max_length=10, null=True, blank=True)  # Optional field for grade
    description = models.TextField(blank=True)  # Additional description about the study
    activities_and_societies = models.TextField(blank=True)  # Optional field for extra-curricular activities and societies
    skills = models.ManyToManyField(Skill, blank=True, related_name='academic_details_skills')  # Relating skills to academic details
    media = models.FileField(upload_to='academic_media/', null=True, blank=True, validators=[validate_file_type])  # Optional field for additional media
    currently_studying = models.BooleanField(default=False)  # Boolean flag for indicating if the user is currently studying

    def __str__(self):
        return f"{self.school_name} - {self.degree_name} ({self.start_date} - {self.end_date if self.end_date else 'Present'})" or "Unnamed"

class AboutUs(models.Model):
    user = models.ForeignKey(Account,on_delete=models.CASCADE,related_name='about_us_user', null=True, blank=True )  # If a user relationship is needed
    description = models.TextField(default="Default About Us content")
    skills = models.ManyToManyField(Skill, related_name='about_us_skills', blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)  # Automatically set the field to now when the object is first created
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)     # Automatically set the field to now every time the object is saved

@receiver(post_save, sender=Account)
def create_default_about_us(sender, instance, created, **kwargs):
    if created:
        AboutUs.objects.create(user=instance)

class EmploymentType(models.TextChoices):
    FULL_TIME = 'Full-time',("Full-time")
    PART_TIME = 'Part-time',("Part-time")
    INTERNSHIP = 'Internship',("Internship")
    FREELANCE = 'Freelance',("Freelance")
    TRAINEE = 'Trainee',("Trainee")

class LocationType(models.TextChoices):
    ONSITE = 'On-site',("On-site")
    REMOTE = 'Remote',("Remote")
    HYBRID = 'Hybrid',("Hybrid")

class Experience(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='experiences')  # Reference to the user
    title = models.CharField(max_length=100)  # Title of the position
    employment_type = models.CharField(max_length=20, choices=EmploymentType.choices)  # Employment type
    company_name = models.CharField(max_length=100)  # Name of the company
    location = models.CharField(max_length=100)  # Location where the experience took place
    location_type = models.CharField(max_length=10, choices=LocationType.choices, default=LocationType.ONSITE)  # On-site/remote/hybrid
    currently_working = models.BooleanField(default=False)  # Flag for ongoing employment
    start_date = models.DateField()  # Start date of the employment
    end_date = models.DateField(null=True, blank=True)  # End date, nullable if currently working
    industry = models.CharField(max_length=100)  # Industry in which the employment occurred
    description = models.TextField(blank=True)  # Optional description of the employment
    profile_headline = models.CharField(max_length=200, blank=True)  # Optional headline for the profile
    skills = models.ManyToManyField(Skill, blank=True)  # Many-to-many relationship with skills
    media = models.FileField(upload_to='experience_media/', null=True, blank=True)  # Optional media associated with the experience
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)  # Automatically set the field to now when the object is first created
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)     # Automatically set the field to now every time the object is saved

    def __str__(self):
        return f"{self.title} at {self.company_name} ({self.start_date} - {self.end_date if self.end_date else 'Present'})" or "Unnamed"

class Publication(models.Model):
    user = models.ForeignKey(
        Account,  # Reference to the creating user
        on_delete=models.CASCADE,  # Delete the publication if the user is deleted
        related_name='created_publications',# To distinguish from the authors
        default=1,
        # null=True
    )
    title = models.CharField(max_length=200)  # Title of the publication
    publisher = models.CharField(max_length=100)  # Name of the publisher
    publication_date = models.DateField(default=datetime.date.today)  # Default publication date
    authors = models.ManyToManyField(
        Account,  # Collaboration with multiple users
        related_name='authored_publications',  # Unique related name
        default=1,
        # null=True
    )
    publication_url = models.URLField(blank=True, null=True)  # Optional URL for the publication
    description = models.TextField(blank=True)  # Optional description of the publication
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)  # Automatically set the field to now when the object is first created
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)     # Automatically set the field to now every time the object is saved
    
    def __str__(self):
        return self.title or "Unnamed" # Return the publication title for string representation

def validate_file_type(value):
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.pdf']  # Allowed extensions
    extension = os.path.splitext(value.name)[1].lower()  # Get the file extension

    if extension not in allowed_extensions:
        raise ValidationError(f"Unsupported file type. Allowed types are: {', '.join(allowed_extensions)}")

class LicenseOrCertificate(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='licenses_certificates')  # Relationship with User
    name = models.CharField(max_length=100)  # Name of the license or certificate
    issuing_organisation = models.CharField(max_length=100)  # Organization that issued the license or certificate
    issue_date = models.DateField()  # Date when the license or certificate was issued
    expiration_date = models.DateField(blank=True, null=True)  # Optional expiration date
    credentials_id = models.CharField(max_length=50, blank=True)  # Optional credential ID
    credentials_url = models.URLField(blank=True)  # Optional URL for credential verification
    skills = models.ManyToManyField('Skill', blank=True)  # Relationship with skills
    media = models.FileField(upload_to='license_certificates/', null=True, blank=True, validators=[validate_file_type])  # Optional media (digital copy)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)  # Automatically set the field to now when the object is first created
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)     # Automatically set the field to now every time the object is saved

    def __str__(self):
        return self.name or "Unnamed"  # Display the name for admin and debuggin


class ParentDetails(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='parent_details', blank= True, null= True)
    father_name = models.CharField(verbose_name="Father's Name", max_length=50, blank=True, default="")
    mother_name = models.CharField(verbose_name="Mother's Name", max_length=50, blank=True, default="")
    father_phone = models.CharField(verbose_name="Father's Phone", max_length=20, blank=True, default="")
    mother_phone = models.CharField(verbose_name="Mother's Phone", max_length=20, blank=True, default="")
    father_email = models.EmailField(verbose_name="Father's Email", max_length=100, blank=True, default="")
    mother_email = models.EmailField(verbose_name="Mother's Email", max_length=100, blank=True, default="")

    def __str__(self):
        return f"Parent Details of {self.account.username if self.account.username else self.account.email}" or "Unnamed"

@receiver(post_save, sender=Account)
def create_or_update_parent_details(sender, instance, created, **kwargs):
    if created:
        ParentDetails.objects.create(account=instance)
    else:
        parent_details = ParentDetails.objects.filter(account=instance).first()
        if parent_details:
            parent_details.save()
        else:
            ParentDetails.objects.create(account=instance)

class HealthData(models.Model):
    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
    ]
    account = models.OneToOneField(Account, on_delete=models.CASCADE, related_name='health_data')
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True, default="")
    height = models.DecimalField(max_digits=5, decimal_places=2, blank=True, default=0.0)
    weight = models.DecimalField(max_digits=5, decimal_places=2, blank=True, default=0.0)
    # Add any other health-related fields here

    def __str__(self):
        return f"{self.account.username} - Health Data" or "Unnamed"

@receiver(post_save, sender=Account)
def create_health_data(sender, instance, created, **kwargs):
    if created:
        HealthData.objects.create(account=instance)

class ContactRequest(models.Model):
    from_user = models.ForeignKey(Account, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(Account, related_name='received_requests', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending')

    class Meta:
        unique_together = ('from_user', 'to_user')

    def __str__(self):
        return f"{self.from_user} -> {self.to_user} ({self.status})"
