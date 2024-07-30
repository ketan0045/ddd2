import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:7000",
});

// const storage = JSON.parse((localStorage.getItem("TOKEN")))
// console.log(storage)

// const userApi = axios.create({
//   // baseURL: "http://172.16.0.8:3002/api/v1/",
//   headers: {
//     "Authorization": `Bearer ${storage?.token}`,
//   },
//   withCredentials: true
// });

export const registerUserFunc = (formData) => authAPI.post("/register", formData);

export const logInUserFunc= (formData) => authAPI.post("/login", formData);
