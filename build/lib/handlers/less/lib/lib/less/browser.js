/*csd*/var isFileProtocol=/^(file|chrome(-extension)?|resource|qrc|app):/.test(location.protocol);less.env=less.env||(location.hostname=="127.0.0.1"||location.hostname=="0.0.0.0"||location.hostname=="localhost"||(location.port&&location.port.length>0)||isFileProtocol?"development":"production");var logLevel={debug:3,info:2,errors:1,none:0};less.logLevel=typeof(less.logLevel)!="undefined"?less.logLevel:(less.env==="development"?logLevel.debug:logLevel.errors);less.async=less.async||false;less.fileAsync=less.fileAsync||false;less.poll=less.poll||(isFileProtocol?1000:1500);if(less.functions){for(var func in less.functions){if(less.functions.hasOwnProperty(func)){less.tree.functions[func]=less.functions[func];}}}var dumpLineNumbers=/!dumpLineNumbers:(comments|mediaquery|all)/.exec(location.hash);if(dumpLineNumbers){less.dumpLineNumbers=dumpLineNumbers[1];}var typePattern=/^text\/(x-)?less$/;var cache=null;var fileCache={};function log(b,a){if(typeof(console)!=="undefined"&&less.logLevel>=a){console.log("less: "+b);}}function extractId(a){return a.replace(/^[a-z-]+:\/+?[^\/]+/,"").replace(/^\//,"").replace(/\.[a-zA-Z]+$/,"").replace(/[^\.\w-]+/g,"-").replace(/\./g,":");}function errorConsole(b,g){var h="{line} {content}";var f=b.filename||g;var d=[];var a=(b.type||"Syntax")+"Error: "+(b.message||"There is an error in your .less file")+" in "+f+" ";var c=function(k,l,j){if(k.extract[l]!==undefined){d.push(h.replace(/\{line\}/,(parseInt(k.line,10)||0)+(l-1)).replace(/\{class\}/,j).replace(/\{content\}/,k.extract[l]));}};if(b.extract){c(b,0,"");c(b,1,"line");c(b,2,"");a+="on line "+b.line+", column "+(b.column+1)+":\n"+d.join("\n");}else{if(b.stack){a+=b.stack;}}log(a,logLevel.errors);}function createCSS(m,l,h){var d=l.href||"";var f="less:"+(l.title||extractId(d));var k=document.getElementById(f);var g=false;var a=document.createElement("style");a.setAttribute("type","text/css");if(l.media){a.setAttribute("media",l.media);}a.id=f;if(a.styleSheet){try{a.styleSheet.cssText=m;}catch(b){throw new (Error)("Couldn't reassign styleSheet.cssText.");}}else{a.appendChild(document.createTextNode(m));g=(k!==null&&k.childNodes.length>0&&a.childNodes.length>0&&k.firstChild.nodeValue===a.firstChild.nodeValue);}var c=document.getElementsByTagName("head")[0];if(k===null||g===false){var j=l&&l.nextSibling||null;if(j){j.parentNode.insertBefore(a,j);}else{c.appendChild(a);}}if(k&&g===false){k.parentNode.removeChild(k);}if(h&&cache){log("saving "+d+" to cache.",logLevel.info);try{cache.setItem(d,m);cache.setItem(d+":timestamp",h);}catch(b){log("failed to save",logLevel.errors);}}}function postProcessCSS(a){if(less.postProcessor&&typeof less.postProcessor==="function"){a=less.postProcessor.call(a,a)||a;}return a;}function errorHTML(b,k){var j="less-error-message:"+extractId(k||"");var l='<li><label>{line}</label><pre class="{class}">{content}</pre></li>';var c=document.createElement("div"),m,a,f=[];var g=b.filename||k;var h=g.match(/([^\/]+(\?.*)?)$/)[1];c.id=j;c.className="less-error-message";a="<h3>"+(b.type||"Syntax")+"Error: "+(b.message||"There is an error in your .less file")+"</h3>"+'<p>in <a href="'+g+'">'+h+"</a> ";var d=function(o,p,n){if(o.extract[p]!==undefined){f.push(l.replace(/\{line\}/,(parseInt(o.line,10)||0)+(p-1)).replace(/\{class\}/,n).replace(/\{content\}/,o.extract[p]));}};if(b.extract){d(b,0,"");d(b,1,"line");d(b,2,"");a+="on line "+b.line+", column "+(b.column+1)+":</p>"+"<ul>"+f.join("")+"</ul>";}else{if(b.stack){a+="<br/>"+b.stack.split("\n").slice(1).join("<br/>");}}c.innerHTML=a;createCSS([".less-error-message ul, .less-error-message li {","list-style-type: none;","margin-right: 15px;","padding: 4px 0;","margin: 0;","}",".less-error-message label {","font-size: 12px;","margin-right: 15px;","padding: 4px 0;","color: #cc7777;","}",".less-error-message pre {","color: #dd6666;","padding: 4px 0;","margin: 0;","display: inline-block;","}",".less-error-message pre.line {","color: #ff0000;","}",".less-error-message h3 {","font-size: 20px;","font-weight: bold;","padding: 15px 0 5px 0;","margin: 0;","}",".less-error-message a {","color: #10a","}",".less-error-message .error {","color: red;","font-weight: bold;","padding-bottom: 2px;","border-bottom: 1px dashed red;","}"].join("\n"),{title:"error-message"});c.style.cssText=["font-family: Arial, sans-serif","border: 1px solid #e00","background-color: #eee","border-radius: 5px","-webkit-border-radius: 5px","-moz-border-radius: 5px","color: #e00","padding: 15px","margin-bottom: 15px"].join(";");if(less.env=="development"){m=setInterval(function(){if(document.body){if(document.getElementById(j)){document.body.replaceChild(c,document.getElementById(j));}else{document.body.insertBefore(c,document.body.firstChild);}clearInterval(m);}},10);}}function error(a,b){if(!less.errorReporting||less.errorReporting==="html"){errorHTML(a,b);}else{if(less.errorReporting==="console"){errorConsole(a,b);}else{if(typeof less.errorReporting==="function"){less.errorReporting("add",a,b);}}}}function removeErrorHTML(b){var a=document.getElementById("less-error-message:"+extractId(b));if(a){a.parentNode.removeChild(a);}}function removeErrorConsole(a){}function removeError(a){if(!less.errorReporting||less.errorReporting==="html"){removeErrorHTML(a);}else{if(less.errorReporting==="console"){removeErrorConsole(a);}else{if(typeof less.errorReporting==="function"){less.errorReporting("remove",a);}}}}function loadStyles(e){var g=document.getElementsByTagName("style"),f;for(var c=0;c<g.length;c++){f=g[c];if(f.type.match(typePattern)){var b=new less.tree.parseEnv(less),d=f.innerHTML||"";b.filename=document.location.href.replace(/#.*$/,"");if(e||less.globalVars){b.useFileCache=true;}var a=(function(h){return function(l,k){if(l){return error(l,"inline");}var j=k.toCSS(less);h.type="text/css";if(h.styleSheet){h.styleSheet.cssText=j;}else{h.innerHTML=j;}};})(f);new (less.Parser)(b).parse(d,a,{globalVars:less.globalVars,modifyVars:e});}}}function extractUrlParts(f,a){var h=/^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i,g=f.match(h),e={},c=[],d,b;if(!g){throw new Error("Could not parse sheet href - '"+f+"'");}if(!g[1]||g[2]){b=a.match(h);if(!b){throw new Error("Could not parse page url - '"+a+"'");}g[1]=g[1]||b[1]||"";if(!g[2]){g[3]=b[3]+g[3];}}if(g[3]){c=g[3].replace(/\\/g,"/").split("/");for(d=0;d<c.length;d++){if(c[d]==="."){c.splice(d,1);d-=1;}}for(d=0;d<c.length;d++){if(c[d]===".."&&d>0){c.splice(d-1,2);d-=2;}}}e.hostPart=g[1];e.directories=c;e.path=g[1]+c.join("/");e.fileUrl=e.path+(g[4]||"");e.url=e.fileUrl+(g[5]||"");return e;}function pathDiff(g,a){var j=extractUrlParts(g),c=extractUrlParts(a),e,f,h,b,d="";if(j.hostPart!==c.hostPart){return"";}f=Math.max(c.directories.length,j.directories.length);for(e=0;e<f;e++){if(c.directories[e]!==j.directories[e]){break;}}b=c.directories.slice(e);h=j.directories.slice(e);for(e=0;e<b.length-1;e++){d+="../";}for(e=0;e<h.length-1;e++){d+=h[e]+"/";}return d;}function getXMLHttpRequest(){if(window.XMLHttpRequest&&(window.location.protocol!=="file:"||!window.ActiveXObject)){return new XMLHttpRequest();}else{try{return new ActiveXObject("Microsoft.XMLHTTP");}catch(a){log("browser doesn't support AJAX.",logLevel.errors);return null;}}}function doXHR(f,e,b,c){var g=getXMLHttpRequest();var a=isFileProtocol?less.fileAsync:less.async;if(typeof(g.overrideMimeType)==="function"){g.overrideMimeType("text/css");}log("XHR: Getting '"+f+"'",logLevel.debug);g.open("GET",f,a);g.setRequestHeader("Accept",e||"text/x-less, text/css; q=0.9, */*; q=0.5");g.send(null);function d(k,h,j){if(k.status>=200&&k.status<300){h(k.responseText,k.getResponseHeader("Last-Modified"));}else{if(typeof(j)==="function"){j(k.status,f);}}}if(isFileProtocol&&!less.fileAsync){if(g.status===0||(g.status>=200&&g.status<300)){b(g.responseText);}else{c(g.status,f);}}else{if(a){g.onreadystatechange=function(){if(g.readyState==4){d(g,b,c);}};}else{d(g,b,c);}}}function loadFile(l,b,a,d,j){if(b&&b.currentDirectory&&!/^([a-z-]+:)?\//.test(l)){l=b.currentDirectory+l;}var g=extractUrlParts(l,window.location.href);var f=g.url;var k={currentDirectory:g.path,filename:f};if(b){k.entryPath=b.entryPath;k.rootpath=b.rootpath;k.rootFilename=b.rootFilename;k.relativeUrls=b.relativeUrls;}else{k.entryPath=g.path;k.rootpath=less.rootpath||g.path;k.rootFilename=f;k.relativeUrls=d.relativeUrls;}if(k.relativeUrls){if(d.rootpath){k.rootpath=extractUrlParts(d.rootpath+pathDiff(g.path,k.entryPath)).path;}else{k.rootpath=g.path;}}if(d.useFileCache&&fileCache[f]){try{var h=fileCache[f];a(null,h,f,k,{lastModified:new Date()});}catch(c){a(c,null,f);}return;}doXHR(f,d.mime,function(m,o){fileCache[f]=m;try{a(null,m,f,k,{lastModified:o});}catch(n){a(n,null,f);}},function(e,m){a({type:"File",message:"'"+m+"' wasn't found ("+e+")"},null,f);});}function loadStyleSheet(f,a,d,e,c){var b=new less.tree.parseEnv(less);b.mime=f.type;if(c||less.globalVars){b.useFileCache=true;}loadFile(f.href,null,function(j,h,l,k,n){if(n){n.remaining=e;var g=cache&&cache.getItem(l),m=cache&&cache.getItem(l+":timestamp");if(!d&&m&&n.lastModified&&(new (Date)(n.lastModified).valueOf()===new (Date)(m).valueOf())){createCSS(g,f);n.local=true;a(null,null,h,f,n,l);return;}}removeError(l);if(h){b.currentFileInfo=k;new (less.Parser)(b).parse(h,function(o,p){if(o){return a(o,null,null,f);}try{a(o,p,h,f,n,l);}catch(o){a(o,null,null,f);}},{modifyVars:c,globalVars:less.globalVars});}else{a(j,null,null,f,n,l);}},b,c);}function loadStyleSheets(a,d,c){for(var b=0;b<less.sheets.length;b++){loadStyleSheet(less.sheets[b],a,d,less.sheets.length-(b+1),c);}}function initRunningMode(){if(less.env==="development"){less.optimization=0;less.watchTimer=setInterval(function(){if(less.watchMode){loadStyleSheets(function(b,d,a,f,c){if(b){error(b,f.href);}else{if(d){var g=d.toCSS(less);g=postProcessCSS(g);createCSS(g,f,c.lastModified);}}});}},less.poll);}else{less.optimization=3;}}less.watch=function(){if(!less.watchMode){less.env="development";initRunningMode();}this.watchMode=true;return true;};less.unwatch=function(){clearInterval(less.watchTimer);this.watchMode=false;return false;};if(/!watch/.test(location.hash)){less.watch();}if(less.env!="development"){try{cache=(typeof(window.localStorage)==="undefined")?null:window.localStorage;}catch(_){}}var links=document.getElementsByTagName("link");less.sheets=[];for(var i=0;i<links.length;i++){if(links[i].rel==="stylesheet/less"||(links[i].rel.match(/stylesheet/)&&(links[i].type.match(typePattern)))){less.sheets.push(links[i]);}}less.modifyVars=function(a){less.refresh(false,a);};less.refresh=function(c,b){var d,a;d=a=new Date();loadStyleSheets(function(g,j,f,k,h){if(g){return error(g,k.href);}if(h.local){log("loading "+k.href+" from cache.",logLevel.info);}else{log("parsed "+k.href+" successfully.",logLevel.debug);var l=j.toCSS(less);l=postProcessCSS(l);createCSS(l,k,h.lastModified);}log("css for "+k.href+" generated in "+(new Date()-a)+"ms",logLevel.info);if(h.remaining===0){log("less has finished. css generated in "+(new Date()-d)+"ms",logLevel.info);}a=new Date();},c,b);loadStyles(b);};less.refreshStyles=loadStyles;less.Parser.fileLoader=loadFile;less.refresh(less.env==="development");