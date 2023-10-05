<template>
  <div class="side-bar border overflow-hidden" @mouseenter="this.drawer =true" @mouseleave="this.drawer=false" >

    <router-link :to="{name:'adminMain'}">
      <div class="w-40 border-b">
        <div class="flex items-center my-4 ml-2">
        <img :src="require(`@/assets/logo.png`)" width="35" height="35" class="ml-0.5">
        <div class="ml-4 float-left hidden itemTitle overflow-hidden" :class="{'active': this.drawer}">마이페이지</div>  
        </div>
      </div>
      
      <div class="clear-both"></div>
    </router-link>
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
import { mdiAccountSupervisor,mdiFaceAgent,mdiAccountWrenchOutline } from '@mdi/js';

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
<style>
.side-bar{
  width:3.5rem;
  background-color:white;
  position:absolute;
  height:100%;
}
.side-bar:hover{
  width:10rem;
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