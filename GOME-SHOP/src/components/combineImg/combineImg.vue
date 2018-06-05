<template>
    <div class="combine-image">
        <canvas ref="canvas" class="main-canvas" v-show="true"></canvas>
        <img :src="imgUrl" ref="image" class="main-image" crossorigin="anonymous">
        <QrCode :data="data" ref="qrcode" v-show="false"></QrCode>
        <img :src="src" class="combile-image-img" v-show="finish" ref="finalImage" :style="imgStyle">
    </div>
</template>
<script>
import QrCode from 'components/qrCode/qrCode.vue';
export default {
    props: ['imgUrl', 'qrCodeUrl'],
    components: {
        QrCode
    },
    data() {
        return {
            data: {
                width : 200,
                height : 200,
                colorDark : "#000000",
                colorLight : "#ffffff",
                url: this.qrCodeUrl
            },
            finish: false,
            src: '',
            imgStyle: {}
        }
    },
    mounted() {
        var canvas = this.$refs.canvas;
        var ctx = canvas.getContext('2d');
        var img = this.$refs.image;
        var imgWidth, imgHeight, canvasWidth, canvasHeight;
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.body.clientHeight;
        var qrcode = null;

        img.crossOrigin = "Anonymous";
        img.onload = () => {
            imgWidth = img.offsetWidth;
            imgHeight = img.offsetHeight;
            canvas.width = imgWidth;
            canvas.height = imgHeight;

            if (imgWidth / imgHeight > clientWidth / clientHeight) {
                canvasWidth = clientWidth;
                canvasHeight = imgHeight / imgWidth * clientWidth;
                canvas.style.width = canvasWidth + 'px';
                canvas.style.height = canvasHeight + 'px';
            } else {
                canvasHeight = clientHeight;
                canvasWidth = imgWidth / imgHeight * clientHeight;
                canvas.style.width = canvasWidth + 'px';
                canvas.style.height = canvasHeight + 'px';
            }
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            img.style.display = 'none';
            var timer = setInterval(() => {
                if (this.$refs.qrcode.$el.querySelector('canvas')) {
                    qrcode = this.$refs.qrcode.$el.querySelector('canvas');
                    clearTimeout(timer);
                    var trueWidth = 90;
                    var trueHeight = 90;
                    var qrCodeWidth = trueWidth * canvas.width / canvasWidth;
                    var qrCodeHeight = trueHeight * canvas.height / canvasHeight;
                    var rightOffset = 25 * canvas.width / canvasWidth;
                    var bottomOffset = 22 * canvas.height / canvasHeight;
                    ctx.drawImage(qrcode, canvas.width - rightOffset - qrCodeWidth, canvas.height - bottomOffset - qrCodeHeight, qrCodeWidth, qrCodeHeight);

                    // 添加二维码下方文字
                    ctx.font = '12px Arial';
                    ctx.fillStyle = '#5A6066';
                    ctx.fillText('长按图片识别二维码', canvas.width - rightOffset - qrCodeWidth - 10, canvas.height - bottomOffset + 15);

                    this.src = canvas.toDataURL('image/png');
                    
                    this.imgStyle = {
                        width: canvasWidth + 'px',
                        height: canvasHeight + 'px'
                    }
                    this.finish = true;
                }
            }, 100)
        }
    }
}
</script>
<style lang="scss">
.combine-image {
    .main-image {
        position: absolute;
        display: block;
        visibility: hidden;
    }
    .main-canvas {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    .combile-image-img {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}

</style>
