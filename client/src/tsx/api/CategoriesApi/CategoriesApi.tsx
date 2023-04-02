import axios from "axios";
import {config} from "../../../config/config";

interface DataI {
    is_positive: boolean,
    name: string
}

export const add = (data: DataI): Promise<any> => {
    return axios.post(`${config.url}/api/categories`, data);
}

export const get = (): Promise<any> => {
    return axios.get(`${config.url}/api/categories`);
}
export const deleteCat = (id: number): Promise<any> => {
    return axios.delete(`${config.url}/api/categories/${id}`);
}