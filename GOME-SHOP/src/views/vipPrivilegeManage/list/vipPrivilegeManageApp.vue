<template>
  <div>
        <headTop id='headerTop' :titleName="titleName"></headTop>
        <div id="main" class="manage-wrapper">
            <div class="manage-box"  v-if="vipType.length>0 && vipType==='vip'" >
                <div class="manage-small-box">
                    <div class="manage-info">
                        <div class="manage-head">
                            <img :src='headImage' alt="">
                        </div>
                        <a class="manage-rule" href="/static/staticPage/vip-rule.html" >规则</a>
                        <div class="manage-name">{{nickName}}</div>
                        <div class="manage-date">您的VIP特权将于<span>{{vipTime}}</span>到期</div>
                        <a class="manage-up" href="/views/upgrade/upgrade.html" >升级<span class="can-up" v-if="upStatus===true"></span></a>
                        <div class="manage-button">
                            <a class="chat-number" href="/views/myChatNumber/myChatNumber.html"><div class="chat-icon"></div><span>我的微信号码</span></a>
                            <a class="my-team" href="/views/mytutor/mytutor.html"><div class="team-icon"></div><span>我的导师</span></a>
                        </div>
                    </div>

                    <div class="manage-invite">
                        <a class="invite-sum" href="/views/inviteVIP/inviteVIP.html"><p class="invite-title">邀请VIP</p><p class="invite-content">赚奖励100元</p></a>
                        <a class="invite-num" href="/views/invitationRecords/invitation_records.html"><p class="invite-title">邀请VIP记录</p><p class="invite-content">{{inviteNum}}个</p></a>
                    </div>
                </div>

                <div class="manage-rights">
                    <div class="rights-title"><span>我的权益</span><a href="/views/interestsExplain/interestsExplain.html">查看详情<i class="more-icon"></i></a></div>
                    <ul class="rights-list">
                        <li><div class="rights-icons rights-icon1"></div><span>高额返利</span></li>
                        <li><div class="rights-icons rights-icon2"></div><span>佣金叠加</span></li>
                        <li><div class="rights-icons rights-icon3"></div><span>VIP大礼包</span></li>
                        <li><div class="rights-icons rights-icon4"></div><span>240元红包</span></li>
                        <li><div class="rights-icons rights-icon5"></div><span>专属导师</span></li>
                        <li><div class="rights-icons rights-icon6"></div><span>专享价格</span></li>
                        <li><div class="rights-icons rights-icon7"></div><span>随时提现</span></li>
                        <li><div class="rights-icons rights-icon8"></div><span>试用特权</span></li>
                    </ul>
                </div>
            </div>
            <div class="manage-box"  v-if="vipType.length>0 && vipType ==='svip'">
                <div class="manage-small-box">
                    <div class="manage-sinfo">
                        <div class="manage-head">
                            <img :src='headImage' alt="">
                        </div>
                        <div class="manage-sname name-no-rule">{{nickName}}</div>
                        <div class="manage-no-date">长期有效</div>
                        <div class="manage-button">
                            <a class="chat-number" href="/views/myChatNumber/myChatNumber.html"><div class="chat-icon"></div><span>我的微信号码</span></a>
                            <a class="my-team" href="/views/myteam/myteam.html"><div class="teams-icon"></div><span>我的团队</span></a>
                        </div>
                    </div>

                    <div class="manage-invite">
                        <a class="invite-sum" href="/views/inviteVIP/inviteVIP.html"><p class="invite-title">邀请VIP</p><p class="invite-content">赚奖励100元</p></a>
                        <a class="invite-num" href="/views/invitationRecords/invitation_records.html"><p class="invite-title">邀请VIP记录</p><p class="invite-content">{{inviteNum}}个</p></a>
                    </div>
                </div>

                <div class="manage-rights">
                    <div class="rights-title"><span>我的权益</span><a href="/views/interestsExplain/interestsExplain.html">查看详情<i class="more-icon"></i></a></div>
                    <ul class="rights-list">
                        <li><div class="rights-icons rights-icon0"></div><span>管理补贴</span></li>
                        <li><div class="rights-icons rights-icon1"></div><span>高额返利</span></li>
                        <li><div class="rights-icons rights-icon5"></div><span>专属导师</span></li>
                        <li><div class="rights-icons rights-icon6"></div><span>专享价格</span></li>
                        <li><div class="rights-icons rights-icon7"></div><span>随时提现</span></li>
                        <li><div class="rights-icons rights-icon8"></div><span>试用特权</span></li>
                    </ul>
                </div>
            </div>
        </div>
        
  </div>
</template>

