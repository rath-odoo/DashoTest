import classes from "./Faqlist.module.css";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

function Faqlist() {
  const initialData = [
    {
      question: "1. What is Hello Toppers?",
      answer:
        "Hello Toppers is a platform that connects students who are preparing different competitive exams with top rankers for personalized, one-on-one mentoring sessions. Our topper mentors are high-achieving individuals who have excelled in various exams with top ranking and are here to provide guidance and support to help you achieve competitive exam success.",
    },
    {
      question: "2. How do I sign up for a mentoring session?",
      answer:
        "Signing up is easy! Simply create an account on our platform, browse through our list of top-ranked mentors, and choose the one that matches your exam category and schedule. Click on their profile to book a session.",
    },

    {
      question: "3. How does the mentoring session work?",
      answer:
        "The mentoring session is conducted through a live, interactive online video call. During the session, you can ask questions, discuss specific topics, and receive personalized advice and strategies from the mentor to help you excel in your exams.",
    },

    {
      question: "4. What subjects and exams do the mentors cover?",
      answer:
        "Our mentors cover all the queries related to how to successfully achieve success in different competitive exams. You can explore the profiles of our mentors to see their areas of expertise.",
    },

    {
      question: "5. Can I choose the topper mentor I want to work with?",
      answer:
        "Yes, you have the freedom to choose the mentor that best suits your needs. You can view the profiles of our topper mentors, which include their achievements, expertise, and availability. Select the topper mentor that aligns with your goals.",
    },

    {
      question: "6. What if I can't attend a live session?",
      answer:
        "If you can't attend a live session, don't worry! All mentoring sessions are recorded, and you can access them at your convenience. This way, you won't miss out on any valuable insights or advice.",
    },

    {
      question: "7. Is there a cost associated with the mentoring sessions?",
      answer:
        "Yes, there is a fee for booking a mentoring session. The cost varies depending on the mentor's expertise and availability. You can find the pricing details on each topper mentor's profile.",
    },

    {
      question:
        "8. What if I have specific questions or topics I want to discuss during the session?",
      answer:
        "That's great! Our mentoring sessions are designed for personalized guidance. Feel free to come prepared with specific questions or topics you'd like to cover, and the mentor will tailor the session to address your needs.",
    },

    {
      question: "9. How do I prepare for a mentoring session?",
      answer:
        "To make the most of your session, review any relevant materials or topics beforehand. Jot down any questions or areas you'd like to focus on. Be ready to engage and participate actively during the session.      ",
    },

    {
      question: "10. What if I need to reschedule or cancel a session?",
      answer:
        "If you need to reschedule or cancel a session, you can do so from your account dashboard. Please note that there may be specific policies regarding rescheduling and cancellations, so be sure to check the terms and conditions.",
    },
  ];

  const [faqData, setFaqData] = useState(initialData);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const toggleAnswer = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  return (
    <div className={classes.faqContainer}>
      <div className={classes.mainTitleContainer}>
        Frequently Asked Questions
      </div>

      <div className={classes.mainContainer}>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={classes.questionsContainer}
            onClick={() => toggleAnswer(index)}
          >
            <div className={classes.queContainer}>
              <div className={classes.que1}>{faq.question}</div>
              <BsChevronDown className={classes.arrow} />
            </div>

            {selectedQuestionIndex === index && (
              <div className={classes.ans1}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faqlist;
