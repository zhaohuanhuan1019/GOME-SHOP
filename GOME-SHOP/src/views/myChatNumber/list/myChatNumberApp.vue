<template>
    <div>
        <headTop id='headerTop' :titleName="titleName"></headTop>
        <div class="chat-box" id="main">
            <div class="chat-img"></div>
            <div class="chat-remind">为了方便您邀请的VIP店主联系您请完善微信号码</div>
            <div class="chat-number-box"><span class="chat-small-icon"></span><input class="chat-number" type="text" placeholder="微信号码" v-model='wxCode' oninput="this.value=this.value.replace(/[\u4E00-\u9FA5\\s]+/g,'');" ></div>
            <button class="chat-save" @click="saveClick" >保存</button>
            <a class="chat-help" href="/static/staticPage/help.html" >查看帮助</a>
        </div>
    </div>
  
</template>

<script type="text/javascript">
import { getVipInfo, saveChatNumber } from '@/api/manageInfo'
import headTop from 'components/sysheader'; // 引入任务体系公共header
import {env, system} from 'common/js/env';
import { encode } from '@/common/js/utils';
	export default{
		data(){
			return {
                wxCode: '',
                titleName:'我的微信号码',
			}
        },
        components:{
			headTop
        },
		async created(){
			//请求数据
            let vipInfo = await getVipInfo();
            console.log(vipInfo.data.data)
            if(vipInfo.data.code === 0){
                this.wxCode = vipInfo.data.data.wxCode;
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
            saveClick(){
                // console.log('save',this.wxCode,this.wxCode.length)
               
                if(this.wxCode === null){
                    this.saveChat(this.wxCode)
                } else {
                    if (this.wxCode.length > 20) {
                        this.$toast({
                            duration: 2000,
                            forbidClick: true,
                            message: "请输入20个字内的微信号码"
                        });
                        document.getElementsByClassName("vu-toast")[0].style="font-size: 0.15rem !important;border-radius: 0.1rem !important;"
                    } else {
                        this.saveChat(this.wxCode)
                    }
                }
            },
            async saveChat(chatNum){
                let res = await saveChatNumber({
                    weChatNumber:chatNum
                });
                console.log(res.data)
                // res.data.data = true
                if (res.data.data === false) {
                    this.$toast({
                        duration: 2000,
                        forbidClick: true,
                        message: "保存失败"
                    });
                    document.getElementsByClassName("vu-toast")[0].style="font-size: 0.15rem !important;border-radius: 0.1rem !important;min-width：1.55rem !important;"
                } else if (res.data.data === true) {
                    // this.$toast({
                    //     duration: 2000,
                    //     forbidClick: true,
                    //     message: "微信号码保存成功"
                    // });
                    // document.getElementsByClassName("vu-toast")[0].style="font-size: 0.15rem !important;border-radius: 0.1rem !important;min-width：1.55rem !important;"
                    location.href="/views/vipPrivilegeManage/vipPrivilegeManage.html"
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
input,button{
    border: none;
    margin:0;
    padding: 0;
}

.chat-box{
    width: 100%;
    background: #fff;
    position: absolute;
    top: 0.44rem;
    bottom: 0;
}

.chat-img{
    width: 1.6rem;
    height: 1.6rem;
    @include bg-image('../images/微信配图');
    background-size: 1.6rem 1.6rem;
    margin:0.6rem auto 0;
}

.chat-remind{
    font-size: 0.14rem;
    color: #666666;
    letter-spacing: 0;
    width: 2.05rem;
    margin: 0.1rem auto 0.4rem;
    text-align: center;
    line-height: 0.2rem;
}

.chat-number-box{
    width: 2.95rem;
    height: 0.3rem;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    display: flex;
}

.chat-small-icon{
    width: 0.24rem;
    height: 0.24rem;
    @include bg-image('../images/微信号');
    background-size: 0.24rem 0.24rem;
    float: left;
    margin-right: 0.07rem; 
}

.chat-number{
    height: 0.2rem;
    line-height: 0.2rem;
    font-size: 0.15rem;
    color: #333333;
    letter-spacing: 0;
    float: left;
    flex: 1;
    ime-mode:disabled
}

input::placeholder{
    font-size: 0.15rem;
    color: #BFBFBF;
}
    
.chat-save{
    width: 2.95rem;
    height: 0.5rem;
    background-image: linear-gradient(225deg, #F0CF8A 0%, #D9A95A 100%);
    border-radius: 100px;
    font-size: 0.16rem;
    color: #2F3245;
    display: block;
    margin: 0.3rem auto 0.2rem;
}

.chat-help{
    font-size: 0.12rem;
    color: #C48922;
    letter-spacing: 0;
    text-align: center;
    display: block;
    width: 0.5rem;
    height: 0.18rem;
    margin: 0 auto;
}

.vu-toast--middle{
    font-size: 0.15rem !important;
    line-height: 0.18rem !important;
    border-radius: 0.1rem !important;
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
