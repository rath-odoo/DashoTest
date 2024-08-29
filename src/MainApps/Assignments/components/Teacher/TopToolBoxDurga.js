import classes from './TopToolBoxDurga.module.css';

const TopToolBoxV1=(props)=>{
    
    const TheIcon = props.icon;


   return(
    <div className={classes.parentDiv}>
         
    <div className={classes.toptoolbox}>
    <TheIcon className={classes.toolBoxIcon} style={{color:props.toolBoxStyle.iconColor}}/>
        {props.iconName}</div>
        
       
   
    </div>
    
   );
};
export default TopToolBoxV1;