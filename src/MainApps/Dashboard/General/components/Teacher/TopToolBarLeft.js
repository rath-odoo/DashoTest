import React,{useState,memo} from 'react';
import classes from './TopToolBarV1.module.css';
import {BsChevronDown, BsChevronBarRight, BsChevronRight} from 'react-icons/bs';
import {changeusertype} from '../../../../../CommonApps/AllAPICalls';
import OutsideAlerter from "../../../../../CommonApps/OutsideAlerter";
import {MdDoubleArrow} from 'react-icons/md';

//import {Typography} from '@material-ui/core';

const TopToolBarLeft=(props)=>{

       const [showDropDown, setShowDropDown] = useState(false);

        const showUsertypeChangeHandler=()=>{
           //console.log("clecked");
           setShowDropDown(showDropDown=>!showDropDown);
        }

        //console.log("showDropDown:",showDropDown);

        const changeUserTypeToStudentHandler=()=>{
	   // let usertypeId=2;	
           // changeusertype({usertypeId});
	}


       const changeUserTypeToTeacherHandler=()=>{
           // let usertypeId=1;
           // changeusertype({usertypeId});
       }






return (

        <div className={classes.topToolBarLeft}>

	        <div className={classes.dashboardTitle}> 	              
	              <div className={classes.topbarTitle}> 
	                   <span> <b>Learn and  Teach</b></span>
	                   <BsChevronRight className={classes.rightArrowToUserType}/>
	              </div> 
	        
                
                <div className={classes.userTypeInfo}>
                      {/*props.userData.usertype===1 && 
			           <div>
                                     
                                      <span className={classes.buttonsDivTnS}>
                                          <button className={classes.teacherButton} onClick={showUsertypeChangeHandler}>
                                             <span className={classes.teacherTitle}>Teacher </span>
                                             <span className={classes.downArrowSpan}><BsChevronDown/></span>
                                          </button>

                                           {showDropDown && 

						       <OutsideAlerter setDropDown={()=>setShowDropDown(false)}>

						           <button className={classes.studentButton} 
						                    onClick={changeUserTypeToStudentHandler}> 
						              <span className={classes.teacherTitle}> Student </span> 
						            </button>

						       </OutsideAlerter>
					   }

                                       </span>
                                    </div>
                      */}
                      {/*props.userData.usertype===2 && <div>
                                      
                                        <span className={classes.buttonsDivTnS}>
                                          <button className={classes.teacherButton} onClick={showUsertypeChangeHandler}>
                                             <span className={classes.teacherTitle}>Student </span>
                                             <span className={classes.downArrowSpan}><BsChevronDown/></span>
                                          </button>
  
                                           {showDropDown &&
						         <OutsideAlerter setDropDown={()=>setShowDropDown(false)}>
						           <button className={classes.studentButton} onClick={changeUserTypeToTeacherHandler}>
                                                               <span className={classes.teacherTitle}> Teacher</span>
                                                            </button>
						          </OutsideAlerter>
                                           }

                                       </span>

				      </div>
                      */}
                </div>
		

            </div>

         </div>





);

}

export default memo(TopToolBarLeft);
