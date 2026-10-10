const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#lnav').innerHTML=$('#nav').innerHTML;
function go(p){$$('.page').forEach(x=>x.classList.toggle('on',x.id===p));$$('.nav a').forEach(a=>a.classList.toggle('act',a.dataset.p===p));$('#url').textContent='priscillajefryhakim.com/'+p;scrollTo(0,0)}
function kind(k){$$('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));$$('.k').forEach(x=>x.hidden=x.id!=='k-'+k)}
function nav(p,k){closeD();if(p==='home'){$('#landing').classList.remove('gone');$$('#lnav a').forEach(a=>a.classList.toggle('act',a.dataset.p==='home'));return}$('#landing').classList.add('gone');go(p);if(k)kind(k)}
$$('.nav a').forEach(a=>a.onclick=()=>nav(a.dataset.p));
$('#cover').onclick=()=>$('#landing').classList.remove('gone');
$$('.seg button').forEach(b=>b.onclick=()=>kind(b.dataset.k));
const mk=(e,t,s,k)=>`<div class="card"><button class="x" title="Remove">✕</button><div class="slot"><span>${e}<small>click to see details</small></span></div><b>${t}</b><p>${s}</p><i class="more">view details →</i><div class="dt ${k==='admin'?'k-admin':''}" hidden><div class="slot bs"><span>${e}<small>click to add cover image</small></span></div><h3 contenteditable>${t}</h3><p class="sub" contenteditable>${s}</p><div class="chips"><span contenteditable>role: your role</span><span contenteditable>tools: Figma</span><span contenteditable>year: 2026</span></div><h4>the story</h4><p class="long" contenteditable>Tell the full story here: the goal, your process, and the result. Click to edit this text!</p><h4>gallery</h4><div class="gal"></div><button class="add2">+ add images</button><h4>link</h4><p contenteditable style="margin:0">🔗 paste your project link here</p></div></div>`;
const data={design:[['🌸','bloom café branding','logo, menu & packaging'],['📱','pocket planner app','ui/ux case study'],['🎪','festival poster set','print & social graphics']],
admin:[['📋','calendar & inbox system','scheduling templates'],['📊','spreadsheet tracker','reports & data'],['💌','client support flow','email templates']]};
for(const k in data)seed($('#k-'+k+' .grid'),g=>g.innerHTML=data[k].map(d=>mk(...d,k)).join(''));
let cur;
function openD(c){cur=c;const d=c.querySelector('.dt');d.hidden=false;$('#ovb').appendChild(d);$('#ov').classList.add('on');$('#ov').scrollTop=0}
function closeD(){const d=$('#ovb .dt');if(d&&cur){cur.appendChild(d);d.hidden=true;
  cur.querySelector('b').textContent=d.querySelector('h3').textContent;cur.querySelector('p').textContent=d.querySelector('.sub').textContent;
  const bs=d.querySelector('.bs'),cs=cur.querySelector('.slot');cs.style.backgroundImage=bs.style.backgroundImage;cs.classList.toggle('has',bs.classList.contains('has'))}
  $('#ov').classList.remove('on')}
$('#ovback').onclick=closeD;
addEventListener('keydown',e=>{if(e.key==='Escape')closeD()});
$$('.add').forEach(b=>b.onclick=()=>{const g=b.previousElementSibling;g.insertAdjacentHTML('beforeend',mk('➕','new project','short description',b.parentElement.id==='k-admin'?'admin':'design'));openD(g.lastElementChild)});
function readImg(f,cb){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,1200/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
  const x=c.getContext('2d'),png=/png|gif|webp|svg/.test(f.type)&&f.size<1.2e6;if(!png){x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height)}
  x.drawImage(im,0,0,c.width,c.height);cb(c.toDataURL(png?'image/png':'image/jpeg',.88))};im.onerror=()=>cb(r.result);im.src=r.result};r.readAsDataURL(f)}
