<template>
  <div class="m-auto mt-16 mb-4 w-fit text-xl">
    로그인
  </div>

  <form @submit.prevent="submitForm()">
    <div class="mb-2 m-auto w-fit flex items-center pb-2 border-b">
      <div class="w-fit float-left">
        <div class="mb-2">
          <input name="id" type="text" maxlength="10" class="border rounded float-left pl-1" placeholder="아이디">  
          <div class="clear-both"></div>
        </div>
        <div class="">
            <input name="password" type="password" maxlength="10" class="border rounded float-left pl-1" placeholder="비밀번호">  
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
    <div class="float-left mr-2">회원가입</div>
    <div class="float-left mr-2">아이디 찾기</div>
    <div class="float-left mr-2">비밀번호 찾기</div>
    <div class="clear-both"></div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogin } from '@mdi/js';

export default {
  name: 'UserLogin',
  components: {
    SvgIcon,
  },  
  data () {
    return {
      login_path: mdiLogin,
    }
  },
  methods:{
    submitForm() {
      // 여기에서 폼 제출 관련 작업을 처리합니다.
      console.log('폼이 제출되었습니다.');
      console.log('사용자 이름:', this.username);
      console.log('비밀번호:', this.password);

      // 폼 제출 후 데이터 초기화
      this.username = '';
      this.password = '';
    }
  } 
}
</script>
