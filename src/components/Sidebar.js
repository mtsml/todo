import React from 'react';
import { useRecoilState } from 'recoil';
import { listState } from '../atoms/listState';


const Sidebar = ({ isOpen }) => {
  const [list, setList] = useRecoilState(listState);

  return (
    <div className={isOpen ? "pt-5 sidebar slideIn" : "pt-5 sidebar"}>
        {list?.map(l => (
            <div
                key={l.id}
                className="d-flex align-items-top m-1 p-2"
            >
                <div
                    className="w-100 ms-3 border-bottom border-secondary"
                >
                    {l.name}
                </div>
            </div>
        ))}
    </div>
  );
}


export default Sidebar;