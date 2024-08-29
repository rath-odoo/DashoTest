import classes from "./Ratting.module.css";

import {
  BsStarFill,
  BsHeart,
  BsFillGeoAltFill,
  BsStopwatchFill,
  BsFillPeopleFill,
  BsFillLaptopFill,
} from "react-icons/bs";

const Rateing=(props)=> {
  return (
    <div className={classes.ratingContainer}>
      <div className={classes.finalRating}>{props.topperProfile.noofstars}</div>

      <div className={classes.stars}>
        <BsStarFill className={classes.r1} />
        <BsStarFill className={classes.r2} />
        <BsStarFill className={classes.r3} />
        <BsStarFill className={classes.r4} />
        <BsStarFill className={classes.r5} />
      </div>

      <div className={classes.TotalRating}>({props.topperProfile.totalratings})</div>

      {/* <div className={classes.rateCards}>
          <div className={classes.star5Container}>
            <div className={classes.star5}>5 Star</div>

            <div className={classes.stars5all}>
              <BsStarFill className={classes.r1} />
              <BsStarFill className={classes.r2} />
              <BsStarFill className={classes.r3} />
              <BsStarFill className={classes.r4} />
              <BsStarFill className={classes.r5} />
            </div>
            <div className={classes.starNu}>(1235)</div>
          </div>

          <div className={classes.star4Container}>
            <div className={classes.star4}>4 Star</div>

            <div className={classes.stars4all}>
              <BsStarFill className={classes.r1} />
              <BsStarFill className={classes.r2} />
              <BsStarFill className={classes.r3} />
              <BsStarFill className={classes.r4} />
            </div>
            <div className={classes.starNu}>(1988)</div>
          </div>

          <div className={classes.star3Container}>
            <div className={classes.star3}>3 Star</div>

            <div className={classes.stars3all}>
              <BsStarFill className={classes.r1} />
              <BsStarFill className={classes.r2} />
              <BsStarFill className={classes.r3} />
            </div>
            <div className={classes.starNu}>(123)</div>
          </div>

          <div className={classes.star2Container}>
            <div className={classes.star5}>2 Star</div>

            <div className={classes.stars2all}>
              <BsStarFill className={classes.r1} />
              <BsStarFill className={classes.r2} />
            </div>
            <div className={classes.starNu}>(11)</div>
          </div>

          <div className={classes.star1Container}>
            <div className={classes.star5}>1 Star</div>

            <div className={classes.stars1all}>
              <BsStarFill className={classes.r1} />
            </div>
            <div className={classes.starNu}>(111)</div>
          </div>
        </div> */}
    </div>
  );
}
export default Rateing;
