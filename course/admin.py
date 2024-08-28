from django.contrib import admin
from . import models


#@admin.register(models.Course)
#class AuthorAdmin(admin.ModelAdmin):
#    list_display = ('id','teacher','courseShortName','courseFullName','courseGlobalCode','courseLocalCode','courseStatus','courseStartDate','courseEndDate','designedFor','subject','abouttheCourse','instituteName','instituteCity','instituteCountry','enrolled_students','enrolement_requests')
admin.site.register(models.Course)
admin.site.register(models.VideoObject)
admin.site.register(models.CourseDesignedFor)
admin.site.register(models.EducationBoard)
admin.site.register(models.ClassSection)
admin.site.register(models.CourseLink)
admin.site.register(models.FileObject)




@admin.register(models.Subject)
class AuthorAdmin(admin.ModelAdmin):
      list_display = ('id','name','classname','board')

    #admin.site.register(models.Subject)