function seed(el,fn){if(el.dataset.s)return;el.dataset.s=1;fn(el)}
function pick(multi,fn){const i=document.createElement('input');i.type='file';i.accept='image/*';i.multiple=multi;i.onchange=()=>[...i.files].forEach(f=>readImg(f,fn));i.click()}
document.addEventListener('click',e=>{const t=e.target;
  const x=t.closest('.x');if(x){x.closest('.gi,.card').remove();return}
  const a=t.closest('.add2');if(a){pick(true,u=>a.previousElementSibling.insertAdjacentHTML('beforeend',`<div class="gi"><button class="x">✕</button><img src="${u}" alt=""></div>`));return}
  const s=t.closest('.slot,.ring');
  if(s&&!s.closest('.card')){pick(false,u=>{s.style.backgroundImage=`url(${u})`;s.classList.add('has');if(s.classList.contains('ring'))s.textContent=''});return}
  const c=t.closest('.card');if(c)openD(c)});
$$('.tg').forEach(b=>b.onclick=()=>{const r=document.documentElement,d=matchMedia('(prefers-color-scheme:dark)').matches;
  const c=r.dataset.theme||(d?'dark':'light');r.dataset.theme=c==='dark'?'light':'dark'});

/* about page: tools physics, flip cards, folder, record */
const arena=$('#arena'),B=[];
function ball(l,bg,src){const el=document.createElement('div');el.className='ball';
  el.dataset.l=l||'';el.dataset.bg=bg||'';if(src){el.dataset.img=src;el.style.backgroundImage=`url(${src})`}else{el.textContent=l;el.style.background=bg}
  arena.appendChild(el);const w=arena.clientWidth||300;
  const b={el,x:10+Math.random()*Math.max(10,w-84),y:Math.random()*60,vx:(Math.random()-.5)*6,vy:0,r:32,d:0};B.push(b);
  const pt=e=>{const r=arena.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
  el.onpointerdown=e=>{e.preventDefault();el.setPointerCapture(e.pointerId);const[px,py]=pt(e);b.d=1;b.mv=0;b.vx=b.vy=0;b.ox=px-b.x;b.oy=py-b.y;b.lx=px;b.ly=py};
  el.onpointermove=e=>{if(!b.d)return;const[px,py]=pt(e);b.mv+=Math.abs(px-b.lx)+Math.abs(py-b.ly);b.x=px-b.ox;b.y=py-b.oy;b.vx=(px-b.lx)*.6+b.vx*.4;b.vy=(py-b.ly)*.6+b.vy*.4;b.lx=px;b.ly=py};
  el.onpointerup=el.onpointercancel=()=>{b.d=0};
  el.onclick=()=>{if(b.mv<5)pick(false,u=>{el.textContent='';el.dataset.l='';el.dataset.img=u;el.style.background='#fff center/cover';el.style.backgroundImage=`url(${u})`})}}
(JSON.parse(arena.dataset.balls||'null')||[['Figma','#ffd1dc'],['Google','#d8ecd0'],['Notion','#fff'],['Canva','#cfe8ff'],['Ps','#d6d1ff'],['Ai','#ffe3b8'],['Excel','#c9f0d3']]).forEach(b=>Array.isArray(b)?ball(...b):ball(b.l,b.bg,b.img));
$('#addb').onclick=()=>pick(true,u=>ball('','',u));
$('#rmb').onclick=()=>{const b=B.pop();if(b)b.el.remove()};
arena.ondragover=e=>e.preventDefault();
arena.ondrop=e=>{e.preventDefault();if(!document.body.classList.contains('edit'))return;[...e.dataTransfer.files].filter(f=>f.type.startsWith('image/')).forEach(f=>readImg(f,u=>ball('','',u)))};
let au=null,audioFile=null;
function bindAudio(src,play){if(au)au.pause();au=new Audio(src);const v=$('.vin'),pb=$('.pb');
  au.onplay=()=>{v.classList.add('spin');pb.textContent='⏸ pause'};
  au.onpause=au.onended=()=>{v.classList.remove('spin');pb.textContent='▶ play'};if(play)au.play()}
function setAudio(f){audioFile=f;bindAudio(URL.createObjectURL(f),true);$('.rec h3').textContent=f.name.replace(/\.[^.]+$/,'')}
if($('.rec').dataset.audio)bindAudio($('.rec').dataset.audio,false);
function pickAudio(){const i=document.createElement('input');i.type='file';i.accept='audio/*';i.onchange=()=>{if(i.files[0])setAudio(i.files[0])};i.click()}
$('#aud').onclick=pickAudio;
(function tick(){const W=arena.clientWidth,H=arena.clientHeight;
  if(W&&H){for(const b of B){const m=b.r*2;
    if(b.d){b.vx*=.8;b.vy*=.8}else{b.vy+=.6;b.x+=b.vx;b.y+=b.vy;b.vx*=.995}
    if(b.x<0){b.x=0;b.vx=Math.abs(b.vx)*.8}if(b.x>W-m){b.x=W-m;b.vx=-Math.abs(b.vx)*.8}
    if(b.y<0){b.y=0;b.vy=Math.abs(b.vy)*.8}
    if(b.y>H-m){b.y=H-m;b.vy=-Math.abs(b.vy)*.7;if(Math.abs(b.vy)<2)b.vy=0;b.vx*=.97}}
    for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const a=B[i],c=B[j],dx=c.x-a.x,dy=c.y-a.y,d=Math.hypot(dx,dy),md=a.r+c.r;
      if(d&&d<md){const nx=dx/d,ny=dy/d,o=(md-d)/2;
        if(!a.d){a.x-=nx*o;a.y-=ny*o}if(!c.d){c.x+=nx*o;c.y+=ny*o}
        const rv=(c.vx-a.vx)*nx+(c.vy-a.vy)*ny;
        if(rv<0){const k=-rv*.9;if(!a.d){a.vx-=k*nx;a.vy-=k*ny}if(!c.d){c.vx+=k*nx;c.vy+=k*ny}}}}
    for(const b of B)b.el.style.transform=`translate(${b.x}px,${b.y}px)`}
  requestAnimationFrame(tick)})();
