import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class ReportDataService {
    getProjectReports(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/report/project/get/${id}`, {timeout: TIMEOUT});
    };
    createProjectReport(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/report/project/create`, data);
    };
    updateProjectReport(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/report/project/${id}`, data);
    };
    deleteProjectReport(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/report/project/${id}`);
    };

    //!--------------------------------------------------------------------
    
    getIncidentReports(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/report/incident`, {timeout: TIMEOUT});
    };
    createIncidentReport(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/report/incident/create`, data);
    };
    updateIncidentReport(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/report/incident/${id}`, data);
    };
    deleteIncidentReport(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/report/incident/${id}`);
    };

    //!--------------------------------------------------------------------

    getDoorServiceReports(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/report/door/service/get/${id}`, {timeout: TIMEOUT});
    };
    createDoorServiceReport(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/report/door/service/create`, data);
    };
    updateDoorServiceReport(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/report/door/service/${id}`, data);
    };
    deleteDoorServiceReport(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/report/door/service/${id}`);
    };
}

export default new ReportDataService();