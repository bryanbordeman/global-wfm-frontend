import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class WorksegmentDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/`, {timeout: TIMEOUT});
    };
    getAllTypes(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worktypes/`, {timeout: TIMEOUT});
    };
    getWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/${isoweek}/`, {timeout: TIMEOUT});
    };
    getTotals(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/totals/${isoweek}/`, {timeout: TIMEOUT});
    };
    adminGetWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/admin/worksegments/${isoweek}/`, {timeout: TIMEOUT});
    };
    async createWorksegment(data, token, userId){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/worksegment/${userId}/`, data)
        .then(response => {
            return axios.get(`${SERVER}/api/worksegment/${response.data.id}`);
        })
    };
    async updateWorksegment(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        await axios.put(`${SERVER}/api/worksegment/${id}`, data);
        return await axios.get(`${SERVER}/api/worksegment/${id}`);
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
