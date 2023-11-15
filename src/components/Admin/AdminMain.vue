<template>
  <NavigationBarAdmin class="float-left"></NavigationBarAdmin>
  <div class="ml-14 customWidth float-left">
    <div class="w-full h-20 bg-slate-900 flex items-center">
      <div>
        <div class="text-3xl text-white mx-4">관리자 페이지</div>
        <div class="text-sm text-white mx-6"> 오늘도 행복한 하루되세요.</div>  
      </div>
      
    </div>
    <!-- 로그인 관리자 정보 -->
    <div class="h-28 w-11/12 m-auto flex my-6 border rounded-lg items-center">
      <div class="float-left p-2">
        <img  :src="require(`@/assets/complaint.png`)" class="ml-4 border rounded-full w-20" >
      </div>


      <div class="float-left ml-4 flex flex-col justify-center">
        <div class="my-0.5">
          <span class="float-left text-slate-500">이름:</span>
          <span class="ml-1">{{adminInfo.name}}</span>
          <div class="clear-both"></div>
        </div>
        <div class="my-0.5">
          <span class="float-left text-slate-500">등급:</span>
          <span class="ml-1">{{adminInfo.role}}</span>
          <div class="clear-both"></div>
        </div>
        <div class="my-0.5">
          <span class="float-left text-slate-500">연락처:</span>
          <span class="ml-1">{{adminInfo.phoneNumber}}</span>
          <div class="clear-both"></div>
        </div>
      </div>
      
      <div class="clear-both"></div>
    </div>
    
    <!-- 알림 -->
    <div class="overflow-y-auto max-h-80 w-11/12 m-auto my-6 border rounded-lg px-4">
      <div class="w-full text-lg my-2 border-b px-2">알림</div>
      <div>
        <div v-for="(item,index) in noti" :key="index" class="ml-2 my-2">
          -{{item.write}}님이 문의글을 남겼어요!
          <div class="h-0.5 w-full bg-slate-300"></div>
        </div>
        
      </div>
    </div>

  </div>
</template>

<script>
import UserService from '../../Service/UserService';
import BoardService from '@/Service/BoardService';
import NavigationBarAdmin from './NavigationBarAdmin.vue'


export default {
  name: 'AdminMain',
  components: {
    NavigationBarAdmin,
    },  
  data () {
    return {
      myMenu:[
        {title:'운영자 정보', value:'myInfo',info:'정보를 확인합니다', component:'myInfo'},
        {title:'운영자 관리 ', value:'QRwallet',info:'구매한 QR쿠폰을 확인합니다', component:'QR'},
        {title:'운영자 정보', value:'updateInfo',info:'정보를 업데이트합니다.', component:'updateInfo'},
        {title:'쿠폰등록', value:'coupon',info:'쿠폰을 등록합니다',component:'couponRegistration'}, 
      ],
      adminInfo:{
        name:'',
        phoneNumber:'',
        role:'최고 관리자'
      },
      noti:[],

    }
  },
  created(){

    UserService.getUserInfo().then(
      (res)=>{
        this.adminInfo.name = res.data.name
        this.adminInfo.phoneNumber = res.data.phoneNumber
      },
      (error)=>{
        console.log(error);
      }
    )

    BoardService.getAllPost().then(
      (res)=>{
        this.noti = res.data.no
      }
    )
    

  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/getUserId'];
    }
  },
  methods:{

  },
}

</script>
<style scoped>


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