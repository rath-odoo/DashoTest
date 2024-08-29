from django.contrib import admin
from django import forms
from .models import Event, User
from django.contrib.auth import get_user_model
from django.utils.html import format_html

User = get_user_model()

class EventAdminForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = '__all__'
        widgets = {
            'participants': admin.widgets.FilteredSelectMultiple("Participants", is_stacked=False),
            'start_datetime': admin.widgets.AdminDateWidget(),
            'end_datetime': admin.widgets.AdminDateWidget(),
            'recurrence_end_date': admin.widgets.AdminDateWidget(),
        }

class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm
    list_display = ('title', 'start_datetime', 'end_datetime', 'created_by', 'display_participants', 'availability', 'recurrence')
    list_filter = ('availability', 'recurrence', 'created_by')
    search_fields = ('title', 'description', 'created_by__username')
    filter_horizontal = ('participants',)

    def display_participants(self, obj):
        return format_html("<br>".join([user.username for user in obj.participants.all()]))
    display_participants.short_description = "Participants"

admin.site.register(Event, EventAdmin)
