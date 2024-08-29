import classes from "./header.module.css";
import picture1 from './connection.png';
import picture2 from './learning.png';
import picture3 from './course.png';
import picture4 from './project-management.png';
import picture5 from './menu.png';
import React, { useState } from 'react';
import Logo from './DiracAI';
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";

import {useHistory} from 'react-router-dom';


const Header = ({ onStateChange }) => {
    //     const [isDivVisible, setDivVisibility] = useState(false);

    //   const toggleDiv = () => {
    //     setDivVisibility(!isDivVisible);
    //   };
    const [connectBg, setConnectBg] = useState('none');
    const [learnBg, setLearnBg] = useState('none');
    const [teachBg, setTeachBg] = useState('none');
    const [manageBg, setManageBg] = useState('none');

    const changeBg = (connectBg , learnBg , teachBg , manageBg) => {
        setConnectBg(connectBg);
        setLearnBg(learnBg);
        setManageBg(manageBg);
        setTeachBg(teachBg);
    }
   
    const history = useHistory();	



    const handleConnect = () => {
        changeBg("solid 5px lightgrey" , "none" , "none" , "none");
        onStateChange(true, false, false, false, false);
    };
    const handleLearn = () => {
        changeBg("none" , "solid 5px lightgrey" , "none" , "none");
        onStateChange(false, false, true, false, false);
        history.push('/learn');

       

    };
    const handleTeach = () => {
        changeBg("none" , "none" , "solid 5px lightgrey" , "none");
        onStateChange(false, true, false, false, false);
    };
    const handleManage = () => {
        changeBg("none" , "none" , "none" , "solid 5px lightgrey");
        onStateChange(false, false, false, true, false);
    };
    const handleDasho = () => {
        changeBg("none" , "none" , "none" , "none");
        onStateChange(false, false, false, false, true);
    };

    return (
        <div className={classes.main}>
            <div className={classes.mainContainer}>
                <div className={classes.bodyContainer}>
                    <div className={classes.leftContainer}>
                        <div className={classes.holder} onClick={handleDasho}>
                            <div className={classes.logoContainer}>
                                <Logo />
                            </div>
                            <div className={classes.textContainer}>
                                <b>DashoApp</b>
                            </div>
                        </div>
                    </div>
                    <div className={classes.rightContainer}>
                        <div className={classes.top}>
                            <div className={classes.holder} onClick={handleConnect} style={{ borderBottom: connectBg }}>
                                <div className={classes.logoContainer}>
                                    <img src={picture1} alt="temperary pic" className={classes.image} />
                                </div>
                                <div className={classes.textContainer}>
                                    Connect
                                </div>
                            </div>
                            <div className={classes.holder}  onClick={handleLearn}style={{ borderBottom: learnBg }}>
                                <div className={classes.logoContainer}>
                                    <img src={picture2} alt="temperary pic" className={classes.image} />
                                </div>
                                <div className={classes.textContainer}>
                                    Learn
                                </div>
                            </div>
                            <div className={classes.holder} onClick={handleTeach}  style={{ borderBottom: teachBg }}>
                                <div className={classes.logoContainer}>
                                    <img src={picture3} alt="temperary pic" className={classes.image} />
                                </div>
                                <div className={classes.textContainer}>
                                    Teach
                                </div>
                            </div>
                            <div className={classes.holder} onClick={handleManage} style={{ borderBottom: manageBg }}>
                                <div className={classes.logoContainer}>
                                    <img src={picture4} alt="temperary pic" className={classes.image} />
                                </div>
                                <div className={classes.textContainer}>
                                    Manage
                                </div>
                            </div>

                            {/*
                            <div className={classes.social}>
                                <CiFacebook className={classes.icon}/>
                            </div>
                            <div className={classes.social}>
                                <CiLinkedin className={classes.icon}/>

                            </div>
                            <div className={classes.social}>
                                <CiTwitter className={classes.icon}/>

                            </div>
                            <div className={classes.social}>
                                <CiYoutube className={classes.icon}/>

                            </div>
			    */}
                        </div>
                    </div>
                </div>
            </div>
            {/* {isDivVisible && <div className={classes.hidder}>
            <div className={classes.rightContainer}>
                <div className={classes.top}>
                    <div className={classes.holder}>
                        <div className={classes.logoContainer}>
                            <img src={picture1} alt="temperary pic" className={classes.image} />
                        </div>
                        <div className={classes.textContainer}>
                            Connect
                        </div>
                    </div>
                    <div className={classes.holder}>
                        <div className={classes.logoContainer}>
                            <img src={picture2} alt="temperary pic" className={classes.image} />
                        </div>
                        <div className={classes.textContainer}>
                            Learn
                        </div>
                    </div>
                    <div className={classes.holder}>
                        <div className={classes.logoContainer}>
                            <img src={picture3} alt="temperary pic" className={classes.image} />
                        </div>
                        <div className={classes.textContainer}>
                            Teach
                        </div>
                    </div>
                    <div className={classes.holder}>
                        <div className={classes.logoContainer}>
                            <img src={picture4} alt="temperary pic" className={classes.image} />
                        </div>
                        <div className={classes.textContainer}>
                            Manage
                        </div>
                    </div>
                </div>
            </div>
      </div>} */}
        </div>
    );
}

export default Header;
