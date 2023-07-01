<template>
  <!-- 메뉴바  -->
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="black"
      classs="overflow-scroll"
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

  
  <div class="w-16 h-16 bg-black"></div>
</template>

<script>
export default {
  name: 'MyPage',
  components: {
    },  
  data () {
    return {
      tab: null,
      myMenu:[
        {title:'내정보', value:'myInfo',info:'정보를 확인합니다'},
        {title:'QR지갑', value:'QRwallet',info:'구매한 QR쿠폰을 확인합니다'},
        {title:'정보수정', value:'updateInfo',info:'정보를 업데이트합니다.'},
        {title:'쿠폰등록', value:'coupon',info:'쿠폰을 등록합니다'},
      ]
    }
  },
}
</script>
