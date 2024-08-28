from django.contrib import admin
from . import models


@admin.register(models.ChatComment)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id','groupId','commenter','commenttext','commenttime')
    #prepopulated_fields = {'slug': ('',), }


admin.site.register(models.ChatGroup)

