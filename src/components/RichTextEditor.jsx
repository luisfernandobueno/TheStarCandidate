
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import CategoriesSelector from "./CategoriesSelector";


export default function RichTextEditor({
    question = {},
    mode,
    fetch_url,
    refreshData
}) {

    const [topic, setTopic] = useState(
        question?.topic || "Encouragement"
    );

    const history = useHistory();

    const questionRef = useRef(null);
    const explanationRef = useRef(null);
    const answerRef = useRef(null);
    const exampleRef = useRef(null);

    const [activeHighlight, setActiveHighlight] = useState(null);
    const [, forceUpdate] = useState(0);


    /* ============================================================
       LOAD QUESTION DATA
       ============================================================ */

    useEffect(() => {

        if (questionRef.current) {
            questionRef.current.innerHTML =
                question?.question || "";
        }

        if (explanationRef.current) {
            explanationRef.current.innerHTML =
                question?.explanation || "";
        }

        if (answerRef.current) {
            answerRef.current.innerHTML =
                question?.answer || "";
        }

        if (exampleRef.current) {
            exampleRef.current.innerHTML =
                question?.example || "";
        }

    }, [question]);


    /* ============================================================
       UPDATE TOOLBAR
       ============================================================ */

    function updateToolbar() {
        forceUpdate((value) => value + 1);
    }


    /* ============================================================
       TEXT FORMATTING
       ============================================================ */

    function formatText(command) {

        document.execCommand(
            command,
            false,
            null
        );

        updateToolbar();
    }


    /* ============================================================
       HIGHLIGHT
       ============================================================ */

    function highlight(color) {

        document.execCommand(
            "hiliteColor",
            false,
            color
        );

        setActiveHighlight(color);

        updateToolbar();
    }


    /* ============================================================
       REMOVE HIGHLIGHT
       ============================================================ */

    function removeHighlight() {

        document.execCommand(
            "hiliteColor",
            false,
            "transparent"
        );

        setActiveHighlight(null);

        updateToolbar();
    }


    /* ============================================================
       LISTEN FOR SELECTION CHANGES
       ============================================================ */

    useEffect(() => {

        document.addEventListener(
            "selectionchange",
            updateToolbar
        );

        document.addEventListener(
            "mouseup",
            updateToolbar
        );

        document.addEventListener(
            "keyup",
            updateToolbar
        );


        return () => {

            document.removeEventListener(
                "selectionchange",
                updateToolbar
            );

            document.removeEventListener(
                "mouseup",
                updateToolbar
            );

            document.removeEventListener(
                "keyup",
                updateToolbar
            );

        };

    }, []);


    /* ============================================================
       SUBMIT CREATE / EDIT
       ============================================================ */

    async function handleSubmit() {

        try {

            /* ----------------------------------------------------
               GET CURRENT HTML FROM EDITORS
            ---------------------------------------------------- */

            const editedData = {

                question:
                    questionRef.current?.innerHTML || "",

                explanation:
                    explanationRef.current?.innerHTML || "",

                answer:
                    answerRef.current?.innerHTML || "",

                example:
                    exampleRef.current?.innerHTML || ""

            };


            let response;


            /* ====================================================
               CREATE NEW QUESTION
               ==================================================== */

            if (mode === "create") {

                console.log(
                    "Creating new question:",
                    editedData
                );


                response = await fetch(
                    fetch_url,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            editedData
                        )
                    }
                );

            }


            /* ====================================================
               EDIT EXISTING QUESTION
               ==================================================== */

            else {

                /* ------------------------------------------------
                   Make sure the question being edited has an ID.
                ------------------------------------------------ */

                if (
                    question?.id === undefined ||
                    question?.id === null
                ) {

                    console.error(
                        "Cannot edit question because it has no id:",
                        question
                    );

                    throw new Error(
                        "The question being edited has no id."
                    );
                }


                /* ------------------------------------------------
                   Keep the existing properties and replace only
                   the editable fields.
                ------------------------------------------------ */

                const updatedQuestion = {

                    ...question,

                    ...editedData,

                    id: question.id,

                    topic: question.topic,

                    favorite: question.favorite

                };


                /* ------------------------------------------------
                   Build:

                   PUT /endpoint/id
                ------------------------------------------------ */

                const updateUrl =
                    `${fetch_url}/${encodeURIComponent(
                        question.id
                    )}`;


                console.log(
                    "Editing question:",
                    updatedQuestion
                );

                console.log(
                    "PUT URL:",
                    updateUrl
                );


                response = await fetch(
                    updateUrl,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(
                            updatedQuestion
                        )
                    }
                );

            }


            /* ====================================================
               CHECK SERVER RESPONSE
               ==================================================== */

            if (!response.ok) {

                let errorMessage =
                    `HTTP ${response.status}`;

                try {

                    const errorData =
                        await response.json();

                    console.error(
                        "Server error:",
                        errorData
                    );

                    if (errorData?.error) {
                        errorMessage =
                            errorData.error;
                    }

                } catch {

                    /*
                     The server did not return JSON.
                     */

                }


                throw new Error(
                    `Submit failed: ${errorMessage}`
                );
            }


            /* ====================================================
               READ SERVER RESPONSE
               ==================================================== */

            let result = null;

            try {

                result = await response.json();

            } catch {

                /*
                 Some successful requests may return
                 an empty response body.
                 */

                result = null;
            }


            console.log(
                "Server response:",
                result
            );


            /* ====================================================
               DETERMINE UPDATED DATA
               ==================================================== */

            let returnedQuestion = null;


            if (result?.question) {

                returnedQuestion =
                    result.question;

            }

            else if (result?.id !== undefined) {

                returnedQuestion = result;

            }

            else if (mode === "create") {

                returnedQuestion =
                    result;

            }

            else {

                returnedQuestion =
                    updatedQuestion;

            }


            /* ====================================================
               REFRESH FRONTEND DATA
               ==================================================== */

            if (typeof refreshData === "function") {

                await refreshData(
                    returnedQuestion
                );

            }


            /* ====================================================
               RETURN TO HOME
               ==================================================== */

            history.push("/");


        } catch (error) {

            console.error(
                "Submit error:",
                error
            );

        }

    }


    /* ============================================================
       COMPONENT
       ============================================================ */

    return (

        <section className="flex flex-col h-full">


            {/* ====================================================
                TOOLBAR
            ==================================================== */}

            <div
                className="
                    sticky
                    top-0
                    bg-white
                    dark:bg-gray-800
                    border-b
                    border-gray-300
                    dark:border-gray-700
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    p-3
                "
            >


                {/* BOLD */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        formatText("bold")
                    }
                    className="
                        w-8
                        h-8
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        dark:hover:bg-gray-700
                    "
                >
                    <b>B</b>
                </button>


                {/* ITALIC */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        formatText("italic")
                    }
                    className="
                        w-8
                        h-8
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        dark:hover:bg-gray-700
                    "
                >
                    <i>I</i>
                </button>


                {/* UNDERLINE */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        formatText("underline")
                    }
                    className="
                        w-8
                        h-8
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        dark:hover:bg-gray-700
                    "
                >
                    <u>U</u>
                </button>


                {/* STRIKETHROUGH */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        formatText("strikeThrough")
                    }
                    className="
                        w-8
                        h-8
                        rounded-full
                        border
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        dark:hover:bg-gray-700
                    "
                >
                    <s>S</s>
                </button>


                {/* YELLOW */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        highlight("#ffff00")
                    }
                    className={`
                        w-5
                        h-5
                        rounded-full
                        bg-yellow-300
                        border
                        ${activeHighlight === "#ffff00"
                            ? "ring-2 ring-black"
                            : ""
                        }
                    `}
                />


                {/* GREEN */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        highlight("#90EE90")
                    }
                    className={`
                        w-5
                        h-5
                        rounded-full
                        bg-green-300
                        border
                        ${activeHighlight === "#90EE90"
                            ? "ring-2 ring-black"
                            : ""
                        }
                    `}
                />


                {/* BLUE */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={() =>
                        highlight("#87CEFA")
                    }
                    className={`
                        w-5
                        h-5
                        rounded-full
                        bg-sky-300
                        border
                        ${activeHighlight === "#87CEFA"
                            ? "ring-2 ring-black"
                            : ""
                        }
                    `}
                />


                {/* ERASER */}

                <button
                    type="button"
                    onMouseDown={(e) =>
                        e.preventDefault()
                    }
                    onClick={removeHighlight}
                    className="
                        px-3
                        py-1
                        rounded-full
                        border
                    "
                >
                    Eraser
                </button>


            </div>


            {/* ====================================================
                EDITORS
            ==================================================== */}

            <div
                className="
                    flex-1
                    scroll-content
                    overflow-y-auto
                    p-5
                    space-y-6
                "
            >

                <Editor
                    title="Question"
                    editorRef={questionRef}
                />


                <Editor
                    title="Explanation"
                    editorRef={explanationRef}
                />


                <Editor
                    title="Answer"
                    editorRef={answerRef}
                />


                <Editor
                    title="Example"
                    editorRef={exampleRef}
                />

            </div>


            <CategoriesSelector
                topic={topic}
                setTopic={setTopic}
            />

            {/* ====================================================
                BUTTONS
            ==================================================== */}

            <div
                className="
                    border-t
                    px-4
                    py-1
                    flex
                "
            >

                <button
                    type="button"
                    onClick={() =>
                        history.push("/")
                    }
                    className="
                        flex-1
                        rounded-full
                        py-3
                    "
                >
                    Cancel
                </button>


                <button
                    type="button"
                    onClick={handleSubmit}
                    className="
                        flex-1
                        rounded-full
                        bg-sky-500
                        text-white
                        py-3
                        font-bold
                    "
                >
                    Submit
                </button>

            </div>

        </section>

    );
}


/* ================================================================
   EDITOR COMPONENT
   ================================================================ */

function Editor({
    title,
    editorRef
}) {

    return (

        <div>

            <h3 className="font-bold mb-2">
                {title}
            </h3>


            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="
                    min-h-36
                    border
                    rounded-lg
                    p-4
                    focus:outline-none
                    focus:ring-2
                    focus:ring-sky-500
                "
            />

        </div>

    );
}
