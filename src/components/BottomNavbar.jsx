// import {handleBack, handleNext} from "./Navbar"
import { useState } from "react";

const BottomNavbar = ({ handleBack, handleNext, historyIndex }) => {

    const [isFavorite, setIsFavorite] = useState(false)
    return (
        <>
            <div className="hidden md:flex items-center px-6 py-3 fixed bottom-0 left-1/2 -translate-x-1/2">

                {/* Previous */}

                <div className="flex flex-1 w-40 justify-start rounded-lg
                px-3 py-2
                text-gray-700
                transition
                hover:bg-gray-200
                dark:text-gray-200
                dark:hover:bg-gray-800">
                    <button
                        className="
                flex items-center gap-2
                
            "
                        onClick={handleBack}
                        disabled={historyIndex <= 0}
                    >
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>

                        Previous
                    </button>
                </div>

                <div className="flex flex-1 w-40 justify-start rounded-lg
                px-3 py-2
                text-gray-700
                transition
                hover:bg-gray-200
                dark:text-gray-200
                dark:hover:bg-gray-800">
                    <button
                className="
                flex items-center gap-2
                rounded-lg
                px-3 py-2
                text-gray-700
                transition
                hover:bg-gray-200
                dark:text-gray-200
                dark:hover:bg-gray-800
            ">
                    Read This
                    <span class="material-symbols-outlined">
                        volume_up
                    </span>
                </button></div>

                {/* Title */}
                <div className="flex flex-1 w-40 justify-start rounded-lg
                px-3 py-2
                ">
                    <h1
                    className="
            flex-2
            text-center
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
        "
                >
                    Interview Question
                </h1>
                </div>
                


                <div className="flex flex-1 w-40 justify-start rounded-lg
                px-3 py-2
                text-gray-700
                transition
                hover:bg-gray-200
                dark:text-gray-200
                dark:hover:bg-gray-800">
                    <button className="
                flex items-center gap-2
                rounded-lg
                px-3 py-2
                text-gray-700
                transition
                hover:bg-gray-200
                dark:text-gray-200
                dark:hover:bg-gray-800
            " onClick={() => setIsFavorite(!isFavorite)}>
                {isFavorite ? "Remove from Favorites ❤️" : "Add To Favorites 🤍"}

                    {/* {favoriteState ? (
                <span className="outlineHeart material-symbols-outlined" height="24px">
                    favorite
                </span> */}
            {/* ) : (

                <svg
                    className="filled"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff004c"
                >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                </svg>

            )} */}

                </button>

            </div>


                {/* Next */}



                <div className="flex flex-1 w-40 justify-center rounded-lg
                px-3 py-2
                text-gray-700
                transition
                hover:bg-gray-200
                dark:text-gray-200
                dark:hover:bg-gray-800">
                    <button
                        className="
                flex items-center gap-2
                rounded-lg
                px-3 py-2
                text-gray-700
                transition
                hover:bg-gray-200
                dark:text-gray-200
                dark:hover:bg-gray-800
            "
                        onClick={handleNext}
                    >
                        Next

                        <span className="material-symbols-outlined">
                            arrow_forward
                        </span>
                    </button>
                </div>

            </div>
        </>
    )
}

export default BottomNavbar;