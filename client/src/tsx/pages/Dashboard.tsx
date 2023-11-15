import React from "react";
import dayjs from "dayjs";
import {StaticDatePicker} from "@mui/x-date-pickers";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import dashboardSlice, {dashboardSelector, fetchTicketItemsPeriod} from "./dashboardSlice";
import { useEffect } from "react";
import {calendarUserSelector, fetchCalendarUser, UserItemI} from "./calendarUserSlice";
import {useAppDispatch} from "../../store/store";
import {ticketItem} from "../types/moneyType";

export const dashboardPath = "dashboard"
const DatePicker = styled.div`
  width: 320px;
`
const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`
const UsersInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  color: #fff;
  font-weight: 700;
  padding-right: 60px;
  div{
    cursor: pointer;
  }
`
const DashboardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`
const Summ = styled.div`
  font-weight: 700;
`
const Active = styled.div`
  background: rgb(41, 42, 47);
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
`
const GridItem = styled.div`
  color: #fff;
  display: block;
  padding: 10px;
  margin-top: 10px;
`

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const dashboard = useSelector(dashboardSelector)
    const calendarUsers = useSelector(calendarUserSelector)
    const date = new Date()
    const deps = [dashboard.startDay, dashboard.startMonth, dashboard.startYear, dashboard.endYear, dashboard.endDay, dashboard.endMonth, dashboard.calendarUserId]
    date.setDate(date.getDate() - date.getDay() + 1)
    const summ: any = []
    if (dashboard.tickets) {
        dashboard.tickets.forEach((item: any) => {
            if (item.ticketItems.length) {
                item.ticketItems.forEach((ticket: any) => summ.push(ticket))
            }
        })
    }
    useEffect(() => {
        dispatch(fetchCalendarUser())
        setTimeout(() => {
            setStart(dayjs(date))
            setEnd(dayjs())
        }, 1000)
    }, [])
    useEffect(() => {
        dispatch(fetchTicketItemsPeriod(dashboard))
    }, deps)
    const setStart = (value: any) => {
        const startDay = value.$d.getDate()
        const startYear = value.$d.getFullYear()
        const startMonth = value.$d.getMonth()
        dispatch(dashboardSlice.actions.changeStart({startDay, startYear, startMonth}))
    }
    const setEnd = (value: any) => {
        const endDay = value.$d.getDate()
        const endYear = value.$d.getFullYear()
        const endMonth = value.$d.getMonth()
        dispatch(dashboardSlice.actions.changeEnd({endDay, endYear, endMonth}))
    }
    return <div>
        <DashboardContainer>
            <DatePickerWrapper>
                <DatePicker>
                    <StaticDatePicker onChange={setStart} defaultValue={dayjs(date)}/>
                </DatePicker>
                <DatePicker>
                    <StaticDatePicker onChange={setEnd} defaultValue={dayjs()}/>
                </DatePicker>
            </DatePickerWrapper>
            <UsersInfo>
                {calendarUsers.map((item: { id: number; name: string; }) => {
                    return <div key={item.id} onClick={() => dispatch(dashboardSlice.actions.changeUserId(item.id))}>
                        {dashboard.calendarUserId === item.id ? <Active>{item.name}</Active> : item.name}
                        <Summ>
                            {summ.reduce((acc: number, next: any) => acc+=Math.floor(next.summ / 100), 0 )}
                        </Summ>
                    </div>
                })}
            </UsersInfo>
        </DashboardContainer>
        {dashboard.tickets?.length && <Grid>
            {summ.map((ticketItem: ticketItem) => <>
                <GridItem>
                    {ticketItem.name}
                </GridItem>
                <GridItem>
                    {ticketItem.price / 100} ₽
                </GridItem>
                <GridItem>
                    {calendarUsers.find((user: UserItemI) => user.id === ticketItem.calendarUserId)?.name}
                </GridItem>
            </>)}
        </Grid>}
    </div>
}
export default Dashboard