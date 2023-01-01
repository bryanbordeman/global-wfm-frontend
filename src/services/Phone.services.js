import axios from "axios";
import { SERVER } from "./SERVER";

class PhoneDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/phone_numbers/`, {timeout: 3000});
    };
    getPhone(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/phone_number/${id}`, {timeout: 3000});
    };
    createPhone(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/phone_number/`, data);
    };
    updatePhone(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/phone_number/${id}`, data);
    };
    deletePhone(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/phone_number/${id}`);
    };
}

export default new PhoneDataService();