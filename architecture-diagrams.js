/* Project diagrams are simplified, public-facing views of the documented labs. */
(function () {
  const diagrams = {
    '01': {
      phase: ['PFE · architecture du dispositif', 'Final project · lab architecture'],
      summary: ['T-Pot et Cowrie ont été évalués avant la conception du capteur sur mesure. Le réseau interne est simulé ; le schéma ne décrit pas un déploiement de production.', 'T-Pot and Cowrie were evaluated before the custom sensor was designed. The internal network is simulated; this is not a production deployment.'],
      nodes: [
        [['Sources externes', 'External sources'], ['Tentatives observées', 'Observed attempts'], 'risk'],
        [['Pare-feu', 'Firewall'], ['Point d’entrée contrôlé', 'Controlled entry point'], 'security'],
        [['Honeypot sur mesure', 'Custom honeypot'], ['Service client simulé / CVE', 'Simulated client service / CVEs'], 'core'],
        [['Interface CTI + n8n', 'CTI interface + n8n'], ['Analyse et automatisation', 'Analysis and automation'], 'result'],
        [['Collecte des traces', 'Trace collection'], ['Événements, journaux, PCAP', 'Events, logs, PCAPs'], 'telemetry'],
        [['Réseau interne simulé', 'Simulated internal network'], ['Parcours après le point d’entrée', 'Path beyond the entry point'], 'network']
      ],
      actions: [['Étude T-Pot → conception sur mesure → analyse CTI', 'T-Pot review → custom design → CTI analysis']]
    },
    '02': {
      phase: ['Laboratoire personnel · en cours', 'Personal lab · ongoing'],
      summary: ['Le scénario et le plan de l’architecture sont documentés. Les tests de panne, la supervision et la reprise sont à valider ; aucun temps de bascule n’est revendiqué.', 'The scenario and architecture plan are documented. Failure tests, monitoring and recovery remain to be validated; no failover time is claimed.'],
      nodes: [
        [['Scénario d’entreprise', 'Company scenario'], ['Besoins et dépendances', 'Needs and dependencies'], 'core'],
        [['VMware Workstation', 'VMware Workstation'], ['Socle du laboratoire', 'Lab platform'], 'network'],
        [['Réseaux virtuels', 'Virtual networks'], ['Isolation en construction', 'Isolation in progress'], 'network'],
        [['Journal des essais', 'Test record'], ['Résultats à documenter', 'Results to document'], 'planned'],
        [['Supervision / reprise', 'Monitoring / recovery'], ['Objectifs à valider', 'To be validated'], 'planned'],
        [['Machines virtuelles', 'Virtual machines'], ['Services simulés en cours', 'Simulated services in progress'], 'network']
      ],
      actions: [['Conception et construction en cours · validation à venir', 'Design and build in progress · validation pending']]
    },
    '03': {
      phase: ['Laboratoire · segmentation et visibilité', 'Lab · segmentation and visibility'],
      summary: ['Le proxy contrôle des sorties Web, Suricata observe le trafic en mode détection et Wazuh rassemble des journaux. Le modèle ne prétend pas prouver une sécurité complète.', 'The proxy controls web egress, Suricata observes traffic in detection mode, and Wazuh gathers logs. This model does not claim complete security.'],
      nodes: [
        [['Accès distant', 'Remote access'], ['OpenVPN avec MFA', 'OpenVPN with MFA'], 'security'],
        [['OPNsense', 'OPNsense'], ['Règles inter-zones', 'Inter-zone rules'], 'security'],
        [['Zones séparées', 'Separated zones'], ['LAN, admin, invités, DMZ', 'LAN, admin, guest, DMZ'], 'network'],
        [['Wazuh', 'Wazuh'], ['Journaux centralisés', 'Centralized logs'], 'result'],
        [['Suricata', 'Suricata'], ['Détection, pas de blocage', 'Detection, no blocking'], 'telemetry'],
        [['Proxy Squid', 'Squid proxy'], ['Contrôle des sorties Web', 'Web egress control'], 'network']
      ],
      actions: [['Définir les accès → filtrer → observer les événements', 'Define access → filter → observe events']]
    },
    '04': {
      phase: ['Projet académique · maquette multi-sites', 'Academic project · multi-site lab'],
      summary: ['La configuration et la connectivité ICMP sont documentées. Le basculement automatique entre MPLS et Internet reste un objectif sans mesure publiée.', 'Configuration and ICMP connectivity are documented. Automatic MPLS/Internet failover remains an objective without a published measurement.'],
      nodes: [
        [['Sites simulés', 'Simulated sites'], ['Hub et sites distants EVE-NG', 'EVE-NG hub and remote sites'], 'network'],
        [['Transport MPLS', 'MPLS transport'], ['Routeurs et LDP', 'Routers and LDP'], 'network'],
        [['Échanges BGP', 'BGP exchange'], ['Routes configurées', 'Configured routes'], 'security'],
        [['Tests ICMP', 'ICMP tests'], ['Cibles testées joignables', 'Tested targets reachable'], 'result'],
        [['Tunnels IPsec', 'IPsec tunnels'], ['Paramètres documentés', 'Documented settings'], 'security'],
        [['FortiGate SD-WAN', 'FortiGate SD-WAN'], ['Zones et politiques de liens', 'Zones and link policies'], 'core']
      ],
      actions: [['Routage et transport → politiques → vérification ICMP', 'Routing and transport → policies → ICMP checks']]
    },
    '05': {
      phase: ['Stage · cas client simulé en laboratoire', 'Internship · simulated client lab'],
      summary: ['Avant les corrections, les dépendances et l’impact système ont été évalués. Les tests contrôlés ont servi à vérifier la visibilité Wazuh/Sysmon. PingCastle mesure le risque de la maquette, pas un pourcentage de sécurité.', 'System dependencies and impact were assessed before changes. Controlled tests checked Wazuh/Sysmon visibility. PingCastle measures lab risk, not a security percentage.'],
      nodes: [
        [['Domaine AD simulé', 'Simulated AD domain'], ['Proxmox, DNS/DHCP, postes', 'Proxmox, DNS/DHCP, clients'], 'network'],
        [['Audit initial', 'Initial audit'], ['PingCastle · 95/100', 'PingCastle · 95/100'], 'risk'],
        [['Tests de détection', 'Detection tests'], ['Wazuh, Sysmon, scénarios', 'Wazuh, Sysmon, scenarios'], 'telemetry'],
        [['Nouvel audit', 'Follow-up audit'], ['PingCastle · 20/100', 'PingCastle · 20/100'], 'result'],
        [['Corrections ciblées', 'Targeted changes'], ['PowerShell ou consoles AD/GPO', 'PowerShell or AD/GPO consoles'], 'security'],
        [['Analyse d’impact', 'Impact assessment'], ['Usages, dépendances, risques', 'Usage, dependencies, risks'], 'core']
      ],
      actions: [['Auditer → tester → évaluer l’impact → corriger → vérifier', 'Audit → test → assess impact → fix → verify']]
    },
    '06': {
      phase: ['Investigation DFIR · poste Windows', 'DFIR investigation · Windows device'],
      summary: ['Un nettoyage contrôlé et des vérifications ont été effectués. La réinstallation complète est recommandée pour restaurer la confiance, sans être présentée comme réalisée.', 'Controlled cleanup and checks were performed. A full reinstall is recommended to restore trust, without being presented as completed.'],
      nodes: [
        [['Poste suspect', 'Suspect device'], ['Ralentissements, trafic anormal', 'Slowdowns, unusual traffic'], 'risk'],
        [['Analyse système', 'System analysis'], ['Service et démarrage', 'Service and startup'], 'network'],
        [['Analyse réseau', 'Network analysis'], ['Connexions et Wireshark', 'Connections and Wireshark'], 'network'],
        [['Vérification', 'Verification'], ['Indicateurs connus absents', 'Known indicators not found'], 'result'],
        [['Nettoyage contrôlé', 'Controlled cleanup'], ['Service et fichiers concernés', 'Affected service and files'], 'security'],
        [['Corrélation', 'Correlation'], ['Artefacts et indicateurs', 'Artifacts and indicators'], 'telemetry']
      ],
      actions: [['Observer → recouper → nettoyer → contrôler', 'Observe → correlate → clean → check']]
    }
  };

  const positions = [[18, 55], [267, 55], [516, 55], [18, 252], [267, 252], [516, 252]];
  const width = 207, height = 116;
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;'}[char]));
  const pick = (pair, language) => pair[language === 'en' ? 1 : 0];
  function lines(value, limit) {
    const result = [''];
    for (const word of value.split(' ')) {
      const current = result[result.length - 1];
      if (current && (current + ' ' + word).length > limit) result.push(word);
      else result[result.length - 1] = current ? current + ' ' + word : word;
    }
    return result.slice(0, 2);
  }
  function svgLines(value, y, limit) {
    return lines(value, limit).map((line, i) => `<tspan x="16" y="${y + i * 16}">${esc(line)}</tspan>`).join('');
  }

  function renderNode(node, index, language) {
    const [x, y] = positions[index];
    const tone = node[2];
    const title = pick(node[0], language);
    const detail = pick(node[1], language);
    const label = esc(language === 'en' ? (tone === 'planned' ? 'PLANNED' : 'LAB') : (tone === 'planned' ? 'À VALIDER' : 'LABO'));
    return `<g class="diagram-node diagram-${tone}" transform="translate(${x} ${y})">
      <rect width="${width}" height="${height}" rx="9"/>
      <text class="diagram-index" x="16" y="23">${String(index + 1).padStart(2, '0')}</text>
      <text class="diagram-status" x="${width - 15}" y="23" text-anchor="end">${label}</text>
      <text class="diagram-title">${svgLines(title, 57, 23)}</text>
      <text class="diagram-detail">${svgLines(detail, 83, 28)}</text>
    </g>`;
  }

  function renderArchitecture(number, language) {
    const diagram = diagrams[number];
    if (!diagram) return '';
    const phase = pick(diagram.phase, language);
    const summary = pick(diagram.summary, language);
    const action = pick(diagram.actions[0], language);
    const title = language === 'en' ? 'Project architecture and sequence' : 'Architecture et parcours du projet';
    const scroll = language === 'en' ? 'Scroll horizontally to see the whole diagram' : 'Faire défiler horizontalement pour voir tout le schéma';
    const marker = 'diagram-arrow-' + number;
    return `<figure class="architecture-visual">
      <div class="architecture-topline"><span class="architecture-phase">${esc(phase)}</span><span class="architecture-kind">${language === 'en' ? 'LOGICAL VIEW' : 'VUE LOGIQUE'}</span></div>
      <div class="architecture-scroll" tabindex="0" role="region" aria-label="${esc(title)}">
        <svg class="architecture-svg" viewBox="0 0 742 393" role="img" aria-labelledby="diagram-title-${number} diagram-desc-${number}" xmlns="http://www.w3.org/2000/svg">
          <title id="diagram-title-${number}">${esc(title)}</title><desc id="diagram-desc-${number}">${esc(action)}. ${esc(summary)}</desc>
          <defs><marker id="${marker}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>
          <g class="diagram-connectors" marker-end="url(#${marker})">
            <path d="M225 113 H263"/><path d="M474 113 H512"/>
            <path d="M619.5 171 V247"/>
            <path d="M516 310 H478"/><path d="M267 310 H229"/>
          </g>
          ${diagram.nodes.map((node, index) => renderNode(node, index, language)).join('')}
          <text class="diagram-flow-label" x="370" y="213" text-anchor="middle">${language === 'en' ? 'OBSERVE · ANALYZE · VERIFY' : 'OBSERVER · ANALYSER · VÉRIFIER'}</text>
        </svg>
      </div>
      <div class="architecture-mobile-hint">${esc(scroll)} ↔</div>
      <figcaption><strong>${esc(action)}</strong><span>${esc(summary)}</span></figcaption>
    </figure>`;
  }
  window.renderPortfolioArchitecture = renderArchitecture;
})();
