import React from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";
import { FILTER_OPTIONS } from "../util/constant";


const Footer = ({ activeFilter, setActiveFilter, openTaskDrawer }) => {
    return (
        <footer className="px-2 py-0 border-top">
            <MDBTabs pills justify className="w-100">
                {FILTER_OPTIONS.map(option => (
                    <MDBTabsItem key={option.key}>
                        <MDBTabsLink
                            className="p-3 fs-6 rounded-9"
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
                onClick={() => openTaskDrawer()}
            />
        </footer>
    );
}


export default Footer;