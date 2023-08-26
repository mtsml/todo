import React from 'react';
import { useRecoilState } from 'recoil';
import {
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink
} from 'mdb-react-ui-kit';
import { listState } from '../atoms/listState';
import { sidebarState } from '../atoms/SidebarState';


export const Header = () => {
  const [list, setList] = useRecoilState(listState);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);

  const handleFillClick = (id) => {
    setList(list.map(l => ({...l, isActive: l.id === id})))
  };

  return (
    <div className='overflow-x-scroll'>
        <MDBIcon
            className="ps-2 pt-2"
            fas
            icon="bars"
            size="2x"
            onClick={() => setSidebar({isOpen: !sidebar.isOpen})}
        />
      <MDBTabs fill className='mb-3 text-nowrap' style={{width: "max-content"}}>
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
  );
}

export default Header;