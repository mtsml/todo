import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Top from './Top';
import Detail from './Detail';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/detail" element={<Detail handleClick={() => alert("hoge")}/>} />
        </Routes>
    )
}
export default App;
