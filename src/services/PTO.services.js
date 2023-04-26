import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class PTODataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/pto/`, {timeout: TIMEOUT});
    };
    getWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/pto/${isoweek}/`, {timeout: TIMEOUT});
    };
    // getTotals(token, isoweek){
    //     axios.defaults.headers.common["Authorization"] = "Token " + token;
    //     return axios.get(`${SERVER}/api/worksegments/totals/${isoweek}/`, {timeout: TIMEOUT});
    // };
    adminGetWeek(token, isoweek){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/admin/pto/${isoweek}/`, {timeout: TIMEOUT});
    };
    createPTO(data, token, userId){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/pto/${userId}/`, data);
    };
    updatePTO(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/pto/${id}`, data);
    };
    deletePTO(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/pto/${id}`);
    };
    approvePTO(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/pto/${id}/approved/`);
    };
}

export default new PTODataService();