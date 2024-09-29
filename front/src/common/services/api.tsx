import axios from 'axios';
import { API_URL } from '../helpers/api';


const apiUrl = API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl,
});



export default axiosInstance;
