import React from 'react';
import Button from './Button';
import Filter from './Filter';


const Footer = ({ setModalIsOpen }) => {

    return (
        <footer className='addBtnWrapper px-2 border-top border-secondary'>
            <Filter/>
            <Button
                onClick={setModalIsOpen}
            />
        </footer>
    )
}


export default Footer;