
import { Link, useLocation } from "react-router-dom";

const Navbar = ({
    setSelectedQuestion,
    darkMode,
    handleBack,
    handleNext,
    historyIndex,
    historyArray,
    favorite,
    setIsFavorite,
    info,
    fetch_url,
    data,
    setData
}) => {

    const location = useLocation();

    const isHome = location.pathname === "/";
   

    /* ============================================================
       FAVORITE
    ============================================================ */

    //console.log(fetch_url)
async function toggleFavorite() {

    if (!info) {
        return;
    }

    const updatedQuestions = data.map((question) =>
        question.id === info.id
            ? {
                  ...question,
                  favorite: !question.favorite
              }
            : question
    );

    const newFavorite = !info.favorite;

    try {

        const response = await fetch(
            fetch_url,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    questions: updatedQuestions
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to update favorite"
            );
        }

        // Update the main data array.
        setData(updatedQuestions);

        // Update the current question in history.
        historyArray[historyIndex].favorite = newFavorite;

        // Force the current question to update.
        setSelectedQuestion({
            ...historyArray[historyIndex]
        });

        // Update the favorite icon.
        setIsFavorite(newFavorite);

        console.log(
            "Favorite updated:",
            newFavorite
        );

    } catch (error) {

        console.error(
            "Error updating favorite:",
            error
        );

    }

    console.log(historyIndex);
    console.log(info.id);
}



    /* ============================================================
       FAVORITE ICON
       
       This is shared by both mobile and desktop.
       If favorite is true, the heart is always red.
    ============================================================ */

    const favoriteIcon = favorite ? (

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

    );


    /* ============================================================
       READ OUT LOUD
    ============================================================ */

    function readOutLoud() {

        if (!info) {
            return;
        }

        const speech = window.speechSynthesis;


        // If TTS is currently running, stop it.
        if (speech.speaking) {

            speech.cancel();

            return;

        }


        const text =
            `${info.question}. ` +
            `${info.explanation}. ` +
            `${info.answer}. ` +
            `${info.example}`;


        const utterance =
            new SpeechSynthesisUtterance(text);


        // Force English.
        utterance.lang = "en-US";


        // Get available voices.
        const voices = speech.getVoices();


        // Try to find an English male voice.
        const maleEnglishVoice = voices.find((voice) => {

            const isEnglish =
                voice.lang.startsWith("en");

            const name =
                voice.name.toLowerCase();

            const isMale =
                name.includes("male") ||
                name.includes("david") ||
                name.includes("mark") ||
                name.includes("daniel") ||
                name.includes("alex") ||
                name.includes("fred");

            return isEnglish && isMale;

        });


        // Use male English voice if available.
        if (maleEnglishVoice) {

            utterance.voice =
                maleEnglishVoice;

        } else {

            // Otherwise use any English voice.
            const englishVoice =
                voices.find((voice) =>
                    voice.lang.startsWith("en")
                );

            if (englishVoice) {

                utterance.voice =
                    englishVoice;

            }

        }


        speech.speak(utterance);

    }


    /* ============================================================
       MOBILE NAVBAR
    ============================================================ */

    const navClasses = `
        my-1
        mx-3
        flex
        md:hidden
        text-center
        text-xs
        font-bold
        border-t
        ${darkMode
            ? "bg-gray-700 text-gray-100"
            : "bg-gray-100 text-gray-700"
        }
    `;


    const buttonClasses = `
        m-1
        p-3
        flex-1
        rounded-xl
        transition-colors
        flex
        items-center
        justify-center
        ${darkMode
            ? "hover:bg-gray-600"
            : "hover:bg-gray-200"
        }
    `;


    return (
        <>

            {/* ========================================================
                MOBILE NAVBAR
            ======================================================== */}

            <nav className={navClasses}>

                {/* BACK */}

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


                {/* TTS */}

                <button
                    id="tts"
                    onClick={readOutLoud}
                    className={buttonClasses}
                >
                    <span className="material-symbols-outlined">
                        volume_up
                    </span>
                </button>


                {/* FAVORITE */}

                <button
                    id="favorite_btn"
                    onClick={toggleFavorite}
                    className={buttonClasses}
                >

                    {favoriteIcon}

                </button>


                {/* EDIT */}

                <Link
                    to="/edit"
                    id="edit_btn"
                    className={buttonClasses}
                >
                    <span className="material-symbols-outlined">
                        edit_square
                    </span>
                </Link>


                {/* NEXT */}

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


            {/* ========================================================
                DESKTOP NAVBAR
            ======================================================== */}

            {isHome && (

                <div
                    className="
                        hidden
                        md:flex
                        fixed
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        flex-col
                        items-center
                        gap-4
                        px-8
                        py-5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            w-[800px]
                        "
                    >

                        {/* =================================================
                            PREVIOUS
                        ================================================= */}

                        <button
                            onClick={handleBack}
                            disabled={historyIndex <= 0}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                px-4
                                py-2
                                text-gray-700
                                transition
                                hover:bg-gray-200
                                disabled:opacity-40
                                dark:text-gray-200
                                dark:hover:bg-gray-800
                            "
                        >
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>

                            Previous
                        </button>


                        {/* =================================================
                            DELETE
                        ================================================= */}

                        <button
                            onClick={() =>
                                document
                                    .getElementById("modal-box")
                                    ?.showModal()
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                px-4
                                py-2
                                transition
                                hover:text-red-600
                                hover:bg-red-100
                                dark:hover:bg-red-900/30
                            "
                        >
                            <span className="material-symbols-outlined">
                                delete_forever
                            </span>

                            Delete
                        </button>


                        {/* =================================================
                            FAVORITE
                        ================================================= */}

                        <button
                            onClick={toggleFavorite}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                px-4
                                py-2
                                font-semibold
                                text-gray-700
                                transition
                                hover:bg-gray-200
                                dark:text-gray-200
                                dark:hover:bg-gray-800
                            "
                        >

                            {favoriteIcon}

                            Favorite

                        </button>


                        {/* =================================================
                            READ THIS
                        ================================================= */}

                        <button
                            onClick={readOutLoud}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                px-4
                                py-2
                                text-gray-700
                                transition
                                hover:bg-gray-200
                                dark:text-gray-200
                                dark:hover:bg-gray-800
                            "
                        >
                            Read This

                            <span className="material-symbols-outlined">
                                volume_up
                            </span>

                        </button>


                        {/* =================================================
                            NEXT
                        ================================================= */}

                        <button
                            onClick={handleNext}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-lg
                                px-4
                                py-2
                                text-gray-700
                                transition
                                hover:bg-gray-200
                                dark:text-gray-200
                                dark:hover:bg-gray-800
                            "
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
