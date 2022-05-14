import axios from "axios";

const SERVER = 'http://localhost:8000'

class WorksegmentDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/todos/`);
    };
    createTodo(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/todos/`, data);
    };
    updateTodo(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/todos/${id}`, data);
    };
    deleteTodo(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/todos/${id}`);
    };
    completeTodo(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/todos/${id}/complete`);
    };
    login(data){
        return axios.post(`${SERVER}/api/login/`, data);
    };
    signup(data){
        return axios.post(`${SERVER}/api/signup/`, data);
    };
}

export default new WorksegmentDataService();