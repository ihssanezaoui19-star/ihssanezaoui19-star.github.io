/* Visual map of documented practice. The timeline remains real HTML. */
(() => {
  'use strict';
  const graph = document.querySelector('#skills-graph');
  const detail = document.querySelector('#skills-map-detail');
  const choices = [...document.querySelectorAll('[data-skill]')];
  let active = null;
  const groups = [
    {
      key: 'detection', y: 96, leaves: [52, 80, 108, 136],
      fr: 'Détection', en: 'Detection', tools: ['Wazuh', 'Sysmon', 'Suricata', 'Wireshark'],
      detailFr: 'Je recoupe alertes Wazuh/Sysmon, événements Suricata et PCAP Wireshark pour expliquer une activité suspecte.',
      detailEn: 'I correlate Wazuh/Sysmon alerts, Suricata events and Wireshark PCAPs to explain suspicious activity.'
    },
    {
      key: 'network', y: 264, leaves: [177, 205, 233, 261, 289, 317, 345],
      fr: 'Réseaux', en: 'Networks', tools: ['VLAN', 'BGP', 'MPLS', 'IPsec', 'OpenVPN', 'OPNsense', 'FortiGate'],
      detailFr: 'Je dessine les zones et les flux, prépare le routage et les VPN, puis vérifie l’effet des règles de pare-feu sur les accès utiles.',
      detailEn: 'I map zones and flows, prepare routing and VPNs, then check how firewall rules affect legitimate access.'
    },
    {
      key: 'systems', y: 455, leaves: [391, 419, 447, 475, 503],
      fr: 'Systèmes', en: 'Systems', tools: ['Windows Server', 'AD · GPO', 'Linux', 'Proxmox', 'VMware'],
      detailFr: 'Je prépare des machines virtuelles, administre Active Directory et vérifie les dépendances avant de durcir un environnement.',
      detailEn: 'I prepare virtual machines, administer Active Directory and check dependencies before hardening an environment.'
    },
    {
      key: 'automation', y: 589, leaves: [568, 600],
      fr: 'Automatisation', en: 'Automation', tools: ['PowerShell', 'n8n'],
      detailFr: 'J’utilise PowerShell pour des corrections AD et n8n pour automatiser une partie des traitements CTI du honeypot.',
      detailEn: 'I use PowerShell for AD remediation and n8n to automate parts of the honeypot’s CTI processing.'
    }
  ];
  const english = () => document.documentElement.lang === 'en';

  function select(key) {
    active = key;
    graph.classList.toggle('has-active', Boolean(key));
    graph.querySelectorAll('.skill-branch').forEach(branch => {
      branch.classList.toggle('is-active', branch.dataset.group === key);
      branch.setAttribute('aria-pressed', String(branch.dataset.group === key));
    });
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.skill === key)));
    const selected = groups.find(group => group.key === key);
    detail.replaceChildren();
    const name = document.createElement('strong');
    const copy = document.createElement('span');
    name.textContent = selected ? (english() ? selected.en : selected.fr) : (english() ? 'Select an area' : 'Choisissez un domaine');
    copy.textContent = selected ? (english() ? selected.detailEn : selected.detailFr) : (english()
      ? 'The links show how my network, systems and defensive security practice fit together.'
      : 'Les liens montrent comment mes pratiques réseau, systèmes et cybersécurité défensive se rejoignent.');
    detail.append(name, copy);
  }

  function renderGraph() {
    const isEn = english();
    const branchMarkup = groups.map(group => {
      const name = isEn ? group.en : group.fr;
      const connections = group.leaves.map((y, index) => `
        <path class="skill-leaf-link" d="M 422 ${group.y} C 514 ${group.y}, 546 ${y}, 650 ${y}"/>
        <circle class="skill-leaf-dot" cx="650" cy="${y}" r="4"/>
        <text class="skill-leaf-label" x="665" y="${y}">${group.tools[index]}</text>`).join('');
      return `<g class="skill-branch" data-group="${group.key}" role="button" tabindex="0" aria-label="${name}: ${group.tools.join(', ')}" aria-pressed="false">
        <path class="skill-link" d="M 150 332 C 202 332, 188 ${group.y}, 244 ${group.y}"/>
        <rect class="skill-node" x="244" y="${group.y - 24}" width="178" height="48" rx="12"/>
        <text class="skill-node-label" x="333" y="${group.y + 1}">${name}</text>
        ${connections}
      </g>`;
    }).join('');
    graph.innerHTML = `<svg viewBox="0 0 980 660" role="group" aria-label="${isEn ? 'Interactive skills map from IZ to four practice areas and their tools' : 'Carte interactive des compétences reliant IZ à quatre domaines et leurs outils'}">
      <defs><radialGradient id="skills-root-glow"><stop offset="0" stop-color="#71ecc0" stop-opacity=".66"/><stop offset="1" stop-color="#0e473e"/></radialGradient></defs>
      <circle class="skill-root-ring" cx="98" cy="332" r="58" fill="url(#skills-root-glow)"/>
      <text class="skill-root-text" x="98" y="334">IZ</text>
      ${branchMarkup}
    </svg>`;
    graph.querySelectorAll('.skill-branch').forEach(branch => {
      branch.addEventListener('click', () => select(branch.dataset.group));
      branch.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          select(branch.dataset.group);
        }
      });
    });
    select(active);
  }

  choices.forEach(button => button.addEventListener('click', () => select(button.dataset.skill)));
  function translate() {
    const field = english() ? 'en' : 'fr';
    document.querySelectorAll('.skills-map [data-fr], .route-section [data-fr]').forEach(node => {
      node.textContent = node.dataset[field];
    });
    document.querySelector('#skills-graph').setAttribute('aria-label', english()
      ? 'Skills map: detection, networks, systems and automation'
      : 'Carte des compétences : détection, réseaux, systèmes et automatisation');
    renderGraph();
  }
  translate();
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
