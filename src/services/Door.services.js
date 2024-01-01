import axios from "axios";
import { SERVER } from "./SERVER";

class DoorDataService {
    getAll(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/asset/doors`);
    };
    getAttributes(token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/asset/door/attributes`);
    };
    getDoor(id){
        return axios.get(`${SERVER}/api/asset/portal/door/${id}`);
    };
    
    createDoor(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/asset/create/door`, data);
    };
    updateDoor(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/asset/door/${id}`, data);
    };
    deleteDoor(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/asset/door/${id}`);
    };
    completeDoor(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/asset/complete/door/${id}`);
    };
    projectDoor(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/asset/door/project/${id}`);
    };

    serviceDoor(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/asset/door/service/${id}`);
    };

    projectDoorCount(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${SERVER}/api/asset/door/project/count/${id}`);
    };

    createAttributes(data, attributes, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/asset/create/door/${attributes}`, data);
    };

    createRev(data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${SERVER}/api/asset/create/door/rev`, data);
    };
    updateRev(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${SERVER}/api/asset/door/rev/${id}`, data);
    };
    deleteRev(id, token){
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${SERVER}/api/asset/door/rev/${id}`);
    };
}

export default new DoorDataService();


// 'asset/door/attributes'
// 'asset/door/reports'
// 'asset/create/door/report'
// 'asset/door/report/<int:pk>'

// 'asset/door/revs'
// 'asset/create/door/rev'
// 'asset/door/rev/<int:pk>'

// 'asset/door/locksets'
// 'asset/create/door/lockset'
// 'asset/door/lockset/<int:pk>'

// 'asset/door/types'
// 'asset/create/door/type'
// 'asset/door/type/<int:pk>'

// 'asset/door/sills'
// 'asset/create/door/sill'
// 'asset/door/sill/<int:pk>'

// 'asset/door/frames'
// 'asset/create/door/frame'
// 'asset/door/frame/<int:pk>'

// 'asset/door/cores'
// 'asset/create/door/core'
// 'asset/door/core/<int:pk>'

// 'asset/door/hinges'
// 'asset/create/door/hinge'
// 'asset/door/hinge/<int:pk>'

// 'asset/door/options'
// 'asset/create/door/option'
// 'asset/door/option/<int:pk>'

// 'asset/door/packaging'
// 'asset/create/door/packaging'
// 'asset/door/packaging/<int:pk>'

// 'asset/doors'
// 'asset/create/door'
// 'asset/door/<int:pk>'
// 'asset/complete/door/<int:pk>'
// 'asset/door/project/<int:project>'