<template>
  <div class="side-bar border overflow-hidden" @mouseenter="this.drawer =true" @mouseleave="this.drawer=false" >

      <div class="w-44 border-b">
        <div class="flex items-center my-4 ml-2">
        <img @click="this.toMypage" :src="require(`@/assets/logo.png`)" width="35" height="35" class="ml-0.5">
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
import { mdiAccountSupervisor,mdiFaceAgent,mdiAccountWrenchOutline,mdiLogout } from '@mdi/js';
import TokenService from '@/Service/TokenService';

export default {
  name: 'NavigationBarAdmin',
  components: {
    SvgIcon
  },  
  data () {
    return {
      userFacePath:require(`@/assets/user.png`),
      drawer: false,
      items: [
        { title: '서비스 현황', icon: mdiAccountWrenchOutline, value:'seviceStatus' },
        { title: '운영자', icon: mdiAccountSupervisor, value:'AdminManagement' },
        { title: '고객센터', icon: mdiFaceAgent, value:'AdminCScenter' },
      ],
      rail: true,
      logout:mdiLogout,
    }
  },
  methods:{
    toMypage(){
        this.$router.push({ name:'adminMain'});
    },
    userlogout(){
      alert("로그인되었습니다.")
      TokenService.removeUser();
      this.$router.push({name:'UserLogin'})
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