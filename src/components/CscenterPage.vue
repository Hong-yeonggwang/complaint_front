<template>
  <NavigationBar2 class="float-left"></NavigationBar2>
  <div class="ml-14 customWidth float-left">
    <!-- 메뉴바  -->
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="black"
    >
      <v-tab v-for="(menu,index) in  csCenterMenu" :key="index" v-bind:value="menu.value">{{menu.title}}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="(menu,index) in csCenterMenu" :key="index" class="h-12 flex items-center" v-bind:value="menu.value">
          {{ menu.info }}
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>
  <div v-if="this.tab == 'FAQ'">
      <div class="mx-8 my-4">
      <div class="p-4">
        <div class="rounded-md overflow-hidden">
          <div class="py-2 bg-slate-200 text-xl px-2">자주묻는 질문</div>
          <div>
            <div
              v-for="(section, index) in sections"
              :key="index"
              class="accordion-section"
            >
              <div
                class="accordion-header bg-slate-100"
                @click="toggleSection(index)"
              >
                {{ section.title }}
                <span class="accordion-icon">{{ section.expanded ? '-' : '+' }}</span>
              </div>
              <div class="accordion-content bg-slate-50" :class="{'active': section.expanded, 'block': section.expanded ,'p-4': section.expanded }">
                {{ section.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

<!-- 질문남기기 -->
  <div v-if="this.tab == 'QA'">
    <div>
      <div class="w-5/6 my-6 m-auto border rounded-xl p-4 bg-slate-50 shadow-lg">
        <div class="flex items-center">
          <div class="mx-2">태그</div>
          <select v-model="writeInfo.tag" class="border bg-white w-32 text-center px-3 rounded-xl">
            <option v-for="(item,index) in tagList" :key="index" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="border m-1 my-4 rounded-lg p-3">
          <input v-model="writeInfo.subject" type = "text" placeholder="제목을 입력하세요" class="text-xl p-4 rounded-xl border bg-white w-full">
          <textarea class="text-lg px-4 p-8 rounded-xl bg-white my-5 mb-0 border w-full" v-model="writeInfo.content" id="markdown-editor"></textarea>
        </div>

        <div @click="writePost()" class="float-right mr-4 border rounded-lg p-2 py-1 px-4 bg-sky-100">글쓰기</div>
        <div class="clear-both"></div>
      </div>  
    </div>
  </div>

  <div v-if="this.tab == 'myQuestion'">
    <div class="mx-7">
      <table class="m-auto text-center my-4">
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
          <tr @click = "moveToPost(item.seq)" v-for="(item,index) in myPost" :key="index">
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
import NavigationBar2 from './NavigationBar2.vue';
import BoardService from "../Service/BoardService"

export default {
  name: 'CscenterPage',
  components: {
    NavigationBar2
    },  
  data () {
    return {
      tab: null,
      csCenterMenu:[
        {title:'내가 남긴 질문', value:'myQuestion',info:'나의 질문을 확인합니다.'},
        {title:'질문하기', value:'QA',info:'관리자에게 질문합니다.'},
        {title:'FAQ ', value:'FAQ',info:'자주 묻는 질문'},
      ],
      sections: [
        { title: '결제', content: '현재 결제는 문의를 통해 가능합니다!', expanded: false },
        { title: '사용', content: '마이페이지의 qr지갑에서 qrcode를 확인가능합니다! 원하는 장소에서 사용해보세요', expanded: false },
      ],

      tagList:[],

      writeInfo:{
        tag:'',
        subject:'',
        content:'',
      },

      vaildWriteInfo:{
        tag:false,
        subject:false,
        content:false,
      },
      myPost:[],
    }
  },
  watch: {
    'writeInfo.tag': function() {
      if(this.writeInfo.tag != null || this.vaildWriteInfo.tag !=''){
        this.vaildWriteInfo.tag = true;
      }else{
        this.vaildWriteInfo.tag = false;
      }
    },
    'writeInfo.subject': function() {
      if(this.writeInfo.subject != null || this.vaildWriteInfo.subject !=''){
        this.vaildWriteInfo.subject = true;
      }else{
        this.vaildWriteInfo.subject = false;
      }
    },
    'writeInfo.content': function() {
      if(this.writeInfo.content != null || this.vaildWriteInfo.content !=''){
        this.vaildWriteInfo.content = true;
      }else{
        this.vaildWriteInfo.content = false;
      }
    },
    'tab': function(){
      if(this.tab=='myQuestion'){
        BoardService.getMyPost().then(
          (res)=>{
            this.myPost = res.data;
          }
        )
      }
    }
  },
  created(){
    BoardService.getTag().then(
      (res)=>{
        this.tagList = res.data
      }
    )
  },
  methods: {
    toggleSection(index) {
      this.sections[index].expanded = !this.sections[index].expanded;
    },

    writePost(){
      if(!this.isFormValid()){
        console.log(this.isFormValid())
        alert("양식을 모두 작성해주세요")
        return 0;
      }
      BoardService.sendPostData(this.writeInfo).then(
        (res)=>{
          alert(res.data)
          location.reload();
        }
      )
    },

    isFormValid(){
        for (let key in this.vaildWriteInfo) {
          if (this.vaildWriteInfo[key] === false) {
            return false; // 하나라도 false가 있으면 false 반환
          }
        }
        return true; // 모든 속성이 true인 경우 true 반환
      },
      moveToPost(seq){
        this.$router.push({name:'userPost',params:{postSeq:seq}})
      }
  },
}
</script>
<style scoped>
.accordion-section {
  border-bottom: 1px solid #d3d3d3;
  border-radius: 5px;
}

.accordion-header {
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accordion-content {
  overflow: hidden; 
  max-height: 0;
  transition:all 0.3s ease;
}
.accordion-content.active {
  border-top: 1px solid #d3d3d3;
  max-height: 600px; /* 적절한 높이로 조정하세요 */
}
table {
    width: 100%;
    border: 1px solid #6e6d6d;
    border-collapse: collapse;
  }
  th, td {
    padding:5px;
    border: 1px solid #6e6d6d;
  }
</style>
