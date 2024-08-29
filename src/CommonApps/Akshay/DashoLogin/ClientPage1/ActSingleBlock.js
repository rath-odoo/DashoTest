import classes from "./ActSingleBlock.module.css";

import pic from "./reraLogo.png";

import { useHistory } from "react-router-dom";

function ActSingleBlock(props) {
   const history = useHistory();
   const reraPageHandler = () => {
      history.push("./RulesAndRegulations/ReraAct");
   };

   const openDocumentHandler=()=>{
    

    window.open(props.link, "_blank");

   }





  return (
    // <button className={classes.parent} onClick={reraPageHandler}>

    <button className={classes.actButton} onClick={openDocumentHandler}>
      {/* <img src={props.image} className={classes.mainImg} /> */}
      <div className={classes.title}>{props.title}</div> 
      {/*	  
      <div className={classes.des}>{props.description}</div>
      */}
    </button>
  );
}
export default ActSingleBlock;
