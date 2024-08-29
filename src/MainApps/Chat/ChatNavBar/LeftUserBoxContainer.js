import React,{useState,useEffect} from "react";
import classes from "./LeftUserBoxContainer.module.css"
import LeftUserBox from "./LeftUserBox";
//import classimg from '../../../../images/groupImage.png';
import {getchatgroups, getpersonalgeneralchatgroups,getcoursechatgroups} from '../../../CommonApps/AllAPICalls';






const LeftUserBoxContainer = (props) =>{


    const [chatGroups, getChatGroups]= useState(null);
    const [courseChatGroups, getCourseChatGroups] = useState(null);

    const [rerender, setRerender] = useState(false);


    useEffect(()=>{
       let courseId = props.selectedCourse !==null ? props.selectedCourse[0].id:null;    
       getpersonalgeneralchatgroups({getChatGroups});
	    
       courseId !==null && getcoursechatgroups({getCourseChatGroups, courseId});

    },[props.userData,rerender]);

    //const delay = ms => new Promise(res => setTimeout(res, ms));

    const switchChatGroupHandler=async(groupId)=>{

     props.switchGroupHandler(groupId);	 
     //await delay(3000);	   
     //setRerender(rerender=>!rerender); 
    }


    
     //console.log("courseChatGroups: ", courseChatGroups);	


return(

<div className={classes.leftUserBoxContainer}>

      {/*<LeftUserBox userImage={classimg} userName={groupname} />*/}


      {/* in future change this logic. This must interfere performance*/}

      {/*usersData.filter(
           function(user) {
         if (user.id === data.id) {
              return false; 
              }
                  return true;
             })


            .map((user,index)=>{

              	      
             return    <LeftUserBox key={index} userImage={user.profile_image} userName={user.firstname +" "+user.lastname}  onPress={()=>props.onPress(user.id)}/>

              

           }

        )
		      */}




      {/*
        chatGroups.filter(
           function(user){
                 
                if(user.groupusers.includes(data.id)){return true;}
		return false;  

              }
	).map((user,index)=>{

        return    <LeftUserBox key={index} 
	           userImage={user1Image}  
		   userName={user.name} 
		   userId={getFriendUser(user.groupusers)} 
		   onPress={()=>props.onPress(getFriendUser(user.groupusers),user.id)}
		   style={getColor(user.id,props.clickedGroupId)}
		  />


           }

        )
      */}



       { props.selectedCourse ===null && chatGroups !==null && chatGroups.results !==null && 
          chatGroups.results.map((group, index)=>{
               
	      if(group.groupType==="oneoone" && group.groupuserObjects.length === 2){
		     
               return <LeftUserBox key={index}
                         userData={props.userData}
	                 group={group}
		         switchGroupHandler={switchChatGroupHandler} 
                     />
	      }

          })

       }


       {  

         props.selectedCourse !==null && courseChatGroups !==null && courseChatGroups.results !==null &&
          courseChatGroups.results.map((group, index)=>{

              if(group.groupType==="oneoone" && group.groupuserObjects.length === 2){

               return <LeftUserBox key={index}
                         userData={props.userData}
                         group={group}
                         switchGroupHandler={switchChatGroupHandler}
                     />
              }

          })


       }









</div>

);

}

export default LeftUserBoxContainer;
