<template>
    <NavigationBar2 class="float-left"></NavigationBar2>
    <div class="ml-14 customWidth float-left">
        <div class="border rounded-2xl m-4 ">

            <!-- <transition name="slide" mode="out-in">
                <div v-if="slideVisible" class="slide-container">
                    <div class="m-4">
                        <div class="font-semibold">대화상대</div>
                        <v-btn @click="toggleSlide()">슬라이딩 토글</v-btn>
                        <ul>
                            <li v-for="(member) in this.chatRoomInfo.members" :key="member">
                                {{ member.nickName }}
                            </li>
                        </ul>
                    </div>
                </div>
            </transition> -->
            <!-- <v-btn>
                <svg-icon type="mdi" :path="path"></svg-icon>
            </v-btn>
            <div>
                <div class="m-4">
                    <div class="font-semibold">대화상대</div>

                    <div>

                        <nav>
                            <ul>
                                <li v-for="(member) in this.chatRoomInfo.members" :key="member">
                                    {{ member.nickName }}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div> -->




            <div class="mx-4 mt-6 pb-2 border-b-2">
                <div>
                    <div class="text-2xl float-left"> {{ this.chatRoomInfo.chatRoomName }}</div>
                    <!-- <v-btn class="float-left ml-4" density="compact" icon="mdi-pencil"
                        @click="this.getChatRoomList()"></v-btn> -->

                </div>
                <!-- <v-btn @click="toggleSlide()" class="float-right">
                    <svg-icon type="mdi" :path="path"></svg-icon>
                </v-btn> -->
                <div class="clear-both"></div>
                <div class="mt-2 float-left">인원 수 : {{ this.chatRoomInfo.currentNumberOfPeople }} / {{
                    this.chatRoomInfo.chatRoomLimited }}
                </div>
                <div class="text-center">
                    <v-btn class="mr-4" density="compact" icon="mdi-refresh" @click="this.getChatHistories()"></v-btn>
                </div>
                <div class="clear-both"></div>
            </div>
            <div class="my-2 mx-4"> <!-- 채팅방 기본 트레이 -->
                <div id="chatting" class="chatting my-2">
                    <div v-if="this.chatHistory.length != 0">
                        <div v-for="(chat, index) in this.chatHistory" :key="index">
                            <div class="chat">
                                <div v-if="this.myInfo.memberSeq == chat.memberSeq">
                                    <!--  && this.sessionId == chat.sessionId -->
                                    <div class="me my-2">
                                        <div class="max-w-2/3 px-1 py-2 border rounded-lg float-right">
                                            <div>{{ chat.msg }}</div>
                                        </div>
                                        <div class="text-sm align-baseline float-right mr-2">
                                            {{ chat.chatHistoryTime }}
                                        </div>
                                        <div class="clear-both"></div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="others my-2">
                                        <div class="flex items-center">
                                            <img :src="require(`@/assets/complaint.png`)" class="float-left w-6 ml-1">
                                            <div class="float-left ml-1">{{ chat.nickName }}</div>
                                            <div class="clear-both"></div>
                                        </div>
                                        <div class="flex justify-center">
                                            <div class="px-1 py-3 border rounded-lg w-2/3 float-left">
                                                {{ chat.msg }}
                                            </div>
                                            <div class="text-sm float-left">
                                                {{ chat.chatHistoryTime }}
                                            </div>
                                            <div class="clear-both"></div>
                                        </div>
                                        
                                        <div class="clear-both"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-2 mx-4 flex items-center px-2">
            <input id="msg" class="border rounded-2xl w-11/12 h-fit py-1 px-2" v-model="this.msg"
                placeholder="보내실 메시지를 입력하세요.">
            <v-btn @click="send(1)" id="sendBtn" class="ml-3 bg-yellow" density="comfortable" icon="mdi-send"></v-btn>
        </div>
        <div>
            <v-btn id="exitChatRoom" class="border" @click="this.exitChatRoom()">방 나가기</v-btn>
            <!-- <v-btn class="float-right mr-4" density="compact" icon="mdi-refresh" @click="this.refreshChatRoomInfo()"></v-btn> -->
        </div>
    </div>
    <!-- <div class="clear-both"></div> -->
</template>
  
<script>
import NavigationBar2 from './NavigationBar2.vue';
import ChatRoomService from '../Service/ChatRoomService';
import ChatHistoryService from '../Service/ChatHistoryService'

