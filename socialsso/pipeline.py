from social_core.exceptions import AuthAlreadyAssociated
from django.shortcuts import redirect

def handle_auth_already_associated(backend, uid, user=None, social=None, *args, **kwargs):
    
    if user and social:
        # If user is authenticated and the social account is already linked, redirect
        return redirect('account_already_associated')

    if social:
        # If a social account already exists and user is authenticated, redirect to linking view
        if user is None:
            # If no user is authenticated, raise an error or handle it appropriately
            raise AuthAlreadyAssociated(backend)
        else:
            # If a user is authenticated, provide an option to link accounts
            return redirect('link_account_option')

    return

def save_email(backend, user, response, *args, **kwargs):
    email = response.get('email')
    if email and not user.email:
        user.email = email
        user.save()
