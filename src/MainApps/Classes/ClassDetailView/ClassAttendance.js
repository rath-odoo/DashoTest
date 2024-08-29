import classes from './ClassAttendance.module.css';
import { useState, useEffect } from 'react';
import { BsFillBookmarkFill } from "react-icons/bs";
import ClassAttendancePage from './ClassAttendancePage';
import OneClassAttendance from './OneClassAttendance';
import { getClassCourseAttendance, getCourseAdmins } from '../../../CommonApps/AllAPICalls';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';


const ClassAttendance = (props) => {

    const [showUploadForm, setShowUploadForm] = useState(false);

    const uploadFormHandler = () => {
        setShowUploadForm(true);
    }


    const closeFormHandler = () => {
        setShowUploadForm(false);
        props.rerender();

    }
    const [admins, setAdmins] = useState([]);
    // useEffect(() => {
    //     const fetchAdmins = async () => {
    //         try {
    //             const courseId = props.selectedCourse[0].id;
    //             const data = await getCourseAdmins(courseId);
    //             setAdmins(data);
    //         } catch (error) {
    //             console.error("Error fetching admins:", error);
    //         }
    //     };

    //     fetchAdmins();
    // }, []);
    // const isAdmin = admins.some(admin => admin.id === props.userData.id);
    // const isEnrolledStudent = props.selectedCourse[0].enrolled_students.includes(props.userData.id);
    // const teacherIds = (props.selectedCourse[0].teachers || []).map(teacher => teacher.id);
    // const isTeacher = teacherIds.includes(props.userData.id);

    const openLinkHandler = ({ url }) => {
        console.log("url: ");
        window.open(url, "__blank");
    }
    const handleButtonClick = () => {
        // Call the function passed as a prop
        props.onShowAttendance();
    };
    const [allClassAttendance, getClassAttendance] = useState(null);
    const [page, setPage] = useState(1);
    const [page_size, setPageSize] = useState(10);
    const [render, setRender] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    let courseId = props.oneClass.course.id
    let classroomId = props.oneClass.id;

    useEffect(() => {
        getClassCourseAttendance({ classroomId, page, courseId, getClassAttendance, props });


    }, [render, page, props]);
    console.log("all class attendance", allClassAttendance);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);

        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);

        }
    };
    console.log(props);

    return (
        <div className={classes.parentContainer}>
            <div className={classes.instituteBar}>
                <div className={classes.topContainer}>
                    {/* <div className={classes.leftSideContainer}> */}
                    {/* <div className={classes.studyIcon}>
                            <BsFillBookmarkFill />
                        </div>
                        <div className={classes.mainTitle}>Attendance</div> */}
                    {/* <button className={classes.uploadButton} type="button" onClick={() => { uploadFormHandler(); handleButtonClick(); }}>
                            + Update Attendance
                        </button> */}

                    {/* {showUploadForm &&
                            <ClassAttendancePage onPress={closeFormHandler} oneClass={props.oneClass} userData={props.userData} />
                        } */}
                    {/* </div> */}
                    <h1> Class Attendance Page</h1>
                    <div className={classes.pagination}>
                        <BsChevronDoubleLeft className={page > 1 ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handlePreviousPage} />
                        <span className={classes.pageInfo}>{`Page ${page} of ${totalPages}`}</span>
                        <BsChevronDoubleRight className={page < totalPages ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handleNextPage} />
                    </div>
                    <div className={classes.parentClassmain}><div className={classes.parentClass}>

                        <div className={classes.nameContainer}>Name</div>
                        <div className={classes.rolwContainer}>{props.isAdmin || props.isTeacher ? "Update Status" : "Status"}</div>


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
                                        selectedCourse={props.selectedCourse}
                                        isAdmin={props.isAdmin}
                                        isTeacher={props.isTeacher}
                                        isEnrolledStudent={props.isEnrolledStudent}
                                    />
                                })
                            }
                        </div></div>


                </div>
                {/* <div className={classes.linksContainer}>
                    {props.oneClass.links.map((onelink, index) => {

                        let url = onelink.link;
                        return <button className={classes.oneLink} type="button" onClick={() => openLinkHandler({ url })} key={index}>
                            {onelink.link}
                        </button>
                    })

                    }
                </div> */}

            </div>
        </div>
    );
}


export default ClassAttendance;