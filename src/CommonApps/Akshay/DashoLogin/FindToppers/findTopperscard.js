import {useState, useEffect} from 'react';
import classes from "./findTopperscard.module.css";
import office3 from "./TeenaBhabi.png";
import { BsFillStarFill, BsTranslate,BsLayoutTextWindowReverse } from 'react-icons/bs';
import basewebURL from '../../basewebURL';
import { FaRupeeSign } from "react-icons/fa";




const TopperCard=(props)=> {




   let profilepath = basewebURL+"/topperprofile/"+props.user.id;

   const showTopperProfileHandler=()=>{
     window.open(profilepath,"_blank");
   }

   const [aboutHeight, setAboutHeight] = useState("100px");

   const readMoreHandler=()=>{
     setAboutHeight(aboutHeight=>"auto");
   }

   const hideHandler=()=>{
   setAboutHeight(aboutHeight=>"100px");
   }





  return (
    <div className={classes.parentCard}>
      <div className={classes.leftContainer}>
        <div className={classes.picContainer}>
          <img src={props.user.profile_image} className={classes.personpic} />
        </div>
        <div className={classes.price}> 
	     <FaRupeeSign size={17}/> 
	     <span style={{fontSize:"18px"}}>{props.user.hourlyrate} / 30min </span> 
	</div>

        <button className={classes.bookBtnContainer1} type="button" onClick={showTopperProfileHandler}>
            <div className={classes.bookTitle}>Book Now</div>
        </button>

	{/*
          <div className={classes.pricephr}>INR/H</div>
	*/}
      </div>

      <div className={classes.midContainer}>
        <div className={classes.FeaturedTitleBtn}>{props.user.mentoringtag}</div>
        <div className={classes.Username} onClick={showTopperProfileHandler}>{props.user.firstname+" "+props.user.lastname}</div>

        <div className={classes.langContainer}>
          <div className={classes.l1Container}>
            <BsTranslate size={20} className={classes.l1icon}/>
            <div className={classes.l1Lang}>{props.user.languages}</div>
          </div>
        </div>

        <div className={classes.lessonContainer}>
          <BsLayoutTextWindowReverse className={classes.lessionIcon} />
          <div className={classes.firstContainer}>
            <div className={classes.lessionTitle}>Lessons :</div>
            <div className={classes.lessionDetails}>{props.user.nooflessions}</div>
          </div>
          <div className={classes.secContainer}>
            <div className={classes.lessionTitle}>Students :</div>
            <div className={classes.lessionDetails}>{props.user.noofstudents}</div>
          </div>
        </div>

        <div className={classes.aboutuserDetails} style={{minHeight:"50px", height: aboutHeight}} >
	    {props.user.about+"..."}
        </div>

	{ aboutHeight ==="100px" && 
        <button type="button" className={classes.readMoreBtn} onClick={readMoreHandler}>Read More</button>
	}

        { aboutHeight ==="auto" &&
        <button type="button" className={classes.readMoreBtn} onClick={hideHandler}>Hide Text</button>
        }
       
      </div>

      <div className={classes.rightContainer}>
        <div className={classes.topContainer}>
          <div className={classes.ratingContainer}>
            <div className={classes.starContainer}><BsFillStarFill style={{color:"#FFDF00"}} size={18} /></div>
            <div className={classes.star}>{props.user.noofstars}</div>
          </div>
          <div className={classes.totalRating}>(Ratings:{props.user.totalratings})</div>
          
          <button className={classes.bookBtnContainer} type="button" onClick={showTopperProfileHandler}>
            <div className={classes.bookTitle}>Book Now</div>
          </button>
	  
        </div>

        <div className={classes.bottomContainer}>
          {/* <div className={classes.iconContainerheart}></div> */}
        </div>
      </div>
    </div>
  );
}

export default TopperCard;

