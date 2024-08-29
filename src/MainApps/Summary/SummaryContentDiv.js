import React, { useState, useCallback, useRef, useEffect } from 'react';
import classes from './SummaryContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';
import CourseOverview from './components/Teacher/Overview/Overview';
import Syllabus from './components/Teacher/Syllabus/CourseSyllabus';
import Videos from './components/Teacher/Videos/Videos';
import CourseFiles from './components/Teacher/Files/Files';
import CourseLinks from './components/Teacher/Links/Links';
import ACourseOverview from './AkshaySummary';
import TopToolBarSummary from './components/Teacher/TopToolBarV1';


const isAdminCheck = ({ course, idToCheck }) => {


  if (course.admins && course.admins.some(admin => admin.id === idToCheck)) {
    return true;
  }

  return false;

};

const isTeacherCheck = ({ course, idToCheck }) => {


  if (course.teachers && course.teachers.some(teacher => teacher.id === idToCheck)) {
    return true;
  }

  return false;
};


const isStudentCheck = ({ course, idToCheck }) => {
  //console.log("course.enrolled_students: ", course.enrolled_students, idToCheck)    
  return course.enrolled_students.includes(idToCheck);
};




const SummaryContentDiv = (props) => {


  const [toolBox1PageMounted, setToolBox1PageMounted] = useState(true);
  const [toolBox2PageMounted, setToolBox2PageMounted] = useState(false);
  const [toolBox3PageMounted, setToolBox3PageMounted] = useState(false);
  const [toolBox4PageMounted, setToolBox4PageMounted] = useState(false);
  const [toolBox5PageMounted, setToolBox5PageMounted] = useState(false);


  const showToolBox1PageContentHandler = useCallback(() => {
    setToolBox1PageMounted(true);
    setToolBox2PageMounted(false);
    setToolBox3PageMounted(false);
    setToolBox4PageMounted(false);
    setToolBox5PageMounted(false);
  }, []);

  const showToolBox2PageContentHandler = useCallback(() => {
    setToolBox2PageMounted(true);
    setToolBox1PageMounted(false);
    setToolBox3PageMounted(false);
    setToolBox4PageMounted(false);
    setToolBox5PageMounted(false);
  }, []);

  const showToolBox3PageContentHandler = useCallback(() => {
    setToolBox3PageMounted(true);
    setToolBox1PageMounted(false);
    setToolBox2PageMounted(false);
    setToolBox4PageMounted(false);
    setToolBox5PageMounted(false);
  }, []);

  const showToolBox4PageContentHandler = useCallback(() => {
    setToolBox4PageMounted(true);
    setToolBox1PageMounted(false);
    setToolBox2PageMounted(false);
    setToolBox3PageMounted(false);
    setToolBox5PageMounted(false);
  }, []);

  const showToolBox5PageContentHandler = useCallback(() => {
    setToolBox5PageMounted(true);
    setToolBox1PageMounted(false);
    setToolBox2PageMounted(false);
    setToolBox3PageMounted(false);
    setToolBox4PageMounted(false);
  }, []);



  const [reachedBottom, setReachedBottom] = useState(false);
  const [reachedTop, setReachedTop] = useState(false);

  const [videoPageNo, setVideoPageNo] = useState(1);


  const listInnerRef = useRef();

  const onScrollHandler = () => {
    console.log("on scroll handler");

    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
        //props.loadDownHandler();
        setReachedBottom(reachedBottom => !reachedBottom);
      }

      if (scrollTop === 0) {
        console.log("reached top");
        setReachedTop(reachedTop => !reachedTop);
      }

    }
  }

  {/*	
      const bottomEndRef = useRef(null);
      const scrollToBottom = () => {
        bottomEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
      useEffect(() => {
        scrollToBottom();
      }, [videoPageNo]);
   */}



  let course = props.selectedCourse[0];
  let idToCheck = Number(props.userData.id);
  let isAdmin = isAdminCheck({ course, idToCheck });
  let isTeacher = isTeacherCheck({ course, idToCheck });
  let isStudent = isStudentCheck({ course, idToCheck });
  let isOwner = Number(props.userData.id) === Number(course.creater.id) ? true : false;








  return (

    <div className={base.appContentDiv}>
      <div className={classes.contentDiv}
        onScroll={onScrollHandler}
        ref={listInnerRef}
      >

        <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}> </i>   </div>

        <TopToolBarSummary
          userData={props.userData}
          onPress={props.rerender}
          showToolBox1PageContent={showToolBox1PageContentHandler}
          showToolBox2PageContent={showToolBox2PageContentHandler}
          showToolBox3PageContent={showToolBox3PageContentHandler}
          showToolBox4PageContent={showToolBox4PageContentHandler}
          showToolBox5PageContent={showToolBox5PageContentHandler}
          toolBox1PageMounted={toolBox1PageMounted}
          toolBox2PageMounted={toolBox2PageMounted}
          toolBox3PageMounted={toolBox3PageMounted}
          toolBox4PageMounted={toolBox4PageMounted}
          toolBox5PageMounted={toolBox5PageMounted}
          selectedCourse={props.selectedCourse}
        />


        {toolBox1PageMounted && props.selectedCourse !== null && props.selectedCourse.length > 0 &&


          <ACourseOverview selectedCourse={props.selectedCourse}
            userData={props.userData}
            rerender={props.rerender}
            isAdmin={isAdmin}
            isTeacher={isTeacher}
            isStudent={isStudent}
            isOwner={isOwner}
          />

        }


        {/*

      <CourseOverview selectedCourse={props.selectedCourse}
                   userData={props.userData}
                   rerender={props.rerender}
                   />

     */}









        {toolBox2PageMounted && props.selectedCourse !== null &&
          <Syllabus selectedCourse={props.selectedCourse}
            rerender={props.rerender}
          />
        }


        {toolBox3PageMounted && props.selectedCourse !== null &&

          <Videos selectedCourse={props.selectedCourse}
            userData={props.userData}
            rerender={props.rerender}
            reachedBottom={reachedBottom}
            reachedTop={reachedTop}
            setVideoPageNo={setVideoPageNo}
            isAdmin={isAdmin}
            isTeacher={isTeacher}
            isStudent={isStudent}
            isOwner={isOwner}
          />
        }

        {toolBox4PageMounted && props.selectedCourse !== null &&

          <CourseFiles selectedCourse={props.selectedCourse}
            userData={props.userData}
            rerender={props.rerender}
            isAdmin={isAdmin}
            isTeacher={isTeacher}
            isStudent={isStudent}
            isOwner={isOwner}
          />
        }

        {toolBox5PageMounted && props.selectedCourse !== null &&

          <CourseLinks selectedCourse={props.selectedCourse}
            userData={props.userData}
            rerender={props.rerender}
            isAdmin={isAdmin}
            isTeacher={isTeacher}
            isStudent={isStudent}
            isOwner={isOwner}
          />
        }








      </div>
    </div>

  );

}


export default SummaryContentDiv;
