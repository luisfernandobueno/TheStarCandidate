import Categories from "./Categories";
import ModalDelete from "./ModalDelete";
import Navbar from "../components/Navbar";

const Card = ({
    url,

    data,
    setData,

    info,

    darkMode,

    open,
    onClose,

    isFavorite,
    setIsFavorite,

    deleteQuestion,

    handleBack,
    handleNext,

    historyIndex,
    historyArr,

    setSelectedQuestion
}) => {

    /*
     * Clear speech whenever the card changes.
     */
    window.speechSynthesis.cancel();

    /*
     * Search stores a temporary question here.
     * Once Home displays it, remove it so the next
     * render goes back to the normal selected question.
     */
    localStorage.removeItem("questionSearched");
    /* console.log(historyArr) */
    /*
     * No question available yet.
     */
    if (!info) {

        return (
            <h2 className="mx-4">
                Move Right to start learning.
            </h2>
        );
    }

    return (
        <>

            {/* =========================================================
                CATEGORY
            ========================================================= */}

            <Categories
                topic={info.topic}
            />


            {/* =========================================================
                QUESTION CARD
            ========================================================= */}

            <section
                className="
                    flex
                    flex-col
                    flex-1
                    min-h-0
                    mx-3
                    lg:p-3
                    rounded-xl
                    bg-gray-200
                    text-gray-900
                    md:dark:bg-gray-800
                    dark:bg-gray-700
                    dark:text-gray-100
                "
            >

                {/* =====================================================
                    SCROLLABLE CONTENT
                ===================================================== */}

                <div
                    className="
                        scroll-content
                        flex-1
                        min-h-0
                        overflow-y-auto
                    "
                >

                    {/* QUESTION */}

                    <div
                        id="question"
                        className="
                            px-1
                            py-3
                            pt-2
                            font-bold
                            editable
                            text-sky-500
                            text-xl
                        "
                        dangerouslySetInnerHTML={{
                            __html: info.question
                        }}
                    />


                    {/* EXPLANATION */}

                    <div
                        id="explanation"
                        className="
                            px-1
                            py-2
                            text-xs
                            editable
                        "
                        dangerouslySetInnerHTML={{
                            __html: info.explanation
                        }}
                    />


                    {/* ANSWER */}

                    <div
                        id="answer"
                        className="
                            px-1
                            py-3
                            editable
                            font-semibold
                        "
                        dangerouslySetInnerHTML={{
                            __html: info.answer
                        }}
                    />


                    {/* EXAMPLE */}

                    <div
                        id="example"
                        className="
                            px-1
                            py-2
                            text-xs
                            editable
                        "
                        dangerouslySetInnerHTML={{
                            __html: info.example
                        }}
                    />


                    {/* =================================================
                        DELETE MODAL
                    ================================================= */}

                    <ModalDelete
                        info={info}
                        deleteQuestion={deleteQuestion}
                    />

                </div>


                {/* =====================================================
                    NAVBAR
                ===================================================== */}

                <Navbar
                    setSelectedQuestion={
                        setSelectedQuestion
                    }

                    darkMode={darkMode}

                    handleBack={handleBack}
                    handleNext={handleNext}

                    historyIndex={historyIndex}

                    favorite={isFavorite}
                    setIsFavorite={setIsFavorite}

                    info={info}
                    fetch_url={url}
                    
                />

            </section>

        </>
    );
};

export default Card;