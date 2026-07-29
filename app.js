const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const cover = $('#cover'), workspace = $('#workspace');
const pageNames = {home:'首页',library:'灵感库',upload:'上传图片',analysis:'风格分析',memory:'个人记忆'};
const openWorkspace = (page='library') => {cover.classList.add('hidden');workspace.classList.remove('hidden');showPage(page)};
const showPage = (page) => {if(page==='home'){cover.classList.remove('hidden');workspace.classList.add('hidden');return}$$('.page').forEach(p=>p.classList.toggle('active',p.dataset.pageContent===page));$$('.nav-stroke').forEach(n=>n.classList.toggle('active',n.dataset.page===page));};
$('#enter').addEventListener('click',()=>openWorkspace());
$('#backToCover').addEventListener('click',()=>showPage('home'));
$$('.nav-stroke').forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page)));
$$('.nav-stroke').forEach(n=>n.title=pageNames[n.dataset.page]);
$$('.filter').forEach(f=>f.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));f.classList.add('active')}));
function analyze(src){const im=new Image();im.onload=()=>{const c=document.createElement('canvas'),x=c.getContext('2d');c.width=c.height=40;x.drawImage(im,0,0,40,40);const d=x.getImageData(0,0,40,40).data;let r=0,g=0,b=0,s=0,l=0;for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];const z=Math.max(d[i],d[i+1],d[i+2]),n=Math.min(d[i],d[i+1],d[i+2]);s+=z-n;l+=z}r=Math.round(r/1600);g=Math.round(g/1600);b=Math.round(b/1600);const muted=s/1600<58,green=g>r&&g>b, warm=r>b+12,dark=l/1600<110;const title=green?(muted?'褪绿的静默主义':'森林印象主义'):warm?(muted?'旧纸叙事主义':'琥珀色彩主义'):dark?'夜色极简主义':'轻雾自然主义';const text=green?'图像偏向自然的深绿与低光层次，边缘的留白让画面拥有安静的呼吸。':warm?'温暖的褪色调与柔和明暗形成一段像旧胶片般的私人叙事。':dark?'低亮度与克制的色彩让主体更集中，形成夜间档案般的神秘感。':'轻盈的明暗和中性颜色让画面保有柔软、开放的观看空间。';const colors=[`rgb(${r},${g},${b})`,`rgb(${Math.min(255,r+40)},${Math.min(255,g+35)},${Math.min(255,b+28)})`,`rgb(${Math.max(0,r-55)},${Math.max(0,g-50)},${Math.max(0,b-42)})`];$$('.swatches i').forEach((q,i)=>q.style.background=colors[i]);$('#styleTitle').textContent=title;$('#styleText').textContent=text;const m=JSON.parse(localStorage.getItem('nocturne-memory')||'[]');[title,muted?'低饱和':'鲜明色彩',green?'自然纹理':warm?'暖色调':'低光感'].forEach(v=>!m.includes(v)&&m.push(v));localStorage.setItem('nocturne-memory',JSON.stringify(m));};im.src=src}
$('#fileInput').addEventListener('change',(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{localStorage.setItem('nocturne-image',r.result);$('#analysisImage img').src=r.result;analyze(r.result);showPage('analysis')};r.readAsDataURL(f)});
$('#saveMemory').addEventListener('click',()=>$('#saveMemory').textContent='已自动记住');
function renderMemory(){const memory=JSON.parse(localStorage.getItem('nocturne-memory')||'[]');$('#preferenceList').innerHTML=memory.length?memory.map(x=>`<span>${x}</span>`).join(''):'还没有留下偏好。'}
$('#clearMemory').addEventListener('click',()=>{localStorage.removeItem('nocturne-memory');renderMemory()});
document.querySelector('[data-page="memory"]').addEventListener('click',renderMemory);
$$('.mirror').forEach(i=>i.addEventListener('click',()=>{const pic=i.querySelector('img');$('#dialogImage').src=pic?pic.src:'';$('#dialogTitle').textContent=i.dataset.title;$('#mirrorDialog').showModal()}));
$('.dialog-close').addEventListener('click',()=>$('#mirrorDialog').close());
