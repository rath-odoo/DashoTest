import React,{useState, useEffect} from "react";
import classes from "./CreateNoticeForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../CommonApps/BWlogo.JPG'
import {ParagraphField,TextInput} from '../../../CommonApps/FormInputObjects';
import {  CheckBoxInput} from './FormInputObjects';
import {getuser, createnotice, getadmincourses} from '../../../CommonApps/AllAPICalls';
import Logo from '../../../CommonApps/Logo';

//getteachercourses

//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";


//const override = css`
//  display: block;
//  margin: 0 auto;
//  border-color: red;
//`;


const CreateCourseForm=(props)=>{




  //console.log("websocket: ",props.socketObj)


  //console.log("Create notice form");

  /*
  let  client = new W3CWebSocket('ws://127.0.0.1:8000/ws/notification/alll/');


   client.onmessage = (event)=>{
          const dataFromServer = JSON.parse(event.data);
          console.log("message from Server:", dataFromServer.message);
   }
   */





  //let [loading, setLoading] = useState(true);
  //let [color, setColor] = useState(" var(--themeColor)");

  //const [data, setData] = useState({});
  //const [teacherCourses,setTeacherCourses] = useState([]);
  //const [formSubmitted,setFormSubmitted] = useState(false);


  //useEffect(()=>{
  //   getuser({setData});
  //},[]);


  //useEffect(()=>{
  //  let teacherId=data.id;
  //  getteachercourses({teacherId, setTeacherCourses});
  //},[data.id ]);



  const [checkedCourses, setCheckedCourses] = useState([]);
       

  const [adminCourses, getAdminCourses] = useState(null);	


   useEffect(()=>{


    getadmincourses({getAdminCourses});

   },[]);


   console.log("adminCourses: ", adminCourses);
  const initialFormData = Object.freeze({

	creater:1, 
        noticeTitle: "",
        noticeText: "",
        postCourses: [],

        });



const [formData, updateFormData] = useState(initialFormData)




const handleChange = (e) => {
        updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                });
}


const handleChangePostData = ({checkedState})=>{


}




//const [showForm, setShowForm] = useState(true);

let showForm=true;

const handleSubmit = (e) => {

	   e.preventDefault();	  
	  
          if(formData.noticeTitle===""){
		  alert('please enter notice title');
		  return null;
	  }

          if(formData.noticeText===""){
                  alert('please fill notice text');
                  return null;
          }
  
	 let selectedCourseIds=[]
         props.courseData.forEach((course,index)=>{

		 props.courseData.length === checkedCourses.length && checkedCourses[index] && selectedCourseIds.push(course.id);

	 });

         if(selectedCourseIds.length===0){
                  alert('You cannot post a notice without selecting a course. If you do not have a course, first create one!');
                  return null;
          }

	 let data = props.userData;
	 console.log("formData: ", formData)
         createnotice({data, formData, selectedCourseIds, props});   
	 //alert("Notice posted successfully");            
        

	//props.rerender();
        //props.onPress();


	};








return(

<div className={classes.createTicketFormDivParent}>

   {/*!showForm &&  
	   <div className={classes.createTicketFormLoading}>

	   <FadeLoader color={color} loading={loading} css={""} size={50}  />
	    
	   <div className={classes.submittingDiv}> Creating . . . </div>
           </div>
   */}


   { showForm &&	
  <form className={classes.createTicketForm} onSubmit={handleSubmit}>

     <div className={classes.innerDiv}>

     {/*form close button below*/}	
    <div className={classes.closeButtonDiv}>
        <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
    </div>	

 
     {/*logo and field title container below*/}
    <div className={classes.logoAndTitleContainer}>
	   <Logo/>
           <div className={classes.formTitleDiv}><i>  Create a Batch </i></div>
    </div>



      <TextInput  label="Batch name" placeholder="Science-Class-11-2024-25" name="noticeTitle"  handleChange={handleChange}/>

      <div style={{height:"10px"}}> </div>

      <ParagraphField label="About the Batch"  placeholder="This batch .." name="noticeText"  handleChange={handleChange} />

     { props.courseData.length>0 &&
      <CheckBoxInput 
	     label="Add courses to Batch"  
	     placeholder="jai"  
	     name="postCourses" 
	     handleChange={handleChangePostData} 
	     Courses={props.courseData}   
             setCheckedCourses={setCheckedCourses}  
	     />
     }
       



    <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} >
		   <b>Create </b> 
	  </button>

    </div>






    <div className={classes.emptyDiv}>



     dshdfjhd sdns dasd ashda sdhasd asdjas djasd asdas da asd asd
     asd asda asdb sadasdj dDMNASD ASDNBSAD ASDNBADS ADSNBA Dsj dn
     dcnd ASDNAS DJASD AJSDA DBASD ASDB SADBSA dasjdnbqww dwbdw dd


    </div>


   </div>

  </form>

   }


</div>	
);

}


export default CreateCourseForm;
