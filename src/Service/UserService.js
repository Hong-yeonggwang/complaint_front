import api from './api';

class UserService {

  testGetData(data) {
    return api.post('/qrcode/coupon', data)
  }
}

export default new UserService();