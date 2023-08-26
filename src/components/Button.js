import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';


const Button = ({ size, onClick, className }) => {
    return (
        <MDBIcon
            fas
            icon="plus-circle"
            size={size || "3x"}
            onClick={onClick}
            className={className}
        >
        </MDBIcon>
    )
}


export default Button;