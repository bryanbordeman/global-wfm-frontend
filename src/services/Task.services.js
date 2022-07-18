import axios from "axios";
import { SERVER } from "./SERVER";

class TaskDataService {
    getAllTaskList(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/tasklist/`);
    };

    getAssigneeTasks(token, assignee){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/tasks/${assignee}/`);
    };
    getAssigneeList(token, assignee, list){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/tasks/${assignee}/${list}/`);
    };
    createTask(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/task/`, data);
    };
    updateTask(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/task/${id}`, data);
    };
    completeSubtask(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/subtask/${id}/completed/`);
    };
    deleteSubtask(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/subtask/${id}`);
    };
    createSubtask(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/subtask/`, data);
    };
    lastSubtask(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/last/subtask/`);
    };
    updateSubtask(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/subtask/${id}`, data);
    };
}

export default new TaskDataService();