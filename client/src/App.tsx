import React from 'react';
import './App.css';
import "normalize.css";
import "./saas/common/fonts.scss";
import "./saas/common/main.scss";
import MainLayout from "./tsx/layouts/MainLayout";
function App() {
    return (
        <div className="App">
            <MainLayout/>
        </div>
    );
}

export default App;
