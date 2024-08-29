import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsArrowLeft, BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import {
  addGrade,
  deleteAssignmentFile,
  fetchAssignmentDetails,
  fetchStudentSubmissions,
  submitAssignment
} from '../../CommonApps/AllAPICalls';
import classes from './DetailsViewAssignment.module.css';

function DetailsViewAssignment(props) {
  const [answerFilesMeta, setAnswerFilesMeta] = useState([
    { name: '', description: '' },
  ]);
  const [answerFiles, setAnswerFiles] = useState([null]);
  const [showMetaFields, setShowMetaFields] = useState([false]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const [showWarningBlock, setShowWarningBlock] = useState(false);

  const handleGiveAnswerClick = () => {
    setShowWarningBlock(true);
  };


  const handleDeleteQuestionFile = async (fileId) => {
    setFileIdToDelete(fileId);
    setShowConfirmation(true);
  };
  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAssignmentFile(fileIdToDelete, props);
      console.log("Assignment file deleted successfully");
      props.rerender();
    } catch (error) {
      console.error("Error deleting assignment file:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
    }
  };
  console.log("hellloaosdasod", props);
  const cancelDelete = () => {
    setFileIdToDelete(null);
    setShowConfirmation(false);
  };

  const handleGiveAnswerClose = () => {
    setShowWarningBlock(false);
  };
  const handleMetaChange = (index, field, value) => {
    const newAnswerFilesMeta = [...answerFilesMeta];
    newAnswerFilesMeta[index][field] = value;
    setAnswerFilesMeta(newAnswerFilesMeta);
  };

  const handleFileChange = (index, file) => {
    const newAnswerFiles = [...answerFiles];
    newAnswerFiles[index] = file;
    setAnswerFiles(newAnswerFiles);
  };

  const handleAddMoreFiles = () => {
    setAnswerFilesMeta([...answerFilesMeta, { name: '', description: '' }]);
    setAnswerFiles([...answerFiles, null]);
    setShowMetaFields([...showMetaFields, false]);
  };


  const handleDeleteFile = (index) => {
    const newAnswerFilesMeta = answerFilesMeta.filter((_, i) => i !== index);
    const newAnswerFiles = answerFiles.filter((_, i) => i !== index);
    const newShowMetaFields = showMetaFields.filter((_, i) => i !== index);
    setAnswerFilesMeta(newAnswerFilesMeta);
    setAnswerFiles(newAnswerFiles);
    setShowMetaFields(newShowMetaFields);
  };

  const toggleMetaFields = (index) => {
    const newShowMetaFields = [...showMetaFields];
    newShowMetaFields[index] = !newShowMetaFields[index];
    setShowMetaFields(newShowMetaFields);
  };

  const handleSaveFiles = () => {
    setIsSaved(true);
    console.log('Files saved successfully!');
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (answerFiles.some((file) => !file)) {
      alert('Please provide all the required files.');
      return;
    }
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('answerFilesMeta', JSON.stringify(answerFilesMeta));
    answerFiles.forEach((file, index) => {
      formData.append('answerFiles', file);
    });

    try {
      const responseData = await submitAssignment(
        props.assignment.id,
        props.userData.id,
        formData,
        props
      );
      setIsSubmitting(true);


      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      setShowWarningBlock(false);
    } catch (error) {
      alert(`Error: please check the Assignment Deadline `);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleViewFile = (url) => {
    window.open(url, '_blank');
  };

  const history = useHistory();
  const goBackHandler = () => {
    history.push({
      pathname: '/course/assignments',
    });
  };

  // const handleDeleteQuestionFile = async (fileId) => {
  //   const response = await deleteAssignmentFile(fileId, props);
  //   if (response.success) { 
  //   } else {
  //     alert(response.message);
  //   }
  // };

  const filteredAnswerFiles = props.assignment.answerFiles.filter(
    (answerFile) => answerFile.uploader.id === props.userData.id
  );
  console.log("this are filteredAnswerFiles", filteredAnswerFiles);


  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const assignementId = props.assignment.id;
  const userId = props.userData.id;
  const courseId = props.selectedCourse[0].id;
  useEffect(() => {
    const fetchData = () => {
      fetchStudentSubmissions(assignementId, courseId, userId, currentPage)
        .then(data => {
          const { submissions } = data.results;
          setEnrolledStudents(prevStudents => [...prevStudents, ...submissions]);
        })
    };

    fetchData();
  }, [currentPage]);

  console.log("enrolledStudents", enrolledStudents);

  const loadMoreStudents = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [selectedStudentFiles, setSelectedStudentFiles] = useState([]);

  const [showGradeForm, setShowGradeForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [comments, setComments] = useState('');
  const [showGrade, setshowGrade] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);



  const handleOpenGrade = () => {
    setshowGrade(true);
  };
  const handleCloseGrade = () => {
    setshowGrade(false);
  };

  const handleAddGradeClick = (studentId) => {


    setSelectedStudentId(studentId);
    setShowGradeForm(true);
    console.log('stdId', studentId);
  };

  useEffect(() => {
    fetchAssignmentDetails(props.assignment.id)
      .then(data => {
        setAssignmentDetails(data);
      })
      .catch(error => {
        console.error('Error fetching assignment details:', error);
      });
  }, [props.assignment.id]);

  const handleGradeFormSubmit = () => {
    if (gradeValue.length > 4) {
      alert('Invalid Grade Value');
      return;
    }
    setIsSubmitted(true);
    const gradeData = {
      student: selectedStudentId,
      grade_value: gradeValue,
      comments,
    };
    addGrade(props.assignment.id, props.userData.id, gradeData, props)
      .then(() => {
        console.log('Grade added successfully');
        setShowGradeForm(false);
        setGradeValue('');
        setComments('');
        setSelectedFileId('');
        setSelectedQuestionId('');
      })
      .catch(error => {
        console.error('Error adding grade:', error);
        setIsSubmitted(false);
      });

  };

  const filterAnswerFiles = (studentId) => {
    if (!assignmentDetails || !assignmentDetails.answerFiles) return [];
    return assignmentDetails.answerFiles.filter(file => file.uploader === studentId);
  };

  const handleViewFiles = (student) => {
    setSelectedStudent(student);
    setShowPopup2(true);
  };

  const hableGrade = () => {
    // const files = filterAnswerFiles(studentId);
    // setSelectedStudentFiles(files);
    setShowPopup2(true);
  };


  const closePopup = () => {
    setShowPopup2(false);
    setSelectedStudentFiles([]);
  };

  console.log("assignmentDetails", assignmentDetails);

  console.log("props from the detail assignement page ", props);
  const getFileNameFromUrl = (url) => {
    const parts = url.split('/');
    const fileNameWithQuery = parts[parts.length - 1];
    const [fileName] = fileNameWithQuery.split('?');
    return fileName;
  };

  const getFileNameFromUrlForm = (url) => {
    const parts = url.split('/');
    const fileNameWithQuery = parts[parts.length - 1];
    const [fileName] = fileNameWithQuery.split('?');
    return fileName;
  };


  const getFileNameFromUrl3 = (url) => {
    const parts = url.split('/');
    const fileNameWithQuery = parts[parts.length - 1];
    const [fileName] = fileNameWithQuery.split('?');
    return fileName;
  };



  console.log("new props", props);
  console.log("enrolled", enrolledStudents);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.outerDiv}>
        <div className={classes.innerDiv}>
          <div className={classes.Assignmentpage}>
            <button className={classes.gobackBtn} onClick={props.onClose}>
              <BsArrowLeft />
            </button>
            <div className={classes.Tophead}>
              <header className={classes.Header}>
                <h3>Assignment ID: {props.assignment.id}</h3>
              </header>
              <h2>{props.assignment.title}</h2>
              <hr />
            </div>

            <div className={classes.InfoContainer}>
              <div className={classes.InstructorInfo}>
                <h3>Instructor Information</h3>
                <p className={classes.pTag}>
                  <strong>Instructor:</strong>{' '}
                  <span className={classes.InstructorName}>
                    {props.selectedCourse &&
                      props.selectedCourse.length > 0 &&
                      props.selectedCourse[0].teachers ? (
                      props.selectedCourse[0].teachers.map((teacher, index) => (
                        <div key={index}>
                          {teacher.firstname} {teacher.lastname},
                        </div>
                      ))
                    ) : (
                      <span>No instructors available</span>
                    )}
                  </span>
                </p>
              </div>
              <div className={classes.AssignmentInfo}>
                <h3>Assignment Information</h3>
                {props.assignment.questionFiles &&
                  props.assignment.questionFiles.length > 0 ? (
                  <>
                    <p className={classes.p}>
                      <strong>Assigned By:</strong>{' '}
                      <span className={classes.AssignedBy}>
                        {props.assignment.questionFiles[0].uploader
                          ? `${props.assignment.questionFiles[0].uploader.firstname} ${props.assignment.questionFiles[0].uploader.lastname}`
                          : 'Not available'}
                      </span>
                    </p>
                    <p className={classes.p}>
                      <strong>Date of Publish</strong>{' '}
                      <span className={classes.Date}>
                        : {props.assignment.publishDate}
                      </span>
                    </p>
                    <p className={classes.p}>
                      <strong>Due Date</strong>{' '}
                      <span className={classes.Date1}>
                        : {props.assignment.dueDate}
                      </span>
                    </p>
                  </>
                ) : (
                  <p>Assignment information not available</p>
                )}
              </div>
            </div>

            <div className={classes.score}>
              <strong>Credit:</strong>{' '}
              <span className={classes.Credit}>{props.assignment.credit}</span>
            </div>
            <div className={classes.PdfDocContainer}>
              <div className={classes.divFileBtn}>
                <p>Question PDF/DOC file will be displayed here :</p>
                {/* <button className={classes.viewFileBtn} onClick={() => handleViewFile(props.assignment.questionFiles.results[0].afile)}>View File</button> */}
              </div>

              <table className={classes.StudentTable}>
                <thead>
                  <tr className={classes.tr}>
                    <th className={classes.th}>
                      <div className={classes.divFromth}>File Name</div>
                    </th>
                    <th className={classes.th}>
                      <div className={classes.divFromth}>Description</div>
                    </th>
                    <th className={classes.th2}>
                      <div className={classes.divFromth}>File</div>
                    </th>
                    {props.isPeople && (
                      <th className={classes.th}>
                        <div className={classes.divFromth}>Delete</div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className={classes.tbody}>
                  {props.assignment.questionFiles.map((que) => (
                    <tr className={classes.tr} key={que.id}>
                      <td>{que.name || (que.afile && getFileNameFromUrl(que.afile))}</td>
                      <td>{que.description || '----'}</td>
                      <td className={classes.divFromth}>
                        <button
                          className={classes.viewFileBtn}
                          onClick={() => handleViewFile(que.afile)}
                        >
                          View File
                        </button>
                      </td>
                      {props.isPeople && (
                        <td>
                          <div className={classes.DeleteAndAns}>
                            <button
                              className={classes.deleteFileBtnOne}
                              onClick={() => handleDeleteQuestionFile(que.id)}
                            >
                              <BsTrash className={classes.unLinkIcon} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={classes.ansDiv}>
              {!props.isPeople && (
                <button
                  className={classes.ansBtn}
                  onClick={handleGiveAnswerClick}
                >
                  Submit Answer
                </button>
              )}
            </div>

            {!props.isPeople && (
              <div className={classes.AnswerFilesContainer}>
                <h3>Your Submitted Answers</h3>
                {filteredAnswerFiles.length > 0 ? (
                  <table className={classes.StudentTable}>
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>File Description</th>
                        <th>file</th>
                        <th>Grades</th>


                      </tr>
                    </thead>
                    <tbody className={classes.tbody}>
                      {filteredAnswerFiles.map((ans) => (
                        <tr key={ans.id}>
                          <td> {ans.name || (ans.afile && getFileNameFromUrl3(ans.afile))}</td>
                          <td>{ans.description}</td>
                          <td>
                            <button
                              className={classes.viewFileBtn}
                              onClick={() => handleViewFile(ans.afile)}
                            >
                              View File
                            </button>
                          </td>

                          <td>
                            {ans.grades && ans.grades.length > 0 && ans.grades[0].grade_value ? (
                              <>
                                {ans.grades[0].grade_value}, Added By {ans.grades[0].added_by.firstname} {ans.grades[0].added_by.lastname}
                              </>
                            ) : (
                              "Grade not available"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No answers submitted yet.</p>
                )}
              </div>
            )}

            {props.isPeople && (
              // <div className={classes.AnswerFilesContainer}>
              //   <h3>Answer Files From all Students</h3>
              //   {props.assignment.answerFiles.length > 0 ? (
              //     <table className={classes.StudentTable}>
              //       <thead>
              //         <tr>
              //           <th> File Name</th>
              //           <th>File Description</th>
              //           <th>Uploaded By</th>
              //           <th>File</th>
              //           <th>Delete</th>
              //         </tr>
              //       </thead>
              //       <tbody>
              //         {props.assignment.answerFiles.map((ans) => (
              //           <tr key={ans.id}>
              //             <td>{ans.name}</td>
              //             <td>{ans.description}</td>
              //             <td>
              //               {ans.uploader
              //                 ? `${ans.uploader.firstname} ${ans.uploader.lastname}`
              //                 : 'Not available'}
              //             </td>
              //             <td>
              //               <button
              //                 className={classes.viewFileBtn}
              //                 onClick={() => handleViewFile(ans.afile)}
              //               >
              //                 View File
              //               </button>
              //             </td>
              //             <td>
              //               <div className={classes.DeleteAndAns}>
              //                 <button
              //                   className={classes.deleteFileBtn}
              //                   onClick={() => handleDeleteQuestionFile(ans.id)}
              //                 >
              //                   <BsTrash className={classes.unLinkIcon} />
              //                 </button>
              //               </div>
              //             </td>
              //           </tr>
              //         ))}
              //       </tbody>
              //     </table>
              //   ) : (
              //     <p>No answers submitted yet.</p>
              //   )}
              // </div>


              <div className={classes.outerDiv2}>
                <div className={classes.StudentListPage}>
                  <div className={classes.Header}>
                    <h1>Assignment Results</h1>
                    <p>Assignment Number: {props.assignment.id}</p>
                  </div>
                  <table className={classes.StudentTable}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Answer File</th>

                        <th>Add Grade</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody className={classes.tbody}>
                      {enrolledStudents.map((student, index) => (
                        <tr key={index}>
                          <td>{student.user.id}</td>
                          <td>{student.user.firstname} {student.user.lastname}</td>
                          <td>
                            <button onClick={() => handleViewFiles(student)} className={classes.viewFilesButton}>
                              View Files
                            </button>
                          </td>
                          {/* <td>
                   <button onClick={handleOpenGrade} className={classes.viewFilesButton}>
                     View Grade
                   </button>
                 </td> */}
                          <td>
                            {student.answer_files_with_grades[0] && student.answer_files_with_grades.length > 0 ? (
                              <button onClick={() => handleAddGradeClick(student.user.id)} className={classes.viewFilesButton}>
                                Add Grade
                              </button>
                            ) : (
                              "Assignment not Submitted"
                            )
                            }

                          </td>
                          <td>
                            {student.answer_files_with_grades && student.answer_files_with_grades.length > 0 && student.answer_files_with_grades[0].grade ? (
                              <>
                                {student.answer_files_with_grades[0].grade.grade_value}
                                {/* , Added By {student.answer_files_with_grades[0].grade.added_by.firstname} {student.answer_files_with_grades[0].grade.added_by.lastname} */}
                              </>
                            ) : (
                              "Grade not available"
                            )}
                          </td>

                        </tr>
                      ))}



                    </tbody>
                  </table>
                  {/* <div className={classes.loadMoreButton}>
        <button onClick={loadMoreStudents}>Load More</button>
      </div> */}
                  {/* <div className={classes.buttons}>
           <button onClick={handleSubmit} className={classes.submitButton}>
             {isSubmitted ? "Submitted" : "Submit Grades and Remarks"}
           </button>
         </div> */}
                </div>

                {showPopup2 && selectedStudent && (
                  <div className={classes.overLay}>
                    <div className={classes.popup}>
                      <div className={classes.popupContent}>
                        <div className={classes.closeButtonDiv}>
                          <button onClick={closePopup} className={classes.closeFormButton}>
                            <AiFillCloseCircle className={classes.closeButtonIcon} />
                          </button>
                        </div>

                        <div className={classes.heading}>
                          <h2>Answer Files</h2>
                        </div>
                        <h2 className={classes.h2}>Student Name: {selectedStudent.user.firstname} {selectedStudent.user.lastname}</h2>

                        <div className={classes.divGrade}>
                          {selectedStudent.answer_files_with_grades && selectedStudent.answer_files_with_grades.length > 0 && selectedStudent.answer_files_with_grades[0].grade ? (
                            <>
                              <div className={classes.gradev}>Grade:
                                <span className={classes.span}>
                                  {selectedStudent.answer_files_with_grades[0].grade.grade_value}
                                </span>
                              </div>
                              <div className={classes.gradeC}>Comments:
                                <span className={classes.span}>
                                  {selectedStudent.answer_files_with_grades[0].grade.comments}
                                </span>
                              </div>
                              <div className={classes.gradeName}>Added By:
                                <span className={classes.span}>
                                  {selectedStudent.answer_files_with_grades[0].grade.added_by.firstname} {selectedStudent.answer_files_with_grades[0].grade.added_by.lastname}
                                </span>
                              </div>
                            </>
                          ) : (
                            "Grade not available"
                          )}

                        </div>

                        {selectedStudent.answer_files_with_grades.length === 0 ? (
                          <tr>
                            <td colSpan="3">No answer files available for this student.</td>
                          </tr>
                        ) : (


                          <table className={classes.filesTable}>
                            <thead>
                              <tr>
                                <th>File Name</th>
                                <th>File Description</th>
                                <th>View File</th>
                                {/* <th>Grade</th> */}



                              </tr>
                            </thead>
                            <tbody className={classes.tbody}>

                              {selectedStudent.answer_files_with_grades.map((fileWithGrade, index) => (
                                <tr key={index}>
                                  <td> {fileWithGrade.answer_file.name || (fileWithGrade.answer_file.afile && getFileNameFromUrlForm(fileWithGrade.answer_file.afile))}</td>
                                  <td>{fileWithGrade.answer_file.description}</td>
                                  <td className={classes.viewFiletd}>
                                    <a href={fileWithGrade.answer_file.afile} target="_blank" rel="noopener noreferrer" className={classes.viewFileLink}>
                                      View File
                                    </a>
                                  </td>

                                </tr>
                              ))}

                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                )}


                {showGradeForm && selectedStudentId && (
                  <div className={classes.overLay}>
                    <div className={classes.popup}>
                      <div className={classes.popupContent}>
                        <div className={classes.closeButtonDiv}>
                          <button onClick={() => setShowGradeForm(false)} className={classes.closeFormButton}>
                            <AiFillCloseCircle className={classes.closeButtonIcon} />
                          </button>
                        </div>
                        {/* <div>{selectedStudentId}</div> */}
                        <div className={classes.heading}>
                          <h2>Add Grade</h2>
                        </div>

                        <div className={classes.formGroup}>
                          <label>Grade:</label>
                          <input
                            type="text"
                            value={gradeValue}
                            onChange={(e) => setGradeValue(e.target.value)}
                            className={classes.inputTwo}
                          />
                        </div>
                        <div className={classes.formGroup}>
                          <label>Comments:</label>
                          <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className={classes.inputThree}
                          />
                        </div>
                        <div className={classes.submitDiv}>
                          <button onClick={handleGradeFormSubmit} className={classes.submitButton} disabled={isSubmitted}>
                            {isSubmitted ? "Submitting" : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {showWarningBlock && (
              <div className={classes.warningBlock}>
                <div className={classes.warningMessage}>
                  <div className={classes.cancelBtn}>
                    <button className={classes.btnCrossMark} onClick={handleGiveAnswerClose}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateClassForm_closeButtonIcon__23ZZp" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                    </button>
                  </div>
                  <p>Please submit your assignment before the deadline:</p>
                  <p><strong>Deadline: <span className={classes.deadline}> {props.assignment.dueDate} </span></strong></p>

                  {answerFilesMeta.map((meta, index) => (
                    <div key={index} className={classes.answerFileContainer1}>

                      <div className={classes.divl}>
                        <div className={classes.innerC}>
                          <label className={classes.label}>
                            Answer File:
                            <input
                              className={classes.mediaFile}
                              type="file"
                              onChange={(e) => handleFileChange(index, e.target.files[0])}
                            />
                          </label>
                          <div className={classes.twoBtn}>

                            <button
                              className={classes.toggleMetaBtn}
                              onClick={() => toggleMetaFields(index)}
                            >
                              {showMetaFields[index] ? 'Hide Meta Fields' : 'Show Meta Fields'}
                            </button>
                            <button
                              className={classes.deleteFileBtn}
                              onClick={() => handleDeleteFile(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>


                        {showMetaFields[index] && (
                          <>
                            <div className={classes.divFile}>
                              <label className={classes.label}>
                                Answer File Name:
                                <input
                                  className={classes.inputStyle}
                                  type="text"
                                  value={meta.name}
                                  onChange={(e) => handleMetaChange(index, 'name', e.target.value)}
                                />
                              </label>
                              <label className={classes.label}>
                                Answer File Description:
                                <input
                                  className={classes.textArea}
                                  type="text"
                                  value={meta.description}
                                  onChange={(e) => handleMetaChange(index, 'description', e.target.value)}
                                />
                              </label>
                            </div>
                          </>
                        )}
                      </div>


                    </div>
                  ))}
                  <div className={classes.answerFileDiv}>
                    <button
                      className={classes.addMoreFilesBtn}
                      onClick={handleAddMoreFiles}
                    >
                      Add More Answer Files
                    </button>
                  </div>
                </div>

                <div className={classes.submitDiv}>
                  <button className={classes.SubmitButton} disabled={isSubmitting} onClick={handleSubmit}> {isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </div>
              </div>
            )}

            {showPopup && (
              <div className={classes.popup}>
                <p>Assignment submitted successfully!</p>
              </div>
            )}
          </div>
        </div>
      </div>


      {showGrade && (
        <div className={classes.overLay}>
          <div className={classes.warningBlock}>
            <div className={classes.cancelBtn}>
              <button className={classes.btnCrossMark} onClick={handleCloseGrade}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateClassForm_closeButtonIcon__23ZZp" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
              </button>
            </div>

          </div>
        </div>


      )}


      {showConfirmation && (
        <div className={classes.overLay}>
          <div className={classes.confirmDialog}>
            <p>Are you sure you want to delete the assignment file?</p>
            <div className={classes.div1}>
              <button className={classes.deleteYes} onClick={confirmDelete}>
                {isDeleting ? (
                  <>

                    Deleting...
                  </>
                ) : (
                  "Yes"
                )}
              </button>
              <button className={classes.deleteNo} onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DetailsViewAssignment;