import api from './api';

class AdminService {

  async getAuth() {
    try {
      await api.post('/auth');
    } catch (error) {
      console.error(error);
    }
  }

  async createCoupon(data){
    try {
      return await api.post('/qrcode/coupon',data);
    } catch (error) {
      console.error(error);
    }
  }

  async getCouponList(){
    try {
      return await api.post('/qrcode/coupon');
    } catch (error) {
      console.error(error);
    }
  }

  async ticketStatus(){
    try {
      return await api.post('/qrcode/coupon');
    } catch (error) {
      console.error(error);
    }
  }

  async serviceStatus(){
    try {
      return await api.get('/admin/serviceStatus');
    } catch (error) {
      console.error(error);
    }
  }

  async operatorStatus(){
    try {
      return await api.get('/admin/operatorStatus');
    } catch (error) {
      console.error(error);
    }
  }

  async getCategory(){
    try {
      return await api.get('/admin/category');
    } catch (error) {
      console.error(error);
    }
  }
  async signAdmin(data){
    try {
      console.log(data)
      return await api.post('/auth/sign-up/admin',data);
    } catch (error) {
      console.error(error);
    }
  }

}

export default new AdminService();