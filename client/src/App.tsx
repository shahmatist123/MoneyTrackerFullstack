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
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
    return (
        <div className="App">
            <GoogleOAuthProvider clientId="792159907801-v9pqnpcfn6h8qja0ptontt22fqsd8u0o.apps.googleusercontent.com">
                <ThemeProvider theme={lightTheme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MainLayout/>
                    </LocalizationProvider>
                </ThemeProvider>
            </GoogleOAuthProvider>
        </div>
    );
}

export default App;
