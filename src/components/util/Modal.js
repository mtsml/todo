import React, { useEffect, useState } from 'react';
import Button from './Button';
import Alert from './Dialog';


/**
 * 共通のモーダル部品。
 * 画面下からスライドして表示される。
 */
const Modal = ({isOpen, initModal, closeModal, isEditMode, add, update, remove, children}) => {
    const [alertOpen, setAlertOpen] = useState(false);

    // モーダルが開いた際に任意の処理を実行する
    useEffect(() => {
        if (isOpen) {
            initModal()
        }
    }, [isOpen])

    return (
        <>
            <div
                className={`modal-overlay${isOpen ? " slideUp" : ""}`}
                onClick={closeModal}
            >
                <div
                    className={`tmodal p-3 pb-3 border${isOpen ? " slideUp" : ""}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="mb-2 d-flex">
                        <i
                            className="fas fa-2x fa-times ps-1 text-secondary"
                            onClick={closeModal}
                        />
                        {/* 削除ボタンの表示状態に関わらずまとめて右寄せにするためにdivで囲う */}
                        <div
                            className="ms-auto"
                        >
                            {isEditMode && (
                                <Button
                                    label="削除"
                                    className="me-2"
                                    color="danger"
                                    onClick={() => {
                                        setAlertOpen(true)
                                    }}
                                />
                            )}
                            <Button
                                label={isEditMode ? "更新" : "追加"}
                                onClick={() => {
                                    isEditMode ? update() : add()
                                    closeModal();
                                }}
                            />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <Alert
                open={alertOpen}
                cancel={() => setAlertOpen(false)}
                ok={() => {
                    remove();
                    setAlertOpen(false);
                    closeModal();
                }}
                message="削除しますか？"
            />
        </>
    )
}


export default Modal;