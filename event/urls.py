from django.urls import path
from .views import CreateEventView, UpdateEventView, DeleteEventView, EventListView

urlpatterns = [
    path('create/<int:user_id>/', CreateEventView.as_view(), name='create-event'),
    path('update/<int:event_id>/user/<int:user_id>/', UpdateEventView.as_view(), name='update-event-with-user'),
    path('delete/<int:event_id>/user/<int:user_id>/', DeleteEventView.as_view(), name='delete-event-with-user'),
    path('user-events/', EventListView.as_view(), name='list-events'),

]
