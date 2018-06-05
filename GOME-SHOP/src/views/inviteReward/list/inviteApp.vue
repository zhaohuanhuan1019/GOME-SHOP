<template>
    <div id="inviteWarpper">
        <head-top id="headerTitle" :titleName="cmsPageInfo.promoName?cmsPageInfo.promoName:'邀请开店活动页'" :shareDate="WapShareDate"></head-top>
        <div class="inviteMain" id="inviteMain">
            <div v-if="taskOff">
                <offline-activity v-if='isOff' class="no-content"></offline-activity>
                <expired-activity v-else class="no-content" :url='InvalidUrl'></expired-activity>
            </div>
            <div v-else>
                <floorPhoto v-show="cmsData.length>0" :data="cmsData[0]"></floorPhoto>
            
                <div class="broadcast"><broadcast :data="broadArr"></broadcast></div>
                <!--<div class="friendsGet">好友可得<span class="leftDot"></span><span class="rightDot"></span></div>-->
                
                <div class="floorTwo">
                    <floorPhoto v-for="(item, index) in cmsData" :key="index" v-if="index>0" :data="item"></floorPhoto>
                </div>
                <div class="immediately"><div @click="share(WapShareDate)" data-code="yqClick-01">立刻邀请</div></div>
                <div class="buttonWarpper">
                    <div v-if="isShowPoster" class="leftButton" @click="openPoster" data-code="yqPoster-01"><i></i>生成海报</div>
                    <div v-if="isShowPoster" class="line">|</div>
                    <div class="rightButton" @click="openQrcode" data-code="yqCode-01"><i></i>当面邀请</div>
                </div>
                <div class="inviteBottom">
                    <div class="countWarpper">
                        <ul>
                            <li>
                                <div class="countNum"><span v-if="invitingRes.invitedNum>0">{{invitingRes.invitedNum | formatNum}}次</span><span v-else>--</span></div>
                                <div class="countType">浏览量</div>
                            </li>
                            <li>
                                <div class="countNum"><span v-if="invitingRes.openShopUserNum>0">{{invitingRes.openShopUserNum | formatNum}}人</span><span v-else>--</span></div>
                                <div class="countType">开店成功</div>
                            </li>
                            <li>
                                <div class="countNum"><span v-if="invitingRes.firstOrderNum>0">{{invitingRes.firstOrderNum | formatNum}}人</span><span v-else>--</span></div>
                                <div class="countType">完成首单</div>
                            </li>
                            <li>
                                <div class="countNum"><span v-if="invitingRes.totalReward>0">{{(invitingRes.totalReward/100) | formatNum}}</span><span v-else>--</span></div>
                                <div class="countType">合计(国美币)</div>
                            </li>
                        </ul>
                    </div>
                </div>


                <ul v-if="!noReward"  class="page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <div class="taskTitle" v-show="invitingRes.onlyOpenShopUserNum>0">开店成功({{invitingRes.onlyOpenShopUserNum}}人)</div>
                    <li v-for="(item, index) in invitingList" :key="index" class="page-infinite-listitem"><img :src="item.userImage"/><span class="userName">{{item.nickName.substr(0, 1)}}**{{item.nickName.substr(-1)}}</span><span class="time">{{item.shopOpenTime | formatYear}}</span><span class="userState1">待成首单</span></li>
                    <div>
                        <div class="taskTitle" v-show="invitedRes.firstOrderNum>0">完成首单({{invitedRes.firstOrderNum}}人)</div>

                        <li v-for="(item, index) in invitedList" :key="index" class="page-infinite-listitem"><img :src="item.userImage"/><span class="userName">{{item.nickName.substr(0, 1)}}**{{item.nickName.substr(-1)}}</span><span class="time">{{item.firstOrderTime | formatYear}}</span><span class="userState2">奖励已发放</span></li> 
                    </div>
                </ul>

                <div v-if="!noReward" class="page-infinite-loading">
                    <p v-if="!allLoaded"><i></i>加载中...</p>
                    <p v-if="allLoaded">没有更多数据了</p>
                </div>

                <div class="noReward" v-if="noReward">
                    <div><i></i></div>
                    <div>快去邀请好友一起赚钱吧!</div>
                </div>
                
            </div>
        </div>
        <div class="popUp" v-show="qrCodeKey">
            <div class="qrCode">
                <div class="code"> <QrCode :data="QrCodeData"></QrCode></div>
                <div class="tips">快让朋友扫一扫上面的二维码 邀请他加入美店吧～</div>
            </div>
            <div class="closeButton">111<i @click="closeQrcode"></i></div>
        </div>
    </div>

