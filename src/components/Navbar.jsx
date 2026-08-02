import { useState } from "react";
import api from "../javascript/api.json";
import { Link, useLocation } from "react-router-dom";

export const getRandomQuestion = () => {
    const questions = api.questions;
    const index = Math.floor(Math.random() * questions.length);
    return questions[index];
};



const Navbar = ({ setSelectedQuestion, darkMode, handleBack, handleNext, historyIndex }) => {
    window.speechSynthesis.cancel();

    const location = useLocation();
    const isHome = location.pathname === "/";


    const navClasses = `
        my-1 mx-3 flex  lg:hidden text-center text-xs font-bold border-t
        ${darkMode
            ? "bg-gray-700 text-gray-100"
            : "bg-gray-100 text-gray-700"}
    `;

    const buttonClasses = `
        m-1 p-3 flex-1 rounded-xl transition-colors
        ${darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-200"}
    `;

    return (
        <>
            <nav className={navClasses}>

                {isHome && (
                    <button
                        onClick={handleBack}
                        disabled={historyIndex <= 0}
                        className={buttonClasses}
                    >
                        <span className="material-symbols-outlined">
                            arrow_circle_left
                        </span>
                    </button>
                )}

                {!isHome && (
                    <Link to="/" className={buttonClasses}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                    </Link>
                )}

                <Link to="/search" className={buttonClasses}>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </Link>

                <Link to="/add-new" className={buttonClasses}>
                    <span class="material-symbols-outlined">
                        new_window
                    </span>
                </Link>

                <Link to="/quiz" className={buttonClasses}>
                    <span class="material-symbols-outlined">
                        cards_stack
                    </span>
                </Link>

                {!isHome && (
                    <Link to="/favorites" className={buttonClasses}>
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                    </Link>
                )}

                {isHome && (
                    <button
                        onClick={handleNext}
                        className={buttonClasses}
                    >
                        <span className="material-symbols-outlined">
                            arrow_circle_right
                        </span>
                    </button>
                )}

            </nav>


        </>
    );
};

export default Navbar;