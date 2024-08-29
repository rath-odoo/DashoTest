from rest_framework import serializers
from .models import Institute, InstituteMembership, InstitueMemberTypes, Document, Attendance, Leave, Asset, Timetable
from .models import InstituteOfficial, Group, GroupMembership, InstituteBankDetails
from .models import InstituteFee, InstituteTransaction, InstituteFeeInstallment, InstituteLeavePolicy, UserLeaveBalance, LeaveType
from .models import InstituteMemberDocument
from course.models import Course, CourseDesignedFor
from eclass.models import Class
from connect.models import Post
from exam.models import Exam, SubExam
from account.models import AcademicDetail, Experience, ParentDetails, Publication, LicenseOrCertificate, Account
import datetime
from django.db import transaction
from django.contrib.auth import get_user_model
User = get_user_model()
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
from .models import socialMediaLink
from .models import Batch, BatchAttendance, BatchTimetable
from rest_framework.exceptions import ValidationError

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'email', 'gender', 'dateofbirth', 'profile_image', 'phoneno']

class CreateInstituteSerializer(serializers.ModelSerializer):
      class Meta:
        fields = ('id','name', 'logo')
        model = Institute

      #def create(self, validated_data):
      #    #print ("data: ", validated_data)
      #    instance =  Institute.objects.create(**validated_data);
      #    instance.save();
      #    user = self.context['request'].user
      #    user.myinstitutes.add(instance)
      #    user.save()

      #    return instance

      def create(self, validated_data):
        with transaction.atomic():
            # Create Institute
            instance = Institute.objects.create(**validated_data)

            # Add the user to people through InstituteMembership
            user = self.context['request'].user;
            user_type = InstitueMemberTypes.objects.get(name="Owner")
            membership = InstituteMembership.objects.create(
                user=user,
                institute=instance,
                user_type=user_type,  # Set the user_type as needed
                status='active'  # Set the status as needed
            )
            user.myinstitutes.add(instance)
            user.save()

        return instance
      
class InstituteMembershipSerializer(serializers.ModelSerializer):
    userType = serializers.CharField(write_only=True)  # New role/type for the user

    class Meta:
        model = InstituteMembership
        fields = ['user', 'institute', 'user_type', 'status', 'userType']  # List all fields to be serialized
        read_only_fields = ['user', 'institute', 'user_type', 'status']  # Read-only fields

    def update(self, instance, validated_data):
        user_type_name = validated_data.get('userType')  # Get user type from the data

        # Error handling for invalid user type
        try:
            user_type = InstitueMemberTypes.objects.get(name=user_type_name)  # Retrieve the new user type
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Invalid user type.")

        # Update the user type and save the changes
        instance.user_type = user_type  # Update the user type
        instance.save()  # Save the instance

        return instance  # Return the updated membership

class GetMyInstitutesSerializer(serializers.ModelSerializer):
      relationship = serializers.SerializerMethodField() 
      class Meta:
        fields = ['id','name', 'logo','relationship']
        model = Institute
      def get_relationship(self, instance):
        logged_in_user = self.context['request'].user
        membership = InstituteMembership.objects.filter(
            user=logged_in_user,
            institute=instance,
            status='active'  # You can adjust this condition based on your requirements
        ).first()
        if membership:
            # If the user is a member, return the user_type field
            return membership.user_type.name  # Replace 'name' with the actual field you want to return
        else:
            # If the user is not a member, return 'non-member'
            return 'non-member'


# class AddDocumentInstituteSerializer(serializers.ModelSerializer):
#      docfile = serializers.CharField(write_only=True);
#      name = serializers.CharField(write_only=True);
#      class Meta:
#           fields = ['id','name','docfile']
#           model = Institute

#      def update(self, instance, validated_data):
#         newDocObj = Document.objects.create(**validated_data)
#         instance.keydocuments.add(newDocObj);
#         instance.save();
#         return instance
     
class AddDocumentInstituteSerializer(serializers.ModelSerializer):
    docfile = serializers.FileField(write_only=True)  # Ensure it's a file field if you intend to handle file uploads
    name = serializers.CharField(write_only=True)

    class Meta:
        model = Institute
        fields = ['id', 'name', 'docfile']

    def update(self, instance, validated_data):
        # Create a new Document and add it to the Institute
        docfile = validated_data.get('docfile')
        name = validated_data.get('name')

        # Ensure the Document object is correctly created with the required fields
        new_document = Document.objects.create(name=name, docfile=docfile)
        
        instance.keydocuments.add(new_document)  # Associate the new document with the Institute
        instance.save()  # Ensure changes are saved
        return instance     


class KeyPeopleSerializer(serializers.ModelSerializer):
    relationship = serializers.SerializerMethodField()
    class Meta:
        fields = ['id', 'firstname','lastname','profile_image','relationship']
        model = User
    def get_relationship(self, user):
        institute = self.context['institute']
        membership = InstituteMembership.objects.filter(
            user=user,
            institute=institute,
            status='active'  # You can adjust this condition based on your requirements
        ).first()
        if membership:
            # If the user is a member, return the user_type field
            return membership.user_type.name  # Replace 'name' with the actual field you want to return
        else:
            # If the user is not a member, return 'non-member'
            return 'non-member'
        
class EditSocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = socialMediaLink
        fields = ['name', 'icon', 'link']

class GetSocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = socialMediaLink
        fields = ['id','name', 'icon', 'link']

