import {useContext} from 'react';
import {MoneyContext} from './moneyProvider';
import {moneyListS} from "../Store/store/store";

export const useMoneyStore = (): moneyListS => useContext(MoneyContext);