import React,{useState,useEffect} from 'react';
import classes from './SideBarDashboard.module.css';
import SideNavBarButton from './SideNavBarButtonDashboard';
import {BsFillChatDotsFill, BsTable, BsFillCameraVideoFill,BsCalendarDay, BsFillCalendarDayFill, BsJournalText,BsQuestionSquare} from 'react-icons/bs';
import {AiFillHome,AiOutlineHome} from 'react-icons/ai';
import { MdMailOutline, MdMail} from 'react-icons/md';
import { useHistory } from "react-router-dom";
import QuickMeetingPage from './QuickMeetingPage';
import SideNavBarButtonQMeeting from './SideNavBarButtonQMeeting';
import {FaTools,FaExternalLinkAlt, FaTasks} from 'react-icons/fa';
import { useMediaPredicate } from "react-media-hook";
import {FiUsers} from 'react-icons/fi';
import {BiArchiveIn, BiLinkExternal} from 'react-icons/bi';
import {BsChatRightDots, BsChatRightDotsFill, 
	BsPeopleFill, BsPeople, BsBoxArrowUpRight, 
	BsEnvelopeFill, BsEnvelope,BsCameraVideo, BsTools , BsArchive, BsArchiveFill, BsBagCheck, BsBank} from 'react-icons/bs';



import {FaPeopleArrows} from 'react-icons/fa';

import {MdOutlineDashboard, MdDashboard} from 'react-icons/md';

import {RiDashboardFill, RiDashboardLine} from 'react-icons/ri';




