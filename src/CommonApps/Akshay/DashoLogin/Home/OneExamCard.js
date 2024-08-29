

import classes from "./ExamBoxSlide.module.css";

const OneExamCard=(props)=>{



return  <div className={classes.card}>
             <img
               src={props.card.image}
               className={classes.img}
                  />
              <div className={classes.title}>{props.card.title}</div>
              <div className={classes.description1}>{props.card.description}</div>
              <div className={classes.ViewToppersBtn}>{props.card.viewDetails}</div>
          </div>







}

export default OneExamCard;
