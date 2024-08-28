from django.core.management.base import BaseCommand
from account.models import Account, HealthData

class Command(BaseCommand):
    help = 'Create HealthData instances for existing users if not already created'

    def handle(self, *args, **kwargs):
        users_without_health_data = Account.objects.filter(health_data__isnull=True)
        for user in users_without_health_data:
            HealthData.objects.create(account=user)
            self.stdout.write(self.style.SUCCESS(f'Created HealthData for user {user.username}'))

        self.stdout.write(self.style.SUCCESS('Successfully created HealthData instances for all users without them'))
