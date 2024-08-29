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

// import OneCourseCardSagar from './OneCourseCardSagar';

// import EnrollForm from './EnrollForm';


import { TextInput } from "../../../../Dashboard/General/components/Student/Forms/FormInputObjects";
import { publiccoursesearch } from "../../../../../CommonApps/AllAPICalls";

// import OneCourseCardSagar from "../../../../Dashboard/General/components/Student/Forms/OneCourseCardSagar";
import OneCourseCardSagar from "./OneCourseCardSagar";


/*const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
*/



const CreateCourseForm=(props)=>{


   const [searchedCourses, getSearchedCourses] = useState(null);

//    const [searchString, setSearchString] =  useState(props.courseGlobalCode.courseGlobalCode || '');

   const [searchString, setSearchString] =  useState('');

   const [pageNo , setPageNo] = useState(1);


   console.log("searchString yes: ", props);
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












return(

<div className={classes.createTicketFormDivParent}>

   {/*!showForm &&  
	   <div className={classes.createTicketFormLoading}>

	   <FadeLoader color={color} loading={loading} css={""} size={50}  />
	    
	   <div className={classes.submittingDiv}> Creating . . . </div>
           </div>
   */}




   { 	
  <form className={classes.createTicketForm} >

     {/*form close button below*/}	
    <div className={classes.closeButtonDiv}>
        <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
    </div>	

 
     {/*logo and field title container below*/}
    <div className={classes.logoAndTitleContainer}>
           <div className={classes.formTitleDiv}><i>  Public Live Course Repository </i></div>
    </div>


    <TextInput handleChange={handleChange} 
	       label="Find a course" 
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








    <div className={classes.liveCoursesGridContainer} style={gridContainerStyle}>


		   { searchedCourses !==null && searchedCourses.results.map((oneCourse, index)=>{

                          return <OneCourseCardSagar key={index}
			                                 Course={oneCourse}
                                                         rerender={props.rerender}
                                                         userData={props.userData}
                                                        //  courseGlobalCode={}
				                     />

                       })
                   }


    </div>

   {/*
     courseData.length===0 &&
        <div className={classes.noCourseExist}> <h2> No courses exist with this code</h2></div>
   */}



    <div className={classes.emptyDiv}>

    hello

      {/*courseData.map((course,index)=>{

              return <CourseSearchViewNew key={index} Course={course} userData={props.userData} onPress={props.onPress} />

           }

       )*/}
   		   

    </div>
  </form>

   }


</div>	
);

}


export default CreateCourseForm;
