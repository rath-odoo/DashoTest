
import {useState} from 'react';
import classes from "./ClassTitleBar.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  BsActivity,
  BsFillBookFill,
  BsPersonVcardFill,
  BsBarChartLineFill,
  BsPencilSquare,
  BsPlusCircle,
  BsFillBookmarkStarFill,
  BsFilterCircle,
  BsFileEarmarkTextFill,
  BsXCircle,
} from "react-icons/bs";


import ClassEditForm from '../../Dashboard/General/components/Teacher/Classes/Forms/ClassEditForm';





const ClassTitleBar=(props)=> {


   const [showEditForm, setShowEditForm] = useState(false);

    

   const showEditFormHandler=()=>{
     setShowEditForm(true);
   }


   const closeEditFormHander=()=>{
    setShowEditForm(false);	  
    props.rerender();	   

   }


    const searchId = props.userData.id;

   const searchIdExists = Object.values(props.oneClass.course).some(value =>
     value &&
        (Array.isArray(value) ? value.some(item => item && item.id === searchId) : value.id === searchId)
    );




   console.log("class title oneClass: ", props.oneClass);
  //  if (!props.selectedCourse || !props.selectedCourse[0]) {
  //   return <div>Loading...</div>;
  // }
 
  //  let isOwner = Number(props.selectedCourse[0]?.creater?.id) === Number(props.userData.id) ? true : false;
  //  let isAdmin = props.selectedCourse[0]?.admins?.some(admin => Number(admin.id) === Number(props.userData.id)) ? true : false;
  //  const teacherIds = (props.selectedCourse[0]?.teachers || []).map(teacher => teacher.id);
  //  const isTeacher = teacherIds.includes(props.userData.id);





  return (
    <div className={classes.parentContainer}>

        <div className={classes.editButtonDiv}>


	  { searchIdExists && 
          <button className={classes.editButton} type="button" onClick={showEditFormHandler}>
            <BsPencilSquare className={classes.editbutton} />
            {(props.isOwner || props.isAdmin || props.isTeacher) &&

            <div className={classes.editText}>Edit</div>
            }
          </button>

           }


          { showEditForm &&

                 <ClassEditForm userData={props.userData} 
		                oneClass={props.oneClass}
		                onPress={closeEditFormHander}
		                />

	  }




        </div>

      <div className={classes.headerSection}>

        <div className={classes.classContainer}>
          
          <div className={classes.classIcon}>
            <BsFillBookFill />
          </div>
          <div className={classes.classTitle}>Class Id : </div>
          <div className={classes.classNa}> #{props.oneClass.id}</div>
        </div>



        <div className={classes.statusContainer}>
          <div className={classes.statusIcon}>
            <BsActivity />
          </div>
          <div className={classes.statusTitle}>Class Status : </div>

          <div className={classes.statusName} style={{color:"green"}}>{props.oneClass.status}</div>
        </div>

        <div className={classes.courseContainer}>
          <div className={classes.courseIcon}>
            <BsPersonVcardFill />
          </div>
          <div className={classes.courseTitle}>Class Serial No : </div>
          <div className={classes.courseName}>{props.oneClass.serialNo === null? "N/A":props.oneClass.serialNo}</div>
        </div>
      </div>
    </div>
  );
}
export default ClassTitleBar;
