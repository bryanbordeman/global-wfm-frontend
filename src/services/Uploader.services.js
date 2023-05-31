import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class UploaderDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/drawings/`, {timeout: TIMEOUT});
    };
    getProjectDrawings(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/drawings/${id}`, {timeout: TIMEOUT});
    };
    createDrawing(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/drawing/`, data);
    };
    updateDrawing(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/drawing/${id}`, data);
    };
    deleteDrawing(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/drawing/${id}`);
    };
}

export default new UploaderDataService();