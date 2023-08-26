import React from 'react';
import { useRecoilState } from 'recoil';
import { listState } from '../atoms/listState';


const Sidebar = ({ isOpen }) => {
  const [list, setList] = useRecoilState(listState);

  return (
    <div className={isOpen ? "sidebar slideIn" : "sidebar"}>
        {list?.map(l => <li class="sidebar-item">{l.name}</li>)}
    </div>
  );
}


export default Sidebar;