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
    <svg-icon type="mdi" :path="face_path" class="m-auto" width="120" height="120"></svg-icon>
    <div>회원 수</div>
    <div>운영중인 qrcode 사용지점 수</div>
    <div>오늘 발급된 qrcode 수</div>
    <div>오늘 사용된 qrcode 수</div>
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
        <div v-for="(place, index) in type.category" :key="index" class="my-2 text-lg">{{place}}</div>
      </div>
    </div>
      
    <div class="mx-4 my-4">
      <div class="bg-sky-100 hover:bg-sky-200 text-black text-center border rounded-lg">카테고리 수정</div>
    </div>

    <div class="mx-4 my-4">
      <div class="bg-sky-100 hover:bg-sky-200 text-black text-center border rounded-lg">카테고리 추가</div>
    </div>


    <div class="text-xl mx-5 font-semibold my-4">회원관리</div>

    <div class="mx-4 my-4">
      <div class="bg-sky-100 hover:bg-sky-200 text-black text-center border rounded-lg">회원관리</div>
    </div>
    
    <div>회원관리</div>
  </div>

  <div v-if="this.tab == 'tiket'">
    <div>쿠폰 발급</div>
    <div>쿠폰 현황</div>
    <div>qrcode 현황</div>
  </div>
  
</div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import NavigationBarAdmin from './NavigationBarAdmin.vue'

export default {
  name: 'AdminMain',
  components: {
    SvgIcon,
    NavigationBarAdmin
    },  
  data () {
    return {
      tab: null,
      myMenu:[
        {title:'서비스 현황', value:'status',info:'현황을 확인합니다.'},
        {title:'서비스 관리 ', value:'management',info:'현재 서비스를 관리합니다.'},
        {title:'사용권 관리 ', value:'tiket',info:'현재 qrcode,coupon 관리합니다.'},
      ],
      
      categoryToggle:false,

      category:[
        {
          type:'버스',
          display:false,
          category:[
            {name:"인성관"},
            {name:"인성관"},
            {name:"인성관"},
          ]
        },
        {
          type:'식당',
          display:false,
          category:[
            {name:"인성관"},
            {name:"인성관"},
            {name:"인성관"},
          ]
        }
      ]
    }
  },
  created(){
    
  },
  methods:{
    
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
  max-height: 600px; /* 적절한 높이로 조정하세요 */
  border-bottom-right-radius: 0.5rem; /* 8px */
  border-bottom-left-radius: 0.5rem; /* 8px */
  border: 0.5px solid lightgray;
  border-top:0px;
}
</style>