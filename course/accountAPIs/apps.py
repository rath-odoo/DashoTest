from django.apps import AppConfig

class AccountapisConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accountAPIs'
    def ready(self):
        import accountAPIs.models