/* Public diagrams: conceptual views grounded in the accompanying case studies. */
(function () {
  const P = (fr, en) => [fr, en];
  const Z = (x, y, w, h, fr, en, kind = 'neutral') => ({x, y, w, h, name:P(fr,en), kind});
  const N = (id, x, y, w, fr, en, subFr, subEn, icon, kind, whyFr, whyEn) =>
    ({id, x, y, w, name:P(fr,en), sub:P(subFr,subEn), icon, kind, why:P(whyFr,whyEn)});
  const E = (d, kind = 'flow', label = null, lx = 0, ly = 0) => ({d, kind, label, lx, ly});
  const diagrams = {
    '01': {
      title:P('Honeypot · architecture d’observation','Honeypot · observation architecture'),
      zones:[
        Z(18,202,238,412,'Externe','External','hostile'),
        Z(512,202,368,412,'Environnement simulé','Simulated environment'),
        Z(900,202,282,412,'Observation','Observation','observe')
      ],
      nodes:[
        N('tpot',30,35,275,'T-Pot','T-Pot','Étude et essai','Review and trial','TP','plain','Nous avons testé T-Pot avant de définir les besoins non couverts.','We tried T-Pot before identifying the needs it could not cover.'),
        N('limits',342,35,275,'Limites identifiées','Identified gaps','Écarts avec le besoin','Gaps against the use case','!','risk','Le service client et le parcours après le premier accès étaient insuffisamment représentés.','The client service and the path beyond first contact were insufficiently represented.'),
        N('custom',654,35,275,'Honeypot adapté','Tailored honeypot','Conception sur mesure','Custom design','HP','observe','Nous avons conçu un capteur adapté aux services simulés.','We designed a sensor tailored to the simulated services.'),
        N('attacker',36,365,202,'Attaquants','Attackers','Trafic externe observé','Observed external traffic','EXT','risk','Le capteur observe les tentatives qui atteignent cette maquette ; il ne mesure pas toutes les attaques au Maroc.','The sensor sees attempts reaching this lab, not all attacks in Morocco.'),
        N('firewall',282,365,202,'Pare-feu','Firewall','Point d’entrée','Entry point','FW','dark','Le pare-feu matérialise le point d’entrée et le contrôle des flux.','The firewall represents the entry point and traffic control.'),
        N('honeypot',538,252,316,'Honeypot sur mesure','Custom honeypot','Services et CVE simulés','Simulated services and CVEs','HP','observe','Le service simulé permet d’examiner les interactions liées au scénario et aux CVE connues.','The simulated service lets us study interactions in the scenario and around known CVEs.'),
        N('internal',538,442,316,'Réseau interne','Internal network','Réseau simulé derrière le pare-feu','Simulated network behind firewall','LAN','plain','Un réseau interne simulé permet de représenter le parcours possible après l’entrée.','A simulated internal network represents a possible path after entry.'),
        N('collect',926,252,232,'Collecte','Collection','Événements · PCAP','Events · PCAPs','DB','plain','Journaux et traces réseau sont rassemblés pour analyser ce qui a effectivement été observé.','Logs and network traces are gathered to analyze what was actually observed.'),
        N('n8n',926,377,232,'n8n','n8n','Traitements CTI automatisés','Automated CTI processing','n8n','observe','n8n automatise le rapprochement et l’enrichissement de données CTI.','n8n automates CTI matching and enrichment.'),
        N('cti',926,502,232,'Interface CTI','CTI interface','Qualification et analyse','Triage and analysis','CTI','plain','L’interface rend les événements et leur contexte consultables.','The interface makes events and their context explorable.')
      ],
      edges:[
        E('M305 80 H342'),E('M617 80 H654'),E('M792 125 V252'),
        E('M238 410 H282','hostile'),E('M484 410 H505 V297 H538','hostile'),
        E('M484 410 H505 V487 H538'),
        E('M854 297 H926','telemetry'),E('M854 487 H891 V297 H926','telemetry'),
        E('M1042 342 V377','telemetry'),E('M1042 467 V502','telemetry')
      ],
      caption:P('T-Pot étudié → limites identifiées → capteur adapté ; les pointillés turquoise montrent la télémétrie.','T-Pot reviewed → gaps identified → tailored sensor; turquoise dashed lines show telemetry.')
    },
    '02': {
      title:P('Datacenter · plan du laboratoire VMware','Datacenter · VMware lab plan'),
      zones:[Z(18,64,260,544,'Conception','Design'),Z(300,64,574,544,'Laboratoire VMware','VMware lab'),Z(896,64,286,544,'Validation prévue','Planned validation','planned')],
      nodes:[
        N('scenario',38,235,220,'Scénario','Scenario','Entreprise fictive','Fictional company','01','plain','Le scénario décrit les services et leurs dépendances avant le montage.','The scenario defines services and dependencies before the build.'),
        N('vmware',326,139,238,'VMware Workstation','VMware Workstation','Socle de la maquette','Lab platform','VM','plain','Les machines et réseaux sont préparés progressivement dans VMware Workstation Pro.','Machines and networks are gradually prepared in VMware Workstation Pro.'),
        N('networks',604,139,244,'Réseaux virtuels','Virtual networks','Isolation en construction','Isolation in progress','NET','observe','La segmentation du laboratoire reste en construction et doit être testée.','Lab segmentation is still being built and needs testing.'),
        N('vms',326,365,238,'Machines virtuelles','Virtual machines','Services simulés','Simulated services','VM','plain','Les VMs représentent les services de l’entreprise fictive.','The VMs represent the fictional company’s services.'),
        N('dependencies',604,365,244,'Dépendances','Dependencies','Points uniques à repérer','Single points to identify','↔','plain','L’objectif est d’identifier ce qui devient indisponible quand un composant tombe.','The aim is to identify what fails when a component goes down.'),
        N('failures',922,139,232,'Tests de panne','Failure tests','Bascule à mesurer','Failover to measure','!','planned','Les coupures et temps de bascule ne sont pas encore publiés comme résultats.','Failures and failover times are not yet published as results.'),
        N('recovery',922,365,232,'Reprise / PRA','Recovery / DR','Vérification à venir','Validation pending','DR','planned','La reprise doit être vérifiée après construction de la maquette complète.','Recovery must be checked after the full lab is built.')
      ],
      edges:[E('M258 280 H326'),E('M564 184 H604'),E('M445 229 V365'),E('M564 410 H604'),E('M848 184 H922','planned'),E('M848 410 H922','planned'),E('M1038 229 V365','planned')],
      caption:P('Schéma de travail. Les blocs et traits pointillés indiquent ce qui reste à valider ; aucune HA mesurée n’est revendiquée.','Working plan. Dashed blocks and lines are pending validation; no measured HA result is claimed.')
    },
    '03': {
      title:P('Zero Trust · zones et visibilité','Zero Trust · zones and visibility'),
      zones:[Z(18,64,265,544,'Accès','Access'),Z(306,64,550,544,'Contrôle et segmentation','Control and segmentation'),Z(880,64,302,544,'Observation','Observation','observe')],
      nodes:[
        N('remote',38,165,225,'Accès distant','Remote access','OpenVPN avec MFA','OpenVPN with MFA','VPN','plain','Les droits VPN et la vérification MFA limitent les accès distants.','VPN permissions and MFA constrain remote access.'),
        N('users',38,365,225,'Utilisateurs','Users','Réseaux locaux','Local networks','LAN','plain','Les profils utilisateurs, administration et invités sont séparés.','User, administrator and guest groups are separated.'),
        N('firewall',332,265,238,'OPNsense','OPNsense','Règles inter-zones','Inter-zone rules','FW','dark','Le pare-feu applique les règles entre zones ; les exceptions ont été vérifiées.','The firewall applies inter-zone rules; exceptions were checked.'),
        N('lan',606,145,222,'LAN / administration','LAN / administration','Segments distincts','Separate segments','LAN','plain','La séparation réduit les accès transversaux dans la maquette.','Segmentation reduces cross-zone access in the lab.'),
        N('dmz',606,365,222,'DMZ / invités','DMZ / guests','Accès ciblés','Targeted access','DMZ','plain','Les services exposés et les invités ont des droits distincts.','Exposed services and guests have distinct access rights.'),
        N('suricata',902,145,252,'Suricata','Suricata','Détection sur copie','Detection on traffic copy','IDS','observe','Suricata détecte ici ; aucun blocage automatique n’est démontré.','Suricata detects here; automatic blocking is not demonstrated.'),
        N('wazuh',902,365,252,'Wazuh + journaux','Wazuh + logs','Corrélation des traces','Trace correlation','LOG','observe','Wazuh rassemble les journaux pour comprendre les événements.','Wazuh collects logs to investigate events.')
      ],
      edges:[E('M263 210 H292 V310 H332'),E('M263 410 H292 V310 H332'),E('M570 310 H588 V190 H606'),E('M570 310 H588 V410 H606'),E('M828 190 H902','telemetry'),E('M828 410 H902','telemetry'),E('M1028 235 V365','telemetry')],
      caption:P('Squid contrôle les sorties Web ; Suricata détecte et Wazuh centralise les journaux. Une maquette Zero Trust ne prouve pas une sécurité totale.','Squid controls web egress; Suricata detects and Wazuh centralizes logs. A Zero Trust lab does not prove complete security.')
    },
    '04': {
      title:P('WAN hybride · routage, tunnels et tests','Hybrid WAN · routing, tunnels and tests'),
      zones:[Z(18,64,272,544,'Sites EVE-NG','EVE-NG sites'),Z(314,64,272,544,'Transport','Transport'),Z(610,64,272,544,'Politiques WAN','WAN policies'),Z(906,64,276,544,'Vérification','Verification','observe')],
      nodes:[
        N('hub',40,150,226,'Hub','Hub','Site central simulé','Simulated central site','HUB','plain','Le hub fournit un point central dans la maquette multi-sites.','The hub is the central point in the multi-site lab.'),
        N('branch',40,360,226,'Sites distants','Remote sites','Postes et passerelles','Clients and gateways','SITE','plain','Les sites distants servent aux vérifications de connectivité.','Remote sites provide the endpoints for connectivity checks.'),
        N('mpls',336,150,226,'MPLS / LDP','MPLS / LDP','Transport configuré','Configured transport','MPLS','plain','Le transport MPLS et LDP est préparé dans EVE-NG.','MPLS transport and LDP were prepared in EVE-NG.'),
        N('bgp',336,360,226,'BGP','BGP','Échanges de routes','Route exchange','BGP','plain','Les paramètres BGP sont configurés sur les routeurs et FortiGate.','BGP settings are configured on routers and FortiGate.'),
        N('sdwan',632,150,226,'FortiGate SD-WAN','FortiGate SD-WAN','Zones et politiques','Zones and policies','FG','dark','Les zones et politiques sélectionnent les liens selon la configuration du lab.','Zones and policies select links according to the lab configuration.'),
        N('ipsec',632,360,226,'Tunnels IPsec','IPsec tunnels','Paramètres documentés','Settings documented','VPN','plain','Les paramètres des tunnels sont documentés ; leur résilience n’est pas mesurée ici.','Tunnel settings are documented; their resilience is not measured here.'),
        N('icmp',928,150,226,'Tests ICMP','ICMP tests','Connectivité observée','Observed connectivity','OK','observe','Les captures montrent des réponses ping vers les cibles testées.','Screenshots show ping responses for the tested targets.'),
        N('failover',928,360,226,'Basculement','Failover','Mesure non publiée','Measurement not published','?','planned','La convergence automatique MPLS/Internet reste un objectif à tester.','Automatic MPLS/Internet convergence remains to be tested.')
      ],
      edges:[E('M266 195 H336'),E('M266 405 H336'),E('M562 195 H632'),E('M562 405 H632'),E('M858 195 H928'),E('M858 405 H928','planned'),E('M745 240 V360')],
      caption:P('Configurations et pings documentés. Le basculement automatique n’a pas de résultat mesuré publié.','Configuration and pings are documented. Automatic failover has no published measurement.')
    },
    '05': {
      title:P('Active Directory · audit, détection et correction','Active Directory · audit, detection and remediation'),
      zones:[Z(18,64,254,544,'Cas client simulé','Simulated client case'),Z(296,64,254,544,'Audit et observation','Audit and observation','observe'),Z(574,64,608,544,'Décision et correction','Decision and remediation')],
      nodes:[
        N('domain',40,255,210,'Domaine AD','AD domain','Proxmox · DNS · postes','Proxmox · DNS · clients','AD','plain','La maquette reproduit un cas client, sans exposer ses données réelles.','The lab simulates a client case without exposing real client data.'),
        N('audit',318,145,210,'PingCastle','PingCastle','Audit initial · 95/100','Initial audit · 95/100','95','risk','L’audit initial sert à prioriser les écarts de configuration.','The initial audit helps prioritize configuration weaknesses.'),
        N('wazuh',318,365,210,'Wazuh + Sysmon','Wazuh + Sysmon','Tests d’alerte contrôlés','Controlled alert tests','SOC','observe','Des scénarios autorisés vérifient la visibilité des événements et alertes.','Authorized scenarios verify event and alert visibility.'),
        N('impact',598,145,248,'Analyse d’impact','Impact assessment','Usages et dépendances','Usage and dependencies','?','plain','Les conséquences système sont évaluées avant tout durcissement.','System consequences are assessed before hardening.'),
        N('fix',902,145,248,'Corrections','Remediation','PowerShell ou AD/GPO','PowerShell or AD/GPO','PS','dark','Les changements ciblés sont faits en PowerShell ou dans les consoles selon leur impact.','Targeted changes are applied in PowerShell or consoles according to impact.'),
        N('retest',902,365,248,'Nouvel audit','Follow-up audit','PingCastle · 20/100','PingCastle · 20/100','20','observe','Le nouvel audit montre une baisse du score de risque en laboratoire ; des écarts restent possibles.','The follow-up audit shows a lower lab risk score; findings can remain.')
      ],
      edges:[E('M250 300 H282 V190 H318'),E('M250 300 H282 V410 H318','telemetry'),E('M528 190 H598'),E('M528 410 H561 V270 H722 V235','telemetry'),E('M846 190 H902'),E('M1026 235 V365')],
      caption:P('95 → 20 dans la maquette PingCastle. Ce score de risque n’est pas un pourcentage de sécurité et ne concerne pas un AD de production.','95 → 20 in the PingCastle lab. This risk score is not a security percentage and does not describe a production AD.')
    },
    '06': {
      title:P('DFIR · recoupement des traces','DFIR · cross-checking evidence'),
      zones:[Z(18,64,258,544,'Signalement','Initial signal','hostile'),Z(300,64,550,544,'Investigation','Investigation'),Z(874,64,308,544,'Décision','Decision','observe')],
      nodes:[
        N('host',40,255,214,'Poste Windows','Windows device','Ralentissements et trafic','Slowdowns and traffic','PC','risk','Les anomalies après l’installation d’un logiciel ont déclenché l’enquête.','Anomalies after software installation triggered the investigation.'),
        N('system',326,145,232,'Analyse système','System analysis','Services et démarrage','Services and startup','SYS','plain','Les services, processus et points de démarrage ont été examinés.','Services, processes and startup points were examined.'),
        N('network',326,365,232,'Analyse réseau','Network analysis','Connexions et PCAP','Connections and PCAPs','NET','plain','Les connexions et captures Wireshark ont été recoupées avec le système.','Connections and Wireshark captures were cross-checked with system evidence.'),
        N('correlate',594,255,232,'Corrélation','Correlation','Artefacts et indicateurs','Artifacts and indicators','IOC','observe','Les indicateurs confirment la persistance observée, sans prétendre voir tout le trafic.','Indicators support the observed persistence without claiming complete network visibility.'),
        N('cleanup',900,145,254,'Nettoyage ciblé','Targeted cleanup','Service et fichiers','Service and files','FIX','dark','Un nettoyage contrôlé du service et des fichiers a été effectué.','Controlled cleanup of the service and files was performed.'),
        N('verify',900,365,254,'Vérifications','Checks','Réinstallation conseillée','Reinstall recommended','OK','planned','Aucun indicateur connu n’a été retrouvé avec les contrôles réalisés ; une réinstallation reste recommandée.','No known indicator was found in performed checks; a reinstall remains recommended.')
      ],
      edges:[E('M254 300 H286 V190 H326'),E('M254 300 H286 V410 H326'),E('M558 190 H576 V300 H594'),E('M558 410 H576 V300 H594','telemetry'),E('M826 300 H858 V190 H900'),E('M1027 235 V365')],
      caption:P('Investigation et nettoyage réalisés ; la réinstallation complète est une recommandation, pas une action revendiquée.','Investigation and cleanup were performed; a full reinstall is recommended, not claimed as completed.')
    },
    'taounate': {
      title:P('Province de Taounate · maintenance réseau','Province of Taounate · network support'),
      zones:[Z(18,64,292,544,'Postes de travail','Workstations'),Z(354,64,280,544,'Réseau local','Local network'),Z(678,64,504,290,'Services','Services')],
      nodes:[
        N('workstations',42,255,244,'Postes Windows','Windows devices','Maintenance des postes','Workstation maintenance','PC','plain','J’ai participé à la maintenance des postes de travail Windows.','I helped maintain Windows workstations.'),
        N('lan',378,255,232,'Réseau local','Local network','Suivi au quotidien','Daily support','LAN','dark','Le réseau local était le point central du suivi de connectivité.','The local network was central to connectivity support.'),
        N('ad',704,128,220,'Active Directory','Active Directory','Environnement géré','Managed environment','AD','plain','J’ai contribué au suivi d’un environnement Active Directory.','I contributed to supporting an Active Directory environment.'),
        N('services',948,128,210,'Services réseau','Network services','Gestion et suivi','Management and support','NET','plain','Les services réseau faisaient partie du périmètre de stage.','Network services were part of the internship scope.'),
        N('incident',378,485,232,'Incident','Incident','Problème de connexion','Connection issue','!','risk','Un incident de connectivité déclenchait une recherche de cause.','A connectivity incident led to investigating the cause.'),
        N('diagnosis',704,485,232,'Diagnostic','Diagnosis','Cause recherchée','Cause investigated','?','observe','J’ai participé au diagnostic des problèmes de connexion.','I helped diagnose connectivity issues.')
      ],
      edges:[E('M286 300 H378'),E('M610 300 H656 V173 H704'),E('M610 300 H656 V173 H948'),E('M494 485 V345','hostile'),E('M610 530 H704','telemetry')],
      caption:P('Maintenance courante et traitement des incidents de connectivité. Le dessin simplifie l’environnement, sans nombre de postes revendiqué.','Routine maintenance and connectivity troubleshooting. The drawing simplifies the environment without claiming a device count.')
    }
  };

  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = (pair, lang) => pair[lang === 'en' ? 1 : 0];
  function wrap(text, max) {
    const out=[''];
    for (const word of text.split(' ')) {
      const i=out.length-1, next=out[i] ? out[i]+' '+word : word;
      if (next.length>max && out[i]) out.push(word); else out[i]=next;
    }
    return out.slice(0,2);
  }
  function lineText(text, x, y, max, step=17) {
    return wrap(text,max).map((line,i)=>`<tspan x="${x}" y="${y+i*step}">${esc(line)}</tspan>`).join('');
  }
  function zone(z,lang) {
    return `<g class="arch-zone arch-zone-${z.kind}"><rect x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="16"/><text x="${z.x+20}" y="${z.y+31}">${esc(t(z.name,lang))}</text></g>`;
  }
  function node(n,lang,index) {
    const title=t(n.name,lang), detail=t(n.sub,lang), why=t(n.why,lang);
    const maxTitle=Math.floor((n.w-83)/8.6), maxDetail=Math.floor((n.w-35)/7.1);
    return `<g class="arch-card arch-card-${n.kind}" data-arch-detail="${esc(why)}" role="button" tabindex="0" aria-label="${esc(title)} : ${esc(why)}" transform="translate(${n.x} ${n.y})">
      <rect class="arch-card-face" width="${n.w}" height="90" rx="10"/>
      <circle class="arch-icon-disc" cx="29" cy="34" r="21"/><text class="arch-icon" x="29" y="39" text-anchor="middle">${esc(n.icon)}</text>
      <text class="arch-title">${lineText(title,60,40,maxTitle)}</text>
      <text class="arch-sub">${lineText(detail,17,70,maxDetail)}</text>
      <circle class="arch-step-disc" cx="0" cy="0" r="13"/><text class="arch-step" x="0" y="4" text-anchor="middle">${String(index+1).padStart(2,'0')}</text>
    </g>`;
  }
  function edge(e,lang,number) {
    return `<path class="arch-edge arch-edge-${e.kind}" d="${e.d}" marker-end="url(#arch-arrow-${number}-${e.kind})"/>`+
      (e.label ? `<text class="arch-edge-label" x="${e.lx}" y="${e.ly}">${esc(t(e.label,lang))}</text>` : '');
  }
  function render(number,lang) {
    const d=diagrams[number];
    if(!d) return '';
    const title=t(d.title,lang), hint=lang==='en'?'Select a component to see why it is here.':'Cliquez sur un élément du schéma pour comprendre pourquoi il est là.';
    return `<figure class="architecture-visual">
      <div class="architecture-topline"><span>${esc(title)}</span><span class="architecture-kind">${lang==='en'?'INTERACTIVE DIAGRAM':'SCHÉMA INTERACTIF'}</span></div>
      <div class="architecture-scroll" role="region" tabindex="0" aria-label="${esc(title)}">
        <svg class="architecture-svg" viewBox="0 0 1200 635" role="group" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">
          <defs>${['flow','hostile','telemetry','planned'].map(k=>`<marker id="arch-arrow-${number}-${k}" class="arch-marker-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z"/></marker>`).join('')}</defs>
          ${d.zones.map(z=>zone(z,lang)).join('')}
          <g class="arch-edges">${d.edges.map(e=>edge(e,lang,number)).join('')}</g>
          ${d.nodes.map((n,i)=>node(n,lang,i)).join('')}
        </svg>
      </div>
      <div class="architecture-guide" aria-live="polite" data-default="${esc(hint)}">${esc(hint)}</div>
      <figcaption><span>${esc(t(d.caption,lang))}</span><span class="architecture-legend"><i class="legend-hostile"></i>${lang==='en'?'Hostile traffic':'Trafic hostile'} <i class="legend-flow"></i>${lang==='en'?'Flow':'Flux'} <i class="legend-telemetry"></i>${lang==='en'?'Telemetry / planned':'Télémétrie / prévu'}</span></figcaption>
    </figure>`;
  }
  window.renderPortfolioArchitecture=render;
})();
