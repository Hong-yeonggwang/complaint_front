<template>
  <!-- 모달 -->
  <InputPromptModal v-if="this.isModalOpen == true" @closeModal="closeModal" @handleInput="handleInput" />
  <!-- // 모달 -->

  <div class="border rounded-2xl m-4 ">
    <div class="mx-4 mt-6 pb-2 border-b-2">
      <div>
        <div class="text-2xl float-left">실시간 채팅</div>
        <v-btn class="float-right mr-7" density="comfortable" icon="mdi-chat-plus" @click="createChatRoom()"></v-btn>
        <div class="clear-both"></div>
      </div>
      <div class="float-left">채팅을 통해 배달 같이 주문할 친구를 구해요~</div>
      <div class="clear-both"></div>
    </div>

    <div class="overflow-y-auto" style="height: 34rem;">
      <div class="my-2 mx-4 border rounded-lg" v-for="chatRoom in chatRooms" :key="chatRoom.id" @click="rightMouseListener(chatRoom)">
        <div class="px-2 py-3 mx-2">
          <div class="float-left">방이름: {{ chatRoom.name }}</div>
          <div class="clear-both"></div>
          <div class="float-left">방장: {{ chatRoom.owner }}</div>
          <div class="float-right">접속인원: {{ chatRoom.users }}/{{ chatRoom.maxUsers }}</div>
          <div class="clear-both"></div>
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
import InputPromptModal from './InputPromptModal.vue';

/* 마우스 오른쪽 메뉴 변수 */
export default {
  name: 'ChatPage',
  components: {
    InputPromptModal,
  },
  data() {
    return {
      isModalOpen: false, // 기존의 isModalOpen을 openModal로 변경
      myInfo: { name: '정도훈', 학번: '201727040', 학과: '컴퓨터과학과' },
      chatRooms: [
        { id: 1, name: '방1', owner: 'user1', users: 1, maxUsers: 9 },
        { id: 2, name: '방2', owner: 'user2', users: 2, maxUsers: 9 },
        // 다른 방 정보를 추가할 수 있습니다.
      ],
      contextMenuVisible: false,
      contextMenuPosition: { x: 0, y: 0 },
      selectedChatRoom: null, // 선택한 방 정보를 저장할 변수
    }
  },
  methods: {
    closeModal() {
      this.$refs.inputPromptModal.closeModal();
    },
    handleInput(inputValue) {
      console.log("입력값:", inputValue);
      // 입력값을 처리하는 로직을 구현합니다.
    },
    init() {
      this.leftMouseListener();
      // this.rightMouseListener();
    },
    createChatRoom() {
      // createChatRoom 함수 내용 구현
      // confirm();
      this.isModalOpen = true;
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
  },
  created() {
    this.init(); // 컴포넌트가 생성될 때 init() 메서드 실행
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
</style>