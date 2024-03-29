import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import NumberInput from "../Input/NumberInput";
import moneySlice, {
    currentMonthSelector,
    currentYearSelector,
    fetchMoneys,
    focusedDaySelector,
    currentMoneySelector, setMoneysUsers, fetchMoneyItems, ticketItemsSelector
} from "../../pages/Calendar/moneySlice";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../store/store";
import {deleteTicket, setTicketItemsForUser} from "../../api/MoneyApi/MoneyApi";
import {calendarUser, moneyPurchase, ticketItem, tickets} from "../../types/moneyType";
import {categorySelector, CatItemI} from "../../pages/categorySlice";
import Modal from "../Modal/Modal";
import Checkbox from "../Input/Checkbox";
import {calendarUserSelector, fetchCalendarUser} from "../../pages/calendarUserSlice";
import {Box, Button, ButtonGroup, MenuItem, Select} from "@mui/material";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Sidebar = styled.div`
  margin-right: 39px;
  flex: 1 1 auto;
  display: flex;
  flex-flow: column;
  position: sticky;
  top: 35px;
  max-height: calc(100vh - 90px);
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

const Body = styled.div`
  margin-top: 35px;
  border-radius: 20px;
  background: ${props => props.theme.bgLight};
  padding: 22px;
  color: #fff;
  transition: all 0.5s;
  margin-left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1 1 auto;
  position: relative;
`
const BodyHeader = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  flex: 0 0 auto;
  padding-bottom: 11px;
  margin-right: -22px;
  margin-left: -16px;
  background: ${props => props.theme.bgLight};
  position: sticky;
  top: 0;
  z-index: 10;
`

const Sum = styled.div`
  font-size: 20px;
  text-align: center;
  flex: 0 0 auto;
  padding-bottom: 11px;
  padding-top: 11px;
  background: ${props => props.theme.bgLight};
  color: #ffffff;
  font-weight: 700;
`

const ItemCounter = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-right: 7px;
`

const ItemInfo = styled.div`
  font-size: 14px;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  box-orient: vertical;
`

const ItemUser = styled.div`
  font-size: 14px;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  box-orient: vertical;
  font-weight: 600;
`

const ItemSum = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-left: auto;
`

const Markers = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
`
const Item = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-bottom: 6px;
  color: #fff;
  max-height: 100%;
  padding: 0 20px;
  &:hover ${Markers}{
    opacity: 1;
    pointer-events: all;
  }
    
`
const MarkersFalse = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  cursor: pointer;
`
const MarkersTrue = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: lime;
  margin-right: 10px;
  cursor: pointer;
`
const MoneyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 40px;
  width: 100%;
`
const BodyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ModalWrapper = styled.div`

  max-width: 600px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  max-width: 600px;
  color: #fff;
  grid-gap: 10px;
`

const ModalContainer = styled.div`
 display: flex;
  justify-content: space-between;
  max-height: 100%;
  overflow: auto;
  padding: 40px;
  align-items: flex-start;
`
const Buttons = styled.div`
  display: flex;
  flex-flow: column;
  button {
    margin: 10px 0;
  }
