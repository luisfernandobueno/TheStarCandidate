
import Header from "../components/Header";
import api from "../javascript/api.json";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const Favorites = ({ darkMode, setDarkMode }) => {
    
    const history = useHistory();
    const questions = api.questions;
    
    const [search, setSearch] = useState("")
    const filteredQuestions = questions.filter(
        item =>
            item.favorite &&
            item.question.toLowerCase().includes(search.toLowerCase())
    );

    const saveQuestionLS = (question) => {
        localStorage.setItem(
            "questionSearched",
            JSON.stringify(question)
        );

        /* LATER ON, WHEN YOU GET THE QUESTION TO DISPLAY IT IN THE HOME SCREEN, USE THIS LINE:
        const question = JSON.parse(
    localStorage.getItem("questionSearched")
); */
        console.log(question)
        history.push("/");
    }


    return (
        <>
            <Header header="Favorites" 
            darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <section className="search mx-3 mb-1 flex bg-gray-200 dark:bg-gray-900 rounded-full  inset-shadow-sm shadow-sm">
                <input
                    type="text"
                    placeholder="Search your question..."
                    className="search-input p-3 flex-1 rounded-full text-xs text-sky-500 font-bold "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="ml-1 px-2 py-1   rounded-full">
                    <span className="material-symbols-outlined">
                        tune
                    </span>
                </button>
                
            </section>
            <section className="scroll-content mx-3 p-1 bg-gray-100  dark:bg-gray-900 rounded-xl  inset-shadow-sm shadow-sm">
                <div className="">
                    {
                        filteredQuestions.map(item => (
                            <div key={item.question} onClick={() => saveQuestionLS(item)} className="m-2 p-1 rounded-lg bg-gray-200  dark:bg-gray-700  inset-shadow-sm shadow-sm">
                                <a href="#">{item.question}</a>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}





export default Favorites;