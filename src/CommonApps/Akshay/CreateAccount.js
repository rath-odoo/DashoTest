//import logo from "./logo.svg";
import classes from "./login.module.css";
//import "typeface-roboto";
import cover from "./education2.jpg";
import { BsGoogle, BsFacebook, BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";



const TnSHandler = () => {
  window.open("https://diracai.com/terms-conditions/", "_blank");
};

const privacyHandler = () => {
  window.open("https://diracai.com/privacy-policy/", "_blank");
};

const contanctUs = () =>{
  window.open("https://diracai.com/contact-us/")
}



function App() {
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

            <div className={classes.loginTitleText}>Create Account</div>

            <div className={classes.mainContainer}>
              {/* <img className={classes.flagImg} src={flag} alt="logo"></img> */}

              {/* <div className={classes.countryCode}>+91</div> */}
              <input
                className={classes.editmobileNuBox}
                type="text"
                placeholder="Enter Email / Mobile Number"
              />
            </div>

            <div className={classes.captcha}>
              <ReCAPTCHA
                className={classes.grecaptcha}
                sitekey="6LdtMAghAAAAAGLqRpJ0hMuAWK4X15_zQfbvBuX-"
                // onChange={onChangeCaptchaHandler}
                data-badge="center"
              />
            </div>

            <button className={classes.createBtn}>Create</button>

            <div className={classes.horizontalContainer2}>
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
            </div>

          </div>

          <div className={classes.bottomBar}>

            <div className={classes.textTitleBottom1}>
              <button className={classes.contactUS} onClick={contanctUs}>Contact US</button>
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
    </div>
  );
}

export default App;
