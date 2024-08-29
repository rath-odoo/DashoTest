import React,{useState, useEffect, useRef} from 'react';
import classes from './Classes.module.css'
import buttonStyle2 from '../../../../../../CommonApps/buttonStyle2.module.css';
import OutsideAlerter from '../../../../../../CommonApps/OutsideAlerter';
import CreateClassForm from './Forms/CreateClassForm';
import ClassesContainerDay from './ClassesContainerDay';
import ClassesContainerWeek from './ClassesContainerWeek';
import ClassesContainerAll from './ClassesContainerAll';
import {BsChevronDown, BsChevronDoubleRight, BsChevronDoubleLeft} from 'react-icons/bs';
import {BiChevronsRight, BiChevronsLeft} from 'react-icons/bi';
import {Route,Switch, useHistory} from 'react-router-dom';




const Classes=(props)=>{


    const history = useHistory();
	

   const isMounted = useRef(false);

   useEffect(() => {
     isMounted.current = true;
     props.passMountInfo(true);
     return () => {
            isMounted.current = false
            props.passMountInfo(false);
     }
   }, [props]);

 
   const [showCreateClassForm, setShowCreateClassForm] = useState(false);
   const [rerender, setRerender] = useState(false);

   const closeCreateClassFormHandler =()=>{
       setShowCreateClassForm(showCreateClassForm=>false);
       setRerender(rerender=>!rerender);
   }



   const [showDropDown, setShowDropDown] = useState(false);

   const [dayViewTrue, setDayView] = useState(true);
   const [weekViewTrue, setWeekView] = useState(false);
   const [monthViewTrue, setMonthView] = useState(false);
   const [allViewTrue, setAllView] = useState(false);


   const rerenderHandler=()=>{
   setRerender(rerender=>!rerender);

   }


   const dayViewHandler=()=>{
     setDayView(dayViewTrue=>true);
     setWeekView(weekViewTrue=>false);
     setMonthView(monthViewTrue=>false);
     setAllView(allViewTrue=>false);
     setShowDropDown(showDropDown=>false);
     history.push("/classes");
   }


   const weekViewHandler=()=>{
     setWeekView(weekViewTrue=>true);	 
     setDayView(dayViewTrue=>false);
     setMonthView(monthViewTrue=>false);
     setAllView(allViewTrue=>false);
     setShowDropDown(showDropDown=>false);
     history.push("/classes");
   }


   const monthViewHandler=()=>{
     setWeekView(weekViewTrue=>false);
     setDayView(dayViewTrue=>false);
     setMonthView(monthViewTrue=>true);
     setAllView(allViewTrue=>false);
     setShowDropDown(showDropDown=>false);
     history.push("/classes");
   }


   const allViewHandler=()=>{
     setWeekView(weekViewTrue=>false);
     setDayView(dayViewTrue=>false);
     setMonthView(monthViewTrue=>false);
     setAllView(allViewTrue=>true);
     setShowDropDown(showDropDown=>false);
     history.push("/classes");
   }	




return (

<div className={classes.classes}>



   <div className={classes.switchBar}>
	<button className={buttonStyle2.buttonStyle2} 
	        type="button" onClick={()=>setShowCreateClassForm(true)} 
	        style={{borderStyle:"none",backgroundColor:"var(--themeColor)", color:"white"}}
	        >
             +Create a class 
        </button>

        { showCreateClassForm && 
		 <CreateClassForm onPress={closeCreateClassFormHandler}
                                  userData={props.userData}
		 />
	}


      <div className={classes.dummyDiv} >
         <button className={buttonStyle2.buttonStyle2} type="button" onClick={()=>setShowDropDown(showDropDown=>!showDropDown)}>
	       { dayViewTrue &&  <span>  Day view </span>}
	       { weekViewTrue && <span> Week view </span>}
	       { monthViewTrue && <span> Month view </span>}
	       { allViewTrue && <span> All view </span>}
	       <span className={classes.downArrow}> <BsChevronDown/></span>
         </button>

	{ showDropDown &&
	   
         <OutsideAlerter setDropDown={setShowDropDown}>
           <div className={classes.dropDownDiv}>
            
		 { !dayViewTrue &&  <button type="button" className={classes.dropDownButton} onClick={dayViewHandler}>
                     <span>Day view</span>
                  </button>
	         }

		 { !weekViewTrue && <button type="button" className={classes.dropDownButton} onClick={weekViewHandler}>
                     <span>Week view</span>
                   </button>
		 }

		 {/* !monthViewTrue &&
                   <button type="button" className={classes.dropDownButton} onClick={monthViewHandler}>
                      <span>Month view</span>
                   </button>
                 */}

	         { !allViewTrue && 		 
                   <button type="button" className={classes.dropDownButton} onClick={allViewHandler}>
                      <span>All view</span>
                   </button>
		 }

	   </div>

	</OutsideAlerter>
         
        }

      </div>

   </div>




  { dayViewTrue && 
   	
        <ClassesContainerDay userData={props.userData} 
	                     passOneClassMountInfo={props.passOneClassMountInfo} 
	                     rerender={rerenderHandler}
	                     />

   }




   {  weekViewTrue &&

    <ClassesContainerWeek userData={props.userData} 
	                  passOneClassMountInfo={props.passOneClassMountInfo}
	                  rerender={rerenderHandler}
		          />

   }


  {  allViewTrue &&


     <ClassesContainerAll userData={props.userData} passOneClassMountInfo={props.passOneClassMountInfo} rerender={rerenderHandler}/>



  }












</div>

);

}

export default Classes;
