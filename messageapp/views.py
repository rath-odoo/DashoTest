from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth import login, authenticate,logout
from account.forms import RegistrationForm, AccountAuthenticationForm
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags




def base_view(request):
        user = request.user
        if user.is_authenticated:
            return render(request,'messageapp/student_userarea_msgchat.html')
        else:
            return redirect('https://edresearch.co.in/account/login')





