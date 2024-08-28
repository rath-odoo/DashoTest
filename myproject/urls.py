"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.contrib.auth import views as auth_views
from rest_framework import permissions
from django.conf.urls import url
#from rest_framework_swagger.views import get_swagger_view
#from drf_yasg.views import get_schema_view
#from drf_yasg import openapi

try:
    from rest_framework_swagger.views import get_swagger_view
except ImportError:
    import pip
    pip.main(['install', 'django-rest-swagger'])
    from rest_framework_swagger.views import get_swagger_view

try:
    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi
except ImportError:
    import pip
    pip.main(['install', 'drf-yasg'])
    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="DiracAI",
        default_version='v1',),
    public=True,
    permission_classes=(permissions.AllowAny,),)

urlpatterns = [
    #admin    
    path('admin/', admin.site.urls),

    #home app paths
    path('',include('home.urls')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #path('api/user/', include('users.urls', namespace='users')),

    #account app
    path('account/',include('account.urls')),
    path('api/',include('accountAPIs.urls',namespace='account-api')),


    #tickets app
    path('api/tickets/',include('tickets.urls')),

    #dashboard app
    #path('dashboardapp/',include('dashboardapp.urls')),

    #all notifications api
    path('api/allnotification/', include('allnotification.urls')),

    #message app paths
    #path('messageapp/',include('messageapp.urls')),
    path('socialsso/', include('socialsso.urls')),
    
    path('api/connect/',include('connect.urls')),

    path('api/chat/', include('chat.urls')),

    path('api/course/',include('course.urls')),
    #noticeboard app
    path('api/noticeboard/',include('noticeboard.urls')),
    #class app
    path('api/class/',include('eclass.urls')),
    #syllabus app       
    path('api/syllabus/',include('syllabus.urls')),
    #assignment app
    path('api/assignment/', include('assignment.urls')),
    #meeting app
    path('api/meeting/',include('meeting.urls')),  
    #event app
    path('api/event/',include('event.urls')),      
    #Institute app
    path('api/institute/', include('institute.urls')),
    # book app
    path('api/book/',include('book.urls')),
    # exam app
    path('api/exam/', include('exam.urls')),
    # grade app
    path('api/grade/', include('grade.urls')),

    #online registration

    path('api/onlineregistration/',include('onlineregistration.urls')),

    # teacher app
    path('api-auth/',include('rest_framework.urls', namespace='rest_framework')),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0),name='schema-swagger-ui'),
    
]



if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

