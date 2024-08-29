import {useState, useEffect} from 'react';
import classes from "./Slot.module.css";
import {getalltopperslots, getdayslots} from '../../../CommonApps/AllAPICalls';
import OneSlot from './OneSlot';

import {BsChevronDoubleLeft, BsChevronDoubleRight} from 'react-icons/bs';

const Slots=(props)=> {


   const currentDateConst =  new Date();

   const [currentDate, setCurrentDate] = useState(new Date());

   const formattedDate = currentDate.toISOString().split('T')[0];

   const [userDaySlots, getUserDaySlots] = useState(null);

   const [pageNo, setPageNo] = useState(1);

   //useEffect(()=>{
   //let topperId=props.topperId;
   //getalltopperslots({topperId, getTopperSlots, pageNo});

   //},[pageNo,props.rerender]);

  const daySuffix = (day) => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};




  const formattedDisplayDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});


  const day = currentDate.getDate();
  const formattedDateForTop = `${day}${daySuffix(day)} ${formattedDisplayDate.split(" ")[0]} ${formattedDisplayDate.split(" ")[2]}`;




   useEffect(()=>{

      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  	    let topperId = 37;
      getdayslots({getUserDaySlots, formattedDate, timezone, pageNo});

   },[pageNo, formattedDate, props.rerender]);







     const nextPageHandler=()=>{
         if(userDaySlots !==null && userDaySlots.next !==null ){
             setPageNo(pageNo=>pageNo+1);
         }
     }


     const prevPageHandler=()=>{
          if(userDaySlots !==null && userDaySlots.previous !==null ){
            setPageNo(pageNo=>pageNo-1);
          }
     }




   const nextDayHandler=()=>{
    //console.log("next date handelr");
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
   }

   const prevDayHandler=()=>{

    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);



   }


   let today = (currentDateConst === currentDate);










   console.log("topperSlots: ", userDaySlots);


  return <div className={classes.slotsContainer}>

          <h1 className={classes.titleMessageBooking}> Book your slot</h1>

	   {/*userDaySlots !==null && userDaySlots.count*/} 
        <div className={classes.nextPreButtonsDiv}>
           <button type="button" className={classes.navButton} onClick={prevDayHandler}>
                   Prev Day
           </button>
                <span className={classes.dateText}> {formattedDateForTop} </span>
           <button type="button" className={classes.navButton} onClick={nextDayHandler}>
                       Next day
           </button>
        </div>


             { userDaySlots !==null && userDaySlots.results.map((oneSlot, index)=>{

               return <OneSlot key={index}
		               oneSlot={oneSlot}
                                      />

                })

             }

	 </div>;
}
export default Slots;
