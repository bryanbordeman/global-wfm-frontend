import axios from "axios";
import { SERVER } from "./SERVER";

class EmployeeService {
    getEmployee(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/employees/user/${id}/`);
    }
};
export default new EmployeeService();


