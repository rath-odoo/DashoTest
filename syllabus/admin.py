from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Syllabus)
admin.site.register(models.Chapter)
admin.site.register(models.Section)
admin.site.register(models.Topic)
admin.site.register(models.ChapterNumber)
admin.site.register(models.SectionNumber)

