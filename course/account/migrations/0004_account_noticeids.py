# Generated by Django 3.2.7 on 2022-04-19 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('noticeboard', '0007_auto_20220227_2212'),
        ('account', '0003_account_noticeids'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='noticeids',
            field=models.ManyToManyField(blank=True, to='noticeboard.NoticeBoard'),
        ),
    ]
