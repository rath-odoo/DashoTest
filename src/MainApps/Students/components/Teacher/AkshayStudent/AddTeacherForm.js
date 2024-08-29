import React, { useState, useEffect } from 'react';
import classes from "./AddTeacherForm.module.css";
import { AiFillCloseCircle } from 'react-icons/ai';
import { addTeachersToCourse, usersearchCourse, usersearch_for_addingteacher_in_Course } from '../../../../../CommonApps/AllAPICalls';
import UserBoxTeacher from './UserBoxTeacher';

const AddTeacherForm = (props) => {
  const { selectedCourse } = props;
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);

  useEffect(() => {
    const courseId = selectedCourse[0].id;
    usersearch_for_addingteacher_in_Course({ searchString, courseId, getSearchedUsers: setSearchedUsers });
  }, [searchString, selectedCourse]);

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleAddTeacher = async (teacherId) => {
    if (!selectedTeacherIds.includes(teacherId)) {
      const newTeacherIds = [...selectedTeacherIds, teacherId];
      setSelectedTeacherIds(newTeacherIds);
      try {
        const courseId = selectedCourse[0].id;
        const response = await addTeachersToCourse(courseId, newTeacherIds);
        console.log("Teachers added successfully:", response);
      } catch (error) {
        console.error("Error adding teachers:", error);
      }
    }
  };

  const userResults = searchedUsers.results || [];

  console.log(searchedUsers);

  return (
    <div className={classes.addStudentFormDiv}>
      <div className={classes.formDiv}>
        <div className={classes.closeButtonDiv}>
          <button onClick={props.onClose} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </button>
        </div>

        <div className={classes.InfoSearchStudent}>
          <b>Add Teacher</b>
        </div>
        <div className={classes.searchBoxEnrolledStudents}>
          <input
            type="text"
            onChange={handleChange}
            name="inputText"
            className={classes.input_fieldSearch}
            placeholder="Search Teachers name"
          />
        </div>
        {userResults.length > 0 &&
          userResults.map((user, index) => (
            <UserBoxTeacher
              key={index}
              userImage={user.profile_image}
              userId={user.id}
              // userName={user.firstname !== "" && user.lastname !== "" ? `${user.firstname} ${user.lastname}` : user.username}
              userName={user.firstname !== "" || user.lastname !== "" ? `${user.firstname} ${user.lastname}`.trim() : user.username}
              onPress={() => handleAddTeacher(user.id)}
              isAdded={selectedTeacherIds.includes(user.id)}
              user={user}
            />
          ))
        }
      </div>
    </div>
  );
};

export default AddTeacherForm;
