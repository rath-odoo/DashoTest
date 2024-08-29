import Header from './Header';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import PageNew2 from './PageNew2';
import Footer from './Footer';
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import LearnPage from './Learn';







const App = (props) => {
  const [connectPage, setConnectPage] = useState(false);
  const [teachPage, setTeachPage] = useState(false);
  const [learnPage, setLearnPage] = useState(false);
  const [managePage, setManagePage] = useState(false);
  const [landingPage, setLandingPage] = useState(true);

  const history = useHistory();


  const updateStatesInFile = (connectPage, teachPage, learnPage, managePage, landingPage) => {
    if (learnPage) {
      history.push("/learn");
    }
    setConnectPage(connectPage);
    setTeachPage(teachPage);
    setLearnPage(learnPage);
    setManagePage(managePage);
    setLandingPage(landingPage);
  };





  return (
    <div>
      <Switch>
        <Route exact path='/' >
          <Header onStateChange={updateStatesInFile} />
          <Page1 setLoggedIn={props.setLoggedIn} loadedUsername="None" connectPage={connectPage}
            teachPage={teachPage} learnPage={learnPage} managePage={managePage} landingPage={landingPage} />
          <PageNew2 />
          <Page3 />
          <Footer />
        </Route>
        <Route exact path='/learn' >
          <LearnPage />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
