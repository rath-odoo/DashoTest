from django.urls import path, include
from .views import account_already_associated, link_account_option, link_account, get_user_email, google_login

urlpatterns = [
    path('account_already_associated/', account_already_associated, name='account_already_associated'),
    path('link_account_option/', link_account_option, name='link_account_option'),
    path('link_account/', link_account, name='link_account'),
    path('social-auth/', include('social_django.urls', namespace='social')),
    path('social-auth/google/', google_login),
    path('user/email/', get_user_email),
]
