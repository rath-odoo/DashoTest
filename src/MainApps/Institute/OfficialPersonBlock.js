import classes from "./OfficialPersonBlock.module.css";

import Person from "./p2.jpg";

const OfficialPersonBlock = (props) => {




  return (
    <button className={classes.mainBlock}>
      <img src={Person} className={classes.personImage}></img>

      <div className={classes.status}>Director</div>
      <div className={classes.name}>{props.person.firstname + " " + props.person.lastname}</div>
    </button>
  );


}

export default OfficialPersonBlock;
