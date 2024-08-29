import { useState } from "react";
import classes from "./DropDownOne.module.css";
import OutsideAlerter from "./OutsideAlerter";
import { BsChevronDown } from "react-icons/bs";
import { Route, Switch, useHistory } from "react-router-dom";

const DropDownOne = (props) => {
  const history = useHistory();

  const [showDropDownTwo, setShowDropDownTwo] = useState(false);

  const showDropDownHandler = () => {
    setShowDropDownTwo(true);
  };

  const noticesHandler = () => {
    history.push("/homebuyer/notices");
  };

  const RulesAndRegulationsHandler = () => {
    history.push("/homebuyer/rulesandregulations");
  };

  const BlogsHandler = () => {
    history.push("/homebuyer/blogs");
  };

  const ProjectsHandler = () => {
    history.push("/homebuyer/lifecycle/projects");
  };

  const BookingHandler = () => {
    history.push("/homebuyer/lifecycle/booking");
  };

  const SaleDeedHandler = () => {
    history.push("/homebuyer/lifecycle/saledeed");
  };

  const PossessionHandler = () => {
    history.push("/homebuyer/lifecycle/possession");
  };

  const AssociationHandler = () => {
    history.push("/homebuyer/lifecycle/association");
  };

  const MaintenanceHandler = () => {
    history.push("/homebuyer/lifecycle/maintenance");
  };

  return (
    <OutsideAlerter setDropDown={props.setShowDropDownOne}>
      <div className={classes.dropdownOne}>
        <div className={classes.dropdownOneDiv}>
          <button
            type="button"
            className={classes.dropDownTwoButton}
            onClick={noticesHandler}
          >
            Notices
          </button>
        </div>
        <div className={classes.dropdownOneDiv}>
          <button
            type="button"
            className={classes.dropDownTwoButton}
            onClick={RulesAndRegulationsHandler}
          >
            Acts
          </button>
        </div>
        <div className={classes.dropdownOneDiv3}>
          <button
            type="button"
            onClick={showDropDownHandler}
            className={classes.dropDownTwoButton}
          >
            <span>Life Cycle</span>
            <BsChevronDown size={15} style={{ marginLeft: "5px" }} />
          </button>
          <div className={classes.dropdownTwoDiv}>
            <button
              type="button"
              className={classes.dropDownTwoButton}
              onClick={ProjectsHandler}
            >
              {" "}
              Projects{" "}
            </button>
            <button
              type="button"
              className={classes.dropDownTwoButton}
              onClick={BookingHandler}
            >
              {" "}
              Booking{" "}
            </button>
            <button
              type="button"
              className={classes.dropDownTwoButton}
              onClick={SaleDeedHandler}
            >
              {" "}
              Sale Deed{" "}
            </button>
            <button
              type="button"
              className={classes.dropDownTwoButton}
              onClick={PossessionHandler}
            >
              {" "}
              Possession{" "}
            </button>
            <button
              type="button"
              className={classes.dropDownTwoButton}
              onClick={AssociationHandler}
            >
              {" "}
              Association{" "}
            </button>
            <button
              type="button"
              className={classes.dropDownTwoButton}
              onClick={MaintenanceHandler}
            >
              {" "}
              Maintenance{" "}
            </button>
          </div>
        </div>
        <div className={classes.dropdownOneDiv}>
          <button
            type="button"
            className={classes.dropDownTwoButton}
            onClick={BlogsHandler}
          >
            Blogs
          </button>
        </div>
      </div>
    </OutsideAlerter>
  );
};

export default DropDownOne;
