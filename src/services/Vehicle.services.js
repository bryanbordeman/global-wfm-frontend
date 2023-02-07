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

    //!--------------------------------------------------------------------
    
    getAllInspections(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/vehicle/inspections/`, {timeout: TIMEOUT});
    };
    createVehicleInspection(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/vehicle/inspection/`, data);
    };
    updateVehicleInspection(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/vehicle/inspection/${id}`, data);
    };
    deleteVehicleInspection(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/vehicle/inspection/${id}`);
    };

    //!--------------------------------------------------------------------
    
    getAllServices(year, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/vehicle/services/${year}`, {timeout: TIMEOUT});
    };
    createVehicleService(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/vehicle/service/`, data);
    };
    updateVehicleService(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/vehicle/service/${id}`, data);
    };
    deleteVehicleService(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/vehicle/service/${id}`);
    };

     //!--------------------------------------------------------------------
    
    getAllCleanings(year, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/vehicle/cleanings/${year}`, {timeout: TIMEOUT});
    };
    createVehicleCleaning(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/vehicle/cleaning/`, data);
    };
    updateVehicleCleaning(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/vehicle/cleaning/${id}`, data);
    };
    deleteVehicleCleaning(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/vehicle/cleaning/${id}`);
    };
}

export default new VehicleDataService();