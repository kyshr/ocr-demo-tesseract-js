import axios from "axios";

export const api = axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: "https://campus-security-portal-backend.onrender.com",
});
