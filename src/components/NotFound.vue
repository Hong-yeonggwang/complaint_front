<template>
  <div class="border rounded-lg my-8 mx-4 text-center py-8 bg-sky-50">
    <div class="">잘못된 경로이거나 권한이 필요한 페이지입니다.</div>
    <div class="border w-fit m-auto py-1 px-3 rounded-md my-2 bg-sky-100" @click="$router.push({name:'UserLogin'})">로그인 페이지로 이동</div>
    <div class="border w-fit m-auto py-1 px-3 rounded-md my-2 bg-sky-100" @click="$router.go(-1);" >이전 페이지로 이동</div>
  </div>
  
</template>

<script>


export default {
  name: 'NotFound',
  components: {
  },  
  data () {
    return {
    }
  },
  created(){
  },
  methods:{


},
}

</script>