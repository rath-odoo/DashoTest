import React from 'react';

import classes from './UserProfileSwitchBar.module.css';
import UserProfileSwitchBarButton from './UserProfileSwitchBarButton';


const UserProfileSwitchBar = (props) => {


    let Public = "Public";
    let Private = "Private";
    let Courses = "Courses";
    let Friends = "Contacts";



    return (

        <div className={classes.userProfileSwitchBar}>



            {/* <UserProfileSwitchBarButton onPress={props.onPressBasic} title={Public} style={props.style.basic} />

            <UserProfileSwitchBarButton onPress={props.onPressAdvanced} title={Private} style={props.style.advanced} /> */}
            {/*	
<UserProfileSwitchBarButton onPress = {props.onPressGrades} title={Courses} style={props.style.grades}/>

<UserProfileSwitchBarButton onPress = {props.onPressFriends} title={Friends} style={props.style.friends}/>
*/}

        </div>

    );



}


export default UserProfileSwitchBar;

