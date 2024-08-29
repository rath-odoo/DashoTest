import classes from "./Disclaimer.module.css";

function Disclaimer() {
  return (
    <div className={classes.parent}>
      <div className={classes.mainContainer}>
        <div className={classes.titleheading}>Disclaimer</div>

        <div className={classes.heading1}>1. General Information</div>

        <div className={classes.block1}>
          <div className={classes.dot2}></div>

          <div className={classes.details1}>
            The information provided on hellotoppers.com is for general
            informational purposes only. We strive to provide accurate and
            up-to-date information, but we make no representations or warranties
            of any kind, express or implied, about the completeness, accuracy,
            reliability, suitability, or availability of the information,
            products, services, or related graphics contained on the website for
            any purpose.
          </div>
        </div>

        <div className={classes.block1}>
          <div className={classes.dot2}></div>

          <div className={classes.details1}>
            Any reliance you place on such information is strictly at your own
            risk. We will not be liable for any loss or damage, including but
            not limited to indirect or consequential loss or damage, or any loss
            or damage whatsoever arising from loss of data or profits arising
            out of, or in connection with, the use of this website.
          </div>
        </div>

        <div className={classes.heading1}>2. Content Changes</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            The content on hellotoppers.com may change without notice. We do not
            guarantee that the information provided will always be up-to-date or
            accurate.
          </div>
        </div>

        <div className={classes.heading1}>3. Professional Advice</div>

        <div className={classes.block1}>
          <div className={classes.dot2}></div>

          <div className={classes.details1}>
            The information on hellotoppers.com is not a substitute for
            professional advice. You should not take action based on the
            information provided without seeking professional advice related to
            your specific circumstances.
          </div>
        </div>

        <div className={classes.heading1}>4. External Links</div>

        <div className={classes.block1}>
          <div className={classes.dot2}></div>

          <div className={classes.details1}>
            Our website may contain links to external websites that are not
            under our control. We have no control over the nature, content, and
            availability of those sites. The inclusion of any links does not
            necessarily imply a recommendation or endorsement of the views
            expressed within them.
          </div>
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            We are not responsible for the content, privacy practices, or
            security of any external websites you visit.{" "}
          </div>
        </div>

        <div className={classes.heading1}>5. User Responsibility</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            You are responsible for ensuring that any products, services, or
            information available through this website meet your specific
            requirements.
          </div>
        </div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            We are not responsible for the privacy practices of these
            third-party services.
          </div>
        </div>

        <div className={classes.heading1}>6. Legal Compliance</div>

        <div className={classes.block1}>
          <div className={classes.dot2}></div>

          <div className={classes.details1}>
            While we strive to comply with applicable laws and regulations, we
            make no representation that materials on this website are
            appropriate or available for use in locations outside of India.
            Accessing this website from jurisdictions where its contents are
            illegal is prohibited.
          </div>
        </div>

        <div className={classes.heading1}>7. Changes to this Disclaimer</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            We may update this Disclaimer at any time. Changes will be reflected
            on this page.
          </div>
        </div>

        <div className={classes.heading1}>8. Contact Us</div>

        <div className={classes.block1}>
          <div className={classes.dot}></div>

          <div className={classes.details1}>
            If you have any questions or concerns about this Disclaimer, please
            contact us at support@hellotoppers.com .
          </div>
        </div>
      </div>
    </div>
  );
}
export default Disclaimer;
