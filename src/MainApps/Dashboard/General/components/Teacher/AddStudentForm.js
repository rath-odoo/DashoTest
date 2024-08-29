import React, { useState, useEffect } from 'react';
import classes from "./AddStdFromDash.module.css";
import { AiFillCloseCircle } from 'react-icons/ai';
// import { addStudentToCourse, usersearchCourse , usersearch_for_addingstudent_in_Course} from '../../../../CommonApps/AllAPICalls';
import UserBox from '../../../../Students/components/Teacher/UserBox';
import { addStudentToCourse, usersearch_for_addingstudent_in_Course } from '../../../../../CommonApps/AllAPICalls';
// import UserBox from './UserBox';

const AddStudentForm = (props) => {
//   const { selectedCourse } = props; 
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [addedStudents, setAddedStudents] = useState([]);

  useEffect(() => {
    const courseId = props.Course.id;
    usersearch_for_addingstudent_in_Course({ searchString, courseId, getSearchedUsers: (data) => setSearchedUsers(data.results) });
  }, [searchString, props.Course]);

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const createGroupHandler = (userId) => {
    const courseId = props.Course.id;
    addStudentToCourse(courseId, userId)
      .then(response => {
        console.log('Student added:', response.data);
        setAddedStudents([...addedStudents, userId]);
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  console.log("searchedUsers: ", searchedUsers);
  console.log("courseId",props.Course.id);

  return (
    <div className={classes.addStudentFormDiv}>
      <div className={classes.formDiv}>
        <div className={classes.closeButtonDiv}>
          <div onClick={props.onClose} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </div>
        </div>
        <div className={classes.InfoSearchStudent}>
          <b>Add Student</b>
        </div>
        <div className={classes.searchBoxEnrolledStudents}>
          <input
            type="text"
            onChange={handleChange}
            name="inputText"
            className={classes.input_fieldSearch}
            placeholder="Search Students name"
          />
        </div>
        {searchedUsers.length > 0 &&
          searchedUsers.map((user, index) => (
            <UserBox
              key={index}
              userImage={user.profile_image}
              userId={user.id}
              userName={user.firstname !== "" && user.lastname !== "" ? `${user.firstname} ${user.lastname}` : user.username}
              onPress={() => createGroupHandler(user.id)}
              user={user}
              added={addedStudents.includes(user.id)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default AddStudentForm;
