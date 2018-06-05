<template>
    <div id="openSuccess">
        <!-- <div id='headerTop'><i></i>开通成功</div> -->
        <headTop id='headerTop' :titleName="titleName"></headTop>
        <div id="main">
            <div class="uererInfo">
                <div class="photo"><span><img :src='svipInfo.headImage'/></span></div>
                <div class="name">{{svipInfo.nickName}}</div>
                <div class="tips">恭喜您已成功升级为SVIP</div>
            </div>
            <div class="privilege">
                <div class="title">您已尊享<span>SVIP店主专属特权</span></div>
                <div class="list">
                    <ul>
                        <li>
                            <span class="icon"></span>
                            <span>
                                <p class="tipOne">高额返利</p>
                                <p class="tipTwo">高于普通店主的返利额度</p>
                            </span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            <span>
                                <p class="tipOne">管理补贴</p>
                                <p class="tipTwo">享受SVIP专属管理奖励</p>
                            </span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            <span>
                                <p class="tipOne">专属导师</p>
                                <p class="tipTwo">手把手教你赚钱</p>
                            </span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            <span>
                                <p class="tipOne">专享价格</p>
                                <p class="tipTwo">专属成本价格</p>
                            </span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            <span>
                                <p class="tipOne">随时提现</p>
                                <p class="tipTwo">随时提现极速到账</p>
                            </span>
                        </li>
                        <li>
                            <span class="icon"></span>
                            <span>
                                <p class="tipOne">试用特权</p>
                                <p class="tipTwo">美店商品优先试用</p>
                            </span>
                        </li>
                        
                    </ul>
                </div>
            </div>
           <a href="/views/vipPrivilegeManage/vipPrivilegeManage.html"><div class="joinBtn">进入特权管理</div></a>
        </div>
    </div>

</template>

<script>
    import headTop from 'components/sysheader'; // 引入任务体系公共header
    import {env, system} from 'common/js/env';
    import {encode} from 'common/js/utils.js';  
    import {getVipInfo} from '../../../api/manageInfo.js';
    export default {
        props: [],
        data(){
            return {
                titleName:'升级SVIP成功',
                svipInfo:'',
            }
        },
        components:{
            headTop
        },
        created(){
            this.getSvipInfo();
        },
        methods:{
            async getSvipInfo(){
				let res = await getVipInfo();
				res=res.data;
				console.log(res);
				if(res.code ==0){
                    let vipType = res.data.vipType;
                    if(vipType){
                        vipType = vipType.toLowerCase();
                        if(vipType == 'svip'){//svip用户展示信息
                            this.svipInfo = res.data;
                        }else if(vipType == 'normal'){//普通用户跳转vip开通页
                            window.location.href='/views/vipPrivilegeOpen/vipPrivilegeOpen.html'
                        }else if(vipType == 'vip'){//vip用户跳转特权管理页面
                            window.location.href='/views/vipPrivilegeManage/vipPrivilegeManage.html'
                        }
                    }
				}else if(res.code==1104){
					let host = window.location.host;
                    let reg = RegExp(/atguat/);
                    //let reg2 = RegExp(/gome|gomeplus/);
                    if(reg.test(host)){
                        window.location.href='http://login.m.atguat.com.cn/login.html?return_url='+encode(window.location.href)
                    }else{
                        window.location.href='http://login.m.gome.com.cn/login.html?return_url='+encode(window.location.href)
                    }
				}else {
					this.$toast({
                        duration: 2000,       // 持续展示 toast
                        forbidClick: true, // 禁用背景点击
                        message: '亲，你的手机网络不太顺畅喔~',
                    });
				}
            },
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
        #main{
            width: 100%;
            position: absolute;
            top:0.44rem;
            left: 0;
            bottom:0;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 0; 
            }
            .uererInfo{
                width: 100%;
                height: 1.5rem;
                text-align: center;
                background-size: 100%;
                @include bg-image('/static/img/upgradeBG');
                .photo{
                    font-size: 0;
                    padding-top:0.25rem;
                    span,img{
                        display: inline-block;
                        width: 0.45rem;
                        height: 0.45rem;
                        border-radius: 0.45rem;
                    }
                }
                .name{
                    font-family: PingFangSC-Regular;
                    font-size: 0.13rem;
                    color: #EEC881;
                    line-height: 0.18rem;
                    letter-spacing: 0;
                    padding: 0.05rem 0 0.1rem 0;
                }
                .tips{
                    font-family: PingFangSC-Regular;
                    font-size: 0.16rem;
                    color: #EEC881;
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
                    padding: 0.3rem 0.3rem 0.2rem 0.3rem;
                    ul{
                        display: -webkit-flex; /* Safari */
                        display: flex;
                        flex-flow:row wrap;
                        justify-content:flex-start;
                        align-content:space-between;
                        
                        font-family: PingFangSC-Regular;
                        font-size: 0.12rem;
                        color: #333333;
                        li{
                            text-align: left;
                            width: 46%;
                            height: 0.32rem;
                            // background:red;
                            margin-bottom:0.34rem; 
                            display: -webkit-flex; /* Safari */
                            display: flex;
                            justify-content:flex-start;
                            span{
                                display: inline-block;
                                &:nth-child(1){
                                    width: 0.32rem;
                                    height: 0.32rem;
                                    margin-right: 0.15rem;
                                }
                                &:nth-child(2){
                                    width: 67%;
                                    // background: pink;
                                    .tipOne{
                                        font-family: PingFangSC-Regular;
                                        font-size: 0.14rem;
                                        color: #333333;
                                        letter-spacing: 0;
                                        line-height: 0.2rem;
                                    }
                                    .tipTwo{
                                        font-family: PingFangSC-Regular;
                                        font-size: 0.11rem;
                                        color: #999999;
                                        letter-spacing: 0;
                                        line-height: 0.16rem;
                                    }
                                    
                                }
                                
                            }
                            &:nth-child(1){
                                 margin-right: 0.24rem;
                                .icon{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/highMoney');
                                }
                            }
                            &:nth-child(2){
                                .icon{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/subsidy');
                                }
                            }
                            &:nth-child(3){
                                margin-right: 0.24rem;
                                .icon{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/tutor');
                                }
                            }
                            &:nth-child(4){
                                .icon{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/price');
                                }
                            }
                            &:nth-child(5){
                                margin-right: 0.24rem;
                                .icon{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/wthdrawals');
                                }
                            }
                            &:nth-child(6){
                                .icon{
                                    background-size: 100%;
                                    @include bg-image('../../../common/images/try');
                                }
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
                margin:0.3rem auto 0.75rem auto;
                background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
                border-radius: 100px;
                font-family: PingFangSC-Regular;
                font-size: 0.16rem;
                color: #2F3245;
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
        }
    }
    
</style>
