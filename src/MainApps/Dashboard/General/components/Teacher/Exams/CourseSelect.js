import { useState } from "react"
import React from 'react'

import Switch from "react-switch";

// import {  
// 	  OptionFieldCourses,
// 	  } from '/home/tushar/Desktop/new forked- march 3/WebAppFrontEnd-DiracAI/src/CommonApps/FormInputObjects.js';


    import {  OptionField,
      OptionFieldCourses,
      ParagraphField,
      DateField,
      TimeField,DayField, CustomTimePicker, TextInput } from '../../../../../../CommonApps/FormInputObjects';




export const CourseSelect = (props) => {


    let allCourses = props.userData.dashboard_courses;
    const searchId = props.userData.id;

    // console.log("props.userData.dashboard_courses:", props.userData.dashboard_courses);

   

//     let allCourses = props.userData && props.userData.dashboard_courses;
// const searchId = props.userData && props.userData.id;

    const result = allCourses.filter(obj =>
        Object.values(obj).some(value =>
          value &&
          (Array.isArray(value) ? value.some(item => item && item.id === searchId) : value.id === searchId)
        )
      );


    //   const result = allCourses ? allCourses.filter(obj =>
    //     Object.values(obj).some(value =>
    //       value &&
    //       (Array.isArray(value)
    //         ? value.some(item => item && item.id === searchId)
    //         : value.id === searchId)
    //     )
    //   ) : [];
    


    const initialFormDataSingleClass = Object.freeze({
        courseIdsyllabusId: null,
            serialNo: null,
            status: "scheduled",
            classdate: null,
        datetime: null, //"2022-12-03T03:15:00Z",
            classtime: "00:00:00",
            duration: null,
            meetingLink: "",
            address: "",
            topics: [],
        topicIds:[],
        about: null
            });

    const [formDataSingleClass, updateFormDataSingleClass] = useState(initialFormDataSingleClass);



const handleChangeSingleClass = (e) => {

	//console.log("name, value: ", e.target.name,"---",e.target.value);    
	   
       if(e.target.name !=="about"){
        updateFormDataSingleClass({
                        ...formDataSingleClass,
                        [e.target.name]: e.target.value.trim(),
                });
           }

        if(e.target.name==="about"){
            updateFormDataSingleClass({
                        ...formDataSingleClass,
                        [e.target.name]: e.target.value,
                });




	}



    }


    // let allCourses = props.userData.dashboard_courses;
    // const searchId = props.userData.id;

    // const result = allCourses.filter(obj =>
    //     Object.values(obj).some(value =>
    //       value &&
    //       (Array.isArray(value) ? value.some(item => item && item.id === searchId) : value.id === searchId)
    //     )
    //   );


  return (
    <div>
        <div className="firstFieldBlockLong">
            <OptionFieldCourses requirement="*" 
             label="Choose course" 
             name="courseIdsyllabusId"
             defaultValue="No Course"
             options={result}
             handleChange={handleChangeSingleClass}
             />	       
        </div>
    </div>
  )
}

export default CourseSelect;








