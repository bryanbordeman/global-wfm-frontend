import axios from "axios";
import { SERVER } from "./SERVER";
import { TIMEOUT } from "./TIMEOUT";

class ContactDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contacts/`, {timeout: TIMEOUT});
    };
    getContactCompany(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/company/${id}`, {timeout: TIMEOUT});
    };
    getContactQuote(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/quote/${id}`, {timeout: TIMEOUT});
    };
    getContactProject(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/project/${id}`, {timeout: TIMEOUT});
    };
    getContactService(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/service/${id}`, {timeout: TIMEOUT});
    };
    getContactHSE(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/hse/${id}`, {timeout: TIMEOUT});
    };
    getContact(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/contact/${id}`, {timeout: TIMEOUT});
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