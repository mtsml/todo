import { ComponentProps, FC } from "react";
import { MDBBtn } from "mdb-react-ui-kit";


type Props = {
    label: string,
    color?: ComponentProps<typeof MDBBtn>["color"],
    onClick: () => void,
    className?: string
}


const Button: FC<Props> = ({ label, color, onClick, className }) => {
    return (
        <MDBBtn
            outline
            rounded
            color={color}
            className={`px-3 py-1 fs-6 ${className ? className : ""}`}
            onClick={onClick}
        >
            {label}
        </MDBBtn>
    );
} 


export default Button;