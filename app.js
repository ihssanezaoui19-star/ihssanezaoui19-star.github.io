const github = 'https://github.com/ihssanezaoui19-star';

const projects = [
  {
    number: '01', title: 'Honeypot sur mesure & interface CTI', short: 'PFE : observer des attaques visant des services simulés au Maroc et suivre la chaîne complète dans une maquette.',
    type: 'PFE · Stage 2026', status: 'Travail réalisé', categories: ['SOC', 'Blue Team'], color: 'mint',
    tags: ['Honeypot sur mesure', 'CTI', 'n8n'],
    problem: 'Nous voulions comprendre les attaques observées au Maroc sur des services proches de ceux d’une entreprise ou d’un client : quels services sont visés, quelles étapes suit une tentative et quand une vulnérabilité connue commence à attirer des attaques dans notre environnement. Les capteurs T-Pot testés au départ ne représentaient pas assez précisément ces scénarios ni le parcours après un premier accès.',
    objective: 'Construire un environnement d’observation adapté : simuler un service client et un réseau interne derrière un pare-feu, suivre les traces réseau et les événements, rapprocher les tentatives de CVE connues, puis rendre l’ensemble analysable dans une interface CTI.',
    architecture: ['Services et réseau d’entreprise simulés', 'Pare-feu et honeypot sur mesure', 'Traces réseau, PCAP et journaux', 'Interface CTI et automatisation n8n'],
    tools: 'Proxmox, Linux, pare-feu, T-Pot / Cowrie évalués au départ, honeypot développé pour le cas d’usage, analyse PCAP, Elasticsearch / Kibana, interface CTI et n8n.',
    work: 'Nous avons commencé par étudier les outils et déployer T-Pot, puis identifié ses limites pour notre question de recherche. Nous avons créé notre propre honeypot capable de simuler un service client, préparé une maquette avec pare-feu et réseau interne, et utilisé des scénarios contrôlés autour de vulnérabilités connues pour observer les étapes d’une attaque. J’ai contribué à l’architecture, au déploiement, à l’analyse du trafic et des PCAP, au développement de l’interface CTI et à l’automatisation des traitements avec n8n.',
    outcome: 'Cette approche a donné une vue adaptée aux services simulés : des événements collectés et rapprochés dans une interface CTI. Le rapprochement entre une CVE et la première tentative visible sur le capteur était une question étudiée ; aucun délai chiffré ni mesure représentative de toutes les attaques au Maroc n’est publié.',
    evidence: 'Synthèse et méthodologie publiques ; données d’attaque, code du PFE et rapport interne non disponibles dans les dépôts accessibles.',
    url: 'https://github.com/ihssanezaoui19-star/ihssanezaoui19-star.github.io/tree/main/projects/honeypot-cti'
  },
  {
    number: '02', title: 'Datacenter virtualisé & haute disponibilité', short: 'Laboratoire en cours : simuler une infrastructure d’entreprise et préparer des tests de disponibilité.',
    type: 'Laboratoire personnel', status: 'En cours', categories: ['Infrastructure', 'Sécurité réseau'], color: 'blue',
    tags: ['VMware Workstation Pro', 'Virtualisation', 'PRA'],
    problem: 'Dans une infrastructure centralisée, une panne d’hôte, de service ou de liaison peut rendre plusieurs ressources indisponibles. Le projet cherche à comprendre, dans un environnement virtualisé à coût maîtrisé, quels points restent uniques et comment organiser l’isolation, la supervision et la reprise.',
    objective: 'Dessiner une architecture de datacenter fictif, répartir les services sur des réseaux virtuels, définir les dépendances et préparer des scénarios de panne pour vérifier ensuite la disponibilité et le PRA.',
    architecture: ['Laboratoire VMware', 'Réseaux virtuels isolés', 'Services virtualisés', 'Supervision / reprise visées'],
    tools: 'VMware Workstation Pro ; composants réseau et systèmes définis au fil du laboratoire.',
    work: 'J’ai rédigé le scénario de l’entreprise fictive et esquissé l’architecture réseau, les services et les scénarios de défaillance. Dans VMware Workstation Pro, je construis progressivement les machines et réseaux virtuels nécessaires aux tests de segmentation, de supervision et de reprise.',
    outcome: 'Le cas d’usage et le plan de laboratoire sont définis ; le déploiement et les validations progressent. Les essais de bascule et de PRA n’ont pas encore produit un résultat final à présenter, et cette maquette ne représente pas une infrastructure de production.',
    evidence: 'Plan de laboratoire et méthode documentés ; captures de bascule et mesures PRA à ajouter après les essais.',
    url: 'https://github.com/ihssanezaoui19-star/ihssanezaoui19-star.github.io/tree/main/projects/datacenter-virtualise'
  },
  {
    number: '03', title: 'Architecture réseau & démarche Zero Trust', short: 'Laboratoire documenté : limiter les accès entre zones, vérifier le VPN et réunir les alertes.',
    type: 'Étude de cas · 2026', status: 'Laboratoire documenté', categories: ['Sécurité réseau', 'SOC', 'Infrastructure'], color: 'gold',
    tags: ['OPNsense', 'Suricata', 'Wazuh'],
    problem: 'Dans le scénario d’entreprise simulée, les utilisateurs, l’administration, les invités et les services exposés ne devaient pas partager les mêmes droits d’accès. Sans séparation claire, filtrage des sorties et journaux communs, un incident dans une zone serait plus difficile à contenir et à retracer.',
    objective: 'Définir des zones et des règles de circulation explicites, imposer un accès distant vérifié, contrôler les sorties Web et réunir les traces du pare-feu, du proxy et des capteurs pour l’analyse.',
    architecture: ['Segments LAN / DMZ / invités', 'OPNsense + VPN', 'Suricata et proxy', 'Journaux centralisés Wazuh'],
    tools: 'OPNsense, OpenVPN, Squid, Suricata, Wazuh, VMware.',
    work: 'J’ai conçu les segments LAN, utilisateurs, administration, invités et DMZ ; configuré OPNsense et des règles inter-zones ; mis en place un accès OpenVPN avec MFA, un proxy Squid, Suricata en mode détection et la collecte des journaux dans Wazuh.',
    outcome: 'Le rapport montre des paramètres de segmentation, de proxy, de VPN et de supervision ainsi qu’un refus d’accès Web observé. Des écarts ont été trouvés puis corrigés sur les règles d’accès et la détection. Cette démarche ne prouve pas que la maquette est entièrement sécurisée : d’autres personnes peuvent relever des failles que je n’ai pas vues. Suricata fonctionne ici en détection par copie du trafic ; aucune réponse automatisée mesurée n’est démontrée.',
    evidence: 'README et méthodologie anonymisés, schéma et capture recadrée sur GitHub ; le README invite aux retours et signalements de failles. Le rapport d’origine, déjà présent dans ce dépôt, porte une mention de confidentialité et nécessite une revue séparée.',
    url: 'https://github.com/ihssanezaoui19-star/Architecture-R-seau-S-curis-e-'
  },
  {
    number: '04', title: 'WAN hybride MPLS & SD-WAN', short: 'Maquette multi-sites : associer routage, tunnels IPsec et politiques de sélection des liens.',
    type: 'Projet académique · 2024–2025', status: 'Laboratoire réalisé', categories: ['Sécurité réseau', 'Infrastructure'], color: 'blue',
    tags: ['EVE-NG', 'FortiGate', 'Cisco'],
    problem: 'Une entreprise multi-sites doit maintenir les échanges lorsque les chemins WAN présentent des qualités différentes, tout en protégeant les communications. Le laboratoire devait montrer comment articuler routage interne et externe, tunnels et sélection de liens.',
    objective: 'Simuler plusieurs sites et deux transports, préparer des tunnels IPsec, configurer des zones SD-WAN et vérifier d’abord les échanges de base avant d’étudier les pannes.',
    architecture: ['Hub et sites EVE-NG', 'Routeurs MPLS/LDP', 'BGP et FortiGate SD-WAN', 'Tunnels IPsec configurés'],
    tools: 'EVE-NG, FortiGate, Cisco vIOS, MPLS/LDP, BGP, IPsec. OSPF étudié dans l’état de l’art.',
    work: 'En binôme, nous avons conçu la maquette multi-sites, préparé le transport MPLS, configuré des paramètres BGP sur les routeurs et FortiGate, créé des zones SD-WAN et documenté les configurations IPsec. Le rapport présente ensuite des tests ping entre postes, passerelles et routeurs.',
    outcome: 'Les captures montrent la configuration de la topologie et des réponses ICMP pour les cibles testées. Le basculement automatique entre MPLS et Internet reste un objectif : le rapport ne mesure ni panne simulée, ni temps de convergence, ni disponibilité applicative.',
    evidence: 'README, méthodologie et schéma anonymisés dans le dépôt académique ; la capture de zone SD-WAN ne contient pas les adresses ni la clé de laboratoire.',
    url: 'https://github.com/ihssanezaoui19-star/Hybrid-SD-WAN-MPLS-Architecture-Deployment'
  },
  {
    number: '05', title: 'Audit AD d’un cas client simulé', short: 'Stage : auditer, superviser et durcir un domaine de laboratoire ; score PingCastle 95 → 20.',
    type: 'Stage · 2025', status: 'Travail réalisé', categories: ['Blue Team', 'SOC', 'Infrastructure'], color: 'mint',
    tags: ['Active Directory', 'PingCastle', 'Wazuh'],
    problem: 'Pour simuler le cas d’un client, nous avons monté un domaine Active Directory présentant des faiblesses de configuration. Il fallait montrer leurs conséquences, détecter les activités suspectes et réduire les risques tout en évaluant l’impact possible des changements sur les services.',
    objective: 'Auditer avec PingCastle, tester des scénarios d’intrusion autorisés dans la maquette, vérifier les alertes Wazuh/Sysmon, puis corriger après analyse des dépendances et comparer l’état avant et après.',
    architecture: ['Cas client simulé sur Proxmox', 'AD et audit PingCastle', 'Postes de test, Sysmon et Wazuh', 'Durcissement, GPO et nouvel audit'],
    tools: 'Proxmox, Windows Server 2022, Active Directory, DNS/DHCP, PingCastle, GPO, Wazuh, Sysmon.',
    work: 'J’ai travaillé sur la maquette AD, le choix de PingCastle et l’analyse des écarts. Nous avons installé les composants Wazuh, ses agents et Sysmon pour observer les journaux, configuré des règles, puis vérifié les alertes lors de tests contrôlés. Avant de durcir NTLM/SMB, les droits et les GPO, nous avons étudié les usages et les effets possibles ; les corrections ont été faites par PowerShell ou dans les consoles AD/GPO, avec des contrôles après changement.',
    outcome: 'Le rapport de stage montre un score de risque PingCastle passé de 95/100 à 20/100 dans cette maquette. Des écarts demeurent ; ce résultat n’est ni un pourcentage de sécurité ni la mesure d’un annuaire de production.',
    evidence: 'Le README, la méthodologie pas à pas, les commandes administratives et des captures de mitigation recadrées sont publiés sur GitHub. Le rapport brut, les noms, les comptes et les adresses restent privés.',
    url: 'https://github.com/ihssanezaoui19-star/ihssanezaoui19-star.github.io/tree/main/projects/audit-active-directory'
  },
  {
    number: '06', title: 'Investigation d’un poste Windows', short: 'Étude DFIR : comprendre une activité anormale et choisir une remédiation prudente.',
    type: 'Étude DFIR · 2026', status: 'Investigation réalisée', categories: ['Blue Team', 'SOC'], color: 'gold',
    tags: ['Wireshark', 'Sysinternals', 'DFIR'],
    problem: 'Un poste Windows présentait des ralentissements et du trafic inhabituel après installation d’un logiciel non vérifié. Un premier scan avait retiré certaines menaces, mais les anomalies persistaient.',
    objective: 'Croiser processus, connexions et artefacts pour déterminer si une persistance était présente et évaluer la fiabilité d’un nettoyage.',
    architecture: ['Observation du poste', 'Analyse processus et trafic', 'Vérification des artefacts', 'Décision de remédiation'],
    tools: 'Malwarebytes, Wireshark, Sysinternals, PowerShell, netstat, VirusTotal, YARA et Sigma.',
    work: 'J’ai examiné les résultats du scan initial, le service WeatherZero, les processus et points de démarrage, puis la configuration réseau et des captures Wireshark. J’ai recoupé les indicateurs et exécuté un nettoyage contrôlé du service et de ses fichiers, suivi de vérifications sur tâches, processus, registre et d’un nouveau scan.',
    outcome: 'La compromission était confirmée par un service persistant ; après nettoyage, aucun indicateur connu n’a été retrouvé avec les contrôles réalisés. Les captures réseau limitées n’ont pas montré de C2 actif. La réinstallation complète reste recommandée pour retrouver un poste fiable, sans être documentée comme effectuée.',
    evidence: 'README et méthodologie sur le dépôt DFIR, avec schéma de décision reconstruit. Aucun échantillon malveillant ajouté au portfolio.',
    url: 'https://github.com/ihssanezaoui19-star/DFIR-Compromised-System-Analysis-WeatherZero-Malware'
  }
];


