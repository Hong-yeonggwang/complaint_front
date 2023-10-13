import api from './api';

class ChatService {
  async getChatRoomList() {
    // 서버에서 방 목록을 가져오는 비동기 요청을 수행하고 List를 반환
    try {
      return await api.post("/getChatRoomList")
    }
    catch (error) {
      console.log(error);
    }
  }

  async createChatRoom(Options) {
    // 새 방을 생성하는 비동기 요청을 수행
    let JsonOptions = JSON.stringify(Options);

    console.log("서비스 방 생성 호출 : " + Options);
    console.log("서비스 방 생성 호출 : " + JsonOptions);

    try {
      const response = await api.post("/createChatRoom", JsonOptions)
      console.error("서비스 방 생성 호출 : " + response);
      return response;

      // return await api.post("/createChatRoom", JsonOptions)
    }
    catch (error) {
      console.error("Error creating chatroom Service:", error);
    }
  }

  async getMyChatRoomList(UserId) {
    // 서버에서 해당하는 ID가 대화중인 방 목록을 가져오는 비동기 요청을 수행하고 List를 반환
    console.log("서비스 내 방리스트 호출");
    try {
      return await api.post("/getMyChatRoomList", UserId)
    }
    catch (error) {
      console.log(error);
    }
  }

  async test(test){
    console.log("서비스 test");
    try {
      return await api.post("/test", test);
    }
    catch (error) {
      console.log(error);
    }
  }

}

export default new ChatService();