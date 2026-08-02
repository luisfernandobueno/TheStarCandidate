import { useState } from "react";


const ModalDelete = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {/* <button oncClick={() => setIsOpen(true)}>
                <span className="material-symbols-outlined"> delete_forever </span>
            </button> */}

            <button oncClick={() => setIsOpen(true)}>
                delete
            </button>

            {isOpen && <div className="">
                <div>               
                    <h2>This is a modal</h2>
                </div>

            </div>}
        </>
    )
};




export default ModalDelete;