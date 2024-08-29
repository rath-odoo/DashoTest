import React, { useState, useEffect, memo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classes from './CourseDetails.module.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { putcourseenrollrequest } from '../../../../../CommonApps/AllAPICalls';

import {
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { storage } from '../../../../../CommonApps/Reshwanth/firebase';
import CreateCourseForm from './CreateCourseForm';
// import CreateCourseForm from '../../../../Dashboard/General/components/Student/Forms/CreateCourseForm';


const CourseDetailsComponent = (props) => {
  // You can fetch course details using the course code, or display static information
  const location = useLocation();

  const userData = location.state;
  console.log(userData);
  console.log(userData.state.courseGlobalCode.courseShortName);

   console.log('this is my props ', props);
  
  




 

  
  const [enrollStatus, setEnrollStatus] = useState("notSent");
    // Enrollment request sent
    const enrollHandler = (e) => {
      e.preventDefault();
      let courseId = userData.state.courseGlobalCode.id;
      let userId = userData.state.courseGlobalCode.id;
      setEnrollStatus("sending");
      putcourseenrollrequest({ courseId, setEnrollStatus });
      {
          const createNotificationInFirebase = async ({ teacherUserId, courseId, setEnrollStatus }) => {
    try {
      await updateDoc(doc(storage, "dashoo", teacherUserId), {
        requestedList: arrayUnion({
          requestTime: new Date().toISOString(),
          courseId: courseId,

        }),
      });
      console.log("request sent");
    }
    catch (err) {
      console.log("request not sent",err);
    }

  }
  userData.state.courseGlobalCode.teachers !== null && userData.state.courseGlobalCode.teachers.map((teacher, index) => {
          const teacherUserId = teacher.username;
          createNotificationInFirebase({ teacherUserId, courseId, setEnrollStatus });
        }
        )
      }
  
  
    }
    const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <div className={classes.title}>Enroll in a Course</div>

      <div> 
      {/* <img src={userData.state.courseGlobalCode.card_cover_image} alt="Course Cover" /> */}
      </div>
      <div>
        {/* <p>Course Name: {userData.state.courseGlobalCode.courseShortName}</p> */}
        {/* <p>Course Code: {userData.state.courseGlobalCode.courseGlobalCode}</p> */}
      </div>
      <div className={classes.mainDiv}>
      <div className={classes.innerBox} >







<button className={classes.pic1} type="button" >
  <img src={userData.state.courseGlobalCode.card_cover_image} className={classes.img} alt="Course" />
</button>


<div className={classes.child}>
  <div className={classes.text}>
    <div className={classes.Menu}>
      <div className={classes.Submenu}>
        <button className={classes.courseTitle} type="button" >
          {userData.state.courseGlobalCode.courseLocalCode !== "N/A" && userData.state.courseGlobalCode.courseLocalCode !== "" ? userData.state.courseGlobalCode.courseLocalCode + ": " : ""}
          {userData.state.courseGlobalCode.courseShortName}
        </button>
        <div className={classes.arrow}>
          <button className={classes.btnarrow} type="button" >
            <MdKeyboardDoubleArrowRight size={20} className={classes.rightArrowCourseTitle} />
          </button>
        </div>
      </div>

      <div className={classes.edit} >
        {/*
            <BsThreeDotsVertical size={25} color="grey" onClick={showActionToolsHandler} className={classes.verticalDotsIcon}  />
    */}
      </div>
    </div>

    <button className={classes.instructor}>
      {userData.state.courseGlobalCode.teachers !== null && userData.state.courseGlobalCode.teachers.map((teacher, index) => { }
      )}

      


    </button>

    <div className={classes.info} >
      <div className={classes.class}>{userData.state.courseGlobalCode.designedFor}</div>

      { /*props.Course.association === "N/A" && !props.Course.enrolled && props.Course.enrollementRequestSent &&
           <div className={classes.teachingBox} style={styleGen}> pending </div>
      */}

      {/* props.Course.association === "N/A" && !props.Course.enrolled && !props.Course.enrollementRequestSent &&
           <div className={classes.teachingBox} style={styleGen}> Enroll </div>
      */}





      {/* props.Course.association !=="N/A" && 

          <div className={classes.teachingBox} style={styleGen}> { props.Course.association ==="Studying"? "Learning" : props.Course.association} </div>

      */}
      {userData.state.courseGlobalCode.association === "Teaching" &&
        <button className={classes.teachingBoxEnroll}
          type="button" disabled={true}
          style={{ backgroundColor: "white", color: "var(--themeColor)", borderStyle: "solid", borderWidth: "1px", borderColor: "var(--themeColor)" }}>
          {userData.state.courseGlobalCode.association}
        </button>
      }




      {userData.state.courseGlobalCode.association === "Learning" &&
        <button className={classes.teachingBoxEnroll}
          type="button"
          disabled={true}
          style={{ backgroundColor: "white", color: "black", borderStyle: "solid", borderWidth: "1px", borderColor: "black" }}
        >
          {userData.state.courseGlobalCode.association}
        </button>
      }

      {userData.state.courseGlobalCode.association === "Enroll" && enrollStatus === "notSent" &&
        <button className={classes.teachingBoxEnroll} type="button" disabled={false} onClick={enrollHandler}> {userData.state.courseGlobalCode.association}</button>
      }

      {userData.state.courseGlobalCode.association === "EnrollRequestSent" &&
        <button className={classes.teachingBoxEnroll}
          type="button"
          disabled={true}
          style={{ width: "150px", backgroundColor: "white", color: "red", borderColor: "red", borderStyle: "solid" }}
          onClick={enrollHandler}
        > Request Sent</button>
      }




      {userData.state.courseGlobalCode.association === "Enroll" && !userData.state.courseGlobalCode.enrolled && enrollStatus === "sending" &&

        <button className={classes.teachingBoxEnroll}
          type="button" disabled={true}
          onClick={enrollHandler}
          style={{ width: "150px" }}
        >
          sending request ...
        </button>
      }


      {userData.state.courseGlobalCode.association === "Enroll" && !userData.state.courseGlobalCode.enrolled && enrollStatus === "sent" &&

        <button className={classes.teachingBoxEnroll} type="button" disabled={true} onClick={enrollHandler}> Request sent!</button>
      }




    </div>
  </div>
</div>
<div className={classes.para}>
  <div className={classes.code}>{100000 + Number(userData.state.courseGlobalCode.id)}</div>
  <div className={classes.viewDetails}><button className={classes.btnViewDetails} onClick={() => setShowDetails(true)}>View Details</button>
  {showDetails && (
          <div className={classes.detailsBlock}>
              <CreateCourseForm  courseGlobalCode={userData.state.courseGlobalCode} />
          </div>
        )}
  </div>
  <div className={classes.mediaContainer}>
    {/*
    <button className={classes.videoButton}>
      <BsCameraVideo size={20} color="grey" />
    </button>

    <button className={classes.img2}>
      <AiOutlineUserAdd size={23} color="grey" />
    </button>
*/}
  </div>
</div>



</div>
    
      </div>
    </div>
  );
};

export default CourseDetailsComponent;
