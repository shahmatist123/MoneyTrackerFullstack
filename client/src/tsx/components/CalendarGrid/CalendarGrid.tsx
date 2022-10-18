import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {moneyItem, moneyPurchase} from "../../types/moneyI";
import {useMoneyStore} from "../../helpers/useStore";


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  flex-wrap: wrap;
  grid-gap: 1px;
  position: relative;
`
const ModalBg= styled.div`
position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0 0 0 / 46%);
`
const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 12px 12px 2px 1px rgba(138, 134, 134, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const ModalContent = styled.div`
  position: relative;
`
const ModalExitSvg = styled.svg`
  position: absolute;
  top: -28px;
  right: -28px;
  cursor: pointer;
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
    onClickCell: (money: moneyPurchase | undefined) => void
}

const CalendarGrid = (props: CalendarI) => {
    const [modalData, setModalData] = useState({})

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
        return sum ? strSum.splice(0, strSum.length - 2).join("") : "0"
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
            <Cell key={i} style={{height: cellHeight}} onClick={() => setModalData(currentMoney)}>
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
        <>
            <Grid>
                {getGrid()}
            </Grid>
            {Object.values(modalData).length && (
                <>
                    <ModalBg onClick={() => setModalData({})}></ModalBg>
                    <Modal>
                        <ModalContent>
                            <ModalExitSvg onClick={() => setModalData({})} fill="#000000" viewBox="0 0 50 50" width="30px" height="30px">
                                <path
                                    d="M 11.5 11 C 11.372 11 11.243984 11.048984 11.146484 11.146484 C 11.049484 11.244484 11 11.372 11 11.5 C 11 11.628 11.048484 11.755516 11.146484 11.853516 L 24.292969 25 L 11.146484 38.146484 C 10.951484 38.341484 10.951484 38.658516 11.146484 38.853516 C 11.244484 38.950516 11.372 39 11.5 39 C 11.628 39 11.755516 38.951516 11.853516 38.853516 L 25 25.707031 L 38.146484 38.853516 C 38.341484 39.048516 38.658516 39.048516 38.853516 38.853516 C 39.048516 38.657516 39.049516 38.342484 38.853516 38.146484 L 25.707031 25 L 38.853516 11.853516 C 39.048516 11.658516 39.048516 11.341484 38.853516 11.146484 C 38.657516 10.951484 38.342484 10.950484 38.146484 11.146484 L 25 24.292969 L 11.853516 11.146484 C 11.756016 11.048984 11.628 11 11.5 11 z"/>
                            </ModalExitSvg>
                            <span>оп!0_0 модалОчка</span>
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    )
}

export default CalendarGrid;
