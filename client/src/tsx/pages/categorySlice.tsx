import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {add, deleteCat, get} from "../api/CategoriesApi/CategoriesApi";

interface initialStateI {
    categories: {id: number, name: string, is_positive: boolean}[]
}
const initialState: initialStateI = {
    categories: []
}

export const fetchCategory = createAsyncThunk(
    'category/loadCategory',
    async () => {
        const response = await get()
        return response.data
    }
)

export const addCategory = createAsyncThunk(
    'category/addCategory',
    async (cat: {name: string, is_positive: boolean}) => {
        const response = await add(cat)
        return response.data
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id: number) => {
        await deleteCat(id)
        return id
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.categories = action.payload
        })
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.categories = [...state.categories, action.payload]
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(item => item.id !== action.payload)
        })
    },
})

export const categorySelector = (state: any) => state.category.categories

export default categorySlice
