import React from 'react';
import Button from './Button';


const Footer = ({ setModalIsOpen }) => {

    return (
        <footer className='addBtnWrapper border-top border-secondary'>
            <Button icon="home" />
            <Button icon="plus-circle" onClick={() => setModalIsOpen(true)}/>
            <Button icon="search"/>
        </footer>
    )
}


export default Footer;