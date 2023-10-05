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

  </div>
  
  

  
</template>

<script>
import NavigationBar2 from './NavigationBar2.vue';

export default {
  name: 'CscenterPage',
  components: {
    NavigationBar2
    },  
  data () {
    return {
      tab: null,
      csCenterMenu:[
        {title:'FAQ ', value:'FAQ',info:'자주 묻는 질문'},
        {title:'카카오톡', value:'kakao',info:'카카오톡으로 연결합니다.'},
      ],
      sections: [
        { title: '결제', content: '결제관련', expanded: false },
        { title: '사용', content: '사용관련', expanded: false },
        { title: '사용기간', content: '사용기간관련.', expanded: false }
      ]
    }
  },
  methods: {
    toggleSection(index) {
      this.sections[index].expanded = !this.sections[index].expanded;
    }
  },
}
</script>
<style>
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
</style>
