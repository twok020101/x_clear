(()=>{"use strict";const e=document.getElementById("save"),t=document.getElementById("clean");e.addEventListener("click",(()=>{const e=document.getElementById("keywords").value.split(",").map((e=>e.trim()));chrome.storage.local.set({keywords:e},(()=>{alert("Keywords saved!")}))})),t.addEventListener("click",(()=>{chrome.tabs.query({active:!0,currentWindow:!0},(e=>{e[0]?.id&&chrome.scripting.executeScript({target:{tabId:e[0].id},files:["content.js"]})}))}))})();