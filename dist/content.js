(()=>{"use strict";const e=new Set,t=t=>{const o=new MutationObserver((()=>{let o;return(...s)=>{clearTimeout(o),o=setTimeout((()=>(()=>{(t=>{document.querySelectorAll("article").forEach((o=>{const s=(e=>{const t=e.querySelector("div[lang] span");return t?.textContent?.trim()||""})(o);s&&!e.has(s)&&t.some((e=>"string"==typeof e?s.toLowerCase().includes(e.toLowerCase()):e.test(s)))&&(o.style.display="none",console.log(`🚫 Tweet hidden: "${s}"`),e.add(s))}))})(t)})(...s)),500)}})());o.observe(document.body,{childList:!0,subtree:!0}),console.log("🚀 Real-time tweet filtering activated!")};chrome.storage.local.get("keywords",(e=>{const o=e.keywords||[];if(o.length){const e=(e=>e.map((e=>{try{return e.startsWith("/")&&e.endsWith("/")?new RegExp(e.slice(1,-1),"i"):e}catch(t){return console.warn(`Invalid regex: ${e}`),e}})))(o);t(e)}else console.log("⚠️ No keywords found.")}))})();