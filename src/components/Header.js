import React from 'react';
import { useRecoilState } from 'recoil';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink
} from 'mdb-react-ui-kit';
import { listState } from '../atoms/listState';


export const Header = () => {
  const [list, setList] = useRecoilState(listState);

  const handleFillClick = (id) => {
    setList(list.map(l => ({...l, isActive: l.id === id})))
  };

  return (
    <div className='overflow-x-scroll'>
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