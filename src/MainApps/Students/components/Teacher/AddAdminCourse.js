import React, { useState, useEffect } from 'react';
import classes from "./AddAdmin.module.css";
import { AiFillCloseCircle } from 'react-icons/ai';
// import { addStudentToCourse, usersearchCourse } from '../../../../CommonApps/AllAPICalls';
import UserBox from './UserBox';
import { addAdminToCourse, addStudentToCourse, usersearchCourse, usersearch_for_addingadmin_in_Course } from '../../../../CommonApps/AllAPICalls';

const AddAdminCourse = (props) => {
  const { selectedCourse } = props;
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [addedStudents, setAddedStudents] = useState([]);

  useEffect(() => {
    const courseId = selectedCourse[0].id;
    usersearch_for_addingadmin_in_Course({ searchString, courseId, getSearchedUsers: (data) => setSearchedUsers(data.results) });
  }, [searchString, selectedCourse]);

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const createGroupHandler = (userId) => {
    const courseId = props.selectedCourse[0].id;
    addAdminToCourse(courseId, userId)
      .then(response => {
        console.log('Student added:', response.data);
        setAddedStudents([...addedStudents, userId]);
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  };

  console.log("searchedUsers: ", searchedUsers);

  return (
    <div className={classes.addStudentFormDiv}>
      <div className={classes.formDiv}>
        <div className={classes.closeButtonDiv}>
          <div onClick={props.onClose} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </div>
        </div>
        <div className={classes.InfoSearchStudent}>
          <b>Add Admin</b>
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
              // userName={user.firstname !== "" && user.lastname !== "" ? `${user.firstname} ${user.lastname}` : user.username}
              userName={user.firstname !== "" || user.lastname !== "" ? `${user.firstname} ${user.lastname}`.trim() : user.username}
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

export default AddAdminCourse;
