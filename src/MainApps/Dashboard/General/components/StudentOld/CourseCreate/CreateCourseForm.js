import React,{useState, useEffect} from "react";
import classes from "./CreateCourseForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../../../../CommonApps/BWlogo.JPG'
//import {OptionField,OptionFieldSubmitValue,OptionFieldSecondaryObjs, ParagraphField,TextInput, DateField} from './FormInputObjects';
import {TextInput} from './FormInputObjects';
import { getcoursesbyCourseId} from '../../../../../../CommonApps/AllAPICalls';
//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";

import CourseSearchView from "./CourseSearchView";




/*const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
*/


const CreateCourseForm=(props)=>{


//let [loading, setLoading] = useState(true);
//let [color, setColor] = useState(" var(--themeColor)");


const [courseData, getCourseData] = useState([]);

const initialFormData = Object.freeze({

        courseGlobalCode: "321221",

        });


const [formData, updateFormData] = useState(initialFormData)





 //const [data, setData] = useState({});

  //useEffect(()=>{
  //   getuser({setData});
  //},[]);


useEffect(()=>{

let courseId=Math.abs(formData.courseGlobalCode-100000);

//let globalCode=formData.courseGlobalCode;


//getcoursesbyglobalCode({globalCode, getCourseData});
getcoursesbyCourseId({courseId,getCourseData});

return ()=>{

getCourseData(courseData=>[]);
}


},[formData.courseGlobalCode]);


//const [showForm, setShowForm] = useState(true);


const handleChange = (e) => {
        updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });

}





const handleSubmit = ()=>{

}






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
           <div className={classes.formTitleDiv}><i>  Find a course </i></div>
    </div>


    <TextInput handleChange={handleChange} label="Enter course global code" placeholder="e.g.112101" name="courseGlobalCode"/>



   




    <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Add to Dashboard </b> </button>

    </div>




   {

    courseData.length===0 &&

    <div className={classes.noCourseExist}> <h2> No courses exist with this code</h2></div>

   }







    <div className={classes.emptyDiv}>


      {courseData.map((course,index)=>{

               return <CourseSearchView key={index} Course={course}   />

           }

           )}
   



		   

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
