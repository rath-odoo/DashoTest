import React,{useEffect,useState} from 'react';
import classes from './ClassesContainer.module.css';
import {Route,Switch, useHistory} from 'react-router-dom';
import ClassViewShort from './ClassViewShort_Week';
import ClassDetailView from './ClassDetailView';
import {BsChevronDoubleLeft,BsChevronDoubleRight} from 'react-icons/bs';
import {getdayclasses, getweekclasses} from '../../../../../../CommonApps/AllAPICalls';




function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate.replace(/(\d)(st|nd|rd|th)/, '$1<sup>$2</sup>');
}


function getCurrentWeekDates() {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate the difference in days to Monday (assuming Monday is 1 and Sunday is 0)
  const daysUntilMonday = (currentDay + 6) % 7;

  // Calculate the start date of the week (Monday)
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - daysUntilMonday);

  // Calculate the end date of the week (Sunday)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return { startDate, endDate };
}


const ClassesContainer=(props)=>{

   const history = useHistory();

  const [classId,setClassId] = useState(null);

  //const [classURL, setClassURL] = useState(null);

  const [classPath, setClassPath]= useState(null);

  const goToClassHandler=({classId})=>{
      setClassId(classId);
      setClassPath(`/classes/${classId}`);
      history.push(`/classes/${classId}`);
  }



   useEffect(()=>{

     let classURL=window.location.href;
     let pattern = '/classes/[1-9]+';
     let result = classURL.match(pattern);

     if (result) {
        let urlarray=classURL.split("/");
        let class_Id=urlarray[urlarray.length-1];
        setClassId(class_Id);
        //setClassPath(result+"/");
	setClassPath("/classes/"+class_Id+"/");
     }

    },[classPath]);


    const [userWeekClasses, getUserWeekClasses] = useState(null);

    //let startDate_ = getCurrentWeekDates().startDate;
    //console.log("startDate: ", startDate_);

    //const nextDate = new Date(startDate_);
    //nextDate.setDate(startDate_.getDate() + 2);

    //console.log("ddd:next: ",nextDate); 


    //let startDate = getCurrentWeekDates().startDate.toISOString().split('T')[0];


    const [startDate, setStartDate]= useState(getCurrentWeekDates().startDate);

    //const formattedDate = startDate.toISOString().split('T')[0];
    //const formattedEndDate = endDate.toISOString().split('T')[0];

    //const nextDate = new Date(startDate);
    //nextDate.setDate(startDate.getDate() + 1);

    const nextWeekHandler=()=>{

     const nextDate = new Date(startDate);
     nextDate.setDate(startDate.getDate() + 7);
     setStartDate(startDate=>nextDate);

    }

    const prevWeekHandler=()=>{

     const nextDate = new Date(startDate);
     nextDate.setDate(startDate.getDate() - 7);
     setStartDate(startDate=>nextDate);	    


    }

    let startdate = startDate.toISOString().split('T')[0];
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    let enddate = endDate.toISOString().split('T')[0];




    const [pageNo, setPageNo] = useState(1);

    useEffect(()=>{

        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        getweekclasses({getUserWeekClasses, startdate,  timezone, pageNo});

    },[pageNo, startdate, props.rerender]);





     console.log("userWeekClasses",userWeekClasses);






    //console.log("startDate: ", startDate);
    //console.log("nextDate: ", nextDate);







return (


<div className={classes.parentContainer}>


 <Route exact path='/classes'>



        <div className={classes.timeLine}>
             Showing  Classes from
           <i className={classes.infoText_i}>
                  <button type="button" className={classes.navButton} onClick={prevWeekHandler}> 
	                      <BsChevronDoubleLeft/> 
	          </button>

                  <span className={classes.dateText}>{formatDate(startdate)}{" to "}{formatDate(enddate)}</span>

                  <button type="button" className={classes.navButton} onClick={nextWeekHandler}> 
	                     <BsChevronDoubleRight/>
	          </button>
           </i>
        </div>



      { userWeekClasses !==null &&  userWeekClasses.results.map((oneDay, indexOuter)=>{
 
	   return <div className={classes.daySection} key={indexOuter}>
                       <div className={classes.leftDayNameContainer}>
                             <span className={classes.dayName}> {oneDay.day}{" ("}{oneDay.classes.length} {")"} </span>
                       </div>
                       <div className={classes.dayClassContainer}>
                             { oneDay.classes.map((oneClass, indexInner)=>{

                                    return <ClassViewShort key={indexInner}
				                           userData={props.userData}
				                           oneClass={oneClass}
				                           rerender={props.rerender}
				                           classDetailHandler={goToClassHandler}
					                   />

			           }) 

			     }
                       </div>
                  </div>     

          })

      }










  </Route>



        <Route  exact path={classPath}>

                <ClassDetailView userData={props.userData}
                              passOneClassMountInfo={props.passOneClassMountInfo}
	                      classId={classId}
                              />
        </Route>

















</div>	

);




}

export default ClassesContainer;
