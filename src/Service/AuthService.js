import api from "./api";
import TokenService from "./TokenService";

class AuthService {

  login(user) {
    return api
      .post("/v1/auth/sign-in", user)
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
  join(userData){
    return api.post("/v1/auth/sign-up",userData)
  }

  async findId(email){
    return await api.get("/v1/auth/id?email="+ email);
  }

  async sendPasswordCode(id){
    return await api.get("/v1/auth/passwordcode?id="+ id);
  }

  async sendTempPassword(data){
    return await api.post("/v1/auth/passwordcode",data);
  }

  async updatePassword(data){
    return await api.put("/v1/auth/password",data);
  }

  async checkId(data){
    return await api.post("/v1/auth/id",data);
  }

  async checkEmail(data){
    return await api.post("/v1/auth/email",data);
  }
}

export default new AuthService();