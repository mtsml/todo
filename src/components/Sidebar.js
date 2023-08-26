import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarState } from '../atoms/SidebarState';
import { listState } from '../atoms/listState';
import './sidebar.css';


const Sidebar = () => {
  const sidebar = useRecoilValue(sidebarState);
  const [list, setList] = useRecoilState(listState);

  return (
    <div className={sidebar.isOpen ? "sidebar slideIn" : "sidebar"}>
        {list?.map(l => <li class="sidebar-item">{l.name}</li>)}
    </div>
  );
}


export default Sidebar;