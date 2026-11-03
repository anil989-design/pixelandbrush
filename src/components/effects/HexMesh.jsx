import { useEffect, useRef } from "react";

const HexMesh = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const HEX = 38;
    const cols = Math.ceil(W/(HEX*1.75))+2;
    const rows = Math.ceil(H/(HEX*1.55))+2;
    const hexes = [];
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) {
      hexes.push({
        x: c*HEX*1.75-HEX, y: r*HEX*1.55+(c%2===0?0:HEX*.78)-HEX,
        phase: Math.random()*Math.PI*2, speed: .0003+Math.random()*.0005,
        bright: Math.random()<.05, color: Math.random()<.15?"34,211,238":"40,90,200",
      });
    }
    const small = W < 768; // skip the matrix-rain layer on phones
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLS = small ? 0 : Math.floor(W/20);
    const drops = Array.from({length:COLS},()=>({
      y: Math.random()*-H, speed: 1.5+Math.random()*3,
      opacity: .03+Math.random()*.05, char: ()=>String.fromCharCode(0x30A0+Math.random()*96),
    }));
    const rings = Array.from({length:5},(_,i)=>({
      r:80+i*90, speed:.0003*(i%2===0?1:-1),
      angle:Math.random()*Math.PI*2, opacity:.04+i*.015, dashes:6+i*2,
    }));
    const drawHex=(x,y,size,alpha,col)=>{
      ctx.beginPath();
      for(let i=0;i<6;i++){
        const a=(Math.PI/180)*(60*i-30);
        i===0?ctx.moveTo(x+size*Math.cos(a),y+size*Math.sin(a)):ctx.lineTo(x+size*Math.cos(a),y+size*Math.sin(a));
      }
      ctx.closePath(); ctx.strokeStyle=`rgba(${col},${alpha})`; ctx.lineWidth=.7; ctx.stroke();
      if(alpha>.12){ctx.fillStyle=`rgba(${col},${alpha*.15})`;ctx.fill();}
    };
    let t=0,raf,last=0;
    const FRAME=1000/30; // 30fps is plenty for a background texture
    const draw=(now=FRAME)=>{
      if(!reduced) raf=requestAnimationFrame(draw); // reduced-motion users get one static frame
      if(document.hidden||now-last<FRAME) return; // pause in background tabs
      last=now;
      ctx.clearRect(0,0,W,H); t+=2;
      const cx=W/2,cy=H*.45;
      for(let i=0;i<12;i++){
        const a=(i/12)*Math.PI*2+t*.001; const len=Math.min(W,H)*.55;
        const alpha=.04+.03*Math.sin(t*.008+i);
        const grad=ctx.createLinearGradient(cx,cy,cx+Math.cos(a)*len,cy+Math.sin(a)*len);
        grad.addColorStop(0,"rgba(37,99,235,"+alpha+")"); grad.addColorStop(1,"rgba(34,211,238,0)");
        ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*len,cy+Math.sin(a)*len);
        ctx.strokeStyle=grad;ctx.lineWidth=1.5;ctx.stroke();
      }
      hexes.forEach(h=>{
        const wave=Math.sin(t*h.speed*1000+h.phase);
        const alpha=h.bright?(.05+.15*(wave*.5+.5)):(.015+.05*(wave*.5+.5));
        drawHex(h.x,h.y,HEX-2,alpha,h.color);
      });
      rings.forEach(rng=>{
        rng.angle+=rng.speed*2;
        ctx.save();ctx.translate(cx,cy);ctx.rotate(rng.angle);
        ctx.setLineDash([12,rng.r*Math.PI*2/rng.dashes-12]);
        ctx.beginPath();ctx.arc(0,0,rng.r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(37,99,235,${rng.opacity})`;
        ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);ctx.restore();
      });
      drops.forEach((d,i)=>{
        ctx.font="12px monospace";ctx.fillStyle=`rgba(34,211,238,${d.opacity})`;
        ctx.fillText(d.char(),i*20,d.y);d.y+=d.speed*2; if(d.y>H){d.y=Math.random()*-200;}
      });
    };
    draw();
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} aria-hidden="true" style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
};

export default HexMesh;
