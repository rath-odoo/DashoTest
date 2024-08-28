# Generated by Django 3.2.7 on 2022-05-24 06:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meeting', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='creater',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='creater_meeting', to=settings.AUTH_USER_MODEL),
        ),
    ]
