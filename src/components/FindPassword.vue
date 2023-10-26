<template>
  <div class="m-auto mt-16 mb-4 w-fit text-xl">
  비밀번호 찾기
  </div>
  <div class="w-fit m-auto mb-4 text-sm">
    찾고자하는 비밀번호의 아이디를 입력해주세요.
  </div>
    <div>
      <div class="w-fit m-auto border flex items-center">
        <div class="float-left">
          <svg-icon type="mdi" :path="face_path" class="m-auto" height="40" width="30"></svg-icon>
        </div>
        <div class="float-left w-48">
          <input v-model="userId" class="w-full" type="text" placeholder="아이디"> 
        </div>
        <div class="clear-both"></div>
      </div>
    </div>

    <div class="border w-fit py-1 px-4 m-auto my-4 bg-sky-200 rounded-md">
      <button type="button" class="w-48" @click="sendCode(this.userId)">다음</button>
    </div>


    <div class="w-fit m-auto my-12" :class="{'hidden': this.codeInputFlag}">
      <div>가입하신 이메일로 보안문자 보냈습니다!</div>
      <div class="m-auto w-fit">
        <input v-model="userCode" type="text" placeholder="보안문자" class="text-center border rounded my-2">
      </div>
      <div class="w-fit m-auto">
        <button @click="sendPassword()" type="button" class="bg-sky-200 w-44 border rounded">인증하기</button>
      </div>
    </div>

</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountOutline,mdiLockOutline} from '@mdi/js';
import AuthService from '@/Service/AuthService';

export default {
  name: 'FindPassword',
  components: {
    SvgIcon,
  },  
  data () {
    return {
      face_path : mdiAccountOutline,
      password_path : mdiLockOutline,

      codeSendDefend:true,

      codeInputFlag: true,

      userId:'',
      userCode:'',
    }
  },
  methods:{
    async sendCode(userId){
      if(this.codeSendDefend){
        await AuthService.sendPasswordCode(userId).then(
        (res)=>{
          alert(res.data)
          this.codeInputFlag = false
          this.codeSendDefend = false
        }
      )
        
      }
    },
    async sendPassword(){
      let data = {
        id:this.userId,
        code:this.userCode
      }
      await AuthService.sendTempPassword(data).then(
        (res)=>{
          alert(res.data)
        }
      )
    }
    
  } 
}
</script>
