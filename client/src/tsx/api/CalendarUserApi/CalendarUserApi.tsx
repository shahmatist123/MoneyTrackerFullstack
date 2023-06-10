import axios from "axios";
import {config} from "../../../config/config";

interface DataI {
    is_positive: boolean,
    name: string
}

export const add = (data: DataI): Promise<any> => {
    return axios.post(`${config.url}/api/calendar-user`, data);
}

export const get = (): Promise<any> => {
    return axios.get(`${config.url}/api/calendar-user`);
}
export const deleteCat = (id: number): Promise<any> => {
    return axios.delete(`${config.url}/api/calendar-user/${id}`);
}