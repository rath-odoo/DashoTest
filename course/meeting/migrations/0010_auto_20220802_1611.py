# Generated by Django 3.2.7 on 2022-08-02 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0009_alter_talkfile_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting',
            old_name='classStatus',
            new_name='meetingStatus',
        ),
        migrations.RenameField(
            model_name='meeting',
            old_name='classdate',
            new_name='meetingdate',
        ),
        migrations.RenameField(
            model_name='meeting',
            old_name='classtime',
            new_name='meetingtime',
        ),
    ]
