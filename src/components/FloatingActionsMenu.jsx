import { useState } from "react";

import { Link } from "react-router-dom";


const FloatingActionsMenu = ({ info, isOpen, onClose }) => {

    const [isFavorite, setIsFavorite] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <>

            <section
                id="floating-actions-container"
                className="fixed bottom-5 right-5 z-50"
            >

                <button
                    id="floating-actions-trigger" onClick={setupFloatingActions}
                    className="fixed bottom-[72px] right-5 z-50 flex items-center justify-center rounded-full bg-sky-500 p-2 shadow"
                >
                    <span className="material-symbols-outlined">
                        more_horiz
                    </span>
                </button>

                <div
                    id="floating-actions-menu"
                    className="absolute bottom-[82px] right-0 flex flex-col items-center  rounded-full bg-gray-100 p-1 shadow dark:bg-gray-900"
                >

                    <button
                        id="toggleDeleteAlert_btn"
                        onClick={() => document.getElementById("modal-box").showModal()}
                    >
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                    </button>


                    <Link
                        to="/edit"
                        id="edit_btn"
                        className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <span className="material-symbols-outlined">
                            edit_square
                        </span>
                    </Link>

                    <button
                        id="tts"
                        className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                    /* onClick={readOutLoud()} */
                    >
                        <span className="material-symbols-outlined">
                            volume_up
                        </span>
                    </button>

                    <button
                        id="favorite_btn"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-2xl hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        {isFavorite ? "❤️" : "🤍"}

                        {/* {favoriteState ? (
                <span className="outlineHeart material-symbols-outlined" height="24px">
                    favorite
                </span>
            ) : (

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




                {/* MODAL DELETE */}
                <dialog
                    id="modal-box"
                    className="
        relative
        m-auto
        w-[90%]
        max-w-md
        rounded-2xl
        border-0
        bg-white
        dark:bg-gray-700
        p-6
        shadow-2xl
        backdrop:bg-black/50">

                    {/* Close button */}
                    <button
                        className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
                        onClick={() => document.getElementById("modal-box").close()}
                    >
                        &times;
                    </button>

                    <div className="my-6 text-center">
                        <h2 className="text-lg text-red-500 font-semibold">
                            Are you sure you want to delete?
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="flex-1 rounded-full bg-gray-200 dark:bg-gray-700 px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-800
                            dark:text-gray-300 text-gray-900 "
                            onClick={() => document.getElementById("modal-box").close()}
                        >
                            Cancel
                        </button>

                        <button
                            id="deleteDataAccepted_btn"
                            className="flex-1 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                            onClick={() => {
                                // Delete logic here

                                document.getElementById("modal-box").close();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </dialog>
            </section>
        </>
    )
}

export default FloatingActionsMenu;