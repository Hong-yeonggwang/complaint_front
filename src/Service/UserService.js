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
  
  async useQrcode(qrCodeSerial) {
    try {
      console.log(qrCodeSerial)
      return await api.delete('/qrcode?qrCodeSerial='+qrCodeSerial);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async updateUserInfo(data) {
    return await api.put('/auth/memberinfo',data);
  }

}

export default new UserService();