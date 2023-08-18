import React, { useEffect, useState } from "react";
import Button from "./Button";
import Dialog from "./Dialog";


/**
 * Drawer。
 * 画面下からスライドして表示する。
 */
const Drawer = ({ isOpen, init, close, isEditMode, add, update, remove, children }) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [startY, setStartY] = useState(0);
    const [moveY, setMoveY] = useState(0);

    // drawerが開いた際に任意の処理を実行する
    useEffect(() => {
        if (isOpen) {
            init();
        }
    }, [isOpen]);

    return (
        <>
            <div
                className={`${isOpen ? "overlay slideUp" : ""}`}
                onClick={close}
            >
                <div
                    className={`drawer p-3 pb-3 border${isOpen ? " slideUp" : ""}`}
                    style={{
                        // 下方向のみにスワイプ可能
                        bottom: Math.min(0, moveY),
                        // スワイプ中は滑らかにスクロールするためにtransitionを付与しない
                        transition: startY === 0 ? "all 0.4s ease" : ""
                    }}
                    onClick={e => e.stopPropagation()}
                    onTouchStart={e => setStartY(e.touches[0].pageY)}
                    onTouchMove={e => setMoveY(startY - e.changedTouches[0].pageY)}
                    onTouchEnd={e => {
                        setStartY(0);
                        if (e.target.clientHeight * 0.5 < -moveY) {
                            close();
                        }
                        setMoveY(0);
                    }}
                >
                    {/* drawerのつまみ部分 */}
                    <div className="d-flex justify-content-center mb-3">
                        <div className="w-25 border border-3 bg-secondary rounded" />
                    </div>
                    <div className="mb-2 d-flex">
                        <i
                            className="fas fa-2x fa-times ps-1 text-secondary"
                            onClick={close}
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


export default Drawer;