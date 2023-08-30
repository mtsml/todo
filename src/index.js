import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import Main from "./components/Main";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RecoilRoot>
        <Main />
    </RecoilRoot>
);