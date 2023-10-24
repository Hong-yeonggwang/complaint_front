<template>
    <div @click="$router.push({name:'seviceStatus'})" class="mr-2 my-3 border rounded-md bg-sky-100 w-fit float-right text-xl px-3 py-1">이전으로</div>
    <div class="clear-both"></div>  

  <div class="border w-full h-full">

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
                <td>{{type.seq}}</td>
                <td>{{type.type}}</td>
                <td @click="editType(type.seq,type.type)">수정</td>
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
      <div class="border w-80 m-auto mt-2 bg-sky-100 hover:bg-sky-200 rounded-lg">수정</div>
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
      </div>
        
      <div class="flex items-center justify-center ">
        <input class="w-28 border text-center" v-model="placeEdit.seq" readonly>
        <input class="w-28 border text-center" v-model="placeEdit.name">
        <input class="w-28 border text-center" type="number" v-model="placeEdit.price">
      </div>
      <div class="border w-80 m-auto mt-2 bg-sky-100 hover:bg-sky-200 rounded-lg">수정</div>
    </div>
<!-- 수정끝 -->


  <div class="m-auto w-5/6  my-4">
    <div class="text-xl">대분류 추가</div>
    <div class="flex items-center justify-center border rounded-2xl p-5 mt-2">
      <input type="text" class="border w-40 " placeholder="이름">
      <div class="border rounded-lg bg-sky-100 hover:bg-sky-200 text-center ml-3 py-1 px-3">추가</div>
    </div>
  </div>

  <div class="m-auto w-5/6  my-4">
    <div class="text-xl">소분류 추가</div>
    <div class="flex items-center justify-center border rounded-2xl p-4 mt-2">
      <select class="border rounded-lg text-center px-3">
        <option v-for="(type,index) in types" :key="index" :value="type.seq">{{type.type}}</option>
      </select>
      <input type="text" class="border rounded-lg ml-3 text-center w-20 py-1" placeholder="이름">
      <input type="text" class="border rounded-lg ml-3 text-center w-20 py-1" placeholder="가격">
      <div class="border rounded-lg bg-sky-100 hover:bg-sky-200 text-center ml-3 py-1 px-3">추가</div>
    </div>
  </div>

  </div>

  

</template>

<script>
import AdminService from '@/Service/AdminService';

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
      }
    }
  },
  created(){
    this.getServiceStatus()
  },
  methods:{
    getServiceStatus(){
      AdminService.serviceStatus().then(
        (res)=>{
          const apiResult = res.data;

          const categorySortMap = new Map();

          apiResult.categoryInfo.forEach((items) => {
            const typeName = items.qrcodeUsingPlace.name;
            if (!categorySortMap.has(typeName)) {
              categorySortMap.set(typeName, {
                type: typeName,
                seq:items.qrcodeUsingPlace.placeSeq,
                category: [],
              });
            }

            const temp = { name: items.name };
            categorySortMap.get(typeName).category.push(temp);
          });

          const categorySort = Array.from(categorySortMap.values());
          this.types= categorySort; // 카테고리 분류

          this.place = res.data.categoryInfo

          console.log(categorySort)

          console.log(res)
        }
      )
    },

    editType(seq,type){
      this.typeEdit.seq = seq
      this.typeEdit.name = type
      console.log(seq)
    },
    editpPlace(seq,type,price){
      this.placeEdit.name = type;
      this.placeEdit.seq =seq;
      this.placeEdit.price = price;
      console.log(seq)
    },
  },
}

</script>
<style>
  table {
    width: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #444444;
  }
</style>
