import api from './api';

class UserService {

  async getUserInfo() {
    return await api.post('/v1/auth/memeberinfo')
  }
  async getOpratorInfo(){
    return await api.post('/v1/auth/memeberinfo/operator')
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
      return await api.delete('/v1/qrcode/coupon?couponSerial='+couponSerial);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getQRcodeList() {
    try {
      return await api.post('/v1/qrcode');
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  
  async useQrcode(qrCodeSerial) {
    try {
      return await api.delete('/v1/qrcode?qrCodeSerial='+qrCodeSerial);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async updateUserInfo(data) {
    return await api.put('/v1/auth/memberinfo',data);
  }

  async getQRcodeLog() {
    try {
      return await api.get('/v1/qrcode/log');
    } catch (error) {
      console.error(error);
      return error;
    }
  }

}

export default new UserService();