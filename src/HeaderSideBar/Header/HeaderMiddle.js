import {useState, useEffect} from 'react';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import {GiTeacher} from "react-icons/gi";
import { BsPersonFillGear } from "react-icons/bs";
import { FaPeopleArrows } from "react-icons/fa";
import classes from './HeaderMiddle.module.css';
import { useHistory } from "react-router-dom";

import { BsBank2 } from "react-icons/bs";
const HeaderMiddle=(props)=>{



   const [homeButtonColor, setHomeButtonColor]=useState(
      {  
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: BsFillHouseDoorFill
      }
    );

   const [instituteButtonColor, setInstituteButtonColor]=useState(
      {  
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: BsPersonFillGear
      }
    );


    const [learnButtonColor, setLearnButtonColor]=useState(
      {  
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: FaBookReader
      }
    );



    const [connectButtonColor, setConnectButtonColor]=useState(
      { 
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: FaBookReader
      }
    );










    useEffect(()=>{
       let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            color:"var(--themeColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"3px",
	    fontWeight:"normal",
            iconObj: BsFillHouseDoorFill,
	    underlineColor:"var(--themeColor)"
	    
            };
        let inActivebuttonColor= {  backgroundColor:inActivebuttonBkgColor, //"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj: BsFillHouseDoorFill,
	    underlineColor:"white"
            };


        !props.homeMounted && setHomeButtonColor(homeButtonColor=>inActivebuttonColor);
        props.homeMounted &&  setHomeButtonColor(homeButtonColor=>activeButtonColor);


    },[props.homeMounted]);



    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";
        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            color:"var(--themeColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"3px",
            fontWeight:"normal",
            iconObj: BsPersonFillGear,
	    underlineColor:"var(--themeColor)"
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj: BsPersonFillGear,
	    underlineColor:"white"
            };

        !props.instituteMounted && setInstituteButtonColor(instituteButtonColor=>inActivebuttonColor);
        props.instituteMounted &&  setInstituteButtonColor(instituteButtonColor=>activeButtonColor);

    },[props.instituteMounted]);



     useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";
        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            color:"var(--themeColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"3px",
            fontWeight:"normal",
            iconObj: BsPersonFillGear,
	    underlineColor:"var(--themeColor)"
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj: BsPersonFillGear,
	    underlineColor:"white"
            };

        !props.connectMounted && setConnectButtonColor(connectButtonColor=>inActivebuttonColor);
        props.connectMounted &&  setConnectButtonColor(connectButtonColor=>activeButtonColor);

    },[props.connectMounted]);	




























   const history = useHistory();

   const connectHandler=()=>{
     localStorage.removeItem('preferredCourseId');
      history.push('/connect');

   }


   const homeHandler=()=>{

    localStorage.removeItem('preferredCourseId');
    history.push('/');
   
   }

   const teachHandler=()=>{

   history.push('/home/dashboard/courses');	   

   }


  const manageHandler=()=>{
   localStorage.removeItem('preferredCourseId');
   history.push('/institute');

  }






return <div className={classes.headerMiddle}>

  		
  <button type="button" className={classes.middleHeaderButton} onClick={homeHandler} style={homeButtonColor}>		
    <div className={classes.buttonIconDiv}>
       <BsFillHouseDoorFill style={{fontSize:"calc( 0.3 * var(--headerHeight) )"}}/>
       <div> Home</div>
    </div>
     <div className={classes.buttonStyleDiv} style={{color:homeButtonColor.underlineColor}}> </div>
  </button>		

  <button type="button" className={classes.middleHeaderButton} onClick={connectHandler} style={connectButtonColor}>
    <div className={classes.buttonIconDiv}>
       <FaPeopleArrows style={{fontSize:"calc( 0.3 * var(--headerHeight) )"}}/>
       <div> Connect </div>
    </div>
    <div className={classes.buttonStyleDiv} style={{color:connectButtonColor.underlineColor}}> </div>
  </button>



  {/*		
    <button type="button" className={classes.middleHeaderButton} onClick={teachHandler}>
      <GiTeacher size={20}/>
      <div> Teach </div>
    </button>
  */}

  <button type="button" className={classes.middleHeaderButton} onClick={manageHandler} style={instituteButtonColor} >
    <div className={classes.buttonIconDiv}>
         <BsBank2 style={{fontSize:"calc( 0.3 * var(--headerHeight) )"}}/>
         <div> Institute </div>
    </div>
    <div className={classes.buttonStyleDiv}  style={{color:instituteButtonColor.underlineColor}}> </div>
  </button>		







</div>


}

export default HeaderMiddle;
