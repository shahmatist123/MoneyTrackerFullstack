import axios from "axios";
import {config} from "../../../config/config";

export const getAllThemes = (userId: number): Promise<any> => {
    return axios.get(`${config.url}/api/theme/all?userId=${userId}`);
}