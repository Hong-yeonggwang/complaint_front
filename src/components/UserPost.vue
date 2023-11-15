<template>
  <div class="w-5/6 m-auto border rounded-xl p-4 bg-slate-50 mt-8">
    <div class="mx-2">태그: {{ this.postInfo.tag }}</div>
    <div class="border m-1 my-2 rounded-lg p-3">
      <div class="text-xl px-4 py-1 rounded-xl bg-sky-300">제목: {{ this.postInfo.subject }}</div>
      <div class="text-lg px-4 py-8 rounded-xl bg-sky-300 my-5 whitespace-pre-wrap">{{ this.postInfo.content }}</div>
      
      <div class="border rounded-lg w-full bg-white p-4">{{ this.postInfo.comment }}</div>
      
    </div>

    <div @click="$router.push({name:'csCenterPage'})" class="float-right mr-4 border rounded-lg p-2 px-4 bg-sky-100">이전 페이지</div>
    <div class="clear-both"></div>
  </div>

</template>

<script>
import BoardService from '@/Service/BoardService';


export default {
  name: 'UserPost',
  components: {
  },  
  data () {
    return {
      postInfo:{
        completeDate: null,
        content: "",
        regulationDate: "",
        seq: '',
        status: "",
        subject: "",
        tag: "",
        writerEmail:'',
        writerName: "",
        writerPhoneNumber: "",
        comment:'답변 이전입니다',
      },
    }
  },
  created(){
    BoardService.getSeqPost(this.$route.params.postSeq).then(
      (res)=>{
        this.postInfo = res.data
        if(this.postInfo.comment != null){
          this.comment = this.postInfo.comment
        }
      }
    )
  },
  methods:{


},
}

</script>