const fc=(e,t,s)=>`<div class="fl"><div class="fi"><div class="fr2"><div class="fp"><span>${e}</span><button class="up" title="Add image">📷</button></div><b contenteditable>${t}</b></div><div class="bk"><p contenteditable>${s}</p><button class="btn2 go" style="margin:0" onclick="nav('projects')">view projects →</button><small>↻ flip back</small></div></div></div>`;
seed($('#sg'),g=>[['🌸','bloom café','Branding for a cozy café: logo, menu and packaging.'],['📱','pocket planner','A friendlier planner app, from research to UI.'],['🎪','festival posters','Bold print and social graphics.'],['📊','admin systems','Templates that keep inboxes and sheets tidy.']].forEach(d=>g.insertAdjacentHTML('beforeend',fc(...d))));
const sgEl=$('#sg');
function stack(){const c=[...sgEl.children];c.forEach((e,i)=>{const k=Math.min(i,3);e.style.zIndex=50-i;e.style.opacity=i>3?0:1;e.style.pointerEvents=i>3?'none':'auto';
  e.style.transform=`translateY(${k*16}px) scale(${1-k*.05}) rotate(${i?(i%2?2.5:-2.5):0}deg)`;if(i)e.classList.remove('f')});
  $('#scnt').textContent=c[0]?c[0].dataset.n+' / '+c.length:''}
[...sgEl.children].forEach((e,i)=>e.dataset.n=i+1);
$('#addf').onclick=()=>{sgEl.insertAdjacentHTML('afterbegin',fc('➕','new project','Write a short overview here.'));sgEl.firstElementChild.dataset.n=sgEl.children.length;stack()};
$('#snext').onclick=()=>{sgEl.appendChild(sgEl.firstElementChild);stack()};
$('#sprev').onclick=()=>{sgEl.prepend(sgEl.lastElementChild);stack()};
stack();
const hob=(e,l)=>`<div class="ph"><span>${e}</span><em contenteditable>${l}</em><button class="px" title="Remove">✕</button></div>`;
function hl(){const p=[...document.querySelectorAll('#fd .ph')],n=p.length;
  p.forEach((e,i)=>{const m=i-(n-1)/2,st=n>1?Math.min(80,170/(n-1)):0,rt=n>1?Math.min(14,40/(n-1)):0;
    e.style.setProperty('--x',m*st+'px');e.style.setProperty('--r',m*rt+'deg');e.style.setProperty('--y',(-150+Math.abs(m)*10)+'px')})}
