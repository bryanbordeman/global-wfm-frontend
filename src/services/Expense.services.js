import axios from "axios";
import { SERVER } from "./SERVER";

class ExpenseDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/expenses/`);
    };
    createExpense(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/expense/`, data);
    };
    updateExpense(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/expense/${id}`, data);
    };
    deleteExpense(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/expense/${id}`);
    };
}

export default new ExpenseDataService();