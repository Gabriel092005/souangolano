
import { createBrowserRouter } from 'react-router-dom';
import { AppLayoutAdmin } from './pages/_layouts/app';
import { Home} from './pages/app/dashboard-admin/home';
import { Configurations } from './pages/app/dashboard-admin/config';
import { Menu } from './pages/app/dashboard-admin/menu';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayoutAdmin />,
    children: [
      { path: '/', element: <Menu/> },
      { path: '/home', element: <Home/> },
      { path: '/config', element: <Configurations/> },
    ],
  },

]);
