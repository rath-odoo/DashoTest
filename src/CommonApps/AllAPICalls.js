import axiosInstance from '../axios';
import { Logout } from './Logout';


export const getuser = ({ setData }) => {



  axiosInstance.get()
    .then((res) => {
      setData(data => res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}
//let apidetailinfo == {"name":"account","url":"","type":"get", "json":{"id":1},"description":"Get basic user information after login"}




export const putuser = ({ data, formData }) => {
  axiosInstance.put('', {
    "email": data.email,
    "username": data.username,
    "firstname": formData.firstname,
    "lastname": formData.lastname,
    "gender": formData.gender,
    "role": "student",
    "position": formData.position,
    "dateofbirth": formData.dateofbirth,


  })
    .then((res) => {

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}
//let apidetailinfo == {"name":"profile","url":"","type":"post", "json":{ "email":"bibhuj@gmail.com","username":"+91773627623","firstname":"Bibhu","lastname":"Mahakud","gender":"male","role":"student","position":"PhD","dateofbirth":"2013-09-09"},"description":"Update user profile information: TBD"}







export const updateusersname = ({ formData, setEditState, props }) => {
  axiosInstance.put('updateusersname/', {

    "firstname": formData.firstname,
    "lastname": formData.lastname,

  })
    .then((res) => {
      setEditState("saved");
      props.rerender();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}





export const getticket = ({ ticketId, setData }) => {


  axiosInstance.get(`tickets/${ticketId}/`).then((res) => {
    setData(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });




}
//let apidetailinfo == {"name":"course_discussion","url":"tickets/1/","type":"get", "json":{"id":"1"},"description":"Get details of one ticket"}




export const getalltickets = ({ setData }) => {


  axiosInstance.get(`tickets/`).then((res) => {
    setData(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });


}


export const getuserbyId = ({ userId, setUserData }) => {

  axiosInstance.get(`${userId}/`).then((res) => {
    setUserData(host => res.data);
    console.log("get user by Id: ", res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

      if (error.response.status === 404) { console.log("here is the error"); }



    });

}
















export const getticketscategory = ({ setTicketType }) => {


  axiosInstance.get(`tickets/category/`).then((res) => {
    setTicketType(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });


}


export const getcategorybyId = ({ ticketCategory, setCatData }) => {


  axiosInstance.get(`tickets/category/${ticketCategory}/`).then((res) => {
    setCatData(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });


}



export const getticketcategorybyId = ({ courseId, getCategoryData }) => {


  axiosInstance.get(`tickets/categoriesbycourseid/${courseId}/`).then((res) => {
    getCategoryData(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });


}




export const createticket = async ({ formData, course_id, user_id, props }) => {
  try {
    const response = await axiosInstance.post(`tickets/createticket/${course_id}/${user_id}/`, {
      title: formData.title,
      category: formData.category,
      visibility: formData.visibility,
      priority: formData.priority,
      content: formData.content,
    });

    props.rerender();

    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout();
    }
    console.error("Error creating ticket:", error);
    throw error;
  }
};






export const editticket = async ({ formData, ticket_id, user_id, props }) => {
  try {
    const response = await axiosInstance.put(`tickets/editticket/${ticket_id}/${user_id}/`, {
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      visibility: formData.visibility,
      content: formData.content,
      status: formData.status,
    });

    props.rerender();

    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout();
    }
    console.error("Error editing ticket:", error);
    throw error;
  }
};








//createcommentbyticketId

export const postticketcomment = async ({ ticketId, userId, comment, attachments, props }) => {
  const formData = new FormData();
  formData.append('commenter', userId);
  formData.append('commenttext', comment);

  if (attachments) {
    formData.append('attachments', attachments);
  }

  try {
    const response = await axiosInstance.post(`/tickets/addcomment/${ticketId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    props.newCommentAdded(current => !current);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout(); // Assuming `Logout` is a function you've defined elsewhere
    } else {
      console.error('Error submitting comment:', error);
    }
  }
};





export const updateticketcomment = ({ commentId, userId, commenterId, comment, concludeSaving, setSavingStatus }) => {


  axiosInstance
    .put(`tickets/editcomment/${commentId}/`, {
      "commenter": userId,
      "commenter_id": commenterId,
      "commenttext": comment,
      "attachments": []

    })
    .then((res) => {
      setSavingStatus("saved");
      concludeSaving();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}


export const deleteticketcomment = ({ comment_id, props }) => {


  axiosInstance.delete(`tickets/comment/delete/${comment_id}/`, {


  })
    .then((res) => {
      console.log("deleted---");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}









export const getticketsbycourseid = ({ courseId, getAllTicketData, pageNo }) => {


  axiosInstance.get(`tickets/ticketsbycourseId/${courseId}/?page=${pageNo}`).then((res) => {
    getAllTicketData(allTicketData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });


}








export const getcomments = ({ setCommentObj, ticketId }) => {

  axiosInstance.get(`tickets/comments/${ticketId}/`).then((res) => {
    setCommentObj(commentObj => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



export const getallusers = ({ setUsersData }) => {

  axiosInstance.get(`/allusers/`).then((res) => {
    setUsersData(userData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



export const getfewusers = ({ num, getFewUsers }) => {



  axiosInstance.get(`/fewusers/${num}`).then((res) => {
    getFewUsers(fewUsers => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });


}

//api/usersearch/?search=b

export const usersearchgeneral = ({ pageno, searchString, getSearchedUsers }) => {

  axiosInstance.get(`/usersearch/?page=${pageno}&search=${searchString}`).then((res) => {
    getSearchedUsers(searchedUsers => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}

export const usersearchCourse = ({ searchString, courseId, getSearchedUsers }) => {
  axiosInstance.get(`/course/usersearch/${courseId}/?name=${searchString}`)
    .then((res) => {
      getSearchedUsers(res.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Logout();
      } else {
        console.error('Error during user search:', error);
      }
    });
};




export const usersearch_for_addingteacher_in_Course = ({ searchString, courseId, getSearchedUsers }) => {
  axiosInstance.get(`/course/usersearchforaddingteacher/${courseId}/?name=${searchString}`)
    .then((res) => {
      getSearchedUsers(res.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Logout();
      } else {
        console.error('Error during user search:', error);
      }
    });
};



export const usersearch_for_addingadmin_in_Course = ({ searchString, courseId, getSearchedUsers }) => {
  axiosInstance.get(`/course/usersearchforaddingadmin/${courseId}/?name=${searchString}`)
    .then((res) => {
      getSearchedUsers(res.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Logout();
      } else {
        console.error('Error during user search:', error);
      }
    });
};



export const usersearch_for_addingstudent_in_Course = ({ searchString, courseId, getSearchedUsers }) => {
  axiosInstance.get(`/course/usersearchforaddingstudent/${courseId}/?name=${searchString}`)
    .then((res) => {
      getSearchedUsers(res.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Logout();
      } else {
        console.error('Error during user search:', error);
      }
    });
};






//course/publiccoursesearch/?page=1&search=Physics

export const publiccoursesearch = ({ pageno, searchString, getSearchedCourses }) => {

  axiosInstance.get(`/course/publiccoursesearch/?page=${pageno}&search=${searchString}`).then((res) => {
    getSearchedCourses(searchedCourses => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}




export const publishcourse = ({ courseId, props, setPublishStatus }) => {

  axiosInstance.put(`course/publish/${courseId}/`, {

  })
    .then((res) => {
      setPublishStatus('published');
      //setEditState("notSaving");
      props.rerender();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}



export const unpublishcourse = ({ courseId, props, setPublishStatus }) => {

  axiosInstance.put(`course/unpublish/${courseId}/`, {

  })
    .then((res) => {
      setPublishStatus('unpublished');
      //setEditState("notSaving");
      props.rerender();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}



export const personalchatgroupsearch = ({ searchString, pageNoPCS, getSearchedChatGroups }) => {


  axiosInstance.get(`/chat/searchpersonalchatgroup/${searchString}/?page=${pageNoPCS}`).then((res) => {
    //getSearchedChatGroups(searchedChatGroups=>res.data);

    getSearchedChatGroups((searchedChatGroups) => [...searchedChatGroups, res.data])
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



export const personalchatgroupsearchNoappend = ({ searchString, pageNoPCS, getSearchedChatGroups }) => {


  axiosInstance.get(`/chat/searchpersonalchatgroup/${searchString}/?page=${pageNoPCS}`).then((res) => {
    getSearchedChatGroups(searchedChatGroups => [res.data]);

    //getSearchedChatGroups((searchedChatGroups) => [...searchedChatGroups, res.data])
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}










export const coursechatgroupsearch = ({ courseId, searchString, getSearchedCourseChatGroups }) => {


  axiosInstance.get(`searchcoursechatgroup/${courseId}/${searchString}/`).then((res) => {
    getSearchedCourseChatGroups(searchedCourseChatGroups => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}


export const contactsusersearch = ({ pageno, searchString, getSearchedUsers }) => {

  axiosInstance.get(`/contactuserssearch/${searchString}/`).then((res) => {
    getSearchedUsers(searchedUsers => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}





export const institutesearchgeneral = ({ pageNo, searchInstString, getSearchedInstitutes }) => {

  axiosInstance.get(`/institutesearch/?page=${pageNo}&search=${searchInstString}`).then((res) => {
    getSearchedInstitutes(searchedInstitutes => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}





export const usersearchinstitute = ({ pageno, institute_id, getSearchedUsers }) => {

  axiosInstance.get(`institute/users/?institute_id=${institute_id}&page=${pageno}`).then((res) => {
    getSearchedUsers(searchedUsers => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}








export const getpersonalgeneralchatgroups = ({ getChatGroups, pageNoPC }) => {


  axiosInstance.get(`getgeneralchatgroups/?page=${pageNoPC}`).then((res) => {

    //getChatGroups(chatGroups=>res.data);
    getChatGroups((chatGroups) => [...chatGroups, res.data])

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}














export const getpersonalgeneralchatgroupsNoAppend = ({ getChatGroups, pageNoPC }) => {


  axiosInstance.get(`getgeneralchatgroups/?page=${pageNoPC}`).then((res) => {

    //getChatGroups(chatGroups=>res.data);
    getChatGroups((chatGroups) => [res.data])

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}




export const getcoursechatgroups = ({ getCourseChatGroups, courseId }) => {


  axiosInstance.get(`getcoursechatgroups/${courseId}/`).then((res) => {

    getCourseChatGroups(courseChatGroups => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}









export const postchatcomment = ({ groupId, userId, comment }) => {


  axiosInstance
    .post(`chat/comments/`, {
      "groupId": groupId,
      "commenter": userId,
      "commenttext": comment,

    })
    .then((res) => {
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



export const getchatcomments = ({ setChatCommentObj, groupId, pageno }) => {

  axiosInstance.get(`chat/comments/${groupId}/?page=${pageno}`).then((res) => {
    setChatCommentObj(commentObj => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}





export const getgroupchatcomments = ({ setChatCommentObj, groupId }) => {


  axiosInstance.get(`chat/comments/${groupId}/`).then((res) => {
    setChatCommentObj(commentObj => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}





export const createchatgroup = ({ groupname, groupMembers, props, setUserAdded }) => {


  axiosInstance
    .post(`chat/groups/`,

      {
        "name": groupname,
        "displayname": groupname,
        "groupuserObjects": groupMembers,
        "groupType": "oneoone"
      }


    )
    .then((res) => {

      props.setRerender(rerender => !rerender);
      setUserAdded(userAdded => "notAdded");

    })
    .catch((error) => {
      if (error.response.status === 400) { alert("User is already added. Refresh the page and try again."); }

      if (error.response.status === 401) {
        Logout();

      }

    });

}




export const checkifuseradded = ({ userId, setUserExists, createOneOOneGroup }) => {

  axiosInstance.get(`checkifuserisadded/${userId}/`).then((res) => {
    setUserExists(userExists => res.data);
    console.log("userExist: ", res.data.exists);
    if (!res.data.exists) {
      createOneOOneGroup({ userId });
      console.log("Used added");
    } else {

      console.log("User exists...");
    }
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



export const AddUserIfNotExists = ({ userId, setUserExists, createOneOOneGroup, props, setUserAdded }) => {

  axiosInstance.get(`checkifuserisadded/${userId}/`).then((res) => {
    setUserAdded(userAdded => "adding")
    setUserExists(userExists => res.data);
    console.log("userExist: ", res.data.exists);
    if (!res.data.exists) {
      createOneOOneGroup({ userId, props, setUserAdded });
      console.log("Used added");
    } else {

      console.log("User exists...");
    }
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}







export const checkifuserisaddedonly = ({ userId, setUserExists }) => {

  axiosInstance.get(`checkifuserisadded/${userId}/`).then((res) => {
    setUserExists(userExists => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}





















export const getchatgroups = ({ getChatGroups }) => {


  axiosInstance.get(`chat/groups/`)


    .then((res) => {

      getChatGroups(chatGroups => res.data);

    })
    .catch((error) => {

      if (error.response.status === 401) {
        Logout();

      }


    });

}





export const getchatgroupbyId = ({ groupId, getChatGroupById }) => {


  axiosInstance.get(`chat/groups/${groupId}/`)


    .then((res) => {

      getChatGroupById(chatGroup => res.data);

    })
    .catch((error) => {

      if (error.response.status === 401) {
        Logout();

      }


    });

}





/*
export const getgeneralchatgroups = ({getChatGroups})=>{


    axiosInstance.get(`chat/groups/`)


                        .then((res) => {

                    getChatGroups(chatGroups=>res.data);

                })
         .catch((error)=>{

                     if(error.response.status===401){
                     Logout();

                      }


                });

}
*/






export const editdashboardcourse = ({ formData, courseId, props, setEditState }) => {

  axiosInstance.put(`course/editonedashboardcourse/${courseId}/`, {

    "courseShortName": formData.courseShortName,
    "courseLocalCode": formData.courseLocalCode,
    "courseStatus": formData.courseStatus,
    "courseStartDate": formData.courseStartDate,
    "courseEndDate": formData.courseEndDate,
    "abouttheCourse": formData.abouttheCourse,
    "instituteName": formData.instituteName,
    "designedFor": formData.classname,
    "educationboard": formData.educationboard,
    "subject": formData.subject,

  })
    .then((res) => {
      setEditState("notSaving");
      props.onPress();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}

export const editcoursesummary = ({ formData, courseId, props, setEditState }) => {

  axiosInstance.put(`course/editonedashboardcourse/${courseId}/`, {

    "courseShortName": formData.courseShortName,
    "courseLocalCode": formData.courseLocalCode,
    "courseStatus": formData.courseStatus,
    "courseStartDate": formData.courseStartDate,
    "courseEndDate": formData.courseEndDate,
    "abouttheCourse": formData.abouttheCourse,
    "instituteName": formData.instituteName,
    "coursecredit": formData.coursecredit,



  })
    .then((res) => {
      setEditState("notSaving");
      props.rerender();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}







export const createcourse = ({ formData, data, setCreateState, props }) => {

  axiosInstance
    .post(`course/create/`, {


      "teacher": data.id,
      "courseShortName": formData.courseShortName,
      "courseFullName": formData.courseFullName,
      "courseLocalCode": formData.courseLocalCode,
      "courseStartDate": formData.courseStartDate,
      "courseEndDate": formData.courseEndDate,
      "designedFor": formData.classname,
      "educationboard": formData.educationboard,
      "subject": formData.subject,
      "abouttheCourse": formData.abouttheCourse,
      "instituteName": formData.instituteName,
      "instituteCity": "BBSR",
      "instituteCountry": "India",


    })
    .then((res) => {
      setCreateState("notCreating");
      props.onPress();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



//this is latest api to create a new course
export const createnewcourse = ({ formData, data, setCreateState, props }) => {

  axiosInstance
    .post(`course/createnewcourse/`, {


      "creater": data.id,
      "courseShortName": formData.courseShortName,
      "courseLocalCode": formData.courseLocalCode,
      "courseStartDate": formData.courseStartDate,
      "courseEndDate": formData.courseEndDate,
      "designedFor": formData.classname,
      "educationboard": formData.educationboard,
      "subject": formData.subject,


    })
    .then((res) => {
      setCreateState("notCreating");
      props.onPress();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}




export const addcoursetodashboard = ({ courseId, props }) => {




  axiosInstance.put(`course/addcourse/${courseId}/`, {

  })
    .then((res) => {

      props.onPress();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const removecoursefromdashboard = ({ courseId, props }) => {

  return axiosInstance.put(`course/remove/${courseId}/`, {

  })
    .then((res) => {

      props.rerender();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        //console.log('error.response: ', error.response);
        Logout();
      }

    });

}




export const getclassrank = ({ setClassRank }) => {

  axiosInstance.get(`course/coursecategories/`).then((res) => {
    setClassRank(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}



export const getclassobjectbyId = ({ classId, setClassObject }) => {

  axiosInstance.get(`course/class/${classId}/`).then((res) => {
    setClassObject(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}



export const getmeetingobjectbyId = ({ meetingId, setMeetingObject }) => {

  axiosInstance.get(`meeting/object/${meetingId}/`).then((res) => {
    setMeetingObject(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}





export const getsubjectsfromclassandboard = ({ classId, boardId, setSubjectsObject }) => {


  axiosInstance.get(`course/subjects/${classId}/${boardId}`).then((res) => {
    setSubjectsObject(data => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });

}





export const getteachercourses = ({ teacherId, setTeacherCourses }) => {

  axiosInstance.get(`course/names/${teacherId}`).then((res) => {
    setTeacherCourses(courseData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}




export const getcoursesbyglobalCode = ({ globalCode, getCourseData }) => {

  axiosInstance.get(`course/code/${globalCode}/`).then((res) => {
    getCourseData(courseData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}




export const getcoursesbyCourseId = ({ courseId, getCourseData }) => {

  axiosInstance.get(`course/object/${courseId}/`).then((res) => {
    getCourseData(courseData => [res.data]);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



//getVideosData(videosData => [...videosData, ...res.data]);

export const getvideosbyCourseId = ({ pageNo, courseId, getVideosData }) => {


  axiosInstance.get(`course/getvideosbycourseId/${courseId}/?page=${pageNo}`).then((res) => {
    getVideosData(videosData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();


      }


    });

}



export const getfilesbyCourseId = ({ pageNo, courseId, getFilesData }) => {

  axiosInstance.get(`course/getfilesbycourseId/${courseId}/?page=${pageNo}`).then((res) => {
    getFilesData(filesData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}









export const getlinksbyCourseId = ({ pageNo, courseId, getLinksData }) => {

  axiosInstance.get(`course/getlinksbycourseId/${courseId}/?page=${pageNo}`).then((res) => {
    getLinksData(linksData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



export const getusefulllinks = ({ pageNo, getLinksData }) => {

  axiosInstance.get(`getusefulllinks/?page=${pageNo}`).then((res) => {
    getLinksData(linksData => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}


export const deleteContact = (contactId, setEditState, props) => {
  return axiosInstance.put(`/deletecontact/${contactId}/`)
    .then(response => {
      console.log(response);
      setEditState("Removed")
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error("There was an error deleting the contact!", error);
      throw error;
    });
};


export const getContactRequests = (userId) => {
  return axiosInstance.get(`/contact-request/user/${userId}/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching contact requests:', error);
      throw error;
    });
};

export const respondToContactRequest = (userId, requestId, action, props) => {
  return axiosInstance.post(`/contact-request/respond/${userId}/${requestId}/`, { action })

    .then((res) => {
      props.rerender();
    });
};




export const deleteausefulllink = ({ linkId, setRerender }) => {


  axiosInstance.delete(`editdeletelink/${linkId}/`, {


  })
    .then((res) => {
      setRerender(rerender => !rerender);
      console.log("deleted---");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const editoneusefulllink = ({ linkId, formData, props, setEditState }) => {


  axiosInstance.put(`editdeletelink/${linkId}/`, {
    "name": formData.name,
    "link": formData.link,
    "description": formData.description,


  })
    .then((res) => {
      setEditState(editState => "notSaving");
      props.rerender();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}









export const checkcourseexistsindashboard = ({ courseId, checkCourseExists }) => {

  axiosInstance.get(`course/courseexistindashboard/${courseId}/`).then((res) => {
    checkCourseExists(courseExists => [res.data]);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}






export const getcoursesbyCourseIdArray = ({ courseId, getDashboardCourses }) => {

  axiosInstance.get(`course/object/${courseId}/`).then((res) => {
    getDashboardCourses(dashboardCourses => [...dashboardCourses, res.data]);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}





export const Appenn = ({ courseId, allCourses }) => {

  axiosInstance.get(`course/object/${courseId}/`).then(() => (
    allCourses.push({ "bibhu": 'hello baby' })
  )
  );

}








export const getcoursesbyCourseIdSimpleArray = ({ courseId, getCourses }) => {

  axiosInstance.get(`course/object/${courseId}/`).then((res) => {
    getCourses(courses => [...courses, res.data]);

  }).catch((error) => {
    if (error.response.status === 401) {
      Logout();

    }


  });

}















export const getcoursesbyglobalCodeArray = ({ globalCode, getCourseData }) => {

  axiosInstance.get(`course/code/${globalCode}/`).then((res) => {
    let newArray = res.data;
    getCourseData(courseData => [...courseData, ...newArray]);



  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });


}




export const putcourseuser = ({ data }) => {


  axiosInstance.put('', {
    "email": data.email,
    "username": data.username,
    "firstname": data.firstname,
    "lastname": data.lastname,
    "gender": data.gender,
    "role": data.userype,
    "position": data.position,
    "dateofbirth": data.dateofbirth,
    "dashboardcourses": data.dashboardcourses,


  })
    .then((res) => {


    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}





export const addyoutubevideotocourse = ({ formData, courseId, props, setEditState }) => {


  axiosInstance.put(`course/addyoutubevideo/${courseId}/`, {
    "name": formData.name,
    "link": formData.link,
    "description": formData.description,


  })
    .then((res) => {
      setEditState("notSaving");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}



export const addyoutubevideotoclass = ({ formData, classId, props, setEditState }) => {


  axiosInstance.put(`class/addyoutubevideotoclass/${classId}/`, {

    "name": formData.name,
    "link": formData.link,
    "description": formData.description,

  })
    .then((res) => {
      setEditState("notSaving");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}












export const addlinktocourse = ({ formData, courseId, props, setEditState }) => {


  axiosInstance.put(`course/addlinktocourse/${courseId}/`, {
    "name": formData.name,
    "link": formData.link,
    "description": formData.description,


  })
    .then((res) => {
      setEditState("notSaving");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}




export const addlinktoclass = ({ formData, classId, props, setEditState }) => {


  axiosInstance.put(`class/addlinktoclass/${classId}/`, {
    "name": formData.name,
    "link": formData.link,
    "description": formData.description,


  })
    .then((res) => {
      setEditState("notSaving");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}




export const addfiletoclass = ({ fileFormData, classId, props, setEditState }) => {

  console.log("classId:=> ", classId);

  axiosInstance.put(`class/addfiletoclass/${classId}/`, fileFormData)
    .then((res) => {
      setEditState("notSaving");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}



export const editoneclassinfo = ({ formDataSingleClass, classId, props, setEditState }) => {

  axiosInstance.put(`class/editclassdetailsbyId/${classId}/`, {
    "serialNo": formDataSingleClass.serialNo,
    "status": formDataSingleClass.status,
    "datetime": formDataSingleClass.datetime,
    "duration": formDataSingleClass.duration,
    "meetingLink": formDataSingleClass.meetingLink,
    "address": formDataSingleClass.address,
    "topics": formDataSingleClass.topicIds,
    "about": formDataSingleClass.about,

  })
    .then((res) => {
      setEditState("notSaving");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const addusefullinktoaccount = ({ formData, props, setEditState }) => {


  axiosInstance.post(`createusefulllink/`, {
    "name": formData.name,
    "link": formData.link,
    "description": formData.description,


  })
    .then((res) => {
      setEditState("notSaving");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}









export const putdashboardcourses = ({ data }) => {


  axiosInstance.put('dashboardcourses/', {
    "dashboardcourses": data.dashboardcourses,


  })
    .then((res) => {


    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}






export const deletedashboardcourses = ({ dashboardcourses }) => {


  axiosInstance.put('dashboardcourses/', {
    "dashboardcourses": dashboardcourses,


  })
    .then((res) => {


    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}




export const deleteacourse = ({ courseId, props }) => {


  axiosInstance.delete(`course/delete/${courseId}/`, {


  })
    .then((res) => {
      props.rerender();
      console.log("deleted---");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}












export const putcourseenrollrequest = ({ courseId, setEnrollStatus }) => {


  axiosInstance.put(`course/enrollrequest/${courseId}/`, {

  })
    .then((res) => {

      setEnrollStatus('sent');

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}


export const putcourseenroll = ({ courseId, requesterId, setApproveState, props }) => {


  axiosInstance.put(`course/enroll/${courseId}/`, {
    "requesterId": requesterId,


  })
    .then((res) => {
      setApproveState("notLoading");
      props.rerender();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}




export const courseenrollrequestreject = ({ courseId, requesterId, setApproveState, props }) => {


  axiosInstance.put(`course/enrollrequestreject/${courseId}/`, {
    "requesterId": requesterId,


  })
    .then((res) => {
      setApproveState("notLoading");
      props.rerender();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}





export const createnotice = ({ data, formData, selectedCourseIds, props }) => {
  return axiosInstance
    .post(`noticeboard/all/`, {
      "creater": data.id,
      "noticeTitle": formData.noticeTitle,
      "noticeText": formData.noticeText,
      "postCourses": selectedCourseIds,
      "noticefile": null
    })
    .then((res) => {
      props.onPress();
      props.rerender();
      return res;  // Return the response to indicate success
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;  // Throw the error to be caught in handleSubmit
    });
}








export const getnotice = ({ getNoticeData }) => {

  axiosInstance.get(`noticeboard/all/`).then((res) => {

    getNoticeData(noticeData => res.data);



  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}











export const getnoticebyId = ({ noticeid, getNoticeData }) => {

  axiosInstance.get(`noticeboard/all/${noticeid}`).then((res) => {

    let newNotice = res.data;
    getNoticeData(courseData => [...courseData, newNotice]);


  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}





export const getdashboardnotice = ({ getDashboardNotice }) => {

  axiosInstance.get(`noticeboard/dashboardpersonalnotices/`).then((res) => {

    getDashboardNotice(dashboardNotice => res.data);


  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}




















export const getenrolledstudents = ({ courseId, getEnrolledData }) => {

  axiosInstance.get(`course/enroll/${courseId}/`).then((res) => {

    getEnrolledData(enrolledData => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}





export const getsyllabusfromId = ({ syllabusId, getSyllabusData }) => {


  axiosInstance.get(`syllabus/names/${syllabusId}/`).then((res) => {

    getSyllabusData(syllabusData => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}







export const getchapterfromId = ({ chapterId, getChapterData }) => {


  axiosInstance.get(`syllabus/chapter/${chapterId}/`).then((res) => {

    getChapterData(chapterData => [...chapterData, res.data]);


  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }


    });

}



export const editchapternamefromId = ({ chapterId, chaptername }) => {



  axiosInstance.put(`syllabus/editchapter/${chapterId}/`, {

    "id": chapterId,
    "name": chaptername

  })
    .then((res) => {

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}







export const getsectionfromId = ({ sectionId, getSectionData }) => {


  axiosInstance.get(`syllabus/section/${sectionId}/`).then((res) => {

    getSectionData(sectionData => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}



export const gettopicfromId = ({ topicId, getTopicData }) => {


  axiosInstance.get(`syllabus/topic/${topicId}/`).then((res) => {

    getTopicData(topicData => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });

}


export const putsectiondata = ({ sectionid, topicData, setRerender }) => {


  axiosInstance.put(`syllabus/section/${sectionid}/`, {

    "id": sectionid,
    "name": "Section-2",
    "topics": topicData,


  })
    .then((res) => {
      //console.log("hhhhh---",topicData);
      setRerender(rerender => !rerender);

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}



export const editsectiondata = ({ sectionid, topicData, setRerender }) => {


  axiosInstance.put(`syllabus/editsection/${sectionid}/`, {

    "id": sectionid,
    "name": "Section-2",
    "topicsText": topicData,


  })
    .then((res) => {
      //console.log("hhhhh---",topicData);
      setRerender(rerender => !rerender);

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}





export const createnewsection = ({ sectionPostData, setRerender }) => {


  axiosInstance.post(`syllabus/section/`, {


    "name": sectionPostData.name,
    "topics": [],
    "chapterid": sectionPostData.chapterid,


  })
    .then((res) => {

      setRerender(rerender => !rerender);
      //console.log("section added");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}








export const deletesectiondata = ({ sectionid }, props) => {


  axiosInstance.delete(`syllabus/section/${sectionid}/`, {


  })
    .then((res) => {
      console.log("deleted---");
      props.rerender();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}









export const deletechapterdata = ({ chapterId, props }) => {
  console.log("chap Id: ", chapterId);

  axiosInstance.delete(`syllabus/chapter/${chapterId}/`, {


  })
    .then((res) => {
      //console.log("chapter deleted---");
      props.rerender();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}




export const createnewchapter = async ({ formData, props }) => {
  try {
    await axiosInstance.post('syllabus/chapter/', {
      "name": formData.chapterTitle,
      "sections": [],
      "chapternum": formData.chapterNumber,
      "syllabusid": formData.syllabusId
    });


    if (props && typeof props.onPress === 'function') {
      props.onPress();
    }
    return { success: true };

  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout();
    } else {
      console.error('Error creating chapter:', error);
    }
    return { success: false };
  }
};



export const getchapternumbers = ({ setChapterNumbers }) => {


  axiosInstance.get(`syllabus/chapternumber/`).then((res) => {

    setChapterNumbers(chapterNumbers => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });

}



//2022-12-03T03:15:00Z
export const createnewclass = ({ formDataSingleClass, props, setFormSubmissionStatus }) => {


  console.log("topic ids to be added: ", formDataSingleClass.topicIds)

  axiosInstance.post(`class/all/`, {

    "course": formDataSingleClass.courseId,
    "serialNo": formDataSingleClass.serialNo,
    "status": formDataSingleClass.status,
    "datetime": formDataSingleClass.datetime,
    "duration": formDataSingleClass.duration,
    "meetingLink": formDataSingleClass.meetingLink,
    "address": formDataSingleClass.address,
    "topics": formDataSingleClass.topicIds,
    "about": formDataSingleClass.about,

  })
    .then((res) => {
      console.log("class added");
      setFormSubmissionStatus("Submitted")
      props.onPress();
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



//let apidetailinfo == {"name":"home_dashboard_classes","url":"class/all/","type":"post", "json":{"course":10,"serialNo":1,"status":"scheduled","datetime":"2023-09-20T09:33:00Z","duration": 30,"meetingLink":"https://..","address":"H210","about":"This is about..","topics":[1,23,2] },"description":"Create a new class from dashboard"}





export const getalluserclasses = ({ getUserClasses, pageNo }) => {


  axiosInstance.get(`class/getalluserclasses/?page=${pageNo}`).then((res) => {

    getUserClasses(userClasses => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });

}




//let apidetailinfo == {"name":"home_dashboard_classes","url":"class/getalluserclasses/?page=1","type":"get", "json":{"id":10 },"description":"Get all classes for All view "}



export const getdayclasses = ({ getUserDayClasses, formattedDate, timezone, pageNo }) => {

  const encodedTimezone = encodeURIComponent(timezone);

  axiosInstance.get(`class/getdayclasses/${formattedDate}/${timezone}/?page=${pageNo}`).then((res) => {


    getUserDayClasses(userDayClasses => res.data);


  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });

}

//let apidetailinfo == {"name":"home_dashboard_classes","url":"class/getdayclasses/2023-09-15/Asia/Kolkata?page=1","type":"get", "json":{"next":null,"previous":null,"total_pages":1,"results":[{"about":null,"courseId":123,"courseName":"Phys","datetime":"2023-09-20T09:33:00Z","duration":20,"meetingLink":"https://..","serialNo":null,"status":"scheduled","topics":[{"id":1,"name":"circular motion"}]}] },"description":"Get all classes for a given day in UTC time"}







export const getweekclasses = ({ getUserWeekClasses, startdate, timezone, pageNo }) => {


  axiosInstance.get(`class/getweekclasses/${startdate}/${timezone}/?page=${pageNo}`).then((res) => {


    getUserWeekClasses(userDayClasses => res.data);

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });

}



export const deleteclassbyId = async ({ classId, props }) => {
  const url = `class/deleteclass/${classId}/`;
  try {
    const response = await axiosInstance.delete(url);
    console.log("Class deleted successfully");
    props.rerender();
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout();
    } else {
      throw error;
    }
  }
};

//let apidetailinfo == {"name":"home_dashboard_classes","url":"class/deleteclass/12/","type":"delete", "json": "N/A","description":"Delete a class from class id"}








export const createmulticlass = ({ formDataMultiClass, setCreating }) => {


  axiosInstance.post(`class/multicreate/`, {

    "courseId": formDataMultiClass.courseId,
    "serialNo": formDataMultiClass.serialNo,
    "classStatus": formDataMultiClass.classStatus,
    "classdate": "2022-03-31",
    "classtime": formDataMultiClass.classtime,
    "duration": formDataMultiClass.duration,
    "meetingLink": formDataMultiClass.meetingLink,
    "roomNo": formDataMultiClass.roomNo,
    "chapter": formDataMultiClass.chapter,
    "topics": formDataMultiClass.topics,

    "startdate": formDataMultiClass.classDateStart,
    "enddate": formDataMultiClass.classDateEnd,

    "checkedMon": formDataMultiClass.checkedMon,
    "mondaytime": ("classtimeMonday" in formDataMultiClass) ? formDataMultiClass.classtimeMonday : "00:00:00",
    "mondayduration": ("selecteddurationMon" in formDataMultiClass) ? formDataMultiClass.selecteddurationMon : 0,

    "checkedTues": formDataMultiClass.checkedTues,
    "tuesdaytime": ("classtimeTuesday" in formDataMultiClass) ? formDataMultiClass.classtimeTuesday : "00:00:00",
    "tuesdayduration": ("selecteddurationTues" in formDataMultiClass) ? formDataMultiClass.selecteddurationTues : 0,

    "checkedWed": formDataMultiClass.checkedWed,
    "wednesdaytime": ("classtimeWednesday" in formDataMultiClass) ? formDataMultiClass.classtimeWednesday : "00:00:00",
    "wednesdayduration": ("selecteddurationWed" in formDataMultiClass) ? formDataMultiClass.selecteddurationWed : 0,



    "checkedThurs": formDataMultiClass.checkedThurs,
    "thursdaytime": ("classtimeThursday" in formDataMultiClass) ? formDataMultiClass.classtimeThursday : "00:00:00",
    "thursdayduration": ("selecteddurationThurs" in formDataMultiClass) ? formDataMultiClass.selecteddurationThurs : 0,

    "checkedFri": formDataMultiClass.checkedFri,
    "fridaytime": ("classtimeFriday" in formDataMultiClass) ? formDataMultiClass.classtimeFriday : "00:00:00",
    "fridayduration": ("selecteddurationFri" in formDataMultiClass) ? formDataMultiClass.selecteddurationFri : 0,

    "checkedSat": formDataMultiClass.checkedSat,
    "saturdaytime": ("classtimeSaturday" in formDataMultiClass) ? formDataMultiClass.classtimeSaturday : "00:00:00",
    "saturdayduration": ("selecteddurationSat" in formDataMultiClass) ? formDataMultiClass.selecteddurationSat : 0,

    "checkedSun": formDataMultiClass.checkedSun,
    "sundaytime": ("classtimeSunday" in formDataMultiClass) ? formDataMultiClass.classtimeSunday : "00:00:00",
    "sundayduration": ("selecteddurationSun" in formDataMultiClass) ? formDataMultiClass.selecteddurationSun : 0,





  })
    .then((res) => {
      setCreating(creating => false);
      console.log("class added");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}





export const createnewmeeting = ({ formDataSingleClass }) => {


  axiosInstance.post(`meeting/all/`, {

    "name": formDataSingleClass.name,
    "courseId": formDataSingleClass.courseId,
    "serialNo": formDataSingleClass.serialNo,
    "meetingStatus": formDataSingleClass.meetingStatus,
    "meetingdate": formDataSingleClass.meetingdate,
    "meetingtime": formDataSingleClass.meetingtime,
    "duration": formDataSingleClass.duration,
    "meetingLink": formDataSingleClass.meetingLink,
    "roomNo": formDataSingleClass.roomNo,
    "chapter": formDataSingleClass.chapter,
    "topics": formDataSingleClass.topics,
    "creater": formDataSingleClass.creater

  })
    .then((res) => {

      console.log("meeting added");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



export const createnewmeetingpersonal = ({ formDataSingleClass }) => {


  axiosInstance.post(`meeting/allpersonal/`, {

    "name": formDataSingleClass.name,
    "courseId": formDataSingleClass.courseId,
    "serialNo": formDataSingleClass.serialNo,
    "meetingStatus": formDataSingleClass.meetingStatus,
    "meetingdate": formDataSingleClass.meetingdate,
    "meetingtime": formDataSingleClass.meetingtime,
    "duration": formDataSingleClass.duration,
    "meetingLink": formDataSingleClass.meetingLink,
    "roomNo": formDataSingleClass.roomNo,
    "chapter": formDataSingleClass.chapter,
    "topics": formDataSingleClass.topics,
    "creater": formDataSingleClass.creater

  })
    .then((res) => {

      console.log("meeting added");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const createonemeeting = ({ formDataSingleClass, props }) => {


  axiosInstance.post(`meeting/createone/`, {

    "name": formDataSingleClass.name,
    "courseId": formDataSingleClass.courseId,
    "serialNo": formDataSingleClass.serialNo,
    "meetingStatus": formDataSingleClass.meetingStatus,
    "datetime": formDataSingleClass.datetime,
    "duration": formDataSingleClass.duration,
    "meetingLink": formDataSingleClass.meetingLink,
    "address": formDataSingleClass.address,
    "creater": formDataSingleClass.creater,
    "about": formDataSingleClass.about

  })
    .then((res) => {

      console.log("meeting added");
      props.onPress();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}










export const createmultimeeting = ({ formDataMultiClass, setCreating }) => {


  axiosInstance.post(`meeting/multicreate/`, {

    "courseId": formDataMultiClass.courseId,
    "serialNo": formDataMultiClass.serialNo,
    "meetingStatus": formDataMultiClass.meetingStatus,
    "meetingdate": "2022-03-31",
    "meetingtime": formDataMultiClass.meetingtime,
    "duration": formDataMultiClass.duration,
    "meetingLink": formDataMultiClass.meetingLink,
    "roomNo": formDataMultiClass.roomNo,
    "chapter": formDataMultiClass.chapter,
    "topics": formDataMultiClass.topics,
    "creater": formDataMultiClass.creater,

    "startdate": formDataMultiClass.classDateStart,
    "enddate": formDataMultiClass.classDateEnd,

    "checkedMon": formDataMultiClass.checkedMon,
    "mondaytime": ("classtimeMonday" in formDataMultiClass) ? formDataMultiClass.classtimeMonday : "00:00:00",
    "mondayduration": ("selecteddurationMon" in formDataMultiClass) ? formDataMultiClass.selecteddurationMon : 0,

    "checkedTues": formDataMultiClass.checkedTues,
    "tuesdaytime": ("classtimeTuesday" in formDataMultiClass) ? formDataMultiClass.classtimeTuesday : "00:00:00",
    "tuesdayduration": ("selecteddurationTues" in formDataMultiClass) ? formDataMultiClass.selecteddurationTues : 0,

    "checkedWed": formDataMultiClass.checkedWed,
    "wednesdaytime": ("classtimeWednesday" in formDataMultiClass) ? formDataMultiClass.classtimeWednesday : "00:00:00",
    "wednesdayduration": ("selecteddurationWed" in formDataMultiClass) ? formDataMultiClass.selecteddurationWed : 0,



    "checkedThurs": formDataMultiClass.checkedThurs,
    "thursdaytime": ("classtimeThursday" in formDataMultiClass) ? formDataMultiClass.classtimeThursday : "00:00:00",
    "thursdayduration": ("selecteddurationThurs" in formDataMultiClass) ? formDataMultiClass.selecteddurationThurs : 0,

    "checkedFri": formDataMultiClass.checkedFri,
    "fridaytime": ("classtimeFriday" in formDataMultiClass) ? formDataMultiClass.classtimeFriday : "00:00:00",
    "fridayduration": ("selecteddurationFri" in formDataMultiClass) ? formDataMultiClass.selecteddurationFri : 0,

    "checkedSat": formDataMultiClass.checkedSat,
    "saturdaytime": ("classtimeSaturday" in formDataMultiClass) ? formDataMultiClass.classtimeSaturday : "00:00:00",
    "saturdayduration": ("selecteddurationSat" in formDataMultiClass) ? formDataMultiClass.selecteddurationSat : 0,

    "checkedSun": formDataMultiClass.checkedSun,
    "sundaytime": ("classtimeSunday" in formDataMultiClass) ? formDataMultiClass.classtimeSunday : "00:00:00",
    "sundayduration": ("selecteddurationSun" in formDataMultiClass) ? formDataMultiClass.selecteddurationSun : 0,


  })
    .then((res) => {
      setCreating(creating => false);
      console.log("multiple classes added");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



//formDataMultiClass.courseId
export const createmultimeetingpersonal = ({ formDataMultiClass, setCreating }) => {


  axiosInstance.post(`meeting/multicreatepersonal/`, {

    "courseId": 5,
    "serialNo": formDataMultiClass.serialNo,
    "meetingStatus": formDataMultiClass.meetingStatus,
    "meetingdate": "2022-03-31",
    "meetingtime": formDataMultiClass.meetingtime,
    "duration": formDataMultiClass.duration,
    "meetingLink": formDataMultiClass.meetingLink,
    "roomNo": formDataMultiClass.roomNo,
    "chapter": formDataMultiClass.chapter,
    "topics": formDataMultiClass.topics,
    "creater": formDataMultiClass.creater,

    "startdate": formDataMultiClass.classDateStart,
    "enddate": formDataMultiClass.classDateEnd,

    "checkedMon": formDataMultiClass.checkedMon,
    "mondaytime": ("classtimeMonday" in formDataMultiClass) ? formDataMultiClass.classtimeMonday : "00:00:00",
    "mondayduration": ("selecteddurationMon" in formDataMultiClass) ? formDataMultiClass.selecteddurationMon : 0,

    "checkedTues": formDataMultiClass.checkedTues,
    "tuesdaytime": ("classtimeTuesday" in formDataMultiClass) ? formDataMultiClass.classtimeTuesday : "00:00:00",
    "tuesdayduration": ("selecteddurationTues" in formDataMultiClass) ? formDataMultiClass.selecteddurationTues : 0,

    "checkedWed": formDataMultiClass.checkedWed,
    "wednesdaytime": ("classtimeWednesday" in formDataMultiClass) ? formDataMultiClass.classtimeWednesday : "00:00:00",
    "wednesdayduration": ("selecteddurationWed" in formDataMultiClass) ? formDataMultiClass.selecteddurationWed : 0,



    "checkedThurs": formDataMultiClass.checkedThurs,
    "thursdaytime": ("classtimeThursday" in formDataMultiClass) ? formDataMultiClass.classtimeThursday : "00:00:00",
    "thursdayduration": ("selecteddurationThurs" in formDataMultiClass) ? formDataMultiClass.selecteddurationThurs : 0,

    "checkedFri": formDataMultiClass.checkedFri,
    "fridaytime": ("classtimeFriday" in formDataMultiClass) ? formDataMultiClass.classtimeFriday : "00:00:00",
    "fridayduration": ("selecteddurationFri" in formDataMultiClass) ? formDataMultiClass.selecteddurationFri : 0,

    "checkedSat": formDataMultiClass.checkedSat,
    "saturdaytime": ("classtimeSaturday" in formDataMultiClass) ? formDataMultiClass.classtimeSaturday : "00:00:00",
    "saturdayduration": ("selecteddurationSat" in formDataMultiClass) ? formDataMultiClass.selecteddurationSat : 0,

    "checkedSun": formDataMultiClass.checkedSun,
    "sundaytime": ("classtimeSunday" in formDataMultiClass) ? formDataMultiClass.classtimeSunday : "00:00:00",
    "sundayduration": ("selecteddurationSun" in formDataMultiClass) ? formDataMultiClass.selecteddurationSun : 0,


  })
    .then((res) => {
      setCreating(creating => false);
      console.log("multiple classes added");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}

































export const putmeetinginfo = ({ meetingid, formDataSingleClass, props }) => {


  axiosInstance.put(`meeting/editmeeting/${meetingid}`, {



    "name": formDataSingleClass.name,
    "about": formDataSingleClass.about,
    "address": formDataSingleClass.address,
    "meetingStatus": formDataSingleClass.meetingStatus,
    "datetime": formDataSingleClass.datetime,
    "duration": formDataSingleClass.duration,
    "meetingLink": formDataSingleClass.meetingLink


  })
    .then((res) => {
      props.onPress();
      console.log("meeting info edited", formDataSingleClass);


    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}






















export const createnewbook = ({ imageformData }) => {


  axiosInstance.post(`book/objects/`, imageformData).then((res) => { console.log(res.data) })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });




}





export const uploadprofieimage = ({ imageformData, setImageUploaded, cancelHandler, props }) => {


  axiosInstance.put(`profileimageupload/`, imageformData).then((res) => {
    props.rerender();
    setImageUploaded(imageUploaded => "uploaded");
    cancelHandler();
    //setTimeout(res, 5000)
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}





export const uploadcoursecardimage = ({ imageformData, setImageUploaded, courseId, props }) => {


  axiosInstance.put(`course/coursecardimageupload/${courseId}/`, imageformData).then((res) => {
    //props.rerender();
    setImageUploaded(imageUploaded => "uploaded");
    props.onPress();
    props.rerender();
    //setTimeout(res, 5000)
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}









export const uploadofficeid = ({ imageformData }) => {


  axiosInstance.put(`officeidupload/`, imageformData).then((res) => { console.log(res.data) })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



export const uploadgovtid1 = ({ imageformData }) => {


  axiosInstance.put(`govtid1upload/`, imageformData).then((res) => { console.log(res.data) })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



export const uploadgovtid2 = ({ imageformData }) => {


  axiosInstance.put(`govtid2upload/`, imageformData).then((res) => { console.log(res.data) })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



export const uploaddobcert = ({ imageformData }) => {


  axiosInstance.put(`dobcertupload/`, imageformData).then((res) => { console.log(res.data) })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}












export const getbooks = ({ setData }) => {



  axiosInstance.get()
    .then((res) => {
      setData(data => res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}






export const getnoticeIddash = ({ noticeId }) => {


  axiosInstance.get(`noticeids/`).then((res) => {
    console.log("noticeIds---", res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}


export const marknoticeasread = ({ noticeId, props }) => {

  axiosInstance.put(`noticeids/`, {

    "readnoticeId": noticeId

  })
    .then((res) => {

      props.rerender();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}







export const marknoticeasunread = ({ noticeId, props }) => {

  axiosInstance.put(`noticeidremove/`, {

    "readnoticeId": noticeId

  })
    .then((res) => {

      props.rerender();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}







export const deletenoticebyId = async ({ noticeId, props }) => {
  try {
    const response = await axiosInstance.delete(`noticeboard/delete/${noticeId}/`);
    console.log("Notice deleted successfully", response);
    props.rerender();
  } catch (error) {
    console.error("Error deleting notice:", error);
    if (error.response && error.response.status === 401) {
      Logout();
    }
  }
};



export const removenoticebyId = ({ noticeId, props }) => {


  axiosInstance.put(`noticeboard/remove/${noticeId}/`, {



  })
    .then((res) => {

      props.rerender();

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}




export const changepassword = ({ formData, setLoginState }) => {

  axiosInstance.put(`setotpaspswd/${formData.username}/`, {

    "username": formData.username,

  })
    .then((res) => {

      setLoginState(loginState => "OTPsent");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



export const sendotpemail = ({ formData, setLoginState }) => {

  axiosInstance.put(`sendotpemail/${formData.email}/`, {
    "email": formData.email,
  })
    .then((res) => {
      setLoginState(loginState => "OTPsent");
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}



export const sendotpphoneno = ({ formData, setLoginState }) => {

  axiosInstance.put(`sendotpphone/+91${formData.phoneno}/`, {

    "phoneno": "+91" + formData.phoneno,

  })
    .then((res) => {
      setLoginState(loginState => "OTPsent");
    })

    .catch((error) => {
      console.error("Error sending OTP :", error);
      if (error.response.status === 401) {
        Logout();
      } else if (error.response.status === 404) {
        alert("Phone Num not found. Please try again.");
      } else {
        // Display a generic error message
        alert("Failed to send OTP . Please try again later.");
      }
    })

}








export const putuserprofile = ({ data, formData }) => {

  console.log("formData", formData);

  axiosInstance.put('userprofilegetput/', {
    "email": formData.email,
    "username": data.username,
    "usertitle": formData.usertitle,
    "firstname": formData.firstname,
    "lastname": formData.lastname,
    "gender": formData.gender,
    //"role": "student",
    "position": formData.position,
    //"dateofbirth": formData.dateofbirth,
    "institute": formData.institute,
    "city": formData.city,
    "state": formData.state,
    "country": formData.country,

  })
    .then((res) => {

      console.log("formData", formData);


    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const putuserprofileadvanced = async ({ data, formData }) => {
  try {
    const response = await axiosInstance.put('userprofilegetput/', {
      email: formData.email,
      username: data.username,
      usertitle: formData.usertitle,
      firstname: formData.firstname,
      lastname: formData.lastname,
      gender: formData.gender,
      position: formData.position,
      dateofbirth: formData.dateofbirth,
      institute: formData.institute,
      city: formData.city,
      state: formData.state,
      country: formData.country,
    });

    console.log("formData", formData);
    return response.data;

  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout();
    } else {
      console.error("Error updating profile:", error);
    }
    throw error;
  }
};


export const deletemeeting = ({ meetingid, setEditState, props }) => {

  axiosInstance.delete(`meeting/object/${meetingid}/`, {
  })
    .then((res) => {
      console.log(" meeting deleted---");
      setEditState("Removed");
      props.rerender();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });

}





export const createnewpresentation = ({ formData, props }) => {

  axiosInstance.post(`meeting/createpresentation/`, {

    "talktitle": formData.talktitle,
    "talktime": formData.talktime,
    "duration": formData.duration,
    "speaker": formData.speaker,
    "outspeaker": null,
    "meetingid": formData.meetingId

  })
    .then((res) => {

      props.onPress();
      console.log("talk created");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}



export const getusersfromnames = ({ namestring, getSearchUsers }) => {

  axiosInstance.get(`searchusersstr/${namestring}/`).then((res) => {

    getSearchUsers(searchUsers => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}


export const uploadtalk = ({ imageformData, props }) => {

  axiosInstance.post(`meeting/uploadtalk/`, imageformData).then((res) => {
    props.onPress();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const deletepresentation = ({ talkId }) => {


  axiosInstance.delete(`meeting/presentation/delete/${talkId}`, {

  })
    .then((res) => {
      console.log(" presentation deleted---");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}






export const putpresentation = ({ talkId, formData }) => {

  axiosInstance.put(`/meeting/presentation/put/${talkId}`, {

    "talktitle": formData.talktitle,
    "talktime": formData.talktime,
    "duration": formData.duration

  })
    .then((res) => {

      console.log("put ppt: ", res.data)
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}






export const putaddcontact = ({ userId, contactId, setUserAdded, setRerender }, props) => {

  axiosInstance.post(`/contact-request/send/${userId}/${contactId}/`)
    .then((res) => {
      setUserAdded(userAdded => "added");
      props.rerender();
      setRerender(rerender => !rerender);
      console.log("contact added: ", res.data)
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}





export const createedudegree = ({ formData, data }) => {

  axiosInstance
    .post(`edudegreecreate/`, {

      "userId": data.id,
      "institute": formData.instituteid !== "" ? formData.instituteid : formData.institute,
      "degreename": formData.degreename,
      "startDate": formData.startData,
      "endDate": formData.endDate

    })
    .then((res) => {
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}






export const getdegreenames = ({ getDegreeNames }) => {


  axiosInstance.get(`degreenames/`).then((res) => {


    getDegreeNames(degreeNames => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}





export const getinstitutenames = ({ getInstituteNames }) => {


  axiosInstance.get(`institutenames/`).then((res) => {

    getInstituteNames(degreeNames => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}



export const getinstitutebatches = ({ instituteId, getInstituteBatches }) => {

  axiosInstance.get(`institute/list-batches/?institute_id=${instituteId}`).then((res) => {
    getInstituteBatches(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}


export const createinstitutebatch = ({ formData, props, setSubmitState }) => {

  axiosInstance.post(`institute/create-batch/`, {
    "name": formData.name,
    "start_date": formData.start_date,
    "end_date": formData.end_date,
    "institute": formData.institute,
    "created_by": formData.creator,
    "courses": []

  }).then((res) => {
    setSubmitState("submitted");
    props.onPress();

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}





export const deleteinstitutebatch = ({ batch_id, user_id, props }) => {
  return axiosInstance
    .delete(`institute/delete-batch/${batch_id}/${user_id}/`)
    .then((res) => {
      props.onPress();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
      throw error;
    });
};





export const getinstitutepaymentsummary = ({ institute_id, formData, getInstitutePaymentSummary }) => {



  axiosInstance.get(`institute/${institute_id}/summary-institute/?start_date=${formData.startDate}&end_date=${formData.endDate}`).then((res) => {

    getInstitutePaymentSummary(institutePaymentSummary => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}



export const getinstitutepaymentsummaryformember = ({ institute_id, user_id, getInstitutePaymentSummary }) => {

  axiosInstance.get(`institute/${institute_id}/summary-institute/?user_id=${user_id}`).then((res) => {

    getInstitutePaymentSummary(institutePaymentSummary => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}






export const usersearchinstitutebyname = ({ firstname, institute_id, getSearchUsers }) => {

  axiosInstance.get(`institute/users/?institute_id=${institute_id}&first_name=${firstname}&is_member=true`).then((res) => {

    getSearchUsers(searchUsers => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}










export const deleteedudegree = ({ edudegreeid }) => {


  axiosInstance.delete(`edudegreedelete/${edudegreeid}/`, {


  })
    .then((res) => {
      console.log(" edu degree deleted---");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}






export const createaddress = ({ formData }) => {

  axiosInstance
    .post(`addnewaddress/`, {

      "userId": formData.userId,
      "careof": formData.careof,
      "houseno": formData.houseno,
      "streetno": formData.streetno,
      "district": formData.district,
      "pincode": formData.pincode,
      "city": formData.city,
      "state": formData.state,
      "country": formData.country,
      "addressType": formData.addressType

    })
    .then((res) => {
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}




export const createachievement = ({ formData }) => {

  axiosInstance
    .post(`createachievement/`, {

      "name": formData.name,
      "description": formData.description,
      "startDate": formData.startDate,
      "endDate": formData.endDate,
      "userId": formData.userId

    })
    .then((res) => {
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }

    });

}




export const createaccountwithmobileno = ({ formData, setLoading }) => {


  axiosInstance.post(`createaccountwithphonenum/`, {

    "username": formData.username,
    "usertype": formData.usertype

  })
    .then((res) => {

      setLoading(loading => "created");

    })
    .catch((error) => {

      console.log("error", error);
      if (error.response.status === 401) {
        Logout();

      }

    });

}



export const createaccount = ({ formData, setLoginState }) => {


  axiosInstance.post(`createaccount/`, {

    "username": formData.username,
    "email": formData.email,
    "phoneno": "+91" + formData.phoneno,

  })
    .then((res) => {

      setLoginState(loginState => "accountCreated");
    })
    .catch((error) => {

      console.log("error", error);
      if (error.response.status === 401) {
        Logout();

      }
    });
}


export const createaccountnew = async ({ formData, setLoginState }) => {
  try {
    const response = await axiosInstance.post(`createaccount/`, {
      "username": formData.username,
      "email": formData.email,
      "phoneno": "+91" + formData.phoneno,
    });

    setLoginState(loginState => "accountCreated");
    return response.data; // You can return any data you want to pass to the caller
  } catch (error) {
    console.log("error", error);
    if (error.response.status === 401) {
      Logout();
    }
    throw error; // Rethrow the error so it can be caught by the caller
  }
};







//let apidetailinfo == {"name":"account","url":"createaccount/","type":"post", "json":{ "username":null,"email":"bibhuj@gmail.com","phoneno":null},"description":"New Account will be created. Either email or phoneno should be provided"}








export const checkuserexist = ({ setUserExists, username }) => {


  axiosInstance.get(`getuserfromusername/${username}`).then((res) => {

    setUserExists(userExists => res.data.message);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}




export const checkifuserexist = ({ setUserExists, userinput }) => {

  axiosInstance.get(`getuserfromuserinput/${userinput}`).then((res) => {
    setUserExists(userExists => res.data.message);
  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const getadmincourses = ({ getAdminCourses }) => {

  axiosInstance.get(`course/admincourses/`).then((res) => {
    getAdminCourses(adminCourses => res.data.message);
  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




//let apidetailinfo == {"name":"account","url":"getuserfromuserinput/+917077090308","type":"get", "json":{"message":"true"},"description":"Check if user exists from email or phone no"}






export const getgeneralmeetings = ({ getGeneralMeetings }) => {

  axiosInstance.get(`generalmeetings/`).then((res) => {
    getGeneralMeetings(generalMeetings => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });

}





export const changeusertype = ({ usertypeId }) => {


  axiosInstance.put(`changeusertype/${usertypeId}/`, {

  })
    .then((res) => {

      window.location.reload(false);
    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });
}




export const getassignment = ({ courseID, setData }) => {
  axiosInstance
    .get(`assignment/get/${courseID}/`)
    .then((res) => {
      setData((data) => res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
};


// export const createAssignmentform = ({
//   formData,
//   courseId,
//   props,
//   setFormData,
// }) => {
//   axiosInstance
//     .put(`assignment/create/${courseId}/`, {
//       id: formData.id,
//       title: formData.title,
//       creater: formData.creater,
//       description: formData.description,
//       publishDate: formData.publishDate,
//       dueDate: formData.dueDate,
//       credit: formData.credit,
//       questionFiles: formData.questionFiles,
//       answerFiles: formData.answerFiles,
//     })
//     .then((res) => {
//       setFormData("notSaving");
//       props.onPress();
//     })

//     .catch((error) => {
//       if (error.response.status === 401) {
//         Logout();
//       }
//     });
// };

export const assignmentform = ({ formData, courseId, props }) => {
  axiosInstance
    .put(`assignment/get/${courseId}/`, {
      title: formData.title,
      creater: formData.creater,
      description: formData.description,
      publishDate: formData.publishDate,
      dueDate: formData.dueDate,
      credit: formData.credit,
      questionFiles: formData.questionFiles,
      answerFiles: formData.answerFiles,
    })
    .then((res) => {
      props.rerender();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
};




export const createnewregistration = ({ submitData, setCreateState }) => {
  axiosInstance
    .post(`onlineregistration/create/`, submitData)
    .then((res) => {
      setCreateState("Success");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
};




export const getallregistrants = ({ getRegistrants }) => {


  axiosInstance.get(`onlineregistration/get/`).then((res) => {

    getRegistrants(registrants => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}




export const createinstitute = ({ fileFormData, props, setEditState }) => {

  axiosInstance.post(`institute/create/`, fileFormData).then((res) => {
    setEditState("Saved");
    props.onPress();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}


export const editinstitutenamelogo = ({ fileFormData, props, setEditState, instId }) => {

  axiosInstance.put(`institute/editinstitutenamelogo/${instId}/`, fileFormData).then((res) => {
    setEditState("Saved");
    props.onPress();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}






export const addmembertoinstitute = ({ newArray, props, setSubmissionState, instId, addingUserId }) => {

  axiosInstance.put(`institute/addmember/${instId}/by/${addingUserId}/`, newArray).then((res) => {
    setSubmissionState("Submitted");
    props.onPress();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}













export const editinstituteaddress = ({ formAddress, props, setEditAddressState, instId }) => {

  axiosInstance.put(`institute/editinstituteaddress/${instId}/`,
    {
      "address": formAddress
    }).then((res) => {
      setEditAddressState("addressSaved");
      props.rerender();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}


export const editinstituteweburl = ({ formWebAddress, props, setEditWebAddressState, instId }) => {

  axiosInstance.put(`institute/editinstituteweburl/${instId}/`,
    {
      "websiteurl": formWebAddress
    }).then((res) => {
      setEditWebAddressState("addressSaved");
      props.rerender();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}
export const createinstituteofficial = ({ instId, serialNum, userId, formValues, props }) => {
  axiosInstance.post(`/institute/${instId}/user/${userId}/official/create/`,
    {
      "name": formValues.name,
      "designation": formValues.designation,
      "contact_email": formValues.contact_email,
      "official_phone": formValues.official_phone
    }).then((res) => {
      // setEditOfficialNameState("addressSaved");
      props.rerender();
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}
export const geteditinstituteofficial = ({ instId, getEditOfficial, official_Id }) => {

  axiosInstance.get(`institute/${instId}/officials/`).then((res) => {
    getEditOfficial(res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}
export const deleteinstituteofficial = ({ instId, user_Id, serialNum }) => {

  return axiosInstance.delete(`institute/${instId}/official/${serialNum}/user/${user_Id}/delete/`).then((res) => {
    return res;
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });

}
export const editinstituteofficial = ({ instId, user_Id, serialNum, formValues }) => {

  return axiosInstance.put(`institute/${instId}/official/${serialNum}/user/${user_Id}/edit/`,
    {
      "name": formValues.name,
      "designation": formValues.designation,
      "contact_email": formValues.contact_email,
      "official_phone": formValues.official_phone
    }).then((res) => {
      return res;

    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}













export const getmyinstitutes = ({ getMyInstitutes }) => {

  axiosInstance.get(`institute/getmyinstitutes/`).then((res) => {
    getMyInstitutes(myInstitutes => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}





export const getinstitutemembers = ({ institute_id, role, getInstituteMembers }) => {

  axiosInstance.get(`institute/${institute_id}/members/?user_type=${role ? role : ""}`).then((res) => {
    getInstituteMembers(instituteMembers => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}






export const editinstitutemember = ({ institute_id, user_id, formData, setEditState, props }) => {

  axiosInstance.put(`institute/${institute_id}/memberships/${user_id}/`, {

    "userId": formData.userId,
    "userType": formData.userType,
    "employee_id": formData.employee_id


  }).then((res) => {
    setEditState("saved");
    props.onPress()
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}





export const deleteinstitutemember = ({ institute_id, user_id, deletingUserId, setEditState, props }) => {

  axiosInstance.delete(`institute/${institute_id}/deletemember/${user_id}/by/${deletingUserId}/`).then((res) => {
    setEditState("saved");
    props.onPress()
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}






export const deleteinstitute = ({ institute_id, setDeleteState, props }) => {

  axiosInstance.delete(`institute/delete/${institute_id}/`).then((res) => {
    setDeleteState("deleted");
    //props.rerender()
    window.location.reload();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}






export const getoneinstitutedetail = ({ instituteId, getOneInstituteDetail }) => {

  axiosInstance.get(`institute/getoneinstitutebyid/${instituteId}/`).then((res) => {
    getOneInstituteDetail(oneInstitute => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}




//  {

//      'scheduled_for': formData,
//      'amount': formData,
//      'description': formData,
//      'date_of_schedule': formData,
//      'user': formData,
//     'custom_user': formData,
//      'due_amount': formData,
//      'institute': formData,
//      'type_transaction': formData,
//      'installments': formData

//       }


//https://dashoapp.com/api/institute/175/user/70/fee/53/processscheduled/


export const createtransaction = ({ institute_id, user_id, fee_id, formData, props }) => {


  axiosInstance.post(`institute/${institute_id}/user/${user_id}/fee/${fee_id}/processscheduled/`,
    {
      "amount": formData.amount,
      "transaction_type": formData.transaction_type,
      "method": formData.method,
      "status": formData.status,
      "date_of_payment": formData.date_of_schedule + "T20:06:00.157357Z"
    }
  ).then((res) => {

    props.onPress();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });


}







export const scheduleinstitutepayment = ({ institute_id, admin_user_id, paymentForm, setPaymentScheduleStatus, props }) => {

  axiosInstance.post(`institute/${institute_id}/user/${admin_user_id}/schedule_payment/`,
    paymentForm
  ).then((res) => {

    setPaymentScheduleStatus("scheduled");
    props.onPress();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}




export const deleteinstitutepayment = ({ institute_id, user_id, fee_id }) => {


  axiosInstance.delete(`institute/${institute_id}/user/${user_id}/fee/${fee_id}/deletedetailed/`).then((res) => {

    window.location.reload();

  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });



}



//api/institute/user/fees/?institute_id=32


export const getInstituteFeesNPayments = ({ institute_id, formData, getScheduledPayments }) => {


  axiosInstance.get(`institute/user/fees/?institute_id=${institute_id}&start_date=${formData.startDate}&end_date=${formData.endDate}`).then((res) => {

    getScheduledPayments(scheduledPayments => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}




export const getInstituteUserFeesNPayments = ({ institute_id, user_id, formData, getScheduledPayments }) => {


  axiosInstance.get(`institute/user/fees/?institute_id=${institute_id}&user_id=${user_id}&start_date=${formData.startDate}&end_date=${formData.endDate}`).then((res) => {

    getScheduledPayments(scheduledPayments => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}









export const getInstituteOnePayment = ({ fee_id, getScheduledPayment }) => {


  axiosInstance.get(`institute/payment/${fee_id}`).then((res) => {

    getScheduledPayment(scheduledPayment => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}






export const getmycontacts = ({ getMyContacts }) => {


  axiosInstance.get(`mycontacts/`).then((res) => {

    getMyContacts(myContacts => res.data);

  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });


}



export const putFileInACourse = ({ courseId, fileFormData, setEditState, props }) => {
  axiosInstance.put(`course/addfiletocourse/${courseId}/`, fileFormData).then((res) => {
    setEditState("saved");
    // setState(res.data)
    console.log("get user by Id: ", res.data);
    props.onPress();
    props.setRender();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
      if (error.response.status === 404) { console.log("here is the error"); }



    });

}


export const putFileInAInstitute = ({ instituteId, userId, docFormData, setEditState, props }) => {
  axiosInstance.put(`institute/adddocument/${instituteId}/by/${userId}/`, docFormData).then((res) => {
    console.log("get user by Id: ", res.data);
    setEditState("Saved");
    props.onPress();
    props.rerender();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
      if (error.response.status === 404) { console.log("here is the error"); }



    });

}




export const deleteDocumentInstitute = ({ documentId, setEditState, props }) => {
  axiosInstance.delete(`institute/deletedocument/${documentId}/`).then((res) => {
    setEditState("Saved");
    //props.onPress();
    props.rerender();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
      if (error.response.status === 404) { console.log("here is the error"); }



    });

}



export const deleteMemberInstitute = ({ documentId, setEditState, props }) => {
  axiosInstance.delete(`institute/deletedocument/${documentId}/`).then((res) => {
    setEditState("Saved");
    //props.onPress();
    props.rerender();
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
      if (error.response.status === 404) { console.log("here is the error"); }
    });
}






export const addSocialMediaToInstitute = ({ instituteId, addingUserId, formData, setEditState, props }) => {
  axiosInstance.put(`institute/${instituteId}/addtype/by/${addingUserId}/`, {

    "type_name": String(formData.name),
    "type_url": String(formData.url),


  }).then((res) => {
    setEditState("Saved");
    props.onPress();
    console.log("get user by Id: ", res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
      if (error.response.status === 404) { console.log("here is the error"); }



    });

}







export const deleteSocialMediaToInstitute = ({ instituteId, socialMediaIconId, props }) => {

  axiosInstance.delete(`institute/${instituteId}/${socialMediaIconId}/delete/`, {



  }).then((res) => {
    //setEditState("Saved");
    props.rerender();
    console.log("get user by Id: ", res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
      if (error.response.status === 404) { console.log("here is the error"); }



    });

}




export const createAssetInstitute = (formDataToSend, userId, instituteid, props) => {
  return axiosInstance.post(`/institute/${instituteid}/create_asset/by/${userId}/`, {
    "asset_name": formDataToSend.asset_name,
    "quantity": formDataToSend.quantity,
    "status": formDataToSend.status,
  })
    .then((res) => {
      console.log(res.data);
      props.onPress();
      props.rerender();
    });
};



export const getAssets = async (instituteid, props) => {
  try {
    const response = await axiosInstance.get(`/institute/assets/?institute_id=${instituteid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    props.onPress();
    props.rerender();
    if (error.response && error.response.status === 401) {
      Logout();
    }
    throw new Error("Failed to fetch assets data");
  }
};




export const deleteAsset = ({ userId, instituteid, id, props }) => {

  axiosInstance.delete(`/institute/${instituteid}/asset/${id}/user/${userId}/delete/`, {
  })
    .then((res) => {
      // props.onPress();
      props.rerender();

      console.log("deleted---");

    })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }

    });

}

export const updateAsset = ({ userId, instituteid, id, asset_name, quantity, status, props }) => {
  return axiosInstance.put(`/institute/${instituteid}/asset/${id}/user/${userId}/update/`, {
    asset_name,
    quantity,
    status
  })
    .then(response => {
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error("Error updating asset:", error);
      throw new Error("Error updating asset");
    });
};


export const linkCourse = async (selectedCourseIds, userId, instituteId, props) => {
  try {
    if (selectedCourseIds.length === 0) {
      console.error("Please select at least one course.");
      return;
    }
    const response = await axiosInstance.post(`/institute/${instituteId}/linkcourse/by/${userId}/`, {
      course_ids: selectedCourseIds,
    });
    props.rerender();
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout();
    } else {
      console.error("Error linking courses:", error);
    }
    throw error;
  }
};



export const getCourses = async (instituteId, props) => {
  try {
    const response = await axiosInstance.get(`/institute/${instituteId}/courses/`);
    return response.data;
  } catch (error) {
    props.rerender();
    if (error.response && error.response.status === 401) {
      Logout();
    }
    throw new Error("Failed to fetch assets data");
  }
};



export const delinkCourse = (courseId, userId, instituteId) => {
  return axiosInstance
    .post(`/institute/${instituteId}/user/${userId}/course/delink/`, {
      course_ids: [courseId],
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('Course delinked successfully', response.data);
        return response.data;
      }
    })
};




export const createAboutUs = (formDataToSend, userId, instituteid, props) => {

  axiosInstance.post(`/institute/${instituteid}/create_asset/by/${userId}/`, {
    "description": formDataToSend.asset_name,
    "skills": formDataToSend.quantity,
    "user": formDataToSend.status,

  })
    .then((res) => {
      console.log(res.data);
      props.onPress();


    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Logout();
      } else {
        console.error("Error creating Asset", error);
      }
    });
}





export const addAboutUsData = async (userId, formData, props) => {
  try {
    const response = await axiosInstance.post(`/${userId}/about_us/add/`, formData);
    console.log('Success:', response.data);
    props.rerender();
    return response.data;
  } catch (error) {
    console.error('Error:', error.response);
    throw error;
  }
};




export const updateAboutData = async (newData, props) => {
  try {
    const response = await axiosInstance.put(`/editabout/`, newData);
    console.log('Success:', response.data);
    props.rerender();
    return { success: true };
  } catch (error) {
    console.error('Error:', error.response);
    return { success: false, error: error.response };
  }
};


export const fetchAboutUsData = async (userId) => {
  try {
    const response = await fetch(`https://dashoapp.com/api/${userId}/about_us/`);
    if (!response.ok) {
      throw new Error('Failed to fetch about us data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendDataToAPI = async (formData, userId, props) => {
  try {

    const response = await axiosInstance.post(`/${userId}/experience/add/`, formData);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error sending data to API:", error);
    throw error;
  }
};

export const fetchExperienceList = (userId, props) => {
  return axiosInstance.get(`/${userId}/experience/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error('Error fetching experience list:', error);
      throw new Error('Failed to fetch experience list');
    });
};



export const deleteExperience = async (id, userId, props) => {
  try {
    const response = await axiosInstance.delete(`/${userId}/experience/${id}/delete/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }

    props.rerender();

    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};


export const addAcademicDetails = async (formDataToSend, userId, props) => {
  try {
    const response = await axiosInstance.post(`/${userId}/academic_details/add/`, {
      school_name: formDataToSend.school_name,
      degree_name: formDataToSend.degree_name,
      field_of_study: formDataToSend.field_of_study,
      start_date: formDataToSend.start_date,
      end_date: formDataToSend.end_date,
      grade: formDataToSend.grade,
      description: formDataToSend.description,
      activities_and_societies: formDataToSend.activities_and_societies,
      currently_studying: formDataToSend.currently_studying,
      skills: formDataToSend.skills,
    });

    console.log("Academic details added:", response.data);
    props.rerender();

  } catch (error) {
    if (error.response && error.response.status === 401) {
      Logout();
    } else {
      console.error("Error creating academic details:", error);
    }
    throw error;
  }
};
export const fetchAcademicDetails = async (userId, props) => {
  try {
    const response = await axiosInstance.get(`/${userId}/academic_details/`);
    return response.data;
  } catch (error) {
    props.rerender();
    if (error.response && error.response.status === 401) {
      Logout();
    }
    throw new Error("Failed to fetch assets data");
  }
};


export const deleteEducation = async (id, userId, props) => {
  try {
    const response = await axiosInstance.delete(`/${userId}/academic_details/${id}/delete/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }
    props.rerender();

    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};



export const addCertificate = (formDataToSend, userId, props) => {
  return axiosInstance.post(`/${userId}/licenses_certificates/add/`, formDataToSend)
    .then((res) => {
      console.log(res.data);
      props.onClose();
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          alert('Unauthorized access');
        } else {
          console.error("Error adding certificate", error);
          alert('An error occurred while adding the certificate');
        }
      } else {
        console.error("Network error", error);
        alert('A network error occurred');
      }
      throw error;
    });
};



export const fetchCertificateList = (userId, props) => {
  return axiosInstance.get(`/${userId}/certificates/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error('Failed to fetch experience list');
    });
};



export const deleteCertificate = async (id, userId, props) => {
  try {
    const response = await axiosInstance.delete(`/certificates/${id}/by/${userId}/delete/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }
    props.rerender();
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};



export const addPublication = async (publicationData, userId, props) => {
  try {
    const response = await axiosInstance.post(`/${userId}/publications/add/`, publicationData);
    console.log(response.data);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('Unauthorized access');
    } else {
      console.error("Error adding publication", error);
      alert('An error occurred while adding the publication');
    }
    throw error;
  }
};



export const fetchPublicationList = (userId, props) => {
  return axiosInstance.get(`/${userId}/publications/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error('Failed to fetch experience list');
    });
};




export const deletePublication = async (id, userId, props) => {
  try {
    const response = await axiosInstance.delete(`/${userId}/publications/${id}/delete/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }
    props.rerender();
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};



export const editExperience = (experienceId, userId, formData, props) => {
  const url = `/${userId}/experience/${experienceId}/edit/`;
  props.rerender();

  return axiosInstance.put(url, formData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing experience:', error);
      throw error;
    });
};


export const editEducation = (educationId, userId, formData, props) => {
  const url = `/${userId}/academic_details/${educationId}/edit/`;
  props.rerender();

  return axiosInstance.put(url, formData)

    .then(response => response.data)
    .catch(error => {
      console.error('Error editing experience:', error);
      throw error;
    });
};


export const editCertificate = (certificateId, userId, formData, props) => {
  const url = `/${userId}/certificates/${certificateId}/edit/`;

  props.rerender();
  return axiosInstance.put(url, formData)

    .then(response => response.data)
    .catch(error => {
      console.error('Error editing experience:', error);
      throw error;
    });
};



export const editPublication = (id, formData, userId, props) => {
  const url = `/${userId}/publications/${id}/edit/`;

  props.rerender();
  return axiosInstance.put(url, formData)

    .then(response => response.data)
    .catch(error => {
      console.error('Error editing experience:', error);
      throw error;
    });
};



export const getMemberDetails = (userId, instituteId) => {
  return axiosInstance.get(`/institute/member/${userId}/institute/${instituteId}/`)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error fetching the member details!', error);
      throw error;
    });
};

export const getParentDetails = (userId, props) => {
  return axiosInstance.get(`/get-parent-details/${userId}/`)

    .then(response => response.data)

    .catch(error => {
      console.error('there was an error fetching the parent Details! ', error);
      throw error;
    });
};


export const updateParentDetails = (userId, formData, props) => {
  return axiosInstance.put(`/update-parent-details/${userId}/`, formData)
    .then(response => {
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error('API error:', error);
      throw error;
    });
};

export const addBankDetails = (instituteId, userId, bankDetails, props) => {
  return axiosInstance.post(`/institute/${instituteId}/users/${userId}/bank-details/`, bankDetails, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {

      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error('Error adding bank details:', error);
      throw error;
    });
};





export const getBankDetails = (instituteId, userId, props) => {
  // return axiosInstance.get(`/institute/bank-details/?institute_id=${instituteId}`)
  return axiosInstance.get(`/institute/bank-details/?institute_id=${instituteId}&user_id=${userId}`)


    .then(response => response.data)

    .catch(error => {
      console.error('there was an error fetching the parent Details! ', error);
      throw error;
    });
};


export const deleteBankDetails = async (id, userId, instituteId, props) => {

  try {
    const response = await axiosInstance.delete(`/institute/${instituteId}/users/${userId}/delete-bank-details/${id}/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }
    props.rerender();
    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};




export const editBankDetails = (certificateId, userId, formData, instituteId, props) => {
  const url = `/institute/${instituteId}/users/${userId}/bank-details/${certificateId}/`;

  props.rerender();
  return axiosInstance.put(url, formData)

    .then(response => response.data)
    .catch(error => {
      console.error('Error editing experience:', error);
      throw error;
    });
};



export const createPostConnect = async ({ userId, fileFormData }) => {
  try {
    const response = await axiosInstance.post(`connect/create-post/${userId}/`, fileFormData);
    console.log("Post created successfully");
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating post:", error);
    if (error.response && error.response.status === 401) {
      Logout();
    }
    throw error;
  }
};



export const getAllPost = async ({ page, pageSize, getallpost }) => {
  console.log(page, pageSize);
  const page1 = String(page);
  const page2 = String(pageSize);

  axiosInstance.get(`connect/posts?page=${page1}`)
    .then((response) => {
      console.log("response::::::", response);
      getallpost(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const addCommentToPost = async ({ postId, userId, comment }) => {
  axiosInstance.post(`connect/add-comment/${postId}/by/${userId}/`, {
    "content": comment,
  })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const deleteComment = async ({ userId, commentId }) => {
  axiosInstance.delete(`connect/delete-post/${userId}/comment/${commentId}/`)
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const deletePost = async ({ postId, userId }) => {
  try {
    const response = await axiosInstance.delete(`connect/delete-post/${userId}/posts/${postId}/`);
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error:", error);
    if (error.response && error.response.status === 401) {
      Logout();
    }
    throw error;
  }
};
export const likePost = async ({ userId, postId }) => {
  axiosInstance.post(`connect/like-post/${userId}/posts/${postId}/`)
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}


export const updateComment = async ({ postId, userId, commentId, comment }) => {
  axiosInstance.put(`connect/edit-comment/${postId}/comment/${commentId}/by/${userId}/`, {
    "content": comment,
  })
    .then((response) => {
      console.log("success");
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const updatePost = async ({ postId, userId, form }) => {
  try {
    const response = await axiosInstance.put(`connect/edit-post/${postId}/by/${userId}/`, form);
    console.log('Update successful:', response.data);
    return response.data;
  } catch (error) {
    console.log('Update failed:', error);
    if (error.response && error.response.status === 401) {
      Logout();
    }
    throw error;
  }
}




export const addAddress = async (formDataToSend, userId, props) => {
  try {
    const response = await axiosInstance.post(`/${userId}/add_address/`, {
      userId: formDataToSend.userId,
      careof: formDataToSend.careof,
      houseno: formDataToSend.houseno,
      streetno: formDataToSend.streetno,
      placename: formDataToSend.placename,
      postoffice: formDataToSend.postoffice,
      district: formDataToSend.district,
      policestn: formDataToSend.policestn,
      pincode: formDataToSend.pincode,
      city: formDataToSend.city,
      state: formDataToSend.state,
      country: formDataToSend.country,
      address_type: formDataToSend.address_type,
    });

    console.log("Response data:", response.data);
    props.rerender();
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized error, logging out.");
    } else {
      console.error("Error creating address details:", error);
    }
    throw error;
  }
};



export const editAddress = (educationId, userId, formData, props) => {
  const url = `/${userId}/addresses/${educationId}/`;
  props.rerender();

  return axiosInstance.put(url, formData)

    .then(response => response.data)
    .catch(error => {
      console.error('Error editing experience:', error);
      throw error;
    });
};



export const fetchAddressList = (userId, props) => {
  return axiosInstance.get(`/${userId}/addresses/`)
    .then((response) => {
      console.log("hii", response.data);
      // props.rerender();
      return response.data;

    })
    .catch((error) => {
      // console.error('Error fetching experience list:', error);
      throw new Error('Failed to fetch Address list');
    });
};




export const deletAddress = async (id, userId, props) => {
  try {
    const response = await axiosInstance.delete(`/${userId}/addresses/${id}/delete/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }

    props.rerender();

    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};





export const fetchHealthData = (userId, props) => {
  return axiosInstance.get(`/health-data/${userId}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error('Error fetching experience list:', error);
      throw new Error('Failed to fetch experience list');
    });
};



export const editHealthData = (experienceId, userId, formData, props) => {
  const url = `/update-health-data/${userId}/`;
  props.rerender();

  return axiosInstance.put(url, formData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error editing experience:', error);
      throw error;
    });
};


export const deleteHealth = async (userId, props) => {
  try {
    const response = await axiosInstance.delete(`/delete-health-data/${userId}/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }

    props.rerender();

    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};


export const AddDocument = (formDataToSend, userId, instituteId, props) => {
  const formData = new FormData();
  formData.append('name', formDataToSend.name);
  formData.append('docfile', formDataToSend.media);

  axiosInstance.post(`/institute/${instituteId}/users/${userId}/add-document/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      console.log(res.data);
      props.rerender();
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        Logout();
      } else {
        console.error("Error creating academic details", error);
      }
    });
};


export const fetchDocument = (userId, instituteId, props) => {
  return axiosInstance.get(`/institute/documents/?user_id=${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.error('Error fetching experience list:', error);
      throw new Error('Failed to fetch experience list');
    });
};



export const deleteDoc = async (id, userId, props) => {
  try {
    const response = await axiosInstance.delete(`/institute/${id}/delete-documents/`);
    if (!response.status === 200) {
      throw new Error('Failed to delete experience');
    }

    props.rerender();

    return true;
  } catch (error) {
    console.error('Error deleting experience:', error);
    throw error;
  }
};

export const updateDocument = async (docId, userId, instituteId, formData) => {
  const response = await axiosInstance.put(`/institute/${docId}/update-document/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${userId}` // Adjust this line according to your auth method
    }
  });
  return response.data;
};

export const addStudentToCourse = (courseId, userId) => {
  return axiosInstance.post(`/course/${courseId}/add-people/`, {
    people: [userId],
    role: 'student'
  });
};

export const addAdminToCourse = (courseId, userId) => {
  return axiosInstance.post(`/course/${courseId}/add-admins/`, {
    admin_ids: [userId],
    // role: 'student'
  });
};

export const addTeachersToCourse = (courseId, teacherIds, props) => {
  return axiosInstance.post(`/course/${courseId}/add-teachers/`, {
    teacher_ids: teacherIds
  }).then(response => {
    // props.rerender();
    return response.data;
  }).catch(error => {
    console.error("Error adding teachers to course: ", error);
    throw error;
  });
};


export const deleteTeacher = async (courseId, teacherId) => {
  const url = `/course/${courseId}/remove-teachers/`;
  try {
    const response = await axiosInstance.post(url, {
      teacher_ids: [teacherId]
    });
    console.log('Teacher deleted successfully');
    return response.data;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

export const deleteAdmin = (courseId, teacherId) => {
  return axiosInstance.post(`/course/${courseId}/remove-admins/`, {
    admin_ids: [teacherId]
  }).then(response => {
    console.log('Teacher deleted successfully');
    return response.data;
  }).catch(error => {
    console.error('Error deleting teacher:', error);
    throw error;
  });
};



export const removeStudentFromCourse = (courseId, studentId, props) => {
  return axiosInstance.post(`/course/${courseId}/remove-people/`, { people: [studentId] })
    .then(response => {
      props.rerender();  // Call the rerender method
      return response.data;
    })
    .catch(error => {
      console.error('Error removing student from course:', error);
      throw error;
    });
};



export const filterEnrolledStudents = (courseId) => {
  return axiosInstance.get(`/course/${courseId}/members/?is_member=true&role=student`)
    .then(response => response.data.results.course.enrolled_students)
    .catch(error => {
      console.error('Error fetching enrolled students:', error);
      throw error; // Re-throw the error so it can be handled by the caller
    });
};


export const fetchEnrolledStudents = (courseId) => {
  return axiosInstance.get(`/course/${courseId}/members/?role=student`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching enrolled students:', error);
      throw error;
    });
};


export const fetchRequestedStudents = (courseId) => {
  return axiosInstance.get(`/course/${courseId}/enrolment-requests/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching enrolled students:', error);
      throw error;
    });
};


export const getCourseAdmins = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}/admins/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course admins:', error);
    throw error;
  }
};


export const getUserLeaveList = ({ instituteId, userId, setLeaves }) => {
  axiosInstance.get(`institute/${instituteId}/user_leaves/${userId}/?requester_user_id=${userId}`)
    .then((res) => {
      setLeaves(res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const getLeavePolicyList = ({ instituteId, setLeavePolicyList }) => {
  axiosInstance.get(`institute/${instituteId}/leave_policy/`)
    .then((res) => {
      setLeavePolicyList(res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const getListOfApprovalsForLeave = ({ instituteId, userId, setApprovers }) => {
  axiosInstance.get(`institute/${instituteId}/approvers/${userId}/`)
    .then((res) => {
      //setPublishStatus('unpublished');
      setApprovers(res.data);
      console.log(res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const createLeaveInstitute = async ({ instituteId, userId, formData, setEditState, props }) => {
  axiosInstance.post(`institute/${instituteId}/create_leave/by/${userId}/`, {
    "start_date": formData.start_date,
    "end_date": formData.end_date,
    "reason": formData.reason,
    "leave_type": formData.leave_type,
    "leave_type_category_id": formData.leave_type_category_id,
    "is_paid": formData.is_paid,
    "approver_id": formData.approver_id
  })
    .then((response) => {
      setEditState("Saved");
      props.onPress();
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      alert(error.response.data.detail || "An error occurred while submitting the leave request.");
      setEditState("notSaving");
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}


export const deleteLeave = ({ instituteId, leaveId, userId }) => {

  axiosInstance.delete(`institute/${instituteId}/delete_leave/${leaveId}/by/${userId}/`)
    .then((res) => {
      console.log("success");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const updateLeaveInstitute = ({ instituteId, userId, leaveId, formData, setEditState }) => {
  axiosInstance.put(`institute/${instituteId}/${userId}/update_leave/${leaveId}/`, {
    "start_date": formData.start_date,
    "end_date": formData.end_date,
    "reason": formData.reason,
    "leave_type": formData.leave_type,
    "leave_type_category_id": formData.leave_type_category_id,
    "is_paid": formData.is_paid,
    "approver_id": formData.approver_id
  })
    .then((res) => {
      //setPublishStatus('unpublished');
      setEditState("notSaving");
      console.log("success");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const createLeavePolicy = async ({ instituteId, userId, formData, setEditState }) => {
  axiosInstance.post(`institute/${instituteId}/user/${userId}/leave_policy/`, {
    "leave_types": [
      {
        "name": formData.name,
        "total_leaves": formData.total_leaves
      }
    ]
  })
    .then((response) => {
      setEditState("notSaving");
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const updateLeavePolicy = async ({ instituteId, userId, leavePolicyId, formData, setEditState }) => {
  axiosInstance.put(`institute/${instituteId}/users/${userId}/leave-types/${leavePolicyId}/update-policy/`, formData)
    .then((response) => {
      setEditState("notSaving");
      console.log(response.data, formData);
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const deleteLeavePolicy = async ({ instituteId, userId, policyId }) => {
  axiosInstance.delete(`institute/${instituteId}/user/${userId}/leave_policy/${policyId}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const getApprovalsLeaveList = ({ instituteId, userId, status, setApproverList }) => {
  axiosInstance.get(`institute/${instituteId}/leave_approvals/${userId}/?status=${status}`)
    .then((res) => {
      setApproverList(res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const postLeaveStatus = async ({ instituteId, leaveId, userId, status }) => {
  axiosInstance.post(`institute/${instituteId}/leaves/${leaveId}/update_status/${userId}/`, {
    "status": status
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        Logout();
      }
      throw error;
    });

}

export const changeLeaveStatusByApprover = ({ instituteId, userId, approverId }) => {
  console.log(instituteId, userId, approverId);
  axiosInstance.post(`institute/${instituteId}/leaves/${userId}/update_status/${approverId}/`, {
    "status": "approved",
  })
    .then((res) => {
      console.log("success");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const deleteLinkById = (linkId, setIsDeleted, isDeleted) => {
  return axiosInstance.delete(`/course/deletelinktocourse/${linkId}/`)
    .then(response => {
      setIsDeleted(!isDeleted);
      return response.data;
    })
    .catch(error => {
      console.error('There was an error deleting the link!', error);
      throw error;
    });
};

export const deleteFileById = (fileId, setIsDeleted, isDeleted) => {
  return axiosInstance.delete(`/course/deletefiletocourse/${fileId}/`)
    .then(response => {
      setIsDeleted(!isDeleted);
      return response.data;
    })
    .catch(error => {
      console.error('There was an error deleting the link!', error);
      throw error;
    });
};

export const deleteVideoById = (videoId, rerenderCallback) => {
  return axiosInstance.delete(`/course/deleteyoutubevideo/${videoId}/`)
    .then(response => {
      rerenderCallback();
      return response.data;
    })
    .catch(error => {
      console.error('There was an error deleting the link!', error);
      throw error;
    });
};



export const updateEmail = (userId, email, props) => {
  return axiosInstance.put(`/update-contact/${userId}/`, { email })
    .then(response => {
      props.rerender();
      return response.data;
    })
    .catch(error => {

      console.error("Error updating email:", error);
      throw error;
    });
};


export const updatePhone = (userId, phoneno, props) => {
  return axiosInstance.put(`/update-contact/${userId}/`, { phoneno })
    .then(response => {
      props.rerender();
      console.log(response);
      return response.data;
    })
    .catch(error => {

      console.error("Error updating email:", error);
      throw error;
    });
};




export const updateCourseDetails = (courseId, courseData, onClose, rerender) => {
  return axiosInstance.put(`/course/editonedashboardcourse/${courseId}/`,
    {
      "id": courseId,
      "courseShortName": courseData.courseShortName,
      "courseLocalCode": courseData.courseLocalCode,
      "courseStartDate": courseData.courseStartDate,
      "courseEndDate": courseData.courseEndDate,
      "courseStatus": courseData.courseStatus,
      "abouttheCourse": courseData.abouttheCourse,
      "designedFor": courseData.classname,
      "educationboard": courseData.educationboard,
      "subject": courseData.subject,
      "coursecredit": courseData.coursecredit


    }
  )
    .then(response => {
      console.log('Course updated successfully:', response.data);
      rerender();
      return response.data;
    })
    .catch(error => {
      console.error('Error updating course:', error);
      throw error;
    });
};



export const createAssignmentform = ({ formData, userId, setFormData, props }) => {
  const data = new FormData();
  data.append('course_ids', props.Course.id);
  ['title', 'status', 'description', 'publishDate', 'dueDate', 'credit'].forEach(key => data.append(key, formData[key]));

  formData.questionFiles.forEach((file, index) => {
    data.append('questionFiles', file);
  });

  data.append('questionFilesMeta', JSON.stringify(formData.questionFilesMeta));

  axiosInstance.post(`/assignment/create-assignments/create/${userId}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then((res) => {
      console.log(res);
      setFormData("notSaving");
      props.onPress();
    })
    .catch(() => setFormData("notSaving"));
};



export const fetchAssignments = (courseID, pageNo) => {
  return axiosInstance.get(`/assignment/filter/?page=${pageNo}&course_id=${courseID}`)
    .then(response => ({
      results: response.data.results,
      count: response.data.count,
    }))
    .catch(error => {
      console.error("Error fetching assignments:", error);
      throw error;
    });
};

export const addGrade = (assignmentId, userId, gradeData, props) => {
  const url = `/grade/${assignmentId}/assignment/${userId}/user/add-grade`;
  return axiosInstance.post(url, gradeData)
    .then(response => {
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error('Error adding grade:', error);
      throw error;
    });
};



export const fetchAssignmentDetails = (assignmentId) => {
  return axiosInstance.get(`/assignment/assignment-details/${assignmentId}/?page=1&page_size=10`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching assignment details:', error);
      throw error;
    });
};


export const fetchStudentSubmissions = (assignmentId, courseId, userId, page) => {
  const url = `/assignment/creator/assignments/?assignment_id=${assignmentId}&course_id=${courseId}&user_id=${userId}&page=${page}`;

  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching student submissions:', error);
      throw error;
    });
};



export const updateAssignment = (id, userId, formData, props, setFormData) => {
  const url = `/assignment/update/${id}/user/${userId}/`;
  return axiosInstance
    .put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Response data:", response.data);
      setFormData("notSaving");
      props.onClose();
      return response.data;
    })
    .catch((error) => {
      console.error("Error in API call:", error);
      throw error;
    });
};

export const deleteAssignment = async (id, props) => {
  const url = `/assignment/assignments-delete/${id}/`;
  try {
    const response = await axiosInstance.delete(url);
    props.rerender();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewAssingment = ({ courseID, userId, setData }) => {
  axiosInstance
    .get(`/assignment/creator/assignments/?course_id=${courseID}&user_id=${userId}`)
    .then((res) => {
      setData((data) => res.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
};


export const getAllAssignment = ({ courseID, setDataNew }) => {
  axiosInstance
    .get(`/assignment/filter/?course_id=${courseID}`)
    .then((res) => {

      setDataNew((data) => res.data.results);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
};

export const submitAssignment = (assignmentId, userId, formData, props) => {
  return axiosInstance.post(`/assignment/${assignmentId}/submit/${userId}`, formData)
    .then(response => {
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error('Error submitting the assignment:', error);
      throw error;
    });
};


export const deleteAssignmentFile = (fileId, props) => {
  const url = `/assignment/attachments/${fileId}/`;
  return axiosInstance.delete(url)
    .then(response => {
      props.rerender(); // Call rerender from props to refresh the UI
      return response.data;
    })
    .catch(error => {
      console.error("Error deleting assignment file:", error);
      throw error; // Re-throw the error for handling in the component
    });
};


export const updateAssignmentForm = (assignmentId, userId, formData, props) => {
  return axiosInstance.put(`/assignment/update/${assignmentId}/user/${userId}/`, formData)
    .then(response => {
      props.rerender();
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Error updating assignment:", error);
      throw error;
    });
};

// export const getCombinedAttendanceLeave = async ({ instituteId, userId, setAttendanceLeave }) => {
//   axiosInstance.get(`institute/${instituteId}/combined_attendance_leave/?user_id=${userId}`)
//   .then((response) => {
//     setAttendanceLeave(response.data);
//   })
//   .catch((error) => {
//     console.log("error", error);
//     if (error.response && error.response.status === 401) {
//       Logout();
//     }
//     throw error;
//   });

// }

export const getCombinedAttendanceLeave = async ({ instituteId, userId, page, setAttendanceLeave }) => {
  try {
    const response = await axiosInstance.get(`institute/${instituteId}/filterattendance/?page=${page}&user_id=${userId}`);
    setAttendanceLeave(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching combined attendance leave:", error);
    if (error.response && error.response.status === 401) {
      Logout();
    }
  }
};

export const fetchInstituteMembers = (instituteId, userType) => {
  return axiosInstance
    .get(`/institute/${instituteId}/members/?page=1&page_size=10&user_type=${userType}`)
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching members:', error);
      throw error;
    });
};

export const fetchAttendanceFilter = (instituteId, startDate, endDate, page, memberId = null) => {
  let url = `/institute/${instituteId}/filterattendance/?start_date=${startDate}&end_date=${endDate}&page=${page}&page_size=10`;
  if (memberId) {
    url += `&user_id=${memberId}`;
  }
  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching attendance data:', error);
      throw error;
    });
};

export const fetchAttendanceFilter2 = (instituteId, userId, startDate, endDate, page) => {
  return axiosInstance
    .get(`/institute/${instituteId}/filterattendance/`, {
      params: {
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
        page: page,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching attendance:', error);
      throw error;
    });
};



export const updateAttendance = ({ instituteId, userId, attendanceId, formData, props }) => {
  console.log(formData);
  axiosInstance.put(`institute/attendance/update/${instituteId}/${userId}/${attendanceId}/`, formData).then((res) => {
    props.reRender();
    props.onPress();
    console.log(res.data);
  }).catch((error) => {
    if (error.response.status === 401) {
      Logout();
    }
  })
}

export const updateInOutAttendance = ({ instituteId, userId, attendanceId, formData, props }) => {
  console.log(formData);
  axiosInstance.put(`institute/attendance/update/${instituteId}/${userId}/${attendanceId}/`, formData).then((res) => {
    props.render();
  }).catch((error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - logging out');
    }
  })
}





export const getApproverOfAttendance = async ({ instituteId, userId, status, getAllApproverOfAttendance }) => {
  if (status === "pad") {
    axiosInstance.get(`institute/${instituteId}/approver/${userId}/attendance/`)
      .then((response) => {
        getAllApproverOfAttendance(response.data);
        console.log("success");
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response && error.response.status === 401) {
          Logout();
        }
        throw error;
      });
  } else {
    axiosInstance.get(`institute/${instituteId}/approver/${userId}/attendance/?approver_status=${status}`)
      .then((response) => {
        getAllApproverOfAttendance(response.data);
        console.log("success");
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response && error.response.status === 401) {
          Logout();
        }
        throw error;
      });
  }

}





export const createBatchNotice = ({ formData, props, setSubmissionStatus }) => {
  axiosInstance
    .post(`/noticeboard/create-notice/${props.userData.id}/users/`, {
      noticeTitle: formData.noticeTitle,
      noticeText: formData.noticeText,
      batch_ids: formData.batch_ids,
      institute_ids: [props.selectedInstitute.id],
      user_id: props.userData.id,
    })
    .then((res) => {
      props.onPress();

      setSubmissionStatus("Created");
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - logging out");
      }
      setSubmissionStatus("Create");
    });
};

export const getNotices = (instituteId) => {
  return axiosInstance.get(`/noticeboard/list-notices/?institute_id=${instituteId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching notices:', error);
      throw error;
    });
};

export const editNotice = (selectedNoticeId, userId, updatedNotice) => {
  return axiosInstance.put(`/noticeboard/edit-notice/${selectedNoticeId}/${userId}/`, updatedNotice)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating notice:', error);
      throw error;
    });
};



export const editBatch = (batchId, userId, batchData, setSubmitState, props) => {
  return axiosInstance.put(`/institute/edit-batch/${batchId}/${userId}/`, batchData)
    .then(response => {
      // props.onClick();
      setSubmitState("submitted");
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error("There was an error editing the batch!", error);
      throw error;
    });
};

export const fetchBatchMembers = (batchId, page) => {
  return axiosInstance.get(`/institute/batches/${batchId}/members/?page=${page}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching batch members:', error);
      return [];
    });
};


export const getMemberDetailsforBatch = (memberId, instituteId) => {
  return axiosInstance
    .get(`/institute/member/${memberId}/institute/${instituteId}/`)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error fetching the member details!', error);
      throw error;
    });
};


export const createNewCourse = async (courseData, props) => {
  try {
    const response = await axiosInstance.post('/course/createnewcourse/', courseData);
    props.fetchDetails();
    return response.data;
  } catch (error) {
    console.error("Error creating new course:", error);
    throw error;
  }
};


export const getAdminCourse = ({ getadminCourse }) => {

  axiosInstance.get(`/course/admincourses/`).then((res) => {
    getadminCourse(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}


export const linkCoursesToBatch = (batchId, userId, courseIds, props) => {
  const url = `/institute/link-courses-to-batch/${batchId}/${userId}/`;
  const requestBody = {
    courses: courseIds,
  };

  return axiosInstance.patch(url, requestBody)
    .then(response => {
      props.fetchDetails();;
      return response.data;
    })
    .catch(error => {
      alert(error.response.data.detail);
      console.log("error",);
      throw error;
    });
};


export const delinkCourseFromBatch = (batchId, userId, courseId, props, handleClose) => {
  const url = `/institute/delink-courses-from-batch/${batchId}/${userId}/`;
  const requestBody = {
    courses: [courseId],
  };
  return axiosInstance.patch(url, requestBody)
    .then(response => {
      props.fetchDetails();
      handleClose();
      return response.data;
    })
};



export const getbatchNotice = ({ batchId, getBatchNotice }) => {

  axiosInstance.get(`/noticeboard/list-notices/?batch_id=${batchId}`).then((res) => {
    getBatchNotice(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}


export const deleteNotice = ({ noticeId, userId, props, setDeletingState, handleDeleteCancel }) => {
  axiosInstance.delete(`/noticeboard/delete-notice/${noticeId}/${userId}/`, {
  })
    .then(response => {

      props.rerender();
      setDeletingState('Deleted');
      handleDeleteCancel();

      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}


export const fetchBatchDetails = (batchId) => {
  return axiosInstance.get(`/institute/list-batches/?id=${batchId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('There was an error fetching the batch details!', error);
      throw error;
    });
};


export const getClassCourseAttendance = ({ classroomId, page, courseId, page_size, getClassAttendance }) => {
  axiosInstance.get(`institute/classcourseattendances/?classroom_id=${classroomId}&course_id=${courseId}&page=${page}&page_size=${page_size}`)
    .then(response => {
      getClassAttendance(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the batch details!', error);
      throw error;
    });
};


export const addGradetoBatches = (userId, batchId, gradeData, props) => {
  const endpoint = `/institute/batches/${userId}/add-grade/${userId}/?batches=${batchId}&courses=${gradeData.course}&students=${gradeData.student}`;

  return axiosInstance.post(endpoint, gradeData)
    .then(response => {
      props.onBack();
      return response.data;
    })
    .catch(error => {
      console.error('There was an error adding the grade!', error);
      throw error;
    });
};




export const updateClassCourseAttendance = ({ userId, formData, props }) => {
  console.log(formData);
  axiosInstance.put(`institute/classcourseattendances/${userId}/attendances/update/`, formData)
    .then(response => {
      console.log("Success");
    })
    .catch(error => {
      console.error('There was an error fetching the batch details!', error);
      throw error;
    });
};




export const getinstitutebatches2 = ({ instituteId, getInstituteBatches2 }) => {

  axiosInstance.get(`/institute/batches/${instituteId}/`).then((res) => {
    getInstituteBatches2(data => res.data);
  })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();

      }
    });
}
export const getinstitutebatchestimetable3 = ({ batchId, getinstitutebatchesTimeTable }) => {
  axiosInstance.get(`/institute/batchtimetables/?batch_id=${batchId}`).then((res) => {
    getinstitutebatchesTimeTable(data => res.data);
  })

    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}

export const DeleteBatchesTimeTable = ({ batchId, props, userId }) => {
  axiosInstance.delete(`/institute/batchtimetables/delete/${batchId}/${userId}/`, {
  })
    .then(response => {
      props.rerender();
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        Logout();
      }
    });
}


export const createBatchTimetable = async (formData, props, useId) => {
  try {
    const response = await axiosInstance.post(`/institute/batchtimetables/create/${useId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    props.onPress();
    props.rerender();
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating batch timetable:', error);
    throw error;
  }
};



export const updateBatchTimetable = async (batchId, formData, props, userId) => {
  try {
    const response = await axiosInstance.put(`/institute/batchtimetables/update/${batchId}/${userId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    props.setIsUpdate(!props.isUpdate);
    props.onPress();
    props.rerender();
    return response.data;
  } catch (error) {
    console.error('Error updating batch timetable:', error);
    throw error;
  }
};

export const removeBatchMember = (batchId, memberId, oneMemberId, props, handleClose, setDelinkState) => {
  return axiosInstance
    .post(`/institute/batches/${batchId}/remove-members/${memberId}/`, {
      members: [oneMemberId],
    })
    .then(response => {
      setDelinkState("Removed");
      props.rerender();
      handleClose();
      return response.data;
    })
    .catch(error => {
      console.error('Error removing batch member:', error);
      throw error;
    });
};

export const addMembersToBatch = (batchId, userID, userIds, props) => {
  return axiosInstance.post(`/institute/batches/${batchId}/add-members/${userID}/`, {
    members: userIds
  })
    .then(response => {
      console.log(response);
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error('Error adding members to batch:', error);
      throw error;
    });
};


export const fetchBatchAttendance = (batchId, date, page) => {
  const formattedDate = date.toISOString().split('T')[0];
  const url = `/institute/batches/?page=${page}&start_date=${formattedDate}&end_date=${formattedDate}&batch_id=${batchId}`;

  return axiosInstance.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};



export const markAttendance = (userId, batchId, studentId, attendanceData, rerender) => {
  const url = `/institute/batches/${userId}/batch/${batchId}/attendance/${studentId}/`;
  return axiosInstance.put(url, attendanceData)
    .then(response => {
      console.log(response);
      rerender();
      return response.data;
    })
    .catch(error => {
      console.error('There was an error marking the attendance!', error);
      throw error;
    });
};
export const fetchBatchStudentsAttendance = async ({ batchId, memberId, setStudentsAtt }) => {
  try {
    const resonse = await axiosInstance.get(`/institute/batches/?batch_id=${batchId}&member_id=${memberId}`)
    setStudentsAtt(resonse.data.results)
  } catch (error) {
    console.error("Error fetching combined attendance leave:", error);
    if (error.response && error.response.status === 401) {
      Logout();
    }
  }



}


export const fetchAttendance = (memberId, batchId) => {
  return axiosInstance
    .get(`/institute/batches/?member_id=${memberId}&batch_id=${batchId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching attendance:', error);
      throw error;
    });
};

export const fetchStudentGrades = (batchId, studentId, courseId) => {
  const url = `/institute/batches/${batchId}/grades/?user_id=${studentId}&course_id=${courseId}`;
  return axiosInstance.get(url)
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching grades:', error);
      throw error;
    });
};

export const fetchEnrolledStudentsform = (courseId) => {
  const endpoint = `/course/${courseId}/members/?role=student`;
  return axiosInstance.get(endpoint)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching enrolled students:', error);
      throw error;
    });
};

export const fetchEnrolledStudentsBatch = (batchId) => {
  return axiosInstance
    .get(`/institute/batches/${batchId}/course-enrolled-students/?page=1&page_size=10`)
    .then(response => {
      const data = response.data;
      const students = data.results.flatMap(course => course.enrolled_students);
      const uniqueStudents = Array.from(new Map(students.map(student => [student.id, student])).values());
      return uniqueStudents;
    })
    .catch(error => {
      console.error("Error fetching enrolled students:", error);
      throw error;
    });
};


export const fetchCourseExamEnrolledStudents = async (batchId, examId) => {
  try {
    const response = await axiosInstance.get(`/institute/batches/53/course-exam-enrolled-students/?exam_id=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course exam enrolled students:', error);
    throw error;
  }
};

export const uploadMembersViaExcel = ({ file, selectedInstituteId, userId, props }) => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance.post(`/institute/${selectedInstituteId}/users/${userId}/upload-students/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      props.onPress();
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        alert('An error occurred: ' + error.response.data);
        console.error("Server Error:", error.response.data);
        throw new Error(error.response.data.message || "Server Error");
      }
    });
};


export const uploadBatchMembers = (batchId, userId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post(`/institute/batches/${batchId}/users/${userId}/upload-batch-members/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => {
    return response.data;
  }).catch(error => {
    console.error('Error uploading file:', error);
    throw error;
  });
};












export const fetchExams = (instituteId, batchId) => {
  return axiosInstance.get(`/exam/institute-course-class-exam/?institute_id=${instituteId}&batch_id=${batchId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching exams:', error);
      throw error;
    });
};

export const fetchSubExams = (examId, batchId) => {
  return axiosInstance.get(`/exam/exam-details/?exam_id=${examId}&batch_id=${batchId}`)
    .then(response => response.data.sub_exams)
    .catch(error => {
      console.error('Error fetching sub-exams:', error);
      throw error;
    });
};



export const fetchStudentsData = (batchId, examId, page = 1) => {
  return axiosInstance
    .get(`/institute/batches/${batchId}/exam-subexam-grades/`, {
      params: {
        exam_id: examId,
        page: page,
        // limit: limit,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching students data:', error);
      throw error;
    });
};

export const submitGrades = (userId, grades, props) => {
  return axiosInstance
    .post(`/institute/batches/add-grade/${userId}/`, {
      grades: grades,
    })
    .then(response => {
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error('Error submitting grades:', error);
      throw error;
    });
};


export const createExam = (userId, payload, props) => {
  return axiosInstance.post(`/exam/create-exam-sub-exam/${userId}/`, payload)
    .then(response => {
      console.log("Exam created successfully:", response.data);
      props.rerender();
      return response.data;
    })
    .catch(error => {
      console.error("Error creating exam:", error.response ? error.response.data : error.message);
      throw error;
    });
};

export const fetchExamDetails = (instituteId, batchId, currentPage) => {
  return axiosInstance
    .get(`/exam/institute-course-class-exam/?institute_id=${instituteId}&batch_id=${batchId}&page=${currentPage}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching exam details:', error);
      throw error;
    });
};

export const deleteExam = (examId) => {
  return axiosInstance
    .delete(`/exam/delete-exam/${examId}/`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting exam:', error);
      throw error;
    });
};


export const fetchStudentGrades2 = (studentId, batchId) => {
  return axiosInstance.get(`/institute/batches/${batchId}/exam-subexam-grades/?student_id=${studentId}&page=1&limit=10`)
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching student grades:', error);
      throw error;
    });
};


export const fetchData = (studentId, batchId) => {
  return axiosInstance.get(`/institute/batches/${batchId}/exam-subexam-grades/?student_id=${studentId}&page=1&limit=10`)
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching data:', error);
      return null;
    });
};

export const updateExam = (examId, data) => {
  return axiosInstance
    .put(`/exam/update-exam-sub-exam/${examId}/`, data)
    .then(response => {

      return response.data;
    })
    .catch(error => {
      console.error("Error updating exam:", error);
      throw error;
    });
};
