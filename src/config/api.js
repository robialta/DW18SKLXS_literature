import axios from "axios";

export const API = axios.create({
    baseURL: "https://api-literature.herokuapp.com/api/v1", //Production
    // baseURL: "http://localhost:5000/api/v1", //Local
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = token;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};
