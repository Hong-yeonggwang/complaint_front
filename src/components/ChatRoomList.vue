<template>
  <NavigationBar2 class="float-left"></NavigationBar2>
  <div class="ml-14 customWidth float-left">

    <!-- 메뉴바  -->
    <v-card>
      <v-tabs v-model="tab" bg-color="black">
        <v-tab v-for="(menu, index) in  chatMenu" :key="index" v-bind:value="menu.value">{{ menu.title }}</v-tab>
      </v-tabs>

      <!-- <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="(menu, index) in chatMenu" :key="index" class="h-12 flex items-center"
          v-bind:value="menu.value">
          {{ menu.info }}
        </v-window-item>
      </v-window>
    </v-card-text> -->
    </v-card>

    <!-- 모달 -->
    <!-- <InputPromptModal v-if="this.isModalOpen == true" @closeModal="closeModal" @handleInput="handleInput" /> -->
    <!-- // 모달 -->


    <div v-if="this.tab == 'chatRoomList'">
      <div class="border rounded-2xl m-4 ">
        <div class="mx-4 mt-6 pb-2 border-b-2">
          <div>
            <div class="text-2xl float-left">실시간 채팅</div>
            <v-btn class="float-left ml-4" density="compact" icon="mdi-refresh" @click="this.getChatRoomList()"></v-btn>
            <v-btn class="float-right mr-7" density="comfortable" icon="mdi-chat-plus"
              @click="this.toggleShowCreateChatRoom()"></v-btn>
            <div class="clear-both"></div>
          </div>
          <div class="float-left">채팅을 통해 배달 같이 주문할 친구를 구해요~</div>
          <div class="float-right mt-2">
            <select v-model="sortOrder" class="cursor-pointer border text-center mr-2 rounded-md">
              <option value="asc">오래된 순</option>
              <option value="desc">최신순</option>
            </select>
          </div>
          <div class="clear-both"></div>
        </div>

        <div v-if="showCreateChatRoom == true">
          <div class="m-4 pb-2 border-b-2">
            <div>
              <div class="float-left mr-4">
                <input type="text" id="roomName" v-model="newChatRoomInfo.chatRoomName"
                  class="w-30 p-2 border-solid border-1 border-black" placeholder="방 제목을 입력하세요.">
              </div>
              <div class="float-left">
                <div class="float-left w-fit">
                  <v-btn density="compact" icon="mdi-minus" @click="minusCount()"></v-btn>
                </div>
                <div class="float-left">
                  <input type="number" id="chatRoomLimited" v-model="newChatRoomInfo.chatRoomLimited"
                    @input="onChange($event)" class="w-8 p-2 mx-2 border-solid border-1 border-black"
                    placeholder="최대 몇명인지 입력하세요.">
                </div>
                <div class="float-left w-fit">
                  <v-btn density="compact" icon="mdi-plus" @click="plusCount()"></v-btn>
                </div>
                <div class="clear-both"></div>
              </div>
              <div class="clear-both"></div>
            </div>
            <div class="my-2 text-center">
              <div class="">
                <v-btn @click="createChatRoom()">방 만들기</v-btn>
              </div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div>

        <div class="overflow-y-auto" style="height: 34rem;">
          <div class="my-2 mx-4 border rounded-lg" v-for="(chatRoom) in sortedChatRoomList" :key="chatRoom.id"
            @click="enterChatRoom(chatRoom)">
            <!-- @click="rightMouseListener(chatRoom)" -->
            <div class="px-2 py-3 mx-2 cursor-pointer">
              <div class="float-left">방이름: {{ chatRoom.chatRoomName }}</div>
              <div class="float-right">방 번호: {{ chatRoom.chatRoomSeq }}</div>
              <div class="clear-both"></div>
              <!-- <div class="float-left">방장: {{ chatRoom.owner }}</div> -->
              <div class="float-right">접속인원: {{ chatRoom.currentNumberOfPeople }}/{{ chatRoom.chatRoomLimited }}</div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.tab == 'myChatRoomList'">
      <div class="border rounded-2xl m-4 ">
        <div class="mx-4 mt-6 pb-2 border-b-2">
          <div>
            <div class="text-2xl float-left">실시간 채팅</div>
            <v-btn class="float-left ml-4" density="compact" icon="mdi-refresh" @click="this.getChatRoomList()"></v-btn>
            <v-btn class="float-right mr-7" density="comfortable" icon="mdi-chat-plus"
              @click="this.createChatRoom()"></v-btn>
            <div class="clear-both"></div>
          </div>
          <div class="float-left">배달 같이 주문할 친구들</div>
          <div class="float-right mt-2">
            <select v-model="sortOrder" class="cursor-pointer border text-center mr-2 rounded-md">
              <option value="asc">오래된 순</option>
              <option value="desc">최신순</option>
            </select>
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="overflow-y-auto" style="height: 34rem;">
          <div class="my-2 mx-4 border rounded-lg" v-for="(chatRoom) in sortedMyChatRoomList" :key="chatRoom.id"
            @click="enterChatRoom(chatRoom)">
            <!-- @click="rightMouseListener(chatRoom)" -->
            <div class="px-2 py-3 mx-2 cursor-pointer">
              <div class="float-left">방이름: {{ chatRoom.chatRoomName }}</div>
              <div class="float-right">방 번호: {{ chatRoom.chatRoomSeq }}</div>
              <div class="clear-both"></div>
              <!-- <div class="float-left">방장: {{ chatRoom.owner }}</div> -->
              <div class="float-right">접속인원: {{ chatRoom.currentNumberOfPeople }}/{{ chatRoom.chatRoomLimited }}</div>
              <div class="clear-both"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 마우스 오른쪽 메뉴 -->
  <div id="context-menus" class="context-menus">
    <ul>
      <li>1번 메뉴</li>
      <li>2번 메뉴</li>
      <li>3번 메뉴</li>
      <li>4번 메뉴</li>
      <li>5번 메뉴</li>
    </ul>
  </div>
  <!-- //마우스 오른쪽 메뉴 -->
