<template>
  <!-- 메뉴바  -->
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="black"
      classs="overflow-scroll"
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

  
  <div class="w-16 h-16 bg-black"></div>
</template>

<script>
export default {
  name: 'CscenterPage',
  components: {
    },  
  data () {
    return {
      tab: null,
      csCenterMenu:[
        {title:'문의', value:'Question',info:'문의창'},
        {title:'카카오톡', value:'kakao',info:'카카오톡으로 연결합니다.'},
      ]
    }
  },
}
</script>
