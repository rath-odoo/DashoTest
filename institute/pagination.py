from rest_framework.pagination import PageNumberPagination

class StandardResultsPagination(PageNumberPagination):
    page_size = 10  # Default to 10 items per page
    page_size_query_param = 'page_size'  # Allow client to adjust page size
    max_page_size = 100  # Maximum limit of items per page
