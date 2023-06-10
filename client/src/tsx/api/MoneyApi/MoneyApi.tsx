import axios from "axios";
import {config} from "../../../config/config";

interface DataI {
    category: Array<number>,
    msg: string,
    summ: string
}

export const add = (data: DataI): Promise<any> => {
    return axios.post(`${config.url}/api/money/add`, data);
}

export const addFile = (data: any): Promise<any> => {
    return axios.post(`${config.url}/api/money/add-file`, data);
}

export const getPerMonth = (month: number, year: number): Promise<any> => {
    return axios.get(`${config.url}/api/money/get-money-per-mouth?id=1&month=${month + 1}&year=${year}`);
}

export const getMoneyItems = (ticketId: number): Promise<any> => {
    return axios.get(`${config.url}/api/money/get-ticket-items?ticketId=${ticketId}&userId=1`);
}

export const setFavorite = (ticketId: number): Promise<any> => {
    return axios.get(`${config.url}/api/money/get-ticket-items?ticketId=${ticketId}&userId=1`);
}
export const setTicketItemsForUser = (data: {calendarUserId: number, id: number}): Promise<any> => {
    return axios.post(`${config.url}/api/money/set-ticket-items-for-user`, data);
}