import React, { useState, useEffect } from "react";
import classes from './TeacherView.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import { fetchEnrolledStudents } from "../../CommonApps/AllAPICalls";

function TeacherView(props) {
  const [studentRemarks, setStudentRemarks] = useState([
    { slNo: 1, studentId: "S001", name: "Jaya Kishori", assignment: "Assignment 1", grade: "", remarks: "", viewed: false, isSaved: false },
    { slNo: 2, studentId: "S002", name: "Smita Rath", assignment: "Assignment 2", grade: "", remarks: "", viewed: false, isSaved: false },
    { slNo: 3, studentId: "S003", name: "Alina Patrick", assignment: "Assignment 3", grade: "", remarks: "", viewed: false, isSaved: false },
    { slNo: 4, studentId: "S004", name: "Bobby Singh", assignment: "Assignment 4", grade: "", remarks: "", viewed: false, isSaved: false },
  ]);
  

  const location = useLocation();
  const { assignment } = location.state;
  console.log("props from details Assignment", assignment);
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    const savedRemarks = localStorage.getItem('studentRemarks');
    if (savedRemarks) {
      setStudentRemarks(JSON.parse(savedRemarks));
    }
  }, []);

  const handleGradeChange = (index, value) => {
    const updatedRemarks = [...studentRemarks];
    updatedRemarks[index].grade = value;
    updatedRemarks[index].isSaved = false;
    setStudentRemarks(updatedRemarks);
    setIsSubmitted(false);
  };

  const handleRemarksChange = (index, value) => {
    const updatedRemarks = [...studentRemarks];
    updatedRemarks[index].remarks = value;
    updatedRemarks[index].isSaved = false;
    setStudentRemarks(updatedRemarks);
    setIsSubmitted(false);
  };

  const handleSave = (index) => {
    const updatedRemarks = [...studentRemarks];
    updatedRemarks[index].isSaved = true;
    setStudentRemarks(updatedRemarks);
    localStorage.setItem('studentRemarks', JSON.stringify(updatedRemarks));
    console.log("Grades and remarks saved for student:", updatedRemarks[index]);
  };

  const handleSubmit = () => {
    const allSaved = studentRemarks.every(student => student.isSaved && student.grade !== "" && student.remarks !== "");
    if (allSaved) {
      console.log("Grades and remarks submitted:", studentRemarks);
      localStorage.removeItem('studentRemarks');
      setIsSubmitted(true);
    } else {
      alert("Please Fill Grades and Remarks .");
    }
  };

  const handleView = (index) => {
    const updatedRemarks = [...studentRemarks];
    updatedRemarks[index].viewed = true;
    setStudentRemarks(updatedRemarks);
  };

  const history = useHistory();
  const goBackHandler = () => {
    history.push({
      pathname: "/course/assignments",
    });
  };

 

 

  const [enrolledStudents, setEnrolledStudents] = useState([]);

 
  useEffect(() => { 
      const courseId = props.selectedCourse[0].id;
      fetchEnrolledStudents(courseId)
        .then(data => {
          if (data.results && data.results.members) {
            setEnrolledStudents(data.results.members);
          }
        })
        .catch(error => {
          console.error('Error fetching enrolled students:', error);
        });
    
  }, [props ]);
 
  return (

    <div className={classes.outerDiv}> 
    <div className={classes.remarkspage}>
<div className={classes.goBack}> 
<button className={classes.gobackBtn} onClick={goBackHandler}><BsArrowLeft /></button>
</div>
      <div className={classes.header}>
        <h1>Assignment Number: {assignment.id}</h1>
      </div>

      <div className={classes.remarkscontainer}>
        <div className={classes.remarksheader}>
          {/* <div className={classes.slNo}>Sl. No.</div> */}
          <div className={classes.studentId}>Student ID</div>
          <div className={classes.name}>Name</div>
          <div className={classes.assignment}>Assignment</div>
          <div className={classes.grade}>Grade</div>
          <div className={classes.remarks}>Remarks</div>
          <div className={classes.actions}>Actions</div>
        </div>

        {studentRemarks.map((student, index) => (
          <div key={index} className={classes.remarksrow}>
            {/* <div className={classes.slNo}>{student.slNo}</div> */}
            <div className={classes.studentId}>{student.studentId}</div>
            <div className={classes.name}>{student.name}</div>
            <div className={classes.assignment}>
              <button 
              className={classes.button}
                onClick={() => handleView(index)} 
                disabled={student.viewed}>
                {student.viewed ? "Viewed" : "View"}
              </button>
            </div>
            <div className={classes.grade}>
              <input
              className={classes.input}
                type="text"
                value={student.grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
              />
            </div>
            <div className={classes.remarks}>
              <input
              className={classes.input}
                type="text"
                value={student.remarks}
                onChange={(e) => handleRemarksChange(index, e.target.value)}
              />
            </div>
            <div className={classes.actions}>
              <button onClick={() => handleSave(index)} className={classes.saveButton}>
                {student.isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.buttons}>
        <button onClick={handleSubmit} className={classes.submitButton}>
          {isSubmitted ? "Submitted" : "Submit Grades and Remarks"}
        </button>
      </div>
    </div>




    <div className={classes.StudentListPage}>
      <div className={classes.Header}>
        <h1>Assignment Results</h1>
        {/* <p>Assignment Number: {assignment.id}</p> */}
      </div>
      <table className={classes.StudentTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Remarks</th>
            {/* <th>Credit Score</th> */}
          </tr>
        </thead>
        <tbody>
           {enrolledStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.id}</td>
              <td> {student.firstname} {student.lastname}</td>
              <td>{student.grade}</td>
              <td>{student.remarks}</td>
              {/* <td>{student.credit}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
}

export default TeacherView;