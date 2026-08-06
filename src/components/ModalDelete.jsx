
const ModalDelete = ({ info, deleteQuestion }) => {


    function handleDelete() {

        deleteQuestion(info.id);

        document
            .getElementById("modal-box")
            .close();
    }


    return (
        <>
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
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </dialog>
        </>
    )
}

export default ModalDelete;