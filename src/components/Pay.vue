<template>
    <section class="test">
        <v-btn class="me-4 mt-4" @click="PaymentBtn">
            결제하기
        </v-btn>
        <div class="moneyButton" @click="PaymentBtn">결제</div>
        <input type="number" placeholder="금액 입력" v-model="price">
        <div class="moneyButton" @click="cancelPay">환불하기</div>
    </section>
</template>
  
<script>
import jquery from 'jquery';
let IMP;

// Client-side-only code
IMP = window.IMP; // 생략 가능
console.log("IMP : ", IMP);
IMP.init("imp80446112");

export default {
    name: "payPage",
    data() {
        return {
            price: 0
        }
    },
    created() {
        document.cookie = "safeCookie1=foo; SameSite=Lax";
        document.cookie = "safeCookie2=foo";
        document.cookie = "crossCookie=bar; SameSite=None; Secure";
    },
    methods: {
        cancelPay() {
            jquery.ajax({
                // 예: http://www.myservice.com/payments/cancel
                // https://api.iamport.kr/payments/cancel
                "url": "{./}",
                "type": "POST",
                "contentType": "application/json",
                "data": JSON.stringify({
                    "merchant_uid": "{order_no_0001}", // 예: ORD20180131-0000011
                    "cancel_request_amount": 1, // 환불금액
                    "reason": "테스트 결제 환불", // 환불사유
                    // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
                    "refund_holder": "정도훈",
                    // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
                    "refund_bank": "04",
                    // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
                    "refund_account": "93800200017396"
                }),
                "dataType": "json"
            });
        },
        PaymentBtn: function () {
            IMP.init("imp80446112");
            IMP.request_pay({
                pg: 'html5_inicis.INIpayTest', //테스트 시 html5_inicis.INIpayTest 기재 
                pay_method: 'card',
                merchant_uid: "order_no_0004", //상점에서 생성한 고유 주문번호 order_no_0001
                name: '주문명:결제테스트',
                amount: 1,  // 결제 총 금액
                buyer_email: 'wjdehgns97@naver.com',
                buyer_name: '정도훈',
                buyer_tel: '010-3175-8735',   //필수 파라미터 입니다.
                // buyer_addr: '서울특별시 강남구 삼성동',
                // buyer_postcode: '123-456',
                // m_redirect_url: '{https://www.naver.com/}',
                escrow: true, //에스크로 결제인 경우 설정
                vbank_due: 'YYYYMMDD',
                bypass: {
                    acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
                    P_RESERVED: "noeasypay=Y",  // 간편결제 버튼을 통합결제창에서 제외(모바일)
                    // acceptmethod: 'cardpoint',  // 카드포인트 사용시 설정(PC)
                    // P_RESERVED: 'cp_yn=Y',     // 카드포인트 사용시 설정(모바일)
                },
                period: {
                    from: "20200101", //YYYYMMDD
                    to: "20201231"   //YYYYMMDD
                }
            }, response => { // callback
                console.log(response);
                if (response.success) {
                    console.log("결제 성공")
                    this.$router.push("/complete")

                } else {
                    console.log("결제 실패");
                }
            });

        },
    }
}
</script>
  
  
<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input {
    width: 300px;
    border: 0;
    border-bottom: 1px #a8a8a8 solid;
    margin: 0 10px 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
    outline: none;
}

.test {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.moneyButton {
    width: 200px;
    height: 40px;
    background-color: #ffffff;
    border: 1px #a8a8a8 solid;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>

<!-- <template>
    <div></div>
</template>
  
<script>
export default {
    name: "payPage",
};
</script> -->