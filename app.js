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
    outcome: 'La chaîne d’analyse relie un service simulé, un événement horodaté, le trafic PCAP associé, le contexte d’une CVE éventuelle et l’interface CTI ; n8n automatise une partie du traitement. Les volumes d’événements, exemples de traces brutes et délais CVE ne sont pas publiés. Ce dispositif n’est pas représentatif de toutes les attaques au Maroc.',
    evidence: 'Schéma de méthode et documentation publics. Le code du honeypot, les workflows n8n, les données d’attaque, les captures de l’interface CTI et le rapport interne ne sont pas publiés.',
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

// Only files verified in the public repositories appear here. Reconstructed
// diagrams are labeled as such and are not presented as operational captures.
const evidenceMedia = {
  '01': [
    { repo: 'ihssanezaoui19-star.github.io', path: 'projects/honeypot-cti/images/parcours-observation.svg', fr: 'Parcours d’observation reconstruit', en: 'Reconstructed observation path', kind: 'diagram' }
  ],
  '02': [
    { repo: 'ihssanezaoui19-star.github.io', path: 'projects/datacenter-virtualise/images/architecture-en-cours.svg', fr: 'Architecture de travail en cours', en: 'Architecture plan in progress', kind: 'diagram' }
  ],
  '03': [
    { repo: 'Architecture-R-seau-S-curis-e-', path: 'images/capture-proxy-acces-refuse.png', fr: 'Capture anonymisée : accès Web refusé', en: 'Anonymized screenshot: denied Web access', kind: 'screenshot' },
    { repo: 'Architecture-R-seau-S-curis-e-', path: 'images/architecture-anonymisee.svg', fr: 'Architecture anonymisée reconstruite', en: 'Reconstructed anonymized architecture', kind: 'diagram' }
  ],
  '04': [
    { repo: 'Hybrid-SD-WAN-MPLS-Architecture-Deployment', path: 'images/capture-zone-sdwan.png', fr: 'Capture anonymisée : zone SD-WAN', en: 'Anonymized screenshot: SD-WAN zone', kind: 'screenshot' },
    { repo: 'Hybrid-SD-WAN-MPLS-Architecture-Deployment', path: 'images/topologie-anonymisee.svg', fr: 'Topologie multi-sites reconstruite', en: 'Reconstructed multi-site topology', kind: 'diagram' }
  ],
  '05': [
    { repo: 'ihssanezaoui19-star.github.io', path: 'projects/audit-active-directory/images/capture-wazuh-alerte.png', fr: 'Capture anonymisée : alerte Wazuh', en: 'Anonymized screenshot: Wazuh alert', kind: 'screenshot' },
    { repo: 'ihssanezaoui19-star.github.io', path: 'projects/audit-active-directory/images/capture-gpo-llmnr.png', fr: 'Capture anonymisée : GPO LLMNR', en: 'Anonymized screenshot: LLMNR GPO', kind: 'screenshot' },
    { repo: 'ihssanezaoui19-star.github.io', path: 'projects/audit-active-directory/images/score-avant-apres.svg', fr: 'Comparaison du score PingCastle', en: 'PingCastle score comparison', kind: 'diagram' }
  ],
  '06': [
    { repo: 'DFIR-Compromised-System-Analysis-WeatherZero-Malware', path: 'images/parcours-investigation.svg', fr: 'Parcours d’investigation reconstruit', en: 'Reconstructed investigation path', kind: 'diagram' }
  ]
};

function evidenceLinks(item) {
  const base = `https://github.com/ihssanezaoui19-star/${item.repo}/blob/main/${item.path}`;
  const src = item.repo === 'ihssanezaoui19-star.github.io'
    ? `./${item.path}`
    : `https://raw.githubusercontent.com/ihssanezaoui19-star/${item.repo}/main/${item.path}`;
  return { href: base, src };
}

function evidenceName(item) { return language === 'en' ? item.en : item.fr; }
function evidenceKind(item) {
  if (item.kind === 'screenshot') return language === 'en' ? 'Actual screenshot · anonymized' : 'Capture réelle · anonymisée';
  return language === 'en' ? 'Reconstructed diagram' : 'Schéma reconstruit';
}
function methodologyUrl(project) {
  return project.url.includes('/tree/main/')
    ? `${project.url.replace('/tree/main/', '/blob/main/')}/METHODOLOGIE.md`
    : `${project.url}/blob/main/METHODOLOGIE.md`;
}


function renderArchitecture(number) {
  return window.renderPortfolioArchitecture(number, language);
}

