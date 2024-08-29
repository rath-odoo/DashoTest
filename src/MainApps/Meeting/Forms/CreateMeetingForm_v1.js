import React,{useState} from "react";
import classes from "./CreateMeetingForm_v1.module.css";
import {AiFillCloseCircle} from "react-icons/ai";

import {BsChevronDown, BsChevronUp} from 'react-icons/bs';

import Logo from '../../../CommonApps/Logo';
import {  OptionField,
	  OptionFieldCourses,
	  ParagraphField,
	  DateField,
	  TimeField,DayField, CustomTimePicker, TextInput } from '../../../CommonApps/FormInputObjects';
import { createonemeeting } from '../../../CommonApps/AllAPICalls';

import {meetingbasewebURL} from '../../../basewebURL';




import moment from 'moment-timezone';
import FadeLoader from "react-spinners/BeatLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize:"10px",
};



  const convertToUtcTime = ({year, month, day, hour, minute, ampm}) => {
    const formattedHour = parseInt(hour, 10) + (ampm === 'PM' ? 12 : 0);
    const formattedMinute = parseInt(minute, 10);

    if (isNaN(formattedHour) || isNaN(formattedMinute)) {
      //setUtcTime('Invalid input');
      return;
    }

    const istMoment = moment.tz(
      {
	year: moment().year(),
	month: moment().month(),
	date: day,
        hour: formattedHour,
        minute: formattedMinute,
      },
      'Asia/Kolkata' // IST timezone
    );

    //const utcTime = istMoment.clone().tz('UTC').format('HH:mm:ss z');
    const utcTime = istMoment.clone().tz('UTC').format('YYYY-MM-DD HH:mm:ss z');

    return utcTime;
  };







//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";


/*const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
*/

const convertAndAddto24hourFormat=({ formDataMultiClass, day })=>{
	  if (day==="Monday"){
            let ampm = formDataMultiClass.selectedampmMon;
            let minute = formDataMultiClass.selectedminuteMon;
            let hour = formDataMultiClass.selectedhourMon;
            //console.log("hourM: ",formDataMultiClass.selectedhourMon);		  
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
            let time =`${hour}:${minute}:00`;
            let timestr= time.toString();
            formDataMultiClass["classtimeMonday"]=timestr;
          }

          if (day==="Tuesday"){
            let ampm = formDataMultiClass.selectedampmTues;
            let minute = formDataMultiClass.selectedminuteTues;
            let hour = formDataMultiClass.selectedhourTues;
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
	    let time =`${hour}:${minute}:00`; 	  
            let timestr= time.toString();
            formDataMultiClass["classtimeTuesday"]=timestr;
          } 


          if (day==="Wednesday"){
            let ampm = formDataMultiClass.selectedampmWed;
            let minute = formDataMultiClass.selectedminuteWed;
            let hour = formDataMultiClass.selectedhourWed;
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
	    let time =`${hour}:${minute}:00`;
            let timestr= time.toString();
            formDataMultiClass["classtimeWednesday"]=timestr;
          }

          if (day==="Thursday"){
            let ampm = formDataMultiClass.selectedampmThurs;
            let minute = formDataMultiClass.selectedminuteThurs;
            let hour = formDataMultiClass.selectedhourThurs;
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
	    let time =`${hour}:${minute}:00`;
            let timestr= time.toString();
            formDataMultiClass["classtimeThursday"]=timestr;
          }

          if (day==="Friday"){
            let ampm = formDataMultiClass.selectedampmFri;
            let minute = formDataMultiClass.selectedminuteFri;
            let hour = formDataMultiClass.selectedhourFri;
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
	    let time =`${hour}:${minute}:00`;
            let timestr= time.toString();
            formDataMultiClass["classtimeFriday"]=timestr;
          }

       
	 if (day==="Saturday"){
            let ampm = formDataMultiClass.selectedampmSat;
            let minute = formDataMultiClass.selectedminuteSat;
            let hour = formDataMultiClass.selectedhourSat;
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
	    let time =`${hour}:${minute}:00`;
            let timestr= time.toString();
            formDataMultiClass["classtimeSaturday"]=timestr;
          }


          if (day==="Sunday"){
            let ampm = formDataMultiClass.selectedampmSun;
            let minute = formDataMultiClass.selectedminuteSun;
            let hour = formDataMultiClass.selectedhourSun;
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
	    let time =`${hour}:${minute}:00`;
            let timestr= time.toString();
            formDataMultiClass["classtimeSunday"]=timestr;
          }


}





