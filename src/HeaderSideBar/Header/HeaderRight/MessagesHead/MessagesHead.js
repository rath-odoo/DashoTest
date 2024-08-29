import React, { useState } from 'react';
import classes from './MessagesHead.module.css';
import { FaComments } from "react-icons/fa";

import MessagesContainer from './MessagesContainer';

import { BsChatText } from 'react-icons/bs';

const MessagesHead = (props) => {


  const [styles, setStyles] = useState({ color: 'var(--headerRightIconsColor)', backgroundColor: 'var(--headerBkgColor)' });
  const [newMessage, setNewMessage] = useState(false);

  const onMouseEnterHandler = () => {
    setStyles({ color: 'var(--deepDarkThemeTextColor)', backgroundColor: 'lightgrey' });
  }


  const onMouseLeaveHandler = () => {
    setStyles({ color: 'var(--headerRightIconsColor)', backgroundColor: 'var(--headerBkgColor)' });
  }


  const [dropDown, setDropDown] = useState(false);



  const showMessagesHandler = () => {
    setDropDown(true);
    setNewMessage(false)
  }











  console.log(props);



  return (


    <div className={classes.messagesItemsParentDiv}>

      <button className={classes.ActionItemsButton}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        style={styles}
        onClick={showMessagesHandler}
      >
        <BsChatText className={classes.UsersIcon} style={styles} />
        {/*
	   <i className={classes.alertMessage}><b>9</b></i>
	*/}
      </button>


      {dropDown &&
        <MessagesContainer setDropDown={setDropDown}
          userData={props.userData}
          rerender={props.rerender}
          setNewMessage={setNewMessage}
          dropDown={dropDown}
        />
      }
      {newMessage &&
      <div className={classes.notifyDiv}>
        <div className={classes.redDiv}>
        </div>
      </div>
      }







    </div>

  );

}


export default MessagesHead;

