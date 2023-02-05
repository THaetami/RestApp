// eslint-disable-next-line no-undef
class Navbar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
      <div class='navbar'>
        <div id="hamburger">
            <button id="hamburgerButton" style='background-color:#FFD1D1; border: none;'  aria-label="button navigation bar">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 95.95" style="enable-background:new 0 0 122.88 95.95" class="nav_button" xml:space="preserve">
                <g>
                  <path class="st0" d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"/>
                </g>
              </svg>
            </button>
        </div>
        <nav class="nav" id='navigationDrawer'>
            <div class="nav__list">
                <a href="#/home" class="nav__item">Home</a>
                <a href="#/favorite" class="nav__item">Favorite</a>
                <a href="https://pengepulaksara.com" class="nav__item" target='_blank' rel="noreferrer">About Us</a>
            </div>
        </nav>
      </div>
    `
  }
}

// eslint-disable-next-line no-undef
customElements.define('nav-bar', Navbar)
