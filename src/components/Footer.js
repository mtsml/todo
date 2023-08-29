import React from 'react';
import { MDBTabs, MDBTabsItem, MDBTabsLink } from 'mdb-react-ui-kit';


const FILTER_OPTIONS = [
    { key: "all", value: "すべて" },
    { key: "active", value: "未完了" },
    { key: "completed", value: "完了" }
]


const Footer = ({ activeFilter, setActiveFilter, setModalIsOpen }) => {

    return (
        <footer className='px-2 pt-1 pb-3 border-top border-secondary'>
            <MDBTabs pills justify className='w-100'>
                {FILTER_OPTIONS.map(option => (
                    <MDBTabsItem key={option.key}>
                        <MDBTabsLink
                            className="p-3 fs-6"
                            onClick={() => option.key !== activeFilter && setActiveFilter(option.key)}
                            active={option.key === activeFilter}
                        >
                            {option.value}
                        </MDBTabsLink>
                    </MDBTabsItem>
                ))}
            </MDBTabs>
            <i
                className="fas fa-plus-circle fa-3x text-primary"
                onClick={setModalIsOpen}
            />
        </footer>
    )
}


export default Footer;