import React, { createContext, useContext, useState } from "react";

const questions = [
  {
    id: 1,
    questionText: "Who set the Olympic record for the 100m dash in 2012?",
    options: ["Usain Bolt", "Justin Gatlin", "Tyson Gay", "Asafa Powell"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    questionText:
      "When was Michael Phelps last named male World Swimmer of the Year?",
    options: ["2012", "2014", "2016", "2018"],
    correctAnswerIndex: 2,
  },
];

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const submitAnswer = (questionId, answerIndex) => {
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }

    if (question.options[answerIndex] === undefined) {
      throw new Error(
        `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
      );
    }

    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      },
    ]);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex + 1 === questions.length) {
      setQuizOver(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const restart = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizOver(false);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        answers,
        currentQuestionIndex,
        quizOver,
        submitAnswer,
        goToNextQuestion,
        restart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
