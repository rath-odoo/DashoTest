import React,{useState, useEffect} from "react";
import classes from "./CreateCourseForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../../../../CommonApps/BWlogo.JPG'
import {OptionField,OptionFieldSubmitValue,OptionFieldSecondaryObjs, ParagraphField,TextInput, DateField} from './FormInputObjects';
import {getclassobjectbyId, getclassrank,createcourse,getuser,getsubjectsfromclassandboard} from '../../../../../../CommonApps/AllAPICalls';
//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";


/*const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;*/



const CreateCourseForm=(props)=>{


//const [loading, setLoading] = useState(true);
//const [color, setColor] = useState(" var(--themeColor)");

const [data, setData] = useState({});
const [classId, setClassId]=useState(0);
const [classObject, setClassObject ] = useState({
    "id": 1,
    "name": "Class-11",
    "boardofeducation": []
});


const [classRank, setClassRank] = useState([{"id": 99999999,"name": "Unable to fetch ticket category"}]);

const [selectedBoardName, setSelectedBoardName] = useState("");

const [subjectsObject,setSubjectsObject] = useState([{name:null}]);


const [formSubmitted,setFormSubmitted] = useState(false);



  useEffect(() =>{
      getclassobjectbyId({classId ,setClassObject});
  },[classId]);

  // console.log('class Obj outside: ',classObject.boardofeducation);

  useEffect(() =>{
     getclassrank({setClassRank});
  },[])


  useEffect(()=>{
     getuser({setData});
  },[]);


 useEffect(()=>{

     let boardId=selectedBoardName;
     getsubjectsfromclassandboard({classId,boardId,setSubjectsObject});
 },[classId, selectedBoardName]);


//console.log('subjects',subjectsObject);


const initialFormData = Object.freeze({

         
        courseShortName: "",
        courseFullName: "",
        courseGlobalCode: "321221",
        courseLocalCode: "",
        courseStatus: "ongoing",
        courseStartDate: "",
        courseEndDate: "",

        classname: null,
        educationboard: "",
        subject: "",

        abouttheCourse: "",
        instituteName: "",
        instituteCity: "BBSR",
        instituteCountry: "India",

        });



const [formData, updateFormData] = useState(initialFormData)

const handleChange1 = (e) => {
        //console.log('classname', e.target.value);
	setClassId(classId=>e.target.value);
        updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
        };




const handleChange2 = (e) => {
	setSelectedBoardName(e.target.value);
	updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });

}



const handleChange = (e) => {
        updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
}




//const [showForm, setShowForm] = useState(true);



const handleSubmit = (e) => {
	   e.preventDefault();
	   //setShowForm(false);
	   
          if(formData.classname===null){
		  alert('please enter classname');
		  return null;
	  }

          if(formData.educationbard===""){
                  alert('please enter name of the board');
                  return null;
          }


	  if(formData.subject===""){
                  alert('please choose a subject');
                  return null;
          }

          if(formData.courseLocalCode===""){
                  alert('please enter a code');
                  return null;
          }


          if(formData.courseShortName===""){
                  alert('please enter a name of the course');
                  return null;
          }


          if(formData.courseStartDate===""){
              alert('please enter start date');
                  return null;

	  }

          if(formData.courseEndDate===""){
              alert('please enter end date');
                  return null;

          }

          if(formData.abouttheCourse===""){
             alert('please enter end date');
                  return null;

	  }



          if(formData.instituteName===""){
                  alert('please enter name of the institute');
                  return null;
          }






         //setTimeout(() => {console.log('Hello, World!')}, 5000);
        // setShowForm(false);

         createcourse({formData, data});
	 //alert("Succssfully submitted");
	 //window.location.reload(true);
	 alert("Successfully submitted");
	  // setShowForm(true);

         props.onPress();

         setFormSubmitted(!formSubmitted);


	//return new Promise(resolve => {
        //    setTimeout(() => {
        //        resolve();
        //    }, 2000);
        //});
	
	
	};








return(

<div className={classes.createTicketFormDivParent}>

   {/*!showForm &&  
	   <div className={classes.createTicketFormLoading}>

	   <FadeLoader color={color} loading={loading} css={""} size={50}  />
	    
	   <div className={classes.submittingDiv}> Creating . . . </div>
           </div>
   */}


   { 	
  <form className={classes.createTicketForm} onSubmit={handleSubmit}>

     {/*form close button below*/}	
    <div className={classes.closeButtonDiv}>
        <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
    </div>	

 
     {/*logo and field title container below*/}
    <div className={classes.logoAndTitleContainer}>
	  <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
           <div className={classes.formTitleDiv}><i>  Create a course </i></div>
    </div>



       <OptionField handleChange={handleChange1}  label="Choose Class" name="classname"  options={classRank}/>


      
       <OptionFieldSecondaryObjs handleChange={handleChange2}  label="Choose Board" name="educationboard"  options={classObject.boardofeducation}/>
       
 
       <OptionFieldSubmitValue handleChange={handleChange}  label="Choose Subject" name="subject"  options={subjectsObject}/>       


       <TextInput handleChange={handleChange} label="Assign a Codename" placeholder="Enter a code e.g. QM-231" name="courseLocalCode"/>

       <TextInput handleChange={handleChange} label="Short name of the course" placeholder="e.g. Quantum Mechanics-I" name="courseShortName"/>


       <TextInput handleChange={handleChange} label="Write full name of the course" placeholder="e.g. Elementary Quantum Mechanics of Practical Atomic Systems" name="courseFullName"/>


       <DateField handleChange={handleChange} label="Start date" name="courseStartDate" placeholder="Enter course start date"   />

       <DateField handleChange={handleChange} label="End date" name="courseEndDate" placeholder="Enter course end date"   />

       <ParagraphField label="About the course" name="abouttheCourse"  placeholder="Few words about the course"  handleChange={handleChange} />	


       <TextInput handleChange={handleChange} label="Write name of your institute" placeholder="e.g. IIT BBSR" name="instituteName"/>

 
 




    <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Create </b> </button>

    </div>






    <div className={classes.emptyDiv}>



     dshdfjhd sdns dasd ashda sdhasd asdjas djasd asdas da asd asd
     asd asda asdb sadasdj dDMNASD ASDNBSAD ASDNBADS ADSNBA Dsj dn
     dcnd ASDNAS DJASD AJSDA DBASD ASDB SADBSA dasjdnbqww dwbdw dd


    </div>
  </form>

   }


</div>	
);

}


export default CreateCourseForm;
