import classes from "./InstructorBar.module.css";
import { BsPeopleFill } from "react-icons/bs";

import ProfileImage from "./img.jpg"





const InstructorBar=(props)=> {
  return (
    <div className={classes.parentContainedr}>
      
      <div className={classes.instructor}>




     { props.oneClass.teachers.map((teacher, index)=>{



        return <div className={classes.instructorOneData} key={index}>
          <div className={classes.profileIconContainer}>
            <img
              className={classes.profileImg}
              src={teacher.profile_image}
              alt="logo"
            ></img>
          </div>

          <div className={classes.instructorDetailContainer}>
            <div className={classes.title1}>{teacher.firstname+" "+teacher.lastname}</div>
            <div className={classes.title2}>Top Instructor</div>
	    {/*
            <div className={classes.title3}>Android and Web Designer</div>
	    */}
          </div>
        </div>




       })
     }






       {/*
        <div className={classes.instructorTwoData}>
          <div className={classes.profileIconContainer}>
            <img
              className={classes.profileImg}
              src={ProfileImage}
              alt="logo"
            ></img>
          </div>

          <div className={classes.instructorDetailContainer}>
            <div className={classes.title1}>Akshay Dipakrao Bhasme</div>
            <div className={classes.title2}>Top Instructor</div>
            <div className={classes.title3}>Android and Web Designer</div>
            <div className={classes.title4}>1 and Half year Experienced</div>
          </div>
        </div>
     */}


      </div>

    </div>
  );
}
export default InstructorBar;