const SideBarDashboard =(props)=>{


    const smallerThan750px = useMediaPredicate("(max-width: 850px)");

    let history = useHistory();
    let inActivebuttonColor="var(--sideNavBarDashBoardBtnColor)";
    let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)"; 

    const [sideNavBarWidth, setSideNavBarWidth] = useState(props.sideNavBarWidth);


    const [generalChatButtonColor, setGeneralChatButtonColor]=useState(
      {  backgroundColor:inActivebuttonBkgColor,  //"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
	 borderRadius:"0px",
         fontWeight:"normal",
	 iconObj: BsChatRightDots
      }	     
    );


   const [feedButtonColor, setFeedButtonColor]=useState(
      {  backgroundColor:inActivebuttonBkgColor,  //"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: BsChatRightDots
      }
    );

   const [meetButtonColor, setMeetButtonColor]=useState(
      {  backgroundColor:inActivebuttonBkgColor,  //"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: BsCameraVideo
      }
    );

    









    const [utilityButtonColor, setUtilityButtonColor]=useState(
      {  backgroundColor:inActivebuttonBkgColor,  //"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: BsChatRightDots
      }
    );


    const [tasksButtonColor, setTasksButtonColor]=useState(
      {  backgroundColor:inActivebuttonBkgColor,  //"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: BsChatRightDots
      }
    );



    const [instituteButtonColor, setInstituteButtonColor]=useState(
      {  backgroundColor:inActivebuttonBkgColor,  //"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: BsChatRightDots
      }
    );











    const [homeButtonColor, setHomeButtonColor]=useState(
      {  backgroundColor:"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
	 borderRadius:"0px",
	 fontWeight:"normal",
         iconObj: MdOutlineDashboard
      }
    );



    const [emailButtonColor, setEmailButtonColor]=useState(
      {  backgroundColor:"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
	 borderRadius:"0px",
         fontWeight:"normal",
	 iconObj: MdMailOutline
      }
    );


     const [contactsButtonColor, setContactsButtonColor]=useState(
      {  backgroundColor:"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: MdMailOutline
      }
    );


    const [calenderButtonColor, setCalenderButtonColor]=useState(
      {  backgroundColor:"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: MdMailOutline
      }
    );










    const [usefullinksButtonColor, setUsefullinksButtonColor]=useState(
      {  backgroundColor:"var(--sideNavBarDashBoardBtnBkgColor)",
         color:"var(--themeColor)",
         borderStyle:"none",
         borderColor:"var(--themeColor)",
         borderWidth:"1px",
         borderRadius:"0px",
         fontWeight:"normal",
         iconObj: MdMailOutline
      }
    );

















    useEffect(() => {
        setSideNavBarWidth(props.sideNavBarWidth);
    }, [props.sideNavBarWidth]);


    const [showQuickMeetingInfo, setShowQuickMeetingInfo] = useState(false);
    const [meetingRoomName, setMeetingRoomName] = useState(null); 
    const [meetingRoomLink, setMeetingRoomLink] = useState(null);
    const createMeetingHandler =() =>{

       let userId= props.userData.id;

       	    
       let meetingRoomName_ = `meet.${userId}.${Date.now()}.${Math.random()*100 }`;
       let meetingRoomLink_= `https://meet.diracai.com/x${userId}y${Date.now()}z`;
       setMeetingRoomName(meetingRoomName=>meetingRoomName_); 
       setMeetingRoomLink(meetingRoomLink=>meetingRoomLink_);
      // console.log('meetingRoomName: ',meetingRoomName);
       setShowQuickMeetingInfo(true);

     // let meetingURL='http://app.diracai.com/video/meet.1.1663275331164.27.54381016977858'
     // let pattern = '/video/general/meetings/[1-9]+';
     // let pattern2 = '/video/meet.[1-9]+.[1-9]+.[1-9]+.[1-9]+'

     // let result = meetingURL.match(pattern2);	    
 
      //console.log("Matching Found?: ", result);	    




    } 


    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        let activeButtonColor= {  
	    backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
	    borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
	    iconObj: BsChatRightDotsFill
            };
        let inActivebuttonColor= {  backgroundColor:inActivebuttonBkgColor,  //"var(--sideNavBarDashBoardBtnBkgColor)",//#c2c3c4
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
	    borderRadius:"0px",
            fontWeight:"normal",
	    iconObj: BsChatRightDots
            };


        !props.generalChatMounted && setGeneralChatButtonColor(generalChatButtonColor=>inActivebuttonColor);
        props.generalChatMounted &&  setGeneralChatButtonColor(generalChatButtonColor=>activeButtonColor);


    },[props.generalChatMounted]);	


    useEffect(()=>{
       let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        let activeButtonColor= {  
	    //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
	    borderRadius:"var(--cardBorderRadius)",
	    fontWeight:"bold",
	    iconObj:RiDashboardFill
            };
        let inActivebuttonColor= {  backgroundColor:inActivebuttonBkgColor, //"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
	    borderRadius:"0px",
	    fontWeight:"normal",
	    iconObj:RiDashboardLine
            };


        !props.homeMounted && setHomeButtonColor(homeButtonColor=>inActivebuttonColor);
        props.homeMounted &&  setHomeButtonColor(homeButtonColor=>activeButtonColor);


    },[props.homeMounted]);


     useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
	    borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
	    iconObj:BsEnvelopeFill
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
	    borderRadius:"0px",
            fontWeight:"normal",
	    iconObj:BsEnvelope
            };

        !props.emailMounted && setEmailButtonColor(emailButtonColor=>inActivebuttonColor);
        props.emailMounted &&  setEmailButtonColor(emailButtonColor=>activeButtonColor);


    },[props.emailMounted]);


     useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

	console.log("contacts mounted");    
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj:BsEnvelopeFill
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj:BsEnvelope
            };

        !props.contactsMounted && setContactsButtonColor(contactsButtonColor=>inActivebuttonColor);
        props.contactsMounted &&  setContactsButtonColor(contactsButtonColor=>activeButtonColor);


    },[props.contactsMounted]);


    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";
        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj:BsEnvelopeFill
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj:BsEnvelope
            };

        !props.utilityMounted && setUtilityButtonColor(utilityButtonColor=>inActivebuttonColor);
        props.utilityMounted &&  setUtilityButtonColor(utilityButtonColor=>activeButtonColor);

    },[props.utilityMounted]);



    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";
        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj:BsEnvelopeFill
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj:BsEnvelope
            };

        !props.tasksMounted && setTasksButtonColor(tasksButtonColor=>inActivebuttonColor);
        props.tasksMounted &&  setTasksButtonColor(tasksButtonColor=>activeButtonColor);

    },[props.tasksMounted]);


   useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";
        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj:BsEnvelopeFill
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj:BsEnvelope
            };

        !props.instituteMounted && setInstituteButtonColor(instituteButtonColor=>inActivebuttonColor);
        props.instituteMounted &&  setInstituteButtonColor(instituteButtonColor=>activeButtonColor);

    },[props.instituteMounted]);


















    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj:BsEnvelopeFill
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj:BsEnvelope
            };

        !props.calenderMounted && setCalenderButtonColor(calenderButtonColor=>inActivebuttonColor);
        props.calenderMounted &&  setCalenderButtonColor(calenderButtonColor=>activeButtonColor);


    },[props.calenderMounted]);







    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj:BsEnvelopeFill
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj:BsEnvelope
            };

        !props.usefullinksMounted && setUsefullinksButtonColor(usefullinksButtonColor=>inActivebuttonColor);
        props.usefullinksMounted &&  setUsefullinksButtonColor(usefullinksButtonColor=>activeButtonColor);


    },[props.usefullinksMounted]);



    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj: BsCameraVideo
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj: BsCameraVideo
            };

        !props.feedMounted && setFeedButtonColor(feedButtonColor=>inActivebuttonColor);
        props.feedMounted &&  setFeedButtonColor(feedButtonColor=>activeButtonColor);


    },[props.feedMounted]);



    useEffect(()=>{
        let inActivebuttonBkgColor="var(--sideNavBarDashBoardBkgColor)";

        console.log("contacts mounted");
        let activeButtonColor= {
            //backgroundColor:"var(--sideNavBarDashBoardOnClickBtnBkgColor)",
            backgroundColor:"linear-gradient(to right, var(--sideNavBarDashBoardOnClickBtnBkgColor) 100%, var(--themeColor) 0%)",
            color:"var(--sideNavBarDashBoardOnClickBtnColor)",
            borderStyle:"none",
            borderColor:"var(--themeColor)",
            borderWidth:"1px",
            borderRadius:"calc( 0.2 * var(--headerHeight) )",
            fontWeight:"bold",
            iconObj: BsCameraVideo
            };
        let inActivebuttonColor= {  backgroundColor: inActivebuttonBkgColor,//"var(--sideNavBarDashBoardBtnBkgColor)",
            color:"var(--sideNavBarDashBoardBtnColor)",
            borderStyle:"none",
            borderColor:"grey",
            borderWidth:"1px",
            borderRadius:"0px",
            fontWeight:"normal",
            iconObj: BsCameraVideo
            };

        !props.meetMounted && setMeetButtonColor(meetButtonColor=>inActivebuttonColor);
        props.meetMounted &&  setMeetButtonColor(meetButtonColor=>activeButtonColor);


    },[props.meetMounted]);















    const generalChatHandler =() =>{
      history.push('/chat');	  
      smallerThan750px && props.setWidth('var(--sideNavBarWidthOnContract)');
      smallerThan750px && props.setContract(false);
    }


    const homeHandler=()=>{
    history.push('/home/dashboard/courses');
    smallerThan750px && props.setWidth('var(--sideNavBarWidthOnContract)');
    smallerThan750px && props.setContract(false);


    }








  const showChatWindowOptions=()=>{


   





  }



   const closeQuickMeetingInfo=()=>{
     setShowQuickMeetingInfo(false);
   }



   const emailHandler=()=>{
     history.push('/mail');
     smallerThan750px && props.setWidth('var(--sideNavBarWidthOnContract)');
     smallerThan750px && props.setContract(false);
   }

   const utilityHandler=()=>{
     history.push('/utility');
   }


   const tasksHandler=()=>{

    history.push('/tasks');

   }

   const instituteHandler=()=>{

    history.push('/home/institute');

   }




   const contactsHandler=()=>{

      history.push('/contacts');

   }

   const meetHandler=()=>{

      history.push('/meetings');

   }




   const calenderHandler=()=>{

     history.push('/calender');

   }


   const linksHandler=()=>{

     history.push('/links');

   }



   const timeTableHandler=()=>{



   }


  const diaryHandler=()=>{



  }







