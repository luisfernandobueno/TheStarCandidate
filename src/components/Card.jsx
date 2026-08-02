import { useEffect } from "react";
import {
    setupFloatingActions,
    favoriteState
} from "../javascript/script";

import Categories from "./Categories";
import ModalDelete from "./DeleteModal";
import FloatingActionsMenu from "./FloatingActionsMenu";


const Card = ({ info }) => {
    window.speechSynthesis.cancel();

    localStorage.removeItem("questionSearched");

    if (!info) {
        return <h2>Move Left or Right to start learning.</h2>;
    }

    useEffect(() => {
        setupFloatingActions();
        favoriteState();
    }, []);

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

                <FloatingActionsMenu />

                
            </section >
            
        </>
    );
};

export default Card;