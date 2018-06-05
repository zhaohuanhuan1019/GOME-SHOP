/*
*
*   使用方法：  
*
*  import weixinShare from '@/common/js/weixin'
*  
*  weixinShare({
*      weixin_share_friend:{ //分享给朋友
*          title:
*          desc:
*          link:
*          imgUrl:
*      },
*      qq:{ //分享到qq
*          title:
*          desc:
*          link:
*          imgUrl:
*      },
*      weixin_share_line:{ //分享朋友圈
*          title:
*          desc:
*          link:
*          imgUrl:
*      },
*      qq_zone:{ //分享qq空间
*          title:
*          desc:
*          link:
*          imgUrl:
*      }
*  })
* 
 */

import { env } from './env'
import { getWeiXinInfo } from '@/api/weixin'

export default async function(msg){
	if(env.wechat){
        if(document.getElementById('weixinSDK')){
            return init(msg)
        }

        const script = document.createElement("script")
        script.onload = function(){
        　　init(msg)
        }

        script.id = 'weixinSDK'
        script.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js"
        document.body.appendChild(script)
	}
}
async function init(msg){
    let info = await getWeiXinInfo({
        ctl: "weixin",
        act: "weixinShareHandler",
        soruce: "GomeMeidian",
        url: encodeURIComponent(window.location.href) 
    })

    wx.config({
        debug: false,
        appId: info.data.appid,
        timestamp: info.data.timestamp,
        nonceStr: info.data.noncestr,
        signature: info.data.signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'hideOptionMenu',
            'showOptionMenu',
            'onMenuShareQQ',
            'onMenuShareQZone',
        ]
    })

    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage',
                'onMenuShareAppMessage',
                'onMenuShareTimeline',
                'hideOptionMenu',
                'showOptionMenu',
                'onMenuShareQQ',
                'onMenuShareQZone',
            ],
            success: function (res) {
            //   alert(JSON.stringify(res));
            }
        })
        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
            title: msg.weixin_share_friend.title,
            desc: msg.weixin_share_friend.desc,
            link: msg.weixin_share_friend.link,
            imgUrl: msg.weixin_share_friend.imgUrl,

            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //  alert('用户点击发送给朋友');
            },
            success: function (res) {
              // alert('已分享');
            },
            cancel: function (res) {
               // alert('已取消');
            },
            fail: function (res) {
              //  alert(JSON.stringify(res));
            }
        })
        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
            title: msg.weixin_share_line.title,
            link:msg.weixin_share_line.link,
            imgUrl:msg.weixin_share_line.imgUrl,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
               // alert('用户点击分享到朋友圈');
            },
            success: function (res) {
               // alert('已分享');
            },
            cancel: function (res) {
                //alert('已取消');
            },
            fail: function (res) {
               // alert(JSON.stringify(res));
            }
        })
        // 分享到QQ
        wx.onMenuShareQQ({
            title: msg.qq.title, // 分享标题
            desc:msg.qq.desc, // 分享描述
            link: msg.qq.link, // 分享链接
            imgUrl: msg.qq.imgUrl, // 分享图标
            success: function () { 
               // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
               // 用户取消分享后执行的回调函数
            }
        })
        // 分享到QQ空间
        wx.onMenuShareQZone({
            title: msg.qq_zone.title, // 分享标题
            desc: msg.qq_zone.desc, // 分享描述
            link: msg.qq_zone.link, // 分享链接
            imgUrl: msg.qq_zone.imgUrl, // 分享图标
            success: function () { 
               // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        })
    })
}