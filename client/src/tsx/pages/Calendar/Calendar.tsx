import React, {useEffect, useState} from 'react';
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";
import {moneyPurchase} from "../../types/moneyType";
import styled from "styled-components";
import CalendarSidebar from "../../components/CalendarSidebar/CalendarSidebar";
import {useAppDispatch} from "../../../store/store";
import moneySlice, {currentMonthSelector, currentYearSelector, fetchMoneys} from "./moneySlice";
import {useSelector} from "react-redux";

export const calendarPath = "calendar"

const Modal = styled.span`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background: #fff;
  z-index: 1000;
  height: 400px;
`

const Bg = styled.span`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 100;
`

const CalendarWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`

const Calendar = () => {
    const dispatch = useAppDispatch()
    const year = useSelector(currentYearSelector)
    const month = useSelector(currentMonthSelector)
    const [activeMoney, setActiveMoney] = useState<moneyPurchase>({
        category: "",
        date: "",
        market: "",
        name: "",
        summ: 0,
        userId: 0,
        id: 0
    })
    const onClickCell = (money: moneyPurchase | undefined) => {
        money && setActiveMoney(money)
    }

    useEffect(() => {
        dispatch(fetchMoneys({year, month}))
    }, [year, month])

    return (
        <CalendarWrapper>
            {activeMoney.id !== 0 && (<>
                <Modal>{activeMoney.summ}</Modal>
                <Bg onClick={() => setActiveMoney({...activeMoney, id: 0})}></Bg>
            </>)}
            <CalendarGrid/>
            <CalendarSidebar/>
        </CalendarWrapper>
    )
}

export default Calendar;
