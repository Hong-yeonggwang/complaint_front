<template>
  <NavigationBar2 class="float-left"></NavigationBar2>
  <div class="ml-14 customWidth float-left">
  <!-- 메뉴바  -->
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="black"
      class="overflow-x-auto"
    >
      <v-tab v-for="(menu,index) in  myMenu" :key="index" v-bind:value="menu.value">{{menu.title}}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="(menu,index) in myMenu" :key="index" class="h-12 flex items-center" v-bind:value="menu.value">
          {{ menu.info }}
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>

  <div v-if="this.tab == 'myInfo'">
    <div class="w-10/12 m-auto">
      <div class="mt-4 py-6 w-56 m-auto bg-slate-100 rounded-full">
        <svg-icon type="mdi" :path="face_path" class="m-auto" width="120" height="120"></svg-icon>
        <div class="text-center w-44 m-auto">
          <div>이름:{{this.memberInfo.name}}</div>
          <div>닉네임:{{this.memberInfo.nickName}}</div>
        </div>
      </div>
      <div class="w-fit m-auto bg-slate-100 rounded-xl py-3 px-10 mt-4 ">
        <div class="py-1.5">      
          <svg-icon type="mdi" :path="major_path" class="float-left mr-1.5" ></svg-icon>
          <div class="float-left">학과:{{this.memberInfo.major}}</div>
          <div class="clear-both"></div>
        </div>

        <div class="py-1.5">      
          <svg-icon type="mdi" :path="brith_path" class="float-left mr-1.5" ></svg-icon>
          <div class="float-left">생년월일:{{this.memberInfo.birth}}</div>
          <div class="clear-both"></div>
        </div>

        <div class="py-1.5">      
          <svg-icon type="mdi" :path="phone_path" class="float-left mr-1.5" ></svg-icon>
          <div class="float-left">전화번호:{{this.memberInfo.phoneNumber}}</div>
          <div class="clear-both"></div>
        </div>
      </div>

      

    </div>
    
  </div>

  <div v-if="this.tab == 'QRwallet'">

    <div class="w-10/12 m-auto bg-slate-50 rounded-xl border-slate-950 border my-4 overflow-auto h-48">
     <div class="px-4 py-4">
        <div class="flex items-center justify-between border-b">
          <div class="text-xl">승차권</div>
          <div class="mr-3"> 잔여 티켓 수: {{ this.qrcodeData.bus.length }}</div>
        </div>
        

        <div class="m-auto" v-for="(tiket, index) in  qrcodeData.bus" :key="index">
          <div class="my-4 border border-slate-500 rounded-xl">
            <div class="text-center px-2 py-2 flex items-center justify-between">
              <div>
                <div class="ml-2 my-1.5">상세:{{tiket.content}}</div>
              </div>
              <div>
                <div class="bg-black rounded-xl text-center ml-3 px-2 py-1"  @click = "openQrcode(index,'bus')" v-bind:value="tiket.vlaue">QRCode보기</div>
                <div class="absolute top-0 left-0 h-full w-full qrbackground " :class="{'active': tiket.display}" >
                  <div class="qrcodeClose" @click = "closeQrcode(index,'bus')">닫기</div>
                  <qrcode-vue class="relative m-auto top-1/4" v-bind:value="tiket.vlaue" :size="300" level="H" />
                </div>

              </div>
            </div>
          </div>
        </div>

        <div v-if="qrcodeData.bus.length == 0" class="m-auto w-fit flex items-center mt-12 text-2xl">승차권 없음</div> 

     </div>
    </div>


    <div class="w-10/12 m-auto bg-slate-50 rounded-xl border-slate-950 border my-4 overflow-auto h-48">
     <div class="px-4 py-4">
        <div class="flex items-center justify-between border-b">
          <div class="text-xl ">식권</div>
          <div class="mr-3"> 잔여 티켓 수: {{ this.qrcodeData.restaurant.length }}</div>
        </div>

        <div class="m-auto" v-for="(tiket, index) in  qrcodeData.restaurant" :key="index">
          <div class="my-4 border border-slate-500 rounded-xl">
            <div class="text-center px-2 py-2 flex items-center justify-between">
              <div>
                <div class="ml-2 my-1.5">상세:{{ tiket.content }}</div>
              </div>
              <div>
                <div class="bg-black rounded-xl text-center ml-3 px-2 py-1"  @click = "openQrcode(index,'a')" v-bind:value="tiket.vlaue">QRCode보기</div>
                <div class="absolute top-0 left-0 h-full w-full qrbackground " :class="{'active': tiket.display}" >
                  <div class="qrcodeClose" @click = "closeQrcode(index,'a')">닫기</div>
                  <qrcode-vue class="relative m-auto top-1/4" v-bind:value="tiket.vlaue" :size="300" level="H" />
                </div>

              </div>
            </div>
          </div>
        </div>

        <div v-if="qrcodeData.restaurant.length == 0" class="m-auto w-fit flex items-center mt-12 text-2xl">식권 없음</div> 
     </div>

    </div>

    <div @click="$router.push({name:'qrcodeLog'})" class="w-10/12 m-auto bg-slate-50 rounded-xl border my-8 text-center py-2 font-semibold text-xl">
      사용 이력 확인하기
    </div>


    

  </div>
  
  <div v-if="this.tab == 'updateInfo'">
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
  <UpdatePassword></UpdatePassword>
  </div>
  
  <div v-if="this.tab == 'coupon'">
    <form>

      <div class="w-10/12 bg-slate-100 m-auto my-6 px-4 py-6 rounded-lg">
        <div class="m-auto w-fit">
          <div class="mb-3 text-2xl">쿠폰등록하기</div>
          <div class="flex items-center">
            <input v-model="this.couponSerial" class="w-40 float-left border bg-slate-200 rounded-md mr-3" type="text" placeholder="쿠폰번호를 입력하세요." maxlength="10">
            <button @click="this.useCoupon()" type="button" class="float-left px-2 bg-slate-300 rounded-md">등록</button>
            <div class="clear-both"></div>
          </div>
          <div class="my-2 text-sm">숫자와 영어로이루어진 10글자를 입력하세요.</div>
        </div>

        </div>
        
      
    </form>
    
  
  </div>
  
