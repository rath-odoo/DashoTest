from django.contrib.auth import get_user_model

class CaseInsensitiveModelBackend:
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)

        try:
            case_insensitive_username_field = '{}__iexact'.format(UserModel.USERNAME_FIELD)
            user = UserModel._default_manager.get(**{case_insensitive_username_field: username})
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
        except UserModel.MultipleObjectsReturned:
            # Handle the case where multiple users are found
            users = UserModel._default_manager.filter(**{case_insensitive_username_field: username})
            user = users[0]  # Or apply some logic to pick the correct user
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        return None

    def user_can_authenticate(self, user):
        return True
