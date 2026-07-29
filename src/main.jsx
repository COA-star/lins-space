import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './unified.css';
import './visual-refinement.css';
import './archive-gallery.css';
import './motion-fallback.css';
import './cursor.css';
import './tilted-card.css';
import './gallery-refine.css';
import './final-refine.css';
import './gallery-cleanup.css';
import './page-markers.css';
import './masonry-refine.css';
import './postcard-layout.css';
import './global-glow.css';
import './archive-controls.css';
import './dark-frames.css';
import './scramble.css';
import snowStreetImage from '../个人照片展示/灵感收藏 + 风格分析素材库/下载.jpg';
import snowParkImage from '../个人照片展示/灵感收藏 + 风格分析素材库/_•.jpg';
import fragmentsImage from '../个人照片展示/灵感收藏 + 风格分析素材库/Interactive Fragments Page I Web Design.jpg';
import schemeImage from '../个人照片展示/灵感收藏 + 风格分析素材库/Scheme of historical development __ Схема исторического развития.jpg';
import projectOneImage from '../个人照片展示/灵感收藏 + 风格分析素材库/7763247653328db64390d153b72ecc91.png';
import projectTwoImage from '../个人照片展示/灵感收藏 + 风格分析素材库/6b6221af12d65dbd6d2bc9559becea08.png';
import projectThreeImage from '../个人照片展示/灵感收藏 + 风格分析素材库/6253d5409e8ae9eff0a81505f17e0f5c.png';

