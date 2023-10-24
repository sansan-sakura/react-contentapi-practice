import useQuizStore from "../stores/quizStore";
import he from "he";
import styles from "./SubmitPage.module.css";

export const SubmitPage = () => {
  const previousAnswers = useQuizStore((state) => state.previousAnswers);
  console.log(previousAnswers);
  return (
    <div>
      <h2>Your Answers</h2>
      {previousAnswers.map((answer) => (
        <li key={answer.question}>
          <p>{he.decode(answer.question)}</p>
          <span style={{ color: answer.isCorrrect ? `red` : "green" }}>
            {he.decode(answer.answer)}
          </span>
          <span>{he.decode(answer.correctAnswer)}</span>
        </li>
      ))}
    </div>
  );
};
