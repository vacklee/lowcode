import{d,b as p,o as c,h as u,k as n,e as a,w as _,j as m,t as b,n as e,s as v}from"./index-05e2b7d4.js";const f=d({__name:"FourDirectBtn",props:{topText:{},leftText:{},rightText:{},bottomText:{},modelValue:{}},emits:["update:modelValue"],setup(q,{emit:r}){const x=r,s=t=>x("update:modelValue",t);return(t,o)=>{const l=p("el-button");return c(),u("div",{class:e(t.$style.box)},[n("div",{class:e(t.$style.box_top)},[a(l,{size:"small",onClick:o[0]||(o[0]=i=>s("top"))},{default:_(()=>[m(b(t.topText),1)]),_:1})],2),n("div",{class:e(t.$style.box_center)},[a(l,{size:"small",onClick:o[1]||(o[1]=i=>s("left"))},{default:_(()=>[m(b(t.leftText),1)]),_:1}),n("div",{class:e(t.$style.box_vacant)},null,2),a(l,{size:"small",onClick:o[2]||(o[2]=i=>s("right"))},{default:_(()=>[m(b(t.rightText),1)]),_:1})],2),n("div",{class:e(t.$style.box_bottom)},[a(l,{size:"small",onClick:o[3]||(o[3]=i=>s("bottom"))},{default:_(()=>[m(b(t.bottomText),1)]),_:1})],2)],2)}}}),$="_box_1majq_1",C="_box_top_1majq_4",T="_box_center_1majq_4",k="_box_bottom_1majq_4",y="_box_vacant_1majq_9",j={box:$,box_top:C,box_center:T,box_bottom:k,box_vacant:y},V={$style:j},B=v(f,[["__cssModules",V]]);export{B as default};