class GetOneInstituteSerializer(serializers.ModelSerializer):
    relationship = serializers.SerializerMethodField()
    keypeople = KeyPeopleSerializer(many=True)
    class Meta:
        fields = ('id', 'name', 'logo', 'relationship','address','websiteurl','socialmedialinks','keypeople','keydocuments')
        model = Institute
        depth=1

    def get_serializer_context(self):
        context = super().get_serializer_context();
        context['institute'] = self.instance;  # Pass the institute object to the context
        return context;

    def get_relationship(self, instance):
        logged_in_user = self.context['request'].user;

        # Check if the logged-in user has a membership with the current institute
        membership = InstituteMembership.objects.filter(
            user=logged_in_user,
            institute=instance,
            status='active'  # You can adjust this condition based on your requirements
        ).first()

        if membership:
            # If the user is a member, return the user_type field
            return membership.user_type.name  # Replace 'name' with the actual field you want to return
        else:
            # If the user is not a member, return 'non-member'
            return 'non-member'

class EditInstituteNameLogoSerializer(serializers.ModelSerializer):
      class Meta:
        fields = ['id', 'name','logo']
        model = Institute


class EditInstituteWebUrlSerializer(serializers.ModelSerializer):
      class Meta:
        fields =['id','websiteurl']
        model = Institute


class EditInstituteAddressSerializer(serializers.ModelSerializer):
      class Meta:
          fields =['id','address']
          model = Institute


class AddInstituteMemberSerializer(serializers.Serializer):
    userId = serializers.IntegerField(write_only=True)
    userType = serializers.CharField(write_only=True)
    employee_id = serializers.CharField(write_only=True, required=False, allow_null=True)

    def create(self, validated_data):
        user = get_object_or_404(User, pk=validated_data['userId'])
        user_type = get_object_or_404(InstitueMemberTypes, name=validated_data['userType'])
        
        # Handle optional employee_id
        employee_id = validated_data.get('employee_id', None)

        membership, created = InstituteMembership.objects.update_or_create(
            user=user,
            institute=self.context['institute'],
            defaults={
                'user_type': user_type, 
                'status': 'active', 
                'employee_id': employee_id
            }
        )
        return membership

class AddMultipleInstituteMembersSerializer(serializers.ListSerializer):
    child = AddInstituteMemberSerializer()

    def create(self, validated_data):
        institute = self.context['institute']
        memberships = [
            self.child.create(member_data) for member_data in validated_data
        ]
        return memberships

class InstituteMemberSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    user_name = serializers.ReadOnlyField(source='user.username')
    firstname = serializers.ReadOnlyField(source='user.firstname')
    lastname = serializers.ReadOnlyField(source='user.lastname')
    user_type = serializers.ReadOnlyField(source='user_type.name')
    institute_name = serializers.ReadOnlyField(source='institute.name')
    firstname = serializers.ReadOnlyField(source='user.firstname')
    profile_image = serializers.ImageField(source='user.profile_image')
    role = serializers.ReadOnlyField(source='user_type.name')

    status = serializers.ReadOnlyField()

    class Meta:
        model = InstituteMembership
        fields = ['user_id','employee_id','firstname','lastname', 'profile_image','user_name', 'user_type','role', 'institute_name', 'status']
        
class DeleteMemberSerializer(serializers.Serializer):
    userId = serializers.IntegerField()
    instId = serializers.IntegerField()

    def validate(self, data):
        # Custom validation to ensure the user and institute relationship is correct
        user_id = data.get('userId')
        inst_id = data.get('instId')
        membership = InstituteMembership.objects.filter(user_id=user_id, institute_id=inst_id)
        if not membership.exists():
            raise serializers.ValidationError("The specified user is not a member of this institute.")
        return data

class UpdateInstituteMemberSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    status = serializers.ChoiceField(
        choices=InstituteMembership.statusOptions,
        required=False,
        allow_null=True
    )

    class Meta:
        model = InstituteMembership
        fields = ['user_type', 'status']

    def validate_user_type(self, value):
        if value:
            try:
                return InstitueMemberTypes.objects.get(name=value)
            except ObjectDoesNotExist:
                raise serializers.ValidationError("This user type does not exist.")
        return None

    def update(self, instance, validated_data):
        if 'status' in validated_data:
            instance.status = validated_data['status']
        if 'user_type' in validated_data and validated_data['user_type'] is not None:
            instance.user_type = validated_data['user_type']
        instance.save()
        return instance
    
class UserMembershipSerializer(serializers.ModelSerializer):
    is_member = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'firstname','lastname','profile_image','is_member']

    def get_is_member(self, obj):
        institute_id = self.context.get('institute_id')
        if institute_id:
            return InstituteMembership.objects.filter(user=obj, institute_id=institute_id).exists()
        return False
    
class AddTypeSerializer(serializers.Serializer):
    type_name = serializers.CharField(max_length=255)
    #type_url = serializers.URLField(required=False)  # For optional URLs
    type_url = serializers.CharField(max_length=1000)

    def validate(self, data):
        # You can add custom validations here
        type_name = data.get("type_name")
        if not type_name:
            raise serializers.ValidationError("Type name is required.")
        return data

# Serializer for user data
class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)
    class Meta:
        model = Account
        fields = ['id', 'firstname','lastname','profile_image']

class UserCourseSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)
    class Meta:
        model = Account
        fields = ['id', 'firstname','lastname','profile_image']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'courseShortName', 'courseGlobalCode', 'courseLocalCode', 'courseStartDate', 'courseEndDate']

