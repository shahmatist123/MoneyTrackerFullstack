import {createTheme } from '@mui/material/styles';

const setTheme = (theme: number) => {
    localStorage.setItem("theme", String(theme))
}
const getTheme = (): string | null => {
    return localStorage.getItem("theme")
}
export {setTheme, getTheme}
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});