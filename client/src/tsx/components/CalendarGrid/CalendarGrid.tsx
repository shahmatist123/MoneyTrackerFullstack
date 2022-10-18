import React, {useEffect, useState} from 'react';

import styled from 'styled-components'
import {getPerMonth} from "../../api/MoneyApi/MoneyApi";
import {moneyItem, moneyPurchase} from "../../types/moneyI";
import {getApiValues} from "../../utils";
import {useMoneyStore} from "../../helpers/useStore";
import {Observer} from 'mobx-react';
import {MoneyProvider} from '../../helpers/moneyProvider';
import {moneyListS} from "../../Store/store/store";
import {computed, toJS} from 'mobx'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  flex-wrap: wrap;
  grid-gap: 1px;
`
const Day = styled.span`
  color: #fff;
  font-weight: 700;
  margin: 0 auto;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #007a6f;
  border-radius: 50%;
`
const Summ = styled.span`
  color: #000;
  margin: 0 20px;
  font-size: 14px;
  padding-top: 20px;
  font-weight: 400;
  display: block;
  text-align: center;
`

const Cell = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  background: #fff;
  box-shadow: 0px 0px 0px 1px #00d070;
  padding: 10px;
  cursor: pointer;
`
const getLastDay = (): number => {
    const days = []
    const newDate = new Date();
    const month = newDate.getMonth()
    newDate.setMonth(month + 1)
    newDate.setDate(0)
    return newDate.getDate()
}

interface CalendarI {
    onClickCell: (money: moneyPurchase|undefined) => void
}

const CalendarGrid = (props: CalendarI) => {
    const date = new Date();
    const [month, setMounth] = useState(date.getMonth());
    const [cellHeight, setCellHeight] = useState(0)
    date.setDate(1)
    const money = useMoneyStore().getMoney
    const lastDay = getLastDay()
    const resizeWindow = () => {
        setCellHeight(window.outerWidth / 12);
    };

    useEffect(() => {
        resizeWindow()
        window.addEventListener('resize', resizeWindow)
        return () => window.removeEventListener("resize", resizeWindow);
    }, [])

    const getSumMoney = (money: moneyItem): string => {
        let sum = 0;
        money?.tickets.forEach(ticket => {
            sum += ticket.summ
        })
        money?.purchases.forEach(purchase => {
            sum += purchase.summ * 100
        })
        const strSum = (sum + "").split("")
        return sum ? strSum.splice(0,  strSum.length - 2).join("") : "0"
    }

    const getContent = (i: number): JSX.Element => {
        const day = date.getDate()
        const currentMoney = money[i]
        date.setDate(day + 1)
        return (
            <>
                <Day>{day}</Day>
                <Summ>{getSumMoney(currentMoney)} ₽</Summ>
            </>
        )
    }

    const getCell = (i: number): JSX.Element => {
        const currentMoney = money[i]
        return (
            <Cell key={i} style={{height: cellHeight}}>
                {getContent(i)}
            </Cell>
        )
    }

    const getGrid = (): JSX.Element[] => {
        const cells = []
        for (let i = 1; i <= lastDay; i++) {
            cells.push(getCell(i))
        }
        return cells
    }

    return (
        <Grid>
            {getGrid()}
        </Grid>
    )
}

export default CalendarGrid;
