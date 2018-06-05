<template>
    <div id="openSuccess">
        <!-- <div id='headerTop'><i></i>开通成功</div> -->
        <headTop id='headerTop' :titleName="titleName"></headTop>
        <vu-loading type="gradient-circle" color="black" class="loading-time" v-if="isShow === false"/>
        <div id="main" v-if="isShow === true" >
            <div class="uererInfo">
                <div class="photo"><span class="photoInfo"></span></div>
                <!-- <div class="name">{{vipInfo.nickName}}</div> -->
                <div class="tips">恭喜您已成功开通VIP</div>
            </div>
            <div class="privilege">
                <div class="title">您已获得<span>VIP店主专属特权</span></div>
                <div class="list">
                    <ul>
                        <li><div><i></i></div><div>高额返利</div></li>
                        <li><div><i></i></div><div>佣金叠加</div></li>
                        <li><div><i></i></div><div>VIP大礼包</div></li>
                        <li><div><i></i></div><div>240元红包</div></li>
                        <li><div><i></i></div><div>专属导师</div></li>
                        <li><div><i></i></div><div>专享价格</div></li>
                        <li><div><i></i></div><div>随时提现</div></li>
                        <li><div><i></i></div><div>试用特权</div></li>
                    </ul>
                </div>
            </div>
            <div class="coupon">
                <div class="title couponTitle">您已获得<span>VIP店主专属优惠券</span></div>
                <div class='find'>请至国美账户中查看</div>
                <div class="couponList">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <a href="javascript:;" @click="checkVip()"><div class="joinBtn">进入特权管理</div></a>
        </div>
    </div>

</template>

