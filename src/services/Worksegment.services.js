import axios from "axios";

const SERVER = 'http://localhost:8000'

class WorksegmentDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/`);
    };
    getWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/worksegments/${isoweek}/`);
    };
    adminGetWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/admin/worksegments/${isoweek}/`);
    };
    createWorksegment(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/worksegment/`, data);
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
        return axios.put(`${SERVER}/api/worksegment/${id}/approved`);
    };
}

export default new WorksegmentDataService();