<template>
  <NavigationBarOperator class="float-left"></NavigationBarOperator>
  <div class="ml-14 customWidth float-left">

    <div class="w-full bg-slate-900 text-white">
      <div class="text-3xl pt-4 mx-4">티켓 수거 현황</div>
      <div class="pb-1 m-2">
        <div class=" justify-between px-2 border-b mb-3 ">
          <!-- <div>발행: 400장</div>
          <div>수거된 티켓: 100장</div>
          <div>수거 가능한 티켓: 300장</div> -->
        </div>
      </div>
    </div>

    <div class="mx-4 p-3 ">
      <div class="w-full border-b">
        <svg-icon type="mdi" :path="ticket_path" class="m-auto mr-1 float-left" width="40" height="40"></svg-icon>
        <div class=" p-2 pl-0 text-xl font-semibold float-left">날짜별 티켓 수거 현황</div>
        <div class="clear-both"></div>
      </div>
      <div class="border rounded-lg mt-5 m-2 max-h-96 overflow-auto">
        <div v-for="(item,index) in qrcodeCount" :key="index" class="flex items-center justify-between px-2 border-b mx-4 my-5 ">
          <div>{{item.time}}</div>
          <div>{{item.count}}장</div>
        </div>
      </div>
    </div>

    <!-- <div class="mx-4 p-3 ">
      <div class="w-full border-b flex items-center">
        <svg-icon type="mdi" :path="search_path" class="ml-1" width="40" height="40"></svg-icon>
        <div class=" p-2 pl-0 mr-2 text-xl font-semibold ">날짜 검색</div>
        <input type="date" class="w-32 border rounded-lg p-3">
        <div class="clear-both"></div>
      </div>
      
      <div class="border rounded-lg mt-5 m-2 max-h-96 overflow-auto">
        <div  class="flex items-center justify-between px-2 border-b mx-4 my-5 ">
          <div>2023년 10월 5일</div>
          <div>40장</div>
        </div>
      </div>
    </div> -->

  </div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTicket,mdiMagnify } from '@mdi/js';
import NavigationBarOperator from './NavigationBarOperator.vue'
import AdminService from '@/Service/AdminService';




export default {
  name: 'OperatorStatus',
  components: {
    SvgIcon,
    NavigationBarOperator
    },  
  data () {
    return {
      ticket_path: mdiTicket,
      search_path:mdiMagnify,
      tab: null,
      couponSerial:'',
      myMenu:[
        {title:'티켓 수거 현황', value:'status',info:'티켓 수거 현황을 확인합니다'},
      ],

      qrcodeCount:[],

    }
  },
  created(){
    AdminService.getOperatorQrcode().then(
      (res)=>{
        this.qrcodeCount = res.data
      }
    )

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