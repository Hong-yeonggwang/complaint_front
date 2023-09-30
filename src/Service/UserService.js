import api from './api';

class UserService {

  getUserInfo() {
    return api.post('/auth/memeberinfo')
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
  async useCoupon(couponSerial) {
    try {
      console.log(couponSerial)
      return await api.delete('/qrcode/coupon?couponSerial='+couponSerial);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getQRcodeList() {
    try {
      return await api.post('/qrcode');
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  

}

export default new UserService();