// import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatListBulleted } from '@mdi/js';

export default {
    name: 'ChatRoom',
    components: {
        NavigationBar2,
        // SvgIcon
    },
    data() {
        return {
            path: mdiFormatListBulleted,
            checkChatRoomId: false,
            chatRoomExist: false,
            chatRooomRemaining: false,
            alreadyEntered: false,
            chatRoomId: this.$route.params.chatRoomId,
            messageType: ["getSession", "message", "enter", "exit"],
            sessionId: null,
            // senderMemberSeq: null,
            msg: null,
            myInfo: { memberSeq: null, nickName: null },
            chatRoomInfo: { chatRoomSeq: null, chatRoomId: null, chatRoomName: null, currentNumberOfPeople: null, chatRoomLimited: null, members: null },
            chatHistory: [],
            slideVisible: false
        }
    },
    created: function () {
        this.enterChatRoom();
        this.getChatHistories();
    },
    methods: {
        wsOpen() {
            // 웹소켓 주소 기준은 백엔드 서버
            this.ws = new WebSocket("wss://bck.twoleebubu.com/chat/" + this.$route.params.chatRoomId);
            this.wsEvt();
        },

        wsEvt() {
            this.ws.onopen = (data) => {
                //소켓이 열리면 동작
                console.log(data)
            };

            this.ws.onmessage = (data) => {
                //메시지를 받으면 동작
                let send = this.send;
                let convertTo12HourFormat = this.convertTo12HourFormat;
                let alreadyEntered = this.alreadyEntered;

                let msg = data.data;
                console.log("msg: " + msg);

                if (msg != null && msg.trim() != '') {
                    let jsonMsg = JSON.parse(msg);
                    console.log("jsonMsg: " + jsonMsg);

                    if (jsonMsg.messageType == this.messageType[0]) { // getSeesion
                        let sessionId = jsonMsg.sessionId != null ? jsonMsg.sessionId : '';

                        if (sessionId != '') {
                            this.sessionId = sessionId;
                            if (!alreadyEntered) {
                                send(2); // enter
                            }
                            // $("#sessionId").val(sessionId);
                        }
                    }
                    else if (jsonMsg.messageType == this.messageType[1]) { // message
                        console.log(jsonMsg.chatHistoryTime)
                        jsonMsg.chatHistoryTime = convertTo12HourFormat(jsonMsg.chatHistoryTime);
                        console.log(jsonMsg.chatHistoryTime)

                        this.chatHistory.push(jsonMsg);
                    }
                    else if (jsonMsg.messageType == this.messageType[2]) { // enter
                        jsonMsg.chatHistoryTime = convertTo12HourFormat(jsonMsg.chatHistoryTime);
                        // jsonMsg.msg = jsonMsg.nickName + jsonMsg.msg;
                        this.chatHistory.push(jsonMsg);

                        // 누군가 입장하면 멤버 정보 새로 받아오기
                    }
                    else if (jsonMsg.messageType == this.messageType[3]) { // exit
                        jsonMsg.chatHistoryTime = convertTo12HourFormat(jsonMsg.chatHistoryTime);
                        // jsonMsg.msg = jsonMsg.nickName + jsonMsg.msg;
                        this.chatHistory.push(jsonMsg);

                        // 누군가 퇴장하면 멤버 정보 새로 받아오기
                    }
                    else {
                        console.warn("unknown messageType! : " + jsonMsg.messageType)
                    }
                }
            };

            document.addEventListener("keypress", (e) => {
                if (e.keyCode == 13) { //enter press
                    this.send(1);   // message
                }
            });
        },

        send(messageType) {
            // console.log(messageType);

            let option = {
                messageType: this.messageType[messageType],
                chatRoomId: this.chatRoomId,
                sessionId: this.sessionId,
                memberSeq: this.myInfo.memberSeq,
                nickName: this.myInfo.nickName,
                msg: this.msg
            }

            if (option.messageType == this.messageType[2]) { // enter
                option.msg = option.nickName + "님이 들어왔습니다.";
            }

            if (option.messageType == this.messageType[3]) { // exit
                option.msg = option.nickName + "님이 나갔습니다.";
            }

            console.log(option)
            this.ws.send(JSON.stringify(option))
            this.msg = "";
        },

        async enterChatRoom() {
            let wsOpen = this.wsOpen;

            console.log("this.checkChatRoomId : " + this.checkChatRoomId);

            let chatRoomId = {
                chatRoomId: this.$route.params.chatRoomId
            }

            let jsonChatRoomId = JSON.stringify(chatRoomId);

            ChatRoomService.enterChatRoom(jsonChatRoomId).then(
                (response) => {
                    console.log(response);
                    console.log(response.data);

                    this.chatRoomExist = response.data.chatRoomExist;
                    this.chatRoomInfo = response.data.chatRoomInfoDTO;
                    this.alreadyEntered = response.data.alreadyEntered;
                    this.myInfo = response.data.myInfo;

                    console.log(this.chatRoomExist);
                    console.log(this.chatRoomInfo);
                    console.log(this.alreadyEntered);
                    console.log(this.myInfo);

                    if (response.data.chatRoomExist == true) {
                        if (response.data.alreadyEntered == true) {

                            console.log("this.alreadyEntered : " + this.alreadyEntered);
                            console.log("this.chatRoomExist : " + this.chatRoomExist);
                            console.log("this.myInfo : " + this.myInfo);
                            wsOpen();
                            console.log("wsOpen")
                        }
                        else {
                            if (response.data.chatRoomRemaining == true) {
                                console.log("this.checkChatRoomId : " + this.checkChatRoomId);
                                wsOpen();
                                console.log("wsOpen completed, now sendEnter(2)");

                            }
                            else {
                                alert("인원이 가득 찬 채팅방 입니다.");
                                location.href = "/chat/"
                            }
                        }
                    }
                    else {
                        console.log("this.checkChatRoomId : " + this.checkChatRoomId);
                        alert("잘못된 주소이거나 존재하지 않는 채팅방 입니다.");
                        location.href = "/chat/"
                    }
                },
                (error) => {
                    console.error("Error getChatRoomInfo:", error);
                }
            )
        },

        exitChatRoom() {
            let sendExit = this.send;

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
                        sendExit(3)
                    },
                    (error) => {
                        console.error("Error exitChatRoom:", error);
                    }
                )
            }
        },

        refreshChatRoomInfo() {
            let chatRoomId = {
                chatRoomId: this.$route.params.chatRoomId
            }

            let jsonChatRoomId = JSON.stringify(chatRoomId);

            ChatRoomService.refreshChatRoomInfo(jsonChatRoomId).then(
                (response) => {
                    console.log(response);
                    console.log(response.data);
                    this.chatRoomInfo = response.data;
                    console.log(this.chatRoomInfo);
                },
                (error) => {
                    console.error("Error refreshChatRoomInfo:", error);
                }
            )
        },

        convertTo12HourFormat(dateTimeString) {
            const date = new Date(dateTimeString);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? '오후' : '오전';
            const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');

            const formattedTime = `${ampm} ${formattedHours}:${formattedMinutes}`;
            return formattedTime;
        },

        async getChatHistories() {
            const convertTo12HourFormat = this.convertTo12HourFormat;

            let chatRoomId = {
                chatRoomId: this.$route.params.chatRoomId
            }

            let jsonChatRoomId = JSON.stringify(chatRoomId);

            ChatHistoryService.getChatHistories(jsonChatRoomId).then(
                (response) => {
                    // console.log(response.data)

                    response.data.forEach(messageOptions => {
                        messageOptions.chatHistoryTime = convertTo12HourFormat(messageOptions.chatHistoryTime);
                    })

                    this.chatHistory = response.data;
                },
                (error) => {
                    console.error("Error getChatHistories:", error);
                }
            )
        },

        toggleSlide() {
            console.log("클릭 전 : " + this.slideVisible);
            this.slideVisible = !this.slideVisible;
            console.log("클릭 후 : " + this.slideVisible);
        }
    }
}


</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.chatting {
    background-color: #F6F6F6;
    height: 500px;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
}

.chatting .me {
    color: #000;
    text-align: right;
}

.chatting .others {
    color: #465ccc;
    text-align: left;
}

input {
    width: 330px;
    height: 25px;
}

/* 슬라이딩 애니메이션을 정의합니다. */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.slide-container {
    /* 슬라이딩할 컨텐츠의 초기 스타일을 정의합니다. */
    width: 60%;
    float: right;
    /* 컨텐츠 너비를 조절하세요. */
    height: 500px;
    position: relative;
    background-color: lightblue;
    /* 원하는 배경색을 지정하세요. */
    z-index: 1;
    /* 다른 컨텐츠 위로 나타나도록 설정 */
}
</style>