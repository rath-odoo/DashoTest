# Generated by Django 3.2.7 on 2023-11-06 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0013_meeting_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meeting',
            name='about',
            field=models.TextField(blank=True, max_length=5000, null=True),
        ),
    ]
