import api from './api';

class UserService {

  testGetData(data) {
    return api.post('/qrcode/coupon', data)
  }
  async getAuth() {
    try {
      const response = await api.post('/auth');
      console.log(response);
      
      if (response.data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default new UserService();