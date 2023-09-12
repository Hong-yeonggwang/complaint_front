import axios from "axios";

let config = {
  OPTIONS : 'http://localhost:8080',
  headers: {
    post : {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  axios : axios,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

export default _axios;