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
  const targetLabel = document.querySelector('#lab-target');
  const panel = document.querySelector('.lab-panel');
  const links = document.querySelector('#lab-links');
  const names = [['Pare-feu','Routeur','Switch L3','Serveur','Sonde SOC'],['Firewall','Router','Layer 3 switch','Server','SOC sensor']];
  const en = () => document.documentElement.lang === 'en';
  let selected = -1, hovered = -1, orientation = .5, cutaway = false, spinning = false, incident = -1;
  let dragX = null, dragStart = null, timer = null, stepTimer = null, runToken = 0;
  let completedStages = [], activeScenario = -1;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2);
  canvas.width = 540 * dpr;
  canvas.height = 510 * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const svgNS = 'http://www.w3.org/2000/svg';
  const linkItems = cards.map((_, index) => {
    const group = document.createElementNS(svgNS, 'g');
    group.classList.add('lab-link');
    group.dataset.layer = String(index);
    const path = document.createElementNS(svgNS, 'path');
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('r', '3');
    group.append(path, dot);
    links.append(group);
    return { group, path, dot };
  });
  const inspect = document.createElement('div');
  inspect.className = 'lab-inspect';
  inspect.hidden = true;
  inspect.setAttribute('aria-hidden', 'true');
  const inspectTitle = document.createElement('strong');
  const inspectTools = document.createElement('small');
  const inspectDescription = document.createElement('span');
  inspect.append(inspectTitle, inspectTools, inspectDescription);
  canvas.parentElement.append(inspect);
  const focusedLayer = () => hovered >= 0 ? hovered : selected;
  function renderInspect() {
    const i = focusedLayer();
    inspect.hidden = i < 0;
    cards.forEach((card,index)=>card.classList.toggle('is-preview',hovered===index));
    if(i < 0) return;
    inspectTitle.textContent = `0${i+1} · ${names[Number(en())][i]}`;
    inspectTools.textContent = cards[i].querySelector('small').textContent;
    inspectDescription.textContent = cards[i].querySelector('span[data-fr]').textContent;
  }

  const spacing = () => 66 + Number(slider.value) * .18;
  function geometry(i) {
    return {x:63+(orientation-.5)*18, y:75+i*spacing(), w:365-(orientation-.5)*14,
      depth:25+30*orientation, slope:12+7*orientation, h:53};
  }

  function updateConnections() {
    if (!links.getBoundingClientRect().width) return;
    const box = panel.getBoundingClientRect();
    const view = canvas.getBoundingClientRect();
    const scale = view.width / 540;
    links.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    linkItems.forEach(({group,path,dot}, i) => {
      const card = cards[i].getBoundingClientRect();
      const {x,y,w,depth,slope,h}=geometry(i);
      const sx = view.left - box.left + (x+w+depth*.65)*scale;
      const sy = view.top - box.top + (y+slope+h*.48)*scale;
      const tx = card.left-box.left;
      const ty = card.top-box.top+card.height/2;
      const bend = sx + Math.max(16,(tx-sx)*.47);
      path.setAttribute('d', `M ${sx} ${sy} L ${bend} ${sy} L ${tx-16} ${ty} L ${tx-2} ${ty}`);
      dot.setAttribute('cx', String(sx)); dot.setAttribute('cy', String(sy));
      group.classList.toggle('is-active', focusedLayer()===i);
      group.classList.toggle('is-alert', incident===i);
    });
  }

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
  function fan(cx,cy,r) {
    ctx.save();ctx.translate(cx,cy);ctx.scale(1,.38);
    ctx.fillStyle='#061c20';ctx.strokeStyle='#60ae9b';ctx.lineWidth=1.7;
    ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.stroke();
    for(let b=0;b<8;b++) {
      const a=b*Math.PI/4;
      shape([[Math.cos(a)*r*.22,Math.sin(a)*r*.22],
        [Math.cos(a+.16)*r*.9,Math.sin(a+.16)*r*.9],
        [Math.cos(a+.54)*r*.76,Math.sin(a+.54)*r*.76]],
        '#2b766b','#4eae96',.6);
    }
    ctx.beginPath();ctx.arc(0,0,r*.19,0,Math.PI*2);ctx.fillStyle='#79d6b7';ctx.fill();
    ctx.restore();
  }
  function port(x,y,amber=false,w=10,h=8) {
    ctx.lineWidth=1;ctx.strokeStyle=amber?'#dbad57':'#5cae9b';
    ctx.strokeRect(x,y,w,h);
    ctx.fillStyle=amber?'#99743a33':'#3cbda01c';ctx.fillRect(x+1,y+1,w-2,h-2);
  }
  function led(x,y,color='#38e9ac',r=2.7) {
    ctx.save();ctx.shadowColor=color;ctx.shadowBlur=9;ctx.fillStyle=color;
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  function draw() {
    ctx.clearRect(0,0,540,510);
    const floor = ctx.createRadialGradient(270,490,20,270,490,365);
    floor.addColorStop(0,incident>=0?'#351d24':'#164538'); floor.addColorStop(1,'#071818');
    ctx.fillStyle=floor;ctx.fillRect(0,0,540,510);
    ctx.save();ctx.beginPath();ctx.rect(0,340,540,170);ctx.clip();
    for(let i=-12;i<22;i++) line(270,340,i*42,510,incident>=0?'#8a424359':'#55ae8660');
    for(let y=365;y<550;y+=25) line(0,y,540,y,incident>=0?'#8a424343':'#55ae8648');
    ctx.restore();
    // Fiber-like links remain visible between the separated teaching layers.
    for(let i=0;i<4;i++) {
      const a=geometry(i),b=geometry(i+1);
      for(const [offset,color] of [[215,'#57e9bb'],[315,'#e4ad58']]) {
        ctx.save();ctx.shadowColor=color;ctx.shadowBlur=9;
        line(a.x+offset,a.y+a.h+8,b.x+offset,b.y-16,color+'91',2);
        ctx.restore();
      }
    }
    for(let i=4;i>=0;i--) {
      const {x,y,w,depth,slope,h}=geometry(i);
      const front=[[x,y],[x+w,y+slope],[x+w,y+slope+h],[x,y+h]];
      const top=[[x,y],[x+w,y+slope],[x+w+depth,y+slope-28],[x+depth,y-28]];
      const side=[[x+w,y+slope],[x+w+depth,y+slope-28],[x+w+depth,y+slope+h-28],[x+w,y+slope+h]];
      const active=focusedLayer()===i, alert=incident===i;
      const edge=alert?'#ff6570':active?'#f4bc59':'#548f83';
      ctx.save();
      if(active||alert){ctx.shadowColor=edge;ctx.shadowBlur=21;}
      const sideFill=ctx.createLinearGradient(x+w,y,x+w+depth,y);
      sideFill.addColorStop(0,'#163f3d');sideFill.addColorStop(1,'#071b20');
      shape(side,cutaway?'#112d2a9c':sideFill,edge,active?2:1.2);
      const topFill=ctx.createLinearGradient(x,y-28,x,y+slope);
      topFill.addColorStop(0,'#1c4240');topFill.addColorStop(1,'#0b2529');
      shape(top,cutaway?'#103d377a':topFill,edge,active?2:1.2);
      const faceFill=ctx.createLinearGradient(x,y,x,y+h);
      faceFill.addColorStop(0,active?'#24504a':'#173638');
      faceFill.addColorStop(.27,'#0b2328');faceFill.addColorStop(1,'#081a1f');
      shape(front,cutaway?'#0b2e2ab0':faceFill,edge,active?2:1.2);
      ctx.restore();
      // Brushed top, ventilation, and small equipment legends.
      ctx.save();ctx.beginPath();top.forEach(([px,py],j)=>j?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();
      for(let k=-5;k<55;k++)line(x+k*9,y-39,x+k*9+18,y+31,cutaway?'#52d9a466':active?'#e2bc5d56':'#4ea78b45',.7);
      if(i===0||i===3){fan(x+105,y-11,34);fan(x+285,y-4,34);}
      if(cutaway){for(let k=0;k<7;k++){ctx.strokeStyle='#56ebb49c';ctx.strokeRect(x+60+k*39,y-6,20,10);}}
      ctx.fillStyle=active?'#e1c783':'#6ab4a4';ctx.font='600 7px ui-monospace,monospace';
      ctx.fillText([en()?'FIREWALL · SECURITY PERIMETER':'PARE-FEU · PÉRIMÈTRE DE SÉCURITÉ','ROUTEUR · BGP · MPLS','SWITCH L3 · VLAN','SERVEUR · PROXMOX · WINDOWS SERVER','SONDE SOC · WAZUH · SURICATA'][i],x+13,y-11);
      ctx.restore();
      // Fine vertical machining and a narrow edge shine stay inside the front face.
      ctx.save();ctx.beginPath();front.forEach(([px,py],j)=>j?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();
      for(let k=0;k<w;k+=4)line(x+k,y-1,x+k,y+h+slope+1,k%16===0?'#7cd5b82c':'#6bd3b412',.5);
      const shine=ctx.createLinearGradient(x+w*.72,0,x+w*.9,0);
      shine.addColorStop(0,'#c9fff000');shine.addColorStop(.5,'#b6fff018');shine.addColorStop(1,'#c9fff000');
      ctx.fillStyle=shine;ctx.fillRect(x+w*.72,y,w*.18,h+slope);
      ctx.restore();
      ctx.fillStyle=active?'#ffd38a':'#e7c371';ctx.font='700 14px ui-monospace,monospace';ctx.fillText(`0${i+1}`,x+16,y+34);
      ctx.fillStyle='#f1fff8';ctx.font='700 16px "Chakra Petch",system-ui,sans-serif';ctx.fillText(names[Number(en())][i],x+54,y+34+slope*.12);
      const py=(px,offset=25)=>y+offset+slope*(px-x)/w;
      if(i===0){for(let p=0;p<7;p++)port(x+168+p*16,py(x+168+p*16),p===0||p===6);port(x+168,py(x+168,37),true);}
      if(i===1){for(let p=0;p<5;p++)port(x+184+p*16,py(x+184+p*16),p>2);}
      if(i===2){for(let p=0;p<8;p++)port(x+164+p*15,py(x+164+p*15,18));for(let p=0;p<6;p++)port(x+164+p*15,py(x+164+p*15,32));}
      if(i===3){led(x+190,py(x+190,12),'#acffe4',4);for(let p=0;p<4;p++){const px=x+186+p*30;port(px,py(px,29),false,23,13);led(px+18,py(px,35),'#53e2ab',1.3);}}
      if(i===4){const px=x+190,yy=py(px,20);ctx.fillStyle='#062322';ctx.fillRect(px,yy,68,23);ctx.strokeStyle='#54bba0';ctx.strokeRect(px,yy,68,23);for(let p=0;p<8;p++){ctx.fillStyle=p%3===0?'#9bf6c8':'#32e4ad';ctx.fillRect(px+6+p*7,yy+17-[6,12,8,18,13,21,10,15][p],4,[6,12,8,18,13,21,10,15][p]);}}
      for(let p=0;p<3;p++)led(x+w-55+p*12,py(x+w-55+p*12,34),alert?'#ff6878':'#35eab0');
      for(const px of [x+8,x+w-8]){led(px,py(px,8),'#a9f6d7',1.5);led(px,py(px,h-8),'#a9f6d7',1.5);}
      line(x+10,y+h-2,x+w-10,y+slope+h-2,active?'#d7ab5d9c':'#54aa8e5c',.7);
    }
    ctx.strokeStyle='#bb9356';ctx.lineWidth=.7;
    for(const [bx,by,dx,dy] of [[13,13,1,1],[527,13,-1,1],[13,497,1,-1],[527,497,-1,-1]]){
      line(bx,by,bx+dx*12,by,'#bb9356a0',.7);line(bx,by,bx,by+dy*12,'#bb9356a0',.7);
    }
    updateConnections();
  }
  function renderTarget() {
    const target = selected < 0 ? 0 : selected;
    targetLabel.textContent = en()
      ? `SCENARIO TARGET / ${names[1][target]}${selected < 0 ? ' · default; select a layer to change it' : ''}`
      : `CIBLE DU SCÉNARIO / ${names[0][target]}${selected < 0 ? ' · par défaut ; choisissez une couche pour la changer' : ''}`;
  }
  function choose(index) {
    runToken++;
    clearTimeout(stepTimer);
    attack.disabled = false;
    incident = -1;
    selected=index;
    activeScenario=-1;
    completedStages=[];
    cards.forEach((card,i)=>card.setAttribute('aria-pressed',String(i===index)));
    log.replaceChildren();
    renderTarget();
    renderInspect();
    draw();
  }
  cards.forEach((card,index)=>{
    card.addEventListener('click',()=>choose(index));
    card.addEventListener('pointerenter',()=>{hovered=index;renderInspect();draw();});
    card.addEventListener('pointerleave',()=>{hovered=-1;renderInspect();draw();});
    card.addEventListener('focus',()=>{hovered=index;renderInspect();draw();});
    card.addEventListener('blur',()=>{hovered=-1;renderInspect();draw();});
  });
  slider.addEventListener('input',draw);
  cut.addEventListener('click',()=>{cutaway=!cutaway;cut.setAttribute('aria-pressed',String(cutaway));draw();});
  function stopRotation(){spinning=false;rotate.setAttribute('aria-pressed','false');if(timer)clearInterval(timer);timer=null;}
  rotate.addEventListener('click',()=>{
    if(spinning){stopRotation();return;}
    spinning=true;rotate.setAttribute('aria-pressed','true');
    timer=setInterval(()=>{if(!document.hidden&&!reduced.matches){orientation=(orientation+.008)%1;draw();}},45);
  });
  canvas.addEventListener('pointerdown',event=>{dragX=event.clientX;dragStart=[event.clientX,event.clientY];canvas.setPointerCapture(event.pointerId);stopRotation();});
  function layerAt(event) {
    const rect=canvas.getBoundingClientRect();
    const x=(event.clientX-rect.left)*540/rect.width;
    const y=(event.clientY-rect.top)*510/rect.height;
    const layers=cards.map((_,i)=>({i,distance:Math.abs(y-(geometry(i).y+geometry(i).h*.6))})).sort((a,b)=>a.distance-b.distance);
    return x>55 && x<490 && layers[0].distance<42 ? layers[0].i : -1;
  }
  canvas.addEventListener('pointermove',event=>{
    if(dragX===null){const next=layerAt(event);if(next!==hovered){hovered=next;renderInspect();draw();}return;}
    if(Math.abs(event.clientX-dragStart[0])<4)return;
    orientation=Math.max(0,Math.min(1,orientation+(event.clientX-dragX)/240));dragX=event.clientX;draw();
  });
  canvas.addEventListener('pointerup',event=>{
    if(dragStart && Math.hypot(event.clientX-dragStart[0],event.clientY-dragStart[1])<7){
      const layer=layerAt(event);
      if(layer>=0)choose(layer);
    }
    dragX=null;dragStart=null;
  });
  canvas.addEventListener('pointercancel',()=>{dragX=null;dragStart=null;});
  canvas.addEventListener('pointerleave',()=>{if(dragX!==null)return;hovered=-1;renderInspect();draw();});
  // Each script is a local teaching scenario, not a claim of a real attack or response.
  const scenarios=[
    [
      ['[ALERTE] Flux entrant non autorisé vers un service exposé (simulation).','[ALERT] Unauthorized inbound traffic to an exposed service (simulation).'],
      ['[TRACE] Examiner le port, la règle de pare-feu et le journal du flux.','[TRACE] Check the port, firewall rule and traffic log.'],
      ['[ANALYSE] Vérifier les accès légitimes avant de modifier la règle.','[ANALYSIS] Check legitimate access before changing the rule.'],
      ['[ISSUE] Flux refusé dans la maquette ; événement conservé pour investigation.','[OUTCOME] Traffic denied in the model; event retained for investigation.']
    ],[
      ['[ALERTE] Chemin de routage inattendu entre deux sites (simulation).','[ALERT] Unexpected routing path between two sites (simulation).'],
      ['[TRACE] Comparer les routes BGP/MPLS et le chemin attendu.','[TRACE] Compare BGP/MPLS routes with the expected path.'],
      ['[ANALYSE] Évaluer les services affectés avant de retirer une route.','[ANALYSIS] Assess affected services before removing a route.'],
      ['[ISSUE] Changement isolé dans la maquette ; chemin attendu rétabli.','[OUTCOME] Change isolated in the model; expected path restored.']
    ],[
      ['[ALERTE] Tentative de flux inter-VLAN hors politique (simulation).','[ALERT] Inter-VLAN traffic outside policy (simulation).'],
      ['[TRACE] Identifier VLAN source, destination et règle inter-zone.','[TRACE] Identify source and destination VLANs and the inter-zone rule.'],
      ['[ANALYSE] Vérifier les dépendances avant de durcir le filtrage.','[ANALYSIS] Check dependencies before tightening filtering.'],
      ['[ISSUE] Flux non autorisé refusé dans la maquette ; accès utile préservé.','[OUTCOME] Unauthorized traffic denied in the model; legitimate access preserved.']
    ],[
      ['[ALERTE] Échecs répétés de connexion à Active Directory (simulation).','[ALERT] Repeated Active Directory sign-in failures (simulation).'],
      ['[TRACE] Recouper journaux Windows, Sysmon et Wazuh avec le compte et la source.','[TRACE] Correlate Windows, Sysmon and Wazuh logs with account and source.'],
      ['[ANALYSE] Vérifier l’impact avant toute action sur le compte ou la GPO.','[ANALYSIS] Check impact before changing the account or GPO.'],
      ['[ISSUE] Mesure ciblée puis nouvelle vérification dans ce scénario.','[OUTCOME] Targeted measure followed by a new check in this scenario.']
    ],[
      ['[ALERTE] Événements suspects reçus par la sonde SOC (simulation).','[ALERT] Suspicious events received by the SOC sensor (simulation).'],
      ['[TRACE] Corréler Suricata, Wazuh et PCAP par heure et adresse.','[TRACE] Correlate Suricata, Wazuh and PCAPs by time and address.'],
      ['[ANALYSE] Qualifier l’alerte avant de conclure ou d’escalader.','[ANALYSIS] Triage the alert before concluding or escalating.'],
      ['[ISSUE] Contexte documenté ; aucune réponse automatique revendiquée.','[OUTCOME] Context documented; no automatic response claimed.']
    ]
  ];
  function renderLog(){
    log.replaceChildren(...completedStages.map(step=>{
      const item=document.createElement('span');
      item.className=`lab-entry lab-entry-${step}`;
      item.textContent=scenarios[activeScenario][step][Number(en())];
      return item;
    }));
  }
  attack.addEventListener('click',()=>{
    const target=selected<0?0:selected;
    if(selected<0)choose(target);
    const token=++runToken;
    activeScenario=target;
    attack.disabled=true;completedStages=[];log.replaceChildren();
    let step=0;
    function next(){
      if(token!==runToken)return;
      completedStages.push(step);
      renderLog();
      incident=step<2?target:-1;
      draw();step++;
      if(step<scenarios[target].length)stepTimer=setTimeout(next,750);
      else attack.disabled=false;
    }
    next();
  });
  function translate(){
    const key=en()?'en':'fr';
    document.querySelectorAll('.network-lab [data-fr], .route-section [data-fr], .plate-kicker [data-fr]').forEach(el=>{el.textContent=el.dataset[key];});
    canvas.setAttribute('aria-label',en()?'Illustrative network model: firewall, router, switch, server and SOC sensor':'Maquette illustrative : pare-feu, routeur, switch, serveur et sonde SOC');
    renderTarget();
    renderInspect();
    if(completedStages.length)renderLog();
    draw();
  }
  translate();
  const observer = new ResizeObserver(updateConnections);
  observer.observe(panel);
  cards.forEach(card => observer.observe(card));
  document.fonts.ready.then(updateConnections);
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
