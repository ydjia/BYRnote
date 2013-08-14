/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
window.dhtmlx||(dhtmlx={});dhtmlx.version="3.0";dhtmlx.codebase="./";dhtmlx.extend=function(a,b){for(var c in b)a[c]=b[c];b.e&&a.e();return a};dhtmlx.bind=function(a,b){return function(){return a.apply(b,arguments)}};dhtmlx.require=function(a){if(!dhtmlx.P[a]){dhtmlx.exec(dhtmlx.ajax().sync().get(dhtmlx.codebase+a).responseText);dhtmlx.P[a]=true}};dhtmlx.P={};dhtmlx.exec=function(a){window.execScript?window.execScript(a):window.eval(a)};
dhtmlx.methodPush=function(a,b){return function(){var c=false;return c=a[b].apply(a,arguments)}};dhtmlx.isNotDefined=function(a){return typeof a=="undefined"};dhtmlx.delay=function(a,b,c){setTimeout(function(){var d=a.apply(b,c);a=b=c=null;return d},1)};dhtmlx.uid=function(){if(!this.z)this.z=(new Date).valueOf();this.z++;return this.z};dhtmlx.toNode=function(a){if(typeof a=="string")return document.getElementById(a);return a};dhtmlx.toArray=function(a){return dhtmlx.extend(a||[],dhtmlx.PowerArray)};
dhtmlx.toFunctor=function(a){return typeof a=="string"?eval(a):a};dhtmlx.c={};dhtmlx.event=function(a,b,c,d){a=dhtmlx.toNode(a);var e=dhtmlx.uid();dhtmlx.c[e]=[a,b,c];if(d)c=dhtmlx.bind(c,d);if(a.addEventListener)a.addEventListener(b,c,false);else a.attachEvent&&a.attachEvent("on"+b,c);return e};dhtmlx.eventRemove=function(a){if(a){var b=dhtmlx.c[a];if(b[0].removeEventListener)b[0].removeEventListener(b[1],b[2],false);else b[0].detachEvent&&b[0].detachEvent("on"+b[1],b[2]);delete this.c[a]}};
dhtmlx.EventSystem={e:function(){this.c={};this.p={};this.l={}},block:function(){this.c.B=true},unblock:function(){this.c.B=false},mapEvent:function(a){dhtmlx.extend(this.l,a)},callEvent:function(a,b){if(this.c.B)return true;a=a.toLowerCase();var c=this.c[a.toLowerCase()],d=true;if(c)for(var e=0;e<c.length;e++)if(c[e].apply(this,b||[])===false)d=false;if(this.l[a]&&!this.l[a].callEvent(a,b))d=false;return d},attachEvent:function(a,b,c){a=a.toLowerCase();c=c||dhtmlx.uid();b=dhtmlx.toFunctor(b);var d=
this.c[a]||dhtmlx.toArray();d.push(b);this.c[a]=d;this.p[c]={f:b,t:a};return c},detachEvent:function(a){var b=this.p[a].t,c=this.p[a].f;b=this.c[b];b.remove(c);delete this.p[a]}};
dhtmlx.PowerArray={removeAt:function(a,b){if(a>=0)this.splice(a,b||1)},remove:function(a){this.removeAt(this.find(a))},insertAt:function(a,b){if(!b&&b!==0)this.push(a);else{var c=this.splice(b,this.length-b);this[b]=a;this.push.apply(this,c)}},find:function(a){for(i=0;i<this.length;i++)if(a==this[i])return i;return-1},each:function(a,b){for(var c=0;c<this.length;c++)a.call(b||this,this[c])},map:function(a,b){for(var c=0;c<this.length;c++)this[c]=a.call(b||this,this[c]);return this}};
if(navigator.userAgent.indexOf("Opera")!=-1)dhtmlx.Da=true;else{dhtmlx.k=!!document.all;dhtmlx.Ca=!document.all;dhtmlx.Ea=navigator.userAgent.indexOf("KHTML")!=-1;if(navigator.appVersion.indexOf("MSIE 8.0")!=-1&&document.compatMode!="BackCompat")dhtmlx.k=8}dhtmlx.zIndex={drag:1E4};
dhtmlx.html={create:function(a,b,c){b=b||{};var d=document.createElement(a);for(var e in b)d.setAttribute(e,b[e]);if(b.style)d.style.cssText=b.style;if(b["class"])d.className=b["class"];if(c)d.innerHTML=c;return d},getValue:function(a){a=dhtmlx.toNode(a);if(!a)return"";return dhtmlx.isNotDefined(a.value)?a.innerHTML:a.value},remove:function(a){if(a instanceof Array)for(var b=0;b<a.length;b++)this.remove(a[b]);else a&&a.parentNode&&a.parentNode.removeChild(a)},insertBefore:function(a,b,c){if(a)b?b.parentNode.insertBefore(a,
b):c.appendChild(a)},locate:function(a,b){a=a||event;for(var c=a.target||a.srcElement;c;){if(c.getAttribute){var d=c.getAttribute(b);if(d)return d}c=c.parentNode}return null},offset:function(a){if(a.getBoundingClientRect){var b=a.getBoundingClientRect(),c=document.body,d=document.documentElement,e=window.pageYOffset||d.scrollTop||c.scrollTop,f=window.pageXOffset||d.scrollLeft||c.scrollLeft,g=d.clientTop||c.clientTop||0,h=d.clientLeft||c.clientLeft||0,i=b.top+e-g,k=b.left+f-h;return{y:Math.round(i),
x:Math.round(k)}}else{for(k=i=0;a;){i+=parseInt(a.offsetTop,10);k+=parseInt(a.offsetLeft,10);a=a.offsetParent}return{y:i,x:k}}},pos:function(a){a=a||event;if(a.pageX||a.pageY)return{x:a.pageX,y:a.pageY};var b=dhtmlx.k&&document.compatMode!="BackCompat"?document.documentElement:document.body;return{x:a.clientX+b.scrollLeft-b.clientLeft,y:a.clientY+b.scrollTop-b.clientTop}},preventEvent:function(a){a&&a.preventDefault&&a.preventDefault();dhtmlx.html.stopEvent(a)},stopEvent:function(a){(a||event).cancelBubble=
true;return false},addCss:function(a,b){a.className+=" "+b},removeCss:function(a,b){a.className=a.className.replace(RegExp(b,"g"),"")}};(function(){var a=document.getElementsByTagName("SCRIPT");if(a.length){a=(a[a.length-1].getAttribute("src")||"").split("/");a.splice(a.length-1,1);dhtmlx.codebase=a.slice(0,a.length).join("/")+"/"}})();dhtmlx.ui={};
dhtmlx.Destruction={e:function(){dhtmlx.destructors.push(this)},destructor:function(){this.destructor=function(){};this.Ba=this.n=null;this.N&&document.body.appendChild(this.N);this.N=null;if(this.b){this.b.innerHTML="";this.b.n=null}this.data=this.b=this.v=null;this.c=this.p={}}};dhtmlx.destructors=[];
dhtmlx.event(window,"unload",function(){for(var a=0;a<dhtmlx.destructors.length;a++)dhtmlx.destructors[a].destructor();dhtmlx.destructors=[];for(var b in dhtmlx.c){a=dhtmlx.c[b];if(a[0].removeEventListener)a[0].removeEventListener(a[1],a[2],false);else a[0].detachEvent&&a[0].detachEvent("on"+a[1],a[2]);delete dhtmlx.c[b]}});dhtmlx.math={};dhtmlx.math.za=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
dhtmlx.math.toHex=function(a,b){a=parseInt(a,10);for(str="";a>0;){str=this.za[a%16]+str;a=Math.floor(a/16)}for(;str.length<b;)str="0"+str;return str};dhtmlx.ui.Map=function(a){this.name="Map";this.h="map_"+dhtmlx.uid();this.ja=a;this.l=[]};
dhtmlx.ui.Map.prototype={addRect:function(a,b){this.D(a,"RECT",b)},addPoly:function(a,b){this.D(a,"POLY",b)},D:function(a,b,c){this.l.push("<area "+this.ja+"='"+a+"' shape='"+b+"' coords='"+c.join()+"'></area>")},addSector:function(a,b,c,d,e,f,g){var h=[];h.push(d);h.push(Math.floor(e*g));for(var i=b;i<c;i+=Math.PI/18){h.push(Math.floor(d+f*Math.cos(i)));h.push(Math.floor((e+f*Math.sin(i))*g))}h.push(Math.floor(d+f*Math.cos(c)));h.push(Math.floor((e+f*Math.sin(c))*g));h.push(d);h.push(Math.floor(e*
g));return this.addPoly(a,h)},render:function(a){var b=dhtmlx.html.create("DIV");b.style.cssText="position:absolute; width:100%; height:100%; top:0px; left:0px;";a.appendChild(b);var c=dhtmlx.k?"":"src='data:image/gif;base64,R0lGODlhEgASAIAAAP///////yH5BAUUAAEALAAAAAASABIAAAIPjI+py+0Po5y02ouz3pwXADs='";b.innerHTML="<map id='"+this.h+"' name='"+this.h+"'>"+this.l.join("\n")+"</map><img "+c+" class='dhx_map_img' usemap='#"+this.h+"'>";a.n=b;this.l=[]}};if(!dhtmlx.chart)dhtmlx.chart={};
dhtmlx.chart.line={pvt_render_line:function(a,b,c,d){var e,f,g,h,i,k,l=new dhtmlx.ui.Map(this.h),m=!!this.a.yAxis;if(m&&typeof this.a.yAxis.end!="undefied"&&typeof this.a.yAxis.start!="undefied"&&this.a.yAxis.step){e=parseFloat(this.a.yAxis.end);f=parseFloat(this.a.yAxis.start)}else{e=this.max(this.a.value);f=this.min(this.a.value)}this.K(a,b,c,d,f,e);if(m){e=parseFloat(this.a.yAxis.end);f=parseFloat(this.a.yAxis.start)}var j=parseInt(this.a.padding.top,10),p=parseInt(this.a.padding.left,10),n=parseInt(this.a.padding.bottom,
10),q=parseInt(this.a.padding.right,10),o=d-j-n;if(f!=e){var s=this.L(f,e);h=s[0];g=s[1];i=o/h;if(!m){k=i>10?i:10;i=(o-k)/h}}else{g=1;k=0;i=(o-10)/e}var B=Math.round((c-p-q)/b.length),x=Math.floor(B/2);if(b.length){for(var z=function(v){v=this.a.value(v);var y=(parseFloat(v)-f)*g;m||(y+=k/i);if(f==e)y=e;var C=d-Math.floor(i*y)-n;if(y<0)C=d-j;if(v>e)C=j;if(v<f)C=d-n;return C},t=z.call(this,b[0]),u=1;u<=b.length;u++){var r=Math.floor(B*(u-0.5))-0.5+p,w=Math.floor(B*(u+0.5))-0.5+p;this.J(r,b[u-1]);this.ca(a,
r,d-n,j);if(b.length!=u){var A=z.call(this,b[u]);this.j(a,r,t,w,A,this.a.line.color(b[u-1]),this.a.line.width)}this.aa(a,r,t,b[u-1]);l.addRect(b[u-1].id,[r-x,t-x,r+x,t+x]);t=A}z=null}this.I(a,b,c,d);l.render(this.b)},aa:function(a,b,c,d){var e=parseInt(this.a.item.radius,10);a.lineWidth=parseInt(this.a.item.borderWidth,10);a.fillStyle=this.a.item.color(d);a.strokeStyle=this.a.item.borderColor(d);a.beginPath();a.arc(b,c,e,0,Math.PI*2,true);a.fill();a.stroke();this.renderTextAt(false,true,b,c-e-this.a.labelOffset,
this.a.label(d))}};if(!dhtmlx.chart)dhtmlx.chart={};
dhtmlx.chart.bar={pvt_render_bar:function(a,b,c,d){var e,f,g,h,i,k,l=new dhtmlx.ui.Map(this.h),m=!!this.a.yAxis,j=!!this.a.xAxis;if(m&&typeof this.a.yAxis.end!="undefied"&&typeof this.a.yAxis.start!="undefied"&&this.a.yAxis.step){e=parseFloat(this.a.yAxis.end);f=parseFloat(this.a.yAxis.start)}else{e=this.max(this.a.value);f=this.min(this.a.value)}this.K(a,b,c,d,f,e);if(m){e=parseFloat(this.a.yAxis.end);f=parseFloat(this.a.yAxis.start)}var p=parseInt(this.a.padding.top,10),n=parseInt(this.a.padding.left,
10),q=parseInt(this.a.padding.bottom,10),o=d-p-q;if(e!=f){g=this.L(f,e);h=g[0];g=g[1];i=o/h;if(!m){k=i>10?i:10;i=(o-k)/h}}else{g=1;k=0;i=(o-10)/e}h=Math.floor((c-n-parseInt(this.a.padding.right,10))/b.length);var s=parseInt(this.a.width,10);if(s>h)s=h-2;var B=Math.floor((h-s)/2),x=typeof this.a.radius!="undefined"?parseInt(this.a.radius,10):Math.round(s/5),z=false,t=this.a.gradient;if(t===true){z=true;t=false}else if(t){t=a.createLinearGradient(0,d-p,0,q);this.a.gradient(t)}var u=0;if(q&&!j){u=d-
q;this.j(a,0,u+0.5,c,u+0.5,"#000000",1)}for(j=0;j<b.length;j++){o=parseFloat(this.a.value(b[j]));if(o>e)o=e;o-=f;o*=g;if(f==e)o=e;var r=n+B+j*h,w=d-q;this.J(r+Math.floor(s/2),b[j]);if(o<0||this.a.yAxis&&o===0)this.renderTextAt(true,true,r+Math.floor(s/2),w,this.a.label(b[j]));else{m||(o+=k/i);var A=t||this.a.color.call(this,b[j]);if(this.a.border){a.beginPath();a.fillStyle=A;this.s(a,r,w,s,x,i,o,0);a.lineTo(r,0);a.fill();a.fillStyle="#000000";a.globalAlpha=0.37;a.beginPath();this.s(a,r,w,s,x,i,o,
0);a.fill()}a.globalAlpha=this.a.alpha.call(this,b[j]);a.fillStyle=t||this.a.color.call(this,b[j]);a.beginPath();var v=this.s(a,r,w,s,x,i,o,this.a.border?1:0);if(t&&!z)a.lineTo(r+(this.a.border?1:0),0);a.fill();a.globalAlpha=1;if(z){var y=a.createLinearGradient(0,w-i*o+2,0,w);y.addColorStop(0,A);y.addColorStop(0.1,A);y.addColorStop(1,"#FFFFFF");a.fillStyle=y;a.beginPath();v=this.s(a,r+2,w,s-4,x,i,o,1);a.fill()}this.renderTextAt(true,true,r+Math.floor(s/2),v[1],this.a.label(b[j]));l.addRect(b[j].id,
[r,v[1],v[0],w])}}this.I(a,b,c,d);l.render(this.b)},s:function(a,b,c,d,e,f,g,h){var i=0;if(e>f*g){var k=(e-f*g)/e;i=-Math.acos(k)+Math.PI/2}a.moveTo(b+h,c);var l=c-Math.floor(f*g)+e+(e?0:h);e<f*g&&a.lineTo(b+h,l);f=b+e;e&&a.arc(f,l,e-h,-Math.PI+i,-Math.PI/2,false);var m=b+d-e-(e?0:h),j=l-e+(e?h:0);a.lineTo(m,j);var p=l;e&&a.arc(m,p,e-h,-Math.PI/2,0-i,false);var n=b+d-h;a.lineTo(n,c);a.lineTo(b+h,c);return[n,j]}};if(!dhtmlx.chart)dhtmlx.chart={};
dhtmlx.chart.pie={pvt_render_pie:function(a,b,c,d){this.W(a,b,c,d,1)},pvt_render_pie3D:function(a,b,c,d){this.W(a,b,c,d,this.a.cant)},W:function(a,b,c,d,e){var f=new dhtmlx.ui.Map(this.h),g=0,h=this.ea(c,d),i=this.a.radius?this.a.radius:h.radius;this.max(this.a.value);var k=[],l=[],m=0;if(this.a.legend)this.a.legend.total_height=this.a.legend.height*b.length;for(var j=0;j<b.length;j++)g+=parseFloat(this.a.value(b[j]));for(j=0;j<b.length;j++){l[j]=parseFloat(this.a.value(b[j]));k[j]=Math.PI*2*((l[j]+
m)/g);m+=l[j]}var p=this.a.x?this.a.x:h.x,n=this.a.y?this.a.y:h.y;e==1&&this.a.shadow&&this.Y(a,p,n,i);n/=e;var q=-Math.PI/2;a.scale(1,e);for(j=0;j<b.length;j++){a.lineWidth=2;a.beginPath();a.moveTo(p,n);alpha1=-Math.PI/2+k[j];a.arc(p,n,i,q,alpha1,false);a.lineTo(p,n);var o=this.a.color.call(this,b[j]);a.fillStyle=o;a.strokeStyle=this.a.lineColor(b[j]);a.stroke();a.fill();this.a.pieInnerText&&this.G(p,n,5*i/6,q,alpha1,e,this.a.pieInnerText(b[j],g),true);this.a.label&&this.G(p,n,i+this.a.labelOffset,
q,alpha1,e,this.a.label(b[j]));if(e!=1){this.C(a,p,n,q,alpha1,i,true);a.fillStyle="#000000";a.globalAlpha=0.2;this.C(a,p,n,q,alpha1,i,false);a.globalAlpha=1;a.fillStyle=o}f.addSector(b[j].id,q,alpha1,p,n,i,e);q=alpha1;if(this.a.legend){a.scale(1,1/e);this.ba(a,b[j],c,d,j);a.scale(1,e)}}f.render(this.b);if(this.a.gradient){b=e!=1?p+i/3:p;c=e!=1?n+i/3:n;this.wa(a,p,n,i,b,c)}a.scale(1,1/e)},ba:function(a,b,c,d,e){var f=this.a.legend;a.strokeStyle=a.fillStyle;a.lineWidth=f.marker.height;a.lineCap=f.marker.type;
a.beginPath();var g=5+a.lineWidth/2;c=5+a.lineWidth/2;if(f.align=="right")g+=this.b.offsetWidth-f.width;if(f.valign=="bottom"&&d>f.total_height)c+=d-f.total_height-a.lineWidth/2;if(f.valign=="middle"&&d>f.total_height)c+=(d-f.total_height)/2-a.lineWidth/2;c+=e*f.height;a.moveTo(g,c);d=g+f.marker.width-f.marker.height+1;a.lineTo(d,c);a.stroke();this.renderText(d+f.marker.width/2+5,c-f.marker.height/2,f.template(b))},ea:function(a,b){var c=0;if(this.a.legend)c=this.a.legend.width*(this.a.legend.align==
"right"?-1:1);a=(a+c)/2;b/=2;c=Math.min(a,b)-this.a.padding.top;return{x:a,y:b,radius:c}},C:function(a,b,c,d,e,f,g){a.lineWidth=1;if(d<=0&&e>=0||d>=0&&e<=Math.PI||d<=Math.PI&&e>=Math.PI){if(d<0&&e>0){d=0;this.H(a,b,c,f,d,e)}if(d<Math.PI&&e>Math.PI){e=Math.PI;this.H(a,b,c,f,d,e)}var h=(this.a.height||Math.floor(f/4))/this.a.cant;a.beginPath();a.arc(b,c,f,d,e,false);a.lineTo(b+f*Math.cos(e),c+f*Math.sin(e)+h);a.arc(b,c+h,f,e,d,true);a.lineTo(b+f*Math.cos(d),c+f*Math.sin(d));a.fill();g&&a.stroke()}},
H:function(a,b,c,d,e,f){a.beginPath();a.arc(b,c,d,e,f,false);a.stroke()},Y:function(a,b,c,d){for(var e=["#676767","#7b7b7b","#a0a0a0","#bcbcbc","#d1d1d1","#d6d6d6"],f=e.length-1;f>-1;f--){a.beginPath();a.fillStyle=e[f];a.arc(b+2,c+2,d+f,0,Math.PI*2,true);a.fill()}},da:function(a){a.addColorStop(0,"#ffffff");a.addColorStop(0.7,"#7a7a7a");a.addColorStop(1,"#000000");return a},wa:function(a,b,c,d,e,f){a.globalAlpha=0.3;a.beginPath();var g;if(typeof this.a.gradient!="function"){g=a.createRadialGradient(e,
f,d/4,b,c,d);g=this.da(g)}else g=this.a.gradient(g);a.fillStyle=g;a.arc(b,c,d,0,Math.PI*2,true);a.fill();a.globalAlpha=1},G:function(a,b,c,d,e,f,g,h){var i=this.renderText(0,0,g,0,1);if(i){var k=i.scrollWidth;i.style.width=k+"px";if(k>a)k=a;var l=8;if(h)l=k/1.8;var m=d+(e-d)/2;c-=(l-8)/2;var j=-l,p=-8,n="left";if(m>=Math.PI/2&&m<Math.PI){j=-k-j+1;n="right"}if(m<=3*Math.PI/2&&m>=Math.PI){j=-k-j+1;n="right"}d=(b+Math.floor(c*Math.sin(m)))*f+p;l=a+Math.floor((c+l/2)*Math.cos(m))+j;var q=e<Math.PI/2+
0.01,o=m<Math.PI/2;if(o&&q)l=Math.max(l,a+3);else if(!o&&!q)l=Math.min(l,a-k);if(!h&&f<1&&d>b*f)d+=this.a.height||Math.floor(c/4);i.style.top=d+"px";i.style.left=l+"px";i.style.width=k+"px";i.style.textAlign=n;i.style.whiteSpace="nowrap"}}};
dhtmlx.Template={u:{},empty:function(){return""},setter:function(a,b){return dhtmlx.Template.fromHTML(b)},obj_setter:function(a,b){var c=dhtmlx.Template.setter(a,b),d=this;return function(){return c.apply(d,arguments)}},fromHTML:function(a){if(typeof a=="function")return a;if(this.u[a])return this.u[a];a=(a||"").toString();a=a.replace(/[\r\n]+/g,"\\n");a=a.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g,'"+(obj.$1?"$2":"$3")+"');a=a.replace(/\{common\.([^}\(]*)\}/g,'"+common.$1+"');a=a.replace(/\{common\.([^\}\(]*)\(\)\}/g,
'"+(common.$1?common.$1(obj):"")+"');a=a.replace(/\{obj\.([^}]*)\}/g,'"+obj.$1+"');a=a.replace(/#([a-z0-9_]+)#/gi,'"+obj.$1+"');a=a.replace(/\{obj\}/g,'"+obj+"');a=a.replace(/\{-obj/g,"{obj");a=a.replace(/\{-common/g,"{common");a='return "'+a+'";';return this.u[a]=Function("obj","common",a)}};
dhtmlx.Type={add:function(a,b){if(!a.types&&a.prototype.types)a=a.prototype;var c=b.name||"default";this.A(b);this.A(b,"edit");this.A(b,"loading");a.types[c]=dhtmlx.extend(dhtmlx.extend({},a.types[c]||this.$),b);return c},$:{css:"default",template:function(){return""},template_edit:function(){return""},template_loading:function(){return"..."},width:150,height:80,margin:5,padding:0},A:function(a,b){b="template"+(b?"_"+b:"");var c=a[b];if(c&&typeof c=="string"){if(c.indexOf("->")!=-1){c=c.split("->");
switch(c[0]){case "html":c=dhtmlx.html.getValue(c[1]).replace(/\"/g,'\\"');break;case "http":c=(new dhtmlx.ajax).sync().get(c[1],{uid:(new Date).valueOf()}).responseText;break;default:break}}a[b]=dhtmlx.Template.fromHTML(c)}}};
dhtmlx.SingleRender={e:function(){},ya:function(a){return this.type.ia(a,this.type)+this.type.template(a,this.type)+this.type.ha},render:function(){if(!this.callEvent||this.callEvent("onBeforeRender",[this.data])){if(this.data)this.v.innerHTML=this.ya(this.data);this.callEvent&&this.callEvent("onAfterRender",[])}}};
dhtmlx.ui.Tooltip=function(a){this.name="Tooltip";this.version="3.0";if(typeof a=="string")a={template:a};dhtmlx.extend(this,dhtmlx.Settings);dhtmlx.extend(this,dhtmlx.SingleRender);this.V(a,{type:"default",dy:0,dx:20});this.v=this.b=document.createElement("DIV");this.b.className="dhx_tooltip";dhtmlx.html.insertBefore(this.b,document.body.firstChild)};
dhtmlx.ui.Tooltip.prototype={show:function(a,b){if(this.data!=a){this.data=a;this.render(a)}this.b.style.top=b.y+this.a.dy+"px";this.b.style.left=b.x+this.a.dx+"px";this.b.style.display="block"},hide:function(){this.data=null;this.b.style.display="none"},types:{"default":dhtmlx.Template.fromHTML("{obj.id}")},template_item_start:dhtmlx.Template.empty,template_item_end:dhtmlx.Template.empty};
dhtmlx.AutoTooltip={tooltip_setter:function(a,b){var c=new dhtmlx.ui.Tooltip(b);this.attachEvent("onMouseMove",function(d,e){c.show(this.get(d),dhtmlx.html.pos(e))});this.attachEvent("onMouseOut",function(){c.hide()});this.attachEvent("onMouseMoving",function(){c.hide()});return c}};dhtmlx.DataStore=function(){this.name="DataStore";dhtmlx.extend(this,dhtmlx.EventSystem);this.setDriver("xml");this.pull={};this.order=dhtmlx.toArray()};
dhtmlx.DataStore.prototype={setDriver:function(a){this.driver=dhtmlx.DataDriver[a]},qa:function(a){for(var b=this.driver.getInfo(a),c=this.driver.getRecords(a),d=(b.m||0)*1,e=0,f=0;f<c.length;f++){var g=this.driver.getDetails(c[f]),h=this.id(g);if(!this.pull[h]){this.order[e+d]=h;e++}this.pull[h]=g}for(f=0;f<b.o;f++)if(!this.order[f]){h=dhtmlx.uid();g={id:h,$template:"loading"};this.pull[h]=g;this.order[f]=h}this.callEvent("onStoreLoad",[this.driver,a]);this.refresh()},id:function(a){return a.id||
(a.id=dhtmlx.uid())},get:function(a){return this.pull[a]},set:function(a,b){this.pull[a]=b;this.refresh()},refresh:function(a){a?this.callEvent("onStoreUpdated",[a,this.pull[a],"update"]):this.callEvent("onStoreUpdated",[null,null,null])},getRange:function(a,b){if(arguments.length){a=this.indexById(a);b=this.indexById(b);if(a>b){var c=b;b=a;a=c}}else{a=this.min||0;b=Math.min(this.max||Infinity,this.dataCount()-1)}return this.getIndexRange(a,b)},getIndexRange:function(a,b){b=Math.min(b,this.dataCount()-
1);var c=dhtmlx.toArray();for(a=a;a<=b;a++)c.push(this.get(this.order[a]));return c},dataCount:function(){return this.order.length},exists:function(a){return!!this.pull[a]},move:function(a,b){if(!(a<0||b<0)){var c=this.idByIndex(a),d=this.get(c);this.order.removeAt(a);this.order.insertAt(c,Math.min(this.order.length,b));this.callEvent("onStoreUpdated",[c,d,"move"])}},add:function(a,b){var c=this.id(a),d=this.dataCount();if(dhtmlx.isNotDefined(b)||b<0)b=d;if(b>d)b=Math.min(this.order.length,b);if(this.callEvent("onbeforeAdd",
[c,b])){if(this.exists(c))return null;this.pull[c]=a;this.order.insertAt(c,b);if(this.g){var e=this.g.length;if(!b&&this.order.length)e=0;this.g.insertAt(c,e)}this.callEvent("onafterAdd",[c,b]);this.callEvent("onStoreUpdated",[c,a,"add"]);return c}},remove:function(a){if(a instanceof Array)for(var b=0;b<a.length;b++)this.remove(a[b]);else if(this.callEvent("onbeforedelete",[a])){if(!this.exists(a))return null;b=this.get(a);this.order.remove(a);this.g&&this.g.remove(a);delete this.pull[a];this.callEvent("onafterdelete",
[a]);this.callEvent("onStoreUpdated",[a,b,"delete"])}},clearAll:function(){this.pull={};this.order=dhtmlx.toArray();this.g=null;this.callEvent("onClearAll",[]);this.refresh()},idByIndex:function(a){return this.order[a]},indexById:function(a){return a=this.order.find(a)},next:function(a,b){return this.order[this.indexById(a)+(b||1)]},first:function(){return this.order[0]},last:function(){return this.order[this.order.length-1]},previous:function(a,b){return this.order[this.indexById(a)-(b||1)]},sort:function(a,
b,c){var d=a;if(typeof a=="function")d={as:a,dir:b};else if(typeof a=="string")d={by:a,dir:b,as:c};var e=[d.by,d.dir,d.as];if(this.callEvent("onbeforesort",e)){var f=dhtmlx.sort.create(d),g=this.getRange();g.sort(f);this.order=g.map(function(h){return this.id(h)},this);this.refresh();this.callEvent("onaftersort",e)}},filter:function(a,b){if(this.g){this.order=this.g;delete this.g}if(a){var c=a;if(typeof a=="string"){a=dhtmlx.Template.setter(0,a);c=function(e,f){return a(e).toLowerCase().indexOf(f)!=
-1}}b=(b||"").toString().toLowerCase();var d=dhtmlx.toArray();this.order.each(function(e){c(this.get(e),b)&&d.push(e)},this);this.g=this.order;this.order=d}this.refresh()},each:function(a,b){for(var c=0;c<this.order.length;c++)a.call(b||this,this.get(this.order[c]))},provideApi:function(a,b){b&&this.mapEvent({onbeforesort:a,onaftersort:a,onbeforeadd:a,onafteradd:a,onbeforedelete:a,onafterdelete:a});for(var c=["sort","add","remove","exists","idByIndex","indexById","get","set","refresh","dataCount",
"filter","next","previous","clearAll","first","last"],d=0;d<c.length;d++)a[c[d]]=dhtmlx.methodPush(this,c[d])}};
dhtmlx.sort={create:function(a){return dhtmlx.sort.dir(a.dir,dhtmlx.sort.by(a.by,a.as))},as:{"int":function(a,b){a*=1;b*=1;return a>b?1:a<b?-1:0},string_strict:function(a,b){a=a.toString();b=b.toString();return a>b?1:a<b?-1:0},string:function(a,b){a=a.toString().toLowerCase();b=b.toString().toLowerCase();return a>b?1:a<b?-1:0}},by:function(a,b){if(typeof b!="function")b=dhtmlx.sort.as[b||"string"];a=dhtmlx.Template.setter(0,a);return function(c,d){return b(a(c),a(d))}},dir:function(a,b){if(a=="asc")return b;
return function(c,d){return b(c,d)*-1}}};
dhtmlx.Group={e:function(){this.data.attachEvent("onStoreLoad",dhtmlx.bind(function(){this.a.group&&this.group(this.a.group,false)},this));this.attachEvent("onBeforeRender",dhtmlx.bind(function(a){if(this.a.sort){a.block();a.sort(this.a.sort);a.unblock()}},this));this.attachEvent("onBeforeSort",dhtmlx.bind(function(){this.a.sort=null},this))},ga:function(a,b){a.attachEvent("onClearAll",dhtmlx.bind(function(){this.ungroup(false)},b))},sum:function(a,b){a=dhtmlx.Template.setter(0,a);b=b||this.data;
var c=0;b.each(function(d){c+=a(d)*1});return c},min:function(a,b){a=dhtmlx.Template.setter(0,a);b=b||this.data;var c=Infinity;b.each(function(d){if(a(d)*1<c)c=a(d)*1});return c*1},max:function(a,b){a=dhtmlx.Template.setter(0,a);b=b||this.data;var c=-Infinity;b.each(function(d){if(a(d)*1>c)c=a(d)*1});return c},xa:function(a){var b=function(i,k){i=dhtmlx.Template.setter(0,i);return i(k[0])},c=dhtmlx.Template.setter(0,a.by);a.map[c]||(a.map[c]=[c,b]);var d={},e=[];this.data.each(function(i){var k=c(i);
if(!d[k]){e.push({id:k});d[k]=dhtmlx.toArray()}d[k].push(i)});for(var f in a.map){var g=a.map[f][1]||b;if(typeof g!="function")g=this[g];for(var h=0;h<e.length;h++)e[h][f]=g.call(this,a.map[f][0],d[e[h].id])}this.R=this.data;this.data=new dhtmlx.DataStore;this.data.provideApi(this,true);this.ga(this.data,this);this.parse(e,"json")},group:function(a,b){this.ungroup(false);this.xa(a);b!==false&&this.render()},ungroup:function(a){if(this.R){this.data=this.R;this.data.provideApi(this,true)}a!==false&&
this.render()},group_setter:function(a,b){return b},sort_setter:function(a,b){if(typeof b!="object")b={by:b};this.i(b,{as:"string",dir:"asc"});return b}};dhtmlx.KeyEvents={e:function(){dhtmlx.event(this.b,"keypress",this.na,this)},na:function(a){a=a||event;var b=a.which||a.keyCode;this.callEvent(this.Aa?"onEditKeyPress":"onKeyPress",[b,a.ctrlKey,a.shiftKey,a])}};
dhtmlx.MouseEvents={e:function(){if(this.on_click){dhtmlx.event(this.b,"click",this.ka,this);dhtmlx.event(this.b,"contextmenu",this.la,this)}this.on_dblclick&&dhtmlx.event(this.b,"dblclick",this.ma,this);if(this.on_mouse_move){dhtmlx.event(this.b,"mousemove",this.T,this);dhtmlx.event(this.b,dhtmlx.k?"mouseleave":"mouseout",this.T,this)}},ka:function(a){return this.w(a,this.on_click,"ItemClick")},ma:function(a){return this.w(a,this.on_dblclick,"ItemDblClick")},la:function(a){var b=dhtmlx.html.locate(a,
this.h);if(b&&!this.callEvent("onBeforeContextMenu",[b,a]))return dhtmlx.html.preventEvent(a)},T:function(a){if(dhtmlx.k)a=document.createEventObject(event);this.Q&&window.clearTimeout(this.Q);this.callEvent("onMouseMoving",[a]);this.Q=window.setTimeout(dhtmlx.bind(function(){a.type=="mousemove"?this.oa(a):this.pa(a)},this),500)},oa:function(a){this.w(a,this.on_mouse_move,"MouseMove")||this.callEvent("onMouseOut",[a||event])},pa:function(a){this.callEvent("onMouseOut",[a||event])},w:function(a,b,
c){a=a||event;for(var d=a.target||a.srcElement,e="",f=null,g=false;d&&d.parentNode;){if(!g&&d.getAttribute)if(f=d.getAttribute(this.h)){if(!this.callEvent("on"+c,[f,a,d]))return;g=true}if(e=d.className){e=e.split(" ");e=e[0]||e[1];if(b[e])return b[e].call(this,a,f,d)}d=d.parentNode}return g}};
dhtmlx.Settings={e:function(){this.a=this.config=[];this.a.sort=null},define:function(a,b){if(typeof a=="object")return this.U(a);return this.F(a,b)},F:function(a,b){var c=this[a+"_setter"];return this.a[a]=c?c.call(this,a,b):b},U:function(a){if(a)for(var b in a)this.F(b,a[b])},V:function(a,b){var c=dhtmlx.extend({},b);typeof a=="object"&&!a.tagName&&dhtmlx.extend(c,a);this.U(c)},i:function(a,b){for(var c in b)switch(typeof a[c]){case "object":a[c]=this.i(a[c]||{},b[c]);break;case "undefined":a[c]=
b[c];break;default:break}return a},ra:function(a,b,c){if(typeof a=="object"&&!a.tagName)a=a.container;this.b=dhtmlx.toNode(a);if(!this.b&&c)this.b=c(a);this.b.className+=" "+b;this.b.onselectstart=function(){return false};this.v=this.b},va:function(a){if(typeof a=="object")return this.type_setter("type",a);this.type=dhtmlx.extend({},this.types[a]);this.customize()},customize:function(a){a&&dhtmlx.extend(this.type,a);this.type.ia=dhtmlx.Template.fromHTML(this.template_item_start(this.type));this.type.ha=
this.template_item_end(this.type);this.render()},type_setter:function(a,b){this.va(typeof b=="object"?dhtmlx.Type.add(this,b):b);return b},template_setter:function(a,b){return this.type_setter("type",{template:b})},css_setter:function(a,b){this.b.className+=" "+b;return b}};dhtmlx.compat=function(a,b){dhtmlx.compat[a]&&dhtmlx.compat[a](b)};
(function(){if(!window.dhtmlxError){var a=function(){};window.dhtmlxError={catchError:a,throwError:a};window.convertStringToBoolean=function(c){return!!c};window.dhtmlxEventable=function(c){dhtmlx.extend(c,dhtmlx.EventSystem)};var b={getXMLTopNode:function(){},doXPath:function(c){return dhtmlx.DataDriver.xml.xpath(this.xml,c)},xmlDoc:{responseXML:true}};dhtmlx.compat.dataProcessor=function(c){var d="_sendData",e="_in_progress",f="_tMode",g="_waitMode";c[d]=function(h,i){if(h){if(i)this[e][i]=(new Date).valueOf();
if(!this.callEvent("onBeforeDataSending",i?[i,this.getState(i)]:[]))return false;var k=this,l=this.serverProcessor;this[f]!="POST"?dhtmlx.ajax().get(l+(l.indexOf("?")!=-1?"&":"?")+this.serialize(h,i),"",function(m,j){b.xml=dhtmlx.DataDriver.xml.checkResponse(m,j);k.afterUpdate(k,null,null,null,b)}):dhtmlx.ajax().post(l,this.serialize(h,i),function(m,j){b.xml=dhtmlx.DataDriver.xml.checkResponse(m,j);k.afterUpdate(k,null,null,null,b)});this[g]++}}}}})();if(!dhtmlx.attaches)dhtmlx.attaches={};
dhtmlx.attaches.attachAbstract=function(a,b){var c=document.createElement("DIV");c.id="CustomObject_"+dhtmlx.uid();c.style.width="100%";c.style.height="100%";c.cmp="grid";document.body.appendChild(c);this.attachObject(c.id);b.container=c.id;var d=this.vs[this.av];d.grid=new window[a](b);d.gridId=c.id;d.gridObj=c;d.grid.setSizes=function(){this.resize?this.resize():this.render()};var e="_viewRestore";return this.vs[this[e]()].grid};
dhtmlx.attaches.attachDataView=function(a){return this.attachAbstract("dhtmlXDataView",a)};dhtmlx.attaches.attachChart=function(a){return this.attachAbstract("dhtmlXChart",a)};dhtmlx.compat.layout=function(){};dhtmlx.ajax=function(a,b,c){if(arguments.length!==0){var d=new dhtmlx.ajax;if(c)d.master=c;d.get(a,null,b)}if(!this.getXHR)return new dhtmlx.ajax;return this};
dhtmlx.ajax.prototype={getXHR:function(){return dhtmlx.k?new ActiveXObject("Microsoft.xmlHTTP"):new XMLHttpRequest},send:function(a,b,c){var d=this.getXHR();if(typeof c=="function")c=[c];if(typeof b=="object"){var e=[];for(var f in b)e.push(f+"="+encodeURIComponent(b[f]));b=e.join("&")}if(b&&!this.post){a=a+(a.indexOf("?")!=-1?"&":"?")+b;b=null}d.open(this.post?"POST":"GET",a,!this.X);this.post&&d.setRequestHeader("Content-type","application/x-www-form-urlencoded");if(!this.X){var g=this;d.onreadystatechange=
function(){if(!d.readyState||d.readyState==4){if(c&&g)for(var h=0;h<c.length;h++)if(c[h])c[h].call(g.master||g,d.responseText,d.responseXML,d);c=d=g=g.master=null}}}d.send(b||null);return d},get:function(a,b,c){this.post=false;return this.send(a,b,c)},post:function(a,b,c){this.post=true;return this.send(a,b,c)},sync:function(){this.X=true;return this}};
dhtmlx.DataLoader={e:function(){this.data=new dhtmlx.DataStore},load:function(a,b,c){this.callEvent("onXLS",[]);if(typeof b=="string"){this.data.setDriver(b);b=c}if(!this.data.feed)this.data.feed=function(d,e){if(this.r)return this.r=[d,e];else this.r=true;this.load(a+(a.indexOf("?")==-1?"?":"&")+"posStart="+d+"&count="+e,function(){var f=this.r;this.r=false;typeof f=="object"&&this.data.feed.apply(this,f)})};dhtmlx.ajax(a,[this.S,b],this)},parse:function(a,b){this.callEvent("onXLS",[]);b&&this.data.setDriver(b);
this.S(a,null)},S:function(a,b){this.data.qa(this.data.driver.toObject(a,b));this.callEvent("onXLE",[])}};dhtmlx.DataDriver={};dhtmlx.DataDriver.json={toObject:function(a){if(typeof a=="string"){eval("dhtmlx.temp="+a);return dhtmlx.temp}return a},getRecords:function(a){if(a&&!(a instanceof Array))return[a];return a},getDetails:function(a){return a},getInfo:function(a){return{o:a.total_count||0,m:a.pos||0}}};
dhtmlx.DataDriver.html={toObject:function(a){if(typeof a=="string"){var b=null;if(a.indexOf("<")==-1)b=dhtmlx.toNode(a);if(!b){b=document.createElement("DIV");b.innerHTML=a}return b.getElementsByTagName(this.tag)}return a},getRecords:function(a){if(a.tagName)return a.childNodes;return a},getDetails:function(a){return dhtmlx.DataDriver.xml.tagToObject(a)},getInfo:function(){return{o:0,m:0}},tag:"LI"};
dhtmlx.DataDriver.jsarray={toObject:function(a){if(typeof a=="string"){eval("dhtmlx.temp="+a);return dhtmlx.temp}return a},getRecords:function(a){return a},getDetails:function(a){for(var b={},c=0;c<a.length;c++)b["data"+c]=a[c];return b},getInfo:function(){return{o:0,m:0}}};
dhtmlx.DataDriver.csv={toObject:function(a){return a},getRecords:function(a){return a.split(this.row)},getDetails:function(a){a=this.stringToArray(a);for(var b={},c=0;c<a.length;c++)b["data"+c]=a[c];return b},getInfo:function(){return{o:0,m:0}},stringToArray:function(a){a=a.split(this.cell);for(var b=0;b<a.length;b++)a[b]=a[b].replace(/^[ \t\n\r]*(\"|)/g,"").replace(/(\"|)[ \t\n\r]*$/g,"");return a},row:"\n",cell:","};
dhtmlx.DataDriver.xml={toObject:function(a,b){if(b&&(b=this.checkResponse(a,b)))return b;if(typeof a=="string")return this.fromString(a);return a},getRecords:function(a){return this.xpath(a,this.records)},records:"/*/item",userdata:"/*/userdata",getDetails:function(a){return this.tagToObject(a,{})},getUserData:function(a,b){b=b||{};var c=this.xpath(a,this.userdata);for(a=0;a<c.length;a++){var d=this.tagToObject(c[a]);b[d.name]=d.value}return b},getInfo:function(a){return{o:a.documentElement.getAttribute("total_count")||
0,m:a.documentElement.getAttribute("pos")||0}},xpath:function(a,b){if(window.XPathResult){var c=a;if(a.nodeName.indexOf("document")==-1)a=a.ownerDocument;var d=[];a=a.evaluate(b,c,null,XPathResult.ANY_TYPE,null);for(b=a.iterateNext();b;){d.push(b);b=a.iterateNext()}return d}return a.selectNodes(b)},tagToObject:function(a,b){b=b||{};for(var c=a.attributes,d=0;d<c.length;d++)b[c[d].name]=c[d].value;var e=false,f=a.childNodes;for(d=0;d<f.length;d++)if(f[d].nodeType==1){var g=f[d].tagName;if(typeof b[g]!=
"undefined"){b[g]instanceof Array||(b[g]=[b[g]]);b[g].push(this.tagToObject(f[d],{}))}else b[f[d].tagName]=this.tagToObject(f[d],{});e=true}if(!c.length&&!e)return this.nodeValue(a);b.value=this.nodeValue(a);return b},nodeValue:function(a){if(a.firstChild)return a.firstChild.data;return""},fromString:function(a){if(window.DOMParser)return(new DOMParser).parseFromString(a,"text/xml");if(window.ActiveXObject){temp=new ActiveXObject("Microsoft.xmlDOM");temp.loadXML(a);return temp}},checkResponse:function(a,
b){if(b&&b.firstChild&&b.firstChild.tagName!="parsererror")return b;if(a=this.from_string(a.responseText.replace(/^[\s]+/,"")))return a}};dhtmlx.DataDriver.dhtmlxgrid={fa:"_get_cell_value",toObject:function(a){return this.M=a},getRecords:function(a){return a.rowsBuffer},getDetails:function(a){for(var b={},c=0;c<this.M.getColumnsNum();c++)b["data"+c]=this.M[this.fa](a,c);return b},getInfo:function(){return{o:0,m:0}}};
dhtmlx.Canvas={e:function(){this.q=[]},sa:function(a){this.d=dhtmlx.html.create("canvas",{width:a.offsetWidth,height:a.offsetHeight});a.appendChild(this.d);if(!this.d.getContext)if(dhtmlx.k){dhtmlx.require("thirdparty/excanvas/excanvas.js");G_vmlCanvasManager.init_(document);G_vmlCanvasManager.initElement(this.d)}return this.d},getCanvas:function(a){return(this.d||this.sa(this.b)).getContext(a||"2d")},ua:function(){if(this.d){this.d.setAttribute("width",this.d.parentNode.offsetWidth);this.d.setAttribute("height",
this.d.parentNode.offsetHeight)}},renderText:function(a,b,c,d,e){if(c){a=dhtmlx.html.create("DIV",{"class":"dhx_canvas_text"+(d?" "+d:""),style:"left:"+a+"px; top:"+b+"px;"},c);this.b.appendChild(a);this.q.push(a);if(e)a.style.width=e+"px";return a}},renderTextAt:function(a,b,c,d,e,f,g){if(e=this.renderText.call(this,c,d,e,f,g)){if(a)e.style.top=d-e.offsetHeight+"px";if(b)e.style.left=parseInt(c-e.offsetWidth/2,10)+"px"}},clearCanvas:function(){for(var a=0;a<this.q.length;a++)this.b.removeChild(this.q[a]);
this.q=[];if(this.b.n){this.b.n.parentNode.removeChild(this.b.n);this.b.n=null}this.getCanvas().clearRect(0,0,this.d.offsetWidth,this.d.offsetHeight)}};
dhtmlXChart=function(a){this.name="Chart";this.version="3.0";dhtmlx.extend(this,dhtmlx.Settings);this.ra(a,"dhx_chart");dhtmlx.extend(this,dhtmlx.DataLoader);this.data.provideApi(this,true);dhtmlx.extend(this,dhtmlx.EventSystem);dhtmlx.extend(this,dhtmlx.MouseEvents);dhtmlx.extend(this,dhtmlx.Destruction);dhtmlx.extend(this,dhtmlx.Canvas);dhtmlx.extend(this,dhtmlx.Group);dhtmlx.extend(this,dhtmlx.AutoTooltip);dhtmlx.extend(this,dhtmlx.chart.pie);dhtmlx.extend(this,dhtmlx.chart.bar);dhtmlx.extend(this,
dhtmlx.chart.line);this.V(a,{color:"RAINBOW",alpha:"1",label:false,value:"{obj.value}",padding:{},view:"pie",lineColor:"#ffffff",cant:0.5,width:15,labelWidth:100,line:{},item:{},shadow:true,gradient:false,border:true,labelOffset:20});this.data.attachEvent("onStoreUpdated",dhtmlx.bind(function(){this.render()},this))};
dhtmlXChart.prototype={h:"dhx_area_id",on_click:{},on_dblclick:{},on_mouse_move:{},resize:function(){this.ua();this.render()},render:function(){if(this.callEvent("onBeforeRender",[this.data])){this.clearCanvas();this["pvt_render_"+this.a.view](this.getCanvas(),this.data.getRange(),this.b.offsetWidth,this.b.offsetHeight)}},value_setter:dhtmlx.Template.obj_setter,alpha_setter:dhtmlx.Template.obj_setter,label_setter:dhtmlx.Template.obj_setter,lineColor_setter:dhtmlx.Template.obj_setter,pieInnerText_setter:dhtmlx.Template.obj_setter,
colormap:{RAINBOW:function(a){a=Math.floor(this.indexById(a.id)/this.dataCount()*1536);if(a==1536)a-=1;return this.ta[Math.floor(a/256)](a%256)}},color_setter:function(a,b){return this.colormap[b]||dhtmlx.Template.obj_setter(a,b)},legend_setter:function(a,b){if(typeof b!="object")b={template:b};this.i(b,{width:150,height:18,align:"left",valign:"bottom",template:"",marker:{type:"square",width:25,height:15}});b.template=dhtmlx.Template.setter(0,b.template);return b},item_setter:function(a,b){if(typeof b!=
"object")b={color:b,borderColor:b};this.i(b,{radius:4,color:"#000000",borderColor:"#000000",borderWidth:2});b.color=dhtmlx.Template.setter(0,b.color);b.borderColor=dhtmlx.Template.setter(0,b.borderColor);return b},line_setter:function(a,b){if(typeof b!="object")b={color:b};this.i(b,{width:3,color:"#d4d4d4"});b.color=dhtmlx.Template.setter(0,b.color);return b},padding_setter:function(a,b){if(typeof b!="object")b={left:b,right:b,top:b,bottom:b};this.i(b,{left:50,right:20,top:35,bottom:40});return b},
xAxis_setter:function(a,b){if(!b)return false;if(typeof b!="object")b={template:b};this.i(b,{title:"",color:"#000000",template:"",lines:false});if(b.template)b.template=dhtmlx.Template.setter(0,b.template);return b},yAxis_setter:function(a,b){this.i(b,{title:"",color:"#000000",template:"{obj}",lines:true});if(b.template)b.template=dhtmlx.Template.setter(0,b.template);return b},I:function(a,b,c,d){if(this.a.xAxis){b=parseInt(this.a.padding.left,10)-0.5;var e=d-this.a.padding.bottom+0.5,f=c-this.a.padding.right;
this.j(a,b,e,f,e,this.a.xAxis.color,1);this.renderTextAt(true,false,b,d-2,this.a.xAxis.title,"dhx_axis_title_x",c-b-parseInt(this.a.padding.right,10)-2);this.a.xAxis&&this.a.xAxis.lines&&this.j(a,f,e,f+0.5,this.a.padding.top+0.5,this.a.xAxis.color,0.2)}},K:function(a,b,c,d,e,f){var g,h={};if(this.a.yAxis){b=parseInt(this.a.padding.left,10)-0.5;d=d-parseInt(this.a.padding.bottom,10);var i=parseInt(this.a.padding.top,10);this.j(a,b,d,b,i,this.a.yAxis.color,1);if(this.a.yAxis.step)g=parseFloat(this.a.yAxis.step);
if(typeof this.a.yAxis.step=="undefined"||typeof this.a.yAxis.start=="undefined"||typeof this.a.yAxis.end=="undefined"){h=this.Z(e,f);e=h.start;f=h.end;g=h.step;this.a.yAxis.end=f;this.a.yAxis.start=e;this.a.yAxis.step=g}if(g!==0){for(var k=(d-i)*g/(f-e),l=0,m=e;m<=f;m+=g){if(h.fixNum)m=parseFloat((new Number(m)).toFixed(h.fixNum));var j=Math.floor(d-l*k)+0.5;m!=e&&this.a.yAxis.lines&&this.j(a,b,j,c-this.a.padding.right,j,this.a.yAxis.color,0.2);this.renderText(0,j-5,this.a.yAxis.template(m.toString()),
"dhx_axis_item_y",parseInt(this.a.padding.left,10)-5);l++}this.renderTextAt(true,false,0,i-4,this.a.yAxis.title,"dhx_axis_title_y")}}},Z:function(a,b){var c,d,e;c=(b-a)/8;var f=Math.floor(this.O(c)),g=Math.pow(10,f),h=c/g;h=h>5?10:5;c=parseInt(h,10)*g;if(c>Math.abs(a))d=a<=0||a<c/10?-c:0;else{var i=Math.abs(a),k=Math.floor(this.O(i)),l=i/Math.pow(10,k);d=Math.ceil(l*10)/10*Math.pow(10,k)-c;if(a<0)d=-d-2*c}for(e=d;e<=b;){e+=c;e=parseFloat((new Number(e)).toFixed(Math.abs(f)))}return{start:d,end:e,
step:c,fixNum:Math.abs(f)}},O:function(a){var b="log";return Math.floor(Math[b](a)/Math.LN10)},J:function(a,b){this.a.xAxis&&this.renderTextAt(false,true,a,this.b.offsetHeight-parseInt(this.a.padding.bottom,10),this.a.xAxis.template(b))},ca:function(a,b,c,d){this.a.xAxis&&this.a.xAxis.lines&&this.j(a,b,c,b,d,this.a.xAxis.color,0.2)},j:function(a,b,c,d,e,f,g){a.strokeStyle=f;a.lineWidth=g;a.beginPath();a.moveTo(b,c);a.lineTo(d,e);a.stroke()},L:function(a,b){var c=1;if(b!=a){a=b-a;if(Math.abs(a)<1)for(;Math.abs(a)<
1;){c*=10;a*=c}}else a=a;return[a,c]},ta:[function(a){return"#FF"+dhtmlx.math.toHex(a/2,2)+"00"},function(a){return"#FF"+dhtmlx.math.toHex(a/2+128,2)+"00"},function(a){return"#"+dhtmlx.math.toHex(255-a,2)+"FF00"},function(a){return"#00FF"+dhtmlx.math.toHex(a,2)},function(a){return"#00"+dhtmlx.math.toHex(255-a,2)+"FF"},function(a){return"#"+dhtmlx.math.toHex(a,2)+"00FF"}]};dhtmlx.compat("layout");
