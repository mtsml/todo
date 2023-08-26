import React from 'react';
import { useRecoilState } from 'recoil';
import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink
} from 'mdb-react-ui-kit';
import { filterState } from '../atoms/filterState';


const Footer = ({ setModalIsOpen }) => {
    const [filter, setFilterState] = useRecoilState(filterState);
  
    const handleClick = (key) => {
      if (key === filter.activeKey) {
        return;
      }  
      setFilterState({...filter, activeKey: key });
    };
  
    return (
        <footer className='addBtnWrapper px-2 pt-1 pb-3 border-top border-secondary'>
            <MDBTabs pills justify className='w-100'>
                {filter.options.map(option => (
                    <MDBTabsItem key={option.key}>
                        <MDBTabsLink
                            className="p-3"
                            onClick={() => handleClick(option.key)}
                            active={option.key === filter.activeKey}
                        >
                            {option.value}
                        </MDBTabsLink>
                    </MDBTabsItem>
                ))}
            </MDBTabs>
            <MDBIcon
                fas
                icon="plus-circle"
                size="3x"
                color="primary"
                onClick={setModalIsOpen}
            />
        </footer>
    )
}


export default Footer;