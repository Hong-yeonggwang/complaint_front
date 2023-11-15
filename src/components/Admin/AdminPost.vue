<template>
  <div class="w-5/6 m-auto border rounded-xl p-4 bg-slate-50 mt-8">
    <div class="mx-2">태그: {{ this.postInfo.tag }}</div>
    <div class="border m-1 my-2 rounded-lg p-3">
      <div class="text-xl px-4 py-1 rounded-xl bg-sky-300">제목: {{ this.postInfo.subject }}</div>
      <div class="text-lg px-4 py-8 rounded-xl bg-sky-300 my-5 whitespace-pre-wrap">{{ this.postInfo.content }}</div>
      <div class="border-2 border-slate-500 border-t-0 border-x-0"></div>
      <div class="text-base px-4 py-2 rounded-xl bg-sky-100 my-3 mt-6">
        <div class="">작성자 정보</div>
        <div> 이름: {{ this.postInfo.writerName }}</div>
        <div> 전화번호: {{ this.postInfo.writerPhoneNumber }}</div>
        <div> 이메일: {{ this.postInfo.writerEmail }}</div>
      </div>

      <div class="text-base px-4 py-2 rounded-xl bg-sky-100 my-3">
        <div class="ml-2 my-3">쿠폰발급하기</div>
        <div class="mb-2 ">
          <div class="ml-3 border px-3 rounded-xl bg-sky-50 float-left">{{ this.place }}</div>
          <select v-model="category" class="ml-3 border px-3 rounded-xl bg-sky-50 float-left">
            <option v-for="(item,index) in categoryInfo" :key="index">{{ item.name }}</option>
          </select>
          <div @click="createdCoupon()" class="bg-sky-50 hover:bg-sky-200 border rounded-xl px-3 float-right"> 발급하기</div>
          <div class="clear-both"></div>
        </div>
        
      </div>
      <div class="text-base px-4 py-2 rounded-xl bg-sky-100 my-3"> 
        <div class="ml-2 my-3">이메일 전송하기</div>
        <div class="mb-2 ">
          <div class="mb-4 border px-3 bg-sky-50 float-left">쿠폰번호==> {{ this.couponSerial }}</div>
          <textarea class="border rounded-lg w-full bg-white p-4" v-model="comment" id="markdown-editor"></textarea>
          <div @click="sendEmail()" class="bg-sky-50 hover:bg-sky-200 border rounded-xl px-3 float-right"> 전송</div>
          <div class="clear-both"></div>
        </div>

      </div>
      
    </div>

    <div @click="completePost()" class="float-right mr-4 border rounded-lg p-2 px-4 bg-sky-100">확인</div>
    <div class="clear-both"></div>
  </div>

</template>

<script>
import BoardService from '@/Service/BoardService';
import AdminService from '@/Service/AdminService';


export default {
  name: 'AdminPost',
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
        comment:'',
      },
      place:'장소',
      category:'',
      categoryInfo:[],
      couponSerial:'',

      comment:'답변달기'
    }
  },
  watch: {
    'category': function() {
      const target = this.category;
      const index = this.categoryInfo.findIndex(item => item.name === target);
      this.place = this.categoryInfo[index].qrcodeUsingPlace.name
    },
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
    AdminService.getCategory().then(
      (res)=>{
        console.log(res)
        this.categoryInfo = res.data.category
        
      }
    )
  },
  methods:{
    createdCoupon(){
      if(this.category==''){
        alert("양식을 모두 작성해주세요");
        return 0;
      }
      let data = {
        category:this.place,
        name:this.category
      }
      AdminService.createCoupon(data).then(
        (res)=>{
          alert(res.data.msg +'\n쿠폰번호: '+res.data.coupon);
          this.couponSerial = res.data.coupon
        }
      )
    },

    sendEmail(){
      if(this.couponSerial == ''){
        const result = confirm("쿠폰이 없습니다! 진행하시나요?")
        if (result === false) {
          alert("메일전송을 취소했습니다.")
          return 0;
        }
      }
      if(this.comment=='답변달기'){
        const result = confirm("답변없이 메일을 보내시냐요?")
        if (result === false) {
          alert("메일전송을 취소했습니다.")
          return 0;
        }
      }
      let data ={
        email:this.postInfo.writerEmail,
        coupon:this.couponSerial,
        comment:this.comment,
      }
      BoardService.sendEmail(data).then(
        (res)=>{
          alert(res.data);
        }
      )
    },
    completePost(){
      if(this.comment=='답변달기'){
        const result = confirm("답변을 안달고 확인하시나요? 진행하시나요?")
        if (result === false) {
          alert("확인을 취소했습니다.")
          return 0;
        }
      }
      let data = {
        seq:this.postInfo.seq,
        comment:this.comment
      }
      BoardService.writeComment(data).then(
        (res)=>{
          alert(res.data)
          this.$router.push({name:'AdminCScenter'})
        }
      )
    },

},
}

</script>