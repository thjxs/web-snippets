class DragScroll extends HTMLElement {
    constructor() {
        super()
        this.style.cursor = 'grab'
        this.addEventListener('mousedown', function (e) {
            this.pushed = true
            this.lastClientY = e.clientY
            this.lastClientX = e.clientX
            e.preventDefault()
        })
        this.addEventListener('mousemove', function (e) {
            if (this.pushed) {
                this.style.cursor = 'grabbing'
                this.scrollLeft -= (-this.lastClientX + (this.lastClientX = e.clientX))
                this.scrollTop -= (-this.lastClientY + (this.lastClientY = e.clientY))
            }
        })
        let target = this
        window.addEventListener('mouseup', () => {
            target.pushed = false
            target.style.cursor = 'grab'
        })
    }
}

window.customElements.define('drag-scroll', DragScroll)
