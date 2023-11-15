<template>
  <div class="m-auto mt-4 mb-4 w-fit text-xl">
  회원가입
  </div>

  <form @submit.prevent="submitForm()">
    <div class="m-auto w-48">
      <div class="border rounded-md mb-1">

        <div class="flex items-center"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="face_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.id" type="text" placeholder="아이디" class="w-36" :class="{'unVaild':formData.id , 'active': error.id }" maxlength="16">
          </div>
          <div class="clear-both"></div>
        </div>
        </div>
        <div @click="checkDuplicatedID()" class="mt-2 mb-2 m-auto text-center w-32 border rounded-xl bg-sky-100">중복확인</div>
        <div class="text-sm">
        <div class="mt-1 m-auto text-center w-fit text-red-600" :class="{'hidden': idDuplication,}">-아이디 중복확인을 해주세요.</div>
        <div class="mt-1 mb-2 m-auto text-center w-fit text-blue-600 hidden checkHidden" :class="{'active': idDuplication,}">-중복확인이 완료되었습니다.</div>
        </div>


        <div class="border rounded-md">

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
              <option v-for="(item, index) in operatorPlace" :key="index" :value="item">{{item}}</option>
            </select>
          </div>
          <div class="clear-both"></div>
        </div>

      </div>

      <div class="text-sm pl-2 mt-2 mb-2 Warning">
        <div :class="{'hidden': error.phoneNumber,}">-01012341234형식으로 입력하세요</div>
        <div :class="{'hidden': error.name,}">-이름은 필수사항입니다.</div>
        <div :class="{'hidden': formValid.role,}">-권한은 필수사항입니다.</div>
        <div :class="{'hidden': formValid.type,}">-사용장소는 필수사항입니다.</div>
        <div :class="{'hidden': formValid.place,}">-카테고리는 필수사항입니다.</div>
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
import AuthService from '@/Service/AuthService';

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
        role:'',
        type:'',
        place:''
      },
      formValid:{
        id:false,
        password:false,
        name:false,
        phoneNumber:false,
        role:false,
        type:false,
        place:false
      },
      error:{
        id:true,
        password:true,
        name:true,
        phoneNumber:true,
        level:true,
        place:true,
        category:true
      },
      operatorType:[],
      operatorPlace:[],

      idDuplication:false,
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
    'formData.role': function() {
      if(this.formData.role){
        this.formValid.role = true;
      }else{
        this.formValid.role = false;
      }
    },
    'formData.type':function(){
        this.operatorPlace = this.formData.type.category.map(item => item.name)        
      if(this.formData.type){
      this.formValid.type = true;
      }else{
        this.formValid.type = false;
      }
    },
    'formData.place': function() {
      if(this.formData.place){
        this.formValid.place = true;
      }else{
        this.formValid.place = false;
      }
    },
    
  },
  created(){
    AdminService.serviceStatus().then(
      (res) =>{

        const apiResult = res.data.categoryInfo;
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
          this.operatorPlace = categorySort.map(item => item.category.map(item => item.name)) 

          this.operatorType = categorySort;
      }
    )
  },
  methods:{
    submitForm() {
      if(!this.isFormValid()){
        alert("양식을 모두 작성해주세요.")
        return
      }

      if(!this.idDuplication){
        alert("아이디 중복확인을 해주세요")
        return 0;
      }
      AdminService.signAdmin(this.formData).then(
        ()=>{    
          alert("생성이 완료되었습니다.");
        },
        ()=>{
          alert("잘못된 접근입니다.");
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
        this.formValid.phoneNumber = true
        this.error.phoneNumber = true
    },

    isFormValid(){
        for (let key in this.formValid) {
          if (this.formValid[key] === false) {
            return false; // 하나라도 false가 있으면 false 반환
          }
        }
        return true; // 모든 속성이 true인 경우 true 반환
      },

      checkDuplicatedID(){
      if(this.formData.id == '' || this.formData.id == null){
        alert("아이디를 입력하세요.")
        return 0;
      }
      if(!this.formValid.id){
        alert("형식에 맞지 않는 아이디입니다.")
        return 0;
      }

      let data = {
        id:this.formData.id,
      }
      
      AuthService.checkId(data).then(
          (res)=>{
            console.log(res)
            let checkValue = res.data
            if(checkValue){
              this.idDuplication = checkValue;
              alert("사용가능한 아이디입니다.");
            }
            else{
              this.idDuplication = checkValue;
              alert("중복된 아이디입니다.");
            }
          }
        )

      },

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
