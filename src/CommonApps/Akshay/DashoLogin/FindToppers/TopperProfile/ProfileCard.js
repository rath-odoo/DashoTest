import classes from "./ProfileCard.module.css";

import video from "./video.jpg";
import Dp from "./profile1.jpg";
import {
  BsStarFill,
  BsHeart,
  BsFillGeoAltFill,
  BsStopwatchFill,
  BsFillPeopleFill,
  BsFillLaptopFill,
} from "react-icons/bs";
import Rateing from "./Rateing";

import { FaRupeeSign } from "react-icons/fa";

const ProfileCard=(props)=>{


    return(

        <div className={classes.profileCardDetails}>
        <div className={classes.leftSide}>
          <div className={classes.profilePic}>
            <img src={props.topperProfile.profile_image} className={classes.mainprofilePic} />
          </div>
          <div className={classes.bookbtn1}> <FaRupeeSign/>580 / 30min</div>
          <div className={classes.bookbtn}>Book Now</div>
        </div>

        <div className={classes.rightSide}>
          <div className={classes.topContainer}>
            <div className={classes.NameContainer}>{props.topperProfile.firstname+" "+props.topperProfile.lastname}</div>
             {/*
              <div className={classes.rattingContainer}>
                <BsStarFill className={classes.rattingIcon} />	      
                <div className={classes.ratingNumber}>{props.topperProfile.noofstars}</div>	      
              </div>
            */}

            <BsHeart className={classes.HeartBtn} />
          </div>
          <div className={classes.midContainer}>
            <BsFillGeoAltFill className={classes.location} />

            <div className={classes.locationName}>
	    {props.topperProfile.profilehighlighttag}
            </div>
          </div>

          <div className={classes.bottomContainer}>
            <div className={classes.container1}>
              <div className={classes.teachesContainer}>
                <BsFillLaptopFill className={classes.icon1} />

                <div className={classes.detailsContainer}>
                  <div className={classes.heading}>Exam Yr</div>
                  <div className={classes.headingDetails}> {props.topperProfile.mentoringexamnyear}</div>
                </div>
              </div>
            </div>

            <div className={classes.container2}>
              <div className={classes.teachesContainer}>
                <BsFillPeopleFill className={classes.icon1} />

                <div className={classes.detailsContainer}>
                  <div className={classes.heading}>Rank</div>
                  <div className={classes.headingDetails}>{props.topperProfile.noofstudents}</div>
                </div>
              </div>
            </div>

            <div className={classes.container3}>
              <div className={classes.teachesContainer}>
                <BsStopwatchFill className={classes.icon1} />

                <div className={classes.detailsContainer}>
                  <div className={classes.heading}>Sessions</div>
                  <div className={classes.headingDetails}>{props.topperProfile.nooflessions}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.languageContainer}>
            <div className={classes.languageTitle}>Language :</div>

            <div className={classes.lang}>{props.topperProfile.languages}</div>
          </div>
        </div>
      </div>

    );
}
export default ProfileCard;
