# Generated by Django 3.2.7 on 2022-05-18 17:28

import account.models
import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0011_auto_20220517_0443'),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('doc', models.FileField(blank=True, max_length=255, null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='DegreeName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='DocumentCopy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('doc', models.FileField(blank=True, max_length=255, null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Institute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('city', models.CharField(max_length=300)),
                ('state', models.CharField(max_length=300)),
                ('country', models.CharField(max_length=300)),
                ('instlogo', models.ImageField(blank=True, default=account.models.get_default_profile_image, max_length=255, null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='MarkSheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300)),
                ('doc', models.FileField(blank=True, max_length=255, null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='EduDegree',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startDate', models.DateField(default=datetime.date.today)),
                ('endDate', models.DateField(default=datetime.date.today)),
                ('certificates', models.ManyToManyField(blank=True, to='account.Certificate')),
                ('degreename', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='account.degreename')),
                ('institute', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='account.institute')),
                ('marksheets', models.ManyToManyField(blank=True, to='account.MarkSheet')),
            ],
        ),
    ]
