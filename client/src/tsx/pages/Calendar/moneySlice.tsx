import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPerMonth} from "../../api/MoneyApi/MoneyApi";

const date = new Date()

const initialState = {
    moneys: {},
    currentYear: date.getFullYear(),
    currentMonth: date.getMonth()
}

export const fetchMoneys = createAsyncThunk(
    'money/loadMoneys',
    async ({month, year}: {month: number, year: number}, thunkAPI) => {
        const response = await getPerMonth(month, year)
        return response.data
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
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchMoneys.fulfilled, (state, action) => {
            // Add user to the state array
            state.moneys = action.payload.values
        })
    },
})

export const moneySelector = (state: any) => state.money.moneys
export const currentYearSelector = (state: any) => state.money.currentYear
export const currentMonthSelector = (state: any) => state.money.currentMonth

export default moneySlice
