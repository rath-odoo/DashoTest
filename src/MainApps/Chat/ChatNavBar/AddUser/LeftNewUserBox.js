import React from "react";
import classes from "./LeftUserBox.module.css"
import MateIconBox from "./MateIconBox";
import MateInfoBoxNewUser from "./MateInfoBoxNewUser";
//import {getallusers,getuser,createchatgroup} from '../../../../../CommonApps/AllAPICalls';



const LeftUserBox = (props) =>{


//const [usersData, setUsersData ] = useState(props.usersData);
//const [data, setData]=useState(props.data );
//const [added, setAdded] = useState(false);







return(

<div className={classes.leftUserBox} >
<button className={classes.leftUserBoxButton} onClick={props.onPress} >

     <MateIconBox userImage={props.userImage} />

     <MateInfoBoxNewUser userName={props.userName}  
	                 added={props.added}
	                 userType={props.userType}
	 />


</button>
</div>

);

}

export default LeftUserBox;
