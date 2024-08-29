import {useState} from 'react';
import classes from "./MeetingCard.module.css";
import { BsLink45Deg, BsCameraVideo } from "react-icons/bs";




const MeetingCard=(props)=> {



  const openMeetingHandler=()=>{

    window.open( props.oneClass.meetingLink, '_blank', 'noreferrer');

  }


  const [linkCopied, setLinkCopied]=useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));


  const copyMeetingLinkToClipBoardHandler=async()=>{

        navigator.clipboard.writeText(props.oneClass.meetingLink);
        setLinkCopied(true);
        await delay(3000);
        setLinkCopied(false);



  }	



  return (
    <div className={classes.parentsCard}>



      <div className={classes.mainParentCard}>
        <div className={classes.mainContainer}>
          <div className={classes.meetingText}>Meeting Link :</div>
          
          { !linkCopied &&
          <button className={classes.copyLinkBtn} type="button" onClick={copyMeetingLinkToClipBoardHandler}>
            <BsLink45Deg />
            <div className={classes.copyText}>Copy</div>
          </button>
          }

          { linkCopied &&
          <button className={classes.copyLinkBtn} type="button">
            <BsLink45Deg />
            <div className={classes.copyText}>Copied</div>
          </button>
          }




        </div>

        <button className={classes.JoinClassButton} type="button" onClick={openMeetingHandler}>
	     <BsCameraVideo/> <span>Join Class</span>
	</button>
      </div>

      <button className={classes.mettingLinkUrl} type="button" onClick={openMeetingHandler}>
	  {props.oneClass.meetingLink}
      </button>
    </div>
  );
}
export default MeetingCard;
