import { useEffect, useState, useRef } from "react";

import classes from "./About.module.css";
import LeftImageRightText from "./LeftImageRightText";
import RightImageLeftText from "./RightImageLeftText";
import office from "./office1.jpg";
import office2 from "./office2.jpg";
import office3 from "./about1.JPG";
import p1 from "./p1.png";
import mission from "./mission.png";
import vission from "./vision.png";
import checklist from "./checklist.png";
import FindTopperscard from "./findTopperscard";
import SearchFindToppers from "./searchFindToppers";
import { useHistory } from "react-router-dom";

//import classes from "./searchFindToppers.module.css";
//import { OptionField } from "../../CommonApps/FormInputObjects";

import OptionField from "./OptionField";
import { toppersearchgeneral } from "../../CommonApps/AllAPICalls";

const About = (props) => {


  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);

    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  const history = useHistory();

  const [searchedUsers, getSearchedUsers] = useState(null)
  const [searchString, setSearchString] =  useState("");
  const [pageNo , setPageNo] = useState(1);



  const contactusHandler = () => {
    history.push("/contactus");
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log("e.target.value: ", e.target.value);
    setSearchString((searchString) => e.target.value);
  };

  const [classRank, setClassRank] = useState([
    { id: "IIT JEE", name: "IIT JEE" },
    { id: "UPSC", name: "UPSC" },
    { id: "CAT", name: "CAT" },
    { id: "NEET", name: "NEET" },
    { id: "GATE", name: "GATE" },

  ]);


  useEffect(() => {
    let pageno = pageNo;
    toppersearchgeneral({ pageno, searchString, getSearchedUsers });
    return () => {
      getSearchedUsers((searchedUsers) => null);
    };
    getSearchedUsers((searchedUsers) => null);
  }, [searchString, pageNo]);

  const bookButtonHandler = () => {};

  console.log("searchString: ", searchString);
  console.log("searched users: ", searchedUsers);

  return (
    <div className={classes.about}>
      {/*
         <SearchFindToppers/>
	 */}

      <div className={classes.searchToppersCard}>
        <div className={classes.detailContainer2}>
          <div className={classes.mainHeading}>Find Here all Toppers</div>

          <div className={classes.subHeading}>
            Choose from our experienced toppers to get the best exam preparation
            guidance.
          </div>

          <div className={classes.textHeading3}>
            <OptionField
              handleChange={handleChange}
              label=""
              name="classname"
              options={classRank}
              requirement=""
              width="300px"
              defaultValue="Select Exam"
            />
            <button className={classes.findTopperButton} type="button">
              Search
            </button>
          </div>
        </div>
      </div>

      {searchedUsers !== null &&
        searchedUsers.results !== null &&
        searchedUsers.results.map((user, index) => {
          return (
            <FindTopperscard
              key={index}
              onPress={() => bookButtonHandler(user.id)}
              user={user}
            />
          );
        })}

      {searchedUsers !== null && searchedUsers.count === 0 && (
        <div className={classes.noResultMessage}>
          {" "}
          No toppers found with this option!
        </div>
      )}
    </div>
  );
};

export default About;
