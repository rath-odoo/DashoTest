import React, { useState, useEffect } from "react";
import classes from "./ToppersCardSlide.module.css";

import Exam from "./p2.jpg";

// Import your images here
import cardImage1 from "./p2.jpg";
import cardImage2 from "./p2.jpg";
import cardImage3 from "./p2.jpg";
import cardImage4 from "./p2.jpg";

const cardsData = [
  {
    title: "Teena Dhabi",
    description: " UPSC - 2020",
    description2: "AIR-1",
    viewDetails: "View Profile",
    color: "white",
    image: cardImage1,
  },
  {
    title: "Online GATE Mentoring",
    description: "2 topper’s",
    description2: "Online Cat GATE",
    viewDetails: "View Profile",
    color: "white",
    image: cardImage2,
  },
  {
    title: "Online IITJEE Mentoring",
    description: "2 topper’s",
    description2: "Online CAT GATE",
    viewDetails: "View Profile",
    color: "white",
    image: cardImage3,
  },
  {
    title: "Online CAT Mentoring",
    description: "2 topper’s",
    description2: "Online CAT GATE",
    viewDetails: "View Profile",
    color: "white",
    image: cardImage4,
  },
];

const ToppersCardSlide = () => {
  const [index, setIndex] = useState(0);

  const handleDotClick = (dotIndex) => {
    setIndex(dotIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
    }, 3000); // Adjust the interval duration (e.g., every 3 seconds)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classes.slider}>
      <div className={classes.cards}>

       <div className={classes.card}>
            <img
              src={cardsData[0].image}
              className={classes.img}
            />
            <div className={classes.title}>{cardsData[0].title}</div>
            <div className={classes.description1}>{cardsData[0].description}</div>
            <div className={classes.description2}>{cardsData[0].description2}</div>
            <div className={classes.ViewToppersBtn}>{cardsData[0].viewDetails}</div>
       </div>

       <div className={classes.card}>
            <img
              src={cardsData[0].image}
              className={classes.img}
            />
            <div className={classes.title}>{cardsData[0].title}</div>
            <div className={classes.description1}>{cardsData[0].description}</div>
            <div className={classes.description2}>{cardsData[0].description2}</div>
            <div className={classes.ViewToppersBtn}>{cardsData[0].viewDetails}</div>
       </div>

       <div className={classes.card}>
            <img
              src={cardsData[0].image}
              className={classes.img}
            />
            <div className={classes.title}>{cardsData[0].title}</div>
            <div className={classes.description1}>{cardsData[0].description}</div>
            <div className={classes.description2}>{cardsData[0].description2}</div>
            <div className={classes.ViewToppersBtn}>{cardsData[0].viewDetails}</div>
       </div>



















      </div>



      <div className={classes.indicatorDots}>
        {cardsData.map((_, i) => (
          <div
            key={i}
            className={`${classes.dot} ${i === index ? classes.activeDot : ""}`}
            onClick={() => handleDotClick(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ToppersCardSlide;
