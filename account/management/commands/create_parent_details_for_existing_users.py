# project/app_name/management/commands/create_parent_details_for_existing_users.py

from django.core.management.base import BaseCommand
from account.models import Account, ParentDetails

class Command(BaseCommand):
    help = 'Create ParentDetails instances for existing users if not already created'

    def handle(self, *args, **kwargs):
        users_without_parent_details = Account.objects.filter(parent_details__isnull=True)
        for user in users_without_parent_details:
            ParentDetails.objects.create(account=user)
            self.stdout.write(self.style.SUCCESS(f'Created ParentDetails for user {user.username}'))

        self.stdout.write(self.style.SUCCESS('Successfully created ParentDetails instances for all users without them'))