class AttendanceCourseSerializer(serializers.ModelSerializer):
    member = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Attendance
        fields = [
            'institute', 'course', 'class_session', 'member', 'start_date', 
            'end_date', 'attendance_date', 'in_time', 'out_time', 'status', 
            'remarks', 'approver_status',
        ]

    def validate(self, data):
        course = data.get('course')
        class_session = data.get('class_session')

        if course and course.courseStartDate and data['start_date'] < course.courseStartDate:
            raise serializers.ValidationError({"start_date": "Attendance start date must not be before the course start date."})

        if course and course.courseEndDate and data['end_date'] > course.courseEndDate:
            raise serializers.ValidationError({"end_date": "Attendance end date must not be after the course end date."})

        return data
    
    def create(self, validated_data):
        return Attendance.objects.create(**validated_data)
    
class AttendanceCourseUpdateSerializer(serializers.ModelSerializer):
    member = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), required=False)

    class Meta:
        model = Attendance
        fields = [
            'id', 'institute', 'course', 'class_session', 'member', 'start_date', 
            'end_date', 'attendance_date', 'in_time', 'out_time', 'status', 
            'remarks', 'approver_status',
        ]

    def validate(self, data):
        course = data.get('course', self.instance.course)
        start_date = data.get('start_date', self.instance.start_date)
        end_date = data.get('end_date', self.instance.end_date)

        if course and course.courseStartDate and start_date and start_date < course.courseStartDate:
            raise serializers.ValidationError({"start_date": "Attendance start date must not be before the course start date."})

        if course and course.courseEndDate and end_date and end_date > course.courseEndDate:
            raise serializers.ValidationError({"end_date": "Attendance end date must not be after the course end date."})

        return data
    
    def update(self, instance, validated_data):
        instance.institute = validated_data.get('institute', instance.institute)
        instance.course = validated_data.get('course', instance.course)
        instance.class_session = validated_data.get('class_session', instance.class_session)
        instance.member = validated_data.get('member', instance.member)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.attendance_date = validated_data.get('attendance_date', instance.attendance_date)
        instance.in_time = validated_data.get('in_time', instance.in_time)
        instance.out_time = validated_data.get('out_time', instance.out_time)
        instance.status = validated_data.get('status', instance.status)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.approver_status = validated_data.get('approver_status', instance.approver_status)
        instance.save()
        return instance

class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name']  # Include other institute-related fields

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'serialNo', 'address', 'topics', 'about']  # Adjust fields as needed
    
# Serializer for attendance data
class AttendanceCourseClassSerializer(serializers.ModelSerializer):
    member = UserSerializer() 
    institute = InstituteSerializer()
    course = CourseSerializer()
    class_session = ClassSerializer()

    class Meta:
        model = Attendance
        fields = [
            'id', 'institute', 'course', 'class_session', 'member',
            'attendance_date', 'in_time', 'out_time', 'status',
            'remarks', 'start_date', 'end_date'
        ]

class AttendanceSerializer(serializers.ModelSerializer):
    member = UserSerializer() 
    class Meta:
        model = Attendance
        fields = ['id', 'institute', 'member', 'attendance_date', 'in_time', 'out_time', 'status', 'remarks', 'start_date', 'end_date']    

class AttendanceCreateSerializer(serializers.ModelSerializer):
    member = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    status = serializers.ChoiceField(choices=Attendance.STATUS_CHOICES, default='na', required=False)
    institute = serializers.PrimaryKeyRelatedField(queryset=Institute.objects.all(), required=True)

    class Meta:
        model = Attendance
        fields = [
            'id', 'member', 'start_date', 'end_date', 'in_time', 'out_time', 'status', 'approver', 'remarks', 'institute', 'approver_status'
        ]
        extra_kwargs = {
            'start_date': {'required': True},  # Start date must be provided
            'end_date': {'required': True},  # End date must be provided
            'attendance_date': {'required': False},  # Attendance date must be provided
            'in_time': {'required': False},  # Optional field, no default
            'out_time': {'required': False},  # Optional field, no default
            'approver': {'required': False},  # Optional field, no default
            'remarks': {'required': False, 'allow_blank': True, 'allow_null': True}  # Optional field
        }

    def validate(self, data):
        # Check if attendance already exists for the given period and is in pending state
        if Attendance.objects.filter(
            member=data['member'],
            institute=data['institute'],
            start_date__lte=data['end_date'],
            end_date__gte=data['start_date'],
            approver_status='pending'
        ).exists():
            raise serializers.ValidationError("Attendance already exists for the given date range in a pending state.")
        return data

    def create(self, validated_data):
        # Set the default approver_status to 'pending'
        validated_data['approver_status'] = 'pending'
        return super().create(validated_data)
    
class AttendanceUpdateSerializer(serializers.ModelSerializer):
    in_time = serializers.TimeField(required=False)
    out_time = serializers.TimeField(required=False)
    start_date = serializers.DateField(required=False)
    end_date = serializers.DateField(required=False)
    status = serializers.CharField(max_length=10, required=False)
    remarks = serializers.CharField(max_length=255, required=False, allow_blank=True)
    approver_status = serializers.CharField(max_length=10, required=False)

    class Meta:
        model = Attendance
        fields = ['in_time', 'out_time', 'status', 'remarks', 'start_date', 'end_date', 'approver_status', 'approver']

    def update(self, instance, validated_data):
        instance.in_time = validated_data.get('in_time', instance.in_time)
        instance.out_time = validated_data.get('out_time', instance.out_time)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.status = validated_data.get('status', instance.status)
        instance.remarks = validated_data.get('remarks', instance.remarks)
        instance.approver_status = validated_data.get('approver_status', instance.approver_status)
        instance.approver = validated_data.get('approver', instance.approver)
        instance.save()
        return instance
    
