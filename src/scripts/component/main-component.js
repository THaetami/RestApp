// eslint-disable-next-line no-undef
class MainComponent extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
      <a href="#content" class="skip-link">Menuju ke konten</a>
      <header-bar></header-bar>
      <nav-bar></nav-bar>
      <div id='content' tabindex="0"></div>
      <footer-bar></footer-bar>
    `
  }
}

// eslint-disable-next-line no-undef
customElements.define('main-component', MainComponent)
