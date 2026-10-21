/* ===== TypeWarrior Shadow Fight Mode — reads the live test state, never changes typing logic ===== */
(()=>{
const KEY='typeforge_fight';let ON=true;try{ON=localStorage.getItem(KEY)!=='0'}catch(e){}
const wrap=$('fight-wrap'),cv=$('fight-cv'),cx=cv.getContext('2d'),W=900,H=320,GY=262;cv.width=W;cv.height=H;
const tg=$('toggle-fight');tg.checked=ON;wrap.style.display=ON?'block':'none';
tg.addEventListener('change',e=>{ON=e.target.checked;wrap.style.display=ON?'block':'none';try{localStorage.setItem(KEY,ON?'1':'0')}catch(_){}});
const mk=o=>({t:.15,a1:.9,b1:2,a2:.7,b2:1.9,s:2.7,l1:.5,m1:.25,l2:-.5,m2:-.3,...o});
const P={idle:mk({}),
 w1:mk({t:-.15,a1:2.5,b1:2.9,a2:2.3,b2:2.8,s:3.4,l1:.35,m1:.4,l2:-.55,m2:-.4}),
 c1:mk({t:.55,a1:1.5,b1:1.3,a2:1.4,b2:1.2,s:1.35,l1:.9,m1:.3,l2:-.8,m2:-.5}),
 w2:mk({t:.1,a1:-.2,b1:.1,a2:-.1,b2:.2,s:.3,l1:.6,m1:.4,l2:-.5,m2:-.3}),
 c2:mk({t:.4,a1:1.3,b1:2.5,a2:1.2,b2:2.3,s:2.9,l1:.8,m1:.3,l2:-.7,m2:-.5}),
 w3:mk({t:-.05,a1:.5,b1:2.3,a2:.4,b2:2.2,s:1.57,l1:.45,m1:.5,l2:-.6,m2:-.4}),
 c3:mk({t:.5,a1:1.57,b1:1.57,a2:1.4,b2:1.5,s:1.57,l1:.85,m1:.2,l2:-.8,m2:-.6}),
 block:mk({t:-.05,a1:1.1,b1:2.4,a2:1,b2:2.3,s:2.95}),
 hurt:mk({t:-.5,a1:-.4,b1:-.2,a2:-.8,b2:-.5,s:.3,l1:.2,m1:.1,l2:-.7,m2:-.5}),
 ko:mk({t:-1.5,a1:-1.2,b1:-1.2,a2:-1.4,b2:-1.3,s:-1,l1:1.3,m1:1.4,l2:1.1,m2:1.3})};
const SEQ={s1:[['w1',-18,80],['c1',120,70,1],['idle',0,160]],s2:[['w2',-12,80],['c2',110,70,1],['idle',0,160]],s3:[['w3',-24,90],['c3',150,60,1],['idle',0,180]],s4:[['w1',-34,150],['c1',175,80,1],['c1',175,120],['idle',0,220]]};
let T=0;
function snd(f,d,ty='sine',v=.1,f2){if(!state.sound)return;try{const ac=getAudioCtx(),o=ac.createOscillator(),g=ac.createGain(),n=ac.currentTime;o.type=ty;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g).connect(ac.destination);o.start();o.stop(n+d)}catch(e){}}
function seg(x1,y1,x2,y2,w1,w2){const a=Math.atan2(y2-y1,x2-x1)+1.5708,c=Math.cos(a),s=Math.sin(a);cx.beginPath();cx.moveTo(x1+c*w1/2,y1+s*w1/2);cx.lineTo(x2+c*w2/2,y2+s*w2/2);cx.lineTo(x2-c*w2/2,y2-s*w2/2);cx.lineTo(x1-c*w1/2,y1-s*w1/2);cx.closePath();cx.fill();cx.beginPath();cx.arc(x2,y2,w2/2,0,7);cx.fill()}
function shape(f,col){
 const p=f.p,d=f.face,hx=f.x+f.lunge*d,hy=GY-78+(f.ko?0:Math.sin(T*4+f.x)*2)+f.drop,sx=hx+Math.sin(p.t)*58*d,sy=hy-Math.cos(p.t)*58,o={};
 const pt=(x,y,a,l)=>[x+Math.sin(a)*l*d,y+Math.cos(a)*l];
 const limb=(x,y,a,b,l,w0,w1,w2,k)=>{const m=pt(x,y,a,l),e=pt(m[0],m[1],b,l);seg(x,y,m[0],m[1],w0,w1);seg(m[0],m[1],e[0],e[1],w1,w2);o[k]=e;if(k[0]=='h'){cx.beginPath();cx.arc(e[0],e[1],5,0,7);cx.fill()}else seg(e[0],e[1],e[0]+d*14,e[1]+3,9,6)};
 cx.fillStyle=col;limb(hx,hy,p.l2,p.m2,39,21,15,10,'f2');
 seg(hx,hy,sx,sy,28,40);seg(hx,hy,hx-d*(20+Math.sin(T*8)*4),hy+24+Math.sin(T*7)*3,7,3);
 const hdx=sx+Math.sin(p.t)*20*d,hdy=sy-Math.cos(p.t)*20;seg(sx,sy,hdx,hdy+8,13,12);cx.beginPath();cx.ellipse(hdx,hdy,12.5,14.5,p.t*d*.5,0,7);cx.fill();
 limb(hx,hy,p.l1,p.m1,39,22,16,10,'f1');limb(sx,sy+6,p.a2,p.b2,28,13,10,8,'h2');limb(sx,sy+6,p.a1,p.b1,28,14,11,8.5,'h1');
 const h=o.h1,tip=pt(h[0],h[1],p.s,66),bk=pt(h[0],h[1],p.s+Math.PI,10);seg(bk[0],bk[1],tip[0],tip[1],5,2.5);
 o.head=[hdx,hdy];o.tip=tip;o.h=h;return o}
class F{
 constructor(x,face,en){this.x=x;this.face=face;this.en=en;this.p={...P.idle};this.to=P.idle;this.lunge=0;this.lt=0;this.drop=0;this.dt=0;this.ko=false;this.q=[];this.tm=0;this.cb=null;this.act=false;this.trail=[];this.warn=0}
 set(n,l=0,d=0){this.to=P[n];this.lt=l;this.dt=d}
 step(){const s=this.q.shift();if(!s){this.act=false;if(!this.ko)this.set('idle');this.tm=1e9;return}this.set(s[0],s[1]);this.tm=s[2];if(s[3]&&this.cb)this.cb()}
 play(k,cb){if(this.ko)return;this.q=SEQ[k].map(s=>[...s]);this.cb=cb;this.act=true;snd(420,.1,'sawtooth',.03,900);this.step()}
 hurt(){if(this.ko)return;this.q=[['hurt',-34,240]];this.act=false;this.step()}
 upd(dt){const k=Math.min(1,dt*22);for(const i in this.p)this.p[i]+=(this.to[i]-this.p[i])*k;this.lunge+=(this.lt-this.lunge)*k;this.drop+=(this.dt-this.drop)*Math.min(1,dt*9);this.warn-=dt;this.tm-=dt*1000;if(this.tm<=0&&!this.ko)this.step()}
 draw(){
  const hx=this.x+this.lunge*this.face,sk=(450-hx)/-320,d=this.face;
  cx.save();cx.translate(hx,GY);cx.transform(1,0,sk,-.26,0,0);cx.translate(-hx,-GY);cx.shadowColor='#000';cx.shadowBlur=14;shape(this,'#000');cx.restore();
  cx.save();cx.translate(0,GY);cx.scale(1,-.4);cx.translate(0,-GY);shape(this,'rgba(255,59,78,.1)');cx.restore();
  cx.shadowColor='rgba(255,80,100,.6)';cx.shadowBlur=12;const o=shape(this,'#050507');cx.shadowBlur=0;
  const[hdx,hdy]=o.head;
  cx.strokeStyle=this.en?'#ff9aa6':'#e6ecff';cx.lineWidth=2;cx.shadowColor=this.en?'#ff3b4e':'#47d9ff';cx.shadowBlur=this.act?14:5;cx.beginPath();cx.moveTo(o.h[0],o.h[1]);cx.lineTo(o.tip[0],o.tip[1]);cx.stroke();cx.shadowBlur=0;
  if(this.en){cx.shadowColor='#ff3b4e';cx.shadowBlur=12;cx.fillStyle='#ff3b4e';cx.beginPath();cx.arc(hdx+d*7,hdy-2,2.6,0,7);cx.fill();cx.shadowBlur=0}
  else{cx.strokeStyle='#e8ff47';cx.lineWidth=4;cx.lineCap='round';cx.beginPath();cx.moveTo(hdx-d*10,hdy-5);cx.quadraticCurveTo(hdx-d*26,hdy-3+Math.sin(T*9)*5,hdx-d*42,hdy+8+Math.sin(T*9+1)*6);cx.stroke()}
  if(this.act)this.trail.push([o.tip[0],o.tip[1],1]);
  cx.lineCap='round';for(let i=1;i<this.trail.length;i++){const a=this.trail[i-1],b=this.trail[i];cx.strokeStyle=`rgba(255,245,220,${b[2]*.8})`;cx.lineWidth=8*b[2];cx.beginPath();cx.moveTo(a[0],a[1]);cx.lineTo(b[0],b[1]);cx.stroke()}
  this.trail.forEach(t=>t[2]-=.1);this.trail=this.trail.filter(t=>t[2]>0);
  if(this.warn>0){cx.fillStyle='#e8ff47';cx.font="800 38px 'Syne',sans-serif";cx.textAlign='center';cx.fillText('!',hdx,hdy-32)}}
}
let pl,en,phase='idle',lastC=0,lastE=0,energy=0,combo=0,n=0,php=100,ehp=100,ps=100,es=100,errT=-9,corT=-9,atkT=2.5,pend=0,ban={s:'',t:0},shk=0,zoom=0,slow=0,sparks=[],rings=[],floats=[],last=performance.now();
const say=(s,t=1.4)=>{ban={s,t}};
function reset(){pl=new F(310,1,0);en=new F(590,-1,1);phase='idle';lastC=state.correctCount||0;lastE=state.errorCount||0;energy=combo=n=0;php=ehp=ps=es=100;errT=corT=-9;atkT=2.5;pend=0;sparks=[];rings=[];floats=[];zoom=0;say('Start typing to fight',99)}
function burst(x,y,k,c){for(let i=0;i<k;i++){const a=Math.random()*6.28,s=80+Math.random()*280;sparks.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-70,l:.55,c})}rings.push({x,y,r:6,l:.3})}
function clash(){burst((pl.x+en.x)/2,GY-130,16,'#fff4c8');shk=Math.max(shk,4);snd(1200,.08,'triangle',.1,500)}
function punish(){if(pl.ko)return;pl.hurt();burst(pl.x+24,GY-130,12,'#ff3b4e');floats.push({x:pl.x,y:GY-190,s:'MISS',l:.8,c:'#ff6b8a'});shk=8;zoom=.02;snd(130,.16,'square',.12,40)}
function resolveAtk(){if(pl.ko||phase!=='fight')return;if(T-corT<1.1){pl.q=[['block',-6,220]];pl.act=false;pl.step();clash()}else{php-=4;punish()}}
function hitEnemy(k){if(en.ko)return;en.hurt();pend=0;en.warn=0;atkT=Math.max(atkT,1.2);const big=k==='s4';burst(en.x-26,GY-130,big?26:12,big?'#e8ff47':'#ffb0b8');if(big){shk=10;zoom=.05;slow=.12}else shk=Math.max(shk,4);if(combo>=5)floats.push({x:en.x,y:GY-190,s:'x'+combo,l:.7,c:'#e8ff47'});snd(170,.14,'square',.11,40)}
function logic(dt){
 const len=state.currentText.length||1;
 if(state.testActive){
  if(phase==='idle'){phase='fight';say('FIGHT!')}
  const C=state.correctCount,E=state.errorCount;
  if(C>lastC){const d=C-lastC;energy=Math.min(12,energy+d);combo+=d;corT=T;php=Math.min(100,php+d*.12)}
  if(E>lastE){const d=E-lastE;combo=0;php-=d*7;errT=T;en.play(n%2?'s3':'s1',()=>punish())}
  lastC=C;lastE=E;ehp=100*(1-C/len);
  if(energy>=3&&!pl.act&&!pl.ko){energy-=3;const k=n%5===4?'s4':['s1','s2','s3'][n%3];n++;pl.play(k,()=>hitEnemy(k))}
  if(!en.ko){if(pend>0){pend-=dt;if(pend<=0){en.warn=0;en.play(Math.random()<.5?'s1':'s3',resolveAtk);atkT=1.8+Math.random()*1.4}}else{atkT-=dt;if(atkT<=0){pend=.5;en.warn=.5;en.q=[['w1',-24,520]];en.step();snd(520,.12,'triangle',.05)}}}
  if(php<=0){php=0;phase='lost';pl.ko=true;pl.q=[];pl.set('ko',-40,64);say('DEFEATED',99);snd(300,.6,'square',.1,30);finishTest()}
 }else if(state.testStarted&&phase==='fight'){
  if(state.typedCount>=len){phase='won';ehp=0;en.ko=true;en.q=[];en.set('ko',-70,64);slow=.6;burst(en.x,GY-120,34,'#e8ff47');say('VICTORY',99);snd(300,.6,'square',.1,30)}
  else{phase='time';say("TIME'S UP",99)}
 }
}
function bar(x,y,w,v,c,r,l){cx.fillStyle='rgba(255,255,255,.1)';cx.fillRect(x,y,w,10);const b=w*Math.max(0,v)/100;cx.fillStyle=c;cx.fillRect(r?x+w-b:x,y,b,10);cx.fillStyle='#f0f0f8';cx.font="700 11px 'Space Mono',monospace";cx.textAlign=r?'right':'left';cx.fillText(l,r?x+w:x,y-6)}
function scene(){
 let g=cx.createLinearGradient(0,0,0,GY);g.addColorStop(0,'#08080f');g.addColorStop(1,'#34101d');cx.fillStyle=g;cx.fillRect(0,0,W,H);
 g=cx.createRadialGradient(450,150,10,450,150,190);g.addColorStop(0,'rgba(255,90,80,.95)');g.addColorStop(.5,'rgba(255,59,78,.3)');g.addColorStop(1,'rgba(255,59,78,0)');cx.fillStyle=g;cx.beginPath();cx.arc(450,150,190,0,7);cx.fill();
 cx.fillStyle='rgba(255,200,190,.04)';[[250,60],[450,90],[650,60]].forEach(([x,w])=>{cx.beginPath();cx.moveTo(450-w/4,0);cx.lineTo(450+w/4,0);cx.lineTo(x+w,GY);cx.lineTo(x-w,GY);cx.fill()});
 cx.fillStyle='#07060b';[60,810].forEach(x=>{cx.fillRect(x,20,24,GY-20);cx.fillRect(x-18,14,60,10)});
 g=cx.createLinearGradient(0,GY,0,H);g.addColorStop(0,'#2a0d18');g.addColorStop(1,'#040407');cx.fillStyle=g;cx.fillRect(0,GY,W,H-GY);
 cx.strokeStyle='rgba(255,90,100,.45)';cx.lineWidth=2;cx.beginPath();cx.moveTo(0,GY);cx.lineTo(W,GY);cx.stroke();
 for(let i=0;i<24;i++){cx.fillStyle=`rgba(255,200,120,${.12+(i%4)*.08})`;cx.fillRect((i*97+T*(10+i%4*6))%W,H-((i*53+T*(14+i%3*8))%H),2,2)}}
