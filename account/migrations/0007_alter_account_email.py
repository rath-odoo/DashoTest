# Generated by Django 3.2.7 on 2022-05-05 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_futurecustomercontacts_subscribers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='email',
            field=models.EmailField(blank=True, default=None, max_length=60, null=True, verbose_name='email'),
        ),
    ]
