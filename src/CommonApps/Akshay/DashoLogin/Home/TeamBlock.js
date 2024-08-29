import classes from "./TeamBlock.module.css";
import bookAppointment from "./bookAppointment.jpg";
import pic1 from "./p1.jpg";
import pic2 from "./p2.jpg";
import pic3 from "./t2.jpg";
import pic4 from "./t4.jpg";
import { FaFacebookF } from "react-icons/fa";

import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";



function TeamBlock() {
  return (
    <div className={classes.TeamBlockParent}>
      <div className={classes.parentOurTeam}>
        <div className={classes.ourTeam}>
          <div className={classes.ourTeamTitle}>Our Toppers</div>
          <div className={classes.ourTeamSubTitle}> Meet our Toppers</div>
        </div>

        <div className={classes.allTeamMemberdetail}>
          
          <div className={classes.ourTeamdetailContainer}>
            <img className={classes.developerPic1} src={pic1} alt="logo"></img>

            <div className={classes.developerName}>Kailash Das</div>

            <div className={classes.developerRole}>UPSC Topper</div>

            <div className={classes.socialNetworking}>
              <FaFacebookF className={classes.pic1} />
              <BsTwitter className={classes.pic2} />
              <AiFillInstagram className={classes.pic3} /> 
            </div>
          </div>

          <div className={classes.ourTeamdetailContainer}>
            <img className={classes.developerPic2} src={pic2} alt="logo"></img>

            <div className={classes.developerName}>Khushboo Sharma</div>

            <div className={classes.developerRole}>IIT JEE Topper</div>

            <div className={classes.socialNetworking}>
              <FaFacebookF className={classes.pic1} />
              <BsTwitter className={classes.pic2} />
              <AiFillInstagram className={classes.pic3} />
            </div>
          </div>

          <div className={classes.ourTeamdetailContainer}>
            <img className={classes.developerPic3} src={pic3} alt="logo"></img>

            <div className={classes.developerName}>Ridhima Pandey</div>

            <div className={classes.developerRole}>CAT Topper</div>

            <div className={classes.socialNetworking}>
              <FaFacebookF className={classes.pic1} />
              <BsTwitter className={classes.pic2} />
              <AiFillInstagram className={classes.pic3} />
            </div>
          </div>

          <div className={classes.ourTeamdetailContainer}>
            <img className={classes.developerPic4} src={pic4} alt="logo"></img>

            <div className={classes.developerName}>Licypriya Kangujam</div>

            <div className={classes.developerRole}>NEET Topper</div>

            <div className={classes.socialNetworking}>
              <FaFacebookF className={classes.pic1} />
              <BsTwitter className={classes.pic2} />
              <AiFillInstagram className={classes.pic3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamBlock;
