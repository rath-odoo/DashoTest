import classes from './ClassesContainer.module.css';
import React, { useEffect, useState } from 'react';
import ClassViewShort from './ClassViewShort_allview';
import ClassDetailView from './ClassDetailView';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getalluserclasses } from '../../../../../../CommonApps/AllAPICalls';
import { BsChevronDown, BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
import { BiChevronsRight, BiChevronsLeft } from 'react-icons/bi';




const CalcStartEndValues = (totalClasses, totalPages, currentPageLength, pageNo) => {
   let x = 0;//general no of items in one page
   let y = 0;//last page content
   let startValue = 0;
   let endValue = 0;

   if (pageNo < totalPages) {

      startValue = (pageNo - 1) * currentPageLength + 1;
      endValue = startValue + currentPageLength - 1;

   }

   if (pageNo === totalPages) {

      startValue = totalClasses - currentPageLength + 1;
      endValue = totalClasses;

   }

   return { startValue, endValue };

}



const ClassesContainer = (props) => {

   const history = useHistory();

   const [classId, setClassId] = useState(null);

   //const [classURL, setClassURL] = useState(null);

   const [classPath, setClassPath] = useState(null);

   const [pageNo, setPageNo] = useState(1);



   const goToClassHandler = ({ classId }) => {
      setClassId(classId);
      setClassPath(`/classes/${classId}`);
      history.push(`/classes/${classId}`);
   }

   useEffect(() => {

      let classURL = window.location.href;
      let pattern = '/classes/[1-9]+';
      let result = classURL.match(pattern);

      if (result) {
         let urlarray = classURL.split("/");
         let class_Id = urlarray[urlarray.length - 1];
         setClassId(class_Id);
         //setClassPath(result+"/");
         setClassPath("/classes/" + class_Id + "/");
      }

   }, [classPath]);


   const [userClasses, getUserClasses] = useState(null);

   useEffect(() => {

      getalluserclasses({ getUserClasses, pageNo });

   }, [pageNo, props.rerender]);



   const nextPageHandler = () => {

      if (userClasses !== null && userClasses.next !== null) {
         setPageNo(pageNo => pageNo + 1);
      }
   }


   const prevPageHandler = () => {

      if (userClasses !== null && userClasses.previous !== null) {
         setPageNo(pageNo => pageNo - 1);
      }

   }

   console.log("userClasses All View: ", userClasses);

   let currentPageLength = userClasses !== null && userClasses.results !== null && userClasses.results.length;
   let totalClasses = userClasses !== null && userClasses.count;
   let totalPages = userClasses !== null && userClasses.total_pages;
   let { startValue, endValue } = CalcStartEndValues(totalClasses, totalPages, currentPageLength, pageNo);



   return (


      <div className={classes.parentContainer}>



         <Route exact path='/classes'>

            <div className={classes.timeLine}>
               Showing {startValue} to {endValue} Classes of
               <i className={classes.infoText_i}>
                  <button type="button" className={classes.navButton} onClick={prevPageHandler}> <BsChevronDoubleLeft /> </button>
                  <span className={classes.dateText}> total  {userClasses !== null && userClasses.count} </span>
                  <button type="button" className={classes.navButton} onClick={nextPageHandler}> <BsChevronDoubleRight /></button>
               </i>
            </div>


            {userClasses !== null && userClasses.results.map((oneClass, index) => {
               return <ClassViewShort key={index}
                  oneClass={oneClass}
                  userData={props.userData}
                  rerender={props.rerender}
                  classDetailHandler={goToClassHandler}
               />


            })

            }
         </Route>

         <Route exact path={classPath} >

            <ClassDetailView userData={props.userData}
               passOneClassMountInfo={props.passOneClassMountInfo}
               classId={classId}
            />
         </Route>


      </div>

   );




}

export default ClassesContainer;
