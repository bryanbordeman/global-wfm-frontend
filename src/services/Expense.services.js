import axios from "axios";
import { SERVER } from "./SERVER";

class ExpenseDataService {
    getAll(token, month){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/expenses/${month.getMonth()+1}`);
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
}

export default new ExpenseDataService();