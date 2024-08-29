
import classes from './StudentsContainer.module.css';

import OneStudent from './OneStudent';
import {FaSearch} from 'react-icons/fa';


const StudentsContainer=()=>{




   const handleChange=(e)=>{

    // props.setSearchString(searchString=>e.target.value);
    // props.setPageNo(1);

   }













return (


<div className={classes.studentsContainerParentDiv}>

   <div className={classes.searchBoxEnrolledStudents}>
      <FaSearch/>
      <input
               type="text"
               onChange={handleChange}
               name="inputText"
               className={classes.input_fieldSearch}
               placeholder="..phone or email or name"
          />

   </div>


  <div className={classes.studentsContainer}>

     <OneStudent/>
     <OneStudent/>
     <OneStudent/>	
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>
     <OneStudent/>







 </div>
</div>


);


}

export default StudentsContainer;
