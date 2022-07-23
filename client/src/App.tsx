import React from 'react';
import './App.css';
import MainHeader from "./tsx/components/MainHeader/MainHeader";
import "normalize.css";
import "./saas/common/fonts.scss";
import "./saas/common/main.scss";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import MainRouter from "./tsx/routes/MainRouter";
function App() {
    return (
        <div className="App">
            <Router>
                <MainHeader/>
                <MainRouter/>
            </Router>
        </div>
    );
}

export default App;
