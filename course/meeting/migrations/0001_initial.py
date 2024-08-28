# Generated by Django 3.2.7 on 2022-05-21 06:57

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('syllabus', '0009_chapter_syllabusid'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courseId', models.IntegerField(blank=True, null=True)),
                ('serialNo', models.IntegerField(blank=True, null=True)),
                ('classStatus', models.CharField(choices=[('scheduled', 'SCHEDULED'), ('ongoing', 'ONGOING'), ('next', 'NEXT'), ('over', 'OVER')], default='scheduled', max_length=10)),
                ('classdate', models.DateField(default=datetime.date.today)),
                ('classtime', models.TimeField(blank=True, null=True)),
                ('duration', models.IntegerField(blank=True, null=True)),
                ('meetingLink', models.CharField(blank=True, max_length=1000, null=True)),
                ('roomNo', models.CharField(blank=True, max_length=50, null=True)),
                ('chapter', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='syllabus.chapter')),
                ('topics', models.ManyToManyField(blank=True, to='syllabus.Topic')),
            ],
            options={
                'ordering': ('serialNo',),
            },
        ),
    ]
