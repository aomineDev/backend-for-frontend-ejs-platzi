import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Player from '../pages/Player';
import NotFound from '../pages/NotFound';

const serverRoutes = (isLogged) => {
  return [
    {
      path: '/',
      // component: isLogged ? Home : Login,
      component: Home,
      exact: true,
    },
    {
      path: '/login',
      // component: !isLogged ? Login : Home,
      component: Login,
      exact: true,
    },
    {
      path: '/register',
      // component: !isLogged ? Register : Home,
      component: Register,
      exact: true,
    },
    {
      path: '/player/:id',
      // component: isLogged ? Player : Login,
      component: Player,
      exact: true,
    },
    {
      name: 'notFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
