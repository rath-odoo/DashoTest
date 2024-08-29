import classes from "./singleUserGrades.module.css";

import { BsFillCheckCircleFill } from "react-icons/bs";

import img from "./img.jpg";

function singleViewGrades() {
  return (
    <button className={classes.singleGradesParent}>


      <div className={classes.singleGrades}>
      
        <div className={classes.imagePic}>
          <img className={classes.pic} src={img} alt="logo"></img>
        </div>

        <div className={classes.rightDetailsContainer}>
          <div className={classes.details}>
            <div className={classes.UserName}>Bhibhuprasad Mahkud</div>

            <button className={classes.addGradesbtn}>Add Grades</button>
          </div>

          <BsFillCheckCircleFill className={classes.checkedBtn} />
        </div>
        </div>
 
    </button>
  );
}
export default singleViewGrades;
