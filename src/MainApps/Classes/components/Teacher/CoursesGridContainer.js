import React, { useEffect, useState } from 'react';
import classes from './CoursesGridContainer.module.css';
import ClassViewShort from './ClassViewShort_v2';
//import {getuser } from '../../../../../CommonApps/AllAPICalls';

import { Route, Switch, useHistory } from 'react-router-dom';

import ClassDetailView from './ClassDetailView';
import { getCourseAdmins } from '../../../../CommonApps/AllAPICalls';


const CoursesGridContainer = (props) => {


   const history = useHistory();
   const [classId, setClassId] = useState(null);
   //const [classURL, setClassURL] = useState(null);
   const [classPath, setClassPath] = useState(null);

   const [admins, setAdmins] = useState([]);

   const goToClassHandler = ({ classId }) => {
      setClassId(classId);
      setClassPath(`/course/classes/${classId}`);
      history.push(`/course/classes/${classId}`);
   }


   useEffect(() => {

      let classURL = window.location.href;
      let pattern = '/course/classes/[1-9]+';
      let result = classURL.match(pattern);


      if (result) {


         let urlarray = classURL.split("/");
         let class_Id = urlarray[urlarray.length - 1];
         setClassId(class_Id);
         setClassPath("/course/classes/" + class_Id + "/");
      }

   }, []);


   useEffect(() => {
      const fetchAdmins = async () => {
         try {
            const courseId = props.selectedCourse[0].id;
            const data = await getCourseAdmins(courseId);
            setAdmins(data);
         } catch (error) {
            console.error("Error fetching admins:", error);
         }
      };

      fetchAdmins();
   }, []);
   if (!props.selectedCourse || !props.selectedCourse[0]) {
      return <div>Loading...</div>;
   }

   const isAdmin = admins.some(admin => admin.id === props.userData?.id);
   const isEnrolledStudent = props.selectedCourse[0]?.enrolled_students?.includes(props.userData?.id);
   const teacherIds = (props.selectedCourse[0]?.teachers || []).map(teacher => teacher.id);
   const isTeacher = teacherIds.includes(props.userData.id);




   console.log("class Path: ", classPath);




   console.log("propsselectedCourse[0]: ", props.selectedCourse);
   console.log(isEnrolledStudent)


   return (


      <>

         <div className={classes.coursesGridContainer}>

            <Route exact path='/course/classes' >



               {


                  props.selectedCourse !== null && props.selectedCourse.length > 0 && props.selectedCourse[0].classes.map((eclass, index) => {


                     return <ClassViewShort key={index}
                        Class={eclass}
                        userData={props.userData}
                        rerender={props.rerender}
                        selectedCourse={props.selectedCourse}
                        isAdmin={isAdmin}
                        isEnrolledStudent={isEnrolledStudent}
                        isTeacher={isTeacher}
                        classDetailHandler={goToClassHandler}
                     />


                  }

                  )
               }

            </Route>





            {props.selectedCourse !== null && props.selectedCourse.length > 0 && props.selectedCourse[0].classes.length === 0 && <div className={classes.noCourseWarning}>

               This course does not have any classes. You can start creating classes now!.
            </div>

            }


            {props.selectedCourse !== null && props.selectedCourse.length === 0 &&

               <div className={classes.noCourseWarning}> <h2> No Course is selected. You need to select a course before accessing related classes.</h2> </div>


            }


         </div>

         {classPath !== null &&
            <Route exact path={classPath}>

               <ClassDetailView
                  userData={props.userData}
                  selectedCourse={props.selectedCourse}
                  passOneClassMountInfo={props.passOneClassMountInfo}
                  classId={classId}
                  isAdmin={isAdmin}
                  isEnrolledStudent={isEnrolledStudent}
                  isTeacher={isTeacher}
               />

            </Route>
         }



      </>

   );


}

export default CoursesGridContainer;

