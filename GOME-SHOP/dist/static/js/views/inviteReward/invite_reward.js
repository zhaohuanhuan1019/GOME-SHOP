webpackJsonp([9],{100:function(t,e){},102:function(t,e,a){var r;!function(e,a){t.exports=a()}(0,function(){function t(t){this.mode=c.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,a=this.data.length;e<a;e++){var r=[],n=this.data.charCodeAt(e);n>65536?(r[0]=240|(1835008&n)>>>18,r[1]=128|(258048&n)>>>12,r[2]=128|(4032&n)>>>6,r[3]=128|63&n):n>2048?(r[0]=224|(61440&n)>>>12,r[1]=128|(4032&n)>>>6,r[2]=128|63&n):n>128?(r[0]=192|(1984&n)>>>6,r[1]=128|63&n):r[0]=n,this.parsedData.push(r)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function a(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var a=0;a<t.length&&0==t[a];)a++;this.num=new Array(t.length-a+e);for(var r=0;r<t.length-a;r++)this.num[r]=t[r+a]}function n(t,e){this.totalCount=t,this.dataCount=e}function i(){this.buffer=[],this.length=0}function o(){var t=!1,e=navigator.userAgent;if(/android/i.test(e)){t=!0;var a=e.toString().match(/android ([0-9]\.[0-9])/i);a&&a[1]&&(t=parseFloat(a[1]))}return t}function s(t,e){for(var a=1,r=l(t),n=0,i=v.length;n<=i;n++){var o=0;switch(e){case d.L:o=v[n][0];break;case d.M:o=v[n][1];break;case d.Q:o=v[n][2];break;case d.H:o=v[n][3]}if(r<=o)break;a++}if(a>v.length)throw new Error("Too long data");return a}function l(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}t.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,a=this.parsedData.length;e<a;e++)t.put(this.parsedData[e],8)}},e.prototype={addData:function(e){var a=new t(e);this.dataList.push(a),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,a){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,a),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,a)},setupPositionProbePattern:function(t,e){for(var a=-1;a<=7;a++)if(!(t+a<=-1||this.moduleCount<=t+a))for(var r=-1;r<=7;r++)e+r<=-1||this.moduleCount<=e+r||(this.modules[t+a][e+r]=0<=a&&a<=6&&(0==r||6==r)||0<=r&&r<=6&&(0==a||6==a)||2<=a&&a<=4&&2<=r&&r<=4)},getBestMaskPattern:function(){for(var t=0,e=0,a=0;a<8;a++){this.makeImpl(!0,a);var r=h.getLostPoint(this);(0==a||t>r)&&(t=r,e=a)}return e},createMovieClip:function(t,e,a){var r=t.createEmptyMovieClip(e,a);this.make();for(var n=0;n<this.modules.length;n++)for(var i=1*n,o=0;o<this.modules[n].length;o++){var s=1*o,l=this.modules[n][o];l&&(r.beginFill(0,100),r.moveTo(s,i),r.lineTo(s+1,i),r.lineTo(s+1,i+1),r.lineTo(s,i+1),r.endFill())}return r},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=h.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var a=0;a<t.length;a++){var r=t[e],n=t[a];if(null==this.modules[r][n])for(var i=-2;i<=2;i++)for(var o=-2;o<=2;o++)this.modules[r+i][n+o]=-2==i||2==i||-2==o||2==o||0==i&&0==o}},setupTypeNumber:function(t){for(var e=h.getBCHTypeNumber(this.typeNumber),a=0;a<18;a++){var r=!t&&1==(e>>a&1);this.modules[Math.floor(a/3)][a%3+this.moduleCount-8-3]=r}for(var a=0;a<18;a++){var r=!t&&1==(e>>a&1);this.modules[a%3+this.moduleCount-8-3][Math.floor(a/3)]=r}},setupTypeInfo:function(t,e){for(var a=this.errorCorrectLevel<<3|e,r=h.getBCHTypeInfo(a),n=0;n<15;n++){var i=!t&&1==(r>>n&1);n<6?this.modules[n][8]=i:n<8?this.modules[n+1][8]=i:this.modules[this.moduleCount-15+n][8]=i}for(var n=0;n<15;n++){var i=!t&&1==(r>>n&1);n<8?this.modules[8][this.moduleCount-n-1]=i:n<9?this.modules[8][15-n-1+1]=i:this.modules[8][15-n-1]=i}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var a=-1,r=this.moduleCount-1,n=7,i=0,o=this.moduleCount-1;o>0;o-=2)for(6==o&&o--;;){for(var s=0;s<2;s++)if(null==this.modules[r][o-s]){var l=!1;i<t.length&&(l=1==(t[i]>>>n&1));var c=h.getMask(e,r,o-s);c&&(l=!l),this.modules[r][o-s]=l,n--,-1==n&&(i++,n=7)}if((r+=a)<0||this.moduleCount<=r){r-=a,a=-a;break}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,a,r){for(var o=n.getRSBlocks(t,a),s=new i,l=0;l<r.length;l++){var c=r[l];s.put(c.mode,4),s.put(c.getLength(),h.getLengthInBits(c.mode,t)),c.write(s)}for(var d=0,l=0;l<o.length;l++)d+=o[l].dataCount;if(s.getLengthInBits()>8*d)throw new Error("code length overflow. ("+s.getLengthInBits()+">"+8*d+")");for(s.getLengthInBits()+4<=8*d&&s.put(0,4);s.getLengthInBits()%8!=0;)s.putBit(!1);for(;;){if(s.getLengthInBits()>=8*d)break;if(s.put(e.PAD0,8),s.getLengthInBits()>=8*d)break;s.put(e.PAD1,8)}return e.createBytes(s,o)},e.createBytes=function(t,e){for(var r=0,n=0,i=0,o=new Array(e.length),s=new Array(e.length),l=0;l<e.length;l++){var c=e[l].dataCount,d=e[l].totalCount-c;n=Math.max(n,c),i=Math.max(i,d),o[l]=new Array(c);for(var u=0;u<o[l].length;u++)o[l][u]=255&t.buffer[u+r];r+=c;var f=h.getErrorCorrectPolynomial(d),g=new a(o[l],f.getLength()-1),v=g.mod(f);s[l]=new Array(f.getLength()-1);for(var u=0;u<s[l].length;u++){var p=u+v.getLength()-s[l].length;s[l][u]=p>=0?v.get(p):0}}for(var m=0,u=0;u<e.length;u++)m+=e[u].totalCount;for(var _=new Array(m),w=0,u=0;u<n;u++)for(var l=0;l<e.length;l++)u<o[l].length&&(_[w++]=o[l][u]);for(var u=0;u<i;u++)for(var l=0;l<e.length;l++)u<s[l].length&&(_[w++]=s[l][u]);return _};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},u={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},h={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;h.getBCHDigit(e)-h.getBCHDigit(h.G15)>=0;)e^=h.G15<<h.getBCHDigit(e)-h.getBCHDigit(h.G15);return(t<<10|e)^h.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;h.getBCHDigit(e)-h.getBCHDigit(h.G18)>=0;)e^=h.G18<<h.getBCHDigit(e)-h.getBCHDigit(h.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return h.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,a){switch(t){case u.PATTERN000:return(e+a)%2==0;case u.PATTERN001:return e%2==0;case u.PATTERN010:return a%3==0;case u.PATTERN011:return(e+a)%3==0;case u.PATTERN100:return(Math.floor(e/2)+Math.floor(a/3))%2==0;case u.PATTERN101:return e*a%2+e*a%3==0;case u.PATTERN110:return(e*a%2+e*a%3)%2==0;case u.PATTERN111:return(e*a%3+(e+a)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new a([1],0),r=0;r<t;r++)e=e.multiply(new a([1,f.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:case c.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),a=0,r=0;r<e;r++)for(var n=0;n<e;n++){for(var i=0,o=t.isDark(r,n),s=-1;s<=1;s++)if(!(r+s<0||e<=r+s))for(var l=-1;l<=1;l++)n+l<0||e<=n+l||0==s&&0==l||o==t.isDark(r+s,n+l)&&i++;i>5&&(a+=3+i-5)}for(var r=0;r<e-1;r++)for(var n=0;n<e-1;n++){var c=0;t.isDark(r,n)&&c++,t.isDark(r+1,n)&&c++,t.isDark(r,n+1)&&c++,t.isDark(r+1,n+1)&&c++,0!=c&&4!=c||(a+=3)}for(var r=0;r<e;r++)for(var n=0;n<e-6;n++)t.isDark(r,n)&&!t.isDark(r,n+1)&&t.isDark(r,n+2)&&t.isDark(r,n+3)&&t.isDark(r,n+4)&&!t.isDark(r,n+5)&&t.isDark(r,n+6)&&(a+=40);for(var n=0;n<e;n++)for(var r=0;r<e-6;r++)t.isDark(r,n)&&!t.isDark(r+1,n)&&t.isDark(r+2,n)&&t.isDark(r+3,n)&&t.isDark(r+4,n)&&!t.isDark(r+5,n)&&t.isDark(r+6,n)&&(a+=40);for(var d=0,n=0;n<e;n++)for(var r=0;r<e;r++)t.isDark(r,n)&&d++;return a+=Math.abs(100*d/e/e-50)/5*10}},f={glog:function(t){if(t<1)throw new Error("glog("+t+")");return f.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return f.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},g=0;g<8;g++)f.EXP_TABLE[g]=1<<g;for(var g=8;g<256;g++)f.EXP_TABLE[g]=f.EXP_TABLE[g-4]^f.EXP_TABLE[g-5]^f.EXP_TABLE[g-6]^f.EXP_TABLE[g-8];for(var g=0;g<255;g++)f.LOG_TABLE[f.EXP_TABLE[g]]=g;a.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var n=0;n<t.getLength();n++)e[r+n]^=f.gexp(f.glog(this.get(r))+f.glog(t.get(n)));return new a(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=f.glog(this.get(0))-f.glog(t.get(0)),r=new Array(this.getLength()),n=0;n<this.getLength();n++)r[n]=this.get(n);for(var n=0;n<t.getLength();n++)r[n]^=f.gexp(f.glog(t.get(n))+e);return new a(r,0).mod(t)}},n.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],n.getRSBlocks=function(t,e){var a=n.getRsBlockTable(t,e);if(void 0==a)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var r=a.length/3,i=[],o=0;o<r;o++)for(var s=a[3*o+0],l=a[3*o+1],c=a[3*o+2],d=0;d<s;d++)i.push(new n(l,c));return i},n.getRsBlockTable=function(t,e){switch(e){case d.L:return n.RS_BLOCK_TABLE[4*(t-1)+0];case d.M:return n.RS_BLOCK_TABLE[4*(t-1)+1];case d.Q:return n.RS_BLOCK_TABLE[4*(t-1)+2];case d.H:return n.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},i.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var a=0;a<e;a++)this.putBit(1==(t>>>e-a-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var v=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],p=function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){function e(t,e){var a=document.createElementNS("http://www.w3.org/2000/svg",t);for(var r in e)e.hasOwnProperty(r)&&a.setAttribute(r,e[r]);return a}var a=this._htOption,r=this._el,n=t.getModuleCount();Math.floor(a.width/n),Math.floor(a.height/n);this.clear();var i=e("svg",{viewBox:"0 0 "+String(n)+" "+String(n),width:"100%",height:"100%",fill:a.colorLight});i.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),r.appendChild(i),i.appendChild(e("rect",{fill:a.colorLight,width:"100%",height:"100%"})),i.appendChild(e("rect",{fill:a.colorDark,width:"1",height:"1",id:"template"}));for(var o=0;o<n;o++)for(var s=0;s<n;s++)if(t.isDark(o,s)){var l=e("use",{x:String(s),y:String(o)});l.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),i.appendChild(l)}},t.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},t}(),m="svg"===document.documentElement.tagName.toLowerCase(),_=m?p:function(){return"undefined"!=typeof CanvasRenderingContext2D}()?function(){function t(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function e(t,e){var a=this;if(a._fFail=e,a._fSuccess=t,null===a._bSupportDataURI){var r=document.createElement("img"),n=function(){a._bSupportDataURI=!1,a._fFail&&a._fFail.call(a)},i=function(){a._bSupportDataURI=!0,a._fSuccess&&a._fSuccess.call(a)};return r.onabort=n,r.onerror=n,r.onload=i,void(r.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")}!0===a._bSupportDataURI&&a._fSuccess?a._fSuccess.call(a):!1===a._bSupportDataURI&&a._fFail&&a._fFail.call(a)}if(this._android&&this._android<=2.1){var a=1/window.devicePixelRatio,r=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(t,e,n,i,o,s,l,c,d){if("nodeName"in t&&/img/i.test(t.nodeName))for(var u=arguments.length-1;u>=1;u--)arguments[u]=arguments[u]*a;else void 0===c&&(arguments[1]*=a,arguments[2]*=a,arguments[3]*=a,arguments[4]*=a);r.apply(this,arguments)}}var n=function(t,e){this._bIsPainted=!1,this._android=o(),this._htOption=e,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=e.width,this._elCanvas.height=e.height,t.appendChild(this._elCanvas),this._el=t,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.alt="Scan me!",this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return n.prototype.draw=function(t){var e=this._elImage,a=this._oContext,r=this._htOption,n=t.getModuleCount(),i=r.width/n,o=r.height/n,s=Math.round(i),l=Math.round(o);e.style.display="none",this.clear();for(var c=0;c<n;c++)for(var d=0;d<n;d++){var u=t.isDark(c,d),h=d*i,f=c*o;a.strokeStyle=u?r.colorDark:r.colorLight,a.lineWidth=1,a.fillStyle=u?r.colorDark:r.colorLight,a.fillRect(h,f,i,o),a.strokeRect(Math.floor(h)+.5,Math.floor(f)+.5,s,l),a.strokeRect(Math.ceil(h)-.5,Math.ceil(f)-.5,s,l)}this._bIsPainted=!0},n.prototype.makeImage=function(){this._bIsPainted&&e.call(this,t)},n.prototype.isPainted=function(){return this._bIsPainted},n.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},n.prototype.round=function(t){return t?Math.floor(1e3*t)/1e3:t},n}():function(){var t=function(t,e){this._el=t,this._htOption=e};return t.prototype.draw=function(t){for(var e=this._htOption,a=this._el,r=t.getModuleCount(),n=Math.floor(e.width/r),i=Math.floor(e.height/r),o=['<table style="border:0;border-collapse:collapse;">'],s=0;s<r;s++){o.push("<tr>");for(var l=0;l<r;l++)o.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+n+"px;height:"+i+"px;background-color:"+(t.isDark(s,l)?e.colorDark:e.colorLight)+';"></td>');o.push("</tr>")}o.push("</table>"),a.innerHTML=o.join("");var c=a.childNodes[0],d=(e.width-c.offsetWidth)/2,u=(e.height-c.offsetHeight)/2;d>0&&u>0&&(c.style.margin=u+"px "+d+"px")},t.prototype.clear=function(){this._el.innerHTML=""},t}();return r=function(t,e){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof e&&(e={text:e}),e)for(var a in e)this._htOption[a]=e[a];"string"==typeof t&&(t=document.getElementById(t)),this._htOption.useSVG&&(_=p),this._android=o(),this._el=t,this._oQRCode=null,this._oDrawing=new _(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},r.prototype.makeCode=function(t){this._oQRCode=new e(s(t,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(t),this._oQRCode.make(),this._el.title=t,this._oDrawing.draw(this._oQRCode),this.makeImage()},r.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},r.prototype.clear=function(){this._oDrawing.clear()},r.CorrectLevel=d,r})},103:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"qr",style:this.data.style,attrs:{id:"qrcode"}})},staticRenderFns:[]}},104:function(t,e,a){a(100);var r=a(0)(a(89),a(103),null,null);t.exports=r.exports},140:function(t,e,a){a(365);var r=a(0)(a(252),a(423),null,null);t.exports=r.exports},199:function(t,e,a){"use strict";a.d(e,"c",function(){return n}),a.d(e,"d",function(){return i}),a.d(e,"b",function(){return o}),a.d(e,"a",function(){return s});var r=a(10),n=function(t){return a.i(r.a)("taskInviting",t)},i=function(t){return a.i(r.a)("taskInvited",t)},o=function(t){return a.i(r.a)("getRewardList",t)},s=function(t){return a.i(r.a)("firstRewardUserInfo",t)}},212:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(1),n=a(140),i=a.n(n),o=a(3),s=(a.n(o),a(5)),l=(a.n(s),a(2)),c=a.n(l),d=a(4);a.n(d);r.default.use(c.a),new r.default({render:function(t){return t(i.a)}}).$mount("#app")},235:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{data:{type:Array},time:{type:Number,default:3e3}},data:function(){return{curIdx:0}},methods:{autoPlay:function(){setInterval(this.changeIndex,this.time)},changeIndex:function(){this.curIdx===this.data.length-1?this.curIdx=0:this.curIdx++}},mounted:function(){this.autoPlay()}}},252:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(28),n=a.n(r),i=a(29),o=a.n(i),s=a(7),l=a.n(s),c=a(6),d=a.n(c),u=a(14),h=a.n(u),f=a(68),g=a.n(f),v=a(104),p=a.n(v),m=a(439),_=a.n(m),w=a(64),k=a.n(w),C=a(63),I=a.n(C),y=a(20),b=a(8),D=a(11),A=a(37),P=a(199),x=a(35);e.default={props:[],data:function(){return{InvalidUrl:"http://www.baidu.com",isOff:!0,broadArr:[],cmsBroadArr:[],QrCodeData:{width:225,height:225,colorDark:"#000000",colorLight:"#ffffff",url:"",style:"display:inline-block"},WapShareDate:{title:"",desc:"",link:"",imgUrl:""},AppShareParam:{},cmsData:[],taskId:"",userId:"",cmsPageInfo:{sharePromo:""},taskOff:!1,loading:!1,allLoaded:!1,noReward:!1,qrCodeKey:!1,isRequestInviting:!0,invitingPageNum:0,invitingPageSize:30,invitedPageNum:1,invitedPageSize:30,invitingRes:"",invitingList:[],invitedRes:"",invitedList:[],noticeDate:"",createdKey:!1,loadermoreKey:!1}},components:{headTop:h.a,floorPhoto:g.a,QrCode:p.a,broadcast:_.a,offlineActivity:k.a,expiredActivity:I.a},filters:{formatYear:function(t){if(null==t)return"无到账时间";var e=new Date(t),a=e.getFullYear(),r=e.getMonth()+1;r=r<10?"0"+r:r;var n=e.getDate();return n=n<10?"0"+n:n,a+"-"+r+"-"+n},formatNum:function(t){if("number"==typeof t){var e=String(t).indexOf(".")>-1,a=t.toString().length;return e&&(a-=1),a>6?"99999+":t}}},computed:{isShowPoster:function(){var t=this.cmsPageInfo.sharePromo.split("=");return console.log(!t[1]),"on"==t[1]||!t[1]}},created:function(){var t=this;return d()(l.a.mark(function e(){var r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return sessionStorage.removeItem("isToast"),e.next=3,t.getRequest();case 3:if(r=e.sent,t.taskId=r.taskId,console.log(t.taskId),""!=t.taskId&&void 0!=t.taskId){e.next=13;break}t.taskOff=!0,t.isOff=!0,t.closeShareIcon(),console.log("taskId为空 或者为undefined"),e.next=21;break;case 13:return e.next=15,t.fetchCMSModule();case 15:return e.next=17,t.getRewardList();case 17:a.i(A.a)({weixin_share_friend:t.WapShareDate,qq:t.WapShareDate,weixin_share_line:t.WapShareDate,qq_zone:t.WapShareDate}),t.createdKey=!0,console.log("createdKey===="+t.createdKey+"---loadermoreKey===="+t.loadermoreKey),t.scrollPos();case 21:case"end":return e.stop()}},e,t)}))()},methods:{setHeadBar:function(){var t=navigator.userAgent;if(t.indexOf("Android")>-1||t.indexOf("Adr")>-1){var e=this;GomeJSBridge.ready(function(){var t={title:e.cmsPageInfo.promoName,titleColor:"333333",menus:{isShowCloseMenu:"N",rightMenus:[{type:"callback",title:"回调",icon:"file://share",data:{}}]}};GomeJSBridge.setHeadBar(function(t){},function(t){},t)},null),GomeJSBridge.onCallback(function(t){e.callShareComp()})}else{var a={title:this.cmsPageInfo.promoName,titleColor:"333333",menus:{isShowCloseMenu:"N",rightMenus:[{type:"share",title:"分享",icon:"file://share",shareInfo:this.AppShareParam}]}};console.log(a),GomeJSBridge.setHeadBar(function(t){},function(t){},a)}},closeShareIcon:function(){if(b.b.app&&b.b.gomeplus){var t={title:this.titleName,titleColor:"333333"};GomeJSBridge.setHeadBar(function(t){},function(t){},t)}},callShareComp:function(){var t=this.AppShareParam;console.log(t),GomeJSBridge.callShareComp(function(t){console.log(t);var e=document.getElementById("inviteMain").scrollTop;localStorage.setItem("inviteRewardTop",e);var a=navigator.userAgent;(a.indexOf("Android")>-1||a.indexOf("Adr")>-1)&&"3"!==t.shareResult&&"WeiBo"==t.platform&&(console.log("cookie丢失，需要强刷页面"),location.replace(window.location.protocol+"//"+window.location.host+"/api-meidian-app/task/path/v1/inviteUrl"))},function(t){console.log(t)},t)},fetchUserInfo:function(t,e){var r=this;return d()(l.a.mark(function n(){var i,o,s,c;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a.i(P.a)();case 2:i=n.sent,o=i.data,console.log(o),0==o.code?(o=o.data,r.userId=o.userId,console.log(r.userId),o.openShop?"faceToface"==t?(r.QrCodeData.url=window.location.protocol+"//"+window.location.host+"/views/invitedNew/invited_new.html?taskId="+r.taskId+"&userId="+r.userId,console.log(r.QrCodeData.url),r.qrCodeKey=!0):"poster"==t?window.location.href="/views/createPoster/create_poster.html?taskId="+r.taskId:"immediately"==t&&(r.WapShareDate.link=window.location.protocol+"//"+window.location.host+"/views/invitedNew/invited_new.html?taskId="+r.taskId+"&userId="+r.userId,r.AppShareParam.shareUrl=window.location.protocol+"//"+window.location.host+"/views/invitedNew/invited_new.html?taskId="+r.taskId+"&userId="+r.userId,b.b.app&&b.b.gomeplus?r.callShareComp():b.b.wap&&(console.log(e),a.i(y.a)(e))):(s=window.location.host,c=RegExp(/atguat/),c.test(s)?window.location.href="http://shop.m.atguat.com.cn/mshop_setting.html":window.location.href="https://shop.m.gome.com.cn/mshop_setting.html")):1104==o.code?(console.log("需要调用登录页"),r.callLogin()):r.toast();case 6:case"end":return n.stop()}},n,r)}))()},fetchTextIndex:function(){var t=this;return d()(l.a.mark(function e(){var r,n,i,o,s,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.i(x.b)({keyProms:"channeldL4PRZBdl2c"});case 2:if(r=e.sent,n=r.data,0==n.code){for(i=n.data.templetList,o=0;o<i.length;o++)if("690"==i[o].templetId)for(s=i[o].dataList,c=0;c<s.length;c++)t.cmsBroadArr.push(s[c].remark);t.broadArr=t.broadArr.concat(t.cmsBroadArr).slice(0,20)}else t.toast();case 5:case"end":return e.stop()}},e,t)}))()},fetchCMSModule:function(){var t=this;return d()(l.a.mark(function e(){var r,n,i;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.i(x.a)({keyProms:"channelMWhjGIvmmDD",gpsLongitude:"",gpsLatitude:""});case 2:r=e.sent,0==r.data.code?(n=r.data.data.templetList,t.cmsData=n,t.cmsPageInfo=r.data.data.pageInfo,i=t.cmsPageInfo.sharePromo.split("#"),t.WapShareDate={title:i[0],desc:i[1]?i[1]:"发现了超值活动，速来围观！",link:window.location.href,imgUrl:t.cmsPageInfo.shareImgUrl?window.location.protocol+t.cmsPageInfo.shareImgUrl:""},t.AppShareParam={title:i[0],shareDesc:i[1]?i[1]:"发现了超值活动，速来围观！",shareImageUrl:t.cmsPageInfo.shareImgUrl?window.location.protocol+t.cmsPageInfo.shareImgUrl:"",shareUrl:window.location.href,platform:["WeiBo","Wechat","WechatMoments","QQ","QZone","CopyLink"]},b.b.app&&b.b.gomeplus&&t.setHeadBar()):t.toast();case 4:case"end":return e.stop()}},e,t)}))()},getRewardList:function(){var t=this;return d()(l.a.mark(function e(){var r,n,i,s,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getRequest();case 2:if(r=e.sent,t.taskId=r.taskId,""!=t.taskId){e.next=9;break}t.taskOff=!0,t.isOff=!0,e.next=29;break;case 9:return e.next=11,a.i(P.b)({taskId:t.taskId});case 11:if(n=e.sent,i=n.data,0!=i.code){e.next=28;break}if("{}"===o()(i.data)){e.next=25;break}for(t.noticeDate=i.data,s=0;s<t.noticeDate.length;s++)c=t.noticeDate[s].inviterNickName.substr(0,1)+"**"+t.noticeDate[s].inviterNickName.substr(-1)+"成功邀请"+t.noticeDate[s].receiverNickName.substr(0,1)+"**"+t.noticeDate[s].receiverNickName.substr(-1)+"获得"+t.noticeDate[s].rewardNum/100+"元",t.broadArr.push(c);if(!(i.data.length<20)){e.next=22;break}return e.next=20,t.fetchTextIndex();case 20:e.next=23;break;case 22:t.broadArr=t.broadArr.slice(0,20);case 23:e.next=26;break;case 25:console.log("RewardList接口data为空");case 26:e.next=29;break;case 28:10102==i.code?t.invalid(i.data):t.toast();case 29:case"end":return e.stop()}},e,t)}))()},getInvitingList:function(){var t=this;return d()(l.a.mark(function e(){var r,n,i,o,s,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getRequest();case 2:if(r=e.sent,t.taskId=r.taskId,""!=t.taskId&&void 0!=t.taskId){e.next=9;break}t.taskOff=!0,t.isOff=!0,e.next=36;break;case 9:return e.next=11,a.i(P.c)({taskId:t.taskId,pageNum:t.invitingPageNum,pageSize:t.invitingPageSize});case 11:if(n=e.sent,i=n.data,console.log(i.code),0!=i.code){e.next=35;break}if(t.invitingRes=i.data.businessObj,!((o=i.data.businessObj)&&o.onlyOpenShopUser&&o.onlyOpenShopUser.length>0)){e.next=26;break}for(s=o.onlyOpenShopUser,c=0;c<s.length;c++)t.invitingList.push(s[c]);if(!(s.length<t.invitingPageSize)){e.next=24;break}return t.isRequestInviting=!1,e.next=24,t.getInvitedList();case 24:e.next=33;break;case 26:if(!o||!o.onlyOpenShopUser||0!=o.onlyOpenShopUser.length){e.next=32;break}return t.isRequestInviting=!1,e.next=30,t.getInvitedList();case 30:e.next=33;break;case 32:console.log("Inviting接口返回的数据不同时满足businessObj && businessObj.onlyOpenShopUser && businessObj.onlyOpenShopUser.length>=0的条件");case 33:e.next=36;break;case 35:10102==i.code?t.invalid(i.data):1104==i.code?(t.allLoaded=!0,t.noReward=!0):(t.allLoaded=!0,t.toast());case 36:case"end":return e.stop()}},e,t)}))()},getInvitedList:function(){var t=this;return d()(l.a.mark(function e(){var r,n,i,o;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!=t.taskId&&void 0!=t.taskId){e.next=5;break}t.taskOff=!0,t.isOff=!0,e.next=10;break;case 5:return e.next=7,a.i(P.d)({taskId:t.taskId,pageNum:t.invitedPageNum,pageSize:t.invitedPageSize});case 7:if(r=e.sent,n=r.data,0==n.code)if(t.invitedRes=n.data,t.invitedRes.firstOrderUser.length<t.invitedPageSize&&(t.allLoaded=!0),n.data.firstOrderUser&&n.data.firstOrderUser.length>0)for(i=t.invitedRes.firstOrderUser,o=0;o<i.length;o++)t.invitedList.push(i[o]);else n.data.firstOrderUser&&0==n.data.firstOrderUser.length?(console.log("“任务已完成firstOrderUser”是空数组"),0==t.invitingList.length?t.noReward=!0:t.noReward=!1):console.log("Invited接口返回的数据不同时满足resData.data.firstOrderUser && resData.data.firstOrderUser.length>=0");else 10102==n.code?t.invalid(n.data):1104==n.code?(t.allLoaded=!0,t.noReward=!0):(t.allLoaded=!0,t.toast());case 10:case"end":return e.stop()}},e,t)}))()},loadMore:function(){var t=this;return d()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.allLoaded){e.next=2;break}return e.abrupt("return");case 2:if(t.loading=!0,1!=t.isRequestInviting){e.next=9;break}return t.invitingPageNum++,e.next=7,t.getInvitingList();case 7:e.next=12;break;case 9:return t.invitedPageNum++,e.next=12,t.getInvitedList();case 12:setTimeout(function(){t.loading=!1},5e3),t.loadermoreKey=!0,console.log("createdKey===="+t.createdKey+"---loadermoreKey===="+t.loadermoreKey),t.scrollPos();case 16:case"end":return e.stop()}},e,t)}))()},scrollPos:function(){if(this.createdKey&&this.loadermoreKey){var t=navigator.userAgent;(t.indexOf("Android")>-1||t.indexOf("Adr")>-1)&&null!==localStorage.getItem("inviteRewardTop")&&this.$nextTick(function(){var t=localStorage.getItem("inviteRewardTop");console.log(t),setTimeout(function(){document.getElementById("inviteMain").scrollTop=t,localStorage.removeItem("inviteRewardTop"),console.log(document.getElementById("inviteMain").scrollTop)},500)})}},callLogin:function(){if(b.b.app&&b.b.gomeplus)GomeJSBridge.isLogin(function(t){console.log(t),"Y"==t.isLogined?GomeJSBridge.getUserInfo(function(t){console.log(t.userId,t.loginName)}):GomeJSBridge.login(null,null,{refresh:!0})},function(t){console.log("error")});else{var t=window.location.host;RegExp(/atguat/).test(t)?window.location.href="http://login.m.atguat.com.cn/login.html?return_url="+a.i(D.a)(window.location.href):window.location.href="http://login.m.gome.com.cn/login.html?return_url="+a.i(D.a)(window.location.href)}},toast:function(){sessionStorage.getItem("isToast")||(sessionStorage.setItem("isToast",1),this.$toast({duration:2e3,forbidClick:!0,message:"亲，你的手机网络不太顺畅喔~"}))},invalid:function(t){if(this.taskOff=!0,this.allLoaded=!0,t&&t.taskId){var e=t.taskId;if(""==e||void 0==e)this.isOff=!0;else{this.isOff=!1,this.closeShareIcon();var a=window.location.protocol+"//"+window.location.host+window.location.pathname;this.InvalidUrl=a+"?taskId="+e}}else this.isOff=!0},openQrcode:function(){this.fetchUserInfo("faceToface"),gomeClicki("send","event","click","{data-page}","{data-code}")},closeQrcode:function(){this.qrCodeKey=!1},openPoster:function(){this.fetchUserInfo("poster"),gomeClicki("send","event","click","{data-page}","{data-code}")},share:function(t){this.fetchUserInfo("immediately",t),gomeClicki("send","event","click","{data-page}","{data-code}")},getRequest:function(){return new n.a(function(t,e){var a=window.location.search,r=new Object;if(-1!=a.indexOf("?"))for(var n=a.substr(1),i=n.split("&"),o=0;o<i.length;o++)r[i[o].split("=")[0]]=decodeURI(i[o].split("=")[1]);t(r)})}},mounted:function(){b.b.app&&b.b.gomeplus&&(document.getElementById("headerTitle").style.display="none",document.getElementById("inviteMain").style.top=0)}}},363:function(t,e){},365:function(t,e){},421:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"gs-broadcast-box"},[a("transition-group",{attrs:{name:"slide",tag:"div"}},t._l(t.data,function(e,r){return a("div",{directives:[{name:"show",rawName:"v-show",value:r===t.curIdx,expression:"index === curIdx"}],key:r,staticClass:"gs-broadcast"},[t._v(t._s(e))])}))],1)},staticRenderFns:[]}},423:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"inviteWarpper"}},[a("head-top",{attrs:{id:"headerTitle",titleName:t.cmsPageInfo.promoName?t.cmsPageInfo.promoName:"邀请开店活动页",shareDate:t.WapShareDate}}),t._v(" "),a("div",{staticClass:"inviteMain",attrs:{id:"inviteMain"}},[t.taskOff?a("div",[t.isOff?a("offline-activity",{staticClass:"no-content"}):a("expired-activity",{staticClass:"no-content",attrs:{url:t.InvalidUrl}})],1):a("div",[a("floorPhoto",{directives:[{name:"show",rawName:"v-show",value:t.cmsData.length>0,expression:"cmsData.length>0"}],attrs:{data:t.cmsData[0]}}),t._v(" "),a("div",{staticClass:"broadcast"},[a("broadcast",{attrs:{data:t.broadArr}})],1),t._v(" "),a("div",{staticClass:"floorTwo"},t._l(t.cmsData,function(e,r){return r>0?a("floorPhoto",{key:r,attrs:{data:e}}):t._e()})),t._v(" "),a("div",{staticClass:"immediately"},[a("div",{attrs:{"data-code":"yqClick-01"},on:{click:function(e){t.share(t.WapShareDate)}}},[t._v("立刻邀请")])]),t._v(" "),a("div",{staticClass:"buttonWarpper"},[t.isShowPoster?a("div",{staticClass:"leftButton",attrs:{"data-code":"yqPoster-01"},on:{click:t.openPoster}},[a("i"),t._v("生成海报")]):t._e(),t._v(" "),t.isShowPoster?a("div",{staticClass:"line"},[t._v("|")]):t._e(),t._v(" "),a("div",{staticClass:"rightButton",attrs:{"data-code":"yqCode-01"},on:{click:t.openQrcode}},[a("i"),t._v("当面邀请")])]),t._v(" "),a("div",{staticClass:"inviteBottom"},[a("div",{staticClass:"countWarpper"},[a("ul",[a("li",[a("div",{staticClass:"countNum"},[t.invitingRes.invitedNum>0?a("span",[t._v(t._s(t._f("formatNum")(t.invitingRes.invitedNum))+"次")]):a("span",[t._v("--")])]),t._v(" "),a("div",{staticClass:"countType"},[t._v("浏览量")])]),t._v(" "),a("li",[a("div",{staticClass:"countNum"},[t.invitingRes.openShopUserNum>0?a("span",[t._v(t._s(t._f("formatNum")(t.invitingRes.openShopUserNum))+"人")]):a("span",[t._v("--")])]),t._v(" "),a("div",{staticClass:"countType"},[t._v("开店成功")])]),t._v(" "),a("li",[a("div",{staticClass:"countNum"},[t.invitingRes.firstOrderNum>0?a("span",[t._v(t._s(t._f("formatNum")(t.invitingRes.firstOrderNum))+"人")]):a("span",[t._v("--")])]),t._v(" "),a("div",{staticClass:"countType"},[t._v("完成首单")])]),t._v(" "),a("li",[a("div",{staticClass:"countNum"},[t.invitingRes.totalReward>0?a("span",[t._v(t._s(t._f("formatNum")(t.invitingRes.totalReward/100)))]):a("span",[t._v("--")])]),t._v(" "),a("div",{staticClass:"countType"},[t._v("合计(国美币)")])])])])]),t._v(" "),t.noReward?t._e():a("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"page-infinite-list",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.invitingRes.onlyOpenShopUserNum>0,expression:"invitingRes.onlyOpenShopUserNum>0"}],staticClass:"taskTitle"},[t._v("开店成功("+t._s(t.invitingRes.onlyOpenShopUserNum)+"人)")]),t._v(" "),t._l(t.invitingList,function(e,r){return a("li",{key:r,staticClass:"page-infinite-listitem"},[a("img",{attrs:{src:e.userImage}}),a("span",{staticClass:"userName"},[t._v(t._s(e.nickName.substr(0,1))+"**"+t._s(e.nickName.substr(-1)))]),a("span",{staticClass:"time"},[t._v(t._s(t._f("formatYear")(e.shopOpenTime)))]),a("span",{staticClass:"userState1"},[t._v("待成首单")])])}),t._v(" "),a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.invitedRes.firstOrderNum>0,expression:"invitedRes.firstOrderNum>0"}],staticClass:"taskTitle"},[t._v("完成首单("+t._s(t.invitedRes.firstOrderNum)+"人)")]),t._v(" "),t._l(t.invitedList,function(e,r){return a("li",{key:r,staticClass:"page-infinite-listitem"},[a("img",{attrs:{src:e.userImage}}),a("span",{staticClass:"userName"},[t._v(t._s(e.nickName.substr(0,1))+"**"+t._s(e.nickName.substr(-1)))]),a("span",{staticClass:"time"},[t._v(t._s(t._f("formatYear")(e.firstOrderTime)))]),a("span",{staticClass:"userState2"},[t._v("奖励已发放")])])})],2)],2),t._v(" "),t.noReward?t._e():a("div",{staticClass:"page-infinite-loading"},[t.allLoaded?t._e():a("p",[a("i"),t._v("加载中...")]),t._v(" "),t.allLoaded?a("p",[t._v("没有更多数据了")]):t._e()]),t._v(" "),t.noReward?a("div",{staticClass:"noReward"},[t._m(0),t._v(" "),a("div",[t._v("快去邀请好友一起赚钱吧!")])]):t._e()],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.qrCodeKey,expression:"qrCodeKey"}],staticClass:"popUp"},[a("div",{staticClass:"qrCode"},[a("div",{staticClass:"code"},[a("QrCode",{attrs:{data:t.QrCodeData}})],1),t._v(" "),a("div",{staticClass:"tips"},[t._v("快让朋友扫一扫上面的二维码 邀请他加入美店吧～")])]),t._v(" "),a("div",{staticClass:"closeButton"},[t._v("111"),a("i",{on:{click:t.closeQrcode}})])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("i")])}]}},439:function(t,e,a){a(363);var r=a(0)(a(235),a(421),null,null);t.exports=r.exports},89:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(7),n=a.n(r),i=a(6),o=a.n(i),s=a(102),l=a.n(s);e.default={props:["data"],data:function(){return{qrcode:{}}},created:function(){this.$nextTick(function(){var t=this.$refs.qr;this.getCode(t)})},computed:{},methods:{getCode:function(t){var e=this;return o()(n.a.mark(function a(){return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.qrcode=new l.a(t,{text:e.data.url,width:e.data.width,height:e.data.height,colorDark:e.data.colorDark,colorLight:e.data.colorLight});case 1:case"end":return a.stop()}},a,e)}))()}},watch:{data:{deep:!0,handler:function(t,e){this.qrcode.clear(),this.qrcode.makeCode(this.data.url)}}}}}},[212]);