const architectureDiagrams = {
'01': {note:'T-Pot et Cowrie ont été évalués au départ. Le schéma montre le dispositif sur mesure et les flux observés, pas une architecture de production.',enNote:'T-Pot and Cowrie were evaluated first. This diagram shows the custom lab and observed flows, not a production architecture.',nodes:[['Sources externes','Tentatives vers les services exposés','external','External sources','Attempts against exposed services'],['Pare-feu','Point de contrôle à l’entrée de la maquette','security','Firewall','Entry control for the lab'],['Honeypot sur mesure','Service client et scénarios autour de CVE connues','core','Custom honeypot','Simulated client service and known-CVE scenarios'],['Réseau interne simulé','Environnement représentatif derrière le point d’entrée','network','Simulated internal network','Representative environment behind the entry point'],['Collecte','Événements, journaux et traces PCAP','telemetry','Collection','Events, logs and PCAP traces'],['CTI + n8n','Enrichissement OSINT, qualification et scoring','telemetry','CTI + n8n','OSINT enrichment, triage and scoring']]},
'02': {note:'Laboratoire en cours sous VMware Workstation Pro. La supervision, les scénarios de panne et la reprise sont des objectifs à valider.',enNote:'Ongoing VMware Workstation Pro lab. Monitoring, failure scenarios and recovery are objectives still to be validated.',nodes:[['VMware Workstation Pro','Socle de virtualisation du laboratoire','core','VMware Workstation Pro','Virtualization platform for the lab'],['Réseaux virtuels','Segmentation et isolation en construction','network','Virtual networks','Segmentation and isolation under construction'],['Machines virtuelles','Services et systèmes simulés','network','Virtual machines','Simulated systems and services'],['Scénarios de panne','Dépendances et points uniques à tester','planned','Failure scenarios','Dependencies and single points of failure to test'],['Supervision / reprise','Objectifs de validation à venir','planned','Monitoring / recovery','Validation objectives for a later stage']]},
'03': {note:'Schéma logique simplifié. Suricata est utilisé en détection ; aucun blocage automatique n’est revendiqué.',enNote:'Simplified logical view. Suricata is used for detection; no automated blocking is claimed.',nodes:[['Zones réseau','LAN utilisateurs, administration, invités et DMZ','network','Network zones','User LAN, administration, guest and DMZ'],['OPNsense','Filtrage et règles inter-zones','security','OPNsense','Filtering and inter-zone rules'],['Accès distant','OpenVPN avec MFA','security','Remote access','OpenVPN with MFA'],['Contrôle et détection','Proxy Squid et Suricata en détection','telemetry','Control and detection','Squid proxy and Suricata detection'],['Wazuh','Centralisation et analyse des journaux','telemetry','Wazuh','Log centralization and analysis']]},
'04': {note:'La connectivité a été vérifiée par ICMP. Le basculement automatique MPLS / Internet reste un objectif non mesuré.',enNote:'Connectivity was checked with ICMP. Automatic MPLS / Internet failover remains an objective and was not measured.',nodes:[['Sites EVE-NG','Hub et sites distants simulés','network','EVE-NG sites','Simulated hub and remote sites'],['Transport MPLS','Routeurs et LDP','network','MPLS transport','Routers and LDP'],['Routage BGP','Échanges de routes configurés','security','BGP routing','Configured route exchange'],['FortiGate SD-WAN','Zones et politiques de sélection des liens','security','FortiGate SD-WAN','Zones and link-selection policies'],['Tunnels IPsec','Communications chiffrées configurées','telemetry','IPsec tunnels','Configured encrypted communications'],['Tests ICMP','Vérification de la connectivité','success','ICMP tests','Connectivity checks']]},
'05': {note:'Résultat mesuré dans la maquette de laboratoire : score PingCastle de 95/100 à 20/100. Ce score n’est pas un pourcentage de sécurité.',enNote:'Measured in the lab: PingCastle risk score decreased from 95/100 to 20/100. This is not a security percentage.',nodes:[['Proxmox','Environnement AD de laboratoire','core','Proxmox','Active Directory lab environment'],['Active Directory','Domaine, DNS / DHCP et postes de test','network','Active Directory','Domain, DNS / DHCP and test workstations'],['Audit initial','PingCastle : score 95/100','risk','Initial audit','PingCastle: score 95/100'],['Détection','Sysmon, agents et alertes Wazuh','telemetry','Detection','Sysmon, agents and Wazuh alerts'],['Remédiation','Analyse d’impact, PowerShell et GPO','security','Remediation','Impact analysis, PowerShell and GPOs'],['Nouvel audit','PingCastle : score 20/100','success','Follow-up audit','PingCastle: score 20/100']]},
'06': {note:'La réinstallation complète est une recommandation pour retrouver un poste fiable ; elle n’est pas présentée comme effectuée.',enNote:'A full reinstall is recommended to restore trust in the device; it is not presented as completed.',nodes:[['Poste Windows','Ralentissements et trafic inhabituel','risk','Windows workstation','Slowdowns and unusual traffic'],['Analyse système','Processus, services et démarrage avec Sysinternals','network','System analysis','Processes, services and startup with Sysinternals'],['Analyse réseau','Connexions et captures Wireshark','network','Network analysis','Connections and Wireshark captures'],['Corrélation','Vérification des artefacts et indicateurs','telemetry','Correlation','Cross-checking artifacts and indicators'],['Nettoyage contrôlé','Service et fichiers, puis contrôles complémentaires','security','Controlled cleanup','Service and files, followed by additional checks'],['Validation','Aucun indicateur connu retrouvé avec les contrôles réalisés','success','Validation','No known indicator found in the checks performed']]}
};
function renderArchitecture(number) {
 const diagram=architectureDiagrams[number];
 if(!diagram) return '';
 const nodes=diagram.nodes.map(function(node,index) {
  const title=language==='en'?(node[3]||node[0]):node[0];
  const detail=language==='en'?(node[4]||node[1]):node[1];
  return '<div class="arch-node '+node[2]+'"><span class="arch-node-index">'+String(index+1).padStart(2,'0')+'</span><strong>'+title+'</strong><small>'+detail+'</small></div>';
 }).join('<span class="arch-arrow" aria-hidden="true">→</span>');
 const note=language==='en'?diagram.enNote:diagram.note;
 return '<div class="architecture-visual" role="group" aria-label="'+(language==='en'?'Project architecture and flow':'Architecture et flux du projet')+'"><div class="architecture-flow">'+nodes+'</div><p class="architecture-note"><span aria-hidden="true">ⓘ</span> '+note+'</p></div>';
}