seed($('#fd'),()=>[['🎨','drawing'],['📓','journaling'],['🎮','cozy games']].forEach(h=>$('#fd .front').insertAdjacentHTML('beforebegin',hob(...h))));hl();
$('#addh').onclick=()=>{$('#fd .front').insertAdjacentHTML('beforebegin',hob('➕','new hobby'));hl();$('#fd').classList.add('open')};
const cp=(e,t,s)=>mk(e,t,s,'code').replace('role: your role','stack: Python').replace('tools: Figma','tools: VS Code, GitHub');
seed($('#car'),g=>[['🐍','habit tracker','A tiny Python app that tracks daily habits.'],['🌐','weather dashboard','A JavaScript page that shows live weather.'],['🤖','chatbot experiment','A small chatbot built with Python.'],['📈','data viz project','Charts built from a real dataset.']].forEach(d=>g.insertAdjacentHTML('beforeend',cp(...d))));
$('#addfun').onclick=()=>{$('#car').insertAdjacentHTML('beforeend',cp('➕','new coding project','What does it do?'));openD($('#car').lastElementChild)};
$('#cprev').onclick=()=>$('#car').scrollBy({left:-270,behavior:'smooth'});
$('#cnext').onclick=()=>$('#car').scrollBy({left:270,behavior:'smooth'});
document.addEventListener('click',e=>{const t=e.target,fd=t.closest('.fd');
  if(fd){if(t.closest('.px')){t.closest('.ph').remove();hl();return}if(t.closest('[contenteditable]'))return;const ph=t.closest('.ph');if(ph&&fd.classList.contains('open'))pick(false,u=>{ph.style.backgroundImage=`url(${u})`;ph.classList.add('has')});else fd.classList.toggle('open');return}
  const up=t.closest('.up');if(up){const p=up.parentElement;pick(false,u=>{p.style.backgroundImage=`url(${u})`;p.classList.add('has')});return}
  const f=t.closest('.fl');if(f&&!t.closest('[contenteditable],.go')){const g=f.parentElement;if(f!==g.firstElementChild){while(g.firstElementChild!==f)g.appendChild(g.firstElementChild);stack()}else f.classList.toggle('f')}
  const pb=t.closest('.pb');if(pb){au?(au.paused?au.play():au.pause()):pickAudio()}});

/* contact */
const MAIL='you@example.com'; // <- put your real email here
const ENDPOINT=MAIL!=='you@example.com'?'https://formsubmit.co/ajax/'+MAIL:'';
$('#cf1').onclick=()=>$('#cc').classList.add('f');
$('#cback').onclick=()=>$('#cc').classList.remove('f');
$('#cf').onsubmit=async e=>{e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),st=$('#cst');st.textContent='sending…';
  if(ENDPOINT){try{const r=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name:d.name,email:d.email,_subject:d.subject,message:d.message,_honey:d._honey||''})});
    if(r.ok){st.textContent='sent! thank you 💌';f.reset();return}}catch(_){}}
  const a=document.createElement('a');a.href=`mailto:${MAIL}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(d.message+'\n\n- '+d.name+' ('+d.email+')')}`;a.click();
  st.textContent='opening your email app… if nothing opens, email '+MAIL}

