import axios from "axios";
import { SERVER } from "./SERVER";

class AnnouncementDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/announcement/`);
    };
    createAnnouncement(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/announcement/`, data);
    };
    updateAnnouncement(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/announcement/${id}`, data);
    };
    deleteAnnouncement(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/announcement/${id}`);
    };
}

export default new AnnouncementDataService();