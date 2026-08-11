
const CategoriesSelector = ({
    topic,
    setTopic
}) => {

    /*
     * If no topic has been supplied,
     * use Encouragement as the default.
     */

    const selectedTopic =
        topic || "Encouragement";


    return (

        <section className="flex w-full p-1 mx-3 my-1 border rounded-full bg-gray-200 dark:bg-gray-900">

            {/* ==================================================
                RECRUITER
            ================================================== */}

            <div
                onClick={() =>
                    setTopic("Recruiter")
                }
                className={`
                    py-2
                    flex-1
                    text-center
                    rounded-full
                    ml-auto
                    cursor-pointer
                    ${
                        selectedTopic === "Recruiter"
                            ? "bg-blue-300 text-blue-900 inset-shadow-sm shadow-sm"
                            : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                    }
                `}
            >
                Recruiter
            </div>


            {/* ==================================================
                CANDIDATE
            ================================================== */}

            <div
                onClick={() =>
                    setTopic("Candidate")
                }
                className={`
                    py-2
                    flex-1
                    text-center
                    rounded-full
                    ml-1
                    cursor-pointer
                    ${
                        selectedTopic === "Candidate"
                            ? "bg-green-300 text-green-900 inset-shadow-sm shadow-sm"
                            : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                    }
                `}
            >
                Candidate
            </div>


            {/* ==================================================
                ADVICE
            ================================================== */}

            <div
                onClick={() =>
                    setTopic("Advice")
                }
                className={`
                    py-2
                    flex-1
                    text-center
                    rounded-full
                    cursor-pointer
                    ${
                        selectedTopic === "Advice"
                            ? "bg-yellow-200 text-yellow-900 inset-shadow-sm shadow-sm"
                            : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                    }
                `}
            >
                Advice
            </div>


            {/* ==================================================
                ENCOURAGEMENT
            ================================================== */}

            <div
                onClick={() =>
                    setTopic("Encouragement")
                }
                className={`
                    py-2
                    flex-1
                    text-center
                    rounded-full
                    mr-auto
                    cursor-pointer
                    ${
                        selectedTopic === "Encouragement"
                            ? "bg-pink-300 text-pink-900 inset-shadow-sm shadow-sm"
                            : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                    }
                `}
            >
                Keep It Up!
            </div>

        </section>

    );

};

export default CategoriesSelector;
