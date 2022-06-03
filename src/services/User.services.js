import axios from "axios";

// const SERVER = 'http://localhost:8000'
const SERVER = 'http://192.168.1.14:8000'

class UserService {
    login(data){
        return axios.post(`${SERVER}/api/login/`, data);
    };
    signup(data){
        return axios.post(`${SERVER}/api/signup/`, data);
    };
}

export default new UserService();