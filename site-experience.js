/* A browser HTTP probe, not ICMP ping. Never substitute invented measurements. */
(() => {
  'use strict';
  const local = location.protocol === 'file:';
  const https = location.protocol === 'https:' && window.isSecureContext;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlay = document.querySelector('#boot-overlay');
  const terminal = document.querySelector('#boot-terminal');
  const prompt = document.querySelector('#boot-prompt');
  const enterButton = document.querySelector('#boot-enter');
  const hud = document.querySelector('.network-status');
  const latencyEl = document.querySelector('#network-latency');
  const packetsEl = document.querySelector('#network-packets');
  const lossEl = document.querySelector('#network-loss');
  const stats = { sent: 0, received: 0, times: [], latest: null };
  let entered = false;
  const en = () => document.documentElement.lang === 'en';
  const wait = ms => new Promise(resolve => setTimeout(resolve, reducedMotion ? 0 : ms));
  const t = (fr, english) => en() ? english : fr;

  function write(message, kind = '') {
    const line = document.createElement('p');
    line.textContent = message;
    if (kind) line.className = kind;
    terminal.append(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function updateHud() {
    if (local) {
      latencyEl.textContent = t('mode local', 'local mode');
      packetsEl.textContent = t('sondes —', 'probes —');
      lossEl.textContent = t('perte —', 'loss —');
      hud.dataset.state = 'local';
      return;
    }
    latencyEl.textContent = stats.latest == null ? t('latence —', 'latency —') : `${t('latence', 'latency')} ${stats.latest} ms`;
    packetsEl.textContent = `${t('sondes', 'probes')} ${stats.received}/${stats.sent}`;
    lossEl.textContent = stats.sent ? `${t('perte', 'loss')} ${Math.round((stats.sent - stats.received) / stats.sent * 100)} %` : t('perte —', 'loss —');
    hud.dataset.state = stats.latest == null && stats.sent ? 'error' : 'ok';
  }

  async function probe() {
    if (local) return null;
    stats.sent += 1;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);
    const start = performance.now();
    try {
      const url = new URL(location.pathname, location.origin);
      url.searchParams.set('_portfolio_probe', String(Date.now()));
      const response = await fetch(url, { method: 'HEAD', cache: 'no-store', credentials: 'omit', signal: controller.signal });
      if (!response.ok || new URL(response.url).origin !== location.origin) throw new Error('HTTP probe failed');
      const milliseconds = Math.max(1, Math.round(performance.now() - start));
      stats.received += 1;
      stats.latest = milliseconds;
      stats.times.push(milliseconds);
      updateHud();
      return milliseconds;
    } catch {
      stats.latest = null;
      updateHud();
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  function audit() {
    const cookieCount = document.cookie.split(';').filter(part => part.trim()).length;
    const resources = performance.getEntriesByType('resource').map(entry => entry.name);
    document.querySelectorAll('script[src], link[rel="stylesheet"][href]').forEach(element => {
      const value = element.src || element.href;
      if (value) resources.push(value);
    });
    const hosts = [...new Set(resources.flatMap(value => {
      try {
        const url = new URL(value, location.href);
        return url.origin !== location.origin && /^https?:$/.test(url.protocol) ? [url.hostname] : [];
      } catch { return []; }
    }))].sort();
    const trackers = hosts.filter(host => /(^|\.)(google-analytics\.com|googletagmanager\.com|doubleclick\.net|facebook\.net|connect\.facebook\.net|hotjar\.com|segment\.com|mixpanel\.com)$/.test(host));
    const fontHosts = hosts.filter(host => host === 'fonts.googleapis.com' || host === 'fonts.gstatic.com');
    const otherHosts = hosts.filter(host => !fontHosts.includes(host));
    return { cookieCount, trackers, fontHosts, otherHosts };
  }

  function securityLines() {
    const scan = audit();
    write(`$ ${t('scan --securite', 'scan --security')}`, 'command');
    write(https
      ? t('[ok] connexion : HTTPS actif (TLS géré par le navigateur)', '[ok] connection: HTTPS active (TLS handled by the browser)')
      : local
        ? t('[local] connexion : fichier local, aucun TLS', '[local] connection: local file, no TLS')
        : t('[attention] connexion : HTTP, pas de chiffrement TLS', '[warning] connection: HTTP, no TLS encryption'), https ? 'success' : 'warn');
    write(`${t('cookies accessibles à la page', 'cookies visible to this page')} : ${scan.cookieCount} (${t('HttpOnly non vérifiables', 'HttpOnly cannot be inspected')})`, 'muted');
    write(scan.trackers.length
      ? `${t('domaines de suivi détectés', 'tracking domains detected')} : ${scan.trackers.join(', ')}`
      : t('traceurs : aucun domaine connu détecté parmi les ressources chargées', 'trackers: no known domain detected among loaded resources'), scan.trackers.length ? 'warn' : 'success');
    write(`${t('contenu tiers chargé', 'loaded third-party content')} : ${scan.fontHosts.length ? 'Google Fonts' : t('aucune police externe', 'no external font')}${scan.otherHosts.length ? ` · ${scan.otherHosts.join(', ')}` : ''}`, 'muted');
    write(t('Contrôle limité aux données visibles par cette page, à cet instant.', 'Check limited to data visible to this page at this moment.'), 'muted');
  }

  async function boot() {
    write('$ ping ihssane.zaoui', 'command');
    write(t('Sondes HTTP HEAD vers cette page (pas un ping ICMP).', 'HTTP HEAD probes to this page (not ICMP ping).'), 'muted');
    await wait(260);
    for (let i = 1; i <= 4; i++) {
      const ms = await probe();
      write(ms != null
        ? `${t('réponse', 'reply')} #${i} : ${ms} ms · HTTP ${t('disponible', 'available')}`
        : local
          ? `${t('réponse', 'reply')} #${i} : ${t('mode local · latence non mesurable', 'local mode · latency unavailable')}`
          : `${t('réponse', 'reply')} #${i} : ${t('sonde indisponible', 'probe unavailable')}`, ms != null ? 'success' : 'warn');
      await wait(180);
    }
    const lost = stats.sent - stats.received;
    write(t('--- statistiques des sondes HTTP ---', '--- HTTP probe statistics ---'), 'muted');
    write(local
      ? t('mode local · aucun chiffre réseau mesurable', 'local mode · no measurable network figures')
      : `${stats.sent} ${t('émises', 'sent')}, ${stats.received} ${t('reçues', 'received')}, ${lost} ${t('perdues', 'lost')} (${Math.round(lost / stats.sent * 100)} %)`);
    if (stats.times.length) {
      const times = stats.times;
      write(`min/moy/max : ${Math.min(...times)}/${Math.round(times.reduce((sum, ms) => sum + ms, 0) / times.length)}/${Math.max(...times)} ms`);
    }
    await wait(320);
    securityLines();
    await wait(320);
    prompt.textContent = t('Appuyez sur Entrée pour afficher le contenu', 'Press Enter to view the content');
    enterButton.textContent = t('Entrer ↵', 'Enter ↵');
    enterButton.disabled = false;
    enterButton.focus({ preventScroll: true });
  }

  function enter() {
    if (entered || enterButton.disabled && !location.hash) return;
    entered = true;
    overlay.hidden = true;
    document.querySelector('.site-shell').inert = false;
    document.body.classList.remove('boot-locked');
    if (!location.hash) document.querySelector('.brand').focus({ preventScroll: true });
    startSections();
    if (!local) {
      setInterval(() => { if (!document.hidden) probe(); }, 12000);
    }
  }

  function startSections() {
    const sections = [
      ['#accueil', '.hero-copy', 'accueil'],
      ['#projets', '#projets', 'pfe-2026'],
      ['#profil', '.profile-main', 'profil'],
      ['#stages', '.experience-intro', 'stages']
    ].map(([selector, host, name]) => {
      const section = document.querySelector(selector);
      const line = document.createElement('div');
      line.className = 'section-link-status';
      line.dataset.name = name;
      line.textContent = t(`En attente › ${name}`, `Waiting › ${name}`);
      (host === selector ? section : section.querySelector(host)).prepend(line);
      return { section, line, name, state: 'waiting', ms: null };
    });

    function show(item) {
      const { line, name, state, ms } = item;
      if (state === 'waiting') line.textContent = t(`En attente › ${name}`, `Waiting › ${name}`);
      if (state === 'syn') line.textContent = `SYN › ${name} …`;
      if (state === 'ack') line.textContent = local
        ? `ACK ‹ ${name} · ${t('mode local', 'local mode')} · ${t('intégrité non vérifiée', 'integrity unverified')}`
        : `ACK ‹ ${name} · ${ms} ms · ${https ? t('chiffré TLS · intégrité ok', 'TLS encrypted · integrity ok') : t('HTTP non chiffré', 'unencrypted HTTP')}`;
      if (state === 'error') line.textContent = `ERR ‹ ${name} · ${t('sonde indisponible', 'probe unavailable')}`;
    }
    async function reveal(item) {
      if (item.state !== 'waiting') return;
      item.state = 'syn';
      item.line.classList.add('is-scanning');
      show(item);
      const [ms] = await Promise.all([probe(), wait(650)]);
      item.state = ms == null && !local ? 'error' : 'ack';
      item.ms = ms;
      item.line.classList.remove('is-scanning');
      item.line.classList.add(item.state === 'ack' ? 'is-ok' : 'is-error');
      show(item);
    }
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            reveal(sections.find(item => item.section === entry.target));
          }
        });
      }, { threshold: 0.12 });
      sections.forEach(item => observer.observe(item.section));
    } else sections.forEach(reveal);
    new MutationObserver(() => { updateHud(); sections.forEach(show); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  enterButton.addEventListener('click', enter);
  document.addEventListener('keydown', event => {
    if (!entered && !enterButton.disabled && event.key === 'Enter') { event.preventDefault(); enter(); }
  });
  updateHud();
  if (location.hash) {
    enterButton.disabled = false;
    enter(); // Direct links bypass the introduction so project sections remain accessible.
  } else {
    overlay.hidden = false;
    document.querySelector('.site-shell').inert = true;
    document.body.classList.add('boot-locked');
    boot();
  }
})();
