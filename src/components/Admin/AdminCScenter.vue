<template>
  <h1>AdminCScenter</h1>
  <NavigationBarAdmin class="float-left"></NavigationBarAdmin>
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
    <svg-icon type="mdi" :path="face_path" class="m-auto" width="120" height="120"></svg-icon>

    
  </div>

  <div v-if="this.tab == 'QRwallet'" class="overflow-scroll">

    

  </div>
  

  
</div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount,mdiBookshelf, mdiCake, mdiPhone } from '@mdi/js';
import UserService from '../../Service/UserService';
import NavigationBarAdmin from './NavigationBarAdmin.vue'


export default {
  name: 'AdminCScenter',
  components: {
    SvgIcon,
    NavigationBarAdmin
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
        {title:'고객요청', value:'myInfo',info:'새로운 고객 요청을 확인합니다.', component:'myInfo'},
        {title:'완료된 요청 ', value:'QRwallet',info:'이전 요청을 확인할 수 있습니다.', component:'QR'},
      ],
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
        console.log(res.data);
        res.data.forEach((qrcode) => {
          var pushData = {
            content:qrcode.category.name,
            vlaue:qrcode.qrCode,
            display: false
          };
          if (qrcode.category.qrCodeCategory == "버스") {
            this.qrcodeData.bus.push(pushData);
          } else if (qrcode.category.qrCodeCategory == "식당") {
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
      (res)=>{
        console.log(res.data)
      },
      (error)=>{
        console.log(error);
      }
    )
    }

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