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
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Unlocks quizzes based on the system's current date
  useEffect(() => {
    const today = new Date().toLocaleDateString(); // Format: MM/DD/YYYY
    const lastCompletedDate = localStorage.getItem("quizLastCompletedDate");

    if (lastCompletedDate !== today) {
      const nextDay = currentDay + 1;
      setCurrentDay(nextDay < quizData.length ? nextDay : currentDay);
      setQuizDayIndex(nextDay < quizData.length ? nextDay - 1 : quizDayIndex); // Set the active quiz to the latest unlocked day
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
      setQuizCompleted(true);
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setProgress(0);
    setQuizCompleted(false);
  };

  const handleNextQuiz = () => {
    const nextQuizIndex = (quizDayIndex + 1) % quizData.length;
    setQuizDayIndex(nextQuizIndex);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setProgress(0);
    setQuizCompleted(false);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl px-2 sm:px-8 pt-10 pb-20 bg-gray-900 rounded-3xl shadow-lg">
      <div className="self-center text-center pb-6">
        <h2 className="text-3xl font-bold">Daily Quiz - Day {quizDayIndex + 1}</h2>
        <hr className="border-b-teal-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
        <p className="text-gray-400 uppercase ">
          Test your space knowledge with our daily quiz
        </p>
      </div>

      <div className="container mx-auto md:px-24 xl:px-64 pb-4">
        <h2>Progress: {progress}%</h2>
        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-teal-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {quizCompleted ? (
        <div className="flex flex-col items-center">
          <p className="text-xl text-center font-bold mb-4">
            Quiz completed! Your score is {score}/{currentQuiz.questions.length}.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRetryQuiz}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Retry Quiz
            </button>
            <button
              onClick={handleNextQuiz}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Next Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-4 text-xl">{currentQuestion.question}</p>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option, currentQuestion.answer)}
              className={`block w-3/4 py-2 px-4 rounded mb-2 ${
                showAnswer
                  ? option === currentQuestion.answer
                    ? "bg-green-500 text-white"
                    : option === selectedAnswer
                    ? "bg-red-500 text-white"
                    : "bg-gray-400"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
          {showAnswer && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              {currentQuestionIndex < currentQuiz.questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;
