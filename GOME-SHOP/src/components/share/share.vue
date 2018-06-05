<template>
    <div class="share">
        <caside ref="aslider" :dontRoute="true" :direction="'bottom'" :position="30">
            <div class="m-share-bottom">
                <ul class="share-list">
                    <div v-for="(item, index) in shareData" :key="index">
                        <li class="item"  @click="toshare(item.shareClass)" :shareType="item.shareClass">
                            <a href="javascript:;" :class="item.shareClass">
                                <em class="share-icon"></em>
                                <p class="share-txt">{{item.shareText}}</p>
                            </a>
                        </li>    
                    </div>
                </ul>
                <a href="javascript:;" class="share-close" @click="close">取消</a>
            </div>
        </caside>   
        <div class="m-share-top" v-show="isWxMsgShow" @click="wxMsgHide"></div>
         <!-- <div class="m-mask-private" id="share_panel" ></div>  -->
    </div>    
</template>    

<script>
    import Vue from 'vue'
    // import Env from 'gome-utils-env'
    import Aside from '../aside/aside'
    export default  Vue.extend({
        components: {
            'caside': Aside,
        },
        data (){
            return {
                shareData : [
                    {
                        shareClass : 'weibo',
                        shareText : '微博'
                    },
                    {
                        shareClass : 'weixin',
                        shareText : '微信'
                    },
                    {
                        shareClass : 'friends',
                        shareText : '朋友圈'
                    },
                    {
                        shareClass : 'qq',
                        shareText : 'QQ'
                    },
                    {
                        shareClass : 'qzone',
                        shareText : 'QQ空间'
                    }
                ],
                isWxMsgShow : false,
                isWeixin : false,
                isQQ : false,
                isWeiBo : false,
                isShare : false,
            }
        },
        created (){
            const ua = window.navigator.userAgent
            if (ua.match(/Weibo/i)) {
                this.isWeiBo = true
            } else if (ua.match(/QQ\//i) == "QQ/") {
                this.isQQ = true
            } else if (ua.match(/MicroMessenger/i)) {
                this.isWeixin = true
            }
            if (this.isWeixin || this.isQQ) {
                console.log('aaa')
                if (!window.wx) {
                    var script = document.createElement("script")
                    script.type = "text/javascript"
                    // script.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
                    script.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js'
                    document.body.appendChild(script);
                }
            }
        },
        mounted (){
            this.$nextTick( () => {
                this.$refs.aslider.in()
            })
        },
        methods: {
            toshare (shareType) {
                if(shareType == 'qq' || shareType == 'friends'){
                    shareType = 'weixin'
                }  
                this.sharetype(shareType)
            },
            sharetype (type) {
                switch(type){
                    case 'weibo':  //weibo
                        if(this.isWeixin || this.isQQ){
                            this.$toast('微信或QQ内暂不支持微博分享')
                            return false
                        }else{
                            console.log(this.sina_links)
                            const bdurl = (this.sina_links.indexOf('?') > -1?(this.sina_links +'&source=w-xlwb'):
                                (this.sina_links +'?source=w-xlwb')) + '&version=' + (+new Date())

                            let search = '?url='+encodeURIComponent(bdurl)+'&title='+encodeURIComponent(this.sina_titles)+
                            '&pic='+encodeURIComponent(this.sina_imgs)+'&desc='+encodeURIComponent(this.sina_descs);
                            search += '&appkey=1343713053&searchPic=true'

                            // location.assign('http://service.weibo.com/share/mobile.php'+search)
                            location.assign('//service.weibo.com/share/mobile.php'+search)
                        }               
                        break;

                    case 'qzone':   //QQ空间
                        if(this.isWeixin){
                            if (window.wx) {
                                this.Wxinit()
                            }
                            this.isWxMsgShow = true
                        }else{
                            const bdurl = (this.qq_zone_links.indexOf('?') > -1?(this.qq_zone_links +'&source=w-Qqzone'):
                                (this.qq_zone_links +'?source=w-Qqzone')) + '&version=' + (+new Date());
                                
                            let search = '?url='+encodeURIComponent(this.bdurl)+'&title='+encodeURIComponent(this.qq_zone_titles)+
                            '&pic='+encodeURIComponent(this.qq_zone_imgs)+'&desc='+encodeURIComponent(this.qq_zone_descs);
                            search += '&appkey=1343713053&searchPic=true';                
                        //    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'+search,"","_blank");break;
                           window.open('//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'+search,"","_blank");break;
                        }
                        break;
                        
                    case 'weixin': //微信
                        if(this.isWeixin || this.isQQ){
                            if (window.wx) {
                                this.Wxinit()
                            }
                            this.close()              
                            this.isWxMsgShow = true
                        }else{
                            this.$toast('请用浏览器自带分享功能分享')   

                        }
                        break;
                }
            },
            close () {
                this.$refs.aslider.out()
                this.$emit('destroy')
                // this.$destroy()
            },
            wxMsgHide () {
                this.isWxMsgShow = false
                this.close()
            },
            Wxinit () {
                wx.ready( ()=> {
                    this.isShare = true
                    // if (typeof WeixinJSBridge == "undefined"){
                    //     if( document.addEventListener ){
                    //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    //     }else if (document.attachEvent){
                    //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    //     }
                    // }else{
                    //     onBridgeReady();
                    // }
                    this.oWXready()
                    // 执行分享方法
                    this.setShareData();
                });
            },
            oWXready () {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                    }else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                    }
                }else{
                    this.onBridgeReady();
                }
            },
            onBridgeReady () {
                if (this.isShare) {
                    wx.showOptionMenu();
                    // wx.hideMenuItems ({
                    //     menuList: [
                    //         "menuItem:share:qq",
                    //         "menuItem:share:weiboApp",
                    //         "menuItem:favorite",
                    //         "menuItem:share:QZone"
                    //     ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    // });
                } else {
                    wx.hideOptionMenu();
                }
            },
            setShareData () {
                const shareTitie = this.qq_zone_titles
                const shareDesc = this.qq_zone_descs
                const shareLink = this.qq_zone_links
                const shareImgUrl = this.qq_zone_imgs
                if(this.isShare){
                    // 分享给朋友
                    wx.onMenuShareAppMessage({
                        title: shareTitie, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: shareLink, // 分享链接
                        imgUrl: shareImgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                        
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            
                        }
                    })
                // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: shareTitie, // 分享标题
                        link: shareLink, //分享链接
                        imgUrl: shareImgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                        }
                    })
                    
                    //QQ
                    wx.onMenuShareQQ({
                        title: shareTitie, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: shareLink, // 分享链接
                        imgUrl: shareImgUrl, // 分享图标
                        success: function () {
                            
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                    // QQ空间
                    wx.onMenuShareQZone({
                        title: shareTitie, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: shareLink, // 分享链接
                        imgUrl: shareImgUrl, // 分享图标
                        success: function () {
                            
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    })

                    wx.onMenuShareWeibo({
                        title: shareTitie, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: shareLink, // 分享链接
                        imgUrl: shareImgUrl, // 分享图标
                        success: function () {
                            
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    })
                }
            },
        },
        component (){
            this.$refs.aslider.in()
        }
        
    })
