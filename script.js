const starField=document.querySelector(".star-field");
const STAR_COUNT=190;

for(let i=0;i<STAR_COUNT;i++){
  const star=document.createElement("span");
  star.classList.add("star");
  star.style.left=Math.random()*100+"%";
  star.style.top=Math.random()*100+"%";
  const size=Math.random()*2+1;
  star.style.width=size+"px";
  star.style.height=size+"px";
  star.style.animationDuration=(5+Math.random()*12)+"s";
  star.style.animationDelay=(-Math.random()*15)+"s";
  if(Math.random()>.82) star.classList.add("gold");
  starField.appendChild(star);
}

const cursorDot=document.querySelector(".cursor-dot");
const cursorCircle=document.querySelector(".cursor-circle");
let mouseX=0,mouseY=0,circleX=0,circleY=0;

document.addEventListener("mousemove",e=>{
  mouseX=e.clientX; mouseY=e.clientY;
  cursorDot.style.left=mouseX+"px";
  cursorDot.style.top=mouseY+"px";
});

function animateCursor(){
  circleX+=(mouseX-circleX)*.13;
  circleY+=(mouseY-circleY)*.13;
  cursorCircle.style.left=circleX+"px";
  cursorCircle.style.top=circleY+"px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll("a,.work-card,.floating-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"));
});

const cosmicScene=document.querySelector(".cosmic-scene");
const heroPerson=document.querySelector(".hero-person");
let parallaxX=0,parallaxY=0;

document.addEventListener("mousemove",e=>{
  if(window.innerWidth<=1000)return;
  parallaxX=e.clientX/window.innerWidth-.5;
  parallaxY=e.clientY/window.innerHeight-.5;
});

function animateParallax(){
  if(window.innerWidth>1000){
    cosmicScene.style.transform=`translateY(-48%) translate3d(${parallaxX*18}px,${parallaxY*12}px,0)`;
    heroPerson.style.transform=`translateX(-50%) translate3d(${parallaxX*7}px,${parallaxY*4}px,0)`;
  }
  requestAnimationFrame(animateParallax);
}
animateParallax();

const navbar=document.querySelector(".navbar");
window.addEventListener("scroll",()=>{
  navbar.style.background=window.scrollY>40?"rgba(2,5,10,.94)":"rgba(2,5,10,.72)";
});

document.querySelector(".hero-person img").addEventListener("error",()=>{
  console.error("Hero image missing. Expected: assets/images/hero.png");
});

if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  document.querySelectorAll("*").forEach(el=>el.style.animationDuration=".01ms");
}
