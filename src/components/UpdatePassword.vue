<template>
  <div class="w-full h-8 border-dotted border-black border-2 border-t-0 border-l-0 border-r-0"></div>
  <div class="m-4 p-4 ">
    <div class="text-xl mx-2 font-semibold my-2">비밀번호 변경</div>
    <div class="border rounded-2xl p-4">
      <div class="w-48 my-2 m-auto">
        <input v-model="nowPassword"  class="border rounded-lg w-fit py-1 px-2 mb-2" type = "text" placeholder="현재 비밀번호">
        <input v-model="newPassword" class="border rounded-lg w-fit py-1 px-2 mb-2" type = "text" placeholder="변경 비밀번호">
        <div @click="updatePassword()" class="w-32 bg-slate-200 hover:bg-slate-300 m-auto text-center border rounded-lg py-0.5 mt-2">변경</div>
      </div>
    </div>
    
    
  </div>

</template>

<script>
import AuthService from '@/Service/AuthService';

export default {
  name: 'UpdatePassword',
  components: {
  },  
  data () {
    return {
      nowPassword:'',
      newPassword:''
    }
  },
  methods:{
    updatePassword() {
      let data = {
        newPassword:this.newPassword,
        nowPassword:this.nowPassword
      }
      AuthService.updatePassword(data).then(
        (res)=>{
          alert(res.data)
        }
      )
    }
  } 
}
</script>
