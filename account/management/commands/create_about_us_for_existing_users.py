print("Loading create_about_us_for_existing_users command...")

from django.core.management.base import BaseCommand
# from django.contrib.auth.models import User
from account.models import Account
from account.models import AboutUs

class Command(BaseCommand):
    help = 'Create AboutUs instances for existing users if not already created'

    def handle(self, *args, **kwargs):
        users_without_about_us = Account.objects.filter(about_us_user__isnull=True)  # or Account if using a custom user model
        for user in users_without_about_us:
            AboutUs.objects.create(user=user)
            self.stdout.write(self.style.SUCCESS(f'Created AboutUs for user {user.username}'))

        self.stdout.write(self.style.SUCCESS('Successfully created AboutUs instances for all users'))