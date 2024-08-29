import classes from "./Testimonial.module.css";
import React, { useRef, useEffect } from 'react';


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
	 {/*
        <div className={classes.clientTitle}> Voices of Change </div>
	 */}
        <div className={classes.clientSubTitle}>What toppers say..</div>




        <div className={classes.clientFeedbackContainer} >
          
          <div className={classes.aboutClinetBox}>
            <div className={classes.clientFeedback}>
              <img className={classes.clientImg} src={Arindam} alt="logo"></img>

              <AiFillTwitterCircle className={classes.socialNetworkImage} />
            </div>

            <div className={classes.clientDetails}>
              As an RERA activist, I feel a deep sense of fulfillment in helping
              homebuyers navigate the complexities of the real estate market.
            </div>

            <div className={classes.clientName}>Teena Dhabi</div>

            <div className={classes.clientStatus}>
              UPSC Topper 2018
            </div>
          </div>

          <div className={classes.aboutClinetBox}>
            <div className={classes.clientFeedback}>
              <img className={classes.clientImg} src={Arindam} alt="logo"></img>

              <AiFillTwitterCircle className={classes.socialNetworkImage} />
            </div>
            <div className={classes.clientDetails}>
              As an RERA activist, I feel a deep sense of fulfillment in helping
              homebuyers navigate the complexities of the real estate market.
            </div>

            <div className={classes.clientName}>Pradipta Varma</div>

            <div className={classes.clientStatus}>
              IIT JEE Topper, 2019
            </div>
          </div>

          <div className={classes.aboutClinetBox}>
            <div className={classes.clientFeedback}>
              <img className={classes.clientImg} src={Arindam} alt="logo"></img>

              <AiFillTwitterCircle className={classes.socialNetworkImage} />
            </div>
            <div className={classes.clientDetails}>
              As an RERA activist, I feel a deep sense of fulfillment in helping
              homebuyers navigate the complexities of the real estate market.
            </div>

            <div className={classes.clientName}>Dr. Umashankar Dash</div>

            <div className={classes.clientStatus}> CAT Topper, 2008</div>
          </div>

       

        </div>



      </div>
    </div>
  );
}

export default Testimonial;
