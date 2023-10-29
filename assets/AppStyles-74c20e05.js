import{d as k,r as L,f as b,o as c,c as U,w as $,k as g,n as V,O as F,L as J,P as K,s as C,b as P,h as x,e as f,F as N,i as z,_ as I,t as D,u as ee,Q as E,m as oe,R as te,y as W,S as M,p as h,T as Q,I as le,l as O,U as A,V as se,W as R,X as j,x as H,Y as ne,Z as ae,$ as ue}from"./index-05e2b7d4.js";import{A as re,a as ie}from"./AppCollapse-2b81af2b.js";import{P as de}from"./PixelInput-9cd8312e.js";const pe=k({__name:"AppPopperIconControl",props:{placement:{},popperProps:{}},setup(v,{expose:i}){const o=L(null),a=b(()=>{var l;return!!((l=o.value)!=null&&l.popoverVisible)});return i({poppoverRef:o}),(l,s)=>(c(),U(K,J({ref_key:"poppoverRef",ref:o,placement:l.placement,"show-arrow":!1},l.popperProps),{reference:$(()=>[g("div",{class:V([l.$style.control,a.value&&l.$style.is_focus])},[g("div",{class:V(l.$style.control_prefix)},[F(l.$slots,"prefix")],2),g("div",{class:V(l.$style.control_content)},[F(l.$slots,"default")],2)],2)]),default:$(()=>[F(l.$slots,"poppover")]),_:3},16,["placement"]))}}),ce="_control_1xth4_1",me="_control_prefix_1xth4_10",_e="_control_content_1xth4_20",Ve="_is_focus_1xth4_29",fe={control:ce,control_prefix:me,control_content:_e,is_focus:Ve},ve={$style:fe},be=C(pe,[["__cssModules",ve]]),ye=k({__name:"AppReadonlyColorPicker",props:{color:{}},setup(v){return(i,o)=>{const a=P("el-color-picker");return c(),x("div",{class:V(i.$style.picker_wrapper)},[g("div",{class:V(i.$style.picker)},[f(a,{"model-value":i.color,"show-alpha":!0},null,8,["model-value"])],2)],2)}}}),$e="_picker_17ulx_1",ge="_picker_wrapper_17ulx_18",he={picker:$e,picker_wrapper:ge},xe={$style:he},we=C(ye,[["__cssModules",xe]]),ke=["onClick"],Ae={key:1},Ue=k({__name:"AppCauselRadio",props:{options:{default:()=>[]},modelValue:{},clickCancel:{type:Boolean,default:!0}},emits:["update:modelValue"],setup(v,{emit:i}){const o=v,a=i,l=n=>n.value===o.modelValue,s=n=>{if(n.value===o.modelValue&&o.clickCancel){a("update:modelValue",void 0);return}a("update:modelValue",n.value)};return(n,u)=>{const r=P("el-tooltip");return c(),x("div",{class:V(n.$style.causel)},[(c(!0),x(N,null,z(n.options,e=>(c(),U(r,{key:e.value,content:e.tooltip||e.label,"show-after":1e3},{default:$(()=>[g("div",{class:V([n.$style.causel_item,l(e)&&n.$style.active]),onClick:d=>s(e)},[e.icon?(c(),U(I,{key:0,icon:e.icon,size:14},null,8,["icon"])):(c(),x("span",Ae,D(e.label),1))],10,ke)]),_:2},1032,["content"]))),128))],2)}}}),Ce="_causel_1x2qh_1",Pe="_causel_wrap_1x2qh_10",Me="_causel_item_1x2qh_13",Se="_active_1x2qh_28",Be={causel:Ce,causel_wrap:Pe,causel_item:Me,active:Se},Fe={$style:Be},X=C(Ue,[["__cssModules",Fe]]),De=k({__name:"ColorInput",props:{modelValue:{}},emits:["update:modelValue","picker-focus","picker-blur"],setup(v,{emit:i}){const o=v,{getCommonUseColors:a,setCommonUseColors:l}=ee(),s=i,n=b({get:()=>o.modelValue??"",set:e=>s("update:modelValue",e)}),u=b({get:()=>E(o.modelValue),set:e=>s("update:modelValue",e)}),r=b(()=>a());return oe(()=>o.modelValue,e=>{te(e)&&l(e)}),(e,d)=>{const m=P("el-color-picker"),_=P("el-input"),p=P("el-tooltip");return c(),x("div",{class:V(e.$style.box)},[f(p,{content:n.value||"选择颜色","show-after":1e3,"trigger-keys":[],placement:"bottom"},{default:$(()=>[f(_,{placeholder:"#色值",type:"text",modelValue:n.value,"onUpdate:modelValue":d[3]||(d[3]=t=>n.value=t)},{prepend:$(()=>[f(m,{"show-alpha":!0,predefine:r.value,"color-format":"rgb",modelValue:u.value,"onUpdate:modelValue":d[0]||(d[0]=t=>u.value=t),onFocus:d[1]||(d[1]=t=>s("picker-focus")),onBlur:d[2]||(d[2]=t=>s("picker-blur"))},null,8,["predefine","modelValue"])]),_:1},8,["modelValue"])]),_:1},8,["content"])],2)}}}),Ie="_box_1c54p_1",Te={box:Ie},Re={$style:Te},Y=C(De,[["__cssModules",Re]]),je=k({__name:"FixedPixelInput",props:{modelValue:{},title:{},placeholder:{},hidePlaceholder:{type:Boolean},fixedUnit:{default:"px"},disabled:{type:Boolean}},emits:["update:modelValue"],setup(v,{emit:i}){const o=v,a=i,l=b({get:()=>o.modelValue,set:s=>{a("update:modelValue",s)}});return(s,n)=>{const u=P("el-tooltip");return c(),x("div",null,[f(u,{content:s.title,"show-after":1e3,placement:"bottom"},{default:$(()=>[f(de,{size:"default","allow-empty":!0,"fixed-unit":s.fixedUnit==="none"?void 0:s.fixedUnit,placeholder:s.hidePlaceholder?"":s.placeholder||s.title,modelValue:l.value,"onUpdate:modelValue":n[0]||(n[0]=r=>l.value=r),class:V(s.$style.input),disabled:s.disabled},{prefix:$(()=>[F(s.$slots,"default")]),_:3},8,["fixed-unit","placeholder","modelValue","class","disabled"])]),_:3},8,["content"])])}}}),We="_input_zjuxx_1",Ne={input:We},Oe={$style:Ne},S=C(je,[["__cssModules",Oe]]),Le={key:1},ze=k({__name:"AppFourDirectPixel",props:{modelValue:{},options:{},layout:{default:()=>["top","bottom","left","right"]}},emits:["update:modelValue"],setup(v,{emit:i}){const o=v,a=i,l=u=>{var r;return(r=o.modelValue)==null?void 0:r[u]},s=(u,r)=>{const e={top:l("top"),left:l("left"),right:l("right"),bottom:l("bottom"),[u]:r};if(Object.values(e).every(d=>!d)){a("update:modelValue",void 0);return}a("update:modelValue",e)},n=u=>u;return(u,r)=>(c(),x("div",{class:V(u.$style.box)},[(c(!0),x(N,null,z(u.layout,e=>(c(),U(S,{key:e,title:u.options[e].title,placeholder:u.options[e].placeholder,"model-value":l(e),"onUpdate:modelValue":d=>s(e,d)},{default:$(()=>[u.options[e].icon?(c(),U(I,{key:0,icon:n(u.options[e].icon)},null,8,["icon"])):u.options[e].span?(c(),x("span",Le,D(u.options[e].span),1)):W("",!0)]),_:2},1032,["title","placeholder","model-value","onUpdate:modelValue"]))),128))],2))}}),Ee="_box_rekui_1",qe={box:Ee},He={$style:qe},Ge=C(ze,[["__cssModules",He]]),Qe=k({__name:"BorderInputPanel",props:{modelValue:{}},emits:["update:modelValue","other-show","other-hide"],setup(v,{emit:i}){var p;const o=v,a=i,l=(t,y)=>{var B,T,q;const w={type:(B=o.modelValue)==null?void 0:B.type,width:(T=o.modelValue)==null?void 0:T.width,color:(q=o.modelValue)==null?void 0:q.color,[t]:y};if(Object.values(w).every(Z=>Z===void 0)){a("update:modelValue",void 0);return}a("update:modelValue",w)},s=b({get:()=>{var t;return((t=o.modelValue)==null?void 0:t.type)||M.DEFAULT},set:t=>l("type",t)}),n=b({get:()=>{var t;return E((t=o.modelValue)==null?void 0:t.color)},set:t=>l("color",t)}),u=t=>{if(!t)return!0;const{top:y,left:w,right:B,bottom:T}=t;return y===w&&w===B&&B===T},r=L((p=o.modelValue)!=null&&p.width?!u(o.modelValue.width):!1),e=b({get:()=>{var t;return!((t=o.modelValue)!=null&&t.width)||r.value||!u(o.modelValue.width)?"":o.modelValue.width.top},set:t=>l("width",t?{top:t,left:t,right:t,bottom:t}:void 0)}),d=b({get:()=>{var t;return(t=o.modelValue)==null?void 0:t.width},set:t=>l("width",t)}),m=b(()=>{var t;return r.value?"自定义":(t=o.modelValue)!=null&&t.width?e.value?"":"自定义":""}),_=b(()=>[M.DASHED,M.SOLID].includes(s.value));return(t,y)=>(c(),x("div",{class:V(t.$style.box)},[f(X,{options:h(Q),"click-cancel":!1,modelValue:s.value,"onUpdate:modelValue":y[0]||(y[0]=w=>s.value=w)},null,8,["options","modelValue"]),_.value?(c(),x(N,{key:0},[g("div",{class:V(t.$style.box_row)},[g("div",{class:V(t.$style.box_color)},[f(Y,{modelValue:n.value,"onUpdate:modelValue":y[1]||(y[1]=w=>n.value=w),onPickerFocus:y[2]||(y[2]=w=>a("other-show")),onPickerBlur:y[3]||(y[3]=w=>a("other-hide"))},null,8,["modelValue"])],2),g("div",{class:V(t.$style.box_width)},[f(S,{modelValue:e.value,"onUpdate:modelValue":y[4]||(y[4]=w=>e.value=w),title:"边框粗细",placeholder:m.value,disabled:r.value},{default:$(()=>[f(I,{icon:"t-icon-style-border-width"})]),_:1},8,["modelValue","placeholder","disabled"])],2),f(le,{icon:"t-icon-style-border-all",size:32,"click-cancel":!0,active:r.value,"onUpdate:active":y[5]||(y[5]=w=>r.value=w)},null,8,["active"])],2),r.value?(c(),U(Ge,{key:0,modelValue:d.value,"onUpdate:modelValue":y[6]||(y[6]=w=>d.value=w),options:{top:{title:"顶部边框",icon:"t-icon-style-border-top"},left:{title:"左边框",icon:"t-icon-style-border-left"},right:{title:"右边框",icon:"t-icon-style-border-right"},bottom:{title:"底部边框",icon:"t-icon-style-border-bottom"}}},null,8,["modelValue"])):W("",!0)],64)):W("",!0)],2))}}),Xe="_box_1hnjg_1",Ye="_box_row_1hnjg_7",Ze="_box_color_1hnjg_12",Je="_box_width_1hnjg_12",Ke={box:Xe,box_row:Ye,box_color:Ze,box_width:Je},eo={$style:Ke},oo=C(Qe,[["__cssModules",eo]]),to=k({__name:"BorderInput",props:{modelValue:{}},emits:["update:modelValue"],setup(v,{emit:i}){const o=v,a=b(()=>{var p;return((p=o.modelValue)==null?void 0:p.type)||M.DEFAULT}),l=b(()=>{var p;return E((p=o.modelValue)==null?void 0:p.color)}),s=b(()=>[M.DEFAULT,M.NONE].includes(a.value)),n=b(()=>[M.SOLID,M.DASHED].includes(a.value)),u=b(()=>{const p=Q.find(t=>t.value===a.value);return p?p.detailLabel||p.label:""}),r=i,e=L(null),d=b({get:()=>o.modelValue,set:p=>r("update:modelValue",p)}),m=()=>{e.value.poppoverRef.popoverVisibleStopPause()},_=()=>{e.value.poppoverRef.popoverVisibleStopResume()};return(p,t)=>(c(),U(be,{ref_key:"controlRef",ref:e,placement:"left-end","popper-props":{popperWidth:280}},{prefix:$(()=>[s.value?(c(),U(I,{key:0,icon:"t-icon-border-less",size:24,style:{color:"#d6dbe3"}})):n.value?(c(),U(we,{key:1,color:l.value},null,8,["color"])):W("",!0)]),poppover:$(()=>[f(oo,{modelValue:d.value,"onUpdate:modelValue":t[0]||(t[0]=y=>d.value=y),onOtherShow:m,onOtherHide:_},null,8,["modelValue"])]),default:$(()=>[g("span",null,D(u.value),1)]),_:1},512))}}),lo=k({__name:"AppVisualStylesFill",setup(v){const{useVirsualCss:i,currentNode:o}=O(),a=i(()=>o.value,"border");return(l,s)=>(c(),x("div",{class:V(l.$style.box)},[f(to,{modelValue:h(a),"onUpdate:modelValue":s[0]||(s[0]=n=>A(a)?a.value=n:null)},null,8,["modelValue"])],2))}}),so="_box_51dxm_1",no={box:so},ao={$style:no},uo=C(lo,[["__cssModules",ao]]),ro=k({__name:"AppFourDirectBox",props:{modelValue:{},leftTitle:{},rightTitle:{}},emits:["update:modelValue"],setup(v,{emit:i}){const o=v,a=se(),l=i,s=m=>{var p;const _=(p=o.modelValue)==null?void 0:p[m];if(H(_))return _},n=m=>b({get:()=>{var p,t;if(!H((p=o.modelValue)==null?void 0:p[m]))return"";const _=ne((t=o.modelValue)==null?void 0:t[m]);return _.unit==="px"?`${_.value}`:`${_.value}${_.unit}`},set:_=>{const p={top:s("top"),left:s("left"),right:s("right"),bottom:s("bottom")};if(/^-?\d+(\.\d+)?$/.test(_)?p[m]=`${_}px`:/^-?\d+\.$/.test(_)?p[m]=`${_.replace(".","")}px`:_||(p[m]=""),Object.values(p).every(t=>t===void 0)){l("update:modelValue",void 0);return}l("update:modelValue",p)}}),u=n("top"),r=n("left"),e=n("right"),d=n("bottom");return(m,_)=>(c(),x("div",{class:V(m.$style.box)},[h(a).default?F(m.$slots,"default",{key:0}):(c(),x("div",{key:1,class:V(m.$style.box_border)},null,2)),g("span",{class:V([m.$style.box_title,m.$style.left])},D(m.leftTitle),3),g("span",{class:V([m.$style.box_title,m.$style.right])},D(m.rightTitle),3),R(g("input",{class:V([m.$style.box_input,m.$style.top]),type:"text",placeholder:"0","onUpdate:modelValue":_[0]||(_[0]=p=>A(u)?u.value=p:null)},null,2),[[j,h(u)]]),R(g("input",{class:V([m.$style.box_input,m.$style.left]),type:"text",placeholder:"0","onUpdate:modelValue":_[1]||(_[1]=p=>A(r)?r.value=p:null)},null,2),[[j,h(r)]]),R(g("input",{class:V([m.$style.box_input,m.$style.right]),type:"text",placeholder:"0","onUpdate:modelValue":_[2]||(_[2]=p=>A(e)?e.value=p:null)},null,2),[[j,h(e)]]),R(g("input",{class:V([m.$style.box_input,m.$style.bottom]),type:"text",placeholder:"0","onUpdate:modelValue":_[3]||(_[3]=p=>A(d)?d.value=p:null)},null,2),[[j,h(d)]])],2))}}),io="_box_4uemo_1",po="_box_border_4uemo_7",co="_box_input_4uemo_12",mo="_top_4uemo_28",_o="_left_4uemo_32",Vo="_right_4uemo_36",fo="_bottom_4uemo_40",vo="_box_title_4uemo_44",bo={box:io,box_border:po,box_input:co,top:mo,left:_o,right:Vo,bottom:fo,box_title:vo},yo={$style:bo},G=C(ro,[["__cssModules",yo]]),$o=k({__name:"MarginPadding",props:{margin:{},padding:{}},emits:["update:margin","update:padding"],setup(v,{emit:i}){const o=v,a=i,l=b({get:()=>o.margin,set:n=>a("update:margin",n)}),s=b({get:()=>o.padding,set:n=>a("update:padding",n)});return(n,u)=>(c(),U(G,{"left-title":"外边距","right-title":"margin",modelValue:l.value,"onUpdate:modelValue":u[1]||(u[1]=r=>l.value=r)},{default:$(()=>[f(G,{"left-title":"内边距","right-title":"padding",modelValue:s.value,"onUpdate:modelValue":u[0]||(u[0]=r=>s.value=r),style:{background:"#e3e6eb"}},null,8,["modelValue"])]),_:1},8,["modelValue"]))}}),go=g("span",null,"宽",-1),ho=g("span",null,"高",-1),xo=k({__name:"AppVisualStylesLayout",setup(v){const{useVirsualCss:i,currentNode:o}=O(),a=i(()=>o.value,"width"),l=i(()=>o.value,"height"),s=i(()=>o.value,"margin"),n=i(()=>o.value,"padding");return(u,r)=>(c(),x("div",{class:V(u.$style.box)},[f(S,{modelValue:h(a),"onUpdate:modelValue":r[0]||(r[0]=e=>A(a)?a.value=e:null),title:"宽度","hide-placeholder":!0,"fixed-unit":"none",style:{"grid-area":"width"}},{default:$(()=>[go]),_:1},8,["modelValue"]),f(S,{modelValue:h(l),"onUpdate:modelValue":r[1]||(r[1]=e=>A(l)?l.value=e:null),title:"高度","hide-placeholder":!0,"fixed-unit":"none",style:{"grid-area":"height"}},{default:$(()=>[ho]),_:1},8,["modelValue"]),f($o,{margin:h(s),"onUpdate:margin":r[2]||(r[2]=e=>A(s)?s.value=e:null),padding:h(n),"onUpdate:padding":r[3]||(r[3]=e=>A(n)?n.value=e:null),style:{"grid-area":"margin-padding"}},null,8,["margin","padding"])],2))}}),wo="_box_nwfy1_1",ko={box:wo},Ao={$style:ko},Uo=C(xo,[["__cssModules",Ao]]),Co=g("span",null,"B",-1),Po=k({__name:"FontWeightSelect",props:{modelValue:{}},emits:["update:modelValue"],setup(v,{emit:i}){const o=v,a=i,l=b({get:()=>o.modelValue,set:s=>a("update:modelValue",s)});return(s,n)=>{const u=P("el-option"),r=P("el-select"),e=P("el-tooltip");return c(),x("div",{class:V(s.$style.box)},[f(e,{content:"字重","show-after":1e3,placement:"bottom"},{default:$(()=>[f(r,{placeholder:"字重",modelValue:l.value,"onUpdate:modelValue":n[0]||(n[0]=d=>l.value=d),clearable:!0},{prefix:$(()=>[Co]),default:$(()=>[(c(!0),x(N,null,z(h(ae),d=>(c(),U(u,{key:d.value,value:d.value,label:d.label},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1})],2)}}}),Mo="_box_scd03_1",So={box:Mo},Bo={$style:So},Fo=C(Po,[["__cssModules",Bo]]),Do=g("span",null,"A",-1),Io=k({__name:"AppVisualStylesText",setup(v){const{useVirsualCss:i,currentNode:o}=O(),a=i(()=>o.value,"fontSize"),l=i(()=>o.value,"color"),s=i(()=>o.value,"fontWeight"),n=i(()=>o.value,"lineHeight"),u=i(()=>o.value,"textAlign");return(r,e)=>(c(),x("div",{class:V(r.$style.box)},[f(S,{modelValue:h(a),"onUpdate:modelValue":e[0]||(e[0]=d=>A(a)?a.value=d:null),title:"字号",style:{"grid-area":"font-size"}},{default:$(()=>[Do]),_:1},8,["modelValue"]),f(Y,{modelValue:h(l),"onUpdate:modelValue":e[1]||(e[1]=d=>A(l)?l.value=d:null)},null,8,["modelValue"]),f(Fo,{modelValue:h(s),"onUpdate:modelValue":e[2]||(e[2]=d=>A(s)?s.value=d:null)},null,8,["modelValue"]),f(S,{modelValue:h(n),"onUpdate:modelValue":e[3]||(e[3]=d=>A(n)?n.value=d:null),title:"行高",style:{"grid-area":"line-height"}},{default:$(()=>[f(I,{icon:"t-icon-style-line-height"})]),_:1},8,["modelValue"]),f(X,{modelValue:h(u),"onUpdate:modelValue":e[4]||(e[4]=d=>A(u)?u.value=d:null),options:h(ue),style:{"grid-area":"text-align"}},null,8,["modelValue","options"])],2))}}),To="_box_3fq1j_1",Ro={box:To},jo={$style:Ro},Wo=C(Io,[["__cssModules",jo]]),No=k({__name:"AppVisualStyles",setup(v){const i=[{id:"text",title:"文字",component:Wo},{id:"layout",title:"布局",component:Uo},{id:"fill",title:"填充",component:uo},{id:"height-level",title:"高级"}];return(o,a)=>(c(),U(re,{tabs:i}))}}),Oo={key:0},qo=k({__name:"AppStyles",setup(v){const{currentNode:i}=O();return(o,a)=>h(i)?(c(),x("div",Oo,[f(No)])):(c(),U(ie,{key:1,text:"请先选择对应组件"}))}});export{qo as default};
