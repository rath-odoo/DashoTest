import React,{useState,useEffect} from 'react';
import classes from './DashboardContentDiv.module.css';
import NoticeBoxContainer from './NoticeBoxContainer'
import ClassAndCoursesTopInfoBar from './ClassAndCoursesTopInfoBar'
import CourseDashBoardView from './CourseDashBoardView';
import EmptySpace from './EmptySpace';



const DashboardContentDiv=(props)=>{






const  Course1={      courseName:"Quantum Mechanics-I",
         courseNameColor:"var(--themeColor)",
         borderColor:"var(--headerRightIconsColor)",
         infoBarBkgColor:"#e0ebff",
         boxBkgColor:"white",
         courseSignUpstatusColor:"green",
	 courseSwitchText:"You are in this course",
	 courseSwitchTextColor:"var(--themeColor)",
	 progressBarColor:"#50C878",
        }

const  Course2={      courseName:"Classical Mechanics-I",
         courseNameColor:"#484848",
         borderColor:"#B0B0B0",
         infoBarBkgColor:"lightgrey",
         boxBkgColor:"#E8E8E8",
         courseSignUpstatusColor:"orange",
	 courseSwitchText:"Switch to this course",
	 courseSwitchTextColor:"grey",
	 progressBarColor:"#BEBEBE",
        }



const  Course3={      courseName:"Mathematical Physics",
         courseNameColor:"#484848",
         borderColor:"#B0B0B0",
         infoBarBkgColor:"lightgrey",
         boxBkgColor:"#E8E8E8",
         courseSignUpstatusColor:"orange",
         courseSwitchText:"Sign up for this course",
         courseSwitchTextColor:"grey",
	 progressBarColor:"#BEBEBE",
        }





const [toggle,setToggle]=useState(props.showCourse);




useEffect(()=>{
setToggle(toggle=>props.showCourse);
},[props.showCourse]);



return (

<div className={classes.dashboardContentDiv}>

	 
        {!toggle && <NoticeBoxContainer/>}
     

	{ toggle &&
   <div className={classes.classesAndCoursesContentDiv}>   

     <div className={classes.classesAndCoursesContentMarginDiv}>	


        
       <ClassAndCoursesTopInfoBar/>

	 
        <CourseDashBoardView Course={Course1}/>
      
        <CourseDashBoardView Course={Course2}/>

        <CourseDashBoardView Course={Course3}/>

	<CourseDashBoardView Course={Course3}/>



        <EmptySpace/>

     </div>
   </div>
    
    }


</div>

);


}


export default DashboardContentDiv;
