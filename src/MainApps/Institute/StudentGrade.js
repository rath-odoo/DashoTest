// GradesComponent.js
import { useState, useEffect } from 'react';
import classes from './StudentGrade.module.css';
import { fetchData } from '../../CommonApps/AllAPICalls';

const GradesComponent = ({ studentId, batchId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData(studentId, batchId)
            .then(gradesData => setData(gradesData));
    }, [studentId, batchId ]);

    if (!data) {
        return <div>Loading...</div>;
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

    return (
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
                                        {/* <th>Difficulty Level</th> */}
                                        <th>Platform</th>
                                        {/* <th>Start Date</th> */}
                                        {/* <th>Start Time</th> */}
                                        <th>Grade</th>
                                        <th>Marks Obtained</th>
                                    </tr>
                                </thead>
                                <tbody className={classes.tbody}>
                                    {subExamEntry.grades.map((gradeData, index) => (
                                        <tr key={index}>
                                            {/* <td>{gradeData.exam.difficultylevel}</td> */}
                                            <td>{gradeData.exam.platform}</td>
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
    );
};

export default GradesComponent;
