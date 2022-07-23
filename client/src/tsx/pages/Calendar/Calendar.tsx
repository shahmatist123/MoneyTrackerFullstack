import React, {useState} from 'react';
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";
import {MoneyI} from "../../types/moneyI";
import styled from "styled-components";

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

const Calendar = () => {
    const [activeMoney, setActiveMoney] = useState<MoneyI>({
        Category: "",
        Date: "",
        Market: "",
        Name: "",
        Summ: 0,
        UserId: 0,
        id: 0
    })
    const onClickCell = (money: MoneyI | undefined) => {
        money && setActiveMoney(money)
    }

    return (
        <>
            {activeMoney.id !== 0 && (<>
                <Modal>{activeMoney.Summ}</Modal>
                <Bg onClick={() => setActiveMoney({...activeMoney, id: 0})}></Bg>
            </>)}
            <CalendarGrid onClickCell={onClickCell}/>
        </>
    )
}

export default Calendar;
