(async function start () {
    await navigator.serviceWorker.register('/serviceWorker.js')
    await navigator.serviceWorker.ready
    const button = document.createElement('button')
    button.addEventListener('click', function() {
        const a = document.createElement('a');
        a.href = '/tmp.png';
        document.body.appendChild(a);
        a.click();
    })
    button.innerText = 'download'
    document.body.appendChild(button)
})();

async function handleFile(stream) {
    let text = await streamToArrayBuffer(stream)
    saveFile({ plaintext: text, name: 'ff', type: 'image/png'})
}

async function streamToArrayBuffer(stream, size) {
    const reader = stream.getReader();
    let state = await reader.read();

    if (size) {
        const result = new Uint8Array(size);
        let offset = 0;
        while (!state.done) {
            result.set(state.value, offset);
            offset += state.value.length;
            state = await reader.read();
        }
        return result.buffer;
    }

    const parts = [];
    let len = 0;
    while (!state.done) {
        parts.push(state.value);
        len += state.value.length;
        state = await reader.read();
    }
    let offset = 0;
    const result = new Uint8Array(len);
    for (const part of parts) {
        result.set(part, offset);
        offset += part.length;
    }
    return result.buffer;
}

async function saveFile(file) {
    return new Promise(function (resolve, reject) {
        const dataView = new DataView(file.plaintext)
        const blob = new Blob([dataView], {type: file.type})
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, file.name)
            return resolve()
        } else if (/iPhone|fxios/i.test(navigator.userAgent)) {
            const reader = new FileReader()
            reader.addEventListener('loadend', function () {
                if (reader.error) {
                    return reject(reader.error)
                }
                if (reader.result) {
                    const a = document.createElement('a')
                    a.href = reader.result
                    a.download = file.name
                    document.body.appendChild(a)
                    a.click()
                }
                resolve()
            })
            reader.readAsDataURL(blob)
        } else {
            const downloadUrl = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = file.name
            document.body.appendChild(a)
            a.click()
            URL.revokeObjectURL(downloadUrl)
            setTimeout(resolve, 100)
        }
    })
}
