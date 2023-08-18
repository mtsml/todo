import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';


const Footer = ({ setModalIsOpen }) => {
    const navigate = useNavigate();

    return (
        <footer className='addBtnWrapper border-top border-secondary'>
            <Button icon="home" onClick={() => navigate("/")} />
            <Button icon="plus-circle" onClick={() => setModalIsOpen(true)}/>
            <Button icon="search"/>
        </footer>
    )
}


export default Footer;