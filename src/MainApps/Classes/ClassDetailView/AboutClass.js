import classes from "./ChapterNTopics.module.css";

import { BsPencilSquare } from "react-icons/bs";

import { MdListAlt } from "react-icons/md";

const AboutClass=(props)=> {



  return (
    <div className={classes.parentContainer}>
      <div className={classes.instituteBar}>
        <div className={classes.topbar}>
          <div className={classes.topConatiner}>
            <div className={classes.topicsIcon}>
              <MdListAlt />
            </div>

            <div className={classes.ChapterntopicsTitle}>
              ABOUT
            </div>
          </div>
          {/*
          <button className={classes.editBtnContainer}>
            <BsPencilSquare className={classes.editbutton} />

            <div className={classes.editText}>Edit</div>
          </button>
	  */}
        </div>

        <div className={classes.Maincontainer}>
	  {/*
          <div className={classes.classTitle}>Laws Of Motion</div>
	  */}
          <div className={classes.classDetails}>

             {props.oneClass.about !==null  && props.oneClass.about !=="" && props.oneClass.about}


             { (props.oneClass.about ===null  ||  props.oneClass.about ==="") && <span style={{color: "red"}}> Not set</span>}


          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutClass;
