"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[951],{4951:(e,n,t)=>{t.r(n),t.d(n,{default:()=>L});var s=t(5043),o=t(579);const r=(0,s.createContext)();function i(e){let{children:n}=e;const[t,i]=(0,s.useState)(null),[c,l]=(0,s.useState)(null);return(0,o.jsx)(r.Provider,{value:{benchmarkPath:t,setBenchmarkPath:i,benchmarkDesc:c,setBenchmarkDesc:l},children:n})}function c(){const e=(0,s.useContext)(r);if(void 0===e)throw new Error("\ud504\ub85c\uadf8\ub7a8 \ucee8\ud14d\uc2a4\ud2b8\ub97c \uc81c\uacf5\ud558\uc9c0 \uc54a\ub294 \ud0dc\uadf8\uc785\ub2c8\ub2e4.");return e}var l=t(4790),a=t(3592),h=t(1657),d=t(8988),u=t(1758);const m=(0,u.A)(l.A)({position:"fixed",backgroundColor:"skyblue",borderBottom:"2px gray solid",fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'}),x=(0,u.A)(a.A)({padding:"8px"}),p=(0,u.A)(h.A)({padding:0}),f=(0,u.A)(d.A)({display:"inline-flex",padding:"4px 16px 4px 16px",fontSize:"14px"});function g(e){let{name:n}=e;return(0,o.jsx)(f,{disabled:!0,children:n})}function j(e){let{name:n}=e;return(0,o.jsx)(f,{disabled:!0,children:n})}function b(e){let{name:n}=e;return(0,o.jsx)(f,{disabled:!0,children:n})}function y(e){let{name:n}=e;const{benchmarkId:t,variableId:s}=c();return(0,o.jsx)(f,{onClick:()=>{t&&s&&console.log("\uc120\ud0dd\ud55c \ubca4\uce58\ub9c8\ud06c:",t,s)},children:n})}function k(e){let{name:n}=e;return(0,o.jsxs)(m,{children:[(0,o.jsx)(x,{children:n}),(0,o.jsxs)(p,{children:[(0,o.jsx)(g,{name:"\ud30c\uc77c"}),(0,o.jsx)(j,{name:"\ubcf4\uae30"}),(0,o.jsx)(b,{name:"\uc5b8\uc5b4"})]})]})}function w(){return(0,o.jsx)(m,{sx:{top:"auto",bottom:0},children:(0,o.jsx)(p,{children:(0,o.jsx)(y,{name:"\ub2a5\ub3d9\ud559\uc2b5 \uc218\ud589"})})})}var v=t(311),A=t(5721),S=t(469),C=t(7285),P=t(5081),B=t.n(P);let H="https://localhost:15535/ws",O="/fs",D="/fs/dir-folder",E="/fs/json-file";class F{constructor(e){this.socket=e,this.stomp=null}connect(){return new Promise(((e,n)=>{this.stomp=new C.K({webSocketFactory:()=>this.socket,onConnect:()=>{console.log("\uc11c\ubc84 \uc5f0\uacb0 \uc131\uacf5"),e()},onError:e=>{console.error("\uc11c\ubc84 \uc5f0\uacb0 \uc2e4\ud328",e),n(new Error(e.headers.message))}}),this.stomp.activate()}))}disconnected(){this.stomp&&(console.log("\uc11c\ubc84 \uc5f0\uacb0 \uc885\ub8cc"),this.stomp.deactivate())}getMessage(e,n,t){return new Promise((async(s,o)=>{if(!this.stomp||!this.stomp.connected)try{await this.connect()}catch(i){return o(i)}const r=this.stomp.subscribe(e,(t=>{if(console.log(e,n,"\uc218\uc2e0"),t.body){const e=JSON.parse(t.body);s(e),r.unsubscribe()}}));this.stomp.publish({destination:n,body:JSON.stringify({path:t})}),console.log(e,n,"\uc804\uc1a1")}))}}async function M(e){const n=new(B())(H),t=new F(n);console.log("\ud2b9\uc815 Json \ud30c\uc77c \ud0d0\uc0c9 \uc694\uccad");try{return await t.getMessage(O,E,e)}catch(s){return console.err("\ud30c\uc77c \ud0d0\uc0c9\uae30 \uc624\ub958:",s),null}finally{t.disconnected()}}let I="..",N="meta.json",R="isRunnable";function U(e){let{title:n,root:t,setTarget:r}=e;const[i,c]=(0,s.useState)([]),[l,a]=(0,s.useState)([]),[h,d]=(0,s.useState)(!1);(0,s.useEffect)((()=>{(async function(e){const n=new(B())(H),t=new F(n);console.log("\uc9c1\uc811 \ud558\uc704 \ud3f4\ub354 \ud0d0\uc0c9 \uc694\uccad");try{const n=await t.getMessage(O,D,e);return n.folder?n.folder:[]}catch(s){return console.err("\ud30c\uc77c \ud0d0\uc0c9\uae30 \uc624\ub958:",s),[]}finally{t.disconnected()}})([t,...i].join("/")).then((e=>{i.length>0?a([I,...e]):a(e)})).catch((e=>{i.length>0?a([I]):a([])})).finally((e=>{d(!1),r(null)}))}),[i]);const u=l.map((e=>(0,o.jsx)(v.A,{selected:i===e,onClick:n=>{var s;r((s=e)===I?null:[t,...i,s].join("/"))},onDoubleClick:n=>{return s=e,void(!1===h&&(s===I?(c(i.slice(0,-1)),d(!0)):M([t,...i,s,N].join("/")).then((e=>{e.hasOwnProperty(R)&&!1===e.isRunnable&&(c([...i,s]),d(!0))}))));var s},children:e},e)));return(0,o.jsxs)(A.A,{sx:{padding:"0px",width:"100%",overflowY:"auto"},children:[(0,o.jsx)(S.A,{children:n}),u]})}function W(){const{setBenchmarkPath:e}=c();return(0,o.jsx)(U,{title:"\ubca4\uce58\ub9c8\ud06c \uc120\ud0dd",root:"/home/shared/AL_benchmark",setTarget:e})}function J(){const{benchmarkPath:e,benchmarkDesc:n,setBenchmarkDesc:t}=c();return(0,s.useEffect)((()=>{let n=[e,"meta.json"].join("/");null!==e?M(n).then((e=>{t(e.description)})).catch((e=>{t(null)})):t(null)}),[e]),n}var T=t(7353);const z=(0,u.A)(T.A)({maxHeight:"100vh",padding:"72px 0px 28px 0px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}),K=(0,u.A)(T.A)({display:"flex"});function L(){let e="calc(100vw - 16px)",n="calc(100vh - 252px)";return(0,o.jsx)(z,{children:(0,o.jsxs)(i,{children:[(0,o.jsx)(k,{name:"\ub2a5\ub3d9\ud559\uc2b5 \uc2dc\uc791"}),(0,o.jsx)(K,{minWidth:e,minHeight:n,children:(0,o.jsx)(K,{minWidth:e,maxHeight:n,bgcolor:"whitesmoke",overflow:"hidden",children:(0,o.jsx)(W,{title:"\ubca4\uce58\ub9c8\ud06c \uc608\uc81c \uc120\ud0dd"})})}),(0,o.jsx)(K,{paddingTop:"8px",minWidth:e,minHeight:"128px",children:(0,o.jsx)(K,{minWidth:e,maxHeight:"128px",bgcolor:"whitesmoke",overflow:"hidden",children:(0,o.jsx)(J,{})})}),(0,o.jsx)(w,{})]})})}}}]);
//# sourceMappingURL=951.5813c672.chunk.js.map