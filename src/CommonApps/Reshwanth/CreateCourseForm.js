import React,{useState, useEffect} from "react";
import classes from "./CreateCourseForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
// import logoImage from '../../../../../../CommonApps/BWlogo.JPG'
//import {OptionField,OptionFieldSubmitValue,OptionFieldSecondaryObjs, ParagraphField,TextInput, DateField} from './FormInputObjects';
// import {TextInput} from './FormInputObjects';
// import { getcoursesbyCourseId, publiccoursesearch, addcoursetodashboard} from '../../../../../../CommonApps/AllAPICalls';
//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";
//import CourseSearchView from "./CourseSearchView";
// import CourseSearchViewNew from './CourseViewDashboard_v2.js';
import {BsChevronDown, BsChevronDoubleRight, BsChevronDoubleLeft} from 'react-icons/bs';


// import OneCourseCardSagar from "../../MainApps/Dashboard/General/components/Student/Forms/OneCourseCardSagar";
import OneCourseCardSagar from "./OneCourseCardSagar";


// import EnrollForm from './EnrollForm';
// import { TextInput } from "../../MainApps/Dashboard/General/components/Student/Forms/FormInputObjects";
import { TextInput } from "./FormInputObjectsTwo";

import { publiccoursesearch } from "../AllAPICalls";
import AkshaySummary from "../../MainApps/Summary/AkshaySummary";

// import CourseCardSagar from "../../MainApps/Dashboard/General/components/Teacher/CourseCardSagar";



/*const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
*/



const CreateCourseForm=(props)=>{
    console.log("selected Course: ", props.selectedCourse);



   const [searchedCourses, getSearchedCourses] = useState(null);

   const [searchString, setSearchString] =  useState("");

   const [pageNo , setPageNo] = useState(1);

   const [showSearchedCourses, setShowSearchedCourses] = useState(true);


   useEffect(()=>{

    

     let pageno=pageNo;
     publiccoursesearch({pageno,searchString, getSearchedCourses});
     return ()=>{
         getSearchedCourses(searchedCourses=>null);
        }

         getSearchedCourses(searchedCourses=>null);

   },[searchString, pageNo]);




  const handleChange = (e) => {

	  console.log("e.: ", e.target.value);
	  setPageNo(1);
	  setSearchString(searchString=>e.target.value);
  }


   const prevCoursePageHandler=()=>{
     if (searchedCourses !==null && searchedCourses.previous !==null ){ 
      setPageNo(pageNo=>pageNo-1);
       }

   }

   const nextCoursePageHandler=()=>{
    if (searchedCourses !==null && searchedCourses.next !==null ){	   
    setPageNo(pageNo=>pageNo+1);
        }
   }


   let endCourseNum = pageNo * (  searchedCourses !==null ? searchedCourses.results.length: 0 );
   let startCourseNum = endCourseNum - (  searchedCourses !==null ? searchedCourses.results.length: 0 );

   console.log("searchedCourses: ", searchedCourses);

   const [gridContainerStyle, setGridContainerStyle]=useState({
	   gridTemplateColumns: (searchedCourses !==null && searchedCourses.length <= 2) ? 'repeat(auto-fit, minmax(300px, 400px))':'repeat(auto-fit, minmax(300px, 1fr))'

   });


    useEffect(()=>{

    searchedCourses !==null && searchedCourses.length === 1 && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 300px))'


    });

     searchedCourses !==null && searchedCourses.length === 2 && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax(300px,400px ))'

     });


    searchedCourses !==null && searchedCourses.length > 2 && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'

     });



   },[searchedCourses]);





   const handleSearch = () => {
    setShowSearchedCourses(true); // Show searched courses after search is performed
}






return(

<div className={classes.createTicketFormDivParent} >

   {/*!showForm &&  
	   <div className={classes.createTicketFormLoading}>

	   <FadeLoader color={color} loading={loading} css={""} size={50}  />
	    
	   <div className={classes.submittingDiv}> Creating . . . </div>
           </div>
   */}




   { 	
  <form className={classes.createTicketForm} onSubmit={handleSearch}>

     {/*form close button below*/}	
    <div className={classes.closeButtonDiv} >
        {/* <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button> */}
        <div className={classes.searchHeading}>Here, you can search for:</div>
        {/* <AkshaySummary /> */}
    </div>	

 
     {/*logo and field title container below*/}
    {/* <div className={classes.logoAndTitleContainer}>
           <div className={classes.formTitleDiv}><i>  Public Live Course Repository </i></div>
    </div> */}



    <TextInput handleChange={handleChange} 
	       label="" 
	       placeholder="e.g.112101" 
	       name="courseGlobalCode"
	       className={classes.searchField}
	       />


    <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Add to Dashboard </b> </button>
    </div>




     <i className={classes.infoText_i}>
	Showing  
           <button type="button" className={classes.navButton} onClick={prevCoursePageHandler}>
                   <BsChevronDoubleLeft/>
           </button>
                <span className={classes.dateText}> {startCourseNum} to {endCourseNum} courses </span>
           <button type="button" className={classes.navButton} onClick={nextCoursePageHandler}>
                       <BsChevronDoubleRight/>
           </button>

	    of { searchedCourses !==null ? searchedCourses.count : "N/A"}.	   
    </i>








    {showSearchedCourses && searchedCourses !== null && searchedCourses.results && searchedCourses.results.length > 0 && (  
                <div className={classes.liveCoursesGridContainer}>
                    {searchedCourses.results.map((course, index) => (
                        <OneCourseCardSagar
                            key={index}
                            Course={course}
                            rerender={props.rerender}
                            userData={props.userData}   
                            picture={course.card_cover_image}
                            courseTitle={course.courseShortName}
                        />
                    ))}
                </div>
            )}
   {/*
     courseData.length===0 &&
        <div className={classes.noCourseExist}> <h2> No courses exist with this code</h2></div>
   */}
    {showSearchedCourses && searchedCourses !== null && searchedCourses.results && searchedCourses.results.length === 0 && (
            <div className={classes.noResults}>No courses found.</div>
        )}

        {!showSearchedCourses && (
            <div className={classes.emptyDiv}>
                {/* Content to display when no search is performed */}
            </div>
        )}
  </form>

   }


</div>	
);

}


export default CreateCourseForm;
