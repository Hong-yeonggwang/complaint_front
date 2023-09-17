<template>
    <div class="border rounded-2xl m-4 ">
        <div class="mx-4 mt-6 pb-2 border-b-2">
            <div class="text-2xl">구매완료</div>
            <div>구매완료 되었습니다.</div>
        </div>

        <div class="overflow-y-auto">
            <!-- 구매자 정보 -->
            <div class="w-10/12 m-auto bg-slate-100 rounded-xl p-3 mt-4">
                <div class="float-left mr-4 w-24">구매자 정보</div>
                <div class="float-left">
                    <div>용용이</div>
                    <div>010-1234-5678</div>
                    <div class="clear-both"></div>
                </div>
                <div class="clear-both"></div>
            </div>
            <!-- 주문 번호 -->
            <div class="w-10/12 m-auto bg-slate-100 rounded-xl p-3 mt-4">
                <div class="float-left mr-4 w-24">주문번호</div>
                <div class="float-left">23091100001</div>
                <div class="clear-both"></div>
            </div>
            <!-- 구매 정보 -->
            <div class="w-10/12 m-auto bg-slate-100 rounded-xl p-3 mt-4 mb-4">
                <div class="float-left mr-4 w-24">결제 상세</div>
                <div class="float-left">
                    <div v-for="(item, index) in completeMenus" :key="index" v-bind:value="item.value">
                        <div>{{ item.title }}</div>
                        <div>{{ item.price }}원 * {{ item.quantity }}장</div>
                        <div class="mb-2">총 : {{ calculateItemAmount(item) }}원</div>
                    </div>
                    <div>최종 결제 금액 : {{ calculateFinalPaymentAmount }}원</div>
                </div>
                <div class="clear-both"></div>
            </div>
        </div>
    </div>
</template>
<!-- https://saedu.naver.com/notice/view.naver?notiSeq=3910&catg=&fixYn=N&searchOpt=all&keyword= -->
<script>
export default {
    name: 'completePage',
    data() {
        return {
            completePage: [
                { title: '구매완료', value: 'complete', info: '구매완료 되었습니다.' },
            ],
            completeMenus: [
                { title: '인성관 #A - 4000', price: 4000, quantity: 3, value: 'StudentUnionA' },
                { title: '환과대 #A - 4500', price: 4500, quantity: 3, value: 'HealthScienceA' },
                { title: '생활관 #A - 3500', price: 3500, quantity: 3, value: 'StudentDomA' },
            ],
        }
    },
    computed: {
        calculateItemAmount() {
            return (item) => {
                return item.price * item.quantity;
            }
        },
        calculateFinalPaymentAmount() {
            let finalPaymentAmount = this.completeMenus.reduce((sum, item) => sum + this.calculateItemAmount(item), 0);
            return finalPaymentAmount;
        }
    }
}
</script>