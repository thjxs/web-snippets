let ws = new WebSocket('ws://localhost:6502', 'wms')
ws.onopen = function () {
    ws.send(JSON.stringify({name: 'tan'}))
}

ws.onmessage = function (e) {
    console.log(e);

    let div = document.createElement('div')
    div.innerText = e.data
    document.body.append(div)
}
