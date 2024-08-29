import React,{useState, useEffect} from "react";
import classes from './EnrollForm.module.css'
import {AiFillCloseCircle} from "react-icons/ai";
//import {BsCheckLg} from 'react-icons/bs';
import logoImage from '../../../../../CommonApps/BWlogo.JPG'
import {TextInput} from './EnrollFormInput';

import {putcourseenrollrequest, getuser} from '../../../../../CommonApps/AllAPICalls';



const EnrollForm =(props)=>{


const initialFormData = Object.freeze({
    enrollmessage: "",

        });


const [formData, updateFormData] = useState(initialFormData)
//const [enrollmentcourseId,setEnrollmentcourseId] = useState(props.Course.enrolementrequests);

let enrollmentcourseId = props.Course.enrolementrequests;

const [data, setData] = useState({});


const [enrolled, setEnrolled] = useState(false);





const [buttonStyle, setButtonStyle] = useState({
	text:'Send',
        disable: false,
	bkgColor: 'var(--themeColor)',
	displayTextArea: true,
});



useEffect(()=>{
     getuser({setData});
  },[]);




const handleSubmit=(e)=>{
e.preventDefault();
let courseId = props.Course.id;	
let userId = data.id;	
enrollmentcourseId.push(userId);	
putcourseenrollrequest({courseId, enrollmentcourseId});
setButtonStyle({
 text:'Sent',
        disable: true,
        bkgColor: 'grey',
        displayTextArea: false,
});

setTimeout(() => {
    closeFormHandler(e);	
  }, 2000);

}

const closeFormHandler=(e)=>{
e.preventDefault();
props.onPress();
}


const handleChange =(e)=>{
  updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
}




useEffect(()=>{

if(props.Course.enrolled_students.includes(data.id)){
setEnrolled(enrolled=>true);

}

},[data.id, props.Course.enrolledstudents]);




return (

<div className={classes.enrollFormParent}>



  <form className={classes.enrollForm} onSubmit={handleSubmit}>

    <div className={classes.closeButtonDiv}>
        <button onClick={closeFormHandler} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
    </div>


    <div className={classes.logoAndTitleContainer}>
          <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
           <div className={classes.formTitleDiv}><i>  Send enrollment request </i></div>
    </div>

    <div className={classes.courseInfo}> 
      <div>  CODE: {props.Course.courseGlobalCode}  </div>

      <div> INSTRUCTOR:{props.Course.teacher}  </div>

    </div>


    { buttonStyle.displayTextArea &&  !props.Course.enrolementrequests.includes(data.id) &&

   <TextInput 
	handleChange={handleChange} 
	label="Write message" 
	placeholder="I would like to enroll in your course. Please approve. Thanks, John" 
	name="enrollmessage"
	/>

    }

    {
      props.Course.enrolementrequests.includes(data.id) && !enrolled && 

       <div style={{padding: '20px'}}>
          Request Already Sent
       </div>
       
    }


   {
      enrolled &&

       <div style={{padding: '20px'}}>
          You are enrolled in this course
       </div>

    }






    { !props.Course.enrolementrequests.includes(data.id) &&
    <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} disabled={buttonStyle.disable} style={{backgroundColor: buttonStyle.bkgColor}}>
	    <b>{buttonStyle.text} </b> 
	  </button>

    </div>
    }


   

   { props.Course.enrolementrequests.includes(data.id) &&
    <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} disabled={true} style={{backgroundColor: buttonStyle.bkgColor}}>
            <b>Cancel </b>
          </button>

    </div>
    }






  </form>






</div>

);

}
export default EnrollForm;
