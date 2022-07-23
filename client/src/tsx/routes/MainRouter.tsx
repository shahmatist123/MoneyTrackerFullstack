import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "../pages/Main";
import styled from "styled-components";
import CalendarObserver from "../pages/Calendar/CalendarObserver";

const Content = styled.div`
  margin-top: 50px;
`
const MainRouter = () => {
    return (
        <Content>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/calendar" element={<CalendarObserver />}/>
            </Routes>
        </Content>
    )
}
export default MainRouter;