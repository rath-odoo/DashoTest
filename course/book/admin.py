from django.contrib import admin
from . import models


# Register your models here.

admin.site.register(models.Book)
admin.site.register(models.BookChapter)
admin.site.register(models.BookChapterNumber)
admin.site.register(models.BookSection)
admin.site.register(models.Table)
admin.site.register(models.Figure)
admin.site.register(models.BookSectionNumber)
admin.site.register(models.BookSubSection)
admin.site.register(models.Paragraph)
admin.site.register(models.Sentence)
admin.site.register(models.Exercise)
admin.site.register(models.Question)
admin.site.register(models.Content)
admin.site.register(models.ImageUploadTest)




