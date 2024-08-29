from django.shortcuts import render, redirect
from django.contrib.auth import login
from social_django.models import UserSocialAuth
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from social_django.utils import load_strategy, load_backend
from social_core.exceptions import AuthException
import json
from django.views.decorators.csrf import csrf_exempt
from social_core.backends.google import GoogleOAuth2

def account_already_associated(request):
    print('request:', request.method)
    print('request GET:', request.GET)
    # Assuming the UID is passed as a query parameter in the GET request
    uid = request.GET.get('uid', '')
    print('Rendering account_already_associated.html with UID:', uid)
    if request.method == 'POST':
        action = request.POST.get('action')
        uid = request.POST.get('uid')
        # Debugging print statements
        print('Received UID:', uid)
        social_user = UserSocialAuth.objects.filter(uid=uid).first()
        print('social_user:', social_user)
        if social_user:
            if action == 'link':
                if social_user.user == request.user:
                    return redirect('home')  # Already linked
                else:
                    social_user.user = request.user
                    social_user.save()
                    return redirect('home')  # Redirect to the home page after linking
            elif action == 'delete':
                user_to_delete = social_user.user
                if user_to_delete != request.user:
                    user_to_delete.delete()
                    social_user.user = request.user
                    social_user.save()
                    return redirect('home')
                
    return render(request, 'account_already_associated.html', {
        'message': 'The Google account you are trying to use is already associated with another user account.',
    })

def link_account_option(request):
    return render(request, 'link_account_option.html')

def link_account(request):
    print('request:', request)
    if request.method == 'POST':
        user = request.user
        social_user = UserSocialAuth.objects.filter(uid=request.POST.get('uid')).first()
        print('social_user:', social_user)
        if social_user:
            social_user.user = user
            print('social_user:', social_user)
            social_user.save()
            return redirect('home')  # Redirect to the home page or dashboard after linking
    return redirect('account_already_associated')


@login_required
def get_user_email(request):
    user = request.user
    email = user.email
    return JsonResponse({'email': email})

@csrf_exempt
def google_login(request):
    body = json.loads(request.body)
    code = body.get('code')
    redirect_uri = 'postmessage'  # This should match the redirect URI used in the React app
    strategy = load_strategy(request)
    backend = load_backend(strategy=strategy, name='google-oauth2', redirect_uri=redirect_uri)

    try:
        user = backend.auth_complete()
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key, 'user': user.email})
    except AuthException as e:
        return JsonResponse({'error': str(e)}, status=400)
