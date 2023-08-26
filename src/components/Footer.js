import React from 'react';
import Button from './Button';


const Footer = ({ setModalIsOpen }) => {

    return (
        <footer className='addBtnWrapper border-top border-secondary'>
            <Button icon="plus-circle" onClick={() => setModalIsOpen(true)}/>
            <span>リスト編集</span>
        </footer>
    )
}


export default Footer;