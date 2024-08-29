import {useState, useEffect} from 'react';
import classes from "./CreateTransactionForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import {createtransaction} from './../../../CommonApps/AllAPICalls';
import Logo from '../../../CommonApps/Logo'




import { TimeField, TextInput,
         NumberInput, DateField,
         TextInputInstitute,
         ParagraphField,
         TextInputAddSpeaker,
         OptionField,
         CustomTimePicker,
         TextInputAddMemberForPayment} from './../../../CommonApps/FormInputObjects';



const CreateTransactionForm=(props)=>{


  const initialFormData = Object.freeze({
    amount: "",
    date_of_schedule:"",
    method: "",
    transaction_type:props.transaction_type,
    status:"",
  });

  

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };



 const handleSubmit=()=>{

   if(formData.amount ===""){
      alert("Please enter amount");
      return null;
   }
   if (formData.date_of_schedule === ""){
      alert("Please enter date");
      return null;
   }

   if (formData.status === ""){
      alert("Please enter status");
      return null;
   }

   if (formData.method === ""){
      alert("Please select method");
      return null;
   }

   console.log("amount, due_amount: ", formData.amount, props.due_amount);	 


   if( Number(formData.amount) > Number(props.due_amount)){

     alert("amount cannot be greater then due amount")	   
      return null;

   }

  let institute_id = props.institute_id;
  let user_id = props.user_id;
  let fee_id = props.fee_id;

  createtransaction({ institute_id, user_id, fee_id, formData, props })

 }

  

  var today = new Date();

   let dropDownOptions1 = [
    { "name": "Cash", "id": "cash" },
    { "name": "Card", "id": "card" },
    { "name": "Bank Transfer", "id": "bank_transfer" },
    { "name": "Online Payment", "id": "online_payment" },
    
  ]


  let dropDownOptions2 = [
    { "name": "Pending", "id": "pending" },
    { "name": "Completed", "id": "completed" },
    { "name": "Failed", "id": "failed" },
  ]



   console.log("formData: ", formData);





return <div className={classes.createTransactionFormParent}>


     <div className={classes.createTransactionForm}> 

         <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
         </div>

         <div className={classes.logoAndTitleContainer}>
            <div className={classes.titleDiv}><i style={{ fontStyle: "normal", marginTop: "30px" }}> Add a transaction   </i></div>
         </div>
 
	
       <div className={classes.flexDiv}>		

         <NumberInput handleChange={handleChange}
                  label="Amount"
                  name="amount"
                  placeholder="40000"
                  defaultValue={""}
	          width="200px"
                  />

         <DateField handleChange={handleChange}
                    label="Date of Schedule "
                    name="date_of_schedule"
                    placeholder="Enter course start date"
                    defaultValue={today}
                    width="200px"
                   />

       </div>

      <div className={classes.flexDiv}>


         <OptionField handleChange={handleChange}
                  label="Method"
                  name="method"
                  options={dropDownOptions1}
                  defaultValue={""}
                  width="200px"
                  />

        <OptionField handleChange={handleChange}
                  label="Status"
                  name="status"
                  options={dropDownOptions2}
                  defaultValue={""}
                  width="200px"
                  />

      </div>




    





       <button type="button" onClick={handleSubmit} className={classes.addTransactionButton}> Add </button>

   </div>


</div>

}


export default CreateTransactionForm;