</div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount,mdiBookshelf, mdiCake, mdiPhone } from '@mdi/js';
import UserService from '../Service/UserService';
import NavigationBar2 from './NavigationBar2.vue'



// qrcode
import QrcodeVue from 'qrcode.vue'
import UpdatePassword from './UpdatePassword.vue'

export default {
  name: 'MyPage',
  components: {
    SvgIcon,
    QrcodeVue,
    NavigationBar2,
    UpdatePassword
    },  
  data () {
    return {
      face_path: mdiAccount,
      major_path: mdiBookshelf,
      brith_path: mdiCake,
      phone_path: mdiPhone,
      tab: null,
      couponSerial:'',
      myMenu:[
        {title:'내정보', value:'myInfo',info:'정보를 확인합니다', component:'myInfo'},
        {title:'QR지갑', value:'QRwallet',info:'구매한 QR쿠폰을 확인합니다', component:'QR'},
        {title:'정보수정', value:'updateInfo',info:'정보를 업데이트합니다.', component:'updateInfo'},
        {title:'쿠폰등록', value:'coupon',info:'쿠폰을 등록합니다',component:'couponRegistration'}, 
      ],
      memberInfo:{
        name:'',
        nickName: '',
        major:'',
        birth:'',
        phoneNumber:'',
        role:''
      },

      updateUserInfo:{
        nickName:null,
        major:null,
        birth:'',
        phoneNumber:'',
      },

      //qrcode
      qrcodeData:{
        bus:[],
        restaurant: []
      }

    }
  },
  created(){
    UserService.getUserInfo().then(
      (res)=>{
        this.memberInfo = res.data
      },
      (error)=>{
        console.log(error);
      }
    )

    UserService.getQRcodeList().then(
      (res)=>{
        res.data.forEach((qrcode) => {
          let pushData = {
            content:qrcode.category.name,
            vlaue:qrcode.qrCode,
            display: false
          };
          if (qrcode.category.qrcodeUsingPlace.name == "버스") {
            this.qrcodeData.bus.push(pushData);
          } else if (qrcode.category.qrcodeUsingPlace.name == "식당") {
            this.qrcodeData.restaurant.push(pushData);
          }
        }); 
      },
      (error)=>{
        console.log(error);
      }
    )
  },
  methods:{
    openQrcode(index , flag){
      if(flag === "bus"){
        this.qrcodeData.bus[index].display = true;
      }
      else{
        this.qrcodeData.restaurant[index].display = true;
      }
    },
    closeQrcode(index , flag){
      if(flag === "bus"){
        this.qrcodeData.bus[index].display = false;
      }
      else{
        this.qrcodeData.restaurant[index].display = false;
      }
    },
    useCoupon(){
      UserService.useCoupon(this.couponSerial).then(
      (res)=>{
        alert(res.data.msg)
        this.couponSerial = ''
      },
      (error)=>{
        alert(error.msg);
      }
    )
    },
    updateUser(){
      UserService.updateUserInfo(this.updateUserInfo).then(
      ()=>{
        alert("정상적으로 변경했습니다!")
        location.reload();
      },
      (error)=>{
        let data = error.response.data.errors
        const errorMessagesArray = data.map(error => error.defaultMessage);
        const errorMessageString = errorMessagesArray.join('\n');
        alert(errorMessageString);
      }
    )
    },

  },
}

</script>
<style>
.qrbackground{
  background-color : rgb(128,128,128,0.9);
  display: none;
}
.qrbackground.active{
  background-color : rgb(128,128,128,0.9);
  display: block;
}
.qrcodeClose{
  position: relative;
  margin:auto;
  top:15%;
  width:300px;
  height:25px;
  text-align: center;
  background-color: black;
  color:white;
}
.customWidth{
  width: calc(100% - 3.5rem);
}
</style>