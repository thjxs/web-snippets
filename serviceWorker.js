self.addEventListener('install', () => {
    self.skipWaiting()
})

self.addEventListener('activate', e => {
    // e.waitUntil(self.ClientRectList.claim().then(precache))
})

async function precache() {
    //
}

self.onfetch = e => {
    const req = e.request
    if (req.method !== 'GET') {
        return
    }
    const url = new URL(req.url)
    if (/\.png/.test(url)) {
        e.respondWith(download(url))
    } else {
        e.respondWith(fetch(req))
    }
}

async function download(url) {
    const response = await fetch(url)
    const headers = {
        'Content-Disposition': 'attachment; filename="tmp.png"',
        'Content-Type': response.headers.get('Content-Type'),
        'Content-Length': response.headers.get('Content-Length')
    };

    const responseStream = new Response(response.body, {headers})
    return responseStream
}
