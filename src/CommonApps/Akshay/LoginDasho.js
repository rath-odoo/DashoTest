import React, { useState, useEffect, CSSProperties, useRef } from "react";
import classes from "./Login.module.css";
import flag from "./flag.jpeg";
import cover from "./loginImage.jpg";
import { BsGoogle, BsFacebook, BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { checkifuserexist, sendotpemail, sendotpphoneno} from '../AllAPICalls';
import FadeLoader from "react-spinners/BarLoader";
import basewebURL from '../../basewebURL';
import { useHistory } from "react-router-dom";
import {changepassword} from '../AllAPICalls';
import OTPscreen from './OTP';





const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ]
}


function areAllDigits(str) {
  return /^\d+$/.test(str);
}




const InputFieldType = (formData) => {

      if(formData.inputfield.includes("+") && areAllDigits(formData.inputfield.replace('+','')) ){
         return "phoneno"
      }

      if(formData.inputfield.includes("@")){
         return "email"
      }
         return "none"

  };






const TnSHandler = () => {
  window.open("https://diracai.com/terms-conditions/", "_blank");
};

const privacyHandler = () => {
  window.open("https://diracai.com/privacy-policy/", "_blank");
};

const contanctUs = () => {
  window.open("https://diracai.com/contact-us/");
};



const App=(props)=>{


   let color="var(--themeColor)";

    const initialFormData = Object.freeze({
                inputfield:'',
                inputfieldtype:'',
                username:null,
                email:null,
                phoneno:null,
                usernamelength:8
        });

    const [formData, updateFormData] = useState(initialFormData);

    const [loginState, setLoginState] = useState("OTPnotrequested");//OTPnotrequested
    const [inputRef1, setInputFocus1] = useFocus();
    const [inputRef2, setInputFocus2] = useFocus();
    const [inputRef3, setInputFocus3] = useFocus();
    const [inputRef4, setInputFocus4] = useFocus();
    const [inputRef5, setInputFocus5] = useFocus();


     const [userExists, setUserExists] = useState(false);


     const history = useHistory();


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


    const handleSubmitGetOTP=(e)=>{
       e.preventDefault();

       if(!userExists){
          alert("User does not exists");
          return null;
       }

       console.log("phoneno: ", InputFieldType(formData));

       if(InputFieldType(formData) ==="email"){
	     setLoginState(loginState=>"OTPsending");
             formData['email']= formData.inputfield;
	     sendotpemail({formData, setLoginState});
            }

       if(InputFieldType(formData) ==="phoneno"){
	     console.log("phoneno");
	     setLoginState(loginState=>"OTPsending");
             formData['phoneno']= formData.inputfield;
	     sendotpphoneno({formData, setLoginState});
            }

    }



    const createAccountPageHandler=()=>{

       history.push('/createaccount');

    }







    let input = formData.inputfield;

    console.log("formData: ", formData);



  return (
    <div className={classes.mainDiv}>

    
     { (loginState ==="OTPnotrequested"  || loginState ==="OTPsending") && <>

      <div className={classes.subMainDiv}>
        <div className={classes.image}>
          <img className={classes.coverImg} src={cover} alt="logo"></img>
        </div>

        <div className={classes.parentdiv}>
          <div className={classes.topBar}>
            <button className={classes.logoContainer}>
              <div className={classes.textDI}>Di</div>
            </button>

            <div className={classes.loginTitle}>Dasho</div>
          </div>

          <div className={classes.midContent}>

            <div className={classes.loginTitleText}>Login</div>

            <div className={classes.mainContainerA1}>

              <input
                className={classes.editmobileNuBox}
                type="text"
                placeholder=" Mobile Number"
	        onChange={handleChangeInputHandler}
	        name="inputfield"
              />

            </div>

              { formData.inputfield !=="" &&
              <div className={classes.fieldtype}>
                  {formData.inputfield.includes("@") && <span style={{color: "green"}}>email detected</span>}
                  { areAllDigits(formData.inputfield.replace('+','')) && <>
                                  <span style={{color: "green"}}>
                                       mobile no detected
                                  </span>

                                   {!formData.inputfield.includes("+") &&  <span style={{color: "red"}}>
                                                                               , add country extension e.g. +91..
                                                                            </span>
                                    }
                                </>
                   }

                   { !formData.inputfield.includes("@") && !areAllDigits(formData.inputfield.replace('+','')) &&
                    <span style={{color: "red"}}> cannot detect field type </span>
                   }

                   { userExists &&
                        <span className={classes.userExistSymbol}> {" , "}user  exists </span>
                   }

                   { !userExists &&
                        <span className={classes.userExistSymbol2}> {" , "}user does not exist </span>
                   }
 
          


              </div>
             }


            { loginState ==="OTPnotrequested" &&
            <button className={classes.sendOtpbtn} type="button" onClick={handleSubmitGetOTP} >Send OTP</button>
	    }


            { loginState ==="OTPsending" &&
            <button className={classes.sendOtpbtn} type="button"  disabled={true}  style={{width:"150px"}}>Sending... OTP</button>
            }




             { loginState==="OTPsending" && <>
                   <FadeLoader color={color} loading={true} css={override} size={50}   />
		    </>
             }








            <div className={classes.horizontalContainer}>
              <div className={classes.leftLine}></div>
              <div className={classes.orText}>OR</div>
              <div className={classes.rightLine}></div>
            </div>

            <div className={classes.signInContainer}>
              <button className={classes.googleSignINContainer}>
                <FcGoogle className={classes.googleICON} />
                <div className={classes.signInGoogleTitle}>
                  Sign In With Google
                </div>
              </button>
              
	      {/*
              <button className={classes.facebookSignINContainer}>
                <BsFacebook className={classes.facebookICON} />
                <div className={classes.signInFacebookTitle}>
                  Sign In With Facebook
                </div>
              </button>

              <button className={classes.linkSignINContainer}>
                <BsLinkedin className={classes.linkedinICON} />
                <div className={classes.signInLinkTitle}>
                  Sign In With LinkedIn
                </div>
              </button>
	      */}
            </div>

          </div>

          <div className={classes.bottomBar}>
            <div className={classes.bottomTopBar}>
              <div className={classes.texttitle}>Don't Have Account ?</div>
              <button
                className={classes.create}
                onClick={createAccountPageHandler}
	        type="button"
              >
                Create Account
              </button>
            </div>

            <div className={classes.textTitleBottom}>
              <button className={classes.contactUS} onClick={contanctUs}>
                Contact US
              </button>
              <button className={classes.termOfService} onClick={TnSHandler}>
                Terms Of Service
              </button>
              <button className={classes.privacyText} onClick={privacyHandler}>
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>

     </>}



     { loginState==="OTPsent" && <>

         <OTPscreen inputfield={formData.inputfield}  setLoggedIn={props.setLoggedIn}/>

      </>

      }





    </div>
  );
}

export default App;
