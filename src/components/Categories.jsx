const Categories = ({ topic }) => {
    return (
        <section className="mx-3 mb-1 lg:mt-3 p-1 flex items-center rounded-full text-xs font-bold inset-shadow-sm shadow-sm bg-gray-200 dark:bg-gray-900">

            <div
                className={`py-2 flex-1 text-center rounded-full ml-auto ${
                    topic === "Recruiter"
                        ? "bg-blue-300 text-blue-900 inset-shadow-sm shadow-sm"
                        : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                }`}
            >
                Recruiter
            </div>

            <div
                className={`py-2 flex-1 text-center rounded-full ml-1 ${
                    topic === "Candidate"
                        ? "bg-green-300 text-green-900 inset-shadow-sm shadow-sm"
                        : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                }`}
            >
                Candidate
            </div>

            <div
                className={`py-2 flex-1 text-center rounded-full ${
                    topic === "Advice"
                        ? "bg-yellow-200 text-yellow-900 inset-shadow-sm shadow-sm"
                        : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                }`}
            >
                Advice
            </div>

            <div
                className={`py-2 flex-1 text-center rounded-full mr-auto ${
                    topic === "Encouragement"
                        ? "bg-pink-300 text-pink-900 inset-shadow-sm shadow-sm"
                        : "bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300"
                }`}
            >
                Keep It Up!
            </div>

        </section>
    );
};

export default Categories;