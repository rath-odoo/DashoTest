import classes from "./TicketViewWindow.module.css";

import { RiDiscussFill } from "react-icons/ri";

import { IoIosPeople } from "react-icons/io";

import { MdDateRange, MdDescription } from "react-icons/md";

import { TbListDetails } from "react-icons/tb";

import { BiEdit } from "react-icons/bi";

import { FaRegCommentDots } from "react-icons/fa";

import { BsPlusCircle } from "react-icons/bs";

import TicketNavBar from "./TicketNavBar";

function App() {
  return (
    <div className={classes.MainParent}>
      <div className={classes.ticknavbarView}>
        <TicketNavBar />
      </div>

      <div className={classes.parentDiv}>
        <div className={classes.topBarHead}>
          <div className={classes.topHeadingDiv}>
            <div className={classes.iconContainerDis}>
              <RiDiscussFill className={classes.discIcon} />
            </div>

            <div className={classes.discTitle}>Discussion : 5</div>

            <div className={classes.topicTitle}>What is Compound ?</div>
          </div>

          <button className={classes.editBtnContainer}>
            {" "}
            <BiEdit className={classes.editIcon} />{" "}
            <div className={classes.editTitle}>Edit</div>
          </button>
        </div>

        <div className={classes.horizontalLine}></div>

        <div className={classes.middleSec}>
          <div className={classes.firstContainer}>
            <div className={classes.topContainer}>
              <div className={classes.peopleicon}>
                <TbListDetails />
              </div>
              <div className={classes.mainHeading}>Details</div>
            </div>

            <div className={classes.infoContainer1}>
              <div className={classes.dot}></div>
              <div className={classes.title}>Category : </div>
              <div className={classes.subtitle}>Default</div>
            </div>

            <div className={classes.infoContainer2}>
              <div className={classes.dot}></div>
              <div className={classes.title}>Priority : </div>
              <div className={classes.subtitle}>Medium</div>
            </div>

            <div className={classes.infoContainer3}>
              <div className={classes.dot}></div>
              <div className={classes.title}>Status : </div>
              <div className={classes.subtitle3}>open</div>
            </div>

            <div className={classes.infoContainer4}>
              <div className={classes.dot}></div>
              <div className={classes.title}>Resolution : </div>
              <div className={classes.subtitle}>unresolved</div>
            </div>
          </div>

          <div className={classes.secondContainer}>
            <div className={classes.topContainer}>
              <div className={classes.peopleicon}>
                <IoIosPeople />
              </div>
              <div className={classes.mainHeading}>People</div>
            </div>

            <div className={classes.infoContainer5}>
              <div className={classes.dot}></div>
              <div className={classes.title}>Created By : </div>
              <div className={classes.subtitle}>Mr. Akshay Bhasme</div>
            </div>

            <div className={classes.infoContainer6}>
              <div className={classes.dot}></div>
              <div className={classes.title}>Visibility : </div>
              <div className={classes.subtitle}>Public</div>
            </div>
          </div>

          <div className={classes.thirdContainer}>
            <div className={classes.topContainer}>
              <div className={classes.peopleicon}>
                <MdDateRange />
              </div>

              <div className={classes.mainHeading}>Dates</div>
            </div>

            <div className={classes.infoContainer7}>
              <div className={classes.dot}></div>
              <div className={classes.title1}>Created at : </div>
              <div className={classes.subtitle1}>09:18, 02 Jun 2023</div>
            </div>

            <div className={classes.infoContainer8}>
              <div className={classes.dot}></div>
              <div className={classes.title1}>Last Updated at : </div>
              <div className={classes.subtitle1}>09:18, 02 Jun 2023</div>
            </div>
          </div>
        </div>

        <div className={classes.horizontalLine}></div>

        <div className={classes.descriptionDiv}>
          <div className={classes.iconContainerDescription}>
            <MdDescription className={classes.descriptionIcon} />
          </div>

          <div className={classes.descriptionTitle}>Description : </div>
        </div>

        <div className={classes.descriptionDetails}>
          Definition of Compounds & Elements - Examples, Types ... What is a
          Compound? When two or more elements chemically combine in a fixed
          ratio by mass, the obtained product is known as a compound.
        </div>

        <div className={classes.horizontalLine}></div>

        <div className={classes.commnetSection}>
          <div className={classes.headerDescription}>
            <div className={classes.startSection}>
              <div className={classes.commentIconContainer}>
                <FaRegCommentDots className={classes.descriptionIcon} />
              </div>

              <div className={classes.commentTitle}>Comments :</div>
            </div>

            <button className={classes.addCommentBtnContainer}>
              <div className={classes.addCommentIcon}>
                {" "}
                <BsPlusCircle />{" "}
              </div>
              <div className={classes.addCommentTitle}>Add Comment</div>
            </button>
          </div>

          <div className={classes.userComment}>
            <div className={classes.usercommentTopBar}>
              <div className={classes.userName}>Akshay Bhasme</div>

              <div className={classes.dateTime}>30-01-23 10.22AM</div>
            </div>

            <div className={classes.commentText}>
              Android is a mobile Operatiing Sysytem based on a modified verison
              of the linux kernal and other open source Lib. Android is a mobile
              Operatiing Sysytem based on a modified verison of the linux kernal
              and other open source Lib.
            </div>
          </div>

          <div className={classes.writeCommentSection}>
            <div className={classes.addCommentBox}>
              <textarea
                className={classes.discSearchBox}
                type="text"
                placeholder="Write Comment..."
              />
            </div>

            <div className={classes.buttonContainer}>
              <button className={classes.postCommentButton}>
                Post Comment
              </button>

              <button className={classes.cancelCommentButton}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
