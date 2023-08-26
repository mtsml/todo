import React, { useEffect } from 'react';


/**
 * 共通のモーダル部品。
 * 画面下からスライドして表示される。
 */
const Modal = ({isOpen, callback, closeModal, children}) => {

    // モーダルが開いた際に任意の処理を実行する
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