</template>

<script>
    import headTop from 'components/sysheader'; // 引入任务体系公共header
    import floorPhoto from 'components/floorPhoto/floorPhoto.vue'; // 引入单图楼层组件
    import QrCode from 'components/qrCode/qrCode.vue'; // 引入二维码组件
    import broadcast from 'components/broadcast/broadcast'; // 引入播报组件
    import offlineActivity from '@/components/OfflineActivity';
    import expiredActivity from '@/components/ExpiredActivity';
    import share from 'components/share';
    import {env, system} from 'common/js/env';
    import {encode} from 'common/js/utils.js';
    import weixinShare from 'common/js/weixin.js';
    import {fetchTaskInviting,fetchTaskInvited,fetchGetRewardList,fetchUserInfo} from '../../../api/getinvite.js';
    import {fetchCMSModule,fetchTextIndex} from '../../../api/cmsModule.js';

    export default {
        props: [],
        data(){
            return{
                InvalidUrl:'http://www.baidu.com',
                isOff:true,
                broadArr: [],
                cmsBroadArr:[],
                QrCodeData:{
                    width : 225,
                    height : 225,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    url: "",
                    style:"display:inline-block"
                },
                WapShareDate:{
                    title: '',
                    desc: '',
                    link: '',
                    imgUrl:'',
                },
                AppShareParam:{},
                cmsData:[],
                taskId:'',
                userId:'',
                cmsPageInfo:{sharePromo:''},
                taskOff:false,

                loading: false,
                allLoaded: false,

                noReward:false,
                qrCodeKey:false,
                isRequestInviting:true,
                invitingPageNum:0,
                invitingPageSize:30,
                invitedPageNum:1,
                invitedPageSize:30,
                invitingRes:'',
                invitingList: [],
                invitedRes:'',
                invitedList: [],
                noticeDate:'',
                createdKey:false,
                loadermoreKey:false,
            }
        },
        components:{
            headTop,
            floorPhoto,
            QrCode,
            broadcast,
            offlineActivity,
            expiredActivity,
        },
        filters: {
            formatYear(str) { // 格式化 年-月-日
                if(str==null){
                    return '无到账时间'
                }else {
                    var date = new Date(str);
                    var y = date.getFullYear();      
                    var m = date.getMonth() + 1;      
                    m = m < 10 ? ('0' + m) : m;      
                    var d = date.getDate();      
                    d = d < 10 ? ('0' + d) : d;
                    return y + "-" + m + "-" + d;
                }
            },
            formatNum(data){
                if(typeof data == 'number'){
                    var isDecimal = String(data).indexOf('.')>-1;
                    let length = data.toString().length;
                    if(isDecimal){
                        length = length-1;
                    }
                    if(length>6){
                        return '99999+';
                    }else {
                        return data;
                    }
                }
            }
        },
        computed:{
            isShowPoster(){
                let shareArr = this.cmsPageInfo.sharePromo.split('=');
                console.log(!shareArr[1])
                if(shareArr[1]=='on' || !shareArr[1]){
                    return true;
                }else {
                    return false;
                }
            }
        },
        async created(){ 
            sessionStorage.removeItem("isToast");//清空记录的toast记录

            let getRequest=await this.getRequest();//获取地址栏传过来的taskId
            this.taskId = getRequest.taskId;
            console.log(this.taskId)
            if(this.taskId==''|| this.taskId == undefined){
                this.taskOff = true;
                this.isOff = true;
                this.closeShareIcon();//关闭原生头部的shareIcon
                console.log('taskId为空 或者为undefined')
            }else {
                
                await this.fetchCMSModule();//获取cms传的数据
                await this.getRewardList();//获取奖励播报数据
                
                weixinShare({//调用微信浏览器分享功能
                    weixin_share_friend:this.WapShareDate,
                    qq:this.WapShareDate,
                    weixin_share_line:this.WapShareDate,
                    qq_zone:this.WapShareDate
                });
                
                this.createdKey = true;
                console.log('createdKey===='+this.createdKey+'---loadermoreKey===='+this.loadermoreKey)
                this.scrollPos();
            }

        },
        methods:{
            setHeadBar(){
                let u = navigator.userAgent;
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                if(isAndroid){
                    let self = this;
                    GomeJSBridge.ready(function(){
                        let param = {
                            title :self.cmsPageInfo.promoName,
                            titleColor :'333333',
                            menus : {
                                isShowCloseMenu:'N',
                                rightMenus:[
                                    {
                                        type:'callback',
                                        title:'回调',
                                        icon:'file://share',
                                        data:{},
                                    }
                                ]
                            }
                        } 
                        //console.log(param);
                        GomeJSBridge.setHeadBar(function(data){
                            //console.log(data)
                        },function(err){
                            //console.log(err)
                        },param)
                    },null)
                    GomeJSBridge.onCallback(function(data){
                        self.callShareComp();
                    })
                }else {
                    let param = {
                        title :this.cmsPageInfo.promoName,
                        titleColor: '333333',
                        menus: {
                                isShowCloseMenu: 'N',
                                rightMenus: [{
                                    type: 'share',
                                    title: '分享',
                                    icon: 'file://share',
                                    shareInfo: this.AppShareParam,
                                }]
                        }
                    } 
                    console.log(param)
                    GomeJSBridge.setHeadBar((data) => {
                    //console.log(data)
                    }, (err) => {
                    //console.log(err)
                    }, param)
                }
            },
            closeShareIcon () {
                if(env.app && env.gomeplus){
                    let param = {
                        title: this.titleName,
                        titleColor: '333333',
                    } 
                    GomeJSBridge.setHeadBar((data) => {
                    //console.log(data)
                    }, (err) => {
                    //console.log(err)
                    }, param)
                }
			},
            callShareComp(){
                var param =this.AppShareParam;
                console.log(param)
                GomeJSBridge.callShareComp(function(data){
                    console.log(data);
                    let inviteRewardTop =document.getElementById('inviteMain').scrollTop;
                    localStorage.setItem("inviteRewardTop",inviteRewardTop);
                    
                    let u = navigator.userAgent;
                    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    if(isAndroid && data.shareResult!=='3' && data.platform=='WeiBo'){
                        console.log('cookie丢失，需要强刷页面');
                        // window.location.href=window.location.protocol+"//"+window.location.host+'/api-meidian-app/task/path/v1/inviteUrl ';
                        location.replace(window.location.protocol+"//"+window.location.host+'/api-meidian-app/task/path/v1/inviteUrl');
                    }
                    //GomeJSBridge.toast(null,null,'分享到：'+ data.platform ? data.platform : '')
                },function(err){
                    console.log(err)
                },param)
            },
            async fetchUserInfo(buttonType,shareMsg){
                 let res = await fetchUserInfo();
                 let resDate = res.data;
                 console.log(resDate)
                 if(resDate.code==0){//代表登录
                    resDate=resDate.data;
                    this.userId = resDate.userId;
                    console.log(this.userId);
                    if(resDate.openShop){//代表已登录and已经开店
                        if(buttonType=='faceToface'){//面对面邀请
                            //增加数据埋点
                            // gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}');
                            this.QrCodeData.url = window.location.protocol+"//"+window.location.host+'/views/invitedNew/invited_new.html?taskId='+this.taskId+'&userId='+this.userId;
                            console.log(this.QrCodeData.url)

                            this.qrCodeKey=true;
                        }else if(buttonType=='poster'){//打开海报
                            window.location.href='/views/createPoster/create_poster.html?taskId='+this.taskId;
                        }else if(buttonType=='immediately'){//立刻邀请
                            //增加数据埋点
                            // gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}');
                            
                            this.WapShareDate.link = window.location.protocol+"//"+window.location.host+'/views/invitedNew/invited_new.html?taskId='+this.taskId+'&userId='+this.userId;

                            this.AppShareParam.shareUrl = window.location.protocol+"//"+window.location.host+'/views/invitedNew/invited_new.html?taskId='+this.taskId+'&userId='+this.userId;
                            // console.log(this.WapShareDate)
                            // console.log(this.AppShareParam)
                           
                            if(env.app && env.gomeplus){
                                this.callShareComp();
                            }else if(env.wap) {
                                console.log(shareMsg)
                                share(shareMsg);
                            }
                        }
                    }else {//已登录但是非开店
                        let host = window.location.host;
                        let reg = RegExp(/atguat/);
                        //let reg2 = RegExp(/gome|gomeplus/);
                        if(reg.test(host)){
                            window.location.href="http://shop.m.atguat.com.cn/mshop_setting.html";
                        }else{
                            window.location.href="https://shop.m.gome.com.cn/mshop_setting.html";
                        }
                    }
                 }else if (resDate.code==1104){//未登录
                     console.log('需要调用登录页');
                     this.callLogin();
                 }else {
                     this.toast();
                 }
            },
            async fetchTextIndex(){
                let res = await fetchTextIndex({
                    keyProms: 'channeldL4PRZBdl2c',
                });
                let resDate = res.data;
                if(resDate.code ==0){
                    let templetList = resDate.data.templetList;
                    for(let i=0;i<templetList.length;i++){
                        if(templetList[i].templetId=='690'){
                            //console.log(templetList[i].dataList);
                            let dataList = templetList[i].dataList;
                            for(let j=0;j<dataList.length;j++){
                                this.cmsBroadArr.push(dataList[j].remark);
                            }
                        }
                    }
                    this.broadArr = this.broadArr.concat(this.cmsBroadArr).slice(0,20);
                    //console.log( this.broadArr)
                }else {
                    this.toast();
                }
            },	
            async fetchCMSModule(){
                let res = await fetchCMSModule({
                    keyProms: 'channelMWhjGIvmmDD',
                    gpsLongitude:"",
                    gpsLatitude: "",
                });
                if(res.data.code == 0){
                    let templetList = res.data.data.templetList;
                    this.cmsData = templetList;
                    this.cmsPageInfo = res.data.data.pageInfo;

                    let shareArr=this.cmsPageInfo.sharePromo.split('#');
                    this.WapShareDate = {
                        title:shareArr[0],
                        desc:shareArr[1]?shareArr[1]:'发现了超值活动，速来围观！',
                        link:window.location.href,
                        imgUrl:this.cmsPageInfo.shareImgUrl?window.location.protocol+this.cmsPageInfo.shareImgUrl:'',
                    }
                    this.AppShareParam = {
                        title:shareArr[0],
                        shareDesc:shareArr[1]?shareArr[1]:'发现了超值活动，速来围观！',
                        shareImageUrl:this.cmsPageInfo.shareImgUrl?window.location.protocol+this.cmsPageInfo.shareImgUrl:'',
                        shareUrl:window.location.href,
                        platform:['WeiBo','Wechat','WechatMoments','QQ','QZone','CopyLink'],
                        // platform:['WeiBo','Wechat','WechatMoments','QQ','QZone','GomeMyFriends','GomeMyCircle','GomeMoments','ScanQRCode','MyContacts','CopyLink','ProductQRCode']
                    }
                    if(env.app && env.gomeplus){
                        this.setHeadBar();
                    }
                }else {
                    this.toast();
                }
            }, 
            async getRewardList(){
                let getRequest=await this.getRequest();//获取地址栏传过来的taskId
                this.taskId = getRequest.taskId;

                if(this.taskId==''){
                    this.taskOff=true;
                    this.isOff = true;
                }else {
                    let res = await fetchGetRewardList({
                        taskId: this.taskId,
                    });
                    let resData= res.data;
                    if(resData.code ==0){
                        if(JSON.stringify(resData.data)!=='{}'){
                            this.noticeDate = resData.data;
                            for(let i=0;i<this.noticeDate.length;i++){
                                let data = this.noticeDate[i].inviterNickName.substr(0, 1)+'**'+this.noticeDate[i].inviterNickName.substr(-1)+'成功邀请'+this.noticeDate[i].receiverNickName.substr(0, 1)+'**'+this.noticeDate[i].receiverNickName.substr(-1)+'获得'+this.noticeDate[i].rewardNum/100+'元';
                                this.broadArr.push(data)
                            }
                            if(resData.data.length<20){
                                await this.fetchTextIndex();  
                            }else {
                                this.broadArr = this.broadArr.slice(0,20);
                                //console.log( this.broadArr)
                            }
                        }else {
                            console.log('RewardList接口data为空')
                        }
                    }else if(resData.code ==10102){
                        this.invalid(resData.data);
                    }else {
                        this.toast();
                    }
                }
            },
            async getInvitingList(){        
                let getRequest=await this.getRequest();//获取地址栏传过来的taskId
                this.taskId = getRequest.taskId;

                if(this.taskId==''|| this.taskId == undefined){
                    this.taskOff=true;
                    this.isOff = true;
                }else {
                    let res = await fetchTaskInviting({
                        taskId: this.taskId,
                        pageNum:this.invitingPageNum,
                        pageSize:this.invitingPageSize,
                    });
                    let resData = res.data;
                    console.log(resData.code)
                    if(resData.code==0){
                        this.invitingRes = resData.data.businessObj;
                        
                        let businessObj = resData.data.businessObj
                        if(businessObj && businessObj.onlyOpenShopUser && businessObj.onlyOpenShopUser.length>0){
                            let invitingData=businessObj.onlyOpenShopUser;
                            
                            for(let i=0;i<invitingData.length;i++){
                                this.invitingList.push(invitingData[i]);
                            }

                            if(invitingData.length<this.invitingPageSize){
                                //console.log('完成中数据不够30条,需要请求已完成列表接口');
                                this.isRequestInviting = false;//代表不需要请求‘完成中列表’
                                await this.getInvitedList();
                            }
                        }else if(businessObj && businessObj.onlyOpenShopUser && businessObj.onlyOpenShopUser.length==0){
                            //console.log('“任务完成中onlyOpenShopUser”是空数组==需要请求第二个列表接口');
                            this.isRequestInviting = false;//代表不需要请求‘完成中列表’
                            await this.getInvitedList();
                        }else {
                            console.log('Inviting接口返回的数据不同时满足businessObj && businessObj.onlyOpenShopUser && businessObj.onlyOpenShopUser.length>=0的条件');
                        }
                    }else if(resData.code ==10102){
                        this.invalid(resData.data);
                    }else if(resData.code ==1104){
                        this.allLoaded = true;
                        this.noReward = true;
                    }else {
                        this.allLoaded = true;
                        this.toast();
                    }
                    //console.log(this.invitingList.length+'====invitingList')
                }
            },
            async getInvitedList(){
                if(this.taskId==''|| this.taskId == undefined){
                    this.taskOff=true;
                    this.isOff = true;
                }else {
                    let res = await fetchTaskInvited({
                        taskId: this.taskId,
                        pageNum:this.invitedPageNum,
                        pageSize:this.invitedPageSize,
                    });
                    let resData = res.data;
                    if(resData.code==0){
                        this.invitedRes = resData.data;

                        if (this.invitedRes.firstOrderUser.length < this.invitedPageSize) {//返回的数据小于请求的数据
                            this.allLoaded = true;
                        }

                        if(resData.data.firstOrderUser && resData.data.firstOrderUser.length>0){//返回的已完成数据多于0条
                            
                            let invitedData=this.invitedRes.firstOrderUser;
                            for(let i=0;i<invitedData.length;i++){
                                this.invitedList.push(invitedData[i]);
                            }

                        }else if (resData.data.firstOrderUser && resData.data.firstOrderUser.length==0){//返回的已完成数据等于0条
                            console.log('“任务已完成firstOrderUser”是空数组');
                            if(this.invitingList.length ==0){
                                this.noReward= true;
                            }else {
                                this.noReward= false;
                            }
                        }else {
                            console.log('Invited接口返回的数据不同时满足resData.data.firstOrderUser && resData.data.firstOrderUser.length>=0');
                        }
                    }else if(resData.code ==10102){
                        this.invalid(resData.data);
                    }else if(resData.code ==1104){
                        this.allLoaded = true;
                        this.noReward = true;
                    }else {
                        this.allLoaded = true;
                        this.toast();
                    }
                }
            },
            async loadMore() {
                if (this.allLoaded) {//数据加载完毕
                    return;
                }

                this.loading = true;//先关闭无限滚动功能
                if(this.isRequestInviting==true){
                    this.invitingPageNum++;   
                    await this.getInvitingList();//调用‘完成中’列表
                }else {
                    this.invitedPageNum++;
                    await this.getInvitedList();//调用‘已完成’列表
                }

                setTimeout(() => {
                    this.loading = false;//放开无限滚动开关功能
                },5000)
                
                this.loadermoreKey = true;
                console.log('createdKey===='+this.createdKey+'---loadermoreKey===='+this.loadermoreKey)
                this.scrollPos();
                
            },
            scrollPos(){
                if(this.createdKey && this.loadermoreKey){
                    let u = navigator.userAgent;
                    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    if(isAndroid && localStorage.getItem("inviteRewardTop")!==null){
                        this.$nextTick(function(){
                            let inviteRewardTop = localStorage.getItem("inviteRewardTop")
                            console.log(inviteRewardTop)
                           
                            setTimeout(() => {
                                document.getElementById('inviteMain').scrollTop=inviteRewardTop;
                                localStorage.removeItem("inviteRewardTop");
                                console.log(document.getElementById('inviteMain').scrollTop)
                            },500)
                        });
                    }
                }              
            },
            callLogin(){
                if(env.app && env.gomeplus){
                    // if (sessionStorage.getItem('isLogin')) {
                    //     return;
                    // }
                    // sessionStorage.setItem('isLogin', 1)

                    GomeJSBridge.isLogin(
                        function(data){
                            console.log(data)
                            if(data.isLogined == 'Y'){
                                GomeJSBridge.getUserInfo(function(data){
                                    console.log(data.userId,data.loginName)
                                })
                            }else{
                                GomeJSBridge.login(null,null,{refresh:true});
                            }
                        },function(data){
                            console.log('error')
                        }
                    )
                }else{
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
            toast(){
                if (sessionStorage.getItem('isToast')) {
                    return;
                }
                sessionStorage.setItem('isToast', 1)
                this.$toast({
                    duration: 2000,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message:'亲，你的手机网络不太顺畅喔~',
                });
            },
            invalid(data){
                this.taskOff=true;
                this.allLoaded = true;
                if(data && data.taskId){
                    let taskId = data.taskId;
                    if(taskId=='' || taskId == undefined){
                        this.isOff=true;
                    }else {
                        this.isOff=false;
                        this.closeShareIcon();//关闭原生头部的shareIcon
                        let url = window.location.protocol+"//"+window.location.host+window.location.pathname;
                        this.InvalidUrl =url+"?taskId="+taskId;
                    }
                }else {
                    this.isOff=true;
                }
            },
            openQrcode(){
                this.fetchUserInfo('faceToface');//判断登录逻辑开通美店逻辑
                //增加数据埋点
                gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}');
                // this.qrCodeKey=true;
            },
            closeQrcode(){
                this.qrCodeKey=false;
            },
            openPoster(){
                this.fetchUserInfo('poster');//判断登录逻辑开通美店逻辑
                gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}');
            },
            share (product) {
                this.fetchUserInfo('immediately',product);//判断登录逻辑和开通美店逻辑
                gomeClicki('send', 'event', 'click', '{data-page}', '{data-code}');
                
            },
            getRequest(){
                return new Promise(function(resolve, reject) {
                    var url = window.location.search; //获取url中"?"符后的字串 
                    var theRequest = new Object(); 
                    if (url.indexOf("?") != -1) { 
                        var str = url.substr(1); 
                        var strs = str.split("&"); 
                        for(var i = 0; i < strs.length; i ++) { 
                            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
                        } 
                    } 
                    resolve(theRequest); 
                })
            }
        },
        mounted(){
            if(env.app && env.gomeplus){
                //alert('我的运行环境是gome--我的头部要隐藏掉');
                document.getElementById('headerTitle').style.display='none';//头部隐藏
                document.getElementById('inviteMain').style.top=0;
            }  
        }
    };
