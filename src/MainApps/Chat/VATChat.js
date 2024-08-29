import React,{useState,useEffect,useRef} from "react";
import classes from "../CommonAppUtilities/MainAppContainer.module.css"
import TopInfoBarVATChat from './TopInfoBarVATChat';
import TopInfoBarGeneral from '../Dashboard/General/TopInfoBarGeneral';
import Separator from "../CommonAppUtilities/Separator";


//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import VATChatContentDiv from './VATChatContentDiv';

const VATChat=(props)=>{

   
   const [sideNavBarWidth,setSideNavBarWidth]=useState("calc( 0.5% + "+props.sideNavBarWidth+" )");
   const [mainAppContainerWidth,setMainAppContainerWidth]=useState('calc( 99% - var(--sideNavBarWidth) )');	
   /*const [contract, setContract] = useState(false);*/
   const isMounted = useRef(false);


   useEffect(() => {
      isMounted.current = true;	   
      setSideNavBarWidth("calc( 0.5% + "+props.sideNavBarWidth+" )");
      
      /*{!contract && setMainAppContainerWidth('calc( 100% - var(--sideNavBarWidth) )')}
      {contract && setMainAppContainerWidth('calc( 100% - var(--sideNavBarWidthOnContract) )')}      
      setContract(contract=>!contract);*/
      if(props.sideNavBarWidth==="var(--sideNavBarWidth)"){setMainAppContainerWidth('calc( 99% - var(--sideNavBarWidth) )');}
      if(props.sideNavBarWidth==="var(--sideNavBarWidthOnContract)"){setMainAppContainerWidth('calc( 99% - var(--sideNavBarWidthOnContract) )');}	   
      return () => { 
      }

   }, [props.sideNavBarWidth]);


   useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);	   
    return () => { 
	    isMounted.current = false 
            props.passMountInfo(false);
    }
   }, [props]);







    //let title="Chat"	
    let mainAppContainerStyle={left:sideNavBarWidth, width:mainAppContainerWidth}
    const infoBarActiveButtonColor = {color: 'white',backgroundColor: '#919191'}







   return(

      <div className={classes.mainAppContainer} style={mainAppContainerStyle} >
	  {/*props.selectedCourse !==null &&  
	  <TopInfoBarVATChat styles={infoBarActiveButtonColor} selectedCourse={props.selectedCourse}/>
	  */}

	  {/*props.selectedCourse ===null && 
          <TopInfoBarGeneral/>     	  		   
          <Separator/>
	  */}
      	   
          <VATChatContentDiv userData={props.userData}
	                     selectedCourse={props.selectedCourse}
	                     />
       

      </div>

   );
}

export default VATChat;

