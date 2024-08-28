# Generated by Django 3.2.7 on 2024-06-25 07:55

import account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0060_alter_academicdetail_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='academicdetail',
            name='media',
            field=models.FileField(blank=True, null=True, upload_to='academic_media/', validators=[account.models.validate_file_type]),
        ),
    ]
