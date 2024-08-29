import React, { useState } from "react";
import classes from "./PaymentsContentDiv.module.css";
import base from "../CommonAppUtilities/AppContentDiv.module.css";
//import TopToolBarTeacher from './components/Teacher/TopToolBarV1';
import AkshayPaymentDesign from "./Apayment";

const ExamsContentDiv = (props) => {
  const reRenderHandler = () => {
    //setRerender(!rerender);
    //props.onPress();
  };

  const [toolBox1PageMounted, setToolBox1PageMounted] = useState(false);
  const [toolBox2PageMounted, setToolBox2PageMounted] = useState(false);
  const [toolBox3PageMounted, setToolBox3PageMounted] = useState(false);
  const [toolBox4PageMounted, setToolBox4PageMounted] = useState(false);
  const [toolBox5PageMounted, setToolBox5PageMounted] = useState(false);

  const showToolBox1PageContentHandler = () => {};

  const showToolBox2PageContentHandler = () => {};

  const showToolBox3PageContentHandler = () => {};

  const showToolBox4PageContentHandler = () => {};

  const showToolBox5PageContentHandler = () => {};

  return (
    <div className={base.appContentDiv}>
      <div className={classes.contentDiv}>
        <div className={base.pwdAppDirectory}>
          {" "}
          <i className={base.pwdAppDirectoryText}> 

          
        </i>{" "}

        </div>

        <AkshayPaymentDesign/>


      </div>
    </div>
  );
};

export default ExamsContentDiv;
