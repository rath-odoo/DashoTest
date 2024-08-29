
import classes from './OneSelectedUser.module.css';

const OneSelectedUser=(props)=>{



console.log("props.oneUser", props.oneUser);


  const unSelectUserHandler=()=>{


  }



return <div className={classes.oneSelectedUser}>
		
  <span><img  src={props.oneUser.profile_image} className={classes.profileImageOneSelser} /> </span>
  <span className={classes.fullname}> {props.oneUser.username}</span>
  <button type="button" onClick={unSelectUserHandler}>X  </button>	
</div>

}


export default OneSelectedUser;
