import { useEffect, useState, useRef } from "react";

import classes from "./Home.module.css";
import IntroductionBlock from "./IntroductionBlock";
import CenterColumnLeftRightGrid from "./CenterColumnLeftRightGrid";
import Testimonial from "./Testimonial";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import TeamBlock from "./TeamBlock";
import Appointment from "./Apointment";
import BlogAndNewsBlock from "./BlogAndNewsBlock";
import LeftImageRightText from "./LeftImageRightText";
import OneNewsBlock from "../News/OneNewsBlock";

import innerDiv from "../Website.module.css";

import FirstBlock from "./FirstBlock";
import SecBlock from "./SecondBlock";

import imageNews1 from "../News/A11.png";
import imageNews2 from "../News/A2 .jpg";
import Exam from "./choose_topper.gif";
import Exam2 from "./book_session.gif";
import Exam3 from "./attend_session.gif";

import get1to1guidance from './get1to1guidance.png';

import Exambox from "./Exambox";
import ToppersCard from "./ToppersCard";

import w1 from "./a_specialized_guidance.png";
import w2 from "./a_top_class_mentoring.png";
import w3 from "./a_exam_success.png";

import w4 from "./a_interactive learning.png";
import w5 from "./a_adaptive_learning.png";
import w6 from "./a_insights_from_toppers.png";

import ChooseTopper from "./choose_topper.gif";

import WhyHelloToppersCard from "./WhyHelloToppersCard";
import HowitWorks from "./HowitWorks";

import ExamBoxMain from "./ExamBoxMain";
import BoxSlide from "./ExamBoxSlideBibhu";
import ToppersCardSlide from "./ToppersCardSlideBibhu";

import BookIcon1 from "./choose_a_topper.png";
import BookingIcon from "./book_a_session.png";
import UserBooking from "./book_a_session.png";

import {useHistory} from 'react-router-dom';



import cardImage1 from "./CATnew.jpg";
import cardImage2 from "./GATEnew.jpg";
import cardImage3 from "./UPSCnew.jpg";
import cardImage4 from "./NEETnew.jpg";


import topperImg1 from "./p2.jpg";
import topperImg2 from "./p2.jpg";
import topperImg3 from "./p2.jpg";
import topperImg4 from "./p2.jpg";

const cardsDataExam = [
  {
    title: "Online CAT Mentoring",
    description: "4 toppers",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage1,
  },
  {
    title: "Online GATE Mentoring",
    description: "1 topper",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage2,
  },
  {
    title: "Online JEE Mentoring",
    description: "2 toppers",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage3,
  },
  {
    title: "Online NEET Mentoring",
    description: "3 topper",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage4,
  },
];



const cardsDataToppers = [
  {
    title: "Teena Dhabi",
    description: " UPSC - 2020, AIR-1",
    viewDetails: "View Profile",
    color: "white",
    image: topperImg1,
   },

  {
    title: "Debansh Das",
    description: "GATE -2023, AIR-21",
    viewDetails: "View Profile",
    color: "white",
    image: topperImg1,
  },
  {
    title: "Pankaj Sharma",
    description: "JEE -2023, AIR-21",
    viewDetails: "View Profile",
    color: "white",
    image: topperImg1,
  },
  {
    title: "Bibhu Mahalud",
    description: "CAT -2023, AIR-21",
    viewDetails: "View Profile",
    color: "white",
    image: topperImg1,
  },
];











const steps = [
  {
    title: "Step 1 :",
    image: Exam,
    description:
      "Watch topper’s introduction profile and read reviews from other students",
  },
  {
    title: "Step 2 :",
    image: Exam2,
    description:
      "Schedule your 1:1 online session with your favourite topper at a time and date that suit you",
  },
  {
    title: "Step 3 :",
    image: Exam3,
    description:
      "Connect with your topper via a 1:1 online video session, and let the mentoring begin!",
  },
];





