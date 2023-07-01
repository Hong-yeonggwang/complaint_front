<template>
  <!-- 메뉴바  -->
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="black"
      classs="overflow-scroll"
    >
      <v-tab v-for="(menu,index) in  parchaseMenu" :key="index" v-bind:value="menu.value">{{menu.title}}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="(menu,index) in parchaseMenu" :key="index" class="h-12 flex items-center" v-bind:value="menu.value">
          {{ menu.info }}
        </v-window-item>

      </v-window>
    </v-card-text>
  </v-card>

  
</template>

<script>
export default {
  name: 'PurchasePage',
  components: {
    },  
  data () {
    return {
      tab: null,
      parchaseMenu:[
        {title:'승차권', value:'bus',info:'승차권을 구매합니다'},
        {title:'식당', value:'meal',info:'식권을 구매합니다'},
      ],

    }
  },
}
</script>
