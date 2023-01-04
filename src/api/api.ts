import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2156756-0-default';
export const getSmartCityInfo = () => axios.get('/api/smartcity/info');
export const getSmartCityList = () => axios.get('/api/smartcity/list');