`
interface SelectedItems {[key: number]: {checked?: boolean}}

const CalendarSidebar = () => {
    const dispatch = useAppDispatch()
    const ticketItems: ticketItem[] | undefined = useSelector(ticketItemsSelector)
    const currentYear = useSelector(currentYearSelector)
    const currentMonth = useSelector(currentMonthSelector)
    const currentMoney = useSelector(currentMoneySelector)
    const focusedDay = useSelector(focusedDaySelector)
    const allCats = useSelector(categorySelector)
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({})
    const [selectedUser, setSelectedUser] = useState<number>()
    const [selectedTicket, setSelectedTicket] = useState<number>()
    const calendarUsers: calendarUser[] = useSelector(calendarUserSelector)
    useEffect(() => {
        dispatch(fetchCalendarUser())
    }, [])
    const changeMonth = (month: number) => {
        dispatch(moneySlice.actions.changeMonth(month))
    }
    const changeYear = (year: number) => {
        dispatch(moneySlice.actions.changeYear(year))
    }

    useEffect(() => {
        if (currentMoney && Object.keys(currentMoney).length && selectedTicket) {
            dispatch(fetchMoneyItems({ticketId: selectedTicket}))
        }
    }, [currentMoney, selectedTicket])
    return (
        <Sidebar>
            <Header>
                <CounterItem>
                    <span>Choose Month</span>
                    <CounterWrapper>
                        <CounterAction onClick={() => {
                            changeMonth(currentMonth - 1)
                        }}>-</CounterAction>
                        <NumberInput
                            StyledInput={StyledInput}
                            value={currentMonth}
                            setFormValue={(value) => changeMonth(value || 0)}
                        />
                        <CounterAction onClick={() => {
                            changeMonth(currentMonth + 1)
                        }}>+</CounterAction>
                    </CounterWrapper>
                </CounterItem>
                <CounterItem>
                    <span>Choose Year</span>
                    <CounterWrapper>
                        <CounterAction onClick={() => {
                            changeYear(currentYear - 1)
                        }}>-</CounterAction>
                        <NumberInput
                            StyledInput={StyledInput}
                            value={currentYear}
                            setFormValue={(value) => changeYear(value || 0)}
                        />
                        <CounterAction onClick={() => {
                            changeYear(currentYear + 1)
                        }}>+</CounterAction>
                    </CounterWrapper>
                </CounterItem>
            </Header>
            {currentMoney && !!Object.keys(currentMoney).length &&
                <Body>
                    <BodyHeader>Day №{focusedDay}</BodyHeader>
                    <BodyWrapper>
                    {currentMoney.tickets.map((item: tickets) => {
                        return <MoneyItem onClick={() => {
                            setIsVisibleModal(true)
                            setSelectedTicket(item.id)
                        }} key={item.id}>
                            <span>{item.market}</span>
                            <span>{Math.floor(item.summ / 100)}</span>
                        </MoneyItem>
                    })}
                    {currentMoney.purchases.map((item: moneyPurchase) => {
                        return <MoneyItem onClick={() => {
                            setIsVisibleModal(true)
                        }} key={item.id}>
                            <span>{item.name || allCats.find((cat: CatItemI) => cat.id === item.categoryId)?.name}</span>
                            <span>{Math.floor(item.summ / 100)}</span>
                        </MoneyItem>
                    })}
                    </BodyWrapper>
                </Body>
            }
            <Modal isOpenP={isVisibleModal} onClose={() => {
                setIsVisibleModal(false)
                setSelectedItems({})
            }}>
                {ticketItems && <ModalContainer>
                    <Grid>
                        {ticketItems.map(item => (
                            <>
                                <Checkbox value={selectedItems[item.id]?.checked || false} onChange={(value) => {
                                    if (value) {
                                        setSelectedItems({...selectedItems, [item.id]: {checked: value}})
                                    } else {
                                        const newSelected = {...selectedItems}
                                        delete newSelected[item.id]
                                        setSelectedItems(newSelected)
                                    }
                                }}/>
                                {/*<Markers>*/}
                                {/*    <MarkersTrue></MarkersTrue>*/}
                                {/*    <MarkersFalse></MarkersFalse>*/}
                                {/*</Markers>*/}
                                <ItemCounter>
                                    {item.quantity}
                                </ItemCounter>
                                <ItemInfo>
                                    {item.name}
                                </ItemInfo>
                                <ItemSum>
                                    {item.summ / 100}₽
                                </ItemSum>
                                <ItemUser>
                                    {item.calendarUserId ? calendarUsers.find(user => user.id === item.calendarUserId)!.name : "Нет юзера"}
                                </ItemUser>
                            </>))}

                    </Grid>
                    <ModalWrapper>
                        <Select
                            value={selectedUser}
                            label="Name"
                            onChange={(e) => setSelectedUser(parseInt(e.target.value+""))}
                        >
                            {calendarUsers.map((item: {id: number, name: string}) => {
                                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            })}
                        </Select>
                        <Sum>{ticketItems
                            .filter((item) => {
                                return selectedItems[item.id]?.checked
                            })
                            .reduce((acc, next) => acc += Math.floor(next.summ / 100), 0)}₽</Sum>
                        <Box
                            sx={{
                                display: 'flex',
                                '& > *': {
                                    m: 1,
                                },
                            }}
                        >
                            <Buttons>
                                <Button variant="contained"
                                        onClick={() => selectedUser && dispatch(setMoneysUsers({calendarUserId: selectedUser, id: Object.keys(selectedItems).map(item => parseInt(item))}))}
                                >
                                    Add Ticket Items For User
                                </Button>
                                <Button variant="outlined" onClick={() => {
                                    const selectedIds = Object.keys(selectedItems).map(item => parseInt(item))
                                    const reversedItems = ticketItems.filter((item) => !(selectedIds.indexOf(item.id) + 1))
                                    const reversedIds: SelectedItems = {}
                                    reversedItems.forEach((item) => {
                                        reversedIds[item.id] = {checked: true}
                                    })
                                    // @ts-ignore
                                    setSelectedItems(reversedIds)
                                }}>Reverse</Button>
                                <Button variant="contained" color="error" onClick={() => selectedTicket && deleteTicket(selectedTicket)}>
                                    DELETE
                                </Button>
                            </Buttons>
                        </Box>
                    </ModalWrapper>
                </ModalContainer>}
            </Modal>
        </Sidebar>)
}
export default CalendarSidebar