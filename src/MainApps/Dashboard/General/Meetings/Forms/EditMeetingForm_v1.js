import React,{useState} from "react";
import classes from "./CreateMeetingForm_v1.module.css";
import {AiFillCloseCircle} from "react-icons/ai";

import {BsChevronDown, BsChevronUp} from 'react-icons/bs';

import Logo from '../../../../../CommonApps/Logo';
import {  OptionField,
	  OptionFieldCourses,
	  ParagraphField,
	  DateField,
	  TimeField,DayField, CustomTimePicker, TextInput } from '../../../../../CommonApps/FormInputObjects';
import { putmeetinginfo } from '../../../../../CommonApps/AllAPICalls';

import {meetingbasewebURL} from '../../../../../basewebURL';




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

const formatLocalTime = ({ datetime }) => {
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = new Date(datetime);
    const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));

    const hour = localDate.toLocaleString('en-US', {
        hour: 'numeric',
        hour12: true,
    }).split(' ')[0];


    const minute = localDate.toLocaleString('en-US', {
        minute: 'numeric',
    });

    const amPm = localDate.toLocaleString('en-US', {
        hour12: true,
        hour: 'numeric',
    }).slice(-2).toUpperCase();

    return {
        hour,
        minute,
        amPm,
    };
};





const CreateMeetingForm=(props)=>{


  let datetime = props.oneMeeting.datetime;

  let meetingTime = formatLocalTime({datetime});


   const [time, setTime] = useState({
      hour: meetingTime.hour,
      minute: meetingTime.minute,
      ampm: meetingTime.amPm
     });



   const initialFormDataSingleClass = Object.freeze({
	name:props.oneMeeting.name,
        meetingStatus: props.oneMeeting.meetingStatus,
        meetingdate: null,
	datetime: null, //"2022-12-03T03:15:00Z",
        meetingtime: "00:00:00",
        duration: props.oneMeeting.duration,
        meetingLink: props.oneMeeting.meetingLink,
        address: props.oneMeeting.address,
        topics: [],
	topicIds:[],
	about: props.oneMeeting.about,
	creater:props.oneMeeting.creater.id,
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
          let meetingLink_ = meetingbasewebURL+`/video/meet.${userId}.${Date.now()}.${Math.random()*100 }`;

          formDataSingleClass["meetingLink"]= meetingLink_;

	  let meetingid= props.oneMeeting.id;   
          setFormSubmissionStatus("Submitting");
          console.log("formData before submission: ", formDataSingleClass);
          putmeetinginfo({meetingid, formDataSingleClass, props});

          //createnewclass({formDataSingleClass, props, setFormSubmissionStatus});
           //createnewmeetingpersonal({formDataSingleClass});	
	  //createonemeeting({formDataSingleClass, props});
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




    const handleChange=()=>{


    }


    


    const showOptionalSettingsHandler=()=>{

      showOptionalSettings(optionalSettings=>!optionalSettings);

    }


     let statusOptions =[{"id":"scheduled", name:"scheduled"},
                       {"id":"postponed", name:"postponed"},
                       {"id":"cancelled", name:"cancelled"},
                       {"id":"completed", name:"completed"},
                      ]




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






   
  //  const searchId = props.userData.id;











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
		       <i>  Edit Meeting, Id : {props.oneMeeting.id} </i>
		  </div>
          </div>

          { /* props.selectedCourse !==null && props.selectedCourse.length===0 && <div className={classes.noCourseWarning}>

                  Please goback and select a course before creating class
	          </div>
	  */}

         
        
       {  showSingleClassForm &&  

	 <form className={classes.formElement1} onSubmit={handleSubmit}>
      
           <TextInput label="Meeting title"
	                       requirement="*"
                               name="name"
                               handleChange={handleChangeSingleClass}
                               placeholder="Weekly progress update"
	                       defaultValue={formDataSingleClass.name}
                               width="100%"
                               />



            <div className={classes.firstFieldBlock}>                    
	           <CustomTimePicker time={time} setTime={setTime} width="200px" requirement="*"/>
	           <div style={{width:"20px"}}>  </div>
                   <OptionField requirement="*"
                                label = "Duration"
                                name = "duration"
                                defaultValue = {formDataSingleClass.duration}
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

                  <OptionField requirement="*"
                                label = "Status"
                                name = "meetingStatus"
                                defaultValue = {formDataSingleClass.meetingStatus}
                                options = {statusOptions}
                                handleChange = {handleChangeSingleClass}
                                width="200px"
                                />



            </div>


            <TextInput label="Meeting Link"
                               name="meetingLink"
                               handleChange={handleChangeSingleClass}
                               placeholder="https://meet.google.comkjsd"
                               defaultValue={formDataSingleClass.meetingLink}
                               width="100%"
                               />




        

         

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
		               defaultValue={initialFormDataSingleClass.address}
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
                       defaultValue={initialFormDataSingleClass.about}
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
                  <button   type="submit"  
		            className= {classes.submit_button}
		            style={{backgroundColor:"var(--themeColor)",
			            color: "white",
				    textDecoration:"none",
				    display: "flex",
				    justifyContent:"center",
				    alignItems: "center"
			          }}
			     >
			        <b>Save </b> 
			     </button>
              </div>
	     }


             { formSubmissionStatus ==="Submitting" &&
              <div className={classes.submitButtonDiv}>
                  <button type="submit"  className= {classes.submit_button} disabled={true} ><b>Saving... </b> </button>
              </div>
             } 




           </form>
         }



   </div>



  }{/* not creating */}

</div>	
);

}


export default CreateMeetingForm;