class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name', 'address']  # Adjust fields as needed

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'courseFullName', 'courseGlobalCode','courseShortName']  # Adjust fields as needed

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ['id', 'name', 'description']  # Adjust fields as needed
    
class AttendanceComprehensiveSerializer(serializers.ModelSerializer):
    institute = InstituteSerializer(read_only=True)
    course = CourseSerializer(read_only=True, required=False)
    class_session = ClassSerializer(read_only=True, required=False)
    member = UserSerializer(read_only=True) 
    class Meta:
        model = Attendance
        fields = [
            'id', 'institute', 'course', 'class_session', 'member', 'attendance_date',
            'in_time', 'out_time', 'approver_status', 'status', 'remarks', 'start_date', 'end_date'
        ]
    
class AttendanceFilterSerializer(serializers.Serializer):
    start_date = serializers.DateField(required=False)  # Optional start date
    end_date = serializers.DateField(required=False)  # Optional end date
    user_id = serializers.IntegerField(required=False)  # Optional user ID

class LinkCourseSerializer(serializers.Serializer):
    course_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False
    )

    def validate_course_ids(self, value):
        for course_id in value:
            if not Course.objects.filter(id=course_id).exists():
                raise serializers.ValidationError(f"Course with ID {course_id} does not exist.")
        return value

# CourseDesignedFor Serializer
class CourseDesignedForSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseDesignedFor
        fields = ['name', 'boardofeducation']

class CourseReferenceSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()

    def to_representation(self, instance):
        # Use a representation that only includes the course ID
        return {
            'course_id': instance.id,
            'course_global_code': instance.courseGlobalCode,
            'course_name': instance.courseFullName,
            'course_short_name': instance.courseShortName,
            'designed_for': CourseDesignedForSerializer(instance.designedFor).data,
            'status': instance.courseStatus,
        }

class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveType
        fields = ['id', 'name', 'total_leaves']
        
class LeaveCreateUpdateSerializer(serializers.ModelSerializer):
    approver_id = serializers.IntegerField(required=False, allow_null=True)  # Approver as ID
    leave_type_category_id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = Leave
        fields = ['start_date', 'end_date', 'reason', 'leave_type', 'approver_id', 'is_paid', 'leave_type_category_id']  # Include relevant fields

    def validate(self, data):
        # Custom validation logic for approver
        approver_id = data.get("approver_id")
        if approver_id:
            User = get_user_model()  # Fetch the user model class
            approver = get_object_or_404(User, pk=approver_id)  # Get by ID

            # Ensure approver is part of the same institute
            institute = self.context['institute']
            if not InstituteMembership.objects.filter(user=approver, institute=institute).exists():
                raise serializers.ValidationError("The approver must be part of the same institute.")

        return data

    def create(self, validated_data):
        approver_id = validated_data.pop('approver_id', None)
        leave_type_category_id = validated_data.pop('leave_type_category_id')
        leave_type_category = get_object_or_404(LeaveType, pk=leave_type_category_id)
        leave = Leave.objects.create(leave_type_category=leave_type_category, **validated_data)
        if approver_id:
            leave.approver = get_object_or_404(get_user_model(), pk=approver_id)
            leave.save()
        return leave

    def update(self, instance, validated_data):
        approver_id = validated_data.pop('approver_id', None)
        leave_type_category_id = validated_data.pop('leave_type_category_id')
        leave_type_category = get_object_or_404(LeaveType, pk=leave_type_category_id)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.leave_type_category = leave_type_category
        if approver_id:
            instance.approver = get_object_or_404(get_user_model(), pk=approver_id)
        instance.save()
        return instance


# Serializer for displaying leave requests
class LeaveSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    approver_name = serializers.CharField(source='approver.username', read_only=True, default=None)

    class Meta:
        model = Leave
        fields = ['id', 'user_name', 'start_date', 'end_date', 'reason', 'status', 'created_at', 'approver_name']

class InstituteMemberTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitueMemberTypes
        fields = '__all__'

class InstituteMemberLeavePolicySerializer(serializers.ModelSerializer):
    leave_types = LeaveTypeSerializer(many=True)
    member_type = InstituteMemberTypesSerializer()
    class Meta:
        model = InstituteLeavePolicy
        fields = ['id', 'leave_types', 'member_type', 'created_at', 'updated_at', 'institute']

class InstituteLeavePolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteLeavePolicy
        fields ='__all__'

class UserLeaveBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLeaveBalance
        fields = '__all__'

class LeaveListSerializer(serializers.ModelSerializer):
    leave_type_name = serializers.SerializerMethodField()
    user = UserSerializer()
    leave_policy = serializers.SerializerMethodField()
    approver = UserSerializer() 

    class Meta:
        model = Leave
        fields = [
            'id', 'start_date', 'end_date', 'status', 'reason', 'created_at', 
            'leave_type_name', 'user', 'leave_policy', 'approver', 'leave_type'
        ]

    def get_leave_type_name(self, obj):
        leave_type = obj.leave_type_categories.first()
        return leave_type.name if leave_type else None

    def get_leave_policy(self, obj):
        leave_balance = UserLeaveBalance.objects.filter(
            user=obj.user, 
            institute=obj.institute, 
            leave_type__in=obj.leave_type_categories.all()
        ).first()
        if leave_balance:
            leave_policy = leave_balance.leave_policy
            leave_type_name = leave_balance.leave_type.name
            leave_type_id = leave_balance.leave_type.id
            return {
                'policy_name': leave_policy.__str__(),
                'leave_type_id': leave_type_id,
                'leave_type_name': leave_type_name,
                'is_paid': obj.is_paid,
                'total_paid_leaves': leave_balance.total_paid_leaves,
                'availed_paid_leaves': leave_balance.availed_paid_leaves,
                'remaining_paid_leaves': leave_balance.remaining_paid_leaves(),
            }
        return None


class LeaveEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = ['start_date', 'end_date']  # Fields that can be edited

class AssetSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)  # Custom format
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)  # Custom format

    class Meta:
        model = Asset
        fields = ['id', 'asset_name', 'quantity', 'status', 'created_at', 'updated_at']  # The fields to be serialized
        read_only_fields = ['id', 'created_at', 'updated_at']  # Fields that shouldn't be edited manually

    def validate_quantity(self, value):
        # Ensure the quantity is greater than zero
        if value < 1:
            raise serializers.ValidationError("Quantity must be at least 1.")
        return value

    def validate(self, data):
        # Additional custom validation logic, if required
        return data

class BatchTimeTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['id', 'name', 'start_date', 'end_date', 'created_by']

class TimetableSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    uploaded_by = UserSerializer(read_only=True)
    courses = CourseSerializer(many=True, read_only=True)
    course_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    batches = serializers.SerializerMethodField()
    batch_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    institute = serializers.PrimaryKeyRelatedField(queryset=Institute.objects.all())

    class Meta:
        model = Timetable
        fields = ['id', 'institute', 'courses', 'course_ids', 'batches', 'batch_ids', 'remarks', 'file', 'uploaded_by', 'created_at', 'updated_at']

    def get_batches(self, obj):
        request = self.context.get('request', None)
        batch_id = self.context.get('batch_id', None)
        if batch_id:
            batch = obj.batches.filter(id=batch_id).first()
            if batch:
                return BatchSerializer(batch).data
            else:
                return None
        return BatchSerializer(obj.batches, many=True).data

    def validate_remarks(self, value):
        if not value.strip():
            raise serializers.ValidationError("Remarks cannot be empty.")
        return value

    def create(self, validated_data):
        course_ids = validated_data.pop('course_ids', [])
        batch_ids = validated_data.pop('batch_ids', [])
        timetable = Timetable.objects.create(**validated_data)
        timetable.courses.set(course_ids)
        timetable.batches.set(batch_ids)
        return timetable

    def update(self, instance, validated_data):
        course_ids = validated_data.pop('course_ids', None)
        batch_ids = validated_data.pop('batch_ids', None)
        instance = super().update(instance, validated_data)
        if course_ids is not None:
            instance.courses.set(course_ids)
        if batch_ids is not None:
            instance.batches.set(batch_ids)
        return instance
    
class PDFUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = ['class_name', 'pdf_url']

    def validate_pdf_url(self, value):
        # Add any additional validation logic for the URL, if needed
        if not value.startswith("http"):  # For example, ensuring it starts with 'http' or 'https'
            raise serializers.ValidationError("Invalid PDF URL. Must start with 'http' or 'https'.")
        return value

    def validate_class_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Class name cannot be empty.")
        return value

class InstituteOfficialSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteOfficial
        fields = ['id', 'institute', 'name', 'designation', 'contact_email', 'official_phone']  # Fields to serialize
        read_only_fields = ['id', 'institute']  # ID and institute are read-only to prevent modification

    def validate_contact_email(self, value):
        # Custom validation for email address
        if not value or '@' not in value:
            raise serializers.ValidationError("Invalid email address.")
        return value

class InstituteOfficialUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteOfficial
        fields = ['name', 'designation', 'contact_email', 'official_phone']  # Editable fields
        read_only_fields = ['id', 'institute']  # ID and institute should not be modified

    def validate_contact_email(self, value):
        # Custom validation for email
        if not value or '@' not in value:
            raise serializers.ValidationError("Invalid email address.")
        return value

# Serializer for group memberships to get user details and role
class GroupMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested serializer to get user details
    role = serializers.CharField(source='role.name')  # Extract the role name for display

    class Meta:
        model = GroupMembership
        fields = ['user', 'role']  # Serialize user and role information

# Serializer for groups with nested members and posts
class GroupSerializer(serializers.ModelSerializer):
    members = GroupMembershipSerializer(many=True, read_only=True)  # List all members with their roles
    posts = serializers.StringRelatedField(many=True, read_only=True)  # Display related posts as strings (optional)
    
    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'created_at', 'members', 'posts']  # Include key group information

# Serializer for creating a group in an institute
class CreateGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name', 'description']  # Fields required to create a group
    
    def validate(self, data):
        # Basic validation for required fields
        if 'name' not in data or not data['name'].strip():
            raise serializers.ValidationError("The group must have a name.")

        return data
    
# Serializer for creating a post in a group
class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'attachment']  # Fields required to create a post

class InstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteFeeInstallment
        fields = ['id','fee', 'amount', 'due_date']

