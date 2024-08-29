import classes from "./ChapterNTopics.module.css";

import { BsPencilSquare } from "react-icons/bs";

import { MdListAlt } from "react-icons/md";

const ChapterNTopics=(props)=> {




  console.log("props.oneClass: ", props.oneClass);

  return (
    <div className={classes.parentContainer}>
      <div className={classes.instituteBar}>
        <div className={classes.topbar}>
          <div className={classes.topConatiner}>
            <div className={classes.topicsIcon}>
              <MdListAlt />
            </div>

            <div className={classes.ChapterntopicsTitle}>
              Chapter And Topics
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


              {props.oneClass.topics.map((topic, index)=>{

                return <span key={index}> {topic.name} </span>
              })}

              { props.oneClass.topics.length === 0 &&
                        <span style={{color:"red"}}>

                         Not set!!
                        </span>
              }

          </div>
        </div>
      </div>
    </div>
  );
}
export default ChapterNTopics;
