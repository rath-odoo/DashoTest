// import logo from "./logo.svg";
import classes from "./AkshaySummary.module.css";
import EditFormInstitute from './EditFormInstitute'; // Adjust the path as per your project structure
import { useState } from "react";
// import "typeface-roboto";
import {
  BsActivity,
  BsFillBookFill,
  BsPersonVcardFill,
  BsBarChartLineFill,
  BsPencilSquare,
  BsPlusCircle,
  BsFillBookmarkStarFill,
  BsFilterCircle,
  BsFileEarmarkTextFill,
  BsXCircle,
} from "react-icons/bs";
import BookImage from "./book.jpeg";
import ProfileImage from "./profile1.jpg";
import CourseEditForm from "../Dashboard/General/components/Teacher/Forms/CourseEditForm";
//components/Teacher/Overview/Forms/CourseEditForm

const isAdminCheck = ({ course, idToCheck }) => {


  if (course.admins && course.admins.some(admin => admin.id === idToCheck)) {
    return true;
  }

  return false;

};

const isTeacherCheck = ({ course, idToCheck }) => {


  if (course.teachers && course.teachers.some(teacher => teacher.id === idToCheck)) {
    return true;
  }

  return false;
};


const isStudentCheck = ({ course, idToCheck }) => {
  //console.log("course.enrolled_students: ", course.enrolled_students, idToCheck)    
  return course.enrolled_students.includes(idToCheck);
};