class FeeSerializer(serializers.ModelSerializer):
    installments = InstallmentSerializer(many=True, read_only=True)
    user_details = serializers.SerializerMethodField()
    institute_details = serializers.SerializerMethodField()
    class Meta:
        model = InstituteFee
        fields = ['id','scheduled_for','type_transaction', 'amount', 'description', 'date_of_schedule', 'user', 'custom_user', 
                  'due_amount', 'institute', 'installments', 'user_details', 'institute_details']
    
    def get_user_details(self, obj):
        membership = InstituteMembership.objects.filter(user=obj.user, institute=obj.institute).first()
        if membership:
            return InstituteMemberSerializer(membership).data
        return None

    def get_institute_details(self, obj):
        return {
            'id': obj.institute.id,
            'name': obj.institute.name
        }    
    
    def validate(self, data):
        user = data.get('user')
        custom_user = data.get('custom_user')

        if not (user or custom_user):
            raise serializers.ValidationError("Either 'user' or 'custom_user' must be provided.")
        if user and custom_user:
            raise serializers.ValidationError("Only one of 'user' or 'custom_user' can be provided.")
        return data
    
    def create(self, validated_data):
        # Create the InstituteFee instance with all necessary fields
        return InstituteFee.objects.create(**validated_data)



class InstituteViewFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id','name','logo' ]


class UserViewFeeSerializer(serializers.ModelSerializer):
    relationship = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id','firstname','lastname','profile_image','relationship']
    def get_relationship(self, instance):
        
        institute = self.context.get('institute')
        membership = InstituteMembership.objects.filter(
            user=instance,
            institute=institute,
            status='active'  # You can adjust this condition based on your requirements
        ).first()
        if membership:
            # If the user is a member, return the user_type field
            return membership.user_type.name  # Replace 'name' with the actual field you want to return
        else:
            # If the user is not a member, return 'non-member'
            return 'non-member'

class InstituteTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteTransaction
        fields = '__all__'

class FeeViewSerializer(serializers.ModelSerializer):
    installments = InstallmentSerializer(many=True, read_only=True)
    user = UserViewFeeSerializer(read_only=True);
    institute_transactions = InstituteTransactionSerializer(many=True, read_only=True)
    institute = InstituteViewFeeSerializer(read_only=True);
    class Meta:
        model = InstituteFee
        fields = ['id','scheduled_for','type_transaction', 'amount', 'description', 'date_of_schedule', 'user', 'custom_user', 'due_amount', 'institute', 'installments', 'institute_transactions', 'status']
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        institute = instance.institute  # Get the institute object from the instance
        user_serializer = self.fields['user']
        # Bind the field to get context only if it's not already bound
        if not user_serializer.context.get('institute'):
            user_serializer.context['institute'] = institute  # Pass the institute to the context
        representation['user'] = user_serializer.to_representation(instance.user)
        return representation



class TransactionFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteTransaction
        fields = ['id','fee', 'user', 'institute', 'amount', 'user_type', 'institute_type', 'status', 'method', 'date_of_payment']

    def create(self, validated_data):
        return InstituteTransaction.objects.create(**validated_data)


class InstituteOneFeeSerializer(serializers.ModelSerializer):
    installments = InstallmentSerializer(many=True, read_only=True)
    user = UserViewFeeSerializer(read_only=True);
    institute = InstituteViewFeeSerializer(read_only=True);
    institute_transactions = InstituteTransactionSerializer(many=True, read_only=True)
    class Meta:
        model = InstituteFee
        fields = ['id','scheduled_for','type_transaction', 'amount', 'description', 'date_of_schedule', 'user', 'custom_user', 'due_amount', 'institute', 'installments','status','institute_transactions']
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        institute = instance.institute  # Get the institute object from the instance
        user_serializer = self.fields['user']
        # Bind the field to get context only if it's not already bound
        if not user_serializer.context.get('institute'):
            user_serializer.context['institute'] = institute  # Pass the institute to the context
        representation['user'] = user_serializer.to_representation(instance.user)
        return representation


class FeeEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteFee
        fields = ['id','scheduled_for', 'amount', 'description', 'date_of_schedule' ]
        read_only_fields = ['user', 'institute']  # Prevent changing key attributes

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'firstname','lastname','profile_image','email']  # Add other relevant user fields

class InstituteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name']  # Include other institute-related fields

class ClassSessionSerializer(serializers.ModelSerializer):
    course_details = serializers.SerializerMethodField()

    class Meta:
        model = Class
        fields = ['id', 'courseId', 'serialNo', 'status', 'datetime', 'duration', 'about', 'meetingLink', 'address', 'course_details']

    def get_course_details(self, obj):
        if obj.courseId:
            course = Course.objects.filter(id=obj.courseId).first()
            if course:
                return {
                    'course_name': course.courseFullName,
                    'course_id': course.id,
                    'creator_name': course.creater.username if course.creater else None,
                    'courseGlobalCode': course.courseGlobalCode if course.courseGlobalCode else None,
                    'designedFor': course.designedFor.name if course.designedFor.name else None,
                    'courseShortName': course.courseShortName if course.courseShortName else None
                }
        return None
    
class CourseSerializer(serializers.ModelSerializer):
    creator_name = serializers.CharField(source='creater.username', read_only=True)
    classes = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'courseFullName', 'creator_name', 'classes', 'courseGlobalCode', 'designedFor','courseShortName',  'courseStartDate', 'courseEndDate']

    def get_classes(self, obj):
        class_sessions = Class.objects.filter(courseId=obj.id)
        return ClassSessionSerializer(class_sessions, many=True).data



class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteTransaction
        fields = [
            'transaction_id',
            'method',
            'status',
            'date_of_payment',
            'user_type',
            'institute_type'
        ]  # Include relevant transaction fields

class DetailedFeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested user information
    institute = InstituteSerializer()  # Nested institute information
    transactions = TransactionSerializer(many=True, read_only=True)  # Related transactions

    class Meta:
        model = InstituteFee
        fields = [
            'scheduled_for',
            'amount',
            'description',
            'date_of_schedule',
            'date_of_payment',
            'user',  # User associated with the fee
            'institute',  # Institute associated with the fee
            'transactions'  # All transactions related to this fee
        ]  # Include all relevant fields

class UserCourseSerializer(serializers.ModelSerializer):
    course_ids = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'profile_image', 'course_ids']

    def get_course_ids(self, obj):
        # Get courses where the user is a teacher
        teacher_courses = Course.objects.filter(teachers=obj).values_list('id', flat=True)
        # Get courses where the user is an enrolled student
        student_courses = Course.objects.filter(enrolled_students=obj).values_list('id', flat=True)
        # Get courses where the user has an enrollment request
        enrollment_request_courses = Course.objects.filter(enrolement_requests=obj).values_list('id', flat=True)
        
        # Combine and return the unique course IDs
        return list(set(teacher_courses) | set(student_courses) | set(enrollment_request_courses))

class UserMembershipSerializer(serializers.ModelSerializer):
    course_ids = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'profile_image', 'course_ids']

    def get_course_ids(self, obj):
        # Get courses where the user is a teacher
        teacher_courses = Course.objects.filter(teachers=obj).values_list('id', flat=True)
        # Get courses where the user is an enrolled student
        student_courses = Course.objects.filter(enrolled_students=obj).values_list('id', flat=True)
        # Get courses where the user has an enrollment request
        enrollment_request_courses = Course.objects.filter(enrolement_requests=obj).values_list('id', flat=True)
        
        # Combine and return the unique course IDs
        return list(set(teacher_courses) | set(student_courses) | set(enrollment_request_courses))
    
class InstituteBankDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteBankDetails
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'usertitle', 'firstname', 'lastname', 'email', 'username', 'phoneno', 'usertype',
            'date_joined', 'last_login', 'profile_image', 'hide_email', 'registrationid', 'gender', 'position',
            'dateofbirth', 'dashboard_courses', 'enrolled_courses', 'enrollrequest_courses', 'enrolled_courses_student',
            'enrollrequest_courses_student', 'enrollrequest_courses_teacher', 'noticeids', 'removednoticeids', 'institute',
            'city', 'state', 'country', 'officeId_doc', 'govtId1_doc', 'govtId2_doc', 'dobCert_doc', 'educationDegrees',
            'contacts', 'addresses', 'achievements', 'generalmeetings', 'generalchatgroups', 'usefull_links',
            'myinstitutes', 'is_delete_request_raised', 'delete_request_raised_at', 'deleted'
        ]

class InstituteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name', 'logo']

class CourseProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'courseFullName', 'courseGlobalCode', 'courseStatus', 'courseShortName']

class AttendanceProfileSerializer(serializers.ModelSerializer):
    user = UserViewFeeSerializer(read_only=True);
    class Meta:
        model = Attendance
        fields = ['id', 'course', 'attendance_date', 'status', 'remarks', 'created_at', 'updated_at', 'user']

class AcademicDetailProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicDetail
        fields = '__all__'

class ExperienceProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class PublicationProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'

class LicenseOrCertificateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenseOrCertificate
        fields = '__all__'

class ParentDetailsProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentDetails
        fields = '__all__'



class BasicUserSerializer(serializers.ModelSerializer):
     class Meta:
        model = User
        fields = ['id','firstname','lastname','phoneno', 'email','profile_image']


class InstituteMembershipProfileSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    institute = InstituteProfileSerializer()
    attendance_records = AttendanceProfileSerializer(many=True)
    courses = CourseProfileSerializer(many=True)

    class Meta:
        model = InstituteMembership
        fields = ['user', 'institute', 'user_type', 'datejoined', 'status', 'attendance_records', 'courses']


class InstituteTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstituteTransaction
        fields = ['id', 'fee', 'user', 'institute', 'amount', 'transaction_type', 'user_type', 'institute_type', 'status', 'transaction_id', 'method', 'date_of_payment']

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['id', 'name', 'docfile', 'uploadtime']


class InstituteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institute
        fields = ['id', 'name', 'address', 'websiteurl']

class InstituteMemberDocumentSerializer(serializers.ModelSerializer):
    document = DocumentSerializer()
    user = UserProfileSerializer(read_only=True)
    institute = InstituteProfileSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user', write_only=True)
    institute_id = serializers.PrimaryKeyRelatedField(queryset=Institute.objects.all(), source='institute', write_only=True)
    
    class Meta:
        model = InstituteMemberDocument
        fields = ['user', 'user_id', 'institute', 'institute_id', 'document', 'added_at']
        read_only_fields = ['added_at']

    def create(self, validated_data):
        document_data = validated_data.pop('document')
        document = Document.objects.create(**document_data)
        institute_member_document = InstituteMemberDocument.objects.create(document=document, **validated_data)
        return institute_member_document

    def update(self, instance, validated_data):
        document_data = validated_data.pop('document')
        document_id = document_data.get('id')
        if document_id:
            document = get_object_or_404(Document, id=document_id)
        else:
            document = instance.document

        instance.user = validated_data.get('user', instance.user)
        instance.institute = validated_data.get('institute', instance.institute)
        instance.save()

        document.name = document_data.get('name', document.name)
        if 'docfile' in document_data:
            document.docfile = document_data['docfile']
        document.save()

        return instance
    
