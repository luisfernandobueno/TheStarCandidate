import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import AddNew from "./pages/AddNew";
import QuizPage from "./pages/QuizPage";
import Edit from "./pages/Edit";
import Resumee from "./pages/Resumee";

//const fetch_url = "https://api.npoint.io/facb5749d433f9be2b92";
const fetch_url = "http://192.168.1.45:3000";

function App() {


  async function deleteQuestion(id) {
    try {
      const response = await fetch(`${fetch_url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      const res = await fetch(fetch_url);
      const json = await res.json();

      const updatedData = json.questions;

      setData(updatedData);

      if (updatedData.length === 0) {
        setSelectedQuestion(null);
        setHistoryArr([]);
        setHistoryIndex(0);
        return;
      }

      // Pick a new question automatically
      const random =
        updatedData[Math.floor(Math.random() * updatedData.length)];

      setSelectedQuestion(random);

      setHistoryArr([random]);
      setHistoryIndex(0);

    } catch (error) {
      console.error(error);
    }
  }

  const [data, setData] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [historyArr, setHistoryArr] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  /* ============================================================
      Fetch
  ============================================================ */

  useEffect(() => {
    fetch(fetch_url)
      .then((res) => res.json())
      .then((json) => {
        setData(json.questions);

        if (json.questions.length > 0 && !selectedQuestion) {
          const random =
            json.questions[Math.floor(Math.random() * json.questions.length)];

          setSelectedQuestion(random);
          setHistoryArr([random]);
          setHistoryIndex(0);
        }
      })
      .catch(console.error);
  }, []);

  /* ============================================================
      Refresh after POST / PUT / DELETE
  ============================================================ */
async function refreshData(questionToShow = null) {

  const res = await fetch(fetch_url);
  const json = await res.json();

  const updatedData = json.questions;

  setData(updatedData);


  if (updatedData.length === 0) {
    setSelectedQuestion(null);
    setHistoryArr([]);
    setHistoryIndex(0);
    return;
  }


  let question;


  if (questionToShow) {

    question = updatedData.find(
        (q) => q.id === questionToShow.id
    );

}

  if (!question) {
    question = updatedData[0];
  }


  setSelectedQuestion(question);

  setHistoryArr([question]);

  setHistoryIndex(0);

}

  /* ============================================================
      Random
  ============================================================ */

  function getRandomQuestion() {
    if (!data.length) return null;

    const index = Math.floor(Math.random() * data.length);
    return data[index];
  }

  function handleNext() {
    if (!data.length) return;

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

  /* ============================================================
      Theme
  ============================================================ */

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

  /* ============================================================
      Modal
  ============================================================ */

  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
            <Home
              firstQuestion={selectedQuestion}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              historyIndex={historyIndex}
              data={data}
              setData={setData}
              url={fetch_url}
              open={open}
              onClose={setOpen}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              deleteQuestion={deleteQuestion}
            />

            <Navbar
              setSelectedQuestion={setSelectedQuestion}
              darkMode={darkMode}
              handleBack={handleBack}
              handleNext={handleNext}
              historyIndex={historyIndex}
              favorite={isFavorite}
            />
          </Route>

          <Route path="/favorites">
            <Favorites
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              fetch_url={fetch_url}
            />
          </Route>

          <Route path="/search">
            <Search
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              fetch_url={fetch_url}
            />
          </Route>

          <Route path="/add-new">
            <AddNew
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              fetch_url={fetch_url}
              data={data}
              setData={setData}
              refreshData={refreshData}
              question={{}}
            />
          </Route>

          <Route path="/edit">
            <Edit
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              question={selectedQuestion}
              fetch_url={fetch_url}
              data={data}
              setData={setData}
              refreshData={refreshData}
            />
          </Route>

          <Route path="/quiz">
            <QuizPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </Route>

          <Route path="/resumee">
            <Resumee
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