<script>
    import headTop from 'components/sysheader'; // 引入任务体系公共header
    import {env, system} from 'common/js/env';  
    import {encode} from 'common/js/utils.js';  
    import {getVipInfo} from '../../../api/manageInfo.js';
    import { Toast } from 'vui';
    export default {
        props: [],
        data(){
            return {
                titleName:'开通VIP成功',
                vipInfo:'',
                isShow:true,
                text4: second => `倒计时 ${second} 秒`
            }
        },
        components:{
            headTop
        },
        created(){
            // this.getVipInfo();
            // setTimeout(
            //     () => {
            //         this.isShow = true;
            //         this.getVipInfo();
            //     },3000
            // );
        },
        methods:{
            // async getVipInfo(){
            //     let res = await getVipInfo();
            //     if(env.wechat){
            //     //alert('我的运行环境是微信--我的头部要隐藏掉');
            //         document.getElementById('main').style.top=0;
            //     } 
			// 	res=res.data;
			// 	console.log(res);
			// 	if(res.code ==0){
            //         let vipType = res.data.vipType;
            //         if(vipType){
            //             vipType = vipType.toLowerCase();
            //             if(vipType == 'vip'){
            //                 this.vipInfo = res.data;
            //             }else if(vipType == 'normal'){//普通用户跳转vip开通页
            //                 window.location.href='/views/vipPrivilegeOpen/vipPrivilegeOpen.html'
            //             }else if(vipType == 'svip'){//svip用户跳转特权管理页面
            //                 window.location.href='/views/vipPrivilegeManage/vipPrivilegeManage.html'
            //             }
            //         }
			// 	}else if(res.code==1104){
			// 		let host = window.location.host;
            //         let reg = RegExp(/atguat/);
            //         //let reg2 = RegExp(/gome|gomeplus/);
            //         if(reg.test(host)){
            //             window.location.href='http://login.m.atguat.com.cn/login.html?return_url='+encode(window.location.href)
            //         }else{
            //             window.location.href='http://login.m.gome.com.cn/login.html?return_url='+encode(window.location.href)
            //         }
			// 	}else {
			// 		this.$toast({
            //             duration: 2000,       // 持续展示 toast
            //             forbidClick: true, // 禁用背景点击
            //             message: '亲，你的手机网络不太顺畅喔~',
            //         });
			// 	}
            // },
            async checkVip(){
                let res = await getVipInfo();
                res=res.data;
				console.log(res);
				if(res.code === 0){
                    let vipType = res.data.vipType;
                    if(vipType){
                        vipType = vipType.toLowerCase();
                        // if(vipType == 'vip'){
                        //     this.vipInfo = res.data;
                        // }else if(vipType == 'normal'){//普通用户跳转vip开通页
                        //     window.location.href='/views/vipPrivilegeOpen/vipPrivilegeOpen.html'
                        // }else if(vipType == 'svip'){//svip用户跳转特权管理页面
                        //     window.location.href='/views/vipPrivilegeManage/vipPrivilegeManage.html'
                        // }
                        if(vipType === 'normal'){
                            const toast = this.$toast.loading({
                            duration: 0,
                            forbidClick: true,
                            message: '疯狂加载中，请耐心等待'
                            });

                            let second = 10;
                            const timer = setInterval(() => {
                            second--;
                            if (second) {
                                // toast.message = '疯狂加载中请耐心等待';
                            } else {
                                clearInterval(timer);
                                this.$toast.clear();
                                this.toGetInfo();
                            }
                            }, 1000);
                        } else if (vipType === 'vip'){
                            window.location.href='/views/vipPrivilegeManage/vipPrivilegeManage.html'
                        } else if (vipType === 'svip'){
                            window.location.href='/views/vipPrivilegeManage/vipPrivilegeManage.html'
                        }
                    }
				} else if (res.code === 1104){
					let host = window.location.host;
                    let reg = RegExp(/atguat/);
                    //let reg2 = RegExp(/gome|gomeplus/);
                    if(reg.test(host)){
                        window.location.href='http://login.m.atguat.com.cn/login.html?return_url='+encode(window.location.href)
                    }else{
                        window.location.href='http://login.m.gome.com.cn/login.html?return_url='+encode(window.location.href)
                    }
				}
                
            },
            async toGetInfo(){
                let res = await getVipInfo();
				res=res.data;
				console.log(res);
				if(res.code ==0){
                    let vipType = res.data.vipType;
                    if(vipType){
                        vipType = vipType.toLowerCase();
                        if(vipType == 'normal'){//普通用户跳转vip开通页
                            window.location.href='/views/vipPrivilegeOpen/vipPrivilegeOpen.html'
                        }else if(vipType == 'svip'){//svip用户跳转特权管理页面
                            window.location.href='/views/vipPrivilegeManage/vipPrivilegeManage.html'
                        }else if(vipType == 'vip'){
                            window.location.href='/views/vipPrivilegeManage/vipPrivilegeManage.html'
                        }
                    }
				}
            }
        },
        mounted(){
			if(env.wechat){
                //alert('我的运行环境是微信--我的头部要隐藏掉');
                document.getElementById('headerTop').style.display='none';//头部隐藏
                document.getElementById('main').style.top=0;
			} 
            
		}
    };
</script>

<style>
.vu-toast--default{
    width: 2rem !important;
}
</style>

