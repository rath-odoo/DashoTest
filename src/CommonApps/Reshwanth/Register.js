import React, { useState, useEffect, CSSProperties } from "react";
import LoginHeader from "../LoginHeader";
import classes from "./Register.module.css";
//import {OptionField} from './OptionField';
import { createaccount, checkuserexist, checkifuserexist } from '../AllAPICalls';
import FadeLoader from "react-spinners/FadeLoader";
import { BsCheckLg } from 'react-icons/bs';
//import { useHistory } from "react-router-dom";
import cover from "./education2.jpg";
import { BsGoogle, BsFacebook, BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Login from './Login';
import basewebURL from '../../basewebURL';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Logo from '../Logo';
import flag from './flag.jpeg';
import LogoD from "./DiracAI";

// const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
// };


// function areAllDigits(str) {
//     return /^\d+$/.test(str);
// }




// const InputFieldType = (formData) => {

//     if (formData.inputfield.includes("+") && areAllDigits(formData.inputfield.replace('+', ''))) {
//         return "phoneno"
//     }

//     if (formData.inputfield.includes("@")) {
//         return "email"
//     }
//     return "none"

// };







const Register = () => {


    //     const [loading, setLoading] = useState("notcreated");
    //     //const history = useHistory(); 	
    //     let color = "var(--themeColor);";
    //     const initialFormData = Object.freeze({
    //         inputfield: '',
    //         inputfieldtype: '',
    //         username: null,
    //         email: null,
    //         phoneno: null,
    //         usernamelength: 8
    //     });

    //     const [formData, updateFormData] = useState(initialFormData);







    //     const handleSubmit = () => {

    //         onChangeCaptchaHandler();

    //         if (userExists) {
    //             alert("User already exists");
    //             return null;
    //         }

    //         if (!captchaResult) {
    //             alert("Check the captcha");
    //             return null;
    //         }

    //         if (!userExists && captchaResult) {
    //             if (InputFieldType(formData) === "email") {
    //                 formData['email'] = formData.inputfield;
    //             }
    //             console.log(formData);
    //             if (InputFieldType(formData) === "phoneno") {
    //                 formData['phoneno'] = formData.inputfield;
    //             }

    //             setLoading(loading => "creating");
    //             createaccount({ formData, setLoading });
    //         }
    //     }



    //     const [userExists, setUserExists] = useState(false);

    //     useEffect(() => {

    //         let userinput = formData.inputfield;
    //         checkifuserexist({ setUserExists, userinput });

    //     }, [formData.inputfield]);




    //     const handleChangeInputHandler = (event) => {

    //         let inputValue = event.target.value;

    //         // Ensure the value always starts with "+91"
    //         if (!inputValue.startsWith("+91")) {
    //             inputValue = "+91" + inputValue;
    //         }

    //         updateFormData({
    //             ...formData,
    //             [event.target.name]: inputValue.trim(),
    //         });

    //     }



    //     //let classRank=["+91","+353","+49"]
    //     //<OptionField handleChange={handleChange}  label="+91" name="countrycode"  options={classRank}/>
    //     const [login, setLogin] = useState(false);
    //     const [loggedIn, setLoggedIn] = useState(false);

    //     const handleRedirectLogin = () => {
    //         //history.push(`/dashboard/general/`);
    //         setLogin(true);

    //     }

    //     const [captchaResult, setCaptchaResult] = useState(true);

    //     const onChangeCaptchaHandler = (value) => {

    //         //console.log('Captcha value:', value);
    //         fetch(`${basewebURL}/api/verifycaptcha/`, {
    //             method: 'POST',
    //             body: JSON.stringify({ 'captcha_value': value }),
    //             headers: { 'Content-Type': 'application/json' }
    //         })
    //             .then(res => {
    //                 if (!res.ok) {
    //                     throw new Error('Network response was not ok');
    //                 }
    //                 return res.json();
    //             })
    //             .then(data => {
    //                 if (data && data.captcha && typeof data.captcha.success === 'boolean') {
    //                     console.log("captcha value:", data.captcha.success);
    //                     setCaptchaResult(data.captcha.success);
    //                 } else {
    //                     console.error("Invalid response format from the server");
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error("An error occurred:", error);
    //                 // Handle the error here, e.g., show an error message to the user
    //             });

    //     }



    //     const TnSHandler = () => {
    //         window.open("https://diracai.com/terms-conditions/", "_blank");
    //     }


    //     const privacyHandler = () => {
    //         window.open("https://diracai.com/privacy-policy/", "_blank");
    //     }


    //     const contactUsHandler = () => {
    //         window.open("https://diracai.com/contact-us/", "_blank");
    //     }

    //     console.log("formData: ", formData);



    //     let input = formData.inputfield;




    return (

        //     <div className={classes.mainDiv}>
        //     {loading === "creating" &&
        //         <div className={classes.registerDiv}>
        //             <div className={classes.titleDiv}> <h2>Creating ... </h2> </div>
        //             <div style={{ margin: 'auto' }}>
        //                 <FadeLoader color={color} loading={true} css={override} size={50} />
        //             </div>
        //         </div>
        //     }
        //     {loading === "created" && !login &&
        //         <div className={classes.registerDiv}>
        //             <div className={classes.titleDiv}> <h2><BsCheckLg style={{ color: "green" }} /> Account created successfully! </h2> </div>
        //             <div className={classes.submitButtonDiv}>
        //                 <button type="button" onClick={handleRedirectLogin} className={classes.sendOTPButton} > <b>Proceed to Login</b>  </button>
        //             </div>
        //         </div>
        //     }
        //     {login &&
        //         <Login setLoggedIn={setLoggedIn} loadedUsername={formData.inputfield} />
        //     }
        //     {loading === "notcreated" &&
        //         <div className={classes.subMainDiv}>
        //             <div className={classes.image}>
        //                 <img className={classes.coverImg} src={cover} alt="logo"></img>
        //             </div>
        //             <div className={classes.parentdiv}>
        //                 <div className={classes.topBar}>
        //                     <div className={classes.logoContainer}>
        //                         <div className={classes.textDI}>Di</div>
        //                     </div>
        //                     <div className={classes.loginTitle}>Welcome To DiracAI</div>
        //                 </div>
        //                 <div className={classes.midContent}>
        //                     <div className={classes.loginTitleText}>Create Account</div>
        //                     <div className={classes.mainContainer}>
        //                         <input
        //                             className={classes.editmobileNuBox}
        //                             type="text"
        //                             placeholder=" Mobile Reshwanth "
        //                             onChange={handleChangeInputHandler}
        //                             name="inputfield"
        //                         />
        //                         {formData.inputfield !== "" &&
        //                             <div className={classes.fieldtype}>
        //                                 {formData.inputfield.includes("@") && <span style={{ color: "green" }}>email detected</span>}
        //                                 {areAllDigits(formData.inputfield.replace('+', '')) && <>
        //                                     <span style={{ color: "green" }}>
        //                                         mobile no detected
        //                                     </span>
        //                                 </>
        //                                 }
        //                                 {userExists &&
        //                                     <span className={classes.userExistSymbol}> {" , "}user already exists </span>
        //                                 }
        //                             </div>
        //                         }
        //                     </div>
        //                     <div className={classes.captcha}>
        //                         <ReCAPTCHA
        //                             className={classes.grecaptcha}
        //                             sitekey="6LdtMAghAAAAAGLqRpJ0hMuAWK4X15_zQfbvBuX-"
        //                             onChange={onChangeCaptchaHandler}
        //                             data-badge="center"
        //                         />
        //                     </div>
        //                     <button className={classes.createBtn} type="button" onClick={handleSubmit}>Create</button>
        //                     <div className={classes.horizontalContainer2}>
        //                         <div className={classes.leftLine}></div>
        //                         <div className={classes.orText}>OR</div>
        //                         <div className={classes.rightLine}></div>
        //                     </div>
        //                     <div className={classes.signInContainer}>
        //                         <button className={classes.googleSignINContainer}>
        //                             <FcGoogle className={classes.googleICON} />
        //                             <div className={classes.signInGoogleTitle}>
        //                                 Sign In With Google
        //                             </div>
        //                         </button>
        //                     </div>
        //                 </div>
        //                 <div className={classes.bottomBar}>
        //                     <div className={classes.textTitleBottom1}>
        //                         <button className={classes.contactUS} onClick={contactUsHandler}>Contact US</button>
        //                         <button className={classes.termOfService} onClick={TnSHandler}>
        //                             Terms Of Service
        //                         </button>
        //                         <button className={classes.privacyText} onClick={privacyHandler}>
        //                             Privacy Policy
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //      }
        //      </div>
        <div className={classes.mainContainer}>
            <div className={classes.holderContainer}>
                <div className={classes.headContainer}>
                    <div className={classes.topContainer}>

                        <div className={classes.logoContainer}>
                            <LogoD />
                        </div>
                        <div className={classes.welcomeContainer}>
                            Welcome to DashoApp
                        </div>
                    </div>
                    <div className={classes.creastAccount}>
                        
                    </div>
                </div>
                <div className={classes.firstInput}>
                    <div className={classes.flagcode}>
                        <img className={classes.flagImg} src={flag} alt="logo" />
                        <div className={classes.countryCode}> +91 </div>
                    </div>
                    <input type="number" className={classes.textInput} placeholder="Phone" name="inputfield" />


                </div>

            </div>
        </div>
    );

}

export default Register;


/*





        after the mainContainer



        <img className={classes.flagImg} src={flag} alt="logo"></img>

              <div className={classes.countryCode}>
          </div>
        





            { !formData.inputfield.includes("@") && !areAllDigits(formData.inputfield.replace('+','')) && 
            <span style={{color: "red"}}> cannot detect field type </span>		          
           }






           
           after the areAllDigits verify
           {
            !formData.inputfield.includes("+") &&  
           <span style={{color: "red"}}>
                , add country extension e.g. +91..
            </span>
            }








        after the midContainer
        <div className={classes.enterMobileNumberText}>Enter Mobile Number</div>

















          

*/