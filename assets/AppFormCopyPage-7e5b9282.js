import{d as c,r as V,a as g,g as b,b as o,o as x,h as k,e as t,w as a,j as w,F as C,k as B}from"./index-05e2b7d4.js";const F=B("br",null,null,-1),h=c({__name:"AppFormCopyPage",props:{page:{}},setup(d,{expose:p}){const u=d,r=V(null),e=g({title:`${u.page.title}_副本`,id:b()}),i={title:[{required:!0,message:"请填写页面标题"}],id:[{required:!0,message:"请填写页面ID"}]};return p({formRef:r,formdata:e}),(I,l)=>{const _=o("el-alert"),s=o("el-input"),m=o("el-form-item"),f=o("el-form");return x(),k(C,null,[t(_,{closable:!1,"show-icon":!0},{default:a(()=>[w(" 复制当前页面为新的页面，页面内的组件配置会同步被复制 ")]),_:1}),F,t(f,{ref_key:"formRef",ref:r,model:e,rules:i,"label-width":"70px"},{default:a(()=>[t(m,{label:"页面标题",prop:"title"},{default:a(()=>[t(s,{modelValue:e.title,"onUpdate:modelValue":l[0]||(l[0]=n=>e.title=n)},null,8,["modelValue"])]),_:1}),t(m,{label:"页面ID",prop:"id"},{default:a(()=>[t(s,{modelValue:e.id,"onUpdate:modelValue":l[1]||(l[1]=n=>e.id=n)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])],64)}}});export{h as default};
