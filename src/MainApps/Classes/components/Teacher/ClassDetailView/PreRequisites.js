import classes from './PreRequisites.module.css';
import {BiEdit} from 'react-icons/bi';


const InstituteBar=(props)=>{

return (

<div className={classes.instituteBar}>

   <i className={classes.titleSpace}> <span>PREREQUISITES <i style={{color:'red'}}>: Not set</i></span>   
	<button className={classes.editButton}> <BiEdit className={classes.editIcon}/></button></i> 
    <div className={classes.timeAndAddressInfo}>
     <i><b style={{color:'var(--themeColor)'}}>Scalar and Vector</b></i>
     <i> Vector Algebra, Scalar and Vector</i>

   </div>

</div>

);

}

export default InstituteBar;
