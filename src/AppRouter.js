import CheckLogin from './CheckLogin';
import React, { useState, useEffect } from "react";
import {Route,Switch} from 'react-router-dom'
import Register from './CommonApps/Register';
import RegisterV2 from './CommonApps/Akshay/Register';
// import RegisterV2 from './CommonApps/Reshwanth/Register';
import BookAdmin from './BookAdmin/BookAdmin';
import JitsiVideo from './VideoPlayer/Jitsimeet/JitsiVideo';
import PublicProfile from './PublicPages/Profile';
import OnlineRegistrationHome from './OnlineRegistration/OnlineRegistrationHome';
import ViewAllRegistrants from './OnlineRegistration/ViewAllRegistrants';
//redux used in the following parts
import RegistrationContainer from './containers/RegistrationContainer';
import ProfileImage from './MainApps/Account/UserProfile/ProfileImageSec/ProfileImage';
import CourseDetailsComponent from './MainApps/Students/components/Teacher/AkshayStudent/CourseDetailsComponent';




import Transactions from './MainApps/Institute/Transactions';
import LeaveCard from './MainApps/Dashboard/General/components/Student/Forms/course';


const AppRouter=()=>{

     const [dashboardCourses, getDashboardCourses] = useState([]);
     

return (

<div>

<Switch>

   <Route exact path='/createaccount/' >
        <RegisterV2/>
   </Route>

   <Route exact path='/bookadmin/' >
        <BookAdmin/>
   </Route>

   <Route exact path='/onlineregistration/' >
        <RegistrationContainer/>
   </Route>

   <Route exact path='/tgrwamembers/' >
        <ViewAllRegistrants/>
   </Route>


   <Route exact path='/transactions/:fee_id' >
        <Transactions/>
   </Route>

   <Route path='/:courseid/CourseDetail'   >

<LeaveCard />
</Route>


   {/* <Route  path='/public/profile/' >
        <PublicProfile/>
   </Route> */}

     <Route path='/public/profile/:userId'   >

          <PublicProfile />
        </Route>
     
        {/* <Route path='/sharedlink/:courseGlobalCode'   >

          <CourseDetailsComponent  />
          </Route> */}

           <Route path='/sharedlink/:courseGlobalCode' render={(routeProps) => (
          <CourseDetailsComponent dashboardCourses={dashboardCourses}
          // selectedCourse={selectedCourse}

          {...routeProps} additionalProp="additionalValue" />
        )} />

   <Route  path='/video/' >
        <JitsiVideo/>
   </Route>
   
   <Route  path='/' >
        <CheckLogin />
   </Route>	
   
</Switch>




</div>
);
}

export default AppRouter;
