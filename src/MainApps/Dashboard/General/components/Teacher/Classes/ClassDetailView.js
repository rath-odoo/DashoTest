import React, { useRef, useState, useEffect } from 'react';
import classes from './ClassDetailView.module.css'
import DetailContentDiv from '../../../../../Classes/ClassDetailView/DetailChildContentDiv';
import { getCourseAdmins } from '../../../../../../CommonApps/AllAPICalls';
import { getClassDetail } from '../../../../../../actions/getClassDetailActions';
import { useDispatch, useSelector } from 'react-redux';






const ClassDetailView = (props) => {

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passOneClassMountInfo(true);
    return () => {
      isMounted.current = false
      props.passOneClassMountInfo(false);
    }
  }, [props]);


  console.log("One Class Detail Mounted", isMounted);



  const dispatch = useDispatch();
  const { object, loading, error } = useSelector(state => state.getclassdetail);



  const [classId, setClassId] = useState(null);

  useEffect(() => {
    // Get the current URL path
    const currentPath = window.location.pathname;

    // Use regular expressions to find the last digit in the path
    const matches = currentPath.match(/\/(\d+)$/);

    if (matches && matches.length >= 2) {
      // Set the last digit as a state variable
      setClassId(parseInt(matches[1], 10));
    }
  }, []);


  const [rerender, setRerender] = useState(false);

//   if (!props.courseData || !props.courseData[0]) {
//     return <div>Loading...</div>;
//  }
 
  
//      let isOwner = Number(props.courseData[0]?.creater?.id) === Number(props.userData.id) ? true : false;
//    let isAdmin = props.courseData[0]?.admins?.some(admin => Number(admin.id) === Number(props.userData.id)) ? true : false;
//    const teacherIds = (props.courseData[0]?.teachers || []).map(teacher => teacher.id);
//    const isTeacher = teacherIds.includes(props.userData.id);
//   const isEnrolledStudent = props.courseData[0]?.enrolled_students?.includes(props.userData?.id);
  
console.log("j",props);


useEffect(() => {
  // Assume userId is available, you can replace it with your logic to get the user id
  const classId = props.classId;
  let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  dispatch(getClassDetail(classId, userTimeZone));
}, [dispatch, rerender]);


const [admins, setAdmins] = useState([]);


 


  const rerenderhandler = () => {
    setRerender(rerender => !rerender);
  }
  console.log("this are object coming from ", object);
  console.log("this are object coming from ", admins);


  // let isOwner = Number(object.course.creater?.id) === Number(props.userData.id) ? true : false; 
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const courseId = object?.course?.id;
        if (courseId) {
          const data = await getCourseAdmins(courseId);
          setAdmins(data);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
  
    fetchAdmins();
  }, [object]);
  
  // Ensure object and object.course are defined before accessing them
  let isOwner = Number(object?.course?.creater?.id) === Number(props.userData.id) ? true : false; 
  const teacherIds = (object?.course?.teachers || []).map(teacher => teacher.id);
  const isTeacher = teacherIds.includes(props.userData.id);
  
  let isAdmin = admins?.some(admin => Number(admin.id) === Number(props.userData.id)) ? true : false;
  let isEnrolledStudent = !isAdmin && !isTeacher;
  

  console.log("isAdmin", isAdmin );
  console.log("isTeacher",isTeacher);


  return <>
    {/*props.classId ===null && <div style={{color:"grey"}}> Loading ... </div>*/}

    {props.classId !== null && <DetailContentDiv classId={props.classId}
      userData={props.userData}
      isAdmin={isAdmin}
      isEnrolledStudent={isEnrolledStudent}
      isTeacher={isTeacher}
      isOwner={isOwner}
    />


    }

  </>

}

export default ClassDetailView;
