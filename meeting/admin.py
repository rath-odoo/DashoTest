from django.contrib import admin

# Register your models here.

from . import models

admin.site.register(models.Meeting)
admin.site.register(models.Presentation)
admin.site.register(models.Talkfile)


