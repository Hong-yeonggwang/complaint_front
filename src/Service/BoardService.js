import api from './api';

class BoardService {

  async getTag(){
    try {
      return await api.get('/v1/board/tag');
    } catch (error) {
      console.error(error);
    }
  }

  async sendPostData(data){
    try {
      return await api.put('/v1/board/post', data);
    } catch (error) {
      console.error(error);
    }
  }

  async getMyPost(){
    try {
      return await api.get('/v1/board/post');
    } catch (error) {
      console.error(error);
    }
  }

  async getAllPost(){
    try {
      return await api.get('/v1/board/Apost');
    } catch (error) {
      console.error(error);
    }
  }

  async getSeqPost(seq){
    try {
      return await api.get('/v1/board/Epost?seq='+seq);
    } catch (error) {
      console.error(error);
    }
  }

  async writeComment(data){
    try {
      return await api.post('/v1/board/comment', data);
    } catch (error) {
      console.error(error);
    }
  }

  async sendEmail(data){
    try {
      return await api.post('/v1/board/email', data);
    } catch (error) {
      console.error(error);
    }
  }

}

export default new BoardService();