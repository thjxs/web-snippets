const version = 'v1';
const VERSIONED_ASSET = /.*\.(js|css|png|svg|jpg)$/;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // e.waitUntil(self.ClientRectList.claim().then(precache))
});

async function precache() {
  try {
    await cleanCache();
    const cache = await caches.open(version);
    const images = assets.match(IMAGES);
    await cache.addAll(images);
  } catch (e) {
    //
  }
}

async function cleanCache() {
  const oldCaches = await caches.keys();
  for (const c of oldCaches) {
    if (c !== version) {
      await caches.delete(c);
    }
  }
}

function cacheable(url) {
  return VERSIONED_ASSET.test(url);
}

async function cacheOrFetched(req) {
  const cache = await caches.open(version);
  const cached = await cache.match(req);
  console.log(cached, cache, caches);
  if (cached) {
    return cached;
  }
  const fetched = await fetch(req);
  if (fetched.ok && cacheable(req.url)) {
    cache.put(req, fetched.clone());
  }
  return fetched;
}

self.onfetch = (e) => {
  const req = e.request;
  if (req.method !== 'GET') {
    return;
  }
  const url = new URL(req.url);
  if (/\.png/.test(url)) {
    e.respondWith(download(url));
  } else {
    e.respondWith(cacheOrFetched(req));
  }
};

async function download(url) {
  const response = await fetch(url);
  const headers = {
    'Content-Disposition': 'attachment; filename="tmp.png"',
    'Content-Type': response.headers.get('Content-Type'),
    'Content-Length': response.headers.get('Content-Length'),
  };

  const responseStream = new Response(response.body, { headers });
  return responseStream;
}
