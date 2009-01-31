var KE={};KE.lang={source:"切换模式",preview:"预览",zoom:"放大",undo:"后退",redo:"前进",cut:"剪切",copy:"复制",paste:"粘贴",plainpaste:"粘贴为无格式文本",wordpaste:"从Word粘贴",selectall:"全选",justifyleft:"左对齐",justifycenter:"居中",justifyright:"右对齐",justifyfull:"两端对齐",insertorderedlist:"编号",insertunorderedlist:"项目符号",indent:"增加缩进",outdent:"减少缩进",subscript:"下标",superscript:"上标",date:"插入当前日期",time:"插入当前时间",title:"标题",fontname:"字体",fontsize:"文字大小",textcolor:"文字颜色",bgcolor:"文字背景",bold:"粗体",italic:"斜体",underline:"下划线",strikethrough:"删除线",removeformat:"删除格式",image:"插入图片",flash:"插入Flash",media:"插入多媒体",layer:"插入层",table:"插入表格",specialchar:"插入特殊字符",hr:"插入横线",emoticons:"插入笑脸",link:"超级连接",unlink:"取消超级连接",fullscreen:"全屏显示",about:"关于",print:"打印",yes:"确定",no:"取消",close:"关闭",fontTable:{SimSun:"宋体",SimHei:"黑体",FangSong_GB2312:"仿宋体",KaiTi_GB2312:"楷体",NSimSun:"新宋体",Arial:"Arial","Arial Black":"Arial Black","Times New Roman":"Times New Roman","Courier New":"Courier New",Tahoma:"Tahoma",Verdana:"Verdana"},titleTable:{H1:"标题 1",H2:"标题 2",H3:"标题 3",H4:"标题 4",H5:"标题 5",H6:"标题 6"},charTable:[["§","№","☆","★","○","●","◎","◇","◆","□"],["℃","‰","■","△","▲","※","→","←","↑","↓"],["〓","¤","°","＃","＆","＠","＼","︿","＿","￣"],["―","α","β","γ","δ","ε","ζ","η","θ","ι"],["κ","λ","μ","ν","ξ","ο","π","ρ","σ","τ"],["υ","φ","χ","ψ","ω","≈","≡","≠","＝","≤"],["≥","＜","＞","≮","≯","∷","±","＋","－","×"],["÷","／","∫","∮","∝","∞","∧","∨","∑","∏"],["∪","∩","∈","∵","∴","⊥","∥","∠","⌒","⊙"],["≌","∽","〖","〗","【","】","（","）","［","］"]],colorTable:[["#FFFFFF","#E5E4E4","#D9D8D8","#C0BDBD","#A7A4A4","#8E8A8B","#827E7F","#767173","#5C585A","#000000"],["#FEFCDF","#FEF4C4","#FEED9B","#FEE573","#FFED43","#F6CC0B","#E0B800","#C9A601","#AD8E00","#8C7301"],["#FFDED3","#FFC4B0","#FF9D7D","#FF7A4E","#FF6600","#E95D00","#D15502","#BA4B01","#A44201","#8D3901"],["#FFD2D0","#FFBAB7","#FE9A95","#FF7A73","#FF483F","#FE2419","#F10B00","#D40A00","#940000","#6D201B"],["#FFDAED","#FFB7DC","#FFA1D1","#FF84C3","#FF57AC","#FD1289","#EC0078","#D6006D","#BB005F","#9B014F"],["#FCD6FE","#FBBCFF","#F9A1FE","#F784FE","#F564FE","#F546FF","#F328FF","#D801E5","#C001CB","#8F0197"],["#E2F0FE","#C7E2FE","#ADD5FE","#92C7FE","#6EB5FF","#48A2FF","#2690FE","#0162F4","#013ADD","#0021B0"],["#D3FDFF","#ACFAFD","#7CFAFF","#4AF7FE","#1DE6FE","#01DEFF","#00CDEC","#01B6DE","#00A0C2","#0084A0"],["#EDFFCF","#DFFEAA","#D1FD88","#BEFA5A","#A8F32A","#8FD80A","#79C101","#3FA701","#307F00","#156200"],["#D4C89F","#DAAD88","#C49578","#C2877E","#AC8295","#C0A5C4","#969AC2","#92B7D7","#80ADAF","#9CA53B"]],invalidSwf:"请输入有效的URL地址。\n只允许swf格式。",invalidImg:"请输入有效的URL地址。\n只允许jpg,gif,bmp,png格式。",invalidMedia:"请输入有效的URL地址。\n只允许mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb格式。",invalidWidth:"宽度必须为数字。",invalidHeight:"高度必须为数字。",invalidBorder:"边框必须为数字。",invalidUrl:"URL不正确。",pleaseInput:"请输入内容"};KE.$=function(b,a){var a=a||document;return a.getElementById(b)};KE.$$=function(a,b){var b=b||document;return b.createElement(a)};KE.event={add:function(a,b,c){if(a.addEventListener){a.addEventListener(b,c,false)}else{if(a.attachEvent){a.attachEvent("on"+b,c)}}},remove:function(a,b,c){if(a.removeEventListener){a.removeEventListener(b,c,false)}else{if(a.detachEvent){a.detachEvent("on"+b,c)}}}};KE.each=function(c,b){for(var a in c){if(c.hasOwnProperty(a)){b(a,c[a])}}};KE.util={getDocumentElement:function(){return(document.compatMode!="CSS1Compat")?document.body:document.documentElement},getDocumentHeight:function(){var a=this.getDocumentElement();return Math.max(a.scrollHeight,a.clientHeight)},getDocumentWidth:function(){var a=this.getDocumentElement();return Math.max(a.scrollWidth,a.clientWidth)},getScriptPath:function(){var b=document.getElementsByTagName("script");for(var a=0;a<b.length;a++){if(b[a].src&&b[a].src.match(/kindeditor[\w\-\.]*\.js/)!=null){return b[a].src.substring(0,b[a].src.lastIndexOf("/")+1)}}},getHtmlPath:function(){return location.href.substring(0,location.href.lastIndexOf("/")+1)},getBrowser:function(){var a="";var b=navigator.userAgent.toLowerCase();if(b.indexOf("msie")>-1){a="IE"}else{if(b.indexOf("gecko")>-1){a="GECKO"}else{if(b.indexOf("opera")>-1){a="OPERA"}}}return a},loadStyle:function(b){var a=KE.$$("link");a.setAttribute("type","text/css");a.setAttribute("rel","stylesheet");a.setAttribute("href",b);document.getElementsByTagName("head")[0].appendChild(a)},inArray:function(c,a){for(var b=0;b<a.length;b++){if(c==a[b]){return true}}return false},escape:function(a){a=a.replace(/&/g,"&amp;");a=a.replace(/</g,"&lt;");a=a.replace(/>/g,"&gt;");return a},getElementPos:function(c){var a=0;var e=0;if(c.getBoundingClientRect){var d=c.getBoundingClientRect();var c=this.getDocumentElement();a=d.left+c.scrollLeft-c.clientLeft;e=d.top+c.scrollTop-c.clientTop}else{a=c.offsetLeft;e=c.offsetTop;var b=c.offsetParent;while(b){a+=b.offsetLeft;e+=b.offsetTop;b=b.offsetParent}}return{x:a,y:e}},getCoords:function(b){b=b||window.event;var a=this.getDocumentElement();if(b.pageX){return{x:b.pageX,y:b.pageY}}return{x:b.clientX+a.scrollLeft-a.clientLeft,y:b.clientY+a.scrollTop-a.clientTop}},setOpacity:function(b,a){if(KE.browser=="IE"){b.style.filter=(a==100)?"":"gray() alpha(opacity="+a+")"}else{b.style.opacity=(a==100)?"":"0."+a.toString()}},showBottom:function(a){KE.g[a].bottom.style.display="block"},hideBottom:function(a){KE.g[a].bottom.style.display="none"},drag:function(e,c,a,b){var d=KE.g[e];c.onmousedown=function(f){if(d.wyswygMode){d.iframe.style.display="none"}if(KE.browser!="IE"){f.preventDefault()}var l=f||window.event;var k=KE.util.getCoords(l);var j=parseInt(a.style.top);var m=parseInt(a.style.left);var n=parseInt(a.style.width);var q=parseInt(a.style.height);var p=k.y;var o=k.x;var i=true;var h=function(s){if(i){var r=s||window.event;var v=KE.util.getCoords(r);var u=v.y-p;var t=v.x-o;b(j,m,n,q,u,t)}return false};var g=function(r){if(d.wyswygMode){d.iframe.style.display=""}i=false;KE.event.remove(document,"mousemove",h);KE.event.remove(document,"mouseup",g)};KE.event.add(document,"mousemove",h);KE.event.add(document,"mouseup",g)}},setDefaultPlugin:function(c){var a=["cut","copy","paste","selectall","justifyleft","justifycenter","justifyright","justifyfull","insertorderedlist","insertunorderedlist","indent","outdent","subscript","superscript","bold","italic","underline","strikethrough","removeformat","unlink"];for(var b=0;b<a.length;b++){KE.plugin[a[b]]={click:new Function("id",'KE.util.execCommand(id, "'+a[b]+'", null);')}}},getIframeDoc:function(a){var c=a.contentWindow;var b=null;if(a.contentDocument){b=a.contentDocument}else{b=c.document}return b},getFullHtml:function(b){var a="<html>";a+="<head>";a+='<base href="'+KE.htmlPath+'" />';a+="<title>editor</title>";if(KE.g[b].cssPath){a+='<link href="'+KE.g[b].cssPath+'" rel="stylesheet" type="text/css" />'}a+="</head>";a+="<body>";a+="</body>";a+="</html>";return a},resize:function(g,c,a){var e=KE.g[g];if(c<=e.minWidth||a<=e.minHeight){return}e.container.style.width=c+"px";e.container.style.height=a+"px";e.formDiv.style.height=a+"px";var d=e.toolbarDiv.offsetHeight+e.bottom.offsetHeight;var f=e.formDiv.offsetHeight-e.formDiv.clientHeight;a-=d+f;if(KE.browser=="IE"){var b=e.container.offsetWidth-e.container.clientWidth;if(document.compatMode!="CSS1Compat"){a-=b;c-=b;e.formDiv.style.height=(a+f)+"px"}else{e.formDiv.style.height=a+"px"}e.iframe.style.height=a+"px";e.newTextarea.style.width=(c-b)+"px";e.newTextarea.style.height=(a-f)+"px"}else{e.formDiv.style.height=a+"px";e.iframe.style.height=a+"px";e.newTextarea.style.width="100%";e.newTextarea.style.height=a+"px"}},getData:function(c,b){var a;b=(typeof b=="undefined")?true:b;if(KE.g[c].wyswygMode){if(b){a=KE.util.outputHtml(c,KE.g[c].iframeDoc.body)}else{a=KE.g[c].iframeDoc.body.innerHTML}}else{a=KE.g[c].newTextarea.value}return a},setData:function(b){var a=this.getData(b,KE.g[b].filterMode);KE.g[b].srcTextarea.value=a},getPureData:function(b){var a=this.getData(b,false);a=a.replace(/<br[\s\/]{0,2}>/ig,"\r\n");a=a.replace(/<.*?>/ig,"");return a},setPureData:function(b){var a=this.getPureData(b);KE.g[b].srcTextarea.value=a},focus:function(a){if(KE.g[a].wyswygMode){KE.g[a].iframeWin.focus()}else{KE.g[a].newTextarea.focus()}},click:function(b,a){KE.layout.hide(b);KE.util.focus(b);KE.plugin[a].click(b)},selection:function(g){var f=KE.g[g].iframeWin;var d=KE.g[g].iframeDoc;var b=f.getSelection?f.getSelection():d.selection;var a;try{if(b.rangeCount>0){a=b.getRangeAt(0)}else{a=b.createRange?b.createRange():d.createRange()}}catch(c){}if(!a){a=(KE.browser="IE")?d.body.createTextRange():d.createRange()}KE.g[g].selection=b;KE.g[g].range=a},select:function(a){if(KE.browser=="IE"){KE.g[a].range.select()}},pToBr:function(a){if(KE.browser=="IE"){KE.event.add(KE.g[a].iframeDoc,"keydown",function(b){if(b.keyCode==13){KE.util.selection(a);if(KE.g[a].range.parentElement().tagName!="LI"){KE.util.insertHtml(a,"<br />");return false}}})}},execCommand:function(d,b,a){try{KE.g[d].iframeDoc.execCommand(b,false,a)}catch(c){}KE.history.add(d,false)},insertHtml:function(b,a){if(a==""){return}KE.util.select(b);if(KE.browser=="IE"){if(KE.g[b].selection.type.toLowerCase()=="control"){KE.g[b].range.item(0).outerHTML=a}else{KE.g[b].range.pasteHTML(a)}KE.history.add(b,false)}else{this.execCommand(b,"inserthtml",a)}},removeDomain:function(d,a){for(var b=0;b<KE.g[d].siteDomains.length;b++){var c="http://"+KE.g[d].siteDomains;if(a.indexOf(c)==0){a=a.substr(c.length)}}return a},outputHtml:function(h,c){var g=[];var a=[];var f=function(k,i,l,m){var j="";j+="<"+k;if(i){j+=i}if(l){j+=' style="'+l+'"'}j+=m?" />":">";if(KE.browser=="IE"&&m&&KE.util.inArray(k,["br","hr"])){j+="\n"}g.push(j);if(!m){a.push(k)}};var d=function(){if(a.length>0){var j=a.pop();var i="</"+j+">";if(KE.browser=="IE"&&KE.util.inArray(j,["p","div","table","ol","ul"])){i+="\n"}g.push(i)}};var e=function(j){var i="";if(j.style.color){i+="color:"+j.style.color+";"}if(j.style.backgroundColor){i+="background-color:"+j.style.backgroundColor+";"}if(j.style.fontSize){i+="font-size:"+j.style.fontSize+";"}if(j.style.fontFamily){i+="font-family:"+j.style.fontFamily+";"}if(j.style.fontWeight){i+="font-weight:"+j.style.fontWeight+";"}if(j.style.fontStyle){i+="font-style:"+j.style.fontStyle+";"}if(j.style.textDecoration){i+="text-decoration:"+j.style.textDecoration+";"}if(j.style.verticalAlign){i+="vertical-align:"+j.style.verticalAlign+";"}return i};var b=function(o){var k=o.childNodes;for(var m=0;m<k.length;m++){var p=k[m];switch(p.nodeType){case 1:var l=p.tagName.toLowerCase();var j="";var n="";switch(l){case"font":if(p.color){j+=' color="'+p.color+'"'}if(p.size){j+=' size="'+p.size+'"'}if(p.face){j+=' face="'+p.face+'"'}if(p.style.backgroundColor){n+="background-color:"+p.style.backgroundColor+";"}f(l,j,n,false);break;case"span":n+=e(p);f(l,j,n,false);break;case"div":if(p.align){j+=' align="'+p.align+'"'}if(p.style.border){n+="border:"+p.style.border+";"}else{if(p.style.borderWidth&&p.style.borderStyle&&p.style.borderColor){n+="border:"+p.style.borderWidth+" "+p.style.borderStyle+" "+p.style.borderColor+";"}}if(p.style.margin){n+="margin:"+p.style.margin+";"}else{if(p.style.marginLeft){n+="margin-left:"+p.style.marginLeft+";"}if(p.style.marginRight){n+="margin-right:"+p.style.marginRight+";"}if(p.style.marginTop){n+="margin-top:"+p.style.marginTop+";"}if(p.style.marginBottom){n+="margin-bottom:"+p.style.marginBottom+";"}}if(p.style.padding){n+="padding:"+p.style.padding+";"}else{if(p.style.paddingLeft){n+="padding-left:"+p.style.paddingLeft+";"}if(p.style.paddingRight){n+="padding-right:"+p.style.paddingRight+";"}if(p.style.paddingTop){n+="padding-top:"+p.style.paddingTop+";"}if(p.style.paddingBottom){n+="padding-bottom:"+p.style.paddingBottom+";"}}if(p.style.textAlign){n+="text-align:"+p.style.textAlign+";"}n+=e(p);f(l,j,n,false);break;case"a":if(p.href){j+=' href="'+KE.util.removeDomain(h,p.href)+'"'}if(p.target){j+=' target="'+p.target+'"'}f(l,j,n);break;case"table":if(typeof p.border!="undefined"){j+=' border="'+p.border+'"'}f(l,j,n,false);break;case"embed":if(p.src){j+=' src="'+KE.util.removeDomain(h,p.src)+'"'}if(p.getAttribute("type")){j+=' type="'+p.getAttribute("type")+'"'}if(p.getAttribute("loop")){j+=' loop="'+p.getAttribute("loop")+'"'}if(p.getAttribute("autostart")){j+=' autostart="'+p.getAttribute("autostart")+'"'}if(p.getAttribute("quality")){j+=' quality="'+p.getAttribute("quality")+'"'}if(p.style.width){n+="width:"+p.style.width+";"}if(p.style.height){n+="height:"+p.style.height+";"}f(l,j,n,true);break;case"img":if(p.src){j+=' src="'+KE.util.removeDomain(h,p.src)+'"'}if(p.width){j+=' width="'+p.width+'"'}if(p.height){j+=' height="'+p.height+'"'}if(p.border){j+=' border="'+p.border+'"'}if(p.alt){j+=' alt="'+p.alt+'"'}if(p.title){j+=' title="'+p.title+'"'}f(l,j,n,true);break;case"hr":case"br":f(l,j,n,true);break;case"p":if(p.align){j+=' align="'+p.align+'"'}if(p.style.textAlign){n+="text-align:"+p.style.textAlign+";"}n+=e(p);f(l,j,n,false);break;case"tbody":case"tr":case"td":case"strong":case"b":case"ol":case"ul":case"li":case"sub":case"sup":case"blockquote":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":case"em":case"u":case"strike":if(p.align){j+=' align="'+p.align+'"'}if(p.style.textAlign){n+="text-align:"+p.style.textAlign+";"}n+=e(p);f(l,j,n,false);break;default:break}if(p.hasChildNodes()){b(p)}else{if(a.length>0){var q=g[g.length-1];if(q.match(/^<p|^<div/)!=null){g.push("&nbsp;");d()}}}break;case 3:g.push(KE.util.escape(p.nodeValue));break;default:break}}d()};b(c);return g.join("")}};KE.layout={show:function(b,a){KE.layout.hide(b);KE.g[b].hideDiv.appendChild(a);KE.g[b].hideDiv.style.display="block";KE.g[b].layoutDiv=a},hide:function(b){try{KE.g[b].hideDiv.removeChild(KE.g[b].layoutDiv)}catch(a){}KE.g[b].hideDiv.style.display="none";KE.g[b].maskDiv.style.display="none";KE.util.focus(b)},make:function(b){var a=KE.$$("div");a.style.position="absolute";a.style.zIndex=19811214;return a}};KE.menu=function(a){this.arg=a;var d=KE.layout.make(a.id);d.className="ke-menu";var b=KE.g[a.id].toolbarIcon[a.cmd];var c=KE.util.getElementPos(b);d.style.top=c.y+b.offsetHeight+"px";d.style.left=c.x+"px";this.div=d;this.add=function(e,g){var f=KE.$$("div");f.className="ke-menu-noselected";f.style.width=this.arg.width;f.onmouseover=function(){this.className="ke-menu-selected"};f.onmouseout=function(){this.className="ke-menu-noselected"};f.onclick=g;f.innerHTML=e;this.append(f)};this.append=function(e){this.div.appendChild(e)};this.insert=function(e){this.div.innerHTML=e};this.show=function(){KE.layout.show(this.arg.id,this.div)};this.picker=function(){var f=KE.lang.colorTable;var k=KE.$$("table");k.cellPadding=0;k.cellSpacing=0;k.border=0;k.style.margin=0;k.style.padding=0;k.style.borderCollapse="separate";for(var h=0;h<f.length;h++){var l=k.insertRow(h);for(var g=0;g<f[h].length;g++){var e=l.insertCell(g);e.className="ke-picker-cell";e.style.backgroundColor=f[h][g];e.title=f[h][g];e.onmouseover=function(){this.style.borderColor="#000000"};e.onmouseout=function(){this.style.borderColor="#F0F0EE"};e.onclick=new Function('KE.plugin["'+this.arg.cmd+'"].exec("'+this.arg.id+'", "'+f[h][g]+'")');e.innerHTML="&nbsp;"}}this.append(k);this.show()}};KE.dialog=function(a){this.arg=a;this.topHeight=20;this.bottomHeight=76;this.getPos=function(){var d=this.arg;var i=this.arg.id;var h=KE.util.getElementPos(KE.g[i].container);var c=d.height+this.topHeight+this.bottomHeight;var g=Math.round(parseInt(KE.g[i].container.style.width)/2)-Math.round(d.width/2);var e=Math.round(parseInt(KE.g[i].container.style.height)/2)-Math.round(c/2);var b=g<0?h.x:h.x+g;var f=e<0?h.y:h.y+e;return{x:b,y:f}};this.show=function(){var p=this.arg;var e=p.id;var b=KE.layout.make(p.id);b.className="ke-dialog";var n=this.getPos();b.style.width=(p.width+this.topHeight)+"px";b.style.height=(p.height+this.bottomHeight)+"px";b.style.top=n.y+"px";b.style.left=n.x+"px";var h=KE.$$("div");h.className="ke-dialog-title";h.innerHTML=p.title;var j=KE.$$("img");j.src=KE.g[e].skinsPath+"spacer.gif";var c=KE.g[e].skinsPath+KE.g[e].skinType+".gif";j.style.backgroundImage="url("+c+")";j.className="ke-toolbar-close";j.alt=KE.lang.close;j.title=KE.lang.close;j.onclick=new Function("KE.layout.hide('"+e+"')");h.appendChild(j);KE.util.drag(e,h,b,function(r,s,q,v,u,t){b.style.top=(r+u)+"px";b.style.left=(s+t)+"px"});b.appendChild(h);var i=KE.$$("div");i.className="ke-dialog-body";var m=KE.$$("iframe");if(p.useFrameCSS){m.className="ke-dialog-iframe"}m.width=p.width+"px";m.height=p.height+"px";m.setAttribute("frameBorder","0");i.appendChild(m);b.appendChild(i);var d=KE.$$("div");d.className="ke-dialog-bottom";var g=null;var f=null;var o=null;if(p.noButton){g=KE.$$("input");g.className="ke-dialog-no";g.type="button";g.name="noButton";g.value=p.noButton;g.onclick=new Function("KE.layout.hide('"+e+"')");d.appendChild(g)}if(p.yesButton){f=KE.$$("input");f.className="ke-dialog-yes";f.type="button";f.name="yesButton";f.value=p.yesButton;f.onclick=new Function("KE.plugin['"+p.cmd+"'].exec('"+e+"')");d.appendChild(f)}if(p.previewButton){o=KE.$$("input");o.className="ke-dialog-preview";o.type="button";o.name="previewButton";o.value=p.previewButton;o.onclick=new Function("KE.plugin['"+p.cmd+"'].preview('"+e+"')");d.appendChild(o)}b.appendChild(d);KE.layout.show(e,b);window.focus();if(f){f.focus()}else{if(g){g.focus()}}if(typeof p.html!="undefined"){var l=KE.util.getIframeDoc(m);var k=KE.util.getFullHtml(e);l.open();l.write(k);l.close();l.body.innerHTML=p.html}else{m.src=KE.g[e].pluginsPath+p.cmd+".html"}KE.g[e].maskDiv.style.width=KE.util.getDocumentWidth()+"px";KE.g[e].maskDiv.style.height=KE.util.getDocumentHeight()+"px";KE.g[e].maskDiv.style.display="block";KE.g[e].dialog=m;KE.g[e].noButton=g;KE.g[e].yesButton=f;KE.g[e].previewButton=o}};KE.toolbar={able:function(b,a){KE.each(KE.g[b].toolbarIcon,function(c,d){if(!KE.util.inArray(c,a)){d.className="ke-icon";KE.util.setOpacity(d,100);d.onmouseover=function(){this.className="ke-icon-selected"};d.onmouseout=function(){this.className="ke-icon"};d.onclick=new Function('KE.util.click("'+b+'", "'+c+'")')}})},disable:function(b,a){KE.each(KE.g[b].toolbarIcon,function(c,d){if(!KE.util.inArray(c,a)){d.className="ke-icon-disabled";KE.util.setOpacity(d,50);d.onmouseover=null;d.onmouseout=null;d.onclick=null}})},create:function(b){KE.g[b].toolbarIcon=[];var h=KE.$$("table");h.className="ke-toolbar";h.cellPadding=0;h.cellSpacing=0;h.border=0;var l=h.insertRow(0);var m=l.insertCell(0);m.style.padding=0;m.style.margin=0;m.style.border=0;var c=KE.g[b].items.length;var g=0;var l;for(var f=0;f<c;f++){var d=KE.g[b].items[f];if(f==0||d=="-"){var k=KE.$$("table");k.cellPadding=0;k.cellSpacing=0;k.border=0;k.className="ke-toolbar-table";l=k.insertRow(0);g=0;m.appendChild(k);if(d=="-"){continue}}var j=l.insertCell(g);g++;var e=KE.$$("img");e.src=KE.g[b].skinsPath+"spacer.gif";if(KE.util.inArray(d,KE.g[b].defaultItems)){var a=KE.g[b].skinsPath+KE.g[b].skinType+".gif";e.style.backgroundImage="url("+a+")"}e.className="ke-common-icon ke-icon-"+d;e.alt=KE.lang[d];j.className="ke-icon";j.title=KE.lang[d];j.onmouseover=function(){this.className="ke-icon-selected"};j.onmouseout=function(){this.className="ke-icon"};j.onclick=new Function('KE.util.click("'+b+'", "'+d+'")');j.appendChild(e);KE.g[b].toolbarIcon[d]=j}return h}};KE.history={add:function(e,b){var c=KE.g[e];var a=KE.util.getData(e,false);if(c.undoStack.length>0){var d=c.undoStack[c.undoStack.length-1];if(a==d){return}if(b&&Math.abs(a.length-d.length)<c.minChangeSize){return}}c.undoStack.push(a);c.redoStack=[]},undo:function(d){var b=KE.g[d];if(b.undoStack.length==0){return}var a=KE.util.getData(d,false);b.redoStack.push(a);var c=b.undoStack.pop();if(a==c&&b.undoStack.length>0){c=b.undoStack.pop()}b.iframeDoc.body.innerHTML=c;b.newTextarea.value=c},redo:function(d){var b=KE.g[d];if(b.redoStack.length==0){return}var a=KE.util.getData(d,false);b.undoStack.push(a);var c=b.redoStack.pop();b.iframeDoc.body.innerHTML=c;b.newTextarea.value=c}};KE.remove=function(d,c){c=(typeof c=="undefined")?0:c;var a=KE.g[d].container;if(c==1){document.body.removeChild(a)}else{var b=KE.$(d);b.parentNode.removeChild(a)}document.body.removeChild(KE.g[d].hideDiv);document.body.removeChild(KE.g[d].maskDiv);KE.g[d].containner=null};KE.create=function(q,o){if(KE.browser=="IE"){try{document.execCommand("BackgroundImageCache",false,true)}catch(u){}}var v=KE.$(q);o=(typeof o=="undefined")?0:o;if(o==0&&KE.g[q].container!=null){return}var r=v.style.width;var p=v.style.height;var m=KE.$$("div");m.className="ke-container";m.style.width=r;m.style.height=p;if(o==1){document.body.appendChild(m)}else{v.parentNode.insertBefore(m,v)}var j=KE.toolbar.create(q);m.appendChild(j);var h=KE.$$("iframe");h.className="ke-iframe";h.setAttribute("frameBorder","0");var c=KE.$$("textarea");c.className="ke-textarea";c.style.display="none";var l=KE.$$("div");l.className="ke-form";l.appendChild(h);l.appendChild(c);m.appendChild(l);var g=KE.$$("table");g.className="ke-bottom";g.cellPadding=0;g.cellSpacing=0;g.border=0;var f=g.insertRow(0);var s=f.insertCell(0);s.className="ke-bottom-left";var i=f.insertCell(1);i.className="ke-bottom-right";var w=KE.$$("img");w.className="ke-bottom-right-img";w.src=KE.g[q].skinsPath+"spacer.gif";i.appendChild(w);m.appendChild(g);var d=KE.$$("div");d.style.display="none";var a=KE.$$("div");a.className="ke-mask";KE.util.setOpacity(a,50);document.body.appendChild(d);document.body.appendChild(a);v.style.display="none";KE.util.setDefaultPlugin(q);var t=h.contentWindow;var n=KE.util.getIframeDoc(h);n.designMode="On";var k=KE.util.getFullHtml(q);n.open();n.write(k);n.close();if(v.value){n.body.innerHTML=v.value}if(!KE.g[q].wyswygMode){c.value=v.value;c.style.display="block";h.style.display="none";KE.toolbar.disable(q,["source","preview","fullscreen"])}if(KE.g[q].autoOnsubmitMode){var b=v.parentNode;while(b!=null&&b.tagName!="FORM"){b=b.parentNode}if(b!=null&&b.tagName=="FORM"){KE.event.add(b,"submit",new Function('KE.util.setData("'+q+'")'))}}KE.event.add(n,"click",new Function('KE.layout.hide("'+q+'")'));KE.event.add(c,"click",new Function('KE.layout.hide("'+q+'")'));KE.event.add(n,"keyup",new Function('KE.history.add("'+q+'", true)'));KE.event.add(c,"keyup",new Function('KE.history.add("'+q+'", true)'));KE.g[q].container=m;KE.g[q].toolbarDiv=j;KE.g[q].formDiv=l;KE.g[q].iframe=h;KE.g[q].newTextarea=c;KE.g[q].srcTextarea=v;KE.g[q].bottom=g;KE.g[q].hideDiv=d;KE.g[q].maskDiv=a;KE.g[q].iframeWin=t;KE.g[q].iframeDoc=n;r=m.offsetWidth;p=m.offsetHeight;KE.g[q].width=r+"px";KE.g[q].height=p+"px";KE.util.resize(q,r,p);KE.util.drag(q,i,m,function(x,y,e,B,A,z){if(KE.g[q].resizeMode==2){KE.util.resize(q,e+z,B+A)}else{if(KE.g[q].resizeMode==1){KE.util.resize(q,e,B+A)}}});KE.util.drag(q,s,m,function(x,y,e,B,A,z){KE.util.resize(q,e,B+A)});if(!KE.g[q].resizeMode){KE.util.hideBottom(q)}KE.history.add(q,false);KE.util.focus(q)};KE.version="3.0";KE.scriptPath=KE.util.getScriptPath();KE.htmlPath=KE.util.getHtmlPath();KE.browser=KE.util.getBrowser();KE.plugin={};KE.g={};KE.init=function(a){a.wyswygMode=(typeof a.wyswygMode=="undefined")?true:a.wyswygMode;a.autoOnsubmitMode=(typeof a.autoOnsubmitMode=="undefined")?true:a.autoOnsubmitMode;a.resizeMode=(typeof a.resizeMode=="undefined")?2:a.resizeMode;a.filterMode=(typeof a.filterMode=="undefined")?true:a.filterMode;a.skinType=a.skinType||"default";a.cssPath=a.cssPath||"";a.skinsPath=a.skinsPath||KE.scriptPath+"skins/";a.pluginsPath=a.pluginsPath||KE.scriptPath+"plugins/";a.minWidth=a.minWidth||200;a.minHeight=a.minHeight||100;a.minChangeSize=a.minChangeSize||5;a.siteDomains=a.siteDomains||[];var b=["source","preview","fullscreen","undo","redo","print","cut","copy","paste","plainpaste","wordpaste","justifyleft","justifycenter","justifyright","justifyfull","insertorderedlist","insertunorderedlist","indent","outdent","subscript","superscript","date","time","-","title","fontname","fontsize","textcolor","bgcolor","bold","italic","underline","strikethrough","removeformat","selectall","image","flash","media","layer","table","specialchar","hr","emoticons","link","unlink","about"];a.defaultItems=b;a.items=a.items||b;KE.g[a.id]=a;KE.g[a.id].undoStack=[];KE.g[a.id].redoStack=[];KE.util.loadStyle(a.skinsPath+a.skinType+".css")};KE.show=function(a){KE.init(a);KE.event.add(window,"load",new Function('KE.create("'+a.id+'")'))};KE.plugin.about={click:function(b){var a=new KE.dialog({id:b,cmd:"about",width:300,height:80,title:KE.lang.about,noButton:KE.lang.close});a.show()}};KE.plugin.undo={click:function(a){KE.history.undo(a)}};KE.plugin.redo={click:function(a){KE.history.redo(a)}};KE.plugin.plainpaste={click:function(b){KE.util.selection(b);var a=new KE.dialog({id:b,cmd:"plainpaste",width:330,height:300,title:KE.lang.plainpaste,yesButton:KE.lang.yes,noButton:KE.lang.no});a.show()},exec:function(d){KE.util.select(d);var a=KE.util.getIframeDoc(KE.g[d].dialog);var b=KE.$("textArea",a).value;b=KE.util.escape(b);var c=new RegExp("\r\n|\n|\r","g");b=b.replace(c,"<br />$&");KE.util.insertHtml(d,b);KE.layout.hide(d);KE.util.focus(d)}};KE.plugin.wordpaste={click:function(b){KE.util.selection(b);var a=new KE.dialog({id:b,cmd:"wordpaste",width:330,height:300,title:KE.lang.wordpaste,yesButton:KE.lang.yes,noButton:KE.lang.no});a.show()},exec:function(d){KE.util.select(d);var b=KE.util.getIframeDoc(KE.g[d].dialog);var a=KE.$("wordIframe",b);var c=KE.util.getIframeDoc(a);KE.util.insertHtml(d,KE.util.outputHtml(d,c.body));KE.layout.hide(d);KE.util.focus(d)}};KE.plugin.fullscreen={resetFull:function(g){var c=KE.util.getDocumentElement();var b=c.clientWidth;var a=c.clientHeight;var e,d;if(KE.browser=="IE"||KE.browser=="OPERA"){e=document.body.parentNode.scrollLeft;d=document.body.parentNode.scrollTop}else{e=window.scrollX;d=window.scrollY}var f=KE.g[g].container;f.style.left=e+"px";f.style.top=d+"px";f.style.zIndex=19811211;KE.util.resize(g,b,a)},click:function(d){var b=KE.g[d];var a=function(e){if(b.fullscreenMode){KE.plugin.fullscreen.resetFull(d)}};if(b.fullscreenMode){b.fullscreenMode=false;KE.util.setData(d);KE.remove(d,1);KE.create(d,2);KE.util.showBottom(d);document.body.parentNode.style.overflow="auto";KE.util.resize(d,parseInt(this.width),parseInt(this.height));if(!KE.g[d].resizeMode){KE.util.hideBottom(d)}KE.event.remove(window,"resize",a)}else{b.fullscreenMode=true;KE.util.setData(d);this.width=b.container.style.width;this.height=b.container.style.height;KE.remove(d,2);KE.create(d,1);KE.util.hideBottom(d);document.body.parentNode.style.overflow="hidden";var c=KE.g[d].container;c.style.position="absolute";this.resetFull(d);KE.event.add(window,"resize",a)}}};KE.plugin.bgcolor={click:function(b){KE.util.selection(b);var a=new KE.menu({id:b,cmd:"bgcolor"});a.picker()},exec:function(b,a){KE.util.select(b);if(KE.browser=="IE"){KE.util.execCommand(b,"backcolor",a)}else{KE.util.execCommand(b,"hiliteColor",a)}KE.layout.hide(b);KE.util.focus(b)}};KE.plugin.date={click:function(f){var b=new Date();var c=b.getFullYear().toString(10);var e=(b.getMonth()+1).toString(10);e=e.length<2?"0"+e:e;var a=b.getDate().toString(10);a=a.length<2?"0"+a:a;var d=c+"-"+e+"-"+a;KE.util.selection(f);KE.util.insertHtml(f,d)}};KE.plugin.fontname={click:function(d){var b="fontname";KE.util.selection(d);var a=KE.lang.fontTable;var c=new KE.menu({id:d,cmd:b,width:"160px"});KE.each(a,function(f,g){var e='<span style="font-family: '+f+';">'+g+"</span>";c.add(e,new Function('KE.plugin["'+b+'"].exec("'+d+'", "'+f+'")'))});c.show()},exec:function(b,a){KE.util.select(b);KE.util.execCommand(b,"fontname",a);KE.layout.hide(b);KE.util.focus(b)}};KE.plugin.fontsize={click:function(d){var b={"1":"8pt","2":"10pt","3":"12pt","4":"14pt","5":"18pt","6":"24pt"};var a="fontsize";KE.util.selection(d);var c=new KE.menu({id:d,cmd:a,width:"100px"});KE.each(b,function(f,g){var e='<span style="font-size: '+g+';">'+g+"</span>";c.add(e,new Function('KE.plugin["'+a+'"].exec("'+d+'", "'+f+'")'))});c.show()},exec:function(b,a){KE.util.select(b);KE.util.execCommand(b,"fontsize",a.substr(0,1));KE.layout.hide(b);KE.util.focus(b)}};KE.plugin.hr={click:function(a){KE.util.selection(a);KE.util.select(a);KE.util.insertHtml(a,"<hr />");KE.util.focus(a)}};KE.plugin.preview={click:function(b){var a=new KE.dialog({id:b,cmd:"preview",html:KE.util.getData(b),width:600,height:400,useFrameCSS:true,title:KE.lang.preview,noButton:KE.lang.close});a.show()}};KE.plugin.print={click:function(a){KE.util.selection(a);KE.g[a].iframeWin.print()}};KE.plugin.source={click:function(b){var a=KE.g[b];if(a.wyswygMode){KE.layout.hide(b);if(KE.g[b].filterMode){a.newTextarea.value=KE.util.outputHtml(b,a.iframeDoc.body)}else{a.newTextarea.value=a.iframeDoc.body.innerHTML}a.iframe.style.display="none";a.newTextarea.style.display="block";KE.toolbar.disable(b,["source","preview","fullscreen"]);a.wyswygMode=false}else{a.iframeDoc.body.innerHTML=a.newTextarea.value;a.iframe.style.display="block";a.newTextarea.style.display="none";KE.toolbar.able(b,["source","preview","fullscreen"]);a.wyswygMode=true}KE.util.focus(b)}};KE.plugin.textcolor={click:function(b){KE.util.selection(b);var a=new KE.menu({id:b,cmd:"textcolor"});a.picker()},exec:function(b,a){KE.util.select(b);KE.util.execCommand(b,"forecolor",a);KE.layout.hide(b);KE.util.focus(b)}};KE.plugin.time={click:function(f){var c=new Date();var a=c.getHours().toString(10);a=a.length<2?"0"+a:a;var e=c.getMinutes().toString(10);e=e.length<2?"0"+e:e;var b=c.getSeconds().toString(10);b=b.length<2?"0"+b:b;var d=a+":"+e+":"+b;KE.util.selection(f);KE.util.insertHtml(f,d)}};KE.plugin.title={click:function(d){var c=KE.lang.titleTable;var a="title";KE.util.selection(d);var b=new KE.menu({id:d,cmd:a,width:"120px"});KE.each(c,function(f,g){var e="<"+f+' style="margin:0px;">'+g+"</"+f+">";b.add(e,new Function('KE.plugin["'+a+'"].exec("'+d+'", "<'+f+'>")'))});b.show()},exec:function(b,a){KE.util.select(b);KE.util.execCommand(b,"formatblock",a);KE.layout.hide(b);KE.util.focus(b)}};KE.plugin.emoticons={icon:"emoticons.gif",click:function(a){var b=[["etc_01.gif","etc_02.gif","etc_03.gif","etc_04.gif","etc_05.gif","etc_06.gif"],["etc_07.gif","etc_08.gif","etc_09.gif","etc_10.gif","etc_11.gif","etc_12.gif"],["etc_13.gif","etc_14.gif","etc_15.gif","etc_16.gif","etc_17.gif","etc_18.gif"],["etc_19.gif","etc_20.gif","etc_21.gif","etc_22.gif","etc_23.gif","etc_24.gif"],["etc_25.gif","etc_26.gif","etc_27.gif","etc_28.gif","etc_29.gif","etc_30.gif"],["etc_31.gif","etc_32.gif","etc_33.gif","etc_34.gif","etc_35.gif","etc_36.gif"]];var d="emoticons";KE.util.selection(a);var k=KE.$$("table");k.cellPadding=0;k.cellSpacing=2;k.border=0;k.style.margin=0;k.style.padding=0;k.style.borderCollapse="separate";for(var g=0;g<b.length;g++){var l=k.insertRow(g);for(var e=0;e<b[g].length;e++){var h=l.insertCell(e);h.style.margin=0;h.style.padding="1px";h.style.border="1px solid #F0F0EE";h.style.cursor="pointer";h.onmouseover=function(){this.style.borderColor="#000000"};h.onmouseout=function(){this.style.borderColor="#F0F0EE"};h.onclick=new Function('KE.plugin["'+d+'"].exec("'+a+'", "'+b[g][e]+'")');var f=KE.$$("img");f.src=KE.g[a].pluginsPath+"emoticons/"+b[g][e];h.appendChild(f)}}var c=new KE.menu({id:a,cmd:d});c.append(k);c.show()},exec:function(c,b){KE.util.select(c);var a='<img src="'+KE.g[c].pluginsPath+"emoticons/"+b+'" border="0">';KE.util.insertHtml(c,a);KE.layout.hide(c);KE.util.focus(c)}};KE.plugin.flash={click:function(b){KE.util.selection(b);var a=new KE.dialog({id:b,cmd:"flash",width:280,height:250,title:"Flash",previewButton:KE.lang.preview,yesButton:KE.lang.yes,noButton:KE.lang.no});a.show()},check:function(b,a){if(a.match(/^\w+:\/\/.{3,}(swf)$/i)==null){alert(KE.lang.invalidSwf);window.focus();KE.g[b].yesButton.focus();return false}return true},preview:function(d){var b=KE.util.getIframeDoc(KE.g[d].dialog);var a=KE.$("url",b).value;if(!this.check(d,a)){return false}var c=KE.$$("embed",b);c.src=a;c.type="application/x-shockwave-flash";c.quality="high";c.width=190;c.height=190;KE.$("previewDiv",b).innerHTML="";KE.$("previewDiv",b).appendChild(c)},exec:function(d){KE.util.select(d);var b=KE.util.getIframeDoc(KE.g[d].dialog);var a=KE.$("url",b).value;if(!this.check(d,a)){return false}var c='<embed src="'+a+'" type="application/x-shockwave-flash" quality="high" />';KE.util.insertHtml(d,c);KE.layout.hide(d);KE.util.focus(d)}};KE.plugin.image={click:function(b){KE.util.selection(b);var a=new KE.dialog({id:b,cmd:"image",width:310,height:90,title:KE.lang.image,yesButton:KE.lang.yes,noButton:KE.lang.no});a.show()},check:function(g){var d=KE.util.getIframeDoc(KE.g[g].dialog);var f=KE.$("type",d).value;var c="";if(f==1){c=KE.$("imgFile",d).value}else{c=KE.$("url",d).value}var e=KE.$("imgWidth",d).value;var a=KE.$("imgHeight",d).value;var b=KE.$("imgBorder",d).value;if(c.match(/\.(jpg|jpeg|gif|bmp|png)$/i)==null){alert(KE.lang.invalidImg);window.focus();KE.g[g].yesButton.focus();return false}if(e.match(/^\d+$/)==null){alert(KE.lang.invalidWidth);window.focus();KE.g[g].yesButton.focus();return false}if(a.match(/^\d+$/)==null){alert(KE.lang.invalidHeight);window.focus();KE.g[g].yesButton.focus();return false}if(b.match(/^\d+$/)==null){alert(KE.lang.invalidBorder);window.focus();KE.g[g].yesButton.focus();return false}return true},exec:function(h){KE.util.select(h);var d=KE.util.getIframeDoc(KE.g[h].dialog);var f=KE.$("type",d).value;if(!this.check(h)){return false}if(f==1){KE.$("editorId",d).value=h;d.uploadForm.submit();return false}else{var c=KE.$("url",d).value;var g=KE.$("imgTitle",d).value;var e=KE.$("imgWidth",d).value;var a=KE.$("imgHeight",d).value;var b=KE.$("imgBorder",d).value;this.insert(h,c,g,e,a,b)}},insert:function(g,c,f,e,a,b){var d='<img src="'+c+'" ';if(e>0){d+='width="'+e+'" '}if(a>0){d+='height="'+a+'" '}if(f){d+='title="'+f+'" '}d+='alt="'+f+'" ';d+='border="'+b+'" />';KE.util.insertHtml(g,d);KE.layout.hide(g);KE.util.focus(g)}};KE.plugin.layer={click:function(f){var d="layer";var c=["margin:5px;border:1px solid #000000;","margin:5px;border:2px solid #000000;","margin:5px;border:1px dashed #000000;","margin:5px;border:2px dashed #000000;","margin:5px;border:1px dotted #000000;","margin:5px;border:2px dotted #000000;"];KE.util.selection(f);var e=new KE.menu({id:f,cmd:d,width:"150px"});for(var b=0;b<c.length;b++){var a='<div style="height:15px;'+c[b]+'"></div>';e.add(a,new Function('KE.plugin["'+d+'"].exec("'+f+'", "padding:5px;'+c[b]+'")'))}e.show()},exec:function(c,b){KE.util.select(c);var a='<div style="'+b+'">'+KE.lang.pleaseInput+"</div>";KE.util.insertHtml(c,a);KE.layout.hide(c);KE.util.focus(c)}};KE.plugin.link={click:function(b){KE.util.selection(b);var a=new KE.dialog({id:b,cmd:"link",width:310,height:70,title:KE.lang.link,yesButton:KE.lang.yes,noButton:KE.lang.no});a.show()},exec:function(b){KE.util.select(b);var k=KE.g[b].iframeDoc;var g=KE.g[b].range;var f=KE.util.getIframeDoc(KE.g[b].dialog);var a=KE.$("hyperLink",f).value;var j=KE.$("linkType",f).value;if(a.match(/\w+:\/\/.{3,}/)==null){alert(KE.lang.invalidUrl);window.focus();KE.g[b].yesButton.focus();return false}var c;if(KE.browser=="IE"){c=g.item?g.item(0).parentNode:g.parentElement()}else{c=(g.startContainer==g.endContainer)?g.startContainer.parentNode:k.body}if(!c){c=k.body}k.execCommand("createlink",false,"__ke_temp_url__");var h=c.getElementsByTagName("a");for(var e=0,d=h.length;e<d;e++){if(h[e].href.match(/\/?__ke_temp_url__$/)!=null){h[e].href=a;if(j){h[e].target=j}}}KE.history.add(b);KE.layout.hide(b);KE.util.focus(b)}};KE.plugin.media={click:function(b){KE.util.selection(b);var a=new KE.dialog({id:b,cmd:"media",width:280,height:250,title:KE.lang.media,previewButton:KE.lang.preview,yesButton:KE.lang.yes,noButton:KE.lang.no});a.show()},check:function(b,a){if(a.match(/^\w+:\/\/.{3,}\.(mp3|wav|wma|wmv|mid|avi|mpg|mpeg|asf|rm|rmvb)$/i)==null){alert(KE.lang.invalidMedia);window.focus();KE.g[b].yesButton.focus();return false}return true},preview:function(d){var b=KE.util.getIframeDoc(KE.g[d].dialog);var a=KE.$("url",b).value;if(!this.check(d,a)){return false}var c=KE.$$("embed",b);c.src=a;if(a.match(/\.(rm|rmvb)$/i)==null){c.type="video/x-ms-asf-plugin"}else{c.type="audio/x-pn-realaudio-plugin"}c.loop="true";c.autostart="true";c.width=260;c.height=190;KE.$("previewDiv",b).innerHTML="";KE.$("previewDiv",b).appendChild(c)},exec:function(d){KE.util.select(d);var b=KE.util.getIframeDoc(KE.g[d].dialog);var a=KE.$("url",b).value;if(!this.check(d,a)){return false}var c;if(a.match(/\.(rm|rmvb)$/i)==null){c='<embed src="'+a+'" type="video/x-ms-asf-plugin" loop="true" autostart="true" />'}else{c='<embed src="'+a+'" type="audio/x-pn-realaudio-plugin" loop="true" autostart="true" />'}KE.util.insertHtml(d,c);KE.layout.hide(d);KE.util.focus(d)}};KE.plugin.specialchar={click:function(a){var f=KE.lang.charTable;var c="specialchar";KE.util.selection(a);var h=KE.$$("table");h.cellPadding=0;h.cellSpacing=2;h.border=0;h.style.margin=0;h.style.padding=0;h.style.borderCollapse="separate";for(var e=0;e<f.length;e++){var k=h.insertRow(e);for(var d=0;d<f[e].length;d++){var g=k.insertCell(d);g.style.padding="1px";g.style.margin=0;g.style.border="1px solid #AAAAAA";g.style.fontSize="12px";g.style.cursor="pointer";g.onmouseover=function(){this.style.borderColor="#000000"};g.onmouseout=function(){this.style.borderColor="#AAAAAA"};g.onclick=new Function('KE.plugin["'+c+'"].exec("'+a+'", "'+f[e][d]+'")');g.innerHTML=f[e][d]}}var b=new KE.menu({id:a,cmd:c});b.append(h);b.show()},exec:function(b,a){KE.util.select(b);KE.util.insertHtml(b,a);KE.layout.hide(b);KE.util.focus(b)}};KE.plugin.table={selected:function(h,d,c){var e=d.toString(10)+" by "+c.toString(10)+" Table";KE.$("tableLocation"+h).innerHTML=e;var b=10;for(var a=1;a<=b;a++){for(var g=1;g<=b;g++){var f=KE.$("tableTd"+h+a.toString(10)+"_"+g.toString(10)+"");if(a<=d&&g<=c){f.style.backgroundColor="#CCCCCC"}else{f.style.backgroundColor="#FFFFFF"}}}},click:function(h){var f="table";KE.util.selection(h);var b=10;var d='<table cellpadding="0" cellspacing="0" border="0" style="width:130px;border-collapse:separate;padding:0;margin:0;">';for(var c=1;c<=b;c++){d+="<tr>";for(var a=1;a<=b;a++){var e=c.toString(10)+","+a.toString(10);d+='<td id="tableTd'+h+c.toString(10)+"_"+a.toString(10)+'" style="font-size:1px;width:12px;height:12px;background-color:#FFFFFF;border:1px solid #DDDDDD;cursor:pointer;margin:0;padding:0;" onclick="javascript:KE.plugin[\'table\'].exec(\''+h+"', '"+e+"');\" onmouseover=\"javascript:KE.plugin['table'].selected('"+h+"', '"+c.toString(10)+"', '"+a.toString(10)+"');\">&nbsp;</td>"}d+="</tr>"}d+='<tr><td colspan="10" id="tableLocation'+h+'" style="font-size:12px;text-align:center;height:20px;margin:0;padding:0;border:0;"></td></tr>';d+="</table>";var g=new KE.menu({id:h,cmd:f});g.insert(d);g.show()},exec:function(f,e){KE.util.select(f);var a=e.split(",");var d='<table border="1">';for(var c=0;c<a[0];c++){d+="<tr>";for(var b=0;b<a[1];b++){d+="<td>&nbsp;</td>"}d+="</tr>"}d+="</table>";KE.util.insertHtml(f,d);KE.layout.hide(f);KE.util.focus(f)}};