const provinceContent = document.querySelector('.internship-list li:nth-child(3) .internship-content');
const provinceDiagramButton = document.createElement('button');
provinceDiagramButton.type = 'button';
provinceDiagramButton.className = 'internship-diagram-trigger';
provinceDiagramButton.setAttribute('aria-expanded', 'false');
provinceDiagramButton.setAttribute('aria-controls', 'taounate-diagram');
const provinceDiagram = document.createElement('div');
provinceDiagram.id = 'taounate-diagram';
provinceDiagram.className = 'internship-diagram';
provinceDiagram.hidden = true;
provinceContent.append(provinceDiagramButton, provinceDiagram);
provinceDiagramButton.addEventListener('click', () => {
  provinceDiagram.hidden = !provinceDiagram.hidden;
  provinceDiagramButton.setAttribute('aria-expanded', String(!provinceDiagram.hidden));
  if (!provinceDiagram.hidden) provinceDiagram.innerHTML = renderArchitecture('taounate');
});
function showDiagramExplanation(target) {
  const card = target.closest('[data-arch-detail]');
  if (!card) return false;
  const guide = card.closest('.architecture-visual')?.querySelector('.architecture-guide');
  if (guide) guide.textContent = card.getAttribute('data-arch-detail');
  return true;
}
document.addEventListener('click', event => showDiagramExplanation(event.target));
document.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('[data-arch-detail]')) {
    event.preventDefault();
    showDiagramExplanation(event.target);
  }
});

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
    const preview = evidenceMedia[source.number][0];
    const previewLinks = evidenceLinks(preview);
    const card = document.createElement('article');
    card.className = `project-card ${project.color}${source.number === '01' ? ' featured' : ''}`;
    card.innerHTML = `<div class="card-top"><span class="card-number">${project.number} / 06</span><span class="card-status">${project.status}</span></div>
      <div class="card-emblem" aria-hidden="true"><span></span><i></i><b></b></div>
      <div class="card-body"><p class="card-type">${project.type}</p><h3>${project.title}</h3><p class="card-desc">${project.short}</p>
      <div class="card-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <a class="card-evidence-preview" href="${previewLinks.href}" target="_blank" rel="noopener noreferrer"><img src="${previewLinks.src}" alt="" loading="lazy"><span><small>${evidenceKind(preview)}</small><strong>${evidenceName(preview)} ↗</strong></span></a></div>
      <button type="button" class="card-open" data-project="${project.number}" aria-label="${label('cardAria')} ${project.title}">${label('card')} <span aria-hidden="true">↗</span></button>`;
    return card;
  }));
}

function drawDialog(number) {
  const source = projects.find(item => item.number === number);
  if (!source) return;
  const project = localized(source);
  const gallery = evidenceMedia[number].map(item => {
    const links = evidenceLinks(item);
    return `<a class="evidence-tile" href="${links.href}" target="_blank" rel="noopener noreferrer"><img src="${links.src}" alt="${evidenceName(item)}" loading="lazy"><span class="evidence-kind">${evidenceKind(item)}</span><strong>${evidenceName(item)} ↗</strong></a>`;
  }).join('');
  dialogIndex.textContent = `${label('project')} ${project.number} / 06`;
  dialogContent.innerHTML = `<div class="dialog-title-row"><p class="card-type">${project.type} <span class="sep">·</span> ${project.status}</p><h2 id="dialog-title">${project.title}</h2><div class="dialog-cats">${project.categories.map(c => `<span>${categoryName(c)}</span>`).join('')}</div></div>
    <div class="detail-block"><h3>${label('problem')}</h3><p>${project.problem}</p></div>
    <div class="detail-block"><h3>${label('objective')}</h3><p>${project.objective}</p></div>
    <div class="detail-block"><h3>${label('architecture')}</h3>${renderArchitecture(project.number)}</div>
    <div class="detail-columns"><div class="detail-block"><h3>${label('tools')}</h3><p>${project.tools}</p></div><div class="detail-block"><h3>${label('work')}</h3><p>${project.work}</p></div></div>
    <div class="detail-result"><h3>${label('outcome')}</h3><p>${project.outcome}</p></div>
    <div class="detail-evidence"><div><h3>${label('evidence')}</h3><p>${project.evidence}${language === 'en' ? ` ${label('docsNote')}` : ''}</p></div><div class="evidence-doc-links"><a href="${methodologyUrl(source)}" target="_blank" rel="noopener noreferrer">${language === 'en' ? 'Read the methodology' : 'Lire la méthodologie'} ↗</a><a href="${project.url || github}" target="_blank" rel="noopener noreferrer">${project.url ? label('github') : 'GitHub'} ↗</a></div></div>
    <div class="evidence-gallery" aria-label="${language === 'en' ? 'Available visual evidence' : 'Éléments visuels disponibles'}">${gallery}</div>`;
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
  document.title = language === 'en' ? 'Ihssane Zaoui — Networks, Systems & Cybersecurity' : frenchTitle;
  description.content = language === 'en'
    ? 'Ihssane Zaoui, network and systems engineer: systems administration, network security, defensive cybersecurity and documented projects.'
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
  provinceDiagramButton.textContent = language === 'en' ? 'View the internship diagram ↗' : 'Voir le schéma du stage ↗';
  if (!provinceDiagram.hidden) provinceDiagram.innerHTML = renderArchitecture('taounate');
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
document.querySelector('.hero-art').addEventListener('click', event => {
  const button = event.target.closest('[data-hero-project]');
  if (button) openProject(button.dataset.heroProject, button);
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastTrigger?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
let preferredLanguage = 'fr';
try { preferredLanguage = localStorage.getItem('portfolio-language') || 'fr'; } catch { /* French stays the default. */ }
setLanguage(preferredLanguage, false);


