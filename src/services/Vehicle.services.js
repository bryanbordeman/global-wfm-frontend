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
    deleteAnnouncement(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/vehicle/${id}`);
    };
}

export default new VehicleDataService();