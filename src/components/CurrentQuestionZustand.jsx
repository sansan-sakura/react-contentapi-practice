import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import he from "he";
import useQuizStore from "../stores/quizStore"; // Adjust the path accordingly

export const CurrentQuestionZustand = () => {
  const { questions, currentQuestionIndex, goToNextQuestion, quizOver, submitAnswer } =
    useQuizStore((state) => ({
      questions: state.questions,
      currentQuestionIndex: state.currentQuestionIndex,
      showAnswer: state.showAnswer,
      goToNextQuestion: state.goToNextQuestion,
      quizOver: state.quizOver,
      submitAnswer: state.submitAnswer,
    }));

  const [choice, setChoice] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = questions[currentQuestionIndex];
  const answers = [question.correct_answer, ...question.incorrect_answers];
  const answerStartIndex = Math.floor(Math.random() * answers.length);
  const unOrderedAnswers = [
    ...answers.slice(0, answerStartIndex),
    ...answers.slice(answerStartIndex),
  ];

  useEffect(() => {
    setChoice("");
    setIsAnswered(false);
  }, [question]);

  function handleClick() {
    if (choice === "") return alert("Please chose one");
    submitAnswer(currentQuestionIndex, choice, unOrderedAnswers);
    if (question.correct_answer === choice) {
      alert("correct");

      setIsCorrect(true);
    }
    setIsAnswered(true);
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div className="managed-component">
      <h2>Using Zustand</h2>
      <h3>
        {currentQuestionIndex + 1}/{questions.length}
      </h3>
      <h1>Question: {he.decode(question.question)}</h1>

      <ol>
        {unOrderedAnswers.map((answer, index) => (
          <li key={answer}>
            <label
              htmlFor={answer}
              style={{
                color:
                  isAnswered && index === unOrderedAnswers.indexOf(question.correct_answer)
                    ? "red"
                    : "",
              }}
            >
              {he.decode(answer)}
            </label>
            <input
              type="radio"
              value={answer}
              id={answer}
              name={`question ${currentQuestionIndex}`}
              onChange={(e) => setChoice(e.target.value)}
            />
          </li>
        ))}
      </ol>
      {!quizOver ? (
        isAnswered ? (
          <button onClick={() => goToNextQuestion()}>Next Question</button>
        ) : (
          <button onClick={handleClick}>Check Answer</button>
        )
      ) : (
        <Link to="/submit">Finished</Link>
      )}
    </div>
  );
};
