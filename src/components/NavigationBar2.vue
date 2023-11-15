<template>
  <div class="side-bar border overflow-hidden" @mouseenter="this.drawer =true" @mouseleave="this.drawer=false" >

      <div class="w-44 border-b">
        <div class="flex items-center my-4 ml-2">
        <img @click="this.toMypage" :src="require(`@/assets/complaint.png`)" width="35" height="35" class="ml-0.5">
        <div @click="this.toMypage" class="ml-4 float-left hidden itemTitle overflow-hidden" :class="{'active': this.drawer}">마이페이지</div>  
        <svg-icon @click="userlogout()" width="25" height="25" class="ml-4 itemTitle hidden" type="mdi" :path="this.logout" :class="{'active': this.drawer}"></svg-icon>

        </div>
      </div>
      
      <div class="clear-both"></div>

      <div v-for="(item,index) in items" :key="index">
        <div class="w-40">
          <div class="flex items-center my-4 ml-3">
          <svg-icon width="30" height="30" class="float-left" type="mdi" :path="item.icon"></svg-icon>
          <router-link :to="{name: item.value}">
            <div class="ml-4 float-left hidden itemTitle overflow-hidden" :class="{'active': this.drawer}">{{ item.title }}</div>  
          </router-link>

          </div>
        </div>
        
        <div class="clear-both"></div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTicket,mdiChat,mdiFaceAgent,mdiLogout } from '@mdi/js';


export default {
  name: 'NavigationBar2',
  components: {
    SvgIcon
  },  
  data () {
    return {
      userFacePath:require(`@/assets/user.png`),
      drawer: false,
      items: [
        { title: '구매', icon: mdiTicket, value:'buyPage' },
        { title: '채팅', icon: mdiChat, value:'chatPage' },
        { title: '고객센터', icon: mdiFaceAgent, value:'csCenterPage' },
      ],
      logout:mdiLogout,
    }
  },
  methods:{
    toMypage(){
        this.$router.push({ name:'userPage'});
    },
    userlogout(){
      alert("로그아웃되었습니다.")
      this.$store.dispatch("auth/logout")
      this.$router.push({name:'main'})
    }
  } 
}
</script>
<style scoped>
.side-bar{
  width:3.5rem;
  background-color:white;
  position:absolute;
  height:100%;
}
.side-bar:hover{
  width:11rem;
  background-color:white;
  z-index: 999;
  height:100%;
  position:absolute;
  transition:all 0.2s linear;
}
.itemTitle.active{
  display: block;
}
</style>