const grid = document.querySelector('#project-grid');
const counter = document.querySelector('#project-count');
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const dialogIndex = document.querySelector('#dialog-index');
const translations = window.portfolioTranslations;
const staticCopy = window.portfolioStaticEnglish.map(([selector, en]) => {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`Missing translation target: ${selector}`);
  return { element, fr: element.innerHTML, en };
});
const attributeCopy = window.portfolioAttributeEnglish.map(([selector, attribute, en]) => {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`Missing translation target: ${selector}`);
  return { element, attribute, fr: element.getAttribute(attribute), en };
});
const description = document.querySelector('meta[name="description"]');
const frenchDescription = description.content;
const frenchTitle = document.title;
const frenchContactLinks = [...document.querySelectorAll('a[href^="mailto:"]')].map(element => ({ element, href: element.href }));
let language = 'fr';
let activeFilter = 'Tous';
let lastTrigger;

function label(key) {
  return language === 'en' ? translations.ui[key] : {
    count: 'PROJETS', card: 'Voir le projet', cardAria: 'Voir le projet', project: 'PROJET',
    problem: 'Problématique', objective: 'Ce que je cherchais à corriger', architecture: 'Architecture',
    tools: 'Outils', work: 'Travail réalisé', outcome: 'Résultat observé',
    evidence: 'Preuves & liens', github: 'Voir le projet GitHub', docsNote: ''
  }[key];
}

