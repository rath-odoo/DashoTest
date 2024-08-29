import React,{useState, CSSProperties} from 'react';
import classes from './CourseEnrollmentRequest.module.css';
import {putcourseenroll, courseenrollrequestreject} from '../../../../CommonApps/AllAPICalls';
import FadeLoader from "react-spinners/BeatLoader";
import { storage } from '../../../../CommonApps/Reshwanth/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize:"10px",
};








const OneRequest=(props)=>{

   let color="white";
   let courseId = props.request.courseId;
   let requesterId = props.request.requesterId;	

   const [ approveState, setApproveState] = useState("notLoading");

  //  const deleteRecordInFirebase = async () => {
  //   try {
  //     const documentRef = doc(storage, "dashoo", props.username);
  //     const documentSnapshot = await getDoc(documentRef);
  
  //     if (documentSnapshot.exists()) {
  //       const documentData = documentSnapshot.data();

  //       if(documentData!==null){
  //         const index = documentData.requestedList ===null ? -1:documentData.requestedList.findIndex(item => 
  //           item.courseId === props.request.courseId && item.requester_username === props.request.requester_username
  //         );
    
  //         // If index found, remove the item from the array
  //         if (index !== -1) {
  //           documentData.requestedList.splice(index, 1);
    
  //           // Update the document with the modified array
  //           await updateDoc(documentRef, { requestedList: documentData.requestedList });
  //           console.log('Item successfully deleted from the array!');
  //         } else {
  //           console.log('Item not found in the array!');
  //         }
  //       }
  //       else{
  //         console.log("document not present");
  //       }
        
  
  //     } else {
  //       console.log('Document does not exist!');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting field:', error);
  //   }
  // }

   const approveHandler=({courseId, requesterId})=>{

     //console.log("enroll Info: ", courseId,requesterId);
     setApproveState("LoadingApprove");
    //  deleteRecordInFirebase();
     putcourseenroll({courseId, requesterId, setApproveState, props});

   }


   const rejectHandler=({courseId, requesterId})=>{

     setApproveState("LoadingReject");
    //  deleteRecordInFirebase();
     courseenrollrequestreject({courseId, requesterId, setApproveState, props});

   }










return  (<div  className={classes.oneRequest}>
              <p className={classes.textBox1}>
                   <span className={classes.requesterName}>
                       { props.request.requester_firstname !=="" &&
                         props.request.requester_firstname +" "+props.request.requester_lastname+" "
                       }
                       { props.request.requester_firstname ==="" &&
                         props.request.requester_username +" "
                       }





                   </span>
                   wants to enroll in your
              </p>
              <p className={classes.textBox2}> Course:
               {100000+Number(props.request.courseId)}
              </p>
              <div className={classes.ApproveRejectBtnDiv}>
                   <button type="button" className={classes.approveButton} onClick={()=>approveHandler({courseId, requesterId})}>
                         {approveState==="LoadingApprove" &&
                            <FadeLoader color={color} loading={true} css={override} size={10}   />
                         }
                         <b>Approve</b>
                   </button>
                   <button type="button" className={classes.rejectButton} onClick={()=>rejectHandler({courseId, requesterId})}>
             	         {approveState==="LoadingReject" &&
                            <FadeLoader color={color} loading={true} css={override} size={10}   />
                         }
                         <b>Reject</b>
                   </button>
              </div>
            </div>

       );



}

export default OneRequest;
