import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class UserService {
    getUsers(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/users/`, {timeout: TIMEOUT});
    };
    login(data){
        return axios.post(`${SERVER}/api/login/`, data);
    };
    signup(data){
        return axios.post(`${SERVER}/api/signup/`, data);
    };
    isActive(data){
        return axios.post(`${SERVER}/api/is_active/`, data);
    };
}

export default new UserService();