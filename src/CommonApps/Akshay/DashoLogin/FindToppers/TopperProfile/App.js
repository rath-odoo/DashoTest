import {useState, useEffect} from 'react';
import classes from "./App.module.css";
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
import Rating from "./Rateing";
import ProfileCard from "./ProfileCard";
import Slots from "./Slot";

import {gettopperprofile} from '../../../CommonApps/AllAPICalls';
import ReactPlayer from 'react-player';


const App=(props)=> {



   const [topperProfile, getTopperProfile] = useState(null);
   


   useEffect(()=>{

    let topperId = props.topperId;
    gettopperprofile({topperId, getTopperProfile});

   },[]);



  console.log("topperProfile-- ",topperProfile );




  //<img src={video} className={classes.mainImg} />


  return (
    <div className={classes.profileParent}>
      <div className={classes.mainContainer}>
       
	  { topperProfile !==null &&
	  <div className={classes.videoSection}>
	    <ReactPlayer url={topperProfile.profilevideolink} width="100%" height="100%"  controls={false} />
          </div>
	  }
        

        { topperProfile !==null &&
        <ProfileCard  topperProfile={topperProfile}/>
        }
        {/* <div className={classes.profileCardDetails}>
          <div className={classes.leftSide}>
            <div className={classes.profilePic}>
              <img src={Dp} className={classes.mainprofilePic} />
            </div>

            <div className={classes.bookbtn}>Book Trial</div>
          </div>

          <div className={classes.rightSide}>
            <div className={classes.topContainer}>
              <div className={classes.NameContainer}>Akshay Bhasme</div>

              <div className={classes.rattingContainer}>
                <BsStarFill className={classes.rattingIcon} />
                <div className={classes.ratingNumber}>4.9</div>
              </div>

              <BsHeart className={classes.HeartBtn} />
            </div>
            <div className={classes.midContainer}>
              <BsFillGeoAltFill className={classes.location} />

              <div className={classes.locationName}>
                Canada • 22:51 (GMT-05:00)
              </div>
            </div>

            <div className={classes.bottomContainer}>
              <div className={classes.container1}>
                <div className={classes.teachesContainer}>
                  <BsFillLaptopFill className={classes.icon1} />

                  <div className={classes.detailsContainer}>
                    <div className={classes.heading}>Teaches</div>
                    <div className={classes.headingDetails}>English</div>
                  </div>
                </div>
              </div>

              <div className={classes.container2}>
                <div className={classes.teachesContainer}>
                  <BsFillPeopleFill className={classes.icon1} />

                  <div className={classes.detailsContainer}>
                    <div className={classes.heading}>Teaches</div>
                    <div className={classes.headingDetails}>English</div>
                  </div>
                </div>
              </div>

              <div className={classes.container3}>
                <div className={classes.teachesContainer}>
                  <BsStopwatchFill className={classes.icon1} />

                  <div className={classes.detailsContainer}>
                    <div className={classes.heading}>Teaches</div>
                    <div className={classes.headingDetails}>English</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.languageContainer}>
              <div className={classes.languageTitle}>Language :</div>

              <div className={classes.lang}>Hindi, Marathi, English</div>
            </div>
          </div>
        </div> */}



        <div className={classes.aboutmeContainer}>
          <div className={classes.aboutmeTitle}>About Me</div>

	  { topperProfile !==null &&
          <div className={classes.detailsaboutme}>
		 {topperProfile.about}
          </div>

	 }

          <div className={classes.readmore}>Read More...</div>
        </div>

	  
         {/* topperProfile !==null &&
        <Rating topperProfile={topperProfile}/>
          */}

	{ topperProfile !==null &&

            <Slots topperId={topperProfile.id}/>

	}		


      </div>
    </div>
  );
}

export default App;