</script>

<style lang='scss' rel="stylesheet/scss" type="text/css">
    @import '../../../common/css/mixin';
    #inviteWarpper{
        width: 100%;
        height: 100%;
        position: relative;
        -webkit-overflow-scrolling: touch;
        #headerTitle{
            position: absolute;
            top:0;
            left:0;
        }
        .inviteMain{
            display: block;
            width:100%;
            position: absolute;
            top:0.44rem;
            bottom: 0;
            left:0;
            background: #F3F5F7;
            overflow-y: scroll;
            &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 0; 
            }
            
            .broadcast{
                width:100%;
                line-height:0.24rem;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                color: #5A6066;
                letter-spacing: 0;
                background: #F3F5F7;
            }
            .floorTwo{
                background: #FFFFFF;
                padding:0 0.15rem;
            }
            .immediately{
                background: #FFFFFF;
                padding-top:0.25rem;
                div{
                    width:2.7rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    text-align:center;
                    background-image: linear-gradient(90deg, #FA1E8C 0%, #FC1E56 100%);
                    border-radius: 100px;
                    margin: 0 auto;
                    
                    font-family: PingFangSC-Regular;
                    font-size: 0.16rem;
                    color: #FFFFFF;
                    letter-spacing: 0;
                }
            }
            .buttonWarpper{
                width:100%;
                height: 0.23rem;
                line-height: 0.23rem;
                padding-top:0.2rem;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 0.13rem;
                color: #C54568;
                letter-spacing: 0;
                background: #FFFFFF;

                display: flex;
                display: -webkit-flex; /* Safari */
                justify-content:center;
                align-items:center;
                .changeColor{
                    color: #C54568;
                }
                .leftButton,.rightButton{
                    i{
                        display:inline-block;
                        width:0.14rem;
                        height:0.14rem;
                        vertical-align: middle;
                        margin-top:-0.03rem;
                        margin-right:0.05rem;
                    }
                }
                .leftButton{
                    i{
                        background-size: 100%;
                        @include bg-image('../../../common/images/poster');
                    }
                }
                .rightButton{
                    box-sizing: border-box;
                    i{
                        background-size: 100%;
                        @include bg-image('../../../common/images/faceInvite');
                    }
                }
                .line{
                    font-size:0.2rem;
                    margin-top:-0.02rem;
                    padding:0 0.33rem;
                }
                
            }
            .inviteBottom{
                width:100%;
                padding-top:0.28rem;
                padding-bottom:0.11rem;
                background: #FFFFFF;
                .countWarpper{
                    width:100%;
                    height: 0.44rem;
                    font-family: PingFangSC-Semibold;
                    font-size: 0.15rem;
                    letter-spacing: 0;
                    ul{
                        padding:0 0.16rem;
                        height: 100%;
                        position: relative;
                        li{
                            float: left;
                            height: 100%;
                            text-align: center;
                            width:0.75rem;
                            &:nth-child(1),&:nth-child(2),&:nth-child(3){
                                margin-right:0.13rem;
                            }
                            .countNum{
                                width:100%;
                                height: 0.21rem;
                                line-height: 0.21rem;
                                color: #262C32;
                            }
                            .countType{
                                margin-top:0.05rem;
                                color: #919599;
                                font-size: 0.13rem;
                            }
                        }
                        .moneyType{
                            font-family: PingFangSC-Regular;
                            font-size: 0.1rem;
                            color: #919599;
                            line-height: 0.2rem;
                            position: absolute;
                            right:0.04rem;
                            top:0; 
                        }
                    }
                }
            }
            .noReward{
                font-family: PingFangSC-Regular;
                font-size: 0.13rem;
                color: #CACCCF;
                letter-spacing: 0;
                text-align: center;
                padding:0.5rem 0 0.81rem 0; 
                i{
                    display: inline-block;
                    width: 1.6rem;
                    height: 1.6rem;
                    background-size: 100%;
                    @include bg-image('../../../common/images/noReward');
                }
            }
        }
        .popUp{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.70);
            position: fixed;
            top:0;
            left:0;
            .qrCode{
                width: 2.75rem;
                height: 3.07rem;
                background: #FFFFFF;
                border-radius: 8px;
                font-family: PingFangSC-Regular;
                font-size: 0.14rem;
                color: #5A6066;
                letter-spacing: 0;
                margin:35% auto 0;
                text-align: center;
                .code{
                    width: 2.35rem;
                    height: 2.35rem;
                    padding:0.2rem 0.2rem 0 0.2rem;
                }
                .tips{
                    padding: 0.05rem 0.2rem 0 0.2rem;
                }
            }
            .closeButton{
                text-align: center;
                font-size:0;
                margin-top:8%;
                i{
                    display: inline-block;
                    width: 0.38rem;
                    height: 0.38rem;
                    background-size: 100%;
                    @include bg-image('../../../common/images/closeButton');
                }
            }
        }
    }
    .page-infinite-wrapper{
        height:1rem;
        margin-top: -1px;
        overflow: scroll;
        background:red;
    }
    .page-infinite-list{
        background: #F3F5F7;
        padding:0 0 0 0.15rem;
        .taskTitle{
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #262C32;
            letter-spacing: 0;
            padding: 0.16rem 0.15rem 0 0;
        }
        .page-infinite-listitem {
            padding: 0.1rem 0.15rem 0.1rem 0;
            @include border-bottom(#DCDDDE);
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #919599;
            letter-spacing: 0;
            &:first-child { 
                border-top: solid 1px #eee;
            }
            img{
                display: inline-block;
                width:0.42rem;
                height: 0.42rem;
                border-radius: 50%;
                margin-right: 0.15rem;
                vertical-align: middle;
            }
            span{
                display: inline-block;
                text-align: left;
            }
            .time{
                margin-left:0.58rem;
                width:0.8rem;
            }
            .userName{
                width:0.4rem;
            }
            .userState1{
                color: #C54568;
                float: right;
                margin-top:0.09rem;
            }
            .userState2{
                color: #14948C;
                float: right;
                margin-top:0.09rem;
            }
        }
    }
    
    .page-infinite-loading {
        text-align: center;
        line-height: 0.2rem;
        margin: 0.15rem 0;
        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        color: #5A6066;
        letter-spacing: 0;
        vertical-align: middle;
        span {
            display: inline-block;
            // vertical-align: middle;
            // margin-right: 5px;
        }
        i{
            display:inline-block;
            width:0.15rem;
            height:0.15rem;
            margin-right:0.14rem;
            background-size: 100%;
            background-image: url('../../../common/images/loading.gif');
            vertical-align: middle;
            margin-top:-0.02rem;
        }
    }

    
</style>
