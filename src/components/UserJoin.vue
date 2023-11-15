<template>
  <div class="m-auto mt-16 mb-4 w-fit text-xl">
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
        <div :class="{'hidden': error.id,}" class="mb-2">-아이디는 영어와 숫자를 포함한 8글자입니다.</div>
        <div :class="{'hidden': error.password,}">-비밀번호는 영어와 숫자 특수문자를 포험한 9글자입니다.</div>
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
            <svg-icon type="mdi" :path="nickname_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.nickName" type="text" placeholder="닉네임" class="w-40" :class="{'unVaild':formData.nickName , 'active': error.nickName }">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center border-b"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="major_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.major" type="text" placeholder="학과" class="w-40" :class="{'unVaild':formData.major , 'active': error.major }">
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
            <svg-icon type="mdi" :path="birth_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.birth" type="date" placeholder="생년월일" class="w-36">
          </div>
          <div class="clear-both"></div>
        </div>

        <div class="flex items-center"> 
          <div class="float-left mx-1">
            <svg-icon type="mdi" :path="email_path" class="m-auto" height="30"></svg-icon>
          </div>
          <div class="float-left w-fit">
            <input v-model="formData.email" type="text" placeholder="이메일" class="w-36">
          </div>
          <div class="clear-both"></div>
        </div>
      </div>

      <div @click="checkDuplicatedEmail()" class="mt-2 mb-2 m-auto text-center w-32 border rounded-xl bg-sky-100">중복확인</div>

      <div class="text-sm">
        <div class="mt-1 m-auto text-center w-fit text-red-600" :class="{'hidden': emailDuplication,}">-이메일 중복확인을 해주세요.</div>
        <div class="mt-1 mb-2 m-auto text-center w-fit text-blue-600 hidden checkHidden" :class="{'active': emailDuplication,}">-중복확인이 완료되었습니다.</div>
      </div>

      <div class="text-sm pl-2 mt-2 mb-2 Warning">
        <div :class="{'hidden': error.phoneNumber,}">-01012341234형식으로 입력하세요</div>
        <div :class="{'hidden': error.name,}">-이름은 필수사항입니다.</div>
        <div :class="{'hidden': error.birth,}">-생년월일은 필수사항입니다.</div>
        <div :class="{'hidden': error.major,}">-학과는 필수사항입니다.</div>
        <div :class="{'hidden': error.nickName,}">-닉네임은 필수사항입니다.</div>
        <div :class="{'hidden': error.email,}">-잘못된 이메일 형식입니다.</div>
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
import { mdiLogin,mdiAccountOutline,mdiLockOutline,mdiBookshelf, mdiCake, mdiPhone,mdiAccountCowboyHatOutline,mdiEmailBox } from '@mdi/js';
import AuthService from '@/Service/AuthService';

export default {
  name: 'UserJoin',
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
      email_path:mdiEmailBox,
      formData:{
        id:'',
        password:'',
        name:'',
        nickName:'',
        major:'',
        phoneNumber:'',
        birth:'',
        email:'',
      },
      formValid:{
        id:false,
        password:false,
        name:false,
        nickName:false,
        major:false,
        phoneNumber:false,
        birth:false,
        email:false,
      },
      error:{
        id:true,
        password:true,
        name:true,
        nickName:true,
        phoneNumber:true,
        birth:true,
        major:true,
        email:true,
      },
      duplication:false,

      idDuplication:false,
      emailDuplication:false,
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

    'formData.major': function() {
      if(this.formData.major){
        this.error.major = true;
        this.formValid.major = true;
      }else{
        this.error.major = false;
        this.formValid.major = false;
      }
    },

    'formData.email': function() {
      this.checkEmail();
    },
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
      if(!this.emailDuplication){
        alert("이메일 중복확인을 해주세요")
        return 0;
      }
      if(!this.duplication){
        AuthService.join(this.formData).then(()=>{
          alert("회원가입을 축하합니다.")
          this.duplication = true
          this.$router.push('/login')

        })
        .catch((err)=>{
          console.log(err)
            alert("오류가 발생했습니다. 다시 시도해주세요")
        });  
      }
      
  
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
        // console.log(this.formData.password);
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

    checkEmail(){
      const validateㄷEmail =  /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

      if (!validateㄷEmail.test(this.formData.email) || !this.formData.email) {
        this.formValid.email = false
        this.error.email = false
        return
      } 
        this.formValid.email = true
        this.error.email = true
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

      checkDuplicatedEmail(){
          if(this.formValid.email == false){
            alert("잘못된 이메일 형식입니다")
            return 0;
          }
          let data = {
            email: this.formData.email
          }
          AuthService.checkEmail(data).then(
            (res)=>{
              let checkValue = res.data
              if(checkValue){
                this.emailDuplication = checkValue;
                alert("사용가능한 이메일입니다.");
              }
              else{
                this.emailDuplication = checkValue;
                alert("중복된 이메일입니다.");
              }
            }
          )
      },

      isFormValid(){
        for (let key in this.formValid) {
          if (this.formValid[key] === false) {
            return false; // 하나라도 false가 있으면 false 반환
          }
        }
        return true; // 모든 속성이 true인 경우 true 반환
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
.checkHidden.active{
  display: block
}
</style>
