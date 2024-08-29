import React from "react";
import classes from "./MateTimeBox.module.css";


const MateTimeBox =(props)=>{









return (

<div className={classes.mateTimeBox}>

  { props.data.status ==="open" &&
   <div className={classes.astatus} style={{color:"var(--greenColor1)", 
		  backgroundColor:"white",
	          borderStyle:"solid",
		  borderWidth: "1px",
		  marginRight:"15px"
                  }}>
	          <b> { props.data.status}</b>  
   </div>
  }

  { props.data.status ==="closed" &&
  <div className={classes.astatus} style={{
   	          backgroundColor:"white",
                  borderStyle:"solid",
                  borderWidth: "1px",
		  color:"var(--redColor1)"

                                          }}><b> { props.data.status}</b>  </div>
  }




</div>
);

}

export default MateTimeBox;

