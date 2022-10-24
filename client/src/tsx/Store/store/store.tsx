import {action, computed, observable} from "mobx";
import {makeAutoObservable} from 'mobx'
import {moneyItem, moneyObject, moneyPurchase, tickets} from "../../types/moneyI";

export class moneyListS {
    @observable.shallow moneyList: moneyObject = {};

    constructor(money: moneyObject) {
        for (const key in money) {
            this.addMoney(parseInt(key), money[key])
        }
        makeAutoObservable(this)
    }

    @action
    addMoney = (key: number, money: moneyItem) => {
        this.moneyList[key] = money;
    }
    //
    // @action
    // addTicket = (money: tickets) => {
    //     this.moneyList.tickets.push(money);
    // }
    //
    // @action
    // removeMoney = (money: moneyPurchase) => {
    //     this.moneyList.purchase.splice(this.moneyList.purchase.indexOf(money), 1);
    // };
    @computed
    get getMoney(): moneyObject {
        return this.moneyList;
    }
}
