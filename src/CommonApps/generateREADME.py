baseURL="https://app.diracai.com/api/"
baseURL="http://127.0.0.1:8000/api/"
import json
account = []
profile = []
home_dashboard_courses = []
home_dashboard_classes = []
home_dashboard_exams = []
home_dashboard_notices = []
home_dashboard_meeting = []
home_chat = []
home_feed = []
home_contacts =[]
home_calender =[]


course_discussion=[]




f = open("README.md", "w")

f.write("#  All APIs Information is here\n")

f.write("### Abbreviations \n")
f.write(" TBD: to be depreciated \n")


with open('AllAPICalls.js', 'r') as file:
    while True:
        # Read one line from the file
        line = file.readline()
        # Check if we have reached the end of the file
        if not line:
            break
        # Process the line
        if "apidetailinfo" in line:  
            jstring = str(line.split("==")[1])
            #print ("from Code: ",jstring)
            json_object = json.loads(jstring)
            if json_object['name'] == "account":
                account.append(json_object);

            if json_object['name'] == "profile":
                account.append(json_object);

            if json_object['name'] == "course_discussion":
                course_discussion.append(json_object);

            if json_object['name'] == "home_dashboard_classes":
                home_dashboard_classes.append(json_object)

#print ('account: ', account,'\n')


def Write_APIInfo(account,title):
   title = "##  "+title+" APIs "+"\n";
   f.write(title)
   for apiObj in account:
      heading = "-  "+apiObj['description']+"\n"
      url = ">  URL:  "+ "["+baseURL+apiObj['url']+"]"+"("+baseURL+apiObj['url']+")"+"\n"
      json = "> JSON: "+str(apiObj['json'])+"\n"
      type_="> HTTP REQUEST : "+apiObj['type']+"\n"
      f.write(heading)
      f.write("\n")
      f.write(url)
      f.write("\n")
      f.write(json)
      f.write("\n")
      f.write(type_)
   print ("Completed Writing ..", title)



Write_APIInfo(account,"account");

Write_APIInfo(course_discussion,"course/discussion");

Write_APIInfo(home_dashboard_classes,"home/dashboard/classes");



f.close()























