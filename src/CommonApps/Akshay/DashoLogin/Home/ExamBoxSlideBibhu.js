import React, { useState, useEffect } from "react";
import classes from "./ExamBoxSlide.module.css";
import { useMediaPredicate } from "react-media-hook";
// Import your images here
import cardImage1 from "./cat.jpg";
import cardImage2 from "./gate.jpg";
import cardImage3 from "./iit.jpg";
import cardImage4 from "./neet.jpg";

import OneExamCard from './OneExamCard';


const cardsData = [
  {
    title: "Online CAT Mentoring",
    description: "4 toppers",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage1,
  },
  {
    title: "Online GATE Mentoring",
    description: "1 topper",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage2,
  },
  {
    title: "Online JEE Mentoring",
    description: "2 toppers",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage3,
  },
  {
    title: "Online NEET Mentoring",
    description: "3 topper",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage4,
  },
];






const ExamBoxSlide = (props) => {

    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);

     return () => clearInterval(interval);
  }, []);
	    

  const [translationWidth, setTranslationWidth] = useState("400px");

  const smallerThan600px = useMediaPredicate("(max-width: 600px )");






  //style={{ transform: `translateX(${currentIndex * 400}px)` }}

  const dotButtonHandler=(i)=>{

   setCurrentIndex(currentIndex=>i);

  }


  return (
    <div className={classes.slider}>
      <div className={classes.cards}>
      
      <div className={classes.wrapper} style={{ transform: `translateX(${currentIndex * 16.6}%)` }}>
        <div className={classes.child}>
          <OneExamCard card={props.cardsData[0]}/>
	</div>
        <div className={classes.child}>
          <OneExamCard card={props.cardsData[1]}/>
        </div>
       
	<div className={classes.child}>
          <OneExamCard card={props.cardsData[2]}/>
        </div>

        <div className={classes.child}>
          <OneExamCard card={props.cardsData[3]}/>
        </div>

        <div className={classes.child}>
          <OneExamCard card={props.cardsData[0]}/>
        </div>
        <div className={classes.child}>
          <OneExamCard card={props.cardsData[1]}/>
        </div>
      </div> 





      <div className={classes.wrapperMobile} style={{ transform: `translateX(${currentIndex * 16.6}%)` }}>
        <div className={classes.childMobile}>
          <OneExamCard card={props.cardsData[0]}/>
        </div>
        <div className={classes.childMobile}>
          <OneExamCard card={props.cardsData[1]}/>
        </div>

        <div className={classes.childMobile}>
          <OneExamCard card={props.cardsData[2]}/>
        </div>

        <div className={classes.childMobile}>
          <OneExamCard card={props.cardsData[3]}/>
        </div>

        <div className={classes.childMobile}>
          <OneExamCard card={props.cardsData[0]}/>
        </div>
        <div className={classes.childMobile}>
          <OneExamCard card={props.cardsData[1]}/>
        </div>
      </div>






      </div>
      <div className={classes.indicatorDots}>
        {cardsData.map((_, i) => (
          <button
	    type="button"
            key={i}
            className={`${classes.dot} ${i === currentIndex ? classes.activeDot : ""}`}
            onClick={()=>dotButtonHandler(i)}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default ExamBoxSlide;
