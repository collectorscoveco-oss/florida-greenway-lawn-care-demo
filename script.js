const header=document.querySelector('[data-header]');
const nav=document.querySelector('[data-nav]');
const menu=document.querySelector('[data-menu-toggle]');
const glow=document.querySelector('.cursor-glow');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>18));
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
if(glow){window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});}
const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const form=document.querySelector('[data-estimator]');
const estimate=document.querySelector('[data-estimate]');
function money(n){return '$'+Math.round(n);} 
function updateEstimate(){if(!form||!estimate)return;const size=Number(form['yard-size'].value);const freq=Number(form.frequency.value);const cond=Number(form.condition.value);const base=(size*freq)+cond;estimate.textContent=`${money(base)}–${money(base+18)}`;}
form?.addEventListener('input',updateEstimate);updateEstimate();
form?.addEventListener('submit',e=>{e.preventDefault();const btn=form.querySelector('button');const old=btn.textContent;btn.textContent='Quote request demo saved';btn.disabled=true;setTimeout(()=>{btn.textContent=old;btn.disabled=false;},1800);});
