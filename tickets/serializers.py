from rest_framework import serializers
from .models import Ticket,Category, TicketCommentNew, TicketAttachment

from course.models import Course
from django.contrib.auth import get_user_model
User = get_user_model()
from django.utils import timezone

class AuthorSerializer(serializers.ModelSerializer):
    usertitle= serializers.ReadOnlyField(source='usertitle.name')
    class Meta:
        fields =('id','username','usertitle','firstname','lastname','profile_image')
        model = User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','name')
        model = Category


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    category = CategorySerializer()
    class Meta:
        fields = ('id', 'title', 'author','category', 'excerpt', 'content', 'status','pstatus','priority','resolution','created_at','last_comment_time','visibility')
        model = Ticket
        

class TicketSerializer(serializers.ModelSerializer):
      class Meta:
          fields =('id','title','category','priority','visibility','content','status')
          model = Ticket
          depth=1

class CreateTicketSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    attachments = serializers.ListField(
        child=serializers.FileField(allow_empty_file=False),
        write_only=True,
        required=False
    )
    category_name = serializers.CharField(source='category.name', read_only=True)
    attachment_files = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'category', 'category_name', 'priority', 'visibility', 'content', 'attachments', 'attachment_files')

    def create(self, validated_data):
        category = validated_data.pop('category')
        attachments = validated_data.pop('attachments', [])
        author = self.context['author']
        course = self.context['course']

        new_ticket = Ticket.objects.create(
            author=author,
            category=category,
            **validated_data
        )

        for attachment in attachments:
            ticket_attachment = TicketAttachment.objects.create(
                afile=attachment,
                uploader=author
            )
            new_ticket.ticketFiles.add(ticket_attachment)

        new_ticket.save()
        course.tickets.add(new_ticket)
        course.save()
        return new_ticket

    def get_attachment_files(self, obj):
        return [attachment.afile.url for attachment in obj.ticketFiles.all()]
    
class EditTicketSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    attachments = serializers.ListField(
        child=serializers.FileField(allow_empty_file=False),
        write_only=True,
        required=False
    )
    category_name = serializers.CharField(source='category.name', read_only=True)
    #attachment_files = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ('id', 'title', 'category', 'category_name', 'priority', 'visibility', 'content', 'status', 'attachments')

    def update(self, instance, validated_data):

        print ("validated_data: ", validated_data);
        category = validated_data.pop('category')
        attachments = validated_data.pop('attachments', [])
        author = self.context['author']

        instance.title = validated_data.get('title', instance.title)
        instance.category = category
        instance.priority = validated_data.get('priority', instance.priority)
        instance.visibility = validated_data.get('visibility', instance.visibility)
        instance.content = validated_data.get('content', instance.content)
        instance.status = validated_data.get('status', instance.status)
        
        instance.save()

        for attachment in attachments:
            ticket_attachment = TicketAttachment.objects.create(
                afile=attachment,
                uploader=author
            )
            instance.ticketFiles.add(ticket_attachment)

        instance.save()
        return instance

    def get_attachment_files(self, obj):
        return [attachment.afile.url for attachment in obj.ticketFiles.all()]

class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketAttachment
        fields = ('id', 'name', 'description', 'afile', 'uploader')


class CreateCommentTicketSerializer(serializers.ModelSerializer):

    #commenter = serializers.SerializerMethodField()  
    attachments = serializers.ListField(
        child=serializers.FileField(allow_empty_file=False),
        write_only=True,
        required=False
    )

    commentfile = serializers.SerializerMethodField()

    class Meta:
        model = TicketCommentNew
        fields = ('id',  'commenter', 'commenttext', 'attachments', 'commentfile')
    
    def get_commentfile(self, obj):
        if obj.commentfile:
            return {
                'url': obj.commentfile.url,
                'name': obj.commentfile.name
            }
        return None
    
    def create(self, validated_data):
        attachments = validated_data.pop('attachments', [])
        commenter = validated_data.pop('commenter')
        comment_text = validated_data.pop('commenttext')

        ticket = self.context['ticket']
        comment_obj = TicketCommentNew.objects.create(
            commenter=commenter,
            commenttext=comment_text,
            commenttime=timezone.now()
        )

        if attachments:
            # Assuming only one attachment per comment for simplicity
            comment_attachment = TicketAttachment.objects.create(
                afile=attachments[0],
                uploader=commenter
            )
            comment_obj.commentfile = comment_attachment.afile
            
        comment_obj.save()
        ticket.ticketcomments.add(comment_obj)
        ticket.last_comment_time = timezone.now()
        ticket.save()

        return comment_obj
   

class EditCommentTicketSerializer(serializers.ModelSerializer):
    commenter = AuthorSerializer(read_only=True)
    commenter_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='commenter')
    attachments = serializers.ListField(
        child=serializers.FileField(allow_empty_file=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = TicketCommentNew
        fields = ('id', 'commenter','commenter_id', 'commenttext', 'attachments')

    def update(self, instance, validated_data):
        attachments = validated_data.pop('attachments', [])
        comment_text = validated_data.pop('commenttext', instance.commenttext)

        instance.commenttext = comment_text

        for attachment in attachments:
            comment_attachment = TicketAttachment.objects.create(
                afile=attachment,
                uploader=instance.commenter
            )
            instance.commentfile = comment_attachment.afile  # Assuming a comment can have one file

        instance.save()
        return instance

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id','name')
        model = Category

class CommentSerializer(serializers.ModelSerializer):
    commenter = AuthorSerializer()
    commentfile = serializers.SerializerMethodField()
    class Meta:
        fields = ('id','commenter','commenttext','commenttime', 'commentfile')
        model = TicketCommentNew
    def get_commentfile(self, obj):
        if obj.commentfile:
            return {
                'url': obj.commentfile.url,
                'name': obj.commentfile.name
            }
        return None