const Summary = (props) => {

  console.log("selected Course: ", props.selectedCourse);

  //  const teacher = props.selectedCourse[0].teachers[0]; 

  const [showWarning, setShowWarning] = useState(false);

  const toggleWarning = () => {
    setShowWarning(!showWarning);
  };
  const closeWarning = () => {
    setShowWarning(false);
  };



  let course = props.selectedCourse[0];
  let idToCheck = Number(props.userData.id);
  let isAdmin = isAdminCheck({ course, idToCheck });
  let isTeacher = isTeacherCheck({ course, idToCheck });
  let isStudent = isStudentCheck({ course, idToCheck });
  let isOwner = Number(props.userData.id) === Number(course.creater.id) ? true : false;


  console.log(isAdmin)




  return (
    <div className={classes.parentDiv}>
      <div className={classes.headerSection}>
        <div className={classes.classContainer}>
          <div className={classes.classIcon}>
            <BsFillBookFill />
          </div>
          <div className={classes.classTitle}>Course Name : </div>
          <div className={classes.classNa}>
            {props.selectedCourse[0].courseShortName}
          </div>
        </div>

        <div className={classes.statusContainer}>
          <div className={classes.statusIcon}>
            <BsActivity />

          </div>
          <div className={classes.statusTitle}>Course Status : </div>
          <div className={classes.statusName}>{props.selectedCourse[0].courseStatus
          }</div>
        </div>

        <div className={classes.courseContainer}>
          <div className={classes.courseIcon}>
            <BsPersonVcardFill />
          </div>
          <div className={classes.courseTitle}>Global Course ID : </div>
          <div className={classes.courseName}>
            {props.selectedCourse[0].courseGlobalCode}
          </div>
        </div>
      </div>

      <div className={classes.instructor}>
        {props.selectedCourse[0].teachers !== null && props.selectedCourse[0].teachers.map((teacher, index) => (
          <div className={classes.instructorOneData} key={index}>
            <div className={classes.profileIconContainer}>
              <img
                className={classes.profileImg}
                src={teacher.profile_image}
                alt="Teacher Profile"
              />
            </div>

            <div className={classes.instructorDetailContainer}>
              <div className={classes.title1}>
                {teacher.usertitle} {teacher.firstname} {teacher.lastname}
              </div>
              {/*
        <div className={classes.title2}>Top Instructor</div>
        <div className={classes.title3}>Android and Web Designer</div>
        <div className={classes.title4}>1 and Half year Experienced</div>
	  */}
            </div>
          </div>
        ))}
      </div>

      <div className={classes.parentAbout}>
        <div className={classes.topNavBar}>
          <div className={classes.mainSummary}>
            <div className={classes.summaryIcon}>
              <BsFileEarmarkTextFill />
            </div>

            <div className={classes.summaryTitle}>INFORMATION</div>
          </div>

          {!isStudent &&
            <button className={classes.summaryEditBtn} onClick={toggleWarning}>
              Edit
            </button>

          }

          {showWarning && (
            <div className={classes.warningBlock}>

              {/* Render EditFormInstitute component */}
              {<EditFormInstitute onClose={closeWarning}
                selectedCourse={props.selectedCourse[0]}
                rerender={props.rerender}

              />}
              {/* <CourseEditForm/> */}
            </div>
          )}
        </div>

        <div className={classes.aboutUserDetailContainer}>
          <div className={classes.aboutLeftContainer}>
            <div className={classes.instituteName}>
              <div className={classes.title}>Institute : </div>
              <div className={classes.nameTitle}>{props.selectedCourse[0].instituteName}</div>
            </div>

            <div className={classes.designFor}>
              <div className={classes.designTitle}> Designed for : </div>
              <div className={classes.designName}>{props.selectedCourse[0].designedFor}</div>
            </div>

            <div className={classes.subject}>
              <div className={classes.subjectTitle}> Subject : </div>
              <div className={classes.subjectName}>{props.selectedCourse[0].subject}</div>
            </div>

            {/* <div className={classes.ins_}>
              <div className={classes.insTitle_}> Institute code : </div>
              <div className={classes.insName_}>{props.selectedCourse[0].courseLocalCode}</div>
            </div> */}

            <div className={classes.ins_}>
              <div className={classes.insTitle_}> Education Board : </div>
              <div className={classes.insName_}>{props.selectedCourse[0].educationboard}</div>
            </div>

            <div className={classes.duration}>
              <div className={classes.durationTitle}>Duration : </div>
              <div className={classes.durationName}>
                {props.selectedCourse[0].courseStartDate}  -  {props.selectedCourse[0].courseEndDate}
              </div>
            </div>

            <div className={classes.progress}>
              <div className={classes.progressTitle}> Progress : </div>
              <div className={classes.progressAddress}>{props.selectedCourse[0].courseStatus
              }</div>
            </div>
          </div>

          <div className={classes.aboutRightContainer}>
            {/* <div className={classes.upclass11}>
              <div className={classes.upclassTitle11}>Upcoming Class : </div>
              <div className={classes.upclassName11}>Physics</div>
            </div> */}

            <div className={classes.credit}>
              <div className={classes.creditTitle}>Credit : </div>
              <div className={classes.creditName}>{props.selectedCourse[0].coursecredit}</div>
            </div>

            {/* <div className={classes.exam}>
              <div className={classes.examTitle}> No. of Exams : </div>
              <div className={classes.examName}>10</div>
            </div>

            <div className={classes.assignment}>
              <div className={classes.assignmentTitle}>
                No. of Assignment :{" "}
              </div>
              <div className={classes.assignmentName}>50</div>
            </div> */}

            <div className={classes.ins_}>
              <div className={classes.insTitle_}> Institute code : </div>
              <div className={classes.insName_}>{props.selectedCourse[0].courseLocalCode}</div>
            </div>



            <div className={classes.aboutCourse}>
              <div className={classes.aboutCourseTitle}>About Course : </div>
              <div className={classes.aboutCourseName}>{props.selectedCourse[0].abouttheCourse
              }</div>
            </div>
          </div>
        </div>
      </div>

      {/*	
      <div className={classes.recBookMain}>
        <div className={classes.rec_bookTopBar}>
          <div className={classes.recMainContainer}>
            <div className={classes.recIconContainer}>
              <BsFillBookmarkStarFill />
            </div>
            <div className={classes.recTitleName}>Recommanded Books</div>
          </div>

          <button className={classes.recAddBtn}>
            <BsPlusCircle className={classes.addicon} /> Add
          </button>
        </div>
        
        <div className={classes.rec_Books}>
          <div className={classes.bookContainer1}>
            <div className={classes.imageContainer}>
              <img className={classes.bookImg} src={BookImage} alt="logo"></img>
            </div>
            
            <div className={classes.bookDetail}>
              <div className={classes.bookparentContainerDetail}>
                <div className={classes.bookMainContainer}>
                  <div className={classes.bookName}>
                    <div className={classes.bookTitle}>Name : </div>
                    <div className={classes.booktNameTitle}>
                      Fundamentals of physics
                    </div>
                  </div>

                  <div className={classes.authName}>
                    <div className={classes.authTitle}>Author : </div>
                    <div className={classes.authorNameTitle}>Isaac Newton</div>
                  </div>
                </div>

                <button className={classes.docDelete}>
                  <BsXCircle />
                </button>
              </div>

              <div className={classes.readProg}>
                <div className={classes.readTitle}>Read :</div>
                <div className={classes.progressBar}>
                  <div className={classes.progressDetail}>80%</div>
                </div>
              </div>
            </div>
	    
          </div>

	  
          <div className={classes.bookContainer2}>
            <img className={classes.bookImg} src={BookImage} alt="logo"></img>

            <div className={classes.bookDetail}>
              <div className={classes.bookparentContainerDetail}>
                <div className={classes.bookMainContainer}>
                  <div className={classes.bookName}>
                    <div className={classes.bookTitle}>Name : </div>
                    <div className={classes.booktNameTitle}>
                      Fundamentals of physics
                    </div>
                  </div>

                  <div className={classes.authName}>
                    <div className={classes.authTitle}>Author : </div>
                    <div className={classes.authorNameTitle}>Isaac Newton</div>
                  </div>
                </div>

                <button className={classes.docDelete}>
                  <BsXCircle />
                </button>
              </div>

              <div className={classes.readProg}>
                <div className={classes.readTitle}>Read :</div>
                <div className={classes.progressBar}>
                  <div className={classes.progressDetail}>80%</div>
                </div>
              </div>
            </div>
          </div>
	  
	  
          <div className={classes.bookContainer3}>
            <img className={classes.bookImg} src={BookImage} alt="logo"></img>

            <div className={classes.bookDetail}>
              <div className={classes.bookparentContainerDetail}>
                <div className={classes.bookMainContainer}>
                  <div className={classes.bookName}>
                    <div className={classes.bookTitle}>Name : </div>
                    <div className={classes.booktNameTitle}>
                      Fundamentals of physics
                    </div>
                  </div>

                  <div className={classes.authName}>
                    <div className={classes.authTitle}>Author : </div>
                    <div className={classes.authorNameTitle}>Isaac Newton</div>
                  </div>
                </div>

                <button className={classes.docDelete}>
                  <BsXCircle />
                </button>
              </div>

              <div className={classes.readProg}>
                <div className={classes.readTitle}>Read :</div>
                <div className={classes.progressBar}>
                  <div className={classes.progressDetail}>80%</div>
                </div>
              </div>
            </div>
          </div>
	  
        </div>
	
      </div>
       */}

      {/*
      <div className={classes.creditScoreParent}>
        <div className={classes.progNavbar}>
          <div className={classes.firstContainer}>
            <div className={classes.creditScoreIcon}>
              <BsFillBookFill />
            </div>

            <div className={classes.creditScoreTitle}>Credit Score</div>
            <input
              className={classes.crediScoreSearchBox}
              type="text"
              placeholder="Search Student Name ..."
            />
          </div>

          <button className={classes.filterButton}>
            <BsFilterCircle className={classes.filterIcon} /> Filter
          </button>
        </div>

        <div className={classes.mainProgressGridContainer}>
          <div className={classes.firstGridContainer}>
            <div className={classes.progressBar1}>
              <div className={classes.progressDetail1}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>40%</div>
              </div>
            </div>

            <div className={classes.progressBar1}>
              <div className={classes.progressDetail1}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>60%</div>
              </div>
            </div>

            <div className={classes.progressBar1}>
              <div className={classes.progressDetail1}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>80%</div>
              </div>
            </div>
          </div>

          <div className={classes.secondGridContainer}>
            <div className={classes.progressBar2}>
              <div className={classes.progressDetail2}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>40%</div>
              </div>
            </div>

            <div className={classes.progressBar2}>
              <div className={classes.progressDetail2}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>60%</div>
              </div>
            </div>

            <div className={classes.progressBar2}>
              <div className={classes.progressDetail2}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>80%</div>
              </div>
            </div>
          </div>

          <div className={classes.thirdGridContainer}>
            <div className={classes.progressBar3}>
              <div className={classes.progressDetail3}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>40%</div>
              </div>
            </div>

            <div className={classes.progressBar3}>
              <div className={classes.progressDetail3}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>60%</div>
              </div>
            </div>

            <div className={classes.progressBar3}>
              <div className={classes.progressDetail3}>
                <div className={classes.progTitle}>Akshay Bhasme</div>
                <div className={classes.progTotalScore}>80%</div>
              </div>
            </div>
          </div>
        </div>
       


      </div>
      */}
    </div>
  );
}

export default Summary;
