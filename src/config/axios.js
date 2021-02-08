import axios from "axios";

const axiosCustomer = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default axiosCustomer;
