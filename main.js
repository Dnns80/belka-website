/* eslint-disable */
(function () {
  'use strict';

  const cfg = window.BELKA_CONFIG || {};
  const form = document.getElementById('waitlist-form');
  const input = document.getElementById('waitlist-email');
  const button = document.getElementById('waitlist-submit');
  const status = document.getElementById('waitlist-status');

  if (!form || !input || !button || !status) return;

  // RFC-5322-ish, good enough for client-side gating.
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setState(state, message) {
    status.className = 'waitlist-status ' + (state || '');
    status.textContent = message || '';
  }

  function disable(loading) {
    button.disabled = loading;
    input.disabled = loading;
    button.textContent = loading ? 'Moment …' : button.dataset.originalLabel;
  }

  button.dataset.originalLabel = button.textContent;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = (input.value || '').trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      setState('error', 'Hmm, das sieht nicht nach einer E-Mail aus.');
      input.focus();
      return;
    }

    if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) {
      setState('error', 'Konfiguration fehlt — schreib uns kurz an dennis.achtziger@gmail.com.');
      return;
    }

    disable(true);
    setState('', '');

    try {
      const url = cfg.SUPABASE_URL + '/rest/v1/' + (cfg.WAITLIST_TABLE || 'waitlist_emails');
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': cfg.SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + cfg.SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email: email,
          source: 'landing',
          locale: (navigator.language || 'de').slice(0, 5)
        })
      });

      // 201 Created on success. 409 = duplicate (unique constraint) — treat as success
      // so users who hit submit twice don't see an error.
      if (res.ok || res.status === 201 || res.status === 409) {
        form.style.display = 'none';
        setState('success', "Bist drauf! Belka meldet sich, wenn's losgeht 🐿️");
        return;
      }

      // Surface meaningful Supabase error text where possible.
      let detail = '';
      try {
        const body = await res.json();
        detail = body && (body.message || body.error || body.hint) || '';
      } catch (_) { /* swallow */ }
      console.warn('[waitlist]', res.status, detail);
      setState('error', "Hmm, hat nicht geklappt — versuch's nochmal in einer Minute.");
      disable(false);
    } catch (err) {
      console.warn('[waitlist] network', err);
      setState('error', 'Keine Verbindung — bist du offline?');
      disable(false);
    }
  });
})();
