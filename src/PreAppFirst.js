import PreAppSecond from './PreAppSecond';
import {Route,Switch} from 'react-router-dom'
import Register from './CommonApps/Register';

import RegisterV2 from './CommonApps/Akshay/Register';
import BookAdmin from './BookAdmin/BookAdmin';
import JitsiVideo from './VideoPlayer/Jitsimeet/JitsiVideo';

import PublicProfile from './PublicPages/Profile';

import OnlineRegistrationHome from './OnlineRegistration/OnlineRegistrationHome';
import ViewAllRegistrants from './OnlineRegistration/ViewAllRegistrants';


const PreAppFirst=()=>{



return (

<div>

<Switch>

   <Route exact path='/createaccount/' >
        <RegisterV2/>
   </Route>

   <Route exact path='/bookadmin/' >
        <BookAdmin/>
   </Route>

   <Route exact path='/tgrwaregister/' >
        <OnlineRegistrationHome/>
   </Route>

   <Route exact path='/tgrwamembers/' >
        <ViewAllRegistrants/>
   </Route>
	

   <Route  path='/public/profile/' >
        <PublicProfile/>
   </Route>


   <Route  path='/video/' >
        <JitsiVideo/>
   </Route>




   
   <Route  path='/' >
        <PreAppSecond/>
   </Route>	
   



</Switch>




</div>
);
}

export default PreAppFirst;
