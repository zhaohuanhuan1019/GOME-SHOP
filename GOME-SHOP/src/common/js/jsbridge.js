//调用客户端传过来的areaId和shopId
function GoodsParameters() {  
    return new Promise(function(resolve, reject) {
        window.WebViewJavascriptBridge.callHandler(
            'jsToNativeGoodsParameters', {
                'param': ''
            },
            function(responseData) {
                let info = JSON.parse(String(responseData));
                window.GoodsParameters = info.data;
                resolve(info.data);
            }
        );
    });
}

// 美店调用nativa方法
function backNative(backType) {
    backType = backType || 0;
    // 请求返回
    return new Promise(function(resolve, reject) {
        window.WebViewJavascriptBridge.callHandler(
            'jsToNativeGoBack', {
                "code": 0,
                "msg": "",
                "data": {
                    "backType": backType //0是关闭页面  1是返回到上次h5页面,-1无法判断
                }
            },
            function(responseData) {}
        );
    });
}
// Native call back 美店nativa方法
function Nativeback() {
    // 请求返回
    return new Promise(function(resolve, reject) {
        window.WebViewJavascriptBridge.callHandler(
            'nativeToJsGoBack', {
                "code": 0,
                "msg": "",
                "data": {}
            },
            function(responseData) {
                setTitle('订单管理')
            }
        );
    });
}
// 美店调用header方法,获取用户信息
function getHeader () {
    // 获取请求头信息
    return new Promise(function (resolve, reject) {
        window.WebViewJavascriptBridge.callHandler(
            'jsToNativeGetHeader', {
                'param': ''
            },
            function (responseData) {
                let headerDate = JSON.parse(String(responseData));
                window.headers = headerDate.data;
                resolve(headerDate.data);
            }
        );
    });
}
// native给出的设置title方法
function setTitle (str){
    str = (typeof str === "string")?str:"";
    return new Promise((resolve, reject)=>{
        window.WebViewJavascriptBridge.callHandler(
            'jsToNativeReceiveTitleChange', {
                "code": 0,
                "msg": "",
                "data": {
                    "pageTitle": ''+str
                }
            },
            function (responseData) {}
        );
    });
}
function toShare() {
    // 请求分享
    return new Promise(function(resolve, reject) {
        window.WebViewJavascriptBridge.callHandler(
            'jsToNativeToShare', {
                "code": 0,
                "msg": "",
                "data": {
                    "shareInfo": {}
                }
            },
            function(responseData) {}
        );
    });
}

//错误，要求登录的js->Native 方法
function accountLogin() {
    return new Promise(function(resolve, reject) {
        window.WebViewJavascriptBridge.callHandler(
            'jsToNativeLogin', {
                "code":0,
                "msg":"",
                "data":{}
            },
            function(responseData) {
            }
        );
    });
}
// 调用复制
function copyText (textAddress) {
    return new Promise(function (resolve, reject) {
        window.WebViewJavascriptBridge.callHandler(
            'jsToNativeCopy',
            textAddress,
            function (responseData) {
                console.log(responseData)
            },
            function (err){
                console.log(err)
            }
        );
    });
}
// 获取账户信息
function getMyInfo() {
	return new Promise(function(resolve, reject) {
		window.WebViewJavascriptBridge.callHandler(
			'jsToNativeGetUserInfo', {
				'param': ''
			},
			function(responseData) {
				let info = JSON.parse(String(responseData));
				resolve(info.data);
			},function (err) {
				console.log(err);
			}
		);
	});
}

function findGoods() {
	return new Promise(function(resolve, reject) {
		window.WebViewJavascriptBridge.callHandler(
			'jsToNativeFindGoods', {
				'param': ''
			},
			function(responseData) {
				let info = JSON.parse(String(responseData));
				console.log(info)
				resolve(info.data);
			}
		);
	});
}

export default {
    accountLogin,
    backNative,
    GoodsParameters,
    getHeader,
    setTitle,
    toShare,
    getMyInfo,
    copyText,
	findGoods
}