function localized(project) {
  return language === 'en' ? { ...project, ...translations.projects[project.number] } : project;
}

function categoryName(category) {
  return language === 'en' ? translations.categories[category] : category;
}

function render(filter = activeFilter) {
  activeFilter = filter;
  const shown = projects.filter(project => filter === 'Tous' || project.categories.includes(filter));
  counter.textContent = `${String(shown.length).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')} ${label('count')}`;
  grid.replaceChildren(...shown.map(source => {
    const project = localized(source);
    const card = document.createElement('article');
    card.className = `project-card ${project.color}`;
    card.innerHTML = `<div class="card-top"><span class="card-number">${project.number} / 06</span><span class="card-status">${project.status}</span></div>
      <div class="card-emblem" aria-hidden="true"><span></span><i></i><b></b></div>
      <div class="card-body"><p class="card-type">${project.type}</p><h3>${project.title}</h3><p class="card-desc">${project.short}</p>
      <div class="card-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
      <button type="button" class="card-open" data-project="${project.number}" aria-label="${label('cardAria')} ${project.title}">${label('card')} <span aria-hidden="true">↗</span></button>`;
    return card;
  }));
}

function drawDialog(number) {
  const source = projects.find(item => item.number === number);
  if (!source) return;
  const project = localized(source);
  dialogIndex.textContent = `${label('project')} ${project.number} / 06`;
  dialogContent.innerHTML = `<div class="dialog-title-row"><p class="card-type">${project.type} <span class="sep">·</span> ${project.status}</p><h2 id="dialog-title">${project.title}</h2><div class="dialog-cats">${project.categories.map(c => `<span>${categoryName(c)}</span>`).join('')}</div></div>
    <div class="detail-block"><h3>${label('problem')}</h3><p>${project.problem}</p></div>
    <div class="detail-block"><h3>${label('objective')}</h3><p>${project.objective}</p></div>
    <div class="detail-block"><h3>${label('architecture')}</h3>${renderArchitecture(project.number)}<ol class="architecture architecture-summary">${project.architecture.map(step => '<li>' + step + '</li>').join('')}</ol></div>
    <div class="detail-columns"><div class="detail-block"><h3>${label('tools')}</h3><p>${project.tools}</p></div><div class="detail-block"><h3>${label('work')}</h3><p>${project.work}</p></div></div>
    <div class="detail-result"><h3>${label('outcome')}</h3><p>${project.outcome}</p></div>
    <div class="detail-evidence"><div><h3>${label('evidence')}</h3><p>${project.evidence}${language === 'en' ? ` ${label('docsNote')}` : ''}</p></div><a href="${project.url || github}" target="_blank" rel="noopener noreferrer">${project.url ? label('github') : 'GitHub'} ↗</a></div>`;
}

