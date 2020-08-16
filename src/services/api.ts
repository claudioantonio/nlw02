import axios from 'axios';

const api = axios.create({
    baseURL: 'https://proffy-srv.herokuapp.com/',
});

export default api;
