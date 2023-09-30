<template>
    <div id="container" class="container">
        <h1>채팅</h1>
        <div id="chating" class="chating">
        </div>

        <div id="yourName">
            <table class="inputTable">
                <tr>
                    <th>사용자명</th>
                    <th><input type="text" name="userName" id="userName"></th>
                    <th><button @click="this.chatName()" id="startBtn">이름 등록</button></th>
                </tr>
            </table>
        </div>
        <div id="yourMsg">
            <table class="inputTable">
                <tr>
                    <th>메시지</th>
                    <th><input id="chatting" placeholder="보내실 메시지를 입력하세요."></th>
                    <th><button @click="this.send()" id="sendBtn">보내기</button></th>
                </tr>
            </table>
        </div>
    </div>

    <!-- <div class="border rounded-2xl m-4 ">
        <div class="mx-4 mt-6 pb-2 border-b-2">
            <div class="text-2xl">방이름 {{ chatRoomInfo.id }}</div>
            <div>인원수 1/9</div>
        </div>
        <div class="my-2 mx-4 채팅방 기본 트레이">

            <div class="상대방 채팅">
                <div class="flex items-center my-2">
                    <img :src="require(`@/assets/logo.png`)" class="float-left w-6 ml-1">
                    <div class="float-left ml-1">닉네임</div>
                    <div class="clear-both"></div>
                </div>
                <div class="px-1 py-3 border rounded-lg w-2/3">
                    <div class="">ㅁㄴㅇㅁㅇㅁㅇㅁㅇㄴㅇㅁㅇㅁㅇㅁㅇㄴㅁㄴ</div>
                </div>
            </div>

            <div class="상대방 채팅 my-3">
                <div class="px-1 py-3 border rounded-lg w-2/3 float-right">
                    <div class="">ㅁㄴㅇㅁㅇㅁㅇㅁㅇㄴㅇㅁㅇㅁㅇㅁㅇㄴㅁㄴ</div>
                </div>
                <div class="clear-both"></div>
            </div>
        </div>
    </div>
    <div class="border rounded-2xl m-4 h-fit">
        <input class="w-full">
        <div>
            <button class="float-right">전송</button>
        </div>
    </div> -->
</template>
  
<script>
import $ from 'jquery';
import axios from 'axios';
// import UserService from "../Service/UserService";


axios.get('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js').then(result => {
    console.log(result);
}).catch(() => {
    console.log("실패");
})

export default {
    name: 'ChatTest',
    components: {
    },
    data() {
        return {
            chatRoomInfo: { id: this.$route.params.room, name: "방이름", owner: 'user1', users: 1, maxUsers: 9 },
            ws:'',

        }
    },
    methods: {
        wsOpen() {
            this.ws = new WebSocket("ws://localhost:8080/chat/"+this.$route.params.room);
            console.log(this.ws);
            // let data = {
            //     'roomId':"1",
            //     'sender':"qw",
            //     "message":"test"
            // }
            // UserService.sendWs(data).then(
            //     (res)=>{
            //         console.log(res.data)
            //     },
            //     (error)=>{
            //         console.log(error);
            //     }
            // );
            console.log("1")
            this.wsEvt();
        },

        wsEvt() {
            this.ws.onopen = function (data) {
                console.log(data)
            };

            this.ws.onmessage = function (data) {
                let msg = data.data;
                if (msg != null && msg.trim() != '') {
                    $("#chating").append("<p>" + msg + "</p>");
                }
            };

            document.addEventListener("keypress", (e) => {
                if (e.keyCode == 13) { //enter press
                    this.send();
                }
            });
        },

        chatName() {
            let userName = $("#userName").val();
            if (userName == null || userName.trim() == "") {
                alert("사용자 이름을 입력해주세요.");
                $("#userName").focus();
            } else {
                this.wsOpen();
                $("#yourName").hide();
                $("#yourMsg").show();
            }
        },

        send() {
            let uN = $("#userName").val();
            let msg = $("#chatting").val();
            this.ws.send(uN + " : " + msg);
            $('#chatting').val("");
        },
    }
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

.chating {
    background-color: #000;
    width: 500px;
    height: 500px;
    overflow: auto;
}

.chating p {
    color: #fff;
    text-align: left;
}

input {
    width: 330px;
    height: 25px;
}

#yourMsg {
    display: none;
}
</style>