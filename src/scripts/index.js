import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'

import './component/main-component'
import './component/header'
import './component/navbar'
import './component/jumbotron'
import './component/footer'

import App from './view/app'
import swRegister from './utils/sw-register'

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  itemDrawers: document.querySelectorAll('.nav__item'),
  content: document.querySelector('#content'),
  footer: document.querySelector('footer-bar')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', async () => {
  app.renderPage()
  await swRegister()
})