const Home=(props)=> {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 5000); // Adjust the interval duration as needed (e.g., every 5 seconds)

    return () => clearInterval(intervalId);
  }, [steps.length]);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);

    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

   const history = useHistory();


  const getStartedHandler=()=>{
   history.push("/registerasstudent");
  }











  return (
    <div className={classes.homeParent}>
      <div className={innerDiv.innerDiv}>
        <div className={classes.mainExamTitle}>
          Which Exam Are You Preparing for?
        </div>

        <BoxSlide cardsData={cardsDataExam}/>

        <div className={classes.mainExamTitle}>
          Connect With Toppers Who Knows The Journey
        </div>

        <BoxSlide cardsData={cardsDataToppers}/>

        <div className={classes.HowitWorksContainer}>
          <div className={classes.HowitworksTitle}>How It Works ?</div>

          <div className={classes.helloTopContainer}>
            <div className={classes.paarent}>
              <div className={classes.title}>Step 1 :</div>

              <div className={classes.logo}>
                <img src={BookIcon1} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Choose Your Topper</div>
              <div className={classes.description}>
                View the profile of all the toppers and select one that aligns
                with your needs.
              </div>
            </div>

            <div className={classes.paarent}>
              <div className={classes.title}>Step 2 :</div>

              <div className={classes.logo}>
                <img src={BookingIcon} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Book a Session:</div>
              <div className={classes.description}>
                Choose a time slot that suits you and book a session with the
                topper of your choice.
              </div>
            </div>

            <div className={classes.paarent}>
              <div className={classes.title}>Step 3 :</div>

              <div className={classes.logo}>
                <img src={get1to1guidance} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Get 1 to 1 Guidance:</div>
              <div className={classes.description}>
                Connect with topper via 1 to 1 online Video session and ask all
                your queries to succeed in your exam preparation.
              </div>
            </div>
          </div>
        </div>

        <div className={classes.mainWhytoppersContainer}>
          <div className={classes.whyToppersTitle}>Why HelloToppers?</div>

          <div className={classes.whyToppersContainer}>
            <div className={classes.paarent}>
              <div className={classes.logo}>
                <img src={w1} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Personalized Guidance:</div>
              <div className={classes.description}>
	       Talk to toppers and make your exclusive study plan&amp; strategy under his guidance.
              </div>
            </div>

            <div className={classes.paarent}>
              <div className={classes.logo}>
                <img src={w2} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Smart Study</div>
              <div className={classes.description}>
	         Know the right study material &amp; Key areas instead of spending time on random study
              </div>
            </div>

            <div className={classes.paarent}>
              <div className={classes.logo}>
                <img src={w6} className={classes.imagesExam} />
              </div>
              <div className={classes.title}> Tips and Tricks</div>
              <div className={classes.description}>
	        Learn short cut tricks &amp; techniques from toppers to answer quickly and boost your score.
              </div>
            </div>

            <div className={classes.paarent}>
              <div className={classes.logo}>
                <img src={w4} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Expert’s Experience</div>
              <div className={classes.description}>
		 Don’t wait to learn from own failure rather learn from expert’s experience to qualify
in 1st attempt.
              </div>
            </div>

            <div className={classes.paarent}>
              <div className={classes.logo}>
                <img src={w5} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Maintain Motivation:</div>
              <div className={classes.description}>
		During frustration, talk to topper to get motivated and regain focus on study.
              </div>
            </div>

            <div className={classes.paarent}>
              <div className={classes.logo}>
                <img src={w3} className={classes.imagesExam} />
              </div>
              <div className={classes.title}>Direction to Destination</div>
              <div className={classes.description}>
		Know the dos &amp; don’ts before &amp; during exam to safely reach your destination
              </div>
            </div>
          </div>
        </div>

        {/* <TeamBlock /> */}

        <Testimonial />

      </div>

       <div className={classes.bottombox}>
          <div className={classes.bTitle}>
            Every Month, Hundreds of Exam Aspirants Joining Our Community
          </div>
          <div className={classes.bdetails}>
            "Embark on Your Exam Success Story with Our Growing Community!"
          </div>
          <button className={classes.bbutton} type="button" onClick={getStartedHandler}>Get Started</button>
       </div>




    </div>
  );
}

export default Home;
