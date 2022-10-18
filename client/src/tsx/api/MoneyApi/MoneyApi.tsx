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
export const getPerMonth = (): Promise<any> => {
    const date = new Date
    return axios.get(`${config.url}/api/money/getmoneypermouth?id=1&month=${date.getMonth() + 1}&year=${date.getFullYear()}`);
}