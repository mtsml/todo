import React from 'react';
import Button from './Button';


export const Alert = ({open, ok, cancel, message}) => {

  if (!open) return null; 

  return (
    <div
        className={`alert-overlay`}
        onClick={cancel}
    >
        <div
            className={`alert p-3 pb-3 border`}
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


export default Alert;