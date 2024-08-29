import classes from "./Batches.module.css";
import {useState, useEffect, useRef} from 'react';
import Single_course_View from "./Single_course_View";
import InvoiceFormat from "./invoiceFormat";
import Logo from "../../CommonApps/Logo";
import { TextInput } from "../../CommonApps/FormInputObjects";
import { getCourses, getinstitutebatches, getoneinstitutedetail, linkCourse } from "../../CommonApps/AllAPICalls";
import { BiUnlink } from "react-icons/bi";

import SingleBatchView from './SingleBatchView';
 


import CreateBatchForm from './Forms/CreateBatchForm';
import CreateNoticeForm from "./CreateNoticeForm";
 
 


//onChange={/*(e) => setSelectedCourseId(e.target.value)*/}

const Course_details=(props)=> {

  const isMounted = useRef(false);

    useEffect(() => {
      isMounted.current = true;
      props.passMountInfo(true);
      return () => {
        isMounted.current = false;
        props.passMountInfo(false);
      };
   }, [props]); 



  const [showCreateBatchForm, setShowCreateBatchForm] = useState(false);
  const [showNoticeForm , setShowNoticeForm] = useState(false);

  const [instituteBatches, getInstituteBatches] = useState(null);

  const [rerender, setRerender]= useState(false);

  const noticeFormHandler = ()=>{
    setShowNoticeForm(true);
  }
 




  



  useEffect(()=>{

       let instituteId =  props.selectedInstitute.id; 
       getinstitutebatches({ instituteId, getInstituteBatches});
 
    },[rerender , props]);

  console.log("props" , props);


  console.log("instituteBatches: ", instituteBatches);

  let showWarning=false;

  const closeWarningHandler=()=>{

  }



  let selectedCourseId=10;


   const showCreateBatchFormHandler=()=>{

    setShowCreateBatchForm(true);

   }


   const closeCreateBatchFormHandler=()=>{

    setShowCreateBatchForm(false);
    setRerender(rerender=>!rerender)

   }	

   const closenotice=()=>{

    setShowNoticeForm(false);
    setRerender(rerender=>!rerender)

   }	

   const rerenderNew = ()=> {
    setRerender(rerender=>!rerender)

   }

     let isAdminOrOwner = (props.selectedInstitute.relationship === "Owner" || props.selectedInstitute.relationship === "Admin") ? true : false;

     let isOwner =  props.selectedInstitute.relationship === "Owner" ? true: false;

     let isAdmin = props.selectedInstitute.relationship === "Admin" ? true: false;

     let isStudent = props.selectedInstitute.relationship === "Student" ? true: false;






  return (
    <div className={classes.parentClassmain}>

     { showCreateBatchForm &&

          <CreateBatchForm userData={props.userData}
	                   onPress={closeCreateBatchFormHandler}
	                   courseData={props.userData.dashboard_courses}
	                   selectedInstitute={props.selectedInstitute}
	                   />

     }

{ showNoticeForm &&

<CreateNoticeForm userData={props.userData}
           onPress={closenotice}
           courseData={props.userData.dashboard_courses}
           selectedInstitute={  props.selectedInstitute}
           instituteBatches={instituteBatches}
          
           />

}   






{/* (
        <div className={classes.overlay}>
        <div className={classes.warningBlock}>
          
          <div>
            <div>
            <button className={classes.closeBtn} onClick={closeWarningHandler}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
            </button>
            </div>

             <div className={classes.logo}   >
               <Logo />
             </div>
                <div className={classes.heading}>
                  Create a Batch
                </div>
          
            <form >
              <div className={classes.LeaveReasonConatainer}>
  <div className={classes.course}><span className={classes.redStar}>*</span>Course ID</div>

        <select className={classes.selectContainer} value={selectedCourseId} >

          <option value="CourseId" >Select a course ID</option>

            {props.userData.dashboard_courses
                .filter(course => course.association === "Teaching") 
                .filter(course => !courses.find(linkedCourse => linkedCourse.course_id === course.id)) 
                .map(course => (
                  <option key={course.id} value={course.id}>{course.id}, {course.courseShortName}</option>
                ))}

        </select>

  </div>
       <div className={classes.submitContainer}> 
        <button className={classes.submitBtn}   type="button"    >Submit</button>
         </div>
         </form>


          </div>
        </div>
        </div>
      )*/}






  <div className={classes.topNavigationBar}>
	{ isAdminOrOwner &&
  <div>
            <button className={classes.schedule}  type="button" onClick={showCreateBatchFormHandler}>Create a Batch</button>

{/* <button className={classes.schedule}  type="button" onClick={noticeFormHandler}>Create a Notice</button> */}
</div>
            
        }
 


        <button className={classes.showSummary} type="button" >Show Summary</button>
      </div>

      <div className={classes.parentClass}>
        {/* <div className={classes.sr}>Sr No</div> */}
        <div className={classes.name}>Batch Name</div>
        <div className={classes.courseId}>Batch Id</div>
        <div className={classes.ins}>Start Date</div>
        <div className={classes.startdate}>End Date</div>
     

        
      {props.isAdminOrOwner && (
        <div className={classes.sr}>Edit</div>  )}
      {props.isAdminOrOwner && (
        <div className={classes.sr}>Delete</div>)}
     
      </div>


      <div className={classes.scrollContent} >

      {/*instituteBatches.map((course, index) => (
          // eslint-disable-next-line react/jsx-pascal-case
          <Single_course_View key={index} courseId={course.course_id} 
          selectedInstitute={oneInstituteDetail} 
		                     userData={props.userData}
                         onDelink={reloadCourses}  />
        ))*/}


	{ instituteBatches !==null && instituteBatches.map((batch, indexb)=>{

            return <SingleBatchView batch={batch}
		                    key={indexb}
		                    userData={props.userData} 
		                    onPress={closeCreateBatchFormHandler}
                        onClick={rerenderNew}
                        rerender={props.rerender}
                        selectedInstitute={props.selectedInstitute}
                        isAdminOrOwner={props.isAdminOrOwner}
			            />

	   })
	}
    

      </div>


    
    </div>
  );
}
export default Course_details;
