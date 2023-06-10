import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {add, deleteCat, get} from "../api/CalendarUserApi/CalendarUserApi";

export interface UserItemI {
    id: number, name: string
}

interface initialStateI {
    users: UserItemI[]
}
const initialState: initialStateI = {
    users: []
}

export const fetchCalendarUser = createAsyncThunk(
    'calendar-user/loadCalendarUser',
    async () => {
        const response = await get()
        return response.data
    }
)

export const addCalendarUser = createAsyncThunk(
    'calendar-user/addCalendarUser',
    async (cat: {name: string, is_positive: boolean}) => {
        const response = await add(cat)
        return response.data
    }
)

export const deleteCalendarUser = createAsyncThunk(
    'calendar-user/deleteCalendarUser',
    async (id: number) => {
        await deleteCat(id)
        return id
    }
)

const calendarUserSlice = createSlice({
    name: 'calendarUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCalendarUser.fulfilled, (state, action) => {
            state.users = action.payload
        })
        builder.addCase(addCalendarUser.fulfilled, (state, action) => {
            state.users = [...state.users, action.payload]
        })
        builder.addCase(deleteCalendarUser.fulfilled, (state, action) => {
            state.users = state.users.filter(item => item.id !== action.payload)
        })
    },
})

export const calendarUserSelector = (state: any) => state.calendarUser.users

export default calendarUserSlice
