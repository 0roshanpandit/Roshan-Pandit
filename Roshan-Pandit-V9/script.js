const cursor=document.getElementById("cursor");
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY});
function cursorLoop(){cx+=(mx-cx)*.16;cy+=(my-cy)*.16;cursor.style.left=cx+"px";cursor.style.top=cy+"px";requestAnimationFrame(cursorLoop)}cursorLoop();
document.querySelectorAll("a,.cards article,.skill-list>div").forEach(el=>{el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover"));el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"))});

const cosmos=document.getElementById("cosmos");
const layers=[...document.querySelectorAll("[data-depth]")];
let px=0,py=0;
addEventListener("pointermove",e=>{
  const r=cosmos.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  px=x;py=y;
});
function parallax(){
  layers.forEach(el=>{
    const d=Number(el.dataset.depth)||0;
    const x=px*d*55,y=py*d*38;
    el.style.translate=`${x}px ${y}px`;
  });
  requestAnimationFrame(parallax);
}
parallax();

const stars=document.querySelector(".starfield");
addEventListener("scroll",()=>{stars.style.transform=`translateY(${scrollY*.018}px)`});
