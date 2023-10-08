import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class EngineeringDataService {
    getAllDCNs(year, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/engineering/dcns/${year}`, {timeout: TIMEOUT});
    };
    createDCN(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/engineering/create/dcn`, data);
    };
    updateDCN(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/engineering/dcn/${id}`, data);
    };
    deleteDCN(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/engineering/dcn/${id}`);
    };
}

export default new EngineeringDataService();