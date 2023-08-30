import React, { useEffect, useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";


/**
 * 共通のモーダル部品。
 * 画面下からスライドして表示する。
 */
const SlideModal = ({isOpen, initModal, closeModal, isEditMode, add, update, remove, children}) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    // モーダルが開いた際に任意の処理を実行する
    useEffect(() => {
        if (isOpen) {
            initModal()
        }
    }, [isOpen])

    return (
        <>
            <div
                className={`${isOpen ? "overlay slideUp" : ""}`}
                onClick={closeModal}
            >
                <div
                    className={`slide-modal p-3 pb-3 border${isOpen ? " slideUp" : ""}`}
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
                                    onClick={() => setDialogIsOpen(true)}
                                />
                            )}
                            <Button
                                label={isEditMode ? "更新" : "追加"}
                                onClick={() => isEditMode ? update() : add()}
                            />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            {/* 削除時は確認画面を表示する */}
            <Dialog
                open={dialogIsOpen}
                cancel={() => setDialogIsOpen(false)}
                ok={() => {
                    setDialogIsOpen(false);
                    remove();
                }}
                message="削除しますか？"
            />
        </>
    )
}


export default SlideModal;