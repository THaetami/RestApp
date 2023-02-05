// eslint-disable-next-line no-undef
class HeaderBar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
         <header>
            <div class="header__inner">
                <h1 class="header__title">WikiRest</h1>
            </div>
        </header>
    `
  }
}

// eslint-disable-next-line no-undef
customElements.define('header-bar', HeaderBar)
