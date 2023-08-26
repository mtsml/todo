import React, { useEffect } from 'react';


const Modal = ({isOpen, callback, closeModal, children}) => {

    useEffect(() => {
        if (isOpen) {
            callback()
        }
    }, [isOpen])

    return (
        <div
            className={`modal-overlay${isOpen ? " slideUp" : ""}`}
            onClick={closeModal}
        >
            <div
                className={`tmodal p-2 border${isOpen ? " slideUp" : ""}`}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default Modal;