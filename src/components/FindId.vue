<template>
  <div class="m-auto mt-16 mb-4 w-fit text-2xl">
  아이디 찾기
  </div>

  <form @submit.prevent="submitForm()">
    <div class="text-center ">
          <div class="my-2">가입할 때 기입하신 이메일을 입력하세요</div>
          <div>이메일로 가입된 아이디를 보내드릴게요!</div>
      </div>
    <div class="m-auto w-48">
      <div class="border rounded-md my-4">

        <div class="flex items-center"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="eamil_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="userEmail" name="usename" type="text" placeholder="이메일" class="w-40">
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
import { mdiEmailBox } from '@mdi/js';
import AuthService from '@/Service/AuthService';

export default {
  name: 'FindId',
  components: {
    SvgIcon,
  },  
  data () {
    return {
      eamil_path : mdiEmailBox,
      userEmail:'',
    }
  },
  methods:{
    submitForm() {
      AuthService.findId(this.userEmail).then(
        (res)=>{
          alert(res.data)
        }
      )
    }
  } 
}
</script>
