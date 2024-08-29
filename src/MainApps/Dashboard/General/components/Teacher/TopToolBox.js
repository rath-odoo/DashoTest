import classes from './TopToolBox.module.css';


const TopToolBox =(props) =>{







return (

     <div className={classes.tool} style={{backgroundColor:props.toolBoxStyle.boxBkgColor, borderBottomColor: props.toolBoxStyle.boxBkgColor}}>

      <div className={classes.upperHalf}>
         <button className={classes.actionButton} 
	       style={{backgroundColor:props.toolBoxStyle.buttonBkgColor,color:props.toolBoxStyle.buttonTxtColor}} onClick={props.onPress} > 
	      <h3> {props.toolBoxStyle.buttonText} </h3>
	 </button>
         <div className={classes.numOngoing} style={{borderColor:props.toolBoxStyle.boxBkgColor}}>
              <div className={classes.numOngoing_text} style={{color:props.toolBoxStyle.rightTopBoxColor}}>
	            {props.toolBoxStyle.topRightText}
	      </div>
              <div className={classes.numOngoing_number}>
	           {props.toolBoxStyle.topRightNumber}
	      </div>
         </div>
      </div>

      <div className={classes.lowerHalf} >                                              
        <i style={{color: props.toolBoxStyle.buttonBkgColor}}>
	   <span>{props.toolBoxStyle.mainText} :</span> 
	   <span className={classes.numCourses}> {props.toolBoxStyle.mainNumber} </span>
	</i>
      </div>
    </div>










  );





}


export default TopToolBox;

