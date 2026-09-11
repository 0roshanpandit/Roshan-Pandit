const dot=document.querySelector(".cursor-dot");
const ring=document.querySelector(".cursor-ring");
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
window.addEventListener("pointermove",e=>{
  mx=e.clientX; my=e.clientY;
  if(dot){dot.style.left=mx+"px";dot.style.top=my+"px"}
});
function cursorLoop(){
  rx+=(mx-rx)*.16; ry+=(my-ry)*.16;
  if(ring){ring.style.left=rx+"px";ring.style.top=ry+"px"}
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll("a,.magnetic,.work-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>ring?.classList.add("active"));
  el.addEventListener("mouseleave",()=>ring?.classList.remove("active"));
});

const cosmos=document.querySelector(".cosmos");
const person=document.querySelector(".hero-person");
const core=document.querySelector(".golden-core");
const cards=[...document.querySelectorAll(".info-card")];

window.addEventListener("pointermove",e=>{
  if(innerWidth<900)return;
  const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
  if(person) person.style.transform=`translate(${x*10}px,${y*7}px) translateZ(30px)`;
  if(core) core.style.transform=`translate(${x*-18}px,${y*-12}px)`;
  cards.forEach((c,i)=>c.style.transform=`translate(${x*(i+1)*3}px,${y*(i+1)*2}px)`);
  cosmos?.style.setProperty("--px",x);
});

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.08;
    const y=(e.clientY-r.top-r.height/2)*.08;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

// Generate extra drifting stars so the galaxy feels alive across the whole page.
const starLayer=document.querySelector(".site-stars");
const frag=document.createDocumentFragment();
for(let i=0;i<90;i++){
  const s=document.createElement("i");
  s.style.position="absolute";
  s.style.left=Math.random()*100+"%";
  s.style.top=Math.random()*100+"%";
  const size=(Math.random()*2+.5)+"px";
  s.style.width=size;s.style.height=size;s.style.borderRadius="50%";
  s.style.background=Math.random()>.83?"#ffb21c":"#ffffff";
  s.style.opacity=(Math.random()*.65+.15).toFixed(2);
  s.style.boxShadow=`0 0 ${Math.random()*7+2}px currentColor`;
  s.style.animation=`driftStar ${18+Math.random()*35}s linear ${-Math.random()*30}s infinite`;
  frag.appendChild(s);
}
starLayer.appendChild(frag);
const st=document.createElement("style");
st.textContent=`@keyframes driftStar{0%{transform:translate3d(0,0,0) rotate(0deg)}50%{transform:translate3d(${Math.random()>0.5?35:-35}px,${Math.random()>0.5?55:-55}px,0)}100%{transform:translate3d(0,0,0) rotate(360deg)}}`;
document.head.appendChild(st);
