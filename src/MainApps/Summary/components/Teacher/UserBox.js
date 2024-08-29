

import classes from './UserBox.module.css';



const UserBox=(props)=>{



return (

 <div className={classes.userBox}>

   <img src={props.userImage} className={classes.userImage}/>	
   <div className={classes.nameInfo}> 
   </div>

 </div>

);

}

export default UserBox;