// @import '../../gome-ui-css-v/layout.less';
 
</script>
<style lang="less">
@import './layout.less';

aside-container aside.bottom.size-25 {
    height: 25%;
}
.aside-page {
    height: 100%;
    .flexbox();
    .flexbox.vertical();
    .content {
        .flexitem(1);
        .flexbox();
        .flexbox.center();
    }
}
.share{
    a:active, a:link, a:visited, a:hover {
        color: #333;
    }
    .m-share-top,.m-share-bottom {
        background-color: #fff;
        // position: fixed;
        // left: 0;
        // right: 0;
        // bottom: -100%;
        // z-index: 40010;
        .share-list{
            display: block;
            padding-top: 0.21rem;
            overflow: hidden;
        }
        .item{
            width: 20%;
            float: left;
            text-align: center;
        }
        .share-icon{
            width: 0.49rem;
            height: 0.50rem;
            display: block;
            margin: auto;
            overflow: hidden;
            background: url('//js.gomein.net.cn/plus/plus-public/images/public/share.png') no-repeat -99rem -99rem;
            background-size: 0.48rem 2.63rem;
        }
        .weibo .share-icon{
            background-position: 0 0;
        }
        .weixin .share-icon {
            background-position: 0rem -0.53rem;
        }
        .friends .share-icon {
            background-position: 0rem -1.07rem;
        }
        .qq .share-icon {
            background-position: 0rem -1.6rem;
        }
        .qzone .share-icon {
            background-position: 0rem -2.14rem;
        }
        .share-txt {
            padding-top: 0.15rem;
            padding-bottom: 0.2rem;
        }
        .share-close {
            height: .5rem;
            font-size: 0.14rem;
            line-height: .5rem;
            display: block;
            text-align: center;
            border-top: 1px solid #E4E4E4;
        }
    }
    .m-share-top {
        top: 0;
        bottom: auto;
        padding-bottom: 0.15rem;
        background: none;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1010;
        // background: rgba(0,0,0,0.7) url(./images/sharepop.png?v=20171205) no-repeat 0 0;
        background: rgba(0,0,0,0.7) url('//js.gomein.net.cn/plus/plus-public/images/public/sharepop.png?v=20170921') no-repeat 0 0;
        // background: rgba(0, 0, 0, 0.7) url(http://css.pre.meixincdn.com/m/h5/dist/images/sharepop.png) no-repeat 0 0;
        background-size: 100% auto;
        display: block;
        img {
            vertical-align: middle;
            display: inline-block;
        }
        dt {
            text-align: right;
            padding: 0.25rem 0.25rem 0rem;
            img {
                width: 2rem;
            }
        }
        dd {
            color: #FFF;
            font-size: 0.48rem;
            text-align: center;
            margin-top: 0.15rem;
        }
        dd:nth-of-type(1) img {
            width: 1.8rem;
        }
        dd:nth-of-type(2) img {
            width: 0.6rem;
        }  
    }
    .m-share-bottom {
        background-color: #fff;
        position: relative;
        left: 0;
        bottom: 0%;
        z-index: 40010;
    }
    .share-txt{
        font-size:0.14rem;
    }
    .m-mask-private {
        display: block;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 40000; 
    }
}
   
</style>
  
