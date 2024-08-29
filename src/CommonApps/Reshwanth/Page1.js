import classes from "./page1.module.css";
import picture6 from './left.png';
import picture7 from './right.png';
import picture1 from './google.jpg';
import picture5 from './images/page-1/DashoManage.png'
import picture2 from './images/page-1/TeachImage.png';
import flag from './India.png';
import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import axiosInstance from '../../axios';
import basewebURL from '../../basewebURL';
import { checkifuserexist, sendotpemail, sendotpphoneno, createaccountnew, checkuserexist } from '../AllAPICalls';
import OTPscreen from './OTP';
import { useHistory } from "react-router-dom";
import FadeLoader from "react-spinners/BarLoader";
import {
  BsActivity,
  BsFillBookFill,
  BsPencilSquare,
  BsBarChartLineFill,
  BsPeopleFill,
  BsBuilding,
  BsGearWideConnected,
  BsCreditCard,
   BsCurrencyDollar,
   BsClipboardCheck
} from "react-icons/bs";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "./firebase";


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
  return [htmlElRef, setFocus]
}





function areAllDigits(str) {
  return /^\d+$/.test(str);
}

function isLengthTen(str) {
  return str.length === 12;
}



const InputFieldType = (formData) => {

  if (formData.inputfield.includes("+") && areAllDigits(formData.inputfield.replace('+', ''))) {
    return "phoneno"
  }

  if (formData.inputfield.includes("@")) {
    return "email"
  }
  return "none"

};