const images = {
  snowStreet: snowStreetImage,
  snowPark: snowParkImage,
  fragments: fragmentsImage,
  scheme: schemeImage,
  one: projectOneImage,
  two: projectTwoImage,
  three: projectThreeImage,
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [typedCount, setTypedCount] = useState(0);
  const space = useRef(null);
  useEffect(() => {
    const move = (e) => setPointer({ x: (e.clientX / innerWidth) * 100, y: (e.clientY / innerHeight) * 100 });
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  useEffect(() => {
    const heading=document.querySelector('.space-content h2'); if(!heading||heading.dataset.scrambled)return;
    heading.dataset.scrambled='true'; const text=heading.textContent; heading.innerHTML=[...text].map(char=>char===' ' ? '<span class="scramble-char space"> </span>' : `<span class="scramble-char">${char}</span>`).join('');
    const chars=[...heading.querySelectorAll('.scramble-char')], glyphs='.:/\\*+';
    const move=event=>chars.forEach(char=>{const rect=char.getBoundingClientRect(),dist=Math.hypot(event.clientX-(rect.left+rect.width/2),event.clientY-(rect.top+rect.height/2));if(dist<90&&!char.dataset.busy){char.dataset.busy='1';const original=char.textContent;let n=0;const timer=setInterval(()=>{char.textContent=glyphs[Math.floor(Math.random()*glyphs.length)];if(++n>4){clearInterval(timer);char.textContent=original;delete char.dataset.busy}},35)}});
    heading.addEventListener('pointermove',move);return()=>heading.removeEventListener('pointermove',move);
  }, []);
  useEffect(() => {
    const timer=window.setTimeout(()=>{const stack=document.querySelector('.stacked-photos');if(!stack||stack.querySelector('.archive-controls'))return;const controls=document.createElement('div');controls.className='archive-controls';controls.innerHTML='<label>ADD PHOTO<input type="file" accept="image/*"></label><button type="button">ROTATE</button>';stack.appendChild(controls);controls.querySelector('input').onchange=e=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{const image=stack.querySelector('.stack img');if(image)image.src=reader.result};reader.readAsDataURL(file)};controls.querySelector('button').onclick=()=>{const cards=[...stack.querySelectorAll('.stack')];cards.forEach((card,index)=>card.style.zIndex=(index+2)%cards.length)}},150);return()=>clearTimeout(timer)},[]);
  useEffect(() => {
    const glow = document.createElement('div'); glow.className = 'cursor-glow'; document.body.appendChild(glow);
    const move = (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; };
    window.addEventListener('pointermove', move);
    return () => { glow.remove(); window.removeEventListener('pointermove', move); };
  }, []);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const card = document.querySelector('.postcard');
      if (!card) return;
      const move = (event) => { const rect = card.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = (event.clientY - rect.top) / rect.height - .5; card.style.setProperty('--tilt-x', `${-y * 9}deg`); card.style.setProperty('--tilt-y', `${x * 11}deg`); };
      const reset = () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); };
      card.addEventListener('pointermove', move); card.addEventListener('pointerleave', reset);
      card._tiltCleanup = () => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', reset); };
    }, 100);
    return () => { window.clearTimeout(timer); document.querySelector('.postcard')?._tiltCleanup?.(); };
  }, []);
  useEffect(() => {
    const dot=document.createElement('div'), ring=document.createElement('div');
    dot.className='soft-cursor'; ring.className='soft-cursor-ring'; document.body.append(dot,ring);
    const move=e=>{dot.style.left=ring.style.left=`${e.clientX}px`;dot.style.top=ring.style.top=`${e.clientY}px`};
    const enter=()=>document.body.classList.add('cursor-active'), leave=()=>document.body.classList.remove('cursor-active');
    const down=()=>document.body.classList.add('cursor-down'), up=()=>document.body.classList.remove('cursor-down');
    window.addEventListener('pointermove',move);window.addEventListener('pointerdown',down);window.addEventListener('pointerup',up);
    document.querySelectorAll('a,button,textarea').forEach(el=>{el.addEventListener('pointerenter',enter);el.addEventListener('pointerleave',leave)});
    return()=>{dot.remove();ring.remove();window.removeEventListener('pointermove',move);window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up)};
  }, []);
  useEffect(() => {
    const phraseLength = 'Making dreams tangible.'.length;
    if (typedCount >= phraseLength) return;
    const timer = window.setTimeout(() => setTypedCount((count) => count + 1), typedCount < 13 ? 70 : 48);
    return () => window.clearTimeout(timer);
  }, [typedCount]);
  useEffect(() => {
    const title = document.querySelector('.about h2');
    if (!title || title.dataset.blurReady) return;
    title.dataset.blurReady = 'true';
    title.innerHTML = [...title.textContent.replace(/\s+/g, '')].map((letter, index) => `<span class="blur-letter" style="animation-delay:${index * 50}ms">${letter}</span>`).join('');
  }, []);
  useEffect(() => {
    const list = document.querySelector('.work-list');
    if (!list || list.dataset.archiveReady) return;
    list.dataset.archiveReady = 'true';
    list.style.display = 'none';
    const mount = document.createElement('div');
    mount.className = 'archive-mount';
    list.parentElement.appendChild(mount);
    createRoot(mount).render(<LandscapeArchive />);
  }, []);
  const jump = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  return <main style={{ '--mx': `${pointer.x}%`, '--my': `${pointer.y}%` }}>
    <section className="hero" id="top">
      <div className="hero-photo" /><div className="hero-veil" /><div className="snow" />
      <header className="nav-wrap">
        <a className="brand" href="#top" onClick={() => jump('top')}>Lin's <i>space</i></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">{menuOpen ? '×' : 'MENU'}</button>
        <nav className={menuOpen ? 'open' : ''}>{[['about','角色介绍'],['work','作品案例'],['space','互动体验'],['contact','联系方式']].map(([id,label], i) => <button key={id} onClick={() => jump(id)}><small>0{i + 1}</small>{label}</button>)}</nav>
      </header>
      <div className="hero-meta"><span>AI DESIGNER / SHANGHAI</span><span>31° 13′ N · 121° 28′ E</span></div>
      <div className="hero-copy"><p className="kicker">PERSONAL VISUAL ARCHIVE — 2026</p><h1 className="type-title" aria-label="Making dreams tangible."><span>{'Making dreams tangible.'.slice(0, Math.min(typedCount, 13))}</span><br /><span>{typedCount > 13 ? 'Making dreams tangible.'.slice(13, typedCount) : ''}</span><i aria-hidden="true" /></h1><p className="intro">以想象为原料，将感知、叙事与技术编织成可被触摸的视觉瞬间。</p><button className="round-link" onClick={() => jump('work')}><span>SCROLL<br />TO EXPLORE</span><b>↓</b></button></div>
      <p className="hero-index">01 <span>/</span> 05</p>
    </section>

    <section className="about wrap" id="about"><div className="number">02 — ABOUT LIN</div><div className="about-grid"><h2>我把模糊的<br /><em>感受，变成可见。</em></h2><div className="about-body"><p>你好，我是 Lin，一名专注于 AI 视觉、动态影像与交互叙事的设计师。我喜欢介于真实的空间：有温度的光、克制的留白，以及一点尚未被命名的未来感。</p><div className="coords"><span>SELECTED MEDIUMS</span><b>AI VISUAL · MOTION · INTERACTION</b></div></div></div><div className="about-strip"><span>IMAGINATION IS A MATERIAL</span><span>◌</span><span>IMAGINATION IS A MATERIAL</span><span>◌</span></div></section>

    <section className="work wrap" id="work"><div className="section-head"><div className="number">03 — SELECTED WORKS</div><p>ARCHIVE / 03 PROJECTS</p></div><div className="work-list">
      <Project no="001" title="Aurora Archive" type="AI IMAGE · 2026" image={images.fragments} className="project-wide" />
      <Project no="002" title="Soft Signal" type="DIGITAL OBJECT · 2026" image={images.one} className="project-tall" />
      <Project no="003" title="Fragments of Memory" type="WEB EXPERIENCE · 2025" image={images.scheme} className="project-wide reverse" />
    </div></section>

    <section className="experience" id="space" ref={space}><div className="space-image" /><div className="orb orb-a" /><div className="orb orb-b" /><div className="space-content"><p className="kicker">04 — INTERACTIVE EXPERIENCE</p><h2>Touch the<br /><em>soft unknown.</em></h2><p>一处会随着你的靠近而缓慢呼吸的数字空间。<br />让光、雾与时间短暂地失去边界。</p><button className="enter" onClick={() => space.current?.classList.toggle('active')}>ENTER SPACE <span>↗</span></button></div><div className="space-note">MOVE / HOLD / FEEL<br />REALTIME ATMOSPHERE</div></section>

    <footer id="contact"><div className="footer-top"><div><p className="kicker">05 — LET'S CONNECT</p><h2>让我们一起制造<br /><em>一点新世界。</em></h2></div><a className="mail" href="mailto:coayot@163.com">coayot@163.com <span>↗</span></a></div><div className="footer-bottom"><p>LIN'S SPACE © 2026</p><p>+86 000 0000 0000</p><a href="#top" onClick={() => jump('top')}>BACK TO TOP ↑</a></div></footer>
  </main>;
}
function Project({ no, title, type, image, className }) { return <article className={`project ${className}`}><div className="project-img"><img src={image} alt={title} /><div className="project-fog" /></div><div className="project-info"><span>{no}</span><div><h3>{title}</h3><p>{type}</p></div><button aria-label={`查看 ${title}`}>VIEW <b>↗</b></button></div></article> }
const scenic = [['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85','Snow mountains'],['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85','Forest'],['https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85','Valley'],['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85','Coast']];
function LandscapeArchive(){const [open,setOpen]=useState(null);const [note,setNote]=useState(()=>localStorage.getItem('lin-landscape-note')||'把这一组照片当作天气留下的纸条。');return <div className="landscape-archive"><div className="archive-title">001 / COLLECTED LANDSCAPES</div><div className="stacked-photos">{scenic.slice(0,3).map(([src,alt],i)=><button key={src} className={`stack stack-${i}`} onClick={()=>setOpen([src,alt])}><img src={src} alt={alt}/></button>)}</div><div className="archive-note"><h3>Collected Weather</h3><p>点击照片单独观看。文字可以随时改写，并保存到此浏览器。</p><textarea value={note} onChange={e=>setNote(e.target.value)}/><button onClick={()=>localStorage.setItem('lin-landscape-note',note)}>SAVE NOTE</button></div><div className="postcard"><button onClick={()=>setOpen(scenic[3])}><img src={scenic[3][0]} alt="Coast"/></button><small>POSTCARD / FIELD NOTE</small></div><div className="horizon"><h3>Moving Horizons</h3><div>{scenic.map(([src,alt])=><button key={src} onClick={()=>setOpen([src,alt])}><img src={src} alt={alt}/></button>)}</div><p>← 左右滑动查看全部风景 →</p></div>{open&&<div className="lightbox" onClick={()=>setOpen(null)}><button>×</button><img src={open[0]} alt={open[1]}/></div>}</div>}
createRoot(document.getElementById('root')).render(<App />);
