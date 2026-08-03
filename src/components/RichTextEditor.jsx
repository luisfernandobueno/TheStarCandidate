import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

export default function RichTextEditor({
    question = {},
    fetchPost,
}) {

    const history = useHistory();

    const questionRef = useRef(null);
    const explanationRef = useRef(null);
    const answerRef = useRef(null);
    const exampleRef = useRef(null);

    const [activeHighlight, setActiveHighlight] = useState(null);
    const [, forceUpdate] = useState(0);

    useEffect(() => {

        if (questionRef.current)
            questionRef.current.innerHTML = question.question || "";

        if (explanationRef.current)
            explanationRef.current.innerHTML = question.explanation || "";

        if (answerRef.current)
            answerRef.current.innerHTML = question.answer || "";

        if (exampleRef.current)
            exampleRef.current.innerHTML = question.example || "";

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
        document.execCommand("hiliteColor", false, "transparent");
        setActiveHighlight(null);
        updateToolbar();
    }

    useEffect(() => {

        document.addEventListener("selectionchange", updateToolbar);
        document.addEventListener("mouseup", updateToolbar);
        document.addEventListener("keyup", updateToolbar);

        return () => {
            document.removeEventListener("selectionchange", updateToolbar);
            document.removeEventListener("mouseup", updateToolbar);
            document.removeEventListener("keyup", updateToolbar);
        };

    }, []);

    function handleSubmit() {

        const dataToUpload = {

            question: questionRef.current.innerHTML,
            explanation: explanationRef.current.innerHTML,
            answer: answerRef.current.innerHTML,
            example: exampleRef.current.innerHTML,

        };

        fetchPost(dataToUpload);
    }

    function toolbarButton(icon, command) {

        let active = false;

        try {
            active = document.queryCommandState(command);
        } catch {
            active = false;
        }

        return (
            <button
                type="button"
                onClick={() => formatText(command)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 ${active ? "border-black" : "border-transparent"
                    }`}
            >
                {icon}
            </button>
        );
    }

    return (
        <section className="flex flex-col h-full">

            {/* Toolbar */}

            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex flex-wrap items-center gap-2 p-3">

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("bold")}
                    className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    <b>B</b>
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("italic")}
                    className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    <i>I</i>
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("underline")}
                    className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    <u>U</u>
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => formatText("strikeThrough")}
                    className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    <s>S</s>
                </button>

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => highlight("#ffff00")}
                    className={`w-5 h-5 rounded-full bg-yellow-300 border border-gray-300 dark:border-gray-500 ${activeHighlight === "#ffff00" ? "ring-2 ring-black" : ""
                        }`}
                />

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => highlight("#90EE90")}
                    className={`w-5 h-5 rounded-full bg-green-300 border border-gray-300 dark:border-gray-500 ${activeHighlight === "#90EE90" ? "ring-2 ring-black" : ""
                        }`}
                />

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => highlight("#87CEFA")}
                    className={`w-5 h-5 rounded-full bg-sky-300 border border-gray-300 dark:border-gray-500 ${activeHighlight === "#87CEFA" ? "ring-2 ring-black" : ""
                        }`}
                />

                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={removeHighlight}
                    className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    Eraser
                </button>

            </div>

            {/* Editors */}

            <div className="flex-1 scroll-content overflow-y-auto p-5 space-y-6">

                <Editor title="Question" editorRef={questionRef} className="text-sky-500 text-lg font-bold" />
                <Editor title="Explanation" editorRef={explanationRef} />
                <Editor title="Answer" editorRef={answerRef} />
                <Editor title="Example" editorRef={exampleRef} />

            </div>

            {/* Bottom Buttons */}

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

function Editor({ title, editorRef }) {
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