const CreateMeetingForm=(props)=>{

   const [time, setTime] = useState({
      hour:"hh",
      minute:"mm",
      ampm:"AM"
     });

   const initialFormDataSingleClass = Object.freeze({
        meetingStatus: "scheduled",
        meetingdate: null,
	datetime: null, //"2022-12-03T03:15:00Z",
        meetingtime: "00:00:00",
        duration: null,
        meetingLink: "",
        address: "",
        topics: [],
	topicIds:[],
	about: null,
	creater:props.userData.id,
	courseId: null,
	serialNo: null,
        });

    const [formDataSingleClass, updateFormDataSingleClass] = useState(initialFormDataSingleClass);

    const [optionalSettings, showOptionalSettings] = useState(false);

    const [showSyllabusTopics, setShowSyllabusTopics] = useState(false);

    const handleChangeSingleClass = (e) => {

	//console.log("name, value: ", e.target.name,"---",e.target.value);    
	   
       if(e.target.name !=="about"){
        updateFormDataSingleClass({
                        ...formDataSingleClass,
                        [e.target.name]: e.target.value.trim(),
                });
           }

        if(e.target.name==="about"){
            updateFormDataSingleClass({
                        ...formDataSingleClass,
                        [e.target.name]: e.target.value,
                });

	}


    }

   

    const [showSingleClassForm, setSingleClassForm] = useState(true);

    const [formSubmissionStatus, setFormSubmissionStatus] = useState('notSubmitted');

    const handleSubmit = (e) => {
	   e.preventDefault();

          if(time.hour === "hh"){
             alert('please select hour ');
	     return null;
          }

          if(time.minute === "mm"){
             alert('please select minute ');
	      return null;
          }


          if((formDataSingleClass.meetingdate === null)){
             alert('please select date');
                        return null;
          }

     
	   if(formDataSingleClass.duration===null){
             alert('please enter duration');
                        return null;
          }

             
          console.log("meetingdate",formDataSingleClass.meetingdate);

          let year = formDataSingleClass.meetingdate.split('-')[0];
	  let month = formDataSingleClass.meetingdate.split('-')[1];
	  let day = formDataSingleClass.meetingdate.split('-')[2];

	  console.log("day: ", day);
          let ampm = time.ampm;
	  let minute = time.minute;
	  let hour = time.hour;  

          let utcTime=convertToUtcTime({year, month, day, hour, minute, ampm});
          
          let utcTimeTZformat = utcTime.split(" ")[0]+"T"+utcTime.split(" ")[1]+"Z";

	  console.log("UTC Time: ", utcTimeTZformat);

          formDataSingleClass["datetime"] = utcTimeTZformat;

	  let userId=props.userData.id; 
          //let meetingLink_ = meetingbasewebURL+`/video/meet.${userId}.${Date.now()}.${Math.random()*100 }`;

          //let userId=props.userData.id;
          let meetingLink_ = `https://meet.diracai.com/x${userId}y${Date.now()}z`;


          formDataSingleClass["meetingLink"]= meetingLink_;

          setFormSubmissionStatus("Submitting");
          console.log("formData before submission: ", formDataSingleClass);
          //createnewclass({formDataSingleClass, props, setFormSubmissionStatus});
           //createnewmeetingpersonal({formDataSingleClass});	
	  createonemeeting({formDataSingleClass, props});
	};
   




    const [formButton1Style,setFormButton1Style]=useState({
      backgroundColor:'var(--themeColor)',
      color:'white'	    

    });

    const [formButton2Style,setFormButton2Style]=useState({
      backgroundColor:'lightgrey',
      color:'grey'

    });




    const singleClassHandler=()=>{

       setSingleClassForm(true);
       setFormButton1Style({
         backgroundColor:'var(--themeColor)',
         color:'white'
       });

       setFormButton2Style({
          backgroundColor:'lightgrey',
          color:'grey'
       });

    }


    const multiClassHandler=()=>{

       setSingleClassForm(false);
       setFormButton1Style({
          backgroundColor:'lightgrey',
          color:'grey'
       });

       setFormButton2Style({
          backgroundColor:'var(--themeColor)',
          color:'white'
       });


    }







   //Multi Class Details

    const [formDataMultiClass, updateFormDataMultiClass] = useState(initialFormDataSingleClass);



    const [creating, setCreating] = useState(false);

    const [checkedMon, setCheckedMon] = useState(false);
    const [checkedTues, setCheckedTues] = useState(false);
    const [checkedWed, setCheckedWed] = useState(false);
    const [checkedThurs, setCheckedThurs] = useState(false);
    const [checkedFri, setCheckedFri] = useState(false);
    const [checkedSat, setCheckedSat] = useState(false);
    const [checkedSun, setCheckedSun] = useState(false);


    const handleChangeMulti=(e)=>{
     //console.log("name, value: ", e.target.name,"---",e.target.value," checkedMon",checkedMon, "--checkedT",checkedTues);

     updateFormDataMultiClass({
                        ...formDataMultiClass,
                        [e.target.name]: e.target.value.trim(),
                });
     }


    const handleSubmitMulti=(e)=>{
      e.preventDefault();
      console.log("multi class form: ", formDataMultiClass)

      if(!("classDateStart" in formDataMultiClass)){
            alert('please select start date');
                        return null;
          }

      if(!("classDateEnd" in formDataMultiClass)){
            alert('please select end date');
                        return null;
          }


      formDataMultiClass["checkedMon"]=checkedMon;
      formDataMultiClass["checkedTues"]=checkedTues;
      formDataMultiClass["checkedWed"]=checkedWed;
      formDataMultiClass["checkedThurs"]=checkedThurs;
      formDataMultiClass["checkedFri"]=checkedFri;
      formDataMultiClass["checkedSat"]=checkedSat;	    
      formDataMultiClass["checkedSun"]=checkedSun;


      if( checkedMon && !("selectedhourMon" in formDataMultiClass)){alert('please class hour');return null;}
      if( checkedMon && !("selectedminuteMon" in formDataMultiClass)){alert('please class minute');return null;}
      if( checkedMon && !("selectedampmMon" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedMon && !("selecteddurationMon" in formDataMultiClass)){alert('please select class duration.');return null;}
   
      if( checkedTues && !("selectedhourTues" in formDataMultiClass)){alert('please class hour');return null;}
      if( checkedTues && !("selectedminuteTues" in formDataMultiClass)){alert('please class minute');return null;}
      if( checkedTues && !("selectedampmTues" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedTues && !("selecteddurationTues" in formDataMultiClass)){alert('please select class duration.');return null;}	    

      if( checkedWed && !("selectedhourWed" in formDataMultiClass)){alert('please class hour');return null;}
      if( checkedWed && !("selectedminuteWed" in formDataMultiClass)){alert('please class minute');return null;}
      if( checkedWed && !("selectedampmWed" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedWed && !("selecteddurationWed" in formDataMultiClass)){alert('please select class duration.');return null;}

      if( checkedThurs && !("selectedhourThurs" in formDataMultiClass)){alert('please class hour');return null;}
      if( checkedThurs && !("selectedminuteThurs" in formDataMultiClass)){alert('please class minute');return null;}
      if( checkedThurs && !("selectedampmThurs" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedThurs && !("selecteddurationThurs" in formDataMultiClass)){alert('please select class duration.');return null;}

      if( checkedFri && !("selectedhourFri" in formDataMultiClass)){alert('please class hour');return null;}
      if( checkedFri && !("selectedminuteFri" in formDataMultiClass)){alert('please class minute');return null;}
      if( checkedFri && !("selectedampmFri" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedFri && !("selecteddurationFri" in formDataMultiClass)){alert('please select class duration.');return null;}

      if( checkedSat && !("selectedhourSat" in formDataMultiClass)){alert('please class hour');return null;}
      if( checkedSat && !("selectedminuteSat" in formDataMultiClass)){alert('please class minute');return null;}
      if( checkedSat && !("selectedampmSat" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedSat && !("selecteddurationSat" in formDataMultiClass)){alert('please select class duration.');return null;}
 
      if( checkedSun && !("selectedhourSun" in formDataMultiClass)){alert('please class hour');return null;}
      if( checkedSun && !("selectedminuteSun" in formDataMultiClass)){alert('please class minute');return null;}
      if( checkedSun && !("selectedampmSun" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedSun && !("selecteddurationSun" in formDataMultiClass)){alert('please select class duration.');return null;}


      if(checkedMon){
	      let day="Monday";
	      convertAndAddto24hourFormat({formDataMultiClass,day});
      }


      if(checkedTues){
              let day="Tuesday";
              convertAndAddto24hourFormat({formDataMultiClass,day});
      }

     if(checkedWed){
              let day="Wednesday";
              convertAndAddto24hourFormat({formDataMultiClass,day});
      }


     if(checkedWed){
              let day="Wednesday";
              convertAndAddto24hourFormat({formDataMultiClass,day});
      }


      if(checkedThurs){
              let day="Thursday";
              convertAndAddto24hourFormat({formDataMultiClass,day});
      }


      if(checkedFri){
              let day="Friday";
              convertAndAddto24hourFormat({formDataMultiClass,day});
      }


      if(checkedSat){
              let day="Saturday";
              convertAndAddto24hourFormat({formDataMultiClass,day});
      }


     if(checkedSun){
              let day="Sunday";
              convertAndAddto24hourFormat({formDataMultiClass,day});
      }

      setCreating(true);
      //createmulticlass({formDataMultiClass,setCreating});
      //console.log("starting to create");
      //props.onPress();

    }



    const handleChange=()=>{


    }


    


    const showOptionalSettingsHandler=()=>{

      showOptionalSettings(optionalSettings=>!optionalSettings);

    }





    let options = [{"id":1,name:"Concepts of Physics"}];


    let durationOptions = [{"id":10, name:"10 mins"}, 
	                   {"id":15, name:"15 mins"},
	                   {"id":25, name:"25 mins"},
	                   {"id":30, name:"30 mins"},
	                   {"id":35, name:"35 mins"},
	                   {"id":40, name:"40 mins"},
	                   {"id":45, name:"45 mins"},
	                   {"id":50, name:"50 mins"},
	                   {"id":55, name:"55 mins"},
	                   {"id":60, name:"60 mins"},
	                   {"id":65, name:"65 mins"},
	                   {"id":70, name:"70 mins"},
                          ]

    let serialOptions = [ {"id":1, name:"1"}, 
	                  {"id":2, name:"2"},
	                  {"id":3, name:"3"}, 
	                  {"id":4, name:"4"},
	                  {"id":5, name:"5"},
                          {"id":6, name:"6"},
	                  {"id":7, name:"7"},
	                  {"id":8, name:"8"},
	                  {"id":9, name:"9"},
	                  {"id":10, name:"10"},
	                  {"id":11, name:"11"},
	                  {"id":12, name:"12"},
                          {"id":13, name:"13"}, 
                          {"id":14, name:"14"},
                          {"id":15, name:"15"},
                          {"id":16, name:"16"},
                          {"id":17, name:"17"},
                          {"id":18, name:"18"},
                          {"id":19, name:"19"},
                        ]






   
    const searchId = props.userData.id;






    console.log("formDataSingleClass: ", formDataSingleClass);





return(

<div className={classes.createTicketFormDivParent}>

         { /*creating &&  
	   <div className={classes.createTicketFormLoading}>
	   <FadeLoader color={color} loading={loading} css={""} size={50}  />	   
	   <div className={classes.submittingDiv}> Creating . . . </div>
           </div>
         */}

   { !creating  &&  

   <div className={classes.createTicketForm}>

          <div className={classes.closeButtonDiv}>
                 <button onClick={props.onPress} 
	                 className={classes.closeFormButton}> 
	                 <AiFillCloseCircle className={classes.closeButtonIcon}/> 
	         </button>
          </div>

          <div className={classes.logoAndTitleContainer}>
		  <Logo/>
                  <div className={classes.formTitleDiv}>
		       <i>  Create </i>
		  </div>
          </div>

          { /* props.selectedCourse !==null && props.selectedCourse.length===0 && <div className={classes.noCourseWarning}>

                  Please goback and select a course before creating class
	          </div>
	  */}

          <div className={classes.singleNMultiFormOption}>
              <button className={classes.singleClass} onClick={singleClassHandler} style={formButton1Style}> <h3> Single meeting</h3> </button>
              <button className={classes.multiClass} onClick={multiClassHandler} style={formButton2Style}> <h3> Multiple meetings</h3> </button>
          </div>
         
        
       {  showSingleClassForm &&  

	 <form className={classes.formElement1} onSubmit={handleSubmit}>
      
           <TextInput label="Meeting title"
	                       requirement="*"
                               name="name"
                               handleChange={handleChangeSingleClass}
                               placeholder="Weekly progress update"
                               width="100%"
                               />



            <div className={classes.firstFieldBlock}>                    
	           <CustomTimePicker time={time} setTime={setTime} width="200px" requirement="*"/>
	           <div style={{width:"20px"}}>  </div>
                   <OptionField requirement="*"
                                label = "Duration"
                                name = "duration"
                                defaultValue = "no value"
                                options = {durationOptions}
                                handleChange = {handleChangeSingleClass}
                                width="200px"
                                />
	    </div>   
            
            <div className={classes.firstFieldBlock}>
                  <DateField handleChange={handleChangeSingleClass}
                              label="Date"
                              name="meetingdate"
                              placeholder="Enter a date"
                              requirement="*"
                              width="200px"
                              />
            </div>



        

         

            <button type="button" className={classes.optionalSettings} onClick={showOptionalSettingsHandler}>
	       <div className={classes.optionSettingDiv}> Optional Settings </div>
	       <div className={classes.optionSettingButton}> 
	        {  !optionalSettings &&  <BsChevronDown/>  }
	        { optionalSettings && <BsChevronUp/>}
	       </div>
	    </button>


            { optionalSettings &&

                   <div className={classes.optionalSettingDiv}>
		        <TextInput label="Address" 
		               name="address"
		               handleChange={handleChangeSingleClass}
		               placeholder="D429, Dogra Hall"
		               width="200px"
		               />


                   </div>

	    }




            { optionalSettings &&

	      <div style={{marginTop:"30px"}}>		    
               <ParagraphField label="About the meeting" 
                       name="about"  
                       placeholder="Short description..."  
                       handleChange={handleChangeSingleClass}
                       defaultValue=""
                       />   
              </div>

	    }
	      

        



	     {/*
               <TimeField handleChange={handleChangeSingleClass} 
		       label="Time" 		     
		       selectedhour = "selectedhour"
		       selectedminute = "selectedminute"
		       selectedampm = "selectedampm"
		       placeholder="Enter a time" 
	               requirement="*"
		       />	 
            */}

             { formSubmissionStatus ==="notSubmitted" &&
              <div className={classes.submitButtonDiv}>
                  <button type="submit"  className= {classes.submit_button} ><b>Create </b> </button>
              </div>
	     }


             { formSubmissionStatus ==="Submitting" &&
              <div className={classes.submitButtonDiv}>
                  <button type="submit"  className= {classes.submit_button} disabled={true} ><b>Creating... </b> </button>
              </div>
             } 




           </form>
         }


         { !showSingleClassForm &&  
	  <form className={classes.formElement1} onSubmit={handleSubmitMulti}>

	     <div className={classes.multiClassInfo}> 
		First set the classes and time for a week. 
		Then you can choose to repeat same pattern for several weeks.  
	     </div>  		   

             <div style={{width:'200px'}}>
             <DateField handleChange={handleChangeMulti} 
		        label="Choose start date" 
		        name="classDateStart" 
		        placeholder="Enter a date"
		        requirement="*"
			/>
             </div>
            <div className={classes.dayFieldContainer}>

             <DayField handleChange={handleChangeMulti} 
		   label="Monday" 
		   selectedhour = "selectedhourMon"
                   selectedminute = "selectedminuteMon"
                   selectedampm = "selectedampmMon"
		   selectedduration = "selecteddurationMon"
		   setChecked = {setCheckedMon}
			   />
             <DayField handleChange={handleChangeMulti} 
		   label="Tuesday" 
		   selectedhour = "selectedhourTues"
                   selectedminute = "selectedminuteTues"
                   selectedampm = "selectedampmTues"
		   selectedduration = "selecteddurationTues"
		   setChecked = {setCheckedTues}
			   />

              <DayField handleChange={handleChangeMulti}
                   label="Wednesday"
                   selectedhour = "selectedhourWed"
                   selectedminute = "selectedminuteWed"
                   selectedampm = "selectedampmWed"
                   selectedduration = "selecteddurationWed"
                   setChecked = {setCheckedWed}
                           />


               <DayField handleChange={handleChangeMulti}
                   label="Thursday"
                   selectedhour = "selectedhourThurs"
                   selectedminute = "selectedminuteThurs"
                   selectedampm = "selectedampmThurs"
                   selectedduration = "selecteddurationThurs"
                   setChecked = {setCheckedThurs}
                           />

               <DayField handleChange={handleChangeMulti}
                   label="Friday"
                   selectedhour = "selectedhourFri"
                   selectedminute = "selectedminuteFri"
                   selectedampm = "selectedampmFri"
                   selectedduration = "selecteddurationFri"
                   setChecked = {setCheckedFri}
                           />
               

                <DayField handleChange={handleChangeMulti}
                   label="Saturday"
                   selectedhour = "selectedhourSat"
                   selectedminute = "selectedminuteSat"
                   selectedampm = "selectedampmSat"
                   selectedduration = "selecteddurationSat"
                   setChecked = {setCheckedSat}
                           />

                <DayField handleChange={handleChangeMulti}
                   label="Sunday"
                   selectedhour = "selectedhourSun"
                   selectedminute = "selectedminuteSun"
                   selectedampm = "selectedampmSun"
                   selectedduration = "selecteddurationSun"
                   setChecked = {setCheckedSun}
                           />


                </div>

	   <div style={{width:'200px'}}>		
           <DateField handleChange={handleChangeMulti} 
		label="Choose end date" 
		name="classDateEnd" 
		placeholder="Enter a date" 
		requirement="*"
		/>
		
           </div>

             <div className={classes.submitButtonDiv}>
                <button type="submit"  className= {classes.submit_button} ><b>Create </b> </button>
             </div>

           </form>
          }

   </div>



  }{/* not creating */}

</div>	
);

}


export default CreateMeetingForm;
