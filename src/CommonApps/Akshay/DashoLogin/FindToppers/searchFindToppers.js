import classes from "./searchFindToppers.module.css";
import { OptionField } from "../../CommonApps/FormInputObjects";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { usersearchgeneral } from '../../CommonApps/AllAPICalls';



const SearchFindToppers=()=> {



   const [searchedUsers, getSearchedUsers] = useState(null)
   const [searchString, setSearchString] =  useState("+91");
   const [pageNo , setPageNo] = useState(1);



    useEffect(()=>{

     let pageno=pageNo;
     usersearchgeneral({pageno,searchString, getSearchedUsers});
     return ()=>{
         getSearchedUsers(searchedUsers=>null);

        }

         getSearchedUsers(searchedUsers=>null);

     },[searchString,pageNo]);
















  const [classRank, setClassRank] = useState([
    { id: 1, name: "IIT" },
    { id: 2, name: "IAS " },
    { id: 1, name: "JEE" },
    { id: 2, name: "BE" },
    { id: 1, name: "ME" },
    { id: 2, name: "MBA" },
  ]);

  const handleChange = () => {};

  return (
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
            height="30px"
            defaultValue="Exam Name"
          />

        </div>

        <button className={classes.findTopperButton} type="button">
          Search
        </button>
        
      </div>
    </div>
  );
}
export default SearchFindToppers;
