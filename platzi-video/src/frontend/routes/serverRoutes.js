import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Player from '../pages/Player';
import NotFound from '../pages/NotFound';

const serverRoutes = () => {
  return [
    {
      path: '/',
      component: Home,
      exact: true,
    },
    {
      path: '/login',
      component: Login,
      exact: true,
    },
    {
      path: '/register',
      component: Register,
      exact: true,
    },
    {
      path: '/player/:id',
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
