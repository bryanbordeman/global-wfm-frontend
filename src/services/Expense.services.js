import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class ExpenseDataService {
    getAll(token, month){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/expenses/${month.getMonth()+1}/${month.getFullYear()}`, {timeout: TIMEOUT});
    };
    createExpense(data, token, userId){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/expense/${userId}/`, data);
    };

    updateExpense(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/expense/${id}`, data);
    };
    deleteExpense(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/expense/${id}`);
    };
    approveExpense(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/expense/${id}/approved/`);
    };

    getAllMiles(token, month){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/miles/${month.getMonth()+1}/${month.getFullYear()}`, {timeout: TIMEOUT});
    };

    approveMile(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/mile/${id}/approved/`);
    };

    createMile(data, token, userId){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/mile/${userId}/`, data);
    };

    deleteMile(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/mile/${id}`);
    };

    getAllMileRates(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/milerates/`, {timeout: TIMEOUT});
    };
    updateMile(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/mile/${id}`, data);
    };
    getImage(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/expense/${id}`);
    };
}

export default new ExpenseDataService();