function draw(dt){
 cx.save();if(shk>.3){cx.translate((Math.random()-.5)*shk,(Math.random()-.5)*shk);shk*=.86}else shk=0;
 zoom*=.88;cx.translate(W/2,GY);cx.scale(1+zoom,1+zoom);cx.translate(-W/2,-GY);
 scene();pl.upd(dt);en.upd(dt);pl.draw();en.draw();
 for(const s of sparks){s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=520*dt;s.l-=dt;cx.globalAlpha=Math.max(0,s.l*2);cx.fillStyle=s.c;cx.fillRect(s.x,s.y,3,3)}sparks=sparks.filter(s=>s.l>0);
 for(const r of rings){r.r+=300*dt;r.l-=dt;cx.globalAlpha=Math.max(0,r.l*3);cx.strokeStyle='#fff';cx.lineWidth=2;cx.beginPath();cx.arc(r.x,r.y,r.r,0,7);cx.stroke()}rings=rings.filter(r=>r.l>0);
 for(const f of floats){f.y-=40*dt;f.l-=dt;cx.globalAlpha=Math.max(0,f.l*1.5);cx.fillStyle=f.c;cx.font="800 24px 'Syne',sans-serif";cx.textAlign='center';cx.fillText(f.s,f.x,f.y)}floats=floats.filter(f=>f.l>0);cx.globalAlpha=1;
 ps+=(php-ps)*.15;es+=(ehp-es)*.15;
 bar(24,26,340,ps,ps>30?'#6ee7b7':'#ff6b8a',false,'YOU');bar(W-364,26,340,es,'#ff3b4e',true,'SHADOW');
 if(combo>=5){cx.fillStyle=combo>=20?'#e8ff47':'#f0f0f8';cx.textAlign='center';cx.font="800 "+Math.min(34,18+combo/2)+"px 'Syne',sans-serif";cx.fillText('COMBO ×'+combo,W/2,62)}
 if(ban.s){if(ban.t<50)ban.t-=dt;if(ban.t>0){cx.globalAlpha=Math.min(1,ban.t*2);cx.fillStyle='#fff';cx.shadowColor='#e8ff47';cx.shadowBlur=20;cx.textAlign='center';cx.font="800 "+(ban.s.length>14?26:48)+"px 'Syne',sans-serif";cx.fillText(ban.s,W/2,125);cx.shadowBlur=0;cx.globalAlpha=1}}
 cx.restore()}
function loop(now){let dt=Math.min(.05,(now-last)/1000);last=now;
 if(ON&&$('test-arena').style.display==='block'){if(!state.testStarted&&phase!=='idle')reset();if(slow>0){slow-=dt;dt*=.3}T+=dt;logic(dt);draw(dt)}
 requestAnimationFrame(loop)}
const _sr=window.showResults;
window.showResults=function(r,t){if(ON&&$('test-arena').style.display==='block'){const st=state.startTime;setTimeout(()=>{if(state.startTime===st)_sr(r,t)},1600)}else _sr(r,t)};
reset();requestAnimationFrame(loop);
})();
