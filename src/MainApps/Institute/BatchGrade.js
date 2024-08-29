import React, { useState, useEffect } from 'react';
import { BsArrowLeftRight, BsChevronDoubleLeft, BsChevronDoubleRight, BsCheck } from 'react-icons/bs';
import classes from './BatchGrade.module.css';
import { fetchExams, fetchStudentGrades, fetchStudentGrades2, fetchStudentsData, submitGrades } from '../../CommonApps/AllAPICalls'; 
import axios from 'axios';
import GradesComponent from './StudentGrade';

const BatchGrade = (props) => {
  const [activeTab, setActiveTab] = useState('view');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedExam, setSelectedExam] = useState('');
  const [showGrades, setShowGrades] = useState(true);
  const [showMarks, setShowMarks] = useState(true);
  const [studentsData, setStudentsData] = useState([]);
  const [subExams, setSubExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [gradesInput, setGradesInput] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  const [startSubExamIndex, setStartSubExamIndex] = useState(0);
  const [endSubExamIndex, setEndSubExamIndex] = useState(3);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const gradesData = await fetchStudentGrades2(props.userData.id, props.batchDetails.id);
        setData(gradesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchGrades();
  }, [props]);

  useEffect(() => {
    if (!selectedExam) return;

    setIsLoading(true);
    fetchStudentsData(props.batchDetails.id, selectedExam, currentPage + 1)
      .then(data => {
        const results = data.results;
        setStudentsData(results);
        const allSubExams = results.flatMap(student => student.grades.map(grade => grade.sub_exam));
        setSubExams(Array.from(new Set(allSubExams.map(subExam => subExam.id))).map(id => allSubExams.find(subExam => subExam.id === id)));

        const initialGradesInput = {};
        results.forEach(student => {
          initialGradesInput[student.student.id] = {};
          student.grades.forEach(grade => {
            initialGradesInput[student.student.id][grade.sub_exam.id] = {
              grade: grade.grade?.grade_value ?? '',
              marks_obtained: grade.grade?.marks_obtained ?? ''
            };
          });
        });
        setGradesInput(initialGradesInput);
        // setTotalPages(Math.ceil(data.count / 10));
      })
      .catch(error => {
        console.error('Error fetching students data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedExam, currentPage, props.batchDetails.id , props]);

  useEffect(() => {
    fetchExams(props.selectedInstitute.id, props.batchDetails.id)
      .then(data => {
        setExams(data.results);
      })
      .catch(error => {
        console.error('Error fetching exams:', error);
      });
  }, [props.selectedInstitute.id, props.batchDetails.id , props]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleStudentClick = (studentId) => {
    setShowDetailView(true);
    setSelectedStudent(studentId);
  };

  const handleBack = () => {
    setShowDetailView(false);
  };

  const nextSubExamWindow = () => {
    setStartSubExamIndex(prevStartIndex => {
      const newStartIndex = Math.min(prevStartIndex + 5, subExams.length - 5);
      setEndSubExamIndex(newStartIndex + 4);
      return newStartIndex;
    });
  };

  const prevSubExamWindow = () => {
    setEndSubExamIndex(prevEndIndex => {
      const newEndIndex = Math.max(prevEndIndex - 5, 4);
      setStartSubExamIndex(newEndIndex - 4);
      return newEndIndex;
    });
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const toggleGrades = () => {
    if (showGrades && !showMarks) return;
    setShowGrades(!showGrades);
  };

  const toggleMarks = () => {
    if (!showGrades && showMarks) return;
    setShowMarks(!showMarks);
  };

  const handleInputChange = (studentId, subExamId, field, value) => {
    setGradesInput(prevState => ({
      ...prevState,
      [studentId]: {
        ...prevState[studentId],
        [subExamId]: {
          ...prevState[studentId]?.[subExamId],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = () => {
    const gradesToSubmit = [];
    for (const studentId in gradesInput) {
      for (const subExamId in gradesInput[studentId]) {
        const input = gradesInput[studentId][subExamId];
        const existingGrade = input.grade;
        const existingMarks = input.marks_obtained;

        if (existingGrade || existingMarks) {
          const studentData = studentsData.find(student => student.student.id === parseInt(studentId));
          const subExamData = studentData.grades.find(grade => grade.sub_exam.id === parseInt(subExamId));
          const course_id = subExamData.sub_exam.courses[0].id;

          gradesToSubmit.push({
            course_id: course_id,
            batch_id: props.batchDetails.id,
            exam_id: selectedExam,
            sub_exam_id: subExamId,
            student_id: studentId,
            grade: existingGrade || null,
            marks_obtained: existingMarks || null
          });
        }
      }
    }

    submitGrades(props.userData.id, gradesToSubmit , props)
      .then(() => {
        alert('Grades submitted successfully');
      })
      .catch(error => {
        console.error('Error submitting grades:', error);
      });
  };

  const toggleTab = () => {
    setActiveTab(prevTab => (prevTab === 'view' ? 'add' : 'view'));
  };

  console.log("subExams", subExams);

  if (showDetailView && selectedStudent) {
    return (
      <GradesComponent
        studentId={selectedStudent}
        batchId={props.batchDetails.id}
        onBack={handleBack}
      />
    );
  }

  const examsMap = new Map();
  data.forEach(studentData => {
    studentData.grades.forEach(gradeData => {
      const exam = gradeData.exam;
      if (!examsMap.has(exam.id)) {
        examsMap.set(exam.id, {
          examName: exam.name,
          examDetails: exam,
          subExams: new Map()
        });
      }
      const examEntry = examsMap.get(exam.id);
      if (!examEntry.subExams.has(gradeData.sub_exam.id)) {
        examEntry.subExams.set(gradeData.sub_exam.id, {
          subExamName: gradeData.sub_exam.name,
          subExamDetails: gradeData.sub_exam,
          grades: []
        });
      }
      examEntry.subExams.get(gradeData.sub_exam.id).grades.push(gradeData);
    });
  });

  console.log("props", props);

  return (
    <div className={classes.OuterMainDiv}>



      {!props.isAdminOrOwner && ( 

      <div className={classes.divll}>
      <div className={classes.gradestablecontainer}>
            {Array.from(examsMap.values()).map(examEntry => (
                <div key={examEntry.examDetails.id} className={classes.examSection}>
                    <h2 className={classes.examLabel}>{examEntry.examName}</h2>
                    {Array.from(examEntry.subExams.values()).map(subExamEntry => (
                        <div key={subExamEntry.subExamDetails.id} className={classes.subExamSection}>
                            <h3 className={classes.subExamLabel}>{subExamEntry.subExamName}</h3>
                            <table className={classes.gradesTable}>
                                <thead>
                                    <tr>
                                        <th>Difficulty Level</th>
                                        {/* <th>Platform</th> */}
                                        {/* <th>Start Date</th> */}
                                        {/* <th>Start Time</th> */}
                                        <th>Grade</th>
                                        <th>Marks Obtained</th>
                                    </tr>
                                </thead>
                                <tbody className={classes.tbody}>
                                    {subExamEntry.grades.map((gradeData, index) => (
                                        <tr key={index}>
                                            <td>{gradeData.exam.difficultylevel}</td>
                                            {/* <td>{gradeData.exam.platform}</td> */}
                                            {/* <td>{gradeData.exam.start_date}</td> */}
                                            {/* <td>{gradeData.exam.start_time}</td> */}
                                            <td>{gradeData.grade ? gradeData.grade.grade_value : 'N/A'}</td>
                                            <td>{gradeData.marks_obtained !== null ? gradeData.marks_obtained : 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            ))}
        </div>
      </div>
      )}


{props.isAdminOrOwner && ( 
      <div className={classes.outerDiv}>
        <div className={classes.gradesContainer}>
          <div className={classes.divOuter}>
            <div className={classes.dropdownContainer}>
              <select
                id="examSelect"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className={classes.selectl}
              >
                <option value="">Select an exam</option>
                {exams.map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={classes.tabContainer}>
              <button
                className={`${classes.tabButton} ${classes.tabButtonHeight}`}
                onClick={toggleTab}
              >
                {activeTab === 'view' ? 'Add Grades' : 'View Grades'} <BsArrowLeftRight />
              </button>
            </div>
          </div>

          

          {selectedExam && (
            <>
              <div className={classes.toggleButtons}>
                <button className={classes.btn} onClick={toggleGrades}>
                  {showGrades ? 'Hide Grades' : 'Show Grades'} {showGrades && <BsCheck className={classes.svg} />}
                </button>
                <button className={classes.btn2} onClick={toggleMarks}>
                  {showMarks ? 'Hide Marks' : 'Show Marks'} {showMarks && <BsCheck className={classes.svg} />}
                </button>
              </div>

              <div className={classes.tableContainer}>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                     

                    <table className={classes.table}>
                      <thead>
                        <tr>
                          <th className={`${classes.th} ${classes.studentName}`}>Student Name</th>
                          {subExams.slice(startSubExamIndex, endSubExamIndex + 1).map(subExam => (
                            <React.Fragment key={subExam.id}>
                              <th className={classes.th} colSpan={showGrades && showMarks ? "2" : showGrades ? "1" : showMarks ? "1" : "0"}>
                                {/* {subExam.courses[0].courseShortName} */}
                                {subExam.name}
                              </th>
                            </React.Fragment>
                          ))}
                        </tr>
                        <tr>
                          <th className={`${classes.th} ${classes.studentName}`}></th>
                          {subExams.slice(startSubExamIndex, endSubExamIndex + 1).map(subExam => (
                            <React.Fragment key={subExam.id}>
                              {showGrades && <th className={classes.th}>Grade</th>}
                              {showMarks && <th className={classes.th}>Marks</th>}
                            </React.Fragment>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {studentsData.map(student => (
                          <React.Fragment key={student.student.id}>
                         <tr key={student.student.id} >
  <td className={classes.td} onClick={() => handleStudentClick(student.student.id)}>{student.student.firstname} {student.student.lastname}</td>
  {subExams.slice(startSubExamIndex, endSubExamIndex + 1).map(subExam => {
    const grade = student.grades.find(grade => grade.sub_exam.id === subExam.id)?.grade || {};
    const gradeValue = grade.grade_value ?? '';
    const marksObtained = grade.marks_obtained ?? '';

    return (
      <React.Fragment key={subExam.id}>
       {showGrades && (
  <td className={classes.td2}>
    {activeTab === 'add' ? (
      <input
        type="text"
        value={gradesInput[student.student.id]?.[subExam.id]?.grade ?? ''}
        onChange={(e) => {
          const value = e.target.value; 
          if (/^[a-zA-Z+-]{0,4}$/.test(value)) {
            handleInputChange(student.student.id, subExam.id, 'grade', value);
          }
        }}
        placeholder=""
        className={classes.inputField}
        pattern="[A-Za-z+-]{3,4}" 
        title="Only letters, +, and - are allowed, and it must be 3 to 4 characters long"
      />
    ) : (
      <span>{gradeValue || 'N/A'}</span>
    )}
  </td>
)}

{showMarks && (
  <td className={classes.td2}>
    {activeTab === 'add' ? (
      <input
        type="number"
        value={gradesInput[student.student.id]?.[subExam.id]?.marks_obtained ?? ''}
        onChange={(e) => handleInputChange(student.student.id, subExam.id, 'marks_obtained', e.target.value)}
        placeholder=""
        className={`${classes.inputField} ${classes.noSpinner}`}  
      />
    ) : (
      <span>{marksObtained || 'N/A'}</span>
    )}
  </td>
)}

      </React.Fragment>
    );
  })}
</tr>

                        </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>

             
            </>
          )}

          <div className={classes.outerDiv}> 

<div className={classes.pagination}>
                <button onClick={prevPage} disabled={currentPage === 0}>
                  <BsChevronDoubleLeft />
                </button>
                <span className={classes.pageIndicator}>
                  Page {currentPage + 1} of {totalPages} for students
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
                  <BsChevronDoubleRight />
                </button>
              </div>

          {activeTab === 'add' && selectedExam && (
            <div className={classes.submitButtonContainer}>
              <button onClick={handleSubmit} className={classes.submitButton}>
                Submit Grades
              </button>
            </div>
          )}

<div className={classes.subExamNavigation}>
                      <button onClick={prevSubExamWindow} disabled={startSubExamIndex === 0}>
                        <BsChevronDoubleLeft />
                      </button>
                      Courses
                      <button onClick={nextSubExamWindow} disabled={endSubExamIndex >= subExams.length - 1}>
                        <BsChevronDoubleRight />
                      </button>
                    </div>
                    </div>
        </div>
      </div>

      )}
{/* 
      { showDetailView  && 
        <StudentGrades
        studentId={selectedStudent}
        batchId={props.batchDetails.id}
        onBack={handleBack}

        />

      } */}
    </div>
  );
};

export default BatchGrade;
