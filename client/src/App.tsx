import React from 'react';
import './App.css';
import "normalize.css";
import "./saas/common/fonts.scss";
import "./saas/common/main.scss";
import MainLayout from "./tsx/layouts/MainLayout";
import { lightTheme } from 'tsx/services/themeService';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function App() {
    return (
        <div className="App">
            <ThemeProvider theme={lightTheme}>
                <MainLayout/>
            </ThemeProvider>
        </div>
    );
}

export default App;
