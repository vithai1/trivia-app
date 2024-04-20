import React, { useEffect, useState } from "react";
import "./../App.css";

const TriviaApp = () => {
  const [questions, setQuestions] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (index, selectedAnswer) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [index]: selectedAnswer
    }));
  };

  const handleSubmit = () => {
    let newFeedback = {};
    Object.keys(selectedAnswers).forEach(index => {
      const correctAnswer = questions[index].correctAnswer;
      const isCorrect = selectedAnswers[index] === correctAnswer;
      newFeedback[index] = isCorrect ? "Correct" : "Incorrect";
    });
    setFeedback(newFeedback);
  };

  return (
    <>
      <h1>Trivia App</h1>
      {questions &&
        questions.map((question, index) => (
          <div key={index}>
            <h2>{question.question.text}</h2>
            <select
              value={selectedAnswers[index] || ""}
              onChange={e => handleAnswerSelect(index, e.target.value)}
            >
              <option value="" disabled>Select an answer</option>
              {question.incorrectAnswers.map((ans, ansIndex) => (
                <option key={ansIndex}>{ans}</option>
              ))}
              <option>{question.correctAnswer}</option>
            </select>
            <p className={feedback[index]}>{feedback[index]}</p>
          </div>
        ))}
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default TriviaApp;
