async function loadStack(url) {
  try {
    const u = new URL(url, location.href);                 // resolves relative path
    // add a tiny cache-buster so stale 404s don’t linger
    u.searchParams.set('_', String(Date.now()));

    const res = await fetch(u.toString(), { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} for ${u.pathname}`);
    }
    const html = await res.text();
    const container = document.getElementById('stack');
    if (!container) throw new Error('#stack not found');
    container.innerHTML = html;
  } catch (e) {
    console.error('[loadStack] Failed:', e);
    const container = document.getElementById('stack');
    if (container) {
      container.innerHTML =
        '<section style="padding:1rem;border:1px dashed #f66">Partial failed to load. Check server/path.</section>';
    }
    throw e;
  }
}
