import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';


const Button = ({ icon, size, onClick, className }) => {
    return (
        <MDBIcon
            fas
            icon={icon}
            size={size || "2x"}
            onClick={onClick}
            className={className}
        >
        </MDBIcon>
    )
}


export default Button;