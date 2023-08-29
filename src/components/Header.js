import React, { useState, useEffect } from 'react';
import { MDBTabs, MDBTabsItem, MDBTabsLink} from 'mdb-react-ui-kit';
import listAPI from '../api/listAPI';
import { useList } from '../store/listState';
import Sidebar from './Sidebar';


export const Header = () => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const { lists, setList } = useList();

    useEffect(() => {
        (async () => {
            const data = await listAPI.fetchLists();
            setList(data);
        })();
    }, [])

    const selectList = (id) => {
        setList(lists.map(list => ({...list, isActive: list.id === id})))
    };

    return (
        <header className='d-flex justify-content-between border-bottom border-secondary'>
            <div className="overflow-x-scroll scrollbar-hidden">
                <MDBTabs className="text-nowrap w-max-content mb-0">
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
                className={`fas fa-2x px-2 pt-2 ${sidebarIsOpen ? "fa-times" : "fa-bars"}`}
                style={{ zIndex: 10 }}
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            />
            <Sidebar isOpen={sidebarIsOpen}/>
        </header>
    );
}

export default Header;