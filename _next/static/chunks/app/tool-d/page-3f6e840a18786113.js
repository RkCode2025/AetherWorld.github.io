(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[428],{374:(e,t,a)=>{Promise.resolve().then(a.bind(a,5878))},5878:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n});var r=a(5155),l=a(2115),s=a(8888);function n(){let[e,t]=(0,l.useState)(""),[a,n]=(0,l.useState)("Serious Defense"),[o,i]=(0,l.useState)(200),[d,c]=(0,l.useState)(""),[u,m]=(0,l.useState)(!1),[x,g]=(0,l.useState)(""),h=async t=>{t.preventDefault(),m(!0),g(""),c("");try{let t=await fetch("http://127.0.0.1:5000/reverse-cancel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:e,style:a,wordCount:o})});if(!t.ok)throw Error("Failed to fetch from server.");let r=await t.json();r.defense?c(r.defense):g(r.error||"❌ Failed to generate a defense.")}catch(e){g(e instanceof Error?e.message:"❌ Server error. Please try again later.")}finally{m(!1)}};return(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-6",children:[(0,r.jsx)(s.P.h1,{className:"text-5xl font-extrabold mb-6 text-red-500",initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.5},children:"\uD83D\uDEE1️ Reverse Cancel AI"}),(0,r.jsx)("p",{className:"text-lg text-gray-400 text-center mb-6",children:"Generate a strong defense against cancelation!"}),(0,r.jsxs)("form",{onSubmit:h,className:"w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-xl",children:[(0,r.jsx)("label",{className:"block text-lg mb-2",htmlFor:"topic",children:"Topic:"}),(0,r.jsx)("input",{id:"topic",type:"text",className:"w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-red-500 outline-none",placeholder:"E.g., Pineapple on pizza is good",value:e,onChange:e=>t(e.target.value),required:!0,"aria-label":"Topic"}),(0,r.jsx)("label",{className:"block text-lg mt-6 mb-2",children:"Defense Style:"}),(0,r.jsx)("div",{className:"grid grid-cols-2 gap-4",children:["Serious Defense","Humorous Reversal","Historical Context","Devil's Advocate"].map(e=>(0,r.jsx)(s.P.div,{className:"p-4 rounded-lg cursor-pointer text-center font-semibold transition-all ".concat(a===e?"bg-red-500 text-white border border-red-700 shadow-md":"bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"),onClick:()=>n(e),whileTap:{scale:.95},role:"button","aria-pressed":a===e,children:e},e))}),(0,r.jsxs)("label",{className:"block text-lg mt-6 mb-2",children:["Word Count: ",o]}),(0,r.jsx)("input",{type:"range",min:"50",max:"1000",value:o,onChange:e=>i(Number(e.target.value)),className:"w-full cursor-pointer","aria-label":"Word Count"}),(0,r.jsx)(s.P.button,{whileHover:u?{}:{scale:1.05},whileTap:u?{}:{scale:.95},className:"w-full mt-6 px-6 py-3 rounded-lg font-semibold text-lg shadow-md transition-all ".concat(u?"bg-gray-600 cursor-not-allowed":"bg-red-600 hover:bg-red-700 text-white"),type:"submit",disabled:u,children:u?"Generating...":"Defend This!"})]}),x&&(0,r.jsx)("p",{className:"mt-4 text-red-400",children:x}),d&&(0,r.jsxs)(s.P.div,{className:"mt-6 w-full max-w-2xl p-6 bg-gray-900 border border-red-600 rounded-2xl shadow-lg",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5},children:[(0,r.jsx)("p",{className:"text-red-400 font-bold",children:"Your Defense:"}),(0,r.jsx)("p",{className:"text-white mt-2",children:d})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[888,441,517,358],()=>t(374)),_N_E=e.O()}]);