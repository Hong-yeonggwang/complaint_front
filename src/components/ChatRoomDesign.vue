<template>
  <NavigationBar2 class="float-left"></NavigationBar2>
  <div class="ml-14 customWidth float-left">
    
  <div class="border rounded-2xl m-4 ">
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
  </div>
  </div>
</template>

<script>
import NavigationBar2 from './NavigationBar2.vue';
export default {
  name: 'ChatRoom',
  components: {
    NavigationBar2
  },
  data() {
    return {
      chatRoomInfo: {id: this.$route.params.room , name:"방이름", owner: 'user1', users: 1, maxUsers: 9 },
      

    }
  },
}
</script>
