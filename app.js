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
    outcome: 'Cette approche a donné une vue plus adaptée que T-Pot seul : attaques collectées sur des services simulés, étapes observables dans la maquette et événements regroupés dans l’interface CTI. Nous avons pu comparer la date de publication de CVE connues aux premières tentatives observées dans notre dispositif ; ce délai mesuré localement ne représente pas toutes les attaques sur Internet.',
    evidence: 'Projet de stage : les données d’attaque et la documentation interne ne sont pas publiées. Mon profil GitHub est disponible ci-dessous, sans dépôt spécifique vérifié pour ce projet.'
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
    evidence: 'Une démonstration et des résultats de test seront ajoutés après validation du laboratoire.'
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
    outcome: 'Les essais documentés dans le laboratoire montrent des communications autorisées ou bloquées selon les zones, des règles de proxy appliquées, un accès VPN fonctionnel et des journaux/alertes remontés dans Wazuh. Le résultat valide les scénarios de la maquette, sans prétendre couvrir toutes les attaques d’un réseau réel.',
    evidence: 'Le rapport détaillé porte une mention de confidentialité. Seule cette synthèse sans adresses, identifiants ni configurations est présentée ici.'
  },
  {
    number: '04', title: 'WAN hybride MPLS & SD-WAN', short: 'Maquette multi-sites : associer routage, tunnels IPsec et politiques de sélection des liens.',
    type: 'Projet réseau · 2024', status: 'Laboratoire réalisé', categories: ['Sécurité réseau', 'Infrastructure'], color: 'blue',
    tags: ['EVE-NG', 'FortiGate', 'Cisco'],
    problem: 'Une entreprise multi-sites doit maintenir les échanges lorsque les chemins WAN présentent des qualités différentes, tout en protégeant les communications. Le laboratoire devait montrer comment articuler routage interne et externe, tunnels et sélection de liens.',
    objective: 'Simuler plusieurs sites et deux approches de transport (MPLS et SD-WAN), établir des tunnels IPsec, puis orienter les flux selon des politiques de routage et de performance.',
    architecture: ['Sites simulés EVE-NG', 'MPLS + SD-WAN', 'BGP / OSPF', 'VPN IPsec'],
    tools: 'EVE-NG, FortiGate, Cisco, BGP, OSPF, IPsec, QoS.',
    work: 'J’ai monté une topologie multi-sites dans EVE-NG avec équipements Cisco et FortiGate, configuré BGP/OSPF, des tunnels IPsec et des règles SD-WAN de sélection de chemin.',
    outcome: 'La topologie configurée réunit les sites dans EVE-NG et permet d’examiner les chemins BGP/OSPF, les tunnels et les décisions SD-WAN selon les politiques choisies. Il s’agit d’une validation de fonctionnement en laboratoire, sans gain de disponibilité ou de latence chiffré.',
    evidence: 'Projet mentionné dans mon CV. Voir mon profil GitHub pour les travaux publiés ; aucun dépôt précis n’est associé ici sans vérification.'
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
    problem: 'Un poste Windows présentait des ralentissements et du trafic inhabituel malgré un premier contrôle antivirus sans alerte. Se fier à ce seul contrôle risquait de laisser une activité persistante sur la machine.',
    objective: 'Croiser processus, connexions et artefacts pour déterminer si une persistance était présente et évaluer la fiabilité d’un nettoyage.',
    architecture: ['Observation du poste', 'Analyse processus et trafic', 'Vérification des artefacts', 'Décision de remédiation'],
    tools: 'Wireshark, Process Explorer, Process Monitor, VirusTotal, Any.Run.',
    work: 'J’ai examiné les processus avec Process Explorer et Process Monitor, les connexions avec Wireshark et certains artefacts avec VirusTotal et Any.Run. Après identification d’une persistance suspecte, j’ai tenté un nettoyage et évalué le risque résiduel.',
    outcome: 'L’analyse a mis en évidence une persistance suspecte et a éclairé la décision de remédiation. Après une tentative de nettoyage, la réinstallation complète a été retenue pour repartir d’un système fiable ; aucune preuve de nettoyage définitif par les seules étapes initiales n’est avancée.',
    evidence: 'Étude résumée dans mon CV. Aucun échantillon ni artefact de la machine n’est publié.'
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
