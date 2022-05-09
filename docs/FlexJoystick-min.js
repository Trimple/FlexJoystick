class FlexJoystick{#t;#i;#e;#s;#h;#n;#c;#r;#o;#a;#d;#u;#l;#g;#p;#k;#m;#j;#y=.4;#O=!1;#f=-1;#b=.1;#v=0;#W=!1;#T=-1;constructor(t){this.#t=document.getElementById(t),"DIV"==this.#t.tagName&&(this.#A(),this.#H())}#A(){this.#i=document.createElement("div"),this.#i.id=this.#t.id+"Outline",this.#t.appendChild(this.#i),this.#i.style.position="absolute",this.#Y(),this.#i.style.borderRadius="100px",this.#i.style.background="lightgrey",this.#i.style.opacity="30%"}#Y(){this.#D(),this.#i.style.top=this.#m+"px",this.#i.style.left=this.#j+"px",this.#h=this.#d/2,this.#n=this.#u/2,this.#i.style.width=this.#l+"px",this.#i.style.height=this.#g+"px"}#D(){this.#d=this.#t.clientWidth,this.#u=this.#t.clientHeight,this.#l=this.#d,this.#g=this.#u,this.#d/this.#u>1.4?this.#s="wide":this.#u/this.#d>1.4?this.#s="long":(this.#s="round",this.#l=Math.min(this.#d,this.#u),this.#g=this.#l),this.#j=(this.#d-this.#l)/2,this.#m=(this.#u-this.#g)/2}#H(){this.#e=document.createElement("div"),this.#e.id=this.#t.id+"Stick",this.#t.appendChild(this.#e),this.#e.style.position="absolute",this.#X(),this.#I(),this.#a=0,this.#o=0,this.#e.style.borderRadius="1000px",this.#e.style.background="grey",this.#R(this.#h,this.#n)}#X(){"round"===this.#s?(this.#e.style.width=.4*Math.min(this.#l,this.#g)+"px",this.#e.style.height=this.#e.clientWidth+"px"):(this.#e.style.width=.8*Math.min(this.#l,this.#g)+"px",this.#e.style.height=this.#e.clientWidth+"px")}#I(){this.#p=this.#e.clientWidth,this.#k=this.#e.clientHeight}#R(t,i){this.#c=t,this.#r=i,this.#e.style.left=this.#c-this.#p/2+"px",this.#e.style.top=this.#r-this.#k/2+"px"}#S(t,i){let e=(this.#u-this.#p)/2,s=(this.#l-this.#p-2*e)/2;this.#a=(t-this.#h)/s,t>this.#d-this.#p/2-this.#j-e?t=this.#d-this.#p/2-this.#j-e:t<this.#j+this.#p/2+e&&(t=this.#j+this.#p/2+e),i=this.#n,t<this.#h?this.#o=180:this.#o=0,this.#R(t,i)}#M(t,i){let e=(this.#d-this.#k)/2;this.#a=-1*(i-this.#n)/((this.#g-this.#k-2*e)/2),i>this.#u-this.#k/2-this.#m-e?i=this.#u-this.#k/2-this.#m-e:i<this.#m+this.#k/2+e&&(i=this.#m+this.#k/2+e),t=this.#h,i<this.#n?this.#o=90:i>this.#n?this.#o=270:this.#o=0,this.#R(t,i)}#w(t,i){if(this.#o=Math.atan2(-1*(i-this.#n),t-this.#h)/Math.PI*180,this.#o<0&&(this.#o+=360),this.#a=Math.sqrt(Math.pow(i-this.#n,2)+Math.pow(t-this.#h,2))/((this.#l-this.#p)/2),this.#a>1){let e=this.#o;e>180&&(e-=360),t=Math.cos(e/180*Math.PI)*((this.#l-this.#p)/2)+this.#h,i=Math.sin(e/180*Math.PI)*((this.#g-this.#k)/2)*-1+this.#n}this.#R(t,i)}handleMouseDown(t,i,e){let s,h;this.#W=!0,this.#O=!1,void 0===i||void 0===e?(s=t.pageX-this.#t.offsetLeft,h=t.pageY-this.#t.offsetTop):(s=i,h=e),"long"===this.#s?this.#M(s,h):"wide"===this.#s?this.#S(s,h):this.#w(s,h),this.#f>=0&&(clearInterval(this.#f),this.#f=-1)}handleMouseMove(t,i,e){if(!1===this.#W)return;let s,h;void 0===i||void 0===e?(s=t.pageX-this.#t.offsetLeft,h=t.pageY-this.#t.offsetTop):(s=i,h=e),"long"===this.#s?this.#M(s,h):"wide"===this.#s?this.#S(s,h):this.#w(s,h)}handleMouseUp(t,i){!1!==this.#W&&(this.#W=!1,this.#O=!i,!0!==this.#O&&0===this.#v&&("long"===this.#s?this.#M(this.#h,this.#n):"wide"===this.#s?this.#S(this.#h,this.#n):this.#w(this.#h,this.#n)))}handleTouchStart(t,i,e){if(this.#T>=0)return;let s,h;t.preventDefault(),this.#T=t.changedTouches[0].identifier,this.#O=!1,void 0===i||void 0===e?(s=t.changedTouches[0].pageX-this.#t.offsetLeft,h=t.changedTouches[0].pageY-this.#t.offsetTop):(s=i,h=e),this.#f>=0&&(clearInterval(this.#f),this.#f=-1),"long"===this.#s?this.#M(s,h):"wide"===this.#s?this.#S(s,h):this.#w(s,h)}handleTouchMove(t,i,e){for(let s=0;s<t.changedTouches.length;s+=1)if(t.changedTouches[s].identifier===this.#T){let h,n;return void 0===i||void 0===e?(h=t.changedTouches[s].pageX-this.#t.offsetLeft,n=t.changedTouches[s].pageY-this.#t.offsetTop):(h=i,n=e),void("long"===this.#s?this.#M(h,n):"wide"===this.#s?this.#S(h,n):this.#w(h,n))}}handleTouchEnd(t,i){for(let e=0;e<t.changedTouches.length;e+=1)if(t.changedTouches[e].identifier===this.#T){if(this.#T=-1,this.#O=!i,!0===this.#O)return;return void(0===this.#v&&("long"===this.#s?this.#M(this.#h,this.#n):"wide"===this.#s?this.#S(this.#h,this.#n):this.#w(this.#h,this.#n)))}}enableAnimation(t){this.#f=t,this.#v=50}handleAnimation(){if(-1!==this.#f)if(0===this.#v)this.#R(this.#h,this.#n),clearInterval(this.#f);else{this.#v-=1;let t=this.#c+(this.#h-this.#c)*this.#b,i=this.#r+(this.#n-this.#r)*this.#b;if(t=t>this.#h?Math.floor(t):Math.ceil(t),i=i>this.#n?Math.floor(i):Math.ceil(i),Math.abs(t-this.#h)<1&&Math.abs(i-this.#n)<1)return void(this.#v=0);"long"===this.#s?this.#M(t,i):"wide"===this.#s?this.#S(t,i):this.#w(t,i)}}updateJoystickDimensions(){this.#I(),this.#Y(),this.#R(this.#h,this.#n)}resetJoystickDimensions(){this.#I(),this.#Y(),this.#X(),this.#I(),this.#R(this.#h,this.#n)}setActivationThreshold(t){t<0||t>1||(this.#y=t)}getDirection(t){return!1===this.#W&&-1===this.#T&&!1===this.#O?"C":"round"==this.#s&&4!=t&&20!=t&&21!=t?this.#L(8):"long"==this.#s?this.#C():"wide"==this.#s?this.#x():21===t?this.#C():20===t?this.#x():this.#L(t)}#C(){return Math.abs(this.#a)<this.#y?"C":this.#o<=180?"U":"D"}#x(){return Math.abs(this.#a)<this.#y?"C":this.#o<=90||this.#o>270?"R":"L"}#L(t){if(this.#a<this.#y)return"C";let i;return 4===t?(i=this.#o>=45&&this.#o<135?"U":this.#o>=135&&this.#o<225?"L":this.#o>=225&&this.#o<315?"D":"R",i):(i=this.#o>=22.5&&this.#o<67.5?"UR":this.#o>=67.5&&this.#o<112.5?"U":this.#o>=112.5&&this.#o<157.5?"UL":this.#o>=157.5&&this.#o<202.5?"L":this.#o>=202.5&&this.#o<247.5?"DL":this.#o>=247.5&&this.#o<292.5?"D":this.#o>=292.5&&this.#o<327.5?"DR":"R",i)}getStickX(){return!1===this.#W&&-1===this.#T&&!1===this.#O?0:this.#c-this.#d/2}getStickY(){return!1===this.#W&&-1===this.#T&&!1===this.#O?0:-1*(this.#r-this.#u/2)}getStickAngle(){return!1===this.#W&&-1===this.#T&&!1===this.#O?0:this.#o}getStickRadius(){return!1===this.#W&&-1===this.#T&&!1===this.#O?0:this.#a}getTouchId(){return this.#T}}