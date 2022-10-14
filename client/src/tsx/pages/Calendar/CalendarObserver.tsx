import React, {useEffect, useState} from 'react';
import {Observer} from 'mobx-react';
import Calendar from "./Calendar";
import {MoneyI} from "../../types/moneyI";
import {getPerMonth} from "../../api/MoneyApi/MoneyApi";
import {moneyListS} from "../../Store/store/store";
import {MoneyProvider} from "../../helpers/moneyProvider";
import CalendarGrid from "../../components/CalendarGrid/CalendarGrid";


const CalendarObserver = () => {
    const [money, setMoney] = useState<MoneyI[]>([]);
    let moneyStore
    useEffect(() => {
        getPerMonth().then((result) => {
            setMoney(result.data.values.purchaseList)
        })
        return
    }, [])
    if (!money) {
        return <></>
    } else {
        moneyStore = new moneyListS(money)
    }
    return (
        <>
            <MoneyProvider value={moneyStore}>
                <Observer>
                    {() => (<Calendar/>)}
                </Observer>
            </MoneyProvider>
        </>
    )
}

export default CalendarObserver;
