import axios from "axios";
import { SERVER } from "./SERVER";

class ContactDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contacts/`, {timeout: 900});
    };
    getContactCompany(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/company/${id}`, {timeout: 900});
    };
    getContactQuote(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/quote/${id}`, {timeout: 900});
    };
    getContactProject(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/project/${id}`, {timeout: 3000});
    };
    getContactService(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/service/${id}`, {timeout: 3000});
    };
    getContactHSE(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/hse/${id}`, {timeout: 3000});
    };
    getContact(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/${id}`, {timeout: 3000});
    };
    createContact(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/create/contact/`, data);
    };
    updateContact(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/contact/${id}`, data);
    };
    deleteContact(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/contact/${id}`);
    };
}

export default new ContactDataService();