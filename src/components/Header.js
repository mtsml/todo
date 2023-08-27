import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink
} from 'mdb-react-ui-kit';
import { useList } from '../atoms/listState';
import Sidebar from './Sidebar';


export const Header = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { lists, setList } = useList();

  const handleFillClick = (id) => {
    setList(lists.map(l => ({...l, isActive: l.id === id})))
  };

  return (
    <header className='d-flex justify-content-between'>
        <div className="overflow-x-scroll">
            <MDBTabs className='mb-1 text-nowrap' style={{width: "max-content"}}>
                {lists && lists.map(list => (
                    <MDBTabsItem key={list.id}>
                        <MDBTabsLink
                            className="py-3 px-3 fs-6"
                            onClick={() => !list.isActive && handleFillClick(list.id)}
                            active={list.isActive}
                        >
                            {list.name}
                        </MDBTabsLink>
                    </MDBTabsItem>
                ))}
            </MDBTabs>
        </div>
        <i
            className={`fas fa-2x pe-2 pt-2 ${sidebarIsOpen ? "fa-times" : "fa-bars"}`}
            style={{zIndex: 10}}
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        />
        <Sidebar
            isOpen={sidebarIsOpen}
        />
    </header>
  );
}

export default Header;