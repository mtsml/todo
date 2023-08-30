import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";


const Button = ({ label, color, onClick, className }) => {
    return (
        <MDBBtn
            outline
            rounded
            color={color}
            className={`px-3 py-1 fs-6 ${className}`}
            onClick={onClick}
        >
            {label}
        </MDBBtn>
    );
} 


export default Button;