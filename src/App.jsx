import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar, { getRandomQuestion } from "./components/Navbar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import AddNew from "./pages/AddNew";
import QuizPage from "./pages/QuizPage";
import Edit from "./pages/Edit";

import { fetchPost } from "./javascript/script";

function App() {

  // Initial question
  const initialQuestion = getRandomQuestion();

  // Question currently being displayed
  const [selectedQuestion, setSelectedQuestion] = useState(initialQuestion);

  // History
  const [historyArr, setHistoryArr] = useState([initialQuestion]);
  const [historyIndex, setHistoryIndex] = useState(0);

  function handleNext() {
    if (historyIndex < historyArr.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setSelectedQuestion(historyArr[nextIndex]);
    } else {
      const newQuestion = getRandomQuestion();

      const newHistory = [...historyArr, newQuestion];

      setHistoryArr(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setSelectedQuestion(newQuestion);
    }
  }

  function handleBack() {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSelectedQuestion(historyArr[newIndex]);
    }
  }

  // Theme
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  window.speechSynthesis.cancel();

  return (
    <div
      className={`container ${darkMode
          ? "bg-gray-700 text-gray-100"
          : "bg-gray-100 text-gray-900"
        }`}
    >
      <Router>


        <Switch>

          <Route exact path="/">
            <Navbar
              setSelectedQuestion={setSelectedQuestion}
              darkMode={darkMode}
              handleBack={handleBack}
              handleNext={handleNext}
              historyIndex={historyIndex}
            />
            <Home
              firstQuestion={selectedQuestion}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              handleBack={handleBack}
              handleNext={handleNext}
              historyIndex={historyIndex}
            />
          </Route>


          <Route path="/favorites">
            <Navbar
              setSelectedQuestion={setSelectedQuestion}
              darkMode={darkMode}
              handleBack={handleBack}
              handleNext={handleNext}
              historyIndex={historyIndex}
            />
            <Favorites
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </Route>

          <Route path="/search">
            <Navbar
              setSelectedQuestion={setSelectedQuestion}
              darkMode={darkMode}
              handleBack={handleBack}
              handleNext={handleNext}
              historyIndex={historyIndex}
            />
            <Search
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </Route>

          <Route path="/add-new">
            <AddNew
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              fetchPost={fetchPost}
            />
          </Route>

          <Route path="/edit">
            <Edit
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              question={historyArr[historyIndex]}
              fetchPost={fetchPost}
            />
          </Route>

          <Route path="/quiz">
            <Navbar
              setSelectedQuestion={setSelectedQuestion}
              darkMode={darkMode}
              handleBack={handleBack}
              handleNext={handleNext}
              historyIndex={historyIndex}
            />
            <QuizPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;