import Quiz from "../components/Quiz";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import questions from "../javascript/quiz";

export default function QuizPage({ darkMode, setDarkMode }) {
  ///console.log(questions)
  

    return (
    <>
    <Header header="Quiz"
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

    <main className="scroll-content mx-3 p-2 flex bg-gray-200 dark:bg-gray-900  inset-shadow-sm shadow-sm rounded-xl">
      <Quiz questions={questions} />
    </main>

    </>
  );
}