<style lang='scss' rel="stylesheet/scss" type="text/css">
    @import '../../../common/css/mixin';
    #openSuccess{
        width:100%;
        height: 100%;
        background: #F3F5F7;
        position: relative;
        #headerTop{
            width: 100%;
            position: absolute;
            top:0;
            left: 0;
            z-index: 100;
            background: #fff;
            border-bottom: 0.01rem solid #DDDDDD;
        }
        .loading-time{
            position: absolute;
            top:0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            
        }
        #main{
            width: 100%;
            position: absolute;
            top:0.44rem;
            left: 0;
            bottom:0;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            //margin-top: 0.44rem;
            //padding-bottom:0.3rem; 
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 0; 
            }
            .uererInfo{
                width: 100%;
                height: 1.5rem;
                text-align: center;
                background-size: 100%;
                @include bg-image('/static/img/openSuccessBG');
                .photo{
                    font-size: 0;
                    padding-top:0.13rem;
                    span,img{
                        display: inline-block;
                        width: 0.86rem;
                        height: 0.92rem;
                        border: 0;
                        // border-radius: 0.45rem;
                    }
                    .photoInfo{
                        @include bg-image('/static/img/vxunzhang');
                        border: 0;
                        background-size: 100% 100%;
                    }
                }
                .name{
                    font-family: PingFangSC-Regular;
                    font-size: 0.13rem;
                    color: #FFFFFF;
                    line-height: 0.18rem;
                    letter-spacing: 0;
                    padding: 0.05rem 0 0.1rem 0;
                }
                .tips{
                    font-family: PingFangSC-Regular;
                    font-size: 0.16rem;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    line-height: 0.22rem;
                }
            }
            .privilege{
                width: 100%;
                margin-bottom: 0.1rem;
                background: #fff;
                .list{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0.3rem 0.35rem 0 0.35rem;
                    ul{
                        display: -webkit-flex; /* Safari */
                        display: flex;
                        flex-flow:row wrap;
                        justify-content:space-between;
                        align-content:space-between;
                        
                        font-family: PingFangSC-Regular;
                        font-size: 0.12rem;
                        color: #333333;
                        li{
                            text-align: center;
                            width:0.67rem;
                            margin-bottom:0.3rem; 
                            i{
                                display: inline-block; 
                                width: 0.28rem;
                                height: 0.28rem;
                                margin-bottom: 0.1rem;
                            }
                            &:nth-child(1){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/highMoney');
                                }
                            }
                            &:nth-child(2){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/commission');
                                }
                            }
                            &:nth-child(3){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/vipPackage');
                                }
                            }
                            &:nth-child(4){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/redEnvelopes');
                                }
                            }
                            &:nth-child(5){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/tutor');
                                }
                            }
                            &:nth-child(6){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/price');
                                }
                            }
                            &:nth-child(7){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/wthdrawals');
                                }
                            }
                            &:nth-child(8){
                                i{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/try');
                                }
                            }
                        }
                    }
                }
            }
            .coupon{
                width: 100%;
                height: 2.7rem;
                background: #fff;
                .find{
                    text-align: center;
                    margin-top:0.1rem;
                    font-family: PingFangSC-Regular;
                    font-size: 0.13rem;
                    color: #999999;
                    letter-spacing: 2px;
                    line-height: 0.18rem;
                }
                .couponList{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0.3rem 0.15rem;
                    ul{
                        display: -webkit-flex; /* Safari */
                        display: flex;
                        flex-flow:row wrap;
                        justify-content:space-between;
                        align-content:space-between;
                        li{
                            display: inline-block;
                            width: 1.65rem;
                            height: 0.58rem;
                            &:nth-child(1),&:nth-child(2){
                                margin-bottom: 0.15rem;
                            }
                            &:nth-child(1){
                                background-size: 100%;
                                @include bg-image('../../../common/images/coupon-100');
                            }
                            &:nth-child(2){
                                background-size: 100%;
                                @include bg-image('../../../common/images/coupon-50');
                            }
                            &:nth-child(3){
                                background-size: 100%;
                                @include bg-image('../../../common/images/coupon-30');
                            }
                            &:nth-child(4){
                                background-size: 100%;
                                @include bg-image('../../../common/images/coupon-10');
                            }
                        }
                    }
                }
            }
            .joinBtn{
                width: 2.95rem;
                height: 0.5rem;
                text-align: center;
                line-height: 0.5rem;
                margin:0.3rem auto 0 auto;
                background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
                border-radius: 100px;
                font-family: PingFangSC-Regular;
                font-size: 0.16rem;
                color: #2F3245;
                margin-bottom: 0.3rem;
            }
            .title{
                text-align: center;
                font-family: PingFangSC-Light;
                font-size: 0.15rem;
                color: #2F3245;
                letter-spacing: 2px;
                height: 0.21rem;
                line-height: 0.21rem;
                padding-top:0.3rem;
                position: relative;
                &:after,&:before {
                    content:"";
                    display: inline-block;
                    width: 0.1rem;
                    height: 0.02rem;
                    background-image: linear-gradient(90deg, #F0CF8A 3%, #D9A95A 100%);
                    position: absolute;
                    bottom:0.09rem;
                }
                &:after {
                    right: 0.68rem;
                }
                &:before{
                    left: 0.68rem;
                }
                span{
                    font-family: PingFangSC-Semibold;
                    color: #001400;
                }
            }
            .couponTitle{
                &:after {
                    right: 0.6rem;
                }
                &:before{
                    left: 0.6rem;
                }
            }
        }
    }
    
    
</style>
