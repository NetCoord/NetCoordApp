if(!self.define){let e,i={};const c=(c,r)=>(c=new URL(c+".js",r).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(r,f)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let s={};const n=e=>c(e,o),d={module:{uri:o},exports:s,require:n};i[o]=Promise.all(r.map((e=>d[e]||n(e)))).then((e=>(f(...e),s)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"netcoord"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/about.css",revision:"678c2a85625a6f84f419b40c1f8d2f48"},{url:"/css/app.css",revision:"e75c115b8d3151bcd864f2d6cb103bc1"},{url:"/fonts/FranklinGothic-Heavy.woff",revision:"6bf36d4d73e3ecec56e3ee3795c77cab"},{url:"/fonts/FranklinGothic-Heavy.woff2",revision:"9deff2c42b53beabb5022526eed021de"},{url:"/fonts/HelveticaNeueInterface-Regular.woff",revision:"f96a1d5b896fa3cb3a5a1ea2970fdfff"},{url:"/fonts/HelveticaNeueInterface-Regular.woff2",revision:"71b1b0ad9dfc91a92eabd9c26afa79f6"},{url:"/icon.png",revision:"810f766340b6253c981104ef5285360e"},{url:"/img/Checkin_Button_180.svg",revision:"4e020d65e33d2af7e79d0623699a9bc2"},{url:"/img/Restring_Icon_180.svg",revision:"81c2a8ea155b03014df789bb327b4d3c"},{url:"/img/add-button-active.svg",revision:"6d2bc4f7600818483163e7093d3a006f"},{url:"/img/add-button.svg",revision:"2686809dca20b85d46980816f1cd26f1"},{url:"/img/blue.svg",revision:"dcd0a5dc3deb219fd6314d98ceb135e3"},{url:"/img/calendar.png",revision:"d94f5127b11d0f28efe469a99deaa7c5"},{url:"/img/green.svg",revision:"a0e9feef4c495844db27e6bd1c82ddf0"},{url:"/img/icon.png",revision:"810f766340b6253c981104ef5285360e"},{url:"/img/login-bg.svg",revision:"eb9c03f0886a4fe2450cc88135f76f5a"},{url:"/img/logo-text.svg",revision:"c73873913bbf91032ee3caed044ad43d"},{url:"/img/logo.png",revision:"810f766340b6253c981104ef5285360e"},{url:"/img/marker.svg",revision:"d9f995bee529a92c4926ce6d1bc740b4"},{url:"/img/red.svg",revision:"10cb178b12873dad333ce7cb47fe172b"},{url:"/index.html",revision:"be918ff358cba50af0f279a73e0373c7"},{url:"/js/about.netcoord.js",revision:"c6671a9218becdf682723adc5deadd5a"},{url:"/js/app.netcoord.js",revision:"9b62cd13c74272634cbb0fcbdcead3db"},{url:"/js/chunk-vendors.netcoord.js",revision:"58344ec8771a02cfa3c858960a8af8f5"},{url:"/manifest.json",revision:"399d7f3316b928f719becb8176fb2e79"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
