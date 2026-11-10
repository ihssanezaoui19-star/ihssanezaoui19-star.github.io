/* Illustrative network stack. All interactions are local visual demonstrations. */
(() => {
  'use strict';
  const canvas = document.querySelector('#lab-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cards = [...document.querySelectorAll('.lab-devices button')];
  const slider = document.querySelector('#lab-explode');
  const cut = document.querySelector('#lab-cut');
  const rotate = document.querySelector('#lab-rotate');
  const attack = document.querySelector('#lab-attack');
  const log = document.querySelector('#lab-log');
  const names = [['Pare-feu','Routeur','Switch L3','Serveur','Sonde SOC'],['Firewall','Router','Layer 3 switch','Server','SOC sensor']];
  const en = () => document.documentElement.lang === 'en';
  let selected = -1, orientation = .5, cutaway = false, spinning = false, incident = -1;
  let dragX = null, timer = null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = 540 * dpr;
  canvas.height = 510 * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  function shape(points, fill, stroke, width = 1) {
    ctx.beginPath();
    points.forEach(([x,y], i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke();
  }
  function line(ax,ay,bx,by,color,width=1) {
    ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
  }
  function draw() {
    ctx.clearRect(0,0,540,510);
    const floor = ctx.createRadialGradient(260,480,20,260,480,310);
    floor.addColorStop(0,incident>=0?'#351b23':'#154636'); floor.addColorStop(1,'#071918');
    ctx.fillStyle=floor;ctx.fillRect(0,0,540,510);
    ctx.save();ctx.beginPath();ctx.rect(0,350,540,160);ctx.clip();
    for(let i=-12;i<22;i++) line(270,350,i*42,510,incident>=0?'#7a333757':'#4a9b7148');
    for(let y=380;y<550;y+=27) line(0,y,540,y,incident>=0?'#7a33374e':'#4a9b7142');
    ctx.restore();
    const spread = 56 + Number(slider.value)*.25;
    const yaw = orientation;
    for(let i=4;i>=0;i--) {
      const x=95+(yaw-.5)*22, y=101+i*spread;
      const w=300-(yaw-.5)*18, depth=22+34*yaw, slope=12+9*yaw;
      const front=[[x,y],[x+w,y+slope],[x+w,y+slope+42],[x,y+42]];
      const top=[[x,y],[x+w,y+slope],[x+w+depth,y+slope-24],[x+depth,y-24]];
      const side=[[x+w,y+slope],[x+w+depth,y+slope-24],[x+w+depth,y+slope+18],[x+w,y+slope+42]];
      const active=selected===i, alert=incident===i && (i===0||i===4);
      const edge=alert?'#ff6570':active?'#f4bc59':'#326961';
      ctx.save();
      if(active||alert){ctx.shadowColor=edge;ctx.shadowBlur=16;}
      shape(side,cutaway?'#112d2a9c':'#0a2627',edge,active?1.5:1);
      shape(top,cutaway?'#103d377a':'#123130',edge,active?1.5:1);
      shape(front,cutaway?'#0b2e2ab0':'#0c2425',edge,active?1.5:1);
      ctx.restore();
      ctx.save();ctx.beginPath();top.forEach(([px,py],j)=>j?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();
      for(let k=0;k<38;k++)line(x-30+k*9,y-25,x-30+k*9+40,y+45,cutaway?'#52d9a444':'#4ea78b1e',.7);
      if(cutaway){for(let k=0;k<7;k++){ctx.strokeStyle='#56ebb47f';ctx.strokeRect(x+55+k*32,y-6,18,9);}}
      ctx.restore();
      ctx.fillStyle=active?'#ffd38a':'#e7c371';ctx.font='700 12px ui-monospace,monospace';ctx.fillText(`0${i+1}`,x+11,y+25);
      ctx.fillStyle='#ecfff4';ctx.font='700 14px system-ui,sans-serif';ctx.fillText(names[Number(en())][i],x+38,y+25);
      const ports=[9,4,12,3,8][i];
      for(let p=0;p<ports;p++){ctx.strokeStyle='#539c8e';ctx.strokeRect(x+160+p*10,y+19+(slope*.5),5,6);}
      for(let p=0;p<3;p++){ctx.beginPath();ctx.arc(x+w-28+p*9,y+29+slope*.85,2.5,0,Math.PI*2);ctx.fillStyle=alert?'#ff5c71':'#35eab0';ctx.fill();}
    }
  }
  function choose(index) {
    selected=index;
    cards.forEach((card,i)=>card.setAttribute('aria-pressed',String(i===index)));
    if(incident<0) log.textContent=en()?`${names[1][index]} · ${cards[index].querySelector('small').textContent}`:`${names[0][index]} · ${cards[index].querySelector('small').textContent}`;
    draw();
  }
  cards.forEach((card,index)=>card.addEventListener('click',()=>choose(index)));
  slider.addEventListener('input',draw);
  cut.addEventListener('click',()=>{cutaway=!cutaway;cut.setAttribute('aria-pressed',String(cutaway));draw();});
  function stopRotation(){spinning=false;rotate.setAttribute('aria-pressed','false');if(timer)clearInterval(timer);timer=null;}
  rotate.addEventListener('click',()=>{
    if(spinning){stopRotation();return;}
    spinning=true;rotate.setAttribute('aria-pressed','true');
    timer=setInterval(()=>{if(!document.hidden&&!reduced.matches){orientation=(orientation+.008)%1;draw();}},45);
  });
  canvas.addEventListener('pointerdown',event=>{dragX=event.clientX;canvas.setPointerCapture(event.pointerId);stopRotation();});
  canvas.addEventListener('pointermove',event=>{if(dragX===null)return;orientation=Math.max(0,Math.min(1,orientation+(event.clientX-dragX)/240));dragX=event.clientX;draw();});
  canvas.addEventListener('pointerup',()=>{dragX=null;});
  canvas.addEventListener('pointercancel',()=>{dragX=null;});
  const stages=[
    ['[ALERTE] Tentative sur le pare-feu','[ALERT] Attempt at the firewall'],
    ['[SOC] La sonde associe les traces réseau et système','[SOC] The sensor correlates network and system traces'],
    ['[RÉPONSE] Vérification des flux et des accès','[RESPONSE] Review of traffic and access'],
    ['[FIN] Scénario pédagogique terminé · aucun trafic réel','[END] Illustrative scenario complete · no real traffic']
  ];
  attack.addEventListener('click',()=>{
    attack.disabled=true;log.textContent='';log.classList.add('is-alert');
    let step=0;
    function next(){
      log.textContent+=(step?'\n':'')+stages[step][Number(en())];
      incident=step===0?0:step===1?4:-1;selected=incident;
      cards.forEach((card,i)=>card.setAttribute('aria-pressed',String(i===incident)));
      draw();step++;
      if(step<stages.length)setTimeout(next,670);
      else{attack.disabled=false;log.classList.remove('is-alert');}
    }
    next();
  });
  function translate(){
    const key=en()?'en':'fr';
    document.querySelectorAll('.network-lab [data-fr], .route-section [data-fr]').forEach(el=>{el.textContent=el.dataset[key];});
    canvas.setAttribute('aria-label',en()?'Illustrative network model: firewall, router, switch, server and SOC sensor':'Maquette illustrative : pare-feu, routeur, switch, serveur et sonde SOC');
    draw();
  }
  translate();
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
