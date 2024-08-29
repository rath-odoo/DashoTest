import React, { useState, CSSProperties, useRef } from 'react';
import { BsGoogle, BsFacebook, BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import OTPinputUnit from './OTPinputUnit';
import axiosInstance from '../../axios';
import basewebURL from "../../basewebURL";
import classes from "./OTPinputUnit.module.css";
import cover from './right.png';

import FadeLoader from "react-spinners/BarLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const TnSHandler = () => {
  window.open("https://diracai.com/TermsofUse", "_blank");
};

const privacyHandler = () => {
  window.open("https://diracai.com/Privacypolicy", "_blank");
};

const contanctUs = () => {
  window.open("https://diracai.com/contactus");
};


const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
  return [htmlElRef, setFocus]
}







const App = (props) => {


  let loadedUsername = String(props.loadedUsername);
  let phoneNum = loadedUsername.replace('+91', '');
  const [UsernameValue, setUsernameValue] = useState(phoneNum);

  const initialFormData = Object.freeze({
    username: loadedUsername,
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);


  const [otpState, setOtpState] = useState('notVerified');

  const [buttonStyleOTP, setButtonStyleOTP] = useState({
    color: 'grey',
    backgroundColor: 'lightgrey'

  });
  let color="var(--themeColor);";


  const [inputRef1, setInputFocus1] = useFocus();
  const [inputRef2, setInputFocus2] = useFocus();
  const [inputRef3, setInputFocus3] = useFocus();
  const [inputRef4, setInputFocus4] = useFocus();
  const [inputRef5, setInputFocus5] = useFocus();

  const handleChangeOTP = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });

    if (e.target.name === "first") { setInputFocus2() }
    if (e.target.name === "second") { setInputFocus3() }
    if (e.target.name === "third") { setInputFocus4() }
    if (e.target.name === "fourth") { setInputFocus5() }


    if (
      e.target.name === "fifth"
    ) {

      setButtonStyleOTP({
        color: 'white',
        backgroundColor: 'var(--themeColor)'
      });
    }
  }



  const handleSubmitOTP = (e) => {
    e.preventDefault();

    if (
      !(("first" in formData) && (formData.first !== "")) ||
      !(("second" in formData) && (formData.second !== "")) ||
      !(("third" in formData) && (formData.third !== "")) ||
      !(("fourth" in formData) && (formData.fourth !== "")) ||
      !(("fifth" in formData) && (formData.fifth !== ""))

    ) { alert("fill all the boxes "); }


    formData["password"] = String(formData.first) +
      String(formData.second) + String(formData.third) + String(formData.fourth) + String(formData.fifth);

     setOtpState(otpState=>"verifying"); 

    axiosInstance.post(`customtoken/`, { login_identifier: "+91"+props.inputfield, password: "OLsbd!@#45" + formData.password, })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');
        props.setLoggedIn(true);
        let location_ = window.location.href;
        if (location_.includes("createaccount")) {

          let redirectlink = basewebURL + "/home/dashboard/courses";
          window.location.href = "https://app.diracai.com/home/dashboard/courses"

        }

      })
      
      
      
      .catch((error) => {
        alert("Wrong OTP!! Try again.");
        window.location.reload();	
        });

        
  }
  return (
    <div className={classes.mainDiv}>
      <div className={classes.subMainDiv}>
            <div className={classes.loginTitleText}>Enter your OTP here</div>
            <div className={classes.mainContainerOpt}>
              <OTPinputUnit handleChangeOTP={handleChangeOTP} name="first" inputRef={inputRef1} />
              <OTPinputUnit handleChangeOTP={handleChangeOTP} name="second" inputRef={inputRef2} />
              <OTPinputUnit handleChangeOTP={handleChangeOTP} name="third" inputRef={inputRef3} />
              <OTPinputUnit handleChangeOTP={handleChangeOTP} name="fourth" inputRef={inputRef4} />
              <OTPinputUnit handleChangeOTP={handleChangeOTP} name="fifth" inputRef={inputRef5} />
            </div>
	    { otpState === "notVerified" && 
              <button className={classes.submitOtpbtn} type="button" onClick={handleSubmitOTP}>Verify</button>
	    }

	    { otpState === "verifying" && <>
              <button className={classes.submitOtpbtn} type="button" onClick={handleSubmitOTP} disabled={true}>Verifying...</button>
			    {/*<div style={{margin:'auto'}}>
                               <FadeLoader color={color} loading={true} css={override} size={50}   />
                              </div>
			    */}
	                     

	      </>		    
            }




          </div>
      </div>
  );
}

export default App;
