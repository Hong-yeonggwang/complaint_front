<template>
    <qrcode-stream @detect="onDetect">
    </qrcode-stream>
    <div class="absolute w-full top-20 left-0" v-if="this.messageCodeFlag">
        <div class="w-1/2 m-auto rounded-xl shadow-lg border text-center p-4 bg-sky-50">
            <div class="w-fit float-right bg-sky-100 hover:bg-sky-200 p-1 rounded-lg text-sm">닫기</div>
            <div class="clear-both"></div>
            <ul class="text-left">
                <li class="tracking-wider">사용자: 
                    <span>홍영광</span>
                </li>
                <li class="tracking-wider">코드:
                    <span>AAD-125</span>
                </li>
                <li class="tracking-wider">이름:
                    <span>강남행</span>
                </li>
            </ul>
            <button class="w-3/4 border rounded-lg mt-3 m-auto bg-sky-100 hover:bg-sky-200">확인</button>
        </div>
    </div>
    
</template>
  
<script>
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
    name: "QRcodeReader",
    components:{
        QrcodeStream,
    },
    data() {
        return {
            result: '',
            error : '',
            messageCodeFlag:false,
        }
  },
  methods: {
    onDetect (detectedCodes) {
      this.result = detectedCodes
      console.log(this.result)
      this.messageCodeFlag = true
    },
  }

}
</script>

