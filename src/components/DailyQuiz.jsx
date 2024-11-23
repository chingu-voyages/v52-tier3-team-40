import React, { useState, useEffect } from "react";
import quizData from "../data/quizData.json";

const DailyQuiz = () => {
  const [currentDay, setCurrentDay] = useState(0); 
  const [quizDayIndex, setQuizDayIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false); 
  const [currentDate, setCurrentDate] = useState("");

  // Unlocks quizzes based on the system's current date
  useEffect(() => {
    const today = new Date().toLocaleDateString(); // Format: MM/DD/YYYY
    setCurrentDate(today);

    // Get last completed date from localStorage
    const lastCompletedDate = localStorage.getItem("quizLastCompletedDate");

    if (lastCompletedDate !== today) {
      const nextDay = currentDay + 1;
      setCurrentDay(nextDay < quizData.length ? nextDay : currentDay);
      setQuizDayIndex(nextDay - 1); // Set the active quiz to the latest unlocked day
      localStorage.setItem("quizLastCompletedDate", today);
    }
  }, [currentDay]);

  const handleAnswer = (selected, correct) => {
    if (selected === correct) {
      setScore(score + 1); // Increase score for correct answers
    }
  };

  const handleRetry = () => {
    setScore(0);
    setShowResults(false);
  };

  const handleNextDay = () => {
    setShowResults(false);
    setScore(0);
    const nextDay = quizDayIndex + 1;

    if (nextDay < quizData.length) {
      setQuizDayIndex(nextDay); // Unlock the next quiz
    } else {
      alert("No more quizzes available! Check back tomorrow.");
    }
  };

  const currentQuiz = quizData[quizDayIndex];

  return (
    <div className="w-full px-4 py-6 bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Daily Quiz - Day {quizDayIndex + 1}</h2>
      {showResults ? (
        <div>
          <p className="text-lg font-semibold mb-4">
            Your Score: {score}/{currentQuiz.questions.length}
          </p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 mr-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry Quiz
          </button>
          <button
            onClick={handleNextDay}
            disabled={quizDayIndex >= currentDay - 1}
            className={`px-4 py-2 ${
              quizDayIndex >= currentDay - 1
                ? "bg-gray-400 text-gray-800"
                : "bg-blue-500 text-white hover:bg-blue-600"
            } rounded`}
          >
            Next Quiz
          </button>
        </div>
      ) : (
        <div>
          {currentQuiz.questions.map((q, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold mb-2">{q.question}</p>
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleAnswer(option, q.answer);
                    if (index === currentQuiz.questions.length - 1) {
                      setShowResults(true);
                    }
                  }}
                  className="block w-full py-2 px-4 bg-gray-300 rounded mb-2 hover:bg-gray-400"
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;
