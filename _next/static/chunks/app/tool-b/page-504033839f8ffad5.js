(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[850],{7824:(e,r,t)=>{Promise.resolve().then(t.bind(t,5292))},5292:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});var n=t(5155),a=t(2115),o=t(8888);let l=["Default","Shakespearean English","Cyberpunk/Futuristic Tone","Old-School Medieval Speech","Meme or Gen-Z Lingo","Philosopher Style"];function s(){let[e,r]=(0,a.useState)(""),[t,s]=(0,a.useState)(l[0]),[i,u]=(0,a.useState)(200),[c,d]=(0,a.useState)(""),[g,h]=(0,a.useState)(!1),m=async()=>{if(!e.trim()){alert("⚠️ Please enter a prompt.");return}if(i<50||i>1e3){alert("⚠️ Word count must be between 50 and 1000.");return}h(!0),d("");let r={prompt:e,style:t,wordCount:i};console.log("\uD83D\uDCE4 Sending API Request with Body:",r);try{let e=await fetch("http://127.0.0.1:5000/generate-unsummary",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),t=await e.json();if(console.log("\uD83D\uDD0D Full API Response:",t),!e.ok)throw Error(t.error||"Unexpected API error.");d(t.result||"⚠️ No meaningful response from AI.")}catch(e){d("❌ Error fetching AI response."),console.error(e)}h(!1)};return(0,n.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6",children:[(0,n.jsx)(o.P.h1,{className:"text-5xl font-extrabold mb-6 text-green-400",initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{duration:.5},children:"Unsummary AI"}),(0,n.jsx)("p",{className:"text-lg text-gray-400 text-center mb-6",children:"Transform a short prompt into a long, detailed piece in your chosen style."}),(0,n.jsxs)("div",{className:"w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg",children:[(0,n.jsx)("textarea",{className:"w-full p-4 h-32 rounded-lg bg-gray-700 border border-gray-600 text-white   focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all",placeholder:"Enter a short prompt...",value:e,onChange:e=>r(e.target.value)}),(0,n.jsxs)("div",{className:"flex flex-col md:flex-row gap-4 mt-4",children:[(0,n.jsx)("select",{className:"w-full md:w-1/2 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white    cursor-pointer focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none",value:t,onChange:e=>s(e.target.value),children:l.map(e=>(0,n.jsx)("option",{value:e,children:e},e))}),(0,n.jsx)("input",{type:"number",className:"w-full md:w-1/2 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white    focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none",value:i,min:50,max:1e3,onChange:e=>u(Number(e.target.value))})]}),(0,n.jsx)(o.P.button,{whileHover:{scale:1.05},whileTap:{scale:.95},className:"w-full mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg    font-semibold text-lg shadow-md transition-all",onClick:m,disabled:g,children:g?"Generating...":"Generate Text"})]}),c&&(0,n.jsx)(o.P.div,{className:"mt-6 w-full max-w-2xl p-6 bg-gray-800 border border-green-500 rounded-2xl shadow-lg",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.5},children:(0,n.jsx)("p",{className:"text-lg",children:c})})]})}}},e=>{var r=r=>e(e.s=r);e.O(0,[888,441,517,358],()=>r(7824)),_N_E=e.O()}]);