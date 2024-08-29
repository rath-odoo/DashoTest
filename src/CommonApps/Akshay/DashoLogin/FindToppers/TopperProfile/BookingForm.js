import {useState, useEffect, useRef} from 'react';
import classes  from './BookingForm.module.css';
import { GiCheckMark } from "react-icons/gi";
import { checkifuserexist, bookslotbystudent } from '../../../CommonApps/AllAPICalls';
import FadeLoader from "react-spinners/BarLoader";
import { useHistory } from "react-router-dom";
import {Logout} from '../../../CommonApps/Logout';

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ]
}


function areAllDigits(str) {
  return /^\d+$/.test(str);
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};





const BookingForm=(props)=>{

  let color="var(--themeColor)";

  const history = useHistory();

  const initialFormData = {
                inputfield: "",
                inputfieldtype:'',
                username:null,
                email:null,
                phoneno:null,
                usernamelength:8
        };

   const [formData, updateFormData] = useState(initialFormData);

   const [userExists, setUserExists] = useState(false);

   useEffect(()=>{

          let userinput = formData.inputfield;
          checkifuserexist({setUserExists, userinput });

       },[formData.inputfield]);


    const handleChangeInputHandler=(event)=>{

     updateFormData({
                        ...formData,
                        [event.target.name]: event.target.value.trim(),
                });

    }


   const [bookingStatus, setBookingStatus] = useState("notBooked");

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(formData.inputfield === ""){
         alert("Please enter phoneno");
	 return null;    
      }

       let slotId =props.oneSlot.id;
       let phoneno = formData.inputfield;
       setBookingStatus(bookingStatus=>"booking")
       bookslotbystudent({slotId,phoneno, setBookingStatus});
    }

    const closeFormHandler=()=>{

      props.close();

    }



   const loginHandler=()=>{
   Logout();	   
   history.push("/app/home/slots"); 

   }




return <div className={classes.bookingForm}>


   <div className={classes.formBox}>

	    <div className={classes.formContentBox}>
             <div className={classes.closeButtonDiv}> 
	         <button type="button" className={classes.closeButton} onClick={closeFormHandler}> X</button>	
             </div>
             <div className={classes.textInfoForm}>Enter mob no with country code </div>

             <input
                 className={classes.editmobileNuBox}
                 type="text"
                 placeholder=" +91889.."
                 onChange={handleChangeInputHandler}
                 name="inputfield"
                 defaultValue=""
                 />

  
            {/* formData.inputfield !=="" &&
              <div className={classes.fieldtype}>
                  { areAllDigits(formData.inputfield.replace('+','')) && <>

                                   {!formData.inputfield.includes("+") &&  <span style={{color: "red",fontSize:"16px"}}>
                                                                                Add country extension e.g. +91..
                                                                            </span>
                                    }
                                </>
                   }

                   { !formData.inputfield.includes("@") && !areAllDigits(formData.inputfield.replace('+','')) &&
                    <span style={{color: "red",fontSize:"13px"}}> cannot detect field type </span>
                   }

                   { userExists &&
                        <span className={classes.userExistSymbol}> Phone  exists </span>
                   }

                   { !userExists &&
                        <span className={classes.userExistSymbol2} > Phone no does not exist in our system. </span>
                   }


              </div>
             */}


          
            { bookingStatus ==="notBooked" &&
                <button className={classes.bookSlotButton} type="button" onClick={handleSubmit} >Book Slot</button>
            }


            { bookingStatus ==="booking" &&
                <button className={classes.bookSlotButton} type="button"  disabled={true}  >Booking...</button>
            }




             { bookingStatus ==="booking" && <>
                <FadeLoader color={color} loading={true} css={override} size={50}   />
                    </>
             }


            { bookingStatus ==="booked" &&
               <button className={classes.bookSlotButton} type="button"  disabled={true}  >Booked <GiCheckMark/> </button>
            }


            { bookingStatus ==="booked" &&
                <button type="button" className={classes.loginToMeetingLinkButton} onClick={loginHandler}>
			     
		   Login to view meeting link
	        </button>		    
	    }









       </div>





   </div>

</div>

}


export default BookingForm;
