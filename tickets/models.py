from django.db import models
#from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User = get_user_model()
from django.dispatch import receiver
from django.db.models.signals import post_delete
from course.models import Course 
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name or "Unnamed"
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

class AllCategoriesOfCourse(models.Model):
      name = models.CharField(max_length=200, null=True,blank=True);
      categories = models.ManyToManyField(Category, blank=True,related_name='course_categories')
      def __str__(self):
          return str(self.name) or "Unnamed"

class TicketAttachment(models.Model):
      name = models.CharField(max_length=200, null=True,blank=True);
      description = models.CharField(max_length=1000, null=True,blank=True);
      afile = models.FileField(max_length=1055, upload_to='images/', null=True, blank=True);
      uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='file_uploader_ticket',null=True,blank=True);
      def __str__(self):
       return self.name or "Unnamed"

class TicketCommentNew(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ticketcommenterNew', null=True, blank=True)
    commenttext = models.TextField(null=True, blank=True)
    commenttime = models.DateTimeField(default=timezone.now)
    commentfile = models.FileField(max_length=255, upload_to='images/', null=True, blank=True)

    class Meta:
        ordering = ('commenttime',)
        verbose_name = "Ticket Comment"
        verbose_name_plural = "Ticket Comments"

    def __str__(self):
        return f"commentId: {self.id}__{self.commenttext}" or "Unnamed"

# Signal to delete the file when a TicketCommentNew instance is deleted
@receiver(post_delete, sender=TicketCommentNew)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.commentfile:
        instance.commentfile.delete(False)

class Ticket(models.Model):
    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    poptions = (('Low','Low'),('Medium','Medium'),('High','High'),('Critical','Critical'),)
    visibleoptions = (('Public','Public'),('Private','Private'),)
    roptions = (('unresolved','UNRESOLVED'),('inprogress','INPROGRESS'),('resolved','RESOLVED'),)
    aoptions = (('closed','CLOSED'),('open','OPEN'),)


    title = models.CharField(max_length=250,null=True,blank=True);
    category = models.ForeignKey(Category, on_delete=models.CASCADE ,null=True,blank=True);
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts',null=True,blank=True);

    pstatus = models.CharField(max_length=10, choices=options, default='published',null=True,blank=True);
    status = models.CharField(max_length=10, choices=aoptions, default='open',null=True,blank=True);

    priority = models.CharField(max_length=20, choices=poptions, default='Medium',null=True,blank=True); 
    resolution = models.CharField(max_length=20, choices=roptions, default='unresolved',null=True,blank=True);
    content = models.TextField(null=True);
    excerpt = models.TextField(null=True);
    ticketFiles = models.ManyToManyField(TicketAttachment, blank=True,related_name='attachment_ticket')
    visibleTousers = models.ManyToManyField(User, blank=True,related_name='visibility_users');
    visibility = models.CharField(max_length=20, choices=visibleoptions, default='Public',null=True,blank=True);

    created_at = models.DateTimeField(default=timezone.now);
    ticketcomments = models.ManyToManyField(TicketCommentNew, blank=True,related_name='ticket_comments_new')
    last_comment_time = models.DateTimeField(default=timezone.now);
    assignees = models.ManyToManyField(User, blank=True,related_name='assignee_users')

    class Meta:
        ordering = ('-last_comment_time',)
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"

    def __str__(self):
        return self.title+"__Id: "+ str(self.id) or "Unnamed"


#to be depreciated, dont use this class
class TicketComment(models.Model):
      ticketId = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='ticketcomment')
      commenter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='commenter')
      commenttext = models.TextField(null=True)
      commenttime = models.DateTimeField(default=timezone.now)
      commentfile = models.FileField(max_length=255, upload_to='images/', null=True, blank=True);
      class Meta:
          ordering = ('commenttime',)

      def __str__(self):
         return str(self.id) or "Unnamed"
      




