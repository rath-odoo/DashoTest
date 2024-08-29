import { useEffect, useState } from 'react';
import classes from "./DetailChildContentDiv.module.css";
import ClassTitleBar from "./ClassTitleBar";
import InstructorBar from "./InstructorBar";
import MeetingCard from "./MeetingCard";
import ClassTimeNAddress from "./ClassTimeNAddress";
import ChapterNTopics from "./ChapterNTopics";
import VideoFiles from "./VideoFiles";
import StudyMaterials from "./StudyMaterials";
import PreRequisites from "./PreRequisites";
import Homework from "./Homework";
import ChatNQuestion from "./ChatNQuestion";
import GoBackNavBar from "./GoBackNavBar";

import ClassLinks from "./ClassLinks";

import AboutClass from "./AboutClass";
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetail } from '../../../actions/getClassDetailActions';
import { useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import ClassAttendance from './ClassAttendance';
import { getCourseAdmins } from '../../../CommonApps/AllAPICalls'





const App = (props) => {


  const dispatch = useDispatch();
  const { object, loading, error } = useSelector(state => state.getclassdetail);

  const history = useHistory();

  const [rerender, setRerender] = useState(false);
  const [ShowDetail, setShowDetail] = useState(true);
  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleShowAttendance = () => {
    setShowDetail(false);
  }
  const handleShowDetail = () => {
    setShowDetail(true);
  }


  useEffect(() => {
    // Assume userId is available, you can replace it with your logic to get the user id
    const classId = props.classId;
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    dispatch(getClassDetail(classId, userTimeZone));
  }, [dispatch, rerender]);



  console.log("class object ", object);



  // const backToClassesHandler=()=>{

  //   history.push('/classes');

  // }

  const backToClassesHandler = () => {
    const currentUrl = window.location.href;

    if (currentUrl.includes("course/classes")) {
      history.push('/course/classes');
    } else if (currentUrl.includes("classes")) {
      history.push('/classes');
    }
  };





  const rerenderhandler = () => {
    setRerender(rerender => !rerender);
  }
  console.log("props", props);

  return (
    <div className={classes.parentContainer}>


      <div className={classes.mainContainer}>

        <button type="button" className={classes.backButton} onClick={backToClassesHandler}> <BsArrowLeft /> <span> back </span> </button>



        {object !== null &&

          <div className={classes.innerDiv}>

            <div className={classes.topContainerButtons}><button onClick={() => handleTabChange("tab1")} className={`${classes.viewDetailsButton} ${activeTab === "tab1" ? classes.activeButton : ""}`}>View Details</button>
              {/* <ClassAttendance onShowAttendance={handleShowAttendance} oneClass={object} rerender={rerenderhandler} userData={props.userData} /> */}
              <button className={`${classes.viewDetailsButton} ${activeTab === "tab2" ? classes.activeButton : ""}`} onClick={() => handleTabChange("tab2")}>
                {props.isAdmin || props.isTeacher ? " +Update Class Attendance" : "View Attendance"}
              </button>
            </div>

            {activeTab === "tab1" && <div><ClassTitleBar oneClass={object} userData={props.userData} rerender={rerenderhandler} selectedCourse={props.selectedCourse} isAdmin={props.isAdmin} isTeacher={props.isTeacher} isOwner={props.isOwner} />

              <MeetingCard oneClass={object} />

              <InstructorBar oneClass={object} />

              <ClassTimeNAddress oneClass={object} />

              <AboutClass oneClass={object} />

              <ChapterNTopics oneClass={object} />

              <VideoFiles selectedCourse={props.selectedCourse} userData={props.userData} oneClass={object} rerender={rerenderhandler} isAdmin={props.isAdmin} isTeacher={props.isTeacher} isOwner={props.isOwner}/>

              <StudyMaterials selectedCourse={props.selectedCourse} userData={props.userData} oneClass={object} rerender={rerenderhandler}  isAdmin={props.isAdmin} isTeacher={props.isTeacher} isOwner={props.isOwner}/>


              <ClassLinks selectedCourse={props.selectedCourse} userData={props.userData} oneClass={object} rerender={rerenderhandler}  isAdmin={props.isAdmin} isTeacher={props.isTeacher} isOwner={props.isOwner}/>
            </div>}
            {activeTab === "tab2" && <ClassAttendance onShowAttendance={handleShowAttendance} oneClass={object} rerender={rerenderhandler} userData={props.userData} isAdmin={props.isAdmin} isTeacher={props.isTeacher} isEnrolledStudent={props.isEnrolledStudent} selectedCourse={props.selectedCourse} />}

            {/*
             <PreRequisites />             
             <Homework />
             <ChatNQuestion />
	     */}

          </div>
        }

      </div>

    </div>
  );
}

export default App;
