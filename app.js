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
    number: '03', title: 'Architecture réseau segmentée & supervisée', short: 'Laboratoire documenté : cloisonner les zones, contrôler l’accès distant et réunir les alertes.',
    type: 'Étude de cas · 2026', status: 'Laboratoire documenté', categories: ['Sécurité réseau', 'SOC', 'Infrastructure'], color: 'gold',
    tags: ['OPNsense', 'Suricata', 'Wazuh'],
    problem: 'Dans le scénario d’entreprise simulée, les utilisateurs, l’administration, les invités et les services exposés ne devaient pas partager les mêmes droits d’accès. Sans séparation claire, filtrage des sorties et journaux communs, un incident dans une zone serait plus difficile à contenir et à retracer.',
    objective: 'Définir des zones et des règles de circulation explicites, imposer un accès distant vérifié, contrôler les sorties Web et réunir les traces du pare-feu, du proxy et des capteurs pour l’analyse.',
    architecture: ['Segments LAN / DMZ / invités', 'OPNsense + VPN', 'Suricata et proxy', 'Journaux centralisés Wazuh'],
    tools: 'OPNsense, OpenVPN, Squid, Suricata, Wazuh, VMware.',
    work: 'J’ai conçu les segments LAN, utilisateurs, administration, invités et DMZ ; configuré OPNsense et des règles inter-zones ; mis en place un accès OpenVPN avec MFA, un proxy Squid, Suricata en mode détection et la collecte des journaux dans Wazuh.',
    outcome: 'Le rapport montre des paramètres de segmentation, de proxy, de VPN et de supervision ainsi qu’un refus d’accès Web observé. Le README décrit des écarts trouvés puis corrigés sur les règles d’accès, les alertes et les signatures. Suricata fonctionne ici en détection par copie du trafic ; aucune couverture totale ni réponse automatisée mesurée n’est démontrée.',
    evidence: 'README et méthodologie anonymisés, schéma et capture recadrée sur GitHub. Le rapport d’origine, déjà présent dans ce dépôt, porte une mention de confidentialité et nécessite une revue séparée.',
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

const grid = document.querySelector('#project-grid');
const counter = document.querySelector('#project-count');
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const dialogIndex = document.querySelector('#dialog-index');
let lastTrigger;

function render(filter = 'Tous') {
  const shown = projects.filter(project => filter === 'Tous' || project.categories.includes(filter));
  counter.textContent = `${String(shown.length).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')} PROJETS`;
  grid.replaceChildren(...shown.map(project => {
    const card = document.createElement('article');
    card.className = `project-card ${project.color}`;
    card.innerHTML = `<div class="card-top"><span class="card-number">${project.number} / 06</span><span class="card-status">${project.status}</span></div>
      <div class="card-emblem" aria-hidden="true"><span></span><i></i><b></b></div>
      <div class="card-body"><p class="card-type">${project.type}</p><h3>${project.title}</h3><p class="card-desc">${project.short}</p>
      <div class="card-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
      <button type="button" class="card-open" data-project="${project.number}" aria-label="Voir le projet ${project.title}">Voir le projet <span aria-hidden="true">↗</span></button>`;
    return card;
  }));
}

function openProject(number, trigger) {
  const project = projects.find(item => item.number === number);
  if (!project) return;
  lastTrigger = trigger;
  dialogIndex.textContent = `PROJET ${project.number} / 06`;
  dialogContent.innerHTML = `<div class="dialog-title-row"><p class="card-type">${project.type} <span class="sep">·</span> ${project.status}</p><h2 id="dialog-title">${project.title}</h2><div class="dialog-cats">${project.categories.map(c => `<span>${c}</span>`).join('')}</div></div>
    <div class="detail-block"><h3>Problématique</h3><p>${project.problem}</p></div>
    <div class="detail-block"><h3>Ce que je cherchais à corriger</h3><p>${project.objective}</p></div>
    <div class="detail-block"><h3>Architecture</h3><ol class="architecture">${project.architecture.map(step => `<li>${step}</li>`).join('')}</ol></div>
    <div class="detail-columns"><div class="detail-block"><h3>Outils</h3><p>${project.tools}</p></div><div class="detail-block"><h3>Travail réalisé</h3><p>${project.work}</p></div></div>
    <div class="detail-result"><h3>Résultat observé</h3><p>${project.outcome}</p></div>
    <div class="detail-evidence"><div><h3>Preuves & liens</h3><p>${project.evidence}</p></div><a href="${project.url || github}" target="_blank" rel="noopener noreferrer">${project.url ? 'Voir le projet GitHub' : 'Profil GitHub'} ↗</a></div>`;
  dialog.showModal();
  document.body.classList.add('modal-open');
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(other => {
    const selected = other === button;
    other.classList.toggle('active', selected);
    other.setAttribute('aria-pressed', String(selected));
  });
  render(button.dataset.filter);
}));
grid.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (button) openProject(button.dataset.project, button);
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastTrigger?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
render();
