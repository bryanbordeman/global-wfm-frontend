import axios from "axios";

// const SERVER = 'http://localhost:8000'
const SERVER = 'http://192.168.90.31:8000'

class ProjectDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/projects/`);
    };
    createAProject(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/project/`, data);
    };
    updateProject(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/project/${id}`, data);
    };
    deleteAProject(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/project/${id}`);
    };
}

export default new ProjectDataService();