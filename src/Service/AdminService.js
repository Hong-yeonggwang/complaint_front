import api from './api';

class AdminService {

  async getAuth() {
    try {
      await api.post('/v1/auth');
    } catch (error) {
      console.error(error);
    }
  }

  async createCoupon(data){
    try {
      return await api.post('/v1/qrcode/coupon',data);
    } catch (error) {
      console.error(error);
    }
  }

  async getCouponList(){
    try {
      return await api.post('/v1/qrcode/coupon');
    } catch (error) {
      console.error(error);
    }
  }

  async ticketStatus(){
    try {
      return await api.post('/v1/qrcode/coupon');
    } catch (error) {
      console.error(error);
    }
  }

  async serviceStatus(){
    try {
      return await api.get('/v1/admin/serviceStatus');
    } catch (error) {
      console.error(error);
    }
  }

  async operatorStatus(){
    try {
      return await api.get('/v1/admin/operatorStatus');
    } catch (error) {
      console.error(error);
    }
  }

  async getCategory(){
    try {
      return await api.get('/v1/admin/category');
    } catch (error) {
      console.error(error);
    }
  }
  async signAdmin(data){
    await api.post('/v1/auth/sign-up/admin',data).then(
      (res)=>{
        return res
      },
      (err)=>{
        return err
      }

    );
  }

  async getOperatorQrcode(){
    try {
      return await api.get('/v1/admin/operator/qrcode');
    } catch (error) {
      console.error(error);
    }
  }

  async getCouponLog(){
    try {
      return await api.get('/v1/admin/coupon/log');
    } catch (error) {
      console.error(error);
    }
  }

  async getUserInfo(){
    try {
      return await api.get('/v1/admin/user/log');
    } catch (error) {
      console.error(error);
    }
  }

}

export default new AdminService();