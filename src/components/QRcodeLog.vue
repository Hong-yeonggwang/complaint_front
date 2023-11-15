<template>
  <div @click="$router.push({name:'userPage'})" class="my-4 mr-4 border text-lg w-fit px-4 py-1 rounded-xl bg-sky-50 float-right">이전 페이지로</div>
  <div class="clear-both"></div>
  <div class="w-11/12 m-auto overflow-x-auto">
    <DataTable :data="this.QRcoedLog" class="display px-4">
      <thead>
        <tr>
          <th>번호</th>
          <th>사용날짜</th>
          <th>사용장소</th>
          <th>코드번호</th>
        </tr>
      </thead>
    </DataTable>
  </div>
  

</template>

<script>
import UserService from '../Service/UserService';

import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net-bs5';
import 'datatables.net-select-bs5';

DataTable.use(DataTablesLib);


export default {
  name: 'QRcodeLog',
  components: {
    DataTable
    },  
  data () {
    return {
      QRcoedLog:[],
    }
  },
  async created(){
    await UserService.getQRcodeLog().then(
      (res)=>{
        console.log(res.data)
        res.data.forEach(item => {

          const inputDate = item.usedDate;
          const usedDate = new Date(inputDate).toLocaleString();
          
          console.log(usedDate)
          console.log(item.serial)
          let temp = [item.seq,usedDate,item.category.name,item.serial]
          this.QRcoedLog.push(temp)
          
        });
      }
    )
    console.log(this.QRcoedLog)
  },
  methods:{

  },
}

</script>
<style scoped>
@import 'datatables.net-dt';

th, td {
    min-width: 4rem;
  }

</style>