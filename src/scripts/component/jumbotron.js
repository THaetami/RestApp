// eslint-disable-next-line no-undef
class Jumbotron extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
        <div class="games">
          <div class="game">
            <picture>
              <source media="(max-width: 600px)" srcset="./heros/hero-imagemin.webp" alt="dirt rally poster">
              <source media="(max-width: 600px)" srcset="./heros/hero-image-small.jpg" alt="dirt rally poster">
              <source srcset="./heros/hero-image.webp" type="image/webp" alt="dirt rally poster">
              <img src="./heros/hero-image-large.jpg" alt="dirt rally poster">
            </picture>
          </div>
        </div>
    `
  }
}

// eslint-disable-next-line no-undef
customElements.define('jumbotron-template', Jumbotron)
