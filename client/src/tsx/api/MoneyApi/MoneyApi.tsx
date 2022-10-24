import axios from "axios";
import {config} from "../../../config/config";
import {useState} from "react";
import {tickets} from "../../types/moneyI";

interface DataI {
    category: Array<number>,
    msg: string,
    summ: string
}

export const add = (data: DataI): Promise<any> => {
    return axios.post(`${config.url}/api/money/add`, data);
}
export const getTickets = (data: tickets): Promise<any> => {
    return axios.get(`${config.url}/api/money/get-ticket-items?userId=${data.userId}&ticketId=${data.id}`);
}
export const addFile = (data: any): Promise<any> => {
    return axios.post(`${config.url}/api/money/add-file`, data);
}
export const getPerMonth = (): Promise<any> => {
    const date = new Date
    return axios.get(`${config.url}/api/money/get-money-per-mouth?id=1&month=${date.getMonth() + 1}&year=${date.getFullYear()}`);
}