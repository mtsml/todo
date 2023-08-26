import React from 'react';
import { useRecoilState } from 'recoil';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink
} from 'mdb-react-ui-kit';
import { filterState } from '../atoms/filterState';


const Filter = () => {
    const [filter, setFilterState] = useRecoilState(filterState);
  
    const handleClick = (key) => {
      if (key === filter.activeKey) {
        return;
      }  
      setFilterState({...filter, activeKey: key });
    };
  
    return (
      <>
        <MDBTabs pills justify className='mx-1'>
          {filter.options?.map(option => (
            <MDBTabsItem key={option.key}>
              <MDBTabsLink
                onClick={() => handleClick(option.key)}
                active={option.key === filter.activeKey}
              >
                {option.value}
              </MDBTabsLink>
            </MDBTabsItem>
          ))}
        </MDBTabs>
      </>
    );
  }


export default Filter;