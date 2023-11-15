import api from './api';

class CategoryService {

  async addPlace(data) {
    try {
      return await api.put('/v1/admin/place', data);
    } catch (error) {
      console.error(error);
    }
  }

  async addCategory(data) {
    try {
      return await api.put('/v1/admin/category', data);
    } catch (error) {
      console.error(error);
    }
  }

  async editCategory(data) {
    try {
      return await api.post('/v1/admin/category', data);
    } catch (error) {
      console.error(error);
    }
  }

  async editPlace(data) {
    try {
      return await api.post('/v1/admin/place', data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new CategoryService();