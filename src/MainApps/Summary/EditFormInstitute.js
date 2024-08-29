import React, { useState, useEffect } from 'react';
import classes from './EditForm.module.css';
import Logo from '../../CommonApps/Logo';
import { TextInput, DateField, OptionField, OptionFieldSecondaryObjs, OptionFieldSubmitValue } from '../Dashboard/General/components/Teacher/Forms/FormInputObjects';
import axios from 'axios';
import { getclassobjectbyId, getclassrank, getsubjectsfromclassandboard, getuser, updateCourseDetails } from '../../CommonApps/AllAPICalls';
import { ParagraphField } from '../../CommonApps/FormInputObjects';

const EditForm = ({ onClose, selectedCourse ,rerender }) => {
 
  const [formData, setFormData] = useState({
    id: selectedCourse.id,
    courseShortName: selectedCourse.courseShortName || '',
    courseLocalCode: selectedCourse.courseLocalCode || '',
    courseStatus: selectedCourse.courseStatus || '',
    courseStartDate: selectedCourse.courseStartDate || '',
    courseEndDate: selectedCourse.courseEndDate || '',
    abouttheCourse: selectedCourse.abouttheCourse || '',
    // instituteName: selectedCourse.instituteName || '',
    coursecredit: selectedCourse.coursecredit || '',  
   
   
  });

  

const [data, setData] = useState({});
const [classId, setClassId]=useState(0);
const [classObject, setClassObject ] = useState({
    "id": 1,
    "name": "Class-11",
    "boardofeducation": []
});


const [classRank, setClassRank] = useState([{"id": 99999999,"name": "Unable to fetch ticket category"}]);
const [selectedBoardName, setSelectedBoardName] = useState("");
const [subjectsObject,setSubjectsObject] = useState([{name:null}]);
const [ createState, setCreateState] = useState("notCreating");


  useEffect(() =>{
      getclassobjectbyId({classId ,setClassObject});
  },[classId]);

  useEffect(() =>{
    getclassrank({setClassRank});
 },[])


  useEffect(()=>{
     getuser({setData});
  },[]);

 useEffect(()=>{
    
     let boardId=selectedBoardName;
     //console.log("classId:  ",classId);
     //console.log("boardname: ", boardId);	 
     getsubjectsfromclassandboard({classId,boardId,setSubjectsObject});
 },[classId, selectedBoardName]);


 const handleSubmit = (event) => {
  event.preventDefault();
  updateCourseDetails( selectedCourse.id , formData,onClose ,rerender);
};
console.log("formdata", formData);

  // Handler for input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
//   const handleChange1 = (e) => {
//     console.log('classname', e.target.value);
// setClassId(classId=>e.target.value);
 
//     };

    const handleChange1 = (e) => {
      //console.log('classname', e.target.value);
setClassId(classId=>e.target.value);
setFormData({
                      ...formData,
                      [e.target.name]: e.target.value.trim(),
              });
      };


    // const handleChange2 = (e) => {
    //   setSelectedBoardName(e.target.value);
     
    // }

    const handleChange2 = (e) => {
      setSelectedBoardName(e.target.value);
      setFormData({
                            ...formData,
                            [e.target.name]: e.target.value.trim(),
                    });
    
    }
    


    let statusOptions = [{"id":10, name:"ongoing"}, 
      {"id":15, name:"15 mins"}, 
           ]
 console.log("this is selected course ",selectedCourse.designedFor );


  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
 
        <form className={classes.formContainer} onSubmit={handleSubmit}>
        <div className={classes.cancelBtn}>
                <button className={classes.btnCrossMark} onClick={onClose}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateClassForm_closeButtonIcon__23ZZp" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                </button>
              </div>
          <div className={classes.logoDiracAI}>
            <Logo />
          </div>
          <div className={classes.createExam}>Edit Course</div>
         

          <div className={classes.divEdit}> 

          <div>
            <TextInput
            label="Name of the course"
            placeholder=""
            name="courseShortName"
            requirement="*"
            defaultValue={formData.courseShortName}
            handleChange={handleChange}
          />
          </div>
          
         
          {/* Class */}


          <div className={classes.divOne}> 
          <OptionField
            label="Class"
            name="classname"
            options={classRank}
            requirement="*"
            handleChange={handleChange1}   
          />
         
          <OptionFieldSecondaryObjs
            label="Board"
            name="educationboard"
            options={classObject.boardofeducation}
            requirement="*"
            handleChange={handleChange2}
          />
  
          <OptionFieldSubmitValue
            label="Subject"
            name="subject"
            options={subjectsObject}
            requirement="*"
            handleChange={handleChange}
          />
         </div>


          <div className={classes.DateDiv}> 
            <div className={classes.StartDate}> 
              <DateField  
               label="Start date" 
               name="courseStartDate" 
               placeholder="Enter course start date"   
               defaultValue={selectedCourse.courseStartDate}
               handleChange={handleChange}
              />
            </div>
          
             <div className={classes.endDate}> 
               <DateField  
               label="End date" 
               name="courseEndDate" 
               placeholder="Enter course end date"   
               defaultValue={selectedCourse.courseEndDate}
               handleChange={handleChange}
              />
          </div>

          </div>

<div className={classes.statusCourse}> 
<div className={classes.status}> 
<TextInput
                label="Status"
                placeholder=""
                name="courseStatus"
                requirement="*"
	        defaultValue={selectedCourse.courseStatus}
          handleChange={handleChange}
                />

{/* <OptionField requirement="*"
                                label = "Status"
                                name = "courseStatus"
                                defaultValue={selectedCourse.courseStatus}
                                options = {statusOptions}
                                handleChange = {handleChange}
                               
                                /> */}

</div>

<div className={classes.credit}> 

<TextInput
                label="Credit"
                placeholder=""
                name="coursecredit"
                requirement="*"
	        defaultValue={selectedCourse.coursecredit}
          handleChange={handleChange}
                />
                </div>

</div>


{/* <TextInput
                label="Name of the course"
                placeholder=""
                name="courseShortName"
                requirement="*"
	        defaultValue={selectedCourse.courseShortName}
          handleChange={handleChange}
                /> */}

<div> 

 


       <ParagraphField label="About the course" 
	               name="abouttheCourse"  
	               placeholder="Short description..."  
	               handleChange={handleChange}
                 defaultValue={selectedCourse.abouttheCourse}
		       />	
                </div>

<div> 
<TextInput
          label="Institute Code"
          placeholder=""
          name="courseLocalCode"
          requirement="*"
	        defaultValue={selectedCourse.courseLocalCode}
          handleChange={handleChange}
                />

</div>


{/* <div> 
  <TextInput
                label="Institute Name"
                placeholder=""
                name="instituteName"
                requirement="*"
	        defaultValue={selectedCourse.instituteName}
          handleChange={handleChange}
                />  

</div> */}

</div>


 

     
          <div className={classes.submitButtonDiv}>
            <button type="submit" className={classes.submit_button}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
