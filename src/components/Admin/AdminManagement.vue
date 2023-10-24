<template>
  <h1>AdminManagement</h1>
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
    
    <div class="mx-8 p-3 ">
      <div class="w-full border-b">
        <svg-icon type="mdi" :path="face_path" class="m-auto float-left" width="40" height="40"></svg-icon>
        <div class=" p-2 pl-0 text-xl font-semibold float-left">운영자 현황</div>
        <div class="clear-both"></div>
      </div>

      <div class="border rounded-lg mt-5 m-2 max-h-96 overflow-auto">

        <div class="my-2 w-5/6 m-auto">
          <div v-for="(operator,index) in operatorList" :key="index" class="border rounded-xl bg-sky-100 m-auto mb-2 pl-3 py-2 shadow-lg">
            <div class="">운영장소: {{operator.qrcodeCategory.name}}</div>
            <div class="">이름: {{operator.name}}</div>
            <div class="">전화번호: {{ operator.phoneNumber }}</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div v-if="this.tab == 'management'">
    <div class="p-6">
      <div @click="this.joinToggle = !this.joinToggle" class="py-2 flex justify-between items-center border rounded-xl px-6">
        <div class="">운영자 생성</div>
        <div>+</div>  
      </div>
      <div class="joinToggle" :class="{'active': joinToggle}">
        <AdminJoin></AdminJoin>
      </div>
    </div>
    
    <div class="p-6 pt-0">
      <div @click="this.editToggle = !this.editToggle" class="py-2 flex justify-between items-center border rounded-xl px-6">
        <div class="">관리자 정보 수정</div>
        <div>+</div>  
      </div>
      <div class="editToggle" :class="{'active': editToggle}">
        <AdminInfoEdit></AdminInfoEdit>
      </div>
    </div>
  </div>
  
  
</div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount,mdiBookshelf, mdiCake, mdiPhone } from '@mdi/js';
import NavigationBarAdmin from './NavigationBarAdmin.vue'
import AdminJoin from './AdminJoin.vue';
import AdminInfoEdit from './AdminInfoEdit.vue'
import AdminService from '@/Service/AdminService';


export default {
  name: 'AdminManagement',
  components: {
    SvgIcon,
    NavigationBarAdmin,
    AdminJoin,
    AdminInfoEdit
    },  
  data () {
    return {
      face_path: mdiAccount,
      major_path: mdiBookshelf,
      brith_path: mdiCake,
      phone_path: mdiPhone,
      tab: null,
      joinToggle:false,
      editToggle:false,
      myMenu:[
        {title:'운영자 현황', value:'status',info:'정보를 확인합니다', component:'myInfo'},
        {title:'운영자 관리 ', value:'management',info:'구매한 QR쿠폰을 확인합니다', component:'QR'},
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

      operatorList:[]
    }
  },
  created(){
    AdminService.operatorStatus().then(
      (res)=>{
        console.log("adsdsass")
        console.log(res.data)
        this.operatorList = res.data
      }
    )
  },
  methods:{

  },
}

</script>
<style scoped> 
.joinToggle{
  max-height: 0;  
  overflow: hidden;
  transition:all 0.3s ease;
}
.joinToggle.active{
  max-height: 400px;
}
.editToggle{
  max-height: 0;  
  overflow: hidden;
  transition:all 0.3s ease;
}
.editToggle.active{
  max-height: 500px;
}
</style>