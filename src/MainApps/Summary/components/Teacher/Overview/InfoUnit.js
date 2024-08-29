




import classes from './InfoUnit.module.css';

const InfoUnit=(props)=>{

return (

<div className={classes.infoUnit}>
   <div className={classes.nameStyle}>
    <props.icon/> {props.name}
   </div>
   { props.name ==="Status" && props.value==="ongoing"	&&
   <div className={classes.valueStyle} style={{color: "green",fontWeight:"bold"}}>{props.value}</div>
   }

   { props.name ==="Status" && props.value==="closed"  &&
   <div className={classes.valueStyle} style={{color: "red",fontWeight:"bold"}}>{props.value}</div>
   }
	



   { props.name !=="Status" &&
   <div className={classes.valueStyle} >{props.value}</div>
   }





</div>

);

}

export default InfoUnit;
