import React, { useState,useRef } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './ExamDetails.module.css';

import profilePhoto from './studentimg.jpeg';
import EditForm from './EditForm/EditForm';
import {
  BsActivity,
  BsFillBookFill,
  BsPersonVcardFill,
  BsPencilSquare,
  BsArrowLeft,
  BsPersonPlus,
  BsBook,
  BsClipboardCheck,
  BsFileText,
  BsSpeedometer2,
  BsChatSquareDots
} from "react-icons/bs";

import { MdLocationOn } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";


const ExamDetails = () => {
  // new code for the add student block 
  
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleAddStudent = (studentName) => {
      setShowAddForm(true);
      setSelectedStudents([...selectedStudents, studentName]);
    };
    const [showEditForm, setShowEditForm] = useState(false);
    const handleEditButtonClick = () => {
      setShowEditForm(true); // Show the edit form when the button is clicked
    };
    const handleCloseEditForm = () => {
      setShowEditForm(false); // Close the edit form
    };
    const profiles = [
      { name: 'John Doe', class: 'X' },
      { name: 'Jane Smith', class: 'XI' },
      { name: 'Jane Smith', class: 'XI' },
      { name: 'Jane Smith', class: 'XI' },
       
       
      
      
    ];

    const history = useHistory();

    const handleGoBackforViewDetails = () => {
      history.goBack(); 
    };


    const [showAddForm, setShowAddForm] = useState(false);
 
    const [searchQuery, setSearchQuery] = useState('');

 
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };

 

    const handleGoBack = () => {
      // history.goBack(); 
      setShowAddForm(false);
    };  



  // exam Management logic 
    const [examMaterials, setExamMaterials] = useState(null);
    const [chatEnabled, setChatEnabled] = useState(false);
    const fileInputRef = useRef(null); 
    const [monitoringTools, setMonitoringTools] = useState({
      liveProctoring: false,
      screenMonitoring: false,
      activityTracking: false
    });

    const handleExamMaterialsUpload = (event) => {
      const files = event.target.files;
      setExamMaterials(files);
    };

 
    const [examInstructions, setExamInstructions] = useState('Answer all questions in the given time. No extra sheets allowed.');
    const [gradingCriteria, setGradingCriteria] = useState('20% for correct answers, 10% for presentation, and 70% for understanding.');
     
  
    const handleEditExamInstructions = () => {
      const newInstructions = prompt('Enter new exam instructions:');
      if (newInstructions !== null) {
        setExamInstructions(newInstructions);
      }
    };
  
    const handleEditGradingCriteria = () => {
      const newCriteria = prompt('Enter new grading criteria:');
      if (newCriteria !== null) {
        setGradingCriteria(newCriteria);
      }
    };

    const handleChooseFileButtonClick = () => {
      fileInputRef.current.click();
    };


  



  return (
    <div className={classes.Container}> 
    <button  className={classes.goBack} onClick={handleGoBackforViewDetails}>
    <BsArrowLeft />
    <span className={classes.spanBack}>Back</span>
    </button>
     
    
    <div className={classes.MainContainer}>

    <div className={classes.examDetailsContainer}> 
      <div className={classes.examTitleContainer}>
      <div className={classes.semTwoText}> Semester II Final Exam</div> 
      <div className={classes.editbtnContainer}> 
      <button className={classes.editButton} onClick={handleEditButtonClick} type="button" >
            <BsPencilSquare className={classes.editbutton} />
            
            <div className=''>Edit</div>
          </button>
          </div>
        
      </div>
      
           <div className={classes.headerSection}>

        <div className={classes.classContainer}>
          
          <div className={classes.classIcon}>
            <BsFillBookFill />
          </div>
          <div className={classes.classTitle}>Couse Code :BIO-202</div>
        </div>



        <div className={classes.statusContainer}>
          <div className={classes.statusIcon}>
            <BsActivity />
          </div>
          <div className={classes.statusTitle}>Exam ID : </div>

          <div className={classes.statusName} style={{color:"green"}}>9422</div>
        </div>

        <div className={classes.courseContainer}>
          <div className={classes.courseIcon}>
            <BsPersonVcardFill />
          </div>
          <div className={classes.courseTitle}>Examiner: Dr. Jane Doe</div>
          
        </div>
      </div>

    

      <div className={classes.courseContainerTwo}>

            <div className={classes.timeContainer}> 
              <div className={classes.timeandAddressIcon}><MdLocationOn /></div>
              <div className={classes.timenAddressText}>Time and Platform</div>
            </div>
            <div className={classes.timeText}>March 7, 2024 at 1:01 AM , 15 mins
      </div>
      <div className={classes.timeTextTwo}>Platform: <span>online</span> </div>
       

           
         


        </div>

        <div className={classes.courseContainerThree}>
        <div className={classes.mainContainerTwo}>

        <div className={classes.timeandAddressIconForLink}><BsLink45Deg /></div>
          <div className={classes.meetingText}>Exam Link :</div>
          
           
          <button className={classes.copyLinkBtn} type="button" >
            <BsLink45Deg />
            <div className={classes.copyText}>Copy</div>
          </button>
        </div>
         

        </div>
        <div className={classes.linkForExam}>
        <a className={classes.a} href="http://localhost:3000/video/meet.93.1709615399697.70.36725833245481" target="_blank" rel="noopener noreferrer">
        http://localhost:3000/video/meet.93.1709615399697.70.36725833245481
      </a>
        </div>

      <div>
  
      </div>

    </div>
 
    </div>


    {/* Second Container  */}

    <div className={classes.secondContainer}> 
    <div className={classes.studentDetailsContainer}>

    <div className={classes.stdContainer}>
      
      
        <div className={classes.addStudentFirstDiv}> 
        <div className={classes.addStudentContainer}   >
          <BsPersonPlus /> 
        </div>
        <div className={classes.stdTxt}>Student List</div>
        <div className={classes.btnStdContainer}>
          <button className={classes.btnstudent} onClick={handleAddStudent}>Add Student </button>
          </div> 
         
        </div>
       
      
      {showAddForm && (
          <div className={classes.warningBlock}>
            {/* Your form for adding students */}
            <div className={classes.crossButtonContainer}>
                <button className={classes.btnCrossMark} onClick={handleGoBack}>
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="CreateClassForm_closeButtonIcon__23ZZp" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                </button>
            </div>
            <input className={classes.inputField} type="text" value={searchQuery} onChange={handleSearch} placeholder="Search students" />
          
            <div className={classes.studentList}>
            {profiles.map((profile, index) =>(
                <div key={index} className={classes.student}>
                  <div className={classes.stdImgContainer}>
                 <img src={profilePhoto} alt="Profile" className={classes.profilePhoto} />
                 </div>
                  <div className={classes.studentInfo}>


                    <div className={classes.studentInfoFirstDiv}>
                  
                     
                    <div className={classes.stdNameWarningBlock}>{profile.name}</div>


                    </div>

                    <div className={classes.studentInfoSecondDiv}>
                      <div className={classes.className}>Class:</div>
                      <div className={classes.classDiv}>
                      {profile.class}
                      </div>
                       
                    </div>

                  </div>

                  <div className={classes.btnAddStudentContainer}>
                    <button className={classes.btnAddStudentWb} >Add</button>
                  </div>
                </div>
              ))}
              
            </div>



            {/* NEW CODE FOR SELECTING STUDENTS */}
              
          </div>
        )}

      <div className={classes.studentList}>
        <div className={classes.stdTxtUi}>
          {/* chnaged block */}

        <div className={classes.studentListThree}>
            {profiles.map((profile, index) =>(
                <div key={index} className={classes.studentTwo}>
                  <div className={classes.stdImgContainer}>
                 <img src={profilePhoto} alt="Profile" className={classes.profilePhoto} />
                 </div>
                  <div className={classes.studentInfo}>


                    <div className={classes.studentInfoFirstDiv}>
                      <div className={classes.stdNameWarningBlock}>{profile.name}</div>
                    </div>

                    <div className={classes.studentInfoSecondDiv}>
                      <div className={classes.className}>Class:</div>
                      <div className={classes.classDiv}>{profile.class}</div>
                    </div>

                  </div>
                </div>
              ))}
              
            </div>
          
          
        </div>
      </div>   
    </div>





    <div className={classes.stdContainerTwo}>
    
      <div className={classes.firstDiv}>
        <div className={classes.instructionDiv}>
        <div className={classes.addStudentContainer}   >
          <BsBook /> 
        </div>
        <div className={classes.examInsrt}>Exam Instructions</div> 
        <div className={classes.editContainer}> 
         
        <button className={classes.btnEdit} onClick={handleEditExamInstructions}>
        <BsPencilSquare className={classes.editbutton} />
          Edit</button>
        </div>
        </div>
        <p className={classes.instructionPara}>{examInstructions}</p>
         
      </div>
      <div className={classes.secondDiv}>
        <div className={classes.gradingDiv}> 
        <div className={classes.addStudentContainer}   >
          <BsClipboardCheck /> 
        </div>
        <div className={classes.gradingTxt}>Grading Criteria</div>
        <div className={classes.editContainer}> 
        <button className={classes.btnEdit} onClick={handleEditGradingCriteria}>
        <BsPencilSquare className={classes.editbutton} />Edit</button>
        </div>
        </div>
        <p className={classes.gradingPara}>{gradingCriteria}</p>
         
      </div>
      <div className={classes.thirdDiv}>
        <div className={classes.uploadFile}> 
        <div className={classes.addStudentContainer}   >
          <BsFileText /> 
        </div>
        <div className={classes.examMaterial}>Exam Materials:</div>

        <div className={classes.fileInputContainer}>
          <input
            ref={fileInputRef}
            className={classes.chooseFileInput}
            type="file"
            onChange={handleExamMaterialsUpload}
            style={{ display: 'none' }} 
          />
          <button
            className={classes.chooseFileButton}
            onClick={handleChooseFileButtonClick}
          >
            Choose File
          </button>
        </div>
        </div>

      
        {examMaterials && examMaterials.length > 0 && (
          <ul>
            {Array.from(examMaterials).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={classes.headerSectionTwo}> 
      <div className={classes.fourthDiv}>
      <div className={classes.addStudentContainer}   >
          <BsSpeedometer2  /> 
        </div>
        <div className={classes.monitoringTools}>Monitoring:</div>
        <div className={classes.labelsFourthDiv}> 
        <label className={classes.liveProctoring}>
          <input type="checkbox" checked={monitoringTools.liveProctoring} onChange={() => setMonitoringTools({ ...monitoringTools, liveProctoring: !monitoringTools.liveProctoring })} />
          Live Proctoring
        </label>
        <label className={classes.screenMonitoring}>
          <input type="checkbox" checked={monitoringTools.screenMonitoring} onChange={() => setMonitoringTools({ ...monitoringTools, screenMonitoring: !monitoringTools.screenMonitoring })} />
          Screen Monitoring
        </label>
        {/* <label className={classes.activityTracking}>
          <input type="checkbox" checked={monitoringTools.activityTracking} onChange={() => setMonitoringTools({ ...monitoringTools, activityTracking: !monitoringTools.activityTracking })} />
          Activity Tracking
        </label> */}
        </div>
      </div>
      <div className={classes.fifthDiv}>
          <div className={classes.addStudentContainer}   >
          <BsChatSquareDots /> 
        </div>
        <div className={classes.communicationTools}>Communication Tools:</div>
        <label  className={classes.chatEnabled}>
          <input type="checkbox" checked={chatEnabled} onChange={() => setChatEnabled(!chatEnabled)} />
          Enable Chat
        </label>
      </div>
      </div>
   
    
    </div>

    </div>
    </div>
    {showEditForm && <EditForm onClose={handleCloseEditForm} />}
  </div>
  );
};

export default ExamDetails;
