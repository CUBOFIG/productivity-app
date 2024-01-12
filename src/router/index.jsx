import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../views/Home';
import Layout from '../layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/history', element: <Home /> },
      { path: '/dashboard', element: <Home /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]);

export default router;