const App = ({ setLoggedIn, loadedUsername, connectPage, teachPage, learnPage, managePage, landingPage }) => {

  const [loginState, setLoginState] = useState("OTPnotrequested");//OTPnotrequested
  const [loading, setLoading] = useState("notcreated");
  const [userExists, setUserExists] = useState(false);

  let color = "var(--themeColor);";

  const initialFormData = Object.freeze({
    inputfield: '',
    inputfieldtype: '',
    username: null,
    email: null,
    phoneno: '',
    usernamelength: 8
  });



  const [formData, updateFormData] = useState(initialFormData);



  useEffect(() => {

    let userinput = "+91" + formData.phoneno;
    checkifuserexist({ setUserExists, userinput });

  }, [formData.phoneno]);


  const handleChangeInputHandler = (event) => {
    let inputValue = event.target.value;

    updateFormData({
      ...formData,
      [event.target.name]: inputValue.trim(),
    });

  }


  console.log("formData:::::::::", formData);


  const [inputRefs, setInputFocus] = useFocus();

  const history = useHistory();


  const createAccountPageHandler = () => {

    history.push('/createaccount');

  }

  const createaccountnewFirebase = async (formData) => {
    const name = formData.phoneno;
    try{
      await setDoc(doc(storage,"dashoo","+91" + formData.phoneno) , {
        requestedList :[]
      });
      console.log("created the user in firebase");
    }catch (err){
      console.log("not created the user in firebase");
    }

  }



  const handleSubmitGetOTP = async (e) => {
    e.preventDefault();
    console.log("mob no: ", formData.phoneno.length);
    if (formData.phoneno.length !== 10) {
      alert("Only 10 Digit mobiles numbers allowed");
      return null;
    }

    if (!userExists) {
      setLoginState(loginState => "accountCreating");
      try {
        await createaccountnew({ formData, setLoginState });
        //await new Promise(resolve => setTimeout(resolve, 3000));

        setLoginState(loginState => "OTPsending");
        await createaccountnewFirebase(formData);
        sendotpphoneno({ formData, setLoginState });
      } catch (error) {
        console.error("Error creating account:", error);
        // Handle error if necessary
      }
    } else {
      setLoginState(loginState => "OTPsending");
      sendotpphoneno({ formData, setLoginState });
    }

  }





  const inActiveColor = {
    color: "grey",
    backgroundColor: "lightgrey",
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderWidth: "1px"
  }

  const activeColor = {
    color: "white",
    backgroundColor: "var(--themeColor)",
    borderStyle: "none",
    borderWidth: "1px"
  }




  return (
    <div className={classes.mainContainer}>

      <div className={classes.bodyContainer}>
        <div className={classes.secondContainer}>
          <div className={classes.leftContainer}>

            {(loginState === "OTPnotrequested" || loginState === "OTPsending" || loginState === "accountCreating" || loginState === "accountCreated") && <div className={classes.holder}>

              <div className={classes.textContainer}>
                <div className={classes.headContainer}>
                  <b>Get Started </b>
                </div>
                <div className={classes.titleContainer}>
                  Connect . Learn . Teach . Manage
                </div>

              </div>
              <div className={classes.firstInput}>
                <div className={classes.flagcode}>
                  <img className={classes.flagImg} src={flag} alt="logo" />
                  <div className={classes.countryCode}> +91 </div>
                </div>
                <input type="number"
                  className={classes.textInput}
                  placeholder="Enter your number"
                  onChange={handleChangeInputHandler}
                  name="phoneno"
                />

              </div>
              {formData.phoneno !== "" &&
                <div className={classes.fieldtype}>
                  {/*formData.inputfield.includes("@") && <span style={{ color: "green" }}>email detected</span>*/}

                  {/*!isLengthTen(formData.inputfield.replace('+', '')) && <>
                    <span style={{ color: "red" }}>
                      Invalid length{" , "}
                    </span>
                  </>
                  */}

                  {userExists &&
                    <span className={classes.userExistSymbol} style={{ color: "green" }} > Number Registered </span>
                  }

                  {!userExists &&
                    <span className={classes.userExistSymbol2} style={{ color: "red" }} > Number Not Registered </span>
                  }
                </div>
              }


              <div className={classes.thirdInput}>
                {loginState === "OTPnotrequested" &&
                  <button className={classes.signInButton}
                    onClick={handleSubmitGetOTP}
                    type="button"
                    style={formData.phoneno.length === 10 ? activeColor : inActiveColor}

                  >
                    Continue
                  </button>
                }

                {loginState === "accountCreating" && <>

                  <button className={classes.signInButton} onClick={handleSubmitGetOTP} type="button" disabled={true}>
                    Registering ...
                  </button>

                  <div style={{ margin: 'auto' }}>
                    <FadeLoader color={color} loading={true} css={override} size={50} />
                  </div>
                </>

                }


                {loginState === "accountCreated" && <>

                  <button className={classes.signInButton} onClick={handleSubmitGetOTP} type="button" disabled={true}>
                    Registered!
                  </button>

                </>
                }


                {loginState === "OTPsending" && <>
                  <button className={classes.signInButton} onClick={handleSubmitGetOTP} type="button" disabled={true}>
                    Sending OTP ...
                  </button>
                  <div style={{ margin: 'auto' }}>
                    <FadeLoader color={color} loading={true} css={override} size={50} />
                  </div>

                </>
                }


              </div>


              <div className={classes.dividerContainer}>
                <div className={classes.leftDivider}>

                </div>
                <div className={classes.textDivider}>
                  OR
                </div>
                <div className={classes.rightDivider}>

                </div>
              </div>
              <div className={classes.secondInput}>
                <button>
                  <img src={picture1} alt="google image" />
                  <div className={classes.googleDiv}>
                    Continue with google.
                  </div>
                </button>
              </div>

              <div className={classes.termsContainer}>
                <input type="checkbox" defaultChecked className={classes.checkBox} />
                &nbsp;&nbsp;By continuing you are agreeing to our&nbsp;
                <a href="https://diracai.com/TermsofUse">terms of service</a> and <a href="https://diracai.com/Privacypolicy">privacy policy.</a>
              </div>

              {/* <div className={classes.secondInput}>
                <button onClick={createAccountPageHandler}>
                  <div className={classes.googleDiv}>
                    New to DashoApp ? Join now.
                  </div>
                </button>
              </div> 
	      */}

            </div>
            }


            {loginState === "OTPsent" &&
              <OTPscreen inputfield={formData.phoneno} setLoggedIn={setLoggedIn} />
            }


          </div>
          {(landingPage || learnPage) && <div className={classes.rightContainer}>
            <div className={classes.topTextContainer}>
              Welcome to The Collaborative <span className={classes.live} style={{ color: "var(--themeColor)" }}>Live </span>  Teaching and Learning Ecosystem
            </div>
            <div className={classes.imageContainer}>
              <img src={picture6} alt="picture1" className={classes.teachImgCont} />
              <img src={picture7} alt="picture2" className={classes.studentImgCont} />
            </div>
            <div className={classes.bottomTextContainer}>
              Connect . Learn . Teach . Manage
            </div>
          </div>}
          {connectPage && <div className={classes.rightContainer}>
            <div className={classes.topTextContainer}>
              Welcome to The Collaborative <span className={classes.live} style={{ color: "var(--themeColor)" }}>Live </span>  Teaching and Learning Ecosystem
            </div>
            <div className={classes.imageContainer}>
              <img src={picture6} alt="picture1" className={classes.teachImgCont} />
              <img src={picture7} alt="picture2" className={classes.studentImgCont} />
            </div>
            <div className={classes.bottomTextContainer}>
              Connect
            </div>
          </div>}
          {teachPage && <div className={classes.rightContainer}>
            <div className={classes.topTextContainer}>
              Welcome to The Collaborative <span className={classes.live} style={{ color: "var(--themeColor)" }}>Live </span>  Teaching and Learning Ecosystem
            </div>
            <div className={classes.imageContainer}>
              <img src={picture2} alt="picture1" className={classes.teachImgCont} />
            </div>
            <div className={classes.bottomTextContainer}>
              Connect . Learn . Teach . Manage
            </div>
          </div>}

          {managePage && <div className={classes.rightContainer}>
            <div className={classes.imageContainer1}>
              <img src={picture5} alt="picture1" />
            </div>


            <div className={classes.bottomTextContainer1}>
              <div className={classes.managementBlock}>
                <div className={classes.classIcon}>
                  < BsBuilding />
                </div>
                <div>Institute Management</div>
              </div>
              <div className={classes.managementBlock}>
                <div className={classes.classIcon}> <BsCreditCard /></div>
                <div>Fees and Payments</div>
              </div>
              <div className={classes.managementBlock}>
                <div className={classes.classIcon}> <BsPencilSquare /></div>
                <div>Exam Management</div>
              </div>
              <div className={classes.managementBlock}>
                <div className={classes.classIcon}> <BsBarChartLineFill /></div>
                <div className={classes.attendenceTitle}>Attendance and Leave Tracking, etc.</div>
              </div>
            </div>
          </div>}
        </div>
        <div className={classes.thirdContainer}>
          Where Everyone Teaches, Everyone Learns.

        </div>
      </div>
    </div>

  );
}

export default App;
