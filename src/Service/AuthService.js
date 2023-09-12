import api from "./api";
import TokenService from "./TokenService";

class AuthService {

  login(user) {
    return api
      .post("/auth/sign-in", user)
      .then((response) => {
        if (response.data.token) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
  }
  logout() {
    const user = {};
    user.token = TokenService.getLocalAccessToken();
    return api
      .post("/user/logout", user)
      .then((response) => {
        if (response.data.success) {
          TokenService.removeUser();
        }

        return response.data;
      });
  }
  join(userData){
    console.log(userData)
    return api.post("/auth/sign-up",userData)
    .then((res)=>{
      console.log(res)
        alert("회원가입을 축하합니다.")
    })
    .catch((err)=>{
      console.log(err)
        alert("오류가 발생했습니다. 다시 시도해주세요")
    });
  
  }
  register({ username, email, password }) {
    return api.post("/auth/register", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();