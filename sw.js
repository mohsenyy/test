// نسخه را فقط با bump.sh عوض کنید تا version.json هم هماهنگ بماند
const VERSION = '1.0.2';
const CACHE = `pouyasys-${VERSION}`;
const FILES = ['./', './index.html', './manifest.webmanifest', './icon.svg', './version.json'];

self.addEventListener('install', e => {
  // بدون skipWaiting: نسخه جدید منتظر می‌ماند تا کاربر دکمه «به‌روزرسانی» را بزند
  e.waitUntil(caches.open(CACHE).then(c =>
    c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))));
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data && e.data.type === 'GET_VERSION') e.source.postMessage({ type: 'VERSION', version: VERSION });
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isVersion = new URL(req.url).pathname.endsWith('version.json');
  e.respondWith(
    fetch(req, isVersion ? { cache: 'no-store' } : undefined)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
