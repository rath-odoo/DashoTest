// const Learn = () => {
//     return (
//         <div>
//             new file
//         </div>
//     );
// }
// export default Learn;




import classes from "./Learn.module.css";
import p1 from "./images/learn/teach.jpg";
import p8 from "./images/learn/live.png";
import Header from './Header2';
import { Link } from "react-router-dom";
import CreateCourseForm from "./CreateCourseForm";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div className={classes.sagarBox1}><Link to="/" className={classes.linking}><Header /></Link> <div className={classes.Container}>
        <div className={classes.card}>
          <div className={classes.content2}>
            <h2 className={classes.heading}>LEARN </h2>
            <div className={classes.text1}>
              India's trusted education platform. Seamlessly find your course
              and explore endless possibilities.
            </div>
            {/* <div className={classes.searchbar}>Here, you can search for:</div>
            <input
              type="text"
              placeholder="Search programs"
              className={classes.searchInput}
            /> */}
          </div>
        </div>


    <div className={classes.Container2}>
    <CreateCourseForm />
    </div>
         

        {/* <div className={classes.Container2}>
          <div class={classes.innerBox}>
            <div class={classes.child}>
              <div class={classes.pic1}>
                <img src={p1} class={classes.img} alt="Teacher" />
              </div>

              <div className={classes.content}>
                <div class={classes.text}>
                  <div class={classes.university}>IIT Delhi, India</div>
                  <div class={classes.Menu}>
                    <div class={classes.courseTitle}>Concept of Physics</div>
                  </div>

                  <div class={classes.instructor}>Bibhuprsad Mahakud</div>
                  <div class={classes.info}>
                    <div class={classes.class}>Class12</div>
                    <div class={classes.duration}>
                      <img src={p8} className={classes.live}></img>
                    </div>
                  </div>
                </div>
                <div class={classes.ratecard}>
                  <div class={classes.ratingStar}>
                    <div class={classes.starButton}>⭐⭐⭐⭐⭐</div>
                    <span class={classes.averageRating}>4.5 (5464)</span>
                  </div>
                  <div class={classes.pricing}>
                    <span class={classes.price}>$99.99</span>
                  </div>
                </div>
                <div class={classes.mediaContainer}>
                  <div class={classes.code}>10083</div>
                  <button class={classes.enrollButton}>Enroll Now</button>
                </div>
              </div>
            </div>
          </div>

          <div class={classes.innerBox}>
            <div class={classes.child}>
              <div class={classes.pic1}>
                <img src={p1} class={classes.img} alt="Teacher" />
              </div>

              <div className={classes.content}>
                <div class={classes.text}>
                  <div class={classes.university}>IIT Delhi, India</div>
                  <div class={classes.Menu}>
                    <div class={classes.courseTitle}>
                      {" "}
                      Theory of life science and world technology{" "}
                    </div>
                  </div>

                  <div class={classes.instructor}>Bibhuprsad Mahakud</div>
                  <div class={classes.info}>
                    <div class={classes.class}>Class12</div>
                    <div class={classes.duration}>
                      <img src={p8} className={classes.live}></img>
                    </div>
                  </div>
                </div>
                <div class={classes.ratecard}>
                  <div class={classes.ratingStar}>
                    <div class={classes.starButton}>⭐⭐⭐⭐⭐</div>
                    <span class={classes.averageRating}>4.5 (5464)</span>
                  </div>
                  <div class={classes.pricing}>
                    <span class={classes.price}>$99.99</span>
                  </div>
                </div>
                <div class={classes.mediaContainer}>
                  <div class={classes.code}>10083</div>
                  <button class={classes.enrollButton}>Enroll Now</button>
                </div>
              </div>
            </div>
          </div>

          <div class={classes.innerBox}>
            <div class={classes.child}>
              <div class={classes.pic1}>
                <img src={p1} class={classes.img} alt="Teacher" />
              </div>

              <div className={classes.content}>
                <div class={classes.text}>
                  <div class={classes.university}>IIT Delhi, India</div>
                  <div class={classes.Menu}>
                    <div class={classes.courseTitle}>Concept of Physics</div>
                  </div>

                  <div class={classes.instructor}>Bibhuprsad Mahakud</div>
                  <div class={classes.info}>
                    <div class={classes.class}>Class12</div>
                    <div class={classes.duration}>
                      <img src={p8} className={classes.live}></img>
                    </div>
                  </div>
                </div>
                <div class={classes.ratecard}>
                  <div class={classes.ratingStar}>
                    <div class={classes.starButton}>⭐⭐⭐⭐⭐</div>
                    <span class={classes.averageRating}>4.5 (5464)</span>
                  </div>
                  <div class={classes.pricing}>
                    <span class={classes.price}>$99.99</span>
                  </div>
                </div>
                <div class={classes.mediaContainer}>
                  <div class={classes.code}>10083</div>
                  <button class={classes.enrollButton}>Enroll Now</button>
                </div>
              </div>
            </div>
          </div>

          <div class={classes.innerBox}>
            <div class={classes.child}>
              <div class={classes.pic1}>
                <img src={p1} class={classes.img} alt="Teacher" />
              </div>

              <div className={classes.content}>
                <div class={classes.text}>
                  <div class={classes.university}>IIT Delhi, India</div>
                  <div class={classes.Menu}>
                    <div class={classes.courseTitle}>Concept of Physics</div>
                  </div>

                  <div class={classes.instructor}>Bibhuprsad Mahakud</div>
                  <div class={classes.info}>
                    <div class={classes.class}>Class12</div>
                    <div class={classes.duration}>
                      <img src={p8} className={classes.live}></img>
                    </div>
                  </div>
                </div>
                <div class={classes.ratecard}>
                  <div class={classes.ratingStar}>
                    <div class={classes.starButton}>⭐⭐⭐⭐⭐</div>
                    <span class={classes.averageRating}>4.5 (5464)</span>
                  </div>
                  <div class={classes.pricing}>
                    <span class={classes.price}>$99.99</span>
                  </div>
                </div>
                <div class={classes.mediaContainer}>
                  <div class={classes.code}>10083</div>
                  <button class={classes.enrollButton}>Enroll Now</button>
                </div>
              </div>
            </div>
          </div>
        </div> */}




      </div>
    </div>
  );
};
