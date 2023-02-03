import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class VehicleDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/vehicles/`, {timeout: TIMEOUT});
    };
    createVehicle(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/vehicle/`, data);
    };
    updateVehicle(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/vehicle/${id}`, data);
    };
    deleteVehicle(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/vehicle/${id}`);
    };

    //!--------------------------------------------------------------------
    
    getAllIssues(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/vehicle/issues/`, {timeout: TIMEOUT});
    };
    createVehicleIssue(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/vehicle/issue/`, data);
    };
    updateVehicleIssue(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/vehicle/issue/${id}`, data);
    };
    deleteVehicleIssue(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/vehicle/issue/${id}`);
    };
}

export default new VehicleDataService();