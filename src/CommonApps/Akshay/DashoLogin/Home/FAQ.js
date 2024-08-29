import classes from "./FAQ.module.css";
import bookAppointment from "./bookAppointment.jpg";
import faqimg from "./faq.jpg";

function FAQ() {
  return (
    <div className={classes.FAQParent}>
      <div className={classes.faqContent}>
        <div className={classes.faqdetailContainer}>
          <div className={classes.faqtextHeading1}>
            Frequently Asked Questions
          </div>

          <div className={classes.qaContainer}>
            <div className={classes.questionsAnsContainer}>
              <div className={classes.imgarrowContainer}></div>

              <div className={classes.questionsText}>
                What is the role of the real estate regulatory authority in my
                state/country??
              </div>
            </div>

            <div className={classes.ansText}>
              The real estate regulatory authority oversees and regulates real
              estate activities in the state/country.
            </div>
          </div>
          <div className={classes.qaContainer}>
            <div className={classes.questionsAnsContainer}>
              <div className={classes.imgarrowContainer}></div>

              <div className={classes.questionsText}>
                How can I verify if a real estate project is registered with the
                regulatory authority?
              </div>
            </div>

            <div className={classes.ansText}>
              You can verify if a project is registered with the regulatory
              authority by checking their official website or contacting them
              directly.
            </div>
          </div>


          <div className={classes.qaContainer}>
            <div className={classes.questionsAnsContainer}>
              <div className={classes.imgarrowContainer}></div>

              <div className={classes.questionsText}>
                What are the benefits of buying a property from a
                RERA-registered project?
              </div>
            </div>

            <div className={classes.ansText}>
              Buying from a RERA-registered project ensures more transparency
              and protection for homebuyers.
            </div>
          </div>


          <div className={classes.qaContainer}>
            <div className={classes.questionsAnsContainer}>
              <div className={classes.imgarrowContainer}></div>

              <div className={classes.questionsText}>
              How does RERA protect homebuyers?
              </div>
            </div>

            <div className={classes.ansText}>
            RERA protects homebuyers by ensuring that developers register their projects, provide accurate project information, adhere to timelines, and establish a grievance redressal mechanism for dispute resolution.
            </div>
          </div>



        </div>

        <img className={classes.faqImages} src={faqimg} alt="logo"></img>
      </div>
    </div>
  );
}

export default FAQ;
