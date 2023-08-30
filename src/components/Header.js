import React, { useState } from "react";
import { MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";
import Sidebar from "./Sidebar";
import { useList } from "../store/listState";


export const Header = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const { lists, toActive } = useList();

    return (
        <header className='w-100 d-flex justify-content-between border-bottom border-secondary'>
            <div className="overflow-x-scroll overflow-y-hidden scrollbar">
                <MDBTabs className="mb-0 w-max-content text-nowrap flex-nowrap">
                    {lists?.map(list => (
                        <MDBTabsItem key={list.id}>
                            <MDBTabsLink
                                className="py-3 px-3 fs-6 mb-0"
                                onClick={() => !list.isActive && toActive(list.id)}
                                active={list.isActive}
                            >
                                {list.title}
                            </MDBTabsLink>
                        </MDBTabsItem>
                    ))}
                </MDBTabs>
            </div>
                <i
                    className={`fas fa-2x px-2 pt-2 ${sidebarIsOpen ? "fa-times" : "fa-bars"}`}
                    style={{ zIndex: 25 }}
                    onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                />
            <Sidebar isOpen={sidebarIsOpen}/>
        </header>
    );
}

export default Header;