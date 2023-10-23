import { useQuiz } from "../context/QuizContext"; // Adjust the path accordingly

export const CurrentQuestionUseContext = () => {
  const { questions, currentQuestionIndex } = useQuiz();
  const question = questions[currentQuestionIndex];

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div className="managed-component">
      <h2>Using Context API</h2>
      <h1>Question: {question.questionText}</h1>
    </div>
  );
};
