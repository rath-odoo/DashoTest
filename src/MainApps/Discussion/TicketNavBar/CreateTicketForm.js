import React,{useState, useEffect} from "react";
import classes from "./CreateTicketForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../CommonApps/BWlogo.JPG'
import {TicketTitle, TicketCategory,TicketKeywords,TicketPriority, TicketDescription} from './CreateTicketFormInputs';
import {getalltickets, getticketscategory,createticket,getuser} from '../../../CommonApps/AllAPICalls';



const CreateTicketForm=(props)=>{



    const [data, setData ] = useState({});

    const [ticketType, setTicketType] = useState([{"id": 99999999,"name": "Unable to fetch ticket category"}]);


    useEffect(() =>{
       getalltickets({setData});
    },[]);


   useEffect(() =>{
     getticketscategory({setTicketType});
   },[])


   useEffect(()=>{
     getuser({setData});
   },[]);





    const initialFormData = Object.freeze({

        title: "cscssc",
        category: 1,
        keywords: "bibhu, rasmita",
        description: " This is a test example",
        priority: "medium",

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
            let course_id = 12;
	    let user_id = 8;
            createticket({formData, data});
	    window.location.reload(true);
	};





return(

<div className={classes.createTicketFormDivParent}>

  <form className={classes.createTicketForm} onSubmit={handleSubmit}>

     {/*form close button below*/}	
    <div className={classes.closeButtonDiv}>
        <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
    </div>	

 
     {/*logo and field title container below*/}
    <div className={classes.logoAndTitleContainer}>
	  <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
           <div className={classes.formTitleDiv}><i>  Create a ticket </i></div>
    </div>



      <TicketTitle handleChange={handleChange}/>


      <TicketCategory handleChange={handleChange} ticketTypes={ticketType}/>



      <TicketKeywords handleChange={handleChange} />


      <TicketPriority handleChange={handleChange} />

    
      <TicketDescription handleChange={handleChange} />	


    <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Create </b> </button>

    </div>


  </form>

</div>	
);

}


export default CreateTicketForm;
