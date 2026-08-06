import { useEffect } from "react";

import FloatingActionsMenu from "../components/FloatingActionsMenu";

import Categories from "./Categories";
import ModalDelete from "./ModalDelete";


const Card = ({
    url,
    data,
    info,
    open,
    onClose,
    isFavorite,
    setIsFavorite,
    deleteQuestion
}) => {
    /* console.clear(); */
    /* console.log("location: Card Component | url:", url)
    console.log("location: Card Component | data:", data) */
    window.speechSynthesis.cancel();

    localStorage.removeItem("questionSearched");

    if (!info) {
        return <h2 className="mx-4">Move Right to start learning. </h2>;
    }


    /* setIsFavorite(isFavorite); */

    return (
        <>
            <Categories topic={info.topic} />

            <section
                className="
        scroll-content
        flex-1
        min-h-0
        mx-3
        p-1
        rounded-xl
        bg-gray-200
        text-gray-900
        md:dark:bg-gray-800
        dark:bg-gray-700
        dark:text-gray-100
        overflow-y-auto
    "
            >

                {/* ...your existing content... */}

                <div id="question" className=" px-1 py-3 pt-2 font-bold editable text-sky-500 text-xl" > <h2>{info.question}</h2> </div>

                <div id="explanation" className="px-1 py-2 text-xs editable " > <p>{info.explanation}</p> </div>

                <div id="answer" className="px-1 py-3 editable font-semibold" > <p>{info.answer}</p> </div>

                <div id="example" className="px-1 py-2 text-xs editable" > <p>{info.example}</p> </div>



                <ModalDelete
                    info={info}
                    deleteQuestion={deleteQuestion}
                />
            </section >

        </>
    );
};

export default Card;