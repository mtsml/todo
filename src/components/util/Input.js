import React, { forwardRef } from "react";


const Input = forwardRef(({ value, setValue, label, rows = 1 }, ref) => {
    return (
        <>
            {label && <label className="mt-2" style={{ fontSize: "12px" }}>{label}</label>}
            <textarea
                ref={ref}
                className="w-100 border-0 border-bottom"
                type="textarea"
                rows={rows}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </>
    );
});


export default Input;