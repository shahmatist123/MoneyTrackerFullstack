import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTicketItemsFromPeriod} from "../api/MoneyApi/MoneyApi";
import {ticketItem} from "../types/moneyType";

interface initialStateI {
    startYear: number,
    endYear: number,
    startMonth: number,
    endMonth: number,
    startDay: number,
    endDay: number,
    calendarUserId: number,
    ticketItems?: ticketItem[]
}

const initialState: initialStateI = {
    startYear: 0,
    endYear: 0,
    startMonth: 0,
    endMonth: 0,
    startDay: 0,
    endDay: 0,
    calendarUserId: 0,
    ticketItems: undefined
}

export const fetchTicketItemsPeriod = createAsyncThunk(
    'dashboard/fetchTicketItemsPeriod',
    async ({startYear, endYear, startMonth, endMonth, startDay, endDay, calendarUserId}: {
        [key: string]: number
    }, thunkAPI) => {
        const response = await getTicketItemsFromPeriod({
            startYear,
            endYear,
            startMonth,
            endMonth,
            startDay,
            endDay,
            calendarUserId
        })
        return response.data
    }
)

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        changeStart: (state, action) => {
            const {startYear, startMonth, startDay} = action.payload
            state.startYear = startYear
            state.startMonth = startMonth
            state.startDay = startDay
        },
        changeEnd: (state, action) => {
            const {endYear, endMonth, endDay} = action.payload
            state.endYear = endYear
            state.endMonth = endMonth
            state.endDay = endDay
        },
        changeUserId: (state, action) => {
            state.calendarUserId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTicketItemsPeriod.fulfilled, (state, action) => {
            state.ticketItems = action.payload
        })
    },
})

export const dashboardSelector = (state: any) => state.dashboard
export const currentDashboard = (state: any) => {
    return state.dashboard.dashboard.find((item: any) => item.id === state.dashboard.currentDashboard) || {}
}

export default dashboardSlice
