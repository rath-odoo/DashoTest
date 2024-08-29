import classes from "./Testimonial.module.css";
import React, { useRef, useEffect } from "react";

import bookAppointment from "./bookAppointment.jpg";
import t1 from "./t1.jpg";
import t2 from "./t2.jpeg";
import t3 from "./t3.jpg";

import Arindam from "./Arindam.jpeg";

import { AiFillTwitterCircle } from "react-icons/ai";

function Testimonial() {
  // const divRef = useRef(null);

  // // Automatically scroll the div to the right on component mount
  // useEffect(() => {
  //   const scrollDiv = divRef.current;
  //   if (scrollDiv) {
  //     scrollDiv.scrollLeft = scrollDiv.scrollWidth - scrollDiv.clientWidth;
  //   }
  // }, []);

  return (
    <div className={classes.TestimonialParent}>
      <div className={classes.ourClientDetails}>
        {/* <div className={classes.clientTitle}> Voices of Change </div> */}
        <div className={classes.clientSubTitle}>
          {" "}
          Words from Our Achievers..
        </div>

        <div className={classes.clientFeedbackContainer}>
          <div className={classes.aboutClinetBox}>
            <div className={classes.clientFeedback}>
              <img className={classes.clientImg} src={Arindam} alt="logo"></img>

              <AiFillTwitterCircle className={classes.socialNetworkImage} />
            </div>

            <div className={classes.clientDetails}>
              As an RERA activist, I feel a deep sense of fulfillment in helping
              homebuyers navigate the complexities of the real estate market.
            </div>

            <div className={classes.clientName}>Arindam Choudhury</div>

            <div className={classes.clientStatus}>
              Former Secretary (Trident Galaxy Residential Welfare Association)
            </div>
          </div>

          <div className={classes.aboutClinetBox}>
            <div className={classes.clientFeedback}>
              <img className={classes.clientImg} src={t2} alt="logo"></img>

              <AiFillTwitterCircle className={classes.socialNetworkImage} />
            </div>
            <div className={classes.clientDetails}>
              As an RERA activist, I feel a deep sense of fulfillment in helping
              homebuyers navigate the complexities of the real estate market.
            </div>

            <div className={classes.clientName}>Pradipta Varma</div>

            <div className={classes.clientStatus}>
              Advocate (Bhubhneswar, Odisha)
            </div>
          </div>

          <div className={classes.aboutClinetBox}>
            <div className={classes.clientFeedback}>
              <img className={classes.clientImg} src={t3} alt="logo"></img>

              <AiFillTwitterCircle className={classes.socialNetworkImage} />
            </div>
            <div className={classes.clientDetails}>
              As an RERA activist, I feel a deep sense of fulfillment in helping
              homebuyers navigate the complexities of the real estate market.
            </div>

            <div className={classes.clientName}>Dr. Umashankar Dash</div>

            <div className={classes.clientStatus}>IPS (Cuttack, Odisha)</div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
