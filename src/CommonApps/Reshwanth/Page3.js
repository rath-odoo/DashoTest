import classes from './page3.module.css';
import leftImg from './left-img.jpeg';
import RightImg from './right-img.jpeg';
import dataScience from './dataScience.webp';
import ai from './AI.jpeg';
import courses from './Course.jpeg';


import Teacher from './images/how it works/Individual teacher.png';
import Student from './images/how it works/Institutes.png';
import TeacheImg from './images/how it works/Learner.png';

import books from './Educators.png';
import Subjects from './Subjects.png';
import LiveClass from './Live classes.png';
import Calendar from './Hours.png';
import AndroidView from './AndriodView.jpeg';
import AppleImg from './appStore.png';
import PlayStore from './playStore.png';

import Logo from './DiracAI';

const pageHandler = () => {
    window.open("https://diracai.com/services/", "_blank");
};
const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Adds smooth scrolling animation
    });
}



function Page3() {
    return (
        <div className={classes.app}>
            {/* thirdBlock */}
            <div className={classes.howItWorks}>
                <h2 className={classes.text}>How it Works?</h2>

                {/* updated howItWorks block*/}
                <div className={classes.mainBlock}>
                    <div className={classes.howItWorksFirst}>
                        <div><img src={Teacher} alt="img" className={classes.eduImg} /></div>
                        <div className={classes.headContainerSecond}>
                            <div className={classes.LineOne}> For Individual Teachers</div>
                            <div className={classes.LineTwo}>Connect with right Learners</div>
                        </div>
                        <div className={classes.headthirdContainer}>
                            <div className={classes.divList}>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        •&nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Create and Connect Profile
                                    </div>
                                </div>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        • &nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Develop and launch live Online classes
                                    </div>
                                </div>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        • &nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Engage, Organize, Promote, and Earn
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.howItWorksSecond}>
                        <div><img src={TeacheImg} alt="img" className={classes.eduImg} /></div>
                        <div className={classes.headContainerSecond}>
                            <div className={classes.LineOne}>For Learners</div>
                            <div className={classes.LineTwo}>Join Live Online Classes</div>
                        </div>
                        <div className={classes.headthirdContainer}>
                            <div className={classes.divList}>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        •&nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Setup Profile and Explore Live Classes
                                    </div>
                                </div>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        •&nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Enroll and Start Learning
                                    </div>
                                </div>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        •&nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Track Progress and Share Feedback
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.howItWorksThird}>
                        <div><img src={Student} alt="img" className={classes.eduImg} /></div>
                        <div className={classes.headContainerSecond}>
                            <div className={classes.LineOne}>For institutes</div>
                            <div className={classes.LineTwo}>Manage and promote your Brand</div>
                        </div>
                        <div className={classes.headthirdContainer}>

                            <div className={classes.divList}>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        • &nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Setup Profile and Integrate With LMS
                                    </div>
                                </div>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        •&nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Build, Manage, Promote, and Deliver Online Classes
                                    </div>
                                </div>
                                <div className={classes.listItem}>
                                    <div className={classes.bullet}>
                                        •&nbsp;
                                    </div>
                                    <div className={classes.textBullet}>
                                        Engage and Collaborate with Education Eco-System
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className={classes.joinNow}>Join Now</div> */}

                </div>

                <div className={classes.joinNow}><button className={classes.btnJoinNow}>Join Now</button></div>


                {/* <div className={classes.mainBlock}>
                    <div className={classes.leftBlock}>
                         
                        <img src={leftImg} alt="img" className={classes.leftImg} />
                        <div className={classes.text1}>For Teachers:</div>
                        <div className={classes.text2}>Connect with right Learners</div>
                        <div className={classes.leftBox}>
                            <div className={classes.textContainer}>
                                <div className={classes.hds}>Create and Connect Profile:</div>
                                <div className={classes.cnt}>Teachers Sign up, build their profiles, and outline their expertise and teaching style</div>
                            </div>

                            <div className={classes.textContainer}>
                                <div className={classes.hds}>Develop and launch live Online Classes:</div>
                                <div className={classes.cnt}>Teacher Design and publish courses, including multimedia content and interactive elements.</div>
                            </div>

                            <div className={classes.textContainer}>
                                <div className={classes.hds}>Engage and Earn:</div>
                                <div className={classes.cnt}>Teachers interact with students, conduct live Classes, promote their educational institute, and earn revenue through course sales.</div>
                            </div>
                        </div>
                    </div>

                    
                    <div className={classes.rightBlock}>
                        <img src={RightImg} alt="img" className={classes.rightImg} />
                        <div className={classes.text1}>For Learners:</div>
                        <div className={classes.text2}>Find best courses to Upskill</div>
                        <div className={classes.rightBox}>
                            <div className={classes.textContainer}>
                                <div className={classes.hds}>Profile Setup and Course Exploration:</div>
                                <div className={classes.cnt}>Learners create profiles, set learning goals, and explore available live courses.</div>
                            </div>

                            <div className={classes.textContainer}>
                                <div className={classes.hds}>Enrollment and Learning:</div>
                                <div className={classes.cnt}>Learners enroll in live classes, access learning materials, and participate in interactive learning.</div>
                            </div>

                            <div className={classes.textContainer}>
                                <div className={classes.hds}>Progress Tracking and Feedback:</div>
                                <div className={classes.cnt}>Learners track their progress, engage with teachers and peers, and provide feedback for continuous improvement</div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className={classes.heroContainer}>
                <div className={classes.heroHeading}>
                    <div className={classes.headCnt}>Trending Live Classes</div>
                </div>

                <div className={classes.heroMain}>
                    <div className={classes.mainTop}>

                        <div className={classes.firstBox}>
                            <div className={classes.imgAllDiv}>
                                <img src={dataScience} className={classes.imgAll} alt='DS'></img>
                            </div>
                            <div className={classes.info}>
                                <div className={classes.time}>Starting at 11 a.m</div>
                                <div className={classes.faculty}>By prashant Sir</div>
                            </div>
                            <button className={classes.enrollNow}>Enroll Now</button>
                        </div>


                        <div className={classes.secondBox}>
                            <div className={classes.imgAllDiv}>
                                <img src={ai} className={classes.imgAll} alt='AI'></img>
                            </div>
                            <div className={classes.info}>
                                <div className={classes.time}>Starting at 11.30 a.m</div>
                                <div className={classes.faculty}>By Ashok Sir</div>
                            </div>
                            <button className={classes.enrollNow}>Enroll Now</button>
                        </div>


                        <div className={classes.thirdBox}>
                            <div className={classes.imgAllDiv}>
                                <img src={courses} className={classes.imgAll} alt='Course'></img>
                            </div>
                            <div className={classes.info}>
                                <div className={classes.time}>Starting at 2.30 p.m</div>
                                <div className={classes.faculty}>By Maharana classes</div>
                            </div>
                            <button className={classes.enrollNow}>Enroll Now</button>
                        </div>


                    </div>

                    <div className={classes.mainMiddle}>
                        <div className={classes.allCourses}>View All Live Classes</div>
                    </div>

                    {/* <div className={classes.mainBottom}>
                        <div className={classes.orgInfo}>3000+ Learners</div>
                        <div className={classes.orgInfo}>400+ Teachers</div>
                        <div className={classes.orgInfo}>100+ Institutions</div>
                    </div> */}
                </div>
            </div>

            {/* start Your journey  */}
            <div className={classes.blockThree}>

                <div className={classes.leftContent}>
                    <div className={classes.contentFirst}>Start your journey with DashoAPP</div>
                    <div className={classes.contentSecond}>Get unlimited access to structured courses & doubt clearing sessions</div>
                    <div className={classes.content}>
                        <button className={classes.getStarted}>Get Started</button>
                    </div>
                </div>

                <div className={classes.FourImagesContainer}>

                    <div className={classes.child}>
                        <img src={books} className={classes.c} alt='Course'></img>
                        <div className={classes.educators}>1000+ Educators</div>
                    </div>
                    <div className={classes.child}>
                        <img src={Subjects} className={classes.c} alt='Course'></img>
                        <div className={classes.subjects}>100+ Subjects</div>
                    </div>
                    <div className={classes.child}>
                        <img src={LiveClass} className={classes.c} alt='Course'></img>
                        <div className={classes.liveClass}>75+ Daily Live Classes</div>
                    </div>
                    <div className={classes.child}>
                        <img src={Calendar} className={classes.c} alt='Course'></img>
                        <div className={classes.sessions}>5000+ Hours Sessions</div>
                    </div>
                </div>

            </div>

            {/* get the all in one educational app */}


            <div className={classes.appStoreContainer}>
                <div className={classes.infoAppStore}>
                    <div className={classes.headLineAppstore}>Get the All in One Educational App</div>
                    <div className={classes.contentAppStore}>Connect, Teach, Learn, and Manage <br></br>anytime, anywhere with the DashoAPP</div>
                    <div className={classes.storeImgDiv}>
                        <div className={classes.appleStoreImgContainer}><img src={AppleImg} className={classes.appleStoreImg} alt='Course'></img></div>
                        <div className={classes.playStoreImgContainer}><img src={PlayStore} className={classes.playStoreImg} alt='Course'></img></div>
                    </div>
                </div>
                <div className={classes.imgAppStore}><img src={AndroidView} className={classes.androidImg} alt='Course'></img></div>


            </div>





            {/* fourth-block */}
            <div className={classes.fourthContainer}>
                <div style={{ textAlign: 'center', margin: '30px 0px 30px 0px' }}>
                    <div className={classes.heading} style={{ marginBottom: '20px' }}>Unlock every barrier of Collaboration, Join Our Ever Growing Community  Now!</div>
                    <button className={classes.join} onClick={scrollToTop} style={{ padding: '10px 20px', fontSize: '25px', border: 'none', borderRadius: '10px', backgroundColor: '#fff', color: 'black', cursor: 'pointer' }}>Join Now</button>
                </div>
                {/* <div className={classes.cardContainer}>
                    <div className={classes.bottomContainer}>
                        <div className={classes.powerContainer}>
                            Powered By
                        </div>
                        <div className={classes.servicesContainer}>
                            <button className={classes.logoContainer} onClick={pageHandler}>
                                Di
                            </button>
                            <div className={classes.diracaiContainer}>
                                DiracAI Services
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
export default Page3;
