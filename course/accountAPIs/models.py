from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
User = get_user_model()


# Create your models here.

class Zone(models.Model):
    name = models.CharField(max_length=128);
    chatgroup = models.ManyToManyField(User, related_name='zones',blank=True);



#class Cors(models.Model):
#      name = models.CharField(max_length=128)
#      chatgroups = models.ManyToManyField(ChatGroup, related_name='testchatgroups',blank=True);


class Video(models.Model):
    file = models.FileField(upload_to='videos/')
    processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    uploaded_by = models.ForeignKey(User, related_name='videos_uploaded', on_delete=models.CASCADE, null=True, blank=True)
    signed_url = models.URLField(max_length=2000, null=True, blank=True)  # Field to store the signed URL