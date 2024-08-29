// import { useSprings, animated } from "react-spring";
// import classes from "./ExamBoxMain.module.css";
// import youtubeImage from "./faq.jpg";

// const cards = [
//   {
//     title: "Akshay Bhasme",
//     description: "This is the Description 1",
//     imagePath: youtubeImage,
//   },
//   {
//     title: "Akshay Bhasme",
//     description: "This is the Description 1",
//     imagePath: youtubeImage,
//   },
//   {
//     title: "Akshay Bhasme",
//     description: "This is the Description 1",
//     imagePath: youtubeImage,
//   },
//   {
//     title: "Akshay Bhasme",
//     description: "This is the Description 1",
//     imagePath: youtubeImage,
//   },
//   {
//     title: "Akshay Bhasme",
//     description: "This is the Description 1",
//     imagePath: youtubeImage,
//   },
//   // Add more cards with different image paths
// ];

// const ExamBoxMain = () => {
//   const [index, setIndex] = React.useState(0);

//   const springs = useSprings(
//     cards.length,
//     cards.map((_, i) => ({
//       transform: `translateX(${(i - index) * 100}%)`, // Adjust the width of your cards
//     }))
//   );

//   React.useEffect(() => {
//     const intervalId = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % cards.length);
//     }, 3000); // Adjust the interval duration as needed (e.g., every 3 seconds)

//     return () => clearInterval(intervalId);
//   }, [cards.length]);

//   return (
//     <div className={classes.parent}>
//       {springs.map((props, cardIndex) => (
//         <animated.div
//           key={cardIndex}
//           className={classes.card}
//           style={{ ...props }}
//         >
//           <div className={classes.img}>
//             <img
//               src={cards[cardIndex].imagePath}
//               alt={`Card ${cardIndex + 1}`}
//             />
//           </div>
//           <div className={classes.title}>{cards[cardIndex].title}</div>
//           <div className={classes.description}>
//             {cards[cardIndex].description}
//           </div>
//         </animated.div>
//       ))}
//     </div>
//   );
// };

// export default ExamBoxMain;
