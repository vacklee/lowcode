import{d as u,c as o,e as i,f as r,h as a,t as f,_ as x,r as g,b as m,D as n,w as d,F as C,C as V,Y as $,aj as v,X as k,l as A}from"./index-2494d58d.js";const D="/lowcode/assets/no-data-1ac769d0.png",N=u({__name:"AppNoData",props:{text:{}},setup(c){return(s,t)=>(o(),i("div",{class:a(s.$style.box)},[r("img",{class:a(s.$style.box_img),src:D},null,2),r("div",{class:a(s.$style.box_text)},f(s.text),3)],2))}}),B="_box_14c5l_1",M="_box_text_14c5l_10",h="_box_img_14c5l_14",w={box:B,box_text:M,box_img:h},P={$style:w},S=x(N,[["__cssModules",P]]),z=u({__name:"AppCollapse",props:{tabs:{default:()=>[]},modelValue:{default:()=>[]}},emits:["update:modelValue"],setup(c,{emit:s}){const t=c,p=g(t.modelValue.length?t.modelValue:t.tabs.map(l=>l.id));return(l,_)=>{const b=m("el-collapse-item"),y=m("el-collapse");return o(),n(y,{class:a(l.$style.collapse),modelValue:p.value,"onUpdate:modelValue":_[0]||(_[0]=e=>p.value=e)},{default:d(()=>[(o(!0),i(C,null,V(l.tabs,e=>(o(),n(b,{key:e.id,name:e.id,title:e.title},{default:d(()=>[e.component?(o(),n($(e.component),v(k({key:0},e.componentProps)),null,16)):A("",!0)]),_:2},1032,["name","title"]))),128))]),_:1},8,["class","modelValue"])}}}),F="_collapse_1yv95_1",j={collapse:F},E={$style:j},U=x(z,[["__cssModules",E]]);export{U as A,S as a};
