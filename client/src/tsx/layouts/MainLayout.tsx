import SideMenu from "../components/MainHeader/SideMenu";
import MainRouter from "../routes/MainRouter";
import React, {useEffect} from "react";
import styled, {ThemeProvider} from "styled-components";
import Footer from "../components/Footer/Footer";
import {Router} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {currentTheme, fetchTheme, themeSelector} from "../pages/themeSlice";
import {useSelector} from "react-redux";
import {fetchCategory} from "../pages/categorySlice";
import { GoogleLogin } from '@react-oauth/google';
import Login from "../components/Auth/Login";
const StyledLayout = styled.div`
  display: flex;
  height: 100%;
  background: ${props => props.theme.bgColor};
  min-height: 100vh;
`

const MainLayout = () => {
    const dispatch = useAppDispatch()
    const theme = useSelector(currentTheme)
    useEffect(() => {
        dispatch(fetchTheme(1))
        dispatch(fetchCategory())
    }, [])
    return (
        <>
            <ThemeProvider theme={theme}>
                <StyledLayout>
                    <SideMenu/>
                    <MainRouter/>
                </StyledLayout>
                <Login></Login>
            {/*<Footer/>*/}
            </ThemeProvider>
        </>
    )
}
export default MainLayout