<template>
  <div class="m-auto mt-16 mb-4 w-fit text-xl">
    로그인
  </div>

  <form @submit.prevent="submitForm"> 
    <div class="mb-2 m-auto w-fit flex items-center pb-2 border-b">
      <div class="w-fit float-left">
        <div class="mb-2">
          <input v-model="formData.id" type="text" maxlength="10" class="border rounded float-left pl-1" placeholder="아이디">  
          <div class="clear-both"></div>
        </div>
        <div class="">
            <input v-model="formData.password" type="password" maxlength="10" class="border rounded float-left pl-1" placeholder="비밀번호">  
          <div class="clear-both"></div>
        </div>
      </div>
      <div class="float-left">
        <button type="submit">
          <svg-icon type="mdi" :path="login_path" class="m-auto" width="70" height="70"></svg-icon>
        </button>
      </div>
      <div class="clear-both"></div>
    </div>
  </form>
    
  <div class="text-sm w-fit m-auto">
    <div class="float-left mr-2" @click = "this.join">회원가입</div>
    <div class="float-left mr-2" @click = "this.findId">아이디 찾기</div>
    <div class="float-left mr-2" @click = "this.findPwd">비밀번호 찾기</div>
    <div class="clear-both"></div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogin } from '@mdi/js';
// import UserService from '../Service/UserService';

export default {
  name: 'UserLogin',
  components: {
    SvgIcon,
  },  
  data () {
    return {
      login_path: mdiLogin,
      formData: {
        id: '',
        password: '',
      },
    }
  },
  methods:{
    submitForm(){
      this.$store.dispatch("auth/login", this.formData).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          console.log(error)
        }
      );
    },
    findPwd(){
      this.$router.push("/findpassword");
    },
    findId(){
      this.$router.push("/findid");
    },
    join(){
      this.$router.push("/join");
    },
  } 
}
</script>
