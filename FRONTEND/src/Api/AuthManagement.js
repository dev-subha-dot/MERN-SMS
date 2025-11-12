import axios from "axios";

const baseUrl = "http://localhost:3002/api/auth/";

// Login API
export const loginUser = async (formData) => {
    return axios.post(`${baseUrl}login`, formData);
};

// Register APIs
export const registerUser = async (formData) => {
    return axios.post(`${baseUrl}register`, formData);
};

//get Config API

export const configUser = async() => {
    return axios.get("http://localhost:3002/getConfig")
}


