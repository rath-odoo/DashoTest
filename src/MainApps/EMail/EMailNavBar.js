import React from "react";
import classes from "./EMailNavBar.module.css";
import ComposeTopBar from "./ComposeTopBar";
import EMailSecButton from "./EMailSecButton";

import { GrMail } from "react-icons/gr";
import { RiDraftFill } from "react-icons/ri";
import { RiSendPlaneFill, RiSpamFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const ChatNavBar = () => {
  let Inbox = "Inbox";
  let Drafts = "Drafts";
  let Sent = "Sent";
  let Spam = "Spam";
  let Trash = "Trash";

  return (
    <div className={classes.chatNavBar}>
      <ComposeTopBar />

      <div className={classes.mainItem}>
        <EMailSecButton icon={GrMail} secName={Inbox} />

        <EMailSecButton icon={RiDraftFill} secName={Drafts} />

        <EMailSecButton icon={RiSendPlaneFill} secName={Sent} />

        <EMailSecButton icon={RiSpamFill} secName={Spam} />

        <EMailSecButton icon={FaTrash} secName={Trash} />

        <EMailSecButton icon={AiFillStar} secName="Starred" />

        <EMailSecButton icon={AiFillStar} secName="Important" />

        <EMailSecButton icon={null} secName="+Create New Label" />

        <EMailSecButton icon={null} secName="Physics Class-11" />
        <EMailSecButton icon={null} secName="Chemistry Class-12" />
        <EMailSecButton icon={null} secName="Math Class-11" />
      </div>
    </div>
  );
};

export default ChatNavBar;
