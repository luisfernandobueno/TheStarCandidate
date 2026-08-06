import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export default function RichTextEditor({
    question = {},
    mode,
    fetch_url,
    refreshData
}) {

    const history = useHistory();

    const questionRef = useRef(null);
    const explanationRef = useRef(null);
    const answerRef = useRef(null);
    const exampleRef = useRef(null);

    const [activeHighlight, setActiveHighlight] = useState(null);
    const [, forceUpdate] = useState(0);


    /* ============================================================
       Load existing question when editing
    ============================================================ */

    useEffect(() => {

        if (questionRef.current)
            questionRef.current.innerHTML = question?.question || "";

        if (explanationRef.current)
            explanationRef.current.innerHTML = question?.explanation || "";

        if (answerRef.current)
            answerRef.current.innerHTML = question?.answer || "";

        if (exampleRef.current)
            exampleRef.current.innerHTML = question?.example || "";

    }, [question]);


    function updateToolbar() {
        forceUpdate((v) => v + 1);
    }


    function formatText(command) {
        document.execCommand(command, false, null);
        updateToolbar();
    }


    function highlight(color) {
        document.execCommand("hiliteColor", false, color);
        setActiveHighlight(color);
        updateToolbar();
    }


    function removeHighlight() {
        document.execCommand(
            "hiliteColor",
            false,
            "transparent"
        );

        setActiveHighlight(null);
        updateToolbar();
    }


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
       Submit CREATE / EDIT
    ============================================================ */
async function handleSubmit() {

    const editedData = {

        question: questionRef.current.innerHTML,

        explanation: explanationRef.current.innerHTML,

        answer: answerRef.current.innerHTML,

        example: exampleRef.current.innerHTML,

    };


    try {

        let response;


        if (mode === "create") {


            response = await fetch(fetch_url, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(editedData),

            });


        } else {


            const updatedQuestion = {

                ...question,

                ...editedData,

                id: question.id,

                topic: question.topic,

                favorite: question.favorite,

            };


            response = await fetch(
                `${fetch_url}/${question.id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(updatedQuestion),

                }
            );

        }



        if (!response.ok) {
            throw new Error("Submit failed");
        }



        const result = await response.json();


        console.log("Server response:", result);



        // IMPORTANT PART
        // Use the newly created/edited object
        await refreshData(
            result.question
        );


        history.push("/");


    } catch(error) {

        console.error(
            "Submit error:",
            error
        );

    }

}



    return (

        <section className="flex flex-col h-full">


            {/* Toolbar */}

            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex flex-wrap items-center gap-2 p-3">


                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("bold")}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <b>B</b>
                </button>


                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("italic")}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <i>I</i>
                </button>


                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("underline")}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <u>U</u>
                </button>


                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("strikeThrough")}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <s>S</s>
                </button>



                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => highlight("#ffff00")}
                    className={`w-5 h-5 rounded-full bg-yellow-300 border ${
                        activeHighlight === "#ffff00"
                            ? "ring-2 ring-black"
                            : ""
                    }`}
                />


                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => highlight("#90EE90")}
                    className={`w-5 h-5 rounded-full bg-green-300 border ${
                        activeHighlight === "#90EE90"
                            ? "ring-2 ring-black"
                            : ""
                    }`}
                />


                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => highlight("#87CEFA")}
                    className={`w-5 h-5 rounded-full bg-sky-300 border ${
                        activeHighlight === "#87CEFA"
                            ? "ring-2 ring-black"
                            : ""
                    }`}
                />


                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={removeHighlight}
                    className="px-3 py-1 rounded-full border"
                >
                    Eraser
                </button>


            </div>



            {/* Editors */}

            <div className="flex-1 scroll-content overflow-y-auto p-5 space-y-6">


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



            {/* Buttons */}

            <div className="border-t px-4 py-1 flex">


                <button
                    type="button"
                    onClick={() => history.push("/")}
                    className="flex-1 rounded-full py-3"
                >
                    Cancel
                </button>



                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 rounded-full bg-sky-500 text-white py-3 font-bold"
                >
                    Submit
                </button>


            </div>


        </section>

    );

}



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
                className="min-h-36 border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />


        </div>

    );

}