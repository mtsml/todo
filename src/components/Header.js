import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink
} from 'mdb-react-ui-kit';
import { listState } from '../atoms/listState';
import Sidebar from './Sidebar';


export const Header = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [list, setList] = useRecoilState(listState);

  const handleFillClick = (id) => {
    setList(list.map(l => ({...l, isActive: l.id === id})))
  };

  return (
    <header className='d-flex justify-content-between'>
        <div className="overflow-x-scroll">
            <MDBTabs className='mb-3 text-nowrap ' style={{width: "max-content"}}>
                {list && list.map(l => (
                    <MDBTabsItem key={l.id}>
                        <MDBTabsLink
                            onClick={() => !l.isActive && handleFillClick(l.id)}
                            active={l.isActive}
                        >
                            {l.name}
                        </MDBTabsLink>
                    </MDBTabsItem>
                ))}
            </MDBTabs>
        </div>
        <MDBIcon
            className="pe-2 pt-2"
            style={{zIndex: 10}}
            fas
            icon="bars"
            size="2x"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        />
        <Sidebar
            isOpen={sidebarIsOpen}
        />
    </header>
  );
}

export default Header;