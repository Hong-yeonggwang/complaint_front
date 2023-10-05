<template>
  <h1>OperatorManagement</h1>
  <NavigationBarOperator class="float-left"></NavigationBarOperator>
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

  <div v-if="this.tab == 'status'">
    <svg-icon type="mdi" :path="face_path" class="m-auto" width="10" height="10"></svg-icon>
    <div>관리자 현황</div>
    <div>운영자 현황</div>

  </div>

  <div v-if="this.tab == 'management'">
    <div>계정 생성</div>
    <div>계정 수정</div>
  </div>
  
  <div v-if="this.tab == 'info'">
    <div>관리자 삭제</div>
  </div>
  
</div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount,mdiBookshelf, mdiCake, mdiPhone } from '@mdi/js';
import NavigationBarOperator from './NavigationBarOperator.vue'



export default {
  name: 'OperatorStatus',
  components: {
    SvgIcon,
    NavigationBarOperator
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
        {title:'운영자 현황', value:'status',info:'정보를 확인합니다', component:'myInfo'},
        {title:'운영자 관리 ', value:'management',info:'구매한 QR쿠폰을 확인합니다', component:'QR'},
        {title:'운영자 정보', value:'info',info:'정보를 업데이트합니다.', component:'updateInfo'},
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
    

  },
  methods:{

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