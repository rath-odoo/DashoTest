import { send } from "process";
import classes from "./ContactUs.module.css";
import office from "./office.jpg";
import {
  BsTwitter,
  BsFillGeoAltFill,
  BsFillTelephoneFill,
  BsFillEnvelopeFill,
  BsFacebook,
  BsLinkedin,
  BsYoutube,
  BsCalendar2EventFill,
  BsCalendar3 
} from "react-icons/bs";
import { MdLocationOn, MdCall, MdEmail } from "react-icons/md";
import { useEffect, useState, useRef } from "react";

const ContactUs = (props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);

    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  return (
    <div className={classes.contactUsParentmain}>
      <div className={classes.contactUsParent}>
        <div className={classes.content}>
          <div className={classes.heading1}>Our office</div>

          <div className={classes.addressContainer}>
            <BsFillGeoAltFill className={classes.addressIcon} />

            <div className={classes.addressHead}>Address : </div>
            <div className={classes.addressDetails}>
              BL-B, Chandaka Meadows Apartment, Chandaka, Bhubaneswar
            </div>
          </div>

          <div className={classes.phoneContainer}>
            <BsFillTelephoneFill className={classes.phoneIcon} />
            <div className={classes.phoneHead}>Phone : </div>
            <div className={classes.phoneDetails}>+91 9777403777</div>
          </div>

          <div className={classes.emailContainer}>
            <BsFillEnvelopeFill className={classes.emailIcon} />
            <div className={classes.emailHead}>Email : </div>
            <div className={classes.emailDetails}>support@hellotoppers.com</div>
          </div>

          <div className={classes.SocialMediaTitle}>Social Media</div>

          <div className={classes.mainContainerIcon}>
            <BsFacebook className={classes.icon1Container} />
            <BsTwitter className={classes.icon2Container} />
            <BsLinkedin className={classes.icon3Container} />
            <BsYoutube className={classes.icon4Container} />
          </div>

          <div className={classes.BusinessDetails}>Business Hours</div>
          <div className={classes.details1}>
            Our team is available to assist you during the following hours:
          </div>

          <div className={classes.bContainer1}>
            <BsCalendar3  className={classes.dayIcon}/>
            <div className={classes.dayHead}>Monday to Sunday</div>
            <div className={classes.daytimeDetails}>10 a.m. to 7 p.m.</div>
          </div>


          <div className={classes.details2}>
            Please note that response times may vary, and we appreciate your
            patience.
          </div>

          <div className={classes.getinTouchTitle}>Get In Touch</div>

          <div className={classes.getintouchdetails3}>
            Welcome to the Hello Topper Contact Us page! We're here to assist
            you with any questions, concerns, or feedback you may have. Please
            feel free to get in touch with us using the information below:
          </div>
        </div>

        <div className={classes.form}>
          <div className={classes.formContainer}>
            <div className={classes.headingText}>Connect with us</div>

            <div className={classes.horizontalLine}></div>

            <div className={classes.topContainer}>
              <div className={classes.firstContainer}>
                <div className={classes.firstNameText}>First Name :</div>
                <input className={classes.firstNameEditBox} type="text" />
              </div>

              <div className={classes.secContainer}>
                <div className={classes.lastNameText}>Last Name :</div>
                <input className={classes.lastNameEditBox} type="text" />
              </div>
            </div>

            <div className={classes.emailContainer}>
              <div className={classes.textEmail}>Email Address :</div>

              <input className={classes.emailEditBox} type="text" />
            </div>
            {/*
          <div className={classes.companyContainer}>
            <div className={classes.textCompany}>Company Name :</div>

            <input className={classes.companyEditBox} type="text" />
          </div>
           */}

            <div className={classes.phoneContainer}>
              <div className={classes.textphone}>Phone Number :</div>

              <input className={classes.phoneEditBox} type="text" />
            </div>

            <div className={classes.messageContainer}>
              <div className={classes.textMessage}>Message :</div>

              <textarea className={classes.messageEditBox} type="text" />
            </div>

            <div className={classes.sendBtnContainer}>
              <button className={classes.sendBtn}>Send</button>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.horizontalBorder}></div>

      <div className={classes.t1}>General Inquiries</div>

      <div className={classes.d1}>
        For general inquiries, please email us at: support@hellotoppers.com
      </div>

      <div className={classes.t1}>Support</div>

      <div className={classes.d1}>
        If you need assistance or have specific questions about our platform or
        services, our support team is here to help. Reach out to us at:
        support@hellotoppers.com
      </div>

      <div className={classes.t1}>Partnerships and Collaboration</div>

      <div className={classes.d1}>
        For partnership opportunities, collaborations, or media inquiries,
        please contact our partnerships team at: support@hellotoppers.com
      </div>

      <div className={classes.t1}>Technical Support</div>

      <div className={classes.d1}>
        If you're experiencing technical issues with our website or platform,
        please contact our technical support team at: support@hellotoppers.com
      </div>

      <div className={classes.t1}>Feedback</div>

      <div className={classes.d1}>
        We value your feedback! If you have any suggestions, comments, or ideas
        for improvement, please let us know at: support@hellotoppers.com
      </div>

      <div className={classes.d2}>
        Thank you for choosing Hello Topper. We look forward to hearing from
        you!
      </div>
    </div>
  );
};

export default ContactUs;
