<template>
    <div id="container" class="container">
        <h1>채팅</h1>
        <input type="hidden" id="sessionId" value="">

        <div id="chatting" class="chatting">

        </div>

        <!-- <div id="yourName">
            <table class="inputTable">
                <tr>
                    <th>사용자명</th>
                    <th><input type="text" name="nickName" id="nickName" v-model="nickName"></th>
                    <th><button @click="this.chatName()" id="startBtn">이름 등록</button></th>
                </tr>
            </table>
        </div> -->
        <div id="yourMsg">
            <table class="inputTable">
                <tr>
                    <th>메시지</th>
                    <th><input id="msg" v-model="this.msg" placeholder="보내실 메시지를 입력하세요."></th>
                    <th><button @click="this.send(1)" id="sendBtn">보내기</button></th>
                </tr>
            </table>
        </div>
        <div>
            <v-btn id="exitChatRoom" class="border" @click="this.exitChatRoom()">방 나가기</v-btn>
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
import ChatRoomService from '../Service/ChatRoomService';
// import ChattingService from '../Service/ChattingService';

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
            chatRoomExist: false,
            chatRooomRemaining: false,
            chatRoomId: this.$route.params.chatRoomId,
            messageType: ["getSession", "message", "memberChange"],
            sessionId: null,
            msg: null,
            myInfo: null, // {memberSeq, nickName}
            chatRoomInfo: null, // { chatRoomSeq, chatRoomId, chatRoomName, currentNumberOfPeople, chatRoomLimited, members}
            chatHistory: []
        }
    },
    created: function () {
        this.enterChatRoom();



        // if(this.checkChatRoomId){
        // }
    },
    // mounted() {
    //     console.log(this.$route.props)
    //     console.log(this.$route.params)
    //     this.receivedDtoData = JSON.parse(this.$route.params.dtoData)
    //     console.log(this.receivedDtoData)
    // },
    methods: {
        wsOpen() {
            // 웹소켓 주소 기준은 백엔드 서버
            this.ws = new WebSocket("ws://localhost:8080/chat/" + this.$route.params.chatRoomId);
            this.wsEvt();
        },

        wsEvt() {
            this.ws.onopen = (data) => {
                //소켓이 열리면 동작
                console.log(data)
            };

            this.ws.onmessage = (data) => {
                //메시지를 받으면 동작
                let msg = data.data;
                console.log("msg: " + msg);

                if (msg != null && msg.trim() != '') {
                    let jsonMsg = JSON.parse(msg);
                    console.log("jsonMsg: " + jsonMsg);


                    if (jsonMsg.type == this.messageType[0]) {
                        let sessionId = jsonMsg.sessionId != null ? jsonMsg.sessionId : '';

                        if (sessionId != '') {
                            this.sessionId = sessionId;
                            // $("#sessionId").val(sessionId);
                        }
                    }
                    else if (jsonMsg.type == this.messageType[1]) {
                        if (jsonMsg.sessionId == this.sessionId) {
                            $("#chatting").append("<p class='me'>" + jsonMsg.msg + "</p>");
                        } else {
                            $("#chatting").append("<p class='others'>" + jsonMsg.nickName + " : " + jsonMsg.msg + "</p>");
                        }

                    }
                    else if (jsonMsg.type == this.messageType[2]) {
                        // 누군가 입장 또는 퇴장하면 멤버 정보 새로 받아오기
                    }
                    else {
                        console.warn("unknown type! : " + jsonMsg.type)
                    }
                }
            };

            document.addEventListener("keypress", (e) => {
                if (e.keyCode == 13) { //enter press
                    this.send(0);
                }
            });
        },

        // chatName() {
        //     let nickName = $("#nickName").val();
        //     if (nickName == null || nickName.trim() == "") {
        //         alert("사용자 이름을 입력해주세요.");
        //         $("#nickName").focus();
        //     } else {
        //         this.wsOpen();
        //         $("#yourName").hide();
        //         $("#yourMsg").show();
        //     }
        // },

        send(type) {
            let option = {
                type: this.messageType[type],
                chatRoomId: this.chatRoomId,
                sessionId: this.sessionId,
                nickName: this.myInfo.nickName,
                msg: this.msg
            }

            console.log(option)
            this.ws.send(JSON.stringify(option))
            this.msg = "";
        },
        // start() {
        //     console.log(this.$route.params.room);
        // },

        async enterChatRoom() {
            let wsOpen = this.wsOpen;
            // let getChatMyInfo = this.getChatMyInfo;

            console.log("this.checkChatRoomId : " + this.checkChatRoomId);

            let chatRoomId = {
                chatRoomId: this.$route.params.chatRoomId
            }

            let jsonChatRoomId = JSON.stringify(chatRoomId);

            ChatRoomService.enterChatRoom(jsonChatRoomId).then(
                (response) => {
                    console.log(response);
                    console.log(response.data);

                    this.chatRoomExist = true;
                    this.chatRoomInfo = response.data.chatRoomInfoDTO;
                    this.myInfo = response.data.myInfo;

                    console.log(this.chatRoomExist);
                    console.log(this.chatRoomInfo);
                    console.log(this.myInfo);

                    if (response.data.chatRoomExist == true) {
                        if (response.data.alreadyEnter == true) {

                            console.log("this.chatRoomExist : " + this.chatRoomExist);
                            console.log("this.myInfo : " + this.myInfo);
                            wsOpen();
                            console.log("wsOpen")
                        }
                        else {
                            if (response.data.chatRoomRemaining == true) {
                                console.log("this.checkChatRoomId : " + this.checkChatRoomId);
                                wsOpen();
                                console.log("wsOpen")
                            }
                            else {
                                alert("이미 가득 찬 채팅방 입니다.");
                                location.href = "/chat/"
                            }
                        }
                        // getChatMyInfo();
                        // console.log("getMyInfo")
                    }
                    else {
                        console.log("this.checkChatRoomId : " + this.checkChatRoomId);
                    }
                },
                (error) => {
                    console.error("Error getChatRoomInfo:", error);
                }
            )
        },

        // getChatMyInfo() {
        //     ChattingService.getChatMyInfo().then(
        //         (response) => {
        //             console.log(response.data);
        //             this.myInfo = response.data;
        //         },
        //         (error) => {
        //             console.error("Error getChatMyInfo:", error);
        //         }
        //     )
        // },

        exitChatRoom() {
            if (confirm(`채팅방을 나가시겠습니까?`)) {
                let info = {
                    chatRoomSeq: this.chatRoomInfo.chatRoomSeq,
                    currentNumberOfPeople: this.chatRoomInfo.currentNumberOfPeople
                }

                let jsonInfo = JSON.stringify(info);

                ChatRoomService.exitChatRoom(jsonInfo).then(
                    (response) => {
                        console.log(response.data);
                        location.href = "/chat/"

                    },
                    (error) => {
                        console.error("Error exitChatRoom:", error);
                    }
                )
            }
        }
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

.chatting {
    background-color: #F6F6F6;
    width: 500px;
    height: 500px;
    overflow: auto;
}

.chatting .me {
    color: #000;
    text-align: right;
}

.chatting .others {
    color: blue;
    text-align: left;
}

input {
    width: 330px;
    height: 25px;
}

#yourMsg {
    /* display: none; */
}
</style>