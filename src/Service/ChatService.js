import api from './api';

class ChatService {

    testGetData(data) {
      return api.post('/qrcode/coupon', data)
    }
  }
  
  export default new ChatService();