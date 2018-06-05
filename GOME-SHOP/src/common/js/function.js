let css = `.toast-wrap{
	opacity: 0;
	position: fixed;
	top: 48%;
	color: #fff;
	width: 100%;
	text-align: center;
	font-size:12px;
	z-index：99999;
}
.toast-msg{
	background-color: rgba(39,39,39,0.7);
	padding: 12px;
	border-radius: 5px;
	min-width: 220px;
	font-size: 12px;
	line-height: 1.2;
	display:inline-block;
}
.toastAnimate{
	animation: toastKF 2s;
}
@keyframes toastKF{
	0% {opacity: 0;}
   25% {opacity: 1; z-index: 9999}
   50% {opacity: 1; z-index: 9999}
   75% {opacity: 1; z-index: 9999}
   100% {opacity: 0; z-index: 0}
}`;

function toast(msg){
	console.log(msg)
	var el = document.createElement('div')
	if(!document.getElementById("v-toast")){
		addCSS(css)
		el.id = 'v-toast'
		el.className = 'toast-wrap'
		el.innerHTML = '<span class="toast-msg"></span>'
		
		document.body.appendChild(el)
	}
	setTimeout(function(){
		document.getElementsByClassName('toast-wrap')[0].getElementsByClassName('toast-msg')[0].innerHTML=msg;
		var toastTag = document.getElementsByClassName('toast-wrap')[0];
		toastTag.className = toastTag.className.replace('toastAnimate','');
		setTimeout(function(){
			toastTag.className = toastTag.className + ' toastAnimate';
			setTimeout(()=>{
				if(document.getElementById("v-toast")){
					document.body.removeChild(document.getElementById("v-toast"))
				}
			},1999);
		}, 100);
	},500);
}
function addCSS(cssText){
    var style = document.createElement('style'),
        head = document.head || document.getElementsByTagName('head')[0];
    style.type = 'text/css';
    var textNode = document.createTextNode(cssText);
    style.appendChild(textNode);
    
    head.appendChild(style);
}
function formatTime(str) {
    if (!str) {
        return "";
    } else if (/^\d+$/.test(str)) {
        let time = new Date(str);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return (
        y +
        "-" +
        add0(m) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(mm) +
        ":" +
        add0(s)
        );
    }
    function add0(m) {
        return m < 10 ? "0" + m : m;
    }
}
function formatMoney(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    if (/^\d+$/.test(s)){
        s = s/100;
        s = (s).toFixed(2);
    }else if(/^\d+(\.\d+)$/.test(s)){
        s = s.toFixed(2);
    }
    /* 逢千+逗号 */
    /*var l = s
        .split(".")[0]
        .split("")
        .reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    return (
        t
        .split("")
        .reverse()
        .join("") +
        "." +
        r
    );*/

    return s;
}
function getUrlStr(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//
//设置cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	console.info(cname + "=" + cvalue + "; " + expires);
	document.cookie = cname + "=" + cvalue + "; " + expires;
	console.info(document.cookie);
}
//获取cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
	  var c = ca[i];
	  while (c.charAt(0) == " ") c = c.substring(1);
	  if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
}
//删除cookies
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//清除cookie
function clearCookie(key) {
	setCookie(""+key, "", -1);
}
//本地position
var poptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
}

function psuccess(pos) {
	var crd = pos.coords
	console.log('Your current position is:')
	console.log('Latitude : ' + crd.latitude)
	console.log('Longitude: ' + crd.longitude)
	console.log('More or less ' + crd.accuracy + ' meters.')
	return crd
}

function perror(err) {
	return false
}
  
function getPosition(){
	if (navigator.geolocation){
		return navigator.geolocation.getCurrentPosition(psuccess,perror,poptions)
	}else{
		return false
	}
}
export {
	addCSS,
	formatMoney,
	formatTime,
	getUrlStr,
	getPosition,
	setCookie,
	getCookie,
	clearCookie,
	delCookie,
	toast,
}
