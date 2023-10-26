import api from "./api";
import TokenService from "./TokenService";

class AuthService {

  login(user) {
    return api
      .post("/auth/sign-in", user)
      .then((response) => {
        if (response.data.token) {
          let token = {
            token:response.data.token
          }
          TokenService.setUser(token);
        }
        return response.data;
      });
  }
  // logout() {
  //   const user = {};
  //   user.token = TokenService.getLocalAccessToken();
  //   return api
  //     .post("/user/logout", user)
  //     .then((response) => {
  //       if (response.data.success) {
  //         TokenService.removeUser();
  //       }

  //       return response.data;
  //     });
  // }
  join(userData){
    return api.post("/auth/sign-up",userData)
  }
  // register({ username, email, password }) {
  //   return api.post("/auth/register", {
  //     username,
  //     email,
  //     password
  //   });
  //  passwordcode
  // }

  async findId(email){
    return await api.get("/auth/id?email="+ email);
  }

  async sendPasswordCode(id){
    return await api.get("/auth/passwordcode?id="+ id);
  }

  async sendTempPassword(data){
    return await api.post("/auth/passwordcode",data);
  }

  async updatePassword(data){
    return await api.put("/auth/password",data);
  }

  async checkId(data){
    return await api.post("/auth/id",data);
  }

  async checkEmail(data){
    return await api.post("/auth/email",data);
  }
}

export default new AuthService();