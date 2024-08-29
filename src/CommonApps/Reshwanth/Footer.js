import classes from './Footer.module.css';
import calling from './calling.png';
import apple from './appStore.png';
import play from './playStore.png';
import { useHistory } from "react-router-dom";


function Footer() {

    const history = useHistory();

    const pageHandler = () => {
        window.open("https://diracai.com/services/", "_blank");
    };
   

    const diracAIHandler=()=>{
     window.open("https://diracai.com", "_blank");

    }


    const privacyPolicyHandler = () => {
       window.open("https://diracai.com/Privacypolicy", "_blank");

    };

  const termsofUseHandler = () => {
     window.open("https://diracai.com/TermsofUse","__blank");
  };

  const cookiesHandler = () => {
    window.open("https://diracai.com/CookiesPolicy");
  };

  const refundHandler = () => {
     window.open("https://diracai.com/RefundPolicy");
  };

  const aboutusPageHandler = () => {
     window.open("https://diracai.com/about","__blank");
  };

  const helpcenterPageHandler = () => {
    history.push("/HelpCenter");
  };

  const disclaimerHandler=()=>{

    window.open("https://diracai.com/contactus","__blank");
  }














    return (

        <div className={classes.mainContainer}>
            <div className={classes.bodyContainer}>
                <div className={classes.leftContainer}>
                    <div className={classes.companyContainer}>
                        <div className={classes.companyHeading}>
                            <b>Dasho App</b>
                        </div>
                        <div className={classes.companyDescription}>
                            Dasho App is democratizing education, making it accessible to all. Join the revolution now. Connect, Teach, Learn, and Manage anytime, anywhere with the Dasho App
                        </div>
                    </div>
                    <div className={classes.appContainer}>
                        <div className={classes.AppleStoreContainer}>
                            <img src={apple} className={classes.appleIcon} />
                        </div>
                        <div className={classes.PlayStoreContainer}>
                            <img src={play} className={classes.playIcon} />
                        </div>
                    </div>
                    <div className={classes.reachUsContainer}>
                        <div className={classes.reachUsHeading}>
                            <b>Reach out to us</b>
                        </div>
                        <div className={classes.reachUsDescription}>
                            Get your questions answered anything about DashoAPP.
                        </div>
                    </div>
                    <div className={classes.contactContainer}>
                        <div className={classes.iconContainer}>
                            <img src={calling} className={classes.call} />
                        </div>
                        <div className={classes.numberContainer}>
                            +91-7008639757
                        </div>
                    </div>
                </div>
                <div className={classes.rightContainer}>
                    <div className={classes.holder1}>
                        <div className={classes.heading}>
                            <b>Company</b>

                        </div>
                        <div className={classes.content}>
                            <div className={classes.footerPolicy} onClick={aboutusPageHandler}>
                                About Us

                            </div>
                            <div className={classes.footerPolicy} onClick={privacyPolicyHandler}>
                                Privacy Policy

                            </div>
                            <div className={classes.footerPolicy} onClick={termsofUseHandler}>
                                Terms of Use
                            </div>

                            <div className={classes.footerPolicy} onClick={cookiesHandler}>
                                Cookies Policy
                            </div>

                            <div className={classes.footerPolicy} onClick={disclaimerHandler}>
                                Disclaimer
                            </div>

	                    <div className={classes.footerPolicy} onClick={refundHandler}>
                                Refund Policy
                            </div>


                        </div>
                    </div>
                    <div className={classes.holder2}>
                        <div className={classes.heading}>
                            <b>Help and Support</b>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.point1}>
                                User Guidelines
                            </div>
                          
	                    <div className={classes.point2}>
                                Help Centre
                            </div>

                            <div className={classes.point3}>
                                Grievance Readressal
                            </div>
                            <div className={classes.point4}>
                                Sitemap
                            </div>
                        </div>
                    </div>
	            {/*
                    <div className={classes.holder3}>
                        <div className={classes.heading}>
                            <b>Trending Subjects</b>
                        </div>
                        <div className={classes.content}>
                            <div className={classes.subject1}>
                                Physics for IIT-JEE

                            </div>
                            <div className={classes.subject3}>
                                Spoken English by Madhu Maam

                            </div>
                            <div className={classes.subject4}>
                                Learn Excel in 1 weekby Dipti Maam

                            </div>
                        </div>
                    </div>
		    */}
                </div>
            </div>
            <div className={classes.copyRights} onClick={diracAIHandler}>
                <div className={classes.centerContainer} onClick={pageHandler} >
                Copyright © 2024 DiracAI Pvt Ltd. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;
