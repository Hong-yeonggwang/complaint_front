<template>
    <div class="pr-8 my-4">
        <div @click="backPage()">
            <div class="float-right border rounded-lg bg-sky-100 hover:bg-sky-200 p-2 shadow-lg">이전 페이지로</div>
        </div>
        <div class="clear-both"></div>
    </div>
    <div class="p-4">
        <div>
            <qrcode-stream  @detect="onDetect"></qrcode-stream>
        </div>
    </div>
    <img :src="require(`@/assets/qrNotice.png`)">
    
    <div v-for="(qrcode,index) in qrcodeList" :key="index" >
        <div class="absolute w-full top-32 left-0" v-if="qrcode.messageCodeFlag">
            <div class="w-fit m-auto rounded-xl shadow-lg border text-center p-4 bg-sky-50">
                <div @click="this.closePop(index)" class="border w-fit float-right bg-sky-100 hover:bg-sky-200 p-1 rounded-lg text-sm">닫기</div>
                <div class="clear-both"></div>
                <ul class="text-left">
                    <li class="tracking-wider">코드:
                        <span>{{qrcode.qrcode}}</span>
                    </li>
                </ul>
                <button @click="this.useQRcode(qrcode.qrcode,index)" class="w-3/4 border rounded-lg mt-3 m-auto bg-sky-100 hover:bg-sky-200">확인</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import UserService from '../../Service/UserService'

export default {
    name: "QRcodeReader",
    components:{
        QrcodeStream,
    },
    data() {
        return {
            error : '',
            qrcodeList:[],
        }
  },
  methods: {
    closePop(index){
        this.qrcodeList[index].messageCodeFlag = false
    },
    onDetect(detectedCodes) {
        console.log(detectedCodes)
        detectedCodes.forEach((qrcode)=> {
            let pushData = {
                qrcode:qrcode.rawValue,
                messageCodeFlag:true
            }
            this.qrcodeList.push(pushData)
        });
    },
    useQRcode(qrCodeSerial,index){
        UserService.useQrcode(qrCodeSerial)
        .then((res)=>{
            if(res.data.msg == '사용이 완료되었습니다.'){
                var audio = new Audio(require(`@/assets/usedVoice.mp3`));
                audio.play();
            }
            else{
                var audio1 = new Audio(require(`@/assets/ddeang.mp3`));
                audio1.play();
            }
            alert(res.data.msg);
            this.closePop(index);
        }
        )
    },
    backPage(){
        const videoElement = document.getElementsByTagName('video'); // 미디어 요소 선택
        console.log(videoElement)
        videoElement[0].pause(); // 재생 중지
        videoElement[0].remove(); // 요소 삭제
        this.$router.push({ name: 'OperatorMain'});
    }
  }

}
</script>

