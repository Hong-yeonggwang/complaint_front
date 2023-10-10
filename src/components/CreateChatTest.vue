<template>
    <div class="container">
        <h1>채팅방</h1>
        <div id="roomContainer" class="roomContainer">
            <table id="roomList" class="roomList">
                <tr>
                    <th class='num'>순서</th>
                    <th class='room'>방 이름</th>
                </tr>
                <tr v-for="(chatRoom, index) in LatestChatRoomList" :key="index">
                    <th class='num'>{{ index += 1 }}</th>
                    <th class='room' @click="enterRoom(chatRoom)">{{ chatRoom.chatRoomName }}</th>
                </tr>
            </table>
        </div>
        <div>
            <table class="inputTable">
                <tr>
                    <th>방 제목</th>
                    <th><input type="text" id="roomName" v-model="newChatRoomInfo.chatRoomName"
                            class="w-30 border-solid border-1 border-black" placeholder="방 제목을 입력하세요.">
                    </th>
                    <th><input type="number" id="maxUsers" v-model="newChatRoomInfo.maxUsers"
                            class="w-30 border-solid border-1 border-black" placeholder="최대 몇명인지 입력하세요.">
                    </th>
                    <th><button @click=this.createChatRoom() id="createRoom">방 만들기</button></th>
                    <th><button @click=this.getChatRoomList() id="getChatRoomList">방 가져오기</button></th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import ChatService from '../Service/ChatService';

export default {
    name: 'CreateChatTest',
    components: {
    },
    data() {
        return {
            chatRooms: [
                { chatRoomId: "", chatRoomName: "지금 이게 방 제목이야", owner: 'user1', currentUsers: 1, maxUsers: 9 },
                /* { chatRoomId, chatRoomName, owner, currentUsers, maxUsers,  } */
                // 다른 방 정보를 추가할 수 있습니다.
            ],
            newChatRoomInfo: { chatRoomName: "", owner:"", maxUsers: 0 }, // 입력한 방이름, 최대 인원
        }
    },
    created: function () {
        this.getChatRoomList();
        // this.createChatRoom();
    },
    computed: {
        // 배열을 뒤집은 새로운 배열을 반환하는 computed 속성
        LatestChatRoomList() {
            return this.chatRooms.slice().reverse();
        },
    },
    methods: {
        getChatRoomList() {
            // 서버에서 방 목록을 가져오는 비동기 요청을 수행하고 결과를 chatRooms에 저장
            console.log("컴포넌트 방리스트 호출 : ");

            ChatService.getChatRoomList().then(
                (response) => {
                    this.chatRooms = response.data;
                    // console.log("컴포넌트 방리스트 호출 : " + response.data);
                    // response.data.forEach((ChatRoomInfo, idx) => {
                    //     console.log("컴포넌트 방리스트 호출 : " + ChatRoomInfo.chatRoomName + ", " + idx);
                    // })
                },
                (error) => {
                    console.error(error);
                }
            )
        },

        createChatRoom() {
            // 새 방을 생성하는 비동기 요청을 수행
            if(this.newChatRoomInfo.chatRoomName == ""){
                alert("채팅방 이름을 입력해주세요.");
                return 0;
            }

            // if(this.newChatRoomInfo.maxUsers < 2){
            //     alert("채팅방 인원 제한은 최소 2명입니다.");
            //     return 0;
            // }


            let newChatRoomInfo = {
                chatRoomName: this.newChatRoomInfo.chatRoomName,
                maxUsers: this.newChatRoomInfo.maxUsers
            };
            // console.log("컴포넌트 방 생성 호출 : " +  JSON.stringify(newChatRoomInfo));
            console.log("컴포넌트 방 생성 호출 : " + newChatRoomInfo);

            ChatService.createChatRoom(newChatRoomInfo).then(
                (response) => {
                    console.log("방 생성 결과 : " + response.data);
                    this.chatRooms.push(response.data);

                    this.newChatRoomInfo.chatRoomName = ""; // 입력 필드 초기화
                    // this.getChatRoomList();
                },
                (error) => {
                    console.error("Error creating room:", error);
                }
            )
        },

        enterRoom(chatRoom) {
            if(confirm(`"` + chatRoom.chatRoomName + `"\n입장하시겠습니까?`)){
                location.href = "/chat/" + chatRoom.chatRoomId;
            }
        },

    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.container {
    width: 500px;
    margin: 0 auto;
    padding: 25px
}

.container h1 {
    text-align: left;
    padding: 5px 5px 5px 15px;
    color: #FFBB00;
    border-left: 3px solid #FFBB00;
    margin-bottom: 20px;
}

.roomContainer {
    background-color: #F6F6F6;
    width: 500px;
    height: 500px;
    overflow: auto;
}

.roomList {
    border: none;
}

.roomList th {
    border: 1px solid #FFBB00;
    background-color: #fff;
    color: #FFBB00;
}

.roomList td {
    border: 1px solid #FFBB00;
    background-color: #fff;
    text-align: left;
    color: #FFBB00;
}

.roomList .num {
    width: 75px;
    text-align: center;
}

.roomList .room {
    width: 425px;
}

.roomList .go {
    width: 71px;
    text-align: center;
}

button {
    background-color: #FFBB00;
    font-size: 14px;
    color: #000;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 3px;
    margin: 3px;
}

.inputTable th {
    padding: 5px;
}

.inputTable input {
    width: 330px;
    height: 25px;
}
</style>