import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import NumberInput from "../Input/NumberInput";
import moneySlice, {currentMonthSelector, currentYearSelector, fetchMoneys} from "../../pages/Calendar/moneySlice";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../store/store";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Sidebar = styled.div`
  margin-right: 39px;
  flex: 1 1 auto;
`

const TicketsList = styled.div`
  background: ${props => props.theme.bgLight};
  border-radius: 20px;
  padding: 26px 16px;
`
const CounterItem = styled.div`
  gap: 35px;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
`
const StyledInput = styled.input`
  height: 25px;
  text-align: center;
  background: #292A2F;
  border: 1px solid #383838;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  margin-left: 4px;
  margin-right: 4px;
  width: 47px;
`

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`

const CounterAction = styled.div`
  display: flex;
  align-items: center;
  font-size: 19px;
  background: #292A2F;
  border: 1px solid #383838;
  border-radius: 5px;
  width: 25px;
  height: 25px;
  justify-content: center;
  user-select: none;
  cursor: pointer;
`

const CalendarSidebar = () => {
    const dispatch = useAppDispatch()
    const currentYear = useSelector(currentYearSelector)
    const currentMonth = useSelector(currentMonthSelector)

    const changeMonth = (month: number) => {
        dispatch(moneySlice.actions.changeMonth(month))
    }
    const changeYear = (year: number) => {
        dispatch(moneySlice.actions.changeYear(year))
    }

    return (
        <Sidebar>
            <Header>
                <CounterItem>
                    <span>Choose Month</span>
                    <CounterWrapper>
                        <CounterAction onClick={() => {changeMonth(currentMonth - 1)}}>-</CounterAction>
                        <NumberInput
                            StyledInput={StyledInput}
                            value={currentMonth}
                            setFormValue={(value) => changeMonth(value || 0)}
                        />
                        <CounterAction onClick={() => {changeMonth(currentMonth + 1)}}>+</CounterAction>
                    </CounterWrapper>
                </CounterItem>
                <CounterItem>
                    <span>Choose Year</span>
                    <CounterWrapper>
                        <CounterAction onClick={() => {changeYear(currentYear - 1)}}>-</CounterAction>
                        <NumberInput
                            StyledInput={StyledInput}
                            value={currentYear}
                            setFormValue={(value) => changeYear(value || 0)}
                        />
                        <CounterAction onClick={() => {changeYear(currentYear + 1)}}>+</CounterAction>
                    </CounterWrapper>
                </CounterItem>
            </Header>
        </Sidebar>)
}
export default CalendarSidebar