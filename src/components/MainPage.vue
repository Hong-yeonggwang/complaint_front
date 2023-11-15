<template>
  <div class=" bg-slate-800 pb-8">
    <div class="mx-4 pt-5 mb-8">
      <div @click="$router.push({name:'UserLogin'})" class="bg-sky-50 border rounded-md float-right px-3 py-2 w-fit">로그인페이지로</div>
      <div class="clear-both"></div>
    </div>
    <div class="w-2/3 border rounded-xl overflow-hidden m-auto">
      <img :src="require(`@/assets/main1.png`)">
      <img :src="require(`@/assets/main2.png`)">
      <img :src="require(`@/assets/main3.png`)">
    </div>
  </div>
  


</template>

<script>
export default {
  name: 'MainPage',
  components: {
  },  
  data () {
    return {
    }
  },
  created(){

  },
  methods:{
   
  } 
}
</script>
