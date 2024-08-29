import React, { useState, useEffect } from "react";
import classes from "./ExamBoxSlide.module.css";

// Import your images here
import cardImage1 from "./cat.jpg";
import cardImage2 from "./cat.jpg";
import cardImage3 from "./cat.jpg";
import cardImage4 from "./cat.jpg";

const cardsData = [
  {
    title: "Online Cat Mentoring",
    description: "4 toppers",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage1,
  },
  {
    title: "Online Cat Mentoring",
    description: "1 topper",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage2,
  },
  {
    title: "Online Cat Mentoring",
    description: "2 toppers",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage3,
  },
  {
    title: "Online Cat Mentoring",
    description: "3 topper",
    viewDetails: "View Toppers",
    color: "white",
    image: cardImage4,
  },
];

const ExamBoxSlide = () => {
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
	{/*
      <div className={classes.cards}>
        {cardsData.map((card, i) => (
          <div
            key={i}
            className={`${classes.card} ${
              i === index ? classes.activeCard : ""
            }`}
            style={{
              backgroundColor: card.color,
              transform: `translateX(${-index * 220}px)`, // Adjust the width of your cards
            }}
          >
            <img
              src={card.image}
              className={classes.img}
              alt={`Card ${i + 1}`}
            />
            <div className={classes.title}>{card.title}</div>
            <div className={classes.description1}>{card.description}</div>
            <div className={classes.ViewToppersBtn}>{card.viewDetails}</div>
          </div>
        ))}
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
      */}
    </div>
  );
};

export default ExamBoxSlide;
