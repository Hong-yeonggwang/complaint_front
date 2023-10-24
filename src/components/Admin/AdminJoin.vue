<template>
  <div class="m-auto mt-4 mb-4 w-fit text-xl">
  회원가입
  </div>

  <form @submit.prevent="submitForm()">
    <div class="m-auto w-48">
      <div class="border rounded-md">

        <div class="flex items-center border-b "> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="face_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.id" type="text" placeholder="아이디" class="w-36" :class="{'unVaild':formData.id , 'active': error.id }" maxlength="16">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="password_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.password" type="password" placeholder="비밀번호" class="w-40" :class="{'unVaild':formData.password, 'active': error.password }" maxlength="16">
          </div>
          <div class="clear-both"></div>
        </div>
      </div>

      <div class="text-sm pl-2 mt-2 Warning">
        <div :class="{'hidden': error.id,}">-잘못된 아이디입니다</div>
        <div :class="{'hidden': error.password,}">-잘못된 비밀번호입니다.</div>
      </div>


      <div class="border rounded-md mt-4">
        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="face_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.name" type="text" placeholder="이름" class="w-40" :class="{'unVaild':formData.name , 'active': error.name }">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="phone_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.phoneNumber" type="text" placeholder="전화번호" class="w-40" :class="{'unVaild':formData.phoneNumber , 'active': error.phoneNumber }">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="level" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <select class="w-36 bg-slate-100" v-model="formData.role" :class="{'unVaild':formData.phoneNumber , 'active': error.phoneNumber }">
              <option value="ROLE_ADMIN">관리자</option>
              <option value="ROLE_OPERATOR">운영자</option>
            </select>
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="type" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <select class="w-36 bg-slate-100" v-model="formData.type" :class="{'unVaild':formData.phoneNumber , 'active': error.phoneNumber }">
              <option v-for="(item, index) in operatorType" :key="index" :value="item">{{ item.type}}</option>
            </select>
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="place" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <select class="w-36 bg-slate-100" v-model="formData.place" :class="{'unVaild':formData.phoneNumber , 'active': error.phoneNumber }">
              <option v-for="(item, index) in operatorPlace" :key="index" :value="item">{{ item}}</option>
            </select>
          </div>
          <div class="clear-both"></div>
        </div>

      </div>

      <div class="text-sm pl-2 mt-2 mb-2 Warning">
        <div :class="{'hidden': error.phoneNumber,}">-01012341234형식으로 입력하세요</div>
        <div :class="{'hidden': error.name,}">-이름은 필수사항입니다.</div>
      </div>

    </div>
    
    <div class="w-fit m-auto border py-1 px-6  text-lg rounded-lg">
          <button type="submit"> 
            회원가입
          </button>
        </div>
  </form>

</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogin,mdiAccountOutline,mdiLockOutline,mdiPhone,mdiMapMarker,mdiFormatListBulletedType,mdiShieldCrown } from '@mdi/js';
import AdminService from '@/Service/AdminService';

export default {
  name: 'AdminJoin',
  components: {
    SvgIcon,
  },  
  data () {
    return {
      login_path: mdiLogin,
      face_path : mdiAccountOutline,
      password_path : mdiLockOutline,
      phone_path: mdiPhone,
      place: mdiMapMarker,
      type: mdiFormatListBulletedType,
      level:mdiShieldCrown,
      formData:{
        id:'',
        password:'',
        name:'',
        phoneNumber:'',
        place:'장소',
        role:'등급선택'
      },
      formValid:{
        id:false,
        password:false,
        name:false,
        nickName:false,
        major:false,
        phoneNumber:false,
        birth:false,
      },
      error:{
        id:true,
        password:true,
        name:true,
        nickName:true,
        phoneNumber:true,
        birth:true,
      },
      operatorType:[],
      operatorPlace:[],
    }
  },
  watch: {
    'formData.id': function() {
      this.checkID()
    },
    'formData.password': function() {
      this.checkPassword()
    },
    'formData.phoneNumber': function() {
      this.checkphoneNumber()
    },
    'formData.name': function() {
      if(this.formData.name){
        this.error.name = true;
        this.formValid.name = true;
      }else{
        this.error.name = false;
        this.formValid.name = false;
      }
    },
    'formData.nickName': function() {
      if(this.formData.nickName){
        this.error.nickName = true;
        this.formValid.nickName = true;
      }else{
        this.error.nickName = false;
        this.formValid.nickName = false;
      }
    },
    'formData.birth': function() {
      if(this.formData.birth){
        this.error.birth = true;
        this.formValid.birth = true;
      }else{
        this.error.birth = false;
        this.formValid.birth = false;
      }
    },
    'formData.type':function(){
        this.operatorPlace = this.formData.type.category.map(item => item.name)        
    }
  },
  created(){
    AdminService.getCategory().then(
      (res) =>{
        console.log(res)

        const apiResult = res.data;
        const categorySortMap = new Map();

          apiResult.forEach((items) => {
            const typeName = items.qrcodeUsingPlace.name;
            if (!categorySortMap.has(typeName)) {
              categorySortMap.set(typeName, {
                type: typeName,
                display: false,
                category: [],
              });
            }

            const temp = { name: items.name };
            categorySortMap.get(typeName).category.push(temp);
          });

          const categorySort = Array.from(categorySortMap.values());

          this.operatorType = categorySort.map(item => item.type)
          console.log(categorySort)
          this.operatorPlace = categorySort.map(item => item.category.map(item => item.name)) 
          console.log(this.operatorPlace)

          this.operatorType = categorySort;
      }
    )
  },
  methods:{
    submitForm() {
      AdminService.signAdmin(this.formData).then(
        (res)=>{
          console.log(res)
        }
      )
    },
    checkID() {
      const validateId = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/

      if (!validateId.test(this.formData.id) || !this.formData.id) {
        this.formValid.id = false
        this.error.id = false
        return
      } this.formValid.id = true
        this.error.id = true
    },
    checkPassword(){
      const validatePassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/

      if (!validatePassword.test(this.formData.password) || !this.formData.password) {
        this.formValid.password = false
        this.error.password = false
        return
      } 
        console.log(this.formData.password);
        this.formValid.password = true
        this.error.password = true
    },
    checkphoneNumber(){
      const validatePhoneNumber = /^(010|01[1-9])\d{3,4}\d{4}$/

      if (!validatePhoneNumber.test(this.formData.phoneNumber) || !this.formData.phoneNumber) {
        this.formValid.phoneNumber = false
        this.error.phoneNumber = false
        return
      } 
        console.log(this.formData.password);
        this.formValid.phoneNumber = true
        this.error.phoneNumber = true
    }
  } 
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
