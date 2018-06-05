var timer = null,
    url = {
        open: 'gomeplusapp://m.gome.com.cn/mshop_channel.html',
        down: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.gome.eshopnew&g_f=991653'
    },
    isAndroid = !!navigator.userAgent.match(/android/ig),
    isIos = !!navigator.userAgent.match(/iphone|ipod/ig),
    isIpad = !!navigator.userAgent.match(/ipad/ig),
    isWeixin = (/MicroMessenger/ig).test(navigator.userAgent),
    isQQ = (/qq/ig).test(navigator.userAgent);

function openApp() {
    if (isIos||isIpad) {
        window.location.href = url.open
        setTimeout(function() {
            location.href = url.down;
        }, 1000);
        setTimeout(function() {
            location.reload();
        }, 1500);
    }

    if (isAndroid) {
        if (isWeixin || isQQ) {
            location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.gome.eshopnew&android_schema=' + url.open;
        } else {
            var iframe = document.createElement('iframe');
iframe.style.cssText = 'display:none;width=0;height=0';document.body.appendChild(iframe);
            iframe.src = url.open;
            var t = Date.now();
            timer = setTimeout(function () {
                if (Date.now() - t > 1200) {
                    clearTimeout(timer);
                    return false;
                }
                if (document.webkitHidden || document.hidden) {
                    return false;
                }
                location.href = url.down;
            }, 1000);
        }
    }
}
document.addEventListener("webkitvisibilitychange", () => {
    var tag = document.hidden || document.webkitHidden;
    if (tag) {
        clearTimeout(timer);
    }
})
window.addEventListener('pagehide', () => {
    clearTimeout(timer);
})

export {openApp}
