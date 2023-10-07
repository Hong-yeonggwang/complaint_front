<template>
    <div class="container">
        <h1>채팅방</h1>
        <div id="roomContainer" class="roomContainer">
            <table id="roomList" class="roomList">
                <tr>
                    <th class='num'>순서</th>
                    <th class='room'>방 이름</th>
                </tr>
                <tr v-for="(chatRoom, index) in chatRooms" :key="index">
                    <th class='num'>{{ index += 1 }}</th>
                    <th class='room' @click="enterRoom(chatRoom.chatRoomId)">{{ chatRoom.chatRoomName }}</th>
                </tr>
            </table>
        </div>
        <div>
            <table class="inputTable">
                <tr>
                    <th>방 제목</th>
                    <!-- name="roomName"  -->
                    <th><input type="text" id="roomName" v-model="chatRoomName" class="border-solid border-1 border-black"></th>
                    <th><button @click=this.createChatRoom() id="createRoom">방 만들기</button></th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';

// axios.get('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js').then(result => {
//     console.log(result);
// }).catch(() => {
//     console.log("실패");
// })

// let ws;

export default {
    name: 'CreateChatTest',
    components: {
    },
    data() {
        return {
            chatRooms: [
                { chatRoomId: "", chatRoomName: "지금 이게 방 제목이야", currentUsers: 1, maxUsers: 9 },
                /* { chatRoomId, chatRoomName, currentUsers, maxUsers,  } */
                // 다른 방 정보를 추가할 수 있습니다.
            ],
            chatRoomName: "", // 입력된 방 이름
        }
    },
    created: function () {
        // this.getChatRoom();
        // this.createChatRoom();
    },
    methods: {
        getChatRoom() {
            // 서버에서 방 목록을 가져오는 비동기 요청을 수행하고 결과를 chatRooms에 저장
            axios
                .post("/getChatRoom", "")
                .then((response) => {
                    // this.chatRooms = response.data;
                    this.chatRooms.push(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching rooms:", error);
                });
        },

        createChatRoom() {
            // 새 방을 생성하는 비동기 요청을 수행
            let msg = {
                chatRoomName: this.chatRoomName
            };

            axios
                .post("/createChatRoom", msg)
                .then((response) => {
                    this.getChatRoom(response); // 방 생성 후 방 목록을 다시 가져와서 갱신
                    this.chatRoomName = ""; // 입력 필드 초기화
                })
                .catch((error) => {
                    console.error("Error creating room:", error);
                });

            // $("#roomName").val("");
        },

        enterRoom(chatRoomId) {
            location.href = "/chat/" + chatRoomId;
        },

        createChatRoomList(result) {
            if (result != null) {
                // // HTML을 동적으로 생성하기 위한 데이터 바인딩
                // const chatRooms = result.map((data, idx) => ({
                //     roomName: data.roomName.trim(),
                //     roomId: data.roomId,
                //     idx: idx + 1,
                // }));

                // // Vue.js 데이터 바인딩을 사용한 템플릿 생성
                // this.chatRooms = chatRooms; // Vue.js 데이터에 할당

                // Vue.js 데이터와 템플릿을 사용하여 HTML을 렌더링
                // 이 부분은 Vue.js 컴포넌트 내에서 템플릿으로 처리하는 것이 좋습니다.

                // // this.chatRooms.push({})

                let tag = "";

                result.forEach((data, idx) => {
                    let roomName = data.roomName.trim();
                    tag += "<tr>" +
                        "<td class='num'>" + (idx + 1) + "</td>" +
                        "<td class='room'>" + roomName + "</td>" +
                        "</tr>";
                });
                $("#roomList").empty().append(tag);
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