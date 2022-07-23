import {createContext} from 'react';
import {moneyListS} from "../Store/store/store";

export const MoneyContext = createContext<moneyListS>({} as moneyListS);
export const MoneyProvider = MoneyContext.Provider;