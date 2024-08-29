import React,{useState,useEffect} from "react";
import classes from "./EditMeetingForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../../../../CommonApps/BWlogo.JPG'
import {getuser,putuser, putuserprofile, putpresentation} from '../../../../../../CommonApps/AllAPICalls';

import {TimeField, TextInput2, OptionField2, DateField2, DayField} from './FormInputObjects'; 




const convertAndAddto24hourFormat=({ formData })=>{
          
            let ampm = formData.selectedampm;
            let minute = formData.selectedminute;
            let hour = formData.selectedhour;
            if(ampm==="pm"){
              hour=Number(hour)+12;
            }

            //let time=hour+':'+minute+':'+'00';
            let time =`${hour}:${minute}:00`;
            let timestr= time.toString();
            formData["talktime"]=timestr;
          
}
















const AboutEditForm=(props)=>{



const [data, setData ] = useState({});


const [checked, setChecked] = useState(false);



useEffect(() =>{
     getuser({setData});
  },[]);



///console.log("userData: ", data);


const initialFormData = Object.freeze({
        talktitle: props.presentation.talktitle,
        talktime: props.presentation.talktime,
        duration: props.presentation.duration,
        speaker: props.presentation.spealer



});



const [formData, updateFormData] = useState(initialFormData)

const handleChange = (e) => {
                updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
        };






const handleSubmit = (e) => {
		e.preventDefault();

                let talkId = props.presentation.id;

                //console.log("formData: ", formData);
	        //formData["classdate"] = "13:13:13"
                let hourset=false;
	        let minset=false;
	        let ampmset=false;

	        if(("selectedhour" in formData)){
			hourset=true;
                }

                if(("selectedminute" in formData)){
                        minset=true;
                }
                
	         if(("selectedampm" in formData)){
                        ampmset=true;
                }



 
                if(hourset && minset && ampmset){
                convertAndAddto24hourFormat({ formData });
                }
                //putmeetinginfo({meetingid, formData});

                //console.log("formData: ", formData);

	        //console.log("talkId: ", talkId);
	        putpresentation({talkId, formData});
	        //props.userDataUpdated(true);
	        //window.location.reload(false);
	        props.onPress();
	};


  let intervals = ["scheduled","postponed","cancelled"]

  let timeintervals = [10,15,20,25,30,40,50,60,90,120,180]
  












return(

<div className={classes.aboutEditFormDivParent}>

  <form className={classes.aboutEditForm} onSubmit={handleSubmit}>

      <div className={classes.closeButtonDiv}>
          <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
      </div>	


      <div className={classes.logoAndTitleContainer}>
    	   <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
           <div className={classes.titleDiv}><i style={{fontStyle:"normal"}}>  Edit presentation: ID {props.presentation.id}  </i></div>
      </div>


      <TextInput2 handleChange={handleChange} label="Talk title" name="talktitle" placeholder="Enter a name"  defaultValue={props.presentation.talktitle}/>


       
      <TimeField handleChange={handleChange}
                     label="Meeting time"
                     selectedhour = "selectedhour"
                     selectedminute = "selectedminute"
                     selectedampm = "selectedampm"
                     placeholder="Enter a time"
                />
       

      <OptionField2 handleChange={handleChange}  
	            label="Meeting duration" 
	            name="duration"  
	            options={timeintervals} 
	            defaultValue={props.presentation.duration}/>


    {/*	
     <DayField handleChange={handleChange}
                   label="Time"
                   selectedhour = "selectedhourMon"
                   selectedminute = "selectedminuteMon"
                   selectedampm = "selectedampmMon"
                   selectedduration = "selecteddurationMon"
                   setChecked = {setChecked}
                           />
     */}









     <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Save </b> </button>

     </div>


  </form>

</div>	
);

}


export default AboutEditForm;
