# Generated by Django 3.2.7 on 2022-05-05 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0007_alter_account_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='email',
            field=models.EmailField(default='fhfbdfb@gmail.com', max_length=60, unique=True, verbose_name='email'),
            preserve_default=False,
        ),
    ]