</template>

<script>
import NavigationBar2 from './NavigationBar2.vue';
import ChatRoomService from '../Service/ChatRoomService';
// import InputPromptModal from './InputPromptModal.vue';

/* 마우스 오른쪽 메뉴 변수 */
export default {
  name: 'chatRoomListPage',
  components: {
    NavigationBar2,
    // InputPromptModal,
  },
  data() {
    return {
      tab: null,
      sortOrder: 'desc', // 초기 정렬 순서 (최신순)
      showCreateChatRoom: false,
      chatRoomList: [
        { chatRoomSeq: null, chatRoomId: "", chatRoomName: "지금 이게 방 제목이야", chatRoomOwner: 'user1', currentUsers: 1, chatRoomLimited: 9 },
        // { chatRoomSeq, chatRoomId, chatRoomName, chatRoomOwner, currentUsers, chatRoomLimited, chatRoomCreatedDate, members }
        // 다른 방 정보를 추가할 수 있습니다.
      ],
      myChatRoomList: [
        { chatRoomSeq: null, chatRoomId: "", chatRoomName: "지금 이게 방 제목이야", chatRoomOwner: 'user1', currentUsers: 1, chatRoomLimited: 9 },
        // { chatRoomSeq, chatRoomId, chatRoomName, chatRoomOwner, currentUsers, chatRoomLimited, chatRoomCreatedDate, members }
        // 다른 방 정보를 추가할 수 있습니다.
      ],

      newChatRoomInfo: { chatRoomName: "", chatRoomLimited: 2 }, // 입력한 방이름, 최대 인원

      // isModalOpen: false, // 기존의 isModalOpen을 openModal로 변경

      chatMenu: [
        { title: '채팅방', value: 'chatRoomList', info: '모든 채팅방' },
        { title: '내 채팅방', value: 'myChatRoomList', info: '내가 대화중인 채팅방' },
      ],

      myInfo: { Id: 'wjdehgns123', name: '정도훈', 학번: '201727040', 학과: '컴퓨터과학과' },
      contextMenuVisible: false,
      contextMenuPosition: { x: 0, y: 0 },
      selectedChatRoom: null, // 선택한 방 정보를 저장할 변수
    }
  },
  created: function () {
    this.getChatRoomList();
    this.getMyChatRoomList();
  },
  computed: {
    // 비동기로 받은 Entity List를 정렬하는 computed 속성
    sortedChatRoomList() {
      return this.chatRoomList.slice().sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.chatRoomSeq - b.chatRoomSeq;
        } else {
          return b.chatRoomSeq - a.chatRoomSeq;
        }
      });
    },

    sortedMyChatRoomList() {
      return this.myChatRoomList.slice().sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.chatRoomSeq - b.chatRoomSeq;
        } else {
          return b.chatRoomSeq - a.chatRoomSeq;
        }
      });
    },
  },
  methods: {
    getChatRoomList() {
      // 서버에서 방 목록을 가져오는 비동기 요청을 수행하고 결과를 chatRoomList에 저장
      ChatRoomService.getChatRoomList().then(
        (response) => {
          console.log(this.chatRoomList);
          console.log(response.data);
          this.chatRoomList = response.data;
        },
        (error) => {
          console.error(error);
        }
      )
    },

    getMyChatRoomList() {
      ChatRoomService.getMyChatRoomList().then(
        (response) => {
          console.log(this.myChatRoomList);
          console.log(response.data);
          this.myChatRoomList = response.data;
        },
        (error) => {
          console.error(error);
        }
      )
    },

    createChatRoom() {
      // 새 방을 생성하는 비동기 요청을 수행
      if (this.newChatRoomInfo.chatRoomName == "") {
        alert("채팅방 이름을 입력해주세요.");
        return 0;
      }

      let newChatRoomInfo = {
        chatRoomName: this.newChatRoomInfo.chatRoomName,
        chatRoomLimited: this.newChatRoomInfo.chatRoomLimited
      };

      let JsonOptions = JSON.stringify(newChatRoomInfo);

      ChatRoomService.createChatRoom(JsonOptions).then(
        (response) => {
          this.chatRoomList = response.data;
          console.error(this.chatRoomList);

          this.newChatRoomInfo.chatRoomName = ""; // 입력 필드 초기화
          this.showCreateChatRoom = false;
        },
        (error) => {
          console.error("Error creating room:", error);
        }
      )
    },

    toggleShowCreateChatRoom() {
      this.showCreateChatRoom = !this.showCreateChatRoom;
    },

    enterChatRoom(chatRoom) {
      if (confirm(`"` + chatRoom.chatRoomName + `"\n입장하시겠습니까?`)) {
        console.log("component: " + chatRoom);

        location.href = "/chat/" + chatRoom.chatRoomId;
      }
    },

    onChange(event) {
      console.log(event.target.value);
    },

    plusCount() {
      if (this.tab == "chatRoomList") {
        this.newChatRoomInfo.chatRoomLimited += 1;
      }
    },

    minusCount() {
      if (this.tab == "chatRoomList") {
        if (this.newChatRoomInfo.chatRoomLimited > 2) {
          this.newChatRoomInfo.chatRoomLimited -= 1;
        }
        else {
          alert("채팅방 인원 제한은 최소 2명입니다.");
        }
      }
    },

    selectRoom() {

    },

    closeModal() {
      this.$refs.inputPromptModal.closeModal();
    },

    handleInput(inputValue) {
      console.log("입력값:", inputValue);
      // 입력값을 처리하는 로직을 구현합니다.
    },

    init() {

    },

    leftMouseListener() {
      this.toggleOnOff(0);
    },

    /* 마우스 클릭한 지점에서 메뉴 보여줌 */
    // rightMouseListener(task) {
    //   this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    //   this.contextMenuVisible = true;
    //   event.preventDefault();
    // },

    rightMouseListener(chatRoom) {
      this.selectedChatRoom = chatRoom; // 선택한 방 정보를 저장
      this.toggleOnOff(1);
      this.showMenu(event.clientX, event.clientY);
      event.preventDefault();
    },

    toggleOnOff(num) {
      this.contextMenuVisible = num === 1;
    },

    showMenu(x, y) {
      this.contextMenuPosition = { x, y };
    },

    test(test) {
      console.error(test);
      ChatRoomService.test(test);
    }
  },
}
</script>

<style>
/* 모달 스타일 */
/* .modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
} */

/* 마우스 메뉴 */
.context-menus {
  position: absolute;
  display: none;
  border: 1px solid black;
  width: 100px;
  text-align: center;
}

.context-menus.active {
  display: block;
  background-color: white;
}

.context-menus.active>ul>li {
  list-style: none;
  padding: 10px;
}

.context-menus.active>ul>li:hover {
  background-color: lightgreen;
}

/* input type number 화살표 제거 */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox  */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>