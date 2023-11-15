import axios from "axios";

let config = {
  // OPTIONS : 'http://doyounglee.synology.me:8282',

  // baseURL: process.env.NODE_ENV === 'production'
  //   ? 'http://doyounglee.synology.me:8282'
  //   : 'http://localhost:8080',
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