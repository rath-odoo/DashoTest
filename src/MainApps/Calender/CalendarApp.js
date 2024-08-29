// import logo from "./logo.svg";
import classes from "./CalendarApp.module.css";
import Calendar from "react-calendar";

import {
  BsList,
  BsChevronLeft,
  BsChevronRight,
  BsFillCalendarDayFill,
  BsGear,
  BsSearch,
  BsChevronDown,
} from "react-icons/bs";

// import "typeface-roboto";

import "react-calendar/dist/Calendar.css";

function App() {
  return (
    <div className={classes.parent}>
      <div className={classes.header}>
        <div className={classes.container1}>
          {/* <button className="menuIconBtn">
            <BsList className="menuIcon" />
          </button> */}

          <div className={classes.iconAndName}>
            <BsFillCalendarDayFill className={classes.icon} />
            <div className={classes.name}>Calendar</div>
          </div>

          <button className={classes.dayContainer}>
            <div className={classes.dayText}>Today</div>
          </button>

          <div className={classes.btnContainer}>
            <button className={classes.arrowLeft}>
              <BsChevronLeft />
            </button>
            <button className={classes.arrowRight}>
              <BsChevronRight />
            </button>
          </div>

          <div className={classes.monthAndYearContainer}>
            <div className={classes.monthName}>May</div>
            <div className={classes.year}>2023</div>
          </div>
        </div>

        <div className={classes.container2}>
          <div className={classes.iconContainer}>

            <button className={classes.icon1}>
              <BsSearch />
            </button>

            <button className={classes.icon2}>
              <BsGear />
            </button>


          </div>

          <button className={classes.weakDetailContainer}>
            
            <div className={classes.weak}>Week</div>
            <BsChevronDown />
          </button>

          <div className={classes.weakMenu}>

            <button className={classes.t1}>Day</button>
            <button className={classes.t2}>Week</button>
            <button className={classes.t3}>Month</button>
            <button className={classes.t4}>Year</button>
            <button className={classes.t5}>Schedule</button>
            <button className={classes.t6}>4 Days</button>


          </div>

        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.calendar}>
          <Calendar className={classes.cal} />
        </div>

        <div className={classes.mainContainer}>
          <div className={classes.horizontalLine1}>
            <div className={classes.localTime}>GMT+5:30</div>
          </div>
          <div className={classes.horizontalLine2}>
            <div className={classes.date}>10</div>
            <div className={classes.day1}>Mon</div>
          </div>
          <div className={classes.horizontalLine3}>
            <div className={classes.date1}>11</div>
            <div className={classes.day}>Tue</div>
          </div>
          <div className={classes.horizontalLine4}>
            <div className={classes.date1}>12</div>
            <div className={classes.day}>Wed</div>
          </div>
          <div className={classes.horizontalLine5}>
            <div className={classes.date1}>13</div>
            <div className={classes.day}>Thu</div>
          </div>
          <div className={classes.horizontalLine6}>
            <div className={classes.date1}>14</div>
            <div className={classes.day}>Fri</div>
          </div>
          <div className={classes.horizontalLine7}>
            <div className={classes.date1}>15</div>
            <div className={classes.day}>Sat</div>
          </div>
          <div className={classes.horizontalLine8}>
            <div className={classes.date1}>16</div>
            <div className={classes.day}>Sun</div>
          </div>
          <div className={classes.row1}>
            <div className={classes.time}>1 : AM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>2 : AM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>3 : AM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>4 : AM</div>
          </div>{" "}
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>5 : AM</div>
          </div>{" "}
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>6 : AM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>7 : AM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>8 : AM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>9 : AM</div>
          </div>{" "}
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>10 : AM</div>
          </div>{" "}
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>11 : AM</div>
          </div>{" "}
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>12 : PM</div>
          </div>{" "}
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>1 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>2 : PM</div>
          </div>{" "}
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>3 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>4 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>5 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>6 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>7 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>8 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>9 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>10 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row1}>
            <div className={classes.time}>11 : PM</div>
          </div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
          <div className={classes.row}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
