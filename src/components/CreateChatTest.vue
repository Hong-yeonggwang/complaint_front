<template>
    <div class="container">
        <h1>채팅방</h1>
        <div id="roomContainer" class="roomContainer">
            <table id="roomList" class="roomList">
                <tr>
                    <th class='num'>순서</th>
                    <th class='room'>방 이름</th>
                    <th class='go'></th>
                </tr>
                <tr v-for="(chatRoom, index) in chatRooms" :key="index">
                    <th class='num'>{{ index += 1 }}</th>
                    <th class='room' @click="goRoom()">{{ chatRoom.chatRoomName }}</th>
                </tr>
            </table>
        </div>
        <div>
            <table class="inputTable">
                <tr>
                    <th>방 제목</th>
                    <th><input type="text" name="roomName" id="roomName"></th>
                    <th><button @click=this.createRoom() id="createRoom">방 만들기</button></th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';

axios.get('https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js').then(result => {
    console.log(result);
}).catch(() => {
    console.log("실패");
})

// let ws;

export default {
    name: 'CreateChatTest',
    components: {
    },
    data() {
        return {
            chatRooms: [
                /* { chatRoomId, chatRoomName, currentUsers, maxUsers,  } */
                { chatRoomId: 1, chatRoomName: '방1', owner: 'user1', currentUsers: 1, maxUsers: 9 },
                // 다른 방 정보를 추가할 수 있습니다.
            ],
        }
    },
    created: function () {
        this.getRoom();
        this.createRoom();
    },
    methods: {

        getRoom() {
            let createChatingRoom = this.createChatingRoom();

            this.commonAjax('/getRoom', "", 'post', function (result) {
                createChatingRoom(result);
            });
        },

        createRoom() {
            let createChatingRoom = this.createChatingRoom();
            let msg = { roomName: $('#roomName').val() };

            this.commonAjax('/createRoom', msg, 'post', function (result) {
                createChatingRoom(result);
            });

            $("#roomName").val("");
        },

        goRoom(number, name) {
            location.href = "/moveChating?roomName=" + name + "&" + "roomNumber=" + number;
        },

        createChatingRoom(result) {
            if (result != null) {
                // HTML을 동적으로 생성하기 위한 데이터 바인딩
                const tableData = result.map((d, idx) => ({
                    roomName: d.roomName.trim(),
                    roomNumber: d.roomNumber,
                    idx: idx + 1,
                }));

                // Vue.js 데이터 바인딩을 사용한 템플릿 생성
                this.tableData = tableData; // Vue.js 데이터에 할당

                // Vue.js 데이터와 템플릿을 사용하여 HTML을 렌더링
                // 이 부분은 Vue.js 컴포넌트 내에서 템플릿으로 처리하는 것이 좋습니다.

                // this.chatRooms.push({})

                // result.forEach(function (d, idx) {
                //     let rn = d.roomName.trim();
                //     let roomNumber = d.roomNumber;
                //     tag += "<tr>" +
                //         "<td class='num'>" + (idx + 1) + "</td>" +
                //         "<td class='room'>" + rn + "</td>" +
                //         "<td class='go'><button type='button' onclick='goRoom(\"" + roomNumber + "\", \"" + rn + "\")'>참여</button></td>" +
                //         "</tr>";
                // });
                // $("#roomList").empty().append(tag);
            }
        },

        commonAjax(url, parameter, type, calbak, contentType) {
            $.ajax({
                url: url,
                data: parameter,
                type: type,
                contentType: contentType != null ? contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function (result) {
                    calbak(result);
                },
                error: function (err) {
                    console.log('error');
                    calbak(err);
                }
            });
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
    width: 350px;
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

<!-- <template>
    <div></div>
</template>

<script>
export default {

}
</script>

<style>

</style> -->