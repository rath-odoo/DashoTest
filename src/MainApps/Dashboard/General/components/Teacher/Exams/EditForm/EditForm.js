import React,{useRef,useEffect, useState} from 'react';
import classes from './EditForm.module.css'
import TimePicker from '../TimePicker';
import { ImOpt } from 'react-icons/im';
import {BsPencilSquare} from 'react-icons/bs';
import Logo from '../../../../../../../CommonApps/Logo';

const EditForm = ({onClose }) => {

    const [link, setLink] = useState('');

    const handleEditLink = () => {
      const newLink = prompt('Enter the new link:');
      if (newLink !== null) {
        setLink(newLink);
      }
    };
  
    const [time, setTime] = useState({ hour: "", minute: "", ampm: "" });
    const handleCancelClick = () => {
        // Call the onClose function passed from props to close the EditForm
        onClose();
      };

      

const handleTimeChange = (newTime) => {
  setTime(newTime);
};


 


   const [showWarning, setShowWarning] = useState(false);
   const [borderColor, setBorderColor] = useState('#ffc107'); // Default border color
 
   const toggleWarning = () => {
     setShowWarning(!showWarning);
   };
 
    const changeBorderColor = (color) => {
     setBorderColor(color);
   };

  //  const [isHovered, setIsHovered] = useState(false);
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

    const [optionalSettings, showOptionalSettings] = useState(false);

    const [showSyllabusTopics, setShowSyllabusTopics] = useState(false);

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


      

  //  const handleMouseEnter = () => {
  //    setIsHovered(true);
  //  };

  // const [time, setTime] = useState({ hour: 1, minute: 0 });
  const [duration, setDuration] = useState(10);
  const [amPm, setAmPm] = useState('AM');
  const [date, setDate] = useState(new Date());
  const [course, setCourse] = useState('');
  const [role, setRole] = useState('Teacher');

//   const closeExamBlock = () => {
//     setShowWarning(false); // Set showWarning state to false to close the block
//   };

  // const handleTimeChange = (event) => {
  //   const { name, value } = event.target;
  //   setTime((prevTime) => ({ ...prevTime, [name]: parseInt(value) }));
  // };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);   //changed for hovering effect
  }; 

  const handleAmPmChange = (e) => {
    setAmPm(e.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };






  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields
    if (!time.hour || !time.minute || !duration || !date || !course) {
      alert('Please fill out all required fields.');
      return;
    }

    // Submit form data
    const formData = {
      time: `${time.hour}:${time.minute} ${time.hour < 12 ? 'AM' : 'PM'}`,
      duration: `${duration} min`,
      date: date.toISOString(),
      course: course,
    };
  };

 
  //  const handleMouseLeave = () => {
  //    setIsHovered(false);
  //  };

  const handleBlockClick = (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the document
  };

  const handleDocumentClick = () => {
    // Close the warning block only if it is currently open
    if (showWarning) {
      setShowWarning(false);
    }
  };

  useEffect(() => {
    // Add event listener to the document when the warning block is displayed
    if (showWarning) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showWarning]);

  

  return (
        <div className={classes.overlay} onClick={handleBlockClick}>
        <div className={classes.warningBlock} style={{ borderColor }}>
          
          
              <div className={classes.cancelBtn}>
                <button className={classes.btnCrossMark} onClick={handleCancelClick}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="CreateClassForm_closeButtonIcon__23ZZp" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                </button>
              </div>
              <div className={classes.logoDiracAI}>
                <Logo />
              </div>
              <div className={classes.createExam}>Edit Exam</div>
              <div className={classes.examTitleContainer}>
              <div className={classes.examinerExamTitle}><span className={classes.star}>*</span>Exam Title</div>
              <select className={classes.selectExaminerCourse} value={role} onChange={handleRoleChange}>
                <option value="sem1">Second Semester Culminating Assessment</option>
                <option value="sem2">End-of-Semester II Examination</option>
                <option value="sem2">Year-End Assessment Exam</option>
                <option value="sem2">Second Semester Concluding Evaluation</option>
              </select>
              </div>
              <div className={classes.examinerContainer}>
              <div className={classes.examiner}><span className={classes.star}>*</span>Examiner</div>
              <select className={classes.selectExaminerCourse} value={role} onChange={handleRoleChange}>
            <option value="Teacher">Teacher</option>
            <option value="Examiner">Examiner</option>
          </select>
          </div>  
               


              {/* <div className={classes.basicInfoContainer}> */}
              <form className={classes.formContainer} onSubmit={handleSubmit}>
                <div className={classes.mainTimeLocation}>
              <div className={classes.timeDiv}>
                <TimePicker time={time} setTime={handleTimeChange} width="200px" requirement={true} />
              </div>
              <div className={classes.platformContainer}>
                <label className={classes.txtHeadingPlatform} htmlFor="duration"><span className={classes.star}>*</span>Platform:</label>
                <select className={classes.selectExaminerPlatform} id="duration" name="duration" value={duration} onChange={handleDurationChange}>
                  <option value={10}>Online</option>
                  <option value={20}>Offline</option>
                </select>
              </div> </div>
              
              <div className={classes.durationDateContainer}>
              <div className={classes.durationDiv}>
                <label className={classes.txtHeading} htmlFor="duration"><span className={classes.star}>*</span>Duration:</label>
                <select className={classes.selectExaminer} id="duration" name="duration" value={duration} onChange={handleDurationChange}>
                  <option value={10}>10 min</option>
                  <option value={20}>20 min</option>
                  <option value={30}>30 min</option>
                </select>
              </div>
              <div className={classes.dateDiv}>
                <label className={classes.txtHeading} htmlFor="date"><span className={classes.star}>*</span>Date:</label>
                <input className={classes.selectExaminerOne} type="date" id="date" name="date" value={date.toISOString().slice(0, 10)} onChange={handleDateChange} />
              </div>
              </div>
              <div className={classes.courseDiv}>
                <label className={classes.txtHeadingCourse} htmlFor="course"><span className={classes.star}>*</span>Course:</label>
                <select className={classes.selectExaminerCourse} id="course" name="course" value={course} onChange={handleCourseChange}>
                  <option value="">Select a course...</option>
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                </select>
              </div>
              <div className={classes.examLinkContainer}>
              <label className={classes.examLinkTxt} htmlFor="course"><span className={classes.star}>*</span>Exam Link:</label>
              <div className={classes.editbtnContainer}> 
                 <button className={classes.editButton} onClick={handleEditLink}  type="button" >
                 <BsPencilSquare className={classes.editbutton} />
            
                    <div className=''>Edit</div>
                 </button>
                 </div>
                 <div className={classes.linkAddrs}>
                 {link ? (
                 <a className={classes.examLink} href="http://localhost:3000/video/meet.93.1709615399697" target="_blank" rel="noopener noreferrer">
        {/* http://localhost:3000/video/meet.93.1709615399697. */}
        {link}
      </a>
                   ) : (
                    <span className={classes.noLinkText}>No link provided</span>
                    )}
                 </div>

              </div>
              <button className={classes.btnCreateExam} type="submit">Create</button>
            </form>
              
              <div></div>
              <div></div>
            
        </div>
        </div>


  );
};

export default EditForm;
