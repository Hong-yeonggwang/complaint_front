<template>
  <div @click="$router.push({name:'seviceStatus'})" class="my-4 mr-4 border text-lg w-fit px-4 py-1 rounded-xl bg-sky-50 float-right">이전 페이지로</div>
  <div class="clear-both"></div>
  <div class="w-11/12 m-auto overflow-x-auto">
    <DataTable :data="this.couponLog" class="display px-4">
      <thead>
        <tr>
          <th>이름</th>
          <th>닉네임</th>
          <th>학과</th>
          <th>전화번호</th>
          <th>이메일</th>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>

<script>
import AdminService from '../../Service/AdminService';

import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net-bs5';
import 'datatables.net-select-bs5';

DataTable.use(DataTablesLib);


export default {
  name: 'CouponLog',
  components: {
    DataTable
    },  
  data () {
    return {
      couponLog:[],
    }
  },
  async created(){
    await AdminService.getUserInfo().then(
      (res)=>{
        console.log(res.data)
        res.data.forEach(item => {

            let temp = [item.name,item.nickName,item.major,item.phoneNumber,item.email]
            
            this.couponLog.push(temp)
            
        });
      }
    )
    console.log(this.couponLog)
  },
  methods:{

  },
}

</script>
<style scoped>
@import 'datatables.net-dt';
th,tr{
  min-width: 3rem;
}
</style>