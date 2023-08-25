import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Top from './components/Top';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <Top />
    </RecoilRoot>
);
