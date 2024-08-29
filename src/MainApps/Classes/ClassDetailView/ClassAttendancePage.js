import classes from './ClassAttendancePage.module.css';
import { AiFillCloseCircle } from "react-icons/ai";
import OneClassAttendance from './OneClassAttendance';
import { useEffect, useState } from 'react';
import { getClassCourseAttendance } from '../../../CommonApps/AllAPICalls';

const ClassAttendancePage = (props) => {

  const [allClassAttendance, getClassAttendance] = useState(null);
  const [page, setPage] = useState(1);
  const [page_size, setPageSize] = useState(10);
  const [render, setRender] = useState(false);
  useEffect(() => {
    let courseId = props.oneClass.course.id
    let classroomId = props.oneClass.id;
    getClassCourseAttendance({ classroomId, page, courseId, page_size, getClassAttendance });
  }, [render])

  console.log("all class attendance ", allClassAttendance);

  return (
    <div className={classes.createTicketFormDivParent}>
      {
        <div className={classes.createTicketContainer} >


          <div className={classes.innerDiv}>

            <div className={classes.closeButtonDiv}>
              <button onClick={props.onPress} className={classes.closeFormButton}>
                {" "}
                <AiFillCloseCircle className={classes.closeButtonIcon} />{" "}
              </button>
            </div>
            <div className={classes.attendanceContainer}>
              {
                allClassAttendance !== null &&
                allClassAttendance.results.map((oneAttendee, index) => {
                  return <OneClassAttendance
                    key={index}
                    oneAttendee={oneAttendee}
                    userData={props.userData}
                    render={() => { setRender(!render) }}
                  />
                })
              }
            </div>



          </div>

        </div>
      }
    </div>
  );
};

export default ClassAttendancePage;
