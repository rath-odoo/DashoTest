# Generated by Django 3.2.7 on 2022-10-21 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0017_auto_20221021_2059'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='courselinks',
            field=models.ManyToManyField(blank=True, related_name='link_objects', to='course.CourseLink'),
        ),
    ]
