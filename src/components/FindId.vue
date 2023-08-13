<template>
  <div class="m-auto mt-16 mb-4 w-fit text-xl">
  아이디 찾기
  </div>

  <form @submit.prevent="submitForm()">
    <div class="m-auto w-48">


      <div class="border rounded-md my-4">
        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="face_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input name="usename" type="text" placeholder="이름" class="w-40">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="major_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input name="major" type="text" placeholder="학과" class="w-40">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="phone_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input name="phonenumber" type="number" placeholder="전화번호" class="w-40">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="birth_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input name="birth" type="date" placeholder="생년월일" class="w-36">
          </div>
          <div class="clear-both"></div>
        </div>

      </div>
    </div>

    <div class="w-48 m-auto border py-1 px-6 bg-slate-300 text-center rounded-lg">
          <button type="submit">아이디 찾기</button>
        </div>
  </form>

  <div>
    
  </div>

</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogin,mdiAccountOutline,mdiLockOutline,mdiBookshelf, mdiCake, mdiPhone,mdiAccountCowboyHatOutline } from '@mdi/js';

export default {
  name: 'FindId',
  components: {
    SvgIcon,
  },  
  data () {
    return {
      login_path: mdiLogin,
      face_path : mdiAccountOutline,
      password_path : mdiLockOutline,
      major_path: mdiBookshelf,
      birth_path: mdiCake,
      phone_path: mdiPhone,
      nickname_path:mdiAccountCowboyHatOutline,
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