function openProject(number, trigger) {
  lastTrigger = trigger;
  dialog.dataset.project = number;
  drawDialog(number);
  dialog.showModal();
  document.body.classList.add('modal-open');
}

function setLanguage(next, remember = true) {
  language = next === 'en' ? 'en' : 'fr';
  document.documentElement.lang = language;
  document.title = language === 'en' ? 'Ihssane Zaoui — Networks & Cybersecurity' : frenchTitle;
  description.content = language === 'en'
    ? 'Ihssane Zaoui, network and cybersecurity engineer: SOC, Blue Team, network security and infrastructure projects.'
    : frenchDescription;
  for (const entry of staticCopy) entry.element.innerHTML = entry[language];
  for (const entry of attributeCopy) entry.element.setAttribute(entry.attribute, entry[language]);
  for (const { element, href } of frenchContactLinks) {
    element.href = language === 'en'
      ? 'mailto:ihssanezaoui19@gmail.com?subject=Network%20or%20cybersecurity%20opportunity'
      : href;
  }
  document.querySelectorAll('.language-switch button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  });
  render(activeFilter);
  if (dialog.open) drawDialog(dialog.dataset.project);
  if (remember) {
    try { localStorage.setItem('portfolio-language', language); } catch { /* Private browsing may block storage. */ }
  }
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(other => {
    const selected = other === button;
    other.classList.toggle('active', selected);
    other.setAttribute('aria-pressed', String(selected));
  });
  render(button.dataset.filter);
}));
document.querySelectorAll('.language-switch button').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
grid.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (button) openProject(button.dataset.project, button);
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastTrigger?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
let preferredLanguage = 'fr';
try { preferredLanguage = localStorage.getItem('portfolio-language') || 'fr'; } catch { /* French stays the default. */ }
setLanguage(preferredLanguage, false);
