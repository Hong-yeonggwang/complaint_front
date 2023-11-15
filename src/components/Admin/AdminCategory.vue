<template>
    <div @click="$router.push({name:'seviceStatus'})" class="mr-2 my-3 border rounded-md bg-sky-100 w-fit float-right text-xl px-3 py-1">이전으로</div>
    <div class="clear-both"></div>  

  <div class="border w-full">

    <table class="m-auto w-5/6 text-center my-4">
        <thead>
            <tr>
                <th>번호</th>
                <th>분류</th>
                <th>수정</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(type,index) in types" :key="index">
                <td>{{type.placeSeq}}</td>
                <td>{{type.name}}</td>
                <td @click="editType(type.placeSeq,type.name)">수정</td>
            </tr>
        </tbody>
    </table>

    <!-- 수정화면 -->
    <div class="m-auto w-5/6 text-center my-4" >
      <div class="flex items-center justify-center ">
        <div class="w-40 border">번호</div>
        <div class="w-40 border">이름</div>
      </div>
        
      <div class="flex items-center justify-center ">
        <input class="w-40 border text-center" v-model="typeEdit.seq" readonly>
        <input class="w-40 border text-center" v-model="typeEdit.name">
      </div>
      <div @click = "editPlaceData()" class="border w-80 m-auto mt-2 bg-sky-100 hover:bg-sky-200 rounded-lg">수정</div>
    </div>
<!-- 수정끝 -->
    <table class="m-auto w-5/6 text-center my-4">
        <thead>
            <tr>
                <th>번호</th>
                <th>분류</th>
                <th>가격</th>
                <th>수정</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(type,index) in place" :key="index">
                <td>{{type.qrCategorySeq}}</td>
                <td>{{type.name}}</td>
                <td>{{type.price}}</td>
                <td @click="editpPlace(type.qrCategorySeq,type.name,type.price)">수정</td>
            </tr>
        </tbody>
    </table>


    <!-- 수정화면 -->
    <div class="m-auto w-5/6 text-center my-4" >
      <div class="flex items-center justify-center ">
        <div class="w-28 border">번호</div>
        <div class="w-28 border">이름</div>
        <div class="w-28 border">가격</div>
        <div class="w-28 border">공개</div>
      </div>
        
      <div class="flex items-center justify-center ">
        <input class="w-28 border text-center" v-model="placeEdit.seq" readonly>
        <input class="w-28 border text-center" v-model="placeEdit.name">
        <input class="w-28 border text-center" type="number" v-model="placeEdit.price">
        <select v-model="placeEdit.show" class="w-28 border text-center">
        <option value = "show">공개</option>
        <option value = "hidden">비공개</option>
      </select>
      </div>
      <div @click="editCategortData()" class="border w-80 m-auto mt-2 bg-sky-100 hover:bg-sky-200 rounded-lg">수정</div>
    </div>
<!-- 수정끝 -->


  <div class="m-auto w-5/6  my-4">
    <div class="text-xl">대분류 추가</div>
    <div class="flex items-center justify-center border rounded-2xl p-5 mt-2">
      <input v-model="addDate" type="text" class="border w-40 " placeholder="이름">
      <div @click="sendAddData()" class="border rounded-lg bg-sky-100 hover:bg-sky-200 text-center ml-3 py-1 px-3">추가</div>
    </div>
  </div>

  <div class="m-auto w-5/6  my-4">
    <div class="text-xl">소분류 추가</div>
    <div class="flex items-center justify-center border rounded-2xl p-4 mt-2">
      <select v-model="addplace.seq" class="border rounded-lg text-center px-3">
        <option v-for="(type,index) in types" :key="index" :value="type.placeSeq">{{type.name}}</option>
      </select>
      <input v-model="addplace.name" type="text" class="border rounded-lg ml-3 text-center w-20 py-1" placeholder="이름">
      <input v-model="addplace.price" type="number" class="border rounded-lg ml-3 text-center w-20 py-1" placeholder="가격">
      <div @click="sendCategortData()" class="border rounded-lg bg-sky-100 hover:bg-sky-200 text-center ml-3 py-1 px-3">추가</div>
    </div>
  </div>

  </div>

  

</template>

<script>
import AdminService from '@/Service/AdminService';
import CategoryService from '@/Service/CategoryService';

export default {
  name: 'AdminCategory',
  components: {
    },  
  data () {
    return {
      types:[],
      categories:[
        {
          type:'',
          place:''
        }
      ],

      typeEdit:{
        name:'',
        seq:'',
      },
      placeEdit:{
        name:'',
        seq:'',
        price:'',
        show:'show',
      },

      addDate:null,
      addplace:{
        name:'',
        seq:'',
        price:'',
      },
    }
  },
  created(){
    this.getServiceStatus()
  },
  methods:{
    getServiceStatus(){
      AdminService.getCategory().then(
        (res)=>{
          const apiResult = res.data;
          console.log(apiResult)
          this.types = apiResult.place
          this.place = apiResult.category
        }
      )


    },

    editType(seq,type){
      this.typeEdit.seq = seq
      this.typeEdit.name = type
    },
    editpPlace(seq,type,price){
      this.placeEdit.name = type;
      this.placeEdit.seq =seq;
      this.placeEdit.price = price;
    },

    editCategortData(){
      let data = {
        price:this.placeEdit.price,
        name:this.placeEdit.name,
        categorySeq:this.placeEdit.seq,
        show:this.placeEdit.show
      }
      CategoryService.editCategory(data).then(
        (res)=>{
          alert(res.data)
        }
      )
    },

    editPlaceData(){
      let data = {
        name:this.typeEdit.name,
        categorySeq:this.typeEdit.seq,
      }
      CategoryService.editPlace(data).then(
        (res)=>{
          alert(res.data)
        }
      )
    },

    sendAddData(){
      let data = {
        name:this.addDate
      }
      CategoryService.addPlace(data).then(
        (res)=>{
          alert(res.data)
        }
      )
    },
    sendCategortData(){
      let data = {
        price:this.addplace.price,
        name:this.addplace.name,
        categorySeq:this.addplace.seq,
        show:'show'
      }
      CategoryService.addCategory(data).then(
        (res)=>{
          alert(res.data)
        }
      )
    }
  },
}

</script>
<style scoped>
  table {
    width: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #444444;
  }
</style>
