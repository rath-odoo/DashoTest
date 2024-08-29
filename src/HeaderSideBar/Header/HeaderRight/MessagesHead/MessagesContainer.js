
import classes from './MessagesContainer.module.css';
import OutsideAlerter from "../UserHead/OutsideAlerter";
import { useEffect, useState } from 'react';
import { getpersonalgeneralchatgroups } from '../../../../CommonApps/AllAPICalls';
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { storage } from '../../../../CommonApps/Reshwanth/firebase';


const MessagesContainer = (props) => {

    const [unread, setUnread] = useState(0);
    const [contact, setContact] = useState(0);
    // const [groups,setGroups] = useState(props.userData.generalchatgroups);
    // useEffect(() => {
    //     groups.forEach((groupId) => {
    //         console.log(groupId);
    //         const unsub = () => {};
    //         getDoc(doc(storage, "chatRooms", String(groupId))).then((snapshot) => {
    //             if (snapshot.exists()) {
    //                 const data = snapshot.data();
    //                 console.log(data);
    //                 if (data.lastMessageSenderId !== props.userData.id && data.unRead>0) {
    //                     setUnread((unread) => unread + Number(data.unRead));
    //                     setContact((contact) => contact + 1);
    //                 }
    //             }
    //         }).catch((error) => {
    //             console.error("Error fetching document:", error);
    //         });
    //         return unsub;
    //     });
    
    // }, []);
    

    return (

        <OutsideAlerter setDropDown={props.setDropDown}>
            <div className={classes.notificationContainer}>
                {contact === 0 && <div className={classes.oneNotification} style={{ color: 'grey' }}> There are no new messages </div>}
                {contact!==0 && <div className={classes.oneNotification} style={{ color: 'grey' }}> There are {unread} new messages from {contact} contact </div>}
            </div>

        </OutsideAlerter>

    );

}

export default MessagesContainer;
