import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import AddNew from "./pages/AddNew";
import QuizPage from "./pages/QuizPage";
import Edit from "./pages/Edit";
const fetch_url = "https://api.npoint.io/facb5749d433f9be2b92";
import { fetchPost } from "./javascript/script";

function App() {
  /* FetchGet data from api  */
  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(fetch_url)
      .then((res) => res.json())
      .then((data) => setData(data.questions))
      .catch((error) => console.error(error));
  }, []);


  const getRandomQuestion = () => {
    const questions = data;
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
  };





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
              /* handleBack and handleNext are passed through Home component to manage the BottomNavbar on lg screen */
              handleBack={handleBack}
              handleNext={handleNext}
              historyIndex={historyIndex}
              data={data}
              url={fetch_url}

            />
          </Route>


          <Route path="/favorites">
            <Navbar
              darkMode={darkMode}
            />
            <Favorites
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              data={data}
              url={fetch_url}
            />
          </Route>

          <Route path="/search">
           <Navbar
              darkMode={darkMode}
            />
            <Search
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              data={data}
              url={fetch_url}
            />
          </Route>

          <Route path="/add-new">
            <AddNew
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            /* fetchPost={fetchPost} */
            />
          </Route>

          <Route path="/edit">
            <Edit
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              question={historyArr[historyIndex]}
            /* fetchPost={fetchPost} */
            />
          </Route>

          <Route path="/quiz">
            <Navbar
              darkMode={darkMode}
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