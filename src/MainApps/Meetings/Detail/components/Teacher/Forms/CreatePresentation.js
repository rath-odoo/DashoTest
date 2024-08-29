import React, { useState, useEffect } from "react";
import classes from "./EditMeetingForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Logo from '../../../../../../CommonApps/Logo'
import { getuser, putuser, putuserprofile, putmeetinginfo, getusersfromnames, createnewpresentation } from '../../../../../../CommonApps/AllAPICalls';
import { TimeField, TextInput, TextInputAddSpeaker, OptionField, DateField2, DayField, CustomTimePicker } from './../../../../../../CommonApps/FormInputObjects';






const convertAndAddto24hourFormat = ({ formData }) => {

  let ampm = formData.selectedampm;
  let minute = formData.selectedminute;
  let hour = formData.selectedhour;
  if (ampm === "pm") {
    hour = Number(hour) + 12;
  }

  //let time=hour+':'+minute+':'+'00';
  let time = `${hour}:${minute}:00`;
  let timestr = time.toString();
  formData["talktime"] = timestr;
}





const AboutEditForm = (props) => {


  const [data, setData] = useState({});

  useEffect(() => {
    getuser({ setData });
  }, []);

  const initialFormData = Object.freeze({
    talktitle: "",
    talktime: "00:00:00",
    duration: null,
    speaker: null,
    outspeaker: null,
    meetingId: props.meeting.id,
    selectedhour: null,
    selectedminute: null,
    selectedampm: null,
  });



  const [formData, updateFormData] = useState(initialFormData)

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };



  const [pptCreated, setPptCreated] = useState(false);
  const [time, setTime] = useState({
    hour: "hh",
    minute: "mm",
    ampm: "AM"
  });

  const updateTimeForm = async (hour,minute,ampm) => {
    await updateFormData({
      ...formData,
      selectedhour: hour,
      selectedminute: minute,
      selectedampm: ampm,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData["talktitle"] === "") {
      alert("please enter talk title");


    }





    let meetingid = props.meeting.id;
    formData["selectedhour"] = time.hour;
    formData["selectedminute"] = time.minute;
    formData["selectedampm"] = time.ampm;

    console.log("formData: ", formData);
    formData["classdate"] = "13:13:13"
    let hourset = false;
    let minset = false;
    let ampmset = false;


    //     if(("selectedhour" in formData)){
    // hourset=true;
    //           }

    //           if(("selectedminute" in formData)){
    //                   minset=true;
    //           }

    //      if(("selectedampm" in formData)){
    //                   ampmset=true;
    //           }


    //          if( !hourset || !minset || !ampmset){

    //           alert("Time not set properly!!");
    //    }
    if (time.hour !== "hh") {
      hourset = true;
    }
    if (time.minute !== "mm") {
      minset = true;
    }
    if (time.ampm !== "") {
      ampmset = true;
    }
    if (!hourset || !minset || !ampmset) {

      alert("Time not set properly!!");
    }


    if (formData["duration"] === null) {
      alert("please choose talk duration");

    }

    if (Object.keys(addedUser).length !== 0) {
      formData["speaker"] = addedUser.id;
    }


    if (formData["speaker"] === null) {

      alert("Please choose one speaker");

    }




    if (hourset && minset && ampmset) {
      convertAndAddto24hourFormat({ formData });
    }

    console.log("formData create ppt: ", formData)


    createnewpresentation({ formData, props });
    //props.userDataUpdated(true);
    // window.location.reload(false);
    // props.onPress();
  };


  let intervals = ["scheduled", "postponed", "cancelled"]

  let timeintervals = [
    { "name": "5mins", "id": 5 },
    { "name": "10mins", "id": 10 },
    { "name": "20mins", "id": 20 }
  ]



  const [searchUsers, getSearchUsers] = useState([])

  const handleChangeSearch = (e) => {

    let namestring = e.target.value;
    getusersfromnames({ namestring, getSearchUsers });

  }


  //console.log("search users: ",searchUsers)

  const [addedUser, setAddedUser] = useState({});

  const selectSpeakerHandler = ({ user }) => {
    console.log("userid: ", user.id);
    setAddedUser(addedUser => user);
  }

  console.log(" addedUser: ", addedUser);

  console.log("formData: ", formData);









  return (

    <div className={classes.aboutEditFormDivParent}>



      <form className={classes.aboutEditForm} onSubmit={handleSubmit} style={{ height: "700px" }}>
 


        <div className={classes.innerDiv}>


          <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
          </div>
          
          <div className={classes.logoAndTitleContainer}>
            <div style={{ width: "38px" }}> <Logo /> </div>
            <div className={classes.titleDiv}><i style={{ fontStyle: "normal", marginTop: "30px" }}>  Add a new talk: Meeting ID {props.meeting.id}  </i></div>
          </div>
          

          <TextInput handleChange={handleChange}
            label="Title of the talk"
            name="talktitle"
            placeholder="Enter title"
            defaultValue={""}
          />

          <div className={classes.timeContainerDiv}>
            <CustomTimePicker time={time} setTime={setTime} width="200px" requirement="*" />


            <OptionField handleChange={handleChange}
              label="Talk duration"
              name="duration"
              options={timeintervals}
              defaultValue={""}
              width="200px"
            />
          </div>

          <TextInputAddSpeaker handleChange={handleChangeSearch}
            label="Add speaker"
            name="speaker"
            placeholder="Search by firstname"
            defaultValue={""}
            searchUsers={searchUsers}
            selectedSpeaker={selectSpeakerHandler}
            addedUser={addedUser}
	    getSearchUsers={getSearchUsers}
	    setAddedUser={setAddedUser}
          />

          <div className={classes.submitButtonDiv}>
            <button type="submit" className={classes.submit_button} >
              <b>Save </b>
            </button>
          </div>


        </div>


      </form>



    </div>
  );

}


export default AboutEditForm;
