import { useEffect, useState, useRef } from "react";
import classes from "./JoinAsTopper.module.css";

import LeftImageRightText from "./LeftImageRightText.js";
import FirstBlock from "./FirstBlock";
import SecondBlock from "./SecondBlock";
import Testimonial from "./Testimonial";

import IMG1 from "./Impact.png";
import IMG2 from "./Growth.png";
import IMG3 from "./Reward.png";
import Girl from "./girl.png";

import { useHistory } from "react-router-dom";
import Faqlist from "./Faqlist";

const JoinAsTopper = (props) => {
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

  const applyForTopperHandler = () => {
    history.push("/registerastopper");
  };

  return (
    <div className={classes.rulesAndRegulationsMain}>
      <div className={classes.joinToppersCard}>
        <div className={classes.topCard}>
          <div
            className={classes.topSectionJoinTopper}
            onClick={applyForTopperHandler}
          >
            <div className={classes.textDiv}>
              <div className={classes.largeText}>You Can Make A Change</div>
              <div className={classes.smallText}>
                "Lead, Inspire, Transform: Elevate Student Aspirations <br></br>{" "}
                Become a Toppers Mentor Today!"
              </div>
            </div>
            <button type="button" className={classes.joinNowButton}>
              Apply Now
            </button>
          </div>

          <div className={classes.topRightSection}>
            <img src={Girl} className={classes.girlIMageTop} />
          </div>
        </div>
      </div>

      <div className={classes.innerDiv}>
        <div className={classes.mainTitle1}>
          Mentor Students From all Over India
        </div>

        <div className={classes.submainTitle}>
          "A topper become Legend not for achievement but for transforming followers’ lives by mentoring and sharing success story"
        </div>

        <div className={classes.details1}>
          <b>hello! Toppers</b> provides one-to-one exam preparation online
          mentoring to hundreds of students all over India. Join us and you’ll
          have everything you need to mentor the exam aspirants successfully.
        </div>

        <div className={classes.details2}>
          <b>At hello! Toppers,</b> we believe in the power of mentorship to
          shape the leaders of tomorrow. By becoming a Topper Mentor, you have
          the opportunity to inspire, guide, and motivate students on their
          journey toward achieving success in different competitive exams.
        </div>

        <div className={classes.mainTitle2}>Why Join as a Topper Mentor?</div>

        <div className={classes.threeCardContainer}>
          <div className={classes.card1}>
            <div className={classes.contentContainer}>
              <img src={IMG1} className={classes.img} />
              <div className={classes.title}>
                Create a lasting Impact On Youth
              </div>
              <div className={classes.details}>
                "Shape the future as a topper! Your success story can inspire
                and guide the next generation. Become a mentor and create a
                lasting impact on youth. Share your knowledge, ignite ambitions,
                and be a beacon of inspiration for aspiring minds. Join us in
                building a legacy of excellence!"
              </div>
            </div>
          </div>
          <div className={classes.card2}>
            <div className={classes.contentContainer}>
              <img src={IMG2} className={classes.img} />
              <div className={classes.title}>
                Build Professional and Personal Growth
              </div>
              <div className={classes.details}>
                "Top the charts in your personal and professional journey! As a
                topper, seize the opportunity to build a pathway to success.
                Elevate your expertise, refine communication skills, and boost
                leadership qualities. Join us on the journey of continuous
                growth and make your mark as a leader in your field!"
              </div>
            </div>
          </div>
          <div className={classes.card3}>
            <div className={classes.contentContainer}>
              <img src={IMG3} className={classes.img} />
              <div className={classes.title}>
                Receive Flexible and Rewarding Opportunities
              </div>
              <div className={classes.details}>
                "Top the charts on your terms! As a topper, embrace flexible and
                rewarding opportunities with us. Your expertise is in demand,
                and we offer a platform that fits your schedule. Join today for
                a fulfilling journey where success meets flexibility!"
              </div>
            </div>
          </div>
        </div>

        <LeftImageRightText />

        {/* <FirstBlock />

        <SecondBlock /> */}

        <div className={classes.howitworks}>
          <div className={classes.howitworksTitle}>How it Works ?</div>

          <div className={classes.lastContainer}>
            <div className={classes.mainCircle}>
              <div className={classes.f_points_star}></div>
            </div>

            <div className={classes.Acontaienr}>
              <div className={classes.titleA}>Apply</div>
              <div className={classes.desA}>
                Submit your application, highlighting your achievements.
              </div>
            </div>
          </div>

          <div className={classes.lastContainer}>
            <div className={classes.mainCircle}>
              <div className={classes.f_points_star}></div>
            </div>

            <div className={classes.Acontaienr}>
              <div className={classes.titleA}>Get Interviewed</div>
              <div className={classes.desA}>
                Our team will review your application and conduct an interview
                to assess your suitability.
              </div>
            </div>
          </div>

          <div className={classes.lastContainer}>
            <div className={classes.mainCircle}>
              <div className={classes.f_points_star}></div>
            </div>

            <div className={classes.Acontaienr}>
              <div className={classes.titleA}>Get Trained</div>
              <div className={classes.desA}>
                Receive comprehensive training on effective mentoring techniques
                and best practices.
              </div>
            </div>
          </div>

	  {/*
          <div className={classes.lastContainer}>
            <div className={classes.mainCircle}>
              <div className={classes.f_points_star}></div>
            </div>
            
            <div className={classes.Acontaienr}>
              <div className={classes.titleA}>Get Matched</div>
              <div className={classes.desA}>
                Once onboarded, we'll match you with students seeking guidance
                in your area of expertise.
              </div>
            </div>
	    
          </div>
           */}

          <div className={classes.lastContainer}>
            <div className={classes.mainCircle}>
              <div className={classes.f_points_star}></div>
            </div>

            <div className={classes.Acontaienr}>
              <div className={classes.titleA}>Start Mentoring</div>
              <div className={classes.desA}>
                Conduct one-on-one sessions with students, providing
                personalized guidance
              </div>
            </div>
          </div>

          <div className={classes.lastContainer}>
            <div className={classes.mainCircle}>
              <div className={classes.f_points_star}></div>
            </div>

            <div className={classes.Acontaienr}>
              <div className={classes.titleA}>Receive Your Remunireation</div>
              <div className={classes.desA}>
                Your brilliance pays off – literally. Seize the opportunity and
                turn your achievements into monetary rewards
              </div>
            </div>
          </div>
        </div>

        <div className={classes.newContainer}>
          <div className={classes.mainheadingTitle}>
            Turn your academic achievements into tangible benefits
          </div>

          <div className={classes.mainHead1}>Monetize Your Expertise :</div>
          <div className={classes.mainDetail1}>
            Earn income by sharing your academic insights and strategies,
            turning your success into a rewarding opportunity.
          </div>

          <div className={classes.mainHead1}>Flexible Schedule :</div>
          <div className={classes.mainDetail1}>
            Enjoy the freedom to set your availability and conduct sessions at
            times that suit your schedule, whether you're a student or a
            professional.
          </div>

          <div className={classes.mainHead1}>
            Personal Growth and Fulfilment :
          </div>
          <div className={classes.mainDetail1}>
            Enhance your communication and teaching skills, and experience the
            satisfaction of positively influencing the educational journeys of
            fellow students.
          </div>

          <div className={classes.mainHead1}>Build Your Reputation :</div>
          <div className={classes.mainDetail1}>
            Establish yourself as an expert in your field, creating a strong
            online presence with positive reviews and testimonials from
            satisfied students.
          </div>

          <div className={classes.mainHead1}>Contribute to Education :</div>
          <div className={classes.mainDetail1}>
            Make a meaningful impact by helping students overcome challenges,
            improve their grades, and succeed academically.
          </div>

          <div className={classes.mainHead1}>Networking Opportunities :</div>
          <div className={classes.mainDetail1}>
            Connect with a community of like-minded mentors, students, and
            education enthusiasts, fostering valuable relationships and
            potential collaborations.
          </div>

          <div className={classes.mainHead1}>Resume Enhancement :</div>
          <div className={classes.mainDetail1}>
            Strengthen your resume by showcasing your experience as a mentor,
            and highlighting your leadership, communication, and teaching
            abilities.
          </div>

          <div className={classes.mainHead1}>
            Positive Community Engagement :
          </div>
          <div className={classes.mainDetail1}>
            Join a supportive and positive community where you can share
            experiences, learn from others, and contribute to the collective
            success of students worldwide.
          </div>

          <div className={classes.mainHead1}>Recognition and Awards :</div>
          <div className={classes.mainDetail1}>
            Stand out as a top-performing mentor with recognition and awards
            based on your contributions, effectiveness, and positive impact on
            students.
          </div>

          <div className={classes.mainHead1}>Convenient Online Platform :</div>
          <div className={classes.mainDetail1}>
            Utilize a user-friendly and advanced online platform that
            streamlines the mentoring process, making it easy for both mentors
            and students to connect and collaborate.
          </div>
        </div>

        <Testimonial />

        <Faqlist />

        <div className={classes.shapethefutureCard}>
          <div className={classes.shapetheFutureTitle}>Shape the Future!</div>


          <div className={classes.shapethefutureDetails}>
            Join us in making a difference in the lives of students. Apply now
            to become a Topper Mentor and play a vital role in nurturing the
            next generation of achievers.
          </div>

	  <button className={classes.shapetheFutureButton} type="button" onClick={applyForTopperHandler}>Apply Now</button>

        </div>
      </div>
    </div>
  );
};

export default JoinAsTopper;
