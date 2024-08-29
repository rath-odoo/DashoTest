
import classes from './MeetingShortViewDropDown.module.css';
import OutsideAlerter from '../../../../CommonApps/OutsideAlerter';
import {deletemeeting } from '../../../../CommonApps/AllAPICalls';


const MeetingShortViewDropDown=(props)=>{




    const editMeetingCardButtonHandler=()=>{

    }


    const deleteMeetingHandler=()=>{

        let meetingid = props.Meeting.id;
	deletemeeting({meetingid, props});    


    }




return(

        <OutsideAlerter setDropDown={props.setDropDown}>

                <div className={classes.dropdownButtons}>

                                    <button type="button"
                                            className={classes.dropdownButton}
                                            onClick={props.editMeetingHandler}>
                                            edit
                                    </button>
                                    <button type="button"
                                            className={classes.dropdownButton}
                                            onClick={deleteMeetingHandler}>
                                             delete
                                    </button>

	                            {/*
                                    <button type="button"
                                            className={classes.dropdownButton}>
                                             publish
                                    </button>

                                    <button type="button"
                                            className={classes.dropdownButton}>
                                             archive
                                    </button>
				    */}

                                </div>


        </OutsideAlerter>


);










}

export default MeetingShortViewDropDown;
