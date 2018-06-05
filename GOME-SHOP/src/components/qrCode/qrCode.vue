<template>
        <div id="qrcode" :style="this.data.style" ref="qr"></div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    props:['data'],
    data () {
        return {
            qrcode:{}
        }
    },
    created(){
        this.$nextTick(function () {
        // DOM操作
        let canvas = this.$refs.qr
        this.getCode(canvas);
        })
        
    },
    computed:{
         
    },
    methods:{
        async getCode (canvas) {
            // console.log('qr',this.data.url)
            this.qrcode = new QRCode(canvas, {
                text: this.data.url,
                width:  this.data.width,
                height:  this.data.height,
                colorDark: this.data.colorDark,
                colorLight: this.data.colorLight
            });
        }
    },
    watch:{
        data: {
            deep: true,
            handler(oldval,newval){
                // console.log(oldval,newval);
                this.qrcode.clear();
                this.qrcode.makeCode(this.data.url)
            }
        }
        
    }
}
    
</script>

<style>
/* #qrcode{
    display: inline-block;
} */
</style>
