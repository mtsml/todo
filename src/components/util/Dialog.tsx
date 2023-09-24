import { FC } from "react";
import { Button } from "./";


type Props = {
    open: boolean,
    ok: () => void,
    cancel: () => void,
    message: string
}


const Dialog: FC<Props> = ({ open, ok, cancel, message }) => {
    if (!open) return null; 

    return (
        <div
            className="overlay"
            onClick={cancel}
        >
            <div
                className="dialog p-3 pb-3 border rounded-5"
                onClick={e => e.stopPropagation()}
            >
                <p>{message}</p>
                <div className="d-flex justify-content-end">
                    <Button
                        label="戻る"
                        className="me-2"
                        color="dark"
                        onClick={cancel}
                    />
                    <Button
                        label="削除する"
                        color="danger"
                        onClick={ok}
                    />
                </div>
            </div>
        </div>
    );
}


export default Dialog;