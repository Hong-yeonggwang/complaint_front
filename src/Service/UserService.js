import api from './api';

class UserService {

  testGetData(data) {
    return api.post('/qrcode/coupon', data)
  }
  async getAuth() {
    try {
      await api.post('/auth');
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default new UserService();