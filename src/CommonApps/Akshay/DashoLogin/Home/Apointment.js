import classes from "./Apointment.module.css";
import bookAppointment from "./bookAppointment.jpg";
import img from "./appointment.jpg";

import { useHistory } from "react-router-dom";

function Appointment() {

  
  const history = useHistory();
  const contactPageHandler = () => {
    history.push("/contactus");
  };


  return (
    <div className={classes.bookAppointment}>
      <img className={classes.bookpic} src={img} alt="logo"></img>

      <div className={classes.bookDetail}>
        <div className={classes.bookDetailContainer}>
          <div className={classes.bookTitle}>Book Appointment</div>
          <div className={classes.booksubTitle}>
            We take pride in serving you. Welcome, Dear Homebuyer!
          </div>

          <button className={classes.bookaptBtn} onClick={contactPageHandler}>
            <div className={classes.bookaptText}> Book Appointment</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
