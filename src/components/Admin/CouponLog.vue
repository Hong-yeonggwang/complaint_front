<template>
  <div @click="$router.push({name:'seviceStatus'})" class="my-4 mr-4 border text-lg w-fit px-4 py-1 rounded-xl bg-sky-50 float-right">이전 페이지로</div>
  <div class="clear-both"></div>
  <div class="w-11/12 m-auto overflow-x-auto">
    <DataTable :data="this.couponLog" class="display px-4 ">
      <thead>
        <tr>
          <th>번호</th>
          <th>사용장소</th>
          <th>가격</th>
          <th>쿠폰번호</th>
          <th>사용여부</th>
          <th>사용자</th>
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
    await AdminService.getCouponLog().then(
      (res)=>{
        console.log(res.data)
        res.data.forEach(item => {
          let userSeq  = item.userMemberSeq
          if(item.userMemberSeq == null){
            userSeq = '없음'
          }
          let temp = [item.qrCategorySeq,item.qrCodeCategory.name,item.qrCodeCategory.price,item.serial,item.status,userSeq]
          
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
th,td{
  min-width: 3.5rem;
}
</style>