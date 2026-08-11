
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import CategoriesSelector from "./CategoriesSelector";


export default function RichTextEditor({
    question = {},
    mode,
    fetch_url,
    data = [],
    setData,
    historyIndex,
    historyArr
}) {

    const history = useHistory();


    /* ============================================================
       TOPIC
    ============================================================ */

    const [topic, setTopic] = useState(
        question?.topic || "Encouragement"
    );


    /* ============================================================
       EDITOR REFS
    ============================================================ */

    const questionRef = useRef(null);
    const explanationRef = useRef(null);
    const answerRef = useRef(null);
    const exampleRef = useRef(null);


    /* ============================================================
       TOOLBAR STATE
    ============================================================ */

    const [activeHighlight, setActiveHighlight] = useState(null);

    const [, forceUpdate] = useState(0);


    /* ============================================================
       LOAD QUESTION INTO EDITORS
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

        setTopic(
            question?.topic || "Encouragement"
        );

    }, [question]);


    /* ============================================================
       UPDATE TOOLBAR
    ============================================================ */

    function updateToolbar() {

        forceUpdate(
            (value) => value + 1
        );

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
       SUBMIT
       
       IMPORTANT:

       Nothing is sent to the API until this function runs.

       CREATE:
       1. Create the new object locally.
       2. Add it to data.
       3. Add it to history.
       4. Make it the current history item.
       5. POST the complete dataset.

       EDIT:
       1. Create the edited object locally.
       2. Replace it inside data.
       3. Replace it inside history.
       4. Keep the current history position.
       5. POST the complete dataset.
    ============================================================ */

async function handleSubmit() {

    try {

        const editedFields = {

            question:
                questionRef.current?.innerHTML || "",

            explanation:
                explanationRef.current?.innerHTML || "",

            answer:
                answerRef.current?.innerHTML || "",

            example:
                exampleRef.current?.innerHTML || "",

            topic

        };


        /* ========================================================
           CREATE A COPY OF DATA
        ======================================================== */

        let updatedData = [...data];


        /* ========================================================
           CREATE
        ======================================================== */

        if (mode === "create") {

            const highestId = updatedData.reduce(
                (highest, item) => {

                    const currentId =
                        Number(item?.id) || 0;

                    return Math.max(
                        highest,
                        currentId
                    );

                },
                0
            );


            const newQuestion = {

                id: highestId + 1,

                ...editedFields,

                favorite: false

            };


            updatedData = [
                ...updatedData,
                newQuestion
            ];

        }


        /* ========================================================
           EDIT
        ======================================================== */

        else {

            if (
                question?.id === undefined ||
                question?.id === null
            ) {

                throw new Error(
                    "The question being edited has no id."
                );

            }


            updatedData = updatedData.map(
                (item) => {

                    if (
                        item.id !== question.id
                    ) {

                        return item;

                    }


                    return {

                        ...item,

                        ...editedFields,

                        // Preserve original ID.
                        id: item.id,

                        // Preserve original favorite.
                        favorite:
                            item.favorite ?? false

                    };

                }
            );

        }


        /* ========================================================
           UPDATE FRONTEND DATA
           
           This updates the parent data immediately.
        ======================================================== */

        setData(updatedData);


        /* ========================================================
           POST THE COMPLETE DATASET
           
           Frontend:
           
           [
               {...},
               {...}
           ]

           API:
           
           {
               questions: [...]
           }
        ======================================================== */

        const response = await fetch(
            fetch_url,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    questions: updatedData
                })

            }
        );


        /* ========================================================
           CHECK RESPONSE
        ======================================================== */

        if (!response.ok) {

            let errorMessage =
                `HTTP ${response.status}`;


            try {

                const errorData =
                    await response.json();

                if (errorData?.error) {

                    errorMessage =
                        errorData.error;

                }

            } catch {

                // Server did not return JSON.

            }


            throw new Error(
                `Submit failed: ${errorMessage}`
            );

        }


        /* ========================================================
           SUCCESS
        ======================================================== */

        console.log(
            "Data successfully submitted."
        );


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
                        ${
                            activeHighlight ===
                            "#ffff00"
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
                        ${
                            activeHighlight ===
                            "#90EE90"
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
                        ${
                            activeHighlight ===
                            "#87CEFA"
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


            {/* ====================================================
                CATEGORY SELECTOR
            ==================================================== */}

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

                {/* CANCEL */}

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


                {/* SUBMIT */}

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
