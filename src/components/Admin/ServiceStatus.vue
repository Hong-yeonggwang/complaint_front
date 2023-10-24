<template>
  <h1>serviceStatus</h1>
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

  <div v-if="this.tab == 'status'">
    <div class=" m-4 rounded border bg-sky-200">
      <div class="m-3 my-5">
        <div class="border border-b-0 rounded-t-xl bg-sky-100 pl-3 py-1.5">서비스 현황</div>
        <div class="border border-t-0 bg-sky-50 px-3 py-1 flex justify-between">
          <div class="flex items-center">
            <svg-icon type="mdi" :path="face" class="m-auto " width="30" height="30"></svg-icon>
             <span class="ml-1">회원 수</span>
          </div>
          <div>{{this.variousCount.userCount}}명</div>
        </div>
        <div class="border border-t-0 bg-sky-50 px-3 py-1 flex justify-between">
          <div class="flex items-center">
            <svg-icon type="mdi" :path="place" class="m-auto " width="30" height="30"></svg-icon>
             <span class="ml-1"> 운영중인 지점 수</span>
          </div>
          <div>7곳</div>
        </div>
      </div>
    </div>

    <div class=" m-4 rounded border bg-sky-200">
      <div class="m-3 my-5">
        <div class="border border-b-0 rounded-t-xl bg-sky-100 pl-3 py-1.5">오늘 qrcode 사용 현황</div>
        <div class="border border-t-0 bg-sky-50 px-3 py-1 flex justify-between">
          <div class="flex items-center">
            <svg-icon type="mdi" :path="plus" class="m-auto " width="30" height="30"></svg-icon>
             <span class="ml-1"> 오늘 발급된 qrcode 수</span>
          </div>
          <div>{{this.variousCount.todayCreatedQrcode}}</div>
        </div>
        <div class="border border-t-0 bg-sky-50 px-3 py-1 flex justify-between">
          <div class="flex items-center">
            <svg-icon type="mdi" :path="minus" class="m-auto " width="30" height="30"></svg-icon>
             <span class="ml-1"> 오늘 사용된 qrcode 수</span>
          </div>
          <div>{{this.variousCount.todayUsedQrcode}}</div>
        </div>
        <div class="border border-t-0 bg-sky-50 px-3 py-1 flex justify-between">
          <div class="flex items-center">
            <svg-icon type="mdi" :path="qrcodeI" class="m-auto " width="30" height="30"></svg-icon>
             <span class="ml-1"> 현재 남은 qrcode 수</span>
          </div>
          <div>{{this.variousCount.remainQRcode}}</div>
        </div>
      </div>
    </div>

  </div>

  <div v-if="this.tab == 'management'">
    <div class="text-xl mx-5 font-semibold my-4">카테고리 현황</div>
    <div v-for="(type,index) in category" :key="index">
      <div @click="type.display = !type.display" class="mx-4 border py-2 text-xl px-4">
          <div class="float-left">{{type.type}}</div>
          <div class="float-right">+</div>
          <div class="clear-both"></div>
      </div>
      <div class="categoryToggle mx-4 px-4 mb-2" :class="{'active': type.display}">
        <div v-for="(place, index) in type.category" :key="index" class="my-2 text-lg">{{place.name}}</div>
        <div>
          <div class=""></div>
        </div>
      </div>
    </div>
      
    <div class="mx-4 my-4">
      <div @click="goToCategory()" class="bg-sky-100 hover:bg-sky-200 text-black text-center border rounded-lg">카테고리 수정</div>
    </div>

    <div class="text-xl mx-5 font-semibold my-4">회원관리</div>

    <div class="mx-4 my-4">
      <div @click="$router.push({name:'AdminUser'})" class="bg-sky-100 hover:bg-sky-200 text-black text-center border rounded-lg">회원관리</div>
    </div>

    
  </div>

  <div v-if="this.tab == 'tiket'">
    <div class="text-xl mx-5 font-semibold mt-4">쿠폰 발급</div>

      <div class="p-4 ">
        <div class="p-4 bg-sky-100 border flex items-center justify-between">
          <div class="flex items-centest justify-between">
            <select v-model="this.selectedCouponInfo.category" class="border px-3 rounded-xl bg-sky-50" >
              <option>쿠폰 종류</option>
              <option>버스</option>
            </select>
            <select v-model="selectedCouponInfo.name" class="ml-3 border px-3 rounded-xl bg-sky-50" >
              <option>쿠폰 종류</option>
              <option>강남행 등교</option>
            </select>
          </div>
          <div @click="createCoupon()" class="bg-sky-50 hover:bg-sky-200 border rounded-xl px-3"> 발급하기</div>
        </div>
      </div>

    <div class="text-xl mx-5 font-semibold my-4">발행된 쿠폰</div>
      
    <div v-for="(type,index) in coupon" :key="index">
      <div @click="type.display = !type.display" class="mx-4 border py-2 text-xl px-4">
          <div class="float-left">{{type.type}}</div>
          <div class="float-right">+</div>
          <div class="clear-both"></div>
      </div>
      <div class="categoryToggle mx-4 px-4 mb-2 overflow-auto" :class="{'active': type.display}">
        <div v-for="(coupon, index) in type.coupon" :key="index" class="my-2">

          <div class="border my-2 p-2">
            <div>쿠폰번호: {{coupon.serial}}</div>
            <div>쿠폰종류: {{coupon.place}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-xl mx-5 font-semibold my-4">쿠폰 현황</div>
    <div class="border rounded-lg mt-5 m-4 max-h-96 overflow-auto bg-sky-100">
      <div class="px-2 mx-4 my-5 ">
        <div v-for="(rate,index) in this.couponUseRate" :key="index" class="flex items-center justify-between border-b mb-2 pb-1 px-2">
          <div>운영장소: {{rate.placeName}}</div>
          <div>{{rate.rate.use}} / {{rate.rate.all}}</div>
        </div>
        
      </div>
    </div>
    
    <div class="text-xl mx-5 font-semibold my-4">qr 현황</div>
    <div class="border rounded-lg mt-5 m-4 max-h-96 overflow-auto bg-sky-100">
      <div class="px-2 mx-4 my-5 ">
        <div v-for="(rate,index) in this.qrcodeUseRate" :key="index" class="flex items-center justify-between border-b mb-2 pb-1 px-2">
          <div>운영장소: {{rate.placeName}}</div>
          <div>{{rate.rate.use}} / {{rate.rate.all}}</div>
        </div>
      </div>
    </div>
  </div>
  
</div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import NavigationBarAdmin from './NavigationBarAdmin.vue'
import { mdiAccount,mdiMapMarker,mdiPlusBox,mdiMinusBox,mdiQrcode } from '@mdi/js';
import AdminService from '@/Service/AdminService';

export default {
  name: 'AdminMain',
  components: {
    SvgIcon,
    NavigationBarAdmin
    },  
  data () {
    return {
      face:mdiAccount,
      place:mdiMapMarker,
      plus:mdiPlusBox,
      minus:mdiMinusBox,
      qrcodeI:mdiQrcode,
      tab: 'management',
      myMenu:[
        {title:'서비스 현황', value:'status',info:'현황을 확인합니다.'},
        {title:'서비스 관리 ', value:'management',info:'현재 서비스를 관리합니다.'},
        {title:'사용권 관리 ', value:'tiket',info:'현재 qrcode,coupon 관리합니다.'},
      ],
      
      categoryToggle:false,

      category:[],
      coupon:[],

      qrcodeUseRate:[],
      couponUseRate:[],
      
      variousCount:{
        todayUsedQrcode:'',
        todayCreatedQrcode:'',
        remainQRcode:'',
        userCount:'',
      },

      selectedCouponInfo:{
        category:"버스",
        name:"강남행 등교"
      }

    }
  },
  created(){
    this.getServiceStatus()
  },
  methods:{
    createCoupon(){
        AdminService.createCoupon(this.selectedCouponInfo).then(
          (res)=>{
            alert(res.data.msg +'\n쿠폰번호: '+res.data.coupon);
          },
        )
    },
    getServiceStatus(){
      AdminService.serviceStatus().then(
        (res)=>{
          const apiResult = res.data;

          const categorySortMap = new Map();

          apiResult.categoryInfo.forEach((items) => {
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
          this.category = categorySort; // 카테고리 분류

          const couponSortMap = new Map();

          apiResult.couponList.forEach((items) => {
            const typeName = items.qrCodeCategory.qrcodeUsingPlace.name;
            if (!couponSortMap.has(typeName)) {
              couponSortMap.set(typeName, {
                type: typeName,
                display: false,
                coupon: [],
              });
            }

            const temp1 = { serial: items.serial, place: items.qrCodeCategory.name };
            couponSortMap.get(typeName).coupon.push(temp1); 
          });

          const couponSort = Array.from(couponSortMap.values());
          this.coupon = couponSort; //쿠폰 분류

          this.variousCount = {
            todayUsedQrcode:apiResult.todayUsedCount,
            todayCreatedQrcode:apiResult.todayCreatedCount,
            remainQRcode:apiResult.remainQrcodeCount,
            userCount:apiResult.userCount,
          }

          this.qrcodeUseRate = apiResult.qrcodeUSeRate;
          this.couponUseRate = apiResult.couponUseRate;
          console.log(res)

          console.log(this.category)
        }
      )
    },

    goToCategory(){
      console.log('asds')
      this.$router.push({ name: 'AdminCategory'});
    }
  },
}

</script>
<style scoped>
.categoryToggle {
  overflow: hidden; 
  max-height: 0;
  transition:all 0.5s ease;
}
.categoryToggle.active {
  max-height: 400px; /* 적절한 높이로 조정하세요 */
  border-bottom-right-radius: 0.5rem; /* 8px */
  border-bottom-left-radius: 0.5rem; /* 8px */
  border: 0.5px solid lightgray;
  border-top:0px;
}
</style>