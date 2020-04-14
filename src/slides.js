class SlidesElement extends HTMLElement {
    constructor() {
        super()
        this.count = 0
    }

    generateArrays() {
        this.width = this.getAttribute('width')
        this.mainView = this.querySelector('.mainview')
        this.thumbnails = this.querySelectorAll('.thumbnail')
    }

    addListeners(index) {
        this.thumbnails[index].addEventListener('click', () => {
            this.deactivateTabs()
            this.thumbnails[index].classList.add('selected')
            this.mainView.scrollTo({
                top: 0,
                left: this.width * index,
                behavior: 'smooth'
            })
        })
    }

    connectedCallback() {
        this.generateArrays()
        for (let i = 0; i < this.thumbnails.length; i += 1) {
            this.addListeners(i)
        }
    }

    deactivateTabs() {
        for (let i = 0; i < this.thumbnails.length; i += 1) {
            this.thumbnails[i].classList.remove('selected')
        }
    }
}

module.exports = SlidesElement
