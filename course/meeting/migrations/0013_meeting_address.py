# Generated by Django 3.2.7 on 2023-11-06 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0012_meeting_datetime'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='address',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
