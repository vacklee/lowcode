import{d,o,h as i,k as r,n as a,t as f,s as x,r as g,b as m,c as n,w as u,F as V,i as $,M as v,a1 as C,L as k,y as A}from"./index-05e2b7d4.js";const M="/assets/no-data-1ac769d0.png",N=d({__name:"AppNoData",props:{text:{}},setup(c){return(s,t)=>(o(),i("div",{class:a(s.$style.box)},[r("img",{class:a(s.$style.box_img),src:M},null,2),r("div",{class:a(s.$style.box_text)},f(s.text),3)],2))}}),B="_box_14c5l_1",D="_box_text_14c5l_10",h="_box_img_14c5l_14",P={box:B,box_text:D,box_img:h},w={$style:P},U=x(N,[["__cssModules",w]]),z=d({__name:"AppCollapse",props:{tabs:{default:()=>[]},modelValue:{default:()=>[]}},emits:["update:modelValue"],setup(c,{emit:s}){const t=c,p=g(t.modelValue.length?t.modelValue:t.tabs.map(l=>l.id));return(l,_)=>{const b=m("el-collapse-item"),y=m("el-collapse");return o(),n(y,{class:a(l.$style.collapse),modelValue:p.value,"onUpdate:modelValue":_[0]||(_[0]=e=>p.value=e)},{default:u(()=>[(o(!0),i(V,null,$(l.tabs,e=>(o(),n(b,{key:e.id,name:e.id,title:e.title},{default:u(()=>[e.component?(o(),n(v(e.component),C(k({key:0},e.componentProps)),null,16)):A("",!0)]),_:2},1032,["name","title"]))),128))]),_:1},8,["class","modelValue"])}}}),F="_collapse_1yv95_1",L={collapse:F},E={$style:L},j=x(z,[["__cssModules",E]]);export{j as A,U as a};
