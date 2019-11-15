class ImgFilterElement extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', ({target}) => {
            const role = this.role
            const img = this.querySelector('img')
            const value = target.getAttribute(role)
            if (value) {
                img.style.filter = `${role}(${value})`
            }
        })
    }

    get role() {
        return this.getAttribute('role')
    }
}

window.customElements.define('img-filter', ImgFilterElement)
