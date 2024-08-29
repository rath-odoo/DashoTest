import React,{useState} from "react";
import classes from "./CreateClassForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";

import {BsChevronDown, BsChevronUp} from 'react-icons/bs';

import Logo from '../../../../../../../CommonApps/Logo';
import {  OptionField,
	  OptionFieldCourses,
	  ParagraphField,
	  DateField,
	  TimeField,DayField, CustomTimePicker, TextInput } from '../../../../../../../CommonApps/FormInputObjects';
	  

import {meetingbasewebURL} from '../../../../../../../basewebURL';



import {editoneclassinfo} from '../../../../../../../CommonApps/AllAPICalls';



import SyllabusTopics from './SyllabusTopics';

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






//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";


/*const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
*/





const CreateCourseForm=(props)=>{

  let datetime = props.oneClass.datetime;

  let classTime = formatLocalTime({datetime});

  console.log("classTime: ", classTime);

   const [time, setTime] = useState({
      hour: classTime.hour,
      minute: classTime.minute,
      ampm:classTime.amPm
     });

   const initialFormDataSingleClass = Object.freeze({
	syllabusId: props.oneClass.syllabusId,
	courseId: props.oneClass.courseId,
        serialNo: props.oneClass.serialNo,
        status: props.oneClass.status,
        classdate: null,
	datetime: null, //"2022-12-03T03:15:00Z",
        classtime: "00:00:00",
        duration: props.oneClass.duration,
        meetingLink: props.oneClass.meetingLink,
        address: props.oneClass.address,
        topics: props.oneClass.topics,
	topicIds:[],
	about: props.oneClass.about
        });



    const [formDataSingleClass, updateFormDataSingleClass] = useState(initialFormDataSingleClass);


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


    const [editState, setEditState] = useState("notSubmitted");


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


          if((formDataSingleClass.classtime === null)){
             alert('please select class time');
              return null;
          }


          if((formDataSingleClass.classdate === null)){
             alert('please select date');
                        return null;
          }

     
	   if(formDataSingleClass.duration===null){
             alert('please enter duration');
                        return null;
          }

          // if(( formDataSingleClass.serialNo === null)){
          //    alert('please select lecture no');
          //    return null;
          // }


          if(formDataSingleClass.courseIdsyllabusId === null){
            alert('Some select a course .');
            return null;
          }

          formDataSingleClass["courseId"] = formDataSingleClass.courseIdsyllabusId;
             
          console.log("classdate",formDataSingleClass.classdate);

          let year = formDataSingleClass.classdate.split('-')[0];
	  let month = formDataSingleClass.classdate.split('-')[1];
	  let day = formDataSingleClass.classdate.split('-')[2];

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
          setFormSubmissionStatus("Submitting");
	    let classId = props.oneClass.id;
           editoneclassinfo({formDataSingleClass,classId, props, setEditState });


	};
   




       const [creating, setCreating] = useState(false);



      const handleChange=()=>{


      } 




    const showSyllabusTopicsHandler=()=>{

       console.log("switch clicked");

       {  formDataSingleClass.syllabusId === null &&
           alert("please select a course first");
	    
       }


       {  formDataSingleClass.syllabusId !==null &&

		console.log("switch clicked");      
          setShowSyllabusTopics(showSyllabusTopics=>true);
       }

    }







    const closeSyllabusTopicsHandler=()=>{

      setShowSyllabusTopics(showSyllabusTopics=>false);

    }



    let options = [{"id":1,name:"Concepts of Physics"}];



   let statusOptions =[{"id":"scheduled", name:"scheduled"},
	               {"id":"postponed", name:"postponed"},
	               {"id":"cancelled", name:"cancelled"},
	               {"id":"completed", name:"completed"},
                      ]




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







    let allCourses = props.userData.dashboard_courses;

   
    const searchId = props.userData.id;




   const result = allCourses.filter(obj =>
    Object.values(obj).some(value =>
        value &&
        (Array.isArray(value) ? value.some(item => item && item.id === searchId) : value.id === searchId)
       )
   );


    console.log("oneClass inside class edit form: ", props.oneClass);





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
		       <i>  Edit class Id: {"# "+props.oneClass.id} </i>
		  </div>
          </div>


	  <div style={{width:"80%",margin:"auto",color:"var(--themeColor)"}}> Associated course: {props.oneClass.courseName} </div>	   

          { /* props.selectedCourse !==null && props.selectedCourse.length===0 && <div className={classes.noCourseWarning}>

                  Please goback and select a course before creating class
	          </div>
	  */}

          <div className={classes.singleNMultiFormOption}>
          </div>
         
        
       {  showSingleClassForm &&  

	 <form className={classes.formElement1} onSubmit={handleSubmit}>
       
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
                              name="classdate"
                              placeholder="Enter a date"
                              requirement="*"
                              width="200px"
                              />
                  <OptionField requirement="*"
                                label = "Status"
                                name = "status"
                                defaultValue = {formDataSingleClass.status}
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


           {/*
	   <div className={classes.firstFieldBlockLong}>
	           <OptionFieldCourses requirement="*" 
	                        label="Choose course" 
	                        name="courseIdsyllabusId"
	                        defaultValue="No Course"
	                        options={result}
	                        handleChange={handleChangeSingleClass}
	                        />	       
           </div>
           */}

           <button type="button" className={classes.chooseTopicForClassDiv} onClick={showSyllabusTopicsHandler}>
                      Select topics to be taught
           </button>


           { showSyllabusTopics  && formDataSingleClass.syllabusId !==null &&
                 <SyllabusTopics onPress={closeSyllabusTopicsHandler}
                                 syllabusId={formDataSingleClass.syllabusId}
                                 updateFormDataSingleClass={updateFormDataSingleClass}
                                 formDataSingleClass={formDataSingleClass}
                                  />
           }
 


        
            <div className={classes.selTopicsParentDiv}>
                  <div className={classes.selTopicTitle}> Selected Topics  </div>

                 {formDataSingleClass.topics.length === 0  &&


                   <div className={classes.noTopicsSelMessage}> No topics selected!  </div>

		 }

                 { formDataSingleClass.topics.map((topic, index)=>{

                          return <div key={index} className={classes.selectedTopicDiv}>
                                      {topic.name}
                                 </div>
                           })
                 }
            </div>

         




                   <div className={classes.optionalSettingDiv}>
		        <TextInput label="Address" 
		               name="address"
		               handleChange={handleChangeSingleClass}
		               placeholder="D429, Dogra Hall"
	                       defaultValue={formDataSingleClass.address}
		               width="200px"
		               />

                   <div style={{width:"20px"}}>  </div>

                         <OptionField requirement=""
                                label = "Class No"
                                name = "serialNo"
                                defaultValue = {formDataSingleClass.serialNo}
                                options = {serialOptions}
                                handleChange = {handleChangeSingleClass}
                                width = "200px"
                                />
                   </div>






	      <div style={{marginTop:"30px"}}>		    
               <ParagraphField label="About the class" 
                       name="about"  
                       placeholder="Short description..."  
                       handleChange={handleChangeSingleClass}
                       defaultValue={formDataSingleClass.about}
                       />   
              </div>

	      

        



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
                  <button type="submit"  className= {classes.submit_button} ><b>Save </b> </button>
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


export default CreateCourseForm;
