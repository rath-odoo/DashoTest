# Generated by Django 3.2.7 on 2022-08-16 22:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_auto_20220816_2215'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatgroup',
            name='groupusers',
        ),
    ]
