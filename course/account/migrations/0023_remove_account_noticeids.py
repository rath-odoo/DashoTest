# Generated by Django 3.2.7 on 2022-09-02 18:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0022_account_generalchatgroups'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='noticeIds',
        ),
    ]
