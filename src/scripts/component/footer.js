// eslint-disable-next-line no-undef
class FooterBar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = `
       <footer class="site-footer">
            <hr>
            <p class="copyright-text">Copyright &copy; 2023 All Rights Reserved by 
                <span>WikiRest</span>.
            </p>

            <div class="social-icons">
                <a href="https://web.facebook.com" target='_blank' alt='facebook' rel="noreferrer" class='socmed'><img src="./socmed/facebook.png" width="44px" height="44px" class="facebook" alt="facebook"></img></a>
                <a href="https://www.instagram.com" target='_blank' alt='instagram' rel="noreferrer"><img src="./socmed/instagram.png" width="44px" height="44px" class="instagram" alt="instagram"></img></a>
                <a href="https://twitter.com/" target='_blank' alt='twitter' rel="noreferrer"><img src="./socmed/twitter.png" width="44px" height="44px" class="twitter" alt="twitter"></img></a>   
            </div>
        </footer>
    `
  }
}

// eslint-disable-next-line no-undef
customElements.define('footer-bar', FooterBar)
