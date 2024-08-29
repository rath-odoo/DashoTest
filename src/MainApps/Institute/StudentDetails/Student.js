import logo from "./logo.svg";
import classes from "./App.module.css";

import StudnetDetails from "./StudentDetails";
import StudentHealthDetails from "./StudentHealthDetails";
import StudentFatherDetails from "./StudentFatherDetails";
import StudentMotherDetails from "./StudentMotherDetails";
import StudentDocument from "./StudentDocument";

import TopBar from "./TopBar";

function App() {
  return (
    <div className={classes.parent}>
      <div className={classes.mainContainer}>
        <TopBar />
        <StudnetDetails />
        <StudentHealthDetails />
        <StudentFatherDetails />
        <StudentMotherDetails />
        <StudentDocument />
      </div>
    </div>
  );
}

export default App;
