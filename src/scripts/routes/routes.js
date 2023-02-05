import Home from '../view/pages/home'
import Favorite from '../view/pages/favorite'
import Detail from '../view/pages/detail'

const routes = {
  '/': Home,
  '/home': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite
}

export default routes
