import React from 'react';
import './App.css';
import "normalize.css";
import "./saas/common/fonts.scss";
import "./saas/common/main.scss";
import MainLayout from "./tsx/layouts/MainLayout";
import { lightTheme } from 'tsx/services/themeService';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function App() {
    return (
        <div className="App">
            <ThemeProvider theme={lightTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MainLayout/>
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
