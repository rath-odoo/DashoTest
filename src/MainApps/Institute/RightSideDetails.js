import classes from "./RightSideDetails.module.css";

//import SingleUser from "./singleUser";
import SingleUserDetails from "./singleUserDetails";

import UserInfo from "./UserInfo";

import Attednace from "./Attendance";

import CourseDetails from "./Course_details";
import Single_course_View from "./Single_course_View";

import Finance from "./Finance";

import SingleFeesDetailView from "./SingleFeesDetailView";

function RightSideDetails() {
  return (
    <div className={classes.parentClass}>

      {/* <SingleUser /> */}

      {/* <Attednace/> */}

      <Finance />

      {/* <CourseDetails/> */}
      
    </div>
  );
}

export default RightSideDetails;
