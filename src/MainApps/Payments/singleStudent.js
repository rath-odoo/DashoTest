import classes from "./singleStudent.module.css";
import { FaPen } from "react-icons/fa";
import image from "./student.jpeg";

function App() {
  return (
    <div className={classes.studentParents}>
      <div className={classes.studentSectionMainContainer}>
        <div className={classes.profileContainer}>
          <img src={image} className={classes.pic} />

          <div className={classes.StudentName}>Akshay Bhasme</div>
        </div>

        <div className={classes.total}>1000</div>
        <div className={classes.Paid}>500</div>
        <div className={classes.PaidDate}>01/12/2024</div>

        <div className={classes.Due}>500</div>

        <div className={classes.editbuttonContainer}>
          <FaPen className={classes.editBtn}></FaPen>
        </div>
      </div>

      <div className={classes.horizontalLine}></div>
    </div>
  );
}
export default App;
