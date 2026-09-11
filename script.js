const cursor = document.getElementById("cursor");
let mx = innerWidth/2, my = innerHeight/2, cx = mx, cy = my;

addEventListener("pointermove", e => {
  mx=e.clientX; my=e.clientY;
  document.documentElement.style.setProperty("--mx", mx+"px");
  document.documentElement.style.setProperty("--my", my+"px");
});
function cursorLoop(){
  cx += (mx-cx)*.16; cy += (my-cy)*.16;
  cursor.style.left=cx+"px"; cursor.style.top=cy+"px";
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll("a,.work-card,.button").forEach(el=>{
  el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"));
});

const cosmos=document.querySelector(".cosmos");
const subject=document.querySelector(".subject-wrap");
addEventListener("pointermove", e=>{
  if(innerWidth<900) return;
  const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
  subject.style.transform=`translate3d(${x*18}px,${y*10}px,0)`;
  cosmos.style.transform=`translate3d(${x*-7}px,${y*-4}px,0)`;
});

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    const r=el.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.08}px,${y*.08}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

document.querySelectorAll(".work-card").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(800px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-8px)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});
