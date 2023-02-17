import axios from 'axios';

const token = localStorage.getItem('token');

export const API = axios.create({
    baseURL: 'https://63cf9f8d109824043782c6e2.mockapi.io/doors-mock',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
});
