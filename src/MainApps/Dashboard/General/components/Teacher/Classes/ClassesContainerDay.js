import classes from './ClassesContainer.module.css';
import React, { useEffect, useState } from 'react';
import ClassViewShort from './ClassViewShort_day';
import ClassDetailView from './ClassDetailView';
import { Route, Switch, useHistory } from 'react-router-dom';
import { BsChevronDown, BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';


import { getdayclasses } from '../../../../../../CommonApps/AllAPICalls';



const formatLocalTime = ({ datetime }) => {

  //const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);	 


  let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utcDate = new Date(datetime);
  const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));
  const formattedDate = localDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return `${formattedTime}`;
};





const ClassesContainer = (props) => {


  const history = useHistory();
  const [classId, setClassId] = useState(null);
  //const [classURL, setClassURL] = useState(null);
  const [classPath, setClassPath] = useState(null);
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
      setClassPath("/classes/" + class_Id + "/");
    }

  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  //console.log("current Date in India: ", currentDate);

  // Function to calculate and set the next date

  // Format the current date as "YYYY-MM-DD"
  const formattedDate = currentDate.toISOString().split('T')[0];


  const formattedDisplayDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  const [userDayClasses, getUserDayClasses] = useState(null);

  //const [date, setDate] = useState(formattedDate);	

  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {

    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    getdayclasses({ getUserDayClasses, formattedDate, timezone, pageNo });

  }, [pageNo, formattedDate, props.rerender]);
  //props.rerender


  const nextDayHandler = () => {
    //console.log("next date handelr");
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  }

  const prevDayHandler = () => {

    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);



  }


  ///console.log("classPath: ", classPath);
  //console.log("classId: ", classId);

  console.log("userDayClasses: ", userDayClasses);


  // console.log("class path::::::::::::::::::::::::::::::", classPath);	


  return (


    <div className={classes.parentContainer}>


      <Route exact path='/classes'>


        <div className={classes.timeLine}>
          Showing {userDayClasses !== null && userDayClasses.count} Classes on
          <i className={classes.infoText_i}>
            <button type="button" className={classes.navButton} onClick={prevDayHandler}>
              <BsChevronDoubleLeft />
            </button>
            <span className={classes.dateText}> {formattedDisplayDate} </span>
            <button type="button" className={classes.navButton} onClick={nextDayHandler}>
              <BsChevronDoubleRight />
            </button>
          </i>

          <span className={classes.classTimeLine}>

            {userDayClasses !== null && userDayClasses.results.map((oneClass, index) => {

              let datetime = oneClass.datetime;


              return <span className={classes.oneClassBall} key={index}>

                <span className={classes.oneClassExactTime} key={index}> {formatLocalTime({ datetime })} </span>
              </span>

            })

            }

          </span>
        </div>




        {userDayClasses !== null && userDayClasses.results.map((oneClass, index) => {

          return <ClassViewShort key={index}
            oneClass={oneClass}
            userData={props.userData}
            rerender={props.rerender}
            classDetailHandler={goToClassHandler}
          />

        })

        }
      </Route>

      <Route exact path={classPath}>
        <ClassDetailView userData={props.userData}
          passOneClassMountInfo={props.passOneClassMountInfo}
          classId={classId}
        />
      </Route>


    </div>

  );



}

export default ClassesContainer;
