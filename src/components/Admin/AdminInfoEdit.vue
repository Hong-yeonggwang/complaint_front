<template>
  <v-form @submit.prevent>
      
      <div class="w-10/12 m-auto">
        <div class="mt-4 py-6 w-56 m-auto bg-slate-100 rounded-full">
          <svg-icon type="mdi" :path="face_path" class="m-auto" width="120" height="120"></svg-icon>
          <div class="text-center w-44 m-auto">
            <div>이름:{{this.memberInfo.name}}</div>
            <input type="text" class="w-28 text-center bg-white" v-model="this.updateUserInfo.nickName" placeholder="닉네임">
            <div class="clear-both"></div>
          </div>
        </div>
        <div class="m-auto w-2/3 bg-slate-100 rounded-xl py-3 px-8 mt-4 ">
          <div class="py-1.5">      
            <svg-icon type="mdi" :path="major_path" class="float-left mr-1.5" ></svg-icon>
            <div class="float-left">학과:</div>
            <input type="text" class="ml-3 w-32 text-center bg-white float-left" v-model="updateUserInfo.major" placeholder="학과">
            <div class="clear-both"></div>
          </div>

          <div class="py-1.5">      
            <svg-icon type="mdi" :path="brith_path" class="float-left mr-1.5" ></svg-icon>
            <div class="float-left">생년월일</div>
            <input type="date" class="ml-3 w-32 text-center bg-white float-left" v-model="updateUserInfo.birth" placeholder="생년월일">
            <div class="clear-both"></div>
          </div>

          <div class="py-1.5">      
            <svg-icon type="mdi" :path="phone_path" class="float-left mr-1.5" ></svg-icon>
            <div class="float-left">전화번호</div>
            <input type="text" class="ml-3 w-32 text-center bg-white float-left" v-model="updateUserInfo.phoneNumber" placeholder="전화번호">
            <div class="clear-both"></div>
          </div>
        </div>

        

      </div>
    <v-btn type="button" @click="this.updateUser" block class="mt-5 bg-slate-200">변경</v-btn>

  </v-form>

</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount,mdiBookshelf, mdiCake, mdiPhone } from '@mdi/js';




export default {
  name: 'AdminInfoEdit',
  components: {
    SvgIcon,
    },  
  data () {
    return {
      face_path: mdiAccount,
      major_path: mdiBookshelf,
      brith_path: mdiCake,
      phone_path: mdiPhone,
      tab: null,
      memberInfo:{
        name:"",
        nickName: '',
        major:'',
        birth:'',
        phoneNumber:'',
        role:''
      },

      updateUserInfo:{
        nickName: '',
        major:'',
        birth:'',
        phoneNumber:'',
      },

    }
  },
  created(){
    
  },
  methods:{
    
    updateUser(){
      
    }

  },
}

</script>
<style>
.Warning{
  color:red;
  opacity: 0.7;
  font-weight: 400;
}
.unVaild{
  margin-right:10px;
  background-color:rgb(255,0,0,0.3);
  color:white;
}
.unVaild.active{
  margin-right:0;
  background-color:white;
  color:black;
}
</style>
