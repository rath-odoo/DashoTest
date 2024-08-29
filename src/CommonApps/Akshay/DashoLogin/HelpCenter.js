import classes from "./HelpCenter.module.css";

function HelpCenter() {
  return (
    <div className={classes.parent}>
      <div className={classes.mainContainer}>
        <div className={classes.titleheading}>Help Center</div>

        <div className={classes.subtitle}>
          Welcome to the Hello Toppers Help Centre! We're here to assist you
          with any questions or concerns you may have. Below are some frequently
          asked questions and resources that may be helpful:
        </div>

        <div className={classes.heading1}>1. Getting Started</div>

        <div className={classes.heading2}>How do I create an account?</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            To create an account, click on the "Sign Up" button on the homepage.
            Follow the prompts to provide your information and set up your
            account.
          </div>
        </div>

        <div className={classes.heading2}>How do I choose a mentor?</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            Browse through our list of top-ranked mentors and click on their
            profile to view their expertise and availability. Select the mentor
            that best suits your needs and book a session.
          </div>
        </div>

        <div className={classes.heading1}>2. Booking a Session</div>

        <div className={classes.heading2}>
          How do I book a mentoring session?
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            Visit the mentor's profile and click on the "Book a Session" button.
            Select a date and time that works for you, and complete the booking
            process.
          </div>
        </div>

        <div className={classes.heading2}>
          What if I need to reschedule or cancel a session?
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            You can reschedule or cancel a session from your account dashboard.
            Please review our rescheduling and cancellation policies for more
            details.
          </div>
        </div>

        <div className={classes.heading1}>3. During the Session</div>

        <div className={classes.heading2}>
          How does the online video session work?
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            Our mentoring sessions are conducted via a secure online video call
            platform. At the scheduled time, log in to your account and join the
            session from your dashboard.
          </div>
        </div>

        <div className={classes.heading2}>
          What should I prepare for a session?
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            Review any relevant materials or topics beforehand. Have specific
            questions or areas you'd like to cover ready for discussion.
          </div>
        </div>

        <div className={classes.heading1}>4. After the Session</div>

        <div className={classes.heading2}>Can I access recorded sessions?</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            Yes, recorded sessions are available for your convenience. You can
            access them from your account dashboard.
          </div>
        </div>

        <div className={classes.heading1}>5. Payments and Billing</div>

        <div className={classes.heading2}>
          How do I make a payment for a session?
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            Payments can be made securely through our online payment gateway.
            Follow the prompts during the booking process.
          </div>
        </div>

        <div className={classes.heading2}>What if I have a billing issue?</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            If you encounter any billing issues, please contact our support team
            at support@hellotoppers.com .
          </div>
        </div>

        <div className={classes.heading1}>6. Additional Support</div>

        <div className={classes.heading2}>Contact Us</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            For further assistance or any other inquiries, you can reach out to
            our support team at support@hellotoppers.com .
          </div>
        </div>

        <div className={classes.heading1}>7. Privacy and Security</div>

        <div className={classes.heading2}>How is my information protected?</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            We take your privacy and security seriously. Please review our
            Privacy Policy for detailed information.
          </div>
        </div>

        <div className={classes.heading1}>8. Terms and Conditions</div>

        <div className={classes.heading2}>
          Where can I find the Terms of Use?
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            Our Terms of Use can be found at [Link to Terms of Use].
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
