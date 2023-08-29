import React, { useEffect } from 'react';


/**
 * 共通のモーダル部品。
 * 画面下からスライドして表示される。
 */
const Modal = ({isOpen, initModal, closeModal, children}) => {

    // モーダルが開いた際に任意の処理を実行する
    useEffect(() => {
        if (isOpen) {
            initModal()
        }
    }, [isOpen])

    return (
        <div
            className={`modal-overlay${isOpen ? " slideUp" : ""}`}
            onClick={closeModal}
        >
            <div
                className={`tmodal p-2 pb-3 border${isOpen ? " slideUp" : ""}`}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}


export default Modal;