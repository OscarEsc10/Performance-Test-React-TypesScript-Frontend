import axios from 'axios';
import { api } from '../../config/config';

const res = await axios.get(`${api}/products`);
console.log(res.data);

export default api;