<script type="text/javascript">
import { getVipInfo } from '@/api/manageInfo'
import { encode } from '@/common/js/utils';
import headTop from 'components/sysheader'; // 引入任务体系公共header
import {env, system} from 'common/js/env';
    export default{
		data(){
			return {
                nickName: '',
                headImage: '',
                vipType: '',
                vipTime: '',
                upStatus: '',
                wxCode: '',
                inviteNum: '',
                titleName:'VIP特权管理',
			}
        },
        components:{
			headTop
        },
		async created(){
			//请求数据
            let vipInfo = await getVipInfo()
            console.log(vipInfo, location.href)
            if (vipInfo.data.code === 0){
                this.nickName = vipInfo.data.data.nickName;
                this.headImage = vipInfo.data.data.headImage;
                this.vipType = vipInfo.data.data.vipType.toLowerCase();
                // this.vipType = 'normal'
                this.vipTime = this.formatDate(vipInfo.data.data.vipTime);
                this.upStatus = vipInfo.data.data.upStatus;
                this.wxCode = vipInfo.data.data.wxCode;
                this.inviteNum = vipInfo.data.data.inviteNum;
            } else if (vipInfo.data.code === 1104){
                let host = window.location.host;
                let reg = RegExp(/atguat/);
                //let reg2 = RegExp(/gome|gomeplus/);
                if(reg.test(host)){
                    window.location.href='http://login.m.atguat.com.cn/login.html?return_url='+encode(window.location.href)
                }else{
                    window.location.href='http://login.m.gome.com.cn/login.html?return_url='+encode(window.location.href)
                }
            } else {
                this.$toast({
                    duration: 2000,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '服务器开小差，请稍后再试!',
                });
            }
        },
        methods:{
            formatDate(time){
                let date = new Date(Number(time));
                let y=date.getFullYear();
                let m=date.getMonth()+1;
                let d=date.getDate();
                return y + "-" + m + "-" + d;
                
            }
        },
        watch:{
            vipType(curVal,oldVal){
                console.log(curVal,oldVal)
                if (this.vipType === "normal") {
                    location.href="/views/vipPrivilegeOpen/vipPrivilegeOpen.html"
                }
            }
        },
        mounted(){
			if(env.wechat){
                //alert('我的运行环境是微信--我的头部要隐藏掉');
                document.getElementById('headerTop').style.display='none';//头部隐藏
                document.getElementById('main')?document.getElementById('main').style.top=0:'';
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../common/css/mixin';
.manage-wrapper{
    width: 100%;
    position: absolute;
    top: 0.44rem;
    bottom: 0;
}

.manage-box{
    width: 100%;
    background: #fff;
    
}

.manage-small-box{
    background: #f3f5f7;
    overflow: hidden;
}

.manage-sinfo{
    width: 3.45rem;
    height: 2.26rem;
    @include bg-image('/static/img/svip背景');
    background-size: 3.45rem 2.26rem;
    margin: 0.1rem auto 0;
    position: relative;
}

.manage-info{
    width: 3.45rem;
    height: 2.26rem;
    @include bg-image('/static/img/vip背景');
    background-size: 3.45rem 2.26rem;
    margin: 0.1rem auto 0;
    position: relative;
}



.manage-head{
    width: 0.6rem;
    height: 0.6rem;
    margin: 0.04rem auto 0;
    border-radius: 50%;
    border: 1px solid #fff;
    position: absolute;
    left: 50%;
    top:0;
    transform: translate( -50%, 0);
    background-color: #fff;
}

.manage-head img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
}

.manage-rule{
    float: right;
    font-size: 0.12rem;
    color: #FFFFFF;
    margin-top: 0.43rem;
    margin-right: 0.1rem;
    
}

.manage-name{
    clear: both;
    font-size: 0.16rem;
    color: #FFFFFF;
    margin: 0rem auto 0.12rem;
    padding-top: 0.1rem;
    text-align: center;
}

.manage-sname{
    clear: both;
    font-size: 0.16rem;
    color: #EEC881;
    margin: 0rem auto 0.12rem;
    padding-top: 0.1rem;
    text-align: center;
}

.manage-date{
    font-size: 0.12rem;
    color: #FFFFFF;
    margin: 0 auto;
    text-align: center;
}

.manage-no-date{
    font-size: 0.12rem;
    color: #EEC881;
    text-align: center;
}

.manage-date span{
    margin-left: 0.02rem;
    margin-right: 0.02rem;
}

.manage-up{
    background: #FFFFFF;
    border-radius: 32px;
    font-size: 0.15rem;
    color: #75510A;
    width: 0.81rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    margin: 0.11rem auto 0;
    position: relative;
    display: block;
}

.can-up{
    font-size: 0.1rem;
    color: #F8DA98;
    letter-spacing: 0;
    position: absolute;
    right: -0.46rem;
    top: 0.07rem;
    width: 0.41rem;
    height: 0.16rem;
    @include bg-image('../images/可升级');
    background-size: 0.41rem 0.16rem;
}

.manage-button{
    font-size: 0.13rem;
    display: flex;
    position: absolute;
    bottom: 0;
    background: #FFFFFF;
    border-radius: 0 0 5px 5px;
    width: 3.43rem;
    height: 0.47rem;
    border: 1px solid #ddd;
    border-top: none; 
}

.chat-number{
    width: 50%;
    float: left;
    height: 0.27rem;
    line-height: 0.27rem;
    margin-top: 0.1rem;
    color: #666666;
    border-right: 1px solid #ddd;
}

.my-team{
    float: right;
    height: 0.27rem;
    line-height: 0.27rem;
    margin-top: 0.1rem;
    color: #666666;
    flex: 1;
}


.chat-number div{
    width: 0.18rem;
    height: 0.18rem;
    @include bg-image('../images/微信号码');
    background-size: 0.18rem 0.18rem;
    float: left;
    margin: 0.05rem 0.05rem 0 0.36rem;
    border: none;
}

.chat-number span{
    float: left;
}

.my-team div.team-icon{
    width: 0.18rem;
    height: 0.18rem;
    @include bg-image('../images/我的导师');
    background-size: 0.18rem 0.18rem;;
    float: left;
    margin: 0.05rem 0.05rem 0 0.36rem;
    border: none;
}

.my-team span{
    float: left;
}

.manage-invite{
    display: flex;
    width: 100%;
    height: 0.87rem;
    margin: 0.1rem auto 0.1rem;
    background: #fff;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.manage-invite a{
    height: 0.67rem;
    margin-top: 0.1rem;
}

.invite-sum{
    width: 50%;
    border-right: 1px solid #ddd;
}

.invite-num{
    flex: 1;
}

.invite-title{
    font-size: 0.16rem;
    color: #333333;
    text-align: center;
    margin: 0.14rem auto 0.07rem;
}

.invite-content{
    margin: 0;
    font-size: 0.13rem;
    color: #666666;
    text-align: center;
    
}

.manage-rights{
    border-top:1px solid #ddd;
    background-color: #fff;
    padding-bottom: 0.53rem;
}

.rights-title{
    height: 0.4rem;
    line-height: 0.4rem;
    border-bottom: 1px solid #ddd;
}

.rights-title span{
    font-size: 0.15rem;
    color: #333333;
    float: left;
    margin-left: 0.15rem;
}

.rights-title a{
    font-size: 0.12rem;
    color: #999999;
    float: right;
    line-height: 0.42rem;
}

.rights-list{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 100%;    
}

.rights-list li {
    width: 25%;
    height: 0.84rem;
    display: block;
}

.rights-list li div.rights-icons{
    width: 0.28rem;
    height: 0.28rem;
    display: block;
    background-size: 0.28rem 0.28rem;
    margin: 0.26rem auto 0.12rem;
}

.rights-list li div.rights-icon1{
    @include bg-image('../images/高额返利 ');
    
}

.rights-list li div.rights-icon2{
    @include bg-image('../images/佣金叠加');
    
}

.rights-list li div.rights-icon3{
    @include bg-image('../images/VIP大礼包');
    
}

.rights-list li div.rights-icon4{
    @include bg-image('../images/240元红包');
    
}

.rights-list li div.rights-icon5{
    @include bg-image('../images/专属导师');
    
}

.rights-list li div.rights-icon6{
    @include bg-image('../images/专享价格');
    
}

.rights-list li div.rights-icon7{
    @include bg-image('../images/随时提现');
    
}

.rights-list li div.rights-icon8{
    @include bg-image('../images/试用特权');
    
}

.rights-list li div.rights-icon0{
    @include bg-image('../images/管理补贴');
    
}

.more-icon{
    @include bg-image('../images/更多');
    width: 0.18rem;
    height: 0.18rem;
    display: inline-block;
    background-size: 0.18rem 0.18rem;
    margin: 0.12rem 0.15rem 0 0.05rem ;
    float: right ;
}

.rights-list li span{
    font-size: 0.12rem;
    color: #333333;
    display: block;
    text-align: center;
}

.name-no-rule{
    padding-top: 0.7rem !important; 
}

.my-team div.teams-icon{
    width: 0.18rem;
    height: 0.18rem;
    @include bg-image('../images/我的团队');
    background-size: 0.18rem 0.18rem;;
    float: left;
    margin: 0.05rem 0.05rem 0 0.36rem;
    border: none;
}

#headerTop{
    width: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 100;
    background: #fff;
    border-bottom: 0.01rem solid #DDDDDD;
}

</style>
