import {action, computed, observable} from "mobx";
import {makeAutoObservable} from 'mobx'
import {MoneyI} from "../../types/moneyI";

export class moneyListS {
    @observable.shallow moneyList: MoneyI[] = [];

    constructor(money: MoneyI[]) {
        money.forEach(item => {
            this.addMoney(item)
        });
        makeAutoObservable(this)
    }

    @action
    addMoney = (money: MoneyI) => {
        this.moneyList.push(money);
    }

    @action
    removeMoney = (money: MoneyI) => {
        this.moneyList.splice(this.moneyList.indexOf(money), 1);
    };

    @computed
    get getMoney(): MoneyI[] {
        return this.moneyList;
    }
}
