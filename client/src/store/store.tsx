import { configureStore } from '@reduxjs/toolkit'
import moneySlice from "../tsx/pages/Calendar/moneySlice";
import {useDispatch} from "react-redux";
import themeSlice from "../tsx/pages/themeSlice";
import categorySlice from "../tsx/pages/categorySlice";
import CalendarUserSlice from "../tsx/pages/calendarUserSlice";
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

const store = configureStore({
    reducer: {
        money: moneySlice.reducer,
        theme: themeSlice.reducer,
        category: categorySlice.reducer,
        calendarUser: CalendarUserSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
export type RootState = ReturnType<typeof store.getState>

export default store