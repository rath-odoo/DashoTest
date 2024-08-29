import classes from "./AboutUs.module.css";

function AboutUs() {
  return (
    <div className={classes.parent}>
      <div className={classes.mt}>About Us</div>
      <div className={classes.d}>
        Welcome to Hello Topper, Where Excellence Meets Guidance!
      </div>
      <div className={classes.d}>
        At Hello Topper, we're dedicated to revolutionizing the way students
        prepare for exams. We understand that the path to success is paved with
        challenges, and that's why we've created a platform that connects
        students with top rankers for personalized, results-driven guidance.
      </div>

      <div className={classes.mt}>Our Mission</div>
      <div className={classes.t}>Our mission is simple yet profound :</div>

      <div className={classes.d}>
        to empower students to not only excel in their exams but to unlock their
        full potential. We believe that with the right mentorship and
        strategies, every student can achieve success in competitive exams.
      </div>

      <div className={classes.highlight}>
        <div className={classes.mt}>Why Hello Topper?</div>
        <div className={classes.t}>Expert Guidance :</div>

        <div className={classes.d}>
          Our mentors are not just achievers; they're the top-ranked holders in
          their respective fields. They've walked the path to success and are
          here to guide you every step of the way.
        </div>

        <div className={classes.t}>Tailored Strategies :</div>

        <div className={classes.d}>
          We don't believe in one-size-fits-all approaches. Our topper mentors
          provide customized strategies, tricks, and tips for each section of
          your exam, ensuring you're fully prepared.
        </div>

        <div className={classes.t}>Interactive Learning :</div>

        <div className={classes.d}>
          Engage in live, interactive sessions where you can ask questions,
          clarify doubts, and receive immediate feedback from our experienced
          topper mentors.
        </div>

        <div className={classes.t}>Flexible Learning :</div>

        <div className={classes.d}>
          We understand that your schedule may be hectic. That's why we offer
          flexible learning options to suit your availability.
        </div>

        <div className={classes.t}>No Session Left Behind :</div>

        <div className={classes.d}>
          Can't attend a live session? No worries. Access recorded sessions
          anytime, ensuring you never miss out on valuable insights.
        </div>
      </div>

      <div className={classes.mt}>Meet Our Team</div>
      <div className={classes.d}>
        Our team is comprised of dedicated professionals who are passionate
        about education and student success. From top-rank holders to
        experienced educators, each member brings a wealth of knowledge and
        expertise to the Hello Topper community.
      </div>

      <div className={classes.mt}>Get Started Today</div>
      <div className={classes.d}>
        Embark on your journey to exam excellence with Hello Topper. Whether
        you're preparing for school exams, college entrance tests, or
        professional certifications, our mentors are here to help you achieve
        your goals.
      </div>

      <div className={classes.bottomContainer}>
        <div className={classes.mt}>
          Join us today and let's unlock your potential together
        </div>

        <div className={classes.btnContainer}>
          <div className={classes.btnTitle}>Get Started</div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
