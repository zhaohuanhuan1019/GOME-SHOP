/*
 * @Author: zhaoye 
 * @Date: 2017-01-03 17:17:04 
 * @Last Modified by: lixiaohu
 * @Last Modified time: 2018-03-16 14:36:31
 */

/**
 * @param Object 
 * 通过ua判断的环境变量
 */
let env = {
    
    /****按终端分*****/
    //wap，浏览器中
    wap      :  false,
    //app中，包含网页嵌套和混合app本地页面
    app      :  false,
    //混合app
    hybrid   :  false,
    //微信
    wechat   :  false,

    

    /****特殊容器*****/
    //国美在线容器
    gome     :  false,
    //美信容器
    gomeplus :  false,
    plusWebview:  false,
    //美店容器
    meidian: false,
    /****按环境分*****/
    //开发模式（混合app专用）
    dev      :  false,
    //线上环境
    live     :  false,
    //uat环境
    uat      :  false,
    //预生产
    tslive   :  false,

    // 是否是微博环境
    isWeiBo  :  false,
    // 是否是qq环境
    isQQ     :  false,
    // 是否为PC设备
    isPC     :  false,
    // 是否为手机设备
    isMobile :  false,
    //什么都判断不出来    
    unknown  :  false,
}

//判断是否开发模式（仅混合app）
if (window.navigator.userAgent.match(/dev\b/)) {
    env.dev = true;
    env.hybrid = true;
}

//判断环境
if(window.location.host.match(/gome\.com\.cn|gomeplus\.com/)){
    env.live = true;
}else if(window.location.host.match(/uat.*\.com/)){
    env.uat = true;
}else if(window.location.host.match(/tslive\.com\.cn/)){
    env.tslive = true;
}else{
    env.unknown = true;
}

if (window.navigator.userAgent.match(/Weibo/i)) {
    env.isWeiBo = true
} else if (window.navigator.userAgent.match(/QQ\//i) == "QQ/") {
    env.isQQ = true
} else if (window.navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
    env.isMobile = true
} else if (!window.navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i) ||
         window.navigator.userAgent.match(/pc/i)) {
    env.isPC = true
} 
//通过域名判断站点
if(window.location.host.match(/gome\.com\.cn|atguat\.com\.cn/)){
    env.gome = true;
}else if(window.location.host.match(/gomeplus\.com|uatplus\.com/)){
    env.gomeplus = true;
}

//判断终端
if(window.location.href.match(/^file\:\/\//) || env.dev){
//用于混合app的判断
    env.app = true;
    env.hybrid = true;
}
if(window.navigator.userAgent.match(/gome\/|gomplus\//)){
    //用于wap内嵌app的判断（判断ua）
    env.app = true;
    //容器判断站点
    //再判断ua，如果出现冲突，ua覆盖域名
    if(window.navigator.userAgent.match(/gomeplus/)){
        env.gomeplus = true;
        env.gome = false;
        if(window.navigator.userAgent.match(/\/(plus$|plus[^_])/)){
            env.plusWebview = true;
        }
    }else{
        env.gomeplus = false;
        env.gome = true;
    }

}else if(window.navigator.userAgent.match(/gomemeidian/i)){
    env.app = true;
    env.meidian = true;
}else if(window.navigator.userAgent.match(/MicroMessenger/i)){
    env.app = false
    env.wechat = true;
    env.wap = true;
}else{
    env.app = false
    env.wap = true;
}
if(window.location.href.match(/^http/)){
    env.wap = true;
}


//系统判断
let system = {
    android: false,
    ios: false
}
if(window.navigator.userAgent.match(/android/i)){
    system.android = true;
}else if(window.navigator.userAgent.match(/iPhone|iPad/i)){
    system.ios = true;
}
if(env.unknown && window.PackConfig){
    env[PackConfig.PLATFORM.toLowerCase()] = true;
    env[PackConfig.ENV.toLowerCase()] = true;
}

//第三方环境复写
if(window.GomeBridgePreConfig && window.GomeBridgePreConfig.env){
    for(var key in GomeBridgePreConfig.env){
        env[key] = GomeBridgePreConfig.env[key];
    }
}

export {
    env,
    system
}

export default {
    env,
    system
}