import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllThemes} from "../api/themeApi/themeApi";
import {ITheme} from "../helpers/theme/types";

const initialState = {
    theme: [],
    currentTheme: 3
}

export const fetchTheme = createAsyncThunk(
    'theme/loadTheme',
    async (userId: number, thunkAPI) => {
        const response = await getAllThemes(userId)
        return response.data
    }
)

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTheme.fulfilled, (state, action) => {
            // Add user to the state array
            state.theme = action.payload.values
        })
    },
})

export const themeSelector = (state: any) => state.theme
export const currentTheme = (state: any) => {
    return state.theme.theme.find((item: any) => item.id === state.theme.currentTheme) || {}
}

export default themeSlice
