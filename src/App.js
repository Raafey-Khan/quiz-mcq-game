import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import QuizInstructions from "./components/quiz/QuizInstructions";
import Play from "./components/quiz/Play";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/instructions" element={<QuizInstructions />} />
        <Route path="/play/Quiz" element={<Play />} />
      </Routes>
    </Router>
  );
}

export default App;
