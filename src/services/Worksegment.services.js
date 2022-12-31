import axios from "axios";
import { SERVER } from "./SERVER";

class WorksegmentDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/`, {timeout: 900});
    };
    getAllTypes(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worktypes/`, {timeout: 900});
    };
    getWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/${isoweek}/`, {timeout: 900});
    };
    getTotals(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/totals/${isoweek}/`, {timeout: 900});
    };
    adminGetWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/admin/worksegments/${isoweek}/`, {timeout: 900});
    };
    createWorksegment(data, token, userId){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/worksegment/${userId}/`, data);
    };
    updateWorksegment(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/worksegment/${id}`, data);
    };
    deleteWorksegment(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/worksegment/${id}`);
    };
    approveWorksegment(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/worksegment/${id}/approved/`);
    };
}

export default new WorksegmentDataService();