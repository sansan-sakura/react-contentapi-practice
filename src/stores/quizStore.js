import { create } from "zustand";
import data from "../quizData.json";

const questions = data.results.slice(0, 5);

const useQuizStore = create((set) => ({
  questions,
  previousAnswers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  answerIndex: 0,

  submitAnswer: (questionId, answer, answers) => {
    const question = questions.find((q) => q.id === questionId + 1);
    if (!question) {
      throw new Error(
        "Could not find question! Check to make sure you are passing the question id correctly."
      );
    }
    set((state) => ({
      previousAnswers: [
        ...state.previousAnswers,
        {
          questionId,
          answer,
          question: question.question,
          answers,
          correctAnswer: question.correct_answer,
          isCorrect: question.correct_answer === answer,
        },
      ],
    }));
  },

  goToNextQuestion: () => {
    set((state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        return { quizOver: true };
      } else {
        return { currentQuestionIndex: state.currentQuestionIndex + 1 };
      }
    });
  },

  restart: () => {
    set({
      answers: [],
      currentQuestionIndex: 0,
      quizOver: false,
    });
  },
}));

export default useQuizStore;
