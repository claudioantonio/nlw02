import axios from 'axios';

const api = axios.create({
    baseURL: 'http://proffy-srv.herokuapp.com/',
});

export default api;
