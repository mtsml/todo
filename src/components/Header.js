import React from 'react';
import { MDBTabs, MDBTabsItem, MDBTabsLink} from 'mdb-react-ui-kit';
import { useListHoook } from '../hooks/useList';
import Sidebar from './Sidebar';


export const Header = () => {
    const { lists, selectList, sidebarIsOpen, setSidebarIsOpen } = useListHoook();

    return (
        <header className='d-flex justify-content-between'>
            <div className="overflow-x-scroll">
                <MDBTabs className='mb-1 text-nowrap'>
                    {lists?.map(list => (
                        <MDBTabsItem key={list.id}>
                            <MDBTabsLink
                                className="py-3 px-3 fs-6"
                                onClick={() => !list.isActive && selectList(list.id)}
                                active={list.isActive}
                            >
                                {list.title}
                            </MDBTabsLink>
                        </MDBTabsItem>
                    ))}
                </MDBTabs>
            </div>
            <i
                className={`fas fa-2x pe-2 pt-2 ${sidebarIsOpen ? "fa-times" : "fa-bars"}`}
                style={{ zIndex: 10 }}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            />
            <Sidebar isOpen={sidebarIsOpen}/>
        </header>
    );
}

export default Header;