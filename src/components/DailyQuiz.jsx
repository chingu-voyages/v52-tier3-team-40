import React, { useState, useEffect } from "react";
import quizData from "../data/quizData.json";

const DailyQuiz = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const [quizDayIndex, setQuizDayIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [progress, setProgress] = useState(0);

  // Unlocks quizzes based on the system's current date
  useEffect(() => {
    const today = new Date().toLocaleDateString(); // Format: MM/DD/YYYY
    const lastCompletedDate = localStorage.getItem("quizLastCompletedDate");

    if (lastCompletedDate !== today) {
      const nextDay = currentDay + 1;
      setCurrentDay(nextDay < quizData.length ? nextDay : currentDay);
      setQuizDayIndex(nextDay - 1); // Set the active quiz to the latest unlocked day
      localStorage.setItem("quizLastCompletedDate", today);
    }
  }, [currentDay]);

  const currentQuiz = quizData[quizDayIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  const handleAnswer = (selected, correct) => {
    setSelectedAnswer(selected);
    if (selected === correct) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setProgress(((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100);
    } else {
      setProgress(100);
      alert(`Quiz completed! Your score is ${score}/${currentQuiz.questions.length}`);
    }
  };

  return (
    <div className="w-full max-w-7xl px-4 py-6 bg-gray-800 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Daily Quiz - Day {quizDayIndex + 1}</h2>
      <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div>
        <p className="font-semibold mb-4">{currentQuestion.question}</p>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option, currentQuestion.answer)}
            className={`block w-full py-2 px-4 rounded mb-2 ${
              showAnswer
                ? option === currentQuestion.answer
                  ? "bg-green-500 text-white"
                  : option === selectedAnswer
                  ? "bg-red-500 text-white"
                  : "bg-gray-300"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
        {showAnswer && (
          <button
            onClick={handleNextQuestion}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentQuestionIndex < currentQuiz.questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DailyQuiz;