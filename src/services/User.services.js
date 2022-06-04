import axios from "axios";
import { SERVER } from "./SERVER";

class UserService {
    login(data){
        return axios.post(`${SERVER}/api/login/`, data);
    };
    signup(data){
        return axios.post(`${SERVER}/api/signup/`, data);
    };
}

export default new UserService();