return (

<div className={classes.sideBarDashboard} style={{width:sideNavBarWidth}}>


    { showQuickMeetingInfo &&
       <QuickMeetingPage onPress={closeQuickMeetingInfo} 
	            userData={props.userData}
	            meetingRoomName={meetingRoomName}
	            meetingRoomLink={meetingRoomLink}
	            />
    }


   <SideNavBarButtonQMeeting onPress={createMeetingHandler}
         icon={BsFillCameraVideoFill}
         name="+Quick meeting"
         buttonColor={{background:'white',borderStyle:'solid',color:'var(--themeColor)',borderColor:'lightgrey' }}
         />


    {/*
     <SideNavBarButton onPress={homeHandler}
         icon={homeButtonColor.iconObj}
         name="Dashboard"
         buttonColor={{  
		         background: homeButtonColor.backgroundColor,
                         borderStyle: homeButtonColor.borderStyle,
                         borderColor: homeButtonColor.borderColor,
                         color: homeButtonColor.color,
			 borderRadius:homeButtonColor.borderRadius,
			 fontWeight:homeButtonColor.fontWeight
	             }}
         />
    */}


    <SideNavBarButton onPress={generalChatHandler} 
	 icon={generalChatButtonColor.iconObj} 
	 name="Chat"
	 onMouseEnter={showChatWindowOptions}
	 buttonColor={{  background:generalChatButtonColor.backgroundColor,
			 borderStyle: generalChatButtonColor.borderStyle,
			 borderColor: generalChatButtonColor.borderColor,
	                 color: generalChatButtonColor.color,
			 borderRadius:generalChatButtonColor.borderRadius,
                         fontWeight:generalChatButtonColor.fontWeight
	              }}
	 />



    
    <SideNavBarButton onPress={meetHandler}
         icon={meetButtonColor.iconObj}
         name="Meet"
         onMouseEnter={showChatWindowOptions}
         buttonColor={{  background: meetButtonColor.backgroundColor,
                         borderStyle: meetButtonColor.borderStyle,
                         borderColor: meetButtonColor.borderColor,
                         color: meetButtonColor.color,
                         borderRadius: meetButtonColor.borderRadius,
                         fontWeight: meetButtonColor.fontWeight
                      }}
         />
      


        {/*
	 
        <SideNavBarButton onPress={emailHandler}
            icon={emailButtonColor.iconObj} 
            name="Mail"
            buttonColor={{ background:emailButtonColor.backgroundColor,
		        borderStyle:emailButtonColor.borderStyle,
			borderColor:emailButtonColor.borderColor,
			color:emailButtonColor.color,
			borderRadius:emailButtonColor.borderRadius,
                        fontWeight:emailButtonColor.fontWeight
	              }}
         />
        */}
     

 <SideNavBarButton onPress={contactsHandler}
         icon={FiUsers}
         name="Contacts"
         buttonColor={{ background:contactsButtonColor.backgroundColor,
                        borderStyle:contactsButtonColor.borderStyle,
                        borderColor:contactsButtonColor.borderColor,
                        color:contactsButtonColor.color,
                        borderRadius:contactsButtonColor.borderRadius,
                        fontWeight:contactsButtonColor.fontWeight
                      }}

         />



    

  <SideNavBarButton onPress={calenderHandler}
         icon={BsCalendarDay}
         name="Calender"
	 buttonColor={{ background:calenderButtonColor.backgroundColor,
                        borderStyle:calenderButtonColor.borderStyle,
                        borderColor:calenderButtonColor.borderColor,
                        color:calenderButtonColor.color,
                        borderRadius:calenderButtonColor.borderRadius,
                        fontWeight:calenderButtonColor.fontWeight
                      }}

         />
   
     {/* 
     <SideNavBarButton onPress={timeTableHandler}
         icon={BsTable}
         name="Time Table"
         buttonColor={{background:inActivebuttonBkgColor,borderStyle:'none',borderColor:'grey',color:inActivebuttonColor }}
         />
     */}
  	
     <SideNavBarButton onPress={tasksHandler}
         icon={FaTasks}
         name="Tasks"
	 buttonColor={{ background:tasksButtonColor.backgroundColor,
                        borderStyle:tasksButtonColor.borderStyle,
                        borderColor:tasksButtonColor.borderColor,
                        color:tasksButtonColor.color,
                        borderRadius:tasksButtonColor.borderRadius,
                        fontWeight:tasksButtonColor.fontWeight
                      }}
         />

  
     {/*     
     <SideNavBarButton onPress={utilityHandler}
         icon={BsTools}
         name="Utility "
         buttonColor={{ background:utilityButtonColor.backgroundColor,
                        borderStyle:utilityButtonColor.borderStyle,
                        borderColor:utilityButtonColor.borderColor,
                        color:utilityButtonColor.color,
                        borderRadius:utilityButtonColor.borderRadius,
                        fontWeight:utilityButtonColor.fontWeight
                      }}
         />
      
     */} 


     {/*
     <SideNavBarButton onPress={instituteHandler}
         icon={BsBank}
         name="Institute"
         buttonColor={{ background:instituteButtonColor.backgroundColor,
                        borderStyle:instituteButtonColor.borderStyle,
                        borderColor:instituteButtonColor.borderColor,
                        color:instituteButtonColor.color,
                        borderRadius:instituteButtonColor.borderRadius,
                        fontWeight:instituteButtonColor.fontWeight
                      }}
         />

      */}



   <SideNavBarButton onPress={linksHandler}
         icon={BsBoxArrowUpRight}
         name="Links"
         buttonColor={{ background:usefullinksButtonColor.backgroundColor,
                        borderStyle:usefullinksButtonColor.borderStyle,
                        borderColor:usefullinksButtonColor.borderColor,
                        color:usefullinksButtonColor.color,
                        borderRadius:usefullinksButtonColor.borderRadius,
                        fontWeight:usefullinksButtonColor.fontWeight
                      }}

         />





      
     {/* 
     <SideNavBarButton onPress={diaryHandler}
         icon={BsJournalText}
         name="Diary"
         buttonColor={{background:inActivebuttonBkgColor,borderStyle:'none',borderColor:'grey',color:inActivebuttonColor }}
         />


    <SideNavBarButton onPress={diaryHandler}
         icon={BsArchive}
         name="Archived Courses"
         buttonColor={{background:inActivebuttonBkgColor,borderStyle:'none',borderColor:'grey',color:inActivebuttonColor }}
         />


    <SideNavBarButton onPress={diaryHandler}
         icon={BsBagCheck}
         name="Drive"
         buttonColor={{background:inActivebuttonBkgColor,borderStyle:'none',borderColor:'grey',color:inActivebuttonColor }}
         />
      */}


    <SideNavBarButton onPress={utilityHandler}
         icon={BsQuestionSquare}
         name="Report Problem"
         buttonColor={{background:inActivebuttonBkgColor,borderStyle:'none',borderColor:'grey',color:inActivebuttonColor }}
         />

    





</div>

);


}

export default SideBarDashboard;
