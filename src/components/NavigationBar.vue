<template>
  <v-card class="h-full">
    <v-layout>
      
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
        style="position:absolute;"
      >
        <v-list-item
          v-bind:prepend-avatar="userFacePath"
          title="사용자"
          nav
          @click="toMypage()"
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <router-link v-for="(item,index) in items" :key="index" :to="{name: item.value}">
            <v-list-item v-bind:prepend-icon="item.icon" v-bind:title="item.title" v-bind:value="item.value"></v-list-item>
          </router-link>


        </v-list>
      </v-navigation-drawer>
      <v-main style="box-sizing: content-box;" @click.stop="rail = true">
        <!-- <router-view></router-view> -->
    </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'NavigationBar',
  components: {
  },  
  data () {
    return {
      userFacePath:require(`@/assets/user.png`),
      drawer: true,
      items: [
        { title: '구매', icon: 'mdi-ticket', value:'buyPage' },
        { title: '채팅', icon: 'mdi-chat', value:'chatPage' },
        { title: '고객센터', icon: 'mdi-face-agent', value:'csCenterPage' },
      ],
      rail: true,
    }
  },
  methods:{
    toMypage(){
      if(this.rail == false){
        this.$router.push({ name: 'userPage'});
        this.rail = false
      }
        
    },
  } 
}
</script>
