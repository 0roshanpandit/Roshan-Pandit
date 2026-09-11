const cursor=document.querySelector('.cursor'),hero=document.querySelector('.hero'),stage=document.querySelector('.stage');
let x=0,y=0;
addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';const r=hero.getBoundingClientRect();x=(e.clientX-r.left-r.width/2)/r.width;y=(e.clientY-r.top-r.height/2)/r.height});
function animate(){stage.style.translate=`${x*12}px ${y*8}px`;document.querySelectorAll('.planet').forEach((p,i)=>p.style.margin=`${y*(i+1)*5}px 0 0 ${x*(i+1)*5}px`);requestAnimationFrame(animate)}animate();
document.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}});
