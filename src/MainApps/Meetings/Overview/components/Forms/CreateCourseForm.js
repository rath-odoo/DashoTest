import React,{useState} from "react";
import classes from "./CreateCourseForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../../CommonApps/BWlogo.JPG'
import {OptionField,
	  DateField,
	  TimeField,DayField,TextInput} from './FormInputObjects';
import {//getclassobjectbyId, 
	  //getuser,
	  //getsubjectsfromclassandboard,
	  createnewmeeting,createmultimeeting} from '../../../../CommonApps/AllAPICalls';
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










const CreateCourseForm=(props)=>{


    //let [loading, setLoading] = useState(true);
    //let [color, setColor] = useState(" var(--themeColor)");

     //console.log("props.userData: ", props.userData);


    ////////////////////////Single Class Details/////////////////////////
    const initialFormDataSingleClass = Object.freeze({
	name: null,    
	courseId: props.selectedCourse !==null && props.selectedCourse.length > 0 ? props.selectedCourse[0].id : null,
        serialNo: null,
        meetingStatus: "scheduled",
        meetingdate: "",
        meetingtime: "00:00:00",
        duration: null,
        meetingLink: "",
        roomNo: "",
        chapter: null,
        topics: [],
	creater: props.userData.id    
         

        });



    const [formDataSingleClass, updateFormDataSingleClass] = useState(initialFormDataSingleClass);



    const handleChangeSingleClass = (e) => {

	//console.log("name, value: ", e.target.name,"---",e.target.value);    


        updateFormDataSingleClass({
                        ...formDataSingleClass,
                        [e.target.name]: e.target.value.trim(),
                });
    }




    //const [showForm, setShowForm] = useState(true);

    const [showSingleClassForm, setSingleClassForm] = useState(true);

    const handleSubmit = (e) => {
	   e.preventDefault();
	 
         if(formDataSingleClass.name===null){
            alert('please enter a name ');
                        return null;
          }
 



          if(formDataSingleClass.classdate===""){
            alert('please enter date');
                        return null;
          }


          if(!("selectedhour" in formDataSingleClass)){
            alert('please select hour');
                        return null;
	  }

          if(!("selectedminute" in formDataSingleClass)){
            alert('please select minutes');
                        return null;
          }

          if(!("selectedampm" in formDataSingleClass)){
            alert('please select am or pm');
                        return null;
          }

          if(formDataSingleClass.duration===null){
            alert('please enter duration');
                        return null;
          }

          

          let ampm = formDataSingleClass.selectedampm;
	  let minute = formDataSingleClass.selectedminute;
	  let hour = formDataSingleClass.selectedhour;  
          if(ampm==="pm"){
          hour=Number(hour)+12;
	  }

	  //let time=hour+':'+minute+':'+'00'; 
	   
	  let time = `${hour}:${minute}:00`  

	  let timestr= time.toString(); 

          formDataSingleClass["meetingtime"]=timestr;

          //console.log("time: ", formDataSingleClass.classtime);
          

          createnewmeeting({formDataSingleClass});
	  //alert("Successfully submitted");

          props.onPress();

          //setFormSubmitted(!formSubmitted);

	
	
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


    let intervals=[10,15,20,25,30,40,45,50,60,70,120]



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
      //console.log("multi class form: ", formDataMultiClass)

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


      if( checkedMon && !("selectedhourMon" in formDataMultiClass)){alert('please meeting hour');return null;}
      if( checkedMon && !("selectedminuteMon" in formDataMultiClass)){alert('please meeting minute');return null;}
      if( checkedMon && !("selectedampmMon" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedMon && !("selecteddurationMon" in formDataMultiClass)){alert('please select class duration.');return null;}
   
      if( checkedTues && !("selectedhourTues" in formDataMultiClass)){alert('please meeting hour');return null;}
      if( checkedTues && !("selectedminuteTues" in formDataMultiClass)){alert('please meeting minute');return null;}
      if( checkedTues && !("selectedampmTues" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedTues && !("selecteddurationTues" in formDataMultiClass)){alert('please select class duration.');return null;}	    

      if( checkedWed && !("selectedhourWed" in formDataMultiClass)){alert('please meeting hour');return null;}
      if( checkedWed && !("selectedminuteWed" in formDataMultiClass)){alert('please meeting minute');return null;}
      if( checkedWed && !("selectedampmWed" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedWed && !("selecteddurationWed" in formDataMultiClass)){alert('please select class duration.');return null;}

      if( checkedThurs && !("selectedhourThurs" in formDataMultiClass)){alert('please meeting hour');return null;}
      if( checkedThurs && !("selectedminuteThurs" in formDataMultiClass)){alert('please meeting minute');return null;}
      if( checkedThurs && !("selectedampmThurs" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedThurs && !("selecteddurationThurs" in formDataMultiClass)){alert('please select class duration.');return null;}

      if( checkedFri && !("selectedhourFri" in formDataMultiClass)){alert('please meeting hour');return null;}
      if( checkedFri && !("selectedminuteFri" in formDataMultiClass)){alert('please meeting minute');return null;}
      if( checkedFri && !("selectedampmFri" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedFri && !("selecteddurationFri" in formDataMultiClass)){alert('please select class duration.');return null;}

      if( checkedSat && !("selectedhourSat" in formDataMultiClass)){alert('please meeting hour');return null;}
      if( checkedSat && !("selectedminuteSat" in formDataMultiClass)){alert('please meeting minute');return null;}
      if( checkedSat && !("selectedampmSat" in formDataMultiClass)){alert('please select am or pm.');return null;}
      if( checkedSat && !("selecteddurationSat" in formDataMultiClass)){alert('please select class duration.');return null;}
 
      if( checkedSun && !("selectedhourSun" in formDataMultiClass)){alert('please meeting hour');return null;}
      if( checkedSun && !("selectedminuteSun" in formDataMultiClass)){alert('please meeting minute');return null;}
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




      createmultimeeting({formDataMultiClass,setCreating});
      //console.log("starting to create");
      props.onPress();


    }







    //console.log("formData Single: ",formDataSingleClass );








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
                 <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
                  <div className={classes.formTitleDiv}><i>  Create  meeting </i></div>
          </div>




          {  props.selectedCourse.length===0 && <div className={classes.noCourseWarning}>

                  Please goback and select a course before creating meeting
	          </div>
	  }


	 { props.selectedCourse.length > 0 &&
          <div className={classes.singleNMultiFormOption}>
              <button className={classes.singleClass} onClick={singleClassHandler} style={formButton1Style}> <h2>Create a meeting</h2> </button>
              <button className={classes.multiClass}  onClick={multiClassHandler} style={formButton2Style}> <h2>Create multiple meetings</h2> </button>
          </div>
         }






        
          { props.selectedCourse.length > 0 && showSingleClassForm &&  <form className={classes.formElement1} onSubmit={handleSubmit}>


             <TextInput handleChange={handleChangeSingleClass} label="*Name your meeting!" name="name" placeholder="Enter a name"/>

             <DateField handleChange={handleChangeSingleClass} label="*When is your meeting?" name="meetingdate" placeholder="Enter a date" />

             <TimeField handleChange={handleChangeSingleClass} 
		     label="*When meeting starts" 		     
		     selectedhour = "selectedhour"
		     selectedminute = "selectedminute"
		     selectedampm = "selectedampm"
		     placeholder="Enter a time" 
		/>
             		 
             <OptionField handleChange={handleChangeSingleClass}  label="*Duration of meeting" name="duration"  options={intervals} />


              <div className={classes.submitButtonDiv}>
                <button type="submit"  className= {classes.submit_button} ><b>Create </b> </button>
             </div>



           </form>
          }



           {props.selectedCourse.length > 0 && !showSingleClassForm &&  <form className={classes.formElement1} onSubmit={handleSubmitMulti}>


	     <div className={classes.multiClassInfo}> First set the meetings and time for a week. 
			   Then you can choose to repeat same pattern for several weeks.  </div>  		   


             <TextInput handleChange={handleChangeMulti} label="*Name your meeting!" name="name" placeholder="Enter a name"/>


             <DateField handleChange={handleChangeMulti} label="Choose start date" name="classDateStart" placeholder="Enter a date" />




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




           <DateField handleChange={handleChangeMulti} label="Choose end date" name="classDateEnd" placeholder="Enter a date" />


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


export default CreateCourseForm;
