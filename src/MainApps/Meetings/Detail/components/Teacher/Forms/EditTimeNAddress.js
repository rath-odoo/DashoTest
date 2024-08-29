
import classes from './EditTimeNAddress.module.css';
import {AiFillCloseCircle} from "react-icons/ai";
import {TimeField, TextInput2, OptionField2, DateField2, DayField} from './FormInputObjects';
import logoImage from '../../../../../../CommonApps/BWlogo.JPG'




const EditTimeNAddress=(props)=>{





    const initialFormData = Object.freeze({
        name: props.selectedMeeting.name,
        about: props.selectedMeeting.about,
        classStatus: props.selectedMeeting.classStatus,
        classdate: props.selectedMeeting.classdate,
        classtime: props.selectedMeeting.classtime,
        duration: props.selectedMeeting.duration,
        meetingLink: props.selectedMeeting.meetingLink




     });










    const handleChange = ()=>{


    }







    const handleSubmit=()=>{



    }



    let timeintervals = [10,15,20,25,30,40,50,60,90,120,180]




return (


<div className={classes.editTimeNAddress}>


   <form className={classes.editTimeNAddressForm} onSubmit={handleSubmit}>

       <div className={classes.closeButtonDiv}>
          <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
       </div>

       <div className={classes.logoAndTitleContainer}>
           <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
           <div className={classes.titleDiv}><i style={{fontStyle:"normal"}}>  Edit Meeting: ID {props.selectedMeeting.id}  </i></div>
       </div>









           <DateField2 handleChange={handleChange} 
	               label="Meeting date" 
	               name="classdate" 
	               placeholder="Enter a date" 
	               defaultValue={props.selectedMeeting.classdate}
	             />


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
                    defaultValue={props.selectedMeeting.duration}
	         />



        <TextInput2 handleChange={handleChange}
                 label="Meeting Link"
                 name="meetingLink"
                 placeholder="https://..."
                 defaultValue={props.selectedMeeting.meetingLink}
             />



       <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Save </b> </button>

      </div>









   </form>

</div>

);





}


export default EditTimeNAddress;

