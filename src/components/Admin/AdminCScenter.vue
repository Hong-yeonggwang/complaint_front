<template>
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

  <div v-if="this.tab == 'new'">
    <svg-icon type="mdi" :path="face_path" class="m-auto" width="120" height="120"></svg-icon>

    <div class="mx-3">
      <table class="m-auto w-fit text-center my-4">
        <thead>
            <tr>
                <th>태그</th>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>확인여부</th>
            </tr>
        </thead>
        <tbody>
          <tr @click = "moveToPost(item.seq)" v-for="(item,index) in noPost" :key="index">
              <th>{{ item.tag }}</th>
              <th>{{ item.seq }}</th>
              <th>{{ item.subject }}</th>
              <th>{{ item.write }}</th>
              <th>{{ item.status }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="this.tab == 'complete'" >

    <div class="mx-3">
      <table class="m-auto w-full text-center my-4">
        <thead>
            <tr>
                <th>태그</th>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>확인여부</th>
            </tr>
        </thead>
        <tbody>
          
          <tr @click = "moveToPost(item.seq)" v-for="(item,index) in yesPost" :key="index">
              <th>{{ item.tag }}</th>
              <th>{{ item.seq }}</th>
              <th>{{ item.subject }}</th>
              <th>{{ item.write }}</th>
              <th>{{ item.status }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    

  </div>
  

  
</div>

  
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount} from '@mdi/js';
import NavigationBarAdmin from './NavigationBarAdmin.vue'
import BoardService from '@/Service/BoardService';


export default {
  name: 'AdminCScenter',
  components: {
    SvgIcon,
    NavigationBarAdmin
    },  
  data () {
    return {
      face_path: mdiAccount,
      tab: null,
      couponSerial:'',
      myMenu:[
        {title:'고객요청', value:'new',info:'새로운 고객 요청을 확인합니다.'},
        {title:'완료된 요청 ', value:'complete',info:'이전 요청을 확인할 수 있습니다.'},
      ],

      noPost:[],
      yesPost:[]

    }
  },
  created(){
    BoardService.getAllPost().then(
      (res)=>{
        this.noPost = res.data.no
        this.yesPost = res.data.yes
      }
    )
  },
  methods:{
    moveToPost(seq){
      this.$router.push({name:'AdminPost',params:{postSeq:seq}})
    }
  },
}

</script>
<style scoped>
table {
    width: 100%;
    border: 1px solid #bab6b6;
    border-collapse: collapse;
    color:#3b3939;
  }
  th, td {
    border: 1px solid #bab6b6;
  }
</style>