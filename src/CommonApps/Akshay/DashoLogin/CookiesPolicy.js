import classes from "./CookiesPolicy.module.css";

function CookiesPolicy() {
  return (
    <div className={classes.parent}>
      <div className={classes.mainContainer}>
        <div className={classes.titleheading}>Cookies Policy</div>

        <div className={classes.subtitle}>
          Welcome to Hello Toppers! This Cookies Policy explains how we use
          cookies and similar technologies on our website. By using our
          platform, you consent to the use of cookies as described in this
          policy.
        </div>

        <div className={classes.heading1}>1. What Are Cookies?</div>

        <div className={classes.heading1}>Cookies :</div>


        <div className={classes.block1}>
          <div className={classes.dot}></div>


          <div className={classes.details1}>
            Cookies are small text files that are stored on your device
            (computer, tablet, smartphone) when you visit a website. They serve
            various functions, including recognizing you as a user, remembering
            your preferences, and providing a personalized experience.
          </div>
        </div>

        <div className={classes.heading1}>2. How We Use Cookies</div>

        <div className={classes.heading1}>Essential Cookies: </div>


        <div className={classes.block1}>
          <div className={classes.dot}></div>


          <div className={classes.details1}>
            These cookies are necessary for the website to function properly.
            They enable basic functions like page navigation and access to
            secure areas.
          </div>
        </div>


        <div className={classes.heading1}>Performance Cookies: </div>


        <div className={classes.block1}>
          <div className={classes.dot}></div>


          <div className={classes.details1}>
            These cookies help us understand how you interact with our website,
            allowing us to improve its performance. They collect information
            about your visit, such as pages visited and error messages.
          </div>
        </div>


        <div className={classes.heading1}>Functionality Cookies:</div>


        <div className={classes.block1}>
          <div className={classes.dot}></div>


          <div className={classes.details1}>
            These cookies enable the website to remember choices you make (such
            as language preferences) to provide enhanced, personalized features.
          </div>
        </div>


        <div className={classes.heading1}>Third-Party Cookies :</div>


        <div className={classes.block1}>
          <div className={classes.dot}></div>


          <div className={classes.details1}>
            We may use third-party services, such as analytics providers, that
            may also use cookies. These cookies are governed by the
            third-party's own privacy policy.{" "}
          </div>
        </div>

        <div className={classes.heading1}>3. Managing Cookies</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            We implement industry-standard security measures to protect your
            personal information.
          </div>
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            While we take reasonable steps to secure data, no method of
            transmission over the internet is 100% secure.
          </div>
        </div>

        <div className={classes.heading1}>4. Changes to this Policy</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            We may update this Cookies Policy at any time. Changes will be
            reflected on this page.
          </div>
        </div>

        <div className={classes.heading1}>5. Contact Us</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            If you have any questions or concerns about this Cookies Policy,
            please contact us at support@hellotoppers.com .
          </div>
        </div>
      </div>
    </div>
  );
}
export default CookiesPolicy;
