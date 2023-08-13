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
          <input type="text" placeholder="아이디"> 
        </div>
        <div class="clear-both"></div>
      </div>
    </div>

    <div class="border w-fit py-1 px-4 m-auto my-4 bg-slate-300 rounded-md">
      <button type="button" class="w-48">다음</button>
    </div>


    <div class="w-fit m-auto my-12">
      <div>가입하신 이메일로 보안문자 보냈습니다!</div>
      <div class="m-auto w-fit">
        <input type="text" placeholder="보안문자" class="text-center border rounded my-2">
      </div>
      <div class="w-fit m-auto">
        <button type="button" class="bg-slate-300 w-44 rounded">인증하기</button>
      </div>
    </div>


    <div class="w-fit m-auto">
      <div>
        <input type="text" placeholder="새로운 비밀번호" class="text-center border rounded">
      </div>
      <div>
        <input type="text" placeholder="비밀번호 확인" class="text-center border rounded my-2">
      </div>
      <div>
        <butto type="button" class="bg-slate-300 w-full rounded text-center">비밀번호 변경</butto>
      </div>
      
    </div>


</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountOutline,mdiLockOutline} from '@mdi/js';

export default {
  name: 'FindPassword',
  components: {
    SvgIcon,
  },  
  data () {
    return {
      face_path : mdiAccountOutline,
      password_path : mdiLockOutline,
    }
  },
  methods:{
    
  } 
}
</script>
