import useQuizStore from "../stores/quizStore"; // Adjust the path accordingly

export const CurrentQuestionZustand = () => {
  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex
  );
  const question = questions[currentQuestionIndex];

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <div className="managed-component">
      <h2>Using Zustand</h2>
      <h1>Question: {question.questionText}</h1>
    </div>
  );
};
