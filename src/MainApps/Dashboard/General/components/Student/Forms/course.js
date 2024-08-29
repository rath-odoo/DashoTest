import React, { useEffect, useRef, useState } from 'react';
import classes from './course.module.css';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import share from './share.png';
import live from './WhatsApp Image 2024-08-17 at 4.11.55 PM.jpeg';
import download from './arrow.png';
import courseimage from './coursePic.jpg';
import teacherIcon from './info.png'; 
import courseInfoIcon from './education.png';
import durationIcon from './time.jpeg';
import descriptionIcon from './task.png';
import learnIcon from './reading-book.png';
import { getcoursesbyCourseId, putcourseenrollrequest } from '../../../../../../CommonApps/AllAPICalls';
import { BsArrowLeft } from 'react-icons/bs';
import Logo from '../../../../../../CommonApps/Logo';

const LeaveCard = (props) => {
  console.log("props", props);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true); 


  const [enrollStatus, setEnrollStatus] = useState("notSent");

  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  const location = useLocation();
  const userData = location.state.userData;
  console.log("userData", userData);

  const initialLoad = useRef(true);

  useEffect(() => {
    let courseId = userData.Course.id;

    if (initialLoad.current) {
      setLoading(true);

      getcoursesbyCourseId({
        courseId,
        getCourseData: (courseData) => {
          setSelectedCourse(courseData);
          setLoading(false);
          initialLoad.current = false;
        }
      });
    }

    return () => {
      setSelectedCourse(null);
    };
  }, [userData]);

  if (loading || !selectedCourse) {
    return <div>Loading...</div>;  
  }

  
  const enrollHandler = (e) => {
    e.preventDefault();
    let courseId = selectedCourse[0].id;
    // let userId = props.userData.id;
    setEnrollStatus("sending");
    putcourseenrollrequest({ courseId, setEnrollStatus });
   
  }

 



  const viewPublicProfileHandler = (teacher) => {
    history.push({
      pathname: `/public/profile/${teacher.id}`,
      state: { userData: teacher }
    });
  };

  const teachers = selectedCourse[0].teachers;

  const instructorNames = (teachers && teachers.length > 0)
    ? teachers.map(teacher => (
        <span
          key={teacher.id}
          onClick={() => viewPublicProfileHandler(teacher)}
          className={classes.teacherNameLink}
        >
          {teacher.firstname} {teacher.lastname}
        </span>
      )).reduce((prev, curr) => [prev, ', ', curr]) 
    : 'N/A';

  const totalEnrolledStudents = selectedCourse[0].enrolled_students.length;

  console.log("selected course ", selectedCourse);

  return (
    <div className={classes.divOuter}> 
    <div className={classes.card}>
      <div className={classes.backBtn}>
      <button className={classes.gobackBtn} onClick={handleGoBack}><BsArrowLeft /></button> 
      <div className={classes.logoContainer}>
        <Logo  />
      </div>
      </div>

      <div className={classes.head}>
        <div className={classes.header}>
          <img src={live} alt="Live" className={classes.liveIcon} />
          <div className={classes.courseTitle}>{selectedCourse[0].courseShortName}</div>
        </div>

        <div className={classes.courseImageSection}>
          <img src={selectedCourse[0].card_cover_image} alt="Course" className={classes.courseImage} />
          <div className={classes.statusSection}>

            <div> 
            <p className={classes.courseId}>Global Course ID: <span className={classes.span}> {selectedCourse[0].courseGlobalCode
            }</span></p>
            </div>

            <div> 
            <p className={classes.courseStatus}>
    Course Status: <span className={classes.ongoing}>{selectedCourse[0].courseStatus}</span>
            </p>
            </div>


          </div>
        </div>
      </div>

      <div className={classes.teacherProfileSection}>
        <div className={classes.sectionHeading}>
          <img src={teacherIcon} alt="Teacher Icon" className={classes.sectionIcon} />
          Teacher Profile:
        </div>

        <div className={classes.teacherName}>
          <div className={classes.teacherNameInner}><b>Instructor:</b>  {instructorNames} </div>
          {/* <div className={classes.teacherExperience}><b>Experience:</b> 12 Years</div> */}
        </div>
      </div>

      <div className={classes.courseDetails}>
        <div className={classes.sectionHeading}>
          <img src={courseInfoIcon} alt="Course Info Icon" className={classes.sectionIcon} />
          Course Info:
        </div>
        <div className={classes.designedForDiv}>
          <div><b>Designed for:</b> {selectedCourse[0].designedFor}</div>
          <div><b>Education Board:</b> {selectedCourse[0].educationboard}</div>
          {/* <div><b>Language of Teaching:</b> {selectedCourse[0].}</div> */}
        </div>
        <div className={classes.sectionHeading}>
          <img src={durationIcon} alt="Duration Icon" className={classes.sectionIcon} />
          Course Duration:
        </div>
        <div className={classes.designedForDiv}>
          <div><b>Starts on</b> {selectedCourse[0].
courseStartDate
} - <b>Ends on</b> {selectedCourse[0].courseEndDate}</div>
        </div>
      </div>

      <div className={classes.enrollSection}>
        <div className={classes.enroll}>


          <div className={classes.enrollButton5}>

          {userData.Course.association === "Teaching" &&
              <button className={classes.teachingBoxEnroll}
                type="button" disabled={true}
                style={{ backgroundColor: "white", color: "var(--themeColor)", borderStyle: "solid", borderWidth: "1px", borderColor: "var(--themeColor)" , height: "35px" , borderRadius:"5px"}}>
                {props.Course.association}
              </button>
            }




            {userData.Course.association === "Learning" &&
              <button className={classes.teachingBoxEnroll}
                type="button"
                disabled={true}
                style={{ backgroundColor: "white", color: "black", borderStyle: "solid", borderWidth: "1px", borderColor: "black" , height: "35px", borderRadius:"5px"}}
              >
                {userData.Course.association}
              </button>
            }

            {userData.Course.association === "Enroll" && enrollStatus === "notSent" &&
              <button className={classes.teachingBoxEnroll} type="button" disabled={false} onClick={enrollHandler}
              style={{ backgroundColor: "#0056d2", color: "white", cursor:"pointer", borderStyle: "solid", borderWidth: "1px", borderColor: "#0056d2" , height: "35px", borderRadius:"5px", width:"100px"}}
              > {userData.Course.association}</button>
            }

            {userData.Course.association === "EnrollRequestSent" &&
              <button className={classes.teachingBoxEnroll}
                type="button"
                disabled={true}
                style={{ width: "150px", backgroundColor: "white", color: "red", borderColor: "red", borderStyle: "solid" , height: "35px" , borderRadius:"5px" }}
                onClick={enrollHandler}
              > Request Sent</button>
            }




            {userData.Course.association === "Enroll" && !userData.Course.enrolled && enrollStatus === "sending" &&

              <button className={classes.teachingBoxEnroll}
                type="button" disabled={true}
                onClick={enrollHandler}
                style={{ width: "150px" , height: "35px" , borderRadius:"5px" }}
              >
                sending request ...
              </button>
            }


            {userData.Course.association === "Enroll" && !userData.Course.enrolled && enrollStatus === "sent" &&

              <button className={classes.teachingBoxEnroll} type="button" disabled={true} onClick={enrollHandler}> Request sent!</button>
            }

          </div>


        </div>
        <div className={classes.enrollmentInfo}>{totalEnrolledStudents} students already enrolled</div>
      </div>

      <div className={classes.courseDescription}>
        <div className={classes.sectionHeading}>
          <img src={descriptionIcon} alt="Description Icon" className={classes.sectionIcon} />
          Course Description:
        </div>
        <div>
        {selectedCourse[0].abouttheCourse
        }
        </div>
      </div>

      {/* <div className={classes.whatYouWillLearn}>
        <div className={classes.sectionHeading}>
          <img src={learnIcon} alt="Learn Icon" className={classes.sectionIcon} />
          What You Will Learn:
        </div>
        <div>
          <div>Fundamental Chemistry Concepts: Strengthen your understanding of essential chemistry principles, including atomic structure, chemical bonding, and thermodynamics.</div>
          <div>Advanced Chemical Reactions: Dive into complex reaction mechanisms, organic chemistry, and equilibrium processes.</div>
          <div>Practical Applications: Gain hands-on experience with laboratory techniques and experiments, enhancing your practical skills and understanding of real-world applications.</div>
          <div>Problem-Solving Skills: Develop critical thinking and problem-solving abilities through extensive practice with numerical problems and theoretical questions.</div>
        </div>
      </div> */}

      <div className={classes.downloadSyllabus}>
        {/* <button className={classes.downloadButton}>
          <img src={download} alt="Download" className={classes.downloadIcon} />
          Download Syllabus
        </button> */}
      </div>
    </div>
    </div>
  );
}

export default LeaveCard;
