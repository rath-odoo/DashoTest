import React, { useState,CSSProperties, useRef } from 'react';
import classes from "./Login.module.css";
import cover from "./loginImage.jpg";
import { BsGoogle, BsFacebook, BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import OTPinputUnit from './OTPinputUnit';
import axiosInstance from '../../axios';
import basewebURL from "../../basewebURL";
import otpImage from './education2.jpg';

const TnSHandler = () => {
  window.open("https://diracai.com/terms-conditions/", "_blank");
};

const privacyHandler = () => {
  window.open("https://diracai.com/privacy-policy/", "_blank");
};

const contanctUs = () => {
  window.open("https://diracai.com/contact-us/");
};


const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    return [ htmlElRef, setFocus ]
}







const App=(props)=> {


   let loadedUsername=String(props.loadedUsername);
   let phoneNum=loadedUsername.replace('+91', '');
   const [UsernameValue, setUsernameValue] = useState(phoneNum);

   const initialFormData = Object.freeze({
                username:loadedUsername,
                email: '',
                password: '',
        });

   const [formData, updateFormData] = useState(initialFormData);

   const [buttonStyleOTP, setButtonStyleOTP]= useState({
      color:'grey',
      backgroundColor:'lightgrey'

    });
	

    const [inputRef1, setInputFocus1] = useFocus();
    const [inputRef2, setInputFocus2] = useFocus();
    const [inputRef3, setInputFocus3] = useFocus();
    const [inputRef4, setInputFocus4] = useFocus();
    const [inputRef5, setInputFocus5] = useFocus();

    const handleChangeOTP=(e)=>{
     updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });

     //setInputFocus();
     if(e.target.name==="first"){setInputFocus2()}
     if(e.target.name==="second"){setInputFocus3()}
     if(e.target.name==="third"){setInputFocus4()}
     if(e.target.name==="fourth"){setInputFocus5()}


     if(
         e.target.name==="fifth"
       ){

          setButtonStyleOTP({
            color:'white',
            backgroundColor:'var(--themeColor)'
           });
       }
    }



   const handleSubmitOTP = (e) => {
                e.preventDefault();

               if(
                  !(("first" in formData) && (formData.first !=="")) ||
                  !(("second" in formData) && (formData.second !=="") )||
                  !(("third" in formData) && (formData.third !==""))||
                  !(("fourth" in formData) && (formData.fourth !==""))||
                  !(("fifth" in formData) && (formData.fifth !==""))

                 ){alert("fill all the boxes ");}


                 formData["password"]= String(formData.first)+
                            String(formData.second)+String(formData.third)+String(formData.fourth)+String(formData.fifth);


                 axiosInstance.post(`customtoken/`, {login_identifier: props.inputfield,password: "OLsbd!@#45"+formData.password,})
                        .then((res) => {
                                localStorage.setItem('access_token', res.data.access);
                                localStorage.setItem('refresh_token', res.data.refresh);
                                axiosInstance.defaults.headers['Authorization'] =
                                        'JWT ' + localStorage.getItem('access_token');
                                props.setLoggedIn(true);
                                let location_=window.location.href;
                                if(location_.includes("createaccount")){

				  let redirectlink = basewebURL+"/home/dashboard/courses";	
                                  window.location.href="https://app.diracai.com/home/dashboard/courses"

                                }

                        });
        }























  return (
    <div className={classes.mainDiv}>
      <div className={classes.subMainDiv}>
        <div className={classes.image}>
          <img className={classes.coverImg} src={cover} alt="logo"></img>
        </div>

        <div className={classes.parentdiv}>
          <div className={classes.topBar}>
            <div className={classes.logoContainer}>
              <div className={classes.textDI}>Di</div>
            </div>

            <div className={classes.loginTitle}>Welcome To DiracAI</div>
          </div>

          <div className={classes.midContent}>
            {/* <div className={classes.enterMobileNumberText}>Enter Mobile Number</div> */}

            <div className={classes.loginTitleText}>OTP Verification</div>

            <div className={classes.mainContainerOpt}>
              {/* <img className={classes.flagImg} src={flag} alt="logo"></img> */}

              {/* <div className={classes.countryCode}>+91</div> */}
              {/* <input
                className={classes.editmobileNuBox}
                type="text"
                placeholder="Enter Email / Mobile Number"
              /> */}
              {/*
              <input className={classes.num1Box} type="text" />
	  
              <input className={classes.num2Box} type="text" />

              <input className={classes.num3Box} type="text" />
               
              <input className={classes.num4Box} type="text" />

              <input className={classes.num5Box} type="text" />
               */}
               

             <OTPinputUnit handleChangeOTP={handleChangeOTP} name="first" inputRef={inputRef1}/>
             <OTPinputUnit handleChangeOTP={handleChangeOTP} name="second" inputRef={inputRef2}/>
             <OTPinputUnit handleChangeOTP={handleChangeOTP} name="third" inputRef={inputRef3}/>
             <OTPinputUnit handleChangeOTP={handleChangeOTP} name="fourth" inputRef={inputRef4}/>
             <OTPinputUnit handleChangeOTP={handleChangeOTP} name="fifth" inputRef={inputRef5}/>





            </div>

            <button className={classes.submitOtpbtn} type="button" onClick={handleSubmitOTP}>Verify</button>

            {/* <div className={classes.horizontalContainer}>
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
            </div> */}

            {/* <div className={classes.textContainer}>
          <div className={classes.hintText}>
            By Continuing, You Agree to our
          </div>
          <div className={classes.termTitle}>Terms Of Service</div>
          <div className={classes.andTitle}>and</div>
          <div className={classes.privacyTitle}>Privacy Policy</div>
        </div> */}
          </div>

          <div className={classes.bottomBar}>
            {/* <div className={classes.bottomTopBar}>
              <div className={classes.texttitle}>Don't Have Account ?</div>
              <button className={classes.create}>Sign Up</button>
            </div> */}

            <div className={classes.textTitleBottom1}>
              <button className={classes.contactUS} onClick={contanctUs} >Contact US</button>
              <button className={classes.termOfService} type="button" onClick={TnSHandler}>
                Terms Of Service
              </button>
              <button className={classes.privacyText} type="button" onClick={privacyHandler}>Privacy Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
