from django.urls import path
from .views import PostList, PostDetail,CategoryInfo, CategoryInfobyId, CommentsbyTicketId, CreateTicketInCourseView, CategoriesByCourseIdView, TicketByCourseIdView, CreateCommentByTicketIdView, GetCommentByTicketIdView, EditTicketInCourseView
from .views import EditCommentByTicketIdView



from .views import DeleteCommentByTicketIdView

app_name = 'tickets_api'

urlpatterns = [
    #old api endpoints    
    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('', PostList.as_view(), name='listcreate'),
    path('category/', CategoryInfo.as_view(), name='ticketcategories'),
    #path('comments/', TicketCommentsAll.as_view(), name='ticketcomments'),
    path('comments/<int:ticketId>/', CommentsbyTicketId.as_view(), name='commentsbyticketId'),

    #new api endpoints
    path('ticketsbycourseId/<int:pk>/', TicketByCourseIdView.as_view()),
    #path('createticket/<int:pk>/',CreateTicketInCourseView.as_view(),name="create_ticket_course"),# to be depreciated

    path('createticket/<int:course_id>/<int:user_id>/', CreateTicketInCourseView.as_view(), name="create_ticket_course"),
    #path('editticket/<int:ticketId>/',EditTicketInCourseView.as_view(),name="edit_ticket_course"),
    path('editticket/<int:ticketId>/<int:user_id>/', EditTicketInCourseView.as_view(), name="edit_ticket_course"),

    path('categoriesbycourseid/<int:pk>/', CategoriesByCourseIdView.as_view(),name="cats_by_courseName"),
    path('category/<int:pk>/', CategoryInfobyId.as_view(), name='ticketcategorybyId'),
    # path('createcommentbyticketId/<int:pk>/', CreateCommentByTicketIdView.as_view(), name="create_comment_byTicketId"),
    path('addcomment/<int:ticket_id>/', CreateCommentByTicketIdView.as_view(), name="add_comment_ticket"),
    path('editcomment/<int:commentId>/', EditCommentByTicketIdView.as_view(), name="add_comment_ticket"),

    path('comment/delete/<int:commentId>/', DeleteCommentByTicketIdView.as_view(), name="delete_comment_view"),

    path('getcommentbyticketId/<int:pk>/', GetCommentByTicketIdView.as_view(), name="get_comment_byTicketId"),

]