/* owner-only editing */
const HASH='a8e7c29d33a8fd0c23932ab7811c11b8e7285e98221449e2c8379500c27be3fa';
document.addEventListener('click',e=>{if(document.body.classList.contains('edit'))return;const t=e.target;
  if(t.closest('.up,.add2,.x,.px,#aud,.ball')||(t.closest('.slot,.ring')&&!t.closest('.card'))||(t.closest('.ph')&&t.closest('.fd.open'))||(t.closest('.pb')&&!au)){e.stopPropagation();e.preventDefault()}},true);
function setEdit(on){document.body.classList.toggle('edit',on);
  document.querySelectorAll('[contenteditable],[data-ce]').forEach(e=>{e.dataset.ce=1;e.setAttribute('contenteditable',on?'true':'false')});
  $('#lock').textContent=on?'✏️ editing · tap to lock':'🔒';$('#pw').hidden=true}
async function sha(t){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
$('#lock').onclick=()=>{if(document.body.classList.contains('edit'))setEdit(false);else{const i=$('#pw');i.hidden=!i.hidden;if(!i.hidden)i.focus()}};
$('#pw').onkeydown=async e=>{if(e.key!=='Enter')return;const i=e.target;
  try{if(await sha(i.value)===HASH){i.value='';setEdit(true)}else{i.value='';i.placeholder='try again'}}catch(_){i.placeholder='needs https'}};
setEdit(false);
const LY='.nm,.show h3.t,.fun h3.t,#projects h2.h,.k .card>b';
function lay(){document.querySelectorAll(LY).forEach(e=>{if(e.dataset.t!==e.textContent)e.dataset.t=e.textContent})}
new MutationObserver(lay).observe(document.body,{childList:true,characterData:true,subtree:true});lay();
/* save: download the whole site with all edits built in */
const dl=(blob,name)=>{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000)};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),8000)}
function saveSite(){closeD();
  const c=document.documentElement.cloneNode(true),q=x=>c.querySelector(x),qa=x=>c.querySelectorAll(x);
  c.removeAttribute('data-theme');[...c.attributes].forEach(a=>{if(a.name!=='lang')c.removeAttribute(a.name)});
  [...c.children].forEach(e=>{if(!/^(HEAD|BODY)$/.test(e.tagName))e.remove()});
  const bd=q('body');[...bd.attributes].forEach(a=>bd.removeAttribute(a.name));
  [...bd.children].forEach(e=>{if(!e.matches('#landing,header.bar,main.wrap,#ov,#own,#toast,script'))e.remove()});
  qa('script[src^="chrome-extension"]').forEach(e=>e.remove());
  qa('head > *').forEach(e=>{if(!e.matches('meta[charset],meta[name=viewport],title,link[rel=stylesheet],style:first-of-type'))e.remove()});
  qa('[data-ce]').forEach(e=>e.removeAttribute('data-ce'));
  qa('[contenteditable]').forEach(e=>e.setAttribute('contenteditable',''));
  qa('[data-t]').forEach(e=>e.removeAttribute('data-t'));
  q('#landing').classList.remove('gone');q('#ov').classList.remove('on');
  qa('.page').forEach(p=>p.classList.toggle('on',p.id==='projects'));
  qa('.open,.f,.spin').forEach(e=>e.classList.remove('open','f','spin'));
  const ar=q('#arena');ar.setAttribute('data-balls',JSON.stringify(B.map(b=>({l:b.el.dataset.l||'',bg:b.el.dataset.bg||'',img:b.el.dataset.img||''}))));ar.innerHTML='';
  q('#lock').textContent='🔒';q('#pw').hidden=true;q('#cst').textContent='';q('.pb').textContent='▶ play';
  let an='';if(audioFile){an=audioFile.name.replace(/\s+/g,'-');q('.rec').setAttribute('data-audio',an)}
  dl(new Blob(['<!DOCTYPE html>\n'+c.outerHTML],{type:'text/html'}),'index.html');
  if(an)setTimeout(()=>dl(audioFile,an),700);
  toast('saved! upload index.html'+(an?' and '+an:'')+' to GitHub')}
$('#savebtn').onclick=saveSite;
go('projects');$('#lnav [data-p=home]').classList.add('act');
