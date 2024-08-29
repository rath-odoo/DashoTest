#  All APIs Information is here
### Abbreviations 
 TBD: to be depreciated 
##  account APIs 
-  Get basic user information after login

>  URL:  [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

> JSON: {'id': 1}

> HTTP REQUEST : get
-  Update user profile information: TBD

>  URL:  [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

> JSON: {'email': 'bibhuj@gmail.com', 'username': '+91773627623', 'firstname': 'Bibhu', 'lastname': 'Mahakud', 'gender': 'male', 'role': 'student', 'position': 'PhD', 'dateofbirth': '2013-09-09'}

> HTTP REQUEST : post
-  New Account will be created. Either email or phoneno should be provided

>  URL:  [http://127.0.0.1:8000/api/createaccount/](http://127.0.0.1:8000/api/createaccount/)

> JSON: {'username': None, 'email': 'bibhuj@gmail.com', 'phoneno': None}

> HTTP REQUEST : post
-  Check if user exists from email or phone no

>  URL:  [http://127.0.0.1:8000/api/getuserfromuserinput/+917077090308](http://127.0.0.1:8000/api/getuserfromuserinput/+917077090308)

> JSON: {'message': 'true'}

> HTTP REQUEST : get
##  course/discussion APIs 
-  Get details of one ticket

>  URL:  [http://127.0.0.1:8000/api/tickets/1/](http://127.0.0.1:8000/api/tickets/1/)

> JSON: {'id': '1'}

> HTTP REQUEST : get
##  home/dashboard/classes APIs 
-  Create a new class from dashboard

>  URL:  [http://127.0.0.1:8000/api/class/all/](http://127.0.0.1:8000/api/class/all/)

> JSON: {'course': 10, 'serialNo': 1, 'status': 'scheduled', 'datetime': '2023-09-20T09:33:00Z', 'duration': 30, 'meetingLink': 'https://..', 'address': 'H210', 'about': 'This is about..', 'topics': [1, 23, 2]}

> HTTP REQUEST : post
-  Get all classes for All view 

>  URL:  [http://127.0.0.1:8000/api/class/getalluserclasses/?page=1](http://127.0.0.1:8000/api/class/getalluserclasses/?page=1)

> JSON: {'id': 10}

> HTTP REQUEST : get
-  Get all classes for a given day in UTC time

>  URL:  [http://127.0.0.1:8000/api/class/getdayclasses/2023-09-15/Asia/Kolkata?page=1](http://127.0.0.1:8000/api/class/getdayclasses/2023-09-15/Asia/Kolkata?page=1)

> JSON: {'next': None, 'previous': None, 'total_pages': 1, 'results': [{'about': None, 'courseId': 123, 'courseName': 'Phys', 'datetime': '2023-09-20T09:33:00Z', 'duration': 20, 'meetingLink': 'https://..', 'serialNo': None, 'status': 'scheduled', 'topics': [{'id': 1, 'name': 'circular motion'}]}]}

> HTTP REQUEST : get
-  Delete a class from class id

>  URL:  [http://127.0.0.1:8000/api/class/deleteclass/12/](http://127.0.0.1:8000/api/class/deleteclass/12/)

> JSON: N/A

> HTTP REQUEST : delete
