from django.contrib import admin

# Register your models here.

from . import models


#admin.site.register(models.Institute);
#admin.site.register(models.InstituteMembership);
#admin.site.register(models.InstitueMemberTypes);



class InstituteMembershipInline(admin.TabularInline):
    model = models.InstituteMembership
    extra = 1  # Number of empty forms to display

class InstituteAdmin(admin.ModelAdmin):
    inlines = [InstituteMembershipInline]

admin.site.register(models.Institute, InstituteAdmin)
admin.site.register(models.InstituteMembership);
admin.site.register(models.InstitueMemberTypes);
admin.site.register(models.socialMediaLink);
admin.site.register(models.Document);
admin.site.register(models.Attendance);
admin.site.register(models.Leave);
admin.site.register(models.Asset);
admin.site.register(models.InstituteFee);

admin.site.register(models.Batch);

admin.site.register(models.InstituteTransaction);
admin.site.register(models.InstituteFeeInstallment);

