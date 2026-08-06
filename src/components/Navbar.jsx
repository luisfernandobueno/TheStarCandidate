import { useState } from "react";
import { Link, useLocation } from "react-router-dom";





const Navbar = ({ setSelectedQuestion, darkMode, handleBack, handleNext, historyIndex, favorite }) => {
    window.speechSynthesis.cancel();

    const location = useLocation();
    const isHome = location.pathname === "/";
    /* const [isFavorite, setIsFavorite] = useState(false) */

    const navClasses = `
        my-1 mx-3 flex  md:hidden text-center text-xs font-bold border-t
        ${darkMode
            ? "bg-gray-700 text-gray-100"
            : "bg-gray-100 text-gray-700"}
    `;

    const buttonClasses = `
        m-1 p-3 flex-1 rounded-xl transition-colors  flex items-center justify-center
        ${darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-200"}
    `;

    return (
        <>
            <nav className={navClasses}>

                {isHome && (
                    <div
                        onClick={handleBack}
                        disabled={historyIndex <= 0}
                        className={buttonClasses}
                    >
                        <span className="material-symbols-outlined">
                            arrow_circle_left
                        </span>
                    </div>
                )}

                {/* {!isHome && (
                    <Link to="/" className={buttonClasses}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                    </Link>
                )} */}

                {/* <Link to="/search" className={buttonClasses}>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </Link> */}

                {/* <Link to="/add-new" className={buttonClasses}>
                    <span className="material-symbols-outlined">
                        new_window
                    </span>
                </Link> */}

                {/* <Link to="/quiz" className={buttonClasses}>
                    <span className="material-symbols-outlined">
                        cards_stack
                    </span>
                </Link> */}

                {/*  {!isHome && (
                    <Link to="/resumee" className={buttonClasses}>
                        <span className="material-symbols-outlined">
                            person
                        </span>
                    </Link>
                )} */}













                <button
                    id="tts"
                    className={buttonClasses}
                /* onClick={readOutLoud} */
                >
                    <span className="material-symbols-outlined">
                        volume_up
                    </span>
                </button>

                <button
                    id="favorite_btn"
                    className={buttonClasses}
                    /* onClick={() => setIsFavorite(!isFavorite)} */
                >
                    {/* {isFavorite ? "❤️" : "🤍"} */}
                    {favorite ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="#ff004c"
                        >
                            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                        </svg>
                    ) : (
                        <span className="material-symbols-outlined">
                            favorite
                        </span>
                    )}
                </button>

                <Link
                    to="/edit"
                    id="edit_btn"
                    className={buttonClasses}
                >
                    <span className="material-symbols-outlined">
                        edit_square
                    </span>
                </Link>











                {isHome && (
                    <div
                        onClick={handleNext}
                        className={buttonClasses}
                    >
                        <span className="material-symbols-outlined">
                            arrow_circle_right
                        </span>
                    </div>
                )}

            </nav>



            {isHome && (


                <div className="hidden md:flex fixed md:w-max-800 bottom-0 left-1/2 -translate-x-1/2 flex-col items-center gap-4 px-8 py-5">

                    {/* Title */}
                    {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Interview Question
                    </h1> */}

                    {/* Controls */}
                    <div className=" flex items-center justify-between w-[800px]">

                        {/* Previous */}
                        <button
                            onClick={handleBack}
                            disabled={historyIndex <= 0}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-200 disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                            Previous
                        </button>

                        {/* Delete */}
                        <button
                            onClick={() => document.getElementById("modal-box").showModal()}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:text-red-600 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                        >
                            <span className="material-symbols-outlined">
                                delete_forever
                            </span>
                            Delete
                        </button>

                        {/* Favorite */}
                        <button
                            /* onClick={() => setIsFavorite(!isFavorite)} */
                            className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            {favorite ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 -960 960 960"
                                    width="24"
                                    fill="#ff004c"
                                >
                                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                                </svg>
                            ) : (
                                <span className="material-symbols-outlined">
                                    favorite
                                </span>
                            )}

                            Favorite
                        </button>

                        {/* Read This */}
                        <button
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            Read This

                            <span className="material-symbols-outlined">
                                volume_up
                            </span>
                        </button>

                        {/* Next */}
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                            Next

                            <span className="material-symbols-outlined">
                                arrow_forward
                            </span>
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};

export default Navbar;