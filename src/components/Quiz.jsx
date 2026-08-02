

import { useState } from "react";

export default function Quiz({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    // null = user hasn't selected a quiz length yet
    const [quizQuestions, setQuizQuestions] = useState(null);

    function startQuiz(amount) {
        // Shuffle the questions and take the requested amount
        const selected = [...questions]
            .sort(() => Math.random() - 0.5)
            .slice(0, amount);

        setQuizQuestions(selected);
        setCurrentQuestion(0);
        setScore(0);
        setFinished(false);
    }

    function handleAnswer(index) {
        if (index === quizQuestions[currentQuestion].correctAnswer) {
            setScore((prev) => prev + 1);
        }

        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setFinished(true);
        }
    }

    function restartQuiz() {
        setCurrentQuestion(0);
        setScore(0);
        setFinished(false);
        setQuizQuestions(null); // Return to the selection screen
    }

    // -------------------------------
    // START SCREEN
    // -------------------------------

    if (!quizQuestions) {
        return (
            // START SCREEN

<section className="quiz flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 lg:min-h-[calc(100vh-64px)]">

                <h2 className="text-3xl font-bold text-sky-500">
                    Start Quiz
                </h2>

                <p>How many questions would you like?</p>

                <button
                    className="w-48 p-3 rounded-lg bg-sky-500 text-white"
                    onClick={() => startQuiz(10)}
                >
                    10 Questions
                </button>

                <button
                    className="w-48 p-3 rounded-lg bg-sky-500 text-white"
                    onClick={() => startQuiz(15)}
                >
                    15 Questions
                </button>

                <button
                    className="w-48 p-3 rounded-lg bg-sky-500 text-white"
                    onClick={() => startQuiz(25)}
                >
                    25 Questions
                </button>

            </section>
        );
    }

    // -------------------------------
    // FINISHED SCREEN
    // -------------------------------

    if (finished) {
        return (
            // FINISHED SCREEN

<section className="quiz flex min-h-[calc(100vh-64px)] flex-col items-center justify-center text-center">

                <h2 className="text-sky-500 text-2xl font-bold">
                    Quiz Finished!
                </h2>

                <p className="mt-2">
                    Score: {score} / {quizQuestions.length}
                </p>

                <button
                    className="mt-4 p-3 rounded-lg bg-sky-500 text-white"
                    onClick={restartQuiz}
                >
                    Restart Quiz
                </button>

            </section>
        );
    }

    const question = quizQuestions[currentQuestion];

    return (
        // QUIZ SCREEN

<section className="flex min-h-[calc(100dvh-64px)] flex-col">

            <div className="flex-1 flex flex-col justify-center items-center text-center px-4">

                <h2>
                    Question {currentQuestion + 1} / {quizQuestions.length}
                </h2>

                <h3 className="text-sky-500 text-xl font-bold">
                    {question.question}
                </h3>

            </div>

            <div className="flex-1 flex flex-col justify-center bg-gray-100 dark:bg-gray-900 rounded-xl p-4 shadow-sm">

                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="p-2 mb-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm"
                    >
                        {option}
                    </button>
                ))}

            </div>

        </section>
    );
}