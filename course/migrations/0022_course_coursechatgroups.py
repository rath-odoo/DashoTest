# Generated by Django 3.2.7 on 2022-10-27 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0008_alter_chatcomment_title'),
        ('course', '0021_course_ticketcategories'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='coursechatgroups',
            field=models.ManyToManyField(blank=True, to='chat.ChatGroup'),
        ),
    ]
