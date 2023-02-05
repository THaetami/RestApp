import UrlParser from '../routes/url-parser'
import DrawerInitiator from '../utils/drawer-initiator'
import routes from '../routes/routes'

class App {
  constructor ({ button, drawer, itemDrawers, content, footer }) {
    this._button = button
    this._drawer = drawer
    this._itemDrawers = itemDrawers
    this._content = content
    this._footer = footer

    this._initialAppShell()
  }

  _initialAppShell () {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      itemDrawers: this._itemDrawers,
      content: this._content,
      footer: this._footer
    })
  }

  async renderPage () {
    const url = UrlParser.parseActiveUrlWithCombiner()
    const page = routes[url]
    this._content.innerHTML = await page.render()
    await page.afterRender()

    const skipLinkElem = document.querySelector('.skip-link')
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault()
      document.querySelector('#content').focus()
    })
  }
}

export default App
