import { CurrentQuestionZustand } from "./components/CurrentQuestionZustand";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SubmitPage } from "./components/SubmitPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CurrentQuestionZustand />} />
        <Route path="/submit" element={<SubmitPage />} />
      </Routes>
    </BrowserRouter>
  );
};
//
