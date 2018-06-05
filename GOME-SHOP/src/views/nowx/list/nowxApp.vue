<template>
    <div class="nowx-box">
        <div class="info_mark">
        </div>
        <p class="info-text">请在微信客户端打开链接</p>
        <div class="qrcode-box">
            <p class="qrcode-info">关注【国美美店服务号】</p>
            <p class="qrcode-info">一键邀请美店VIP店主</p>
            <div class="qrcode-img">
            </div>
            <p class="qrcode-supplement">截图保存二维码至相册</p>
            <p class="qrcode-supplement">微信扫码关注，即可查看邀请方式</p>
        </div>
    </div>  
</template>
<script type="text/javascript">
</script>
<style type="text/css">
    html,body{
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
</style>
<style type="text/css" lang="scss" scoped>
    @import '../../../common/css/mixin';
    .nowx-box{
        width: 100%;
        height: 100%;
        .info_mark{
            width: 0.9rem;
            height: 0.9rem;
            margin: 0 auto;
            margin-top: 0.5rem;
            @include bg-image('../images/info_mark');
            background-size: 100%; 
        }
        .info-text{
            margin: 0;
            padding: 0;
            margin-top: 0.3rem;
            width: 100%;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 0.2rem;
            color: #333333;
        }
        .qrcode-box{
            margin-top: 1.07rem;
            .qrcode-info{
                font-family: PingFangSC-Regular;
                font-size: 0.14rem;
                color: #333333;
                width: 100%;
                text-align: center;
            }
            .qrcode-img{
                width: 1.4rem;
                height: 1.4rem;
                margin: 0.1rem auto;
                @include bg-image('/static/img/qrcode');
                background-size: 100%;
            }
            .qrcode-supplement{
                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                color: #666666;
                width: 100%;
                text-align: center;
            }
        }
    }
</style>