import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import styled from "styled-components";
import Calendar, {calendarPath} from "../pages/Calendar/Calendar";
import Dashboard, {dashboardPath} from "../pages/Dashboard";
import AddPurchases, {purchasesPath} from "../pages/AddPurchases";
import AddTicket, {ticketPath} from "../pages/AddTicket";
import Categories, {categoriesPath} from "../pages/Categories";
import CalendarUser, {calendarUserPath} from "../pages/CalendarUser";

const Content = styled.div`
  margin-top: 35px;
  flex: 1 1 100%;
  padding-left: 193px;
`
const MainRouter = () => {
    return (
        <Content>
            <Routes>
                <Route path={dashboardPath} element={<Dashboard />}/>
                <Route path={calendarPath} element={<Calendar />}/>
                <Route path={purchasesPath} element={<AddPurchases />}/>
                <Route path={ticketPath} element={<AddTicket />}/>
                <Route path={categoriesPath} element={<Categories />}/>
                <Route path={calendarUserPath} element={<CalendarUser />}/>
            </Routes>
        </Content>
    )
}
export default MainRouter;