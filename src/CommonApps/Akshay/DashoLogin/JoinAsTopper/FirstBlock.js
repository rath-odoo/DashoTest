import classes from "./FirstBlock.module.css";
import bookAppointment from "./about1.png";
import image from "./office1.jpg";
import topperImage2 from './topper_mentor_4.jpg';


function FirstBlock() {
  return (
    <div className={classes.LeftImageRightTextParent}>
      <div className={classes.websiteContent2}>
        <div className={classes.detailContainer2}>
          <div className={classes.aboutHeading1}>Recruitment</div>

          <div className={classes.aboutHeading2}>
	     How It Works?
          </div>


          
          <div className={classes.aboutDetails}>

              <ul>

                 <li> <b>Application:</b> Submit your application, highlighting your achievements. </li>

                 <li> <b>Interview:</b> Our team will review your application and conduct an interview to assess your suitability.</li>

                 <li> <b>Training:</b> Receive comprehensive training on effective mentoring techniques and best practices.</li>

                 <li> <b>Matching:</b> Once onboarded, we'll match you with students seeking guidance in your area of expertise.</li>

                 <li> <b>Mentoring Sessions:</b> Conduct one-on-one sessions with students, providing personalized guidance.</li>




	      </ul>


          </div>
          
           




        </div>

        <img
          className={classes.HomeImageContainer2}
          src={topperImage2}
          alt="logo"
        ></img>
      </div>
    </div>
  );
}

export default FirstBlock;
