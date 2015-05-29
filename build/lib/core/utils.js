/*csd*/var fs=require("fs");var tp=require("./tp");var owner=exports;owner.isNull=function(a){return a===null||typeof a==="undefined";};owner.trim=function(a){if(this.isNull(a)){return a;}if(a.trim){return a.trim();}else{return a.replace(/(^[\\s]*)|([\\s]*$)/g,"");}};owner.replace=function(a,b,c){if(this.isNull(a)){return a;}return a.replace(new RegExp(b,"g"),c);};owner.startWith=function(a,b){if(this.isNull(a)||this.isNull(b)){return false;}return a.indexOf(b)===0;};owner.contains=function(b,c){var a=this;if(this.isNull(b)||this.isNull(c)){return false;}if(owner.isArray(b)){return owner.each(b,function(d,e){if(e==c){return true;}});}else{return b&&c&&b.indexOf(c)>-1;}};owner.endWith=function(a,b){if(this.isNull(a)||this.isNull(b)){return false;}return a.indexOf(b)===(a.length-b.length);};owner.has=owner.hasProperty=function(b,a){if(this.isNull(b)||this.isNull(a)){return false;}return(a in b)||(b.hasOwnProperty(a));};owner.isFunction=function(a){if(this.isNull(a)){return false;}return typeof a==="function";};owner.isString=function(a){if(this.isNull(a)){return false;}return typeof a==="string"||a instanceof String;};owner.isNumber=function(a){if(this.isNull(a)){return false;}return typeof a==="number"||a instanceof Number;};owner.isBoolean=function(a){if(this.isNull(a)){return false;}return typeof a==="boolean"||a instanceof Boolean;};owner.isElement=function(a){if(this.isNull(a)){return false;}if(window.Element){return a instanceof Element;}else{return(a.tagName&&a.nodeType&&a.nodeName&&a.attributes&&a.ownerDocument);}};owner.isText=function(a){if(this.isNull(a)){return false;}return a instanceof Text;};owner.isObject=function(a){if(this.isNull(a)){return false;}return typeof a==="object";};owner.isArray=function(a){if(this.isNull(a)){return false;}var b=Object.prototype.toString.call(a)==="[object Array]";var c=a instanceof Array;var d=!this.isString(a)&&this.isNumber(a.length)&&this.isFunction(a.splice);var e=!this.isString(a)&&this.isNumber(a.length)&&a[0];return b||c||d||e;};owner.isDate=function(a){if(this.isNull(a)){return false;}return a instanceof Date;};owner.toArray=function(a){if(this.isNull(a)){return[];}try{return Array.prototype.slice.call(a);}catch(c){var b=[];var f=a.length;for(var d=0;d<len;d++){b[d]=s[d];}return b;}};owner.toDate=function(b){var a=this;if(owner.isNumber(b)){return new Date(b);}else{if(owner.isString(b)){return new Date(owner.replace(owner.replace(b,"-","/"),"T"," "));}else{if(owner.isDate(b)){return b;}else{return null;}}}};owner.each=function(d,a){if(this.isNull(d)||this.isNull(a)){return;}if(this.isArray(d)){var e=d.length;for(var b=0;b<e;b++){if(this.isNull(d[b])){continue;}var f=a.call(d[b],b,d[b]);if(!this.isNull(f)){return f;}}}else{for(var c in d){if(this.isNull(d[c])){continue;}var f=a.call(d[c],c,d[c]);if(!this.isNull(f)){return f;}}}};owner.formatDate=function(a,b){if(this.isNull(b)||this.isNull(a)){return a;}a=this.toDate(a);var d={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),"S":a.getMilliseconds()};if(/(y+)/.test(b)){b=b.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length));}for(var c in d){if(new RegExp("("+c+")").test(b)){b=b.replace(RegExp.$1,RegExp.$1.length==1?d[c]:("00"+d[c]).substr((""+d[c]).length));}}return b;};owner.clone=function(d,b){if(this.isNull(d)||this.isString(d)||this.isNumber(d)||this.isBoolean(d)||this.isDate(d)){return d;}var e=d;try{e=new d.constructor();}catch(a){}for(var c in d){if(e[c]!=d[c]&&!this.contains(b,c)){if(typeof(d[c])==="object"){e[c]=this.clone(d[c],b);}else{e[c]=d[c];}}}e.toString=d.toString;e.valueOf=d.valueOf;return e;};owner.copy=function(a,b){b=b||{};this.each(a,function(d){try{b[d]=a[d];}catch(c){}});return b;};owner.newGuid=function(){var a=function(){return(((1+Math.random())*65536)|0).toString(16).substring(1);};return(a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a());};owner.readJSONSync=function(a){if(fs.existsSync(a)){var b=fs.readFileSync(a);return JSON.parse(b);}else{return null;}};owner.compileTemplateSync=function(b){if(fs.existsSync(b)){var a=fs.readFileSync(b);return tp.compile(a.toString(),{extend:owner});}else{return null;}};owner.mix=function(g,h,e,k,d,c){if(!h||!g){return g||owner;}if(d){switch(d){case 1:return owner.mix(g.prototype,h.prototype,e,k,0,c);case 2:owner.mix(g.prototype,h.prototype,e,k,0,c);break;case 3:return owner.mix(g,h.prototype,e,k,0,c);case 4:return owner.mix(g.prototype,h,e,k,0,c);default:}}var a,b,f,j;if(k&&k.length){for(a=0,b=k.length;a<b;++a){f=k[a];isObject=owner.isObject(g[f]);if(h.hasOwnProperty(f)){if(c&&isObject){owner.mix(g[f],h[f]);}else{if(e||!(f in g)){g[f]=h[f];}}}}}else{for(a in h){if(h.hasOwnProperty(a)){if(c&&owner.isObject(g[a],true)){owner.mix(g[a],h[a],e,k,0,true);}else{if(e||!(a in g)){g[a]=h[a];}}}}}return g;};