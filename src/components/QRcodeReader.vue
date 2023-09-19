<template>
    <qrcode-stream @detect="onDetect" @init="onInit" class="w-3/4 m-auto"></qrcode-stream>
</template>
  
<script>
import { QrcodeStream} from 'vue-qrcode-reader'

export default {
    name: "QRcodeReader",
    components:{
        QrcodeStream,
    },
    data() {
        return {
            result: '',
            error : '',
        }
  },
  methods: {
    onDetect (detectedCodes) {
      this.result = detectedCodes
      console.log(this.result)
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }

}
</script>

