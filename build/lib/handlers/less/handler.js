/*csd*/var less=require("./lib");var fs=require("fs");var Handler=module.exports=function(b){var a=this;a.server=b;a.configs=a.server.configs;};Handler.prototype.handleRequest=function(a,b){var c=this;fs.exists(a.physicalPath,function(d){if(d){fs.readFile(a.physicalPath,function(f,e){if(f){c.server.responseError(a,b,f);}else{less.render(e.toString(),function(h,g){if(h){c.server.responseError(a,b,h);}else{c.server.responseContent(a,b,g,c.configs.mimeType[".css"]);}});}});}else{c.server.responseNotFound(a,b);}});};