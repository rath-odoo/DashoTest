# Generated by Django 3.2.7 on 2022-05-18 21:39

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0016_auto_20220518_2114'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='contacts',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
