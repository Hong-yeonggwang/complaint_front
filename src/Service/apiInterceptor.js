import axiosInstance from "./api";
import TokenService from "./TokenService";
import router from "../router/index";

const setup = (store) => {
  axiosInstance.interceptors.request.use( // axios로 api 요청시 헤더에 jwt를 넣어서 요청을 보냄 모든 요청시 실행되는 것임.
    (config) => {
      if (config.url !== "/auth/sign-in") { // 요청하는 url이 로그인 url이 아니라면.
        const token = TokenService.getLocalAccessToken();
        // console.log(
        //   "axiosInstance.interceptors.request >\n" + "URL: " + config.url);
        if (token) { 
          // for Spring Boot back-end
          config.headers["X-AUTH-TOKEN"] = token;
        }
      }
      // console.log(config)
      return config;
    }, // 로그인으로 인증을 요청하는게 아니라면 local에서 토근을 꺼내 헤더에 담고 요청을 보냄.
    (error) => { 
      return Promise.reject(error);  // 에러가 발생하면, 캐치하기위해서 promise.reject(error)를 사용함. 
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      // console.log(originalConfig);

      if (originalConfig.url !== "/v1/auth/sign-in" && err.response) {
        TokenService.removeUser();
        store.dispatch("auth/logout")
        router.push({name:'main'});

  
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    }
  );
};

export default setup;