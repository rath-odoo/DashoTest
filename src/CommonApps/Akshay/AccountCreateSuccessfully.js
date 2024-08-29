import classes from "./Login.module.css";
import cover from "./loginImage.jpg";
import {
  BsGoogle,
  BsFacebook,
  BsLinkedin,
  BsCheckCircleFill,
  BsCheckCircle,
  BsCheck2Circle,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

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

            <div className={classes.successIconDiv}>
              <BsCheck2Circle className={classes.iconSuccess} />
            </div>

            <div className={classes.loginTitleText}>
              Account Created Successfully
            </div>

            <div className={classes.mainContainerOpt}>
              {/* <img className={classes.flagImg} src={flag} alt="logo"></img> */}

              {/* <div className={classes.countryCode}>+91</div> */}
              {/* <input
                className={classes.editmobileNuBox}
                type="text"
                placeholder="Enter Email / Mobile Number"
              /> */}
              {/* 
              <input
                className={classes.num1Box}
                type="text"
              />

              <input
                className={classes.num2Box}
                type="text"
              />

              <input
                className={classes.num3Box}
                type="text"
              />

              <input
                className={classes.num4Box}
                type="text"
              />

              <input
                className={classes.num5Box}
                type="text"
              /> */}
            </div>

            <button className={classes.procedToLogin}>Login</button>

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
              <button className={classes.contactUS}>Contact US</button>
              <button className={classes.termOfService}>
                Terms Of Service
              </button>
              <button className={classes.privacyText}>Privacy Policy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
