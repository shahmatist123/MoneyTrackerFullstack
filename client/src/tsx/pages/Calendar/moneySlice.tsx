import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getMoneyItems, getPerMonth, setTicketItemsForUser} from "../../api/MoneyApi/MoneyApi";
import {moneyItem, moneyObject, ticketItem, tickets} from "../../types/moneyType";

const date = new Date()
interface initialStateI {
    moneys: moneyObject,
    currentYear: number,
    currentMonth: number,
    focusedDay: null | number,
    ticketItems: ticketItem[] | undefined
}
const initialState: initialStateI = {
    moneys: {},
    currentYear: date.getFullYear(),
    currentMonth: date.getMonth(),
    focusedDay: null,
    ticketItems: undefined
}

export const fetchMoneys = createAsyncThunk(
    'money/loadMoneys',
    async ({month, year}: {month: number, year: number}, thunkAPI) => {
        const response = await getPerMonth(month, year)
        return response.data
    }
)

export const fetchMoneyItems = createAsyncThunk(
    'money/getMoneyItems',
    async ({ticketId}: {ticketId: number}, thunkAPI) => {
        const response = await getMoneyItems(ticketId)
        return response.data
    }
)

export const setMoneysUsers = createAsyncThunk(
    'money/setMoneysUsers',
    async ({calendarUserId, id}: {calendarUserId: number, id: number[]}, thunkAPI) => {
        const response = await setTicketItemsForUser({calendarUserId, id})
        return {calendarUserId, id}
    }
)

const moneySlice = createSlice({
    name: 'money',
    initialState,
    reducers: {
        changeMonth: (state, action) => {
            state.currentMonth = action.payload
        },
        changeYear: (state, action) => {
            state.currentYear = action.payload
        },
        changeFocusedDay: (state, action) => {
            state.focusedDay = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoneys.fulfilled, (state, action) => {
            // Add user to the state array
            state.moneys = action.payload.values
        })
        builder.addCase(fetchMoneyItems.fulfilled, (state, action) => {
            // Add user to the state array
            state.ticketItems = action.payload.values
        })
        builder.addCase(setMoneysUsers.fulfilled, (state, action) => {
            // Add user to the state array
            // state.moneys = action.payload.values
            if (state.ticketItems) {
                state.ticketItems = state.ticketItems.map(item => {
                    const newItem = {...item}
                    if (action.payload.id.find((id) => item.id === id)) {
                        newItem.calendarUserId = action.payload.calendarUserId
                    }
                    return newItem
                })
            }
            console.log()
        })
    },
})

export const moneySelector = (state: any) => state.money.moneys
export const currentYearSelector = (state: any) => state.money.currentYear
export const currentMonthSelector = (state: any) => state.money.currentMonth
export const focusedDaySelector = (state: any) => state.money.focusedDay
export const ticketItemsSelector = (state: any) => state.money.ticketItems
export const currentMoneySelector = (state: any) => moneySelector(state)[state.money.focusedDay]

export default moneySlice
