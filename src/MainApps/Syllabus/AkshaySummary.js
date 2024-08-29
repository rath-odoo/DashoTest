// import logo from "./logo.svg";
import classes from "./AkshaySummary.module.css";
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

function App() {
  return (
    <div className={classes.parentDiv}>
      <div className={classes.headerSection}>
        <div className={classes.classContainer}>
          <div className={classes.classIcon}>
            <BsFillBookFill />
          </div>
          <div className={classes.classTitle}>Course Name : </div>
          <div className={classes.classNa}>Basic of Biology</div>
        </div>

        <div className={classes.statusContainer}>
          <div className={classes.statusIcon}>
            <BsActivity />
          </div>
          <div className={classes.statusTitle}>Course Status : </div>
          <div className={classes.statusName}>Ongoing</div>
        </div>

        <div className={classes.courseContainer}>
          <div className={classes.courseIcon}>
            <BsPersonVcardFill />
          </div>
          <div className={classes.courseTitle}>Course ID : </div>
          <div className={classes.courseName}>1001010</div>
        </div>
      </div>

      <div className={classes.instructor}>
        <div className={classes.instructorOneData}>
          <div className={classes.profileIconContainer}>
            <img
              className={classes.profileImg}
              src={ProfileImage}
              alt="logo"
            ></img>
          </div>

          <div className={classes.instructorDetailContainer}>
            <div className={classes.title1}>Akshay Dipakrao Bhasme</div>
            <div className={classes.title2}>Top Instructor</div>
            <div className={classes.title3}>Android and Web Designer</div>
            <div className={classes.title4}>1 and Half year Experienced</div>
          </div>
        </div>

        <div className={classes.instructorTwoData}>
          <div className={classes.profileIconContainer}>
            <img
              className={classes.profileImg}
              src={ProfileImage}
              alt="logo"
            ></img>
          </div>

          <div className={classes.instructorDetailContainer}>
            <div className={classes.title1}>Akshay Dipakrao Bhasme</div>
            <div className={classes.title2}>Top Instructor</div>
            <div className={classes.title3}>Android and Web Designer</div>
            <div className={classes.title4}>1 and Half year Experienced</div>
          </div>
        </div>
      </div>

      <div className={classes.parentAbout}>
        <div className={classes.topNavBar}>
          <div className={classes.mainSummary}>
            <div className={classes.summaryIcon}>
              <BsFileEarmarkTextFill />
            </div>

            <div className={classes.summaryTitle}>SUMMARY</div>
          </div>

          <button className={classes.summaryEditBtn}>
            <BsPencilSquare className={classes.summaryEditIcon} /> Edit
          </button>
        </div>

        <div className={classes.aboutUserDetailContainer}>
          <div className={classes.aboutLeftContainer}>
            <div className={classes.instituteName}>
              <div className={classes.title}>Institute : </div>
              <div className={classes.nameTitle}>Nit Nagpur It park</div>
            </div>

            <div className={classes.designFor}>
              <div className={classes.designTitle}> Designed for : </div>
              <div className={classes.designName}>Akshay</div>
            </div>

            <div className={classes.subject}>
              <div className={classes.subjectTitle}> Subject : </div>
              <div className={classes.subjectName}>Micro Biology</div>
            </div>

            <div className={classes.ins_}>
              <div className={classes.insTitle_}> Institute code : </div>
              <div className={classes.insName_}>NIT-001</div>
            </div>

            <div className={classes.duration}>
              <div className={classes.durationTitle}>Duration : </div>
              <div className={classes.durationName}>
                13 Oct 2022 To 13 Oct 2022
              </div>
            </div>

            <div className={classes.progress}>
              <div className={classes.progressTitle}> Progress : </div>
              <div className={classes.progressAddress}>N/A</div>
            </div>
          </div>

          <div className={classes.aboutRightContainer}>
            <div className={classes.upclass11}>
              <div className={classes.upclassTitle11}>Upcoming Class : </div>
              <div className={classes.upclassName11}>Physics</div>
            </div>

            <div className={classes.credit}>
              <div className={classes.creditTitle}>Credit : </div>
              <div className={classes.creditName}>100</div>
            </div>

            <div className={classes.exam}>
              <div className={classes.examTitle}> No. of Exams : </div>
              <div className={classes.examName}>10</div>
            </div>

            <div className={classes.assignment}>
              <div className={classes.assignmentTitle}>
                No. of Assignment :{" "}
              </div>
              <div className={classes.assignmentName}>50</div>
            </div>

            <div className={classes.aboutCourse}>
              <div className={classes.aboutCourseTitle}>About Course : </div>
              <div className={classes.aboutCourseName}>N/A</div>
            </div>
          </div>
        </div>
      </div>

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

	  {/*
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
	 */} 
        </div>
      </div>

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
    </div>
  );
}

export default App;
