import api from './api';

class ChatService {

  // testGetData(data) {
  //   return api.post('/qrcode/coupon', data)
  // }

  async getChatRoom() {
    // 서버에서 방 목록을 가져오는 비동기 요청을 수행하고 결과를 chatRooms에 저장
    await api.post("/getChatRoom", "")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //     .post("/getChatRoom", "")
    //     .then((response) => {
    //         // this.chatRooms = response.data;
    //         this.chatRooms.push(response.data);
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching rooms:", error);
    //     });
  }

  async createChatRoom(JsonSringifyOptions) {
    // 새 방을 생성하는 비동기 요청을 수행
    console.log("서비스 방 생성 호출 : " +  JsonSringifyOptions);

    try {

      return api
        .post("/createChatRoom", JsonSringifyOptions)
        .then((response) => {
          console.log("response : " + response);
          // this.getChatRoom(response); // 방 생성 후 방 목록을 다시 가져와서 갱신
        })
    }
    catch (error) {
      console.error("Error creating chatroom:", error);
    }

    // let msg = {
    //   chatRoomName: this.chatRoomName
    // };

    // axios
    //   .post("/createChatRoom", msg)
    //   .then((response) => {
    //     this.getChatRoom(response); // 방 생성 후 방 목록을 다시 가져와서 갱신
    //     this.chatRoomName = ""; // 입력 필드 초기화
    //   })
    //   .catch((error) => {
    //     console.error("Error creating room:", error);
    //   });

    // $("#roomName").val("");
  }

  // async createChatRoomList(result) {
  //   if (result != null) {
  //     // // HTML을 동적으로 생성하기 위한 데이터 바인딩
  //     // const chatRooms = result.map((data, idx) => ({
  //     //     roomName: data.roomName.trim(),
  //     //     roomId: data.roomId,
  //     //     idx: idx + 1,
  //     // }));

  //     // // Vue.js 데이터 바인딩을 사용한 템플릿 생성
  //     // this.chatRooms = chatRooms; // Vue.js 데이터에 할당

  //     // Vue.js 데이터와 템플릿을 사용하여 HTML을 렌더링
  //     // 이 부분은 Vue.js 컴포넌트 내에서 템플릿으로 처리하는 것이 좋습니다.

  //     // // this.chatRooms.push({})

  //     let tag = "";

  //     result.forEach((data, idx) => {
  //       let roomName = data.roomName.trim();
  //       tag += "<tr>" +
  //         "<td class='num'>" + (idx + 1) + "</td>" +
  //         "<td class='room'>" + roomName + "</td>" +
  //         "</tr>";
  //     });
  //     // $("#roomList").empty().append(tag);
  //   }
  // }

}

export default new ChatService();