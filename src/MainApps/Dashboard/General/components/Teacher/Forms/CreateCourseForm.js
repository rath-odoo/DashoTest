import React,{useState, useEffect, CSSProperties} from "react";
import classes from "./CreateCourseForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import {OptionField, OptionFieldSubmitValue, OptionFieldSecondaryObjs, ParagraphField,TextInput, DateField} from './FormInputObjects';
import {getclassobjectbyId, getclassrank, createcourse,createnewcourse, getuser, getsubjectsfromclassandboard} from '../../../../../../CommonApps/AllAPICalls';
import Logo from '../../../../../../CommonApps/Logo';

//import FadeLoader from "react-spinners/FadeLoader";
import FadeLoader from "react-spinners/BeatLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize:"10px",
};





const CreateCourseForm=(props)=>{


//const [loading, setLoading] = useState(true);
//const [color, setColor] = useState(" var(--themeColor)");

let color="white";

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

 const [ createState, setCreateState] = useState("notCreating");



  useEffect(() =>{
      getclassobjectbyId({classId ,setClassObject});
  },[classId]);


  useEffect(() =>{
     getclassrank({setClassRank});
  },[])


  useEffect(()=>{
     getuser({setData});
  },[]);


 useEffect(()=>{
    
     let boardId=selectedBoardName;
     //console.log("classId:  ",classId);
     //console.log("boardname: ", boardId);	 
     getsubjectsfromclassandboard({classId,boardId,setSubjectsObject});
 },[classId, selectedBoardName]);


  //console.log('subjects:::::::::::::::',subjectsObject[0]);


const initialFormData = Object.freeze({

         
        courseShortName: "",
        courseFullName: "Not Set",
        courseGlobalCode: "321221",
        courseLocalCode: "N/A",
        courseStatus: "ongoing",
        courseStartDate: "2022-10-13",
        courseEndDate: "2022-10-13",

        classname: null,
        educationboard: "",
        subject: "",

        abouttheCourse: "N/A",
        instituteName: "N/A",
        instituteCity: "N/A",
        instituteCountry: "N/A",

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






         setCreateState("Creating");
	  console.log("formData: ", formData);
         //createcourse({formData, data, setCreateState, props});
	 createnewcourse({formData, data, setCreateState, props});
	
	};



   var today = '2022-10-01';//new Date();



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

	   <Logo/>
           <div className={classes.formTitleDiv}><i>  Create a course </i></div>
    </div>


    <div style={{width:"80%"}}>
    <TextInput handleChange={handleChange}
                label="Name of the course"
                placeholder="e.g. Fundamental Concepts of Physics: First Year "
                name="courseShortName"
                requirement="*"
	        defaultValue=""
                />

     </div>


     <div className={classes.optionContainers}>

	       
            <OptionField handleChange={handleChange1}  
	             label="Class" 
	             name="classname"  
	             options={classRank}
	             requirement="*"
	             width="30%"
		     />
              
            
            <OptionFieldSecondaryObjs handleChange={handleChange2}  
	             label="Board" 
	             name="educationboard"  
	             options={classObject.boardofeducation}
	             requirement="*"
	             width="30%"
		     />

            <OptionFieldSubmitValue handleChange={handleChange}  
	             label="Subject" 
	             name="subject"  
	             options={subjectsObject}
	             requirement="*"
	             width="30%"
		     />
             


     </div>

     <div className={classes.optionContainers}>
        <TextInput handleChange={handleChange}
                    label="Institute code"
                    placeholder="e.g. PH-231"
                    name="courseLocalCode"
                    requirement=""
	            defaultValue=""
	            width="30%"
                  />
 
        <DateField handleChange={handleChange} 
	            label="Start date" 
	            name="courseStartDate" 
	            placeholder="Enter course start date"  
	            defaultValue={today}
	            width="30%"
		   />

        <DateField handleChange={handleChange} 
	            label="End date" 
	            name="courseEndDate" 
	            placeholder="Enter course end date" 
	            defaultValue={today}
	            width="30%"
		   />

    </div>		   





       {/*
       <TextInput handleChange={handleChange} label="Write full name of the course" placeholder="e.g. Elementary Quantum Mechanics of Practical Atomic Systems" name="courseFullName"/>
       */}

       {/*
       <ParagraphField label="About the course" 
	               name="abouttheCourse"  
	               placeholder="Short description..."  
	               handleChange={handleChange}
	               defaultValue=""
		       />	


       <TextInput handleChange={handleChange} 
	          label="Name of your institute" 
	          placeholder="e.g. Indian Institute of Technology, Bhubaneswar" 
	          name="instituteName"
	          requirement=""
	          defaultValue=""
		  />

         */}
 




    <div className={classes.submitButtonDiv}>
          {createState ==="Creating" &&
		         <button type="submit"  className= {classes.submit_button} disabled={true}>
                            <FadeLoader color={color} loading={true} css={override} size={10}/>
                            Creating ...
		         </button>
                         }

           {createState ==="notCreating" &&
          <button type="submit"  className= {classes.submit_button} ><b>
		   Create </b> 
          </button>
	   }		   

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