class BatchSerializer(serializers.ModelSerializer):
    created_by = BasicUserSerializer(read_only=True)
    courses = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = Batch
        fields = ['id', 'name', 'start_date', 'end_date', 'institute', 'created_by', 'courses']

    def validate(self, data):
        if self.instance is None:
            # This is a create operation
            user = data.get('created_by')
            institute = data.get('institute')
            
            if user and institute and not InstituteMembership.objects.filter(
                user=user,
                institute=institute,
                user_type__name__in=["Owner", "Admin"]
            ).exists():
                raise serializers.ValidationError("You do not have permission to create a batch for this institute.")
        
        return data

    def update(self, instance, validated_data):
        # For update, only check if institute and created_by are present in validated_data
        institute = validated_data.get('institute', instance.institute)
        created_by = validated_data.get('created_by', instance.created_by)

        if created_by and institute and not InstituteMembership.objects.filter(
            user=created_by,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise serializers.ValidationError("You do not have permission to edit this batch.")

        return super().update(instance, validated_data)




class TimetableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timetable
        fields = ['id','created_at','file','uploaded_by','remarks']






class BatchTimetableSerializer(serializers.ModelSerializer):
    batch_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True
    )
    batches = BatchSerializer(many=True, read_only=True)

    class Meta:
        model = BatchTimetable
        fields = ['id', 'name', 'file', 'created_at', 'batch_ids', 'batches']

    def create(self, validated_data):
        batch_ids = validated_data.pop('batch_ids', [])
        try:
            with transaction.atomic():
                batch_timetable = BatchTimetable.objects.create(**validated_data)
                for batch_id in batch_ids:
                    batch = Batch.objects.get(id=batch_id)
                    batch_timetable.batches.add(batch)
                return batch_timetable
        except Batch.DoesNotExist:
            raise ValidationError(f"Batch with id {batch_id} does not exist.")
        except Exception as e:
            raise ValidationError(f"An error occurred: {e}")

    def update(self, instance, validated_data):
        batch_ids = validated_data.pop('batch_ids', [])
        instance = super().update(instance, validated_data)
        if batch_ids:
            instance.batches.clear()
            for batch_id in batch_ids:
                batch = Batch.objects.get(id=batch_id)
                instance.batches.add(batch)
        return instance



class BatchTimetableListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchTimetable
        fields = ['id', 'name', 'file', 'uploaded_by', 'created_at']


class InstituteBatchTimeTableSerializer(serializers.ModelSerializer):
    batchtimetable = BatchTimetableListSerializer()
    class Meta:
        model = Batch
        fields = ['id', 'name', 'start_date', 'end_date', 'batchtimetable'] 


class BatchWithTimeTableSerializer(serializers.ModelSerializer):
    created_by = BasicUserSerializer(read_only=True)
    #courses = CourseSerializer(many=True, read_only=True)
    timetables = TimetableSerializer(many=True, read_only=True)

    class Meta:
        model = Batch
        fields = ['id', 'name', 'start_date', 'end_date', 'institute', 'created_by', 'timetables']

    def validate(self, data):
        if self.instance is None:
            # This is a create operation
            user = data.get('created_by')
            institute = data.get('institute')

            if user and institute and not InstituteMembership.objects.filter(
                user=user,
                institute=institute,
                user_type__name__in=["Owner", "Admin"]
            ).exists():
                raise serializers.ValidationError("You do not have permission to create a batch for this institute.")

        return data

    def update(self, instance, validated_data):
        # For update, only check if institute and created_by are present in validated_data
        institute = validated_data.get('institute', instance.institute)
        created_by = validated_data.get('created_by', instance.created_by)

        if created_by and institute and not InstituteMembership.objects.filter(
            user=created_by,
            institute=institute,
            user_type__name__in=["Owner", "Admin"]
        ).exists():
            raise serializers.ValidationError("You do not have permission to edit this batch.")

        return super().update(instance, validated_data)



class LinkCourseToBatchSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)

    class Meta:
        model = Batch
        fields = ['id', 'name', 'start_date', 'end_date', 'institute', 'created_by', 'courses']

class DelinkCourseFromBatchSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), many=True)

    class Meta:
        model = Batch
        fields = ['id', 'courses']

class BatchAttendanceSerializer(serializers.ModelSerializer):
    batch = BatchSerializer()
    member = UserSerializer()
    institute = serializers.SerializerMethodField()
    course_ids = serializers.SerializerMethodField()

    class Meta:
        model = BatchAttendance
        fields = ['id', 'batch', 'member', 'attendance_date', 'start_date', 'end_date', 'in_time', 'out_time', 'status', 'remarks', 'institute', 'course_ids']

    def get_institute(self, obj):
        return InstituteSerializer(obj.batch.institute).data

    def get_course_ids(self, obj):
        return [course.id for course in obj.batch.courses.all()]

class InstituteMembershipSerializerBatch(serializers.ModelSerializer):
    class Meta:
        model = InstituteMembership
        fields = ['user_type']


class UserSerializerBatch(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'firstname', 'lastname', 'profile_image', 'email', 'role']  # Add other relevant user fields

    def get_role(self, obj):
        # Assume there's only one membership per user per institute
        membership = obj.membership[0] if obj.membership else None
        if membership and membership.user_type:
            return membership.user_type.name
        return None
    

class BatchCourseSerializers(serializers.ModelSerializer):
    enrolled_students = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'courseShortName', 'courseGlobalCode', 'courseLocalCode', 'courseStartDate', 'courseEndDate', 'enrolled_students']

class SubExamSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    class Meta:
        model = SubExam
        fields = ['id', 'name', 'total_marks', 'parent_exam', 'courses']
