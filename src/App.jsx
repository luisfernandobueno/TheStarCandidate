
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import AddNew from "./pages/AddNew";
import QuizPage from "./pages/QuizPage";
import Edit from "./pages/Edit";
import Resumee from "./pages/Resumee";

// const fetch_url = "https://api.npoint.io/facb5749d433f9be2b92";
// const fetch_url = "https://thestarcandidate.onrender.com";
const fetch_url = "http://192.168.1.45:3000";

function App() {

    /* ============================================================
       DATA
    ============================================================ */

    const [data, setData] = useState([]);

    const [selectedQuestion, setSelectedQuestion] =
        useState(null);


    /* ============================================================
       HISTORY
    ============================================================ */

    const [historyArr, setHistoryArr] =
        useState([]);

    const [historyIndex, setHistoryIndex] =
        useState(0);


    /* ============================================================
       THEME
    ============================================================ */

    const [darkMode, setDarkMode] = useState(() => {

        return (
            JSON.parse(
                localStorage.getItem("darkMode")
            ) || false
        );

    });


    /* ============================================================
       MODAL
    ============================================================ */

    const [open, setOpen] =
        useState(false);


    /* ============================================================
       FAVORITE
    ============================================================ */

    const [isFavorite, setIsFavorite] =
        useState(false);


    /* ============================================================
       INITIAL FETCH
    ============================================================ */

    useEffect(() => {

        fetch(fetch_url)

            .then((res) => res.json())

            .then((json) => {

                const questions =
                    json.questions || [];


                setData(questions);


                if (questions.length > 0) {

                    /* =================================================
                       SELECT INITIAL QUESTION
                    ================================================= */

                    const random =
                        questions[
                            Math.floor(
                                Math.random() *
                                questions.length
                            )
                        ];


                    /* =================================================
                       CREATE HISTORY IMMEDIATELY

                       The selected question is explicitly placed
                       at index 0 of the history.
                    ================================================= */

                    const initialHistory = [
                        random
                    ];


                    /* =================================================
                       SET INITIAL STATE
                    ================================================= */

                    setSelectedQuestion(random);

                    setHistoryArr(initialHistory);

                    setHistoryIndex(0);

                    setIsFavorite(
                        Boolean(random.favorite)
                    );


                    /* =================================================
                       LOG THE ACTUAL ARRAY

                       We log initialHistory instead of historyArr
                       because React state updates are asynchronous.
                    ================================================= */

                    /* console.log(
                        "Initial history:",
                        initialHistory
                    );

                    console.log(
                        "Initial selected question:",
                        random
                    ); */

                }

            })

            .catch(console.error);

    }, []);


    /* ============================================================
       THEME
    ============================================================ */

    useEffect(() => {

        localStorage.setItem(
            "darkMode",
            JSON.stringify(darkMode)
        );


        if (darkMode) {

            document.documentElement.classList.add(
                "dark"
            );

        } else {

            document.documentElement.classList.remove(
                "dark"
            );

        }

    }, [darkMode]);


    /* ============================================================
       RANDOM QUESTION
    ============================================================ */

    function getRandomQuestion() {

        if (!data.length) {
            return null;
        }

        const index =
            Math.floor(
                Math.random() * data.length
            );

        return data[index];

    }


    /* ============================================================
       NEXT
    ============================================================ */

    function handleNext() {

        if (!data.length) {
            return;
        }


        /*
         * If there is already a question ahead in history,
         * move forward through the existing history.
         */

        if (
            historyIndex <
            historyArr.length - 1
        ) {

            const nextIndex =
                historyIndex + 1;


            const nextQuestion =
                historyArr[nextIndex];


            setHistoryIndex(nextIndex);

            setSelectedQuestion(
                nextQuestion
            );

            setIsFavorite(
                Boolean(nextQuestion.favorite)
            );

            return;

        }


        /*
         * Otherwise create a new random question.
         */

        const newQuestion =
            getRandomQuestion();


        if (!newQuestion) {
            return;
        }


        const newHistory = [
            ...historyArr,
            newQuestion
        ];


        setHistoryArr(newHistory);

        setHistoryIndex(
            newHistory.length - 1
        );

        setSelectedQuestion(
            newQuestion
        );

        setIsFavorite(
            Boolean(newQuestion.favorite)
        );

    }


    /* ============================================================
       BACK
    ============================================================ */

    function handleBack() {

        if (historyIndex <= 0) {
            return;
        }


        const newIndex =
            historyIndex - 1;


        const previousQuestion =
            historyArr[newIndex];


        setHistoryIndex(newIndex);

        setSelectedQuestion(
            previousQuestion
        );

        setIsFavorite(
            Boolean(previousQuestion.favorite)
        );

    }


    /* ============================================================
       REFRESH DATA
       Used after ADD / EDIT / DELETE
    ============================================================ */

    async function refreshData(
        questionToShow = null
    ) {

        try {

            const res =
                await fetch(fetch_url);


            if (!res.ok) {

                throw new Error(
                    "Failed to refresh data"
                );

            }


            const json =
                await res.json();


            const updatedData =
                json.questions || [];


            setData(updatedData);


            /*
             * Nothing left in the database.
             */

            if (updatedData.length === 0) {

                setSelectedQuestion(null);

                setHistoryArr([]);

                setHistoryIndex(0);

                setIsFavorite(false);

                return;

            }


            let question = null;


            /*
             * If a specific question was supplied,
             * try to find that same question again.
             */

            if (questionToShow) {

                question =
                    updatedData.find(
                        (q) =>
                            q.id ===
                            questionToShow.id
                    );

            }


            /*
             * If it wasn't found, use the first question.
             */

            if (!question) {

                question =
                    updatedData[0];

            }


            /*
             * Create the new history first.
             */

            const newHistory = [
                question
            ];


            /*
             * Update all related state.
             */

            setSelectedQuestion(
                question
            );

            setHistoryArr(
                newHistory
            );

            setHistoryIndex(0);

            setIsFavorite(
                Boolean(question.favorite)
            );


            /*
             * Log the actual newly-created array.
             */

            console.log(
                "History after refresh:",
                newHistory
            );

        } catch (error) {

            console.error(
                "Could not refresh data:",
                error
            );

        }

    }


    /* ============================================================
       DELETE
    ============================================================ */

    async function deleteQuestion(id) {

        try {

            const response =
                await fetch(
                    `${fetch_url}/${id}`,
                    {
                        method: "DELETE"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Delete failed"
                );

            }


            /*
             * Get the updated database after deleting.
             */

            const res =
                await fetch(fetch_url);


            if (!res.ok) {

                throw new Error(
                    "Could not fetch updated data"
                );

            }


            const json =
                await res.json();


            const updatedData =
                json.questions || [];


            setData(updatedData);


            /*
             * Database is now empty.
             */

            if (updatedData.length === 0) {

                setSelectedQuestion(null);

                setHistoryArr([]);

                setHistoryIndex(0);

                setIsFavorite(false);

                return;

            }


            /*
             * Automatically select another question.
             */

            const random =
                updatedData[
                    Math.floor(
                        Math.random() *
                        updatedData.length
                    )
                ];


            /*
             * Put the newly-selected question
             * at the very beginning of history.
             */

            const newHistory = [
                random
            ];


            setSelectedQuestion(
                random
            );

            setHistoryArr(
                newHistory
            );

            setHistoryIndex(0);

            setIsFavorite(
                Boolean(random.favorite)
            );


            /*
             * Log the actual new history array.
             */

            console.log(
                "History after delete:",
                newHistory
            );

        } catch (error) {

            console.error(
                "Could not delete question:",
                error
            );

        }

    }


    /* ============================================================
       APP
    ============================================================ */

    return (

        <Router>

            <div
                className={`
                    container
                    ${
                        darkMode
                            ? "bg-gray-700 text-gray-100"
                            : "bg-gray-100 text-gray-900"
                    }
                `}
            >

                <Switch>

                    {/* ==================================================
                        HOME
                    ================================================== */}

                    <Route exact path="/">

                        <Home

                            firstQuestion={
                                selectedQuestion
                            }

                            darkMode={
                                darkMode
                            }

                            setDarkMode={
                                setDarkMode
                            }

                            historyIndex={
                                historyIndex
                            }

                            historyArr={
                                historyArr
                            }

                            data={
                                data
                            }

                            setData={
                                setData
                            }

                            url={
                                fetch_url
                            }

                            open={
                                open
                            }

                            onClose={
                                setOpen
                            }

                            isFavorite={
                                isFavorite
                            }

                            setIsFavorite={
                                setIsFavorite
                            }

                            deleteQuestion={
                                deleteQuestion
                            }

                            handleBack={
                                handleBack
                            }

                            handleNext={
                                handleNext
                            }

                            setSelectedQuestion={
                                setSelectedQuestion
                            }

                        />

                    </Route>


                    {/* ==================================================
                        FAVORITES
                    ================================================== */}

                    <Route path="/favorites">

                        <Favorites
                            darkMode={
                                darkMode
                            }

                            setDarkMode={
                                setDarkMode
                            }

                            fetch_url={
                                fetch_url
                            }
                        />

                    </Route>


                    {/* ==================================================
                        SEARCH
                    ================================================== */}

                    <Route path="/search">

                        <Search
                            darkMode={
                                darkMode
                            }

                            setDarkMode={
                                setDarkMode
                            }

                            fetch_url={
                                fetch_url
                            }

                            data={
                                data
                            }

                            setData={
                                setData
                            }
                        />

                    </Route>


                    {/* ==================================================
                        ADD NEW
                    ================================================== */}

                    <Route path="/add-new">

                        <AddNew
                            darkMode={
                                darkMode
                            }

                            setDarkMode={
                                setDarkMode
                            }

                            fetch_url={
                                fetch_url
                            }

                            data={
                                data
                            }

                            setData={
                                setData
                            }

                            refreshData={
                                refreshData
                            }

                            question={{}}
                        />

                    </Route>


                    {/* ==================================================
                        EDIT
                    ================================================== */}

                    <Route path="/edit">

                        <Edit
                            darkMode={
                                darkMode
                            }

                            setDarkMode={
                                setDarkMode
                            }

                            question={
                                selectedQuestion
                            }

                            fetch_url={
                                fetch_url
                            }

                            data={
                                data
                            }

                            setData={
                                setData
                            }

                            refreshData={
                                refreshData
                            }
                        />

                    </Route>


                    {/* ==================================================
                        QUIZ
                    ================================================== */}

                    <Route path="/quiz">

                        <QuizPage
                            darkMode={
                                darkMode
                            }

                            setDarkMode={
                                setDarkMode
                            }
                        />

                    </Route>


                    {/* ==================================================
                        RESUMEE
                    ================================================== */}

                    <Route path="/resumee">

                        <Resumee
                            darkMode={
                                darkMode
                            }

                            setDarkMode={
                                setDarkMode
                            }
                        />

                    </Route>

                </Switch>

            </div>

        </Router>

    );

}

export default App;
