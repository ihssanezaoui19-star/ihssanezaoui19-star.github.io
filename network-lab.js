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
  let selected = -1, orientation = .5, cutaway = false, spinning = false, incident = -1;
  let dragX = null, dragStart = null, timer = null, stepTimer = null, runToken = 0;
  let completedStages = [], activeScenario = -1;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

  function updateConnections() {
    if (!links.getBoundingClientRect().width) return;
    const box = panel.getBoundingClientRect();
    const view = canvas.getBoundingClientRect();
    const scale = view.width / 540;
    const spread = 56 + Number(slider.value) * .25;
    links.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    linkItems.forEach(({group,path,dot}, i) => {
      const card = cards[i].getBoundingClientRect();
      const sx = view.left - box.left + (95+(orientation-.5)*22 + 300-(orientation-.5)*18 + 22+34*orientation)*scale;
      const sy = view.top - box.top + (101+i*spread + 12+9*orientation + 18)*scale;
      const tx = card.left-box.left;
      const ty = card.top-box.top+card.height/2;
      const bend = sx + Math.max(16,(tx-sx)*.47);
      path.setAttribute('d', `M ${sx} ${sy} L ${bend} ${sy} L ${tx-16} ${ty} L ${tx-2} ${ty}`);
      dot.setAttribute('cx', String(sx)); dot.setAttribute('cy', String(sy));
      group.classList.toggle('is-active', selected===i);
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
      const active=selected===i, alert=incident===i;
      const edge=alert?'#ff6570':active?'#f4bc59':'#418779';
      ctx.save();
      if(active||alert){ctx.shadowColor=edge;ctx.shadowBlur=22;}
      shape(side,cutaway?'#112d2a9c':active?'#29302b':'#0a2627',edge,active?2:1.2);
      shape(top,cutaway?'#103d377a':active?'#263a32':'#123130',edge,active?2:1.2);
      shape(front,cutaway?'#0b2e2ab0':active?'#1e302b':'#0c2425',edge,active?2:1.2);
      ctx.restore();
      ctx.save();ctx.beginPath();top.forEach(([px,py],j)=>j?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();
      for(let k=0;k<38;k++)line(x-30+k*9,y-25,x-30+k*9+40,y+45,cutaway?'#52d9a455':active?'#e2bc5d38':'#4ea78b32',.7);
      if(cutaway){for(let k=0;k<7;k++){ctx.strokeStyle='#56ebb47f';ctx.strokeRect(x+55+k*32,y-6,18,9);}}
      ctx.restore();
      ctx.fillStyle=active?'#ffd38a':'#e7c371';ctx.font='700 12px ui-monospace,monospace';ctx.fillText(`0${i+1}`,x+11,y+25);
      ctx.fillStyle='#ecfff4';ctx.font='700 14px system-ui,sans-serif';ctx.fillText(names[Number(en())][i],x+38,y+25);
      const ports=[9,4,12,3,8][i];
      for(let p=0;p<ports;p++){ctx.strokeStyle='#539c8e';ctx.strokeRect(x+160+p*10,y+19+(slope*.5),5,6);}
      for(let p=0;p<3;p++){ctx.beginPath();ctx.arc(x+w-28+p*9,y+29+slope*.85,2.5,0,Math.PI*2);ctx.fillStyle=alert?'#ff5c71':'#35eab0';ctx.fill();}
      line(x+8,y+38,x+w-10,y+slope+38,active?'#d7ab5d78':'#54aa8e42',.6);
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
  canvas.addEventListener('pointerdown',event=>{dragX=event.clientX;dragStart=[event.clientX,event.clientY];canvas.setPointerCapture(event.pointerId);stopRotation();});
  canvas.addEventListener('pointermove',event=>{if(dragX===null)return;if(Math.abs(event.clientX-dragStart[0])<4)return;orientation=Math.max(0,Math.min(1,orientation+(event.clientX-dragX)/240));dragX=event.clientX;draw();});
  canvas.addEventListener('pointerup',event=>{
    if(dragStart && Math.hypot(event.clientX-dragStart[0],event.clientY-dragStart[1])<7){
      const rect=canvas.getBoundingClientRect();
      const x=(event.clientX-rect.left)*540/rect.width;
      const y=(event.clientY-rect.top)*510/rect.height;
      const spread=56+Number(slider.value)*.25;
      const layers=cards.map((_,i)=>({i,distance:Math.abs(y-(128+i*spread))})).sort((a,b)=>a.distance-b.distance);
      if(x>88 && x<455 && layers[0].distance<46)choose(layers[0].i);
    }
    dragX=null;dragStart=null;
  });
  canvas.addEventListener('pointercancel',()=>{dragX=null;dragStart=null;});
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
    document.querySelectorAll('.network-lab [data-fr], .route-section [data-fr]').forEach(el=>{el.textContent=el.dataset[key];});
    canvas.setAttribute('aria-label',en()?'Illustrative network model: firewall, router, switch, server and SOC sensor':'Maquette illustrative : pare-feu, routeur, switch, serveur et sonde SOC');
    renderTarget();
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
