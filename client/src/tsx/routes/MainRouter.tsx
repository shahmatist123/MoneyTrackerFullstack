import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "../pages/Main";
import styled from "styled-components";
import Calendar from "../pages/Calendar/Calendar";

const Content = styled.div`
  margin-top: 35px;
  flex: 1 1 100%;
  padding-left: 193px;
`
const MainRouter = () => {
    return (
        <Content>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/calendar" element={<Calendar />}/>
            </Routes>
        </Content>
    )
}
export default MainRouter;