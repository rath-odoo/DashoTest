# Generated by Django 3.2.7 on 2022-12-24 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0029_institute_dummy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='institute',
            name='dummy',
            field=models.CharField(blank=True, choices=[('yes', 'YES'), ('no', 'NO')], default='no', max_length=10, null=True),
        ),
    ]
